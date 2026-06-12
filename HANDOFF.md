# Diamesh — Project Handoff

> Read this entire file before doing anything else. It contains everything needed to continue development on a new machine.

## What is Diamesh

Diamesh is a **privacy-first clinical intelligence platform for eye-care (ophthalmology)**, built for the **QVAC Hackathon I** (June 1–21, 2026).

The pitch: a clinician (or patient) submits a case report — symptoms, history, and optionally clinical images (fundus photo, OCT scan, slit-lamp image) — and a pipeline of 6 local AI agents analyzes it end-to-end, producing a structured clinical assessment, ranked differential diagnoses with ICD-10 codes, and a plain-English patient education summary.

**Everything runs 100% locally on-device using the QVAC SDK.** No patient data ever leaves the machine — no cloud AI, no external APIs for inference. This is the core value proposition and the main thing the hackathon judges care about.

### Hackathon goals
- Targeting **General Purpose** + **Psy Models** tracks
- Judges want to see maximal use of QVAC SDK features: multi-agent workflows, local inference, MedPsy models, RAG, vision analysis, P2P delegation, audit logging
- Submission needs: working demo, demo video, audit log artifacts, README

## Tech stack & hard constraints

- **Monorepo**: Turborepo (`apps/api`, `apps/web`, `packages/shared`)
- **Frontend**: Next.js 16.x (latest), **TypeScript**, **pure Tailwind CSS only — NO UI component libraries** (no shadcn/ui, no Radix, nothing). This is a strict user requirement, do not introduce one.
- **Backend**: Express + TypeScript, SQLite (better-sqlite3, WAL mode) for all local storage
- **AI**: `@qvac/sdk` v0.12.x — local inference via MedPsy models
- **Logging**: JSONL audit log at `apps/api/logs/diamesh-<date>.jsonl` — required hackathon artifact

## Current model configuration (apps/api/.env)

```
USE_MEDPSY=true
```

This was tested and **works correctly on a 16GB RAM Apple Silicon Mac (M4)** — full pipeline runs end-to-end successfully. It previously crashed (SIGSEGV) on an 8GB Intel Mac due to a BLAS/Accelerate bug in the QVAC SDK's darwin-x64 native binary under memory pressure — that issue is hardware-specific and should NOT recur on the M4. If switching machines/hardware again and seeing SIGSEGV crashes during inference, that's the known issue — see git history / `docs/MODEL_NOTES.md` if present for details.

### Models in use (`apps/api/src/models/constants.ts`)

| Role | Model | Used by |
|---|---|---|
| `REASONING_SMALL` | MedPsy-1.7B (`medpsy-1.7b-q4_k_m-imat.gguf`) | Intake, Knowledge, Education agents |
| `REASONING_LARGE` | MedPsy-4B (`medpsy-4b-q4_k_m-imat.gguf`) | Reasoning, Differential agents |
| Vision | SmolVLM2-500M | Vision agent |
| Embeddings | EmbeddingGemma-300M-Q4 | RAG ingest/search |

MedPsy GGUF files are downloaded locally via `npm run models:download` (script in `apps/api/scripts/`) because HuggingFace XET storage isn't compatible with QVAC's HTTP downloader — they live in `apps/api/models/`.

## The 6-agent pipeline (`apps/api/src/orchestrator/pipeline.ts`)

Runs sequentially per case:

1. **Intake** (`agents/intake.agent.ts`) — parses the case report, extracts structured fields, suggests RAG search terms. Model: MedPsy-1.7B.
2. **Vision** (`agents/vision.agent.ts`) — if images attached, analyzes each (fundus/OCT/slit-lamp) for clinical observations. Model: SmolVLM2-500M. Unloads itself after to free RAM.
3. **Knowledge** (`agents/knowledge.agent.ts`) — runs RAG search (`rag/search.ts`) against the local knowledge base using intake's suggested search terms, returns relevant guideline excerpts.
4. **Reasoning** (`agents/reasoning.agent.ts`) — main clinical reasoning step, combines intake + vision + knowledge context. Uses `captureThinking: true` to capture the model's reasoning trace. Model: MedPsy-4B.
5. **Differential** (`agents/differential.agent.ts`) — produces ranked differential diagnoses + ICD-10 codes (verified post-hoc against local ICD-10 database via `enrichWithIcd10()`). Model: MedPsy-4B (still loaded from step 4).
6. **Education** (`agents/education.agent.ts`) — generates a plain-English patient summary + disclaimer. Model: MedPsy-1.7B (swapped back in).

Progress streams to the frontend via SSE (`onEvent` callbacks → `AgentProgressEvent`).

All agents extend `BaseAgent` (`agents/base.agent.ts`) which wraps `completion()` from `@qvac/sdk`, handles streaming, prompt truncation (to fit 2048-4096 ctx window), tool-call parsing, and persists `agent_runs` to SQLite + audit log.

## Model pool (`apps/api/src/models/pool.ts`)

