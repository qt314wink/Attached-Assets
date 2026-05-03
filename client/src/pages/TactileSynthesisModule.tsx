import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { ArrowLeft, Beaker, Zap, Flame, Wind, Droplet, Mountain, Layers, Plus } from 'lucide-react';

type ElementType = 'fire' | 'water' | 'air' | 'earth';

interface DraggableElement {
  id: string;
  type: ElementType;
  x: number;
  y: number;
}

const ELEMENT_CONFIG = {
  fire: { icon: <Flame size={32} />, color: 'bg-[#FF0055]', name: 'Thermal' },
  water: { icon: <Droplet size={32} />, color: 'bg-[#00E5FF]', name: 'Fluid' },
  air: { icon: <Wind size={32} />, color: 'bg-[#FFFF00]', name: 'Kinetic' },
  earth: { icon: <Mountain size={32} />, color: 'bg-[#00FF66]', name: 'Solid' },
};

export default function TactileSynthesisModule({ setPage }: { setPage: (p: string) => void }) {
  const [elements, setElements] = useState<DraggableElement[]>([
    { id: 'fire-1', type: 'fire', x: 0, y: 0 },
    { id: 'water-1', type: 'water', x: 0, y: 0 },
    { id: 'air-1', type: 'air', x: 0, y: 0 },
    { id: 'earth-1', type: 'earth', x: 0, y: 0 },
  ]);

  const [inCrucible, setInCrucible] = useState<DraggableElement[]>([]);
  const [synthesizing, setSynthesizing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  
  const crucibleRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDragEnd = (event: any, info: any, el: DraggableElement) => {
    if (!crucibleRef.current || !containerRef.current) return;
    
    const crucibleRect = crucibleRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    
    const dropX = info.point.x;
    const dropY = info.point.y;
    
    // Check if dropped inside crucible
    if (
      dropX >= crucibleRect.left &&
      dropX <= crucibleRect.right &&
      dropY >= crucibleRect.top &&
      dropY <= crucibleRect.bottom
    ) {
      if (!inCrucible.find(e => e.id === el.id)) {
        setInCrucible(prev => [...prev, el]);
        setElements(prev => prev.filter(e => e.id !== el.id));
      }
    }
  };

  const handleSynthesize = () => {
    if (inCrucible.length < 2) return;
    
    setSynthesizing(true);
    
    setTimeout(() => {
      const types = inCrucible.map(e => e.type).sort();
      const combo = types.join('+');
      
      let synthResult = "Unknown Anomaly";
      if (combo.includes('fire') && combo.includes('water')) synthResult = "Steam Vapor";
      else if (combo.includes('fire') && combo.includes('earth')) synthResult = "Magma Plasma";
      else if (combo.includes('air') && combo.includes('water')) synthResult = "Cryo Frost";
      else if (combo.includes('air') && combo.includes('earth')) synthResult = "Dust Storm";
      else if (combo.includes('fire') && combo.includes('air')) synthResult = "Plasma Arc";
      else if (combo.includes('water') && combo.includes('earth')) synthResult = "Bio-Slime";
      
      setResult(synthResult);
      setSynthesizing(false);
      setInCrucible([]);
    }, 2000);
  };

  const resetCrucible = () => {
    setResult(null);
    setElements([
      { id: `fire-${Date.now()}`, type: 'fire', x: 0, y: 0 },
      { id: `water-${Date.now()}`, type: 'water', x: 0, y: 0 },
      { id: `air-${Date.now()}`, type: 'air', x: 0, y: 0 },
      { id: `earth-${Date.now()}`, type: 'earth', x: 0, y: 0 },
    ]);
  };

  return (
    <div className="min-h-screen bg-[#E5E5E5] font-sans selection:bg-black selection:text-[#FFFF00] relative overflow-hidden pb-24" ref={containerRef}>
      {/* Dot Matrix Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'radial-gradient(circle, #000 3px, transparent 4px)', backgroundSize: '24px 24px' }} />

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 relative z-10 pt-8 flex flex-col min-h-screen">
        
        <header className="mb-12 bg-white border-[12px] border-black p-8 shadow-[20px_20px_0_#FF0055] relative transform -rotate-1 flex flex-col md:flex-row justify-between items-start md:items-end">
          <div className="absolute -top-8 -right-8 bg-[#FFFF00] p-6 border-[8px] border-black rounded-full shadow-[8px_8px_0_#000] rotate-12">
            <Zap size={48} className="text-black" />
          </div>
          
          <div>
            <button 
              onClick={() => setPage('home')}
              className="flex items-center gap-2 font-black uppercase mb-6 text-white bg-black hover:bg-[#FF0055] px-6 py-3 border-[4px] border-black transition-colors w-fit text-sm shadow-[6px_6px_0_#000]"
            >
              <ArrowLeft size={20} /> Back
            </button>
            <h1 className="text-6xl md:text-8xl font-black uppercase leading-[0.8] tracking-tighter text-black" style={{ textShadow: '4px 4px 0 #00E5FF, 8px 8px 0 #000' }}>
              Tactile<br/>Synthesis!
            </h1>
          </div>

          <div className="bg-black text-[#00FF66] font-black uppercase px-6 py-4 border-[6px] border-[#FFFF00] shadow-[8px_8px_0_#000] text-xl transform rotate-2 mt-8 md:mt-0">
            Drag, Drop & Combine!
          </div>
        </header>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Elements Panel */}
          <div className="lg:col-span-4 bg-white border-[12px] border-black p-8 shadow-[16px_16px_0_#000] flex flex-col relative z-20 transform rotate-1">
            <div className="absolute -top-4 -left-4 bg-black text-white px-4 py-2 font-black uppercase border-[4px] border-[#00E5FF] shadow-[4px_4px_0_#000] -rotate-6">
               Raw Materials
            </div>
            
            <h2 className="text-3xl font-black uppercase mt-4 mb-8 border-b-[6px] border-black pb-4 flex items-center gap-4">
              <Layers size={32} /> Components
            </h2>

            <div className="grid grid-cols-2 gap-6 flex-1">
              <AnimatePresence>
                {elements.map((el) => (
                  <motion.div
                    key={el.id}
                    drag
                    dragConstraints={containerRef}
                    dragElastic={0.1}
                    whileDrag={{ scale: 1.1, rotate: 5, cursor: 'grabbing', zIndex: 50 }}
                    onDragEnd={(e, info) => handleDragEnd(e, info, el)}
                    layoutId={el.id}
                    className={`aspect-square border-[8px] border-black ${ELEMENT_CONFIG[el.type].color} flex flex-col items-center justify-center cursor-grab shadow-[8px_8px_0_#000] hover:-translate-y-2 hover:shadow-[12px_12px_0_#000] transition-shadow active:shadow-none`}
                  >
                    <div className="bg-white border-[4px] border-black p-4 rounded-full mb-2">
                      {ELEMENT_CONFIG[el.type].icon}
                    </div>
                    <span className="font-black uppercase bg-black text-white px-2 py-1 text-sm border-[2px] border-white transform -rotate-2">
                      {ELEMENT_CONFIG[el.type].name}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            {elements.length === 0 && (
              <button onClick={resetCrucible} className="mt-8 bg-black text-white font-black uppercase py-4 border-[6px] border-black hover:bg-[#FF0055] transition-colors shadow-[8px_8px_0_#000]">
                 Replenish Materials
              </button>
            )}
          </div>

          {/* Crucible Area */}
          <div className="lg:col-span-8 relative min-h-[500px] flex items-center justify-center">
            
            {/* The Crucible Drop Zone */}
            <div 
              ref={crucibleRef}
              className={`w-full max-w-2xl aspect-video border-[16px] border-black p-8 relative flex flex-col items-center justify-center transition-colors duration-500 shadow-[24px_24px_0_#000] bg-white transform -rotate-1 ${synthesizing ? 'animate-pulse' : ''}`}
            >
               {/* Decorative background grid */}
               <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay" />
               
               <div className="absolute -top-8 bg-[#FFFF00] px-6 py-2 border-[6px] border-black font-black uppercase text-2xl shadow-[6px_6px_0_#000] flex items-center gap-2">
                 <Beaker size={28} /> The Crucible
               </div>

               {result ? (
                 <motion.div 
                   initial={{ scale: 0, rotate: -180 }}
                   animate={{ scale: 1, rotate: 0 }}
                   className="relative z-10 flex flex-col items-center"
                 >
                   <div className="text-8xl font-black uppercase tracking-tighter text-[#00FF66] bg-black px-8 py-4 border-[12px] border-white shadow-[16px_16px_0_#00E5FF] transform rotate-3" style={{ textShadow: '4px 4px 0 #FF0055' }}>
                     {result}
                   </div>
                   <button 
                     onClick={resetCrucible}
                     className="mt-12 bg-[#FF0055] text-white font-black uppercase px-8 py-4 border-[8px] border-black text-2xl shadow-[8px_8px_0_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0_#000] transition-all"
                   >
                     Reset Matrix
                   </button>
                 </motion.div>
               ) : (
                 <>
                   <div className="flex flex-wrap gap-4 items-center justify-center z-10 min-h-[160px]">
                     <AnimatePresence>
                       {inCrucible.map((el, i) => (
                         <motion.div
                           key={el.id}
                           layoutId={el.id}
                           initial={{ scale: 0 }}
                           animate={{ scale: 1 }}
                           className={`w-32 h-32 border-[8px] border-black ${ELEMENT_CONFIG[el.type].color} flex flex-col items-center justify-center shadow-[6px_6px_0_#000] ${i % 2 === 0 ? 'rotate-6' : '-rotate-6'}`}
                         >
                           <div className="bg-white border-[4px] border-black p-2 rounded-full mb-1">
                             {ELEMENT_CONFIG[el.type].icon}
                           </div>
                           <span className="font-black uppercase bg-black text-white px-2 py-0.5 text-xs">
                             {ELEMENT_CONFIG[el.type].name}
                           </span>
                         </motion.div>
                       ))}
                     </AnimatePresence>
                     {inCrucible.length === 0 && (
                       <span className="text-4xl font-black uppercase text-black/20 tracking-widest border-[4px] border-dashed border-black/20 px-8 py-4 rounded-3xl">
                         Drop Here
                       </span>
                     )}
                   </div>

                   {inCrucible.length > 1 && !synthesizing && (
                     <motion.button
                       initial={{ opacity: 0, y: 20 }}
                       animate={{ opacity: 1, y: 0 }}
                       onClick={handleSynthesize}
                       className="mt-8 bg-black text-[#00FF66] font-black uppercase px-8 py-4 border-[8px] border-[#FFFF00] text-3xl shadow-[12px_12px_0_#FF0055] hover:scale-105 hover:bg-white hover:text-black transition-all group relative overflow-hidden"
                     >
                       <span className="relative z-10 flex items-center gap-2">Synthesize! <Zap className="group-hover:animate-bounce" /></span>
                     </motion.button>
                   )}
                 </>
               )}

               {/* Synthesis Explosion Effect */}
               <AnimatePresence>
                 {synthesizing && (
                   <motion.div 
                     initial={{ scale: 0, opacity: 1 }}
                     animate={{ scale: 5, opacity: 0 }}
                     exit={{ opacity: 0 }}
                     transition={{ duration: 1.5 }}
                     className="absolute w-64 h-64 bg-[#00E5FF] rounded-full mix-blend-exclusion pointer-events-none z-50 border-[16px] border-black"
                   />
                 )}
               </AnimatePresence>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}