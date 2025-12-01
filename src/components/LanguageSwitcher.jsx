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
    <div className="fixed right-6 top-6 z-50 text-[11px] font-mono tracking-[0.25em] uppercase flex items-center gap-1">
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
