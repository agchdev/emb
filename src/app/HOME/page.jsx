import React from 'react'

const Home = () => {
  return (
    <section className="relative z-20 px-6 pt-40 pb-20 text-white">
      <div className="max-w-5xl mx-auto">
        <p className="text-[11px] font-mono tracking-[0.35em] text-white/40 mb-4">
          C:\EMB\HOME
        </p>
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">
          Creative direction, VFX & interactive experiences.
        </h1>
        <p className="text-sm md:text-base text-white/70 max-w-2xl">
          I combine real-time engines, motion design and sound to craft cinematic sequences,
          stylized visuals and experimental web experiences.
        </p>
        <div className="grid gap-4 mt-10 md:grid-cols-3">
          <div className="border border-white/10 bg-white/5 backdrop-blur-md px-4 py-3 text-xs uppercase tracking-[0.2em]">
            <p className="text-white/40 mb-1">FOCUS</p>
            <p className="text-white">3D · VFX · EDIT</p>
          </div>
          <div className="border border-white/10 bg-white/5 backdrop-blur-md px-4 py-3 text-xs uppercase tracking-[0.2em]">
            <p className="text-white/40 mb-1">TOOLS</p>
            <p className="text-white">UEFN · AFTER EFFECTS · BLENDER</p>
          </div>
          <div className="border border-white/10 bg-white/5 backdrop-blur-md px-4 py-3 text-xs uppercase tracking-[0.2em]">
            <p className="text-white/40 mb-1">AVAILABLE FOR</p>
            <p className="text-white">PROJECTS · COLLABS</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home