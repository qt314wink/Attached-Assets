import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Droplets, Target, Waves, Check } from 'lucide-react';

export default function LiquidPhysicsModule({ setPage }: { setPage: (p: string) => void }) {
  const [activeTab, setActiveTab] = useState('liquid');
  const [droplets, setDroplets] = useState<{id: number, x: number, y: number, size: number, color: string}[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderVal, setSliderVal] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [buttonState, setButtonState] = useState<'idle' | 'loading' | 'done'>('idle');

  const handleButtonClick = () => {
    if (buttonState !== 'idle') return;
    setButtonState('loading');
    setTimeout(() => setButtonState('done'), 2500);
    setTimeout(() => setButtonState('idle'), 4500);
  };

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
                
                {/* State Shift & Fill Button */}
                <div className="flex flex-col items-center">
                  <h3 className="font-bold text-white/50 uppercase tracking-widest text-xs mb-8">1. State Shift & Fill</h3>
                  <div className="relative group" style={{ filter: "url(#goo)" }}>
                    <motion.button 
                      onClick={handleButtonClick}
                      animate={{
                        width: buttonState === 'loading' ? 80 : buttonState === 'done' ? 80 : 200,
                        height: buttonState === 'loading' ? 80 : buttonState === 'done' ? 80 : 80,
                        backgroundColor: buttonState === 'done' ? '#10b981' : buttonState === 'loading' ? '#1e293b' : '#c4ff00',
                      }}
                      className="relative z-20 flex items-center justify-center rounded-full text-black font-black text-xl transition-colors overflow-hidden"
                    >
                      <AnimatePresence mode="wait">
                        {buttonState === 'idle' && (
                          <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            IGNITE
                          </motion.span>
                        )}
                        {buttonState === 'loading' && (
                          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-end justify-center rounded-full overflow-hidden">
                             <motion.div 
                               initial={{ height: "0%" }}
                               animate={{ height: "100%" }}
                               transition={{ duration: 2, ease: "easeInOut" }}
                               className="w-full bg-[#10b981]"
                             />
                          </motion.div>
                        )}
                        {buttonState === 'done' && (
                          <motion.div key="done" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-white z-10 relative">
                            <Check size={32} strokeWidth={4} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                    
                    {/* Surrounding goo bubbles */}
                    <motion.div 
                      animate={{
                        scale: buttonState === 'loading' ? [1, 1.5, 1] : 1,
                        x: buttonState === 'loading' ? [0, -30, 0] : 0,
                        y: buttonState === 'loading' ? [0, -40, 0] : 0,
                        backgroundColor: buttonState === 'done' ? '#10b981' : '#c4ff00',
                      }}
                      transition={{ repeat: buttonState === 'loading' ? Infinity : 0, duration: 1 }}
                      className="absolute top-0 left-4 w-12 h-12 rounded-full -z-10 transition-all duration-700 group-hover:-translate-y-6 group-hover:translate-x-2" 
                    />
                    <motion.div 
                      animate={{
                        scale: buttonState === 'loading' ? [1, 1.8, 1] : 1,
                        x: buttonState === 'loading' ? [0, 40, 0] : 0,
                        y: buttonState === 'loading' ? [0, 30, 0] : 0,
                        backgroundColor: buttonState === 'done' ? '#10b981' : '#c4ff00',
                      }}
                      transition={{ repeat: buttonState === 'loading' ? Infinity : 0, duration: 1.5 }}
                      className="absolute bottom-0 right-4 w-8 h-8 rounded-full -z-10 transition-all duration-500 delay-75 group-hover:translate-y-6 group-hover:-translate-x-4" 
                    />
                  </div>
                </div>

                {/* Gooey Slider */}
                <div className="flex flex-col items-center w-full max-w-md mx-auto pt-16">
                  <h3 className="font-bold text-white/50 uppercase tracking-widest text-xs mb-8">2. Elastic Goo Slider</h3>
                  <div className="relative w-full h-32 flex items-center justify-center" style={{ filter: "url(#goo)" }}>
                    <div className="absolute w-full h-2 bg-pink-900/30 rounded-full" />
                    
                    {/* The liquid track that fills up */}
                    <div 
                      className="absolute left-0 h-4 bg-pink-500 rounded-full transition-all"
                      style={{ width: `calc(${sliderVal}% + 16px)` }}
                    />

                    <input 
                      type="range" min="0" max="100" value={sliderVal} 
                      onMouseDown={() => setIsDragging(true)}
                      onMouseUp={() => setIsDragging(false)}
                      onTouchStart={() => setIsDragging(true)}
                      onTouchEnd={() => setIsDragging(false)}
                      onChange={(e) => setSliderVal(parseInt(e.target.value))}
                      className="absolute w-full h-full opacity-0 z-20 cursor-grab active:cursor-grabbing"
                    />
                    
                    {/* Main Thumb */}
                    <motion.div 
                      animate={{ 
                        scale: isDragging ? 0.8 : 1,
                        height: isDragging ? '40px' : '32px',
                        width: isDragging ? '40px' : '32px',
                      }}
                      className="absolute bg-pink-500 rounded-full z-10 flex items-center justify-center pointer-events-none"
                      style={{ left: `calc(${sliderVal}% - 16px)` }}
                    />
                    
                    {/* Trailing blobs to create stringy stretch effect */}
                    <motion.div 
                      animate={{ 
                        scale: isDragging ? 0.6 : 1,
                        opacity: isDragging ? 1 : 0
                      }}
                      className="absolute bg-pink-500 rounded-full w-6 h-6 pointer-events-none transition-all duration-150 ease-out"
                      style={{ left: `calc(${sliderVal}% - 12px)`, transform: isDragging ? 'translateX(-15px)' : 'translateX(0)' }}
                    />
                     <motion.div 
                      animate={{ 
                        scale: isDragging ? 0.4 : 1,
                        opacity: isDragging ? 1 : 0
                      }}
                      className="absolute bg-pink-500 rounded-full w-4 h-4 pointer-events-none transition-all duration-300 ease-out"
                      style={{ left: `calc(${sliderVal}% - 8px)`, transform: isDragging ? 'translateX(-25px)' : 'translateX(0)' }}
                    />
                  </div>
                  
                  <div className="mt-8 text-4xl font-black text-pink-500 tracking-tighter">
                    {sliderVal}<span className="text-xl text-pink-500/50">%</span>
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