"use client";
import { useState, type ReactNode } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { CheckmarkCircle02Icon, CancelCircleIcon, Brain02Icon } from "@hugeicons/core-free-icons";
import type { AgentProgressEvent, AgentName, Differential } from "@diamesh/shared";

const AGENT_LABELS: Record<AgentName, string> = {
  intake: "Intake Analysis",
  vision: "Image Analysis",
  knowledge: "Knowledge Retrieval",
  reasoning: "Clinical Reasoning",
  differential: "Differential Diagnosis",
  education: "Patient Communication Guide",
};

const AGENT_ORDER: AgentName[] = [
  "intake", "vision", "knowledge", "reasoning", "differential", "education",
];

interface AgentState {
  status: "pending" | "running" | "complete" | "error";
  tokens: string;
  thinking: string;
  toolCalls: string[];
  metrics?: { modelUsed: string; durationMs: number; tokensOut: number; ttft: number };
}

function buildAgentStates(events: AgentProgressEvent[]): Record<AgentName, AgentState> {
  const states = Object.fromEntries(
    AGENT_ORDER.map((n) => [n, { status: "pending" as const, tokens: "", thinking: "", toolCalls: [] }])
  ) as unknown as Record<AgentName, AgentState>;

  for (const e of events) {
    const s = states[e.agentName];
    if (!s) continue;
    switch (e.type) {
      case "agent_start":
        s.status = "running";
        break;
      case "agent_token":
        s.tokens += e.token ?? "";
        break;
      case "agent_thinking":
        s.thinking += e.thinking ?? "";
        break;
      case "agent_tool_call":
        if (e.toolCall) s.toolCalls.push(e.toolCall.name);
        break;
      case "agent_complete":
        s.status = "complete";
        if (e.metrics) s.metrics = e.metrics;
        break;
      case "agent_error":
        s.status = "error";
        break;
    }
  }

  return states;
}

export default function AgentProgressStream({ events, isRunning }: {
  events: AgentProgressEvent[];
  isRunning: boolean;
}) {
  const states = buildAgentStates(events);

  return (
    <div className="space-y-3">
      {AGENT_ORDER.map((name) => {
        const state = states[name]!;
        const skip = name === "vision" && events.every((e) => e.agentName !== "vision");

        if (skip && state.status === "pending") return null;

        return (
          <AgentCard
            key={name}
            name={name}
            label={AGENT_LABELS[name]}
            state={state}
            isActivelyStreaming={isRunning && state.status === "running"}
          />
        );
      })}
    </div>
  );
}

// Intake, knowledge and differential produce JSON for the *next* pipeline
// step, not for clinicians to read directly. Once those agents finish, render
// a formatted clinical summary instead — never raw `{ "key": "value" }` text.
const JSON_OUTPUT_AGENTS = new Set<AgentName>(["intake", "knowledge", "differential"]);

interface IntakeOutput {
  structuredSummary?: string;
  keyFindings?: string[];
  suggestedSearchTerms?: string[];
  urgencyLevel?: "routine" | "urgent" | "emergent";
}

interface DifferentialOutput {
  differentials?: Differential[];
  recommendedActions?: string[];
}

function extractJson<T>(text: string, kind: "object" | "array"): T | null {
  const match = text.match(kind === "object" ? /\{[\s\S]*\}/ : /\[[\s\S]*\]/);
  if (!match) return null;
  try {
    return JSON.parse(match[0]) as T;
  } catch {
    return null;
  }
}

