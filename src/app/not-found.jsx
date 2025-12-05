"use client";

import FuzzyText from "../components/FuzzyText";

export default function NotFound() {
  return (
    <main className="relative min-h-screen flex items-center justify-center text-white">
      <div className="relative z-10 flex flex-col items-center justify-center gap-6 px-6 text-center">
        <div className="w-full max-w-4xl mx-auto flex justify-center">
          <FuzzyText
            fontSize="clamp(3rem, 12vw, 7rem)"
            fontWeight={900}
            color="#ff0040"
            baseIntensity={0.18}
            hoverIntensity={0.5}
          >
            404 / NOT FOUND
          </FuzzyText>
        </div>
        <p className="text-xs md:text-sm font-mono tracking-[0.35em] uppercase text-white/60">
          NO ENCONTRAMOS ESTA RUTA PERO PODEMOS PREPARAR OTRA PIEZA
        </p>
      </div>
    </main>
  );
}
