import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, HeartPulse, Wind, Waves, Activity, Brain, Zap, Megaphone } from 'lucide-react';

const SOMATIC_STATES = {
  ventral: {
    id: 'ventral',
    name: 'Safe & Social',
    alias: 'Ventral Vagal',
    description: 'Relaxation and connection! The ideal state for creative engagement. AHHHH!',
    color: 'bg-[#00FF66]',
    shadow: 'shadow-[8px_8px_0_#00E5FF]',
    audioFreq: 432,
    speed: 4,
    scale: [1, 1.05, 1],
    rotation: [0, 2, 0, -2, 0]
  },
  sympathetic: {
    id: 'sympathetic',
    name: 'Activation!',
    alias: 'Sympathetic',
    description: 'The "fight-or-flight" response! Triggered by jarring visual shifts. YIKES!',
    color: 'bg-[#FF0055]',
    shadow: 'shadow-[8px_8px_0_#FFFF00]',
    audioFreq: 852,
    speed: 0.5,
    scale: [0.95, 1.1, 0.95],
    rotation: [0, 5, 0, -5, 0]
  },
  dorsal: {
    id: 'dorsal',
    name: 'Shutdown...',
    alias: 'Dorsal Vagal',
    description: 'Immobilization or dissociation. Occurs when overwhelmed by chaos. ZZZ...',
    color: 'bg-[#33CCFF]',
    shadow: 'shadow-[8px_8px_0_#9900FF]',
    audioFreq: 174,
    speed: 8,
    scale: [0.98, 1, 0.98],
    rotation: [0, 0, 0, 0, 0]
  }
};

