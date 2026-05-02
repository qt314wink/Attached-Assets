import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Target, Shield, Eye } from 'lucide-react';

export default function SovereigntyParadoxModule({ setPage }: { setPage: (p: string) => void }) {
  const [step, setStep] = useState(0);

  const shadowAudit = [
    { title: "Behavioral Truth", desc: "What did we actually do or say? (Verifiable Actions)", icon: <Target className="text-rose-400" /> },
    { title: "Emotional Truth", desc: "What was felt during that exclusion? (Sensation and Emotion)", icon: <HeartbeatIcon className="text-amber-400" /> },
    { title: "Mythic Truth", desc: "What catastrophic judgment did the institution use to justify the exclusion?", icon: <Eye className="text-indigo-400" /> }
  ];

  const transformations = [
    { shadow: "Control", gift: "Equilibrium", siddhi: "Realization", color: "from-rose-500 to-rose-400" },
    { shadow: "Dishonor", gift: "Integrity", siddhi: "Honor", color: "from-amber-500 to-amber-400" },
    { shadow: "Incompetence", gift: "Expression", siddhi: "Wisdom", color: "from-indigo-500 to-indigo-400" }
  ];

  return (
    <div className="pt-32 pb-24 px-6 bg-[#f8fafc] min-h-screen relative text-slate-900 font-serif">
      <div className="max-w-4xl mx-auto relative z-10">
        <button 
          onClick={() => setPage('home')}
          className="flex items-center gap-2 font-sans font-black uppercase mb-12 text-slate-400 hover:text-slate-900 transition-colors w-fit text-sm tracking-widest"
        >
          <ArrowLeft size={16} /> Return to Nexus
        </button>

        <header className="mb-16 text-center">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">Sovereignty</h1>
          <p className="text-sm font-sans font-bold tracking-[0.3em] uppercase text-slate-500">The Paradox of Power & The Heyoka Principle</p>
        </header>

        <div className="space-y-16">
          <div className="bg-white p-12 rounded-[2rem] shadow-xl border border-slate-200">
            <h2 className="text-3xl font-light italic mb-6">The Triple-Layered Truth Audit</h2>
            <p className="text-slate-600 mb-8 font-sans">
              To identify the "Shadow's Deepest Lie" within an organization, a leader must audit the "exiled" parts of the system. The founding of any city or institution is a psychological act of repression. A wall defines the "inside," but it necessitates a "Shadow".
            </p>

            <div className="space-y-4 font-sans">
              {shadowAudit.map((audit, i) => (
                <div key={i} className="p-6 bg-slate-50 border border-slate-100 rounded-xl flex items-start gap-6">
                  <div className="p-3 bg-white rounded-lg shadow-sm border border-slate-100">{audit.icon}</div>
                  <div>
                    <h3 className="font-black uppercase text-sm mb-2">{audit.title}</h3>
                    <p className="text-slate-500 text-sm font-medium">{audit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 text-slate-100 p-12 rounded-[2rem] shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10" />
            
            <div className="relative z-10">
              <h2 className="text-3xl font-light italic mb-6 text-white">The Heyoka Principle</h2>
              <p className="text-slate-400 mb-12 font-sans">
                The Lakota Sacred Clown mirrors institutional hypocrisy by "showing the opposite." Utilizing the archetypal hierarchy of the Gene Keys, we map the evolution of institutional power:
              </p>

              <div className="space-y-8 font-sans">
                {transformations.map((t, i) => (
                  <div key={i} className="flex items-center justify-between p-6 border border-slate-700 bg-slate-800/50 rounded-2xl">
                    <div className="text-center w-1/3">
                      <div className="text-xs uppercase tracking-widest text-slate-500 mb-2">Shadow</div>
                      <div className="font-black text-xl text-slate-300">{t.shadow}</div>
                    </div>
                    <div className="text-center w-1/3 flex flex-col items-center">
                      <div className={`w-full h-1 bg-gradient-to-r ${t.color} rounded-full mb-2`} />
                      <div className="text-xs uppercase tracking-widest text-slate-400 mb-1">Gift</div>
                      <div className="font-bold text-sm text-slate-200">{t.gift}</div>
                    </div>
                    <div className="text-center w-1/3">
                      <div className="text-xs uppercase tracking-widest text-slate-500 mb-2">Siddhi</div>
                      <div className={`font-black text-xl text-transparent bg-clip-text bg-gradient-to-br ${t.color}`}>{t.siddhi}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeartbeatIcon({ className }: { className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>;
}