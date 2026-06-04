# Diamesh — Private Clinical Intelligence

> Privacy-first clinical intelligence platform powered by local multi-agent AI

**QVAC Hackathon I — Unleash Edge AI** | Track: General Purpose + Psy Models

All inference runs entirely on-device using the QVAC SDK. No patient data ever leaves the machine.

---

## What It Does

Diamesh assists optometrists and eye clinics by running a 5-agent AI pipeline locally:

1. **Intake Agent** (MedPsy-1.7B) — Parses clinical input, identifies key findings, determines urgency
2. **Vision Agent** (SmolVLM2-500M) — Analyzes fundus/OCT/slit-lamp images via local multimodal inference
3. **Knowledge Agent** (MedPsy-1.7B + RAG) — Retrieves relevant ophthalmology guidelines from local vector store
4. **Reasoning Agent** (MedPsy-4B, with thinking trace) — Performs full clinical reasoning with tool calling
5. **Education Agent** (MedPsy-1.7B) — Generates plain-language patient education summaries

Outputs: ranked differential diagnosis with ICD-10 codes, clinical assessment, recommended actions, and patient education content.

---

## Hardware Requirements

| Component | Minimum | Tested On |
|-----------|---------|-----------|
| RAM | 8 GB | 8 GB |
| CPU | Intel/AMD x86-64, Apple Silicon | Intel Mac 2017 |
| GPU | Optional (Metal/Vulkan for speed) | CPU-only |
| Node.js | ≥ 22.17.0 | v24.x |
| Storage | 8 GB free (for models) | — |

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

This downloads the GTE-Large and MedPsy-1.7B models (~2GB) and ingests the ophthalmology guidelines. Takes 3-10 minutes on first run.

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
Next.js 15 Frontend (localhost:3000)
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
    ┌────┴───────────────────────────────────┐
    │           QVAC MODEL POOL              │
    │  GTE-Large (always)                    │
    │  MedPsy-1.7B (always)                 │
    │  MedPsy-4B (on-demand, swaps in)      │
    │  SmolVLM2-500M (on-demand, if images) │
    └────────────────────────────────────────┘
         │
    SQLite (local only, never synced)
```

### QVAC Features Used

| Feature | Where Used |
|---------|-----------|
| `completion()` with MedPsy-4B | Clinical Reasoning + Differential agents |
| `completion()` with MedPsy-1.7B | Intake + Knowledge + Education agents |
| `completion()` with SmolVLM2 + multimodal attachments | Vision agent |
| `tools` parameter | All agents (icd10_lookup, drug_interaction_check, search_medical_knowledge, calculate_vision_risk) |
| `captureThinking: true` | Reasoning agent — full thinking trace displayed in UI |
| `ragIngest()` + `ragSearch()` | Local ophthalmology knowledge base |
| `embed()` via GTE-Large | Document embeddings for RAG |
| `startQVACProvider()` | P2P delegation — Settings page |
| `delegate: { fallbackToLocal: true }` | Consumer mode — transparent fallback |
| `loadModel()` / `unloadModel()` | Smart pool — memory management for 8GB |
| `loggingStream()` + `profiler` | Audit log + metrics dashboard |

---

## Project Structure

```
diamesh/
├── apps/
│   ├── api/          Express + QVAC SDK backend
│   └── web/          Next.js 15 + Tailwind frontend
├── packages/
│   └── shared/       Shared TypeScript types
├── docker-compose.yml
└── README.md
```

---

## Submission Artifacts

- **Demo video**: [YouTube link]
- **Audit log**: `/api/audit/download` (JSON) — captured during demo run
- **Hardware**: Intel Mac 2017, 8GB RAM, CPU-only inference
- **License**: Apache 2.0
- **Hashtag**: #teamDiamesh

---

## Disclaimer

Diamesh is a research and educational tool. It does not constitute medical advice and must not be used as a substitute for professional clinical judgment. All AI-generated assessments must be verified by a qualified clinician.