export default function SomaticModule({ setPage }: { setPage: (p: string) => void }) {
  const [currentState, setCurrentState] = useState<keyof typeof SOMATIC_STATES>('ventral');
  const [isPlaying, setIsPlaying] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const cycleBreath = () => {
      if (breathPhase === 'inhale') {
        timeout = setTimeout(() => setBreathPhase('hold'), 4000);
      } else if (breathPhase === 'hold') {
        timeout = setTimeout(() => setBreathPhase('exhale'), 4000);
      } else {
        timeout = setTimeout(() => setBreathPhase('inhale'), 6000);
      }
    };
    cycleBreath();
    return () => clearTimeout(timeout);
  }, [breathPhase]);

  const activeState = SOMATIC_STATES[currentState];

  return (
    <div className="min-h-screen bg-[#FFFF00] font-sans selection:bg-black selection:text-[#FFFF00] relative overflow-hidden pb-24">
      {/* Heavy Comic Dot Matrix Background */}
      <div className="absolute inset-0 opacity-30 mix-blend-multiply" style={{ backgroundImage: 'radial-gradient(circle, #000 3px, transparent 4px)', backgroundSize: '20px 20px' }} />

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 relative z-10 pt-8">
        
        <header className="mb-12 bg-white border-[12px] border-black p-8 md:p-12 shadow-[20px_20px_0_#FF0055] relative transform rotate-1 mt-12 flex flex-col md:flex-row justify-between items-start">
          <div className="absolute -top-12 -left-8 bg-[#00E5FF] p-6 border-[8px] border-black rounded-full shadow-[8px_8px_0_#000] rotate-[-15deg]">
            <HeartPulse size={64} className="text-black animate-pulse" />
          </div>
          
          <div>
            <button 
              onClick={() => setPage('home')}
              className="flex items-center gap-2 font-black uppercase mb-6 text-white bg-black hover:bg-[#FF0055] px-6 py-3 border-[4px] border-black transition-colors w-fit text-sm shadow-[6px_6px_0_#000]"
            >
              <ArrowLeft size={20} /> Back
            </button>
            <h1 className="text-6xl md:text-9xl font-black uppercase leading-[0.8] mb-4 tracking-tighter text-black" style={{ textShadow: '6px 6px 0 #00E5FF, 12px 12px 0 #000' }}>
              Somatic<br/>Engine!
            </h1>
            <span className="font-black uppercase tracking-widest text-xl inline-block mt-4 bg-black text-[#FFFF00] px-4 py-2 border-[4px] border-black transform -rotate-2 shadow-[6px_6px_0_#00FF66]">
              Vol 01: The Physical Layer
            </span>
          </div>

          <div className="md:max-w-md mt-8 md:mt-0 text-xl font-black uppercase text-black border-l-[8px] border-[#FF0055] pl-6 bg-[#E5E5E5] p-6 border-r-[8px] border-y-[8px] shadow-[8px_8px_0_#000] transform -rotate-1 relative">
            <div className="absolute -top-4 -right-4 bg-white p-2 border-[4px] border-black shadow-[4px_4px_0_#000] rotate-12">
               <Megaphone size={24} className="text-[#FF0055]" />
            </div>
            Physical UI interactions that obey the laws of digital gravity! A feedback loop bypassing cognitive defenses! ZAP!
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Controls Panel */}
          <div className="lg:col-span-5 flex flex-col gap-12">
            <div className="bg-white border-[12px] border-black p-8 shadow-[16px_16px_0_#000] relative transform -rotate-1 hover:rotate-0 transition-transform">
              <div className="absolute -top-8 left-12 w-12 h-12 bg-white border-l-[8px] border-t-[8px] border-black transform rotate-45" />
              
              <h2 className="text-4xl font-black uppercase tracking-tighter text-black mb-8 flex items-center gap-4" style={{ textShadow: '2px 2px 0 #00E5FF' }}>
                <Activity size={40} className="text-[#FF0055]" /> Select State!
              </h2>
              
              <div className="space-y-6">
                {(Object.keys(SOMATIC_STATES) as Array<keyof typeof SOMATIC_STATES>).map((key) => {
                  const state = SOMATIC_STATES[key];
                  const isActive = currentState === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setCurrentState(key)}
                      className={`w-full text-left p-6 border-[8px] border-black transition-all duration-300 font-black uppercase transform block ${
                        isActive 
                          ? `${state.color} text-black shadow-[8px_8px_0_#000] translate-x-2 -translate-y-2` 
                          : 'bg-[#E5E5E5] text-black hover:bg-white shadow-[4px_4px_0_#000] hover:-translate-y-1 hover:shadow-[6px_6px_0_#000]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-3xl tracking-tighter">{state.name}</span>
                        {isActive && <Zap size={32} className="animate-bounce" />}
                      </div>
                      <p className="text-lg bg-black text-white px-2 py-1 inline-block border-[2px] border-black transform -rotate-1">{state.alias}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-black text-white border-[12px] border-white p-8 shadow-[16px_16px_0_#00E5FF] transform rotate-2">
               <h2 className="text-3xl font-black uppercase tracking-tighter mb-6 flex items-center gap-4" style={{ textShadow: '2px 2px 0 #FF0055' }}>
                <Brain size={40} className="text-[#00FF66]" /> The 4-Step Reset!
              </h2>
              <ul className="space-y-6 text-xl font-black uppercase">
                <li className="flex items-start gap-4 bg-[#FF0055] text-black p-4 border-[6px] border-black shadow-[6px_6px_0_#000] transform -rotate-1">
                  <span className="text-white text-4xl leading-none">1.</span> 
                  <span className="bg-white px-2">Breath: Inhale clarity, exhale tension!</span>
                </li>
                <li className="flex items-start gap-4 bg-[#00E5FF] text-black p-4 border-[6px] border-black shadow-[6px_6px_0_#000] transform rotate-1">
                  <span className="text-white text-4xl leading-none">2.</span> 
                  <span className="bg-white px-2">Awareness: Notice one sensory texture!</span>
                </li>
                <li className="flex items-start gap-4 bg-[#00FF66] text-black p-4 border-[6px] border-black shadow-[6px_6px_0_#000] transform -rotate-1">
                  <span className="text-white text-4xl leading-none">3.</span> 
                  <span className="bg-white px-2">Relational: Recall grounded connection!</span>
                </li>
                <li className="flex items-start gap-4 bg-[#FFFF00] text-black p-4 border-[6px] border-black shadow-[6px_6px_0_#000] transform rotate-1">
                  <span className="text-black text-4xl leading-none">4.</span> 
                  <span className="bg-white px-2">Action: Take one atomic action!</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Visualization Canvas */}
          <div className="lg:col-span-7 relative">
            <div className={`relative w-full aspect-square border-[16px] border-black flex flex-col items-center justify-center shadow-[24px_24px_0_#000] transition-colors duration-1000 overflow-hidden ${activeState.color} ${currentState === 'ventral' ? 'rounded-full' : currentState === 'sympathetic' ? 'rounded-none' : 'rounded-[4rem]'}`}>
              
              {/* Comic Action Lines Background */}
              <div className="absolute inset-0 opacity-30 pointer-events-none mix-blend-overlay">
                 <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                    <path d="M0,0 L100,100 M50,0 L50,100 M100,0 L0,100 M0,50 L100,50" stroke="black" strokeWidth="2" vectorEffect="non-scaling-stroke" className={currentState === 'sympathetic' ? 'origin-center animate-spin' : 'origin-center animate-spin-slow'}/>
                 </svg>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentState}
                  initial={{ scale: 0 }}
                  animate={{ scale: activeState.scale, rotate: activeState.rotation }}
                  exit={{ scale: 0 }}
                  transition={{ duration: activeState.speed, repeat: Infinity, repeatType: 'reverse' }}
                  className="absolute inset-0 flex items-center justify-center z-10"
                >
                  <div className={`w-3/4 h-3/4 border-[24px] border-black border-dashed opacity-80 ${currentState === 'ventral' ? 'rounded-full animate-spin-slow' : currentState === 'sympathetic' ? 'rounded-none animate-ping' : 'rounded-[2rem] opacity-20'}`} />
                </motion.div>
              </AnimatePresence>
              
              {/* Central Information */}
              <div className="relative z-20 text-center space-y-6 bg-white border-[12px] border-black p-10 shadow-[16px_16px_0_#000] max-w-md transform -rotate-3 hover:rotate-0 transition-transform">
                <h3 className="text-6xl font-black uppercase text-black tracking-tighter leading-none" style={{ textShadow: '4px 4px 0 #FF0055' }}>
                  {activeState.name}
                </h3>
                <p className="text-2xl font-black uppercase text-black bg-[#E5E5E5] p-6 border-[6px] border-black">
                  {activeState.description}
                </p>
              </div>

              {/* Breathing Guide Overlay */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center bg-black text-white p-6 border-[8px] border-white shadow-[12px_12px_0_#FF0055] transform rotate-2 min-w-[320px]">
                 <p className="text-xl font-black uppercase tracking-widest mb-6">Respiratory Metronome</p>
                 <div className="flex gap-4 w-full">
                    <div className={`h-6 flex-1 transition-all duration-1000 border-[4px] border-white ${breathPhase === 'inhale' ? 'bg-[#00E5FF] scale-y-150' : 'bg-transparent'}`} />
                    <div className={`h-6 flex-1 transition-all duration-1000 border-[4px] border-white ${breathPhase === 'hold' ? 'bg-[#FF0055] scale-y-150' : 'bg-transparent'}`} />
                    <div className={`h-6 flex-1 transition-all duration-1000 border-[4px] border-white ${breathPhase === 'exhale' ? 'bg-[#FFFF00] scale-y-150' : 'bg-transparent'}`} />
                 </div>
                 <p className="text-4xl font-black uppercase mt-6 text-[#00FF66] tracking-tighter">{breathPhase}!</p>
              </div>

              {/* Audio Toggle */}
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute top-8 right-8 p-6 bg-white border-[8px] border-black hover:-translate-y-2 hover:shadow-[12px_12px_0_#000] transition-all z-30 group shadow-[8px_8px_0_#000]"
              >
                {isPlaying ? <Waves size={48} className="text-[#FF0055] animate-pulse" /> : <Wind size={48} className="text-black group-hover:scale-110 transition-transform" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}