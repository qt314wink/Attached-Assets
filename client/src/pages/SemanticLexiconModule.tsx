import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Network, GitMerge, Bot, ShieldCheck } from 'lucide-react';

export default function SemanticLexiconModule({ setPage }: { setPage: (p: string) => void }) {
  const [selectedPersona, setSelectedPersona] = useState<'scientific' | 'warm'>('scientific');

  return (
    <div className={`pt-32 pb-24 px-6 min-h-screen relative font-sans transition-colors duration-1000 ${selectedPersona === 'scientific' ? 'bg-[#0f172a] text-slate-200' : 'bg-[#fffbeb] text-amber-900'}`}>
      <div className="max-w-6xl mx-auto relative z-10">
        <button 
          onClick={() => setPage('home')}
          className={`flex items-center gap-2 font-black uppercase mb-12 transition-colors w-fit text-sm ${selectedPersona === 'scientific' ? 'text-slate-400 hover:text-white' : 'text-amber-700/50 hover:text-amber-900'}`}
        >
          <ArrowLeft size={16} /> Return to Nexus
        </button>

        <header className="mb-16">
          <span className={`font-black uppercase tracking-[0.3em] text-xs block mb-4 ${selectedPersona === 'scientific' ? 'text-cyan-400' : 'text-amber-500'}`}>
            // REGULATED EMERGENCE
          </span>
          <h1 className="text-5xl md:text-7xl font-black uppercase leading-none mb-6 tracking-tighter">
            Semantic Lexicon
          </h1>
          <p className={`text-xl font-medium max-w-2xl ${selectedPersona === 'scientific' ? 'text-slate-400' : 'text-amber-700/80'}`}>
            Dynamic empathy requires decoupling the reasoning engine from the presentation layer. Toggle the persona below to watch the Knowledge Graph update the aesthetic subgraph in real-time.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Controls */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="font-black uppercase text-sm tracking-widest mb-4">Toggle UI Persona</h3>
            <button 
              onClick={() => setSelectedPersona('scientific')}
              className={`w-full p-6 border-2 text-left transition-all ${selectedPersona === 'scientific' ? 'border-cyan-400 bg-cyan-900/20 text-white' : 'border-amber-900/10 text-amber-900/50 hover:border-amber-900/30'}`}
            >
              <div className="font-black uppercase mb-2 flex items-center gap-2"><Network size={18}/> Scientific Efficacy</div>
              <div className="text-xs font-medium opacity-80">Minimalist space, abstract data visualization, cool tones.</div>
            </button>

            <button 
              onClick={() => setSelectedPersona('warm')}
              className={`w-full p-6 border-2 text-left transition-all ${selectedPersona === 'warm' ? 'border-amber-500 bg-amber-500/10 text-amber-900' : 'border-slate-700 text-slate-500 hover:border-slate-500'}`}
            >
              <div className="font-black uppercase mb-2 flex items-center gap-2"><Heart size={18} /> Warm Human Connection</div>
              <div className="text-xs font-medium opacity-80">Soft lighting, organic curves, earth tones.</div>
            </button>
          </div>

          {/* Display Output */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {selectedPersona === 'scientific' ? (
                <motion.div 
                  key="sci"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-[#1e293b] border border-slate-700 p-12 h-full min-h-[400px] flex flex-col font-mono"
                >
                  <div className="flex justify-between items-center border-b border-slate-700 pb-6 mb-8">
                    <div className="text-cyan-400 font-bold uppercase tracking-widest text-xs">Knowledge Graph Node: 4X-99</div>
                    <GitMerge className="text-slate-500" />
                  </div>
                  <div className="space-y-6 text-sm text-slate-300">
                    <p><strong className="text-cyan-400">STATUS:</strong> Optimal processing capacity reached.</p>
                    <div className="h-2 w-full bg-slate-800 overflow-hidden">
                      <div className="h-full bg-cyan-400 w-[87%]" />
                    </div>
                    <p className="opacity-70">The systemic evaluation indicates a 14% improvement in cognitive load distribution across the active neural network framework.</p>
                  </div>
                  <div className="mt-auto pt-8 flex gap-4">
                    <div className="px-4 py-2 border border-cyan-400/30 text-cyan-400 text-xs">LOG_DATA</div>
                    <div className="px-4 py-2 border border-slate-700 text-slate-500 text-xs">VIEW_MATRIX</div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="warm"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-[3rem] shadow-xl p-12 h-full min-h-[400px] flex flex-col font-serif"
                >
                  <div className="flex justify-between items-center pb-6 mb-8">
                    <div className="text-amber-600 font-bold text-lg italic">Good morning.</div>
                    <Heart className="text-amber-300 fill-amber-300" />
                  </div>
                  <div className="space-y-6 text-lg text-amber-900/80 leading-relaxed">
                    <p>I've noticed you've been carrying a heavy load lately. Let's take a moment to breathe.</p>
                    <div className="h-2 w-full bg-amber-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-amber-300 to-rose-300 w-[87%] rounded-full" />
                    </div>
                    <p>Your resilience is profound. We've mapped out a gentle path forward for today, focusing strictly on what nourishes you.</p>
                  </div>
                  <div className="mt-auto pt-8 flex gap-4 font-sans">
                    <div className="px-6 py-3 bg-amber-100 text-amber-700 rounded-full font-bold text-sm">Review Journey</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function Heart(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round" {...props}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
}