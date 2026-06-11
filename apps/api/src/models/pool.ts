import { loadModel, unloadModel } from "@qvac/sdk";
import { MODELS, MODEL_SIZE_GB, MODEL_DISPLAY } from "./constants.js";
import { auditLog } from "../logging/audit.js";
import type { ModelHealthEntry } from "@diamesh/shared";

interface LoadedModel {
  modelId: string;
  key: keyof typeof MODELS;
  loadedAt: number;
}

interface ModelPool {
  // Always-loaded
  embeddings: LoadedModel | null;
  reasoningSmall: LoadedModel | null;
  // On-demand (mutually exclusive with each other when memory is tight)
  reasoningLarge: LoadedModel | null;
  vision: LoadedModel | null;
}

const pool: ModelPool = {
  embeddings: null,
  reasoningSmall: null,
  reasoningLarge: null,
  vision: null,
};

// Track ongoing load promises to prevent duplicate loads
const loadingPromises = new Map<string, Promise<string>>();

async function loadSingle(key: keyof typeof MODELS, extra?: Record<string, unknown>): Promise<string> {
  const src = MODELS[key];

  if (loadingPromises.has(key)) {
    return loadingPromises.get(key)!;
  }

  const promise = (async () => {
    const start = Date.now();
    auditLog({ event: "model_load_start", details: { model: key } });

    // IMPORTANT: force CPU backend. The default GPU/OpenCL backend produces
    // garbage tokens on Intel Macs (no working Metal/Vulkan path). CPU inference
    // is correct and is the supported path on Intel per QVAC system requirements.
    //
    // ctx_size:4096 — the documented working value (see docs/MODEL_NOTES.md).
    // 2048 was too tight: with tool instructions in the system prompt plus a
    // generous output budget, prompts were getting truncated mid-instruction.
    //
    // reasoning_budget:0 disables the model's <think> channel for BOTH Qwen3
    // and MedPsy (previously only applied to Qwen3 — MedPsy's <think> ran
    // unbounded and was eating the entire per-call token budget, leaving
    // little/nothing for the actual answer).
    const defaultConfig = key === "GTE_LARGE"
      ? { batchSize: 512, device: "cpu", gpuLayers: 0 }
      : {
          ctx_size: 4096,
          device: "cpu",
          gpu_layers: 0,
          reasoning_budget: 0,
        };
    const extraConfig = (extra?.["modelConfig"] as Record<string, unknown> | undefined) ?? {};

    const modelId = await loadModel({
      modelSrc: src,
      modelType: key === "GTE_LARGE" ? "llamacpp-embedding" : "llamacpp-completion",
      modelConfig: { ...defaultConfig, ...extraConfig },
      // Spread remaining extra keys (e.g. modelType override) but not modelConfig (already merged)
      ...Object.fromEntries(Object.entries(extra ?? {}).filter(([k]) => k !== "modelConfig")),
      onProgress: (p: { percentage: number }) => {
        if (p.percentage % 25 === 0) {
          auditLog({ event: "model_download_progress", details: { model: key, pct: p.percentage } });
        }
      },
    });

    auditLog({
      event: "model_load_complete",
      details: { model: key, durationMs: Date.now() - start },
    });

    loadingPromises.delete(key);
    return modelId;
  })();

  loadingPromises.set(key, promise);
  return promise;
}

// ─── Public API ────────────────────────────────────────────────────────────────
//
// CRITICAL CONSTRAINT (QVAC SDK bug on Intel x64): an embedding model and a
// completion model must NEVER be resident in the same worker at the same time.
// Loading a completion model while an embedding model is loaded corrupts the
// completion model and causes a SIGSEGV after ~20-50 generated tokens.
//
// We enforce this by treating embeddings and completion models as mutually
// exclusive: loading either kind unloads the other first.

export async function initBaseModels(): Promise<void> {
  // Load NOTHING at startup. Models load on demand. This is required to work
  // around a QVAC SDK bug on Intel x64 where the embedding addon, once loaded
  // into a worker, corrupts any subsequently-loaded completion model (SIGSEGV).
  // By loading on demand and never co-residing embeddings + completion, and by
  // doing all RAG retrieval before any completion model loads, we sidestep it.
  console.log("[pool] Ready (lazy model loading — see docs/MODEL_NOTES.md).");
}

// Ensure all completion models are unloaded (so embeddings can run safely)
async function unloadAllCompletion(): Promise<void> {
  if (pool.reasoningSmall) {
    await unloadModel({ modelId: pool.reasoningSmall.modelId });
    pool.reasoningSmall = null;
  }
  if (pool.reasoningLarge) {
    await unloadReasoningLarge();
  }
  if (pool.vision) {
    await unloadVision();
  }
}

