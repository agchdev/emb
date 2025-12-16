"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

export default function ReelModal({ type, isEs, onClose }) {
  const [mounted, setMounted] = useState(false);
  const isReel = type === "reel";
  const isCall = type === "call";

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted || (!isReel && !isCall)) return null;

  return createPortal(
    <div className="fixed inset-0 z-[6000] flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-5xl overflow-hidden rounded-2xl border border-white/20 bg-black/70 shadow-[0_24px_80px_rgba(0,0,0,0.65)]">
        <div className="flex items-start justify-between border-b border-white/10 px-4 py-3 text-sm">
          <div className="space-y-1">
            <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-white/50">
              {isReel ? "C:\\EMB\\REEL" : "C:\\EMB\\SLOT"}
            </p>
            <h3 className="text-xl font-semibold text-white">
              {isReel
                ? isEs
                  ? "Reel 60 segundos"
                  : "60s reel"
                : isEs
                  ? "Agenda 15 minutos"
                  : "Book 15 minutes"}
            </h3>
            <p className="text-sm text-white/65">
              {isReel
                ? isEs
                  ? "Secuencia corta con VFX, UEFN, motion y audio reactivo."
                  : "Short cut with VFX, UEFN, motion and reactive audio."
                : isEs
                  ? "Calendario rápido. Bloquea un hueco y envíanos un brief."
                  : "Fast calendar. Block a slot and drop your brief."}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-full border border-white/20 px-3 py-1 text-white/70 transition hover:border-white/50 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="grid gap-0 md:grid-cols-[1.6fr_1fr]">
          <div className="relative bg-black/60">
            {isReel ? (
              <video
                key="reel-video"
                src="/carita2.mp4"
                className="h-full w-full object-cover"
                autoPlay
                muted
                controls
                playsInline
                loop
              />
            ) : (
              <iframe
                title="Calendar embed"
                src="https://cal.com/emb/intro?embed=true"
                className="h-[60vh] w-full border-0 bg-black/30"
                allow="camera; microphone; fullscreen; autoplay"
              />
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>

          <div className="flex flex-col justify-between gap-4 border-t border-white/10 bg-black/50 p-4 md:border-l md:border-t-0">
            <div className="space-y-3 text-sm text-white/80">
              <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-white/50">
                {isReel ? "Highlights" : "Slots"}
              </p>
              {isReel ? (
                <ul className="space-y-2">
                  <li>· UEFN / In-engine capture</li>
                  <li>· VFX glitch + overlays HUD</li>
                  <li>· Motion design + audio reactivo</li>
                  <li>· Entrega modular para redes</li>
                </ul>
              ) : (
                <ul className="space-y-2">
                  <li>· Kick-off 15’ (Zoom/Meet)</li>
                  <li>· Revisamos scope + riesgos</li>
                  <li>· Propuesta en menos de 24h</li>
                  <li>· Handoff claro + QA continuo</li>
                </ul>
              )}
            </div>

            <div className="flex flex-col gap-3">
              {isCall && (
                <a
                  href="https://cal.com/emb/intro"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white bg-white px-4 py-2 text-center text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:shadow-[0_0_28px_rgba(52,211,153,0.45)]"
                >
                  {isEs ? "Abrir calendario en nueva pestaña" : "Open calendar in new tab"}
                </a>
              )}
              <a
                href="mailto:hola@emb.pro?subject=Quiero%20un%20lanzamiento%20EMB"
                className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-center text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/10"
              >
                {isEs ? "Enviar brief por email" : "Send brief via email"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
