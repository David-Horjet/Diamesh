"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  UserIcon,
  Note01Icon,
  ViewIcon,
  Eye,
  Image01Icon,
  Upload01Icon,
  Delete02Icon,
} from "@hugeicons/core-free-icons";
import Sidebar from "@/components/Sidebar";
import { createCase } from "@/lib/api";
import type { CreateCaseInput } from "@diamesh/shared";

const IMAGE_TYPES = [
  { value: "fundus", label: "Fundus" },
  { value: "oct", label: "OCT" },
  { value: "slit_lamp", label: "Slit Lamp" },
  { value: "other", label: "Other" },
];

interface ImageEntry {
  file: File;
  imageType: string;
  preview: string;
}

export default function NewCasePage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<ImageEntry[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<CreateCaseInput>({
    patientName: "",
    patientDob: "",
    chiefComplaint: "",
    clinicalNotes: "",
    vaOd: "",
    vaOs: "",
    refractionOd: "",
    refractionOs: "",
    ocularFindings: "",
  });

  const set = (k: keyof CreateCaseInput, v: string) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  function handleFiles(files: FileList) {
    const newEntries: ImageEntry[] = [];
    for (const file of Array.from(files)) {
      newEntries.push({
        file,
        imageType: "fundus",
        preview: URL.createObjectURL(file),
      });
    }
    setImages((prev) => [...prev, ...newEntries].slice(0, 5));
  }

  function updateImageType(idx: number, imageType: string) {
    setImages((prev) => prev.map((e, i) => (i === idx ? { ...e, imageType } : e)));
  }

  function removeImage(idx: number) {
    setImages((prev) => {
      URL.revokeObjectURL(prev[idx]!.preview);
      return prev.filter((_, i) => i !== idx);
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.patientName || !form.chiefComplaint) return;
    setSubmitting(true);
    setError(null);

    try {
      const newCase = await createCase(
        form,
        images.map(({ file, imageType }) => ({ file, imageType }))
      );
      router.push(`/cases/${newCase.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create case");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 sm:px-8 py-6 sm:py-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">New Clinical Case</h1>
            <p className="text-sm text-dark/50 dark:text-white/40 mt-0.5">
              All data is stored locally and never transmitted
            </p>
          </div>

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
                  Clinical Images (optional)
                </h2>
                <p className="text-xs text-dark/40 dark:text-white/30 mt-0.5">Fundus, OCT, slit-lamp — up to 5 images</p>
              </div>
              <div className="card-body space-y-3">
                {/* Drop zone */}
                <div
                  onClick={() => fileRef.current?.click()}
                  onDrop={(e) => { e.preventDefault(); if (e.dataTransfer.files) handleFiles(e.dataTransfer.files); }}
                  onDragOver={(e) => e.preventDefault()}
                  className="border-2 border-dashed border-black/10 dark:border-white/15 rounded-xl p-6 text-center cursor-pointer hover:border-brand-500 hover:bg-brand-500/5 transition-all"
                >
                  <HugeiconsIcon icon={Upload01Icon} size={22} strokeWidth={1.8} className="mx-auto mb-2 text-dark/30 dark:text-white/30" />
                  <p className="text-sm text-dark/50 dark:text-white/40">Drop images here or click to upload</p>
                  <p className="text-xs text-dark/30 dark:text-white/25 mt-1">PNG, JPG, WEBP · max 20MB each</p>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    multiple
                    className="hidden"
                    onChange={(e) => { if (e.target.files) handleFiles(e.target.files); }}
                  />
                </div>

                {/* Previews */}
                {images.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {images.map((img, i) => (
                      <div key={i} className="relative group rounded-xl overflow-hidden border border-black/[0.06] dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={img.preview} alt="" className="w-full h-24 object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                          <button
                            type="button"
                            onClick={() => removeImage(i)}
                            className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1"
                          >
                            <HugeiconsIcon icon={Delete02Icon} size={14} strokeWidth={1.8} />
                            Remove
                          </button>
                        </div>
                        <div className="p-2">
                          <select
                            value={img.imageType}
                            onChange={(e) => updateImageType(i, e.target.value)}
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
              <button type="button" onClick={() => router.back()} className="btn-secondary">
                Cancel
              </button>
              <button type="submit" disabled={submitting} className="btn-primary min-w-[140px]">
                {submitting ? "Creating…" : "Create & Analyze"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
