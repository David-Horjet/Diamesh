import type {
  ClinicalCase,
  ClinicalReport,
  AgentRun,
  CreateCaseInput,
  HealthResponse,
  P2PStatus,
  AuditLogEntry,
  ApiResult,
  StartProviderResponse,
} from "@diamesh/shared";

const BASE = process.env["NEXT_PUBLIC_API_URL"] ?? "http://localhost:3001";

async function req<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...init?.headers },
    ...init,
  });
  const json = (await res.json()) as ApiResult<T>;
  if (!json.success) throw new Error(json.error);
  return json.data;
}

// ─── Health ───────────────────────────────────────────────────────────────────
// Health endpoint returns HealthResponse directly (no ApiResult wrapper)
export async function getHealth(): Promise<HealthResponse> {
  const res = await fetch(`${BASE}/api/health`);
  return res.json() as Promise<HealthResponse>;
}

// ─── Cases ────────────────────────────────────────────────────────────────────
export const listCases = (limit = 20, offset = 0) =>
  req<ClinicalCase[]>(`/api/cases?limit=${limit}&offset=${offset}`);

export const getCase = (id: string) => req<ClinicalCase>(`/api/cases/${id}`);

export const getReport = (caseId: string) =>
  req<ClinicalReport>(`/api/cases/${caseId}/report`);

export const getAgentRuns = (caseId: string) =>
  req<AgentRun[]>(`/api/cases/${caseId}/runs`);

export async function createCase(
  input: CreateCaseInput,
  images?: { file: File; imageType: string }[]
): Promise<ClinicalCase> {
  const form = new FormData();

  // Append text fields
  (Object.entries(input) as [string, string | undefined][]).forEach(([k, v]) => {
    if (v !== undefined) form.append(k, v);
  });

  // Append image files
  if (images) {
    images.forEach(({ file, imageType }, i) => {
      form.append("images", file);
      form.append(`imageType_images`, imageType);
    });
  }

  const res = await fetch(`${BASE}/api/cases`, { method: "POST", body: form });
  const json = (await res.json()) as ApiResult<ClinicalCase>;
  if (!json.success) throw new Error(json.error);
  return json.data;
}

// ─── P2P ─────────────────────────────────────────────────────────────────────
export const getP2PStatus = () => req<P2PStatus>("/api/p2p/status");

export const startProvider = (allowedConsumerKey?: string) =>
  req<StartProviderResponse>("/api/p2p/provider/start", {
    method: "POST",
    body: JSON.stringify({ allowedConsumerKey }),
  });

export const stopProvider = () =>
  req<{ stopped: boolean }>("/api/p2p/provider/stop", { method: "POST" });

export const connectPeer = (providerPublicKey: string) =>
  req<{ connected: boolean }>("/api/p2p/consumer/connect", {
    method: "POST",
    body: JSON.stringify({ providerPublicKey }),
  });

export const disconnectPeer = () =>
  req<{ disconnected: boolean }>("/api/p2p/consumer/disconnect", { method: "POST" });

// ─── Audit ────────────────────────────────────────────────────────────────────
export const getAuditLogs = () => req<AuditLogEntry[]>("/api/audit");
