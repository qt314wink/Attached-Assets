import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { 
  Palette, Zap, Image as ImageIcon, Sparkles, Move, Maximize2, 
  Cpu, Layers, Eye, Crosshair, Fingerprint, Lock, SlidersHorizontal, Share2, Focus,
  BookOpen, Upload, X
} from 'lucide-react';
import { Nav } from '@/components/Layout';

// Mock data for the complex poetic prompt
const POETIC_PROMPT = "A wild forest floor with canary yellow daffodils and a little green door. Beyond it theres a mountain range with a proud cat facing north. Go further still, you'll find Poseidon's lost shore...";

const ILLUSTRATION_STYLES = [
  { id: '1', name: 'Cosmic Pop-Art', artist: 'Jack Kirby', country: 'USA', era: '1960s-1970s', desc: 'Dynamic action, heavy crackle, heroic proportions.', tags: ['Bold Lines', 'Kirby Krackle'] },
  { id: '2', name: 'Ligne Claire Sci-Fi', artist: 'Moebius', country: 'France', era: '1970s-1980s', desc: 'Surreal environments, clean lines, ethereal palettes.', tags: ['Surreal', 'Clean Line'] },
  { id: '3', name: 'Cyberpunk Realism', artist: 'Katsuhiro Otomo', country: 'Japan', era: '1980s', desc: 'Hyper-detailed architecture, kinetic energy, dystopian.', tags: ['Architectural', 'Kinetic'] },
  { id: '4', name: 'Gothic Brutalism', artist: 'Mike Mignola', country: 'USA', era: '1990s', desc: 'High contrast, blocky shadows, minimalist geometry.', tags: ['Heavy Shadows', 'Minimalist'] },
  { id: '5', name: 'Noir Romance', artist: 'Frank Miller', country: 'USA', era: '1980s-1990s', desc: 'Gritty, high contrast black and white, cinematic framing.', tags: ['Noir', 'Cinematic'] }
];

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
  const [showLibrary, setShowLibrary] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    if (!prompt.trim()) return;
    
    setIsExtracting(true);
    
    // Simulate API Orchestration (HuggingFace / Civitai / Design System Parsing)
    setTimeout(() => {
      setElements(prev => {
        const newElements: CanvasElement[] = [
          { id: Math.random().toString(), type: 'image', content: prompt.slice(0, 20).toUpperCase(), color: 'bg-[#00E5FF]', x: Math.random() * 300, y: Math.random() * 300, w: 350, h: 200, z: prev.length + 1, tags: ['generative', 'summoned'] },
          { id: Math.random().toString(), type: 'text', content: "EXTRACTED INTENT", color: 'bg-[#FF9900]', x: Math.random() * 400 + 100, y: Math.random() * 300 + 100, w: 250, h: 150, z: prev.length + 2, tags: ['semantic', 'kinetic'] }
        ];
        return [...prev, ...newElements];
      });
      setPrompt("");
      setIsExtracting(false);
    }, 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    // Simulate image extraction and breakdown
    setTimeout(() => {
      setInference({
        palette: ['#000000', '#FF0055', '#FFFFFF'],
        composition: 'Rule of Thirds (High Contrast)',
        lighting: 'Noir Cinematic (Lux: 1200)',
        abstraction: {
          feelsLike: 'Gritty, Intense, Focused',
          remindsMeOf: 'Late night urban streets',
          evokes: 'Frank Miller Neo-Noir'
        }
      });
      
      setElements(prev => {
        const newElement: CanvasElement = {
          id: Math.random().toString(),
          type: 'image',
          content: file.name.toUpperCase(),
          color: 'bg-black text-white',
          x: 100,
          y: 100,
          w: 300,
          h: 300,
          z: prev.length + 1,
          tags: ['uploaded', 'reference']
        };
        return [...prev, newElement];
      });
      setIsUploading(false);
    }, 2500);
  };

  const updateElement = (id: string, updates: Partial<CanvasElement>) => {
    setElements(prev => prev.map(el => el.id === id ? { ...el, ...updates } : el));
  };

  const bringToFront = (id: string) => {
    setElements(prev => {
      const maxZ = Math.max(...prev.map(e => e.z));
      return prev.map(el => el.id === id ? { ...el, z: maxZ + 1 } : el);
    });
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

          <div className="bg-white border-[6px] border-black shadow-[8px_8px_0_#FF0055] p-6 relative overflow-hidden">
            <h3 className="font-black uppercase text-xl mb-4 flex items-center gap-2 border-b-4 border-black pb-2">
              <ImageIcon size={20} /> Reverse Inference
            </h3>
            
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              onChange={handleFileUpload} 
              accept="image/*" 
            />
            
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-4 border-dashed border-black/20 p-8 text-center cursor-pointer hover:bg-black/5 transition-colors group relative"
            >
              {isUploading ? (
                <div className="flex flex-col items-center justify-center">
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                    <Crosshair size={32} className="mx-auto mb-2 text-[#FF0055]" />
                  </motion.div>
                  <p className="font-black uppercase text-xs text-[#FF0055]">Extracting Semantics...</p>
                </div>
              ) : (
                <>
                  <Upload size={32} className="mx-auto mb-2 opacity-30 group-hover:opacity-100 transition-opacity" />
                  <p className="font-black uppercase text-xs">Drop Image for Breakdown</p>
                  <p className="font-bold text-[9px] uppercase opacity-50 mt-1">Extract constraints, tokens & parameters</p>
                </>
              )}
            </div>
            
            <button 
              onClick={() => setShowLibrary(true)}
              className="mt-4 w-full bg-black text-white font-black uppercase text-xs py-3 flex items-center justify-center gap-2 border-2 border-black hover:bg-[#00E5FF] hover:text-black transition-colors"
            >
              <BookOpen size={14} /> Browse Style Library
            </button>
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
                  className={`absolute border-[6px] border-black cursor-grab shadow-[8px_8px_0_#000] flex flex-col group ${el.color} ${selectedId === el.id ? 'ring-4 ring-[#00E5FF] ring-offset-4 ring-offset-black' : ''}`}
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

      {/* Style Library Overlay */}
      <AnimatePresence>
        {showLibrary && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ y: 50, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="w-full max-w-5xl max-h-[80vh] bg-white border-[8px] border-black shadow-[16px_16px_0_#00FF66] flex flex-col"
            >
              <div className="bg-black text-[#00FF66] p-4 flex justify-between items-center border-b-[4px] border-black">
                <h2 className="font-black uppercase text-xl flex items-center gap-2"><BookOpen /> Illustration Styles Archive</h2>
                <button onClick={() => setShowLibrary(false)} className="hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto custom-scrollbar flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-[#E5E5E5]">
                {ILLUSTRATION_STYLES.map(style => (
                  <div key={style.id} className="bg-white border-[4px] border-black p-4 flex flex-col shadow-[6px_6px_0_#000] hover:-translate-y-1 hover:shadow-[8px_8px_0_#00E5FF] transition-all cursor-pointer">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-black uppercase text-lg leading-tight">{style.name}</h3>
                      <span className="bg-black text-white text-[10px] font-bold px-2 py-1 uppercase">{style.era}</span>
                    </div>
                    <p className="font-bold text-sm text-[#FF0055] uppercase mb-2">{style.artist} // {style.country}</p>
                    <p className="text-xs font-medium mb-4 flex-1">{style.desc}</p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {style.tags.map(tag => (
                        <span key={tag} className="bg-gray-200 border-2 border-black px-2 py-1 text-[9px] font-black uppercase">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <button className="mt-4 w-full bg-black text-white font-black uppercase text-xs py-2 hover:bg-[#FFFF00] hover:text-black transition-colors border-2 border-black">
                      Apply Style Tokens
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}