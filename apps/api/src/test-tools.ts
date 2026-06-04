// Isolated test: can MedPsy-1.7B do a completion WITH tools and WITHOUT tools?
import { loadModel, completion } from "@qvac/sdk";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MEDPSY = path.resolve(__dirname, "../models/medpsy-1.7b-q4_k_m-imat.gguf");

const tool = {
  type: "function" as const,
  name: "search_medical_knowledge",
  description: "Search the local ophthalmology knowledge base",
  parameters: {
    type: "object" as const,
    properties: {
      query: { type: "string" as const, description: "Clinical query" },
    },
    required: ["query"],
  },
};

async function run() {
  console.log("Loading MedPsy-1.7B...");
  const modelId = await loadModel({
    modelSrc: MEDPSY,
    modelType: "llamacpp-completion",
    modelConfig: { ctx_size: 4096 },
  });
  console.log("Loaded:", modelId);

  const history = [
    { role: "system" as const, content: "You are a clinical assistant. Respond in JSON." },
    { role: "user" as const, content: "Patient has blurred vision. Summarize in JSON with key 'summary'." },
  ];

  // ── Test 1: WITHOUT tools ──
  console.log("\n=== TEST 1: completion WITHOUT tools ===");
  try {
    const run1 = completion({ modelId, history, stream: true });
    let text1 = "";
    for await (const ev of run1.events) {
      if (ev.type === "contentDelta") text1 += ev.delta ?? "";
    }
    console.log("✅ WITHOUT tools succeeded. Output:", text1.slice(0, 200));
  } catch (e) {
    console.error("❌ WITHOUT tools failed:", (e as Error).message);
  }

  // ── Test 2: WITH tools ──
  console.log("\n=== TEST 2: completion WITH tools ===");
  try {
    const run2 = completion({ modelId, history, stream: true, tools: [tool] });
    let text2 = "";
    for await (const ev of run2.events) {
      if (ev.type === "contentDelta") text2 += ev.delta ?? "";
      if (ev.type === "toolCall") console.log("Tool call:", ev.call?.name);
    }
    console.log("✅ WITH tools succeeded. Output:", text2.slice(0, 200));
  } catch (e) {
    console.error("❌ WITH tools failed:", (e as Error).message);
  }

  process.exit(0);
}

run().catch((e) => { console.error("FATAL:", e); process.exit(1); });
