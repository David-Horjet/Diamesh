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
  caseId?: string;
  agentName?: string;
  modelUsed?: string;
  tokensIn?: number;
  tokensOut?: number;
  ttft?: number;
  tokensPerSec?: number;
  durationMs?: number;
  inferenceMode?: "local" | "delegated";
  details?: Record<string, unknown>;
}
