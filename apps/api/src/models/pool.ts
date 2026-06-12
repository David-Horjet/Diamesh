import { loadModel, unloadModel } from "@qvac/sdk";
import { MODELS, MODEL_SIZE_GB, MODEL_DISPLAY } from "./constants.js";
import { auditLog } from "../logging/audit.js";
import { getPeerKey, recordDelegationSuccess, recordDelegationFallback } from "../p2p/consumer.js";
import type { ModelHealthEntry } from "@diamesh/shared";

interface LoadedModel {
  modelId: string;
  key: keyof typeof MODELS;
  loadedAt: number;
  inferenceMode: "local" | "delegated";
}

interface ModelLoadResult {
  modelId: string;
  inferenceMode: "local" | "delegated";
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
const loadingPromises = new Map<string, Promise<ModelLoadResult>>();

// Apple Silicon (darwin/arm64) has a working Metal backend — GPU inference is
// correct AND faster there (measured ~28-38% more tok/s on an M4 with these
// exact MedPsy GGUFs, see docs/MODEL_NOTES.md). Intel Macs (darwin/x64) hit a
// documented QVAC SDK bug where the GPU/OpenCL backend emits garbage tokens for
// every model, so those must stay on CPU.
const USE_GPU = process.platform === "darwin" && process.arch === "arm64";

async function loadSingle(key: keyof typeof MODELS, extra?: Record<string, unknown>): Promise<ModelLoadResult> {
  const src = MODELS[key];

  if (loadingPromises.has(key)) {
    return loadingPromises.get(key)!;
  }

  const promise = (async (): Promise<ModelLoadResult> => {
    try {
      const start = Date.now();
      const modelType = key === "GTE_LARGE" ? "llamacpp-embedding" : "llamacpp-completion";
      const extraConfig = (extra?.["modelConfig"] as Record<string, unknown> | undefined) ?? {};
      const restExtra = Object.fromEntries(Object.entries(extra ?? {}).filter(([k]) => k !== "modelConfig"));
      const onProgress = (p: { percentage: number }): void => {
        if (p.percentage % 25 === 0) {
          auditLog({ event: "model_download_progress", details: { model: key, pct: p.percentage } });
        }
      };

      // ── P2P delegation ────────────────────────────────────────────────────
      // Embeddings (GTE_LARGE) are always local: the Intel-Mac bugs this is
      // working around (see docs/MODEL_NOTES.md) are specific to MedPsy/Qwen3
      // completion GGUFs, and EmbeddingGemma already runs fine everywhere
      // we've tested. For completion models, if a peer provider is configured
      // (Settings → Consumer Mode), try delegating first — execution then
      // happens on the PROVIDER's hardware, so this device's local bugs never
      // come into play.
      const peerKey = key === "GTE_LARGE" ? null : getPeerKey();

      if (peerKey) {
        auditLog({ event: "model_load_start", details: { model: key, device: "delegated" } });
        try {
          // Omit device/gpu_layers — those describe THIS machine, but the
          // provider runs the model on its own hardware. Keep model-behavior
          // config (ctx_size, reasoning_budget) plus caller extras (e.g.
          // vision's projectionModelSrc/ctx_size override).
          const modelId = await loadModel({
            modelSrc: src,
            modelType,
            modelConfig: { ctx_size: 4096, reasoning_budget: 0, ...extraConfig },
            delegate: { providerPublicKey: peerKey, timeout: 60_000, fallbackToLocal: true },
            ...restExtra,
            onProgress,
          });

          auditLog({
            event: "model_load_complete",
            details: { model: key, durationMs: Date.now() - start, inferenceMode: "delegated" },
          });
          recordDelegationSuccess(key);
          return { modelId, inferenceMode: "delegated" };
        } catch {
          recordDelegationFallback(key, "delegation failed");
          // fall through to local load below
        }
      }

      // ── Local load ───────────────────────────────────────────────────────
      // ctx_size:4096 — the documented working value (see docs/MODEL_NOTES.md).
      // 2048 was too tight: with tool instructions in the system prompt plus a
      // generous output budget, prompts were getting truncated mid-instruction.
      //
      // reasoning_budget:0 disables the model's <think> channel for BOTH Qwen3
      // and MedPsy (previously only applied to Qwen3 — MedPsy's <think> ran
      // unbounded and was eating the entire per-call token budget, leaving
      // little/nothing for the actual answer).
      //
      // device/gpu_layers — see USE_GPU above. Embeddings stay on CPU regardless:
      // they're not the pipeline bottleneck and the GTE_LARGE/GPU path hasn't
      // been verified.
      const device = key === "GTE_LARGE" ? "cpu" : USE_GPU ? "gpu" : "cpu";
      auditLog({ event: "model_load_start", details: { model: key, device } });

      const defaultConfig = key === "GTE_LARGE"
        ? { batchSize: 512, device: "cpu", gpuLayers: 0 }
        : {
            ctx_size: 4096,
            device: USE_GPU ? "gpu" : "cpu",
            gpu_layers: USE_GPU ? 99 : 0,
            reasoning_budget: 0,
          };

      const modelId = await loadModel({
        modelSrc: src,
        modelType,
        modelConfig: { ...defaultConfig, ...extraConfig },
        // Spread remaining extra keys (e.g. modelType override) but not modelConfig (already merged)
        ...restExtra,
        onProgress,
      });

      auditLog({
        event: "model_load_complete",
        details: { model: key, durationMs: Date.now() - start },
      });

      return { modelId, inferenceMode: "local" };
    } finally {
      loadingPromises.delete(key);
    }
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
// Never delegated (see loadSingle) so this stays a plain modelId.
export async function getEmbeddingsModel(): Promise<string> {
  if (pool.embeddings) return pool.embeddings.modelId;
  await unloadAllCompletion();
  const { modelId } = await loadSingle("GTE_LARGE");
  pool.embeddings = { modelId, key: "GTE_LARGE", loadedAt: Date.now(), inferenceMode: "local" };
  return pool.embeddings.modelId;
}

// Small reasoning model — used by intake, knowledge, education agents
export async function getReasoningSmall(): Promise<ModelLoadResult> {
  if (pool.reasoningSmall) {
    return { modelId: pool.reasoningSmall.modelId, inferenceMode: pool.reasoningSmall.inferenceMode };
  }
  // Free embeddings + large reasoner before loading (mutual exclusion + RAM)
  await unloadEmbeddings();
  if (pool.reasoningLarge) await unloadReasoningLarge();
  if (pool.vision) await unloadVision();
  const { modelId, inferenceMode } = await loadSingle("REASONING_SMALL");
  pool.reasoningSmall = { modelId, key: "REASONING_SMALL", loadedAt: Date.now(), inferenceMode };
  return { modelId, inferenceMode };
}

// Large reasoning model — used by reasoning + differential agents
export async function getReasoningLarge(): Promise<ModelLoadResult> {
  if (pool.reasoningLarge) {
    return { modelId: pool.reasoningLarge.modelId, inferenceMode: pool.reasoningLarge.inferenceMode };
  }
  // Free embeddings + small reasoner + vision before loading
  await unloadEmbeddings();
  if (pool.reasoningSmall) {
    await unloadModel({ modelId: pool.reasoningSmall.modelId });
    pool.reasoningSmall = null;
  }
  if (pool.vision) await unloadVision();
  const { modelId, inferenceMode } = await loadSingle("REASONING_LARGE");
  pool.reasoningLarge = { modelId, key: "REASONING_LARGE", loadedAt: Date.now(), inferenceMode };
  return { modelId, inferenceMode };
}

export async function getVisionModel(): Promise<ModelLoadResult> {
  if (pool.vision) return { modelId: pool.vision.modelId, inferenceMode: pool.vision.inferenceMode };

  // Vision is a completion model — free embeddings + reasoners first
  await unloadEmbeddings();
  if (pool.reasoningLarge) await unloadReasoningLarge();
  if (pool.reasoningSmall) {
    await unloadModel({ modelId: pool.reasoningSmall.modelId });
    pool.reasoningSmall = null;
  }

  const { modelId, inferenceMode } = await loadSingle("SMOLVLM2_500M", {
    modelType: "llamacpp-completion",
    modelConfig: {
      projectionModelSrc: MODELS["SMOLVLM2_500M_PROJ"],
      ctx_size: 2048,
    },
  });

  pool.vision = { modelId, key: "SMOLVLM2_500M", loadedAt: Date.now(), inferenceMode };
  return { modelId, inferenceMode };
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
