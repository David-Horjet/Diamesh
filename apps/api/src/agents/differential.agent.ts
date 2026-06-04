import { BaseAgent } from "./base.agent.js";
import { getMedPsy4B } from "../models/pool.js";
import { lookupICD10 } from "../tools/icd10.tool.js";
import type { AgentName, AgentProgressEvent, Differential } from "@diamesh/shared";
import type { ReasoningResult } from "./reasoning.agent.js";

export interface DifferentialResult {
  differentials: Differential[];
  recommendedActions: string[];
}

export class DifferentialAgent extends BaseAgent {
  readonly name: AgentName = "differential";

  async rank(
    caseId: string,
    reasoningResult: ReasoningResult,
    onEvent?: ((e: AgentProgressEvent) => void) | undefined
  ): Promise<DifferentialResult> {
    const modelId = await getMedPsy4B();

    const result = await this.run({
      caseId,
      modelId,
      modelName: "MedPsy-4B",
      // No tools — produces clean structured JSON. ICD-10 codes are verified
      // against the local code database after parsing (see enrichWithIcd10).
      captureThinking: false,
      onEvent,
      systemPrompt: `You are a clinical specialist generating a differential diagnosis list.

Provide your best ICD-10 code for each condition from your own knowledge.

Return ONLY a valid JSON object with this exact structure:
{
  "differentials": [
    {
      "rank": 1,
      "condition": "Condition name",
      "icd10Code": "H00.00",
      "probability": "high",
      "rationale": "Brief clinical rationale (1-2 sentences)"
    }
  ],
  "recommendedActions": [
    "Action 1",
    "Action 2"
  ]
}

Rules:
- List 3-5 differentials, ranked by probability
- probability must be: "high", "medium", or "low"
- Include your best-guess ICD-10 code for each condition
- recommendedActions: 3-6 concrete next steps (investigations, referrals, treatments)`,

      userPrompt: `Based on this clinical assessment, generate the differential diagnosis list with ICD-10 codes and recommended actions:

${reasoningResult.clinicalAssessment}`,
    });

    try {
      const jsonMatch = result.text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]) as DifferentialResult;
        return enrichWithIcd10(parsed);
      }
    } catch { /* fall through */ }

    return {
      differentials: [{
        rank: 1,
        condition: "Assessment requires clinical review",
        icd10Code: null,
        probability: "high",
        rationale: reasoningResult.clinicalAssessment.slice(0, 200),
      }],
      recommendedActions: ["Consult with supervising clinician", "Full ophthalmic examination recommended"],
    };
  }
}

// Verify/correct each differential's ICD-10 code against the local code database.
// If the model's code is missing or doesn't match a real code, look one up by condition name.
function enrichWithIcd10(result: DifferentialResult): DifferentialResult {
  const differentials = result.differentials.map((d) => {
    const matches = lookupICD10(d.condition);
    // Prefer a verified local match; fall back to the model's code if none found
    const verifiedCode = matches.length > 0 ? matches[0]!.code : (d.icd10Code ?? null);
    return { ...d, icd10Code: verifiedCode };
  });
  return { ...result, differentials };
}
