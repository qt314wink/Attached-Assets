import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Camera, Settings, Lightbulb, Box, Image as ImageIcon } from 'lucide-react';

export default function PromptwareModule({ setPage }: { setPage: (p: string) => void }) {
  const [params, setParams] = useState({
    subject: "A modern wireless bluetooth speaker, sleek black design",
    style: "Luxury Product Photography",
    equipment: "Hasselblad Medium Format, 100mm Macro Lens",
    lighting: "Three-point studio lighting, softbox, pristine reflections",
    composition: "Center framed, Rule of Thirds, macro detail shot",
    atmosphere: "Clean, inviting, high-end commercial, pristine texture",
    settings: "f/8, deep focus, tack-sharp focus",
    mj_params: "--ar 16:9 --style raw --stylize 100 --v 6.1"
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

  const finalPrompt = `${params.subject}, ${params.style}, ${params.equipment}, ${params.lighting}, ${params.composition}, ${params.atmosphere}, ${params.settings} ${params.mj_params}`;

  return (
    <div className="pt-32 pb-24 px-6 bg-[#f4f2ef] min-h-screen relative text-[#1a1a1a]">
      <div className="max-w-6xl mx-auto relative z-10">
        <button 
          onClick={() => setPage('home')}
          className="flex items-center gap-2 font-black uppercase mb-12 text-black/50 hover:text-black transition-all w-fit text-xs tracking-widest"
        >
          <ArrowLeft size={16} /> Back to Nexus
        </button>

        <div className="mb-16">
          <span className="font-black uppercase tracking-[0.3em] text-xs block mb-4 text-[#8b5cf6]">
            // REGENERATIVE PROMPTING
          </span>
          <h1 className="text-5xl md:text-7xl font-black uppercase leading-none mb-6 tracking-tighter text-[#1a1a1a]">
            The 8-Component<br/>Framework
          </h1>
          <p className="text-xl font-medium max-w-3xl text-black/60">
            Transition from "keyword junk" to natural language specification. Build a prompt like a Director of Photography constructs a set.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-black uppercase tracking-widest text-sm flex items-center gap-2 mb-6">
              <Settings size={16} /> Technical Specifications
            </h3>
            
            <div className="space-y-4">
              {[
                { label: "1. Subject Description", key: "subject", icon: <Box size={14}/> },
                { label: "2. Photography Style", key: "style", icon: <ImageIcon size={14}/> },
                { label: "3. Technical Equipment", key: "equipment", icon: <Camera size={14}/> },
                { label: "4. Lighting Setup", key: "lighting", icon: <Lightbulb size={14}/> },
                { label: "5. Composition & Framing", key: "composition", icon: <Box size={14}/> },
                { label: "6. Atmosphere & Mood", key: "atmosphere", icon: <ImageIcon size={14}/> },
                { label: "7. Technical Camera Settings", key: "settings", icon: <Settings size={14}/> },
                { label: "8. Midjourney Parameters", key: "mj_params", icon: <Settings size={14}/> },
              ].map((field) => (
                <div key={field.key} className="bg-white p-4 border border-black/10 rounded-xl shadow-sm">
                  <label className="flex items-center gap-2 font-black text-[10px] uppercase tracking-widest text-black/40 mb-2">
                    {field.icon} {field.label}
                  </label>
                  <input 
                    type="text" 
                    value={(params as any)[field.key]}
                    onChange={(e) => setParams({...params, [field.key]: e.target.value})}
                    className="w-full bg-transparent border-b border-black/10 focus:border-black outline-none py-2 font-medium text-sm text-black"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="sticky top-32 space-y-6">
              <div className="p-8 bg-[#1a1a1a] text-white rounded-3xl shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/noise-pattern-with-subtle-cross-lines.png')] opacity-10 pointer-events-none" />
                <h4 className="font-black uppercase text-xs tracking-widest text-[#8b5cf6] mb-4">Compiled Output</h4>
                <div className="font-mono text-sm leading-relaxed opacity-90 break-words">
                  {finalPrompt}
                </div>
                
                <button 
                  onClick={handleGenerate}
                  className="mt-8 w-full py-4 bg-white text-black font-black uppercase text-sm tracking-widest rounded-xl hover:bg-[#8b5cf6] hover:text-white transition-colors"
                >
                  {generating ? "Orchestrating..." : "Execute Render"}
                </button>
              </div>

              <AnimatePresence>
                {result && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="aspect-[16/9] bg-black rounded-3xl overflow-hidden relative shadow-xl border border-black/10"
                  >
                     <img 
                      src="https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=2962&auto=format&fit=crop" 
                      alt="Generated Render"
                      className="w-full h-full object-cover opacity-90 mix-blend-luminosity"
                    />
                    <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur p-4 rounded-xl text-white">
                      <div className="font-black text-xs uppercase tracking-widest text-[#c4ff00] mb-1">SNR Optimized</div>
                      <div className="text-[10px] opacity-70">100% adherence to 8-Component Framework. Junk keywords eliminated.</div>
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