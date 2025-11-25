"use client"

import { useState } from "react";
import { LanguageSwitcher } from "../../components/LanguageSwitcher";
import { DevSection } from "../../components/DevSection";
import { DraggablePanels } from "../../components/DraggablePanels";

export default function DEV() {
  const [lang, setLang] = useState("en");
  const isEs = lang === "es";

  return (
    <div className="relative z-20 px-6 pb-40 text-white">
      <LanguageSwitcher lang={lang} setLang={setLang} />
      <DevSection isEs={isEs} />
      <DraggablePanels isEs={isEs} />
    </div>
  );
}