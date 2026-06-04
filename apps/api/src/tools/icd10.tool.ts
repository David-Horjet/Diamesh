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

export function lookupICD10(condition: string): { code: string; description: string }[] {
  const entries = getIndex();
  const query = condition.toLowerCase();
  return entries
    .filter(
      (e) =>
        e.description.toLowerCase().includes(query) ||
        e.keywords.some((k) => k.toLowerCase().includes(query))
    )
    .slice(0, 5)
    .map((e) => ({ code: e.code, description: e.description }));
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
