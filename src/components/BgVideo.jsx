
/**
 * 
 *  ⚠️ ATENCIÓN: NO TOCAR, FUNCIONA Y NO SÉ POR QUÉ ⚠️
    ---------------------------------------------------------------------------
    Este fragmento de código fue escrito entre las 2 y 3 de la mañana, bajo
    los efectos combinados de cafeína, desesperación y un bug cuántico.
    
    Si lo entiendes, deja de funcionar.
    Si funciona, deja de entenderse.
    
    Cualquier intento de refactorizar esto ha provocado loops infinitos,
    warnings que no existen y un parpadeo espectral en el monitor.
 *                        uuuuuuuuuuuuuuuuuuuuu.
                   .u$$$$$$$$$$$$$$$$$$$$$$$$$$W.
                 u$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$Wu.
               $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$i
              $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
         `    $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
           .i$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$i
           $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$W
          .$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$W
         .$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$i
         #$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$.
         W$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
$u       #$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$~
$#      `"$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
$i        $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
$$        #$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
$$         $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
#$.        $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$#
 $$      $iW$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$!
 $$i      $$$$$$$#"" `"""#$$$$$$$$$$$$$$$$$#""""""#$$$$$$$$$$$$$$$W
 #$$W    `$$$#"            "       !$$$$$`           `"#$$$$$$$$$$#
  $$$     ``                 ! !iuW$$$$$                 #$$$$$$$#
  #$$    $u                  $   $$$$$$$                  $$$$$$$~
   "#    #$$i.               #   $$$$$$$.                 `$$$$$$
          $$$$$i.                """#$$$$i.               .$$$$#
          $$$$$$$$!         .   `    $$$$$$$$$i           $$$$$
          `$$$$$  $iWW   .uW`        #$$$$$$$$$W.       .$$$$$$#
            "#$$$$$$$$$$$$#`          $$$$$$$$$$$iWiuuuW$$$$$$$$W
               !#""    ""             `$$$$$$$##$$$$$$$$$$$$$$$$
          i$$$$    .                   !$$$$$$ .$$$$$$$$$$$$$$$#
         $$$$$$$$$$`                    $$$$$$$$$Wi$$$$$$#"#$$`
         #$$$$$$$$$W.                   $$$$$$$$$$$#   ``
          `$$$$##$$$$!       i$u.  $. .i$$$$$$$$$#""
             "     `#W       $$$$$$$$$$$$$$$$$$$`      u$#
                            W$$$$$$$$$$$$$$$$$$      $$$$W
                            $$`!$$$##$$$$``$$$$      $$$$!
                           i$" $$$$  $$#"`  """     W$$$$
                                                   W$$$$!
                      uW$$  uu  uu.  $$$  $$$Wu#   $$$$$$
                     ~$$$$iu$$iu$$$uW$$! $$$$$$i .W$$$$$$
             ..  !   "#$$$$$$$$$$##$$$$$$$$$$$$$$$$$$$$#"
             $$W  $     "#$$$$$$$iW$$$$$$$$$$$$$$$$$$$$$W
             $#`   `       ""#$$$$$$$$$$$$$$$$$$$$$$$$$$$
                              !$$$$$$$$$$$$$$$$$$$$$#`
                              $$$$$$$$$$$$$$$$$$$$$$!
                            $$$$$$$$$$$$$$$$$$$$$$$`
                             $$$$$$$$$$$$$$$$$$$$"
 * */

'use client'
import React, { useLayoutEffect, useRef, useState } from 'react'

const MASK_IMAGE = '/rect.png'

// 4 máscaras con tamaños un poco más grandes
const MASK_TEMPLATES = [
  { id: 1, wPct: 15, hPct: 24, image: '/rect.png' },
  { id: 2, wPct: 30, hPct: 15, image: '/rect.png' },
  { id: 3, wPct: 22, hPct: 35, image: '/rect.png' },
  { id: 4, wPct: 38, hPct: 26, image: '/rect.png' },
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

      {/* Handle: borde pegado (sin margen); coincide con la máscara */}
      {masks.map((m) => {
        const wPx = (wrapRect.w * m.wPct) / 100
        const hPx = (wrapRect.h * m.hPct) / 100
        return (
          <div
            key={`handle-${m.id}`}
            onPointerDown={onHandlePointerDown(m.id)}
            className="absolute touch-none cursor-grab active:cursor-grabbing box-border border border-white/70 z-20"
            style={{
              left: m.x,
              top: m.y,
              width: wPx,
              height: hPx,
            }}
          />
        )
      })}
    </div>
  )
}

/* ----------------- Utilidades ----------------- */

function placeInitialMasks(templates, rect) {
  const zones = [
    { fx: 0.08, fy: 0.10 }, // top-left
    { fx: 0.70, fy: 0.12 }, // top-right
    { fx: 0.12, fy: 0.55 }, // center-left
    { fx: 0.62, fy: 0.60 }, // bottom-right
  ]
  return templates.slice(0, 4).map((t, i) => {
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
