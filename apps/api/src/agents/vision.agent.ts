import { completion, ocr } from "@qvac/sdk";
import { v4 as uuid } from "uuid";
import { getVisionModel, unloadVision } from "../models/pool.js";
import { insertAgentRun } from "../db/queries.js";
import { auditInference, auditLog } from "../logging/audit.js";
import type { AgentName, AgentProgressEvent, CaseImage } from "@diamesh/shared";

export interface VisionAnalysisResult {
  imageId: string;
  imageType: string;
  description: string;
  clinicalObservations: string[];
  ocrText: string | null;
}

export class VisionAgent {
  readonly name: AgentName = "vision";

  async analyzeImages(
    caseId: string,
    images: CaseImage[],
    onEvent?: (e: AgentProgressEvent) => void
  ): Promise<VisionAnalysisResult[]> {
    if (images.length === 0) return [];

    onEvent?.({ type: "agent_start", agentName: this.name });

    const { modelId } = await getVisionModel();
    const results: VisionAnalysisResult[] = [];

    for (const image of images) {
      const result = await this.analyzeOne(caseId, modelId, image, onEvent);
      results.push(result);
    }

    // Unload vision model immediately after to free RAM for MedPsy-4B
    await unloadVision();
    auditLog({ event: "vision_agent_complete", details: { imagesAnalyzed: images.length, caseId } });

    onEvent?.({ type: "agent_complete", agentName: this.name, result: `Analyzed ${images.length} image(s)` });

    return results;
  }

  private async analyzeOne(
    caseId: string,
    modelId: string,
    image: CaseImage,
    onEvent?: (e: AgentProgressEvent) => void
  ): Promise<VisionAnalysisResult> {
    const startTime = Date.now();
    let firstTokenTime: number | null = null;

    const systemPrompt = `You are an experienced ophthalmologist reviewing a clinical image.
Describe ONLY what you observe in the image — do not provide diagnoses.
Focus on: disc appearance, macula, vessels, retinal lesions, anterior segment findings, media clarity.
Be specific and use clinical terminology.`;

    const userPrompt = getImagePrompt(image.imageType);

    let description = "";
    let tokensOut = 0;

    const run = completion({
      modelId,
      history: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: userPrompt,
          attachments: [{ path: image.filePath }],
        },
      ],
      stream: true,
    });

    for await (const event of run.events) {
      const e = event as { type: string; text?: string; stats?: { generatedTokens?: number } };
      if (e.type === "contentDelta") {
        if (firstTokenTime === null) firstTokenTime = Date.now();
        description += e.text ?? "";
        onEvent?.({ type: "agent_token", agentName: this.name, token: e.text ?? "" });
      }
      if (e.type === "completionStats") tokensOut += e.stats?.generatedTokens ?? 0;
    }

    // Attempt OCR for text elements (e.g. VA charts, labels on images)
    let ocrText: string | null = null;
    try {
      // OCR models are separate — skip if not loaded to avoid memory pressure
      ocrText = null;
    } catch { /* OCR is best-effort */ }

    const durationMs = Date.now() - startTime;
    const ttft = firstTokenTime !== null ? firstTokenTime - startTime : durationMs;

    insertAgentRun({
      id: uuid(),
      caseId,
      agentName: this.name,
      modelUsed: "SmolVLM2-500M",
      tokensIn: 0,
      tokensOut,
      durationMs,
      thinkingTrace: null,
      toolCallsMade: [],
      resultJson: JSON.stringify({ description: description.trim(), imageId: image.id }),
      inferenceMode: "local",
    });

    auditInference({
      event: "vision_inference_complete",
      caseId,
      agentName: this.name,
      modelUsed: "SmolVLM2-500M",
      tokensIn: 0,
      tokensOut,
      ttft,
      tokensPerSec: tokensOut > 0 ? Math.round((tokensOut / durationMs) * 1000) : 0,
      durationMs,
      inferenceMode: "local",
    });

    const lines = description.trim().split(". ").filter(Boolean);

    return {
      imageId: image.id,
      imageType: image.imageType,
      description: description.trim(),
      clinicalObservations: lines.slice(0, 5),
      ocrText,
    };
  }
}

function getImagePrompt(imageType: string): string {
  switch (imageType) {
    case "fundus":
      return "Describe this fundus photograph in clinical detail. Comment on: optic disc (cup-to-disc ratio, rim tissue, colour), macula (foveal reflex, pigmentation, lesions), retinal vessels (calibre, A:V ratio, crossing changes), peripheral retina, and any haemorrhages, exudates, or neovascularization.";
    case "oct":
      return "Describe this OCT scan in clinical detail. Comment on: retinal layer integrity, foveal contour, presence of intraretinal or subretinal fluid, drusen, atrophy, vitreoretinal interface, and central retinal thickness if visible.";
    case "slit_lamp":
      return "Describe this slit-lamp image in clinical detail. Comment on: corneal clarity, anterior chamber depth and cells, iris appearance, lens clarity, and any anterior segment abnormalities.";
    default:
      return "Describe this clinical ophthalmic image in detail, noting any abnormal findings relevant to patient care.";
  }
}
