import { completion } from "@qvac/sdk";
import { v4 as uuid } from "uuid";
import { insertAgentRun } from "../db/queries.js";
import { auditInference } from "../logging/audit.js";
import { dispatchTool } from "../tools/index.js";
import { buildToolInstructions, parseToolCall, stripToolCallJson, type PromptTool } from "../tools/prompt-tools.js";
import type { AgentName, AgentProgressEvent, AgentMetrics, ToolCallRecord } from "@diamesh/shared";

// Max tool-call rounds before forcing a final answer (prevents infinite loops)
const MAX_TOOL_ROUNDS = 3;

export interface AgentRunOptions {
  caseId: string;
  systemPrompt: string;
  userPrompt: string;
  modelId: string;
  modelName: string;
  tools?: PromptTool[];
  // Max tokens to generate. Qwen3 always emits a `<think>...</think>` block
  // before its actual answer (regardless of `captureThinking`), so this must
  // cover thinking + the real response or the answer gets truncated to "".
  maxTokens?: number;
  inferenceMode?: "local" | "delegated";
  onEvent?: ((event: AgentProgressEvent) => void) | undefined;
}

export interface AgentRunResult {
  text: string;
  thinkingTrace: string | null;
  toolCallsMade: ToolCallRecord[];
  metrics: AgentMetrics;
}

export abstract class BaseAgent {
  abstract readonly name: AgentName;

