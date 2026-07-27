import { BaseAgent } from "./base.agent.js";
import { getReasoningLarge } from "../models/pool.js";
import { MODEL_DISPLAY } from "../models/constants.js";
import { lookupICD10, findByCode, MATCH_CONFIDENCE_THRESHOLD } from "../tools/icd10.tool.js";
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
    const { modelId, inferenceMode } = await getReasoningLarge();

    const result = await this.run({
      caseId,
      modelId,
      modelName: MODEL_DISPLAY.REASONING_LARGE,
      inferenceMode,
      // No tools — produces clean structured JSON. ICD-10 codes are verified
      // against the local code database after parsing (see enrichWithIcd10).
      // Even with reasoning_budget:0 this model streams a visible <think>
      // draft (stripped by base.agent.ts) before the JSON, and that draft's
      // length varies a lot run to run — 1400 was enough most of the time but
      // left as little as ~300 tokens for the JSON itself, truncating it
      // mid-array. 2200 gives the JSON room to complete even after a long
      // think trace; repairTruncatedJson() below is a second line of defense
      // if it's still cut off.
      maxTokens: 2200,
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
- rationale: exactly 1 concise sentence
- recommendedActions: 3-4 concrete next steps (investigations, referrals, treatments)`,

      userPrompt: `Based on this clinical assessment, generate the differential diagnosis list with ICD-10 codes and recommended actions:

${reasoningResult.clinicalAssessment}`,
    });

    const jsonMatch = result.text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[0]) as DifferentialResult;
        return enrichWithIcd10(parsed);
      } catch {
        const repaired = repairTruncatedJson(jsonMatch[0]);
        if (repaired) return enrichWithIcd10(repaired);
      }
    }

    return {
      differentials: [{
        rank: 1,
        condition: "Assessment requires clinical review",
        icd10Code: null,
        icd10Verified: false,
        probability: "high",
        rationale: reasoningResult.clinicalAssessment.slice(0, 200),
      }],
      recommendedActions: ["Consult with supervising clinician", "Full ophthalmic examination recommended"],
    };
  }
}

// Salvage a result from JSON that got cut off mid-array (hit maxTokens before
// the model finished). Walks the "differentials" array brace-by-brace, keeping
// only fully-closed objects, and recovers "recommendedActions" if it's also
// complete.
function repairTruncatedJson(raw: string): DifferentialResult | null {
  const arrayKey = raw.indexOf('"differentials"');
  if (arrayKey < 0) return null;
  const bracketStart = raw.indexOf("[", arrayKey);
  if (bracketStart < 0) return null;

  const items: string[] = [];
  let depth = 0;
  let itemStart = -1;
  for (let i = bracketStart + 1; i < raw.length; i++) {
    const ch = raw[i];
    if (ch === "{") {
      if (depth === 0) itemStart = i;
      depth++;
    } else if (ch === "}") {
      depth--;
      if (depth === 0 && itemStart >= 0) {
        items.push(raw.slice(itemStart, i + 1));
        itemStart = -1;
      }
    } else if (ch === "]" && depth === 0) {
      break;
    }
  }

  const differentials: Differential[] = [];
  for (const item of items) {
    try {
      differentials.push(JSON.parse(item) as Differential);
    } catch { /* skip malformed item */ }
  }
  if (differentials.length === 0) return null;

  let recommendedActions: string[] = [];
  const actionsMatch = raw.match(/"recommendedActions"\s*:\s*(\[[\s\S]*?\])/);
  if (actionsMatch?.[1]) {
    try {
      recommendedActions = JSON.parse(actionsMatch[1]) as string[];
    } catch { /* ignore */ }
  }
  if (recommendedActions.length === 0) {
    recommendedActions = ["Consult with supervising clinician", "Full ophthalmic examination recommended"];
  }

  return { differentials, recommendedActions };
}

// Verify each differential's ICD-10 code against the local ICD-10-CM database.
//
// Verification is deliberately conservative: a code is only marked verified
// when it genuinely exists locally, either because the model's own code is
// real or because the condition name matched an entry confidently. A weak
// match leaves the model's code in place flagged unverified, because
// substituting a plausible-but-wrong code is worse than admitting uncertainty
// — the clinician can check a flagged code, but cannot spot a silent swap.
function enrichWithIcd10(result: DifferentialResult): DifferentialResult {
  const differentials = result.differentials.map((d) => {
    // Strongest signal: the model's code exists verbatim in the database.
    if (d.icd10Code) {
      const exact = findByCode(d.icd10Code);
      if (exact) return { ...d, icd10Code: exact.code, icd10Verified: true };
    }

    const best = lookupICD10(d.condition)[0];
    if (best && best.score >= MATCH_CONFIDENCE_THRESHOLD) {
      return { ...d, icd10Code: best.code, icd10Verified: true };
    }

    return { ...d, icd10Code: d.icd10Code ?? null, icd10Verified: false };
  });
  return { ...result, differentials };
}
