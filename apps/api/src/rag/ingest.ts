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

  // Ingest ICD-10 at CATEGORY level, not one document per code.
  //
  // The code list is ~3,200 entries that differ mostly by laterality and stage
  // ("Myopia, right eye" / "Myopia, left eye" / ...). Embedding each one both
  // costs thousands of on-device embeddings and buries the clinical guidelines
  // under a dense cluster of near-identical strings, so semantic search starts
  // returning code text instead of guidance. Exact code lookup is not a
  // similarity problem anyway — icd10.tool.ts serves that from the full list.
  // What RAG benefits from is one compact summary per 3-character category.
  const byCategory = new Map<string, typeof icd10>();
  for (const entry of icd10) {
    const category = entry.code.slice(0, 3);
    const bucket = byCategory.get(category);
    if (bucket) bucket.push(entry);
    else byCategory.set(category, [entry]);
  }

  const icd10Strings = [...byCategory.entries()].map(([category, entries]) => {
    // The shortest description is the least-qualified one, which reads as the
    // category's general label.
    const label = entries.reduce((a, b) => (a.description.length <= b.description.length ? a : b));
    const keywords = [...new Set(entries.flatMap((e) => e.keywords))].slice(0, 12);
    return (
      `ICD-10 category ${category}: ${label.description}. ` +
      `Contains ${entries.length} code${entries.length === 1 ? "" : "s"} ` +
      `(${entries[0]!.code}–${entries[entries.length - 1]!.code}). ` +
      `Keywords: ${keywords.join(", ")}`
    );
  });

  console.log(
    `[rag] ICD-10: ${icd10.length} codes condensed into ${icd10Strings.length} category documents`
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

run()
  .then(() => {
    // The SDK's Bare worker subprocess keeps the event loop alive, so this
    // one-shot script would otherwise hang after finishing its work. Everything
    // is already flushed by the time ragIngest() resolves.
    process.exit(0);
  })
  .catch((err) => {
    console.error("[rag] Ingest failed:", err);
    process.exit(1);
  });
