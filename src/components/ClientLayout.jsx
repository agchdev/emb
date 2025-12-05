"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import BgVideo from "@/components/BgVideo";
import { SectionWordmark } from "@/components/SectionWordmark";
import { FooterCta } from "@/components/FooterCta";
import Lenis from "@studio-freight/lenis";

export default function ClientLayout({ children }) {
  const pathname = usePathname();

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

  return (
    <>
      {/* le pasamos al header el callback y el target actual */}
      <Header onNavClick={handleHeaderClick} currentTarget={currentTarget} />

      {/* BgVideo recibe el dato y decide qué vídeo poner */}
      <BgVideo currentTarget={currentTarget} />

      {/* Wordmark fijo de fondo para páginas internas */}
      <SectionWordmark />

      <div>{children}</div>

      
      <FooterCta />
    </>
  );
}
