"use client"

import { useEffect, useState } from "react";

export function HomeSection({ isEs }) {
  const focusItemsEs = [
    "UEFN / ISLAS INTERACTIVAS",
    "DEV / LANDINGS REACT",
    "MUSIC / SOUND DESIGN",
    "VFX / GLITCH & HUDS",
  ];

  const focusItemsEn = [
    "UEFN / INTERACTIVE ISLANDS",
    "DEV / REACT LANDINGS",
    "MUSIC / SOUND DESIGN",
    "VFX / GLITCH & HUDS",
  ];

  const [focusIndex, setFocusIndex] = useState(0);

  useEffect(() => {
    setFocusIndex(0);
    const id = setInterval(() => {
      setFocusIndex((prev) => {
        const list = isEs ? focusItemsEs : focusItemsEn;
        if (list.length === 0) return 0;
        return (prev + 1) % list.length;
      });
    }, 3500);
    return () => clearInterval(id);
  }, [isEs]);

  return (
    <section id="home" className="pt-40 pb-32">
      <div className="max-w-5xl mx-auto">
        <p className="text-[11px] font-mono tracking-[0.35em] text-white/40 mb-4">
          C:\EMB\HOME
        </p>
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">
          {isEs
            ? "Dirección creativa, VFX y experiencias interactivas."
            : "Creative direction, VFX & interactive experiences."}
        </h1>
        <p className="text-sm md:text-base text-white/70 max-w-2xl">
          {isEs
            ? "Combino motores en tiempo real, motion design y sonido para crear secuencias cinematográficas, visuales estilizadas y experiencias web experimentales."
            : "I combine real-time engines, motion design and sound to craft cinematic sequences, stylized visuals and experimental web experiences."}
        </p>

        <div className="mt-6 inline-flex items-center gap-3 text-[11px] font-mono tracking-[0.25em] text-white/60">
          <span className="h-px w-8 bg-white/30" />
          <span className="uppercase">
            {isEs ? "FOCO ACTUAL" : "CURRENT FOCUS"}
          </span>
          <span className="text-white">
            {(isEs ? focusItemsEs : focusItemsEn)[focusIndex]}
          </span>
        </div>

        {/* resumen rápido en 3 columnas */}
        <div className="grid gap-4 mt-10 md:grid-cols-3">
          <div className="border border-white/10 bg-white/5 backdrop-blur-md px-4 py-3 text-xs uppercase tracking-[0.2em]">
            <p className="text-white/40 mb-1">{isEs ? "FOCO" : "FOCUS"}</p>
            <p className="text-white">3D · VFX · EDIT</p>
          </div>
          <div className="border border-white/10 bg-white/5 backdrop-blur-md px-4 py-3 text-xs uppercase tracking-[0.2em]">
            <p className="text-white/40 mb-1">
              {isEs ? "HERRAMIENTAS" : "TOOLS"}
            </p>
            <p className="text-white">UEFN · AFTER EFFECTS · BLENDER</p>
          </div>
          <div className="border border-white/10 bg-white/5 backdrop-blur-md px-4 py-3 text-xs uppercase tracking-[0.2em]">
            <p className="text-white/40 mb-1">
              {isEs ? "DISPONIBLE PARA" : "AVAILABLE FOR"}
            </p>
            <p className="text-white">
              {isEs ? "PROYECTOS · COLABS" : "PROJECTS · COLLABS"}
            </p>
          </div>
        </div>

        {/* detalle de lo que haces y para quién */}
        <div className="mt-10 grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)] text-xs md:text-sm text-white/70">
          <div>
            <p className="text-white/40 uppercase tracking-[0.2em] mb-3">
              {isEs ? "QUÉ HAGO" : "WHAT I DO"}
            </p>
            <ul className="space-y-2">
              <li className="flex gap-3">
                <span className="mt-2 h-px w-6 bg-white/30" />
                <span>
                  {isEs
                    ? "Concepto, dirección de arte y edición para piezas cortas: intros, trailers, reels y secuencias experimentales."
                    : "Concept, art direction and editing for short-form pieces: intros, trailers, reels and experimental sequences."}
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-px w-6 bg-white/30" />
                <span>
                  {isEs
                    ? "Mezcla de metraje real, VFX estilizado y overlays tipo HUD para crear una identidad visual fuerte."
                    : "Blend of live-action footage, stylized VFX and HUD-style overlays to create a strong visual identity."}
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-px w-6 bg-white/30" />
                <span>
                  {isEs
                    ? "Sincronía entre visuales, tipografía y sonido para que cada corte se sienta preciso e intencional."
                    : "Sync between visuals, typography and sound so that every cut feels sharp and intentional."}
                </span>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-white/40 uppercase tracking-[0.2em] mb-3">
              {isEs ? "PARA QUIÉN" : "WHO IT'S FOR"}
            </p>
            <ul className="space-y-2">
              <li className="flex gap-3">
                <span className="mt-2 h-px w-6 bg-white/30" />
                <span>
                  {isEs
                    ? "Creadores y streamers que necesitan una intro potente o un lenguaje visual claro."
                    : "Creators and streamers who need a strong intro or visual language."}
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-px w-6 bg-white/30" />
                <span>
                  {isEs
                    ? "Equipos de esports y marcas que buscan reveals o piezas de hype cinematográficas."
                    : "Esports teams and brands looking for cinematic reveals or hype pieces."}
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-px w-6 bg-white/30" />
                <span>
                  {isEs
                    ? "Estudios o agencias que quieren un colaborador centrado en motion y visuales en tiempo real."
                    : "Studios or agencies that want a collaborator focused on motion and realtime visuals."}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
