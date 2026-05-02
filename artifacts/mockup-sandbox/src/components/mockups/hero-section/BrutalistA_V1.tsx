import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wand2, ArrowRight } from 'lucide-react';
import './_group.css';

export function BrutalistA_V1() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#E5E5E5] text-black font-sans overflow-hidden relative selection:bg-[#FF3366] selection:text-white">
      {/* Background brutalist grid - made tighter */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 2px, transparent 2px), linear-gradient(90deg, #000 2px, transparent 2px)', backgroundSize: '64px 64px', opacity: 0.03 }} />

      {/* Marquee Banner */}
      <div className="absolute top-0 left-0 w-full bg-[#CCFF00] border-b-4 border-black py-2 z-50 overflow-hidden flex whitespace-nowrap">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }} 
          transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
          className="flex items-center gap-8 font-black uppercase tracking-widest text-sm"
        >
          {Array(10).fill("COLLECTIVE OS // NEO-BRUTALIST PIPELINE // ").map((t, i) => <span key={i}>{t}</span>)}
        </motion.div>
      </div>

      <div className="max-w-[1440px] mx-auto p-8 pt-20 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 h-screen items-center">
        
        {/* Left: Typography & Gen Pipeline */}
        <div className="lg:col-span-7 flex flex-col gap-10">
          <motion.div 
            className="flex flex-col gap-2"
            initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ staggerChildren: 0.1 }}
          >
            <h1 className="text-7xl md:text-8xl lg:text-[10rem] font-black uppercase tracking-tighter leading-[0.8] flex flex-col">
              <span>Shatter</span>
              <span className="bg-black text-white px-6 py-2 inline-block self-start transform -rotate-1 mt-2">The Grid.</span>
            </h1>
          </motion.div>

          <p className="text-2xl font-bold max-w-xl border-l-[12px] border-[#FF3366] pl-6 py-2 leading-snug">
            An open-source generative pipeline for tactile, collage-based visual assets. Stop using flat stock photos. <span className="bg-[#CCFF00] px-2 py-1">Build depth.</span>
          </p>

          {/* Interactive Pipeline Module */}
          <div className="bg-white border-4 border-black p-8 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-6 max-w-2xl group relative">
            <div className="absolute -top-6 -right-6 bg-[#33CCFF] border-4 border-black w-12 h-12 rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-spin-slow flex items-center justify-center">
                <div className="w-4 h-4 bg-black rounded-full" />
            </div>
            
            <div className="flex items-center justify-between border-b-4 border-black pb-4">
              <div className="flex items-center gap-3 font-black uppercase tracking-widest text-base">
                <Wand2 size={24} className="text-[#FF3366]" /> Generation Pipeline
              </div>
              <div className="bg-black text-white px-3 py-1 text-xs font-bold uppercase tracking-widest">v2.0.4</div>
            </div>
            
            <textarea 
              className="w-full bg-[#f4f4f4] border-4 border-black p-5 font-mono text-base resize-none h-32 focus:outline-none focus:bg-[#E5E5E5] transition-colors placeholder:text-gray-400"
              placeholder="Describe the asset... e.g., 'A paper tear collage of a holographic bust'"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <select className="border-4 border-black p-4 font-mono text-sm font-bold cursor-pointer bg-white hover:bg-[#CCFF00] transition-colors focus:outline-none flex-1 max-w-[200px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <option>Flux.1 Dev</option>
                <option>SDXL Turbo</option>
                <option>Midjourney v6</option>
              </select>
              <button 
                onClick={handleGenerate}
                className="flex-[2] bg-black text-white font-black uppercase tracking-widest text-lg py-4 border-4 border-black hover:bg-[#FF3366] hover:text-white transition-colors flex items-center justify-center gap-2 group-hover:shadow-[8px_8px_0px_0px_rgba(255,51,102,1)] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none"
              >
                {isGenerating ? 'Synthesizing...' : 'Generate Asset'} <ArrowRight size={20} className={isGenerating ? "animate-spin" : ""} />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Collage Tear Interactive Image - Stacked */}
        <div className="lg:col-span-5 relative h-[600px] flex items-center justify-center mt-12 lg:mt-0">
           {/* Background decorative elements */}
           <div className="absolute w-[400px] aspect-[3/4] border-4 border-black bg-[#33CCFF] transform rotate-6 translate-x-12 translate-y-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]" />
           <div className="absolute w-[400px] aspect-[3/4] border-4 border-black bg-black transform -rotate-3 -translate-x-6 -translate-y-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]" />

           <motion.div 
             className="relative w-full max-w-md aspect-[3/4] border-8 border-black bg-white p-4 shadow-[24px_24px_0px_0px_rgba(0,0,0,1)] z-10"
             drag
             dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
             whileDrag={{ scale: 1.05, shadow: "40px 40px 0px 0px rgba(0,0,0,1)", rotate: 2 }}
           >
             <div className="w-full h-full relative overflow-hidden bg-black flex items-center justify-center group cursor-grab active:cursor-grabbing border-4 border-black">
                <img src="/images/hero-collage.webp" alt="Collage" className="w-full h-full object-cover opacity-90 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700" />
                
                {/* Overlay UI */}
                <div className="absolute top-4 right-4 bg-white text-black font-mono text-xs font-bold px-4 py-2 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-[#CCFF00] transition-colors">
                  [ DRAG TO INSPECT ]
                </div>

                <div className="absolute bottom-4 left-4 bg-black text-white font-mono text-[10px] font-bold px-3 py-1 border-2 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                  IMG_ID: #77492_A
                </div>
             </div>
           </motion.div>
        </div>
      </div>
    </div>
  );
}