// Call the REAL IntakeAgent in a standalone script (no Express/SSE).
// If this works, the crash is environmental (Express). If it crashes, it's the agent.
import { initDb } from "./db/schema.js";
import { initAuditLog } from "./logging/audit.js";
import { getReasoningSmall } from "./models/pool.js";
import { completion } from "@qvac/sdk";

async function main() {
  initAuditLog();
  initDb();

  console.log("Loading reasoning-small via pool...");
  const modelId = await getReasoningSmall();
  console.log("Loaded:", modelId);

  // Replicate EXACTLY what base.agent does
  const systemPrompt = `You are a clinical intake specialist for an optometry practice. Review the patient's clinical information, identify the key clinical findings, determine the urgency level, and suggest search terms. Respond ONLY with a valid JSON object: {"structuredSummary": "...", "keyFindings": [...], "suggestedSearchTerms": [...], "urgencyLevel": "routine"}`;
  const userPrompt = `Please analyze this patient case and return structured JSON:

Chief Complaint: Gradual blurring of vision in both eyes over 6 months.
Clinical Notes: Type 2 Diabetes 12 years (HbA1c 8.4%). Hypertension. Family history glaucoma.
Visual Acuity: OD 6/18, OS 6/12`;

  console.log("Calling completion (matching base.agent config)...");
  const run = completion({
    modelId,
    history: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    stream: true,
    captureThinking: false,
    generationParams: { predict: 500 },
  });

  let out = "", n = 0;
  for await (const ev of run.events) {
    const e = ev as { type: string; text?: string };
    if (e.type === "contentDelta") { out += e.text ?? ""; n++; if (n % 50 === 0) process.stdout.write(`[${n}]`); }
  }
  const final = await run.final;
  console.log(`\n=== OUTPUT (${out.length}) ===\n${final.contentText.slice(0, 400)}`);
  console.log("✅ DONE");
  process.exit(0);
}

main().catch((e) => { console.error("\n❌ FATAL:", (e as Error).message); process.exit(1); });
