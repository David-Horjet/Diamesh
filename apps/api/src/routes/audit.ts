import { Router } from "express";
import { readTodayLogs } from "../logging/audit.js";

const router = Router();

// GET /api/audit  — returns today's structured audit log (required for submission artifacts)
router.get("/", (_req, res) => {
  try {
    const logs = readTodayLogs();
    res.json({ success: true, data: logs });
  } catch (err) {
    res.status(500).json({ success: false, error: String(err) });
  }
});

// GET /api/audit/download  — downloads as JSON file
router.get("/download", (_req, res) => {
  try {
    const logs = readTodayLogs();
    const date = new Date().toISOString().split("T")[0];
    res.setHeader("Content-Disposition", `attachment; filename="diamesh-audit-${date}.json"`);
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(logs, null, 2));
  } catch (err) {
    res.status(500).json({ success: false, error: String(err) });
  }
});

export default router;
