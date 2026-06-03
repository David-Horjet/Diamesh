import "node:process";
import express from "express";
import cors from "cors";
import path from "path";

import { initDb } from "./db/schema.js";
import { initBaseModels } from "./models/pool.js";
import { initAuditLog, auditLog } from "./logging/audit.js";

import healthRouter from "./routes/health.js";
import casesRouter from "./routes/cases.js";
import analyzeRouter from "./routes/analyze.js";
import p2pRouter from "./routes/p2p.js";
import auditRouter from "./routes/audit.js";

// Set QVAC config path before any SDK imports resolve
process.env["QVAC_CONFIG_PATH"] = path.resolve(
  process.env["QVAC_CONFIG_PATH"] ?? "./qvac.config.json"
);

const PORT = Number(process.env["API_PORT"] ?? 3001);
const HOST = process.env["API_HOST"] ?? "127.0.0.1";

async function main(): Promise<void> {
  // ── Init subsystems ────────────────────────────────────────────────────────
  initAuditLog();
  initDb();

  auditLog({ event: "server_start", details: { port: PORT, host: HOST } });

  // ── Load base models (blocks until ready) ─────────────────────────────────
  console.log("[startup] Loading base models — this may take a moment on first run...");
  await initBaseModels();

  // ── Express app ────────────────────────────────────────────────────────────
  const app = express();

  app.use(cors({ origin: process.env["CORS_ORIGIN"] ?? "http://localhost:3000" }));
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true }));

  // Static uploads (for serving uploaded clinical images back to frontend)
  app.use("/uploads", express.static(path.resolve("./uploads")));

  // Routes
  app.use("/api/health", healthRouter);
  app.use("/api/cases", casesRouter);
  app.use("/api/analyze", analyzeRouter);
  app.use("/api/p2p", p2pRouter);
  app.use("/api/audit", auditRouter);

  // 404
  app.use((_req, res) => {
    res.status(404).json({ success: false, error: "Not found" });
  });

  // Error handler
  app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error("[error]", err);
    auditLog({ event: "server_error", details: { error: err.message } });
    res.status(500).json({ success: false, error: "Internal server error" });
  });

  app.listen(PORT, HOST, () => {
    console.log(`\n🩺 Diamesh API running at http://${HOST}:${PORT}`);
    console.log(`   Health:  http://${HOST}:${PORT}/api/health`);
    console.log(`   Audit:   http://${HOST}:${PORT}/api/audit\n`);
    auditLog({ event: "server_ready", details: { port: PORT } });
  });
}

main().catch((err) => {
  console.error("[fatal]", err);
  process.exit(1);
});
