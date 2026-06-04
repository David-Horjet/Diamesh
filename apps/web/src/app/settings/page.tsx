"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { getP2PStatus, startProvider, stopProvider, connectPeer, disconnectPeer, getAuditLogs } from "@/lib/api";
import type { P2PStatus, AuditLogEntry } from "@diamesh/shared";

export default function SettingsPage() {
  const [p2pStatus, setP2PStatus] = useState<P2PStatus | null>(null);
  const [peerKey, setPeerKey] = useState("");
  const [consumerKey, setConsumerKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [showLogs, setShowLogs] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    getP2PStatus().then(setP2PStatus).catch(() => { /* */ });
  }, []);

  async function handleStartProvider() {
    setLoading(true);
    try {
      await startProvider(consumerKey || undefined);
      const s = await getP2PStatus();
      setP2PStatus(s);
    } finally {
      setLoading(false);
    }
  }

  async function handleStopProvider() {
    setLoading(true);
    try {
      await stopProvider();
      const s = await getP2PStatus();
      setP2PStatus(s);
    } finally {
      setLoading(false);
    }
  }

  async function handleConnect() {
    if (!peerKey.trim()) return;
    setLoading(true);
    try {
      await connectPeer(peerKey.trim());
      const s = await getP2PStatus();
      setP2PStatus(s);
    } finally {
      setLoading(false);
    }
  }

  async function handleDisconnect() {
    setLoading(true);
    try {
      await disconnectPeer();
      const s = await getP2PStatus();
      setP2PStatus(s);
    } finally {
      setLoading(false);
    }
  }

  async function handleLoadLogs() {
    const l = await getAuditLogs();
    setLogs(l);
    setShowLogs(true);
  }

  function copyKey(key: string) {
    void navigator.clipboard.writeText(key);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const isProvider = p2pStatus?.mode === "provider";
  const isConsumer = p2pStatus?.mode === "consumer";

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-8 py-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-100">P2P & System Settings</h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Configure peer-to-peer delegation for distributed inference
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
                    <button
                      onClick={() => copyKey(p2pStatus.publicKey!)}
                      className="btn-secondary text-xs shrink-0"
                    >
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
            <div className="card-header flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-slate-200">Audit Log</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Structured JSON log — required for hackathon submission artifacts
                </p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { void handleLoadLogs(); }} className="btn-secondary text-xs">
                  Load logs
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
            {showLogs && (
              <div className="card-body max-h-80 overflow-y-auto">
                {logs.length === 0 ? (
                  <p className="text-xs text-slate-500">No logs for today</p>
                ) : (
                  <div className="space-y-1">
                    {logs.slice(-50).map((l, i) => (
                      <div key={i} className="flex gap-3 text-xs font-mono">
                        <span className="text-slate-600 shrink-0">
                          {new Date(l.timestamp).toLocaleTimeString()}
                        </span>
                        <span className="text-brand-400">{l.event}</span>
                        {l.agentName && <span className="text-slate-500">{l.agentName}</span>}
                        {l.modelUsed && <span className="text-slate-600">{l.modelUsed}</span>}
                        {l.durationMs && <span className="text-slate-600">{l.durationMs}ms</span>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
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
