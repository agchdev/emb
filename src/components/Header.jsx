

"use client"
import Link from "next/link"
// 👇 añade useRef
import React, { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import TextType from "./TextType"

const Header = () => {
  const rutas = ["HOME", "UEFN", "DEV", "MUSIC", "VFX"]

  const pathname = usePathname()
  const currentSegment = (pathname?.split("/").filter(Boolean)[0] || "HOME").toUpperCase()
  const currentRoute = rutas.includes(currentSegment) ? currentSegment : "HOME"

  const [hover, setHover] = useState(false)
  const [open, setOpen] = useState(false)
  const [visibleCount, setVisibleCount] = useState(0)
  const [offset, setOffset] = useState({ dx: 0, dy: 0 })

  // 🔒 control exclusivo de la animación BG
  const activeBGRef = useRef(null)
  const bgTimerRef = useRef(null)
  const dragRef = useRef(null)

  useEffect(() => {
    if (!open) { setVisibleCount(0); return }
    setVisibleCount(0)
    const id = setInterval(() => {
      setVisibleCount(n => {
        const next = Math.min(n + 1, rutas.length)
        if (next === rutas.length) clearInterval(id)
        return next
      })
    }, 100)
    return () => clearInterval(id)
  }, [open, rutas.length])

  function flickAnimation(e) {
    setHover(h => !h)
    const el = e.target
    if (!hover) el.classList.add("flickerAnimation")
    else el.classList.remove("flickerAnimation")
  }

  // ✅ SOLO UN LINK A LA VEZ
  function handleBGEnter(e) {
    const el = e.currentTarget // el <a>, no el hijo
    // quita del anterior si existe y es distinto
    if (activeBGRef.current && activeBGRef.current !== el) {
      activeBGRef.current.classList.remove("flickerAnimationBG")
    }
    // aplica al actual
    el.classList.add("flickerAnimationBG")
    activeBGRef.current = el

    // reinicia el temporizador (2s)
    if (bgTimerRef.current) clearTimeout(bgTimerRef.current)
    bgTimerRef.current = setTimeout(() => {
      if (activeBGRef.current) {
        activeBGRef.current.classList.remove("flickerAnimationBG")
        activeBGRef.current = null
      }
    }, 2000)
  }

  function handleBGLeave(e) {
    const el = e.currentTarget
    if (bgTimerRef.current) clearTimeout(bgTimerRef.current)
    el.classList.remove("flickerAnimationBG")
    if (activeBGRef.current === el) activeBGRef.current = null
  }

  // Drag handlers
  function onDragHandlePointerDown(e) {
    e.stopPropagation()
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      baseDx: offset.dx,
      baseDy: offset.dy,
      pointerId: e.pointerId,
    }
    e.currentTarget.setPointerCapture?.(e.pointerId)
    window.addEventListener("pointermove", onDragPointerMove)
    window.addEventListener("pointerup", onDragPointerUp, { once: true })
  }

  function onDragPointerMove(e) {
    const d = dragRef.current
    if (!d) return
    setOffset({
      dx: d.baseDx + (e.clientX - d.startX),
      dy: d.baseDy + (e.clientY - d.startY),
    })
  }

  function onDragPointerUp() {
    dragRef.current = null
    window.removeEventListener("pointermove", onDragPointerMove)
  }

  const headerStyle = {
    transform: `translate(${offset.dx}px, ${offset.dy}px)`,
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <header
        className="absolute top-5 left-5 lg:top-0 lg:left-0 lg:relative text-white bg-white/20 border border-white/25 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset,0_8px_20px_rgba(0,0,0,0.35)] w-56 z-[999] flex items-stretch"
        style={headerStyle}
      >
        {/* Drag handle con 6 puntos */}
        <div
          className="flex flex-col justify-center items-center gap-1 px-2 py-2 cursor-grab active:cursor-grabbing border-r border-white/20 select-none"
          onPointerDown={onDragHandlePointerDown}
        >
          <div className="grid grid-cols-2 gap-1">
            <div className="w-1 h-1 rounded-full bg-white/40"></div>
            <div className="w-1 h-1 rounded-full bg-white/40"></div>
            <div className="w-1 h-1 rounded-full bg-white/40"></div>
            <div className="w-1 h-1 rounded-full bg-white/40"></div>
            <div className="w-1 h-1 rounded-full bg-white/40"></div>
            <div className="w-1 h-1 rounded-full bg-white/40"></div>
          </div>
        </div>
        <div className="flex-1 py-2 px-3">
          <button
            className="text-start w-full text-white/90 text-xs tracking-wider"
            onClick={() => setOpen(v => !v)}
            aria-expanded={open}
            aria-controls="nav-rutas"
          >
            <span
              className="inline-block [word-spacing:20px]"
              onMouseEnter={flickAnimation}
              onMouseLeave={flickAnimation}
            >
              C: \EMB \{currentRoute} +
            </span>
          </button>

          {open && (
            <div
              id="nav-rutas"
              className="mt-3 text-xs text-start lg:absolute lg:left-0 lg:top-full lg:mt-0 lg:w-full lg:bg-white/20 lg:backdrop-blur-xl lg:border lg:border-white/25 lg:shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset,0_8px_20px_rgba(0,0,0,0.35)] z-[999]"
            >
              {rutas.slice(0, visibleCount).map((ruta) => {
                const isActive = currentRoute === ruta
                return (
                  <Link
                    key={ruta}
                    href={`/${ruta}`}
                    className={`block [word-spacing:20px] p-1.5 w-full transition-colors ${
                      isActive
                        ? "bg-white text-black"
                        : "bg-transparent text-white/90 hover:text-black hover:bg-white"
                    }`}
                    onMouseEnter={handleBGEnter}
                    onMouseLeave={handleBGLeave}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setOpen(false)}
                  >
                    <TextType
                      text={`\\${ruta}`}
                      typingSpeed={50}
                      pauseDuration={100000}
                      showCursor={false}
                      cursorCharacter=""
                    />
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </header>
    </div>
  )
}

export default Header
