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

  // 🔒 control exclusivo de la animación BG
  const activeBGRef = useRef(null)
  const bgTimerRef = useRef(null)

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

  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      {/* mismas clases que ya tenías */}
      <header className="absolute top-5 left-5 lg:top-0 lg:left-0 lg:relative text-white bg-white/30 py-2 px-3 w-56">
        <button
          className="text-start w-full"
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
            className="mt-3 text-sm text-start lg:absolute lg:left-0 lg:top-full lg:mt-0 lg:w-full lg:bg-white/30 "
          >
            {rutas.slice(0, visibleCount).map((ruta) => {
              const isActive = currentRoute === ruta
              return (
                <Link
                  key={ruta}
                  href={`/${ruta}`}
                  className={`block [word-spacing:20px] p-0.5 w-full ${
                    isActive
                      ? "bg-white text-black"
                      : "bg-transparent text-white hover:text-black hover:bg-white"
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
      </header>
    </div>
  )
}

export default Header
