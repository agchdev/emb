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
  //const topText = isEs ? "VAMOS" : "LET'S";
  //const bottomText = isEs ? "A TOPE" : "ROCK";
  //const email = "hello@emb.productions";

  return (
    <section
      id="contact"
      className="h-[100vh] z-20 mt-32 text-white"
    >
      <div className="w-full h-full mx-auto">
        <div className="relative h-full w-full overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="group relative flex items-center justify-center">
              {/* Botón GO pequeño */}
              <div className="relative z-10 flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-black text-[#ff0040] font-mono text-xs tracking-[0.35em] uppercase transition-all duration-400 ease-[cubic-bezier(1,0,1,1)] group-hover:scale-0 group-hover:opacity-0">
                <span>GO</span>
              </div>

              {/* Círculo grande que aparece al hover */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative z-10 flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-black text-[#ff0040] font-mono text-xs uppercase scale-0 group-hover:scale-600 transition-transform duration-600 ease-[cubic-bezier(1,0,1,1)]">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
