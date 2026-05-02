import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Camera, Settings, Lightbulb, Box, Image as ImageIcon, Sparkles, Send } from 'lucide-react';

export default function PromptwareModule({ setPage }: { setPage: (p: string) => void }) {
  const [params, setParams] = useState({
    subject: "A wireless speaker",
    style: "Pop Art",
    lighting: "Neon glow",
    atmosphere: "Energetic",
  });

  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setResult(true);
    }, 2000);
  };

  const finalPrompt = `${params.subject}, ${params.style}, ${params.lighting}, ${params.atmosphere} --v 6.1`;

  return (
    <div className="min-h-screen bg-[#00E5FF] font-sans selection:bg-black selection:text-[#00E5FF] relative overflow-hidden pb-24">
      {/* Halftone Background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'radial-gradient(circle, #000 2px, transparent 2.5px)', backgroundSize: '16px 16px' }} />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10 pt-8">
        
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 bg-white border-[8px] border-black p-8 shadow-[16px_16px_0_#FF0055] transform -rotate-1">
          <div>
            <button 
              onClick={() => setPage('home')}
              className="flex items-center gap-2 font-black uppercase mb-6 text-black hover:text-[#00E5FF] bg-white px-4 py-2 border-[4px] border-black transition-colors w-fit text-sm shadow-[4px_4px_0_#000]"
            >
              <ArrowLeft size={16} /> Back
            </button>
            <h1 className="text-6xl md:text-8xl font-black uppercase leading-[0.8] tracking-tighter text-black" style={{ textShadow: '4px 4px 0 #FFFF00, 8px 8px 0 #000' }}>
              Promptware<br/>Comic!
            </h1>
          </div>
          <div className="mt-6 md:mt-0">
             <div className="bg-black text-white px-6 py-3 border-[4px] border-white font-black uppercase text-xl shadow-[8px_8px_0_#FFFF00] rotate-3 flex items-center gap-4">
                <Sparkles className="text-[#FFFF00]" />
                Compile Your Vision!
             </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Left Side: Comic Panels for Inputs */}
          <div className="md:col-span-7 grid grid-cols-2 gap-6">
            
            {/* Panel 1 */}
            <div className="col-span-2 bg-white border-[8px] border-black p-6 shadow-[12px_12px_0_#000] relative group">
              <div className="absolute -top-4 left-4 bg-[#FF0055] text-white px-3 py-1 font-black uppercase border-[3px] border-black rotate-[-5deg]">1. The Subject</div>
              <textarea 
                value={params.subject}
                onChange={e => setParams({...params, subject: e.target.value})}
                className="w-full mt-4 text-3xl font-black uppercase bg-transparent outline-none resize-none overflow-hidden h-20"
                style={{ WebkitTextStroke: '1px black', color: 'transparent', textShadow: '2px 2px 0px #000' }}
              />
              {/* Sticker Decor */}
              <div className="absolute bottom-4 right-4 text-4xl rotate-12 opacity-50 group-hover:opacity-100 transition-opacity">📦</div>
            </div>

            {/* Panel 2 */}
            <div className="col-span-1 bg-[#FFFF00] border-[8px] border-black p-6 shadow-[12px_12px_0_#000] relative">
              <div className="absolute -top-4 left-4 bg-white text-black px-3 py-1 font-black uppercase border-[3px] border-black rotate-[2deg]">2. Style</div>
              <input 
                value={params.style}
                onChange={e => setParams({...params, style: e.target.value})}
                className="w-full mt-6 text-xl font-black uppercase bg-transparent border-b-[4px] border-black outline-none focus:border-[#FF0055]"
              />
            </div>

            {/* Panel 3 */}
            <div className="col-span-1 bg-[#00FF66] border-[8px] border-black p-6 shadow-[12px_12px_0_#000] relative">
              <div className="absolute -top-4 left-4 bg-white text-black px-3 py-1 font-black uppercase border-[3px] border-black rotate-[-3deg]">3. Lighting</div>
              <input 
                value={params.lighting}
                onChange={e => setParams({...params, lighting: e.target.value})}
                className="w-full mt-6 text-xl font-black uppercase bg-transparent border-b-[4px] border-black outline-none focus:border-[#FF0055]"
              />
            </div>

            {/* Panel 4 */}
            <div className="col-span-2 bg-[#9900FF] text-white border-[8px] border-black p-6 shadow-[12px_12px_0_#000] relative">
               <div className="absolute -top-4 left-4 bg-black text-[#00E5FF] px-3 py-1 font-black uppercase border-[3px] border-[#00E5FF] rotate-[4deg]">4. Atmosphere</div>
               <input 
                value={params.atmosphere}
                onChange={e => setParams({...params, atmosphere: e.target.value})}
                className="w-full mt-6 text-3xl font-black uppercase bg-transparent border-b-[4px] border-white outline-none focus:border-[#FFFF00] text-[#FFFF00]"
              />
               <div className="absolute right-0 bottom-0 w-32 h-32 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30 pointer-events-none" />
            </div>
          </div>

          {/* Right Side: Output Panel */}
          <div className="md:col-span-5">
            <div className="sticky top-8 bg-white border-[8px] border-black shadow-[16px_16px_0_#FF0055] p-8 flex flex-col h-full min-h-[600px] transform rotate-1 relative overflow-hidden">
               {/* Frosted Glass Overlay */}
               <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#00E5FF]/40 to-transparent backdrop-blur-[2px] pointer-events-none z-10 border-b-[4px] border-black/10" />

               <h2 className="font-black uppercase text-3xl border-b-[6px] border-black pb-4 mb-6 flex items-center justify-between z-20">
                 The Output <Send size={32} />
               </h2>
               
               <div className="bg-black text-[#00FF66] font-mono text-sm p-4 border-[4px] border-black flex-1 relative z-20 shadow-[inset_0_0_20px_#00FF66] mb-6">
                 {finalPrompt}
               </div>

               <button 
                 onClick={handleGenerate}
                 className="bg-[#FF0055] text-white font-black uppercase text-3xl py-6 border-[6px] border-black hover:bg-[#FFFF00] hover:text-black transition-colors shadow-[8px_8px_0_#000] hover:translate-y-1 hover:translate-x-1 hover:shadow-none z-20 relative overflow-hidden group"
               >
                 <span className="relative z-10">{generating ? "Rendering..." : "Generate!"}</span>
                 <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 z-0" />
               </button>

               <AnimatePresence>
                 {result && (
                   <motion.div 
                     initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
                     animate={{ scale: 1, opacity: 1, rotate: -3 }}
                     className="absolute -bottom-12 -right-12 w-64 h-64 border-[8px] border-black shadow-[12px_12px_0_#00E5FF] bg-white z-30 overflow-hidden"
                   >
                     <img src="https://images.unsplash.com/photo-1545127398-14699f92334b?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                     <div className="absolute top-2 left-2 bg-[#FFFF00] font-black uppercase px-2 border-2 border-black rotate-[-10deg]">Success!</div>
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