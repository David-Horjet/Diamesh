"use client";
import { useEffect, useState, useCallback } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Exchange01Icon,
  CloudUploadIcon,
  CloudDownloadIcon,
  Activity01Icon,
  Copy01Icon,
  CheckmarkCircle02Icon,
  Refresh01Icon,
  Download01Icon,
  FilterIcon,
  ArrowDown01Icon,
  ArrowUp01Icon,
  AlertCircleIcon,
  InformationCircleIcon,
  LinkSquare01Icon,
  UnlinkIcon,
  SquareStop,
} from "@hugeicons/core-free-icons";
import { QRCodeSVG } from "qrcode.react";
import Sidebar from "@/components/Sidebar";
import { getP2PStatus, startProvider, stopProvider, connectPeer, disconnectPeer, getAuditLogs } from "@/lib/api";
import type { P2PStatus, AuditLogEntry } from "@diamesh/shared";

const EVENT_COLORS: Record<string, string> = {
  server_start: "text-dark/40 dark:text-white/35",
  server_ready: "text-emerald-600 dark:text-emerald-400",
  server_error: "text-red-600 dark:text-red-400",
  model_load_start: "text-yellow-600 dark:text-yellow-400",
  model_load_complete: "text-emerald-600 dark:text-emerald-400",
  model_unload: "text-dark/35 dark:text-white/30",
  model_download_progress: "text-dark/35 dark:text-white/30",
  pipeline_start: "text-brand-500",
  pipeline_complete: "text-emerald-600 dark:text-emerald-400",
  pipeline_error: "text-red-600 dark:text-red-400",
  agent_inference_complete: "text-brand-500",
  vision_inference_complete: "text-purple-600 dark:text-purple-400",
  rag_ingest_complete: "text-teal-600 dark:text-teal-400",
  p2p_provider_started: "text-orange-600 dark:text-orange-400",
  p2p_provider_stopped: "text-dark/35 dark:text-white/30",
  p2p_peer_configured: "text-orange-500 dark:text-orange-300",
  p2p_inference_delegated: "text-orange-600 dark:text-orange-400",
  p2p_delegation_fallback: "text-yellow-600 dark:text-yellow-400",
};

function eventColor(event: string): string {
  return EVENT_COLORS[event] ?? "text-dark/40 dark:text-white/35";
}

