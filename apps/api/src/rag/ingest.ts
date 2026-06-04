import { ragIngest } from "@qvac/sdk";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { initDb } from "../db/schema.js";
import { initBaseModels, getEmbeddingsModel } from "../models/pool.js";
import { initAuditLog, auditLog } from "../logging/audit.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOCS_DIR = path.resolve(__dirname, "./documents");

async function run(): Promise<void> {
  initAuditLog();
  initDb();
  await initBaseModels();

  const modelId = await getEmbeddingsModel();
  console.log("[rag] Starting knowledge base ingest...");

  const guidelines = readFileSync(path.join(DOCS_DIR, "ophthalmology-guidelines.md"), "utf-8");
  const icd10Raw = readFileSync(path.join(DOCS_DIR, "icd10-eye-codes.json"), "utf-8");
  const icd10 = JSON.parse(icd10Raw) as { code: string; description: string; keywords: string[] }[];

  // Ingest clinical guidelines (chunked by section)
  await ragIngest({
    modelId,
    documents: [
      { id: "ophthalmology-guidelines", content: guidelines },
    ],
    chunk: true,
    onProgress: (p: { percentage: number }) => {
      if (p.percentage % 20 === 0) console.log(`[rag] Guidelines ingest: ${p.percentage}%`);
    },
  });

  // Ingest ICD-10 codes as individual documents for precise retrieval
  const icd10Docs = icd10.map((entry) => ({
    id: `icd10-${entry.code}`,
    content: `ICD-10 Code ${entry.code}: ${entry.description}. Keywords: ${entry.keywords.join(", ")}`,
  }));

  await ragIngest({
    modelId,
    documents: icd10Docs,
    chunk: false,
    onProgress: (p: { percentage: number }) => {
      if (p.percentage % 25 === 0) console.log(`[rag] ICD-10 ingest: ${p.percentage}%`);
    },
  });

  auditLog({ event: "rag_ingest_complete", details: { documentsIngested: 1 + icd10Docs.length } });
  console.log("[rag] Knowledge base ingest complete.");
}

run().catch((err) => {
  console.error("[rag] Ingest failed:", err);
  process.exit(1);
});
