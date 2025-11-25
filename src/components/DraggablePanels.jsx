"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

const items = [
    { id: 1, title: "PROJECT ALPHA", subtitle: "VFX / COMPOSITING" },
    { id: 2, title: "NEON DREAMS", subtitle: "UEFN / LEVEL DESIGN" },
    { id: 3, title: "CYBER CORE", subtitle: "DEV / SYSTEM" },
    { id: 4, title: "VOID WALKER", subtitle: "MUSIC / SOUNDSCAPE" },
    { id: 5, title: "ECHO CHAMBER", subtitle: "R&D / EXPERIMENTAL" },
];

export function DraggablePanels({ isEs }) {
    const [selectedId, setSelectedId] = useState(null);
    const containerRef = useRef(null);

    return (
        <section className="relative py-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-12 border-b border-white/10 pb-4">
                    <h3 className="text-[11px] font-mono tracking-[0.25em] text-white/40 uppercase">
                        {isEs ? "EXPLORAR TRABAJOS" : "EXPLORE WORKS"}
                    </h3>
                </div>

                <div ref={containerRef} className="relative min-h-[600px] w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {items.map((item) => (
                            <Panel
                                key={item.id}
                                item={item}
                                containerRef={containerRef}
                                onClick={() => setSelectedId(item.id)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {selectedId && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                        onClick={() => setSelectedId(null)}
                    >
                        <motion.div
                            layoutId={`panel-${selectedId}`}
                            className="w-full max-w-4xl aspect-video bg-[#0b0813] border border-white/20 overflow-hidden relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="absolute top-4 right-4 z-10 text-white/50 hover:text-white"
                                onClick={() => setSelectedId(null)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>

                            <div className="absolute inset-0 flex items-center justify-center">
                                <p className="text-white/20 font-mono text-sm tracking-widest">
                                    CONTENT PLACEHOLDER
                                </p>
                            </div>

                            <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/90 to-transparent">
                                <h2 className="text-3xl font-bold text-white mb-2">
                                    {items.find((i) => i.id === selectedId)?.title}
                                </h2>
                                <p className="text-emerald-400 font-mono text-sm tracking-wider">
                                    {items.find((i) => i.id === selectedId)?.subtitle}
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

function Panel({ item, containerRef, onClick }) {
    return (
        <motion.div
            layoutId={`panel-${item.id}`}
            drag
            dragConstraints={containerRef}
            dragElastic={0.2}
            whileHover={{ scale: 1.02, zIndex: 10 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className="relative aspect-[4/3] bg-white/5 border border-white/10 backdrop-blur-sm cursor-grab active:cursor-grabbing group overflow-hidden"
        >
            <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity">
                <div className="w-16 h-16 border border-white/20 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white/50 rounded-full" />
                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
                <h4 className="text-white font-bold tracking-tight">{item.title}</h4>
                <p className="text-[10px] text-emerald-400 font-mono tracking-widest uppercase mt-1">
                    {item.subtitle}
                </p>
            </div>

            {/* Decorative corners */}
            <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/30" />
            <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/30" />
            <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-white/30" />
            <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/30" />
        </motion.div>
    );
}
