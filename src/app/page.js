"use client";

import { useState } from "react";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { HomeSection } from "../components/HomeSection";
import Footer from "../components/Footer";
import ReelModal from "../components/ReelModal";

export default function Home() {
  const [lang, setLang] = useState("en");
  const isEs = lang === "es";
  const [modal, setModal] = useState(null); // 'reel' | 'call' | null

  return (
    <div className="relative z-20 px-6 pb-40 text-white">
      <LanguageSwitcher lang={lang} setLang={setLang} />

      <HomeSection
        isEs={isEs}
        onOpenReel={() => setModal("reel")}
        onOpenCall={() => setModal("call")}
      />
      <Footer isEs={isEs} />
      <ReelModal
        type={modal}
        isEs={isEs}
        onClose={() => setModal(null)}
      />
    </div>
  );
}
