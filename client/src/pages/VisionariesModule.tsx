import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Users, Play, ShieldAlert, FileText, CheckCircle2 } from 'lucide-react';

export default function VisionariesModule({ setPage }: { setPage: (p: string) => void }) {
  const [selectedPersonas, setSelectedPersonas] = useState<string[]>([]);
  const [challenge, setChallenge] = useState('AGI Alignment');
  const [stage, setStage] = useState<'setup' | 'deliberating' | 'result'>('setup');
  const [logs, setLogs] = useState<string[]>([]);

  const personas = [
    { id: 'ERG', name: 'Ethical Regulatory Guardian' },
    { id: 'SA', name: 'Systems Architect' },
    { id: 'SIL', name: 'Somatic Intelligence Liaison' },
    { id: 'PGI', name: 'Pragmatic Growth Innovator' },
    { id: 'OSDA', name: 'Open Source Decentralization Advocate' }
  ];

  const challenges = ['AGI Alignment', 'Global Climate Governance', 'Bio-Digital Convergence'];

  const togglePersona = (id: string) => {
    if (selectedPersonas.includes(id)) {
      setSelectedPersonas(selectedPersonas.filter(p => p !== id));
    } else {
      if (selectedPersonas.length < 3) setSelectedPersonas([...selectedPersonas, id]);
    }
  };

  const initiateDeliberation = () => {
    if (selectedPersonas.length < 2) return;
    setStage('deliberating');
    setLogs([]);
    
    const deliberationSteps = [
      `Initializing Council Deliberation for [${challenge}]`,
      `Injecting Contextual Parameters & Desired Outcomes`,
      ...selectedPersonas.map(p => `${p} applying thinking protocols...`),
      `[DIALECTIC TENSION DETECTED] Processing conflicting beliefs...`,
      `Running Fusion Algorithm for resolution...`,
      `Compiling Council Report...`
    ];

    let step = 0;
    const interval = setInterval(() => {
      setLogs(prev => [...prev, deliberationSteps[step]]);
      step++;
      if (step >= deliberationSteps.length) {
        clearInterval(interval);
        setTimeout(() => setStage('result'), 1000);
      }
    }, 800);
  };

  return (
    <div className="pt-32 pb-24 px-6 bg-white min-h-screen relative text-black">
      <div className="max-w-5xl mx-auto relative z-10">
        <button 
          onClick={() => setPage('home')}
          className="flex items-center gap-2 font-black uppercase mb-12 text-black hover:text-white hover:bg-black px-4 py-2 border-2 border-transparent hover:border-black transition-all w-fit"
        >
          <ArrowLeft size={16} /> Back to Systems
        </button>

        <div className="mb-12">
          <span className="text-[#ff6b6b] font-black uppercase tracking-[0.5em] text-xs block mb-4">
            // UNIVERSAL PERSONA HUB
          </span>
          <h1 className="kinetic-text text-5xl md:text-7xl uppercase leading-none mb-6">
            AGENTIC<br/>SANDBOX
          </h1>
          <p className="text-xl font-bold max-w-2xl text-gray-600">
            Simulate complex challenges, generate structured debates, and co-create solutions through an agentic, persona-driven Council Deliberation process.
          </p>
        </div>

        {stage === 'setup' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="font-black uppercase mb-4 text-sm flex items-center gap-2"><ShieldAlert size={16}/> 1. Select Challenge</h3>
                <div className="flex flex-wrap gap-2">
                  {challenges.map(c => (
                    <button 
                      key={c}
                      onClick={() => setChallenge(c)}
                      className={`px-4 py-2 text-xs font-black uppercase border-2 transition-all ${challenge === c ? 'bg-black text-white border-black' : 'border-gray-300 text-gray-500 hover:border-black'}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-black uppercase mb-4 text-sm flex items-center gap-2"><Users size={16}/> 2. Convene Council (Select 2-3)</h3>
                <div className="space-y-2">
                  {personas.map(p => (
                    <button 
                      key={p.id}
                      onClick={() => togglePersona(p.id)}
                      className={`w-full text-left px-4 py-3 border-2 transition-all flex justify-between items-center ${selectedPersonas.includes(p.id) ? 'bg-[#c4ff00] border-black text-black' : 'border-gray-200 text-gray-500 hover:border-black'}`}
                    >
                      <span className="font-black text-sm">{p.id}</span>
                      <span className="text-xs font-bold uppercase">{p.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={initiateDeliberation}
                disabled={selectedPersonas.length < 2}
                className="w-full bg-black text-white py-4 font-black uppercase flex items-center justify-center gap-2 hover:bg-[#ff6b6b] hover:text-black transition-colors disabled:opacity-50"
              >
                <Play size={18} /> Initiate Deliberation
              </button>
            </div>
            
            <div className="brutalist-border p-8 bg-gray-50 relative overflow-hidden hidden md:block">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-multiply" />
              <h4 className="font-black uppercase mb-4 text-xl">The EACGF Meta-Framework</h4>
              <p className="text-sm font-bold text-gray-600 leading-relaxed mb-6">
                The Sandbox leverages Dialectic Exploration and Red-Teaming. Inject belief overrides, define contextual parameters, and watch the fusion algorithm resolve architectural conflicts.
              </p>
            </div>
          </motion.div>
        )}

        {stage === 'deliberating' && (
          <div className="brutalist-border bg-black text-[#c4ff00] p-8 min-h-[400px] font-mono text-sm">
            <h3 className="font-black uppercase text-white mb-6 border-b border-white/20 pb-4">Live Council Feed</h3>
            <div className="space-y-4">
              {logs.map((log, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                  &gt; {log}
                </motion.div>
              ))}
              <motion.div animate={{ opacity: [0, 1] }} transition={{ repeat: Infinity, duration: 0.8 }} className="inline-block w-2 h-4 bg-[#c4ff00] ml-2" />
            </div>
          </div>
        )}

        {stage === 'result' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="brutalist-border bg-white p-8">
            <div className="flex items-center gap-4 mb-8 pb-4 border-b-2 border-black">
              <CheckCircle2 size={32} className="text-[#c4ff00]" />
              <h2 className="text-3xl font-black uppercase">Council Report Generated</h2>
            </div>
            
            <div className="space-y-6 text-sm font-bold">
              <div className="p-4 bg-gray-100 border border-gray-300">
                <span className="text-gray-500 uppercase text-[10px] block mb-1">Challenge</span>
                <span className="text-lg">{challenge}</span>
              </div>
              
              <div className="p-4 bg-gray-100 border border-gray-300">
                <span className="text-gray-500 uppercase text-[10px] block mb-1">Council Members</span>
                <span className="text-lg">{selectedPersonas.join(' • ')}</span>
              </div>

              <div className="p-6 bg-[#ff6b6b]/10 border-2 border-[#ff6b6b]">
                <h4 className="font-black uppercase mb-2 text-[#ff6b6b] flex items-center gap-2"><ShieldAlert size={14}/> Red-Team Vulnerability Identified</h4>
                <p className="text-black">The proposed governance framework heavily relies on open-source contributions (OSDA), which the Pragmatic Growth Innovator (PGI) noted introduces severe monetization and security bottlenecks without a hybrid licensing structure.</p>
              </div>

              <button onClick={() => setStage('setup')} className="bg-black text-white px-6 py-3 font-black uppercase text-xs hover:bg-[#c4ff00] hover:text-black transition-colors mt-8">
                Run New Simulation
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}