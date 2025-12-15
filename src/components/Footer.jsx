"use client"

import { useEffect, useMemo, useState } from "react"

const STATUS_ES = ["Disponible", "En produccion ligera", "Ventana libre", "Explorando briefs"]
const STATUS_EN = ["Available", "Light production", "Open window", "Reviewing briefs"]

const channels = {
  es: [
    { label: "Email", value: "embjsdevs@gmail.com", href: "mailto:embjsdevs@gmail.com?subject=Hola%20EMB" },
    { label: "IG", value: "@emb.js", href: "https://instagram.com/emb.js" },
    { label: "Zona", value: "UTC+1 / remoto" },
    { label: "SLA", value: "Resp <24h" },
  ],
  en: [
    { label: "Email", value: "embjsdevs@gmail.com", href: "mailto:embjsdevs@gmail.com?subject=Hello%20EMB" },
    { label: "IG", value: "@emb.js", href: "https://instagram.com/emb.js" },
    { label: "Zone", value: "UTC+1 / remote" },
    { label: "SLA", value: "Reply <24h" },
  ],
}

const slots = {
  es: [
    { label: "Semana 1-2", status: "Libre", color: "text-emerald-200" },
    { label: "Semana 3", status: "Media", color: "text-amber-200" },
    { label: "Semana 4", status: "Testing / R&D", color: "text-fuchsia-200" },
  ],
  en: [
    { label: "Week 1-2", status: "Open", color: "text-emerald-200" },
    { label: "Week 3", status: "Half", color: "text-amber-200" },
    { label: "Week 4", status: "Testing / R&D", color: "text-fuchsia-200" },
  ],
}

const briefSteps = {
  es: [
    "Objetivo, plazos, riesgos",
    "Mood + prototipo ligero",
    "Sprints cortos + QA",
    "SEO, training, handoff",
  ],
  en: [
    "Goal, timeline, risks",
    "Mood + light prototype",
    "Short sprints + QA",
    "SEO, training, handoff",
  ],
}

export function Footer({ isEs = true }) {
  const statusList = isEs ? STATUS_ES : STATUS_EN
  const [statusIndex, setStatusIndex] = useState(0)
  const status = statusList[statusIndex]
  const chan = isEs ? channels.es : channels.en
  const slotList = isEs ? slots.es : slots.en
  const steps = isEs ? briefSteps.es : briefSteps.en

  useEffect(() => {
    setStatusIndex(0)
    const id = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % statusList.length)
    }, 2400)
    return () => clearInterval(id)
  }, [statusList])

  const now = useMemo(() => new Date(), [])

  return (
    <footer id="contact" className="relative z-20 mt-24 overflow-hidden" aria-labelledby="footer-title">
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(56,189,248,0.12),transparent_32%),radial-gradient(circle_at_80%_10%,rgba(147,51,234,0.15),transparent_35%),radial-gradient(circle_at_70%_70%,rgba(52,211,153,0.1),transparent_30%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:120px_120px,120px_120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-16 text-white">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p className="text-[11px] font-mono uppercase tracking-[0.32em] text-white/40">C:\EMB\CONTACT</p>
            <h2 id="footer-title" className="text-3xl md:text-5xl font-semibold tracking-tight">
              {isEs ? "Lanza con nosotros." : "Ship with us."}
            </h2>
            <p className="max-w-2xl text-sm text-white/70">
              {isEs
                ? "Direccion tecnica + motion. Entregas modulares, QA continuo, agenda clara."
                : "Technical direction + motion. Modular delivery, continuous QA, clear agenda."}
            </p>
          </div>
          <div className="text-[11px] font-mono uppercase tracking-[0.3em] text-white/60">
            {isEs ? "UTC+1 / Respuesta <24h" : "UTC+1 / Reply <24h"}
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="border border-white/15 bg-white/5 p-5 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset,0_10px_35px_rgba(0,0,0,0.35)]">
            <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.25em] text-white/60">
              <span>{isEs ? "Estado" : "Status"}</span>
              <span className="flex items-center gap-2 text-emerald-200">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />
                {status}
              </span>
            </div>
            <div className="mt-4 space-y-2 text-sm text-white/75">
              <div className="flex items-center justify-between">
                <span>{isEs ? "Stack base" : "Base stack"}</span>
                <span className="text-white">React / Motion / UEFN</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Ops</span>
                <span className="text-white/80">QA continuo</span>
              </div>
              <div className="flex items-center justify-between">
                <span>{isEs ? "Ritmo" : "Pace"}</span>
                <span className="text-white/80">Sprints cortos</span>
              </div>
            </div>
          </div>

          <div className="border border-white/15 bg-white/5 p-5 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset,0_10px_35px_rgba(0,0,0,0.35)]">
            <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-white/60">
              {isEs ? "Canales" : "Channels"}
            </div>
            <div className="mt-4 space-y-3 text-sm">
              {chan.map((c) => (
                <div
                  key={c.label}
                  className="flex items-center justify-between rounded-lg border border-white/10 bg-black/40 px-3 py-2"
                >
                  <span className="text-white/60">{c.label}</span>
                  {c.href ? (
                    <a href={c.href} className="text-white hover:text-emerald-200 transition-colors">
                      {c.value}
                    </a>
                  ) : (
                    <span className="text-white">{c.value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="border border-white/15 bg-white/5 p-5 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset,0_10px_35px_rgba(0,0,0,0.35)]">
            <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-white/60">
              {isEs ? "Slots proximos" : "Next slots"}
            </div>
            <div className="mt-4 space-y-2 text-sm text-white/80">
              {slotList.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center justify-between rounded-md border border-white/10 bg-black/30 px-3 py-2"
                >
                  <span>{s.label}</span>
                  <span className={s.color}>{s.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="border border-white/15 bg-white/5 p-5 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset,0_10px_35px_rgba(0,0,0,0.35)]">
            <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.25em] text-white/60">
              <span>{isEs ? "Secuencia de brief" : "Brief sequence"}</span>
              <span className="text-white/40">
                {now.getDate().toString().padStart(2, "0")}/{(now.getMonth() + 1).toString().padStart(2, "0")}
              </span>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {steps.map((step, idx) => (
                <div
                  key={step}
                  className="flex items-start gap-3 rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm text-white/80"
                >
                  <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-white/50">0{idx + 1}</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-white/15 bg-white/5 p-5 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset,0_10px_35px_rgba(0,0,0,0.35)]">
            <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-white/60">
              {isEs ? "Accion rapida" : "Quick action"}
            </div>
            <div className="mt-4 flex flex-col gap-3 text-sm">
              <a
                href="mailto:hola@emb.pro?subject=Necesito%20un%20lanzamiento%20EMB"
                className="flex items-center justify-between rounded-lg border border-white bg-white px-4 py-3 text-black shadow-[0_0_18px_rgba(255,255,255,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_0_28px_rgba(52,211,153,0.45)]"
              >
                <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-black/70">
                  {isEs ? "Correo" : "Email"}
                </span>
                <span className="text-sm font-semibold tracking-wide">
                  {isEs ? "Abrir cliente" : "Open client"}
                </span>
              </a>
              <a
                href="https://instagram.com/embjs"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-lg border border-white/20 bg-black/40 px-4 py-3 text-white transition hover:border-white/50 hover:bg-white/10"
              >
                <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-white/70">
                  Instagram
                </span>
                <span className="text-sm font-semibold tracking-wide">@embjs</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
