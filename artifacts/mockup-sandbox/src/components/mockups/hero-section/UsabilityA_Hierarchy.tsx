import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Database, Zap, Sparkles, Layers, Terminal, ArrowRight } from 'lucide-react';
import './_group.css';

export function UsabilityA_Hierarchy() {
  const constraintsRef = useRef(null);

  const modules = [
    { title: "Generative Engine", icon: <Zap size={32} />, color: "bg-[#FF3366]", desc: "Integrating open-source models for instant UI population." },
    { title: "Collage Pipeline", icon: <Sparkles size={32} />, color: "bg-[#33CCFF]", desc: "Procedurally generated textures and collage elements." },
    { title: "Asset Database", icon: <Database size={32} />, color: "bg-[#CCFF00]", desc: "High-performance storage for vector and raster assets." },
    { title: "Component UI", icon: <Layers size={32} />, color: "bg-white", desc: "A library of tactile, physics-ready components." },
  ];

  return (
    <div className="min-h-screen bg-[#E5E5E5] relative font-sans flex flex-col" ref={constraintsRef}>
      {/* Background Dots */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 2px, transparent 0)', backgroundSize: '40px 40px' }} />

      <header className="relative z-10 max-w-[1440px] mx-auto w-full p-8 md:p-16 flex flex-col md:flex-row justify-between items-start md:items-end border-b-8 border-black">
        <div>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-4">
            Tactile<br/>System
          </h1>
          <p className="text-xl md:text-2xl font-bold border-l-8 border-[#FF3366] pl-4 max-w-xl">
            We treat UI as physical objects. Elements carry weight, cast solid shadows, and react to kinetic input.
          </p>
        </div>
        <div className="mt-8 md:mt-0 flex flex-col items-end">
           <div className="inline-flex items-center gap-2 bg-black text-white font-bold uppercase tracking-widest text-xs px-4 py-2 mb-4 border-4 border-black">
             <Terminal size={16} /> Portfolio Showcase
           </div>
           <button className="bg-[#CCFF00] hover:bg-black hover:text-white text-black font-black uppercase tracking-widest px-8 py-4 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-4 text-lg">
             Explore Components <ArrowRight />
           </button>
        </div>
      </header>

      <div className="relative z-10 max-w-[1440px] mx-auto w-full p-8 md:p-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {modules.map((mod, i) => (
          <motion.div
            key={i}
            drag
            dragConstraints={constraintsRef}
            whileDrag={{ scale: 1.05, zIndex: 50, rotate: 2 }}
            className={`p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${mod.color} cursor-grab active:cursor-grabbing flex flex-col gap-6 relative group bg-opacity-90`}
          >
            <div className="w-16 h-16 bg-white border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-full">
              {mod.icon}
            </div>
            <h3 className="font-black text-xl uppercase tracking-tight bg-white px-3 py-1 border-4 border-black inline-block self-start shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              {mod.title}
            </h3>
            <div className="bg-white p-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex-1">
              <p className="font-mono text-sm font-bold leading-relaxed">
                {mod.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
