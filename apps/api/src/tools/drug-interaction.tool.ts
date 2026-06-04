import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.resolve(__dirname, "../rag/documents/drug-reference.json");

interface DrugEntry {
  name: string;
  aliases: string[];
  ocularSideEffects: string[];
  interactions: { drug: string; severity: "mild" | "moderate" | "severe"; effect: string }[];
}

let drugDb: DrugEntry[] | null = null;

function getDrugDb(): DrugEntry[] {
  if (!drugDb) {
    drugDb = JSON.parse(readFileSync(dataPath, "utf-8")) as DrugEntry[];
  }
  return drugDb;
}

export const drugInteractionToolDefinition = {
  type: "function" as const,
  name: "drug_interaction_check",
  description:
    "Check for known ocular side effects and drug interactions for ophthalmic medications. Returns side effects and interaction warnings.",
  parameters: {
    type: "object" as const,
    properties: {
      medication: {
        type: "string" as const,
        description: "Name of the medication to check (generic or brand name)",
      },
    },
    required: ["medication"],
  },
};

export async function executeDrugInteractionTool(args: { medication: string }): Promise<string> {
  const db = getDrugDb();
  const query = args.medication.toLowerCase();
  const match = db.find(
    (d) =>
      d.name.toLowerCase() === query ||
      d.aliases.some((a) => a.toLowerCase() === query)
  );

  if (!match) {
    return JSON.stringify({
      found: false,
      message: `No drug reference found for: ${args.medication}. Consider checking a current pharmacopeia.`,
    });
  }

  return JSON.stringify({
    found: true,
    drug: match.name,
    ocularSideEffects: match.ocularSideEffects,
    interactions: match.interactions,
  });
}
