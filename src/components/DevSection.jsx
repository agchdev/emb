export function DevSection({ isEs }) {
  return (
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
  );
}
    