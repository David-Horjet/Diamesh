import { Router, type RequestHandler } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { z } from "zod";
import {
  createCase,
  updateCase,
  touchCase,
  getCaseById,
  listCases,
  insertCaseImage,
  deleteCaseImage,
  getAgentRunsByCase,
  getReportByCase,
} from "../db/queries.js";
import type { CaseImage } from "@diamesh/shared";

const router = Router();

const UPLOADS_DIR = path.resolve("./uploads");
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

const upload = multer({
  dest: UPLOADS_DIR,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
  fileFilter: (_req, file, cb) => {
    // WebP is deliberately NOT accepted. The vision model's multimodal loader
    // (llama.cpp mtmd → stb_image) cannot decode it, so a WebP upload succeeds
    // here and then fails mid-pipeline with "[MtmdLlm] Failed to load media
    // from file". Rejecting at upload turns a confusing pipeline crash into an
    // immediate, explainable error.
    const allowed = ["image/jpeg", "image/png"];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
      return;
    }
    // Reject loudly — returning `false` would silently drop the file and
    // create a case that quietly has no image to analyse.
    cb(new Error(`Unsupported image type "${file.mimetype}". Use JPEG or PNG.`));
  },
});

// Same fields as create, all optional — a PATCH only changes what it sends.
const UpdateCaseSchema = z.object({
  patientName: z.string().min(1).optional(),
  patientDob: z.string().optional(),
  chiefComplaint: z.string().min(1).optional(),
  clinicalNotes: z.string().optional(),
  vaOd: z.string().optional(),
  vaOs: z.string().optional(),
  refractionOd: z.string().optional(),
  refractionOs: z.string().optional(),
  ocularFindings: z.string().optional(),
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
// Surface upload rejections (unsupported type, size limit) as a 400 with the
// real reason, instead of letting them reach the generic 500 error handler.
const uploadImages = upload.array("images", 5);
const handleUpload: RequestHandler = (req, res, next) => {
  uploadImages(req, res, (err: unknown) => {
    if (err) {
      res.status(400).json({ success: false, error: (err as Error).message });
      return;
    }
    next();
  });
};

router.post("/", handleUpload, (req, res) => {
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

// PATCH /api/cases/:id  — edit clinical fields and/or attach more images.
// Multipart, same as create, so the edit form can send fields and new files
// in one request. Omitted fields are left untouched.
router.patch("/:id", handleUpload, (req, res) => {
  try {
    // String(): with middleware between the path and handler, Express widens
    // req.params to string | string[].
    const id = String(req.params["id"] ?? "");
    if (!getCaseById(id)) {
      res.status(404).json({ success: false, error: "Case not found" });
      return;
    }

    const parsed = UpdateCaseSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ success: false, error: "Invalid input", details: parsed.error.flatten() });
      return;
    }

    const updated = updateCase(id, parsed.data);
    if (!updated) {
      res.status(404).json({ success: false, error: "Case not found" });
      return;
    }

    const files = req.files as Express.Multer.File[] | undefined;
    if (files && files.length > 0) {
      for (const file of files) {
        const imageType = (req.body[`imageType_${file.fieldname}`] ?? "other") as CaseImage["imageType"];
        insertCaseImage(id, imageType, file.path);
      }
      touchCase(id);
    }

    res.json({ success: true, data: getCaseById(id) });
  } catch (err) {
    res.status(500).json({ success: false, error: String(err) });
  }
});

// DELETE /api/cases/:id/images/:imageId
router.delete("/:id/images/:imageId", (req, res) => {
  try {
    const id = req.params["id"] ?? "";
    const imageId = req.params["imageId"] ?? "";

    const removed = deleteCaseImage(id, imageId);
    if (!removed) {
      res.status(404).json({ success: false, error: "Image not found on this case" });
      return;
    }

    // Best-effort: the DB row is already gone, so a missing/locked file must
    // not fail the request.
    try {
      if (fs.existsSync(removed.filePath)) fs.unlinkSync(removed.filePath);
    } catch { /* leave the orphaned file rather than erroring the request */ }

    res.json({ success: true, data: getCaseById(id) });
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
