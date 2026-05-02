import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Skull, ShieldBan, EyeOff, ShieldCheck, Zap } from 'lucide-react';

export default function BestiaryModule({ setPage }: { setPage: (p: string) => void }) {
  const [activeDistortion, setActiveDistortion] = useState(0);
  const [battleState, setBattleState] = useState<'intro' | 'choice' | 'victory' | 'defeat'>('intro');
  const [glitchIntensity, setGlitchIntensity] = useState(0);

  const distortions = [
    {
      id: "D-01",
      name: "The Invisible Achiever",
      icon: <EyeOff size={48} />,
      desc: "Every room you entered without leaving evidence. It feeds on your hesitation to claim space.",
      whisper: "\"Why speak? They won't listen anyway.\"",
      choices: [
        { text: "Remain quiet and observe.", correct: false, response: "It grows larger, feeding on your silence." },
        { text: "Apologize for interrupting.", correct: false, response: "It solidifies, armor made of your apologies." },
        { text: "Magnetic pull toward creation (Speak clearly).", correct: true, response: "It shatters. Your hesitation becomes fuel." }
      ]
    },
    {
      id: "D-02",
      name: "The Worthless Engine",
      icon: <Skull size={48} />,
      desc: "Materializes when you wait for permission. Not attacking. Waiting.",
      whisper: "\"Someone else is already doing it better.\"",
      choices: [
        { text: "Precise forward step (Challenge territory).", correct: true, response: "It bows. The waiting is over." },
        { text: "Analyze other people's work first.", correct: false, response: "It drains your energy, feeding on comparison." },
        { text: "Wait for the perfect moment.", correct: false, response: "The moment passes. It smiles." }
      ]
    }
  ];

  const handleChoice = (isCorrect: boolean) => {
    if (isCorrect) {
      setBattleState('victory');
      setGlitchIntensity(0);
    } else {
      setGlitchIntensity(prev => prev + 2);
      setBattleState('defeat');
      setTimeout(() => setBattleState('choice'), 2000);
    }
  };

  const currentD = distortions[activeDistortion];

  return (
    <div className="pt-32 pb-24 px-6 bg-[#050505] min-h-screen relative text-white overflow-hidden">
      {/* Glitch Overlay */}
      {glitchIntensity > 0 && (
        <motion.div 
          className="absolute inset-0 bg-red-500/10 pointer-events-none z-50 mix-blend-overlay"
          animate={{ x: [-glitchIntensity, glitchIntensity, -glitchIntensity] }}
          transition={{ repeat: Infinity, duration: 0.1 }}
        />
      )}

      <div className="max-w-4xl mx-auto relative z-10">
        <button 
          onClick={() => setPage('home')}
          className="flex items-center gap-2 font-black uppercase mb-8 text-white hover:text-[#ff6b6b] transition-colors w-fit"
        >
          <ArrowLeft size={16} /> Retreat to Systems
        </button>

        <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-4">
          <div>
            <span className="text-[#ff6b6b] font-black uppercase tracking-[0.5em] text-xs block mb-2">
              // COMBAT SIMULATION
            </span>
            <h1 className="text-5xl font-black uppercase italic leading-none">
              DISTORTION ENCOUNTER
            </h1>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-mono text-gray-500">ENTITY ID</div>
            <div className="font-black text-2xl text-[#22d3ee]">{currentD.id}</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Enemy View */}
          <div className="relative">
            <motion.div 
              className={`aspect-square brutalist-border border-4 flex flex-col items-center justify-center p-8 transition-all duration-300 ${battleState === 'victory' ? 'bg-[#c4ff00] border-black text-black' : 'bg-black border-white text-white'}`}
              animate={battleState === 'defeat' ? { x: [-10, 10, -10, 10, 0], scale: 1 + (glitchIntensity * 0.05) } : {}}
            >
              {battleState === 'victory' ? (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center">
                  <ShieldCheck size={64} className="mx-auto mb-4" />
                  <h3 className="font-black uppercase text-2xl">INTEGRATED</h3>
                  <p className="text-xs font-bold mt-2 opacity-80">Companion Unlocked</p>
                </motion.div>
              ) : (
                <>
                  <motion.div 
                    animate={{ y: [-5, 5, -5] }} 
                    transition={{ repeat: Infinity, duration: 3 }}
                    className={glitchIntensity > 0 ? "text-[#ff6b6b]" : "text-white"}
                  >
                    {currentD.icon}
                  </motion.div>
                  <h2 className="mt-8 text-2xl font-black uppercase text-center">{currentD.name}</h2>
                  <div className="mt-4 text-xs font-mono text-center opacity-50 px-4">
                    {currentD.desc}
                  </div>
                </>
              )}
            </motion.div>

            {battleState !== 'victory' && (
              <div className="mt-6 bg-[#ff6b6b]/10 border border-[#ff6b6b] p-4 text-center">
                <span className="font-mono text-xs text-[#ff6b6b]">&gt; {currentD.whisper}</span>
              </div>
            )}
          </div>

          {/* Action View */}
          <div className="flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {battleState === 'intro' && (
                <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <p className="text-lg font-bold mb-8 text-gray-400">
                    A distortion materializes in the architecture. It is a manifestation of your own hesitation. How do you respond?
                  </p>
                  <button 
                    onClick={() => setBattleState('choice')}
                    className="w-full bg-white text-black py-4 font-black uppercase hover:bg-[#22d3ee] transition-colors"
                  >
                    Engage
                  </button>
                </motion.div>
              )}

              {battleState === 'choice' && (
                <motion.div key="choice" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="space-y-4">
                  <h3 className="font-black uppercase text-sm mb-6 text-gray-500">Select Stance:</h3>
                  {currentD.choices.map((choice, i) => (
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

              {battleState === 'defeat' && (
                <motion.div key="defeat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                  <div className="text-4xl font-black uppercase text-[#ff6b6b] mb-4">INEFFECTIVE</div>
                  <p className="text-gray-400 font-mono text-sm">The distortion absorbs your response and grows stronger.</p>
                </motion.div>
              )}

              {battleState === 'victory' && (
                <motion.div key="victory" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <p className="text-xl font-bold text-[#c4ff00]">
                    You did not fight. You witnessed. The distortion is now a recognized part of your arsenal.
                  </p>
                  <button 
                    onClick={() => {
                      setActiveDistortion(1);
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