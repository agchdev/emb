"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  const pushFrame = () => {
    if (isMobile) {
      const center = leftImages[leftIndex % leftImages.length];
      setLeftIndex((i) => i + 1);
      setEntries((prev) => [
        ...prev,
        {
          id: `${Date.now()}-C-${leftIndex}`,
          side: "center",
          ...center,
        },
      ].slice(-4));
      return;
    }

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
    <div className="relative z-20 min-h-screen w-full overflow-hidden text-white">
      <LanguageSwitcher lang={lang} setLang={setLang} />

      <div className="relative mx-auto flex h-screen max-w-6xl flex-col justify-center px-6 pb-10 pt-8">
        <div className="grid h-full grid-rows-[1.2fr_auto_1fr] items-center">
          {/* Top info */}
          <div className="flex flex-col gap-4 text-xs font-mono uppercase tracking-[0.22em] text-white/60">
            <div className="max-w-xl space-y-2 text-left normal-case text-white">
              <p className="font-semibold">{t.intro}</p>
              <p className="text-white/70">{t.details}</p>
            </div>
          </div>

          {/* Center control */}
          <div className="relative flex items-center justify-center mt-20">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={pushFrame}
              aria-label={t.cta}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-black/70 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset,0_15px_40px_rgba(0,0,0,0.45)] backdrop-blur"
            >
              <ArrowUpRight className="h-4 w-4 text-white" />
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
          const isCenter = entry.side === "center";
          const baseX = isCenter ? "0" : isLeft ? "-12vw" : "12vw";
          const delay = Math.min(idx * 0.04, 0.4);
          const positionClass = isMobile
            ? "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            : isLeft
              ? "left-4 md:left-14 top-1/2 -translate-y-1/2"
              : "right-4 md:right-14 top-1/2 -translate-y-1/2";
          return (
            <motion.div
              key={entry.id}
              initial={{
                opacity: 0,
                x: isMobile ? 0 : isLeft ? -80 : 80,
                y: isMobile ? 20 : 0,
                scale: 0.96,
              }}
              animate={{ opacity: 1, x: 0, y: isMobile ? 0 : undefined, scale: 1 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay }}
              className={`pointer-events-none absolute ${positionClass}`}
              style={{ transform: isMobile ? undefined : `translateY(-50%) translateX(${baseX})` }}
            >
              <div
                className={`overflow-hidden rounded-xl border border-white/20 bg-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur ${
                  isMobile ? "w-[78vw] max-w-[320px]" : "w-[44vw] max-w-[420px]"
                }`}
              >
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
