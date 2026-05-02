import React, { useState, useRef } from 'react';
import { ArrowLeft, Droplet } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <div className="pt-32 pb-24 px-6 bg-[#0a0a0a] min-h-screen relative text-white overflow-hidden">
      {/* SVG Filters */}
      <svg className="hidden absolute w-0 h-0">
        <defs>
          <filter id="fabricmorphism" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.5 0" in="noise" result="coloredNoise" />
            <feComposite operator="in" in="coloredNoise" in2="SourceGraphic" result="composite" />
            <feBlend mode="multiply" in="composite" in2="SourceGraphic" />
          </filter>
          
          <filter id="jellymorphism" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="turbulence" baseFrequency="0.015" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={Math.abs((mousePos.x - 50) + (mousePos.y - 50)) * 2} xChannelSelector="R" yChannelSelector="B" result="displaced" />
            <feGaussianBlur in="displaced" stdDeviation="5" result="blur" />
            <feComponentTransfer in="blur" result="glow">
               <feFuncA type="linear" slope="2" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="displaced" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      <div className="max-w-6xl mx-auto relative z-10">
        <button 
          onClick={() => setPage('home')}
          className="flex items-center gap-2 font-black uppercase mb-12 text-white/50 hover:text-white transition-colors w-fit text-sm"
        >
          <ArrowLeft size={16} /> Back to Systems
        </button>

        <div className="mb-16">
          <span className="text-[#c4ff00] font-black uppercase tracking-[0.5em] text-xs block mb-4">
            // TACTILE SURFACE MORPHISMS
          </span>
          <h1 className="kinetic-text text-5xl md:text-7xl uppercase leading-none mb-6">
            JELLY & FABRIC<br/>MATRIX
          </h1>
          <p className="text-xl font-medium max-w-2xl text-gray-400">
            Applying SVG <code className="text-[#c4ff00]">feTurbulence</code> and <code className="text-[#c4ff00]">feDisplacementMap</code> to create organic, reactive physical materials (Fabricmorphism & Jellymorphism) in the browser.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12" ref={containerRef} onMouseMove={handleMouseMove}>
          
          {/* Fabricmorphism */}
          <div className="space-y-6">
            <h3 className="font-black uppercase text-sm tracking-widest flex items-center gap-2">
               Fabricmorphism (Perlin Noise)
            </h3>
            <div className="h-[400px] bg-slate-200 rounded-3xl p-8 flex items-center justify-center relative overflow-hidden group">
              <div 
                className="absolute inset-0 opacity-40 mix-blend-multiply" 
                style={{ filter: "url(#fabricmorphism)" }}
              />
              <div className="relative z-10 bg-white p-8 rounded-2xl shadow-2xl rotate-[-2deg] group-hover:rotate-0 transition-transform">
                <div className="w-16 h-16 bg-slate-800 rounded-full mb-4" />
                <div className="h-4 w-32 bg-slate-300 rounded mb-2" />
                <div className="h-4 w-24 bg-slate-200 rounded" />
              </div>
            </div>
          </div>

          {/* Jellymorphism */}
          <div className="space-y-6">
            <h3 className="font-black uppercase text-sm tracking-widest flex items-center gap-2">
               <Droplet size={16} className="text-[#c4ff00]" /> Jellymorphism (Liquid Dynamics)
            </h3>
            <div className="h-[400px] border-4 border-[#c4ff00]/20 rounded-3xl p-8 flex items-center justify-center relative overflow-hidden bg-black">
              <motion.div 
                className="w-64 h-64 bg-gradient-to-br from-[#c4ff00] to-teal-500 rounded-full blur-[2px]"
                style={{ filter: "url(#jellymorphism)" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <div className="bg-black/40 backdrop-blur-md px-6 py-3 rounded-full text-white font-black uppercase text-xs tracking-widest border border-white/10">
                   Move Cursor to Disrupt
                 </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}