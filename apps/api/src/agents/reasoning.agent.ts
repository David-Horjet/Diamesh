import { BaseAgent } from "./base.agent.js";
import { getReasoningLarge } from "../models/pool.js";
import { MODEL_DISPLAY } from "../models/constants.js";
import { REASONING_TOOLS } from "../tools/index.js";
import type { AgentName, AgentProgressEvent, ClinicalCase } from "@diamesh/shared";
import type { IntakeResult } from "./intake.agent.js";
import type { KnowledgeResult } from "./knowledge.agent.js";
import type { VisionAnalysisResult } from "./vision.agent.js";

export interface ReasoningResult {
  clinicalAssessment: string;
  thinkingTrace: string | null;
  toolCallsSummary: string;
  inferenceMode: "local" | "delegated";
}

export class ReasoningAgent extends BaseAgent {
  readonly name: AgentName = "reasoning";

  async reason(
    clinicalCase: ClinicalCase,
    intakeResult: IntakeResult,
    knowledgeResult: KnowledgeResult,
    visionResults: VisionAnalysisResult[],
    onEvent?: ((e: AgentProgressEvent) => void) | undefined
  ): Promise<ReasoningResult> {
    const modelId = await getReasoningLarge();

    const visionContext =
      visionResults.length > 0
        ? visionResults
            .map((v) => `[${v.imageType.toUpperCase()} IMAGE]\n${v.description}`)
            .join("\n\n")
        : null;

    const userPrompt = buildReasoningPrompt(clinicalCase, intakeResult, knowledgeResult, visionContext);

    const result = await this.run({
      caseId: clinicalCase.id,
      modelId,
      modelName: MODEL_DISPLAY.REASONING_LARGE,
      tools: REASONING_TOOLS,
      captureThinking: true,
      inferenceMode: "local",
      onEvent,
      systemPrompt: `You are an experienced ophthalmologist providing clinical decision support.

IMPORTANT DISCLAIMER: This is an educational and research tool only. All assessments must be verified by a qualified clinician. This system does not replace professional medical judgment.

Your task:
1. Review all available clinical information
2. Use available tools to look up relevant ICD-10 codes and risk calculations
3. Search the knowledge base for relevant guidelines
4. Provide a thorough clinical assessment

Format your response as a structured clinical assessment covering:
- Summary of key clinical findings
- Pathophysiological reasoning
- Most likely diagnoses with supporting evidence
- Conditions to rule out
- Recommended investigations
- Management considerations`,

      userPrompt,
    });

    return {
      clinicalAssessment: result.text,
      thinkingTrace: result.thinkingTrace,
      toolCallsSummary: result.toolCallsMade.map((t) => t.name).join(", "),
      inferenceMode: result.metrics.inferenceMode,
    };
  }
}

function sanitize(text: string): string {
  return text
    .replace(/×/g, "x")
    .replace(/÷/g, "/")
    .replace(/[^\x00-\x7F]/g, (ch) => `[${ch.codePointAt(0)?.toString(16)}]`);
}

function buildReasoningPrompt(
  c: ClinicalCase,
  intake: IntakeResult,
  knowledge: KnowledgeResult,
  visionContext: string | null
): string {
  const sections: string[] = [
    `## Patient Case\n${sanitize(intake.structuredSummary)}`,
    `Key Findings: ${intake.keyFindings.map(sanitize).join(", ")}`,
    `Urgency: ${intake.urgencyLevel}`,
  ];

  if (c.vaOd || c.vaOs) {
    sections.push(`Visual Acuity: OD ${c.vaOd ?? "NR"}, OS ${c.vaOs ?? "NR"}`);
  }
  if (c.refractionOd || c.refractionOs) {
    sections.push(`Refraction: OD ${sanitize(c.refractionOd ?? "NR")}, OS ${sanitize(c.refractionOs ?? "NR")}`);
  }
  if (c.ocularFindings) {
    sections.push(`Ocular Findings: ${sanitize(c.ocularFindings)}`);
  }
  if (visionContext) {
    sections.push(`## Image Analysis\n${visionContext}`);
  }
  if (knowledge.relevantGuidelines.length > 0) {
    sections.push(
      `## Relevant Clinical Guidelines\n${knowledge.relevantGuidelines.map((g) => `• ${g}`).join("\n")}`
    );
  }

  return sections.join("\n\n") + "\n\nProvide your clinical assessment.";
}
