import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Box, Hexagon, Grid3X3, MousePointer2 } from 'lucide-react';

export default function ClaymorphismModule({ setPage }: { setPage: (p: string) => void }) {
  const [activeTab, setActiveTab] = useState('buttons');
  const [bentoData, setBentoData] = useState([45, 70, 30]);

  // Simulate live bento data
  useEffect(() => {
    if (activeTab !== 'bento') return;
    const int = setInterval(() => {
      setBentoData([Math.random() * 80 + 20, Math.random() * 80 + 20, Math.random() * 80 + 20]);
    }, 2000);
    return () => clearInterval(int);
  }, [activeTab]);

  return (
    <div className="pt-32 pb-24 px-6 bg-[#f5f7ff] min-h-screen relative text-[#2D1B4E] font-sans overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <button 
          onClick={() => setPage('home')}
          className="flex items-center gap-2 font-black uppercase mb-12 text-[#2D1B4E]/50 hover:text-[#2D1B4E] transition-colors w-fit text-sm"
        >
          <ArrowLeft size={16} /> Return to Nexus
        </button>

        <header className="mb-16 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-[#2D1B4E] tracking-tighter uppercase mb-4">
            Claymorphic Form
          </h1>
          <p className="text-xl text-[#2D1B4E]/60 font-medium max-w-2xl mx-auto">
            Contextual shadows and bouncy volume. We abandon pure black shadows in favor of deeply saturated, colored drop-shadows to simulate plush, tactile materials.
          </p>
        </header>

        <div className="flex justify-center gap-4 mb-16">
          <button 
            onClick={() => setActiveTab('buttons')}
            className={`px-8 py-4 rounded-full font-black uppercase text-sm transition-all ${activeTab === 'buttons' ? 'bg-[#C5A3FF] text-[#2D1B4E] shadow-[0_10px_20px_rgba(197,163,255,0.5)]' : 'bg-white/50 text-[#2D1B4E]/50 hover:bg-white'}`}
          >
            Tactile Buttons
          </button>
          <button 
            onClick={() => setActiveTab('bento')}
            className={`px-8 py-4 rounded-full font-black uppercase text-sm transition-all ${activeTab === 'bento' ? 'bg-[#B5EAD7] text-[#2D1B4E] shadow-[0_10px_20px_rgba(181,234,215,0.5)]' : 'bg-white/50 text-[#2D1B4E]/50 hover:bg-white'}`}
          >
            Volumetric Bento
          </button>
        </div>

        <div className="max-w-4xl mx-auto">
          {activeTab === 'buttons' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-12 bg-white/60 backdrop-blur-xl rounded-[3rem] border border-white/80 shadow-[inset_0_0_20px_rgba(255,255,255,1)]">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { name: 'Mint Squash', color: 'bg-[#B5EAD7]', shadow: 'shadow-[10px_10px_20px_#99c6b6,-10px_-10px_20px_#d1fffc]' },
                  { name: 'Rose Pop', color: 'bg-[#FF9CEE]', shadow: 'shadow-[10px_10px_20px_#d984ca,-10px_-10px_20px_#ffb4ff]' },
                  { name: 'Lavender Float', color: 'bg-[#C5A3FF]', shadow: 'shadow-[10px_10px_20px_#a78adb,-10px_-10px_20px_#e3bcff]' },
                  { name: 'Lemon Drop', color: 'bg-[#FFF58E]', shadow: 'shadow-[10px_10px_20px_#d9d079,-10px_-10px_20px_#ffffa3]' }
                ].map((btn, i) => (
                  <div key={i} className="flex flex-col items-center gap-6">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.9, boxShadow: "inset 10px 10px 20px rgba(0,0,0,0.1), inset -10px -10px 20px rgba(255,255,255,0.5)" }}
                      className={`w-28 h-28 rounded-[2.5rem] ${btn.color} ${btn.shadow} flex items-center justify-center transition-all duration-300`}
                    >
                      <div className="w-8 h-8 rounded-full bg-white/50 backdrop-blur-sm" />
                    </motion.button>
                    <span className="font-black text-xs uppercase tracking-widest opacity-50">{btn.name}</span>
                  </div>
                ))}
              </div>
              <div className="mt-12 p-6 bg-white/50 rounded-2xl text-center font-bold text-sm text-[#2D1B4E]/60">
                Notice the shadows. We use colored drop-shadows (derived from the base background color) rather than generic black/gray, eliminating muddy borders and creating pure volume.
              </div>
            </motion.div>
          )}

          {activeTab === 'bento' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="p-8 bg-white/60 backdrop-blur-xl rounded-[3rem] border border-white/80 shadow-[10px_10px_30px_rgba(200,200,210,0.5),-10px_-10px_30px_rgba(255,255,255,0.8)] flex flex-col justify-between h-64">
                <h4 className="font-black text-[#2D1B4E]/40 text-xs tracking-widest uppercase">Total Magic Power</h4>
                <p className="text-6xl font-black text-[#2D1B4E]">
                  {Math.floor(bentoData[0] + bentoData[1] + bentoData[2])} <span className="text-2xl text-[#FF9CEE]">MP</span>
                </p>
              </div>

              <div className="p-8 bg-white/60 backdrop-blur-xl rounded-[3rem] border border-white/80 shadow-[10px_10px_30px_rgba(200,200,210,0.5),-10px_-10px_30px_rgba(255,255,255,0.8)] h-64 flex items-end justify-around gap-4">
                {bentoData.map((val, i) => (
                  <div key={i} className="w-16 flex flex-col items-center justify-end h-full">
                    <div 
                      className={`w-full ${['bg-[#C5A3FF]', 'bg-[#FF9CEE]', 'bg-[#B5EAD7]'][i]} rounded-t-full transition-all duration-1000 ease-out relative overflow-hidden`}
                      style={{ 
                        height: `${val}%`,
                        boxShadow: `inset 5px 5px 10px rgba(255,255,255,0.5), inset -5px -5px 10px rgba(0,0,0,0.1)` 
                      }}
                    >
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white/60 rounded-full blur-[2px]" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#2D1B4E]/40 mt-3">Q{i+1}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}