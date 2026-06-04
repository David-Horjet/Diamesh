"use client";
import type { AgentProgressEvent } from "@diamesh/shared";

interface Props {
  events: AgentProgressEvent[];
  totalDurationMs?: number | undefined;
}

export default function MetricsPanel({ events, totalDurationMs }: Props) {
  const completedAgents = events.filter((e) => e.type === "agent_complete" && e.metrics);

  if (completedAgents.length === 0) return null;

  const totalTokensOut = completedAgents.reduce((sum, e) => sum + (e.metrics?.tokensOut ?? 0), 0);
  const totalTokensIn = completedAgents.reduce((sum, e) => sum + (e.metrics?.tokensIn ?? 0), 0);
  const delegated = completedAgents.filter((e) => e.metrics?.inferenceMode === "delegated").length;

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="text-sm font-semibold text-slate-200">Performance Metrics</h3>
      </div>
      <div className="card-body">
        {/* Summary row */}
        <div className="grid grid-cols-4 gap-3 mb-4">
          <Stat label="Total time" value={totalDurationMs ? `${(totalDurationMs / 1000).toFixed(1)}s` : "—"} />
          <Stat label="Tokens in" value={String(totalTokensIn)} />
          <Stat label="Tokens out" value={String(totalTokensOut)} />
          <Stat label="P2P delegated" value={`${delegated}/${completedAgents.length}`} />
        </div>

        {/* Per-agent table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left text-slate-500 font-medium pb-2">Agent</th>
                <th className="text-right text-slate-500 font-medium pb-2">Model</th>
                <th className="text-right text-slate-500 font-medium pb-2">TTFT</th>
                <th className="text-right text-slate-500 font-medium pb-2">Tokens/s</th>
                <th className="text-right text-slate-500 font-medium pb-2">Duration</th>
                <th className="text-right text-slate-500 font-medium pb-2">Mode</th>
              </tr>
            </thead>
            <tbody>
              {completedAgents.map((e, i) => {
                const m = e.metrics!;
                return (
                  <tr key={i} className="border-b border-slate-900">
                    <td className="py-2 text-slate-300 capitalize">{e.agentName}</td>
                    <td className="py-2 text-right text-slate-400 font-mono">{m.modelUsed}</td>
                    <td className="py-2 text-right text-slate-400">{m.ttft}ms</td>
                    <td className="py-2 text-right text-slate-400">{m.tokensPerSec}</td>
                    <td className="py-2 text-right text-slate-400">{(m.durationMs / 1000).toFixed(1)}s</td>
                    <td className="py-2 text-right">
                      <span className={`badge ${m.inferenceMode === "delegated" ? "bg-brand-950 text-brand-400" : "bg-slate-800 text-slate-500"}`}>
                        {m.inferenceMode}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-slate-950 rounded-lg p-3 text-center">
      <p className="text-lg font-bold text-slate-100">{value}</p>
      <p className="text-xs text-slate-500 mt-0.5">{label}</p>
    </div>
  );
}
