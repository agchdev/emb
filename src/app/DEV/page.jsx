"use client"

import { useState } from "react";
import { LanguageSwitcher } from "../../components/LanguageSwitcher";
import { DevSection } from "../../components/DevSection";
import { DraggablePanels } from "../../components/DraggablePanels";
<<<<<<< HEAD
import { ProjectMasks } from "../../components/ProjectMasks";
=======
import Footer from "../../components/Footer";
>>>>>>> 9f28b61 (footer)

export default function DEV() {
  const [lang, setLang] = useState("en");
  const isEs = lang === "es";

  return (
    <div className="relative z-20 px-6 pb-40 text-white">
      <LanguageSwitcher lang={lang} setLang={setLang} />
<<<<<<< HEAD
      {/* <DevSection isEs={isEs} /> */}
      <ProjectMasks isEs={isEs} variant="dev" />
=======
      <DevSection isEs={isEs} />
      <DraggablePanels isEs={isEs} />
      <Footer isEs={isEs} />
>>>>>>> 9f28b61 (footer)
    </div>
  );
}
