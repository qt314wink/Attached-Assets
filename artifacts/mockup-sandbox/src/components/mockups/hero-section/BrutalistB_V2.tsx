import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Database, Zap, Sparkles, Layers, Terminal, GripHorizontal } from 'lucide-react';
import './_group.css';

export function BrutalistB_V2() {
  const constraintsRef = useRef(null);
  const [draggingId, setDraggingId] = useState<number | null>(null);

  const modules = [
    { title: "Generative Engine", icon: <Zap size={32} />, color: "bg-[#FF3366]", x: 10, y: 20, w: "w-80" },
    { title: "Collage Pipeline", icon: <Sparkles size={32} />, color: "bg-[#33CCFF]", x: 55, y: 10, w: "w-80" },
    { title: "Asset Database", icon: <Database size={32} />, color: "bg-[#CCFF00]", x: 15, y: 60, w: "w-72" },
  ];

  return (
    <div className="min-h-screen bg-[#E5E5E5] overflow-hidden relative font-sans" ref={constraintsRef}>
      {/* Background Dots */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 2px, transparent 0)', backgroundSize: '40px 40px' }} />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 flex-col">
        <h1 className="text-[12vw] font-black uppercase text-black/5 tracking-tighter leading-[0.8] text-center select-none mb-4">
          Tactile<br/>System
        </h1>
        <div className="animate-bounce bg-black text-white px-6 py-2 rounded-full font-bold uppercase tracking-widest text-sm flex items-center gap-3">
          <GripHorizontal size={18} /> Grab & Drag to explore
        </div>
      </div>

      {modules.map((mod, i) => (
        <motion.div
          key={i}
          drag
          dragConstraints={constraintsRef}
          onDragStart={() => setDraggingId(i)}
          onDragEnd={() => setDraggingId(null)}
          whileHover={{ scale: 1.02, y: -4, shadow: "16px 16px 0px 0px rgba(0,0,0,1)" }}
          whileDrag={{ scale: 1.05, zIndex: 50, shadow: "24px 24px 0px 0px rgba(0,0,0,1)", rotate: -2 }}
          className={`absolute p-1 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] ${mod.color} cursor-grab active:cursor-grabbing ${mod.w} z-10 transition-shadow duration-200 group`}
          style={{ top: `${mod.y}%`, left: `${mod.x}%` }}
        >
          {/* Draggable Header Handle */}
          <div className="bg-black text-white p-2 flex items-center justify-between mb-4">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full border-2 border-white bg-white group-hover:bg-[#FF3366] transition-colors" />
              <div className="w-3 h-3 rounded-full border-2 border-white bg-white group-hover:bg-[#CCFF00] transition-colors" />
            </div>
            <GripHorizontal className="opacity-50 group-hover:opacity-100 transition-opacity" size={20} />
          </div>

          <div className="px-5 pb-5 flex flex-col gap-6 pointer-events-none">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-full">
                {mod.icon}
              </div>
              <h3 className="font-black text-2xl uppercase tracking-tight bg-white px-3 py-1 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                {mod.title}
              </h3>
            </div>
            <div className="bg-white p-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <p className="font-mono text-sm font-bold leading-relaxed">
                Physics-driven component acting as a tangible object.
              </p>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Main anchored module with hover states */}
      <div className={`absolute bottom-12 right-12 bg-white border-8 border-black p-10 shadow-[24px_24px_0px_0px_rgba(0,0,0,1)] max-w-xl z-20 hidden md:block transition-all duration-500 ${draggingId !== null ? 'opacity-30 blur-sm scale-95' : 'opacity-100'}`}>
        <h2 className="text-5xl font-black uppercase tracking-tighter mb-6 leading-[0.9]">Physics-Driven<br/>Design Systems.</h2>
        <button className="w-full bg-[#CCFF00] text-black font-black uppercase tracking-widest py-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 active:translate-x-2 active:translate-y-2 active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] transition-all text-lg relative overflow-hidden group">
          <span className="relative z-10">Explore Components</span>
          <div className="absolute inset-0 bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out -z-0" />
          <span className="absolute inset-0 z-10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity delay-100">
            Explore Components
          </span>
        </button>
      </div>
    </div>
  );
}
