import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, HeartPulse, Wind, Waves, Activity, Zap, Brain } from 'lucide-react';

const SOMATIC_STATES = {
  ventral: {
    id: 'ventral',
    name: 'Ventral Vagal',
    alias: 'Safe & Social',
    description: 'Relaxation and social connection; the ideal state for creative engagement.',
    color: '#10b981', // emerald
    audioFreq: 432,
    visuals: {
      blur: 20,
      speed: 4,
      scale: [1, 1.05, 1],
      path: 'M 20 50 Q 50 10 80 50 T 140 50'
    }
  },
  sympathetic: {
    id: 'sympathetic',
    name: 'Sympathetic',
    alias: 'Activation',
    description: 'The "fight-or-flight" response triggered by jarring visual shifts or stressors.',
    color: '#ef4444', // red
    audioFreq: 852,
    visuals: {
      blur: 5,
      speed: 0.5,
      scale: [0.95, 1.1, 0.95],
      path: 'M 20 50 L 40 20 L 60 80 L 80 10 L 100 90 L 120 40 L 140 50'
    }
  },
  dorsal: {
    id: 'dorsal',
    name: 'Dorsal Vagal',
    alias: 'Shutdown',
    description: 'Immobilization or dissociation occurring when overwhelmed by chaos.',
    color: '#3b82f6', // blue
    audioFreq: 174,
    visuals: {
      blur: 40,
      speed: 8,
      scale: [0.98, 1, 0.98],
      path: 'M 20 50 L 140 50'
    }
  }
};

let audioCtx: AudioContext | undefined;
let currentOsc: OscillatorNode | undefined;
let currentGain: GainNode | undefined;

const playSomaticSound = (state: keyof typeof SOMATIC_STATES) => {
  if (typeof window === 'undefined') return;
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') audioCtx.resume();

  if (currentOsc) {
    currentOsc.stop();
    currentOsc.disconnect();
  }
  if (currentGain) {
    currentGain.disconnect();
  }

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  const freq = SOMATIC_STATES[state].audioFreq;
  
  if (state === 'ventral') {
    osc.type = 'sine';
    gain.gain.value = 0.1;
  } else if (state === 'sympathetic') {
    osc.type = 'sawtooth';
    gain.gain.value = 0.05;
  } else if (state === 'dorsal') {
    osc.type = 'sine';
    gain.gain.value = 0.2;
    // deep low freq
  }

  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
  osc.start();

  currentOsc = osc;
  currentGain = gain;
};

const stopSound = () => {
  if (currentOsc) {
    currentGain?.gain.exponentialRampToValueAtTime(0.001, audioCtx!.currentTime + 1);
    setTimeout(() => {
      currentOsc?.stop();
      currentOsc?.disconnect();
      currentGain?.disconnect();
    }, 1000);
  }
};

