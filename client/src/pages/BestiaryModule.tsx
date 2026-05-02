import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, EyeOff, ShieldCheck, Zap, HeartPulse, Activity } from 'lucide-react';

export default function BestiaryModule({ setPage }: { setPage: (p: string) => void }) {
  const [battleState, setBattleState] = useState<'intro' | 'choice' | 'victory' | 'sympathetic' | 'ventral'>('intro');
  const [breathingStep, setBreathingStep] = useState(0);

  const handleChoice = (isCorrect: boolean) => {
    if (isCorrect) {
      setBattleState('victory');
    } else {
      setBattleState('sympathetic');
    }
  };

  useEffect(() => {
    if (battleState === 'sympathetic') {
      // Audio cue for fast heartbeat could be added here
    }
  }, [battleState]);

  const handleBreathe = () => {
    if (breathingStep < 3) {
      setBreathingStep(prev => prev + 1);
    } else {
      setBattleState('ventral');
      setTimeout(() => setBattleState('choice'), 2000);
      setBreathingStep(0);
    }
  };

  return (
    <div className={`pt-32 pb-24 px-6 min-h-screen relative text-white overflow-hidden transition-colors duration-1000 ${battleState === 'sympathetic' ? 'bg-[#2a0808]' : 'bg-[#050505]'}`}>
      {battleState === 'sympathetic' && (
        <motion.div 
          className="absolute inset-0 bg-red-500/10 pointer-events-none z-50 mix-blend-overlay"
          animate={{ x: [-10, 10, -10] }}
          transition={{ repeat: Infinity, duration: 0.1 }}
        />
      )}

      <div className="max-w-4xl mx-auto relative z-10">
        <button 
          onClick={() => setPage('home')}
          className="flex items-center gap-2 font-black uppercase mb-8 text-white/50 hover:text-white transition-colors w-fit text-sm"
        >
          <ArrowLeft size={16} /> Retreat to Systems
        </button>

        <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-4">
          <div>
            <span className={`font-black uppercase tracking-[0.5em] text-xs block mb-2 ${battleState === 'sympathetic' ? 'text-red-500' : 'text-emerald-500'}`}>
              // POLYVAGAL COMBAT ENGINE
            </span>
            <h1 className="text-5xl font-black uppercase italic leading-none">
              DISTORTION ENCOUNTER
            </h1>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Enemy View */}
          <div className="relative">
            <motion.div 
              className={`aspect-square brutalist-border border-4 flex flex-col items-center justify-center p-8 transition-all duration-300 ${battleState === 'victory' ? 'bg-[#c4ff00] border-black text-black' : battleState === 'sympathetic' ? 'bg-red-950 border-red-500' : 'bg-black border-white text-white'}`}
              animate={battleState === 'sympathetic' ? { scale: [1, 1.05, 1], rotate: [0, 1, -1, 0] } : {}}
              transition={{ repeat: battleState === 'sympathetic' ? Infinity : 0, duration: 0.2 }}
            >
              {battleState === 'victory' ? (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center">
                  <ShieldCheck size={64} className="mx-auto mb-4" />
                  <h3 className="font-black uppercase text-2xl">INTEGRATED</h3>
                  <p className="text-xs font-bold mt-2 opacity-80">Ventral Vagal Safety Achieved</p>
                </motion.div>
              ) : (
                <>
                  <motion.div 
                    animate={battleState === 'sympathetic' ? { scale: [1, 1.2, 1] } : { y: [-5, 5, -5] }} 
                    transition={battleState === 'sympathetic' ? { repeat: Infinity, duration: 0.3 } : { repeat: Infinity, duration: 3 }}
                    className={battleState === 'sympathetic' ? "text-red-500" : "text-white"}
                  >
                    <EyeOff size={64} />
                  </motion.div>
                  <h2 className="mt-8 text-2xl font-black uppercase text-center">The Invisible Achiever</h2>
                  <div className="mt-4 text-xs font-mono text-center opacity-50 px-4">
                    Feeds on your hesitation to claim space.
                  </div>
                </>
              )}
            </motion.div>
          </div>

          {/* Action View */}
          <div className="flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {battleState === 'intro' && (
                <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <p className="text-lg font-bold mb-8 text-gray-400">
                    A distortion materializes. It is a manifestation of your own hesitation. Your nervous system detects a threat.
                  </p>
                  <button 
                    onClick={() => setBattleState('choice')}
                    className="w-full bg-white text-black py-4 font-black uppercase hover:bg-emerald-400 transition-colors"
                  >
                    Engage
                  </button>
                </motion.div>
              )}

              {battleState === 'choice' && (
                <motion.div key="choice" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="space-y-4">
                  <h3 className="font-black uppercase text-sm mb-6 text-gray-500 flex items-center gap-2">
                    <Activity size={16} /> Select Stance (Ventral Tone Check):
                  </h3>
                  {[
                    { text: "Apologize for interrupting.", correct: false },
                    { text: "Magnetic pull toward creation (Speak clearly).", correct: true }
                  ].map((choice, i) => (
                    <button 
                      key={i}
                      onClick={() => handleChoice(choice.correct)}
                      className="w-full text-left p-4 brutalist-border border-2 border-white/20 hover:border-white hover:bg-white hover:text-black transition-all font-bold group flex justify-between items-center"
                    >
                      <span>{choice.text}</span>
                      <Zap size={16} className="opacity-0 group-hover:opacity-100" />
                    </button>
                  ))}
                </motion.div>
              )}

              {battleState === 'sympathetic' && (
                <motion.div key="sympathetic" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center space-y-6">
                  <div className="text-4xl font-black uppercase text-red-500 mb-2">SYMPATHETIC HIJACK</div>
                  <p className="text-red-200/70 font-mono text-sm mb-8">Fight-or-flight triggered. The distortion feeds on your dysregulation.</p>
                  
                  <div className="p-6 border border-red-500/30 bg-red-900/20 rounded-xl">
                    <HeartPulse size={32} className="mx-auto text-red-400 animate-pulse mb-4" />
                    <p className="font-bold text-sm mb-6">Somatic Coherence Required.</p>
                    <button 
                      onClick={handleBreathe}
                      className="w-full py-4 border-2 border-red-500 text-red-400 font-black uppercase hover:bg-red-500 hover:text-white transition-all active:scale-95"
                    >
                      {breathingStep === 0 ? "Inhale (4s)" : breathingStep === 1 ? "Hold (4s)" : breathingStep === 2 ? "Exhale (6s)" : "Hold (2s)"}
                    </button>
                    <div className="flex gap-2 justify-center mt-4">
                      {[0,1,2,3].map(step => (
                        <div key={step} className={`h-2 w-8 rounded-full ${step < breathingStep ? 'bg-red-500' : 'bg-red-950'}`} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {battleState === 'ventral' && (
                <motion.div key="ventral" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center space-y-6">
                  <div className="text-4xl font-black uppercase text-emerald-500 mb-2">VENTRAL VAGAL</div>
                  <p className="text-emerald-200/70 font-mono text-sm">Nervous system regulated. Safety established. Returning to combat...</p>
                </motion.div>
              )}

              {battleState === 'victory' && (
                <motion.div key="victory" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <p className="text-xl font-bold text-[#c4ff00]">
                    You held your ground from a state of regulated safety. The distortion dissolves.
                  </p>
                  <button 
                    onClick={() => {
                      setBattleState('intro');
                    }}
                    className="w-full bg-transparent border-2 border-[#c4ff00] text-[#c4ff00] py-4 font-black uppercase hover:bg-[#c4ff00] hover:text-black transition-colors"
                  >
                    Next Encounter
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}