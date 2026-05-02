import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Compass, Heart, ShieldAlert, Sparkles, Map } from 'lucide-react';

export default function IndividuationOdysseyModule({ setPage }: { setPage: (p: string) => void }) {
  const [phase, setPhase] = useState<'acorn' | 'midlife' | 'shadow' | 'coherence'>('acorn');
  const [somaticState, setSomaticState] = useState({ hr: 85, hrv: 20, emotion: 'Anxious' });

  const triggerTIPP = () => {
    setSomaticState({ hr: 60, hrv: 65, emotion: 'Coherent' });
  };

  return (
    <div className="pt-32 pb-24 px-6 bg-[#00FF66] min-h-screen relative text-black font-sans selection:bg-black selection:text-[#00FF66]">
      {/* Halftone Background */}
      <div className="absolute inset-0 opacity-20 mix-blend-multiply" style={{ backgroundImage: 'radial-gradient(circle, #000 2px, transparent 2.5px)', backgroundSize: '16px 16px' }} />

      <div className="max-w-6xl mx-auto relative z-10">
        
        <header className="mb-12 bg-white border-[12px] border-black p-8 shadow-[20px_20px_0_#FF0055] relative transform -rotate-1">
          <div className="absolute -top-6 -right-6 bg-[#00E5FF] p-4 border-[6px] border-black shadow-[8px_8px_0_#000] rotate-12">
            <Map size={48} className="text-black" />
          </div>

          <button 
            onClick={() => setPage('home')}
            className="flex items-center gap-2 font-black uppercase mb-6 text-white bg-black hover:bg-[#FF0055] px-4 py-2 border-[4px] border-black transition-colors w-fit text-sm shadow-[4px_4px_0_#000]"
          >
            <ArrowLeft size={16} /> Back
          </button>
          
          <h1 className="text-5xl md:text-8xl font-black uppercase leading-none mb-4" style={{ textShadow: '4px 4px 0 #FFFF00, 8px 8px 0 #000' }}>
            Inner<br/>Odyssey!
          </h1>
          <div className="bg-black text-[#00FF66] font-black uppercase px-4 py-2 border-[4px] border-white inline-block transform rotate-2 text-xl shadow-[4px_4px_0_#000]">
            The Roadmap to Individuation
          </div>
        </header>

        <div className="flex flex-wrap justify-center gap-6 mb-12 relative z-20">
          {[
            { id: 'acorn', label: '1. Acorn Theory', color: 'bg-[#FFFF00]' },
            { id: 'midlife', label: '2. Midlife Pivot', color: 'bg-[#FF0055]' },
            { id: 'shadow', label: '3. The Shadow', color: 'bg-black text-white' },
            { id: 'coherence', label: '4. Coherence', color: 'bg-[#00E5FF]' }
          ].map((p, i) => (
            <button
              key={p.id}
              onClick={() => setPhase(p.id as any)}
              className={`px-8 py-4 border-[6px] border-black font-black uppercase text-xl transition-all shadow-[8px_8px_0_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none ${
                phase === p.id ? `${p.color} scale-110 -translate-y-2` : 'bg-white hover:bg-gray-100'
              } ${i % 2 === 0 ? 'rotate-2' : '-rotate-2'}`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            
            {phase === 'acorn' && (
              <motion.div key="acorn" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} className="space-y-8">
                <div className="p-8 border-[12px] border-black bg-[#FFFF00] shadow-[20px_20px_0_#000] relative">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white px-6 py-2 border-[6px] border-black font-black uppercase text-2xl rotate-[-2deg] shadow-[6px_6px_0_#000]">
                    The Origin!
                  </div>
                  
                  <Compass size={80} className="mx-auto mb-8 mt-4 text-black" />
                  <h2 className="text-5xl font-black uppercase mb-6 text-center">The Acorn & The Oak</h2>
                  
                  <div className="bg-white border-[6px] border-black p-6 text-xl font-bold uppercase mb-8 shadow-[8px_8px_0_#00E5FF]">
                    Individuation is the slow, geological incarnation of all innate potentials. We align the navigating identity (The Ego) with the soul's vast potential (The Self).
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-black text-white border-[6px] border-white shadow-[8px_8px_0_#FF0055] transform rotate-1">
                      <strong className="text-[#00E5FF] uppercase font-black text-2xl block mb-2 border-b-[4px] border-[#00E5FF] pb-2">The Ego</strong>
                      <p className="font-bold text-lg leading-tight">The Captain's bridge; the flashlight. Focuses on the Persona and survival.</p>
                    </div>
                    <div className="p-6 bg-white text-black border-[6px] border-black shadow-[8px_8px_0_#00FF66] transform -rotate-1">
                      <strong className="text-[#FF0055] uppercase font-black text-2xl block mb-2 border-b-[4px] border-[#FF0055] pb-2">The Self</strong>
                      <p className="font-bold text-lg leading-tight">The entire ocean; the holographic source code. The drive toward wholeness.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {phase === 'midlife' && (
              <motion.div key="midlife" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} className="space-y-8">
                <div className="p-8 border-[12px] border-black bg-[#FF0055] text-white shadow-[20px_20px_0_#000] transform rotate-1 relative">
                  <ShieldAlert size={80} className="mx-auto mb-6 text-white animate-bounce" />
                  <h2 className="text-6xl font-black uppercase mb-6 text-center" style={{ textShadow: '4px 4px 0 #000' }}>Crisis!</h2>
                  
                  <div className="bg-black text-white border-[6px] border-white p-6 text-xl font-bold uppercase mb-8 shadow-[8px_8px_0_#FFFF00]">
                    The Acorn's pressure bursts the shell! The Ego must surrender its pride and serve the Self.
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      "Fragmented Identity: The old mask breaks!",
                      "Limbic Hijack: Survival brain attacks!",
                      "Reality Mismatch: Old neural programs fail!"
                    ].map((item, i) => (
                      <div key={i} className="bg-white text-black font-black uppercase p-4 border-[4px] border-black shadow-[6px_6px_0_#000] text-xl flex items-center gap-4">
                        <div className="w-8 h-8 bg-[#FF0055] border-[4px] border-black rounded-full flex-shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {phase === 'shadow' && (
              <motion.div key="shadow" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} className="space-y-8">
                <div className="p-8 border-[12px] border-black bg-black text-white shadow-[20px_20px_0_#00E5FF] flex flex-col md:flex-row gap-8 items-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-30 mix-blend-overlay" />
                  
                  <div className="flex-1 relative z-10">
                    <h2 className="text-5xl font-black uppercase mb-6 text-[#00E5FF]" style={{ textShadow: '2px 2px 0 #fff' }}>The Shadows</h2>
                    <div className="bg-white text-black p-6 border-[6px] border-[#00E5FF] font-bold text-xl uppercase mb-6 transform -rotate-1 shadow-[8px_8px_0_#FF0055]">
                      You must confront the neglected psychological "dung" that the proud Ego left behind.
                    </div>
                    <div className="p-6 bg-[#FF0055] border-[6px] border-black font-black uppercase text-xl shadow-[6px_6px_0_#000] transform rotate-2">
                      "Rage toward others is a map back to the denied self."
                    </div>
                  </div>
                  
                  <div className="w-64 h-64 rounded-full bg-black border-[12px] border-white flex items-center justify-center shadow-[0_0_50px_rgba(0,229,255,1)] relative z-10 animate-pulse">
                    <div className="text-white font-black uppercase text-4xl text-center leading-none" style={{ textShadow: '2px 2px 0 #FF0055' }}>
                      THE<br/>VOID
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {phase === 'coherence' && (
              <motion.div key="coherence" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} className="space-y-8">
                <div className="p-8 border-[12px] border-black bg-[#00E5FF] shadow-[20px_20px_0_#000] text-center relative">
                  <Heart size={80} className={`mx-auto mb-6 text-black ${somaticState.hr === 60 ? 'animate-pulse text-[#FF0055]' : ''}`} />
                  <h2 className="text-6xl font-black uppercase mb-6 text-black" style={{ textShadow: '4px 4px 0 #fff' }}>Coherence!</h2>
                  
                  <div className="bg-white border-[6px] border-black p-6 text-xl font-bold uppercase mb-8 shadow-[8px_8px_0_#000]">
                    Integration requires moving from theoretical understanding to somatic regulation!
                  </div>
                  
                  <div className="flex flex-wrap justify-center gap-6 mb-12">
                    <div className="bg-black text-white p-6 border-[6px] border-[#00FF66] shadow-[8px_8px_0_#000] transform -rotate-2 w-40">
                      <div className="text-5xl font-black">{somaticState.hr}</div>
                      <div className="text-xs uppercase font-black bg-[#00FF66] text-black px-2 mt-2">BPM</div>
                    </div>
                    <div className="bg-black text-white p-6 border-[6px] border-[#FFFF00] shadow-[8px_8px_0_#000] transform rotate-1 w-40">
                      <div className="text-5xl font-black">{somaticState.hrv}</div>
                      <div className="text-xs uppercase font-black bg-[#FFFF00] text-black px-2 mt-2">HRV (ms)</div>
                    </div>
                    <div className="bg-black text-white p-6 border-[6px] border-[#FF0055] shadow-[8px_8px_0_#000] transform -rotate-1 w-40">
                      <div className={`text-2xl font-black uppercase ${somaticState.hr === 60 ? 'text-[#00FF66]' : 'text-[#FF0055]'}`}>{somaticState.emotion}</div>
                      <div className="text-xs uppercase font-black bg-[#FF0055] text-white px-2 mt-2">State</div>
                    </div>
                  </div>

                  <button 
                    onClick={triggerTIPP}
                    className="w-full py-6 bg-[#FF0055] text-white font-black uppercase text-3xl border-[8px] border-black shadow-[12px_12px_0_#000] hover:bg-[#FFFF00] hover:text-black transition-colors"
                  >
                    Initiate T.I.P.P. Protocol!
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