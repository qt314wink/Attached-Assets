import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, Droplets, Zap, Beaker, ShoppingCart, RefreshCcw } from 'lucide-react';

export default function LiquidPhysicsModule({ setPage }: { setPage: (p: string) => void }) {
  const [droplets, setDroplets] = useState<{id: string, x: number, y: number, size: number, color: string}[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [buttonState, setButtonState] = useState<'idle' | 'loading' | 'done'>('idle');
  const [sliderVal, setSliderVal] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [toggleState, setToggleState] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const handleButtonClick = () => {
    if (buttonState !== 'idle') return;
    setButtonState('loading');
    setTimeout(() => setButtonState('done'), 2000);
    setTimeout(() => setButtonState('idle'), 4000);
  };

  const handlePour = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newDroplets = Array.from({ length: 3 }).map((_, i) => ({
      id: `${Date.now()}-${Math.random()}`,
      x: x + (Math.random() - 0.5) * 60,
      y: y + (Math.random() - 0.5) * 60,
      size: Math.random() * 50 + 30,
      color: ['bg-[#FF0055]', 'bg-[#00E5FF]', 'bg-[#FFFF00]', 'bg-black'][Math.floor(Math.random() * 4)]
    }));

    setDroplets(prev => [...prev, ...newDroplets]);

    setTimeout(() => {
      setDroplets(prev => prev.filter(p => !newDroplets.find(np => np.id === p.id)));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#00E5FF] font-sans selection:bg-black selection:text-[#00E5FF] relative overflow-hidden pb-24">
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

      {/* Halftone Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'radial-gradient(circle, #000 2px, transparent 2.5px)', backgroundSize: '16px 16px' }} />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10 pt-8">
        
        <header className="mb-12 bg-white border-[12px] border-black p-8 shadow-[20px_20px_0_#FF0055] relative transform -rotate-1 flex flex-col md:flex-row justify-between items-start md:items-end">
          <div className="absolute -top-8 -right-8 bg-[#FFFF00] p-6 border-[6px] border-black rounded-full shadow-[8px_8px_0_#000] rotate-12">
            <Droplets size={48} className="text-black" />
          </div>
          
          <div>
            <button 
              onClick={() => setPage('home')}
              className="flex items-center gap-2 font-black uppercase mb-6 text-white bg-black hover:bg-[#00E5FF] hover:text-black px-6 py-3 border-[4px] border-black transition-colors w-fit text-sm shadow-[6px_6px_0_#000]"
            >
              <ArrowLeft size={20} /> Back
            </button>
            <h1 className="text-6xl md:text-8xl font-black uppercase leading-[0.8] tracking-tighter text-black" style={{ textShadow: '4px 4px 0 #FFFF00, 8px 8px 0 #000' }}>
              Liquid<br/>Physics!
            </h1>
          </div>

          <div className="bg-black text-white font-black uppercase px-6 py-4 border-[6px] border-[#00E5FF] shadow-[8px_8px_0_#000] text-xl transform rotate-2 mt-8 md:mt-0">
            Gooey DOM Elements!
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 auto-rows-[minmax(400px,auto)]">
          
          {/* Item 1: Gooey Button */}
          <div className="border-[8px] border-black bg-white shadow-[16px_16px_0_#000] flex flex-col relative overflow-hidden group hover:-translate-y-2 hover:-translate-x-2 transition-transform">
            <div className="absolute top-4 right-4 bg-[#FF0055] text-white font-black uppercase px-4 py-2 border-[4px] border-black shadow-[4px_4px_0_#000] transform rotate-6 z-20">
              Lvl 1
            </div>
            
            <div className="bg-[#FFFF00] flex-1 flex items-center justify-center border-b-[8px] border-black relative overflow-hidden" style={{ filter: "url(#goo)" }}>
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1.5px)', backgroundSize: '8px 8px' }} />
              
              <div className="relative">
                <motion.button 
                  onClick={handleButtonClick}
                  animate={{
                    width: buttonState === 'loading' ? 80 : buttonState === 'done' ? 80 : 200,
                    height: buttonState === 'loading' ? 80 : buttonState === 'done' ? 80 : 80,
                    backgroundColor: buttonState === 'done' ? '#00FF66' : buttonState === 'loading' ? '#000' : '#FF0055',
                  }}
                  className="relative z-20 flex items-center justify-center rounded-full text-white font-black uppercase text-2xl transition-colors overflow-hidden border-[4px] border-black"
                >
                  <AnimatePresence mode="wait">
                    {buttonState === 'idle' && <motion.span key="idle">Ignite</motion.span>}
                    {buttonState === 'loading' && (
                      <motion.div key="loading" className="absolute inset-0 flex items-end justify-center rounded-full overflow-hidden">
                         <motion.div 
                           initial={{ height: "0%" }}
                           animate={{ height: "100%" }}
                           transition={{ duration: 1.8, ease: "easeInOut" }}
                           className="w-full bg-[#00FF66]"
                         />
                      </motion.div>
                    )}
                    {buttonState === 'done' && <motion.div key="done" className="text-black z-10"><Check size={40} strokeWidth={4} /></motion.div>}
                  </AnimatePresence>
                </motion.button>
                
                <motion.div 
                  animate={{
                    scale: buttonState === 'loading' ? [1, 1.5, 1] : 1,
                    x: buttonState === 'loading' ? [0, -40, 0] : 0,
                    y: buttonState === 'loading' ? [0, -50, 0] : 0,
                    backgroundColor: buttonState === 'done' ? '#00FF66' : '#FF0055',
                  }}
                  transition={{ repeat: buttonState === 'loading' ? Infinity : 0, duration: 0.8 }}
                  className="absolute top-0 left-4 w-12 h-12 rounded-full -z-10 transition-colors border-[4px] border-black group-hover:-translate-y-8 group-hover:translate-x-4" 
                />
                <motion.div 
                  animate={{
                    scale: buttonState === 'loading' ? [1, 1.8, 1] : 1,
                    x: buttonState === 'loading' ? [0, 50, 0] : 0,
                    y: buttonState === 'loading' ? [0, 40, 0] : 0,
                    backgroundColor: buttonState === 'done' ? '#00FF66' : '#FF0055',
                  }}
                  transition={{ repeat: buttonState === 'loading' ? Infinity : 0, duration: 1.2 }}
                  className="absolute bottom-0 right-4 w-10 h-10 rounded-full -z-10 transition-colors border-[4px] border-black group-hover:translate-y-8 group-hover:-translate-x-6" 
                />
              </div>
            </div>

            <div className="p-6 flex flex-col justify-between bg-white z-10">
              <h3 className="font-black uppercase text-3xl mb-2 leading-none" style={{ textShadow: '2px 2px 0 #FFFF00' }}>The Igniter</h3>
              <p className="font-bold text-black uppercase text-sm mb-4 border-l-[4px] border-black pl-2">State Shift with fluid volume retention.</p>
            </div>
          </div>

          {/* Item 2: Elastic Slider */}
          <div className="border-[8px] border-black bg-white shadow-[16px_16px_0_#000] flex flex-col relative overflow-hidden group hover:-translate-y-2 hover:-translate-x-2 transition-transform">
            <div className="absolute top-4 right-4 bg-[#00FF66] text-black font-black uppercase px-4 py-2 border-[4px] border-black shadow-[4px_4px_0_#000] transform -rotate-3 z-20">
              Lvl 2
            </div>
            
            <div className="bg-[#FF0055] flex-1 flex flex-col items-center justify-center border-b-[8px] border-black relative px-8" style={{ filter: "url(#goo)" }}>
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1.5px)', backgroundSize: '8px 8px' }} />
              
              <div className="relative w-full h-32 flex items-center justify-center z-10">
                <div className="absolute w-full h-4 bg-black rounded-full border-[2px] border-black" />
                
                <div 
                  className="absolute left-0 h-8 bg-white border-[4px] border-black rounded-full transition-all"
                  style={{ width: `calc(${sliderVal}% + 24px)` }}
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
                
                <motion.div 
                  animate={{ 
                    scale: isDragging ? 0.8 : 1,
                    height: isDragging ? '56px' : '48px',
                    width: isDragging ? '56px' : '48px',
                  }}
                  className="absolute bg-white border-[6px] border-black rounded-full z-10 flex items-center justify-center pointer-events-none shadow-inner"
                  style={{ left: `calc(${sliderVal}% - 24px)` }}
                >
                  <div className="w-4 h-4 bg-black rounded-full" />
                </motion.div>
                
                <motion.div 
                  animate={{ scale: isDragging ? 0.6 : 1, opacity: isDragging ? 1 : 0 }}
                  className="absolute bg-white border-[4px] border-black rounded-full w-8 h-8 pointer-events-none transition-all duration-150 ease-out"
                  style={{ left: `calc(${sliderVal}% - 16px)`, transform: isDragging ? 'translateX(-25px)' : 'translateX(0)' }}
                />
              </div>

              <div className="text-5xl font-black text-black tracking-tighter" style={{ WebkitTextStroke: '2px white' }}>
                {sliderVal}%
              </div>
            </div>

            <div className="p-6 flex flex-col justify-between bg-white z-10">
              <h3 className="font-black uppercase text-3xl mb-2 leading-none" style={{ textShadow: '2px 2px 0 #00FF66' }}>Goo Slider</h3>
              <p className="font-bold text-black uppercase text-sm mb-4 border-l-[4px] border-black pl-2">Viscous dragging with snap-back physics.</p>
            </div>
          </div>

          {/* Item 3: Blob Toggle */}
          <div className="border-[8px] border-black bg-white shadow-[16px_16px_0_#000] flex flex-col relative overflow-hidden group hover:-translate-y-2 hover:-translate-x-2 transition-transform">
            <div className="absolute top-4 right-4 bg-[#FFFF00] text-black font-black uppercase px-4 py-2 border-[4px] border-black shadow-[4px_4px_0_#000] transform rotate-2 z-20">
              Lvl 3
            </div>
            
            <div className="bg-black flex-1 flex flex-col items-center justify-center border-b-[8px] border-black relative overflow-hidden" style={{ filter: "url(#goo)" }}>
               <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1.5px)', backgroundSize: '8px 8px' }} />
               
               <button 
                 onClick={() => setToggleState(!toggleState)}
                 className="relative w-48 h-24 bg-white border-[8px] border-black rounded-full p-2 flex items-center z-10 outline-none"
               >
                 <motion.div 
                   animate={{ x: toggleState ? 96 : 0, backgroundColor: toggleState ? '#00FF66' : '#FF0055' }}
                   transition={{ type: "spring", stiffness: 500, damping: 20 }}
                   className="w-16 h-16 rounded-full border-[6px] border-black z-20 flex items-center justify-center relative"
                 >
                   <div className="w-4 h-4 bg-black rounded-full" />
                   
                   <motion.div 
                     animate={{ opacity: 1, scale: [1, 0.8, 1], x: toggleState ? -20 : 20 }}
                     transition={{ duration: 0.3 }}
                     className="absolute w-8 h-8 rounded-full border-[4px] border-black -z-10"
                     style={{ backgroundColor: toggleState ? '#00FF66' : '#FF0055' }}
                   />
                 </motion.div>
                 
                 <div className="absolute inset-0 flex justify-between items-center px-8 pointer-events-none font-black uppercase text-2xl text-black/20">
                   <span>Off</span>
                   <span>On</span>
                 </div>
               </button>
            </div>

            <div className="p-6 flex flex-col justify-between bg-white z-10">
              <h3 className="font-black uppercase text-3xl mb-2 leading-none" style={{ textShadow: '2px 2px 0 #00E5FF' }}>Blob Switch</h3>
              <p className="font-bold text-black uppercase text-sm mb-4 border-l-[4px] border-black pl-2">A boolean toggle with viscous snapping.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}