"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import type { AgentProgressEvent } from "@diamesh/shared";

const BASE = process.env["NEXT_PUBLIC_API_URL"] ?? "http://localhost:3001";

export interface SSEState {
  events: AgentProgressEvent[];
  isRunning: boolean;
  error: string | null;
  isComplete: boolean;
}

export function useAnalysisStream(caseId: string | null) {
  const [state, setState] = useState<SSEState>({
    events: [],
    isRunning: false,
    error: null,
    isComplete: false,
  });

  const abortRef = useRef<AbortController | null>(null);

  const start = useCallback(async () => {
    if (!caseId) return;

    setState({ events: [], isRunning: true, error: null, isComplete: false });
    abortRef.current = new AbortController();

    try {
      const res = await fetch(`${BASE}/api/analyze/${caseId}`, {
        method: "POST",
        signal: abortRef.current.signal,
      });

      if (!res.ok || !res.body) {
        throw new Error(`Analysis failed: ${res.statusText}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const raw = line.slice(6).trim();
          if (!raw) continue;
          try {
            const event = JSON.parse(raw) as AgentProgressEvent;
            setState((prev) => ({
              ...prev,
              events: [...prev.events, event],
              isComplete: event.type === "pipeline_complete",
              isRunning: event.type !== "pipeline_complete",
            }));
          } catch { /* malformed SSE line */ }
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") return;
      setState((prev) => ({
        ...prev,
        isRunning: false,
        error: err instanceof Error ? err.message : "Unknown error",
      }));
    }
  }, [caseId]);

  const stop = useCallback(() => {
    abortRef.current?.abort();
    setState((prev) => ({ ...prev, isRunning: false }));
  }, []);

  useEffect(() => {
    return () => { abortRef.current?.abort(); };
  }, []);

  return { ...state, start, stop };
}
