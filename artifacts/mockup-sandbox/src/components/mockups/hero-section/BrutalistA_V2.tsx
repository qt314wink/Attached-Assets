import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Cpu, Download, ArrowDownCircle } from 'lucide-react';
import './_group.css';

export function BrutalistA_V2() {
  const [prompt, setPrompt] = useState('A tactile paper tear collage of an abstract architectural form, high contrast, brutalist typography.');
  const [isGenerating, setIsGenerating] = useState(false);
  const [logs, setLogs] = useState<string[]>(["> SYSTEM READY", "> WAITING FOR INPUT..."]);
  const [showResult, setShowResult] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setShowResult(false);
    setLogs(["> INITIALIZING PIPELINE...", "> LOADING MODEL WEIGHTS (FLUX.1)"]);
    
    setTimeout(() => setLogs(l => [...l, "> PARSING PROMPT..."]), 800);
    setTimeout(() => setLogs(l => [...l, "> GENERATING LATENT NOISE..."]), 1600);
    setTimeout(() => setLogs(l => [...l, "> APPLYING TACTILE MASK..."]), 2400);
    setTimeout(() => {
      setLogs(l => [...l, "> RENDER COMPLETE. OUTPUT READY."]);
      setIsGenerating(false);
      setShowResult(true);
    }, 3200);
  };

  return (
    <div className="min-h-screen bg-[#111] text-white font-sans overflow-hidden relative">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <div className="max-w-[1600px] mx-auto p-4 md:p-8 h-screen flex flex-col justify-center relative z-10">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b-4 border-white pb-6 z-10">
          <motion.h1 
            className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none"
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          >
            Shatter <br/>
            <span className="text-[#33CCFF]">The Grid.</span>
          </motion.h1>
          <p className="text-xl font-mono font-bold max-w-sm text-right mt-6 md:mt-0 text-gray-400 border-r-4 border-[#33CCFF] pr-4">
            An open-source generative pipeline for tactile visual assets.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 z-10 h-auto md:h-[600px]">
          
          {/* Left: Terminal & Controls */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Input Panel */}
            <div className="bg-[#222] border-4 border-white p-6 md:p-8 shadow-[16px_16px_0px_0px_#FF3366] flex flex-col h-full relative">
              <div className="absolute -top-4 -left-4 bg-white text-black font-black uppercase px-6 py-2 text-sm border-4 border-black">
                Control Panel_V2
              </div>
              
              <div className="mt-4 flex-1 flex flex-col">
                <label className="font-mono text-sm uppercase font-bold text-[#CCFF00] mb-3 flex items-center gap-2">
                  <Terminal size={18} /> Asset Prompt Configuration
                </label>
                <textarea 
                  className="flex-1 bg-black border-4 border-gray-600 p-5 font-mono text-lg text-white resize-none focus:outline-none focus:border-[#33CCFF] focus:ring-0 transition-colors shadow-inner"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>

              {/* Terminal Logs */}
              <div className="mt-6 h-40 bg-black border-4 border-gray-800 p-5 font-mono text-xs md:text-sm overflow-y-auto flex flex-col justify-end shadow-inner relative">
                <div className="absolute top-2 right-2 flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                {logs.map((log, i) => (
                  <div key={i} className={log.includes('COMPLETE') ? 'text-[#CCFF00] font-bold' : 'text-gray-400'}>
                    {log}
                  </div>
                ))}
                {isGenerating && <div className="text-white animate-pulse">_</div>}
              </div>

              <div className="mt-6 flex gap-4">
                <button 
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="flex-1 bg-[#CCFF00] text-black font-black uppercase tracking-widest text-xl py-5 border-4 border-black hover:border-[#CCFF00] hover:bg-black hover:text-[#CCFF00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none"
                >
                  <Cpu size={24} className={isGenerating ? "animate-spin" : ""} />
                  {isGenerating ? 'Processing...' : 'Run Pipeline'}
                </button>
              </div>
            </div>
          </div>

          {/* Right: Output Polaroid */}
          <div className="lg:col-span-5 h-full relative bg-[#222] border-4 border-white p-8 flex items-center justify-center mt-12 lg:mt-0 shadow-[16px_16px_0px_0px_#33CCFF]">
             <div className="absolute -top-4 -right-4 bg-[#CCFF00] text-black font-black uppercase px-6 py-2 text-sm border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                Output Viewport
             </div>

             <div className="w-full h-full flex items-center justify-center relative">
               {!showResult && !isGenerating && (
                 <div className="text-center font-mono text-gray-500 font-bold uppercase tracking-widest flex flex-col items-center gap-4">
                   <ArrowDownCircle size={48} className="animate-bounce" />
                   Awaiting Pipeline Execution
                 </div>
               )}

               {isGenerating && (
                 <div className="w-full max-w-sm aspect-[3/4] border-4 border-gray-600 bg-black flex items-center justify-center animate-pulse shadow-inner">
                   <span className="font-mono font-bold text-[#FF3366] uppercase tracking-widest text-xl">Rendering...</span>
                 </div>
               )}

               <AnimatePresence>
                 {showResult && (
                   <motion.div 
                     initial={{ y: -50, opacity: 0, rotate: -15, scale: 0.8 }}
                     animate={{ y: 0, opacity: 1, rotate: 2, scale: 1 }}
                     transition={{ type: "spring", stiffness: 200, damping: 20 }}
                     className="w-full max-w-sm aspect-[3/4] bg-white border-8 border-white p-4 pb-20 shadow-[24px_24px_0px_0px_rgba(0,0,0,1)] relative cursor-grab active:cursor-grabbing group"
                     drag
                     dragConstraints={{ left: -30, right: 30, top: -30, bottom: 30 }}
                     whileDrag={{ scale: 1.05, shadow: "32px 32px 0px 0px rgba(0,0,0,1)", rotate: 5 }}
                   >
                      <div className="w-full h-full bg-black overflow-hidden border-4 border-black">
                        <img src="/images/hero-collage.webp" alt="Output" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
                      </div>
                      
                      <div className="absolute bottom-6 left-6 font-mono text-black font-black text-sm uppercase flex justify-between w-[calc(100%-48px)] items-center">
                        <span className="bg-[#CCFF00] px-2 py-1 border-2 border-black">#GEN_7749</span>
                        <button className="bg-black text-white p-2 border-2 border-black hover:bg-[#FF3366] hover:scale-110 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none">
                          <Download size={18} />
                        </button>
                      </div>
                   </motion.div>
                 )}
               </AnimatePresence>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}