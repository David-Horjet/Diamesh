"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
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
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-8 py-8">

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-slate-100">Dashboard</h1>
              <p className="text-sm text-slate-500 mt-0.5">Private clinical intelligence — all inference runs locally</p>
            </div>
            <Link href="/cases/new" className="btn-primary">
              + New Case
            </Link>
          </div>

          {/* System Health */}
          <div className="card mb-6">
            <div className="card-header flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-200">System Status</h2>
              {health && (
                <div className="flex items-center gap-2">
                  <div className={health.status === "ok" ? "status-dot-green" : "status-dot-yellow"} />
                  <span className="text-xs text-slate-400 capitalize">{health.status}</span>
                </div>
              )}
            </div>
            <div className="card-body">
              {loading ? (
                <div className="grid grid-cols-4 gap-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-16 bg-slate-800 rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : health ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {health.models.map((m) => (
                    <ModelCard key={m.name} model={m} />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500">API not reachable — is the backend running?</p>
              )}
              {health && (
                <p className="text-xs text-slate-600 mt-3">
                  Uptime: {Math.floor(health.uptime / 60)}m {health.uptime % 60}s &nbsp;·&nbsp;
                  All inference runs on-device — no data transmitted
                </p>
              )}
            </div>
          </div>

          {/* Recent Cases */}
          <div className="card">
            <div className="card-header flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-200">Recent Cases</h2>
              <span className="text-xs text-slate-500">{cases.length} total</span>
            </div>
            <div>
              {loading ? (
                <div className="p-6 space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-14 bg-slate-800 rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : cases.length === 0 ? (
                <div className="p-12 text-center">
                  <p className="text-slate-400 text-sm">No cases yet</p>
                  <Link href="/cases/new" className="btn-primary mt-4 inline-flex">
                    Create first case
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-slate-800">
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
    <div className="bg-slate-950 rounded-lg p-3 border border-slate-800">
      <div className="flex items-center gap-2 mb-1.5">
        <div className={
          model.status === "loaded" ? "status-dot-green" :
          model.status === "loading" ? "status-dot-yellow" :
          "status-dot-gray"
        } />
        <span className="text-xs text-slate-400 truncate">{model.name}</span>
      </div>
      <p className="text-xs text-slate-600">{model.sizeGb}GB RAM</p>
      <p className="text-xs text-slate-500 capitalize mt-0.5">{model.status}</p>
    </div>
  );
}

function CaseRow({ c }: { c: ClinicalCase }) {
  return (
    <Link href={`/cases/${c.id}`} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-800/50 transition-colors group">
      <div className="w-9 h-9 rounded-full bg-brand-900/50 border border-brand-800/50 flex items-center justify-center text-xs font-bold text-brand-400 shrink-0">
        {c.patient?.name?.slice(0, 2).toUpperCase() ?? "??"}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-200 truncate group-hover:text-white">
          {c.patient?.name ?? "Unknown Patient"}
        </p>
        <p className="text-xs text-slate-500 truncate mt-0.5">{c.chiefComplaint}</p>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <StatusBadge status={c.status} />
        <span className="text-xs text-slate-600">
          {new Date(c.createdAt).toLocaleDateString()}
        </span>
        <span className="text-slate-600 group-hover:text-slate-400 transition-colors">→</span>
      </div>
    </Link>
  );
}

function StatusBadge({ status }: { status: ClinicalCase["status"] }) {
  const map = {
    pending:   "badge bg-slate-800 text-slate-400",
    analyzing: "badge bg-brand-950 text-brand-400 border border-brand-900",
    completed: "badge bg-green-950 text-green-400 border border-green-900",
    error:     "badge bg-red-950 text-red-400 border border-red-900",
  };
  return <span className={map[status]}>{status}</span>;
}
