import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Search, Key, ShieldAlert, Cpu, Eye, ArrowRight, Zap, Target, Lock } from 'lucide-react';
import { Nav } from '@/components/Layout';

export default function EnigmaEngineModule({ setPage }: { setPage: (p: string) => void }) {
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState([
    { text: "INITIALIZING RABBIT HOLE PROTOCOL...", type: 'system' },
    { text: "Awaiting collective input. The answers are irrelevant. Find the hidden questions.", type: 'ai' }
  ]);
  const [solvedPieces, setSolvedPieces] = useState(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLogs(prev => [...prev, { text: `> ${input}`, type: 'user' }]);
    
    setTimeout(() => {
      let response = "That is an answer to a question no one asked. Look closer at the pattern.";
      let type = 'ai';

      if (input.toLowerCase().includes('pattern') || input.toLowerCase().includes('scale')) {
        response = "You are beginning to see. The repetition occurs not in the image, but in the spaces between. Tool suggested: [SPECTRAL_ANALYZER_UNLOCKED]";
        setSolvedPieces(prev => Math.min(prev + 1, 9));
        type = 'success';
      }

      setLogs(prev => [...prev, { text: response, type }]);
    }, 1000);

    setInput('');
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#FF0055] selection:text-white">
      <div className="fixed inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #00FF66 1px, transparent 2px)', backgroundSize: '24px 24px' }} />
      <Nav currentPage="module-enigma" setPage={setPage} />

      <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div className="lg:col-span-12 mb-8">
           <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none" style={{ textShadow: '4px 4px 0 #00FF66, 8px 8px 0 #FF0055' }}>
            The Enigma Engine
          </h1>
          <div className="bg-white text-black font-black uppercase px-6 py-2 border-[6px] border-black shadow-[8px_8px_0_#00FF66] transform -rotate-1 mt-6 text-xl inline-block">
            Vol 14: The Rabbit Hole
          </div>
        </div>

        {/* Terminal Section */}
        <div className="lg:col-span-8 bg-[#111] border-[8px] border-[#00FF66] shadow-[12px_12px_0_#FF0055] p-6 flex flex-col h-[600px] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-8 bg-[#00FF66] border-b-[8px] border-black flex items-center px-4 justify-between">
            <span className="font-black text-black uppercase text-sm flex items-center gap-2"><Terminal size={16}/> BIDIRECTIONAL_DIALOGUE.EXE</span>
            <div className="flex gap-2">
              <div className="w-4 h-4 bg-black rounded-full" />
              <div className="w-4 h-4 bg-[#FF0055] rounded-full" />
            </div>
          </div>
          
          <div className="mt-8 flex-1 overflow-y-auto custom-scrollbar font-mono text-sm space-y-4 pr-4 pb-4 flex flex-col justify-end">
            {logs.map((log, i) => (
              <motion.div 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }} 
                key={i} 
                className={`p-3 border-l-4 ${
                  log.type === 'system' ? 'border-gray-500 text-gray-400' : 
                  log.type === 'ai' ? 'border-[#00FF66] text-[#00FF66] bg-[#00FF66]/10' : 
                  log.type === 'success' ? 'border-[#FFFF00] text-[#FFFF00] bg-[#FFFF00]/10 font-bold' :
                  'border-[#FF0055] text-white'
                }`}
              >
                {log.text}
              </motion.div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mt-4 relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#00FF66]">
              <ArrowRight size={20} />
            </div>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Input your hypothesis or synthesized pattern..."
              className="w-full bg-black border-[4px] border-[#00FF66] text-white p-4 pl-12 font-mono uppercase focus:outline-none focus:border-[#FF0055] transition-colors"
            />
          </form>
        </div>

        {/* Global Pattern Tracker */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white text-black border-[8px] border-black p-6 shadow-[12px_12px_0_#00FF66]">
            <h3 className="font-black uppercase text-2xl mb-4 border-b-4 border-black pb-2 flex items-center gap-2">
              <Eye size={24} /> Global Pattern
            </h3>
            <p className="font-bold text-sm mb-6 uppercase">
              The community is assembling the fragments. Spot the answer across scales.
            </p>
            
            <div className="grid grid-cols-3 gap-2">
              {[...Array(9)].map((_, i) => (
                <div 
                  key={i} 
                  className={`aspect-square border-[4px] border-black flex items-center justify-center transition-colors ${i < solvedPieces ? 'bg-[#00FF66]' : 'bg-gray-200'}`}
                >
                  {i < solvedPieces ? <Key size={24} className="text-black" /> : <Lock size={24} className="text-gray-400" />}
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t-4 border-black flex justify-between font-black uppercase text-sm">
              <span>Decryption Progress</span>
              <span className="text-[#FF0055]">{Math.round((solvedPieces / 9) * 100)}%</span>
            </div>
          </div>

          <div className="bg-[#FFFF00] text-black border-[8px] border-black p-6 shadow-[12px_12px_0_#FF0055] transform rotate-2">
            <h3 className="font-black uppercase text-xl mb-2 flex items-center gap-2">
              <Cpu size={20} /> Suggested Tools
            </h3>
            <p className="text-sm font-bold mb-4 uppercase">Unlocked via collective discovery.</p>
            <ul className="space-y-3">
              <li className="flex items-center justify-between border-b-2 border-black/20 pb-2">
                <span className="font-black uppercase text-sm line-through opacity-50">Syntax Breaker</span>
                <Lock size={16} />
              </li>
              <li className="flex items-center justify-between border-b-2 border-black/20 pb-2">
                <span className="font-black uppercase text-sm">Spectral Analyzer</span>
                <Key size={16} />
              </li>
              <li className="flex items-center justify-between border-b-2 border-black/20 pb-2">
                <span className="font-black uppercase text-sm line-through opacity-50">Paradox Engine</span>
                <Lock size={16} />
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}