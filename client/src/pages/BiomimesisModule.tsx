import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Activity, Battery, Volume2, Shield, HeartPulse, BrainCircuit, Droplets } from 'lucide-react';

export default function BiomimesisModule({ setPage }: { setPage: (p: string) => void }) {
  const [heartRate, setHeartRate] = useState(60); // BPM
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  
  // Sympathetic (Fight/Flight) vs Parasympathetic (Rest/Digest)
  const [nervousSystemState, setNervousSystemState] = useState(50); // 0 = Parasympathetic (Chill), 100 = Sympathetic (Stressed)

  // Simulation of breath cycle based on nervous system state
  useEffect(() => {
    const cycleLength = nervousSystemState > 70 ? 2000 : 4000; // Faster breathing when stressed
    
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

  // The UI adapts to the simulated physiological state
  const bgColor = isStressed ? 'bg-[#1a0f0f]' : (isChill ? 'bg-[#f0f4f8]' : 'bg-[#1a1a1a]');
  const textColor = isStressed ? 'text-[#ff4d4d]' : (isChill ? 'text-slate-600' : 'text-slate-300');
  const accentColor = isStressed ? 'bg-[#ff4d4d]' : (isChill ? 'bg-[#4fd1c5]' : 'bg-[#c4ff00]');
  const borderColor = isStressed ? 'border-[#ff4d4d]/30' : (isChill ? 'border-[#4fd1c5]/30' : 'border-[#c4ff00]/30');

  // Breathing animation logic
  const breathScale = breathingPhase === 'inhale' ? 1.05 : (breathingPhase === 'exhale' ? 0.95 : 1);

  return (
    <div className={`pt-32 pb-24 px-6 min-h-screen transition-colors duration-1000 ${bgColor} ${textColor} font-sans overflow-hidden relative`}>
      {/* Organic Background Noise/Texture */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <button 
          onClick={() => setPage('home')}
          className={`flex items-center gap-2 font-black uppercase mb-12 px-4 py-2 border-2 transition-all w-fit text-xs tracking-widest hover:bg-white/10 ${borderColor}`}
        >
          <ArrowLeft size={16} /> Return to Nexus
        </button>

        <div className="mb-16">
           <span className="font-black uppercase tracking-[0.3em] text-xs block mb-4 opacity-70">
            // ORGANIC INTERFACES
          </span>
          <h1 className="text-5xl md:text-7xl font-black uppercase leading-none mb-6 tracking-tighter">
            Biomimetic<br/>Engine
          </h1>
          <p className="text-xl font-medium max-w-2xl opacity-80">
            The UI breathes. It senses physiological arousal and alters its layout, pacing, and color science to regulate the user's nervous system.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Diagnostic Controls */}
          <div className="lg:col-span-4 space-y-8">
            <div className={`p-8 rounded-3xl border transition-all duration-1000 ${borderColor} backdrop-blur-md bg-white/5`}>
              <h3 className="font-black uppercase mb-6 flex items-center gap-2 text-sm tracking-widest">
                <Activity size={18} /> Telemetry Override
              </h3>
              
              <div>
                <label className="flex justify-between font-bold uppercase text-xs mb-4">
                  <span className="flex items-center gap-2">Nervous System Arousal</span>
                  <span>{nervousSystemState}%</span>
                </label>
                <input 
                  type="range" min="0" max="100" value={nervousSystemState} 
                  onChange={(e) => setNervousSystemState(parseInt(e.target.value))}
                  className="w-full accent-current h-1 bg-white/10 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-current [&::-webkit-slider-thumb]:rounded-full cursor-pointer"
                />
                <div className="flex justify-between text-[10px] uppercase font-bold mt-2 opacity-50">
                  <span>Ventral Vagal (Safe)</span>
                  <span>Sympathetic (Fight/Flight)</span>
                </div>
              </div>
            </div>

            {/* Simulated Bio-Metrics */}
            <div className="grid grid-cols-2 gap-4">
               <div className={`p-6 rounded-2xl border transition-all duration-1000 ${borderColor} bg-white/5`}>
                  <HeartPulse className="mb-4 opacity-50 animate-pulse" />
                  <div className="text-2xl font-black">{isStressed ? '124' : (isChill ? '58' : '82')} <span className="text-xs uppercase opacity-50">BPM</span></div>
                  <div className="text-[10px] uppercase font-bold mt-1 opacity-50">Heart Rate</div>
               </div>
               <div className={`p-6 rounded-2xl border transition-all duration-1000 ${borderColor} bg-white/5`}>
                  <BrainCircuit className="mb-4 opacity-50" />
                  <div className="text-2xl font-black">{isStressed ? 'High' : (isChill ? 'Alpha' : 'Beta')}</div>
                  <div className="text-[10px] uppercase font-bold mt-1 opacity-50">Brainwaves</div>
               </div>
            </div>
          </div>

          {/* Sentient UI Display */}
          <div className="lg:col-span-8 flex items-center justify-center min-h-[500px] relative">
            
            {/* The "Breathing" Container */}
            <motion.div 
              animate={{ 
                scale: breathScale,
                boxShadow: isStressed 
                  ? '0 0 100px rgba(255, 77, 77, 0.1)' 
                  : (isChill ? '0 0 50px rgba(79, 209, 197, 0.2)' : '0 0 40px rgba(196, 255, 0, 0.1)')
              }}
              transition={{ duration: isStressed ? 1 : 2, ease: 'easeInOut' }}
              className={`w-full max-w-lg p-12 rounded-[3rem] border backdrop-blur-xl transition-colors duration-1000 ${borderColor} ${isChill ? 'bg-white/40' : 'bg-black/40'}`}
            >
              
              <AnimatePresence mode="wait">
                {isStressed && (
                  <motion.div 
                    key="stress"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="flex flex-col items-center text-center space-y-6"
                  >
                    <div className="w-24 h-24 rounded-full bg-[#ff4d4d]/20 flex items-center justify-center border border-[#ff4d4d]/50">
                      <Shield className="text-[#ff4d4d] w-10 h-10" />
                    </div>
                    <h2 className="text-3xl font-black uppercase tracking-tight text-[#ff4d4d]">Cognitive Overload</h2>
                    <p className="text-sm opacity-80 max-w-xs">
                      We've detected high arousal. Extraneous UI elements have been disabled to prevent sympathetic hijack. Follow the breathing ring.
                    </p>
                    <div className="w-full h-2 bg-[#ff4d4d]/20 rounded-full overflow-hidden mt-8">
                       <motion.div 
                         className="h-full bg-[#ff4d4d]"
                         animate={{ width: breathingPhase === 'inhale' ? '100%' : '0%' }}
                         transition={{ duration: 2, ease: 'easeInOut' }}
                       />
                    </div>
                  </motion.div>
                )}

                {isChill && (
                  <motion.div 
                    key="chill"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="flex flex-col items-center text-center space-y-6"
                  >
                    <div className="w-24 h-24 rounded-full bg-[#4fd1c5]/20 flex items-center justify-center border border-[#4fd1c5]/50">
                      <Droplets className="text-[#4fd1c5] w-10 h-10" />
                    </div>
                    <h2 className="text-3xl font-black uppercase tracking-tight text-slate-800">Flow State</h2>
                    <p className="text-sm opacity-80 max-w-xs text-slate-600">
                      Ventral vagal tone established. Complex data visualization and creative tooling unlocked. Safe to explore.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 w-full mt-8">
                      <div className="p-4 bg-white/50 rounded-xl border border-slate-200 shadow-sm text-left">
                        <div className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-1">Module 1</div>
                        <div className="font-black text-slate-700">Deep Work</div>
                      </div>
                      <div className="p-4 bg-white/50 rounded-xl border border-slate-200 shadow-sm text-left">
                        <div className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-1">Module 2</div>
                        <div className="font-black text-slate-700">Creation</div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {!isStressed && !isChill && (
                  <motion.div 
                    key="neutral"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="flex flex-col items-center text-center space-y-6"
                  >
                    <div className="w-24 h-24 rounded-full bg-[#c4ff00]/20 flex items-center justify-center border border-[#c4ff00]/50">
                      <Activity className="text-[#c4ff00] w-10 h-10" />
                    </div>
                    <h2 className="text-3xl font-black uppercase tracking-tight text-white">Baseline Status</h2>
                    <p className="text-sm opacity-80 max-w-xs text-slate-400">
                      Systems operating at nominal capacity. The environment is responsive and alert.
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