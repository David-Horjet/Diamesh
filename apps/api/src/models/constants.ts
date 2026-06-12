import path from "path";
import { existsSync } from "fs";
import { resolve } from "path";
import { fileURLToPath } from "url";
import * as sdk from "@qvac/sdk";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MODELS_DIR = resolve(__dirname, "../../models");

// MedPsy models are downloaded locally first via scripts/download-models.sh
// because HuggingFace XET storage is not compatible with QVAC's HTTP downloader.
function medpsyPath(filename: string): string {
  const local = resolve(MODELS_DIR, filename);
  if (!existsSync(local)) {
    console.warn(`[pool] MedPsy model not found at ${local}. Run: npm run models:download`);
  }
  return local;
}

// Runtime catalog constants (the bundled .d.ts omits some, so resolve dynamically)
const sdkConst = (name: string): string => (sdk as Record<string, unknown>)[name] as string;

/**
 * MODEL SELECTION — On Apple Silicon (current target hardware), MedPsy runs
 * correctly and `USE_MEDPSY=true` is the default.
 *
 * On Intel Mac (darwin-x64, @qvac/sdk 0.12.1) we previously hit a known QVAC
 * SDK bug where the MedPsy GGUF SIGSEGVs after ~50 generated tokens on CPU
 * (while the identical-architecture Qwen3-1.7B runs fine). Set
 * USE_MEDPSY=false there to fall back to Qwen3 with zero code changes.
 *
 * See docs/MODEL_NOTES.md for the full repro and the bug report sent to QVAC.
 */
const USE_MEDPSY = process.env["USE_MEDPSY"] === "true";

export const MODELS = {
  // Clinical reasoning model. MedPsy when available; Qwen3 fallback otherwise.
  REASONING_LARGE: USE_MEDPSY
    ? medpsyPath("medpsy-4b-q4_k_m-imat.gguf")
    : sdkConst("QWEN3_1_7B_INST_Q4"),
  REASONING_SMALL: USE_MEDPSY
    ? medpsyPath("medpsy-1.7b-q4_k_m-imat.gguf")
    : sdkConst("QWEN3_1_7B_INST_Q4"),

  // Vision — multimodal image analysis (text-only output fed into the reasoner)
  SMOLVLM2_500M: "registry://hf/ggml-org/SmolVLM2-500M-Video-Instruct-GGUF/resolve/ccd7aae53bcb1997355c2f094959e72b3642ce17/SmolVLM2-500M-Video-Instruct-Q8_0.gguf",
  SMOLVLM2_500M_PROJ: "registry://hf/ggml-org/SmolVLM2-500M-Video-Instruct-GGUF/resolve/ccd7aae53bcb1997355c2f094959e72b3642ce17/mmproj-SmolVLM2-500M-Video-Instruct-Q8_0.gguf",

  // Embeddings — 265MB Q4 local file, used for RAG
  GTE_LARGE: medpsyPath("embeddinggemma-300m-Q4_0.gguf"),
} as const;

export type ModelKey = "REASONING_LARGE" | "REASONING_SMALL" | "SMOLVLM2_500M" | "SMOLVLM2_500M_PROJ" | "GTE_LARGE";

// Human-readable model name for logs/UI (reflects what's actually running)
export const MODEL_DISPLAY = {
  REASONING_LARGE: USE_MEDPSY ? "MedPsy-4B" : "Qwen3-1.7B",
  REASONING_SMALL: USE_MEDPSY ? "MedPsy-1.7B" : "Qwen3-1.7B",
} as const;

// Approximate RAM footprint in GB per model
export const MODEL_SIZE_GB: Record<ModelKey, number> = {
  REASONING_LARGE: 1.2,
  REASONING_SMALL: 1.2,
  SMOLVLM2_500M: 0.6,
  SMOLVLM2_500M_PROJ: 0.1,
  GTE_LARGE: 0.27,
};
