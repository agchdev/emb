"use client"
import { useEffect, useRef, useState } from "react"

export default function MouseStats({
  offset = { x: 12, y: 18 },   // separación respecto al cursor
  enabled = true,              // por si quieres activarlo/desactivarlo
  showOnTouch = false          // en móviles/tablet con touch, normalmente off
}) {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const raf = useRef(0)

  useEffect(() => {
    if (!enabled) return

    const onMove = (e) => {
      if (e.pointerType === "touch" && !showOnTouch) return
      const { clientX, clientY } = e
      if (raf.current) cancelAnimationFrame(raf.current)
      raf.current = requestAnimationFrame(() => setPos({ x: clientX, y: clientY }))
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    return () => {
      window.removeEventListener("pointermove", onMove)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [enabled, showOnTouch])

  const x = Math.round(pos.x)
  const y = Math.round(pos.y)

  // Posición final con un clamp sencillo para que no se salga de la pantalla
  const dx = offset.x ?? 12
  const dy = offset.y ?? 18
  let left = x + dx
  let top = y + dy

  if (typeof window !== "undefined") {
    const pad = 8
    const approxW = 120
    const approxH = 38
    if (left + approxW + pad > window.innerWidth) left = x - approxW - dx
    if (top + approxH + pad > window.innerHeight) top = y - approxH - dy
  }

  return (
    <div
      className="fixed z-[9999] pointer-events-none select-none"
      style={{ left, top }}
      aria-hidden="true"
    >
      <div className="text-white font-mono text-[8px] leading-4 tracking-widest drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]">
        <div> X: {x}PX</div>
        <div> Y: {y}PX</div>
      </div>
    </div>
  )
}
