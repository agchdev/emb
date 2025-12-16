"use client";

import { useState } from "react";

function ComparisonCard({ title, beforeSrc, afterSrc, tag, desc }) {
  const [value, setValue] = useState(50);

  return (
    <div className="relative overflow-hidden rounded-xl border border-white/15 bg-white/5 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur">
      <div className="relative aspect-[16/9]">
        <img
          src={beforeSrc}
          alt={`${title} before`}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${value}%` }}
        >
          <img
            src={afterSrc}
            alt={`${title} after`}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
        <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-white/25 bg-black/60 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.25em] text-white/80">
          {tag}
        </div>
        <div className="absolute bottom-3 left-4 flex items-center gap-2 rounded-full border border-white/25 bg-black/70 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.3em] text-white">
          <span>Before</span>
          <span className="h-px w-8 bg-white/40" />
          <span>After</span>
        </div>
      </div>
      <div className="flex flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-white">{title}</h4>
          <p className="text-sm text-white/70">{desc}</p>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min="0"
            max="100"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="h-1 w-40 appearance-none rounded-full bg-white/20"
          />
          <span className="text-xs text-white/60">{value}%</span>
        </div>
      </div>
    </div>
  );
}

export default function Comparisons({ isEs }) {
  const items = [
    {
      title: isEs ? "VFX: base vs grade" : "VFX: base vs grade",
      beforeSrc: "/vfx/base.jpg",
      afterSrc: "/vfx/graded.jpg",
      tag: isEs ? "Color + overlays" : "Color + overlays",
      desc: isEs
        ? "Frame limpio vs pase final con look, glitch y HUD para reforzar storytelling."
        : "Clean plate vs final pass with look, glitch and HUD to push storytelling.",
    },
    {
      title: isEs ? "DEV: estático vs motion" : "DEV: static vs motion",
      beforeSrc: "/projects/dev-1.jpg",
      afterSrc: "/projects/dev-2.jpg",
      tag: "Motion design",
      desc: isEs
        ? "Landing sin animación vs versión animada con scroll cues y secciones vivas."
        : "Plain landing vs animated take with scroll cues and live sections.",
    },
  ];

  return (
    <section className="rounded-2xl border border-white/15 bg-white/5 px-4 py-6 backdrop-blur">
      <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-white/40">
            {isEs ? "Comparativas rápidas" : "Quick comparisons"}
          </p>
          <h3 className="text-2xl font-semibold text-white">
            {isEs ? "Antes / después en 15s" : "Before / after in 15s"}
          </h3>
          <p className="text-sm text-white/70">
            {isEs
              ? "Arrastra el slider para ver qué aporta color, motion y HUD en segundos."
              : "Drag the slider to see what color, motion and HUD add in seconds."}
          </p>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-white/60">
          <span className="h-2 w-2 rounded-full bg-emerald-300" />
          {isEs ? "Interactivo" : "Interactive"}
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {items.map((item) => (
          <ComparisonCard key={item.title} {...item} />
        ))}
      </div>
    </section>
  );
}
