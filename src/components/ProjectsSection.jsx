"use client";

import React from "react";

export function ProjectsSection({ isEs }) {
  return (
    <section id="projects" className="pb-32 border-t border-white/5">
      <div className="max-w-5xl mx-auto pt-24">
        <p className="text-[11px] font-mono tracking-[0.35em] text-white/40 mb-4">
          C:\EMB\PROJECTS
        </p>
        <h2 className="text-2xl md:text-4xl font-semibold tracking-tight mb-4">
          {isEs
            ? "PROJECTS · Proyectos en tiempo real, motion y VFX."
            : "PROJECTS · Realtime, motion & VFX projects."}
        </h2>
        <p className="text-sm md:text-base text-white/70 max-w-2xl mb-8">
          {isEs
            ? "Aquí reunimos proyectos que combinan UEFN, motion, música y VFX. Pronto añadiremos casos detallados con breakdowns y procesos."
            : "Here we gather projects that combine UEFN, motion, music and VFX. Detailed case studies with breakdowns and process will be added soon."}
        </p>
        <div className="grid gap-4 md:grid-cols-2 text-xs md:text-sm text-white/70">
          <div className="border border-white/10 bg-white/5 backdrop-blur-md px-4 py-4 uppercase tracking-[0.2em]">
            <p className="text-white/40 mb-1">
              {isEs ? "ESTADO" : "STATUS"}
            </p>
            <p className="text-white">
              {isEs ? "EN PREPARACIÓN" : "IN PROGRESS"}
            </p>
          </div>
          <div className="border border-white/10 bg-white/5 backdrop-blur-md px-4 py-4 uppercase tracking-[0.2em]">
            <p className="text-white/40 mb-1">
              {isEs ? "QUÉ VERÁS AQUÍ" : "WHAT YOU'LL SEE"}
            </p>
            <p className="text-white">
              {isEs
                ? "Islas UEFN, piezas de motion, paquetes gráficos y trabajos donde mezclamos todas las capas."
                : "UEFN islands, motion pieces, graphic packages and work where we mix all layers together."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
