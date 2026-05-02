import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sparkles, Database, Mountain, Hexagon, Feather, MessageCircle } from 'lucide-react';

export default function MythOSModule({ setPage }: { setPage: (p: string) => void }) {
  const [phase, setPhase] = useState<'dump' | 'socratic' | 'result'>('dump');
  const [socraticStep, setSocraticStep] = useState(0);
  const [styleSignature, setStyleSignature] = useState<string>('');

  const questions = [
    {
      q: "If this interface were a physical structure, what is its materiality?",
      optA: { text: "Temple of Data (Glass, Light)", icon: <Database size={48}/>, sig: "Monolith" },
      optB: { text: "Stone & Echoes (Weathered, Tactile)", icon: <Mountain size={48}/>, sig: "Organism" }
    },
    {
      q: "If found in a thrift store in 50 years, why keep it?",
      optA: { text: "Flawless mechanical instrument.", icon: <Hexagon size={48}/>, sig: "High-Tech" },
      optB: { text: "Holds a mythic, ancient energy.", icon: <Feather size={48}/>, sig: "Primordial" }
    }
  ];

  const handleSocraticChoice = (sig: string) => {
    setStyleSignature(prev => prev ? `${prev} + ${sig}` : sig);
    if (socraticStep < questions.length - 1) {
      setSocraticStep(prev => prev + 1);
    } else {
      setPhase('result');
    }
  };

  return (
    <div className="pt-32 pb-24 px-6 bg-[#FF0055] min-h-screen relative text-black overflow-hidden font-sans selection:bg-white selection:text-[#FF0055]">
      {/* Heavy Dot Matrix */}
      <div className="absolute inset-0 opacity-30 mix-blend-multiply" style={{ backgroundImage: 'radial-gradient(circle, #000 3px, transparent 4px)', backgroundSize: '24px 24px' }} />

      <div className="max-w-5xl mx-auto relative z-10">
        
        <header className="mb-16 bg-white border-[12px] border-black p-8 shadow-[20px_20px_0_#FFFF00] relative transform -rotate-1">
          <div className="absolute -top-8 -left-8 bg-[#00FF66] p-6 border-[6px] border-black rounded-full shadow-[8px_8px_0_#000] rotate-[-15deg]">
             <Sparkles size={48} className="text-black" />
          </div>

          <button 
            onClick={() => setPage('home')}
            className="flex items-center gap-2 font-black uppercase mb-8 text-white bg-black hover:bg-[#00E5FF] hover:text-black px-6 py-3 border-[4px] border-black transition-colors w-fit text-sm shadow-[6px_6px_0_#000]"
          >
            <ArrowLeft size={20} /> Back
          </button>

          <h1 className="text-6xl md:text-8xl font-black uppercase leading-none mb-4" style={{ textShadow: '6px 6px 0 #00E5FF, 12px 12px 0 #000' }}>
            Aesthetic<br/>Intelligence
          </h1>
          <div className="bg-black text-[#FFFF00] font-black uppercase px-4 py-2 border-[4px] border-black inline-block transform rotate-2">
            The Socratic Descent!
          </div>
        </header>

        <div className="bg-white border-[12px] border-black p-8 shadow-[24px_24px_0_#000] relative min-h-[500px]">
          <AnimatePresence mode="wait">
            
            {phase === 'dump' && (
              <motion.div key="dump" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-black text-white font-black text-4xl flex items-center justify-center border-[4px] border-[#00E5FF] rotate-6 shadow-[4px_4px_0_#00E5FF]">1</div>
                  <h2 className="text-4xl font-black uppercase">The Brain Dump</h2>
                </div>
                <p className="font-bold text-2xl border-l-[6px] border-black pl-4">Spill your unfiltered creative intent.</p>
                
                <div className="relative group">
                  <div className="absolute -top-4 right-4 bg-[#FF0055] text-white font-black uppercase px-3 py-1 border-[4px] border-black rotate-3 z-10 group-focus-within:rotate-6 transition-transform">Be messy!</div>
                  <textarea 
                    className="w-full h-48 bg-[#E5E5E5] border-[8px] border-black p-6 font-black uppercase text-2xl focus:outline-none focus:bg-white transition-colors resize-none shadow-[8px_8px_0_#000]"
                    placeholder="POUR IT OUT HERE..."
                  />
                </div>
                
                <button 
                  onClick={() => setPhase('socratic')}
                  className="w-full py-6 bg-[#FFFF00] text-black font-black uppercase text-3xl border-[8px] border-black shadow-[12px_12px_0_#000] hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all"
                >
                  Initiate Machine!
                </button>
              </motion.div>
            )}

            {phase === 'socratic' && (
              <motion.div key="socratic" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="space-y-12">
                <div className="flex items-center gap-4 justify-center mb-8">
                  <div className="w-16 h-16 bg-black text-white font-black text-4xl flex items-center justify-center border-[4px] border-[#FF0055] -rotate-6 shadow-[4px_4px_0_#FF0055]">2</div>
                  <h2 className="text-4xl font-black uppercase text-center bg-[#E5E5E5] px-4 py-2 border-[4px] border-black shadow-[6px_6px_0_#000]">This or That?</h2>
                </div>
                
                <h3 className="text-4xl text-center font-black uppercase mb-12" style={{ textShadow: '2px 2px 0 #00E5FF' }}>{questions[socraticStep].q}</h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <button 
                    onClick={() => handleSocraticChoice(questions[socraticStep].optA.sig)}
                    className="group relative p-12 border-[8px] border-black bg-white shadow-[12px_12px_0_#000] hover:shadow-none hover:translate-y-2 hover:translate-x-2 hover:bg-[#00E5FF] transition-all flex flex-col items-center justify-center gap-6"
                  >
                    <div className="text-black group-hover:scale-125 transition-transform">
                      {questions[socraticStep].optA.icon}
                    </div>
                    <span className="font-black uppercase text-2xl text-center leading-none">{questions[socraticStep].optA.text}</span>
                  </button>

                  <button 
                    onClick={() => handleSocraticChoice(questions[socraticStep].optB.sig)}
                    className="group relative p-12 border-[8px] border-black bg-white shadow-[12px_12px_0_#000] hover:shadow-none hover:translate-y-2 hover:translate-x-2 hover:bg-[#00FF66] transition-all flex flex-col items-center justify-center gap-6"
                  >
                    <div className="text-black group-hover:scale-125 transition-transform">
                      {questions[socraticStep].optB.icon}
                    </div>
                    <span className="font-black uppercase text-2xl text-center leading-none">{questions[socraticStep].optB.text}</span>
                  </button>
                </div>
              </motion.div>
            )}

            {phase === 'result' && (
              <motion.div key="result" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="space-y-12 flex flex-col items-center text-center">
                <div className="w-48 h-48 rounded-full border-[12px] border-black bg-[#FFFF00] flex items-center justify-center shadow-[16px_16px_0_#000] animate-bounce">
                  <Sparkles size={80} className="text-black" />
                </div>
                
                <h2 className="text-6xl font-black uppercase" style={{ textShadow: '4px 4px 0 #FF0055' }}>Synthesis Complete!</h2>
                
                <div className="p-8 bg-[#E5E5E5] border-[8px] border-black shadow-[16px_16px_0_#00E5FF] transform -rotate-2 relative w-full max-w-2xl">
                  <div className="absolute -top-6 left-8 bg-black text-white font-black uppercase px-4 py-2 border-[4px] border-white shadow-[6px_6px_0_#FF0055] rotate-3 text-xl">
                    Your True Aesthetic
                  </div>
                  <div className="font-black text-5xl uppercase text-black mt-6 leading-none tracking-tighter text-center">
                    {styleSignature || "High-Tech Primordial"}
                  </div>
                </div>

                <button onClick={() => { setPhase('dump'); setSocraticStep(0); setStyleSignature(''); }} className="bg-black text-[#00FF66] px-8 py-4 border-[6px] border-black font-black uppercase text-3xl hover:bg-white hover:text-black transition-colors shadow-[8px_8px_0_#FF0055]">
                  Start Over!
                </button>
              </motion.div>
            )}
            
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}