import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Compass, Heart, Brain, Zap, ShieldAlert } from 'lucide-react';

export default function IndividuationOdysseyModule({ setPage }: { setPage: (p: string) => void }) {
  const [phase, setPhase] = useState<'acorn' | 'midlife' | 'shadow' | 'coherence'>('acorn');
  const [somaticState, setSomaticState] = useState({ hr: 85, hrv: 20, emotion: 'Anxious' });

  const triggerTIPP = () => {
    setSomaticState({ hr: 60, hrv: 65, emotion: 'Coherent' });
  };

  return (
    <div className="pt-32 pb-24 px-6 bg-[#050505] min-h-screen relative text-[#e2e8f0] font-serif">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900 via-[#050505] to-[#050505] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <button 
          onClick={() => setPage('home')}
          className="flex items-center gap-2 font-sans font-black uppercase mb-12 text-indigo-400 hover:text-white transition-colors w-fit text-xs tracking-widest"
        >
          <ArrowLeft size={16} /> Return to Nexus
        </button>

        <header className="mb-16 text-center">
          <h1 className="text-5xl md:text-7xl font-light italic mb-4">The Inner Odyssey</h1>
          <p className="text-sm font-sans font-bold tracking-[0.3em] uppercase text-indigo-500">A Roadmap to Human Individuation</p>
        </header>

        <div className="flex flex-wrap justify-center gap-4 mb-16 font-sans">
          {[
            { id: 'acorn', label: '1. The Acorn Theory' },
            { id: 'midlife', label: '2. The Midlife Pivot' },
            { id: 'shadow', label: '3. Shadow Integration' },
            { id: 'coherence', label: '4. Somatic Coherence' }
          ].map(p => (
            <button
              key={p.id}
              onClick={() => setPhase(p.id as any)}
              className={`px-6 py-3 border rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                phase === p.id ? 'bg-indigo-600 border-indigo-500 text-white' : 'border-white/10 text-gray-500 hover:border-white/30'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            
            {phase === 'acorn' && (
              <motion.div key="acorn" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8">
                <div className="p-8 border border-white/10 bg-white/5 backdrop-blur-sm rounded-2xl text-center">
                  <Compass size={48} className="mx-auto mb-6 text-indigo-400 opacity-50" />
                  <h2 className="text-3xl italic mb-4">The Acorn & The Oak</h2>
                  <p className="text-lg leading-relaxed text-gray-400 mb-8">
                    Individuation is the slow, geological incarnation of all innate potentials embedded within the individual from birth. The lifelong effort is to align the conscious, navigating identity (The Ego) with the soul's vast, pre-defined potential (The Self).
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-left font-sans text-sm">
                    <div className="p-4 bg-black/50 border border-white/5 rounded-lg">
                      <strong className="text-indigo-400 uppercase tracking-widest text-[10px] block mb-2">The Ego (The WHO)</strong>
                      The Captain's bridge; the bright, narrow beam of a flashlight. Focuses on the Persona and social survival.
                    </div>
                    <div className="p-4 bg-black/50 border border-white/5 rounded-lg">
                      <strong className="text-rose-400 uppercase tracking-widest text-[10px] block mb-2">The Self (The WHAT)</strong>
                      The entire ocean; the holographic source code. The God-image driving toward wholeness.
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {phase === 'midlife' && (
              <motion.div key="midlife" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8">
                <div className="p-8 border border-red-500/30 bg-red-900/10 backdrop-blur-sm rounded-2xl">
                  <ShieldAlert size={48} className="mb-6 text-red-400" />
                  <h2 className="text-3xl italic mb-4 text-red-100">The Crisis of the Ego</h2>
                  <p className="text-lg leading-relaxed text-red-200/70 mb-6">
                    The Acorn's pressure bursts the shell. The Ego—the proud young king—is forced to surrender its pride. It must move from Alexander-like conquest to humble service to the Self.
                  </p>
                  <ul className="space-y-4 font-sans text-sm text-red-200/90">
                    <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-red-500" /> Fragmented Identity: The old social mask no longer fits.</li>
                    <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-red-500" /> Limbic Hijack: Survival brain overwhelms the frontal cortex.</li>
                    <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-red-500" /> Reality Mismatch: Old neural programs fail the current reality.</li>
                  </ul>
                </div>
              </motion.div>
            )}

            {phase === 'shadow' && (
              <motion.div key="shadow" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8">
                <div className="p-8 border border-gray-700 bg-gray-900/30 backdrop-blur-sm rounded-2xl flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-1">
                    <h2 className="text-3xl italic mb-4">The Augean Stables</h2>
                    <p className="text-lg leading-relaxed text-gray-400 mb-6">
                      The second half of life is a circular descent. You must confront the Shadow—the neglected psychological "dung" that the proud Ego left behind.
                    </p>
                    <div className="font-sans text-sm p-4 bg-black/50 border-l-2 border-indigo-500 text-gray-300">
                      "The overwhelming rage we feel toward the faults of others is a map back to the denied self."
                    </div>
                  </div>
                  <div className="w-48 h-48 rounded-full bg-gradient-to-br from-gray-800 to-black border-4 border-gray-700 flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,1)] inset-shadow">
                    <div className="text-gray-500 font-sans font-black tracking-widest text-xs uppercase">The Void</div>
                  </div>
                </div>
              </motion.div>
            )}

            {phase === 'coherence' && (
              <motion.div key="coherence" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8">
                <div className="p-8 border border-emerald-500/30 bg-emerald-900/10 backdrop-blur-sm rounded-2xl text-center">
                  <Heart size={48} className={`mx-auto mb-6 ${somaticState.hr === 60 ? 'text-emerald-400 animate-pulse' : 'text-orange-400'}`} />
                  <h2 className="text-3xl italic mb-4">Somatic Diagnostics</h2>
                  <p className="text-lg leading-relaxed text-gray-400 mb-8">
                    Integration requires moving from theoretical understanding to somatic regulation. Stabilize the physiological bridge between the heart and brain.
                  </p>
                  
                  <div className="flex justify-center gap-8 font-sans mb-8">
                    <div className="text-center">
                      <div className="text-3xl font-black text-white">{somaticState.hr} <span className="text-xs text-gray-500">BPM</span></div>
                      <div className="text-[10px] uppercase tracking-widest text-gray-500 mt-1">Heart Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-black text-white">{somaticState.hrv} <span className="text-xs text-gray-500">ms</span></div>
                      <div className="text-[10px] uppercase tracking-widest text-gray-500 mt-1">HRV (Vagal Tone)</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-xl font-black mt-2 ${somaticState.hr === 60 ? 'text-emerald-400' : 'text-orange-400'}`}>{somaticState.emotion}</div>
                      <div className="text-[10px] uppercase tracking-widest text-gray-500 mt-1">System State</div>
                    </div>
                  </div>

                  <button 
                    onClick={triggerTIPP}
                    className="px-8 py-4 bg-emerald-600 text-white font-sans font-black uppercase text-xs tracking-widest rounded-full hover:bg-emerald-500 transition-colors shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                  >
                    Initiate T.I.P.P. Protocol (De-escalate)
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}