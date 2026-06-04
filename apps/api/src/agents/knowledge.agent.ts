import { BaseAgent } from "./base.agent.js";
import { getMedPsy1B } from "../models/pool.js";
import { searchKnowledgeBase, formatRAGContext } from "../rag/search.js";
import type { AgentName, AgentProgressEvent } from "@diamesh/shared";
import type { IntakeResult } from "./intake.agent.js";

export interface KnowledgeResult {
  retrievedContext: string;
  relevantGuidelines: string[];
  searchTermsUsed: string[];
}

export class KnowledgeAgent extends BaseAgent {
  readonly name: AgentName = "knowledge";

  async retrieve(
    caseId: string,
    intakeResult: IntakeResult,
    onEvent?: ((e: AgentProgressEvent) => void) | undefined
  ): Promise<KnowledgeResult> {
    const modelId = await getMedPsy1B();

    // Search RAG for each suggested term and combine
    const allResults = await Promise.all(
      intakeResult.suggestedSearchTerms.slice(0, 3).map((term) =>
        searchKnowledgeBase(term, 3)
      )
    );

    const flat = allResults.flat();
    // Deduplicate by source
    const seen = new Set<string>();
    const unique = flat.filter((r) => {
      if (seen.has(r.source)) return false;
      seen.add(r.source);
      return true;
    });

    const retrievedContext = formatRAGContext(unique.slice(0, 5));

    // Use MedPsy-1.7B to extract the most relevant guidelines from retrieved context
    const result = await this.run({
      caseId,
      modelId,
      modelName: "MedPsy-1.7B",
      tools: [],
      captureThinking: false,
      onEvent,
      systemPrompt: `You are a medical librarian. Given retrieved clinical guidelines,
extract the 3-5 most relevant bullet points that apply to the patient case described.
Be concise. Return ONLY a JSON array of strings: ["guideline 1", "guideline 2", ...]`,
      userPrompt: `Patient summary: ${intakeResult.structuredSummary}

Retrieved clinical context:
${retrievedContext || "No relevant guidelines found in knowledge base."}

Extract the most relevant guidelines as a JSON array.`,
    });

    let relevantGuidelines: string[] = [];
    try {
      const match = result.text.match(/\[[\s\S]*\]/);
      if (match) relevantGuidelines = JSON.parse(match[0]) as string[];
    } catch {
      relevantGuidelines = [result.text];
    }

    return {
      retrievedContext,
      relevantGuidelines,
      searchTermsUsed: intakeResult.suggestedSearchTerms,
    };
  }
}
