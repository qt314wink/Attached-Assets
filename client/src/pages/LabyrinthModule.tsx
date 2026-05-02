import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Box, LayoutGrid, Maximize, Eye } from 'lucide-react';

export default function LabyrinthModule({ setPage }: { setPage: (p: string) => void }) {
  const [expandMode, setExpandMode] = useState<number | null>(null);

  const bentoItems = [
    { id: 1, title: "Tactile Maximalism", span: "col-span-1 md:col-span-2 row-span-2", img: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2940&auto=format&fit=crop" },
    { id: 2, title: "Pristine Reflections", span: "col-span-1 row-span-1", img: "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?q=80&w=2940&auto=format&fit=crop" },
    { id: 3, title: "Macro Depth", span: "col-span-1 row-span-1", img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=2938&auto=format&fit=crop" },
    { id: 4, title: "Volumetric Light", span: "col-span-1 md:col-span-2 row-span-1", img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2940&auto=format&fit=crop" },
  ];

  return (
    <div className="pt-32 pb-24 px-6 bg-[#0a0a0a] min-h-screen relative text-slate-200 font-sans">
      <div className="max-w-6xl mx-auto relative z-10">
        <button 
          onClick={() => setPage('home')}
          className="flex items-center gap-2 font-black uppercase mb-12 text-slate-500 hover:text-white transition-colors w-fit text-sm"
        >
          <ArrowLeft size={16} /> Return to Nexus
        </button>

        <header className="mb-16">
          <span className="font-black uppercase tracking-[0.3em] text-xs block mb-4 text-[#c4ff00]">
            // DIGITAL ARCHITECTURE
          </span>
          <h1 className="text-5xl md:text-7xl font-black uppercase leading-none mb-6 tracking-tighter text-white">
            Bento Grid &<br/>Expand Mode
          </h1>
          <p className="text-xl font-medium max-w-3xl text-slate-400">
            Managing generative complexity requires structural logic. The Bento Box paradigm chunks dense visual information into self-contained modules, with Expand Mode for high-fidelity exploration.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
          {bentoItems.map((item) => (
            <motion.div 
              key={item.id}
              layoutId={`bento-${item.id}`}
              className={`relative rounded-3xl overflow-hidden group cursor-zoom-in ${item.span}`}
              onClick={() => setExpandMode(item.id)}
            >
              <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                <h3 className="font-black uppercase tracking-widest text-sm text-white">{item.title}</h3>
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0">
                  <Maximize size={16} className="text-white" />
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
              className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl"
              onClick={() => setExpandMode(null)}
            >
              <div className="absolute top-8 right-8 text-white/50 font-black uppercase tracking-widest text-xs flex items-center gap-2">
                <Eye size={16} /> Click anywhere to close
              </div>
              
              <motion.div 
                layoutId={`bento-${expandMode}`}
                className="w-full max-w-5xl aspect-[16/9] rounded-3xl overflow-hidden relative shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <img 
                  src={bentoItems.find(i => i.id === expandMode)?.img} 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}