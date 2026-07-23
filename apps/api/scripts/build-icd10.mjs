#!/usr/bin/env node
/**
 * Build icd10-eye-codes.json from an official CMS ICD-10-CM release.
 *
 * CMS blocks automated downloads, so fetch the file by hand first:
 *   1. https://www.cms.gov/medicare/coding-billing/icd-10-codes
 *   2. Download "Code Descriptions in Tabular Order" (ZIP) for the fiscal year
 *   3. Run:  npm run icd10:build --workspace=apps/api -- <path-to.zip|.txt>
 *
 * The release is a US Government work (public domain), so the generated JSON
 * is safe to redistribute under this repo's Apache 2.0 licence.
 *
 * Input format is fixed-width-ish, one code per line, WITHOUT the decimal:
 *   H4010   Unspecified open-angle glaucoma
 * We reinsert the decimal after the 3rd character (H4010 -> H40.10).
 */
import { readFileSync, writeFileSync, existsSync } from "fs";
import { execFileSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_PATH = path.resolve(__dirname, "../src/rag/documents/icd10-eye-codes.json");

/**
 * Which codes an optometry-focused build keeps.
 *
 * H00-H59 is the eye chapter, and effectively all of it is in scope for
 * optometry (refraction, glaucoma, cataract, retina, cornea, lids, binocular
 * vision, low vision). The non-H entries matter just as much in practice —
 * diabetic retinopathy is coded from Chapter 4, not the eye chapter — so they
 * are included deliberately rather than left to chance.
 */
const INCLUDE = [
  { re: /^H(?:[0-4]\d|5\d)/, why: "H00-H59 diseases of the eye and adnexa" },
  { re: /^E(?:08|09|10|11|13)3/, why: "diabetes with ophthalmic complications (diabetic retinopathy/DME)" },
  { re: /^Z010/, why: "encounter for examination of eyes and vision" },
  { re: /^S05/, why: "injury of eye and orbit" },
  { re: /^T26/, why: "burns and corrosions of eye and adnexa" },
  { re: /^C69/, why: "malignant neoplasm of eye and adnexa" },
  { re: /^D31/, why: "benign neoplasm of eye and adnexa" },
  { re: /^Q1[0-5]/, why: "congenital malformations of the eye" },
  { re: /^B005/, why: "herpesviral ocular disease" },
  { re: /^B30/, why: "viral conjunctivitis" },
  { re: /^A185/, why: "tuberculosis of eye" },
  { re: /^G35/, why: "multiple sclerosis (optic neuritis association)" },
  { re: /^G932/, why: "benign intracranial hypertension (papilloedema)" },
  { re: /^M316/, why: "giant cell arteritis (ocular emergency)" },
];

// Words too generic to be useful as search keywords.
const STOPWORDS = new Set([
  "the", "and", "or", "of", "with", "without", "in", "to", "for", "on", "by",
  "other", "unspecified", "specified", "not", "elsewhere", "classified", "due",
  "such", "as", "type", "stage", "disorder", "disorders", "disease", "diseases",
  "eye", "left", "right", "bilateral", "unilateral", "encounter", "initial",
  "subsequent", "sequela", "nos", "nec",
]);

function extractText(inputPath) {
  if (!existsSync(inputPath)) {
    console.error(`error: file not found: ${inputPath}`);
    process.exit(1);
  }
  if (inputPath.toLowerCase().endsWith(".zip")) {
    // The release ZIP contains several files; the flat code list is the one
    // named like icd10cm-codes-2026.txt / icd10cm_codes_2026.txt.
    const listing = execFileSync("unzip", ["-Z1", inputPath], { encoding: "utf-8" })
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
    const match = listing.find((f) => /codes.*\.txt$/i.test(f) && !/addendum/i.test(f));
    if (!match) {
      console.error("error: could not find a codes .txt inside the zip. Contents:");
      listing.forEach((f) => console.error(`  ${f}`));
      process.exit(1);
    }
    console.log(`[icd10] reading ${match} from zip`);
    return execFileSync("unzip", ["-p", inputPath, match], {
      encoding: "utf-8",
      maxBuffer: 64 * 1024 * 1024,
    });
  }
  return readFileSync(inputPath, "utf-8");
}

// "H4010" -> "H40.10"; codes of 3 chars or fewer stay as-is ("H40").
function withDecimal(raw) {
  return raw.length > 3 ? `${raw.slice(0, 3)}.${raw.slice(3)}` : raw;
}

/**
 * Curated keywords were written against category stems (H40.11, H52.1) which
 * are not themselves billable codes — ICD-10-CM demands laterality/stage, so
 * the real codes are H40.1110, H52.11 and so on. Matching only on exact code
 * would throw away almost all of the hand-written keywords, so a curated stem
 * also seeds every code beneath it, with the longest stem winning.
 */
function keywordsFor(code, rawCode, description, curated, curatedByStem) {
  const exact = curated.get(code);
  if (exact) return exact;

  let best = null;
  for (const [stem, keywords] of curatedByStem) {
    if (!rawCode.startsWith(stem)) continue;
    if (!best || stem.length > best.stem.length) best = { stem, keywords };
  }

  const auto = makeKeywords(description);
  return best ? [...new Set([...best.keywords, ...auto])].slice(0, 10) : auto;
}

function makeKeywords(description) {
  const words = description
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOPWORDS.has(w));
  return [...new Set(words)].slice(0, 8);
}

