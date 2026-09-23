"use client";

import { useState } from "react";
import RepairForm from "./components/RepairForm";
import { Lang } from "./lib/formConfig";

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");

  return (
    <main className="min-h-screen flex flex-col items-center bg-[#F5F6F8] px-4 py-10">
      <div className="w-full max-w-[520px] flex justify-end mb-3">
        <div className="inline-flex rounded-md border border-[#D8DCE3] overflow-hidden">
          <button
            onClick={() => setLang("en")}
            className={`px-3 py-1.5 text-sm font-medium ${lang === "en" ? "bg-[#1B3A6B] text-white" : "bg-white text-[#6B7280]"}`}
          >
            EN
          </button>
          <button
            onClick={() => setLang("es")}
            className={`px-3 py-1.5 text-sm font-medium ${lang === "es" ? "bg-[#1B3A6B] text-white" : "bg-white text-[#6B7280]"}`}
          >
            ES
          </button>
        </div>
      </div>
      <RepairForm lang={lang} />
    </main>
  );
}
