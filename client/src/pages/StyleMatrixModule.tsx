import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, SplitSquareHorizontal } from 'lucide-react';

export default function StyleMatrixModule({ setPage }: { setPage: (p: string) => void }) {
  const [style, setStyle] = useState<'A' | 'B'>('A');

  return (
    <div className={`pt-32 pb-24 px-6 min-h-screen transition-colors duration-700 ${style === 'A' ? 'bg-[#0f172a] text-white' : 'bg-[#fef3c7] text-black'}`}>
      <div className="max-w-6xl mx-auto relative z-10">
        <button 
          onClick={() => setPage('home')}
          className={`flex items-center gap-2 font-black uppercase mb-12 px-4 py-2 border-2 transition-all w-fit ${
            style === 'A' 
              ? 'text-white border-transparent hover:border-white hover:bg-white hover:text-black' 
              : 'text-black border-transparent hover:border-black hover:bg-black hover:text-white'
          }`}
        >
          <ArrowLeft size={16} /> Back to Systems
        </button>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16 gap-8">
          <h1 className="kinetic-text text-5xl md:text-7xl uppercase leading-none">
            AESTHETIC<br/>MATRIX
          </h1>

          <div className="flex p-1 bg-gray-800/10 backdrop-blur rounded-full border border-gray-500/20">
            <button 
              onClick={() => setStyle('A')}
              className={`px-6 py-2 rounded-full font-black uppercase text-xs transition-all ${style === 'A' ? 'bg-white text-black shadow-lg' : 'text-gray-400 hover:text-gray-800'}`}
            >
              Style A: Spatial
            </button>
            <button 
              onClick={() => setStyle('B')}
              className={`px-6 py-2 rounded-full font-black uppercase text-xs transition-all ${style === 'B' ? 'bg-black text-[#c4ff00] shadow-lg' : 'text-gray-500 hover:text-gray-800'}`}
            >
              Style B: Brutalist
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {style === 'A' ? (
            <motion.div 
              key="style-a"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <div className="glass-card p-12 rounded-3xl relative overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl h-[400px] flex flex-col justify-center">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/30 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl" />
                <h3 className="text-4xl font-serif italic mb-6 relative z-10">Organic Digitalism</h3>
                <p className="text-white/80 font-light leading-relaxed relative z-10 text-lg">
                  Fluid, elegant, and spatial. The UI acts as a glass pane over a living, breathing ecosystem. Gradients mesh and flow seamlessly, providing a sense of depth and tranquility.
                </p>
              </div>
              <div className="glass-card p-12 rounded-3xl flex items-center justify-center border border-white/10 bg-white/5 backdrop-blur-xl h-[400px]">
                <div className="w-48 h-48 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 animate-pulse blur-2xl opacity-70" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-serif italic text-2xl text-white/50">Breathe</span>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="style-b"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <div className="brutalist-border p-12 bg-white h-[400px] flex flex-col justify-center shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="text-4xl font-black uppercase mb-6 tracking-tighter">Neo-Brutalist Collage</h3>
                <p className="text-gray-800 font-bold leading-relaxed text-lg mb-8">
                  Raw, kinetic, and high-contrast. The UI is unapologetic, using heavy borders, hard shadows, and monochromatic scales punctuated by aggressive neon accents.
                </p>
                <button className="brutalist-border bg-[#c4ff00] px-8 py-4 font-black uppercase w-full hover:bg-black hover:text-[#c4ff00] transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1">
                  Execute Sequence
                </button>
              </div>
              <div className="brutalist-border p-12 bg-[#ff6b6b] flex items-center justify-center relative overflow-hidden group h-[400px] shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')] opacity-30 mix-blend-overlay" />
                <SplitSquareHorizontal size={120} className="text-black group-hover:rotate-180 transition-transform duration-500" />
                <div className="absolute bottom-6 right-6 font-black uppercase text-black text-6xl opacity-20">SYS_B</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}