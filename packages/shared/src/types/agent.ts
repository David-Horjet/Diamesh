export type AgentName =
  | "intake"
  | "vision"
  | "knowledge"
  | "reasoning"
  | "differential"
  | "education";

export type AgentStatus = "pending" | "running" | "completed" | "error" | "skipped";

export interface AgentRun {
  id: string;
  caseId: string;
  agentName: AgentName;
  modelUsed: string;
  tokensIn: number;
  tokensOut: number;
  durationMs: number;
  thinkingTrace: string | null;
  toolCallsMade: ToolCallRecord[];
  resultJson: string;
  inferenceMode: "local" | "delegated";
  createdAt: string;
}

export interface ToolCallRecord {
  name: string;
  input: Record<string, unknown>;
  output: string;
  durationMs: number;
}

export interface AgentProgressEvent {
  type: "agent_start" | "agent_token" | "agent_thinking" | "agent_tool_call" | "agent_complete" | "agent_error" | "pipeline_complete";
  agentName: AgentName;
  token?: string;
  thinking?: string;
  toolCall?: ToolCallRecord;
  result?: string;
  error?: string;
  metrics?: AgentMetrics;
}

export interface AgentMetrics {
  modelUsed: string;
  tokensIn: number;
  tokensOut: number;
  durationMs: number;
  ttft: number;
  tokensPerSec: number;
  inferenceMode: "local" | "delegated";
}

export interface PipelineResult {
  caseId: string;
  agentRuns: AgentRun[];
  totalDurationMs: number;
  report: import("./case.js").ClinicalReport;
}
