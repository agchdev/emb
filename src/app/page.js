"use client"
import { useEffect, useRef, useState } from "react";
export default function Home() {
  const [lang, setLang] = useState("en")
  const isEs = lang === "es"

  return (
    <div className="relative z-20 px-6 pb-40 text-white">
      {/* Selector de idioma */}
      <div className="fixed right-6 top-6 z-50 text-[11px] font-mono tracking-[0.25em] uppercase flex items-center gap-1">
        <button
          type="button"
          onClick={() => setLang("es")}
          className={
            isEs
              ? "px-2 py-1 bg-white text-black"
              : "px-2 py-1 text-white/60 hover:text-white"
          }
        >
          ES
        </button>
        <span className="text-white/30">/</span>
        <button
          type="button"
          onClick={() => setLang("en")}
          className={
            !isEs
              ? "px-2 py-1 bg-white text-black"
              : "px-2 py-1 text-white/60 hover:text-white"
          }
        >
          EN
        </button>
      </div>
      {/* HOME */}
      <section id="home" className="pt-40 pb-32">
        <div className="max-w-5xl mx-auto">
          <p className="text-[11px] font-mono tracking-[0.35em] text-white/40 mb-4">
            C:\EMB\HOME
          </p>
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">
            {isEs
              ? "Dirección creativa, VFX y experiencias interactivas."
              : "Creative direction, VFX & interactive experiences."}
          </h1>
          <p className="text-sm md:text-base text-white/70 max-w-2xl">
            {isEs
              ? "Combino motores en tiempo real, motion design y sonido para crear secuencias cinematográficas, visuales estilizadas y experiencias web experimentales."
              : "I combine real-time engines, motion design and sound to craft cinematic sequences, stylized visuals and experimental web experiences."}
          </p>

          {/* resumen rápido en 3 columnas */}
          <div className="grid gap-4 mt-10 md:grid-cols-3">
            <div className="border border-white/10 bg-white/5 backdrop-blur-md px-4 py-3 text-xs uppercase tracking-[0.2em]">
              <p className="text-white/40 mb-1">{isEs ? "FOCO" : "FOCUS"}</p>
              <p className="text-white">3D · VFX · EDIT</p>
            </div>
            <div className="border border-white/10 bg-white/5 backdrop-blur-md px-4 py-3 text-xs uppercase tracking-[0.2em]">
              <p className="text-white/40 mb-1">{isEs ? "HERRAMIENTAS" : "TOOLS"}</p>
              <p className="text-white">UEFN · AFTER EFFECTS · BLENDER</p>
            </div>
            <div className="border border-white/10 bg-white/5 backdrop-blur-md px-4 py-3 text-xs uppercase tracking-[0.2em]">
              <p className="text-white/40 mb-1">{isEs ? "DISPONIBLE PARA" : "AVAILABLE FOR"}</p>
              <p className="text-white">
                {isEs ? "PROYECTOS · COLABS" : "PROJECTS · COLLABS"}
              </p>
            </div>
          </div>

          {/* detalle de lo que haces y para quién */}
          <div className="mt-10 grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)] text-xs md:text-sm text-white/70">
            <div>
              <p className="text-white/40 uppercase tracking-[0.2em] mb-3">
                {isEs ? "QUÉ HAGO" : "WHAT I DO"}
              </p>
              <ul className="space-y-2">
                <li className="flex gap-3">
                  <span className="mt-2 h-px w-6 bg-white/30" />
                  <span>
                    {isEs
                      ? "Concepto, dirección de arte y edición para piezas cortas: intros, trailers, reels y secuencias experimentales."
                      : "Concept, art direction and editing for short-form pieces: intros, trailers, reels and experimental sequences."}
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-px w-6 bg-white/30" />
                  <span>
                    {isEs
                      ? "Mezcla de metraje real, VFX estilizado y overlays tipo HUD para crear una identidad visual fuerte."
                      : "Blend of live-action footage, stylized VFX and HUD-style overlays to create a strong visual identity."}
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-px w-6 bg-white/30" />
                  <span>
                    {isEs
                      ? "Sincronía entre visuales, tipografía y sonido para que cada corte se sienta preciso e intencional."
                      : "Sync between visuals, typography and sound so that every cut feels sharp and intentional."}
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-white/40 uppercase tracking-[0.2em] mb-3">
                {isEs ? "PARA QUIÉN" : "WHO IT'S FOR"}
              </p>
              <ul className="space-y-2">
                <li className="flex gap-3">
                  <span className="mt-2 h-px w-6 bg-white/30" />
                  <span>
                    {isEs
                      ? "Creadores y streamers que necesitan una intro potente o un lenguaje visual claro."
                      : "Creators and streamers who need a strong intro or visual language."}
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-px w-6 bg-white/30" />
                  <span>
                    {isEs
                      ? "Equipos de esports y marcas que buscan reveals o piezas de hype cinematográficas."
                      : "Esports teams and brands looking for cinematic reveals or hype pieces."}
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-px w-6 bg-white/30" />
                  <span>
                    {isEs
                      ? "Estudios o agencias que quieren un colaborador centrado en motion y visuales en tiempo real."
                      : "Studios or agencies that want a collaborator focused on motion and realtime visuals."}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* UEFN */}
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

      {/* DEV */}
      <section id="dev" className="pb-32 border-t border-white/5">
        <div className="max-w-5xl mx-auto pt-24">
          <p className="text-[11px] font-mono tracking-[0.35em] text-white/40 mb-4">
            C:\EMB\DEV
          </p>
          <h2 className="text-2xl md:text-4xl font-semibold tracking-tight mb-4">
            {isEs
              ? "DEV · Web interactiva y herramientas para creadores."
              : "DEV · Interactive web & tools for creators."}
          </h2>
          <p className="text-sm md:text-base text-white/70 max-w-2xl mb-8">
            {isEs
              ? "Front-end centrado en animación, UX limpia y herramientas a medida que conectan editores, audiencia y experiencias en tiempo real."
              : "Front-end focused on motion, clean UX and custom tools that connect editors, viewers and realtime experiences."}
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="border border-white/10 bg-white/5 backdrop-blur-md px-4 py-4 text-xs uppercase tracking-[0.2em]">
              <p className="text-white/40 mb-1">{isEs ? "STACK" : "STACK"}</p>
              <p className="text-white">NEXT · REACT · TAILWIND</p>
            </div>
            <div className="border border-white/10 bg-white/5 backdrop-blur-md px-4 py-4 text-xs uppercase tracking-[0.2em]">
              <p className="text-white/40 mb-1">{isEs ? "FOCO" : "FOCUS"}</p>
              <p className="text-white">ANIMATIONS · PERFORMANCE</p>
            </div>
            <div className="border border-white/10 bg-white/5 backdrop-blur-md px-4 py-4 text-xs uppercase tracking-[0.2em]">
              <p className="text-white/40 mb-1">{isEs ? "FORMATOS" : "FORMATS"}</p>
              <p className="text-white">LANDINGS · DASHBOARDS · TOOLS</p>
            </div>
          </div>

          {/* detalle DEV */}
          <div className="mt-10 grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)] text-xs md:text-sm text-white/70">
            <div>
              <p className="text-white/40 uppercase tracking-[0.2em] mb-3">
                {isEs ? "QUÉ DESARROLLO" : "WHAT I BUILD"}
              </p>
              <ul className="space-y-2">
                <li className="flex gap-3">
                  <span className="mt-2 h-px w-6 bg-white/30" />
                  <span>
                    {isEs
                      ? "Landings y portfolios centrados en motion, scroll y transiciones en lugar de layouts estáticos."
                      : "Landing pages and portfolios focused on motion, scroll and transitions instead of static layouts."}
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-px w-6 bg-white/30" />
                  <span>
                    {isEs
                      ? "Pequeñas herramientas para creadores: dashboards, librerías de clips o paneles internos para organizar contenido."
                      : "Simple tools for creators: dashboards, clip libraries or small internal panels to organize content."}
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-px w-6 bg-white/30" />
                  <span>
                    {isEs
                      ? "Interfaces que se conectan con vídeo, visuales en tiempo real o APIs externas cuando hace falta."
                      : "Interfaces that connect with video, realtime visuals or external APIs when needed."}
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-white/40 uppercase tracking-[0.2em] mb-3">
                {isEs ? "PARA QUIÉN" : "WHO IT'S FOR"}
              </p>
              <ul className="space-y-2">
                <li className="flex gap-3">
                  <span className="mt-2 h-px w-6 bg-white/30" />
                  <span>
                    {isEs
                      ? "Editores, motion designers y creadores que necesitan un sitio donde mostrar su trabajo."
                      : "Editors, motion designers and creators that need a place to show work."}
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-px w-6 bg-white/30" />
                  <span>
                    {isEs
                      ? "Equipos pequeños que quieren un front-end a medida en lugar de plantillas genéricas."
                      : "Small teams that want a custom front-end instead of generic templates."}
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-px w-6 bg-white/30" />
                  <span>
                    {isEs
                      ? "Gente a la que le importan tanto las transiciones, la tipografía y el ritmo como el código."
                      : "People who care about transitions, typography and rhythm as much as code."}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* MUSIC */}
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
              <p className="text-white/40 uppercase tracking-[0.2em] mb-3">{isEs ? "QUÉ PRODUZCO" : "WHAT I PRODUCE"}</p>
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
              <p className="text-white/40 uppercase tracking-[0.2em] mb-3">{isEs ? "DÓNDE SE USA" : "WHERE IT FITS"}</p>
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

      {/* VFX */}
      <section id="vfx" className="pb-32 border-t border-white/5">
        <div className="max-w-5xl mx-auto pt-24">
          <p className="text-[11px] font-mono tracking-[0.35em] text-white/40 mb-4">
            C:\EMB\VFX
          </p>
          <h2 className="text-2xl md:text-4xl font-semibold tracking-tight mb-4">
            {isEs
              ? "VFX · Composición, glitch y capas gráficas."
              : "VFX · Compositing, glitch & graphic overlays."}
          </h2>
          <p className="text-sm md:text-base text-white/70 max-w-2xl mb-8">
            {isEs
              ? "Tratamientos por capas, tipografía, HUDs y glitches para llevar metraje real y renders a un lenguaje visual más estilizado."
              : "Layered treatments, typography, HUDs and glitches to push live-action and in-engine footage into a stylized visual language."}
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="border border-white/10 bg-white/5 backdrop-blur-md px-4 py-4 text-xs uppercase tracking-[0.2em]">
              <p className="text-white/40 mb-1">{isEs ? "TECH" : "TECH"}</p>
              <p className="text-white">AFTER EFFECTS · FUSION</p>
            </div>
            <div className="border border-white/10 bg-white/5 backdrop-blur-md px-4 py-4 text-xs uppercase tracking-[0.2em]">
              <p className="text-white/40 mb-1">{isEs ? "ELEMENTOS" : "ELEMENTS"}</p>
              <p className="text-white">HUD · NOISE · TYPO · DATA</p>
            </div>
            <div className="border border-white/10 bg-white/5 backdrop-blur-md px-4 py-4 text-xs uppercase tracking-[0.2em]">
              <p className="text-white/40 mb-1">{isEs ? "ENTREGA" : "DELIVERY"}</p>
              <p className="text-white">SOCIAL · BRAND · ESPORTS</p>
            </div>
          </div>

          {/* detalle VFX */}
          <div className="mt-10 grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)] text-xs md:text-sm text-white/70">
            <div>
              <p className="text-white/40 uppercase tracking-[0.2em] mb-3">
                {isEs ? "QUÉ AÑADO" : "WHAT I ADD"}
              </p>
              <ul className="space-y-2">
                <li className="flex gap-3">
                  <span className="mt-2 h-px w-6 bg-white/30" />
                  <span>
                    {isEs
                      ? "Elementos HUD, coordenadas, grids y overlays de datos similares a la interfaz que ves de fondo."
                      : "HUD elements, coordinates, grids and data overlays similar to the interface you see in the background."}
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-px w-6 bg-white/30" />
                  <span>
                    {isEs
                      ? "Pasadas de glitch, ruido y distorsión que se pueden subir o bajar según el proyecto."
                      : "Glitch, noise and distortion passes that can be pushed more or less depending on the project."}
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-px w-6 bg-white/30" />
                  <span>
                    {isEs
                      ? "Composición de 3D, renders de UEFN y metraje real para que todo se sienta como una sola pieza."
                      : "Compositing of 3D, UEFN renders and live-action so everything feels like a single piece."}
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-white/40 uppercase tracking-[0.2em] mb-3">
                {isEs ? "PARA QUÉ" : "USED FOR"}
              </p>
              <ul className="space-y-2">
                <li className="flex gap-3">
                  <span className="mt-2 h-px w-6 bg-white/30" />
                  <span>
                    {isEs
                      ? "Sistemas de identidad para canales, equipos o marcas que necesitan un look único."
                      : "Identity systems for channels, teams or brands that need a unique look."}
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-px w-6 bg-white/30" />
                  <span>
                    {isEs
                      ? "Transiciones entre categorías dentro de un vídeo o paquetes completos on-brand."
                      : "Transitions between categories inside a video or full on-brand packages."}
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-px w-6 bg-white/30" />
                  <span>
                    {isEs
                      ? "Cualquier metraje que quieras llevar a un mundo más gráfico y estilizado."
                      : "Any footage that you want to push into a more graphic and stylized world."}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
