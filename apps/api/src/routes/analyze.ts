import { Router } from "express";
import { getCaseById } from "../db/queries.js";
import { runPipeline } from "../orchestrator/pipeline.js";
import type { AgentProgressEvent } from "@diamesh/shared";

const router = Router();

// POST /api/analyze/:caseId  →  SSE stream of agent progress
router.post("/:caseId", async (req, res) => {
  const caseId = req.params["caseId"] ?? "";

  const clinicalCase = getCaseById(caseId);
  if (!clinicalCase) {
    res.status(404).json({ success: false, error: "Case not found" });
    return;
  }

  if (clinicalCase.status === "analyzing") {
    res.status(409).json({ success: false, error: "Analysis already in progress" });
    return;
  }

  // Allow re-running completed/error cases by resetting status
  // (only block if actively analyzing right now)

  // Set up SSE
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");
  res.flushHeaders();

  const send = (event: AgentProgressEvent) => {
    res.write(`data: ${JSON.stringify(event)}\n\n`);
  };

  // Keepalive ping every 15s to prevent proxy timeouts during long inference
  const keepalive = setInterval(() => {
    res.write(": keepalive\n\n");
  }, 15_000);

  try {
    const result = await runPipeline(caseId, send);

    send({
      type: "pipeline_complete",
      agentName: "education",
      result: JSON.stringify(result.report),
    });
  } catch (err) {
    send({
      type: "agent_error",
      agentName: "intake",
      error: String(err),
    });
  } finally {
    clearInterval(keepalive);
    res.end();
  }
});

export default router;
