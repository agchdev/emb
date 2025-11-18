export function VfxSection({ isEs }) {
  return (
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
            <p className="text-white/40 mb-1">
              {isEs ? "ELEMENTOS" : "ELEMENTS"}
            </p>
            <p className="text-white">HUD · NOISE · TYPO · DATA</p>
          </div>
          <div className="border border-white/10 bg-white/5 backdrop-blur-md px-4 py-4 text-xs uppercase tracking-[0.2em]">
            <p className="text-white/40 mb-1">
              {isEs ? "ENTREGA" : "DELIVERY"}
            </p>
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
  );
}
