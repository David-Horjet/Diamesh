# Model Notes — QVAC SDK Inference on Intel Mac

## Summary

Diamesh is designed around **QVAC MedPsy** as its clinical reasoning model. During
development on an **Intel MacBook (darwin-x64, 8 GB RAM, `@qvac/sdk` 0.12.1)** we
hit two reproducible inference bugs in the QVAC SDK. We isolated both with a clean
test matrix and report them here for transparency (and to the QVAC team).

To keep the application fully working today, Diamesh runs on **Qwen3** (QVAC's own
catalog model, closest open equivalent to MedPsy's Qwen3 base) via a one-line
config switch. Set `USE_MEDPSY=true` in `apps/api/.env` to switch back to MedPsy
on hardware where it runs correctly (e.g. Apple Silicon) or once the SDK bug is fixed.

## Test matrix

| Model | Backend | Result |
| --- | --- | --- |
| `QWEN3_1_7B_INST_Q4` (catalog) | GPU (default) | ❌ Garbage tokens (`"0@\"@\"@…"`) |
| `QWEN3_1_7B_INST_Q4` (catalog) | **CPU** (`device:"cpu"`, `gpu_layers:0`) | ✅ **Correct** — coherent output, ~14 tok/s |
| `qvac/MedPsy-1.7B-GGUF` (q4_k_m-imat) | GPU (default) | ❌ Garbage tokens (`" cal lefrler call…"`) |
| `qvac/MedPsy-1.7B-GGUF` (q4_k_m-imat) | CPU | ⚠️ Coherent for ~20 tokens, then **SIGSEGV** |
| `qvac/MedPsy-1.7B-GGUF` (q8_0) | CPU | ⚠️ Same — **SIGSEGV** after ~50 generated tokens |

## Bug 1 — GPU/OpenCL backend emits garbage on Intel Mac

With the default config (`device:"gpu"`, `gpu_layers:99`), **every** model — including
QVAC's own catalog `QWEN3_1_7B_INST_Q4` — produces incoherent token soup at ~8 tok/s.
There appears to be no working GPU backend on Intel Mac, and the default does not fall
back to CPU.

**Workaround (applied in `apps/api/src/models/pool.ts`):** force CPU for all models.

```ts
modelConfig: { device: "cpu", gpu_layers: 0, ctx_size: 4096 }
// embeddings use the camelCase variant: { device: "cpu", gpuLayers: 0 }
```

With CPU forced, `QWEN3_1_7B_INST_Q4` returns correct, coherent output.

## Bug 2 — MedPsy GGUF SIGSEGVs on the CPU backend

With `device:"cpu"`, `QWEN3_1_7B_INST_Q4` runs to completion perfectly, but
`qvac/MedPsy-1.7B-GGUF` (both `q4_k_m-imat` and `q8_0`) crashes with **SIGSEGV after
generating ~50 tokens**. Reproduces with a trivial prompt and `predict: 100`. MedPsy
is a Qwen3-1.7B fine-tune, so the architecture is identical to the catalog model that
works — the crash appears specific to something in the MedPsy GGUF (tokenizer/template/
metadata) on the x64 CPU build.

## Repro (minimal)

```ts
import { loadModel, completion } from "@qvac/sdk";

const modelId = await loadModel({
  modelSrc: "<path-to>/medpsy-1.7b-q8_0.gguf",
  modelType: "llamacpp-completion",
  modelConfig: { ctx_size: 1024, device: "cpu", gpu_layers: 0 },
});

const run = completion({
  modelId,
  history: [{ role: "user", content: "What is glaucoma?" }],
  stream: true,
  generationParams: { predict: 100 },
});
for await (const ev of run.events) {
  if (ev.type === "contentDelta") process.stdout.write(ev.text); // SIGSEGV mid-stream
}
```

## Switching back to MedPsy

```bash
# apps/api/.env
USE_MEDPSY=true
```

Then run `npm run models:download` (if not already) and restart the API. No code
changes are required — `apps/api/src/models/constants.ts` resolves the model paths
and display names from this flag.
