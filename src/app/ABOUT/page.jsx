"use client";

import { motion } from "motion/react";
import {
  Code2,
  Share2,
  Search,
  Sparkles,
  PanelsTopLeft,
  Rocket,
  Layers3,
} from "lucide-react";
import Footer from "@/components/Footer";

const heroChips = [
  { title: "Sites inmersivos", detail: "Next + motion en tiempo real" },
  { title: "Software modular", detail: "Dashboards, flujos y automatizaciones" },
  { title: "RRSS vivas", detail: "Contenido, direccion y reporting" },
  { title: "SEO organico", detail: "Arquitectura + contenido evergreen" },
];

const duo = [
  {
    tag: "Alex / Dev",
    focus: "Fullstack + IA",
    bullets: ["APIs y sistemas", "Infra ligera", "Integraciones"],
  },
  {
    tag: "Mar / Motion",
    focus: "Visual + sonido",
    bullets: ["RRSS + ads", "VFX + musica", "Brand ops"],
  },
];

const modules = [
  {
    icon: Code2,
    title: "Landings vivas",
    detail: "Scroll reactivo, GSAP y componentes propios.",
  },
  {
    icon: PanelsTopLeft,
    title: "Apps ligeras",
    detail: "Herramientas internas y paneles realtime.",
  },
  {
    icon: Share2,
    title: "Contenido + RRSS",
    detail: "Clips, copys y metricas claras.",
  },
  {
    icon: Search,
    title: "SEO tecnico",
    detail: "Auditoria, migracion y growth organico.",
  },
  {
    icon: Sparkles,
    title: "Experiencias",
    detail: "Microsites 3D, reveals y launches.",
  },
  {
    icon: Layers3,
    title: "Brand systems",
    detail: "Guias, kits y handoff para equipos.",
  },
];

const pipeline = [
  { title: "Brief", desc: "Call 15 min" },
  { title: "Mood + blueprint", desc: "FigJam + prototipo" },
  { title: "Build", desc: "Sprints cortos" },
  { title: "Launch", desc: "SEO + training" },
];

const loops = [
  ["Next.js", "UEFN", "GSAP", "Motion", "Ableton", "SEO"],
  ["Contenido", "RRSS", "R&D", "Realtime", "Brand", "Automations"],
];

const stats = [
  { label: "Respuestas", value: "<24h" },
  { label: "Ventanas libres", value: "2/mes" },
  { label: "Stack", value: "React x Motion" },
];

