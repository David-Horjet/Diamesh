import { ragSearch } from "@qvac/sdk";
import { getEmbeddingsModel } from "../models/pool.js";

export const ragSearchToolDefinition = {
  type: "function" as const,
  name: "search_medical_knowledge",
  description:
    "Search the local ophthalmology knowledge base for clinical guidelines, protocols, and evidence-based information. Use this to retrieve relevant literature before making clinical assessments.",
  parameters: {
    type: "object" as const,
    properties: {
      query: {
        type: "string" as const,
        description: "Clinical query to search for (e.g. 'diabetic macular edema treatment guidelines')",
      },
      topK: {
        type: "number" as const,
        description: "Number of results to return (default 3, max 5)",
      },
    },
    required: ["query"],
  },
};

export async function executeRagSearchTool(args: { query: string; topK?: number }): Promise<string> {
  try {
    const modelId = await getEmbeddingsModel();
    const results = await ragSearch({
      modelId,
      query: args.query,
      topK: Math.min(args.topK ?? 3, 5),
    });

    if (!results || results.length === 0) {
      return JSON.stringify({ found: false, message: "No relevant documents found in knowledge base." });
    }

    return JSON.stringify({
      found: true,
      results: results.map((r: { id?: string; content?: string; score?: number }) => ({
        content: r.content ?? "",
        score: r.score ?? 0,
        source: r.id ?? "unknown",
      })),
    });
  } catch {
    return JSON.stringify({ found: false, message: "Knowledge base search unavailable." });
  }
}
