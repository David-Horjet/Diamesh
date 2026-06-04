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
  patient?: Patient | undefined;
  images?: CaseImage[] | undefined;
}

export type CaseStatus = "pending" | "analyzing" | "completed" | "error";

export interface Differential {
  rank: number;
  condition: string;
  icd10Code: string | null;
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
