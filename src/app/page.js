"use client";

import { useState } from "react";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { HomeSection } from "../components/HomeSection";
import Footer from "../components/Footer";

export default function Home() {
  const [lang, setLang] = useState("en");
  const isEs = lang === "es";

  return (
    <div className="relative z-20 px-6 pb-40 text-white">
      <LanguageSwitcher lang={lang} setLang={setLang} />

      <HomeSection isEs={isEs} />
      <Footer isEs={isEs} />
    </div>
  );
}
