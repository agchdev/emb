"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const BOOT_LOGS = [
    "INITIALIZING KERNEL_V.4.20...",
    "LOADING MODULES: [AGCH_CORE, VYZ_RENDER, POKE_PHYSICS]",
    "CHECKING MEMORY INTEGRITY... OK",
    "ESTABLISHING SECURE CONNECTION...",
    "LOADING ASSETS...",
    "CONFIGURING VIEWPORT...",
    "OPTIMIZING GRAPHICS DRIVER...",
    "ALLOCATING RESOURCES...",
    "MOUNTING FILE SYSTEM...",
    "STARTING DAEMONS...",
    "VERIFYING USER PERMISSIONS...",
    "PERFORMING HANDSHAKE...",
    "DECRYPTING SECURE TOKENS...",
    "SYNCING STATE...",
    "PRE-CACHING TEXTURES...",
    "COMPILING SHADERS [VERTEX]...",
    "COMPILING SHADERS [FRAGMENT]...",
    "SYSTEM CHECK COMPLETE.",
    "LAUNCHING INTERFACE..."
];

export default function Preloader({ onComplete }) {
    const [logs, setLogs] = useState([]);
    const [progress, setProgress] = useState(0);
    const scrollRef = useRef(null);

    // Ref to track timeouts to survive strict mode remounts
    const timeoutRef = useRef(null);
    const animFrameRef = useRef(null);

    useEffect(() => {
        // Disable scroll on body
        document.body.style.overflow = "hidden";

        let logIndex = 0;
        const totalDuration = 2000;
        const averageLogTime = totalDuration / BOOT_LOGS.length;

        // Clear any existing timeouts first (safety)
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        // Timer for logs
        const addLog = () => {
            if (logIndex < BOOT_LOGS.length) {
                // Generate random timestamp for this log here, on the client
                const timestamp = (Math.random() * 1000).toFixed(2);

                // Capture current values
                const currentText = BOOT_LOGS[logIndex];
                const currentId = logIndex;

                setLogs((prev) => [...prev, { text: currentText, id: `log-${currentId}-${Date.now()}`, time: timestamp }]);
                logIndex++;

                // Randomize the interval slightly for realism
                const nextTime = averageLogTime * (0.5 + Math.random());
                timeoutRef.current = setTimeout(addLog, nextTime);
            }
        };

        // Start log sequence
        timeoutRef.current = setTimeout(addLog, 100);

        // Timer for progress bar/counter
        const startTime = Date.now();

        const progressFrame = () => {
            const elapsed = Date.now() - startTime;
            const p = Math.min((elapsed / totalDuration) * 100, 100);
            setProgress(Math.floor(p));

            if (p < 100) {
                animFrameRef.current = requestAnimationFrame(progressFrame);
            } else {
                // Finished
                // Use timeoutRef for the final completion delay too
                timeoutRef.current = setTimeout(() => {
                    onComplete();
                }, 800);
            }
        };
        animFrameRef.current = requestAnimationFrame(progressFrame);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
            document.body.style.overflow = "";
        };
    }, [onComplete]);

    // Auto scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <motion.div
            className="fixed inset-0 z-[9999] bg-[#0b0813] text-white flex flex-col justify-end p-4 md:p-12 font-mono text-xs md:text-sm leading-tight pointer-events-none"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }} // Slow fade out
        >
            <div className="absolute top-8 left-8 md:top-12 md:left-12 opacity-30 text-[10px] tracking-widest">
                EMB_SYSTEM_BOOT_V.2.0 // SECURE_SHELL
            </div>

            <motion.div
                className="w-full max-w-4xl h-[40vh] md:h-[50vh] overflow-hidden relative"
            >
                <div ref={scrollRef} className="h-full flex flex-col justify-end overflow-hidden pb-2">
                    {logs.map((log) => (
                        <div key={log.id} className="opacity-80 whitespace-nowrap mb-1">
                            <span className="text-[#444] text-[10px] mr-3 inline-block w-12 text-right">
                                {`[${log.time}]`}
                            </span>
                            <span className="uppercase tracking-wider font-medium text-gray-300">{log.text}</span>
                        </div>
                    ))}

                    <div className="mt-4 flex items-center gap-3 text-white">
                        <span className="text-gray-500">{`>`}</span>
                        <span className="animate-pulse bg-white w-2 h-4 block"></span>

                        <div className="flex-1 h-[2px] bg-white/10 relative overflow-hidden ml-2 max-w-[200px]">
                            <motion.div
                                className="h-full bg-white"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <span className="text-xs text-gray-400 w-10">{progress}%</span>
                    </div>
                </div>

                {/* Vignette / Scanline overlay for that "screen" feel (optional/subtle) */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0813] via-transparent to-transparent pointer-events-none h-20 bottom-0 z-10" />
            </motion.div>
        </motion.div>
    );
}
