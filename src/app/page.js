"use client"
import BlobCursor from "@/components/BlobCursor";
import Noise from "@/components/Noise";
import Ribbons from "@/components/Ribbons";
import Squares from "@/components/Squares";
import VariableProximity from "@/components/VariableProximity";
import { useEffect, useRef, useState } from "react";
import logo from '../../public/vercel.svg'
import StickerPeel from "@/components/StickerPeel";

export default function Home() {
  const containerRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (containerRef.current && !ready) setReady(true);
  }, [ready]);

  return (

    <div className="h-[100vh] relative">

      <StickerPeel
        imageSrc={logo}
        width={200}
        rotate={30}
        peelBackHoverPct={20}
        peelBackActivePct={40}
        shadowIntensity={0.6}
        lightingIntensity={0.1}
        initialPosition={{ x: -100, y: 100 }}
      />
      <div style={{ width: '100%', height: '100%', position: 'absolute', overflow: 'hidden' }}>
        <Noise
          patternSize={10}
          patternScaleX={1}
          patternScaleY={1}
          patternRefreshInterval={2}
          patternAlpha={20}
        />
      </div>
      {/* BlobCursor
      <BlobCursor
        blobType="circle"
        fillColor="#858585"
        trailCount={3}
        sizes={[60, 125, 75]}
        innerSizes={[20, 35, 25]}
        innerColor="rgba(255,255,255,0.8)"
        opacities={[0.6, 0.6, 0.6]}
        shadowColor="rgba(0,0,0,0.75)"
        shadowBlur={5}
        shadowOffsetX={10}
        shadowOffsetY={10}
        filterStdDeviation={30}
        useFilter={true}
        fastDuration={0.1}
        slowDuration={0.5}
        zIndex={100}
      />*/}


      {/* CUADRICULA
      <Squares
        speed={0.2}
        squareSize={35}
        direction="up"
        borderColor="#5184a6"
        hoverFillColor="#313232"
      />*/}

      {/* Ocupa toda la pantalla y centra el contenido */}
      <div
        ref={containerRef}
        className="absolute inset-0 text-center flex items-center justify-center px-6"
      >
        {ready && (
          <VariableProximity
            label="Transformando ideas en experiencias digitales excepcionales"
            className="text-[7vw] leading-[0.9] text-orange-200select-none"
            fromFontVariationSettings="'wght' 400, 'opsz' 9"
            toFontVariationSettings="'wght' 1000, 'opsz' 40"
            containerRef={containerRef}
            radius={300}
            falloff="linear"
          />
        )}
      </div>
    </div>
  );
}