export default function SettingsPage() {
  const [p2pStatus, setP2PStatus] = useState<P2PStatus | null>(null);
  const [peerKey, setPeerKey] = useState("");
  const [consumerKey, setConsumerKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [logsLoading, setLogsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [filterEvent, setFilterEvent] = useState("");

  const refreshLogs = useCallback(async () => {
    setLogsLoading(true);
    try {
      const l = await getAuditLogs();
      setLogs(l);
    } catch { /* */ }
    finally { setLogsLoading(false); }
  }, []);

  useEffect(() => {
    getP2PStatus().then(setP2PStatus).catch(() => { /* */ });
    void refreshLogs();
  }, [refreshLogs]);

  async function handleStartProvider() {
    setLoading(true);
    try {
      await startProvider(consumerKey || undefined);
      setP2PStatus(await getP2PStatus());
    } finally { setLoading(false); }
  }

  async function handleStopProvider() {
    setLoading(true);
    try {
      await stopProvider();
      setP2PStatus(await getP2PStatus());
    } finally { setLoading(false); }
  }

  async function handleConnect() {
    if (!peerKey.trim()) return;
    setLoading(true);
    try {
      await connectPeer(peerKey.trim());
      setP2PStatus(await getP2PStatus());
    } finally { setLoading(false); }
  }

  async function handleDisconnect() {
    setLoading(true);
    try {
      await disconnectPeer();
      setP2PStatus(await getP2PStatus());
    } finally { setLoading(false); }
  }

  function copyKey(key: string) {
    void navigator.clipboard.writeText(key);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const isProvider = p2pStatus?.mode === "provider";
  const isConsumer = p2pStatus?.mode === "consumer";

  const filteredLogs = filterEvent
    ? logs.filter((l) => l.event.includes(filterEvent.toLowerCase()))
    : logs;

  // Compute summary stats from logs
  const inferenceEvents = logs.filter((l) => l.event === "agent_inference_complete" || l.event === "vision_inference_complete");
  const totalTokensOut = inferenceEvents.reduce((s, l) => s + (l.tokensOut ?? 0), 0);
  const avgTTFT = inferenceEvents.length > 0
    ? Math.round(inferenceEvents.reduce((s, l) => s + (l.ttft ?? 0), 0) / inferenceEvents.length)
    : null;
  const delegatedCount = logs.filter((l) => l.event === "p2p_inference_delegated").length;
  const errorCount = logs.filter((l) => l.event.includes("error")).length;

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 sm:px-8 py-6 sm:py-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">P2P & System Settings</h1>
            <p className="text-sm text-dark/50 dark:text-white/40 mt-0.5">
              Configure peer-to-peer delegation and review the inference audit trail
            </p>
          </div>

          {/* P2P Overview */}
          <div className="card mb-6">
            <div className="card-header flex items-center justify-between">
              <h2 className="text-sm font-semibold flex items-center gap-2">
                <HugeiconsIcon icon={Exchange01Icon} size={16} strokeWidth={1.8} className="text-brand-500" />
                P2P Status
              </h2>
              {p2pStatus && (
                <div className="flex items-center gap-2">
                  <div className={p2pStatus.isConnected ? "status-dot-green" : "status-dot-gray"} />
                  <span className="text-xs text-dark/50 dark:text-white/40 capitalize">{p2pStatus.mode}</span>
                </div>
              )}
            </div>
            <div className="card-body grid grid-cols-3 gap-3 sm:gap-4">
              <StatBox label="Mode" value={p2pStatus?.mode ?? "—"} />
              <StatBox label="Delegated" value={String(p2pStatus?.requestsDelegated ?? 0)} />
              <StatBox label="Fallbacks" value={String(p2pStatus?.fallbacksTriggered ?? 0)} />
            </div>
          </div>

          {/* Provider Mode */}
          <div className="card mb-6">
            <div className="card-header">
              <h2 className="text-sm font-semibold flex items-center gap-2">
                <HugeiconsIcon icon={CloudUploadIcon} size={16} strokeWidth={1.8} className="text-brand-500" />
                Provider Mode
              </h2>
              <p className="text-xs text-dark/40 dark:text-white/30 mt-0.5">
                Share your compute — other Diamesh nodes can delegate inference to you
              </p>
            </div>
            <div className="card-body space-y-4">
              <div>
                <label className="label">Restrict to consumer key (optional)</label>
                <input
                  className="input"
                  placeholder="Leave blank to accept any peer"
                  value={consumerKey}
                  onChange={(e) => setConsumerKey(e.target.value)}
                  disabled={isProvider}
                />
              </div>

              {isProvider && p2pStatus?.publicKey && (
                <div className="rounded-xl border border-black/[0.05] dark:border-white/10 p-4">
                  <p className="text-xs font-medium mb-3">Pair a consumer device</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* QR — for phones/tablets with a camera */}
                    <div className="shrink-0 self-center sm:self-start">
                      <div className="bg-white rounded-xl p-3 border border-black/[0.06]">
                        <QRCodeSVG value={p2pStatus.publicKey} size={128} level="M" marginSize={0} />
                      </div>
                      <p className="text-[11px] text-center text-dark/40 dark:text-white/30 mt-1.5">Scan to pair</p>
                    </div>

                    {/* Copyable key — for laptop-to-laptop (no camera) */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] uppercase tracking-wide text-dark/40 dark:text-white/30 mb-1.5">
                        Or copy the public key
                      </p>
                      <div className="flex items-start gap-2">
                        <code className="text-xs text-dark/70 dark:text-white/70 font-mono break-all flex-1">
                          {p2pStatus.publicKey}
                        </code>
                        <button onClick={() => copyKey(p2pStatus.publicKey!)} className="btn-secondary text-xs shrink-0">
                          <HugeiconsIcon icon={copied ? CheckmarkCircle02Icon : Copy01Icon} size={14} strokeWidth={1.8} />
                          {copied ? "Copied!" : "Copy"}
                        </button>
                      </div>
                      <p className="text-xs text-dark/40 dark:text-white/30 mt-2">
                        On the other device, open <span className="font-medium text-dark/60 dark:text-white/50">Consumer Mode</span> and
                        scan this QR or paste the key to delegate inference to this device.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                {!isProvider ? (
                  <button onClick={() => { void handleStartProvider(); }} disabled={loading} className="btn-primary">
                    <HugeiconsIcon icon={CloudUploadIcon} size={16} strokeWidth={1.8} />
                    Start Provider
                  </button>
                ) : (
                  <button onClick={() => { void handleStopProvider(); }} disabled={loading} className="btn-danger">
                    <HugeiconsIcon icon={SquareStop} size={16} strokeWidth={1.8} />
                    Stop Provider
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Consumer Mode */}
          <div className="card mb-6">
            <div className="card-header">
              <h2 className="text-sm font-semibold flex items-center gap-2">
                <HugeiconsIcon icon={CloudDownloadIcon} size={16} strokeWidth={1.8} className="text-brand-500" />
                Consumer Mode
              </h2>
              <p className="text-xs text-dark/40 dark:text-white/30 mt-0.5">
                Delegate inference to a more powerful peer — automatically falls back to local if unavailable
              </p>
            </div>
            <div className="card-body space-y-4">
              <div>
                <label className="label">Provider Public Key</label>
                <input
                  className="input"
                  placeholder="Paste the provider's public key here"
                  value={peerKey}
                  onChange={(e) => setPeerKey(e.target.value)}
                  disabled={isConsumer}
                />
              </div>

              {isConsumer && p2pStatus?.connectedPeerKey && (
                <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/20 p-3">
                  <p className="text-xs text-emerald-600 dark:text-emerald-400">Connected to peer</p>
                  <code className="text-xs text-dark/40 dark:text-white/35 font-mono mt-1 block break-all">
                    {p2pStatus.connectedPeerKey}
                  </code>
                </div>
              )}

              <div className="rounded-xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/10 p-3">
                <div className="flex items-start gap-2">
                  <HugeiconsIcon icon={InformationCircleIcon} size={14} strokeWidth={1.8} className="text-dark/40 dark:text-white/30 mt-0.5 shrink-0" />
                  <p className="text-xs text-dark/50 dark:text-white/40">
                    <span className="text-dark/70 dark:text-white/60 font-medium">Note: </span>
                    Delegation is privacy-preserving. Only the inference prompt is sent to the peer —
                    patient records always stay on this device.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                {!isConsumer ? (
                  <button onClick={() => { void handleConnect(); }} disabled={loading || !peerKey.trim()} className="btn-primary">
                    <HugeiconsIcon icon={LinkSquare01Icon} size={16} strokeWidth={1.8} />
                    Connect to Peer
                  </button>
                ) : (
                  <button onClick={() => { void handleDisconnect(); }} disabled={loading} className="btn-secondary">
                    <HugeiconsIcon icon={UnlinkIcon} size={16} strokeWidth={1.8} />
                    Disconnect
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Audit Log */}
          <div className="card">
            <div className="card-header">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div>
                  <h2 className="text-sm font-semibold flex items-center gap-2">
                    <HugeiconsIcon icon={Activity01Icon} size={16} strokeWidth={1.8} className="text-brand-500" />
                    Inference Audit Log
                  </h2>
                  <p className="text-xs text-dark/40 dark:text-white/30 mt-0.5">
                    Structured log of all model loads, inference calls, and pipeline events
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => { void refreshLogs(); }}
                    disabled={logsLoading}
                    className="btn-secondary text-xs"
                  >
                    <HugeiconsIcon icon={Refresh01Icon} size={14} strokeWidth={1.8} className={logsLoading ? "animate-spin" : ""} />
                    {logsLoading ? "Loading…" : "Refresh"}
                  </button>
                  <a
                    href={`${process.env["NEXT_PUBLIC_API_URL"] ?? "http://localhost:3001"}/api/audit/download`}
                    download
                    className="btn-secondary text-xs"
                  >
                    <HugeiconsIcon icon={Download01Icon} size={14} strokeWidth={1.8} />
                    Download JSON
                  </a>
                </div>
              </div>

              {/* Summary stats */}
              {logs.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-3">
                  <MiniStat label="Total events" value={String(logs.length)} />
                  <MiniStat label="Tokens out" value={String(totalTokensOut)} />
                  <MiniStat label="Avg TTFT" value={avgTTFT !== null ? `${avgTTFT}ms` : "—"} />
                  <MiniStat label="P2P delegated" value={String(delegatedCount)} color={delegatedCount > 0 ? "text-orange-600 dark:text-orange-400" : undefined} />
                </div>
              )}

              {/* Filter */}
              <div className="relative">
                <HugeiconsIcon icon={FilterIcon} size={14} strokeWidth={1.8} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark/30 dark:text-white/25" />
                <input
                  className="input text-xs pl-8"
                  placeholder="Filter by event name…"
                  value={filterEvent}
                  onChange={(e) => setFilterEvent(e.target.value)}
                />
              </div>
            </div>

            <div className="max-h-[480px] overflow-y-auto">
              {logs.length === 0 ? (
                <div className="px-6 py-8 text-center">
                  <p className="text-sm text-dark/50 dark:text-white/40">No log entries yet</p>
                  <p className="text-xs text-dark/30 dark:text-white/25 mt-1">Run an analysis to generate inference logs</p>
                </div>
              ) : (
                <table className="w-full text-xs">
                  <thead className="sticky top-0 bg-white/90 dark:bg-dark/90 backdrop-blur-sm border-b border-black/[0.06] dark:border-white/10">
                    <tr>
                      <th className="text-left text-dark/35 dark:text-white/30 font-medium px-4 py-2 w-20">Time</th>
                      <th className="text-left text-dark/35 dark:text-white/30 font-medium px-2 py-2">Event</th>
                      <th className="text-left text-dark/35 dark:text-white/30 font-medium px-2 py-2">Agent</th>
                      <th className="text-right text-dark/35 dark:text-white/30 font-medium px-2 py-2">Model</th>
                      <th className="text-right text-dark/35 dark:text-white/30 font-medium px-2 py-2">Tokens↑</th>
                      <th className="text-right text-dark/35 dark:text-white/30 font-medium px-2 py-2">TTFT</th>
                      <th className="text-right text-dark/35 dark:text-white/30 font-medium px-2 py-2">t/s</th>
                      <th className="text-right text-dark/35 dark:text-white/30 font-medium px-2 py-2">Mode</th>
                      <th className="text-right text-dark/35 dark:text-white/30 font-medium px-2 py-2 pr-4">ms</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLogs.map((l, i) => (
                      <LogRow key={i} entry={l} />
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {errorCount > 0 && (
              <div className="px-4 py-2 border-t border-black/[0.06] dark:border-white/10 flex items-center gap-2">
                <HugeiconsIcon icon={AlertCircleIcon} size={14} strokeWidth={1.8} className="text-red-500" />
                <span className="text-xs text-red-600 dark:text-red-400">{errorCount} error event{errorCount > 1 ? "s" : ""} in log</span>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function LogRow({ entry: l }: { entry: AuditLogEntry }) {
  const [expanded, setExpanded] = useState(false);
  const hasDetails = l.details && Object.keys(l.details).length > 0;

  return (
    <>
      <tr
        className={`border-b border-black/[0.04] dark:border-white/5 hover:bg-black/[0.02] dark:hover:bg-white/[0.03] transition-colors ${hasDetails ? "cursor-pointer" : ""}`}
        onClick={() => hasDetails && setExpanded((v) => !v)}
      >
        <td className="px-4 py-1.5 text-dark/35 dark:text-white/30 font-mono whitespace-nowrap">
          {new Date(l.timestamp).toLocaleTimeString("en", { hour12: false })}
        </td>
        <td className={`px-2 py-1.5 font-mono ${eventColor(l.event)}`}>
          <span className="inline-flex items-center gap-1">
            {l.event}
            {hasDetails && (
              <HugeiconsIcon icon={expanded ? ArrowUp01Icon : ArrowDown01Icon} size={12} strokeWidth={1.8} className="text-dark/25 dark:text-white/20" />
            )}
          </span>
        </td>
        <td className="px-2 py-1.5 text-dark/40 dark:text-white/35 capitalize">{l.agentName ?? ""}</td>
        <td className="px-2 py-1.5 text-right text-dark/40 dark:text-white/35 font-mono">{l.modelUsed ?? ""}</td>
        <td className="px-2 py-1.5 text-right text-dark/50 dark:text-white/40">{l.tokensOut ?? ""}</td>
        <td className="px-2 py-1.5 text-right text-dark/50 dark:text-white/40">{l.ttft != null ? `${l.ttft}ms` : ""}</td>
        <td className="px-2 py-1.5 text-right text-dark/50 dark:text-white/40">{l.tokensPerSec ?? ""}</td>
        <td className="px-2 py-1.5 text-right">
          {l.inferenceMode && (
            <span className={`badge text-xs ${l.inferenceMode === "delegated" ? "bg-orange-500/10 text-orange-600 dark:text-orange-400" : "bg-black/5 dark:bg-white/5 text-dark/40 dark:text-white/30"}`}>
              {l.inferenceMode}
            </span>
          )}
        </td>
        <td className="px-2 py-1.5 pr-4 text-right text-dark/40 dark:text-white/35">
          {l.durationMs != null ? `${l.durationMs}` : ""}
        </td>
      </tr>
      {expanded && hasDetails && (
        <tr className="border-b border-black/[0.04] dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02]">
          <td colSpan={9} className="px-4 py-2">
            <pre className="text-xs text-dark/50 dark:text-white/40 font-mono whitespace-pre-wrap break-all">
              {JSON.stringify(l.details, null, 2)}
            </pre>
          </td>
        </tr>
      )}
    </>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-black/[0.02] dark:bg-white/[0.03] rounded-xl p-3 border border-black/[0.05] dark:border-white/10">
      <p className="text-lg font-bold capitalize">{value}</p>
      <p className="text-xs text-dark/40 dark:text-white/35 mt-0.5">{label}</p>
    </div>
  );
}

function MiniStat({ label, value, color }: { label: string; value: string; color?: string | undefined }) {
  return (
    <div className="bg-black/[0.02] dark:bg-white/[0.03] rounded-xl px-3 py-2 border border-black/[0.05] dark:border-white/10">
      <p className={`text-sm font-bold ${color ?? ""}`}>{value}</p>
      <p className="text-xs text-dark/35 dark:text-white/30 mt-0.5">{label}</p>
    </div>
  );
}
