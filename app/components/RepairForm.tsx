"use client";

import { useState } from "react";
import Image from "next/image";
import {
  labels,
  shiftOptions,
  brokenPartsOptions,
  locationOptions,
  Lang,
} from "../lib/formConfig";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function RepairForm({ lang }: { lang: Lang }) {
  const [locationId, setLocationId] = useState("");
  const [shift, setShift] = useState("");
  const [cartNumber, setCartNumber] = useState("");
  const [brokenParts, setBrokenParts] = useState<string[]>([]);
  const [photo, setPhoto] = useState<File | null>(null);
  const [reportedBy, setReportedBy] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function toggleBrokenPart(id: string) {
    setBrokenParts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setStatus("idle");

    const formData = new FormData();
    formData.append("locationId", locationId);
    formData.append("shift", shift);
    formData.append("cartNumber", cartNumber);
    formData.append("brokenParts", JSON.stringify(brokenParts));
    formData.append("reportedBy", reportedBy);
    if (photo) formData.append("photo", photo);

    try {
      const res = await fetch("/api/submit-repair", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Submit failed");
      setStatus("success");
      setLocationId("");
      setShift("");
      setCartNumber("");
      setBrokenParts([]);
      setPhoto(null);
      setReportedBy("");
    } catch {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  }

  const labelClass = "block font-semibold text-[16px] mb-2 text-[#1B2A4A]";
  const inputClass =
    "w-full rounded-md border border-[#D8DCE3] bg-white px-3 py-2.5 text-[15px] outline-none focus:border-[#1B3A6B] transition-colors";

  function OptionBadge({ index, active }: { index: number; active: boolean }) {
    return (
      <span
        className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-[12px] font-semibold border mr-2 shrink-0 ${
          active
            ? "bg-[#1B3A6B] border-[#1B3A6B] text-white"
            : "bg-white border-[#D8DCE3] text-[#6B7280]"
        }`}
      >
        {LETTERS[index]}
      </span>
    );
  }

  return (
    <div className="w-full max-w-[520px] rounded-xl overflow-hidden border border-[#D8DCE3] bg-white shadow-sm">
      <div className="relative w-full aspect-[3/1]">
        <Image
          src="/catholic-health-banner.png"
          alt="Catholic Health"
          fill
          className="object-cover"
        />
      </div>

      <form onSubmit={handleSubmit} className="px-6 py-7">
        <h1 className="font-bold text-[22px] leading-tight mb-6 text-[#1B2A4A]">
          {labels.title[lang]}
        </h1>

        <div className="space-y-6">
          <div>
            <label className={labelClass}>{labels.location[lang]} *</label>
            <select
              className={inputClass}
              value={locationId}
              onChange={(e) => setLocationId(e.target.value)}
              required
            >
              <option value="">{labels.selectPlaceholder[lang]}</option>
              {locationOptions.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>{labels.shift[lang]} *</label>
            <div className="space-y-2">
              {shiftOptions.map((s, i) => (
                <button
                  type="button"
                  key={s.id}
                  onClick={() => setShift(s.id)}
                  className={`w-full flex items-center rounded-md border px-3 py-2.5 text-[15px] text-left transition-colors ${
                    shift === s.id
                      ? "border-[#1B3A6B] bg-[#1B3A6B]/5"
                      : "border-[#D8DCE3] bg-white"
                  }`}
                >
                  <OptionBadge index={i} active={shift === s.id} />
                  {s[lang]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={labelClass}>{labels.cartNumber[lang]} *</label>
            <input
              type="text"
              className={inputClass}
              value={cartNumber}
              onChange={(e) => setCartNumber(e.target.value)}
              required
            />
          </div>

          <div>
            <label className={labelClass}>{labels.brokenParts[lang]} *</label>
            <div className="space-y-2">
              {brokenPartsOptions.map((option, i) => {
                const selected = brokenParts.includes(option.id);
                return (
                  <button
                    type="button"
                    key={option.id}
                    onClick={() => toggleBrokenPart(option.id)}
                    className={`w-full flex items-center rounded-md border px-3 py-2.5 text-[14.5px] text-left transition-colors ${
                      selected
                        ? "border-[#1B3A6B] bg-[#1B3A6B]/5"
                        : "border-[#D8DCE3] bg-white"
                    }`}
                  >
                    <OptionBadge index={i} active={selected} />
                    {option[lang]}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className={labelClass}>{labels.photo[lang]}</label>
            <label className="flex flex-col items-center justify-center gap-1 rounded-md border border-dashed border-[#D8DCE3] bg-white px-3 py-6 text-center cursor-pointer hover:border-[#1B3A6B] transition-colors">
              <span className="text-[14px] font-medium text-[#1B2A4A]">
                {photo ? photo.name : labels.photoHint[lang]}
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setPhoto(e.target.files?.[0] ?? null)}
              />
            </label>
          </div>

          <div>
            <label className={labelClass}>{labels.reportedBy[lang]} *</label>
            <input
              type="text"
              className={inputClass}
              value={reportedBy}
              onChange={(e) => setReportedBy(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-md bg-[#C9A227] text-white font-semibold text-[15px] py-3 mt-2 disabled:opacity-60 transition-opacity"
          >
            {submitting
              ? lang === "en"
                ? "Sending..."
                : "Enviando..."
              : labels.submit[lang]}
          </button>

          {status === "success" && (
            <p className="text-center text-[14px] font-medium text-[#1B3A6B]">
              {lang === "en"
                ? "✓ Sent. The team has been notified."
                : "✓ Enviado. Se notificó al equipo."}
            </p>
          )}
          {status === "error" && (
            <p className="text-center text-[14px] font-medium text-[#B14B2C]">
              {lang === "en"
                ? "Something went wrong. Try again."
                : "Algo salió mal. Inténtelo de nuevo."}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
