"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { Activity, Clock3, Zap } from "lucide-react";

const ROUTE_COPY = {
  home: "Home",
  uefn: "UEFN",
  dev: "Dev",
  music: "Music",
  vfx: "VFX",
};

export default function SignalRail({ currentTarget }) {
  const pathname = usePathname();
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

  const sweep = useMemo(
    () => Math.min(100, Math.max(0, (timestamp.getSeconds() / 60) * 100)),
    [timestamp],
  );

  const activeRoute = useMemo(() => {
    if (currentTarget) return ROUTE_COPY[currentTarget.toLowerCase()] || "Home";
    const lower = pathname ? pathname.toLowerCase() : "/";
    if (lower === "/") return "Home";
    const match = Object.keys(ROUTE_COPY).find((key) =>
      lower.startsWith(`/${key}`),
    );
    return ROUTE_COPY[match] || "Home";
  }, [currentTarget, pathname]);

  const chips = [
    { label: "Ruta", value: activeRoute },
    { label: "Respuesta", value: "<24h" },
    { label: "Modo", value: "Dev x Motion" },
    { label: "Zona", value: "UTC+1" },
  ];

  return (
    <div className="pointer-events-none fixed right-4 top-28 z-40 hidden xl:flex flex-col gap-3 text-white">
      <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl px-4 py-3 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
        <div className="flex items-center justify-between gap-3 text-[11px] font-mono uppercase tracking-[0.32em] text-white/70">
          <span className="inline-flex items-center gap-2">
            <Activity className="h-4 w-4 text-emerald-200" />
            Signal Rail
          </span>
          <span className="inline-flex items-center gap-2 text-white">
            <Clock3 className="h-4 w-4 text-fuchsia-200" />
            {now}
          </span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] font-mono uppercase tracking-[0.22em] text-white/60">
          {chips.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between gap-2 rounded-lg border border-white/10 bg-black/40 px-3 py-2"
            >
              <span>{item.label}</span>
              <span className="text-white">{item.value}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 h-2 w-full overflow-hidden rounded-full border border-white/15 bg-white/5">
          <div
            className="h-full bg-gradient-to-r from-emerald-300 via-white to-fuchsia-300 transition-[width]"
            style={{ width: `${sweep}%` }}
          />
        </div>
        <div className="mt-3 flex items-center justify-between text-[11px] uppercase tracking-[0.32em] text-white/60">
          <span className="inline-flex items-center gap-2 text-emerald-200">
            <Zap className="h-4 w-4" />
            Slots abiertos
          </span>
          <span className="text-white/70">EMB: dueto</span>
        </div>
      </div>
    </div>
  );
}
