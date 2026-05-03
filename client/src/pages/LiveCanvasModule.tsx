import React, { useState } from 'react';
import { motion, Reorder } from 'framer-motion';
import { Layers, Image as ImageIcon, Sparkles, Download, Share2, Zap, RefreshCcw, Box } from 'lucide-react';
import { Nav } from '@/components/Layout';

const INITIAL_ASSETS = [
  { id: '1', color: 'bg-[#FF0055]', text: 'NEON GRIT', rotation: -2, zIndex: 1 },
  { id: '2', color: 'bg-[#00E5FF]', text: 'CYBER PUNK', rotation: 4, zIndex: 2 },
  { id: '3', color: 'bg-[#FFFF00]', text: 'HALFTONE', rotation: -5, zIndex: 3 },
  { id: '4', color: 'bg-[#00FF66]', text: 'ACID TRIP', rotation: 3, zIndex: 4 },
];

export default function LiveCanvasModule({ setPage }: { setPage: (p: string) => void }) {
  const [items, setItems] = useState(INITIAL_ASSETS);
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt) return;
    
    setIsGenerating(true);
    setTimeout(() => {
      const colors = ['bg-[#FF0055]', 'bg-[#00E5FF]', 'bg-[#FFFF00]', 'bg-[#00FF66]', 'bg-[#FF66CC]'];
      const newItem = {
        id: Math.random().toString(),
        color: colors[Math.floor(Math.random() * colors.length)],
        text: prompt.toUpperCase().slice(0, 15),
        rotation: (Math.random() * 10) - 5,
        zIndex: items.length + 1
      };
      setItems([...items, newItem]);
      setPrompt("");
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-[#00E5FF] selection:text-black">
      <div className="fixed inset-0 opacity-10 pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'radial-gradient(circle, #000 2px, transparent 2.5px)', backgroundSize: '16px 16px' }} />
      <Nav currentPage="module-livecanvas" setPage={setPage} />

      <div className="pt-32 pb-24 px-6 max-w-[1600px] mx-auto relative z-10 grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        <div className="xl:col-span-12 mb-8">
           <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none" style={{ textShadow: '4px 4px 0 #00E5FF, 8px 8px 0 #000' }}>
            Live Collage Canvas
          </h1>
          <div className="bg-black text-white font-black uppercase px-6 py-2 border-[6px] border-[#00E5FF] shadow-[8px_8px_0_#FF0055] transform rotate-1 mt-6 text-xl inline-block">
            Vol 15: Generative Community
          </div>
        </div>

        {/* Live Feed / Collage Area */}
        <div className="xl:col-span-8">
          <div className="bg-[#E5E5E5] border-[8px] border-black shadow-[16px_16px_0_#000] p-6 h-[700px] relative overflow-hidden flex flex-col">
            <div className="absolute top-4 left-4 bg-white border-[4px] border-black px-4 py-2 font-black uppercase text-sm shadow-[4px_4px_0_#000] z-20 flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" /> LIVE FEED
            </div>

            {/* The Draggable Collage Zone */}
            <div className="flex-1 relative w-full h-full mt-12 bg-white border-[4px] border-black overflow-hidden" style={{ backgroundImage: 'linear-gradient(#f0f0f0 1px, transparent 1px), linear-gradient(90deg, #f0f0f0 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
              <Reorder.Group axis="y" values={items} onReorder={setItems} className="absolute inset-0 p-8 flex flex-wrap gap-4 items-start justify-start">
                {items.map((item) => (
                  <Reorder.Item key={item.id} value={item} as="div" className="inline-block cursor-grab active:cursor-grabbing">
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-48 h-48 ${item.color} border-[6px] border-black shadow-[8px_8px_0_#000] flex items-center justify-center p-4 relative group`}
                      style={{ rotate: item.rotation }}
                    >
                      <span className="font-black uppercase text-2xl text-black text-center mix-blend-overlay break-words">{item.text}</span>
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 pointer-events-none" />
                      
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                         <button className="bg-white border-2 border-black p-1 hover:bg-[#00E5FF]"><Sparkles size={12}/></button>
                      </div>
                    </motion.div>
                  </Reorder.Item>
                ))}
              </Reorder.Group>
            </div>

            {/* Generative Input */}
            <form onSubmit={handleGenerate} className="mt-6 flex gap-4">
              <div className="flex-1 relative">
                <input 
                  type="text" 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Prompt the engine (e.g. 'Neon Skull', 'Halftone City')..."
                  className="w-full bg-white border-[6px] border-black p-4 pl-12 font-black uppercase text-lg focus:outline-none focus:border-[#FF0055] transition-colors shadow-[6px_6px_0_#000]"
                />
                <Zap className="absolute left-4 top-1/2 -translate-y-1/2 text-black" size={24} />
              </div>
              <button 
                type="submit"
                disabled={isGenerating}
                className="bg-[#00E5FF] border-[6px] border-black px-8 font-black uppercase text-xl hover:bg-[#FF0055] hover:text-white transition-colors shadow-[6px_6px_0_#000] flex items-center gap-2 whitespace-nowrap active:translate-y-2 active:translate-x-2 active:shadow-none"
              >
                {isGenerating ? <RefreshCcw className="animate-spin" /> : "Conjure"}
              </button>
            </form>

          </div>
        </div>

        {/* Sidebar */}
        <div className="xl:col-span-4 space-y-8">
          
          <div className="bg-[#FFFF00] border-[8px] border-black p-6 shadow-[12px_12px_0_#000] transform rotate-1">
            <h3 className="font-black uppercase text-2xl mb-4 border-b-4 border-black pb-2 flex items-center gap-2">
              <Layers size={24} /> Actions
            </h3>
            <div className="space-y-4">
              <button className="w-full bg-white border-[4px] border-black p-4 font-black uppercase flex items-center justify-between hover:bg-black hover:text-white transition-colors shadow-[4px_4px_0_#000]">
                <span>Publish to Feed</span> <Share2 />
              </button>
              <button className="w-full bg-white border-[4px] border-black p-4 font-black uppercase flex items-center justify-between hover:bg-black hover:text-white transition-colors shadow-[4px_4px_0_#000]">
                <span>Export Collage</span> <Download />
              </button>
              <button className="w-full bg-black text-white border-[4px] border-black p-4 font-black uppercase flex items-center justify-between hover:bg-[#FF0055] hover:text-white transition-colors shadow-[4px_4px_0_#FF0055]">
                <span>Fork Canvas</span> <Box />
              </button>
            </div>
          </div>

          <div className="bg-white border-[8px] border-black p-6 shadow-[12px_12px_0_#00E5FF] transform -rotate-1">
            <h3 className="font-black uppercase text-xl mb-4 border-b-4 border-black pb-2 flex items-center gap-2">
              <ImageIcon size={20} /> Community Assets
            </h3>
            <p className="font-bold text-sm mb-4 uppercase">Recent generations from the collective.</p>
            <div className="grid grid-cols-2 gap-4">
               {[1,2,3,4].map(i => (
                 <div key={i} className="aspect-square border-[4px] border-black bg-gray-100 flex items-center justify-center group cursor-pointer overflow-hidden relative">
                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[#00E5FF] font-black uppercase text-xs bg-black px-2 py-1 mb-1">Drag</span>
                      <span className="text-[#FF0055] font-black uppercase text-xs bg-black px-2 py-1">Remix</span>
                    </div>
                 </div>
               ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}