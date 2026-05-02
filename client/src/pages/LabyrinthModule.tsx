import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Hammer, Sticker, Download, Trash2, Maximize, RotateCcw } from 'lucide-react';

export default function LabyrinthModule({ setPage }: { setPage: (p: string) => void }) {
  const [placedStickers, setPlacedStickers] = useState<{ id: number; sticker: string; x: number; y: number; rot: number; scale: number }[]>([]);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const canvasRef = useRef<HTMLDivElement>(null);

  const stickers = [
    { emoji: '💥', name: 'BOOM', xpReq: 0 },
    { emoji: '💫', name: 'SPARKLE', xpReq: 0 },
    { emoji: '🔥', name: 'FIRE', xpReq: 0 },
    { emoji: '💀', name: 'SKULL', xpReq: 50 },
    { emoji: '⚡', name: 'ZAP', xpReq: 50 },
    { emoji: '💯', name: 'HUNDRED', xpReq: 100 },
    { emoji: '🚀', name: 'ROCKET', xpReq: 100 },
    { emoji: '🎯', name: 'TARGET', xpReq: 150 },
    { emoji: '🎨', name: 'PALETTE', xpReq: 150 },
    { emoji: '💎', name: 'GEM', xpReq: 200 },
    { emoji: '👑', name: 'CROWN', xpReq: 200 },
  ];

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Randomize unlocked stickers if they just click the canvas without dragging
    const unlocked = stickers.filter(s => xp >= s.xpReq);
    const randomSticker = unlocked[Math.floor(Math.random() * unlocked.length)].emoji;

    addSticker(randomSticker, x, y);
  };

  const addSticker = (sticker: string, x: number, y: number) => {
    const newSticker = {
      id: Date.now(),
      sticker,
      x,
      y,
      rot: (Math.random() - 0.5) * 60,
      scale: 0.5 + Math.random() * 1.5,
    };
    setPlacedStickers([...placedStickers, newSticker]);
    
    // Gamification
    setXp(prev => {
      const newXp = prev + 10;
      if (newXp >= level * 100) {
        setLevel(l => l + 1);
      }
      return newXp;
    });
  };

  return (
    <div className="min-h-screen bg-[#FFFF00] font-sans selection:bg-[#FF0055] selection:text-white relative overflow-hidden pb-24">
      {/* Halftone Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'radial-gradient(circle, #000 2px, transparent 2.5px)', backgroundSize: '16px 16px' }} />

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 relative z-10 pt-8">
        
        <header className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 border-b-[8px] border-black pb-8">
          <button 
            onClick={() => setPage('home')}
            className="flex items-center gap-2 font-black uppercase text-black hover:text-white hover:bg-[#FF0055] px-6 py-3 border-[4px] border-black transition-colors shadow-[6px_6px_0_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
          >
            <ArrowLeft size={24} /> Back
          </button>
          
          <div className="bg-white border-[6px] border-black p-4 flex items-center gap-6 shadow-[8px_8px_0_#00E5FF] transform rotate-1">
            <div className="flex flex-col items-end">
              <span className="font-black uppercase text-sm">Forge Level</span>
              <span className="font-black text-4xl leading-none text-[#FF0055]">{level}</span>
            </div>
            <div className="w-48 h-6 bg-gray-200 border-[3px] border-black relative overflow-hidden">
              <motion.div 
                className="absolute left-0 top-0 bottom-0 bg-[#00FF66] border-r-[3px] border-black"
                initial={{ width: 0 }}
                animate={{ width: `${(xp % 100)}%` }}
              />
            </div>
            <div className="font-black uppercase text-xl">{xp} XP</div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Sidebar: Sticker Inventory */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white border-[8px] border-black p-6 shadow-[12px_12px_0_#FF0055] transform -rotate-1 relative">
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#00E5FF] rounded-full border-[4px] border-black flex items-center justify-center animate-bounce shadow-[4px_4px_0_#000]">
                <Sticker size={24} className="text-black" />
              </div>
              <h2 className="font-black uppercase text-2xl mb-4 text-black border-b-[4px] border-black pb-2">Sticker Pack</h2>
              
              <div className="grid grid-cols-2 gap-4">
                {stickers.map((s, i) => {
                  const unlocked = xp >= s.xpReq;
                  return (
                    <div 
                      key={i}
                      className={`aspect-square border-[4px] border-black flex flex-col items-center justify-center relative transition-transform ${unlocked ? 'bg-white hover:bg-[#FFFF00] cursor-pointer hover:scale-110 shadow-[4px_4px_0_#000]' : 'bg-gray-300 grayscale cursor-not-allowed opacity-50'}`}
                      onClick={() => unlocked && setPlacedStickers([...placedStickers, { id: Date.now(), sticker: s.emoji, x: Math.random() * 500 + 100, y: Math.random() * 300 + 100, rot: (Math.random() - 0.5) * 60, scale: 1 + Math.random() }])}
                    >
                      <span className="text-4xl">{s.emoji}</span>
                      <span className="font-black uppercase text-[10px] mt-2 bg-black text-white px-2 py-1">{s.name}</span>
                      {!unlocked && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                          <span className="text-white font-black text-xs uppercase rotate-12 bg-red-500 px-2 py-1 border-2 border-black">Lvl {Math.floor(s.xpReq/100) + 1}</span>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Center: The Canvas */}
          <div className="lg:col-span-9 relative">
            <div className="absolute -top-6 -left-6 bg-black text-white px-6 py-3 font-black uppercase text-xl z-20 border-[4px] border-white shadow-[6px_6px_0_#FF0055] rotate-[-4deg]">
              The Workbench
            </div>
            
            <div 
              ref={canvasRef}
              onClick={handleCanvasClick}
              className="w-full aspect-[4/3] bg-white border-[12px] border-black relative overflow-hidden cursor-crosshair shadow-[20px_20px_0_#000]"
            >
              {/* Grid Background */}
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#000 2px, transparent 2px), linear-gradient(90deg, #000 2px, transparent 2px)', backgroundSize: '40px 40px' }} />
              
              {/* Frosted Glass Center Panel */}
              <div className="absolute inset-12 border-[8px] border-black bg-white/40 backdrop-blur-md shadow-[inset_0_0_40px_rgba(0,0,0,0.1)] flex items-center justify-center">
                {placedStickers.length === 0 && (
                  <div className="text-center font-black uppercase text-4xl text-black/20 pointer-events-none transform -rotate-6">
                    <Hammer size={80} className="mx-auto mb-4 opacity-50" />
                    Click to add stickers
                  </div>
                )}
              </div>

              {/* Placed Stickers */}
              <AnimatePresence>
                {placedStickers.map(s => (
                  <motion.div
                    key={s.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: s.scale, rotate: s.rot, opacity: 1, x: s.x, y: s.y }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="absolute top-0 left-0 text-6xl select-none"
                    style={{ filter: 'drop-shadow(4px 4px 0px rgba(0,0,0,1))' }}
                  >
                    {s.sticker}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Toolbar */}
            <div className="absolute bottom-6 right-6 flex gap-4 z-20">
              <button 
                onClick={() => { setPlacedStickers([]); setXp(0); setLevel(1); }}
                className="bg-black text-white p-4 border-[4px] border-white hover:bg-[#FF0055] hover:text-black transition-colors shadow-[6px_6px_0_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none group"
              >
                <Trash2 size={24} className="group-hover:rotate-12 transition-transform" />
              </button>
              <button className="bg-[#00E5FF] text-black px-6 py-4 border-[4px] border-black font-black uppercase flex items-center gap-2 hover:bg-[#FFFF00] transition-colors shadow-[6px_6px_0_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none">
                <Download size={24} /> Export
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}