import { v4 as uuid } from "uuid";
import { IntakeAgent } from "../agents/intake.agent.js";
import { VisionAgent } from "../agents/vision.agent.js";
import { KnowledgeAgent } from "../agents/knowledge.agent.js";
import { ReasoningAgent } from "../agents/reasoning.agent.js";
import { DifferentialAgent } from "../agents/differential.agent.js";
import { EducationAgent } from "../agents/education.agent.js";
import { getCaseById, updateCaseStatus, upsertReport } from "../db/queries.js";
import { auditLog } from "../logging/audit.js";
import type { AgentProgressEvent, ClinicalReport, PipelineResult } from "@diamesh/shared";

const intakeAgent = new IntakeAgent();
const visionAgent = new VisionAgent();
const knowledgeAgent = new KnowledgeAgent();
const reasoningAgent = new ReasoningAgent();
const differentialAgent = new DifferentialAgent();
const educationAgent = new EducationAgent();

export async function runPipeline(
  caseId: string,
  onEvent: (event: AgentProgressEvent) => void
): Promise<PipelineResult> {
  const pipelineStart = Date.now();

  const clinicalCase = getCaseById(caseId);
  if (!clinicalCase) throw new Error(`Case not found: ${caseId}`);

  updateCaseStatus(caseId, "analyzing");
  auditLog({ event: "pipeline_start", caseId });

  try {
    // ── Step 1: Intake ──────────────────────────────────────────────────────
    const intakeResult = await intakeAgent.analyze(clinicalCase, onEvent);

    // ── Step 2: Vision (if images present) ─────────────────────────────────
    const images = clinicalCase.images ?? [];
    const visionResults =
      images.length > 0
        ? await visionAgent.analyzeImages(caseId, images, onEvent)
        : [];

    // ── Step 3: Knowledge Retrieval (parallel-safe — uses embeddings model) ─
    const knowledgeResult = await knowledgeAgent.retrieve(caseId, intakeResult, onEvent);

    // ── Step 4: Clinical Reasoning (large reasoner, extra token budget) ────────
    const reasoningResult = await reasoningAgent.reason(
      clinicalCase,
      intakeResult,
      knowledgeResult,
      visionResults,
      onEvent
    );

    // ── Step 5: Differential Diagnosis (large reasoner still loaded) ────────────
    const differentialResult = await differentialAgent.rank(caseId, reasoningResult, onEvent);

    // ── Step 6: Patient Education (small reasoner swaps back in) ──────────────
    const educationResult = await educationAgent.generate(
      caseId,
      clinicalCase.patient?.name ?? "Patient",
      differentialResult,
      onEvent
    );

    // ── Persist report (overwrites any prior report for this case) ─────────
    const report: ClinicalReport = upsertReport({
      id: uuid(),
      caseId,
      differentials: differentialResult.differentials,
      assessment: reasoningResult.clinicalAssessment,
      recommendedActions: differentialResult.recommendedActions,
      educationContent: educationResult.content,
      disclaimer: educationResult.disclaimer,
    });

    updateCaseStatus(caseId, "completed");
    const totalDurationMs = Date.now() - pipelineStart;

    auditLog({
      event: "pipeline_complete",
      caseId,
      durationMs: totalDurationMs,
      details: {
        agentsRun: 6,
        imagesAnalyzed: visionResults.length,
        differentialsGenerated: differentialResult.differentials.length,
      },
    });

    onEvent({ type: "pipeline_complete", agentName: "education" });

    return {
      caseId,
      agentRuns: [],
      totalDurationMs,
      report,
    };
  } catch (err) {
    updateCaseStatus(caseId, "error");
    auditLog({ event: "pipeline_error", caseId, details: { error: String(err) } });
    throw err;
  }
}
