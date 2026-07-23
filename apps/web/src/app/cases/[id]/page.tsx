"use client";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon, PlayIcon, SquareStop, CheckmarkCircle02Icon } from "@hugeicons/core-free-icons";
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
  // Guards against a second auto-start (React StrictMode re-runs effects in dev).
  const autoStartedRef = useRef(false);

  useEffect(() => {
    if (!id) return;
    getCase(id)
      .then((c) => {
        setClinicalCase(c);
        if (c.status === "completed") {
          return getReport(id).then((r) => { setReport(r); setActiveTab("report"); });
        }
        // Only auto-start when arriving straight from "Create & Analyze"
        // (?autorun=1). Simply viewing a pending case must never kick off the
        // pipeline — the clinician clicks "Run Analysis".
        const autorun = new URLSearchParams(window.location.search).get("autorun") === "1";
        if (c.status === "pending" && autorun && !autoStartedRef.current) {
          autoStartedRef.current = true;
          // Drop the flag so a refresh or back-navigation doesn't re-run it.
          window.history.replaceState(null, "", `/cases/${id}`);
          setTimeout(() => { void stream.start(); }, 300);
        }
      })
      .catch(() => { /* */ })
      .finally(() => setLoading(false));
  // stream.start is stable — intentionally exclude from deps to avoid loop
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <div className="flex flex-col md:flex-row h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-dark/40 dark:text-white/40 text-sm">Loading…</div>
        </main>
      </div>
    );
  }

  if (!clinicalCase) {
    return (
      <div className="flex flex-col md:flex-row h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-dark/50 dark:text-white/40">Case not found</p>
            <Link href="/" className="btn-secondary mt-4 inline-flex">
              <HugeiconsIcon icon={ArrowLeft01Icon} size={16} strokeWidth={1.8} />
              Dashboard
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 py-6 sm:py-8">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Link href="/" className="text-xs text-dark/40 dark:text-white/30 hover:text-brand-500 flex items-center gap-1 transition-colors">
                  <HugeiconsIcon icon={ArrowLeft01Icon} size={14} strokeWidth={1.8} />
                  Dashboard
                </Link>
              </div>
              <h1 className="text-xl font-bold">
                {clinicalCase.patient?.name ?? "Unknown Patient"}
              </h1>
              <p className="text-sm text-dark/50 dark:text-white/40 mt-0.5">{clinicalCase.chiefComplaint}</p>
            </div>
            <div className="flex items-center gap-3">
              <UrgencyBadge status={clinicalCase.status} />
              {!stream.isRunning && !stream.isComplete && clinicalCase.status !== "completed" && (
                <button onClick={() => { void stream.start(); }} className="btn-primary">
                  <HugeiconsIcon icon={PlayIcon} size={16} strokeWidth={1.8} />
                  Run Analysis
                </button>
              )}
              {stream.isRunning && (
                <button onClick={stream.stop} className="btn-secondary">
                  <HugeiconsIcon icon={SquareStop} size={16} strokeWidth={1.8} />
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
                <div className="mt-3 pt-3 border-t border-black/[0.06] dark:border-white/10">
                  <span className="label">Findings</span>
                  <p className="text-xs text-dark/50 dark:text-white/40">{clinicalCase.ocularFindings}</p>
                </div>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mb-4 glass p-1 rounded-xl w-fit">
            {(["progress", "report", "metrics"] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all capitalize flex items-center gap-1.5 ${
                  activeTab === tab
                    ? "bg-brand-500 text-white shadow-lg shadow-brand-500/25"
                    : "text-dark/50 dark:text-white/40 hover:text-dark dark:hover:text-white"
                }`}
              >
                {tab}
                {tab === "report" && report && <HugeiconsIcon icon={CheckmarkCircle02Icon} size={14} strokeWidth={1.8} />}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {activeTab === "progress" && (
            <div>

              {stream.events.length === 0 && !stream.isRunning && clinicalCase.status !== "completed" && (
                <div className="card p-12 text-center">
                  <p className="text-dark/50 dark:text-white/40 text-sm">Click &quot;Run Analysis&quot; to start the multi-agent pipeline</p>
                  <p className="text-xs text-dark/30 dark:text-white/25 mt-2">5 agents · local inference · MedPsy-4B reasoning</p>
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
                  <p className="text-dark/50 dark:text-white/40 text-sm">No report yet — run the analysis first</p>
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
                  <p className="text-dark/50 dark:text-white/40 text-sm">Metrics appear after analysis runs</p>
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
      <p className="font-mono text-sm">{value}</p>
    </div>
  );
}

function UrgencyBadge({ status }: { status: ClinicalCase["status"] }) {
  const map: Record<ClinicalCase["status"], string> = {
    pending: "badge-routine",
    analyzing: "badge bg-brand-500/10 text-brand-500",
    completed: "badge bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    error: "badge bg-red-500/10 text-red-600 dark:text-red-400",
  };
  return <span className={map[status]}>{status}</span>;
}
