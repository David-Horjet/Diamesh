"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import AgentProgressStream from "@/components/AgentProgressStream";
import ClinicalReportView from "@/components/ClinicalReport";
import MetricsPanel from "@/components/MetricsPanel";
import { useAnalysisStream } from "@/lib/sse";
import { getCase, getReport } from "@/lib/api";
import type { ClinicalCase, ClinicalReport } from "@diamesh/shared";

type Tab = "progress" | "report" | "metrics";

export default function CasePage() {
  const { id } = useParams<{ id: string }>();
  const [clinicalCase, setClinicalCase] = useState<ClinicalCase | null>(null);
  const [report, setReport] = useState<ClinicalReport | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("progress");
  const [loading, setLoading] = useState(true);

  const stream = useAnalysisStream(id);

  useEffect(() => {
    if (!id) return;
    getCase(id)
      .then((c) => {
        setClinicalCase(c);
        if (c.status === "completed") {
          return getReport(id).then((r) => { setReport(r); setActiveTab("report"); });
        }
      })
      .catch(() => { /* */ })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (stream.isComplete) {
      getCase(id).then(setClinicalCase).catch(() => { /* */ });
      getReport(id).then((r) => { setReport(r); setActiveTab("report"); }).catch(() => { /* */ });
    }
  }, [stream.isComplete, id]);

  const totalMs = stream.events.find((e) => e.type === "pipeline_complete")
    ? stream.events.reduce((acc, e) => acc + (e.metrics?.durationMs ?? 0), 0)
    : undefined;

  if (loading) {
    return (
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-slate-500 text-sm">Loading…</div>
        </main>
      </div>
    );
  }

  if (!clinicalCase) {
    return (
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-slate-400">Case not found</p>
            <Link href="/" className="btn-secondary mt-4 inline-flex">← Dashboard</Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-8 py-8">

          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Link href="/" className="text-xs text-slate-600 hover:text-slate-400">← Dashboard</Link>
              </div>
              <h1 className="text-xl font-bold text-slate-100">
                {clinicalCase.patient?.name ?? "Unknown Patient"}
              </h1>
              <p className="text-sm text-slate-400 mt-0.5">{clinicalCase.chiefComplaint}</p>
            </div>
            <div className="flex items-center gap-3">
              <UrgencyBadge status={clinicalCase.status} />
              {!stream.isRunning && !stream.isComplete && clinicalCase.status !== "completed" && (
                <button onClick={() => { void stream.start(); }} className="btn-primary">
                  Run Analysis
                </button>
              )}
              {stream.isRunning && (
                <button onClick={stream.stop} className="btn-secondary">
                  Stop
                </button>
              )}
            </div>
          </div>

          {/* Case summary strip */}
          <div className="card mb-6">
            <div className="card-body">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                {clinicalCase.vaOd && <ClinicalField label="VA OD" value={clinicalCase.vaOd} />}
                {clinicalCase.vaOs && <ClinicalField label="VA OS" value={clinicalCase.vaOs} />}
                {clinicalCase.refractionOd && <ClinicalField label="Rx OD" value={clinicalCase.refractionOd} />}
                {clinicalCase.refractionOs && <ClinicalField label="Rx OS" value={clinicalCase.refractionOs} />}
              </div>
              {clinicalCase.ocularFindings && (
                <div className="mt-3 pt-3 border-t border-slate-800">
                  <span className="label">Findings</span>
                  <p className="text-xs text-slate-400">{clinicalCase.ocularFindings}</p>
                </div>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mb-4 bg-slate-900 p-1 rounded-lg w-fit border border-slate-800">
            {(["progress", "report", "metrics"] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all capitalize ${
                  activeTab === tab
                    ? "bg-brand-600 text-white"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {tab}
                {tab === "report" && report && " ✓"}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {activeTab === "progress" && (
            <div>
              {stream.error && (
                <div className="rounded-lg border border-red-900 bg-red-950/30 px-4 py-3 mb-4">
                  <p className="text-sm text-red-400">{stream.error}</p>
                </div>
              )}
              {stream.events.length === 0 && !stream.isRunning && clinicalCase.status !== "completed" && (
                <div className="card p-12 text-center">
                  <p className="text-slate-400 text-sm">Click "Run Analysis" to start the multi-agent pipeline</p>
                  <p className="text-xs text-slate-600 mt-2">5 agents · local inference · MedPsy-4B reasoning</p>
                </div>
              )}
              <AgentProgressStream events={stream.events} isRunning={stream.isRunning} />
            </div>
          )}

          {activeTab === "report" && (
            <div>
              {report ? (
                <ClinicalReportView report={report} />
              ) : (
                <div className="card p-12 text-center">
                  <p className="text-slate-400 text-sm">No report yet — run the analysis first</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "metrics" && (
            <div>
              {stream.events.length > 0 ? (
                <MetricsPanel events={stream.events} totalDurationMs={totalMs} />
              ) : (
                <div className="card p-12 text-center">
                  <p className="text-slate-400 text-sm">Metrics appear after analysis runs</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function ClinicalField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="label">{label}</span>
      <p className="text-slate-200 font-mono text-sm">{value}</p>
    </div>
  );
}

function UrgencyBadge({ status }: { status: ClinicalCase["status"] }) {
  const map: Record<ClinicalCase["status"], string> = {
    pending: "badge-routine",
    analyzing: "badge bg-brand-950 text-brand-400 border border-brand-900",
    completed: "badge bg-green-950 text-green-400 border border-green-900",
    error: "badge bg-red-950 text-red-400 border border-red-900",
  };
  return <span className={map[status]}>{status}</span>;
}
