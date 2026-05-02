import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sparkles, Database, Mountain, Hexagon, Feather } from 'lucide-react';

export default function MythOSModule({ setPage }: { setPage: (p: string) => void }) {
  const [phase, setPhase] = useState<'dump' | 'socratic' | 'lexicon' | 'result'>('dump');
  const [socraticStep, setSocraticStep] = useState(0);
  const [styleSignature, setStyleSignature] = useState<string>('');

  const questions = [
    {
      q: "If this interface were a physical structure, what is its materiality?",
      optA: { text: "Temple of Data (Glass, Light, Silence)", icon: <Database />, sig: "Monolith" },
      optB: { text: "Stone & Echoes (Weathered, Heavy, Tactile)", icon: <Mountain />, sig: "Organism" }
    },
    {
      q: "If found in a thrift store in 50 years, why would someone keep it?",
      optA: { text: "Because it's a flawless mechanical instrument.", icon: <Hexagon />, sig: "High-Tech" },
      optB: { text: "Because it holds a mythic, ancient energy.", icon: <Feather />, sig: "Primordial" }
    }
  ];

  const handleSocraticChoice = (sig: string) => {
    setStyleSignature(prev => prev ? `${prev} + ${sig}` : sig);
    if (socraticStep < questions.length - 1) {
      setSocraticStep(prev => prev + 1);
    } else {
      setPhase('lexicon');
    }
  };

  return (
    <div className="pt-32 pb-24 px-6 bg-[#0a0a0a] min-h-screen relative text-slate-200 overflow-hidden font-serif">
      <div className="max-w-4xl mx-auto relative z-10">
         <button 
          onClick={() => setPage('home')}
          className="flex items-center gap-2 font-sans font-black uppercase mb-12 text-slate-500 hover:text-white transition-all w-fit text-xs tracking-widest"
        >
          <ArrowLeft size={16} /> Return to Nexus
        </button>

        <header className="mb-16 text-center">
          <h1 className="text-5xl md:text-7xl font-light italic mb-4">Aesthetic Intelligence</h1>
          <p className="text-sm font-sans tracking-[0.3em] uppercase text-indigo-400">The Socratic Descent</p>
        </header>

        <AnimatePresence mode="wait">
          {phase === 'dump' && (
            <motion.div key="dump" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
              <h2 className="text-2xl text-center italic text-slate-300">Phase 1: The Sacred Dump</h2>
              <p className="text-center font-sans text-sm text-slate-500">Provide your messiest, noisiest intent. The system will witness it.</p>
              <textarea 
                className="w-full h-48 bg-white/5 border border-white/10 rounded-xl p-6 font-sans text-slate-300 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                placeholder="Pour your unrefined ideas here..."
              />
              <button 
                onClick={() => setPhase('socratic')}
                className="w-full py-4 bg-indigo-600/20 text-indigo-400 font-sans font-black uppercase text-xs tracking-widest rounded-xl hover:bg-indigo-600 hover:text-white transition-all border border-indigo-500/30"
              >
                Initiate Alchemical Machine
              </button>
            </motion.div>
          )}

          {phase === 'socratic' && (
            <motion.div key="socratic" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="space-y-12">
              <div className="text-center space-y-2">
                <h2 className="text-2xl italic text-slate-300">Phase 2: "This or That"</h2>
                <p className="font-sans text-xs text-slate-500 uppercase tracking-widest">Identifying the Negative Space</p>
              </div>
              <h3 className="text-3xl text-center font-light mb-12">{questions[socraticStep].q}</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <button 
                  onClick={() => handleSocraticChoice(questions[socraticStep].optA.sig)}
                  className="group relative p-12 border-2 border-white/5 hover:border-indigo-500 bg-white/5 hover:bg-indigo-900/20 rounded-2xl transition-all flex flex-col items-center justify-center gap-6"
                >
                  <div className="text-slate-600 group-hover:text-indigo-400 transition-colors">
                    {questions[socraticStep].optA.icon}
                  </div>
                  <span className="font-sans font-bold text-sm text-center">{questions[socraticStep].optA.text}</span>
                </button>
                <button 
                  onClick={() => handleSocraticChoice(questions[socraticStep].optB.sig)}
                  className="group relative p-12 border-2 border-white/5 hover:border-rose-500 bg-white/5 hover:bg-rose-900/20 rounded-2xl transition-all flex flex-col items-center justify-center gap-6"
                >
                  <div className="text-slate-600 group-hover:text-rose-400 transition-colors">
                    {questions[socraticStep].optB.icon}
                  </div>
                  <span className="font-sans font-bold text-sm text-center">{questions[socraticStep].optB.text}</span>
                </button>
              </div>
            </motion.div>
          )}

          {phase === 'lexicon' && (
            <motion.div key="lexicon" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8 text-center">
              <h2 className="text-3xl italic text-slate-300">Phase 3: The Definition Lab</h2>
              <p className="text-lg text-slate-500 font-sans">You seek the <strong className="text-white">"Minimal"</strong> aesthetic. We must map your semantic dialect.</p>
              <div className="p-8 bg-indigo-900/10 border border-indigo-500/20 rounded-2xl space-y-6 max-w-xl mx-auto">
                <p className="font-sans text-sm text-indigo-300">Does "Minimal" mean...</p>
                <div className="grid gap-4">
                  <button onClick={() => setPhase('result')} className="p-4 bg-black/40 border border-white/10 hover:border-white/50 rounded-lg font-sans text-sm transition-all text-left">
                    A. Cold, white, and clinical (Apple Aesthetic)
                  </button>
                  <button onClick={() => setPhase('result')} className="p-4 bg-black/40 border border-white/10 hover:border-white/50 rounded-lg font-sans text-sm transition-all text-left">
                    B. Warm, high-craft, and natural (Uncluttered but textured)
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {phase === 'result' && (
            <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8 text-center">
              <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-indigo-500 to-rose-500 flex items-center justify-center mb-8 animate-pulse shadow-[0_0_50px_rgba(99,102,241,0.4)]">
                <Sparkles size={48} className="text-white" />
              </div>
              <h2 className="text-4xl italic text-white">The Threshold Reached</h2>
              <p className="text-xl text-slate-400 font-sans">
                You are no longer an operator. You are an orchestrator.
              </p>
              <div className="p-6 bg-white/5 border border-white/10 rounded-xl inline-block text-left mt-8">
                <div className="text-[10px] font-sans uppercase tracking-widest text-slate-500 mb-2">Your Derived Style Signature</div>
                <div className="font-black text-2xl font-sans text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-rose-400">
                  {styleSignature || "High-Tech Primordial"}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}