export default function About() {
  return (
    <div className="relative z-20 px-6 pb-32 text-white">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-y-0 left-1/2 h-[120vh] w-[50vw] -translate-x-1/2 bg-gradient-to-b from-white/5 via-fuchsia-500/10 to-transparent blur-[140px]" />
        <div className="absolute -top-10 right-10 h-64 w-64 rounded-full border border-white/20 opacity-40" />
      </div>

      <section className="mx-auto max-w-6xl pt-28">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[11px] font-mono uppercase tracking-[0.4em] text-white/60"
        >
          EMB / ABOUT
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-5 text-4xl leading-tight md:text-6xl"
        >
          Duo dev + motion que disena webs, software y contenido con estetica de trailer.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-4 text-base text-white/70"
        >
          Preferimos piezas cortas, loops de contenido y entregas modulares. Cada capa tiene motion y metricas desde dia uno.
        </motion.p>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border border-white/10 bg-white/5 p-6 backdrop-blur"
          >
            <div className="flex flex-wrap gap-4 text-sm text-white/70">
              {stats.map((item) => (
                <div key={item.label} className="flex flex-col">
                  <span className="text-xs uppercase tracking-[0.3em] text-white/40">{item.label}</span>
                  <span className="text-2xl font-semibold text-white">{item.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {heroChips.map((chip) => (
                <motion.div
                  key={chip.title}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="border border-white/10 bg-black/30 p-4"
                >
                  <p className="text-sm font-semibold">{chip.title}</p>
                  <p className="mt-2 text-xs text-white/60">{chip.detail}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-fuchsia-500/20 via-transparent to-emerald-400/20 p-8"
          >
            <motion.div
              className="absolute inset-10 rounded-full border border-white/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            />
            <div className="relative space-y-3">
              <p className="text-[11px] font-mono uppercase tracking-[0.4em] text-white/60">
                Duo Mode
              </p>
              <p className="text-3xl font-semibold">Somos 2 chavales</p>
              <p className="text-sm text-white/70">
                Engineering + direccion visual trabajando en un mismo timeline.
              </p>
              <div className="flex gap-4 pt-4">
                <div className="h-2 flex-1 rounded-full bg-white/15">
                  <motion.div
                    className="h-full rounded-full bg-white"
                    animate={{ width: ["20%", "90%", "60%", "100%"] }}
                    transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  />
                </div>
                <span className="text-xs uppercase tracking-[0.3em] text-white/60">
                  Sync
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-6xl">
        <div className="grid gap-6 md:grid-cols-2">
          {duo.map((profile) => (
            <motion.div
              key={profile.tag}
              whileHover={{ rotateX: 6, rotateY: -6 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              style={{ transformPerspective: 1200 }}
              className="border border-white/10 bg-black/40 p-6 backdrop-blur"
            >
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">{profile.tag}</p>
                <span className="text-xs uppercase tracking-[0.3em] text-emerald-200">
                  {profile.focus}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-3 text-xs uppercase tracking-[0.3em] text-white/60">
                {profile.bullets.map((item) => (
                  <span key={item} className="border border-white/15 px-3 py-1">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-6xl space-y-4">
        {loops.map((row, index) => (
          <motion.div
            key={index}
            className="overflow-hidden border border-white/5 bg-white/5 py-3"
          >
            <motion.div
              className="flex gap-8 text-sm uppercase tracking-[0.5em] text-white/50"
              animate={{ x: index % 2 === 0 ? ["0%", "-40%"] : ["-40%", "0%"] }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            >
              {[...row, ...row].map((item, idx) => (
                <span key={`${item}-${idx}`}>{item}</span>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </section>

      <section className="mx-auto mt-20 max-w-6xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[11px] font-mono uppercase tracking-[0.4em] text-white/60">
              Modulos
            </p>
            <h2 className="mt-2 text-3xl font-semibold">Elegimos bloques segun el reto</h2>
          </div>
          <a
            href="mailto:hola@emb.pro?subject=Explorar%20un%20modulo%20EMB"
            className="text-sm uppercase tracking-[0.3em] text-emerald-200"
          >
            Cuentanos tu mix
          </a>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {modules.map(({ icon: Icon, title, detail }) => (
            <motion.div
              key={title}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden border border-white/10 bg-white/5 p-6"
            >
              <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100" />
              <div className="flex items-center justify-between">
                <Icon className="h-6 w-6 text-white" />
                <Rocket className="h-4 w-4 text-white/40" />
              </div>
              <p className="mt-6 text-2xl font-semibold">{title}</p>
              <p className="mt-2 text-sm text-white/70">{detail}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-6xl rounded-3xl border border-white/10 bg-black/40 p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[11px] font-mono uppercase tracking-[0.4em] text-white/60">
              Pipeline
            </p>
            <h2 className="mt-2 text-3xl font-semibold">Timeline ultra claro</h2>
          </div>
          <p className="text-sm text-white/60">Status compartidos en Notion + board de motion.</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {pipeline.map((step, index) => (
            <div key={step.title} className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-white/50">
                <span>0{index + 1}</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              <p className="text-xl font-semibold">{step.title}</p>
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">{step.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 h-2 w-full rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-emerald-300 via-white to-fuchsia-400"
            animate={{ width: ["15%", "45%", "80%", "100%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-4xl">
        <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-white/10 via-transparent to-black/50 p-10 text-center">
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, rgba(16,185,129,0.3), transparent 40%), radial-gradient(circle at 80% 0%, rgba(244,114,182,0.3), transparent 40%)",
            }}
          />
          <div className="relative space-y-4">
            <p className="text-[11px] font-mono uppercase tracking-[0.4em] text-white/60">
              Ready?
            </p>
            <h2 className="text-4xl font-semibold">Dispara tu brief, nosotros montamos la escena.</h2>
            <div className="flex flex-col items-center gap-4 md:flex-row md:justify-center">
              <a
                href="mailto:hola@emb.pro?subject=Necesito%20una%20experiencia%20EMB"
                className="inline-flex items-center gap-3 rounded-full border border-white bg-white px-6 py-3 text-base font-semibold uppercase tracking-[0.3em] text-black"
              >
                Contactar
              </a>
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">Agenda abierta</p>
            </div>
          </div>
        </div>
      </section>

      <Footer isEs />
    </div>
  );
}
