export interface ApiResponse<T> {
  success: true;
  data: T;
}

export interface ApiError {
  success: false;
  error: string;
  code?: string;
}

export type ApiResult<T> = ApiResponse<T> | ApiError;

export interface HealthResponse {
  status: "ok" | "degraded";
  version: string;
  models: ModelHealthEntry[];
  uptime: number;
  timestamp: string;
}

export interface ModelHealthEntry {
  name: string;
  modelId: string | null;
  status: "loaded" | "unloaded" | "loading" | "error";
  sizeGb: number;
}

export interface AuditLogEntry {
  timestamp: string;
  event: string;
  caseId?: string | undefined;
  agentName?: string | undefined;
  modelUsed?: string | undefined;
  tokensIn?: number | undefined;
  tokensOut?: number | undefined;
  ttft?: number | undefined;
  tokensPerSec?: number | undefined;
  durationMs?: number | undefined;
  inferenceMode?: "local" | "delegated" | undefined;
  details?: Record<string, unknown> | undefined;
}
