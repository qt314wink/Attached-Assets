import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wand2 } from 'lucide-react';

export function CollageHero({ setPage }: { setPage: (p: string) => void }) {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (!prompt) return;
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 2000);
  };

  return (
    <div className="min-h-[85vh] bg-[#E5E5E5] text-black font-sans overflow-hidden relative pt-24 pb-12 flex items-center">
      {/* Background brutalist grid */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '100px 100px', opacity: 0.05 }} />

      <div className="max-w-[1440px] mx-auto px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-center">
        
        {/* Left: Typography & Gen Pipeline */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <motion.h1 
            className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.85]"
            initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
          >
            Shatter <br/>
            <span className="bg-black text-white px-4 inline-block mt-2 transform -rotate-2">The Grid.</span>
          </motion.h1>

          <p className="text-xl font-medium max-w-xl border-l-8 border-black pl-6 py-2">
            An open-source generative pipeline for tactile, collage-based visual assets. Stop using flat stock photos. Build depth.
          </p>

          {/* Interactive Pipeline Module */}
          <div className="bg-white border-4 border-black p-6 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-4 transform hover:-translate-y-1 transition-transform max-w-2xl">
            <div className="flex items-center gap-2 font-bold uppercase tracking-widest text-sm border-b-4 border-black pb-4 mb-2">
              <Wand2 size={20} /> Open Source Generation Pipeline
            </div>
            <textarea 
              className="w-full bg-[#f4f4f4] border-4 border-black p-4 font-mono text-sm resize-none h-24 focus:outline-none focus:bg-white transition-colors"
              placeholder="Describe the asset... e.g., 'A paper tear collage of a holographic bust'"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <select className="border-4 border-black p-3 font-mono text-xs font-bold cursor-pointer bg-[#CCFF00] hover:bg-white transition-colors focus:outline-none">
                <option>Model: Flux.1 Dev</option>
                <option>Model: SDXL Turbo</option>
              </select>
              <button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="flex-1 bg-black text-white font-bold uppercase tracking-widest text-sm py-4 hover:bg-[#FF3366] border-4 border-black transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isGenerating ? 'Synthesizing...' : 'Generate Asset'}
              </button>
            </div>
            
            <button 
              onClick={() => setPage('forge')}
              className="mt-2 text-xs font-bold uppercase underline underline-offset-4 hover:text-[#FF3366] transition-colors self-start"
            >
              Access Component Forge →
            </button>
          </div>
        </div>

        {/* Right: Collage Tear Interactive Image */}
        <div className="lg:col-span-5 relative h-full flex items-center justify-center mt-12 lg:mt-0">
           <motion.div 
             className="relative w-full max-w-md aspect-[3/4] border-8 border-black bg-white p-4 shadow-[24px_24px_0px_0px_rgba(0,0,0,1)]"
             drag
             dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
             whileDrag={{ scale: 1.05, shadow: "32px 32px 0px 0px rgba(0,0,0,1)" }}
           >
             <div className="w-full h-full relative overflow-hidden bg-black flex items-center justify-center group cursor-grab active:cursor-grabbing border-4 border-black">
                <img src="/images/hero-collage.webp" alt="Collage" className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-700" />
                
                {/* Overlay UI */}
                <div className="absolute top-4 right-4 bg-white text-black font-mono text-xs font-bold px-3 py-1 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  [ DRAG TO INSPECT ]
                </div>
             </div>
           </motion.div>
        </div>
      </div>
    </div>
  );
}