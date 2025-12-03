"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function SectionWordmark() {
  const pathname = usePathname();
  const [lang, setLang] = useState("en");

  // Solo en páginas internas (no Home)
  const isHome = !pathname || pathname === "/";

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("emb_lang");
    if (stored === "es" || stored === "en") {
      setLang(stored);
    }

    const handler = (event) => {
      const next = event && event.detail;
      if (next === "es" || next === "en") {
        setLang(next);
      }
    };

    window.addEventListener("emb-lang-change", handler);
    return () => window.removeEventListener("emb-lang-change", handler);
  }, []);

  if (isHome) return null;

  const isEs = lang === "es";
  const text = isEs ? "Trabajos" : "Works";

  return (
    <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center select-none">
      {isEs ? (
        <p className="text-[20vw] md:text-[14vw] lg:text-[15vw] font-black uppercase tracking-[0.08em] text-white/20">
          <span className="inline-block" aria-hidden="true">
            {text.split("").map((ch, idx) => (
              <span
                key={idx}
                className="inline-block opacity-[0.45]"
                aria-hidden="true"
              >
                {ch}
              </span>
            ))}
          </span>
          <span className="sr-only">{text}</span>
        </p>
      ) : (
        <p className="text-[20vw] md:text-[14vw] lg:text-[20vw] font-black uppercase tracking-[0.04em] text-white/20">
          <span className="inline-block" aria-hidden="true">
            {text.split("").map((ch, idx) => (
              <span
                key={idx}
                className="inline-block opacity-[0.45]"
                aria-hidden="true"
              >
                {ch}
              </span>
            ))}
          </span>
          <span className="sr-only">{text}</span>
        </p>
      )}
    </div>
  );
}
