"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

const MASK_IMAGE = "/rect.png";

// Plantilla de máscaras compartida entre páginas
const MASK_TEMPLATES = [
  { id: 1, wPct: 35, hPct: 20, image: MASK_IMAGE },
  { id: 2, wPct: 35, hPct: 20, image: MASK_IMAGE },
  { id: 3, wPct: 35, hPct: 20, image: MASK_IMAGE },
  { id: 4, wPct: 35, hPct: 20, image: MASK_IMAGE },
  { id: 5, wPct: 35, hPct: 20, image: MASK_IMAGE },
];

// Config por página: etiqueta superior y tags de proyectos
const PROJECT_CONFIG = {
  uefn: {
    labelEs: "PROYECTO UEFN",
    labelEn: "UEFN PROJECT",
    items: [
      { id: 1, tagEs: "MAPA · CINEMÁTICA", tagEn: "MAP · CINEMATIC", image: "/projects/uefn-1.jpg" },
      { id: 2, tagEs: "EVENTO EN DIRECTO", tagEn: "LIVE EVENT", image: "/projects/uefn-2.jpg" },
      { id: 3, tagEs: "ARENA · COMPETITIVA", tagEn: "COMPETITIVE ARENA", image: "/projects/uefn-3.jpg" },
      { id: 4, tagEs: "HUB INTERACTIVO", tagEn: "INTERACTIVE HUB", image: "/projects/uefn-4.jpg" },
      { id: 5, tagEs: "TRAILER IN-ENGINE", tagEn: "IN-ENGINE TRAILER", image: "/projects/uefn-5.jpg" },
    ],
  },
  dev: {
    labelEs: "PROYECTO DEV",
    labelEn: "DEV PROJECT",
    items: [
      { id: 1, tagEs: "WEB · INTERACTIVA", tagEn: "INTERACTIVE WEB", image: "/projects/dev-1.jpg" },
      { id: 2, tagEs: "LANDING · MARCAS", tagEn: "BRAND LANDING", image: "/projects/dev-2.jpg" },
      { id: 3, tagEs: "DASHBOARDS · TIEMPO REAL", tagEn: "REAL-TIME DASHBOARDS", image: "/projects/dev-3.jpg" },
      { id: 4, tagEs: "MICROSITES · EXPERIMENTALES", tagEn: "EXPERIMENTAL MICROSITES", image: "/projects/dev-4.jpg" },
      { id: 5, tagEs: "SISTEMAS · UI", tagEn: "UI SYSTEMS", image: "/projects/dev-5.jpg" },
    ],
  },
  music: {
    labelEs: "PROYECTO MÚSICA",
    labelEn: "MUSIC PROJECT",
    items: [
      { id: 1, tagEs: "SOUND DESIGN · FX", tagEn: "SOUND DESIGN · FX", image: "/projects/music-1.jpg" },
      { id: 2, tagEs: "BANDAS SONORAS", tagEn: "SCORE · SOUNDTRACK", image: "/projects/music-2.jpg" },
      { id: 3, tagEs: "MIX · MASTERING", tagEn: "MIX · MASTERING", image: "/projects/music-3.jpg" },
      { id: 4, tagEs: "IDENTIDADES SONORAS", tagEn: "SONIC BRANDING", image: "/projects/music-4.jpg" },
      { id: 5, tagEs: "AMBIENTES INTERACTIVOS", tagEn: "INTERACTIVE AMBIENCE", image: "/projects/music-5.jpg" },
    ],
  },
  vfx: {
    labelEs: "PROYECTO VFX",
    labelEn: "VFX PROJECT",
    items: [
      { id: 1, tagEs: "COMPOSICIÓN · VFX", tagEn: "VFX · COMPOSITING", image: "/projects/vfx-1.jpg" },
      { id: 2, tagEs: "CLEAN-UPS", tagEn: "CLEAN-UPS", image: "/projects/vfx-2.jpg" },
      { id: 3, tagEs: "SIMULACIONES", tagEn: "SIMULATIONS", image: "/projects/vfx-3.jpg" },
      { id: 4, tagEs: "LOOKDEV · COLOR", tagEn: "LOOKDEV · COLOR", image: "/projects/vfx-4.jpg" },
      { id: 5, tagEs: "BEFORE/AFTER · REELS", tagEn: "BEFORE/AFTER · REELS", image: "/projects/vfx-5.jpg" },
    ],
  },
};

function clamp(v, min, max) {
  return Math.min(Math.max(v, min), max);
}

function placeInitialMasks(templates, rect) {
  const zones = [
    { fx: 0.08, fy: 0.43 },
    { fx: 0.57, fy: 0.45 },
    { fx: 0.27, fy: 0.55 },
    { fx: 0.13, fy: 0.75 },
    { fx: 0.55, fy: 0.85 },
  ];

  return templates.map((t, i) => {
    const wPx = (rect.w * t.wPct) / 100;
    const hPx = (rect.h * t.hPct) / 100;
    const x = clamp(rect.w * zones[i].fx, 0, Math.max(0, rect.w - wPx));
    const y = rect.h * zones[i].fy;
    return { id: t.id, wPct: t.wPct, hPct: t.hPct, image: t.image, x, y, z: i + 1 };
  });
}

export function ProjectMasks({ isEs, variant }) {
  const config = PROJECT_CONFIG[variant] || PROJECT_CONFIG.uefn;
  const items = config.items;
  const label = isEs ? config.labelEs : config.labelEn;

  const wrapRef = useRef(null);
  const [wrapRect, setWrapRect] = useState({ w: 0, h: 0, left: 0, top: 0 });
  const [masks, setMasks] = useState([]);
  const dragRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  const sortedMasks = [...masks].sort((a, b) => (a.z || 0) - (b.z || 0));

  useEffect(() => {
    if (typeof window === "undefined") return;
    const check = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

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

    const newY = e.clientY - r.top - d.offsetY;

    setMasks((prev) =>
      prev.map((mm) => (mm.id === d.id ? { ...mm, x: newX, y: newY } : mm)),
    );
  };

  const onPointerUp = () => {
    dragRef.current = null;
  };

  if (isMobile) {
    return (
      <div className="pt-[100vh] pb-[100vh] space-y-6">
        {MASK_TEMPLATES.map((tpl, index) => {
          const slot = items[index];
          if (!slot) return null;
          const tag = isEs ? slot.tagEs : slot.tagEn;
          return (
            <div
              key={tpl.id}
              className="w-full aspect-video bg-[#05030b] border border-white/30 relative overflow-hidden rounded-md"
            >
              <img
                src={slot.image}
                alt={tag}
                className="absolute inset-0 w-full h-full object-cover"
              />
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
    );
  }

  return (
    <div>
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
        const slot = items[m.id - 1] || items[0];
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
              zIndex: (m.z || 0) * 2,
            }}
          >
            <div className="relative w-full h-full">
              <img
                src={slot.image}
                alt={tag}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.35),transparent_60%),radial-gradient(circle_at_bottom,rgba(147,51,234,0.35),transparent_60%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,23,42,0.95),rgba(2,6,23,0.98))]" />
              <div className="relative z-10 flex flex-col justify-between h-full px-4 py-3 sm:px-5 sm:py-4">
                <div className="text-[10px] font-mono tracking-[0.25em] text-white/60 uppercase">
                  {label}
                </div>
                <div className="space-y-1">
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
        const slot = items[m.id - 1] || items[0];
        const tag = isEs ? slot.tagEs : slot.tagEn;

        return (
          <div
            key={`handle-${m.id}`}
            className="absolute z-20"
            style={{
              left: m.x,
              top: m.y,
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
    </div>
  );
}
