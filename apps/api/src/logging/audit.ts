import fs from "fs";
import path from "path";
import type { AuditLogEntry } from "@diamesh/shared";

const LOG_DIR = path.resolve("./logs");
let logStream: fs.WriteStream | null = null;

export function initAuditLog(): void {
  if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR, { recursive: true });

  const date = new Date().toISOString().split("T")[0];
  const logPath = path.join(LOG_DIR, `diamesh-${date}.jsonl`);
  logStream = fs.createWriteStream(logPath, { flags: "a" });
  console.log(`[audit] Logging to ${logPath}`);
}

export function auditLog(entry: Omit<AuditLogEntry, "timestamp">): void {
  const record: AuditLogEntry = {
    timestamp: new Date().toISOString(),
    ...entry,
  };

  if (logStream) {
    logStream.write(JSON.stringify(record) + "\n");
  }
}

export function auditInference(opts: {
  event: string;
  caseId?: string;
  agentName?: string;
  modelUsed: string;
  tokensIn: number;
  tokensOut: number;
  ttft: number;
  tokensPerSec: number;
  durationMs: number;
  inferenceMode: "local" | "delegated";
}): void {
  auditLog({
    event: opts.event,
    caseId: opts.caseId,
    agentName: opts.agentName,
    modelUsed: opts.modelUsed,
    tokensIn: opts.tokensIn,
    tokensOut: opts.tokensOut,
    ttft: opts.ttft,
    tokensPerSec: opts.tokensPerSec,
    durationMs: opts.durationMs,
    inferenceMode: opts.inferenceMode,
  });
}

// Returns all log entries for the current day as an array (used for /api/audit endpoint)
export function readTodayLogs(): AuditLogEntry[] {
  const date = new Date().toISOString().split("T")[0];
  const logPath = path.join(LOG_DIR, `diamesh-${date}.jsonl`);
  if (!fs.existsSync(logPath)) return [];

  return fs
    .readFileSync(logPath, "utf-8")
    .split("\n")
    .filter(Boolean)
    .map((line) => JSON.parse(line) as AuditLogEntry);
}
