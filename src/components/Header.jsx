"use client"

import Link from "next/link"
import React, { useEffect, useRef, useState } from "react"
import TextType from "./TextType"

const Header = ({ onNavClick, currentTarget }) => {
  const baseRutas = ["HOME", "UEFN", "DEV", "MUSIC", "VFX"]
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    const check = () => setIsMobile(window.innerWidth < 1024)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  const rutas = isMobile ? [...baseRutas, "ABOUT"] : baseRutas

  // Usamos el target que viene del layout (controlado desde arriba)
  const normalizedCurrent = (currentTarget || "HOME").toUpperCase()
  const currentRoute = rutas.includes(normalizedCurrent)
    ? normalizedCurrent
    : "HOME"

  const [hover, setHover] = useState(false)
  const [open, setOpen] = useState(false)
  const [visibleCount, setVisibleCount] = useState(0)
  const [offset, setOffset] = useState({ dx: 0, dy: 0 })

  // 🔒 control exclusivo de la animación BG
  const activeBGRef = useRef(null)
  const bgTimerRef = useRef(null)
  const dragRef = useRef(null)

  useEffect(() => {
    if (!open) {
      setVisibleCount(0)
      return
    }
    setVisibleCount(0)
    const id = setInterval(() => {
      setVisibleCount((n) => {
        const next = Math.min(n + 1, rutas.length)
        if (next === rutas.length) clearInterval(id)
        return next
      })
    }, 100)
    return () => clearInterval(id)
  }, [open, rutas.length])

  function flickAnimation(e) {
    setHover((h) => !h)
    const el = e.target
    if (!hover) el.classList.add("flickerAnimation")
    else el.classList.remove("flickerAnimation")
  }

  // ✅ SOLO UN LINK A LA VEZ con BG animation
  function handleBGEnter(e) {
    const el = e.currentTarget // el <a>, no el hijo
    if (activeBGRef.current && activeBGRef.current !== el) {
      activeBGRef.current.classList.remove("flickerAnimationBG")
    }
    el.classList.add("flickerAnimationBG")
    activeBGRef.current = el

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
    if (isMobile) return
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
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <header
        className="pointer-events-auto absolute top-5 left-5 lg:top-0 lg:left-0 lg:relative text-white bg-white/20 border border-white/25 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset,0_8px_20px_rgba(0,0,0,0.35)] w-[240px] sm:w-[280px] lg:w-[420px] z-[999] flex items-center"
        style={headerStyle}
      >
        {/* Drag handle con 6 puntos: solo desktop */}
        {!isMobile && (
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
        )}

        <div className="flex-1 py-2 px-3">
          <div className="flex items-center justify-between gap-2">
            <button
              className="text-start w-full text-white/90 text-xs tracking-wider"
              onClick={() => setOpen((v) => !v)}
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

            <Link
              href="/ABOUT"
              className="hidden lg:inline-flex text-[10px] tracking-[0.3em] uppercase text-white/70 hover:text-white transition-colors"
              onMouseEnter={handleBGEnter}
              onMouseLeave={handleBGLeave}
            >
              \\SOBRE&nbsp;NOSOTROS
            </Link>
          </div>

          {open && (
            <div
              id="nav-rutas"
              className="mt-3 text-xs text-start lg:absolute lg:left-0 lg:top-full lg:mt-0 lg:w-full lg:bg-white/20 lg:backdrop-blur-xl lg:border lg:border-white/25 lg:shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset,0_8px_20px_rgba(0,0,0,0.35)] z-[999]"
            >
              {rutas.slice(0, visibleCount).map((ruta) => {
                const isActive = currentRoute === ruta
                const sectionKey = ruta.toLowerCase() // "home", "uefn", etc.
                const href = ruta === "HOME" ? "/" : `/${ruta.toUpperCase()}`

                return (
                  <Link
                    key={ruta}
                    href={href}
                    className={`block [word-spacing:20px] p-1.5 w-full transition-colors ${
                      isActive
                        ? "bg-white text-black"
                        : "bg-transparent text-white/90 hover:text-black hover:bg-white"
                    }`}
                    onMouseEnter={handleBGEnter}
                    onMouseLeave={handleBGLeave}
                    aria-current={isActive ? "page" : undefined}
                    onClick={(e) => {
                      // si quieres evitar navegación real y usar solo secciones:
                      // e.preventDefault()
                      if (onNavClick) onNavClick(sectionKey)
                      setOpen(false)
                    }}
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