// Renders a finished agent's output as a readable clinical summary. Returns
// null if it can't be parsed, so the caller can fall back to raw text.
function renderStructuredOutput(name: AgentName, tokens: string): ReactNode | null {
  if (name === "intake") {
    const r = extractJson<IntakeOutput>(tokens, "object");
    if (!r) return null;
    return (
      <div className="space-y-3">
        {r.structuredSummary && (
          <p className="text-sm text-dark/70 dark:text-white/70 leading-relaxed">{r.structuredSummary}</p>
        )}
        {r.keyFindings && r.keyFindings.length > 0 && (
          <div>
            <p className="text-xs text-dark/35 dark:text-white/30 uppercase tracking-wide mb-1">Key Findings</p>
            <ul className="space-y-1">
              {r.keyFindings.map((f, i) => (
                <li key={i} className="text-sm text-dark/70 dark:text-white/70 flex gap-2">
                  <span className="text-dark/25 dark:text-white/20">•</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="flex flex-wrap items-center gap-2">
          {r.urgencyLevel && (
            <span className={`badge-${r.urgencyLevel}`}>{r.urgencyLevel} priority</span>
          )}
          {r.suggestedSearchTerms && r.suggestedSearchTerms.length > 0 && (
            <span className="text-xs text-dark/40 dark:text-white/35">Looking into: {r.suggestedSearchTerms.join(", ")}</span>
          )}
        </div>
      </div>
    );
  }

  if (name === "knowledge") {
    const guidelines = extractJson<string[]>(tokens, "array");
    if (!guidelines) return null;
    if (guidelines.length === 0) {
      return <p className="text-sm text-dark/50 dark:text-white/40">No specific guidelines matched this case.</p>;
    }
    return (
      <div>
        <p className="text-xs text-dark/35 dark:text-white/30 uppercase tracking-wide mb-1">Relevant Clinical Guidelines</p>
        <ul className="space-y-1">
          {guidelines.map((g, i) => (
            <li key={i} className="text-sm text-dark/70 dark:text-white/70 flex gap-2">
              <span className="text-dark/25 dark:text-white/20">•</span>
              <span>{g}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (name === "differential") {
    const r = extractJson<DifferentialOutput>(tokens, "object");
    if (!r || !r.differentials) return null;
    return (
      <div className="space-y-3">
        <div className="space-y-2">
          {r.differentials.map((d) => (
            <div key={d.rank} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-xs font-bold text-dark/50 dark:text-white/40 shrink-0">
                {d.rank}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium">{d.condition}</span>
                  {d.icd10Code && (
                    <span className="badge bg-black/5 dark:bg-white/10 text-dark/50 dark:text-white/40 font-mono">{d.icd10Code}</span>
                  )}
                  {d.probability && <span className={`badge-${d.probability}`}>{d.probability}</span>}
                </div>
                {d.rationale && <p className="text-xs text-dark/50 dark:text-white/40 mt-1 leading-relaxed">{d.rationale}</p>}
              </div>
            </div>
          ))}
        </div>
        {r.recommendedActions && r.recommendedActions.length > 0 && (
          <div>
            <p className="text-xs text-dark/35 dark:text-white/30 uppercase tracking-wide mb-1">Recommended Next Steps</p>
            <ol className="space-y-1">
              {r.recommendedActions.map((a, i) => (
                <li key={i} className="text-sm text-dark/70 dark:text-white/70">
                  {i + 1}. {a}
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    );
  }

  return null;
}

function AgentCard({
  name,
  label,
  state,
  isActivelyStreaming,
}: {
  name: AgentName;
  label: string;
  state: AgentState;
  isActivelyStreaming: boolean;
}) {
  const [showThinking, setShowThinking] = useState(false);

  return (
    <div className={`card transition-all duration-300 ${
      state.status === "running" ? "border-brand-500/40 shadow-[0_0_16px_rgba(82,111,251,0.12)]" :
      state.status === "error" ? "border-red-500/30" :
      state.status === "pending" ? "opacity-50" :
      ""
    }`}>
      <div className="card-header flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <StatusIcon status={state.status} isStreaming={isActivelyStreaming} />
          <span className="text-sm font-medium">{label}</span>
          {state.toolCalls.length > 0 && (
            <div className="flex gap-1">
              {state.toolCalls.map((t, i) => (
                <span key={i} className="badge bg-brand-500/10 text-brand-500 border border-brand-500/20 text-xs">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          {state.metrics && (
            <MetricsPill metrics={state.metrics} />
          )}
          {state.thinking && (
            <button
              onClick={() => setShowThinking(!showThinking)}
              className="text-xs text-dark/40 dark:text-white/30 hover:text-dark dark:hover:text-white transition-colors flex items-center gap-1"
            >
              <HugeiconsIcon icon={Brain02Icon} size={14} strokeWidth={1.8} />
              {showThinking ? "Hide" : "Show"} reasoning
            </button>
          )}
        </div>
      </div>

      {(state.status === "complete" ||
        ((state.status === "running") && (state.tokens || state.thinking))) && (
        <div className="card-body pt-3">
          {showThinking && state.thinking && (
            <div className="mb-3">
              <p className="text-xs text-dark/35 dark:text-white/30 uppercase tracking-wide mb-1">Thinking trace</p>
              <div className="thinking-block max-h-40 overflow-y-auto">{state.thinking}</div>
            </div>
          )}
          {JSON_OUTPUT_AGENTS.has(name) ? (
            state.status === "complete" ? (
              <div className="bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/10 rounded-xl p-4 max-h-64 overflow-y-auto">
                {state.tokens ? (
                  renderStructuredOutput(name, state.tokens) ?? (
                    <p className="text-sm text-dark/50 dark:text-white/40 leading-relaxed whitespace-pre-wrap">{state.tokens}</p>
                  )
                ) : (
                  <p className="text-sm text-dark/40 dark:text-white/35">No structured output was returned for this step.</p>
                )}
              </div>
            ) : (
              isActivelyStreaming && (
                <p className="text-xs text-dark/40 dark:text-white/35 flex items-center gap-2">
                  <span className="inline-block w-1.5 h-3.5 bg-brand-500 animate-pulse" />
                  Analyzing findings...
                </p>
              )
            )
          ) : state.tokens ? (
            <div className="bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/10 rounded-xl p-4 text-sm text-dark/70 dark:text-white/70 leading-relaxed whitespace-pre-wrap max-h-64 overflow-y-auto">
              {state.tokens}
              {isActivelyStreaming && (
                <span className="inline-block w-1.5 h-3.5 bg-brand-500 ml-0.5 animate-pulse" />
              )}
            </div>
          ) : state.status === "complete" ? (
            <div className="bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/10 rounded-xl p-4">
              <p className="text-sm text-dark/40 dark:text-white/35">No response was generated for this step.</p>
            </div>
          ) : (
            isActivelyStreaming && (
              <span className="inline-block w-1.5 h-3.5 bg-brand-500 animate-pulse" />
            )
          )}
        </div>
      )}
    </div>
  );
}

function StatusIcon({ status, isStreaming }: { status: AgentState["status"]; isStreaming: boolean }) {
  if (status === "running") {
    return (
      <div className={`w-4 h-4 rounded-full border-2 border-brand-500 ${isStreaming ? "animate-spin border-t-transparent" : ""}`} />
    );
  }
  if (status === "complete") {
    return <HugeiconsIcon icon={CheckmarkCircle02Icon} size={16} strokeWidth={1.8} className="text-emerald-500" />;
  }
  if (status === "error") {
    return <HugeiconsIcon icon={CancelCircleIcon} size={16} strokeWidth={1.8} className="text-red-500" />;
  }
  return <div className="w-4 h-4 rounded-full border-2 border-dark/15 dark:border-white/15" />;
}

function MetricsPill({ metrics }: { metrics: NonNullable<AgentState["metrics"]> }) {
  return (
    <div className="flex items-center gap-2 text-xs text-dark/40 dark:text-white/35">
      <span className="bg-black/5 dark:bg-white/10 px-2 py-0.5 rounded">{metrics.modelUsed}</span>
      <span>{(metrics.durationMs / 1000).toFixed(1)}s</span>
      <span>{metrics.tokensOut}t</span>
    </div>
  );
}
