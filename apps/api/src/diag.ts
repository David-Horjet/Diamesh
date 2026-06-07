// Quick test: Qwen3-600M stability with Chrome open.
import { completion, loadModel } from "@qvac/sdk";
import * as sdk from "@qvac/sdk";
const QWEN600M = (sdk as Record<string, unknown>)["QWEN3_600M_INST_Q4"] as string;

async function gen(modelId: string, predict: number, label: string): Promise<void> {
  process.stdout.write(`\n[${label}] predict=${predict} ... `);
  const run = completion({
    modelId,
    history: [
      { role: "system", content: "You are a clinical assistant. Respond concisely." },
      { role: "user", content: "Explain diabetic retinopathy in 2-3 sentences." },
    ],
    stream: true,
    generationParams: { predict },
  });
  let out = "";
  for await (const ev of run.events) {
    const e = ev as { type: string; text?: string };
    if (e.type === "contentDelta") out += e.text ?? "";
  }
  const final = await run.final;
  process.stdout.write(`OK (${final.stats?.tokensPerSecond?.toFixed(1) ?? "?"} tok/s) → "${out.slice(0, 60)}"`);
}

async function main() {
  console.log("Loading Qwen3-600M (364MB — fits with Chrome open)...");
  const modelId = await loadModel({
    modelSrc: QWEN600M,
    modelType: "llamacpp-completion",
    modelConfig: { ctx_size: 2048, device: "cpu", gpu_layers: 0, reasoning_budget: 0 },
  });
  console.log("Loaded. Running 3 passes...");
  for (let i = 1; i <= 3; i++) {
    await gen(modelId, 300, `run ${i}/3`);
  }
  console.log("\n\n✅ PASSED");
  process.exit(0);
}

main().catch((e) => { console.error("\n❌ FATAL:", (e as Error).message); process.exit(1); });
