import "node:process";
import { execSync } from "child_process";
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

function logMemoryStatus(): void {
    try {
        const out = execSync("vm_stat").toString();
        const pages = (re: RegExp) => Number(out.match(re)?.[1] ?? 0);
        const pageSize = Number(out.match(/page size of (\d+) bytes/)?.[1] ?? 4096);
        const availableGB =
            ((pages(/Pages free:\s+(\d+)/) +
                pages(/Pages speculative:\s+(\d+)/) +
                pages(/Pages inactive:\s+(\d+)/)) *
                pageSize) /
            1_073_741_824;
        if (availableGB < 2.5) {
            console.warn(`\n⚠️  LOW MEMORY: ${availableGB.toFixed(1)}GB available — inference needs ≥2.5GB.`);
            console.warn(`   Close Chrome (Cmd+Q) before running analysis to avoid SIGSEGV crashes.\n`);
        } else {
            console.log(`[startup] Memory: ${availableGB.toFixed(1)}GB available — OK for inference.`);
        }
    } catch { /* vm_stat unavailable on non-macOS */ }
}

async function main(): Promise<void> {
    // ── Init subsystems ────────────────────────────────────────────────────────
    initAuditLog();
    initDb();

    auditLog({ event: "server_start", details: { port: PORT, host: HOST } });

    // ── Load base models (blocks until ready) ─────────────────────────────────
    logMemoryStatus();
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
