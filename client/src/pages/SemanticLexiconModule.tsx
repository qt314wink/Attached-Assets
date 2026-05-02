import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Search, BookOpen, AlertTriangle } from 'lucide-react';

export default function SemanticLexiconModule({ setPage }: { setPage: (p: string) => void }) {
  const [definition, setDefinition] = useState<'default' | 'userA' | 'userB'>('default');

  return (
    <div className="pt-32 pb-24 px-6 bg-[#FFFF00] min-h-screen relative text-black font-sans selection:bg-black selection:text-[#FFFF00]">
      {/* Halftone Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'radial-gradient(circle, #000 2px, transparent 2.5px)', backgroundSize: '16px 16px' }} />

      <div className="max-w-6xl mx-auto relative z-10">
        
        <header className="mb-16 bg-white border-[12px] border-black p-8 shadow-[20px_20px_0_#FF0055] relative transform -rotate-1">
          <div className="absolute -top-8 -left-8 bg-[#00E5FF] p-4 border-[6px] border-black shadow-[8px_8px_0_#000] rotate-[-10deg]">
             <BookOpen size={48} className="text-black" />
          </div>

          <button 
            onClick={() => setPage('home')}
            className="flex items-center gap-2 font-black uppercase mb-8 text-white bg-black hover:bg-[#00FF66] hover:text-black px-6 py-3 border-[4px] border-black transition-colors w-fit text-sm shadow-[6px_6px_0_#000]"
          >
            <ArrowLeft size={20} /> Back
          </button>

          <h1 className="text-6xl md:text-8xl font-black uppercase leading-none mb-4" style={{ textShadow: '6px 6px 0 #00E5FF, 12px 12px 0 #000' }}>
            Semantic<br/>Lexicon
          </h1>
          <p className="bg-black text-[#FFFF00] font-black uppercase px-6 py-3 border-[4px] border-black inline-block transform rotate-2 text-xl shadow-[8px_8px_0_#00FF66] mt-4">
            Words are personal mappings!
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <button 
            onClick={() => setDefinition('default')}
            className={`p-8 border-[8px] border-black transition-all shadow-[12px_12px_0_#000] text-left relative overflow-hidden group ${definition === 'default' ? 'bg-white translate-x-2 translate-y-2 shadow-none' : 'bg-gray-100 hover:bg-white hover:-translate-y-1'}`}
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-[#FF0055] rounded-bl-full border-b-[6px] border-l-[6px] border-black" />
            <div className="font-black uppercase text-xl text-[#FF0055] mb-4 bg-black px-2 py-1 w-fit border-[4px] border-black shadow-[4px_4px_0_#000] transform -rotate-2">Unmapped</div>
            <div className="font-black text-3xl uppercase leading-none">"Make it<br/>Minimal"</div>
          </button>
          
          <button 
            onClick={() => setDefinition('userA')}
            className={`p-8 border-[8px] border-black transition-all shadow-[12px_12px_0_#000] text-left relative overflow-hidden group ${definition === 'userA' ? 'bg-[#00E5FF] translate-x-2 translate-y-2 shadow-none' : 'bg-white hover:bg-[#00E5FF] hover:-translate-y-1'}`}
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-black rounded-bl-full border-b-[6px] border-l-[6px] border-black" />
            <div className="font-black uppercase text-xl text-black mb-4 bg-white px-2 py-1 w-fit border-[4px] border-black shadow-[4px_4px_0_#000] transform rotate-1">Lexicon A</div>
            <div className="font-black text-3xl uppercase leading-none">"Cold, white, clinical"</div>
          </button>

          <button 
            onClick={() => setDefinition('userB')}
            className={`p-8 border-[8px] border-black transition-all shadow-[12px_12px_0_#000] text-left relative overflow-hidden group ${definition === 'userB' ? 'bg-[#00FF66] translate-x-2 translate-y-2 shadow-none' : 'bg-white hover:bg-[#00FF66] hover:-translate-y-1'}`}
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-[#FFFF00] rounded-bl-full border-b-[6px] border-l-[6px] border-black" />
            <div className="font-black uppercase text-xl text-black mb-4 bg-white px-2 py-1 w-fit border-[4px] border-black shadow-[4px_4px_0_#000] transform -rotate-1">Lexicon B</div>
            <div className="font-black text-3xl uppercase leading-none">"Warm, natural craft"</div>
          </button>
        </div>

        <AnimatePresence mode="wait">
          {definition === 'default' && (
            <motion.div key="def" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="min-h-[400px] bg-white border-[12px] border-black p-12 shadow-[20px_20px_0_#FF0055] flex items-center justify-center relative">
               {/* Danger Tape Top */}
               <div className="absolute top-0 left-0 w-full h-8 bg-[repeating-linear-gradient(45deg,#000,#000_20px,#FFFF00_20px,#FFFF00_40px)] border-b-[6px] border-black" />

              <div className="text-center space-y-6">
                <AlertTriangle size={80} className="mx-auto text-[#FF0055] animate-bounce" />
                <h3 className="font-black uppercase text-5xl text-black" style={{ textShadow: '4px 4px 0 #00E5FF' }}>Aesthetic Ambiguity!</h3>
                <div className="bg-black text-white p-6 border-[6px] border-black font-black uppercase text-2xl shadow-[8px_8px_0_#00FF66] transform rotate-1 inline-block">
                  System lacks baseline for taste. Generic outputs expected.
                </div>
              </div>
            </motion.div>
          )}

          {definition === 'userA' && (
            <motion.div key="ua" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="min-h-[400px] bg-white border-[12px] border-black p-12 shadow-[20px_20px_0_#000] flex items-center justify-center transform rotate-1 relative overflow-hidden">
               {/* Clinical Grid */}
               <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(#000 2px, transparent 2px), linear-gradient(90deg, #000 2px, transparent 2px)', backgroundSize: '40px 40px' }} />

              <div className="w-full max-w-2xl bg-white border-[8px] border-black p-12 shadow-[16px_16px_0_#00E5FF] relative z-10 flex flex-col items-center">
                <div className="font-black text-4xl uppercase mb-8 border-b-[6px] border-black pb-4 w-full text-center">Apple Aesthetic</div>
                <div className="w-24 h-12 bg-gray-200 border-[4px] border-black rounded-full mb-8 relative shadow-[inset_4px_4px_8px_rgba(0,0,0,0.2)]">
                  <div className="absolute top-1 left-1 w-8 h-8 bg-white border-[4px] border-black rounded-full shadow-[2px_2px_0_#000]" />
                </div>
                <div className="space-y-6 w-full">
                  <div className="h-6 w-full bg-gray-200 border-[4px] border-black rounded-full" />
                  <div className="h-6 w-2/3 mx-auto bg-gray-200 border-[4px] border-black rounded-full" />
                </div>
                <button className="mt-12 px-12 py-4 bg-black text-white font-black uppercase text-2xl border-[6px] border-[#00E5FF] shadow-[8px_8px_0_#000] hover:bg-[#00E5FF] hover:text-black transition-colors">
                  Execute Cold
                </button>
              </div>
            </motion.div>
          )}

          {definition === 'userB' && (
            <motion.div key="ub" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="min-h-[400px] bg-[#E5E5E5] border-[12px] border-black p-12 shadow-[20px_20px_0_#00FF66] flex flex-col items-center justify-center transform -rotate-1 relative overflow-hidden">
               {/* Rough Texture */}
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30 mix-blend-multiply" />
               
              <div className="w-full max-w-2xl space-y-8 relative z-10 text-black">
                <div className="text-center space-y-6">
                  <h3 className="text-6xl font-black uppercase" style={{ textShadow: '4px 4px 0 #FFFF00' }}>Warm Minimalism</h3>
                  <div className="font-black uppercase text-2xl bg-[#00FF66] px-6 py-2 border-[6px] border-black inline-block shadow-[8px_8px_0_#000] rotate-2">
                    High-Craft & Natural
                  </div>
                </div>
                
                <div className="p-12 border-[8px] border-black bg-white shadow-[16px_16px_0_#000] transform -rotate-2 text-center text-3xl font-black uppercase leading-tight mt-8">
                  Uncluttered space that breathes, utilizing earth tones and tactile textures!
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}