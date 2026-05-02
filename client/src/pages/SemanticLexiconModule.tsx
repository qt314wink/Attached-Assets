import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Search } from 'lucide-react';

export default function SemanticLexiconModule({ setPage }: { setPage: (p: string) => void }) {
  const [definition, setDefinition] = useState<'default' | 'userA' | 'userB'>('default');

  return (
    <div className="pt-32 pb-24 px-6 bg-[#f4f2ef] min-h-screen relative text-[#1a1a1a] font-sans">
      <div className="max-w-6xl mx-auto relative z-10">
        <button 
          onClick={() => setPage('home')}
          className="flex items-center gap-2 font-black uppercase mb-12 text-black/50 hover:text-black transition-all w-fit text-xs tracking-widest"
        >
          <ArrowLeft size={16} /> Return to Nexus
        </button>

        <div className="mb-16 text-center max-w-3xl mx-auto">
          <span className="font-black uppercase tracking-[0.3em] text-xs block mb-4 text-[#8b5cf6]">
            // THE DEFINITION LAB
          </span>
          <h1 className="text-5xl md:text-7xl font-black uppercase leading-none mb-6 tracking-tighter text-[#1a1a1a]">
            Personal Lexicon
          </h1>
          <p className="text-xl font-medium text-black/60">
            Words are not universal; they are personal mappings. If the system assumes your definition of "Minimal", it fails. We must bridge the semantic gap.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <button 
            onClick={() => setDefinition('default')}
            className={`p-6 border-2 rounded-2xl text-left transition-all ${definition === 'default' ? 'border-[#8b5cf6] bg-[#8b5cf6]/5 shadow-lg' : 'border-black/10 hover:border-black/30'}`}
          >
            <div className="font-black uppercase text-xs tracking-widest text-[#8b5cf6] mb-2">Unmapped Prompt</div>
            <div className="font-bold text-lg">"Make it minimal"</div>
          </button>
          
          <button 
            onClick={() => setDefinition('userA')}
            className={`p-6 border-2 rounded-2xl text-left transition-all ${definition === 'userA' ? 'border-blue-500 bg-blue-500/5 shadow-lg' : 'border-black/10 hover:border-black/30'}`}
          >
            <div className="font-black uppercase text-xs tracking-widest text-blue-500 mb-2">User A's Lexicon</div>
            <div className="font-bold text-lg">"Cold, white, clinical"</div>
          </button>

          <button 
            onClick={() => setDefinition('userB')}
            className={`p-6 border-2 rounded-2xl text-left transition-all ${definition === 'userB' ? 'border-amber-600 bg-amber-600/5 shadow-lg' : 'border-black/10 hover:border-black/30'}`}
          >
            <div className="font-black uppercase text-xs tracking-widest text-amber-600 mb-2">User B's Lexicon</div>
            <div className="font-bold text-lg">"Warm, textured, natural"</div>
          </button>
        </div>

        <AnimatePresence mode="wait">
          {definition === 'default' && (
            <motion.div key="def" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="h-96 bg-white border border-black/10 rounded-[3rem] flex items-center justify-center p-12 shadow-sm">
              <div className="text-center opacity-40">
                <Search size={48} className="mx-auto mb-4" />
                <h3 className="font-black uppercase tracking-widest text-sm">Aesthetic Ambiguity</h3>
                <p className="mt-2 text-sm max-w-md mx-auto">The system has no baseline for your taste. It will generate generic, sterile outputs.</p>
              </div>
            </motion.div>
          )}

          {definition === 'userA' && (
            <motion.div key="ua" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="h-96 bg-white border border-black/5 rounded-[3rem] flex items-center justify-center p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
              <div className="w-full max-w-md space-y-6">
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="font-sans font-bold tracking-tight">Apple Aesthetic</div>
                  <div className="w-12 h-6 bg-gray-200 rounded-full" />
                </div>
                <div className="space-y-4">
                  <div className="h-2 w-full bg-gray-100 rounded-full" />
                  <div className="h-2 w-2/3 bg-gray-100 rounded-full" />
                </div>
                <button className="px-6 py-2 bg-black text-white text-xs font-bold rounded-full w-fit">
                  Execute
                </button>
              </div>
            </motion.div>
          )}

          {definition === 'userB' && (
            <motion.div key="ub" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="h-96 bg-[#ece8e2] border border-amber-900/10 rounded-[3rem] flex flex-col items-center justify-center p-12 shadow-xl shadow-amber-900/5 font-serif relative overflow-hidden">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-50 mix-blend-multiply pointer-events-none" />
              <div className="w-full max-w-md space-y-8 relative z-10 text-amber-950">
                <div className="text-center space-y-2">
                  <h3 className="text-3xl italic">Warm Minimalism</h3>
                  <p className="font-sans text-sm opacity-60 uppercase tracking-widest">High-Craft & Natural</p>
                </div>
                
                <div className="p-8 border border-amber-900/20 bg-white/40 backdrop-blur rounded-2xl shadow-inner">
                  <p className="text-lg leading-relaxed text-center">Uncluttered space that breathes, utilizing earth tones and tactile textures.</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}