Manages loading/unloading models to stay within RAM budget. Key constraint baked in: **embedding models and completion models must never be resident in the same worker simultaneously** (QVAC SDK bug — corrupts the completion model). The pool enforces mutual exclusion: loading either kind unloads the other first. Completion models auto-select `device: "gpu", gpu_layers: 99` (Metal) on Apple Silicon — measured ~30% faster than CPU with correct output — and fall back to `device: "cpu", gpu_layers: 0` on Intel (GPU/OpenCL produces garbage tokens there). Embeddings always stay on CPU.

## RAG knowledge base (`apps/api/src/rag/`)

- `documents/ophthalmology-guidelines.md` — condensed clinical guidelines (diabetic retinopathy, glaucoma, etc.)
- `documents/icd10-eye-codes.json` — ~30 ICD-10 codes with descriptions/keywords
- `documents/drug-reference.json` — drug reference data
- `ingest.ts` — run via `npm run rag:ingest` — embeds documents with EmbeddingGemma-300M, stores in `~/.qvac/rag-hyperdb`
- `search.ts` — `searchKnowledgeBase()` and `formatRAGContext()` used by the Knowledge agent

**This is the active work area** — the user is sourcing more clinical knowledge (from a lecturer/clinical contacts) to expand the knowledge base beyond the current starter set. New condition-specific markdown files should follow the same format as `ophthalmology-guidelines.md` (clear `##`/`###` headers — chunks well for embedding).

## Frontend (`apps/web/src/app/`)

- `/` — dashboard, system health status (model pool status, P2P status)
- `/cases/new` — create a new case (patient info, symptoms, image upload)
- `/cases/[id]` — case detail view, "Run Analysis" button triggers the pipeline via SSE, shows live agent progress + final report
- `/settings` — P2P delegation settings + audit log viewer

`apps/web/src/lib/api.ts` — API client. Note: `getHealth()` fetches directly (not via the generic `req<T>()` wrapper) because the health endpoint doesn't wrap responses in the standard `ApiResult` shape.

## What's done ✅

- Full monorepo scaffolding, shared types package
- API backend: Express routes, DB schema, model pool, audit logging
- Tool registry (ICD-10 lookup, drug interaction, RAG search, risk calculator) — prompt-based tool calling (`apps/api/src/tools/prompt-tools.ts`) is wired into the Reasoning agent (icd10_lookup, search_medical_knowledge, calculate_vision_risk; max 3 rounds). `differential.agent.ts` uses no tools — it does post-hoc `enrichWithIcd10()` verification instead
- RAG pipeline + initial ophthalmology document ingest
- P2P provider/consumer layer (`apps/api/src/p2p/`)
- Full 6-agent pipeline — **confirmed working end-to-end on M4 16GB**, returns complete analysis + report
- Next.js frontend — all 4 pages, pure Tailwind, no component libraries
- Docker + docker-compose setup (not re-tested since MedPsy switch)
- Streaming/incomplete-answer bug — **fixed** (was cutting off mid-response and skipping to next stage)

## What's left to do

1. **Knowledge base expansion** (in progress) — sourcing real ophthalmology clinical material (condition-specific guides, local protocols, case-based Q&A) to add to `apps/api/src/rag/documents/`. Once new docs are ready, add them to `ingest.ts`'s document list (or refactor to auto-load all `.md` files from a subfolder) and re-run `npm run rag:ingest`.
2. **Demo video recording** — walk through: create case → run analysis → watch all 6 agents stream live → view final report (differentials, ICD-10 codes, patient education).
3. **Clean up `apps/api/src/diag.ts`** — leftover diagnostic/debug file from SIGSEGV investigation, should be deleted before submission (if it still exists).
4. **Docker/docker-compose final test** — verify it works end-to-end with current `USE_MEDPSY=true` config and MedPsy models present.
5. **Submission artifacts** — gather audit log JSONL sample from `apps/api/logs/`, README polish (setup instructions that work for judges), hardware/setup notes.
6. **Build-in-public posting** — ongoing daily Twitter/X updates with `#teamDiamesh #buildinpublic` hashtags. Tone: human, not too technical/jargon-heavy, no AI-sounding language. Don't reference specific hardware issues (Intel Mac RAM problems) in public posts — keep it about the build/features.

## Running the project

```bash
npm install
npm run db:migrate --workspace=apps/api   # if not already done
npm run models:download --workspace=apps/api  # downloads MedPsy GGUF files to apps/api/models/
npm run rag:ingest   # embeds knowledge base docs

npm run dev   # starts both apps/api (port 3001) and apps/web via Turborepo
```

Frontend: http://localhost:3000
API health: http://localhost:3001/api/health

## Working style notes

- User (David) is a solo builder, time-constrained, hackathon deadline pressure (Early Bird target was June 7, final is June 21)
- Keep responses concise and action-oriented
- Don't add abstractions/features beyond what's asked
- For Twitter/build-in-public drafts: human tone, technical depth is fine but explain it simply, no AI-ish phrasing, no hardware-complaint details
