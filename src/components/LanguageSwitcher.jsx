"use client"

import { useEffect } from "react"

export function LanguageSwitcher({ lang, setLang }) {
  const isEs = lang === "es";

  // Broadcast simple del idioma actual para componentes globales
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem("emb_lang", lang);
    } catch (e) {}
    const ev = new CustomEvent("emb-lang-change", { detail: lang });
    window.dispatchEvent(ev);
  }, [lang]);

  return (
    <div className="pointer-events-auto fixed right-4 top-4 md:right-6 md:top-6 z-[5000] text-[11px] font-mono tracking-[0.25em] uppercase flex items-center gap-1 rounded-full border border-white/15 bg-black/60 px-2 py-1 backdrop-blur">
      <button
        type="button"
        onClick={() => setLang("es")}
        className={
          isEs
            ? "px-2 py-1 bg-white text-black"
            : "px-2 py-1 text-white/60 hover:text-white"
        }
      >
        ES
      </button>
      <span className="text-white/30">/</span>
      <button
        type="button"
        onClick={() => setLang("en")}
        className={
          !isEs
            ? "px-2 py-1 bg-white text-black"
            : "px-2 py-1 text-white/60 hover:text-white"
        }
      >
        EN
      </button>
    </div>
  );
}
