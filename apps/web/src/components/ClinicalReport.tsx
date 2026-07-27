"use client";
import { HugeiconsIcon } from "@hugeicons/react";
import { Stethoscope02Icon, ClipboardIcon, TaskDone01Icon, ChatBotIcon, AlertDiamondIcon, CheckmarkCircle02Icon, AlertCircleIcon } from "@hugeicons/core-free-icons";
import type { ClinicalReport } from "@diamesh/shared";

export default function ClinicalReportView({ report }: { report: ClinicalReport }) {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Differentials */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <HugeiconsIcon icon={Stethoscope02Icon} size={16} strokeWidth={1.8} className="text-brand-500" />
            Differential Diagnosis
          </h3>
        </div>
        <div className="card-body space-y-3">
          {report.differentials.map((d) => (
            <div
              key={d.rank}
              className="flex items-start gap-4 p-3 bg-black/[0.02] dark:bg-white/[0.03] rounded-xl border border-black/[0.05] dark:border-white/10"
            >
              <div className="w-7 h-7 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-xs font-bold text-dark/50 dark:text-white/40 shrink-0">
                {d.rank}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium">{d.condition}</span>
                  {d.icd10Code && (
                    d.icd10Verified ? (
                      <span
                        title="Confirmed against the local ICD-10-CM database"
                        className="badge bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono inline-flex items-center gap-1"
                      >
                        <HugeiconsIcon icon={CheckmarkCircle02Icon} size={12} strokeWidth={2} />
                        {d.icd10Code}
                      </span>
                    ) : (
                      <span
                        title="Model-suggested code — NOT found in the local ICD-10-CM database. Verify before use."
                        className="badge bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 font-mono inline-flex items-center gap-1"
                      >
                        <HugeiconsIcon icon={AlertCircleIcon} size={12} strokeWidth={2} />
                        {d.icd10Code} · unverified
                      </span>
                    )
                  )}
                  <span className={`badge-${d.probability}`}>{d.probability}</span>
                </div>
                <p className="text-xs text-dark/50 dark:text-white/40 mt-1 leading-relaxed">{d.rationale}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Clinical Assessment */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <HugeiconsIcon icon={ClipboardIcon} size={16} strokeWidth={1.8} className="text-brand-500" />
            Clinical Assessment
          </h3>
        </div>
        <div className="card-body">
          <p className="text-sm text-dark/70 dark:text-white/70 leading-relaxed whitespace-pre-wrap">
            {report.assessment}
          </p>
        </div>
      </div>

      {/* Recommended Actions */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <HugeiconsIcon icon={TaskDone01Icon} size={16} strokeWidth={1.8} className="text-brand-500" />
            Recommended Actions
          </h3>
        </div>
        <div className="card-body">
          <ol className="space-y-2">
            {report.recommendedActions.map((action, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-dark/70 dark:text-white/70">
                <span className="w-5 h-5 rounded-full bg-brand-500/10 text-brand-500 flex items-center justify-center text-xs shrink-0 mt-0.5">
                  {i + 1}
                </span>
                {action}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Patient Communication Guide */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <HugeiconsIcon icon={ChatBotIcon} size={16} strokeWidth={1.8} className="text-brand-500" />
            Patient Communication Guide
          </h3>
          <p className="text-xs text-dark/40 dark:text-white/30 mt-0.5">Guidance for discussing this case with the patient</p>
        </div>
        <div className="card-body">
          <p className="text-sm text-dark/70 dark:text-white/70 leading-relaxed whitespace-pre-wrap">
            {report.educationContent}
          </p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 flex items-start gap-2">
        <HugeiconsIcon icon={AlertDiamondIcon} size={14} strokeWidth={1.8} className="text-yellow-600 dark:text-yellow-400 mt-0.5 shrink-0" />
        <p className="text-xs text-yellow-700 dark:text-yellow-400 leading-relaxed">{report.disclaimer}</p>
      </div>
    </div>
  );
}
