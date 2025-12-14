"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const copy = {
  es: {
    intro:
      "EMB es un estudio de direccion tecnica y motion. Dos Alejandros que combinan arquitectura, front y sistemas con VFX y sonido.",
    details:
      "Diseñamos lanzamientos serios con entregas medibles, ritmo audiovisual y QA continuo. Respuesta en menos de 24h, agenda clara y handoff limpio.",
    contacts: {
      social: ["Instagram", "LinkedIn", "Vimeo"],
      project: "hola@emb.pro",
      job: "Aplicar",
      info: ["Contacto", "Legales", "Creditos"],
    },
    cta: "Disparar imagenes",
    label: "C:\\EMB\\ABOUT",
  },
  en: {
    intro:
      "EMB is a technical direction + motion studio. Two Alejandros blending architecture, front, systems with VFX and sound.",
    details:
      "We ship serious launches with measurable delivery, audiovisual pace, and continuous QA. Replies under 24h, clear agenda, clean handoff.",
    contacts: {
      social: ["Instagram", "LinkedIn", "Vimeo"],
      project: "hola@emb.pro",
      job: "Apply",
      info: ["Contact", "Legals", "Credits"],
    },
    cta: "Trigger frames",
    label: "C:\\EMB\\ABOUT",
  },
};

const leftImages = [
  { src: "/projects/uefn-1.jpg", caption: "UEFN / Arena" },
  { src: "/vfx/base.jpg", caption: "VFX / Base frame" },
  { src: "/projects/uefn-3.jpg", caption: "UEFN / Competitive" },
  { src: "/vfx/graded.jpg", caption: "VFX / Graded" },
];

const rightImages = [
  { src: "/projects/uefn-2.jpg", caption: "UEFN / Live event" },
  { src: "/projects/uefn-4.jpg", caption: "UEFN / Hub" },
  { src: "/projects/uefn-5.jpg", caption: "UEFN / Trailer" },
  { src: "/projects/uefn-1.jpg", caption: "UEFN / Arena" },
];

export default function About() {
  const [lang, setLang] = useState(() => {
    if (typeof window === "undefined") return "en";
    const stored = window.localStorage.getItem("emb_lang");
    return stored === "es" || stored === "en" ? stored : "en";
  });
  const t = copy[lang];

  const [entries, setEntries] = useState([]);
  const [leftIndex, setLeftIndex] = useState(0);
  const [rightIndex, setRightIndex] = useState(0);
  const timeoutsRef = useRef([]);

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  const pushFrame = () => {
    const left = leftImages[leftIndex % leftImages.length];
    const right = rightImages[rightIndex % rightImages.length];

    setLeftIndex((i) => i + 1);
    setRightIndex((i) => i + 1);

    const leftEntry = {
      id: `${Date.now()}-L-${leftIndex}`,
      side: "left",
      ...left,
    };
    const rightEntry = {
      id: `${Date.now()}-R-${rightIndex}`,
      side: "right",
      ...right,
    };

    setEntries((prev) => [...prev, leftEntry].slice(-8));

    const to = setTimeout(() => {
      setEntries((prev) => [...prev, rightEntry].slice(-8));
    }, 180);
    timeoutsRef.current.push(to);
  };

  return (
    <div className="relative z-20 min-h-screen w-full overflow-hidden bg-black text-white">
      <LanguageSwitcher lang={lang} setLang={setLang} />

      {/* Reticula sutil */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-60" />
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_20%_20%,rgba(52,211,153,0.08),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(244,114,182,0.08),transparent_40%),radial-gradient(circle_at_50%_70%,rgba(59,130,246,0.05),transparent_35%)]" />

      {/* Marca de agua ABOUT */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <p className="text-[20vw] font-black uppercase tracking-[0.05em] text-white/4">
          ABOUT
        </p>
      </div>

      <div className="relative mx-auto flex h-screen max-w-6xl flex-col justify-center px-6">
        <div className="grid h-full grid-rows-[1fr_auto_1fr] items-center">
          {/* Top info */}
          <div className="flex flex-col gap-4 text-xs font-mono uppercase tracking-[0.22em] text-white/60">
            <div className="max-w-xl space-y-2 text-left normal-case text-white">
              <p className="font-semibold">{t.intro}</p>
              <p className="text-white/70">{t.details}</p>
            </div>
          </div>

          {/* Center control */}
          <div className="relative flex items-center justify-center">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={pushFrame}
              className="flex items-center gap-4 rounded-full border border-white/30 bg-black/60 px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset,0_15px_40px_rgba(0,0,0,0.45)] backdrop-blur"
            >
              <span className="text-white/60">{t.label}</span>
              <span className="h-px w-6 bg-white/20" />
              <ArrowUpRight className="h-4 w-4 text-white" />
              <span className="text-emerald-200">{t.cta}</span>
            </motion.button>
          </div>

          {/* Bottom info */}
          <div className="grid grid-cols-2 text-[11px] font-mono uppercase tracking-[0.2em] text-white/60">
            <div className="space-y-2">
              <p className="text-white">Social</p>
              <div className="flex flex-col text-white/70">
                {t.contacts.social.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <div className="mt-4 space-y-1">
                <p className="text-white">For new project</p>
                <p className="text-white/70">{t.contacts.project}</p>
              </div>
            </div>
            <div className="space-y-2 text-right">
              <div className="space-y-1">
                <p className="text-white">Job</p>
                <p className="text-white/70">{t.contacts.job}</p>
              </div>
              <div className="mt-3 space-y-1">
                {t.contacts.info.map((item) => (
                  <p key={item} className="text-white/70">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Frames left/right */}
      <AnimatePresence>
        {entries.map((entry, idx) => {
          const isLeft = entry.side === "left";
          const baseX = isLeft ? "-12vw" : "12vw";
          const delay = Math.min(idx * 0.04, 0.4);
          return (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: isLeft ? -80 : 80, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay }}
              className={`pointer-events-none absolute top-1/2 -translate-y-1/2 ${
                isLeft ? "left-4 md:left-14" : "right-4 md:right-14"
              }`}
              style={{ transform: `translateY(-50%) translateX(${baseX})` }}
            >
              <div className="w-[44vw] max-w-[420px] overflow-hidden rounded-xl border border-white/20 bg-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur">
                <div className="relative aspect-[4/3]">
                  <img
                    src={entry.src}
                    alt={entry.caption}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.22em] text-white">
                    {entry.caption}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
