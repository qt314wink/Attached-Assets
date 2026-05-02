import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Users, Play, ShieldAlert, CheckCircle2, MessageCircle } from 'lucide-react';

export default function VisionariesModule({ setPage }: { setPage: (p: string) => void }) {
  const [selectedPersonas, setSelectedPersonas] = useState<string[]>([]);
  const [challenge, setChallenge] = useState('AGI Alignment');
  const [stage, setStage] = useState<'setup' | 'deliberating' | 'result'>('setup');
  const [logs, setLogs] = useState<string[]>([]);

  const personas = [
    { id: 'ERG', name: 'Ethical Guard', color: 'bg-[#00E5FF]' },
    { id: 'SA', name: 'Sys Architect', color: 'bg-[#FFFF00]' },
    { id: 'SIL', name: 'Somatic Rep', color: 'bg-[#FF0055]' },
    { id: 'PGI', name: 'Growth Innovator', color: 'bg-[#00FF66]' },
  ];

  const challenges = ['AGI Alignment', 'Global Climate', 'Bio-Digital Sync'];

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
      `GAVEL STRIKES! Council convened for [${challenge}].`,
      ...selectedPersonas.map(p => `[${p}] enters the chat with high dialectic tension!`),
      `SPARKS FLY! Conflicting protocols detected...`,
      `BOOM! Running Fusion Algorithm to synthesize...`,
      `Report compiled. Download ready.`
    ];

    let step = 0;
    const interval = setInterval(() => {
      setLogs(prev => [...prev, deliberationSteps[step]]);
      step++;
      if (step >= deliberationSteps.length) {
        clearInterval(interval);
        setTimeout(() => setStage('result'), 1500);
      }
    }, 1000);
  };

  return (
    <div className="pt-32 pb-24 px-6 bg-[#ff6b6b] min-h-screen relative text-black font-sans selection:bg-black selection:text-[#ff6b6b]">
       {/* Halftone Background */}
       <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'radial-gradient(circle, #000 2px, transparent 2.5px)', backgroundSize: '16px 16px' }} />

      <div className="max-w-6xl mx-auto relative z-10">
        
        <header className="mb-12 bg-white border-[8px] border-black p-8 shadow-[16px_16px_0_#000] relative">
           <div className="absolute -top-6 -right-6 w-24 h-24 bg-black rounded-full border-[6px] border-white flex items-center justify-center shadow-[6px_6px_0_#FFFF00] transform rotate-12">
            <MessageCircle size={40} className="text-[#FFFF00]" />
          </div>

          <button 
            onClick={() => setPage('home')}
            className="flex items-center gap-2 font-black uppercase mb-6 text-black hover:text-white hover:bg-black px-4 py-2 border-[4px] border-black transition-colors w-fit text-sm shadow-[4px_4px_0_#000]"
          >
            <ArrowLeft size={16} /> Back
          </button>
          
          <h1 className="text-6xl md:text-8xl font-black uppercase leading-[0.8] tracking-tighter text-black" style={{ textShadow: '4px 4px 0 #00E5FF, 8px 8px 0 #000' }}>
            Agentic<br/>Sandbox
          </h1>
          <p className="text-2xl font-black uppercase max-w-4xl text-black border-l-[8px] border-[#00E5FF] pl-6 bg-[#E5E5E5] p-6 border-r-[8px] border-y-[8px] mt-8 shadow-[8px_8px_0_#000]">
            A Comic-Book Style Multi-Agent Deliberation Council. Assemble your heroes and villains to synthesize a solution!
          </p>
        </header>

        {stage === 'setup' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-5 space-y-8">
              <div className="bg-white border-[8px] border-black p-6 shadow-[12px_12px_0_#000] transform -rotate-1">
                <h3 className="font-black uppercase mb-4 text-xl flex items-center gap-2 border-b-[4px] border-black pb-2"><ShieldAlert size={24}/> 1. The Threat</h3>
                <div className="flex flex-col gap-4">
                  {challenges.map(c => (
                    <button 
                      key={c}
                      onClick={() => setChallenge(c)}
                      className={`p-4 text-xl font-black uppercase border-[4px] transition-all text-left ${challenge === c ? 'bg-black text-white border-black translate-x-2' : 'bg-white border-black hover:bg-gray-100 shadow-[4px_4px_0_#000]'}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-7">
               <div className="bg-white border-[8px] border-black p-6 shadow-[12px_12px_0_#000] transform rotate-1">
                <h3 className="font-black uppercase mb-6 text-xl flex items-center gap-2 border-b-[4px] border-black pb-2"><Users size={24}/> 2. Assemble Council (Max 3)</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  {personas.map(p => {
                    const isSelected = selectedPersonas.includes(p.id);
                    return (
                      <button 
                        key={p.id}
                        onClick={() => togglePersona(p.id)}
                        className={`aspect-video border-[6px] border-black p-4 flex flex-col justify-end relative overflow-hidden transition-all ${isSelected ? `${p.color} shadow-[8px_8px_0_#000] scale-105 z-10` : 'bg-gray-100 grayscale hover:grayscale-0 shadow-[4px_4px_0_#000]'}`}
                      >
                         <div className="absolute top-2 right-2 text-4xl opacity-20 font-black tracking-tighter -rotate-12">{p.id}</div>
                         <h4 className="font-black uppercase text-lg text-left leading-tight" style={isSelected ? {WebkitTextStroke:'1px black', color:'white', textShadow:'2px 2px 0 #000'} : {}}>{p.name}</h4>
                         {isSelected && <div className="absolute top-2 left-2 bg-black text-white px-2 font-black uppercase text-[10px]">Active</div>}
                      </button>
                    )
                  })}
                </div>

                <button 
                  onClick={initiateDeliberation}
                  disabled={selectedPersonas.length < 2}
                  className="w-full mt-8 bg-[#FFFF00] text-black py-6 border-[8px] border-black font-black uppercase text-3xl flex items-center justify-center gap-4 hover:bg-black hover:text-[#FFFF00] transition-colors shadow-[8px_8px_0_#000] disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed group"
                >
                  <Play size={32} className="group-hover:scale-125 transition-transform" /> Fight!
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {stage === 'deliberating' && (
          <div className="bg-white border-[12px] border-black p-8 min-h-[500px] font-sans shadow-[20px_20px_0_#00E5FF] relative">
            <h3 className="font-black uppercase text-3xl text-black mb-8 border-b-[6px] border-black pb-4">Live Panel Feed</h3>
            
            <div className="space-y-6">
              {logs.map((log, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -50, scale: 0.8 }} 
                  animate={{ opacity: 1, x: 0, scale: 1 }} 
                  className={`p-4 border-[4px] border-black font-black uppercase text-xl inline-block relative ${i % 2 === 0 ? 'bg-[#FFFF00] self-start transform -rotate-1' : 'bg-[#00E5FF] self-end transform rotate-1 ml-12'}`}
                  style={{ display: 'table' }}
                >
                   {/* Speech bubble tail */}
                   <div className={`absolute top-1/2 -mt-2 w-4 h-4 bg-inherit border-b-[4px] border-l-[4px] border-black ${i % 2 === 0 ? '-left-[10px] rotate-45' : '-right-[10px] -rotate-[135deg]'}`} />
                   {log}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {stage === 'result' && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white border-[12px] border-black p-8 shadow-[20px_20px_0_#000] relative">
            
            <div className="absolute -top-8 -left-8 bg-[#00FF66] p-4 border-[6px] border-black rounded-full shadow-[8px_8px_0_#000] rotate-[-15deg]">
               <CheckCircle2 size={64} className="text-black" />
            </div>

            <h2 className="text-6xl font-black uppercase text-center mb-12" style={{ textShadow: '4px 4px 0 #00FF66' }}>Resolution!</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-black uppercase">
              <div className="bg-gray-100 border-[6px] border-black p-6 shadow-[8px_8px_0_#000] transform rotate-1">
                <span className="text-black bg-[#FFFF00] px-2 border-[2px] border-black block w-fit mb-4 text-xs">The Threat</span>
                <span className="text-4xl leading-none">{challenge}</span>
              </div>
              
              <div className="bg-gray-100 border-[6px] border-black p-6 shadow-[8px_8px_0_#000] transform -rotate-1">
                <span className="text-black bg-[#00E5FF] px-2 border-[2px] border-black block w-fit mb-4 text-xs">The Heroes</span>
                <span className="text-3xl leading-none">{selectedPersonas.join(' vs ')}</span>
              </div>

              <div className="md:col-span-2 bg-[#FF0055] text-white border-[8px] border-black p-8 shadow-[12px_12px_0_#000]">
                <h4 className="text-3xl mb-4 flex items-center gap-4" style={{ textShadow: '2px 2px 0 #000' }}><ShieldAlert size={32}/> Plot Twist!</h4>
                <p className="text-xl">
                  The council reached a dialectic fusion! The Ethical Guard established boundaries, while the System Architect optimized the load. Crisis averted! (For now...)
                </p>
              </div>

              <button onClick={() => setStage('setup')} className="md:col-span-2 bg-black text-[#c4ff00] py-6 border-[8px] border-white text-4xl hover:bg-[#00E5FF] hover:text-black transition-colors mt-4 shadow-[12px_12px_0_#000]">
                Next Issue!
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}