// Ensure embeddings are unloaded (so a completion model can load safely)
async function unloadEmbeddings(): Promise<void> {
  if (pool.embeddings) {
    await unloadModel({ modelId: pool.embeddings.modelId });
    auditLog({ event: "model_unload", details: { model: "GTE_LARGE" } });
    pool.embeddings = null;
  }
}

// Embeddings — loads embeddings, unloading any completion model first.
export async function getEmbeddingsModel(): Promise<string> {
  if (pool.embeddings) return pool.embeddings.modelId;
  await unloadAllCompletion();
  const embId = await loadSingle("GTE_LARGE");
  pool.embeddings = { modelId: embId, key: "GTE_LARGE", loadedAt: Date.now() };
  return pool.embeddings.modelId;
}

// Small reasoning model — used by intake, knowledge, education agents
export async function getReasoningSmall(): Promise<string> {
  if (pool.reasoningSmall) return pool.reasoningSmall.modelId;
  // Free embeddings + large reasoner before loading (mutual exclusion + RAM)
  await unloadEmbeddings();
  if (pool.reasoningLarge) await unloadReasoningLarge();
  if (pool.vision) await unloadVision();
  const modelId = await loadSingle("REASONING_SMALL");
  pool.reasoningSmall = { modelId, key: "REASONING_SMALL", loadedAt: Date.now() };
  return modelId;
}

// Large reasoning model — used by reasoning + differential agents
export async function getReasoningLarge(): Promise<string> {
  if (pool.reasoningLarge) return pool.reasoningLarge.modelId;
  // Free embeddings + small reasoner + vision before loading
  await unloadEmbeddings();
  if (pool.reasoningSmall) {
    await unloadModel({ modelId: pool.reasoningSmall.modelId });
    pool.reasoningSmall = null;
  }
  if (pool.vision) await unloadVision();
  const modelId = await loadSingle("REASONING_LARGE");
  pool.reasoningLarge = { modelId, key: "REASONING_LARGE", loadedAt: Date.now() };
  return modelId;
}

export async function getVisionModel(): Promise<{ modelId: string }> {
  if (pool.vision) return { modelId: pool.vision.modelId };

  // Vision is a completion model — free embeddings + reasoners first
  await unloadEmbeddings();
  if (pool.reasoningLarge) await unloadReasoningLarge();
  if (pool.reasoningSmall) {
    await unloadModel({ modelId: pool.reasoningSmall.modelId });
    pool.reasoningSmall = null;
  }

  const modelId = await loadSingle("SMOLVLM2_500M", {
    modelType: "llamacpp-completion",
    modelConfig: {
      projectionModelSrc: MODELS["SMOLVLM2_500M_PROJ"],
      ctx_size: 2048,
    },
  });

  pool.vision = { modelId, key: "SMOLVLM2_500M", loadedAt: Date.now() };
  return { modelId };
}

export async function unloadVision(): Promise<void> {
  if (!pool.vision) return;
  await unloadModel({ modelId: pool.vision.modelId });
  auditLog({ event: "model_unload", details: { model: "SMOLVLM2_500M" } });
  pool.vision = null;
}

export async function unloadReasoningLarge(): Promise<void> {
  if (!pool.reasoningLarge) return;
  await unloadModel({ modelId: pool.reasoningLarge.modelId });
  auditLog({ event: "model_unload", details: { model: MODEL_DISPLAY.REASONING_LARGE } });
  pool.reasoningLarge = null;
}

export function getPoolHealth(): ModelHealthEntry[] {
  return [
    {
      name: "Embeddings (EmbeddingGemma-300M)",
      modelId: pool.embeddings?.modelId ?? null,
      status: pool.embeddings ? "loaded" : "unloaded",
      sizeGb: MODEL_SIZE_GB.GTE_LARGE,
    },
    {
      name: MODEL_DISPLAY.REASONING_SMALL,
      modelId: pool.reasoningSmall?.modelId ?? null,
      status: pool.reasoningSmall ? "loaded" : "unloaded",
      sizeGb: MODEL_SIZE_GB.REASONING_SMALL,
    },
    {
      name: MODEL_DISPLAY.REASONING_LARGE,
      modelId: pool.reasoningLarge?.modelId ?? null,
      status: pool.reasoningLarge ? "loaded" : "unloaded",
      sizeGb: MODEL_SIZE_GB.REASONING_LARGE,
    },
    {
      name: "SmolVLM2-500M (Vision)",
      modelId: pool.vision?.modelId ?? null,
      status: pool.vision ? "loaded" : "unloaded",
      sizeGb: MODEL_SIZE_GB.SMOLVLM2_500M,
    },
  ];
}
