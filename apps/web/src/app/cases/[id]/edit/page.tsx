"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  UserIcon,
  Note01Icon,
  ViewIcon,
  Eye,
  Image01Icon,
  Upload01Icon,
  Delete02Icon,
  ArrowLeft01Icon,
  AlertCircleIcon,
} from "@hugeicons/core-free-icons";
import Sidebar from "@/components/Sidebar";
import { getCase, updateCase, deleteCaseImage } from "@/lib/api";
import type { ClinicalCase, CaseImage, UpdateCaseInput } from "@diamesh/shared";

const IMAGE_TYPES = [
  { value: "fundus", label: "Fundus" },
  { value: "oct", label: "OCT" },
  { value: "slit_lamp", label: "Slit Lamp" },
  { value: "other", label: "Other" },
];

interface NewImage {
  file: File;
  imageType: string;
  preview: string;
}

type FormState = Required<{ [K in keyof UpdateCaseInput]: string }>;

const EMPTY: FormState = {
  patientName: "",
  patientDob: "",
  chiefComplaint: "",
  clinicalNotes: "",
  vaOd: "",
  vaOs: "",
  refractionOd: "",
  refractionOs: "",
  ocularFindings: "",
};

export default function EditCasePage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  const [form, setForm] = useState<FormState>(EMPTY);
  const [existingImages, setExistingImages] = useState<CaseImage[]>([]);
  const [newImages, setNewImages] = useState<NewImage[]>([]);
  const [hadReport, setHadReport] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!id) return;
    getCase(id)
      .then((c: ClinicalCase) => {
        setForm({
          patientName: c.patient?.name ?? "",
          patientDob: c.patient?.dob ?? "",
          chiefComplaint: c.chiefComplaint,
          clinicalNotes: c.clinicalNotes ?? "",
          vaOd: c.vaOd ?? "",
          vaOs: c.vaOs ?? "",
          refractionOd: c.refractionOd ?? "",
          refractionOs: c.refractionOs ?? "",
          ocularFindings: c.ocularFindings ?? "",
        });
        setExistingImages(c.images ?? []);
        setHadReport(c.status === "completed");
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  const set = (k: keyof FormState, v: string) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  function handleFiles(files: FileList) {
    const entries: NewImage[] = Array.from(files).map((file) => ({
      file,
      imageType: "fundus",
      preview: URL.createObjectURL(file),
    }));
    setNewImages((prev) => [...prev, ...entries].slice(0, 5));
  }

  function removeNewImage(idx: number) {
    setNewImages((prev) => {
      URL.revokeObjectURL(prev[idx]!.preview);
      return prev.filter((_, i) => i !== idx);
    });
  }

  // Existing images are deleted server-side immediately — they are already
  // persisted, so there is nothing to "save" and no ambiguity if the user
  // navigates away afterwards.
  async function removeExistingImage(imageId: string) {
    setError(null);
    try {
      const updated = await deleteCaseImage(id, imageId);
      setExistingImages(updated.images ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to remove image");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.patientName.trim() || !form.chiefComplaint.trim()) return;
    setSaving(true);
    setError(null);

    try {
      await updateCase(
        id,
        form,
        newImages.map(({ file, imageType }) => ({ file, imageType }))
      );
      router.push(`/cases/${id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save changes");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col md:flex-row h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-dark/40 dark:text-white/40 text-sm">Loading…</div>
        </main>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="flex flex-col md:flex-row h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-dark/50 dark:text-white/40">Case not found</p>
            <Link href="/" className="btn-secondary mt-4 inline-flex">
              <HugeiconsIcon icon={ArrowLeft01Icon} size={16} strokeWidth={1.8} />
              Dashboard
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 sm:px-8 py-6 sm:py-8">
          <div className="mb-6">
            <Link
              href={`/cases/${id}`}
              className="text-xs text-dark/40 dark:text-white/30 hover:text-brand-500 flex items-center gap-1 transition-colors mb-1"
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} size={14} strokeWidth={1.8} />
              Back to case
            </Link>
            <h1 className="text-2xl font-bold">Edit Case</h1>
            <p className="text-sm text-dark/50 dark:text-white/40 mt-0.5">
              All data is stored locally and never transmitted
            </p>
          </div>

          {hadReport && (
            <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 px-4 py-3 mb-6 flex items-start gap-2">
              <HugeiconsIcon
                icon={AlertCircleIcon}
                size={16}
                strokeWidth={1.8}
                className="text-yellow-600 dark:text-yellow-400 mt-0.5 shrink-0"
              />
              <p className="text-xs text-dark/60 dark:text-white/50">
                <span className="font-medium text-dark/80 dark:text-white/70">This case already has a report. </span>
                Saving changes will mark that report out of date — re-run the analysis to regenerate it.
              </p>
            </div>
          )}

          <form onSubmit={(e) => { void handleSubmit(e); }} className="space-y-6">

            {/* Patient Info */}
            <div className="card">
              <div className="card-header">
                <h2 className="text-sm font-semibold flex items-center gap-2">
                  <HugeiconsIcon icon={UserIcon} size={16} strokeWidth={1.8} className="text-brand-500" />
                  Patient Information
                </h2>
              </div>
              <div className="card-body grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">Full Name *</label>
                  <input
                    className="input"
                    placeholder="Patient name"
                    value={form.patientName}
                    onChange={(e) => set("patientName", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="label">Date of Birth</label>
                  <input
                    className="input"
                    type="date"
                    value={form.patientDob}
                    onChange={(e) => set("patientDob", e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Chief Complaint */}
            <div className="card">
              <div className="card-header">
                <h2 className="text-sm font-semibold flex items-center gap-2">
                  <HugeiconsIcon icon={Note01Icon} size={16} strokeWidth={1.8} className="text-brand-500" />
                  Chief Complaint & History
                </h2>
              </div>
              <div className="card-body space-y-4">
                <div>
                  <label className="label">Chief Complaint *</label>
                  <input
                    className="input"
                    placeholder="e.g. Blurred vision for 2 weeks, worse at distance"
                    value={form.chiefComplaint}
                    onChange={(e) => set("chiefComplaint", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="label">Clinical Notes</label>
                  <textarea
                    className="input min-h-[90px] resize-none"
                    placeholder="History of presenting illness, past ocular history, medications, allergies..."
                    value={form.clinicalNotes}
                    onChange={(e) => set("clinicalNotes", e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Visual Acuity & Refraction */}
            <div className="card">
              <div className="card-header">
                <h2 className="text-sm font-semibold flex items-center gap-2">
                  <HugeiconsIcon icon={ViewIcon} size={16} strokeWidth={1.8} className="text-brand-500" />
                  Visual Acuity & Refraction
                </h2>
              </div>
              <div className="card-body grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">VA — Right Eye (OD)</label>
                  <input className="input" placeholder="e.g. 6/6, 6/18, CF" value={form.vaOd} onChange={(e) => set("vaOd", e.target.value)} />
                </div>
                <div>
                  <label className="label">VA — Left Eye (OS)</label>
                  <input className="input" placeholder="e.g. 6/6, 6/18, CF" value={form.vaOs} onChange={(e) => set("vaOs", e.target.value)} />
                </div>
                <div>
                  <label className="label">Refraction OD</label>
                  <input className="input" placeholder="e.g. -2.50 / -0.75 × 180" value={form.refractionOd} onChange={(e) => set("refractionOd", e.target.value)} />
                </div>
                <div>
                  <label className="label">Refraction OS</label>
                  <input className="input" placeholder="e.g. -2.50 / -0.75 × 180" value={form.refractionOs} onChange={(e) => set("refractionOs", e.target.value)} />
                </div>
              </div>
            </div>

            {/* Ocular Findings */}
            <div className="card">
              <div className="card-header">
                <h2 className="text-sm font-semibold flex items-center gap-2">
                  <HugeiconsIcon icon={Eye} size={16} strokeWidth={1.8} className="text-brand-500" />
                  Ocular Findings
                </h2>
              </div>
              <div className="card-body">
                <textarea
                  className="input min-h-[100px] resize-none"
                  placeholder="IOP, slit-lamp findings, fundus findings, fields, OCT results..."
                  value={form.ocularFindings}
                  onChange={(e) => set("ocularFindings", e.target.value)}
                />
              </div>
            </div>

            {/* Images */}
            <div className="card">
              <div className="card-header">
                <h2 className="text-sm font-semibold flex items-center gap-2">
                  <HugeiconsIcon icon={Image01Icon} size={16} strokeWidth={1.8} className="text-brand-500" />
                  Clinical Images
                </h2>
                <p className="text-xs text-dark/40 dark:text-white/30 mt-0.5">
                  Removing an existing image takes effect immediately
                </p>
              </div>
              <div className="card-body space-y-4">

                {/* Already attached */}
                {existingImages.length > 0 && (
                  <div>
                    <span className="label">Attached</span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-1">
                      {existingImages.map((img) => (
                        <div
                          key={img.id}
                          className="rounded-xl border border-black/[0.06] dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-2 flex flex-col gap-2"
                        >
                          <span className="badge bg-black/5 dark:bg-white/10 text-dark/50 dark:text-white/40 w-fit capitalize">
                            {img.imageType.replace("_", " ")}
                          </span>
                          <button
                            type="button"
                            onClick={() => { void removeExistingImage(img.id); }}
                            className="text-xs text-red-500 hover:text-red-400 flex items-center gap-1 self-start"
                          >
                            <HugeiconsIcon icon={Delete02Icon} size={14} strokeWidth={1.8} />
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Add more */}
                <div
                  onClick={() => fileRef.current?.click()}
                  onDrop={(e) => { e.preventDefault(); if (e.dataTransfer.files) handleFiles(e.dataTransfer.files); }}
                  onDragOver={(e) => e.preventDefault()}
                  className="border-2 border-dashed border-black/10 dark:border-white/15 rounded-xl p-6 text-center cursor-pointer hover:border-brand-500 hover:bg-brand-500/5 transition-all"
                >
                  <HugeiconsIcon icon={Upload01Icon} size={22} strokeWidth={1.8} className="mx-auto mb-2 text-dark/30 dark:text-white/30" />
                  <p className="text-sm text-dark/50 dark:text-white/40">Drop images here or click to upload</p>
                  <p className="text-xs text-dark/30 dark:text-white/25 mt-1">PNG or JPG · max 20MB each</p>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/png,image/jpeg"
                    multiple
                    className="hidden"
                    onChange={(e) => { if (e.target.files) handleFiles(e.target.files); }}
                  />
                </div>

                {newImages.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {newImages.map((img, i) => (
                      <div key={i} className="relative group rounded-xl overflow-hidden border border-black/[0.06] dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={img.preview} alt="" className="w-full h-24 object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                          <button
                            type="button"
                            onClick={() => removeNewImage(i)}
                            className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1"
                          >
                            <HugeiconsIcon icon={Delete02Icon} size={14} strokeWidth={1.8} />
                            Remove
                          </button>
                        </div>
                        <div className="p-2">
                          <select
                            value={img.imageType}
                            onChange={(e) =>
                              setNewImages((prev) => prev.map((n, idx) => (idx === i ? { ...n, imageType: e.target.value } : n)))
                            }
                            className="w-full text-xs bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 rounded px-1 py-0.5 text-dark/70 dark:text-white/70"
                          >
                            {IMAGE_TYPES.map((t) => (
                              <option key={t.value} value={t.value}>{t.label}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            <div className="flex gap-3 justify-end">
              <Link href={`/cases/${id}`} className="btn-secondary">
                Cancel
              </Link>
              <button type="submit" disabled={saving} className="btn-primary min-w-[140px]">
                {saving ? "Saving…" : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
