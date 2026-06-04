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

  // Ingest clinical guidelines — SDK chunks automatically
  await ragIngest({
    modelId,
    documents: [guidelines],
    chunk: true,
    onProgress: (stage: string, current: number, total: number) => {
      console.log(`[rag] Guidelines ${stage}: ${current}/${total}`);
    },
  });
  console.log("[rag] Guidelines ingested.");

  // Ingest ICD-10 entries as individual strings
  const icd10Strings = icd10.map(
    (e) => `ICD-10 ${e.code}: ${e.description}. Keywords: ${e.keywords.join(", ")}`
  );

  await ragIngest({
    modelId,
    documents: icd10Strings,
    chunk: false,
    onProgress: (stage: string, current: number, total: number) => {
      console.log(`[rag] ICD-10 ${stage}: ${current}/${total}`);
    },
  });
  console.log("[rag] ICD-10 codes ingested.");

  auditLog({ event: "rag_ingest_complete", details: { documentsIngested: 1 + icd10Strings.length } });
  console.log("[rag] Knowledge base ingest complete.");
}

run().catch((err) => {
  console.error("[rag] Ingest failed:", err);
  process.exit(1);
});
