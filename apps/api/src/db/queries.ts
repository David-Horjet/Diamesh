import { v4 as uuid } from "uuid";
import { getDb } from "./schema.js";
import type {
  Patient,
  ClinicalCase,
  CaseImage,
  ClinicalReport,
  Differential,
  CreateCaseInput,
} from "@diamesh/shared";
import type { AgentRun, ToolCallRecord } from "@diamesh/shared";

// ─── Patients ─────────────────────────────────────────────────────────────────

export function createPatient(name: string, dob?: string): Patient {
  const db = getDb();
  const id = uuid();
  const now = new Date().toISOString();
  db.prepare(
    "INSERT INTO patients (id, name, dob, created_at) VALUES (?, ?, ?, ?)"
  ).run(id, name, dob ?? null, now);
  return { id, name, dob: dob ?? null, createdAt: now };
}

export function findOrCreatePatient(name: string, dob?: string): Patient {
  const db = getDb();
  const existing = db
    .prepare("SELECT * FROM patients WHERE name = ? LIMIT 1")
    .get(name) as RawPatient | undefined;
  if (existing) return mapPatient(existing);
  return createPatient(name, dob);
}

// ─── Cases ────────────────────────────────────────────────────────────────────

export function createCase(input: CreateCaseInput): ClinicalCase {
  const db = getDb();
  const patient = findOrCreatePatient(input.patientName, input.patientDob);
  const id = uuid();
  const now = new Date().toISOString();

  db.prepare(`
    INSERT INTO cases
      (id, patient_id, chief_complaint, clinical_notes, va_od, va_os,
       refraction_od, refraction_os, ocular_findings, status, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?)
  `).run(
    id,
    patient.id,
    input.chiefComplaint,
    input.clinicalNotes ?? null,
    input.vaOd ?? null,
    input.vaOs ?? null,
    input.refractionOd ?? null,
    input.refractionOs ?? null,
    input.ocularFindings ?? null,
    now
  );

  return {
    id,
    patientId: patient.id,
    chiefComplaint: input.chiefComplaint,
    clinicalNotes: input.clinicalNotes ?? null,
    vaOd: input.vaOd ?? null,
    vaOs: input.vaOs ?? null,
    refractionOd: input.refractionOd ?? null,
    refractionOs: input.refractionOs ?? null,
    ocularFindings: input.ocularFindings ?? null,
    status: "pending",
    createdAt: now,
    patient,
  };
}

export function getCaseById(id: string): ClinicalCase | null {
  const db = getDb();
  const row = db.prepare("SELECT * FROM cases WHERE id = ?").get(id) as RawCase | undefined;
  if (!row) return null;
  const patient = db
    .prepare("SELECT * FROM patients WHERE id = ?")
    .get(row.patient_id) as RawPatient | undefined;
  const images = db
    .prepare("SELECT * FROM case_images WHERE case_id = ?")
    .all(row.id) as RawImage[];
  return { ...mapCase(row), patient: patient ? mapPatient(patient) : undefined, images: images.map(mapImage) };
}

export function listCases(limit = 20, offset = 0): ClinicalCase[] {
  const db = getDb();
  const rows = db
    .prepare("SELECT * FROM cases ORDER BY created_at DESC LIMIT ? OFFSET ?")
    .all(limit, offset) as RawCase[];
  return rows.map((r) => {
    const patient = db
      .prepare("SELECT * FROM patients WHERE id = ?")
      .get(r.patient_id) as RawPatient | undefined;
    return { ...mapCase(r), patient: patient ? mapPatient(patient) : undefined };
  });
}

export function updateCaseStatus(id: string, status: ClinicalCase["status"]): void {
  getDb().prepare("UPDATE cases SET status = ? WHERE id = ?").run(status, id);
}

// ─── Case Images ──────────────────────────────────────────────────────────────

export function insertCaseImage(
  caseId: string,
  imageType: CaseImage["imageType"],
  filePath: string
): CaseImage {
  const db = getDb();
  const id = uuid();
  const now = new Date().toISOString();
  db.prepare(
    "INSERT INTO case_images (id, case_id, image_type, file_path, created_at) VALUES (?, ?, ?, ?, ?)"
  ).run(id, caseId, imageType, filePath, now);
  return { id, caseId, imageType, filePath, visionAnalysisResult: null, createdAt: now };
}

export function updateImageVisionResult(id: string, result: string): void {
  getDb()
    .prepare("UPDATE case_images SET vision_analysis_result = ? WHERE id = ?")
    .run(result, id);
}

// ─── Agent Runs ───────────────────────────────────────────────────────────────

