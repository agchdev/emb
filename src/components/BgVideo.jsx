'use client'
import React, { useLayoutEffect, useRef, useState } from 'react'

const MASK_IMAGE = '/rect.png'

// 6 máscaras según la referencia
const MASK_TEMPLATES = [
  { id: 1, wPct: 32, hPct: 42, image: '/rect.png' }, // pequeña arriba izquierda
  { id: 2, wPct: 55, hPct: 75, image: '/rect.png' }, // grande centro-arriba
  { id: 3, wPct: 15, hPct: 24, image: '/rect.png' }, // pequeña arriba derecha
  { id: 4, wPct: 15, hPct: 28, image: '/rect.png' }, // mediana medio-izquierda
  { id: 5, wPct: 28, hPct: 38, image: '/rect.png' }, // mediana-grande centro
  { id: 6, wPct: 14, hPct: 20, image: '/rect.png' }, // pequeña abajo derecha
]


export default function BgVideo() {
  const wrapRef = useRef(null)
  const [wrapRect, setWrapRect] = useState({ w: 0, h: 0, left: 0, top: 0 })
  const [masks, setMasks] = useState([])
  const dragRef = useRef(null)

  useLayoutEffect(() => {
    const measure = () => {
      const el = wrapRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const newRect = { w: r.width, h: r.height, left: r.left, top: r.top }
      setWrapRect(newRect)
      if (masks.length === 0 && newRect.w > 0 && newRect.h > 0) {
        setMasks(placeInitialMasks(MASK_TEMPLATES, newRect))
      }
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onHandlePointerDown = (maskId) => (e) => {
    e.preventDefault()
    const m = masks.find((mm) => mm.id === maskId)
    if (!m) return
    const handleRect = e.currentTarget.getBoundingClientRect()
    dragRef.current = {
      id: maskId,
      pointerId: e.pointerId,
      offsetX: e.clientX - handleRect.left,
      offsetY: e.clientY - handleRect.top,
    }
    e.currentTarget.setPointerCapture?.(e.pointerId)
    window.addEventListener('pointermove', onWindowPointerMove)
    window.addEventListener('pointerup', onWindowPointerUp, { once: true })
  }

  const onWindowPointerMove = (e) => {
    const d = dragRef.current
    if (!d) return
    const m = masks.find((mm) => mm.id === d.id)
    if (!m) return

    const wPx = (wrapRect.w * m.wPct) / 100
    const hPx = (wrapRect.h * m.hPct) / 100

    const newX = clamp(e.clientX - wrapRect.left - d.offsetX, 0, Math.max(0, wrapRect.w - wPx))
    const newY = clamp(e.clientY - wrapRect.top - d.offsetY, 0, Math.max(0, wrapRect.h - hPx))

    setMasks((prev) => prev.map((mm) => (mm.id === d.id ? { ...mm, x: newX, y: newY } : mm)))
  }

  const onWindowPointerUp = () => {
    dragRef.current = null
    window.removeEventListener('pointermove', onWindowPointerMove)
  }

  return (
    <div ref={wrapRef} className="absolute top-0 w-full h-[100vh] overflow-hidden z-0">
      {/* Capa por máscara: mismo vídeo, distinta máscara (ancho/alto en px) */}
      {masks.map((m) => {
        const wPx = (wrapRect.w * m.wPct) / 100
        const hPx = (wrapRect.h * m.hPct) / 100
        return (
          <div
            key={`layer-${m.id}`}
            className="absolute inset-0 select-none pointer-events-none"
            style={{
              maskImage: `url(${m.image})`,
              WebkitMaskImage: `url(${m.image})`,
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
              maskSize: `${wPx}px ${hPx}px`,
              WebkitMaskSize: `${wPx}px ${hPx}px`,
              maskPosition: `${m.x}px ${m.y}px`,
              WebkitMaskPosition: `${m.x}px ${m.y}px`,
              maskOrigin: 'border-box',
              WebkitMaskOrigin: 'border-box',
            }}
          >
            <video
              src="/carita.mp4"
              className="w-full h-full object-cover pointer-events-none"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        )
      })}

      {/* Handle con coordenadas */}
      {masks.map((m) => {
        const wPx = (wrapRect.w * m.wPct) / 100
        const hPx = (wrapRect.h * m.hPct) / 100
        const xCoord = Math.round(m.x).toString().padStart(5, '0')
        const yCoord = Math.round(m.y).toString().padStart(5, '0')
        return (
          <div
            key={`handle-${m.id}`}
            className="absolute z-20"
            style={{
              left: m.x,
              top: m.y,
            }}
          >
            {/* Coordenadas arriba */}
            <div className="absolute -top-[21px] -left-[.5px] text-white text-[11px] tracking-[.15em] font-mono uppercase select-none pointer-events-none bg-gray-500/60 px-2 py-0.5 rounded-sm drop-shadow-[0_0_3px_rgba(255,255,255,0.8)]">
              X:{xCoord}PX    Y:{yCoord}PX
            </div>
            {/* Borde draggable */}
            <div
              onPointerDown={onHandlePointerDown(m.id)}
              className="touch-none cursor-grab active:cursor-grabbing box-border border border-white/40"
              style={{
                width: wPx,
                height: hPx,
              }}
            />
          </div>
        )
      })}
    </div>
  )
}

/* ----------------- Utilidades ----------------- */

function placeInitialMasks(templates, rect) {
  const zones = [
    { fx: 0.12, fy: 0.14 },  // pequeña arriba izquierda
    { fx: 0.37, fy: 0.19 },  // grande centro-arriba
    { fx: 0.75, fy: 0.15 },  // pequeña arriba derecha
    { fx: 0.13, fy: 0.55 },  // mediana medio-izquierda
    { fx: 0.20, fy: 0.60 },  // mediana-grande centro
    { fx: 0.25, fy: 0.40 },  // pequeña abajo derecha
  ]
  return templates.map((t, i) => {
    const wPx = (rect.w * t.wPct) / 100
    const hPx = (rect.h * t.hPct) / 100
    const x = clamp(rect.w * zones[i].fx, 0, Math.max(0, rect.w - wPx))
    const y = clamp(rect.h * zones[i].fy, 0, Math.max(0, rect.h - hPx))
    return { id: t.id, wPct: t.wPct, hPct: t.hPct, image: t.image, x, y }
  })
}

function clamp(v, min, max) {
  return Math.min(Math.max(v, min), max)
}
