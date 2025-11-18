"use client"

export function UefnSection({ isEs }) {
  return (
    <section id="uefn" className="pb-32 border-t border-white/5">
      <div className="max-w-5xl mx-auto pt-24">
        <p className="text-[11px] font-mono tracking-[0.35em] text-white/40 mb-4">
          C:\EMB\UEFN
        </p>
        <h2 className="text-2xl md:text-4xl font-semibold tracking-tight mb-4">
          {isEs
            ? "UEFN · Mundos en tiempo real y cinemáticas listas para juego."
            : "UEFN · Real-time worlds & game-ready cinematics."}
        </h2>
        <p className="text-sm md:text-base text-white/70 max-w-2xl mb-8">
          {isEs
            ? "Construcción de mundos, iluminación, secuencias y composición dentro del motor para crear entornos jugables y tráilers."
            : "World building, lighting, sequencing and in-engine compositing to create responsive, game-ready environments and trailers."}
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border border-white/10 bg-white/5 backdrop-blur-md px-4 py-4 text-xs uppercase tracking-[0.2em]">
            <p className="text-white/40 mb-1">{isEs ? "PIPELINE" : "PIPELINE"}</p>
            <p className="text-white">BLOCKOUT · LIGHTING · SEQUENCER · RENDER</p>
          </div>
          <div className="border border-white/10 bg-white/5 backdrop-blur-md px-4 py-4 text-xs uppercase tracking-[0.2em]">
            <p className="text-white/40 mb-1">{isEs ? "SALIDA" : "OUTPUT"}</p>
            <p className="text-white">TRAILERS · IN-GAME EVENTS · SOCIAL CLIPS</p>
          </div>
        </div>

        {/* detalle UEFN */}
        <div className="mt-10 grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)] text-xs md:text-sm text-white/70">
          <div>
            <p className="text-white/40 uppercase tracking-[0.2em] mb-3">
              {isEs ? "QUÉ CONSTRUYO" : "WHAT I BUILD"}
            </p>
            <ul className="space-y-2">
              <li className="flex gap-3">
                <span className="mt-2 h-px w-6 bg-white/30" />
                <span>
                  {isEs
                    ? "Espacios jugables, arenas y mapas preparados para cámaras cinemáticas y eventos in-game."
                    : "Playable spaces, arenas and maps prepared for cinematic cameras and in-game events."}
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-px w-6 bg-white/30" />
                <span>
                  {isEs
                    ? "Esquemas de iluminación estilizados pero legibles para gameplay y retransmisiones."
                    : "Lighting setups that feel stylized but still readable for gameplay and broadcasts."}
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-px w-6 bg-white/30" />
                <span>
                  {isEs
                    ? "Planos en Sequencer para intros, transiciones y momentos clave reutilizables en diferentes ediciones."
                    : "Sequencer-based shots for intros, transitions and hero moments that can be reused in multiple edits."}
                </span>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-white/40 uppercase tracking-[0.2em] mb-3">
              {isEs ? "QUIÉN LO USA" : "WHO USES IT"}
            </p>
            <ul className="space-y-2">
              <li className="flex gap-3">
                <span className="mt-2 h-px w-6 bg-white/30" />
                <span>
                  {isEs
                    ? "Creadores que quieren islas y visuales a medida en lugar de mapas plantilla."
                    : "Creators that want custom islands and visuals instead of template maps."}
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-px w-6 bg-white/30" />
                <span>
                  {isEs
                    ? "Equipos o marcas que lanzan eventos, hubs o experiencias dentro de Fortnite."
                    : "Teams or brands launching events, hubs or experiences inside Fortnite."}
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-px w-6 bg-white/30" />
                <span>
                  {isEs
                    ? "Editores que necesitan pases de cámara limpios y exportes listos para montar."
                    : "Editors who need clean camera passes and exports ready to cut."}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
