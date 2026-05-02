import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Maximize, Eye, Hammer } from 'lucide-react';

export default function LabyrinthModule({ setPage }: { setPage: (p: string) => void }) {
  const [expandMode, setExpandMode] = useState<number | null>(null);

  const bentoItems = [
    { id: 1, title: "Tactile Maximalism", span: "md:col-span-8 md:row-span-2", img: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2940&auto=format&fit=crop", desc: "CRASH! UI elements colliding with force." },
    { id: 2, title: "Pristine Reflections", span: "md:col-span-4 md:row-span-1", img: "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?q=80&w=2940&auto=format&fit=crop", desc: "SHINE! Chromatic aberration." },
    { id: 3, title: "Macro Depth", span: "md:col-span-4 md:row-span-1", img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=2938&auto=format&fit=crop", desc: "ZOOM! Unprecedented detail." },
    { id: 4, title: "Volumetric Light", span: "md:col-span-12 md:row-span-2", img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2940&auto=format&fit=crop", desc: "GLOW! Light rays piercing the UI." },
  ];

  return (
    <div className="min-h-screen bg-[#FFFF00] font-sans selection:bg-black selection:text-[#FFFF00] relative overflow-hidden pb-24">
      {/* Halftone Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'radial-gradient(circle, #000 2px, transparent 2.5px)', backgroundSize: '16px 16px' }} />

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 relative z-10 pt-8">
        
        <button 
          onClick={() => setPage('home')}
          className="flex items-center gap-2 font-black uppercase mb-8 text-black hover:text-white hover:bg-black px-4 py-2 border-[4px] border-black transition-colors w-fit text-lg shadow-[4px_4px_0_#000]"
        >
          <ArrowLeft size={24} /> Back to Nexus
        </button>

        <header className="mb-12 bg-white border-[8px] border-black p-8 md:p-12 shadow-[16px_16px_0_#000] relative">
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#FF0055] rounded-full border-[6px] border-black flex items-center justify-center shadow-[6px_6px_0_#000] transform rotate-12">
            <Hammer size={40} className="text-white" />
          </div>
          
          <span className="font-black uppercase tracking-widest text-xl block mb-4 bg-black text-white px-4 py-2 w-fit border-[4px] border-black transform -rotate-2">
            Vol 06: The Builder's Domain
          </span>
          <h1 className="text-6xl md:text-9xl font-black uppercase leading-[0.8] mb-8 tracking-tighter text-black" style={{ textShadow: '6px 6px 0 #00E5FF, 12px 12px 0 #000' }}>
            Component<br/>Forge!
          </h1>
          <p className="text-2xl font-black uppercase max-w-4xl text-black border-l-[8px] border-[#FF0055] pl-6 bg-[#E5E5E5] p-6 border-r-[8px] border-y-[8px]">
            Managing generative complexity requires structural logic! The Bento Box paradigm chunks dense visual information into self-contained modules, with Expand Mode for high-fidelity exploration! BOOM!
          </p>
        </header>

        {/* Comic Panel Layout using CSS Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 auto-rows-[minmax(300px,auto)]">
          {bentoItems.map((item, idx) => (
            <motion.div 
              key={item.id}
              layoutId={`bento-${item.id}`}
              className={`relative overflow-hidden group cursor-zoom-in border-[8px] border-black bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] transition-all ${item.span}`}
              onClick={() => setExpandMode(item.id)}
            >
              {/* Panel Numbering */}
              <div className="absolute top-4 left-4 bg-[#00E5FF] border-[4px] border-black px-3 py-1 font-black text-xl shadow-[4px_4px_0_#000] -rotate-6 z-20">
                Panel {idx + 1}
              </div>

              <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0" />
              
              {/* Comic Book Halftone Overlay on Image */}
              <div className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1.5px)', backgroundSize: '8px 8px' }} />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
              
              <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                  <h3 className="font-black uppercase tracking-tight text-3xl md:text-5xl text-white mb-2" style={{ WebkitTextStroke: '2px black', textShadow: '4px 4px 0 #000' }}>
                    {item.title}
                  </h3>
                  <p className="font-black uppercase text-lg bg-black text-white px-4 py-2 border-[4px] border-white shadow-[4px_4px_0_#FF0055] inline-block transform rotate-1">
                    {item.desc}
                  </p>
                </div>
                
                <div className="w-16 h-16 rounded-full bg-[#FFFF00] border-[4px] border-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 shadow-[4px_4px_0_#000] self-end">
                  <Maximize size={32} className="text-black" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Expand Mode Overlay */}
        <AnimatePresence>
          {expandMode && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 bg-black/90 backdrop-blur-sm"
              onClick={() => setExpandMode(null)}
            >
              <div className="absolute top-8 left-8 bg-[#FF0055] border-[4px] border-white text-white font-black uppercase tracking-widest text-xl px-6 py-3 flex items-center gap-4 shadow-[6px_6px_0_#00E5FF] rotate-2 cursor-pointer hover:scale-105 transition-transform">
                <Eye size={24} /> Close Panel!
              </div>
              
              <motion.div 
                layoutId={`bento-${expandMode}`}
                className="w-full max-w-7xl aspect-[16/9] border-[12px] border-white relative shadow-[20px_20px_0_#00E5FF] bg-white overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <img 
                  src={bentoItems.find(i => i.id === expandMode)?.img} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-8 right-8 bg-black text-white font-black uppercase text-4xl px-8 py-4 border-[6px] border-white shadow-[8px_8px_0_#FFFF00] transform -rotate-3">
                  {bentoItems.find(i => i.id === expandMode)?.title}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}