import { Router } from "express";
import { getPoolHealth } from "../models/pool.js";
import type { HealthResponse } from "@diamesh/shared";

const router = Router();

const startTime = Date.now();

router.get("/", (_req, res) => {
  const models = getPoolHealth();
  const allLoaded = models.filter((m) => m.name !== "SmolVLM2-500M (Vision)").every((m) => m.status === "loaded");

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
