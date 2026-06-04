import { ragSearch } from "@qvac/sdk";
import { getEmbeddingsModel } from "../models/pool.js";

export interface RAGResult {
  content: string;
  score: number;
  source: string;
}

export async function searchKnowledgeBase(
  query: string,
  topK = 3
): Promise<RAGResult[]> {
  try {
    const modelId = await getEmbeddingsModel();
    const results = await ragSearch({
      modelId,
      query,
      topK: Math.min(topK, 5),
    });

    if (!results || results.length === 0) return [];

    return results.map((r: { document?: { content?: string; id?: string }; score: number }) => ({
      content: r.document?.content ?? "",
      score: r.score,
      source: r.document?.id ?? "unknown",
    }));
  } catch {
    return [];
  }
}

export function formatRAGContext(results: RAGResult[]): string {
  if (results.length === 0) return "";
  return results
    .map((r, i) => `[Reference ${i + 1}] ${r.content}`)
    .join("\n\n");
}