  protected async run(opts: AgentRunOptions): Promise<AgentRunResult> {
    const {
      caseId,
      systemPrompt,
      userPrompt,
      modelId,
      modelName,
      tools = [],
      maxTokens = 1000,
      inferenceMode = "local",
      onEvent,
    } = opts;

    onEvent?.({ type: "agent_start", agentName: this.name });

    // Inject tool instructions into the system prompt (prompt-based tool calling —
    // works on any GGUF model, unlike the SDK's native `tools` param which requires
    // a tool-aware chat template that MedPsy's GGUF does not provide).
    const toolInstructions = tools.length > 0 ? buildToolInstructions(tools) : "";

    // Truncate prompts to stay within the 4096 token ctx window configured in
    // pool.ts. Rough estimate: 1 token ≈ 4 chars. Reserve `maxTokens` for output.
    const MAX_PROMPT_CHARS = (4096 - maxTokens) * 4;
    const fullSystem = systemPrompt + toolInstructions;
    const safeSystem = fullSystem.slice(0, Math.floor(MAX_PROMPT_CHARS * 0.45));
    const safeUser = userPrompt.slice(0, Math.floor(MAX_PROMPT_CHARS * 0.55));

    const startTime = Date.now();
    let firstTokenTime: number | null = null;
    let text = "";
    let thinkingTrace = "";
    const toolCallsMade: ToolCallRecord[] = [];
    let tokensIn = 0;
    let tokensOut = 0;

    // Conversation history grows as tools are called
    let currentHistory: { role: "system" | "user" | "assistant"; content: string }[] = [
      { role: "system", content: safeSystem },
      { role: "user", content: safeUser },
    ];

    let round = 0;
    while (true) {
      // Whether this round is still allowed to issue a tool call vs. the
      // forced final round (round >= MAX_TOOL_ROUNDS).
      const canCallTool = tools.length > 0 && round < MAX_TOOL_ROUNDS;
      const isFinalToolRound = tools.length > 0 && !canCallTool;

      // On the forced final round, tell the model explicitly that no more
      // tool calls will be honored — otherwise it may emit yet another
      // `{"tool_call": ...}` JSON (stripped below, leaving an empty result),
      // or simply paste back the last tool's raw output instead of writing
      // up its own findings.
      const requestHistory = isFinalToolRound
        ? [
            ...currentHistory,
            {
              role: "user" as const,
              content:
                "Do not call any more tools, and do not copy or repeat any tool output verbatim. " +
                "Using everything you've gathered, write your complete final answer now in your own words, as plain text.",
            },
          ]
        : currentHistory;

      const run = completion({
        modelId,
        history: requestHistory,
        stream: true,
        // Always capture thinking so `<think>...</think>` is routed to
        // thinkingDelta/thinkingTrace instead of leaking into the visible
        // content stream and `text`/`result.text` (and JSON parsing below).
        captureThinking: true,
        generationParams: { predict: maxTokens },
      });

      let loopText = "";
      let loopThinking = "";

      for await (const event of run.events) {
        // The SDK emits delta text under `.text` (not `.delta`)
        const e = event as { type: string; text?: string; stats?: { promptTokens?: number; generatedTokens?: number } };
        switch (e.type) {
          case "contentDelta":
            if (firstTokenTime === null) firstTokenTime = Date.now();
            loopText += e.text ?? "";
            onEvent?.({ type: "agent_token", agentName: this.name, token: e.text ?? "" });
            break;

          case "thinkingDelta":
            loopThinking += e.text ?? "";
            onEvent?.({ type: "agent_thinking", agentName: this.name, thinking: e.text ?? "" });
            break;

          case "completionStats":
            tokensIn += e.stats?.promptTokens ?? 0;
            tokensOut += e.stats?.generatedTokens ?? 0;
            break;
        }
      }

      thinkingTrace += loopThinking;

      // Check if the model emitted a tool call (and we still have rounds left)
      const toolCall = canCallTool ? parseToolCall(loopText) : null;

      if (toolCall) {
        const { result, durationMs } = await dispatchTool(toolCall.name, toolCall.arguments);
        const record: ToolCallRecord = {
          name: toolCall.name,
          input: toolCall.arguments,
          output: result,
          durationMs,
        };
        toolCallsMade.push(record);
        onEvent?.({ type: "agent_tool_call", agentName: this.name, toolCall: record });

        // Feed the tool result back and ask the model to continue
        currentHistory = [
          ...currentHistory,
          { role: "assistant", content: loopText },
          { role: "user", content: `Tool "${toolCall.name}" returned:\n${result}\n\nContinue your analysis using this result.` },
        ];
        round++;
        continue;
      }

      // No tool call — this is the final answer. With reasoning_budget:0, MedPsy
      // sometimes streams its whole <think> draft as visible content and then
      // emits a stray "</think>" before its real answer (the opening <think> is
      // part of the prefill template, so the SDK never pairs/captures it as
      // thinking). Keep only what follows the last "</think>" when present.
      const thinkEnd = loopText.lastIndexOf("</think>");
      const afterThinking = thinkEnd >= 0 ? loopText.slice(thinkEnd + "</think>".length).trim() : loopText;

      // If stripping a stray tool-call JSON would empty out the whole response,
      // keep the raw text instead of discarding it entirely.
      const stripped = stripToolCallJson(afterThinking);
      text += stripped || afterThinking || loopText;
      break;
    }

    const durationMs = Date.now() - startTime;
    const ttft = firstTokenTime !== null ? firstTokenTime - startTime : durationMs;
    const tokensPerSec = tokensOut > 0 ? Math.round((tokensOut / durationMs) * 1000) : 0;

    const metrics: AgentMetrics = {
      modelUsed: modelName,
      tokensIn,
      tokensOut,
      durationMs,
      ttft,
      tokensPerSec,
      inferenceMode,
    };

    // Persist run to DB
    insertAgentRun({
      id: uuid(),
      caseId,
      agentName: this.name,
      modelUsed: modelName,
      tokensIn,
      tokensOut,
      durationMs,
      thinkingTrace: thinkingTrace || null,
      toolCallsMade,
      resultJson: JSON.stringify({ text: text.trim() }),
      inferenceMode,
    });

    auditInference({
      event: "agent_inference_complete",
      caseId,
      agentName: this.name,
      modelUsed: modelName,
      tokensIn,
      tokensOut,
      ttft,
      tokensPerSec,
      durationMs,
      inferenceMode,
    });

    onEvent?.({
      type: "agent_complete",
      agentName: this.name,
      result: text.trim(),
      metrics,
    });

    return {
      text: text.trim(),
      thinkingTrace: thinkingTrace || null,
      toolCallsMade,
      metrics,
    };
  }
}
