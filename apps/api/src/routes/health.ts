import { Router } from "express";
import { getPoolHealth } from "../models/pool.js";
import type { HealthResponse } from "@diamesh/shared";

const router = Router();

const startTime = Date.now();

router.get("/", (_req, res) => {
  const models = getPoolHealth();
  // Only the always-loaded base models determine readiness; MedPsy-4B and SmolVLM2 are on-demand
  const baseModels = models.filter((m) => m.name === "GTE-Large (Embeddings)" || m.name === "MedPsy-1.7B");
  const allLoaded = baseModels.every((m) => m.status === "loaded");

  const response: HealthResponse = {
    status: allLoaded ? "ok" : "degraded",
    version: "1.0.0",
    models,
    uptime: Math.floor((Date.now() - startTime) / 1000),
    timestamp: new Date().toISOString(),
  };

  res.json(response);
});

export default router;
