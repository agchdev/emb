"use client"

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { LanguageSwitcher } from "../../components/LanguageSwitcher";
import { UefnSection } from "../../components/UefnSection";
import { DraggablePanels } from "../../components/DraggablePanels";

const MASK_IMAGE = "/rect.png";

// 6 máscaras según la referencia
const MASK_TEMPLATES = [
  { id: 1, wPct: 35, hPct: 20, image: MASK_IMAGE }, // pequeña arriba izquierda
  { id: 2, wPct: 35, hPct: 20, image: MASK_IMAGE }, // grande centro-arriba
  { id: 3, wPct: 35, hPct: 20, image: MASK_IMAGE }, // pequeña arriba derecha
  { id: 4, wPct: 35, hPct: 20, image: MASK_IMAGE }, // mediana medio-izquierda
  { id: 5, wPct: 35, hPct: 20, image: MASK_IMAGE }, // mediana-grande centro
  //{ id: 6, wPct: 35, hPct: 20, image: MASK_IMAGE }, // pequeña abajo derecha
];

const PROJECT_ITEMS = [
  {
    id: 1,
    tagEs: "MAPA · CINEMÁTICA",
    tagEn: "MAP · CINEMATIC",
  },
  {
    id: 2,
    tagEs: "EVENTO EN DIRECTO",
    tagEn: "LIVE EVENT",
  },
  {
    id: 3,
    tagEs: "ARENA · COMPETITIVA",
    tagEn: "COMPETITIVE ARENA",
  },
  {
    id: 4,
    tagEs: "HUB INTERACTIVO",
    tagEn: "INTERACTIVE HUB",
  },
  {
    id: 5,
    tagEs: "TRAILER IN-ENGINE",
    tagEn: "IN-ENGINE TRAILER",
  },
  // {
    // id: 6,
    // titleEs: "UEFN · Proyecto 06",
    // titleEn: "UEFN · Project 06",
    // tagEs: "EXPERIMENTO R&D",
    // tagEn: "R&D EXPERIMENT",
  // },
];

