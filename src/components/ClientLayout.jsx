"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import BgVideo from "@/components/BgVideo";
import { SectionWordmark } from "@/components/SectionWordmark";
import Lenis from "@studio-freight/lenis";
import Preloader from "@/components/Preloader";
import SignalRail from "@/components/SignalRail";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  const getInitialTargetFromPath = (path) => {
    if (!path || path === "/") return "home";
    const lower = path.toLowerCase();
    if (lower.startsWith("/uefn")) return "uefn";
    if (lower.startsWith("/dev")) return "dev";
    if (lower.startsWith("/music")) return "music";
    if (lower.startsWith("/vfx")) return "vfx";
    return "home";
  };

  // lo que se haya clicado en el header; por ejemplo sección o "videoId".
  // Inicializamos en base a la ruta para que al recargar en una página interna
  // se mantenga el vídeo correcto en el banner.
  const [currentTarget, setCurrentTarget] = useState(() =>
    getInitialTargetFromPath(pathname),
  );

  // Scroll suave con Lenis en todas las páginas (incluida Home)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const lenis = new Lenis({
      smoothWheel: true,
      smoothTouch: true,
      lerp: 0.08,
    });

    let frameId;
    const raf = (time) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };

    frameId = requestAnimationFrame(raf);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, [pathname]);

  const handleHeaderClick = (target) => {
    // target puede ser "home", "uefn", "dev", "music", "vfx", etc.
    setCurrentTarget(target);

    // opcional: scroll a la sección correspondiente
    const id = target.startsWith("#") ? target : `#${target}`;
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Rutas para las que queremos banner + wordmark + footer
  const isMainRoute = (() => {
    if (!pathname || pathname === "/") return true;
    const lower = pathname.toLowerCase();
    if (lower.startsWith("/uefn")) return true;
    if (lower.startsWith("/dev")) return true;
    if (lower.startsWith("/music")) return true;
    if (lower.startsWith("/vfx")) return true;
    return false;
  })();

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader key="preloader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* le pasamos al header el callback y el target actual */}
      <Header onNavClick={handleHeaderClick} currentTarget={currentTarget} />

      {/* BgVideo y Wordmark sólo en rutas principales (no en 404) */}
      {isMainRoute && <BgVideo currentTarget={currentTarget} />}
      {isMainRoute && <SectionWordmark />}
      {isMainRoute && <SignalRail currentTarget={currentTarget} />}

      <div>{children}</div>
    </>
  );
}
