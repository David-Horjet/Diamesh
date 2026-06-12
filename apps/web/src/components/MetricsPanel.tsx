"use client";
import { HugeiconsIcon } from "@hugeicons/react";
import { ChartLineData01Icon } from "@hugeicons/core-free-icons";
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
        <h3 className="text-sm font-semibold flex items-center gap-2">
          <HugeiconsIcon icon={ChartLineData01Icon} size={16} strokeWidth={1.8} className="text-brand-500" />
          Performance Metrics
        </h3>
      </div>
      <div className="card-body">
        {/* Summary row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          <Stat label="Total time" value={totalDurationMs ? `${(totalDurationMs / 1000).toFixed(1)}s` : "—"} />
          <Stat label="Tokens in" value={String(totalTokensIn)} />
          <Stat label="Tokens out" value={String(totalTokensOut)} />
          <Stat label="P2P delegated" value={`${delegated}/${completedAgents.length}`} />
        </div>

        {/* Per-agent table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-black/[0.06] dark:border-white/10">
                <th className="text-left text-dark/35 dark:text-white/30 font-medium pb-2">Agent</th>
                <th className="text-right text-dark/35 dark:text-white/30 font-medium pb-2">Model</th>
                <th className="text-right text-dark/35 dark:text-white/30 font-medium pb-2">TTFT</th>
                <th className="text-right text-dark/35 dark:text-white/30 font-medium pb-2">Tokens/s</th>
                <th className="text-right text-dark/35 dark:text-white/30 font-medium pb-2">Duration</th>
                <th className="text-right text-dark/35 dark:text-white/30 font-medium pb-2">Mode</th>
              </tr>
            </thead>
            <tbody>
              {completedAgents.map((e, i) => {
                const m = e.metrics!;
                return (
                  <tr key={i} className="border-b border-black/[0.04] dark:border-white/5">
                    <td className="py-2 capitalize">{e.agentName}</td>
                    <td className="py-2 text-right text-dark/50 dark:text-white/40 font-mono">{m.modelUsed}</td>
                    <td className="py-2 text-right text-dark/50 dark:text-white/40">{m.ttft}ms</td>
                    <td className="py-2 text-right text-dark/50 dark:text-white/40">{m.tokensPerSec}</td>
                    <td className="py-2 text-right text-dark/50 dark:text-white/40">{(m.durationMs / 1000).toFixed(1)}s</td>
                    <td className="py-2 text-right">
                      <span className={`badge ${m.inferenceMode === "delegated" ? "bg-brand-500/10 text-brand-500" : "bg-black/5 dark:bg-white/5 text-dark/40 dark:text-white/30"}`}>
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
    <div className="bg-black/[0.02] dark:bg-white/[0.03] rounded-xl p-3 text-center border border-black/[0.05] dark:border-white/10">
      <p className="text-lg font-bold">{value}</p>
      <p className="text-xs text-dark/40 dark:text-white/35 mt-0.5">{label}</p>
    </div>
  );
}
