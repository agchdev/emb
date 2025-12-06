"use client"

import { useState } from "react";
import { LanguageSwitcher } from "../../components/LanguageSwitcher";
import { VfxSection } from "../../components/VfxSection";
import { DraggablePanels } from "../../components/DraggablePanels";
<<<<<<< HEAD
import { ProjectMasks } from "../../components/ProjectMasks";
=======
import Footer from "../../components/Footer";
>>>>>>> 9f28b61 (footer)

export default function VFX() {
  const [lang, setLang] = useState("en");
  const isEs = lang === "es";

  return (
    <div className="relative z-20 px-6 pb-40 text-white">
      <LanguageSwitcher lang={lang} setLang={setLang} />
<<<<<<< HEAD
      {/* <VfxSection isEs={isEs} /> */}
      {/* <DraggablePanels isEs={isEs} /> */}
      <ProjectMasks isEs={isEs} variant="vfx" />
=======
      <VfxSection isEs={isEs} />
      <DraggablePanels isEs={isEs} />
      <Footer isEs={isEs} />
>>>>>>> 9f28b61 (footer)
    </div>
  );
}
