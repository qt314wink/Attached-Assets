import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sparkles, Moon, Sun, Combine, FileText, LayoutTemplate } from 'lucide-react';

export default function MythOSModule({ setPage }: { setPage: (p: string) => void }) {
  const [step, setStep] = useState(1);
  const [selectedLenses, setSelectedLenses] = useState<string[]>([]);
  const [domain, setDomain] = useState('');
  const [reading, setReading] = useState(false);

  const lenses = [
    { id: 'gene_keys', name: 'Gene Keys', desc: 'Shadows & Siddhis' },
    { id: 'astrocartography', name: 'Astrocartography', desc: 'Geographical resonance' },
    { id: 'human_design', name: 'Human Design', desc: 'Energy architecture' },
    { id: 'tarot', name: 'Archetypal Tarot', desc: 'Mythic narrative beats' },
    { id: 'psych', name: 'Psychological', desc: 'Parts work & attachment' }
  ];

  const toggleLens = (id: string) => {
    if (selectedLenses.includes(id)) {
      setSelectedLenses(selectedLenses.filter(l => l !== id));
    } else {
      setSelectedLenses([...selectedLenses, id]);
    }
  };

  const generateReading = () => {
    if (selectedLenses.length === 0 || !domain) return;
    setStep(3);
    setReading(true);
    setTimeout(() => {
      setReading(false);
      setStep(4);
    }, 3000);
  };

  return (
    <div className="pt-32 pb-24 px-6 bg-[#1a1a2e] min-h-screen relative text-[#f8fafc] overflow-hidden font-serif">
      {/* Esoteric Background */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10" />
      <div className="absolute -top-64 -right-64 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[100px]" />
      <div className="absolute -bottom-64 -left-64 w-[500px] h-[500px] bg-rose-500/20 rounded-full blur-[100px]" />

      <div className="max-w-5xl mx-auto relative z-10">
        <button 
          onClick={() => setPage('home')}
          className="flex items-center gap-2 font-black uppercase mb-12 text-[#94a3b8] hover:text-white transition-all w-fit font-sans text-xs tracking-widest"
        >
          <ArrowLeft size={16} /> Return to Nexus
        </button>

        <div className="text-center mb-16">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="inline-block mb-4">
            <Combine size={48} className="text-rose-400" />
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-light italic mb-4">MythOS</h1>
          <p className="text-sm font-sans tracking-[0.3em] uppercase text-indigo-300">The Harmonic Astrocartographer</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8 bg-white/5 p-8 backdrop-blur-md border border-white/10 rounded-2xl">
                <h2 className="text-2xl italic text-center">Where shall we direct the lens?</h2>
                <div className="grid grid-cols-1 gap-4 font-sans">
                  {['Vocation & Purpose', 'Relationships & Attachment', 'Creativity & Output', 'Spiritual Growth'].map(d => (
                    <button 
                      key={d}
                      onClick={() => { setDomain(d); setStep(2); }}
                      className="p-4 border border-white/20 rounded-lg hover:bg-white/10 transition-colors text-left font-bold"
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8 bg-white/5 p-8 backdrop-blur-md border border-white/10 rounded-2xl">
                <h2 className="text-2xl italic text-center">Select your modalities.</h2>
                <p className="text-center text-sm font-sans text-gray-400 mb-8">Focus: {domain}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans">
                  {lenses.map(l => (
                    <button 
                      key={l.id}
                      onClick={() => toggleLens(l.id)}
                      className={`p-4 border rounded-lg text-left transition-all ${selectedLenses.includes(l.id) ? 'bg-indigo-500/20 border-indigo-400 text-indigo-100' : 'border-white/10 text-gray-400 hover:border-white/30'}`}
                    >
                      <div className="font-bold mb-1">{l.name}</div>
                      <div className="text-xs opacity-70">{l.desc}</div>
                    </button>
                  ))}
                </div>
                <button 
                  onClick={generateReading}
                  disabled={selectedLenses.length === 0}
                  className="w-full mt-8 bg-rose-500 text-white font-sans font-black uppercase tracking-widest py-4 rounded-lg hover:bg-rose-400 transition-colors disabled:opacity-50"
                >
                  Synthesize Reading
                </button>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-20">
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }} 
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Sun size={64} className="text-rose-400 mix-blend-screen absolute" />
                  <Moon size={64} className="text-indigo-400 mix-blend-screen" />
                </motion.div>
                <p className="mt-12 font-sans font-bold tracking-widest uppercase text-sm animate-pulse">
                  Synthesizing {selectedLenses.length} lenses...
                </p>
                <p className="text-xs font-sans text-gray-500 mt-2">Normalizing symbolic data into structured themes.</p>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <div className="bg-white/5 p-8 backdrop-blur-md border border-white/10 rounded-2xl">
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                    <h2 className="text-3xl italic">The Storm Walker</h2>
                    <span className="font-sans text-xs tracking-widest uppercase bg-rose-500/20 text-rose-300 px-3 py-1 rounded-full">Archetype Discovered</span>
                  </div>

                  <div className="space-y-6 text-slate-300 leading-relaxed text-lg">
                    <p>
                      You are not a fortune teller. You are a pattern interpreter. Based on the synthesis of {selectedLenses.join(', ')} through the lens of {domain}, a distinct geometry emerges.
                    </p>
                    <p>
                      <strong className="text-rose-300 font-sans uppercase text-sm tracking-wide">The Shadow Pattern:</strong><br/>
                      The Invisible Achiever. You tend to operate in the background, letting your work speak for itself out of a fear of visibility (Gene Key 4 Shadow of Intolerance combined with a strong 12th house astrological placement).
                    </p>
                    <p>
                      <strong className="text-indigo-300 font-sans uppercase text-sm tracking-wide">The Gift Expression:</strong><br/>
                      When integrated, this transforms into the 'Silent Reservoir'. You become a stabilizing force, holding deep energetic space for others without needing to dominate the narrative.
                    </p>
                  </div>

                  <div className="mt-10 p-6 bg-indigo-900/20 border border-indigo-500/30 rounded-xl font-sans">
                    <h4 className="font-black uppercase text-sm mb-4 text-indigo-300 flex items-center gap-2"><Sparkles size={16}/> Actionable Insight</h4>
                    <p className="text-sm text-indigo-100">
                      Experiment with claiming space in small increments. Next time you feel the urge to retreat into the background during a collaborative process, deliberately anchor your voice in the room. This is not about ego; it is about claiming your geometric position in the network.
                    </p>
                  </div>
                </div>

                <button 
                  onClick={() => { setStep(1); setSelectedLenses([]); setDomain(''); }}
                  className="mx-auto block font-sans font-black uppercase text-xs tracking-widest text-gray-500 hover:text-white transition-colors"
                >
                  Initiate New Reading
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}