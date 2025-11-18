"use client";

import { useState } from "react";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { HomeSection } from "../components/HomeSection";
import { UefnSection } from "../components/UefnSection";
import { DevSection } from "../components/DevSection";
import { MusicSection } from "../components/MusicSection";
import { VfxSection } from "../components/VfxSection";

export default function Home() {
  const [lang, setLang] = useState("en");
  const isEs = lang === "es";

  return (
    <div className="relative z-20 px-6 pb-40 text-white">
      <LanguageSwitcher lang={lang} setLang={setLang} />

      <HomeSection isEs={isEs} />
      <UefnSection isEs={isEs} />
      <DevSection isEs={isEs} />
      <MusicSection isEs={isEs} />
      <VfxSection isEs={isEs} />
    </div>
  );
}
