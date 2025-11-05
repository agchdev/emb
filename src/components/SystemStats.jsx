"use client"
import { useEffect, useMemo, useState } from "react"

export default function SystemStats({ loaded = 4, total = 28 }) {
  const [dateStr, setDateStr] = useState("-- -- ----")
  const [timeStr, setTimeStr] = useState("-- -- --")
  const [display, setDisplay] = useState({ w: 0, h: 0 })
  const [hz, setHz] = useState(null)
  const [browser, setBrowser] = useState("UNKNOWN")
  const [language, setLanguage] = useState("UNKNOWN")

  // ---- helpers ----
  const pad = (n) => String(n).padStart(2, "0")
  const formatNow = () => {
    const d = new Date()
    setDateStr(`${pad(d.getDate())} ${pad(d.getMonth() + 1)} ${d.getFullYear()}`)
    setTimeStr(`${pad(d.getHours())} ${pad(d.getMinutes())} ${pad(d.getSeconds())}`)
  }

  const detectBrowser = () => {
    const ua = navigator.userAgent
    // Chrome-based first to evitar falsos positivos
    if (/Edg\//.test(ua)) return "MICROSOFT EDGE"
    if (/OPR\//.test(ua)) return "OPERA"
    if (/Chrome\//.test(ua)) return "GOOGLE CHROME"
    if (/Safari\//.test(ua) && !/Chrome\//.test(ua)) return "SAFARI"
    if (/Firefox\//.test(ua)) return "FIREFOX"
    return ua.split(" ")[0].toUpperCase()
  }

  const detectLanguage = () => {
    const lang = navigator.language || "en"
    try {
      const dn = new Intl.DisplayNames(["en"], { type: "language" })
      return (dn.of(lang) || lang).toUpperCase()
    } catch {
      return lang.toUpperCase()
    }
  }

  // ---- efectos ----
  useEffect(() => {
    formatNow()
    const t = setInterval(formatNow, 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const setSize = () => setDisplay({ w: window.innerWidth, h: window.innerHeight })
    setSize()
    window.addEventListener("resize", setSize)
    return () => window.removeEventListener("resize", setSize)
  }, [])

  useEffect(() => {
    setBrowser(detectBrowser())
    setLanguage(detectLanguage())
  }, [])

  // medir refresco (Hz) con rAF ~1s
  useEffect(() => {
    let id = 0
    let last = performance.now()
    const samples = []
    const maxSamples = 60
    const loop = (now) => {
      const dt = now - last
      last = now
      if (dt > 0 && dt < 100) samples.push(1000 / dt)
      if (samples.length < maxSamples) {
        id = requestAnimationFrame(loop)
      } else {
        // media de las últimas 30 para estabilidad
        const slice = samples.slice(-30)
        const avg = slice.reduce((a, b) => a + b, 0) / slice.length
        // redondeo al múltiplo de 5 más cercano (60, 75, 120…)
        const rounded = Math.round(avg / 5) * 5
        setHz(rounded)
      }
    }
    id = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <div className="font-mono text-[8px] tracking-widest text-white/30 space-y-4">
      <div>
        <div>PAR SING DATA</div>
        <div className="opacity-50">----------------</div>
      </div>

      <div>
        <div>DATE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;({dateStr})</div>
        <div>HOUR&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;({timeStr})</div>
        <div>LOADING PROJECTS&nbsp;&nbsp;({String(pad(loaded))}/{String(pad(total))})</div>
      </div>

      <div className="opacity-60">----------------</div>

      <div>
        <div>DISPLAY&nbsp;:&nbsp;({display.w}x{display.h}px @{hz ?? "??"}Hz)</div>
        <div>BROWSER&nbsp;:&nbsp;({browser})</div>
        <div>LANGUAGE:&nbsp;({language})</div>
      </div>
    </div>
  )
}