export default function SomaticModule({ setPage }: { setPage: (p: string) => void }) {
  const [currentState, setCurrentState] = useState<keyof typeof SOMATIC_STATES>('ventral');
  const [isPlaying, setIsPlaying] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');

  useEffect(() => {
    if (isPlaying) {
      playSomaticSound(currentState);
    } else {
      stopSound();
    }
    return () => stopSound();
  }, [currentState, isPlaying]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const cycleBreath = () => {
      if (breathPhase === 'inhale') {
        timeout = setTimeout(() => setBreathPhase('hold'), 4000);
      } else if (breathPhase === 'hold') {
        timeout = setTimeout(() => setBreathPhase('exhale'), 4000);
      } else {
        timeout = setTimeout(() => setBreathPhase('inhale'), 6000); // longer exhale for ventral vagal
      }
    };
    cycleBreath();
    return () => clearTimeout(timeout);
  }, [breathPhase]);

  const activeState = SOMATIC_STATES[currentState];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-200 font-sans pt-32 pb-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <button 
          onClick={() => setPage('home')}
          className="flex items-center gap-2 font-black uppercase mb-12 text-slate-500 hover:text-white transition-colors w-fit text-sm tracking-widest"
        >
          <ArrowLeft size={16} /> Return to Nexus
        </button>

        <header className="mb-16">
          <span className="text-emerald-400 font-black uppercase tracking-[0.3em] text-xs block mb-4">
            // POLYVAGAL SAFETY ENGINE
          </span>
          <h1 className="text-5xl md:text-7xl font-black uppercase leading-none mb-6 tracking-tighter text-white">
            Somatic Interoception
          </h1>
          <p className="text-xl font-medium max-w-2xl text-slate-400">
            A feedback loop bypassing cognitive defenses. Utilize Digital Synesthesia to blend sight, sound, and touch into a unified somatic experience.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Controls & Metrics */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
              <h2 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-2">
                <Activity size={16} /> Nervous System State
              </h2>
              
              <div className="space-y-4">
                {(Object.keys(SOMATIC_STATES) as Array<keyof typeof SOMATIC_STATES>).map((key) => {
                  const state = SOMATIC_STATES[key];
                  const isActive = currentState === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setCurrentState(key)}
                      className={`w-full text-left p-4 rounded-xl border transition-all duration-500 ${
                        isActive 
                          ? `bg-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)]` 
                          : 'border-white/5 hover:border-white/20 hover:bg-white/5'
                      }`}
                      style={{ borderColor: isActive ? state.color : undefined }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-lg" style={{ color: isActive ? state.color : '#cbd5e1' }}>
                          {state.name}
                        </span>
                        {isActive && <HeartPulse size={18} color={state.color} className="animate-pulse" />}
                      </div>
                      <p className="text-xs text-slate-400">{state.alias}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
               <h2 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-2">
                <Brain size={16} /> The 4-Step Reset
              </h2>
              <ul className="space-y-4 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 font-bold">1.</span> 
                  <span><strong className="text-white">Breath:</strong> Inhale clarity, exhale tension (longer exhales activate the Vagus nerve).</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 font-bold">2.</span> 
                  <span><strong className="text-white">Awareness:</strong> Notice one color or sensory texture in your immediate environment.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 font-bold">3.</span> 
                  <span><strong className="text-white">Relational Tether:</strong> Recall a moment of safe, grounded connection with another.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 font-bold">4.</span> 
                  <span><strong className="text-white">Creative Ignition:</strong> Take one atomic action toward a meaningful goal.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Visualization Canvas */}
          <div className="lg:col-span-7">
            <div className="relative w-full aspect-square rounded-3xl overflow-hidden bg-black border border-white/10 flex flex-col items-center justify-center group shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentState}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {/* Organic Aura */}
                  <motion.div
                    className="absolute w-[80%] h-[80%] rounded-full opacity-30 mix-blend-screen"
                    style={{
                      background: `radial-gradient(circle, ${activeState.color} 0%, transparent 70%)`,
                      filter: `blur(${activeState.visuals.blur}px)`
                    }}
                    animate={{
                      scale: activeState.visuals.scale,
                      opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{
                      duration: activeState.visuals.speed,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* Frequency Waveform */}
                  <svg className="w-full h-64 absolute z-10 opacity-50" viewBox="0 0 160 100" preserveAspectRatio="none">
                    <motion.path
                      d={activeState.visuals.path}
                      fill="none"
                      stroke={activeState.color}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ 
                        duration: activeState.visuals.speed / 2, 
                        repeat: Infinity, 
                        repeatType: "mirror",
                        ease: "linear"
                      }}
                    />
                  </svg>
                </motion.div>
              </AnimatePresence>
              
              <div className="absolute inset-0 bg-[url('/crunchy-texture.png')] opacity-20 mix-blend-overlay pointer-events-none" />

              {/* Central Information */}
              <div className="relative z-20 text-center space-y-4">
                <p className="text-xs font-black uppercase tracking-[0.4em] text-white/50">
                  Current State
                </p>
                <h3 className="text-3xl md:text-5xl font-black text-white mix-blend-difference drop-shadow-lg">
                  {activeState.name}
                </h3>
                <p className="text-sm max-w-sm mx-auto text-white/80 px-6">
                  {activeState.description}
                </p>
              </div>

              {/* Breathing Guide Overlay */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
                 <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-3">Respiratory Metronome</p>
                 <div className="flex gap-2">
                    <div className={`h-1 w-12 rounded-full transition-all duration-1000 ${breathPhase === 'inhale' ? 'bg-white' : 'bg-white/20'}`} />
                    <div className={`h-1 w-12 rounded-full transition-all duration-1000 ${breathPhase === 'hold' ? 'bg-white' : 'bg-white/20'}`} />
                    <div className={`h-1 w-12 rounded-full transition-all duration-1000 ${breathPhase === 'exhale' ? 'bg-white' : 'bg-white/20'}`} />
                 </div>
                 <p className="text-xs font-bold uppercase mt-2 text-white/80">{breathPhase}</p>
              </div>

              {/* Audio Toggle */}
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute top-6 right-6 p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors z-30"
              >
                {isPlaying ? <Waves size={20} className="text-emerald-400" /> : <Wind size={20} className="text-slate-400" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}