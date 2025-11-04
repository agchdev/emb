"use client"
import Link from "next/link"
import React, { useState } from "react"
import { usePathname } from "next/navigation"

const Header = () => {
  const [hover, setHover] = useState(false)
  const rutas = ["HOME", "FORTNITE", "DEV", "MUSIC", "VFX"]

  const pathname = usePathname()
  // Primer segmento de la URL; '/' -> 'HOME'
  const currentSegment = (pathname?.split("/").filter(Boolean)[0] || "HOME").toUpperCase()
  const currentRoute = rutas.includes(currentSegment) ? currentSegment : "HOME"

  function flickAnimation(e) {
    setHover((h) => !h)
    const el = e.target
    if (!hover) el.classList.add("flickerAnimation")
    else el.classList.remove("flickerAnimation")
  }

  return (
    <div className="absolute top-5 left-5 text-white bg-white/30 py-2 px-3 w-56">
      <button className="text-start">
        <span
          className="inline-block [word-spacing:20px]"
          onMouseEnter={flickAnimation}
          onMouseLeave={flickAnimation}
        >
          C: \EMB \{currentRoute} +
        </span>
      </button>

      <div className="mt-3 text-sm text-start">
        {rutas.map((ruta) => {
          const isActive = currentRoute === ruta
          return (
            <Link
              key={ruta}
              href={`/${ruta}`}
              className={`block [word-spacing:20px] p-1 w-full ${
                isActive ? "bg-white text-black" : "bg-transparent text-white hover:bg-white/20"
              }`}
              onMouseEnter={flickAnimation}
              onMouseLeave={flickAnimation}
              aria-current={isActive ? "page" : undefined}
            >
              \{ruta}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Header
