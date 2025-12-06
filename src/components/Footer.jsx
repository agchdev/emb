"use client"

import { useEffect, useState } from "react"

const STATUS_ES = [
  "Disponible",
  "En producción ligera",
  "Ventana libre",
  "Explorando briefs",
]
const STATUS_EN = [
  "Available",
  "Light production",
  "Open window",
  "Reviewing briefs",
]

export function Footer({ isEs = true }) {
  const statusList = isEs ? STATUS_ES : STATUS_EN
  const [statusIndex, setStatusIndex] = useState(0)

  useEffect(() => {
    setStatusIndex(0)
    const id = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % statusList.length)
    }, 2600)
    return () => clearInterval(id)
  }, [statusList])

  const status = statusList[statusIndex]

  return (
    <footer
      id="contact"
      className="relative z-20 mt-28 overflow-hidden"
      aria-labelledby="footer-title"
    >
      {/* BG layers */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 20%, rgba(56,189,248,0.12), transparent 32%), radial-gradient(circle at 80% 10%, rgba(147,51,234,0.15), transparent 35%), radial-gradient(circle at 70% 70%, rgba(52,211,153,0.1), transparent 30%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "100% 46px, 46px 100%",
          }}
        />
        <div className="absolute -left-16 top-12 h-32 w-32 rounded-full border border-emerald-400/30 blur-3xl" />
        <div className="absolute right-10 bottom-20 h-24 w-24 rounded-full border border-fuchsia-400/25 blur-2xl" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col justify-between gap-12 px-6 py-16 text-white">
        <div className="space-y-8">
          <div className="space-y-3">
            <p className="text-[11px] font-mono uppercase tracking-[0.35em] text-white/40">
              C:\EMB\CONTACT
            </p>
            <h2
              id="footer-title"
              className="text-3xl md:text-5xl font-semibold tracking-tight"
            >
              {isEs ? "Trabaja con nosotros." : "Work with us."}
            </h2>
            <p className="max-w-3xl text-sm md:text-base text-white/70">
              {isEs
                ? "Bajamos ideas a piezas rápidas, trailers y landings que mantengan tu identidad visual. Si tienes un reto raro, aquí se celebra."
                : "We turn ideas into sharp trailers, quick drops and experiential landings without losing your visual identity. Weird briefs welcome."}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-[1.3fr_1fr] items-start">
            <div className="border border-white/10 bg-white/5 backdrop-blur-md p-5 md:p-7 shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset,0_10px_35px_rgba(0,0,0,0.35)]">
              <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.25em] text-white/50">
                <span>{isEs ? "Disponibilidad" : "Availability"}</span>
                <span className="flex items-center gap-2 text-emerald-200">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />
                  {status}
                </span>
              </div>
              <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-white/50 text-[11px] font-mono uppercase tracking-[0.2em]">
                    {isEs ? "Entregas que podemos cubrir" : "What we can cover"}
                  </p>
                  <ul className="space-y-2 text-sm text-white/80">
                    <li className="flex items-start gap-2">
                      <span className="mt-2 h-px w-6 bg-white/30" />
                      {isEs
                        ? "Trailers, reveals y piezas hype en UEFN o motion."
                        : "Trailers, reveals and hype pieces in UEFN or motion."}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-2 h-px w-6 bg-white/30" />
                      {isEs
                        ? "Landings rápidas en React/Next con estética del set."
                        : "React/Next landings that match the visual set."}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-2 h-px w-6 bg-white/30" />
                      {isEs
                        ? "Tratamientos VFX, glitch y sonido sincronizado."
                        : "VFX treatments, glitch layers and synced sound."}
                    </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="text-white/50 text-[11px] font-mono uppercase tracking-[0.2em]">
                    {isEs ? "Slots próximos" : "Upcoming slots"}
                  </p>
                  <div className="grid gap-2 text-sm text-white/80">
                    <div className="flex items-center justify-between border border-white/10 bg-white/5 px-3 py-2">
                      <span>{isEs ? "Semana 1-2" : "Week 1-2"}</span>
                      <span className="text-emerald-200">{isEs ? "Libre" : "Open"}</span>
                    </div>
                    <div className="flex items-center justify-between border border-white/10 bg-white/5 px-3 py-2">
                      <span>{isEs ? "Semana 3" : "Week 3"}</span>
                      <span className="text-amber-200">{isEs ? "Media" : "Half"}</span>
                    </div>
                    <div className="flex items-center justify-between border border-white/10 bg-white/5 px-3 py-2">
                      <span>{isEs ? "Semana 4" : "Week 4"}</span>
                      <span className="text-fuchsia-200">{isEs ? "Testing / R&D" : "Testing / R&D"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-white/10 bg-white/5 backdrop-blur-md p-5 md:p-7 shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset,0_10px_35px_rgba(0,0,0,0.35)]">
              <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.25em] text-white/50">
                <span>{isEs ? "Brief rápido" : "Quick brief"}</span>
                <span className="h-px w-12 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
              </div>
              <form className="mt-5 space-y-3 text-sm text-white/80">
                <label className="block">
                  <span className="text-white/50 text-[11px] font-mono uppercase tracking-[0.2em]">
                    {isEs ? "Proyecto" : "Project"}
                  </span>
                  <input
                    type="text"
                    placeholder={isEs ? "Ej. Reveal temporada / Landing" : "e.g. Season reveal / Landing"}
                    className="mt-2 w-full border border-white/15 bg-black/40 px-3 py-2 outline-none transition focus:border-white/40"
                    readOnly
                  />
                </label>
                <label className="block">
                  <span className="text-white/50 text-[11px] font-mono uppercase tracking-[0.2em]">
                    {isEs ? "Timing" : "Timing"}
                  </span>
                  <input
                    type="text"
                    placeholder={isEs ? "Fecha objetivo / duración" : "Target date / duration"}
                    className="mt-2 w-full border border-white/15 bg-black/40 px-3 py-2 outline-none transition focus:border-white/40"
                    readOnly
                  />
                </label>
                <label className="block">
                  <span className="text-white/50 text-[11px] font-mono uppercase tracking-[0.2em]">
                    {isEs ? "Referencias" : "References"}
                  </span>
                  <textarea
                    rows={3}
                    placeholder={isEs ? "Links rápidos o vibe" : "Links or vibe"}
                    className="mt-2 w-full border border-white/15 bg-black/40 px-3 py-2 outline-none transition focus:border-white/40 resize-none"
                    readOnly
                  />
                </label>
                <p className="text-xs text-white/50">
                  {isEs
                    ? "Envía este breve a hola@emb.pro y arrancamos con un tablero en 24h."
                    : "Send this quick brief to hola@emb.pro and we start a board within 24h."}
                </p>
              </form>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <a
            href="mailto:hola@emb.pro?subject=Quiero%20trabajar%20con%20EMB"
            className="group relative block overflow-hidden rounded-2xl border border-white/15 bg-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.08)_inset,0_20px_50px_rgba(0,0,0,0.45)]"
          >
            <div
              className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(56,189,248,0.18),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(147,51,234,0.2),transparent_40%)] opacity-80 animate-pulse"
              style={{ animationDuration: "7s" }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.45)_50%,rgba(255,255,255,0)_100%)] translate-x-[-60%] transition-transform duration-1000 ease-out group-hover:translate-x-[120%]" />
            <div className="relative px-6 py-8 sm:px-10 sm:py-12">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="space-y-3">
                  <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-emerald-200">
                    {isEs ? "CTA / COLABORACIÓN" : "CTA / COLLAB"}
                  </p>
                  <p className="text-3xl md:text-5xl font-semibold tracking-tight uppercase leading-tight">
                    {isEs ? "Trabaja con nosotros" : "Work with us"}
                  </p>
                  <p className="max-w-2xl text-sm md:text-base text-white/70">
                    {isEs
                      ? "Pulsa para abrir tu cliente de correo con el asunto listo. Respuesta en menos de un día."
                      : "Tap to open your mail client with the subject ready. We reply in under a day."}
                  </p>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-emerald-400/40 blur-2xl opacity-60 group-hover:scale-125 transition-transform duration-500" />
                  <div className="relative flex items-center gap-3 rounded-full border border-white bg-white px-6 py-4 text-black shadow-[0_0_25px_rgba(255,255,255,0.35)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_0_35px_rgba(52,211,153,0.55)]">
                    <span className="text-xl md:text-2xl font-semibold tracking-[0.3em]">
                      GO
                    </span>
                    <span className="h-10 w-px bg-black/20" />
                    <span className="text-sm font-mono tracking-[0.3em] text-black/70">
                      {isEs ? "Enviar" : "Send"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </a>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 text-[11px] font-mono uppercase tracking-[0.2em] text-white/60">
            <div className="border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-white">hola@emb.pro</p>
              <p className="text-white/50">{isEs ? "Contacto directo" : "Direct contact"}</p>
            </div>
            <div className="border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-white">{isEs ? "UTC+1 / Remoto" : "UTC+1 / Remote"}</p>
              <p className="text-white/50">{isEs ? "Disponibles para calls" : "Available for calls"}</p>
            </div>
            <div className="border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-white">{isEs ? "Entrega modular" : "Modular delivery"}</p>
              <p className="text-white/50">{isEs ? "Clips, assets y landing" : "Clips, assets & landing"}</p>
            </div>
            <div className="border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-white">{isEs ? "Respuesta < 24h" : "Reply < 24h"}</p>
              <p className="text-white/50">{isEs ? "Seguimiento continuo" : "Ongoing follow-up"}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
