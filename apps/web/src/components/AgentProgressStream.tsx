"use client";
import type { AgentProgressEvent, AgentName } from "@diamesh/shared";

const AGENT_LABELS: Record<AgentName, string> = {
  intake: "Intake Analysis",
  vision: "Image Analysis",
  knowledge: "Knowledge Retrieval",
  reasoning: "Clinical Reasoning",
  differential: "Differential Diagnosis",
  education: "Patient Education",
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
  ) as Record<AgentName, AgentState>;

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
      state.status === "running" ? "border-brand-700 shadow-[0_0_12px_rgba(14,165,233,0.1)]" :
      state.status === "complete" ? "border-slate-800" :
      state.status === "error" ? "border-red-900" :
      "border-slate-800 opacity-50"
    }`}>
      <div className="card-header flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <StatusIcon status={state.status} isStreaming={isActivelyStreaming} />
          <span className="text-sm font-medium text-slate-200">{label}</span>
          {state.toolCalls.length > 0 && (
            <div className="flex gap-1">
              {state.toolCalls.map((t, i) => (
                <span key={i} className="badge bg-brand-950 text-brand-400 border border-brand-900 text-xs">
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
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
            >
              {showThinking ? "Hide" : "Show"} reasoning
            </button>
          )}
        </div>
      </div>

      {(state.status === "running" || state.status === "complete") && state.tokens && (
        <div className="card-body pt-3">
          {showThinking && state.thinking && (
            <div className="mb-3">
              <p className="text-xs text-slate-600 uppercase tracking-wide mb-1">Thinking trace</p>
              <div className="thinking-block max-h-40 overflow-y-auto">{state.thinking}</div>
            </div>
          )}
          <div className="agent-token-stream max-h-48 overflow-y-auto text-xs">
            {state.tokens}
            {isActivelyStreaming && (
              <span className="inline-block w-1.5 h-3.5 bg-brand-400 ml-0.5 animate-pulse" />
            )}
          </div>
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
    return <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">✓</div>;
  }
  if (status === "error") {
    return <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-white text-xs">✕</div>;
  }
  return <div className="w-4 h-4 rounded-full border-2 border-slate-700" />;
}

function MetricsPill({ metrics }: { metrics: NonNullable<AgentState["metrics"]> }) {
  return (
    <div className="flex items-center gap-2 text-xs text-slate-500">
      <span className="bg-slate-800 px-2 py-0.5 rounded">{metrics.modelUsed}</span>
      <span>{(metrics.durationMs / 1000).toFixed(1)}s</span>
      <span>{metrics.tokensOut}t</span>
    </div>
  );
}

// useState needs to be imported for the component to work
import { useState } from "react";
