import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Database, Zap, Sparkles, Layers, Terminal, ArrowDownRight } from 'lucide-react';
import './_group.css';

export function BrutalistB_V1() {
  const constraintsRef = useRef(null);

  const modules = [
    { id: "01", title: "Generative Engine", icon: <Zap size={24} />, color: "bg-[#FF3366]", desc: "Integrating open-source models." },
    { id: "02", title: "Collage Pipeline", icon: <Sparkles size={24} />, color: "bg-[#33CCFF]", desc: "Instant UI population." },
    { id: "03", title: "Asset Database", icon: <Database size={24} />, color: "bg-[#CCFF00]", desc: "Tactile asset storage." },
    { id: "04", title: "Component UI", icon: <Layers size={24} />, color: "bg-white", desc: "Physics-driven components." },
  ];

  return (
    <div className="min-h-screen bg-[#E5E5E5] font-sans flex flex-col relative" ref={constraintsRef}>
      {/* Background Dots */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 2px, transparent 0)', backgroundSize: '40px 40px' }} />

      {/* Header Bar */}
      <header className="border-b-8 border-black bg-white p-6 relative z-10 flex justify-between items-end">
        <h1 className="text-6xl font-black uppercase tracking-tighter leading-none">
          Tactile<br/>System
        </h1>
        <div className="inline-flex items-center gap-2 bg-black text-white font-bold uppercase tracking-widest text-xs px-4 py-2 border-4 border-black">
           <Terminal size={16} /> Portfolio Showcase
        </div>
      </header>

      <div className="flex-1 flex flex-col md:flex-row relative z-10">
        {/* Left Column: Fixed Content */}
        <div className="w-full md:w-1/3 border-r-8 border-black bg-[#CCFF00] p-10 flex flex-col">
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-6 leading-tight">Physics-Driven<br/>Design Systems.</h2>
          <p className="text-lg font-bold mb-8 border-l-8 border-black pl-4">
            We treat UI as physical objects. Elements carry weight, cast solid shadows, and react to kinetic input.
          </p>
          <button className="mt-auto w-full bg-black text-white font-black uppercase tracking-widest py-6 border-4 border-black hover:bg-white hover:text-black transition-colors text-lg flex items-center justify-between px-6 group">
            Explore Components
            <ArrowDownRight className="transform group-hover:rotate-[-45deg] transition-transform" />
          </button>
        </div>

        {/* Right Column: Draggable Playground */}
        <div className="flex-1 p-10 relative overflow-hidden bg-[#E5E5E5]">
          <div className="absolute top-4 right-4 bg-white px-3 py-1 font-bold text-xs uppercase border-2 border-black tracking-widest opacity-50">
            Interactive Zone
          </div>
          
          <div className="grid grid-cols-2 gap-8 h-full pt-12">
            {modules.map((mod, i) => (
              <motion.div
                key={i}
                drag
                dragConstraints={constraintsRef}
                whileDrag={{ scale: 1.05, zIndex: 50, rotate: 2 }}
                className={`p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${mod.color} cursor-grab active:cursor-grabbing flex flex-col gap-4 relative`}
              >
                <div className="absolute -top-4 -left-4 bg-black text-white font-black text-xl px-2 py-1 border-4 border-black">
                  {mod.id}
                </div>
                <div className="w-12 h-12 bg-white border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-full">
                  {mod.icon}
                </div>
                <h3 className="font-black text-xl uppercase tracking-tight bg-white px-2 py-1 border-4 border-black inline-block self-start">
                  {mod.title}
                </h3>
                <p className="font-mono text-xs font-bold leading-relaxed bg-white p-3 border-2 border-black">
                  {mod.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
