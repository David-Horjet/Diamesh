"use client";
import type { ClinicalReport } from "@diamesh/shared";

export default function ClinicalReportView({ report }: { report: ClinicalReport }) {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Differentials */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-sm font-semibold text-slate-200">Differential Diagnosis</h3>
        </div>
        <div className="card-body space-y-3">
          {report.differentials.map((d) => (
            <div
              key={d.rank}
              className="flex items-start gap-4 p-3 bg-slate-950 rounded-lg border border-slate-800"
            >
              <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400 shrink-0">
                {d.rank}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium text-slate-100">{d.condition}</span>
                  {d.icd10Code && (
                    <span className="badge bg-slate-800 text-slate-400 font-mono">{d.icd10Code}</span>
                  )}
                  <span className={`badge-${d.probability}`}>{d.probability}</span>
                </div>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{d.rationale}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Clinical Assessment */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-sm font-semibold text-slate-200">Clinical Assessment</h3>
        </div>
        <div className="card-body">
          <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
            {report.assessment}
          </p>
        </div>
      </div>

      {/* Recommended Actions */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-sm font-semibold text-slate-200">Recommended Actions</h3>
        </div>
        <div className="card-body">
          <ol className="space-y-2">
            {report.recommendedActions.map((action, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                <span className="w-5 h-5 rounded-full bg-brand-900 text-brand-300 flex items-center justify-center text-xs shrink-0 mt-0.5">
                  {i + 1}
                </span>
                {action}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Patient Communication Guide */}
      <div className="card border-clinical-700/30">
        <div className="card-header bg-clinical-900/10">
          <h3 className="text-sm font-semibold text-clinical-500">Patient Communication Guide</h3>
          <p className="text-xs text-slate-500 mt-0.5">Guidance for discussing this case with the patient</p>
        </div>
        <div className="card-body">
          <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
            {report.educationContent}
          </p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="rounded-lg border border-yellow-900/50 bg-yellow-950/20 p-4">
        <p className="text-xs text-yellow-600 leading-relaxed">{report.disclaimer}</p>
      </div>
    </div>
  );
}
