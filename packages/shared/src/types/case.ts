export type ImageType = "fundus" | "oct" | "slit_lamp" | "other";

export interface CaseImage {
  id: string;
  caseId: string;
  imageType: ImageType;
  filePath: string;
  visionAnalysisResult: string | null;
  createdAt: string;
}

export interface Patient {
  id: string;
  name: string;
  dob: string | null;
  createdAt: string;
}

export interface ClinicalCase {
  id: string;
  patientId: string;
  chiefComplaint: string;
  clinicalNotes: string | null;
  vaOd: string | null;
  vaOs: string | null;
  refractionOd: string | null;
  refractionOs: string | null;
  ocularFindings: string | null;
  status: CaseStatus;
  createdAt: string;
  /** Last time the clinical fields or images were edited. */
  updatedAt: string;
  /**
   * True when the case was edited after its report was generated, so the
   * report no longer reflects the case data and should be re-run.
   */
  reportStale?: boolean | undefined;
  patient?: Patient | undefined;
  images?: CaseImage[] | undefined;
}

export type CaseStatus = "pending" | "analyzing" | "completed" | "error";

export interface Differential {
  rank: number;
  condition: string;
  icd10Code: string | null;
  /**
   * True only when icd10Code was confirmed against the local ICD-10-CM
   * database — either the model's own code exists verbatim, or the condition
   * matched an entry confidently. False means the code is the model's
   * unverified suggestion and must be checked by the clinician.
   */
  icd10Verified: boolean;
  probability: "high" | "medium" | "low";
  rationale: string;
}

export interface ClinicalReport {
  id: string;
  caseId: string;
  differentials: Differential[];
  assessment: string;
  recommendedActions: string[];
  educationContent: string;
  disclaimer: string;
  createdAt: string;
}

export interface CreateCaseInput {
  patientName: string;
  patientDob?: string;
  chiefComplaint: string;
  clinicalNotes?: string;
  vaOd?: string;
  vaOs?: string;
  refractionOd?: string;
  refractionOs?: string;
  ocularFindings?: string;
}

/**
 * Every field optional — only what's sent gets changed. Written out rather
 * than `Partial<CreateCaseInput>` so each key explicitly permits `undefined`
 * under exactOptionalPropertyTypes, which is what a parsed request body gives.
 */
export type UpdateCaseInput = {
  [K in keyof CreateCaseInput]?: CreateCaseInput[K] | undefined;
};
