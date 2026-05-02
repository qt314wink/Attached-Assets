import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Database, Zap, Sparkles, Layers, ArrowRight } from 'lucide-react';

export function ComicA_PopArt({ setPage = () => {} }: { setPage?: (p: string) => void }) {
  const constraintsRef = useRef(null);

  const modules = [
    { title: "Generative Engine", icon: <Zap size={40} />, color: "bg-[#FF0055]", desc: "BOOM! Instant UI.", onClick: () => setPage('module-somatic') },
    { title: "Collage Pipeline", icon: <Sparkles size={40} />, color: "bg-[#00E5FF]", desc: "ZAP! Textures generated.", onClick: () => setPage('module-materials') },
    { title: "Asset Database", icon: <Database size={40} />, color: "bg-[#FFFF00]", desc: "POW! Vector storage.", onClick: () => setPage('module-liquid') },
    { title: "Component UI", icon: <Layers size={40} />, color: "bg-white", desc: "WHAM! Physics-ready.", onClick: () => setPage('module-neumorphic') },
  ];

  return (
    <div className="min-h-screen bg-[#FFF000] relative font-sans flex flex-col overflow-hidden" ref={constraintsRef}>
      {/* Halftone Background */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(circle, #000 2px, transparent 2.5px)', 
          backgroundSize: '12px 12px' 
        }} 
      />

      <header className="relative z-10 w-full p-8 md:p-12 flex justify-between items-start border-b-[8px] border-black bg-white">
        <div className="relative">
          {/* Comic Burst Title Background */}
          <div className="absolute -inset-6 bg-[#FF0055] -z-10 rounded-full blur-[2px] transform -skew-x-12 scale-x-110 opacity-20" />
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-2" style={{ textShadow: '6px 6px 0 #00E5FF, 12px 12px 0 #000' }}>
            Tactile
          </h1>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none" style={{ textShadow: '6px 6px 0 #FF0055, 12px 12px 0 #000' }}>
            System!
          </h1>
          <div className="mt-8 bg-black text-white font-black uppercase text-xl p-4 inline-block transform -rotate-3 border-4 border-white shadow-[8px_8px_0_#FF0055]">
            Physical UI! No rules!
          </div>
        </div>

        <div className="flex flex-col items-end gap-6 mt-8 md:mt-0">
           <button 
             onClick={() => setPage('systems')}
             className="group bg-[#00E5FF] text-black font-black uppercase tracking-widest px-8 py-6 border-[6px] border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] hover:translate-x-3 hover:translate-y-3 transition-all flex items-center gap-4 text-2xl transform rotate-2 hover:rotate-0"
           >
             Explore <ArrowRight size={32} className="group-hover:translate-x-2 transition-transform" />
           </button>
           <button 
             onClick={() => setPage('forge')}
             className="bg-white text-black font-black uppercase tracking-widest px-8 py-4 border-[6px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] hover:translate-x-2 hover:translate-y-2 transition-all text-xl"
           >
             Access Forge
           </button>
        </div>
      </header>

      <div className="relative z-10 flex-1 max-w-[1600px] mx-auto w-full p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 items-center">
        {modules.map((mod, i) => (
          <motion.div
            key={i}
            drag
            dragConstraints={constraintsRef}
            whileDrag={{ scale: 1.1, zIndex: 50, rotate: i % 2 === 0 ? 5 : -5 }}
            className={`p-6 border-[6px] border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] ${mod.color} cursor-grab active:cursor-grabbing flex flex-col gap-4 relative transform ${i % 2 === 0 ? '-rotate-2' : 'rotate-2'} hover:rotate-0 transition-transform`}
          >
            {/* Speech Bubble Arrow */}
            <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-white border-l-[6px] border-t-[6px] border-black transform rotate-45 hidden md:block" />

            <div className="w-20 h-20 bg-white border-[6px] border-black flex items-center justify-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-full self-center -mt-12 bg-clip-padding">
              {mod.icon}
            </div>
            
            <h3 className="font-black text-2xl uppercase tracking-tighter bg-white px-4 py-2 border-[6px] border-black text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              {mod.title}
            </h3>
            
            <div className="bg-white p-4 border-[6px] border-black flex-1 flex flex-col justify-between shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <p className="font-black text-lg leading-tight uppercase text-center mb-6">
                {mod.desc}
              </p>
              <button 
                onClick={mod.onClick}
                className="w-full bg-black text-white font-black uppercase tracking-widest py-3 border-4 border-black hover:bg-[#FFF000] hover:text-black transition-colors"
              >
                Go!
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
