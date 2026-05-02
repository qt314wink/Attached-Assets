import React, { useState, useRef } from 'react';
import { ArrowLeft, Droplet, Layers, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function StyleMatrixModule({ setPage }: { setPage: (p: string) => void }) {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [activeTab, setActiveTab] = useState<'fabric' | 'jelly'>('fabric');
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div className="pt-32 pb-24 px-6 bg-[#00E5FF] min-h-screen relative text-black font-sans selection:bg-black selection:text-white">
      {/* SVG Filters */}
      <svg className="hidden absolute w-0 h-0">
        <defs>
          <filter id="fabricmorphism" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.5 0" in="noise" result="coloredNoise" />
            <feComposite operator="in" in="coloredNoise" in2="SourceGraphic" result="composite" />
            <feBlend mode="multiply" in="composite" in2="SourceGraphic" />
          </filter>
          
          <filter id="jellymorphism" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="turbulence" baseFrequency="0.015" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={Math.abs((mousePos.x - 50) + (mousePos.y - 50)) * 2} xChannelSelector="R" yChannelSelector="B" result="displaced" />
            <feGaussianBlur in="displaced" stdDeviation="5" result="blur" />
            <feComponentTransfer in="blur" result="glow">
               <feFuncA type="linear" slope="2" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="displaced" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Halftone Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'radial-gradient(circle, #000 2px, transparent 2.5px)', backgroundSize: '16px 16px' }} />

      <div className="max-w-6xl mx-auto relative z-10">
        
        <header className="mb-12 bg-white border-[8px] border-black p-8 shadow-[16px_16px_0_#FF0055] relative transform rotate-1">
          <div className="absolute -top-6 -left-6 bg-[#FFFF00] p-4 border-[6px] border-black shadow-[8px_8px_0_#000] rotate-[-10deg] font-black uppercase text-2xl">
            SPLAT!
          </div>

          <button 
            onClick={() => setPage('home')}
            className="flex items-center gap-2 font-black uppercase mb-6 text-black bg-white hover:bg-black hover:text-[#00E5FF] px-4 py-2 border-[4px] border-black transition-colors w-fit text-sm shadow-[4px_4px_0_#000]"
          >
            <ArrowLeft size={16} /> Back
          </button>

          <h1 className="text-5xl md:text-8xl font-black uppercase leading-none mb-6 tracking-tighter" style={{ textShadow: '4px 4px 0 #00FF66, 8px 8px 0 #000' }}>
            Tactile<br/>Matrix
          </h1>
          <p className="text-xl font-black uppercase max-w-2xl text-black border-l-[8px] border-[#FF0055] pl-6 bg-[#E5E5E5] p-4">
            Surface morphisms rendered live! Play with gooey jellies and rough fabrics!
          </p>
        </header>

        {/* Tab Selection */}
        <div className="flex gap-4 mb-8">
           <button 
             onClick={() => setActiveTab('fabric')}
             className={`flex-1 font-black uppercase text-3xl py-4 border-[6px] border-black transition-all shadow-[8px_8px_0_#000] flex justify-center items-center gap-4 ${activeTab === 'fabric' ? 'bg-[#FF0055] text-white -translate-y-2' : 'bg-white hover:bg-gray-100'}`}
           >
             <Layers size={32} /> Fabric
           </button>
           <button 
             onClick={() => setActiveTab('jelly')}
             className={`flex-1 font-black uppercase text-3xl py-4 border-[6px] border-black transition-all shadow-[8px_8px_0_#000] flex justify-center items-center gap-4 ${activeTab === 'jelly' ? 'bg-[#00FF66] text-black -translate-y-2' : 'bg-white hover:bg-gray-100'}`}
           >
             <Droplet size={32} /> Jelly
           </button>
        </div>

        <div className="bg-white border-[12px] border-black shadow-[24px_24px_0_#FF0055] p-8 min-h-[500px] relative" ref={containerRef} onMouseMove={handleMouseMove}>
          
          <AnimatePresence mode="wait">
            {activeTab === 'fabric' && (
              <motion.div 
                key="fabric"
                initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }}
                className="w-full h-full flex flex-col md:flex-row gap-8 items-center"
              >
                <div className="w-full md:w-1/2 h-[400px] bg-[#E5E5E5] border-[8px] border-black relative overflow-hidden group shadow-[12px_12px_0_#000]">
                  <div 
                    className="absolute inset-0 opacity-60 mix-blend-multiply" 
                    style={{ filter: "url(#fabricmorphism)", backgroundColor: '#FF0055' }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                     <div className="bg-white text-black font-black uppercase text-2xl p-4 border-[4px] border-black transform -rotate-12 shadow-[8px_8px_0_#00E5FF]">
                       Rough Texture!
                     </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                   <h2 className="text-5xl font-black uppercase mb-4 text-black">Perlin Noise</h2>
                   <p className="text-xl font-bold border-l-[6px] border-black pl-4">Applying complex SVG filters directly to DOM elements to simulate physical fabric weave and wear.</p>
                </div>
              </motion.div>
            )}

            {activeTab === 'jelly' && (
              <motion.div 
                key="jelly"
                initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
                className="w-full h-full flex flex-col md:flex-row gap-8 items-center"
              >
                <div className="w-full md:w-1/2">
                   <h2 className="text-5xl font-black uppercase mb-4 text-black text-right">Liquid Dynamics</h2>
                   <p className="text-xl font-bold border-r-[6px] border-black pr-4 text-right">Interactive displacement maps that react to your cursor position in real-time. Squishy!</p>
                </div>
                <div className="w-full md:w-1/2 h-[400px] border-[8px] border-black relative overflow-hidden bg-black shadow-[12px_12px_0_#00FF66] flex items-center justify-center cursor-crosshair">
                  <motion.div 
                    className="w-64 h-64 bg-gradient-to-br from-[#c4ff00] to-[#00E5FF] rounded-full blur-[2px]"
                    style={{ filter: "url(#jellymorphism)" }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="absolute top-4 right-4 bg-white text-black font-black uppercase text-sm p-2 border-[4px] border-black transform rotate-6">
                    <Zap className="inline" /> Move Mouse!
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
}