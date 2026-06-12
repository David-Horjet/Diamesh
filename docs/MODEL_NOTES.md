# Model Notes — QVAC SDK Inference

## Current target hardware: Apple Silicon (M4, 16GB RAM)

Diamesh's primary dev/demo machine is now a **MacBook Air M4, 16GB RAM,
`@qvac/sdk` 0.12.x**. On this hardware:

- `USE_MEDPSY=true` works end-to-end — MedPsy-1.7B and MedPsy-4B run correctly
  with no crashes.
- The **Metal GPU backend is correct and faster than CPU**. Measured on this
  machine with `ctx_size:4096, reasoning_budget:0`:

  | Model | Backend | Load time | Generation |
  | --- | --- | --- | --- |
  | MedPsy-1.7B | CPU | 1637ms | 60.3 tok/s |
  | MedPsy-1.7B | GPU/Metal | 812ms | 77.1 tok/s |
  | MedPsy-4B | CPU | 4182ms | 26.9 tok/s |
  | MedPsy-4B | GPU/Metal | 1279ms | 37.1 tok/s |

  Both backends produced coherent, correct output. `reasoning_budget:0`
  suppresses the **opening** `<think>` tag (it's part of the chat-template
  prefill and is never streamed), but see below — the model can still stream
  its full reasoning as visible text.

- `apps/api/src/models/pool.ts` auto-detects this (`process.platform ===
  "darwin" && process.arch === "arm64"`) and sets `device: "gpu", gpu_layers:
  99` for completion models. Embeddings stay on CPU (untested on GPU, not the
  pipeline bottleneck). All other platforms (including Intel Mac, see below)
  fall back to CPU.

## `reasoning_budget: 0` and prompt-based tool calling — what we found

Two related quirks of MedPsy-4B on this hardware, found while building the
Reasoning agent (`apps/api/src/agents/reasoning.agent.ts`,
`apps/api/src/agents/base.agent.ts`):

**1. The model streams its reasoning as visible text, then emits a stray
`</think>`.** With `reasoning_budget: 0` the SDK never sends an opening
`<think>` event, so it never pairs/captures a `thinkingTrace` for this
content — the whole draft (sometimes 1000+ tokens of "We are given...",
"Let's...") arrives as ordinary `contentDelta`, followed by a bare `</think>`
marking the switch to the real answer. Left alone, this entire draft leaked
into the visible Clinical Assessment. **Fix:** `base.agent.ts` now takes only
the text after the *last* `</think>` when one is present, before any
tool-call parsing.

**2. The model "imagines" tool calls inside that reasoning draft instead of
emitting the `{"tool_call": {...}}` JSON our harness parses.** `REASONING_TOOLS`
(icd10_lookup, search_medical_knowledge, calculate_vision_risk) are wired into
the Reasoning agent via `apps/api/src/tools/prompt-tools.ts`
(`buildToolInstructions`/`parseToolCall`/`dispatchTool`,
`MAX_TOOL_ROUNDS = 3`), and we tried several prompt variants — including an
explicit "you MUST call icd10_lookup" instruction and a worked
`{"tool_call": ...}` example. Across 7 full pipeline runs the result was
consistent: the model writes something like

> "Using icd10_lookup with condition 'diabetic macular edema': Result: ICD-10
> code E11.311 (Diabetic retinopathy with macular edema)"

inside its reasoning draft — a *hallucinated* call-and-result pair — and never
emits the actual JSON, so `dispatchTool` is never invoked from this agent.
The tool-calling **infrastructure** (parsing, dispatch, multi-round loop) is
implemented and correct; this specific MedPsy-4B build with
`reasoning_budget: 0` just doesn't reach for it in practice. Real tool/database
use *does* happen elsewhere in the pipeline — the Differential agent's
`enrichWithIcd10()` (`apps/api/src/agents/differential.agent.ts`) verifies
every reported ICD-10 code against the local code database
(`apps/api/src/tools/icd10.tool.ts`) for every run. If you're iterating on this
further, a likely next step is a stop-sequence on `{"tool_call"` so the model
can't continue past a real call to fabricate its own result.

## Historical findings — Intel Mac (darwin-x64, 8GB RAM)

Earlier development happened on an **Intel MacBook (darwin-x64, 8 GB RAM,
`@qvac/sdk` 0.12.1)**, where we hit two reproducible inference bugs in the QVAC
SDK. We isolated both with a clean test matrix and report them here for
transparency (and to the QVAC team). These do **not** reproduce on the M4
above, but the CPU fallback in `pool.ts` exists specifically so Diamesh still
runs correctly if judges/users run it on an Intel Mac.

### Test matrix (Intel Mac, darwin-x64)

| Model | Backend | Result |
| --- | --- | --- |
| `QWEN3_1_7B_INST_Q4` (catalog) | GPU (default) | ❌ Garbage tokens (`"0@\"@\"@…"`) |
| `QWEN3_1_7B_INST_Q4` (catalog) | **CPU** (`device:"cpu"`, `gpu_layers:0`) | ✅ **Correct** — coherent output, ~14 tok/s |
| `qvac/MedPsy-1.7B-GGUF` (q4_k_m-imat) | GPU (default) | ❌ Garbage tokens (`" cal lefrler call…"`) |
| `qvac/MedPsy-1.7B-GGUF` (q4_k_m-imat) | CPU | ⚠️ Coherent for ~20 tokens, then **SIGSEGV** |
| `qvac/MedPsy-1.7B-GGUF` (q8_0) | CPU | ⚠️ Same — **SIGSEGV** after ~50 generated tokens |

### Bug 1 — GPU/OpenCL backend emits garbage on Intel Mac

With the default config (`device:"gpu"`, `gpu_layers:99`), **every** model — including
QVAC's own catalog `QWEN3_1_7B_INST_Q4` — produces incoherent token soup at ~8 tok/s.
There appears to be no working GPU backend on Intel Mac, and the default does not fall
back to CPU.

**Workaround:** force CPU on Intel (`pool.ts` does this automatically based on
`process.arch`):

```ts
modelConfig: { device: "cpu", gpu_layers: 0, ctx_size: 4096 }
// embeddings use the camelCase variant: { device: "cpu", gpuLayers: 0 }
```

With CPU forced, `QWEN3_1_7B_INST_Q4` returns correct, coherent output.

### Bug 2 — MedPsy GGUF SIGSEGVs on the Intel CPU backend

With `device:"cpu"`, `QWEN3_1_7B_INST_Q4` runs to completion perfectly, but
`qvac/MedPsy-1.7B-GGUF` (both `q4_k_m-imat` and `q8_0`) crashes with **SIGSEGV after
generating ~50 tokens** — on Intel only. MedPsy is a Qwen3-1.7B fine-tune, so the
architecture is identical to the catalog model that works; the crash appears
specific to something in the MedPsy GGUF (tokenizer/template/metadata) on the
x64 CPU build. This does not reproduce on Apple Silicon.

### Repro (minimal)

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
  if (ev.type === "contentDelta") process.stdout.write(ev.text); // SIGSEGV mid-stream on Intel
}
```

If running on an Intel Mac and seeing this crash with `USE_MEDPSY=true`, set
`USE_MEDPSY=false` in `apps/api/.env` to fall back to Qwen3 (same prompts, no
code changes needed — `apps/api/src/models/constants.ts` resolves model paths
and display names from this flag).
