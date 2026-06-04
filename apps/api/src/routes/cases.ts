import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { z } from "zod";
import {
  createCase,
  getCaseById,
  listCases,
  insertCaseImage,
  getAgentRunsByCase,
  getReportByCase,
} from "../db/queries.js";

const router = Router();

const UPLOADS_DIR = path.resolve("./uploads");
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

const upload = multer({
  dest: UPLOADS_DIR,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
  fileFilter: (_req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    cb(null, allowed.includes(file.mimetype));
  },
});

const CreateCaseSchema = z.object({
  patientName: z.string().min(1),
  patientDob: z.string().optional(),
  chiefComplaint: z.string().min(1),
  clinicalNotes: z.string().optional(),
  vaOd: z.string().optional(),
  vaOs: z.string().optional(),
  refractionOd: z.string().optional(),
  refractionOs: z.string().optional(),
  ocularFindings: z.string().optional(),
});

// POST /api/cases
router.post("/", upload.array("images", 5), (req, res) => {
  try {
    const parsed = CreateCaseSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ success: false, error: "Invalid input", details: parsed.error.flatten() });
      return;
    }

    const d = parsed.data;
    const newCase = createCase({
      patientName: d.patientName,
      chiefComplaint: d.chiefComplaint,
      ...(d.patientDob !== undefined && { patientDob: d.patientDob }),
      ...(d.clinicalNotes !== undefined && { clinicalNotes: d.clinicalNotes }),
      ...(d.vaOd !== undefined && { vaOd: d.vaOd }),
      ...(d.vaOs !== undefined && { vaOs: d.vaOs }),
      ...(d.refractionOd !== undefined && { refractionOd: d.refractionOd }),
      ...(d.refractionOs !== undefined && { refractionOs: d.refractionOs }),
      ...(d.ocularFindings !== undefined && { ocularFindings: d.ocularFindings }),
    });

    // Attach uploaded images
    const files = req.files as Express.Multer.File[] | undefined;
    if (files && files.length > 0) {
      for (const file of files) {
        const imageType = (req.body[`imageType_${file.fieldname}`] ?? "other") as "fundus" | "oct" | "slit_lamp" | "other";
        insertCaseImage(newCase.id, imageType, file.path);
      }
    }

    res.status(201).json({ success: true, data: getCaseById(newCase.id) });
  } catch (err) {
    res.status(500).json({ success: false, error: String(err) });
  }
});

// GET /api/cases
router.get("/", (req, res) => {
  try {
    const limit = Number(req.query["limit"] ?? 20);
    const offset = Number(req.query["offset"] ?? 0);
    res.json({ success: true, data: listCases(limit, offset) });
  } catch (err) {
    res.status(500).json({ success: false, error: String(err) });
  }
});

// GET /api/cases/:id
router.get("/:id", (req, res) => {
  try {
    const c = getCaseById(req.params["id"] ?? "");
    if (!c) {
      res.status(404).json({ success: false, error: "Case not found" });
      return;
    }
    res.json({ success: true, data: c });
  } catch (err) {
    res.status(500).json({ success: false, error: String(err) });
  }
});

// GET /api/cases/:id/report
router.get("/:id/report", (req, res) => {
  try {
    const report = getReportByCase(req.params["id"] ?? "");
    if (!report) {
      res.status(404).json({ success: false, error: "Report not found — run analysis first" });
      return;
    }
    res.json({ success: true, data: report });
  } catch (err) {
    res.status(500).json({ success: false, error: String(err) });
  }
});

// GET /api/cases/:id/runs
router.get("/:id/runs", (req, res) => {
  try {
    const runs = getAgentRunsByCase(req.params["id"] ?? "");
    res.json({ success: true, data: runs });
  } catch (err) {
    res.status(500).json({ success: false, error: String(err) });
  }
});

export default router;
