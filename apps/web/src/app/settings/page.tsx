"use client";
import { useEffect, useState, useCallback } from "react";
import Sidebar from "@/components/Sidebar";
import { getP2PStatus, startProvider, stopProvider, connectPeer, disconnectPeer, getAuditLogs } from "@/lib/api";
import type { P2PStatus, AuditLogEntry } from "@diamesh/shared";

const EVENT_COLORS: Record<string, string> = {
  server_start: "text-slate-400",
  server_ready: "text-green-400",
  server_error: "text-red-400",
  model_load_start: "text-yellow-400",
  model_load_complete: "text-green-400",
  model_unload: "text-slate-500",
  model_download_progress: "text-slate-500",
  pipeline_start: "text-brand-400",
  pipeline_complete: "text-green-400",
  pipeline_error: "text-red-400",
  agent_inference_complete: "text-brand-300",
  vision_inference_complete: "text-purple-400",
  rag_ingest_complete: "text-teal-400",
  p2p_provider_started: "text-orange-400",
  p2p_provider_stopped: "text-slate-500",
  p2p_peer_configured: "text-orange-300",
  p2p_inference_delegated: "text-orange-400",
  p2p_delegation_fallback: "text-yellow-500",
};

function eventColor(event: string): string {
  return EVENT_COLORS[event] ?? "text-slate-400";
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
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-8 py-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-100">P2P & System Settings</h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Configure peer-to-peer delegation and review the inference audit trail
            </p>
          </div>

          {/* P2P Overview */}
          <div className="card mb-6">
            <div className="card-header flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-200">P2P Status</h2>
              {p2pStatus && (
                <div className="flex items-center gap-2">
                  <div className={p2pStatus.isConnected ? "status-dot-green" : "status-dot-gray"} />
                  <span className="text-xs text-slate-400 capitalize">{p2pStatus.mode}</span>
                </div>
              )}
            </div>
            <div className="card-body grid grid-cols-3 gap-4">
              <StatBox label="Mode" value={p2pStatus?.mode ?? "—"} />
              <StatBox label="Delegated" value={String(p2pStatus?.requestsDelegated ?? 0)} />
              <StatBox label="Fallbacks" value={String(p2pStatus?.fallbacksTriggered ?? 0)} />
            </div>
          </div>

          {/* Provider Mode */}
          <div className="card mb-6">
            <div className="card-header">
              <h2 className="text-sm font-semibold text-slate-200">Provider Mode</h2>
              <p className="text-xs text-slate-500 mt-0.5">
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
                <div className="rounded-lg bg-slate-950 border border-brand-900/50 p-4">
                  <p className="text-xs text-brand-400 font-medium mb-2">Your Provider Public Key</p>
                  <div className="flex items-center gap-2">
                    <code className="text-xs text-slate-300 font-mono break-all flex-1">
                      {p2pStatus.publicKey}
                    </code>
                    <button onClick={() => copyKey(p2pStatus.publicKey!)} className="btn-secondary text-xs shrink-0">
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 mt-2">
                    Share this key with other clinics to allow them to delegate inference to your device
                  </p>
                </div>
              )}

              <div className="flex gap-3">
                {!isProvider ? (
                  <button onClick={() => { void handleStartProvider(); }} disabled={loading} className="btn-primary">
                    Start Provider
                  </button>
                ) : (
                  <button onClick={() => { void handleStopProvider(); }} disabled={loading} className="btn-danger">
                    Stop Provider
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Consumer Mode */}
          <div className="card mb-6">
            <div className="card-header">
              <h2 className="text-sm font-semibold text-slate-200">Consumer Mode</h2>
              <p className="text-xs text-slate-500 mt-0.5">
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
                <div className="rounded-lg bg-slate-950 border border-green-900/50 p-3">
                  <p className="text-xs text-green-400">Connected to peer</p>
                  <code className="text-xs text-slate-500 font-mono mt-1 block break-all">
                    {p2pStatus.connectedPeerKey}
                  </code>
                </div>
              )}

              <div className="rounded-lg bg-slate-950 border border-slate-800 p-3">
                <p className="text-xs text-slate-500">
                  <span className="text-slate-400 font-medium">Note: </span>
                  Delegation is privacy-preserving. Only the inference prompt is sent to the peer —
                  patient records always stay on this device.
                </p>
              </div>

              <div className="flex gap-3">
                {!isConsumer ? (
                  <button onClick={() => { void handleConnect(); }} disabled={loading || !peerKey.trim()} className="btn-primary">
                    Connect to Peer
                  </button>
                ) : (
                  <button onClick={() => { void handleDisconnect(); }} disabled={loading} className="btn-secondary">
                    Disconnect
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Audit Log */}
          <div className="card">
            <div className="card-header">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="text-sm font-semibold text-slate-200">Inference Audit Log</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Structured log of all model loads, inference calls, and pipeline events
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => { void refreshLogs(); }}
                    disabled={logsLoading}
                    className="btn-secondary text-xs"
                  >
                    {logsLoading ? "Loading…" : "Refresh"}
                  </button>
                  <a
                    href={`${process.env["NEXT_PUBLIC_API_URL"] ?? "http://localhost:3001"}/api/audit/download`}
                    download
                    className="btn-secondary text-xs"
                  >
                    Download JSON
                  </a>
                </div>
              </div>

              {/* Summary stats */}
              {logs.length > 0 && (
                <div className="grid grid-cols-4 gap-3 mb-3">
                  <MiniStat label="Total events" value={String(logs.length)} />
                  <MiniStat label="Tokens out" value={String(totalTokensOut)} />
                  <MiniStat label="Avg TTFT" value={avgTTFT !== null ? `${avgTTFT}ms` : "—"} />
                  <MiniStat label="P2P delegated" value={String(delegatedCount)} color={delegatedCount > 0 ? "text-orange-400" : undefined} />
                </div>
              )}

              {/* Filter */}
              <input
                className="input text-xs"
                placeholder="Filter by event name…"
                value={filterEvent}
                onChange={(e) => setFilterEvent(e.target.value)}
              />
            </div>

            <div className="max-h-[480px] overflow-y-auto">
              {logs.length === 0 ? (
                <div className="px-6 py-8 text-center">
                  <p className="text-sm text-slate-500">No log entries yet</p>
                  <p className="text-xs text-slate-600 mt-1">Run an analysis to generate inference logs</p>
                </div>
              ) : (
                <table className="w-full text-xs">
                  <thead className="sticky top-0 bg-slate-900 border-b border-slate-800">
                    <tr>
                      <th className="text-left text-slate-500 font-medium px-4 py-2 w-20">Time</th>
                      <th className="text-left text-slate-500 font-medium px-2 py-2">Event</th>
                      <th className="text-left text-slate-500 font-medium px-2 py-2">Agent</th>
                      <th className="text-right text-slate-500 font-medium px-2 py-2">Model</th>
                      <th className="text-right text-slate-500 font-medium px-2 py-2">Tokens↑</th>
                      <th className="text-right text-slate-500 font-medium px-2 py-2">TTFT</th>
                      <th className="text-right text-slate-500 font-medium px-2 py-2">t/s</th>
                      <th className="text-right text-slate-500 font-medium px-2 py-2">Mode</th>
                      <th className="text-right text-slate-500 font-medium px-2 py-2 pr-4">ms</th>
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
              <div className="px-4 py-2 border-t border-slate-800 flex items-center gap-2">
                <div className="status-dot bg-red-500" />
                <span className="text-xs text-red-400">{errorCount} error event{errorCount > 1 ? "s" : ""} in log</span>
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
        className={`border-b border-slate-900 hover:bg-slate-800/40 transition-colors ${hasDetails ? "cursor-pointer" : ""}`}
        onClick={() => hasDetails && setExpanded((v) => !v)}
      >
        <td className="px-4 py-1.5 text-slate-600 font-mono whitespace-nowrap">
          {new Date(l.timestamp).toLocaleTimeString("en", { hour12: false })}
        </td>
        <td className={`px-2 py-1.5 font-mono ${eventColor(l.event)}`}>
          {l.event}
          {hasDetails && (
            <span className="text-slate-700 ml-1">{expanded ? "▲" : "▼"}</span>
          )}
        </td>
        <td className="px-2 py-1.5 text-slate-500 capitalize">{l.agentName ?? ""}</td>
        <td className="px-2 py-1.5 text-right text-slate-500 font-mono">{l.modelUsed ?? ""}</td>
        <td className="px-2 py-1.5 text-right text-slate-400">{l.tokensOut ?? ""}</td>
        <td className="px-2 py-1.5 text-right text-slate-400">{l.ttft != null ? `${l.ttft}ms` : ""}</td>
        <td className="px-2 py-1.5 text-right text-slate-400">{l.tokensPerSec ?? ""}</td>
        <td className="px-2 py-1.5 text-right">
          {l.inferenceMode && (
            <span className={`badge text-xs ${l.inferenceMode === "delegated" ? "bg-orange-950 text-orange-400" : "bg-slate-800 text-slate-500"}`}>
              {l.inferenceMode}
            </span>
          )}
        </td>
        <td className="px-2 py-1.5 pr-4 text-right text-slate-500">
          {l.durationMs != null ? `${l.durationMs}` : ""}
        </td>
      </tr>
      {expanded && hasDetails && (
        <tr className="border-b border-slate-900 bg-slate-950">
          <td colSpan={9} className="px-4 py-2">
            <pre className="text-xs text-slate-400 font-mono whitespace-pre-wrap break-all">
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
    <div className="bg-slate-950 rounded-lg p-3 border border-slate-800">
      <p className="text-lg font-bold text-slate-100 capitalize">{value}</p>
      <p className="text-xs text-slate-500 mt-0.5">{label}</p>
    </div>
  );
}

function MiniStat({ label, value, color }: { label: string; value: string; color?: string | undefined }) {
  return (
    <div className="bg-slate-950 rounded-lg px-3 py-2 border border-slate-800">
      <p className={`text-sm font-bold ${color ?? "text-slate-100"}`}>{value}</p>
      <p className="text-xs text-slate-600 mt-0.5">{label}</p>
    </div>
  );
}
