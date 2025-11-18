"use client";

import { useState } from "react";
import Header from "@/components/Header";
import BgVideo from "@/components/BgVideo";

export default function ClientLayout({ children }) {
  // lo que se haya clicado en el header; por ejemplo sección o "videoId"
  const [currentTarget, setCurrentTarget] = useState("home");

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

      <div>{children}</div>
    </>
  );
}
