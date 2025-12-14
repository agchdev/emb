"use client";

import { useEffect, useMemo, useState } from "react";
import { Clock3, Instagram, Mail } from "lucide-react";

export default function SignalRail() {
  const [timestamp, setTimestamp] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setTimestamp(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const now = useMemo(() => {
    try {
      return new Intl.DateTimeFormat("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
      }).format(timestamp);
    } catch {
      const h = String(timestamp.getHours()).padStart(2, "0");
      const m = String(timestamp.getMinutes()).padStart(2, "0");
      return `${h}:${m}`;
    }
  }, [timestamp]);

  return (
    <div className="pointer-events-none fixed right-4 bottom-8 z-40 hidden xl:flex text-white">
      <div className="pointer-events-auto w-72 rounded-2xl border border-white/20 bg-white/10 px-4 py-4 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
        <div className="flex items-center justify-between gap-3 text-[11px] font-mono uppercase tracking-[0.32em] text-white/70">
          <span className="text-white">Contacto directo</span>
          <span className="inline-flex items-center gap-2 text-white/80">
            <Clock3 className="h-4 w-4 text-emerald-200" />
            {now}
          </span>
        </div>
        <p className="mt-3 text-[11px] font-mono uppercase tracking-[0.24em] text-white/60">
          {/* Respuesta < 24h · UTC+1 */}
        </p>
        <div className="mt-4 flex flex-col gap-3 text-sm">
          <a
            href="mailto:embjsdevs@gmail.com?subject=Hola%20EMB"
            className="flex items-center gap-2 rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-white transition hover:border-white/40 hover:bg-white/10"
          >
            <Mail className="h-4 w-4 text-emerald-200" />
            <span className="text-[12px] font-semibold tracking-wide">embjsdevs@gmail.com</span>
          </a>
          <a
            href="https://instagram.com/emb.js"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-white transition hover:border-white/40 hover:bg-white/10"
          >
            <Instagram className="h-4 w-4 text-fuchsia-200" />
            <span className="text-[12px] font-semibold tracking-wide">@emb.js</span>
          </a>
        </div>
      </div>
    </div>
  );
}
