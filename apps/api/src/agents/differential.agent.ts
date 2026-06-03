import { BaseAgent } from "./base.agent.js";
import { getMedPsy4B } from "../models/pool.js";
import { DIFFERENTIAL_TOOLS } from "../tools/index.js";
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
    onEvent?: (e: AgentProgressEvent) => void
  ): Promise<DifferentialResult> {
    const modelId = await getMedPsy4B();

    const result = await this.run({
      caseId,
      modelId,
      modelName: "MedPsy-4B",
      tools: DIFFERENTIAL_TOOLS,
      captureThinking: false,
      onEvent,
      systemPrompt: `You are a clinical specialist generating a differential diagnosis list.

Use the icd10_lookup tool to retrieve ICD-10 codes for each condition you identify.
Use the calculate_vision_risk tool where relevant clinical parameters are available.

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
- Include ICD-10 codes (use tool to look them up)
- recommendedActions: 3-6 concrete next steps (investigations, referrals, treatments)`,

      userPrompt: `Based on this clinical assessment, generate the differential diagnosis list with ICD-10 codes and recommended actions:

${reasoningResult.clinicalAssessment}`,
    });

    try {
      const jsonMatch = result.text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]) as DifferentialResult;
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