export default function UEFN() {
  const [lang, setLang] = useState("en");
  const isEs = lang === "es";

  const wrapRef = useRef(null);
  const [wrapRect, setWrapRect] = useState({ w: 0, h: 0, left: 0, top: 0 });
  const [masks, setMasks] = useState([]);
  const dragRef = useRef(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const check = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const sortedMasks = [...masks].sort(
    (a, b) => (a.z || 0) - (b.z || 0),
  );

  useLayoutEffect(() => {
    const measure = () => {
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const newRect = { w: r.width, h: r.height, left: r.left, top: r.top };
      setWrapRect(newRect);
      if (masks.length === 0 && newRect.w > 0 && newRect.h > 0) {
        setMasks(placeInitialMasks(MASK_TEMPLATES, newRect));
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onHandlePointerDown = (maskId) => (e) => {
    e.preventDefault();
    const m = masks.find((mm) => mm.id === maskId);
    if (!m) return;
    const handleRect = e.currentTarget.getBoundingClientRect();
    dragRef.current = {
      id: maskId,
      pointerId: e.pointerId,
      offsetX: e.clientX - handleRect.left,
      offsetY: e.clientY - handleRect.top,
    };
    setMasks((prev) => {
      const maxZ = prev.reduce(
        (max, mm) => Math.max(max, mm.z || 0),
        0,
      );
      return prev.map((mm) =>
        mm.id === maskId ? { ...mm, z: maxZ + 1 } : mm,
      );
    });
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e) => {
    const d = dragRef.current;
    if (!d) return;
    const m = masks.find((mm) => mm.id === d.id);
    if (!m) return;

    // Medimos el wrapper en cada movimiento para que las coordenadas
    // estén siempre alineadas con la posición real en pantalla,
    // incluso si ha habido scroll.
    const wrap = wrapRef.current;
    if (!wrap) return;
    const r = wrap.getBoundingClientRect();

    const wPx = (r.width * m.wPct) / 100;
    const hPx = (r.width * m.hPct) / 100;

    const newX = clamp(
      e.clientX - r.left - d.offsetX,
      0,
      Math.max(0, r.width - wPx),
    );

    // En Y dejamos libertad total: sin clamp, para que puedan bajar
    // tanto como quieras (el límite visual será solo el viewport/overflow).
    const newY = e.clientY - r.top - d.offsetY;

    setMasks((prev) =>
      prev.map((mm) => (mm.id === d.id ? { ...mm, x: newX, y: newY } : mm)),
    );
  };

  const onPointerUp = () => {
    dragRef.current = null;
  };

  return (
    <div className="relative z-20 px-4 pb-40 text-white">
      <LanguageSwitcher lang={lang} setLang={setLang} />

      {/* <UefnSection isEs={isEs} /> */}
      {/* <DraggablePanels isEs={isEs} /> */}

      {isMobile ? (
        <div className="mt-10 space-y-6">
          {MASK_TEMPLATES.map((tpl, index) => {
            const slot = PROJECT_ITEMS[index];
            if (!slot) return null;
            const title = isEs ? slot.titleEs : slot.titleEn;
            const tag = isEs ? slot.tagEs : slot.tagEn;
            return (
              <div
                key={tpl.id}
                className="w-full aspect-video bg-[#05030b] border border-white/30 relative overflow-hidden rounded-md"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.35),transparent_60%),radial-gradient(circle_at_bottom,rgba(147,51,234,0.35),transparent_60%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,23,42,0.95),rgba(2,6,23,0.98))]" />
                <div className="relative z-10 flex flex-col justify-between h-full px-4 py-3">
                  <div className="text-[10px] font-mono tracking-[0.25em] text-white/60 uppercase">
                    {tag}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div
          ref={wrapRef}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          className="relative z-10 w-full min-h-[300vh]"
        >
          {sortedMasks.map((m) => {
            const wPx = (wrapRect.w * m.wPct) / 100;
            const hPx = (wrapRect.w * m.hPct) / 100;
            const slot = PROJECT_ITEMS[m.id - 1] || PROJECT_ITEMS[0];
            const title = isEs ? slot.titleEs : slot.titleEn;
            const tag = isEs ? slot.tagEs : slot.tagEn;

            return (
              <div
                key={`layer-${m.id}`}
                className="absolute inset-0 select-none pointer-events-none"
                style={{
                  maskImage: `url(${m.image})`,
                  WebkitMaskImage: `url(${m.image})`,
                  maskRepeat: "no-repeat",
                  WebkitMaskRepeat: "no-repeat",
                  maskSize: `${wPx}px ${hPx}px`,
                  WebkitMaskSize: `${wPx}px ${hPx}px`,
                  maskPosition: `${m.x}px ${m.y}px`,
                  WebkitMaskPosition: `${m.x}px ${m.y}px`,
                  maskOrigin: "border-box",
                  WebkitMaskOrigin: "border-box",
                  // cada ventana usa su "z" como capa base,
                  // multiplicada para dejar espacio al borde por encima
                  zIndex: (m.z || 0) * 2,
                }}
              >
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.35),transparent_60%),radial-gradient(circle_at_bottom,rgba(147,51,234,0.35),transparent_60%)]" />
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,23,42,0.95),rgba(2,6,23,0.98))]" />
                  <div className="relative z-10 flex flex-col justify-between h-full px-4 py-3 sm:px-5 sm:py-4">
                    <div className="text-[10px] font-mono tracking-[0.25em] text-white/60 uppercase">
                      {isEs ? "PROYECTO UEFN" : "UEFN PROJECT"}
                    </div>
                    <div className="space-y-1">
                      <h2 className="text-sm sm:text-base md:text-lg font-semibold tracking-tight text-white">
                        {title}
                      </h2>
                      <p className="text-[10px] font-mono tracking-[0.25em] text-emerald-300/90 uppercase">
                        {tag}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {sortedMasks.map((m) => {
            const wPx = (wrapRect.w * m.wPct) / 100;
            const hPx = (wrapRect.w * m.hPct) / 100;
            const slot = PROJECT_ITEMS[m.id - 1] || PROJECT_ITEMS[0];
            const tag = isEs ? slot.tagEs : slot.tagEn;

            return (
              <div
                key={`handle-${m.id}`}
                className="absolute z-20"
                style={{
                  left: m.x,
                  top: m.y,
                  // el borde va justo por encima del contenido de su propia ventana,
                  // pero siempre por debajo de cualquier ventana con z superior
                  zIndex: (m.z || 0) * 2 + 1,
                }}
              >
                <div className="absolute -top-[21px] -left-[.5px] text-white text-[10px] tracking-[0.25em] font-mono uppercase select-none pointer-events-none bg-gray-500/60 px-2 py-0.5 rounded-sm drop-shadow-[0_0_3px_rgba(255,255,255,0.8)]">
                  {tag}
                </div>
                <div
                  onPointerDown={onHandlePointerDown(m.id)}
                  className="touch-none cursor-grab active:cursor-grabbing"
                  style={{
                    width: wPx,
                    height: hPx,
                    outline: "1px solid rgba(255, 255, 255, 0.4)",
                    outlineOffset: "-1px",
                  }}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ----------------- Utilidades ----------------- */

function placeInitialMasks(templates, rect) {
  const zones = [
    { fx: 0.08, fy: 0.43 }, // arriba izquierda
    { fx: 0.57, fy: 0.45 }, // arriba derecha
    { fx: 0.27, fy: 0.55 }, // grande centro-arriba
    { fx: 0.13, fy: 0.75 }, // mediana medio-izquierda
    { fx: 0.55, fy: 0.85 }, // pequeña abajo derecha
  ]
  return templates.map((t, i) => {
    const wPx = (rect.w * t.wPct) / 100
    const hPx = (rect.h * t.hPct) / 100
    const x = clamp(rect.w * zones[i].fx, 0, Math.max(0, rect.w - wPx))
    // En Y no aplicamos clamp: fy controla libremente la posición vertical
    const y = rect.h * zones[i].fy
    // z inicial creciente para que ya aparezcan superpuestas como ventanas
    return { id: t.id, wPct: t.wPct, hPct: t.hPct, image: t.image, x, y, z: i + 1 }
  })
}

function clamp(v, min, max) {
  return Math.min(Math.max(v, min), max)
}
