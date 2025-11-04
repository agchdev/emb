"use client"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import TextType from "./TextType"

const Header = () => {
    const rutas = ["HOME", "UEFN", "DEV", "MUSIC", "VFX"]

    const pathname = usePathname()
    const currentSegment = (pathname?.split("/").filter(Boolean)[0] || "HOME").toUpperCase()
    const currentRoute = rutas.includes(currentSegment) ? currentSegment : "HOME"

    const [hover, setHover] = useState(false)
    const [open, setOpen] = useState(false)
    const [visibleCount, setVisibleCount] = useState(0) // cuántas palabras ya se mostraron

    // Revela una palabra del map cada 0.5s solo cuando el menú está abierto
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

    function flickAnimationBG(e) {
        setHover((h) => !h)
        const el = e.target
        el.classList.add("flickerAnimationBG")
        setTimeout(() => {
            el.classList.remove("flickerAnimationBG")
        }, 2000);
    }

    return (
        <div className="w-full h-[100vh] flex items-center justify-center">
            <header className="absolute top-5 left-5 lg:top-0 lg:left-0 lg:relative text-white bg-white/30 py-2 px-3 w-56">
                <button
                    className="text-start w-full"
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

                {open && (
                    <div id="nav-rutas" className="mt-3 text-sm text-start">
                        {rutas.slice(0, visibleCount).map((ruta) => {
                            const isActive = currentRoute === ruta
                            return (
                                <Link
                                    key={ruta}
                                    href={`/${ruta}`}
                                    className={`block [word-spacing:20px] p-0.5 w-full ${isActive ? "bg-white text-black" : "bg-transparent text-white hover:text-black hover:bg-white"
                                        }`}
                                    onMouseEnter={flickAnimationBG}
                                    aria-current={isActive ? "page" : undefined}
                                    onClick={() => setOpen(false)} // opcional: cerrar menú al navegar
                                >
                                    <TextType
                                        text={`\\${ruta}`}
                                        typingSpeed={50}        // escribe rápido
                                        pauseDuration={100000}  // evita re-bucle para que quede estático
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
