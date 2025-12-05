"use client";
import { useEffect, useState } from "react";
import Noise from "./Noise";

export function FooterCta() {
  const [lang, setLang] = useState("en");

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

  const isEs = lang === "es";

  return (
    <section
      id="contact"
      className="footer-cta-root relative h-[100vh] z-20 mt-32 text-white overflow-hidden"
    >

      <div className="relative w-full h-full mx-auto flex items-center justify-center">
        <div className="group relative flex items-center justify-center">
          {/* Wrapper que late como un corazón */}
          <div className="footer-cta-heart-wrapper">
            {/* Botón GO pequeño */}
            <div className="relative z-10 flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-black text-[#ff0040] font-mono text-xs tracking-[0.35em] uppercase transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-0 group-hover:opacity-0">
              <span>GO</span>
            </div>
          </div>

          {/* Círculo grande que aparece al hover */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="footer-cta-big-circle relative flex items-center justify-center rounded-full bg-black/90 text-[#ff0040] border border-[#ff0040]/60 shadow-[0_0_80px_rgba(0,0,0,0.8)] w-16 h-16 md:w-20 md:h-20 max-w-none scale-0 group-hover:scale-500 transition-transform duration-600 ease-[cubic-bezier(0.19,1,0.22,1)]">
              {/* Más adelante podemos volver a añadir aquí el texto LET'S / ROCK sincronizado con el idioma */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
