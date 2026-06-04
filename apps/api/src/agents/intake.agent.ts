import { BaseAgent } from "./base.agent.js";
import { getMedPsy1B } from "../models/pool.js";
import { INTAKE_TOOLS } from "../tools/index.js";
import type { AgentName, AgentProgressEvent, ClinicalCase } from "@diamesh/shared";

export interface IntakeResult {
  structuredSummary: string;
  keyFindings: string[];
  suggestedSearchTerms: string[];
  urgencyLevel: "routine" | "urgent" | "emergent";
}

export class IntakeAgent extends BaseAgent {
  readonly name: AgentName = "intake";

  async analyze(
    clinicalCase: ClinicalCase,
    onEvent?: ((e: AgentProgressEvent) => void) | undefined
  ): Promise<IntakeResult> {
    const modelId = await getMedPsy1B();

    const caseText = buildCaseText(clinicalCase);

    const result = await this.run({
      caseId: clinicalCase.id,
      modelId,
      modelName: "MedPsy-1.7B",
      tools: INTAKE_TOOLS,
      captureThinking: false,
      onEvent,
      systemPrompt: `You are a clinical intake specialist for an optometry practice. Your role is to:
1. Review the patient's clinical information
2. Identify and organize the key clinical findings
3. Determine the urgency level of the case
4. Suggest search terms for retrieving relevant clinical guidelines

Respond ONLY with a valid JSON object matching this exact structure:
{
  "structuredSummary": "Concise clinical summary in 2-3 sentences",
  "keyFindings": ["finding 1", "finding 2", ...],
  "suggestedSearchTerms": ["term 1", "term 2", ...],
  "urgencyLevel": "routine" | "urgent" | "emergent"
}

Urgency definitions:
- emergent: acute angle closure, CRAO, retinal detachment, papilledema, sudden vision loss
- urgent: suspected uveitis, rapid VA decline, new field defect, NVD/NVE
- routine: stable chronic conditions, refractive error, dry eye, monitoring visits`,

      userPrompt: `Please analyze this patient case and return structured JSON:\n\n${caseText}`,
    });

    try {
      const jsonMatch = result.text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]) as IntakeResult;
      }
    } catch { /* fall through to default */ }

    return {
      structuredSummary: result.text,
      keyFindings: [],
      suggestedSearchTerms: [clinicalCase.chiefComplaint ?? "ophthalmic condition"],
      urgencyLevel: "routine",
    };
  }
}

function buildCaseText(c: ClinicalCase): string {
  const lines: (string | null)[] = [
    `Chief Complaint: ${c.chiefComplaint}`,
    c.clinicalNotes ? `Clinical Notes: ${c.clinicalNotes}` : null,
    c.vaOd || c.vaOs ? `Visual Acuity: OD ${c.vaOd ?? "NR"}, OS ${c.vaOs ?? "NR"}` : null,
    c.refractionOd || c.refractionOs ? `Refraction: OD ${c.refractionOd ?? "NR"}, OS ${c.refractionOs ?? "NR"}` : null,
    c.ocularFindings ? `Ocular Findings: ${c.ocularFindings}` : null,
  ];
  return lines.filter((l): l is string => l !== null).join("\n");
}
