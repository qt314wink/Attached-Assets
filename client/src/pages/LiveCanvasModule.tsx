import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { 
  Palette, Zap, Image as ImageIcon, Sparkles, Move, Maximize2, 
  Cpu, Layers, Eye, Crosshair, Fingerprint, Lock, SlidersHorizontal, Share2, Focus
} from 'lucide-react';
import { Nav } from '@/components/Layout';

// Mock data for the complex poetic prompt
const POETIC_PROMPT = "A wild forest floor with canary yellow daffodils and a little green door. Beyond it theres a mountain range with a proud cat facing north. Go further still, you'll find Poseidon's lost shore...";

interface CanvasElement {
  id: string;
  type: 'image' | 'text' | 'component';
  content: string;
  color: string;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  tags: string[];
}

export default function LiveCanvasModule({ setPage }: { setPage: (p: string) => void }) {
  const [elements, setElements] = useState<CanvasElement[]>([
    { id: '1', type: 'text', content: 'CANARY YELLOW DAFFODILS', color: 'bg-[#FFFF00]', x: 50, y: 50, w: 300, h: 100, z: 1, tags: ['foreground', 'flora'] },
    { id: '2', type: 'image', content: 'PROUD CAT (NORTH)', color: 'bg-[#FF0055]', x: 200, y: 200, w: 250, h: 250, z: 2, tags: ['subject', 'fauna', 'proud'] },
    { id: '3', type: 'component', content: 'LITTLE GREEN DOOR', color: 'bg-[#00FF66]', x: 400, y: 100, w: 200, h: 350, z: 3, tags: ['midground', 'portal'] }
  ]);
  
  const [prompt, setPrompt] = useState("");
  const [isExtracting, setIsExtracting] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);

  // Semantics & Inference State
  const [inference, setInference] = useState({
    palette: ['#FFFF00', '#00FF66', '#FF0055'],
    composition: 'Golden Ratio (Center-Weighted)',
    lighting: 'Harsh Directional (Lux: 8500)',
    abstraction: {
      feelsLike: 'Lonesome, Proud, Wild',
      remindsMeOf: 'Saharan fields, Mythology',
      evokes: 'The Mushroom King integration'
    }
  });

  const handlePoeticExtraction = (e: React.FormEvent) => {
    e.preventDefault();
    setIsExtracting(true);
    
    // Simulate API Orchestration (HuggingFace / Civitai / Design System Parsing)
    setTimeout(() => {
      const newElements: CanvasElement[] = [
        { id: Math.random().toString(), type: 'image', content: "POSEIDON'S SHORE", color: 'bg-[#00E5FF]', x: 100, y: 400, w: 400, h: 200, z: elements.length + 1, tags: ['background', 'oceanic'] },
        { id: Math.random().toString(), type: 'text', content: "LION'S ROAR", color: 'bg-[#FF9900]', x: 500, y: 450, w: 250, h: 150, z: elements.length + 2, tags: ['audio-visual', 'kinetic'] }
      ];
      setElements([...elements, ...newElements]);
      setPrompt("");
      setIsExtracting(false);
    }, 2000);
  };

  const updateElement = (id: string, updates: Partial<CanvasElement>) => {
    setElements(elements.map(el => el.id === id ? { ...el, ...updates } : el));
  };

  const bringToFront = (id: string) => {
    const maxZ = Math.max(...elements.map(e => e.z));
    updateElement(id, { z: maxZ + 1 });
    setSelectedId(id);
  };

  return (
    <div className="min-h-screen bg-[#E5E5E5] text-black font-sans selection:bg-[#00E5FF] selection:text-black overflow-hidden flex flex-col">
      <div className="fixed inset-0 opacity-10 pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'radial-gradient(circle, #000 2px, transparent 2.5px)', backgroundSize: '16px 16px' }} />
      
      <Nav currentPage="module-livecanvas" setPage={setPage} />

      <div className="pt-24 flex-1 flex flex-col lg:flex-row w-full h-screen max-w-[1920px] mx-auto relative z-10 p-4 gap-4">
        
        {/* LEFT SIDEBAR: Reverse Inference & Taxonomy */}
        <div className="w-full lg:w-96 flex flex-col gap-4 h-full overflow-y-auto custom-scrollbar pb-20">
          <div className="bg-black text-white border-[6px] border-black shadow-[8px_8px_0_#00FF66] p-6 transform -rotate-1">
            <h2 className="font-black uppercase text-2xl flex items-center gap-2 mb-2">
              <Cpu className="text-[#00FF66]" /> Semantic Engine
            </h2>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#00E5FF] border-b-2 border-white/20 pb-4 mb-4">
              Orchestrating Civitai / HuggingFace Pipelines
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-black uppercase text-gray-400 mb-2 flex items-center gap-2"><Palette size={14}/> Extracted Palette</h3>
                <div className="flex gap-2">
                  {inference.palette.map(color => (
                    <div key={color} className="h-8 flex-1 border-2 border-white" style={{ backgroundColor: color }} />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-black uppercase text-gray-400 mb-2 flex items-center gap-2"><Focus size={14}/> Composition & Lux</h3>
                <div className="bg-[#111] p-3 font-mono text-[10px] space-y-1">
                  <p><span className="text-[#FFFF00]">STRUCT:</span> {inference.composition}</p>
                  <p><span className="text-[#00E5FF]">LIGHT:</span> {inference.lighting}</p>
                  <p><span className="text-[#FF0055]">CAMERA:</span> Isometric-Brutalist</p>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-black uppercase text-gray-400 mb-2 flex items-center gap-2"><Fingerprint size={14}/> Abstraction Vectors</h3>
                <div className="space-y-2">
                  <div className="bg-white/10 p-2 text-xs font-bold border-l-4 border-[#FF0055]">
                    <span className="opacity-50 text-[9px] block">FEELS LIKE:</span>
                    {inference.abstraction.feelsLike}
                  </div>
                  <div className="bg-white/10 p-2 text-xs font-bold border-l-4 border-[#00E5FF]">
                    <span className="opacity-50 text-[9px] block">REMINDS ME OF:</span>
                    {inference.abstraction.remindsMeOf}
                  </div>
                  <div className="bg-white/10 p-2 text-xs font-bold border-l-4 border-[#FFFF00]">
                    <span className="opacity-50 text-[9px] block">EVOKES:</span>
                    {inference.abstraction.evokes}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border-[6px] border-black shadow-[8px_8px_0_#FF0055] p-6">
            <h3 className="font-black uppercase text-xl mb-4 flex items-center gap-2 border-b-4 border-black pb-2">
              <ImageIcon size={20} /> Reverse Inference
            </h3>
            <div className="border-4 border-dashed border-black/20 p-8 text-center cursor-pointer hover:bg-black/5 transition-colors group">
              <Crosshair size={32} className="mx-auto mb-2 opacity-30 group-hover:opacity-100 transition-opacity" />
              <p className="font-black uppercase text-xs">Drop Image for Breakdown</p>
              <p className="font-bold text-[9px] uppercase opacity-50 mt-1">Extract constraints, tokens & parameters</p>
            </div>
          </div>
        </div>

        {/* CENTER: The Interactive Canvas */}
        <div className="flex-1 flex flex-col gap-4 relative">
          
          {/* Top Bar: Prompt Input */}
          <div className="bg-white border-[8px] border-black shadow-[12px_12px_0_#000] p-4 flex gap-4 z-20">
            <form onSubmit={handlePoeticExtraction} className="flex-1 flex gap-4">
              <div className="flex-1 relative">
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Paste poetic intent... (e.g. 'A wild forest floor with canary yellow daffodils...')"
                  className="w-full h-full min-h-[60px] bg-[#f8f8f8] border-[4px] border-black p-3 font-bold text-sm resize-none focus:outline-none focus:bg-white focus:border-[#00E5FF] transition-colors"
                />
                <button 
                  type="button" 
                  onClick={() => setPrompt(POETIC_PROMPT)}
                  className="absolute right-2 top-2 bg-black text-[#FFFF00] text-[8px] font-black px-2 py-1 uppercase hover:bg-[#FF0055] hover:text-white"
                >
                  Load Sample
                </button>
              </div>
              <button 
                type="submit"
                disabled={isExtracting}
                className="bg-[#00E5FF] border-[6px] border-black px-8 font-black uppercase text-xl hover:bg-[#FF0055] hover:text-white transition-all shadow-[6px_6px_0_#000] flex items-center gap-2 active:translate-y-1 active:translate-x-1 active:shadow-[2px_2px_0_#000]"
              >
                {isExtracting ? (
                  <><motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, ease: "linear", duration: 1 }}><Zap/></motion.div> Orchestrating APIs...</>
                ) : (
                  <>Synthesize <Sparkles/></>
                )}
              </button>
            </form>
          </div>

          {/* The Drag & Drop 3D Tactile Board */}
          <div 
            ref={containerRef}
            className="flex-1 bg-white border-[8px] border-black shadow-[16px_16px_0_#000] relative overflow-hidden"
            style={{ backgroundImage: 'linear-gradient(#e5e5e5 2px, transparent 2px), linear-gradient(90deg, #e5e5e5 2px, transparent 2px)', backgroundSize: '40px 40px' }}
            onClick={() => setSelectedId(null)}
          >
            <div className="absolute top-4 right-4 bg-black text-white px-4 py-2 font-black uppercase text-xs border-[4px] border-white shadow-[4px_4px_0_#00E5FF] z-10 flex items-center gap-2">
              <div className="w-2 h-2 bg-[#00FF66] rounded-full animate-pulse"/> 3D TACTILE ENGINE ACTIVE
            </div>

            <AnimatePresence>
              {elements.map((el) => (
                <motion.div
                  key={el.id}
                  drag
                  dragConstraints={containerRef}
                  dragMomentum={false}
                  dragElastic={0.1}
                  onDragStart={() => bringToFront(el.id)}
                  onClick={(e) => { e.stopPropagation(); bringToFront(el.id); }}
                  initial={{ opacity: 0, scale: 0.5, y: -100 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  whileDrag={{ scale: 1.05, cursor: 'grabbing', boxShadow: '20px 20px 0px rgba(0,0,0,1)' }}
                  className={`absolute border-[6px] border-black cursor-grab shadow-[8px_8px_0_#000] flex flex-col group ${el.color} ${selectedId === el.id ? 'ring-4 ring-white ring-offset-4 ring-offset-black' : ''}`}
                  style={{ 
                    left: el.x, 
                    top: el.y, 
                    width: el.w, 
                    height: el.h, 
                    zIndex: el.z 
                  }}
                >
                  {/* Brutalist Header Bar */}
                  <div className="bg-black text-white px-2 py-1 flex justify-between items-center border-b-[4px] border-black h-8 shrink-0">
                    <span className="text-[9px] font-black uppercase tracking-widest truncate">{el.type}</span>
                    <Move size={12} className="opacity-50" />
                  </div>
                  
                  {/* Content Area */}
                  <div className="flex-1 p-4 flex items-center justify-center relative overflow-hidden">
                    <span className="font-black uppercase text-2xl text-center leading-none mix-blend-overlay">
                      {el.content}
                    </span>
                    {/* Simulated texture */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 pointer-events-none" />
                  </div>

                  {/* Tags Footer */}
                  <div className="bg-white border-t-[4px] border-black p-1 flex gap-1 overflow-x-auto custom-scrollbar shrink-0">
                    {el.tags.map(tag => (
                      <span key={tag} className="bg-gray-200 border-2 border-black px-1 text-[8px] font-bold uppercase whitespace-nowrap">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Resize Handle (Visual Only for MVP, complex resize requires custom logic) */}
                  <div className="absolute bottom-0 right-0 w-6 h-6 bg-black flex items-center justify-center cursor-nwse-resize opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 size={12} className="text-white" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}