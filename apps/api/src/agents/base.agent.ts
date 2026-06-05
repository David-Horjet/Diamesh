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
  captureThinking?: boolean;
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
      captureThinking = false,
      inferenceMode = "local",
      onEvent,
    } = opts;

    onEvent?.({ type: "agent_start", agentName: this.name });

    // Inject tool instructions into the system prompt (prompt-based tool calling —
    // works on any GGUF model, unlike the SDK's native `tools` param which requires
    // a tool-aware chat template that MedPsy's GGUF does not provide).
    const toolInstructions = tools.length > 0 ? buildToolInstructions(tools) : "";

    // Truncate prompts to stay safely within the 4096 token ctx window.
    // Rough estimate: 1 token ≈ 4 chars. Reserve 1024 tokens for output.
    const MAX_PROMPT_CHARS = (4096 - 1024) * 4;
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
      const run = completion({
        modelId,
        history: currentHistory,
        stream: true,
        captureThinking,
        kvCache: false,
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
      const toolCall = tools.length > 0 && round < MAX_TOOL_ROUNDS ? parseToolCall(loopText) : null;

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

      // No tool call — this is the final answer
      text += stripToolCallJson(loopText);
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
