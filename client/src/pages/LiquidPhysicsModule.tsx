import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Droplets, Target, Waves } from 'lucide-react';

export default function LiquidPhysicsModule({ setPage }: { setPage: (p: string) => void }) {
  const [activeTab, setActiveTab] = useState('liquid');
  const [droplets, setDroplets] = useState<{id: number, x: number, y: number, size: number, color: string}[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderVal, setSliderVal] = useState(50);

  const handlePour = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newDroplets = Array.from({ length: 5 }).map((_, i) => ({
      id: Date.now() + i,
      x: x + (Math.random() - 0.5) * 40,
      y: y + (Math.random() - 0.5) * 40,
      size: Math.random() * 40 + 20,
      color: ['bg-[#c4ff00]', 'bg-pink-400', 'bg-cyan-400', 'bg-purple-400'][Math.floor(Math.random() * 4)]
    }));

    setDroplets(prev => [...prev, ...newDroplets]);

    // Melt away logic
    setTimeout(() => {
      setDroplets(prev => prev.filter(p => !newDroplets.find(np => np.id === p.id)));
    }, 2500);
  };

  return (
    <div className="pt-32 pb-24 px-6 bg-[#120E1A] min-h-screen relative text-white font-sans overflow-hidden">
      
      {/* THE INVISIBLE SVG FILTER ENGINE */}
      <svg className="hidden absolute w-0 h-0">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -10" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div className="max-w-6xl mx-auto relative z-10">
        <button 
          onClick={() => setPage('home')}
          className="flex items-center gap-2 font-black uppercase mb-12 text-white/50 hover:text-white transition-colors w-fit text-sm"
        >
          <ArrowLeft size={16} /> Return to Nexus
        </button>

        <header className="mb-16 text-center">
          <h1 className="text-6xl md:text-8xl font-black text-pink-500 mix-blend-screen blur-[1px] tracking-tighter uppercase mb-4">
            LIQUID PHYSICS
          </h1>
          <p className="text-xl text-white/60 font-medium max-w-2xl mx-auto">
            Bypassing canvas limitations using DOM-native SVG Matrix Filters to create surface tension, paint bleeds, and gooey component merges.
          </p>
        </header>

        <div className="flex justify-center gap-4 mb-16">
          <button 
            onClick={() => setActiveTab('liquid')}
            className={`px-8 py-4 rounded-full font-black uppercase text-sm transition-all ${activeTab === 'liquid' ? 'bg-pink-500 text-white shadow-[0_0_30px_rgba(236,72,153,0.4)]' : 'bg-white/10 text-white/50 hover:bg-white/20'}`}
          >
            Surface Tension
          </button>
          <button 
            onClick={() => setActiveTab('pour')}
            className={`px-8 py-4 rounded-full font-black uppercase text-sm transition-all ${activeTab === 'pour' ? 'bg-cyan-500 text-white shadow-[0_0_30px_rgba(6,182,212,0.4)]' : 'bg-white/10 text-white/50 hover:bg-white/20'}`}
          >
            Paint Pour Engine
          </button>
        </div>

        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'liquid' && (
              <motion.div key="liquid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-16">
                
                {/* Gooey Button */}
                <div className="flex flex-col items-center">
                  <h3 className="font-bold text-white/50 uppercase tracking-widest text-xs mb-8">1. Acid Bubble Button</h3>
                  <div className="relative group cursor-pointer" style={{ filter: "url(#goo)" }}>
                    <div className="relative z-20 px-12 py-6 rounded-full bg-[#c4ff00] text-black font-black text-2xl transition-transform duration-300 group-hover:scale-105">
                      HOVER ME
                    </div>
                    <div className="absolute top-0 left-4 w-12 h-12 rounded-full bg-[#c4ff00] transition-all duration-700 ease-in-out group-hover:-translate-y-10 group-hover:translate-x-4 group-hover:scale-150" />
                    <div className="absolute bottom-0 right-4 w-8 h-8 rounded-full bg-[#c4ff00] transition-all duration-500 ease-in-out delay-75 group-hover:translate-y-8 group-hover:-translate-x-6 group-hover:scale-125" />
                    <div className="absolute top-1/2 -left-4 w-10 h-10 rounded-full bg-[#c4ff00] transition-all duration-1000 ease-in-out group-hover:-translate-x-10 group-hover:-translate-y-6 group-hover:scale-110" />
                  </div>
                </div>

                {/* Surface Tension Slider */}
                <div className="flex flex-col items-center w-full max-w-md mx-auto pt-16">
                  <h3 className="font-bold text-white/50 uppercase tracking-widest text-xs mb-8">2. Cohesive Slider</h3>
                  <div className="relative w-full h-32 flex items-center justify-center" style={{ filter: "url(#goo)" }}>
                    <div className="absolute w-full h-4 bg-purple-900 rounded-full" />
                    <input 
                      type="range" min="0" max="100" value={sliderVal} 
                      onChange={(e) => setSliderVal(parseInt(e.target.value))}
                      className="absolute w-full h-full opacity-0 z-20 cursor-grab"
                    />
                    <div 
                      className="absolute w-16 h-16 bg-pink-500 rounded-full z-10 transition-transform duration-75 flex items-center justify-center"
                      style={{ left: `calc(${sliderVal}% - 32px)` }}
                    >
                      <div className="w-4 h-4 bg-white/80 rounded-full blur-[2px]" />
                    </div>
                    {/* Connecting drops */}
                    <div className="absolute w-8 h-8 bg-purple-900 rounded-full transition-all duration-300" style={{ left: `calc(${sliderVal}% - 16px)`, opacity: sliderVal < 5 || sliderVal > 95 ? 0 : 1 }} />
                  </div>
                </div>

              </motion.div>
            )}

            {activeTab === 'pour' && (
              <motion.div key="pour" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h3 className="font-bold text-white/50 uppercase tracking-widest text-xs mb-8 text-center">Interactive Paint Canvas</h3>
                <div 
                  ref={containerRef}
                  onMouseMove={(e) => { if (e.buttons === 1) handlePour(e); }}
                  onClick={handlePour}
                  className="relative w-full h-96 bg-white/5 border border-white/10 rounded-[3rem] shadow-inner overflow-hidden cursor-crosshair"
                  style={{ filter: "url(#goo)" }}
                >
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
                    <span className="font-black text-3xl uppercase tracking-widest text-white">Click & Drag</span>
                  </div>

                  {droplets.map(drop => (
                    <motion.div
                      key={drop.id}
                      initial={{ opacity: 1, scale: 1 }}
                      animate={{ opacity: 0, scale: 2, y: drop.y + 100 }}
                      transition={{ duration: 2.5, ease: "easeOut" }}
                      className={`absolute rounded-full ${drop.color}`}
                      style={{
                        left: drop.x - drop.size/2,
                        top: drop.y - drop.size/2,
                        width: drop.size,
                        height: drop.size,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}