"use client"
import React, { useEffect, useLayoutEffect, useRef, useState } from "react"

const MASK_IMAGE = "/rect.png"

// 6 máscaras según la referencia
const MASK_TEMPLATES = [
  { id: 1, wPct: 32, hPct: 42, image: MASK_IMAGE }, // pequeña arriba izquierda
  { id: 2, wPct: 55, hPct: 75, image: MASK_IMAGE }, // grande centro-arriba
  { id: 3, wPct: 15, hPct: 24, image: MASK_IMAGE }, // pequeña arriba derecha
  { id: 4, wPct: 15, hPct: 28, image: MASK_IMAGE }, // mediana medio-izquierda
  { id: 5, wPct: 28, hPct: 38, image: MASK_IMAGE }, // mediana-grande centro
  { id: 6, wPct: 14, hPct: 20, image: MASK_IMAGE }, // pequeña abajo derecha
]

// 👇 aquí decides qué vídeo poner por sección
const VIDEO_BY_TARGET = {
  home: "/carita.mp4",
  uefn: "/uefn.mp4",
  dev: "/dev.mp4",
  music: "/music.mp4",
  vfx: "/vfx.mp4",
  // fallback
  default: "/carita.mp4",
}

export default function BgVideo({ currentTarget = "home" }) {
  const wrapRef = useRef(null)
  const [wrapRect, setWrapRect] = useState({ w: 0, h: 0, left: 0, top: 0 })
  const [masks, setMasks] = useState([])
  const dragRef = useRef(null)
  const videoRefs = useRef({})
  const masterVideoRef = useRef(null)

  const [isMobile, setIsMobile] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (typeof window === "undefined") return
    const check = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  // Detectamos si el banner está visible en el viewport para pausar los vídeos cuando no se ve
  useEffect(() => {
    if (typeof window === "undefined") return
    if (!("IntersectionObserver" in window)) return

    const el = wrapRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const sortedMasks = [...masks].sort(
    (a, b) => (a.z || 0) - (b.z || 0),
  )

  // normalizamos el target
  const normalized = (currentTarget || "home").toLowerCase()
  const videoSrc = VIDEO_BY_TARGET[normalized] || VIDEO_BY_TARGET.default

  // cada vez que cambia el vídeo, limpiamos refs de vídeos para no arrastrar instancias viejas
  useLayoutEffect(() => {
    videoRefs.current = {}
  }, [videoSrc])

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
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Sincronización de videos mejorada
  useLayoutEffect(() => {
    const master = masterVideoRef.current
    if (!master || masks.length === 0) return

    // Si el banner no está visible, pausamos todos los vídeos para ahorrar GPU
    if (!isVisible) {
      try {
        master.pause()
      } catch {}
      Object.values(videoRefs.current).forEach((video) => {
        if (video) {
          try {
            video.pause()
          } catch {}
        }
      })
      return
    }

    let syncInterval
    let hasStarted = false

    const startSync = () => {
      if (syncInterval) return

      // Sincronización cada 100ms
      syncInterval = setInterval(() => {
        if (!master.paused) {
          const masterTime = master.currentTime
          Object.values(videoRefs.current).forEach((video) => {
            if (video && !video.paused && video.readyState >= 2) {
              const diff = Math.abs(video.currentTime - masterTime)
              if (diff > 0.1) {
                video.currentTime = masterTime
              }
            }
          })
        }
      }, 100)
    }

    const initVideos = () => {
      if (hasStarted) return

      const allVideos = Object.values(videoRefs.current)
      if (allVideos.length < masks.length) return

      const allReady = allVideos.every((v) => v && v.readyState >= 2)

      if (allReady && !hasStarted) {
        hasStarted = true

        // Iniciar todos desde cero
        allVideos.forEach((video) => {
          video.currentTime = 0
          video.play().catch(() => {})
        })

        startSync()
      }
    }

    // Intentar iniciar cuando todos estén listos
    const checkInterval = setInterval(() => {
      if (!hasStarted) initVideos()
      else clearInterval(checkInterval)
    }, 100)

    setTimeout(() => clearInterval(checkInterval), 5000)

    return () => {
      clearInterval(checkInterval)
      if (syncInterval) clearInterval(syncInterval)
    }
  }, [masks.length, videoSrc, isVisible])

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
    setMasks((prev) => {
      const maxZ = prev.reduce(
        (max, mm) => Math.max(max, mm.z || 0),
        0,
      )
      return prev.map((mm) =>
        mm.id === maskId ? { ...mm, z: maxZ + 1 } : mm,
      )
    })
    e.currentTarget.setPointerCapture?.(e.pointerId)
    window.addEventListener("pointermove", onWindowPointerMove)
    window.addEventListener("pointerup", onWindowPointerUp, { once: true })
  }

  const onWindowPointerMove = (e) => {
    const d = dragRef.current
    if (!d) return
    const m = masks.find((mm) => mm.id === d.id)
    if (!m) return

    const wPx = (wrapRect.w * m.wPct) / 100
    const hPx = (wrapRect.h * m.hPct) / 100

    const newX = clamp(
      e.clientX - wrapRect.left - d.offsetX,
      0,
      Math.max(0, wrapRect.w - wPx),
    )
    const newY = clamp(
      e.clientY - wrapRect.top - d.offsetY,
      0,
      Math.max(0, wrapRect.h - hPx),
    )

    setMasks((prev) =>
      prev.map((mm) => (mm.id === d.id ? { ...mm, x: newX, y: newY } : mm)),
    )
  }

  const onWindowPointerUp = () => {
    dragRef.current = null
    window.removeEventListener("pointermove", onWindowPointerMove)
  }

  if (isMobile) {
    return (
      <div className="relative z-30 w-full h-[100vh] overflow-hidden">
        <video
          key={`mobile-${videoSrc}`}
          src={videoSrc}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      </div>
    )
  }

  return (
    <div
      ref={wrapRef}
      className="absolute z-30 top-0 w-full h-[100vh] overflow-hidden"
    >
      {/* Video master oculto para sincronización */}
      <video
        key={`master-${videoSrc}`}
        ref={masterVideoRef}
        src={videoSrc}
        className="hidden"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      {/* Capa por máscara: mismo vídeo, distinta máscara (ancho/alto en px) */}
      {sortedMasks.map((m) => {
        const wPx = (wrapRect.w * m.wPct) / 100
        const hPx = (wrapRect.h * m.hPct) / 100
        return (
          <div
            key={`layer-${m.id}-${videoSrc}`}
            className="absolute inset-0 select-none pointer-events-none"
            style={{
              maskImage: `url(${m.image})`,
              WebkitMaskImage: `url(${m.image})`,
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskSize: `${wPx}px ${hPx}px`,
              WebkitMaskSize: `${wPx}px ${hPx}px`,
              maskPosition: `${m.x}px ${m.y}px`,
              WebkitMaskPosition: `${m.x}px ${m.y}px`,
              maskOrigin: "border-box",
              WebkitMaskOrigin: "border-box",
              // capa base de la ventana en función de su "z"
              zIndex: (m.z || 0) * 2,
            }}
          >
            <video
              ref={(el) => {
                if (el) videoRefs.current[m.id] = el
              }}
              src={videoSrc}
              className="w-full h-full object-cover pointer-events-none"
              muted
              loop
              playsInline
              preload="auto"
            />
          </div>
        )
      })}

      {/* Handle con coordenadas */}
      {sortedMasks.map((m) => {
        const wPx = (wrapRect.w * m.wPct) / 100
        const hPx = (wrapRect.h * m.hPct) / 100
        const xCoord = Math.round(m.x).toString().padStart(5, "0")
        const yCoord = Math.round(m.y).toString().padStart(5, "0")
        return (
          <div
            key={`handle-${m.id}`}
            className="absolute z-20"
            style={{
              left: m.x,
              top: m.y,
              // borde por encima de su contenido, pero respetando el orden de z
              zIndex: (m.z || 0) * 2 + 1,
            }}
          >
            {/* Coordenadas arriba */}
            <div className="absolute -top-[21px] -left-[.5px] text-white text-[11px] tracking-[.15em] font-mono uppercase select-none pointer-events-none bg-gray-500/60 px-2 py-0.5 rounded-sm drop-shadow-[0_0_3px_rgba(255,255,255,0.8)]">
              X:{xCoord}PX Y:{yCoord}PX
            </div>
            {/* Borde draggable */}
            <div
              onPointerDown={onHandlePointerDown(m.id)}
              className="touch-none cursor-grab active:cursor-grabbing"
              style={{
                width: wPx,
                height: hPx,
                outline: "1px solid rgba(255, 255, 255, 0.4)",
                outlineOffset: "-1px",
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
    { fx: 0.12, fy: 0.14 }, // pequeña arriba izquierda
    { fx: 0.37, fy: 0.19 }, // grande centro-arriba
    { fx: 0.75, fy: 0.15 }, // pequeña arriba derecha
    { fx: 0.13, fy: 0.55 }, // mediana medio-izquierda
    { fx: 0.2, fy: 0.6 }, // mediana-grande centro
    { fx: 0.25, fy: 0.4 }, // pequeña abajo derecha
  ]
  return templates.map((t, i) => {
    const wPx = (rect.w * t.wPct) / 100
    const hPx = (rect.h * t.hPct) / 100
    const x = clamp(rect.w * zones[i].fx, 0, Math.max(0, rect.w - wPx))
    const y = clamp(rect.h * zones[i].fy, 0, Math.max(0, rect.h - hPx))
    // z inicial creciente para que el banner ya muestre las ventanas apiladas
    return { id: t.id, wPct: t.wPct, hPct: t.hPct, image: t.image, x, y, z: i + 1 }
  })
}

function clamp(v, min, max) {
  return Math.min(Math.max(v, min), max)
}
