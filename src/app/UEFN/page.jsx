"use client"

import { useState } from "react";
import { LanguageSwitcher } from "../../components/LanguageSwitcher";
import { UefnSection } from "../../components/UefnSection";
import { DraggablePanels } from "../../components/DraggablePanels";

export default function UEFN() {
  const [lang, setLang] = useState("en");
  const isEs = lang === "es";

  return (
    <div className="relative z-20 px-6 pb-40 text-white">
      <LanguageSwitcher lang={lang} setLang={setLang} />
      <UefnSection isEs={isEs} />
      <DraggablePanels isEs={isEs} />
    </div>
  );
}