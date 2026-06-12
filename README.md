# Diamesh — Private Clinical Intelligence

> Privacy-first clinical intelligence platform powered by local multi-agent AI

**QVAC Hackathon I — Unleash Edge AI** | Track: General Purpose + Psy Models

All inference runs entirely on-device using the QVAC SDK. No patient data ever leaves the machine. 

---

## What It Does

Diamesh assists optometrists and eye clinics by running a 6-agent AI pipeline locally:

1. **Intake Agent** (MedPsy-1.7B) — Parses clinical input, identifies key findings, determines urgency
2. **Vision Agent** (SmolVLM2-500M) — Analyzes fundus/OCT/slit-lamp images via local multimodal inference
3. **Knowledge Agent** (MedPsy-1.7B + RAG) — Retrieves relevant ophthalmology guidelines from local vector store
4. **Reasoning Agent** (MedPsy-4B, with thinking trace + tool calling) — Performs full clinical reasoning, calling local tools (ICD-10 lookup, risk calculator, RAG search)
5. **Differential Agent** (MedPsy-4B) — Produces a ranked differential diagnosis list with ICD-10 codes (verified against a local code database)
6. **Education Agent** (MedPsy-1.7B) — Generates a patient-communication guide for the clinician

Outputs: ranked differential diagnosis with ICD-10 codes, clinical assessment, recommended actions, and a patient communication guide.

---

## Hardware Requirements

| Component | Minimum | Tested On |
|-----------|---------|-----------|
| RAM | 8 GB | 16 GB |
| CPU | Intel/AMD x86-64, Apple Silicon | Apple M4 (10-core: 4P+6E) |
| GPU | Optional (Metal for speed on Apple Silicon) | Metal (auto-enabled on darwin/arm64) |
| Node.js | ≥ 22.17.0 | v24.x |
| Storage | 8 GB free (for models) | — |

> Diamesh auto-detects Apple Silicon (`darwin`/`arm64`) and uses the Metal GPU
> backend for ~30% faster inference; all other platforms (including Intel Mac)
> run on CPU due to a known QVAC SDK GPU/OpenCL bug on Intel — see
> [`docs/MODEL_NOTES.md`](docs/MODEL_NOTES.md).

---

## Quick Start

### Prerequisites

```bash
node --version  # must be >= 22.17.0
npm --version   # must be >= 10.9.0
```

### 1. Clone and Install

```bash
git clone https://github.com/YOUR_USERNAME/diamesh.git
cd diamesh
npm install
```

### 2. Configure Environment

```bash
cp .env.example apps/api/.env
# Edit apps/api/.env if needed (defaults work out of the box)
```

### 3. Build Shared Package

```bash
npm run build --workspace=packages/shared
```

### 4. Ingest Knowledge Base (first run only)

```bash
npm run rag:ingest
```

This downloads the EmbeddingGemma-300M and MedPsy-1.7B models (~2GB) and ingests the ophthalmology guidelines. Takes 3-10 minutes on first run.

### 5. Seed Demo Case (optional)

```bash
npm run db:seed --workspace=apps/api
```

### 6. Start Development Servers

```bash
# Terminal 1 — API backend
npm run dev --workspace=apps/api

# Terminal 2 — Next.js frontend
npm run dev --workspace=apps/web
```

Open [http://localhost:3000](http://localhost:3000)

---

## One-Command Docker Setup

```bash
docker compose up --build
```

First run downloads models (~5GB). Subsequent starts are fast.

Open [http://localhost:3000](http://localhost:3000)

---

## Architecture

```
Next.js 16 Frontend (localhost:3000)
         │ HTTP + SSE
Express API (localhost:3001)
         │
    ┌────┴────────────────────────────────┐
    │           ORCHESTRATOR              │
    │  Intake → Vision → Knowledge →      │
    │  Reasoning → Differential →         │
    │  Education                          │
    └────┬────────────────────────────────┘
         │
    ┌──┴────────────────────────────────────────┐
    │             QVAC MODEL POOL               │
    │  EmbeddingGemma-300M (always)             │
    │  MedPsy-1.7B (always)                     │
    │  MedPsy-4B (on-demand, swaps in)          │
    │  SmolVLM2-500M (on-demand, if images)     │
    └────────────────────────────────────────────┘
         │
    SQLite (local only, never synced)
```

### QVAC Features Used

| Feature | Where Used |
|---------|-----------|
| `completion()` with MedPsy-4B | Clinical Reasoning + Differential agents |
| `completion()` with MedPsy-1.7B | Intake + Knowledge + Education agents |
| `completion()` with SmolVLM2 + multimodal attachments | Vision agent |
| `tools` parameter (prompt-based tool calling) | Reasoning agent (icd10_lookup, search_medical_knowledge, calculate_vision_risk) — see [`docs/MODEL_NOTES.md`](docs/MODEL_NOTES.md) for what we found |
| `captureThinking: true` | Set on every `completion()` call; persisted to `agent_runs.thinking_trace` via `/api/cases/:id/runs` (empty under `reasoning_budget:0` — see MODEL_NOTES) |
| `ragIngest()` + `ragSearch()` | Local ophthalmology knowledge base + EmbeddingGemma-300M embeddings |
| `startQVACProvider()` | P2P delegation — Settings page |
| `delegate: { fallbackToLocal: true }` | Wired into every completion-model load in `models/pool.ts` — if a peer provider is configured (Settings → Consumer Mode), the 6-agent pipeline delegates inference to it (`inferenceMode: "delegated"` in the audit log/UI) and transparently falls back to local on failure. Cross-device tested: connection, key exchange, and remote model load/download all work end-to-end (`p2p_inference_delegated` in the audit log) — see [`docs/MODEL_NOTES.md`](docs/MODEL_NOTES.md) for an SDK-level issue found in the delegated-completion step |
| `loadModel()` / `unloadModel()` | Smart pool — memory management for 8-16GB devices |
| Custom JSONL audit log (`apps/api/src/logging/audit.ts`) | Model loads/unloads + per-call TTFT/tokens-per-sec — `/api/audit` |

---

## Project Structure

```
diamesh/
├── apps/
│   ├── api/          Express + QVAC SDK backend
│   └── web/          Next.js 16 + Tailwind frontend
├── packages/
│   └── shared/       Shared TypeScript types
├── docker-compose.yml
└── README.md
```

---

## Submission Artifacts

- **Demo video**: [YouTube link]
- **Audit log**: [`docs/demo-audit-log.jsonl`](docs/demo-audit-log.jsonl) — model loads/unloads + per-call TTFT/tokens-per-sec for a full 6-agent run (also downloadable live via `/api/audit/download`)
- **Hardware**: Apple MacBook Air (M4, 10-core), 16GB RAM, Metal GPU inference
- **License**: Apache 2.0
- **Hashtag**: #teamDiamesh
- **Remote APIs used**: none — see [`REMOTE_APIS.json`](REMOTE_APIS.json)

---

## Disclaimer

Diamesh is a research and educational tool. It does not constitute medical advice and must not be used as a substitute for professional clinical judgment. All AI-generated assessments must be verified by a qualified clinician.
