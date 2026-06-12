"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon, ArrowRight01Icon, Activity01Icon } from "@hugeicons/core-free-icons";
import Sidebar from "@/components/Sidebar";
import { listCases, getHealth } from "@/lib/api";
import type { ClinicalCase, HealthResponse, ModelHealthEntry } from "@diamesh/shared";

export default function Dashboard() {
  const [cases, setCases] = useState<ClinicalCase[]>([]);
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listCases()
      .then(setCases)
      .catch(() => { /* cases unavailable */ });

    getHealth()
      .then(setHealth)
      .catch(() => { /* health unavailable */ })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-6 sm:py-8">

          {/* Header */}
          <div className="flex items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="text-sm text-dark/50 dark:text-white/40 mt-0.5">Private clinical intelligence — all inference runs locally</p>
            </div>
            <Link href="/cases/new" className="btn-primary shrink-0">
              <HugeiconsIcon icon={Add01Icon} size={16} strokeWidth={2} />
              New Case
            </Link>
          </div>

          {/* System Health */}
          <div className="card mb-6">
            <div className="card-header flex items-center justify-between">
              <h2 className="text-sm font-semibold flex items-center gap-2">
                <HugeiconsIcon icon={Activity01Icon} size={16} strokeWidth={1.8} className="text-brand-500" />
                System Status
              </h2>
              {health && (
                <div className="flex items-center gap-2">
                  <div className={health.status === "ok" ? "status-dot-green" : "status-dot-yellow"} />
                  <span className="text-xs text-dark/50 dark:text-white/40 capitalize">{health.status}</span>
                </div>
              )}
            </div>
            <div className="card-body">
              {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-16 bg-black/[0.03] dark:bg-white/[0.03] rounded-xl animate-pulse" />
                  ))}
                </div>
              ) : health ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {health.models.map((m) => (
                    <ModelCard key={m.name} model={m} />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-dark/40 dark:text-white/30">API not reachable — is the backend running?</p>
              )}
              {health && (
                <p className="text-xs text-dark/30 dark:text-white/25 mt-3">
                  Uptime: {Math.floor(health.uptime / 60)}m {health.uptime % 60}s &nbsp;·&nbsp;
                  All inference runs on-device — no data transmitted
                </p>
              )}
            </div>
          </div>

          {/* Recent Cases */}
          <div className="card">
            <div className="card-header flex items-center justify-between">
              <h2 className="text-sm font-semibold">Recent Cases</h2>
              <span className="text-xs text-dark/40 dark:text-white/30">{cases.length} total</span>
            </div>
            <div>
              {loading ? (
                <div className="p-6 space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-14 bg-black/[0.03] dark:bg-white/[0.03] rounded-xl animate-pulse" />
                  ))}
                </div>
              ) : cases.length === 0 ? (
                <div className="p-12 text-center">
                  <p className="text-dark/40 dark:text-white/40 text-sm">No cases yet</p>
                  <Link href="/cases/new" className="btn-primary mt-4 inline-flex">
                    <HugeiconsIcon icon={Add01Icon} size={16} strokeWidth={2} />
                    Create first case
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-black/[0.06] dark:divide-white/10">
                  {cases.map((c) => (
                    <CaseRow key={c.id} c={c} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function ModelCard({ model }: { model: ModelHealthEntry }) {
  return (
    <div className="bg-black/[0.02] dark:bg-white/[0.03] rounded-xl p-3 border border-black/[0.05] dark:border-white/10">
      <div className="flex items-center gap-2 mb-1.5">
        <div className={
          model.status === "loaded" ? "status-dot-green" :
          model.status === "loading" ? "status-dot-yellow" :
          "status-dot-gray"
        } />
        <span className="text-xs text-dark/60 dark:text-white/50 truncate">{model.name}</span>
      </div>
      <p className="text-xs text-dark/30 dark:text-white/25">{model.sizeGb}GB RAM</p>
      <p className="text-xs text-dark/40 dark:text-white/35 capitalize mt-0.5">{model.status}</p>
    </div>
  );
}

function CaseRow({ c }: { c: ClinicalCase }) {
  return (
    <Link href={`/cases/${c.id}`} className="flex items-center gap-4 px-4 sm:px-6 py-4 hover:bg-black/[0.02] dark:hover:bg-white/[0.03] transition-colors group">
      <div className="w-9 h-9 rounded-full bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-xs font-bold text-brand-500 shrink-0">
        {c.patient?.name?.slice(0, 2).toUpperCase() ?? "??"}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">
          {c.patient?.name ?? "Unknown Patient"}
        </p>
        <p className="text-xs text-dark/40 dark:text-white/35 truncate mt-0.5">{c.chiefComplaint}</p>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <StatusBadge status={c.status} />
        <span className="text-xs text-dark/30 dark:text-white/25 hidden sm:inline">
          {new Date(c.createdAt).toLocaleDateString()}
        </span>
        <HugeiconsIcon icon={ArrowRight01Icon} size={16} className="text-dark/20 dark:text-white/20 group-hover:text-brand-500 transition-colors" />
      </div>
    </Link>
  );
}

function StatusBadge({ status }: { status: ClinicalCase["status"] }) {
  const map = {
    pending:   "badge-low",
    analyzing: "badge bg-brand-500/10 text-brand-500",
    completed: "badge bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    error:     "badge bg-red-500/10 text-red-600 dark:text-red-400",
  };
  return <span className={map[status]}>{status}</span>;
}
