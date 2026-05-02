import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Database, Zap, Sparkles, Layers, Terminal } from 'lucide-react';

export function BrutalistHero({ setPage }: { setPage: (p: string) => void }) {
  const constraintsRef = useRef(null);

  const modules = [
    { title: "Generative Engine", icon: <Zap size={32} />, color: "bg-[#FF3366]", x: 5, y: 15, w: "w-72" },
    { title: "Collage Pipeline", icon: <Sparkles size={32} />, color: "bg-[#33CCFF]", x: 45, y: 5, w: "w-80" },
    { title: "Asset Database", icon: <Database size={32} />, color: "bg-[#CCFF00]", x: 25, y: 45, w: "w-64" },
    { title: "Component UI", icon: <Layers size={32} />, color: "bg-white", x: 65, y: 35, w: "w-72" },
  ];

  return (
    <div className="h-screen min-h-[800px] bg-[#E5E5E5] overflow-hidden relative font-sans" ref={constraintsRef}>
      {/* Background Dots */}
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 2px, transparent 0)', backgroundSize: '40px 40px' }} />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <h1 className="text-[12vw] font-black uppercase text-black/5 tracking-tighter leading-[0.8] text-center select-none">
          Tactile<br/>System
        </h1>
      </div>

      {modules.map((mod, i) => (
        <motion.div
          key={i}
          drag
          dragConstraints={constraintsRef}
          whileDrag={{ scale: 1.05, zIndex: 50 }}
          className={`absolute p-6 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] ${mod.color} cursor-grab active:cursor-grabbing ${mod.w} flex flex-col gap-6 z-10 transition-colors`}
          style={{ top: `${mod.y}%`, left: `${mod.x}%` }}
        >
          <div className="w-16 h-16 bg-white border-4 border-black flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-full">
            {mod.icon}
          </div>
          <h3 className="font-black text-2xl uppercase tracking-tight bg-white px-3 py-1 border-4 border-black inline-block self-start shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            {mod.title}
          </h3>
          <div className="bg-white p-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <p className="font-mono text-sm font-bold leading-relaxed">
              Drag to rearrange. Integrating open-source models for instant UI population.
            </p>
          </div>
        </motion.div>
      ))}

      {/* Main anchored module (Portfolio/Showcase) */}
      <div className="absolute bottom-12 right-12 bg-white border-8 border-black p-10 shadow-[24px_24px_0px_0px_rgba(0,0,0,1)] max-w-xl z-20 hidden md:block">
        <div className="inline-flex items-center gap-2 bg-black text-white font-bold uppercase tracking-widest text-xs px-4 py-2 mb-6 border-4 border-black">
           <Terminal size={16} /> Portfolio Showcase
        </div>
        <h2 className="text-5xl font-black uppercase tracking-tighter mb-6 leading-[0.9]">Physics-Driven<br/>Design Systems.</h2>
        <p className="text-xl font-bold mb-8 border-l-8 border-[#FF3366] pl-4">
          We treat UI as physical objects. Elements carry weight, cast solid shadows, and react to kinetic input.
        </p>
        <button onClick={() => setPage('systems')} className="w-full bg-[#CCFF00] hover:bg-black hover:text-white text-black font-black uppercase tracking-widest py-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-x-2 active:translate-y-2 active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] transition-all text-lg">
          Explore Components
        </button>
      </div>

    </div>
  );
}