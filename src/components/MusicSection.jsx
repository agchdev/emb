"use client"

import { useEffect, useRef, useState } from "react";

export function MusicSection({ isEs }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [levels, setLevels] = useState(() => Array(12).fill(0.4));
  const audioRef = useRef(null);

  useEffect(() => {
    if (!isPlaying) return;
    const id = setInterval(() => {
      setLevels((prev) => prev.map(() => Math.random()));
    }, 160);
    return () => clearInterval(id);
  }, [isPlaying]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section id="music" className="pb-32 border-t border-white/5">
      <div className="max-w-5xl mx-auto pt-24">
        <p className="text-[11px] font-mono tracking-[0.35em] text-white/40 mb-4">
          C:\EMB\MUSIC
        </p>
        <h2 className="text-2xl md:text-4xl font-semibold tracking-tight mb-4">
          {isEs
            ? "MUSIC · Diseño de sonido y sincronía con imagen."
            : "MUSIC · Sound design & sync with picture."}
        </h2>
        <p className="text-sm md:text-base text-white/70 max-w-2xl mb-8">
          {isEs
            ? "Ritmos, texturas y transiciones pensadas para encajar con los cortes, la tipografía y los movimientos de cámara."
            : "Rhythms, textures and transitions designed to lock perfectly with cuts, typography and camera moves."}
        </p>
        <div className="border border-white/10 bg-black/50 backdrop-blur-md px-4 py-4 text-xs rounded-md mb-8">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-mono tracking-[0.22em] text-white/40 uppercase">
                {isEs ? "DEMO LOOP" : "DEMO LOOP"}
              </span>
              <span className="text-[11px] text-white/80">
                {isEs
                  ? "Cinemático / glitch / ambiente"
                  : "Cinematic / glitch / ambient"}
              </span>
            </div>
            <button
              type="button"
              onClick={togglePlay}
              className="px-3 py-1.5 text-[11px] font-mono tracking-[0.2em] uppercase border border-white/40 rounded-full hover:bg-white hover:text-black transition-colors"
            >
              {isPlaying
                ? isEs
                  ? "PAUSAR"
                  : "PAUSE"
                : isEs
                ? "REPRODUCIR"
                : "PLAY"}
            </button>
          </div>
          <div className="mt-4 flex items-end gap-[3px] h-12">
            {levels.map((value, index) => (
              <div
                key={index}
                className="w-1.5 rounded-t-full bg-emerald-400/80 transition-all duration-150"
                style={{
                  height: `${20 + value * 80}%`,
                  opacity: isPlaying ? 1 : 0.35,
                }}
              />
            ))}
          </div>
          <audio
            ref={audioRef}
            src="/audio/music-demo.mp3"
            loop
            onEnded={() => setIsPlaying(false)}
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border border-white/10 bg-white/5 backdrop-blur-md px-4 py-4 text-xs uppercase tracking-[0.2em]">
            <p className="text-white/40 mb-1">{isEs ? "ESTILO" : "STYLE"}</p>
            <p className="text-white">ELECTRONIC · CINEMATIC · AMBIENT</p>
          </div>
          <div className="border border-white/10 bg-white/5 backdrop-blur-md px-4 py-4 text-xs uppercase tracking-[0.2em]">
            <p className="text-white/40 mb-1">{isEs ? "USO" : "USAGE"}</p>
            <p className="text-white">TRAILERS · REELS · EXPERIENCES</p>
          </div>
        </div>

        {/* detalle MUSIC */}
        <div className="mt-10 grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)] text-xs md:text-sm text-white/70">
          <div>
            <p className="text-white/40 uppercase tracking-[0.2em] mb-3">
              {isEs ? "QUÉ PRODUCIMOS" : "WHAT WE PRODUCE"}
            </p>
            <ul className="space-y-2">
              <li className="flex gap-3">
                <span className="mt-2 h-px w-6 bg-white/30" />
                <span>
                  {isEs
                    ? "Cortos acordes construidos alrededor de drops, risers y hits que coinciden con los cortes y movimientos de cámara."
                    : "Short cues built around drops, risers and hits that match edits and camera moves."}
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-px w-6 bg-white/30" />
                <span>
                  {isEs
                    ? "Capas texturales y atmósferas que llenan el fondo sin luchar contra el diálogo o los efectos de sonido."
                    : "Textural layers and ambiences that fill the background without fighting dialogue or SFX."}
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-px w-6 bg-white/30" />
                <span>
                  {isEs
                    ? "Elementos de diseño de sonido: whooshes, glitches, impactos y pitidos de UI sincronizados con gráficos."
                    : "Sound design elements: whooshes, glitches, impacts and UI beeps synced to graphics."}
                </span>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-white/40 uppercase tracking-[0.2em] mb-3">
              {isEs ? "DÓNDE SE USA" : "WHERE IT FITS"}
            </p>
            <ul className="space-y-2">
              <li className="flex gap-3">
                <span className="mt-2 h-px w-6 bg-white/30" />
                <span>
                  {isEs
                    ? "Reels, intros y videos de anuncio que necesitan un ritmo fuerte."
                    : "Reels, intros and announcement videos that need strong rhythm."}
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-px w-6 bg-white/30" />
                <span>
                  {isEs
                    ? "Contenido de esports o gaming donde la música tiene que coincidir con los jugadas y las superposiciones."
                    : "Esports or gaming content where music has to hit with plays and overlays."}
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-px w-6 bg-white/30" />
                <span>
                  {isEs
                    ? "Experiencias interactivas o sitios web que reaccionan a señales de audio."
                    : "Interactive experiences or websites that react to audio cues."}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
