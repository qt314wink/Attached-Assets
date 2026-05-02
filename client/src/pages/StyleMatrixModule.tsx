import React, { useState, useRef } from 'react';
import { ArrowLeft, Maximize } from 'lucide-react';
import imgVisuoHaptic from '@assets/Slide_1777310577560_1777745432509.png';

export default function StyleMatrixModule({ setPage }: { setPage: (p: string) => void }) {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div className="pt-32 pb-24 px-6 bg-[#0a0a0a] min-h-screen relative text-white">
      <div className="max-w-6xl mx-auto relative z-10">
        <button 
          onClick={() => setPage('home')}
          className="flex items-center gap-2 font-black uppercase mb-12 text-white hover:text-black hover:bg-white px-4 py-2 border-2 border-transparent hover:border-white transition-all w-fit"
        >
          <ArrowLeft size={16} /> Back to Systems
        </button>

        <div className="mb-12">
          <span className="text-[#fbbf24] font-black uppercase tracking-[0.5em] text-xs block mb-4">
            // DIGITAL DISTORTION LAB
          </span>
          <h1 className="kinetic-text text-5xl md:text-7xl uppercase leading-none mb-6">
            SVG DISPLACEMENT<br/>MATRIX
          </h1>
          <p className="text-xl font-bold max-w-2xl text-gray-400 mb-8">
            Interact with the canvas below. The mouse position drives an SVG <code>feDisplacementMap</code> filter, proving that distortion is just math.
          </p>
        </div>

        {/* The SVG filter definitions */}
        <svg width="0" height="0" className="absolute">
          <defs>
            <filter id="lens-distortion" x="-20%" y="-20%" width="140%" height="140%">
              {/* Generates a soft turbulence map */}
              <feTurbulence 
                type="fractalNoise" 
                baseFrequency="0.015" 
                numOctaves="3" 
                result="noise" 
              />
              {/* Applies the noise map to displace the source image */}
              <feDisplacementMap 
                in="SourceGraphic" 
                in2="noise" 
                scale={Math.abs((mousePos.x - 50) + (mousePos.y - 50))} // Dynamic scale based on mouse
                xChannelSelector="R" 
                yChannelSelector="B" 
                result="displaced"
              />
            </filter>
          </defs>
        </svg>

        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="relative w-full h-[600px] brutalist-border border-white overflow-hidden cursor-crosshair group bg-black"
        >
          {/* Target Graphic with the filter applied */}
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-75"
            style={{ 
              backgroundImage: `url(${imgVisuoHaptic})`,
              filter: 'url(#lens-distortion)' 
            }}
          />
          
          <div className="absolute inset-0 bg-black/20 pointer-events-none" />

          {/* Mouse tracking overlay for visual feedback */}
          <div 
            className="absolute w-32 h-32 border border-[#fbbf24] rounded-full pointer-events-none transition-transform duration-75 ease-out flex items-center justify-center opacity-0 group-hover:opacity-100"
            style={{
              left: `${mousePos.x}%`,
              top: `${mousePos.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="w-1 h-1 bg-[#fbbf24] rounded-full" />
          </div>

          <div className="absolute bottom-6 left-6 bg-black/80 backdrop-blur text-[#fbbf24] font-mono text-xs p-4 brutalist-border border-white pointer-events-none">
            <div className="font-black uppercase mb-2 text-white flex items-center gap-2">
              <Maximize size={14} /> Map Telemetry
            </div>
            <div>X_COORD: {mousePos.x.toFixed(2)}%</div>
            <div>Y_COORD: {mousePos.y.toFixed(2)}%</div>
            <div>SCALE_FACTOR: {Math.abs((mousePos.x - 50) + (mousePos.y - 50)).toFixed(1)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}