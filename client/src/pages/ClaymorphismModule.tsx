import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Box } from 'lucide-react';

export default function ClaymorphismModule({ setPage }: { setPage: (p: string) => void }) {
  const [activeTab, setActiveTab] = useState('buttons');
  const [bentoData, setBentoData] = useState([45, 70, 30]);

  useEffect(() => {
    if (activeTab !== 'bento') return;
    const int = setInterval(() => {
      setBentoData([Math.random() * 80 + 20, Math.random() * 80 + 20, Math.random() * 80 + 20]);
    }, 2000);
    return () => clearInterval(int);
  }, [activeTab]);

  return (
    <div className="pt-32 pb-24 px-6 bg-[#00E5FF] min-h-screen relative text-black font-sans overflow-hidden selection:bg-black selection:text-[#00E5FF]">
      {/* Halftone Overlay */}
      <div className="absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #000 2px, transparent 2.5px)', backgroundSize: '16px 16px' }} />

      <div className="max-w-6xl mx-auto relative z-10">
        
        <header className="mb-16 bg-white border-[12px] border-black p-8 shadow-[20px_20px_0_#FF0055] transform rotate-1">
          <button 
            onClick={() => setPage('home')}
            className="flex items-center gap-2 font-black uppercase mb-8 text-white bg-black hover:bg-[#FF0055] px-4 py-2 border-[4px] border-black transition-colors w-fit text-sm shadow-[4px_4px_0_#000]"
          >
            <ArrowLeft size={16} /> Back
          </button>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-4" style={{ textShadow: '6px 6px 0 #00FF66, 12px 12px 0 #000' }}>
            Claymorphic<br/>Form!
          </h1>
          <div className="bg-black text-[#FFFF00] p-4 border-[6px] border-black font-black uppercase text-xl shadow-[8px_8px_0_#000] inline-block transform -rotate-2 mt-4">
            Contextual shadows & Bouncy Volume!
          </div>
        </header>

        <div className="flex flex-col md:flex-row justify-center gap-6 mb-16">
          <button 
            onClick={() => setActiveTab('buttons')}
            className={`px-8 py-6 border-[8px] border-black font-black uppercase text-3xl transition-all shadow-[12px_12px_0_#000] ${activeTab === 'buttons' ? 'bg-[#FF0055] text-white translate-x-2 translate-y-2 shadow-none' : 'bg-white hover:bg-[#FFFF00]'}`}
          >
            Squishy Buttons
          </button>
          <button 
            onClick={() => setActiveTab('bento')}
            className={`px-8 py-6 border-[8px] border-black font-black uppercase text-3xl transition-all shadow-[12px_12px_0_#000] ${activeTab === 'bento' ? 'bg-[#00FF66] text-black translate-x-2 translate-y-2 shadow-none' : 'bg-white hover:bg-[#FFFF00]'}`}
          >
            Volumetric Bento
          </button>
        </div>

        <div className="max-w-5xl mx-auto">
          {activeTab === 'buttons' && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="p-12 bg-white border-[12px] border-black shadow-[24px_24px_0_#FF0055] relative">
              <div className="absolute -top-6 -left-6 bg-[#FFFF00] p-4 font-black uppercase border-[6px] border-black shadow-[6px_6px_0_#000] rotate-[-10deg] text-xl z-20">
                SQUEEZE ME!
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-12 pt-8">
                {[
                  { name: 'Mint', color: 'bg-[#00FF66]', shadow: 'shadow-[12px_12px_0_#000]', activeShadow: 'shadow-[inset_12px_12px_20px_rgba(0,0,0,0.4),inset_-12px_-12px_20px_rgba(255,255,255,0.8)]' },
                  { name: 'Rose', color: 'bg-[#FF0055]', shadow: 'shadow-[12px_12px_0_#000]', activeShadow: 'shadow-[inset_12px_12px_20px_rgba(0,0,0,0.6),inset_-12px_-12px_20px_rgba(255,255,255,0.4)]' },
                  { name: 'Sky', color: 'bg-[#00E5FF]', shadow: 'shadow-[12px_12px_0_#000]', activeShadow: 'shadow-[inset_12px_12px_20px_rgba(0,0,0,0.4),inset_-12px_-12px_20px_rgba(255,255,255,0.8)]' },
                  { name: 'Lemon', color: 'bg-[#FFFF00]', shadow: 'shadow-[12px_12px_0_#000]', activeShadow: 'shadow-[inset_12px_12px_20px_rgba(0,0,0,0.3),inset_-12px_-12px_20px_rgba(255,255,255,0.9)]' }
                ].map((btn, i) => (
                  <div key={i} className="flex flex-col items-center gap-6 group">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.9, boxShadow: "none" }}
                      className={`w-32 h-32 rounded-[2rem] ${btn.color} ${btn.shadow} border-[6px] border-black flex items-center justify-center transition-all duration-200 active:${btn.activeShadow}`}
                    >
                      <div className="w-12 h-12 rounded-full bg-white/60 blur-[2px] transform -translate-y-4 -translate-x-4" />
                    </motion.button>
                    <span className="font-black text-xl uppercase bg-black text-white px-4 py-2 border-[4px] border-black shadow-[4px_4px_0_#000] transform rotate-3 group-hover:-rotate-3 transition-transform">{btn.name}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-16 p-6 bg-black text-white font-black uppercase text-xl border-[8px] border-white shadow-[12px_12px_0_#00E5FF] transform -rotate-1">
                Notice the shadows! We combine brutalist black drop-shadows with deep inset highlights to create cartoonish, bouncy volume!
              </div>
            </motion.div>
          )}

          {activeTab === 'bento' && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <div className="p-8 bg-white border-[12px] border-black shadow-[20px_20px_0_#000] flex flex-col justify-between min-h-[300px] relative overflow-hidden transform rotate-1">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF0055] rounded-bl-full border-b-[8px] border-l-[8px] border-black" />
                <h4 className="font-black text-black text-3xl uppercase z-10 bg-[#FFFF00] w-fit px-4 py-2 border-[4px] border-black shadow-[6px_6px_0_#000] -rotate-2">Magic Power</h4>
                <div className="text-8xl font-black text-black z-10 mt-auto" style={{ textShadow: '4px 4px 0 #00E5FF' }}>
                  {Math.floor(bentoData[0] + bentoData[1] + bentoData[2])}
                </div>
              </div>

              <div className="p-8 bg-white border-[12px] border-black shadow-[20px_20px_0_#000] min-h-[300px] flex items-end justify-around gap-6 transform -rotate-1 relative">
                 <div className="absolute top-4 left-4 font-black uppercase text-2xl border-b-[6px] border-black pb-2 w-3/4">Levels</div>
                {bentoData.map((val, i) => (
                  <div key={i} className="w-20 flex flex-col items-center justify-end h-full pt-16 z-10">
                    <div 
                      className={`w-full ${['bg-[#FF0055]', 'bg-[#00E5FF]', 'bg-[#00FF66]'][i]} rounded-t-[2rem] border-t-[6px] border-x-[6px] border-black transition-all duration-700 ease-out relative`}
                      style={{ 
                        height: `${val}%`,
                        boxShadow: `inset 8px 8px 16px rgba(255,255,255,0.6)` 
                      }}
                    >
                      <div className="absolute top-2 left-2 w-4 h-4 bg-white rounded-full blur-[1px]" />
                    </div>
                    <span className="text-xl font-black uppercase bg-black text-white px-3 py-1 mt-4 border-[4px] border-black shadow-[4px_4px_0_#FFFF00]">Q{i+1}</span>
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