export function insertAgentRun(run: Omit<AgentRun, "createdAt">): AgentRun {
  const db = getDb();
  const now = new Date().toISOString();
  db.prepare(`
    INSERT INTO agent_runs
      (id, case_id, agent_name, model_used, tokens_in, tokens_out,
       duration_ms, thinking_trace, tool_calls_made, result_json, inference_mode, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    run.id,
    run.caseId,
    run.agentName,
    run.modelUsed,
    run.tokensIn,
    run.tokensOut,
    run.durationMs,
    run.thinkingTrace ?? null,
    JSON.stringify(run.toolCallsMade),
    run.resultJson,
    run.inferenceMode,
    now
  );
  return { ...run, createdAt: now };
}

export function getAgentRunsByCase(caseId: string): AgentRun[] {
  const db = getDb();
  const rows = db
    .prepare("SELECT * FROM agent_runs WHERE case_id = ? ORDER BY created_at ASC")
    .all(caseId) as RawAgentRun[];
  return rows.map(mapAgentRun);
}

// ─── Clinical Reports ─────────────────────────────────────────────────────────

// Inserts a new report, or overwrites the existing one for this case (re-running
// analysis on a case must replace its report, not silently keep the stale one).
export function upsertReport(report: Omit<ClinicalReport, "createdAt">): ClinicalReport {
  const db = getDb();
  const now = new Date().toISOString();
  db.prepare(`
    INSERT INTO clinical_reports
      (id, case_id, differentials_json, assessment, recommended_actions,
       education_content, disclaimer, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(case_id) DO UPDATE SET
      id = excluded.id,
      differentials_json = excluded.differentials_json,
      assessment = excluded.assessment,
      recommended_actions = excluded.recommended_actions,
      education_content = excluded.education_content,
      disclaimer = excluded.disclaimer,
      created_at = excluded.created_at
  `).run(
    report.id,
    report.caseId,
    JSON.stringify(report.differentials),
    report.assessment,
    JSON.stringify(report.recommendedActions),
    report.educationContent,
    report.disclaimer,
    now
  );
  return { ...report, createdAt: now };
}

export function getReportByCase(caseId: string): ClinicalReport | null {
  const db = getDb();
  const row = db
    .prepare("SELECT * FROM clinical_reports WHERE case_id = ?")
    .get(caseId) as RawReport | undefined;
  if (!row) return null;
  return mapReport(row);
}

// ─── P2P Sessions ─────────────────────────────────────────────────────────────

export function insertP2PSession(providerKey: string): string {
  const db = getDb();
  const id = uuid();
  db.prepare(
    "INSERT INTO p2p_sessions (id, provider_key) VALUES (?, ?)"
  ).run(id, providerKey);
  return id;
}

export function incrementP2PDelegated(id: string): void {
  getDb().prepare("UPDATE p2p_sessions SET requests_delegated = requests_delegated + 1 WHERE id = ?").run(id);
}

export function incrementP2PFallback(id: string): void {
  getDb().prepare("UPDATE p2p_sessions SET fallbacks_triggered = fallbacks_triggered + 1 WHERE id = ?").run(id);
}

// ─── Raw row types & mappers ──────────────────────────────────────────────────

interface RawPatient { id: string; name: string; dob: string | null; created_at: string }
interface RawCase {
  id: string; patient_id: string; chief_complaint: string; clinical_notes: string | null;
  va_od: string | null; va_os: string | null; refraction_od: string | null;
  refraction_os: string | null; ocular_findings: string | null; status: string; created_at: string;
}
interface RawImage {
  id: string; case_id: string; image_type: string; file_path: string;
  vision_analysis_result: string | null; created_at: string;
}
interface RawAgentRun {
  id: string; case_id: string; agent_name: string; model_used: string;
  tokens_in: number; tokens_out: number; duration_ms: number;
  thinking_trace: string | null; tool_calls_made: string;
  result_json: string; inference_mode: string; created_at: string;
}
interface RawReport {
  id: string; case_id: string; differentials_json: string; assessment: string;
  recommended_actions: string; education_content: string; disclaimer: string; created_at: string;
}

function mapPatient(r: RawPatient): Patient {
  return { id: r.id, name: r.name, dob: r.dob, createdAt: r.created_at };
}
function mapCase(r: RawCase): ClinicalCase {
  return {
    id: r.id, patientId: r.patient_id, chiefComplaint: r.chief_complaint,
    clinicalNotes: r.clinical_notes, vaOd: r.va_od, vaOs: r.va_os,
    refractionOd: r.refraction_od, refractionOs: r.refraction_os,
    ocularFindings: r.ocular_findings, status: r.status as ClinicalCase["status"],
    createdAt: r.created_at,
  };
}
function mapImage(r: RawImage): CaseImage {
  return {
    id: r.id, caseId: r.case_id, imageType: r.image_type as CaseImage["imageType"],
    filePath: r.file_path, visionAnalysisResult: r.vision_analysis_result, createdAt: r.created_at,
  };
}
function mapAgentRun(r: RawAgentRun): AgentRun {
  return {
    id: r.id, caseId: r.case_id, agentName: r.agent_name as AgentRun["agentName"],
    modelUsed: r.model_used, tokensIn: r.tokens_in, tokensOut: r.tokens_out,
    durationMs: r.duration_ms, thinkingTrace: r.thinking_trace,
    toolCallsMade: JSON.parse(r.tool_calls_made) as ToolCallRecord[],
    resultJson: r.result_json,
    inferenceMode: r.inference_mode as AgentRun["inferenceMode"],
    createdAt: r.created_at,
  };
}
function mapReport(r: RawReport): ClinicalReport {
  return {
    id: r.id, caseId: r.case_id,
    differentials: JSON.parse(r.differentials_json) as Differential[],
    assessment: r.assessment,
    recommendedActions: JSON.parse(r.recommended_actions) as string[],
    educationContent: r.education_content,
    disclaimer: r.disclaimer,
    createdAt: r.created_at,
  };
}
