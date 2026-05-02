import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Activity, HeartPulse, BrainCircuit, Droplets, ShieldAlert, Sparkles } from 'lucide-react';

export default function BiomimesisModule({ setPage }: { setPage: (p: string) => void }) {
  const [nervousSystemState, setNervousSystemState] = useState(50); 
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  
  useEffect(() => {
    const cycleLength = nervousSystemState > 70 ? 1500 : 4000; 
    
    const interval = setInterval(() => {
      setBreathingPhase(prev => {
        if (prev === 'inhale') return 'hold';
        if (prev === 'hold') return 'exhale';
        return 'inhale';
      });
    }, cycleLength);

    return () => clearInterval(interval);
  }, [nervousSystemState]);

  const isStressed = nervousSystemState > 70;
  const isChill = nervousSystemState < 30;

  const bgColor = isStressed ? 'bg-[#FF0055]' : (isChill ? 'bg-[#00E5FF]' : 'bg-[#FFFF00]');
  const breathScale = breathingPhase === 'inhale' ? 1.1 : (breathingPhase === 'exhale' ? 0.9 : 1);

  return (
    <div className={`pt-32 pb-24 px-6 min-h-screen transition-colors duration-700 ${bgColor} font-sans overflow-hidden relative selection:bg-black selection:text-white`}>
      {/* Halftone Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'radial-gradient(circle, #000 2px, transparent 2.5px)', backgroundSize: '16px 16px' }} />

      <div className="max-w-6xl mx-auto relative z-10">
        
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 bg-white border-[8px] border-black p-8 shadow-[16px_16px_0_#000] transform -rotate-1 relative">
           {/* Dripping Goo effect */}
           <div className="absolute -bottom-8 left-12 w-16 h-16 bg-white border-[8px] border-black rounded-b-full shadow-[8px_8px_0_#000] -z-10" />
           <div className="absolute -bottom-12 left-32 w-12 h-20 bg-white border-[8px] border-black rounded-b-full shadow-[8px_8px_0_#000] -z-10" />

          <div>
            <button 
              onClick={() => setPage('home')}
              className="flex items-center gap-2 font-black uppercase mb-6 text-white bg-black hover:bg-[#c4ff00] hover:text-black px-4 py-2 border-[4px] border-black transition-colors w-fit text-sm shadow-[4px_4px_0_#000]"
            >
              <ArrowLeft size={16} /> Back
            </button>
            <h1 className="text-6xl md:text-8xl font-black uppercase leading-[0.8] tracking-tighter text-black" style={{ textShadow: '4px 4px 0 #fff, 8px 8px 0 #000' }}>
              Organic<br/>Engine
            </h1>
          </div>
          <div className="mt-6 md:mt-0">
             <div className="bg-black text-[#c4ff00] px-6 py-3 border-[4px] border-black font-black uppercase text-xl shadow-[8px_8px_0_#c4ff00] rotate-3 flex items-center gap-4">
                <HeartPulse className="animate-pulse" />
                Living UI!
             </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white border-[8px] border-black p-8 shadow-[12px_12px_0_#000] relative">
              {/* Comic Action Lines Background */}
              <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay overflow-hidden">
                 <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                    <path d="M0,0 L100,100 M50,0 L50,100 M100,0 L0,100 M0,50 L100,50" stroke="black" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                 </svg>
              </div>

              <h3 className="font-black uppercase mb-6 flex items-center gap-2 text-2xl tracking-tighter relative z-10">
                <Activity size={24} /> Telemetry
              </h3>
              
              <div className="relative z-10">
                <label className="flex justify-between font-black uppercase text-xs mb-4 text-black">
                  <span className="flex items-center gap-2 border-[2px] border-black px-2 bg-gray-100">Arousal</span>
                  <span className="bg-black text-white px-2 border-[2px] border-black">{nervousSystemState}%</span>
                </label>
                <input 
                  type="range" min="0" max="100" value={nervousSystemState} 
                  onChange={(e) => setNervousSystemState(parseInt(e.target.value))}
                  className="w-full h-4 bg-black appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:bg-[#00E5FF] [&::-webkit-slider-thumb]:border-[4px] [&::-webkit-slider-thumb]:border-black cursor-pointer shadow-[0_4px_0_#000]"
                />
                <div className="flex justify-between text-[10px] uppercase font-black mt-4 text-black border-t-[4px] border-dashed border-black pt-2">
                  <span>Ventral (Chill)</span>
                  <span>Sympathetic (Panic!)</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="bg-white border-[6px] border-black p-4 shadow-[8px_8px_0_#000] transform rotate-2">
                  <HeartPulse size={40} className="mb-2 text-[#FF0055]" style={{ animation: `pulse ${isStressed ? 0.5 : (isChill ? 1.5 : 1)}s infinite` }} />
                  <div className="text-4xl font-black">{isStressed ? '140' : (isChill ? '58' : '82')}</div>
                  <div className="text-[10px] uppercase font-black bg-black text-white px-2 inline-block">BPM</div>
               </div>
               <div className="bg-white border-[6px] border-black p-4 shadow-[8px_8px_0_#000] transform -rotate-2">
                  <BrainCircuit size={40} className="mb-2 text-[#00E5FF]" />
                  <div className="text-4xl font-black">{isStressed ? 'HIGH' : (isChill ? 'LOW' : 'MID')}</div>
                  <div className="text-[10px] uppercase font-black bg-black text-white px-2 inline-block">Waves</div>
               </div>
            </div>
          </div>

          {/* Living Canvas */}
          <div className="lg:col-span-8 relative flex items-center justify-center min-h-[500px]">
             
             <motion.div 
               animate={{ scale: breathScale, rotate: isStressed ? [0, 2, -2, 0] : 0 }}
               transition={{ duration: isStressed ? 0.1 : 0.5, ease: "easeInOut", repeat: isStressed ? Infinity : 0 }}
               className={`w-full max-w-lg aspect-square rounded-full border-[12px] border-black flex items-center justify-center relative shadow-[20px_20px_0_rgba(0,0,0,1)] bg-white overflow-hidden`}
             >
               {/* Internal Halftone */}
               <div className="absolute inset-0 opacity-10 mix-blend-multiply" style={{ backgroundImage: 'radial-gradient(circle, #000 2px, transparent 2.5px)', backgroundSize: '16px 16px' }} />

               <AnimatePresence mode="wait">
                 {isStressed && (
                   <motion.div 
                     key="stress"
                     initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.5 }}
                     className="flex flex-col items-center text-center space-y-4 relative z-10"
                   >
                     <div className="bg-black text-white p-4 border-[6px] border-[#FF0055] rounded-full transform -rotate-12 shadow-[8px_8px_0_#FF0055]">
                        <ShieldAlert size={64} className="text-[#FF0055] animate-bounce" />
                     </div>
                     <h2 className="text-4xl font-black uppercase text-black" style={{ textShadow: '2px 2px 0 #FF0055' }}>Overload!</h2>
                     <p className="text-sm font-black uppercase bg-[#FF0055] text-white p-2 border-[4px] border-black shadow-[4px_4px_0_#000] rotate-2">
                       UI Elements Locked! BREATHE!
                     </p>
                     
                     <div className="w-48 h-8 border-[4px] border-black bg-gray-200 overflow-hidden relative">
                        <motion.div 
                          className="absolute left-0 top-0 bottom-0 bg-[#00E5FF] border-r-[4px] border-black"
                          animate={{ width: breathingPhase === 'inhale' ? '100%' : '0%' }}
                          transition={{ duration: 1.5, ease: 'easeInOut' }}
                        />
                     </div>
                   </motion.div>
                 )}

                 {isChill && (
                   <motion.div 
                     key="chill"
                     initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.5 }}
                     className="flex flex-col items-center text-center space-y-4 relative z-10"
                   >
                     <div className="bg-white text-black p-4 border-[6px] border-black rounded-full transform rotate-6 shadow-[8px_8px_0_#00E5FF]">
                        <Droplets size={64} className="text-[#00E5FF]" />
                     </div>
                     <h2 className="text-5xl font-black uppercase text-black" style={{ textShadow: '4px 4px 0 #00E5FF' }}>Flow State</h2>
                     <p className="text-sm font-black uppercase bg-[#00E5FF] text-black p-2 border-[4px] border-black shadow-[4px_4px_0_#000] -rotate-1">
                       All Systems Nominal.
                     </p>
                   </motion.div>
                 )}

                 {!isStressed && !isChill && (
                   <motion.div 
                     key="neutral"
                     initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.5 }}
                     className="flex flex-col items-center text-center space-y-4 relative z-10"
                   >
                     <div className="bg-[#c4ff00] text-black p-4 border-[6px] border-black rounded-full shadow-[8px_8px_0_#000]">
                        <Sparkles size={64} />
                     </div>
                     <h2 className="text-4xl font-black uppercase text-black" style={{ textShadow: '2px 2px 0 #c4ff00' }}>Regulated</h2>
                     <p className="text-sm font-black uppercase bg-black text-white p-2 border-[4px] border-[#c4ff00] shadow-[4px_4px_0_#c4ff00]">
                       Optimal Creation Zone
                     </p>
                   </motion.div>
                 )}
               </AnimatePresence>

             </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}