"use client"

import { useEffect, useMemo, useState } from "react";
import Comparisons from "./Comparisons";
import MiniGame from "./MiniGame";

export function HomeSection({ isEs, onOpenReel, onOpenCall }) {
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

  const availability = useMemo(
    () =>
      isEs
        ? [
            { label: "Semana 1-2", status: "Libre" },
            { label: "Semana 3", status: "Media" },
            { label: "Semana 4", status: "Testing / R&D" },
          ]
        : [
            { label: "Week 1-2", status: "Open" },
            { label: "Week 3", status: "Half" },
            { label: "Week 4", status: "Testing / R&D" },
          ],
    [isEs],
  );

  const [focusIndex, setFocusIndex] = useState(0);
  const [availabilityIndex, setAvailabilityIndex] = useState(0);

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

  useEffect(() => {
    setAvailabilityIndex(0);
    const id = setInterval(() => {
      setAvailabilityIndex((prev) => (prev + 1) % availability.length);
    }, 2600);
    return () => clearInterval(id);
  }, [availability.length]);

  const availabilityChip = availability[availabilityIndex] || availability[0];

  return (
    <section id="home" className="sm:pt-280 pt-40 pb-32">
      <div className="max-w-6xl mx-auto">
        <p className="text-[11px] font-mono tracking-[0.35em] text-white/40 mb-4">
          C:\EMB\HOME
        </p>
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">
          {isEs
            ? "DirecciÇün creativa, VFX y experiencias interactivas."
            : "Creative direction, VFX & interactive experiences."}
        </h1>
        <p className="text-sm md:text-base text-white/70 max-w-2xl">
          {isEs
            ? "Combinamos motores en tiempo real, motion design y sonido para crear secuencias cinematogrÇ­ficas, visuales estilizadas y experiencias web experimentales."
            : "We combine real-time engines, motion design and sound to craft cinematic sequences, stylized visuals and experimental web experiences."}
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

        <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onOpenReel}
              className="rounded-full border border-white bg-white px-4 py-2 text-sm font-semibold text-black shadow-[0_0_18px_rgba(255,255,255,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_0_28px_rgba(52,211,153,0.45)]"
            >
              {isEs ? "Ver reel 60s" : "Watch 60s reel"}
            </button>
            <button
              type="button"
              onClick={onOpenCall}
              className="rounded-full border border-white/20 bg-black/60 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/10"
            >
              {isEs ? "Agenda 15’" : "Book 15’"}
            </button>
          </div>
          <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.25em] text-white/70">
            <span className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />
              {isEs ? "Estado" : "Status"}: {availabilityChip?.status}
            </span>
            <span className="hidden sm:inline text-white/50">/</span>
            <span className="hidden sm:inline text-white/70">
              {availabilityChip?.label}
            </span>
          </div>
        </div>

        {/* resumen rÇ­pido en 3 columnas */}
        <div className="grid gap-4 mt-10 md:grid-cols-3">
          <div className="border border-white/10 bg-white/5 backdrop-blur-md px-4 py-3 text-xs uppercase tracking-[0.2em]">
            <p className="text-white/40 mb-1">{isEs ? "FOCO" : "FOCUS"}</p>
            <p className="text-white">3D ¶ú VFX ¶ú EDIT</p>
          </div>
          <div className="border border-white/10 bg-white/5 backdrop-blur-md px-4 py-3 text-xs uppercase tracking-[0.2em]">
            <p className="text-white/40 mb-1">
              {isEs ? "HERRAMIENTAS" : "TOOLS"}
            </p>
            <p className="text-white">UEFN ¶ú AFTER EFFECTS ¶ú BLENDER</p>
          </div>
          <div className="border border-white/10 bg-white/5 backdrop-blur-md px-4 py-3 text-xs uppercase tracking-[0.2em]">
            <p className="text-white/40 mb-1">
              {isEs ? "DISPONIBLE PARA" : "AVAILABLE FOR"}
            </p>
            <p className="text-white">
              {isEs ? "PROYECTOS ¶ú COLABS" : "PROJECTS ¶ú COLLABS"}
            </p>
          </div>
        </div>

        {/* detalle de lo que haces y para quiÇ¸n */}
        <div className="mt-10 grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)] text-xs md:text-sm text-white/70">
          <div>
            <p className="text-white/40 uppercase tracking-[0.2em] mb-3">
              {isEs ? "QUÇ% HACEMOS" : "WHAT WE DO"}
            </p>
            <ul className="space-y-2">
              <li className="flex gap-3">
                <span className="mt-2 h-px w-6 bg-white/30" />
                <span>
                  {isEs
                    ? "Concepto, direcciÇün de arte y ediciÇün para piezas cortas: intros, trailers, reels y secuencias experimentales."
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
                    ? "SincronÇða entre visuales, tipografÇða y sonido para que cada corte se sienta preciso e intencional."
                    : "Sync between visuals, typography and sound so that every cut feels sharp and intentional."}
                </span>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-white/40 uppercase tracking-[0.2em] mb-3">
              {isEs ? "PARA QUIÇ%N" : "WHO IT'S FOR"}
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
                    ? "Equipos de esports y marcas que buscan reveals o piezas de hype cinematogrÇ­ficas."
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

        <div className="mt-16">
          <MiniGame isEs={isEs} />
        </div>

        <div className="mt-16">
          <Comparisons isEs={isEs} />
        </div>
      </div>
    </section>
  );
}

export default HomeSection