function main() {
  const inputPath = process.argv[2];
  const dryRun = process.argv.includes("--dry-run");

  if (!inputPath) {
    console.error("usage: build-icd10.mjs <path-to-icd10cm-codes.zip|.txt> [--dry-run]");
    console.error("download from https://www.cms.gov/medicare/coding-billing/icd-10-codes");
    process.exit(1);
  }

  const text = extractText(inputPath);
  const lines = text.split(/\r?\n/).filter((l) => l.trim());
  console.log(`[icd10] parsed ${lines.length} total codes from release`);

  // Preserve the hand-written keywords already curated in the repo — the
  // auto-generated ones are a fallback, not an improvement on them.
  let curated = new Map();
  let curatedByStem = new Map();
  if (existsSync(OUT_PATH)) {
    const existing = JSON.parse(readFileSync(OUT_PATH, "utf-8"));
    curated = new Map(existing.map((e) => [e.code, e.keywords]));
    // Keyed by dot-stripped code so it can prefix-match the raw release codes.
    curatedByStem = new Map(existing.map((e) => [e.code.replace(".", ""), e.keywords]));
    console.log(`[icd10] preserving curated keywords for ${curated.size} existing codes`);
  }

  const counts = new Map(INCLUDE.map((r) => [r.why, 0]));
  const out = [];

  for (const line of lines) {
    // Lines are "<code><whitespace><description>".
    const m = /^(\S+)\s+(.*)$/.exec(line.trim());
    if (!m) continue;
    const rawCode = m[1];
    const description = m[2].trim();

    const rule = INCLUDE.find((r) => r.re.test(rawCode));
    if (!rule) continue;
    counts.set(rule.why, counts.get(rule.why) + 1);

    const code = withDecimal(rawCode);
    out.push({
      code,
      description,
      keywords: keywordsFor(code, rawCode, description, curated, curatedByStem),
    });
  }

  out.sort((a, b) => a.code.localeCompare(b.code));

  console.log(`\n[icd10] kept ${out.length} codes:`);
  for (const [why, n] of counts) console.log(`  ${String(n).padStart(5)}  ${why}`);

  // A curated code is "covered" if it survives as an exact code or as the stem
  // of at least one real billable code.
  const rawCodes = out.map((e) => e.code.replace(".", ""));
  const uncovered = [...curatedByStem.keys()].filter(
    (stem) => !rawCodes.some((rc) => rc.startsWith(stem))
  );
  console.log(
    `\n[icd10] ${curated.size - uncovered.length}/${curated.size} curated codes covered ` +
      `(exact match or expanded into billable child codes)`
  );
  if (uncovered.length) {
    console.log(`[icd10] WARNING no match at all in release: ${uncovered.join(", ")}`);
  }

  if (dryRun) {
    console.log("\n[icd10] --dry-run, nothing written");
    return;
  }

  writeFileSync(OUT_PATH, JSON.stringify(out, null, 2) + "\n");
  console.log(`\n[icd10] wrote ${out.length} codes to ${OUT_PATH}`);
}

main();
