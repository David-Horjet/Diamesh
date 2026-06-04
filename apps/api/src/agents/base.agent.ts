import { completion } from "@qvac/sdk";
import { v4 as uuid } from "uuid";
import { insertAgentRun } from "../db/queries.js";
import { auditInference } from "../logging/audit.js";
import { dispatchTool } from "../tools/index.js";
import type { AgentName, AgentProgressEvent, AgentMetrics, ToolCallRecord } from "@diamesh/shared";

export interface AgentRunOptions {
  caseId: string;
  systemPrompt: string;
  userPrompt: string;
  modelId: string;
  modelName: string;
  tools?: object[];
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

    // Truncate prompts to stay safely within the 4096 token ctx window.
    // Rough estimate: 1 token ≈ 4 chars. Reserve 1024 tokens for output.
    const MAX_PROMPT_CHARS = (4096 - 1024) * 4;
    const safeSystem = systemPrompt.slice(0, Math.floor(MAX_PROMPT_CHARS * 0.35));
    const safeUser = userPrompt.slice(0, Math.floor(MAX_PROMPT_CHARS * 0.65));

    const history = [
      { role: "system" as const, content: safeSystem },
      { role: "user" as const, content: safeUser },
    ];

    const startTime = Date.now();
    let firstTokenTime: number | null = null;
    let text = "";
    let thinkingTrace = "";
    const toolCallsMade: ToolCallRecord[] = [];
    let tokensIn = 0;
    let tokensOut = 0;

    // Agentic tool-calling loop
    let currentHistory = history;

    while (true) {
      const run = completion({
        modelId,
        history: currentHistory,
        stream: true,
        captureThinking,
        ...(tools.length > 0 ? { tools } : {}),
        kvCache: false,
      });

      let pendingToolCall: { name: string; args: string } | null = null;
      let loopText = "";
      let loopThinking = "";

      for await (const event of run.events) {
        switch (event.type) {
          case "contentDelta":
            if (firstTokenTime === null) firstTokenTime = Date.now();
            loopText += event.delta ?? "";
            onEvent?.({ type: "agent_token", agentName: this.name, token: event.delta ?? "" });
            break;

          case "thinkingDelta":
            loopThinking += event.delta ?? "";
            onEvent?.({ type: "agent_thinking", agentName: this.name, thinking: event.delta ?? "" });
            break;

          case "toolCall":
            pendingToolCall = { name: event.call?.name ?? "", args: JSON.stringify(event.call?.arguments ?? {}) };
            break;

          case "usage":
            tokensIn += event.inputTokens ?? 0;
            tokensOut += event.outputTokens ?? 0;
            break;
        }
      }

      text += loopText;
      thinkingTrace += loopThinking;

      // If a tool was called, dispatch it and continue the loop
      if (pendingToolCall) {
        const toolStart = Date.now();
        let parsedArgs: Record<string, unknown> = {};
        try { parsedArgs = JSON.parse(pendingToolCall.args); } catch { /* */ }

        const { result, durationMs } = await dispatchTool(pendingToolCall.name, parsedArgs);
        const record: ToolCallRecord = {
          name: pendingToolCall.name,
          input: parsedArgs,
          output: result,
          durationMs,
        };
        toolCallsMade.push(record);
        onEvent?.({ type: "agent_tool_call", agentName: this.name, toolCall: record });

        // Append tool call + result to history for next loop
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        currentHistory = [
          ...currentHistory,
          { role: "assistant", content: loopText || `Calling tool: ${pendingToolCall.name}` } as any,
          { role: "tool", content: result, name: pendingToolCall.name } as any,
        ] as typeof currentHistory;
        continue;
      }

      // No tool call — done
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
