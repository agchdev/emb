"use client";

export default function AmbientFrame() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Auras principales */}
      <div className="absolute inset-0 animate-[ambientPulse_16s_ease-in-out_infinite] bg-[radial-gradient(circle_at_18%_22%,rgba(56,189,248,0.17),transparent_38%),radial-gradient(circle_at_82%_16%,rgba(244,114,182,0.18),transparent_36%),radial-gradient(circle_at_40%_70%,rgba(16,185,129,0.15),transparent_32%)] blur-[2px]" />

      {/* Retícula suave */}
      <div className="absolute inset-0 opacity-20 mix-blend-soft-light [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:140px_140px,140px_140px]" />
      <div className="absolute inset-0 opacity-10 mix-blend-soft-light [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:55px_55px,55px_55px]" />

      {/* Barrido de luz */}
      <div className="absolute inset-0 animate-[ambientSweep_9s_ease-in-out_infinite] bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.12),transparent_35%)] blur-3xl opacity-50" />

      {/* Columnas laterales */}
      <div className="absolute left-10 top-0 h-full w-px bg-gradient-to-b from-transparent via-white/35 to-transparent blur-[1px]" />
      <div className="absolute right-10 top-0 h-full w-px bg-gradient-to-b from-transparent via-white/30 to-transparent blur-[1px]" />
    </div>
  );
}
