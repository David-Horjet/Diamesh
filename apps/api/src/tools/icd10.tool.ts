import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.resolve(__dirname, "../rag/documents/icd10-eye-codes.json");

interface ICD10Entry {
  code: string;
  description: string;
  keywords: string[];
}

let index: ICD10Entry[] | null = null;

function getIndex(): ICD10Entry[] {
  if (!index) {
    index = JSON.parse(readFileSync(dataPath, "utf-8")) as ICD10Entry[];
  }
  return index;
}

export interface ICD10Match {
  code: string;
  description: string;
  score: number;
}

/**
 * Score at or above which a match is trusted enough to overwrite the model's
 * own code. Below this the caller should keep the model's suggestion and mark
 * it unverified rather than substituting a confidently-wrong code.
 */
export const MATCH_CONFIDENCE_THRESHOLD = 60;

const LATERALITY = /\b(right|left|bilateral)\b/;

// Words that carry no discriminating power between eye codes.
const NOISE = new Set([
  "the", "and", "or", "of", "with", "without", "in", "to", "for", "on", "by",
  "other", "unspecified", "specified", "not", "elsewhere", "classified", "due",
  "eye", "eyes", "ocular", "disorder", "disorders", "disease", "diseases",
  "stage", "type",
  // "acute" and "chronic" are deliberately NOT noise — acute angle-closure
  // glaucoma is a sight-threatening emergency and its chronic counterpart is
  // not, and dropping the word scores the two identically.
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !NOISE.has(w));
}

const norm = (s: string): string => s.toLowerCase().replace(/[^a-z0-9]/g, "");

/**
 * Ranked ICD-10-CM search.
 *
 * The index holds ~3,200 codes, and many differ only by laterality or stage
 * ("Myopia, right eye" vs "Myopia, left eye"). A plain substring filter
 * returns hundreds of these and gives no basis for choosing between them, so
 * matches are scored on how much of the query they cover, penalised for
 * specificity the query never asked for, and biased toward the "unspecified"
 * variant when the query states no laterality — which is what a clinician
 * codes when the side is not documented.
 */
export function lookupICD10(condition: string, limit = 5): ICD10Match[] {
  const entries = getIndex();
  const queryTokens = tokenize(condition);
  if (queryTokens.length === 0) return [];

  const queryNorm = norm(condition);
  const queryHasLaterality = LATERALITY.test(condition.toLowerCase());

  const scored: ICD10Match[] = [];

  for (const e of entries) {
    const descLower = e.description.toLowerCase();
    const descTokens = tokenize(e.description);
    const haystack = new Set([...descTokens, ...e.keywords.flatMap(tokenize)]);

    let matched = 0;
    for (const t of queryTokens) {
      if (haystack.has(t) || descLower.includes(t)) matched++;
    }
    if (matched === 0) continue;

    // Coverage of the query is the dominant signal.
    let score = (matched / queryTokens.length) * 100;

    if (matched === queryTokens.length) score += 25;
    if (norm(e.description) === queryNorm) score += 200;

    // Qualifiers the query never mentioned (a side, a stage) make this a
    // narrower code than the evidence supports.
    const extra = descTokens.filter((t) => !queryTokens.includes(t)).length;
    score -= extra * 3;

    // With no side documented, the unspecified variant is the correct code.
    if (!queryHasLaterality) {
      if (LATERALITY.test(descLower)) score -= 12;
      else if (descLower.includes("unspecified")) score += 10;
    }

    scored.push({ code: e.code, description: e.description, score: Math.round(score) });
  }

  scored.sort((a, b) => b.score - a.score || a.code.localeCompare(b.code));
  return scored.slice(0, limit);
}

/** Exact-code existence check — the strongest form of verification. */
export function findByCode(code: string): { code: string; description: string } | null {
  const target = norm(code);
  const hit = getIndex().find((e) => norm(e.code) === target);
  return hit ? { code: hit.code, description: hit.description } : null;
}

export const icd10ToolDefinition = {
  type: "function" as const,
  name: "icd10_lookup",
  description:
    "Look up ICD-10-CM codes for ocular and ophthalmic conditions. Returns matching codes and descriptions.",
  parameters: {
    type: "object" as const,
    properties: {
      condition: {
        type: "string" as const,
        description: "The condition or diagnosis to look up (e.g. 'diabetic retinopathy', 'glaucoma')",
      },
    },
    required: ["condition"],
  },
};

export async function executeIcd10Tool(args: { condition: string }): Promise<string> {
  const results = lookupICD10(args.condition);
  if (results.length === 0) {
    return JSON.stringify({ found: false, message: `No ICD-10 codes found for: ${args.condition}` });
  }
  return JSON.stringify({ found: true, codes: results });
}
