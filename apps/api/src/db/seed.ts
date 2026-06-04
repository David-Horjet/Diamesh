/**
 * Seed script — loads a realistic demo case for the hackathon demo video.
 * Run: npm run db:seed --workspace=apps/api
 */
import { initDb } from "./schema.js";
import { createCase } from "./queries.js";
import { initAuditLog } from "../logging/audit.js";

initAuditLog();
initDb();

const demoCase = createCase({
  patientName: "James Okafor",
  patientDob: "1958-03-14",
  chiefComplaint: "Gradual blurring of vision in both eyes over 6 months, worse on the right. Difficulty reading small print.",
  clinicalNotes: `Type 2 Diabetes Mellitus diagnosed 12 years ago (HbA1c 8.4% last month).
Hypertension on amlodipine 5mg.
Family history of glaucoma (mother).
No previous eye surgery.
Current medications: metformin 1g BD, amlodipine 5mg OD, simvastatin 20mg.
No known drug allergies.`,
  vaOd: "6/18",
  vaOs: "6/12",
  refractionOd: "-1.25 / -0.50 × 90",
  refractionOs: "-1.00 / -0.25 × 85",
  ocularFindings: `IOP: OD 18 mmHg, OS 17 mmHg (Goldmann).
CCT: OD 530μm, OS 528μm.
Anterior segment: Clear cornea OU. AC deep and quiet OU. Lens: early nuclear sclerosis OU.
Fundus OD: C/D ratio 0.55. Scattered dot and blot haemorrhages in all 4 quadrants. Hard exudates temporal to fovea. Cotton wool spot superonasal. No NVD/NVE.
Fundus OS: C/D ratio 0.45. Mild dot haemorrhages. Hard exudates. No NVD/NVE.
OCT macula: Central retinal thickness OD 385μm (subretinal fluid suspected), OS 290μm.`,
});

console.log(`[seed] Demo case created: ${demoCase.id}`);
console.log(`[seed] Patient: ${demoCase.patient?.name}`);
console.log(`[seed] Navigate to /cases/${demoCase.id} after starting the server.`);
