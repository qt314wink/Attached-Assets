import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MousePointer2, Layers, Download } from 'lucide-react';
import './_group.css';

export function BrutalistC() {
  const [tears, setTears] = useState<{id: number, x: number, y: number, rotation: number}[]>([]);

  const handleCanvasClick = (e: React.MouseEvent) => {
    // Only spawn tears if clicking directly on the canvas background
    if (e.target !== e.currentTarget && !(e.target as HTMLElement).classList.contains('canvas-bg')) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    setTears([...tears, {
      id: Date.now(),
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      rotation: (Math.random() * 40) - 20 // Random slight rotation
    }]);
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono flex flex-col md:flex-row relative overflow-hidden">
      
      {/* Left: Interactive Article / Showcase */}
      <div className="w-full md:w-[400px] lg:w-[500px] bg-[#f4f4f4] text-black border-r-8 border-black p-8 flex flex-col justify-between overflow-y-auto z-20 shadow-[20px_0_50px_rgba(0,0,0,0.5)]">
        <div>
          <div className="flex items-center gap-3 mb-12 border-4 border-black inline-flex px-4 py-2 bg-[#CCFF00] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
             <div className="w-3 h-3 bg-black animate-ping rounded-full" />
             <span className="font-black uppercase tracking-widest text-xs">Live Demonstration</span>
          </div>

          <h1 className="text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-10 leading-[0.85]">
            The <br/>Generative <br/>Canvas.
          </h1>

          <div className="space-y-8 text-sm">
            <div className="bg-white p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform">
              <h3 className="font-black uppercase text-xl mb-2 flex items-center gap-2"><Layers /> 1. Integration</h3>
              <p className="font-medium text-gray-700">Native hooks into open-source image generation pipelines (Stable Diffusion / Flux). Generates physical layers, not just flat images.</p>
            </div>
            
            <div className="bg-[#FF3366] text-white p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform">
              <h3 className="font-black uppercase text-xl mb-2 flex items-center gap-2"><MousePointer2 /> 2. Tactility</h3>
              <p className="font-medium text-white/90">Generative assets are physicalized. Click anywhere on the black canvas to spawn a localized collage tear. Drag them to compose.</p>
            </div>
          </div>
        </div>

        <div className="mt-12 space-y-4">
          <button 
            onClick={() => setTears([])}
            className="w-full bg-white text-black font-black uppercase tracking-widest py-5 hover:bg-black hover:text-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-colors active:translate-y-1 active:shadow-none"
          >
            Clear Canvas
          </button>
        </div>
      </div>

      {/* Right: The Canvas */}
      <div 
        className="flex-1 relative cursor-crosshair bg-black overflow-hidden canvas-bg"
        onClick={handleCanvasClick}
      >
         <div className="absolute inset-0 flex flex-col items-center justify-center opacity-30 pointer-events-none">
            <MousePointer2 size={80} className="animate-pulse mb-6 text-white" />
            <span className="font-black uppercase tracking-widest text-2xl text-center">Click to <br/>Tear Fabric</span>
         </div>

         {/* Base Image underneath the black mask (faint) */}
         <img src="/images/hero-collage.webp" alt="Base Collage" className="absolute inset-0 w-full h-full object-cover opacity-20 filter grayscale pointer-events-none" />

         <AnimatePresence>
           {tears.map(tear => (
             <motion.div
               key={tear.id}
               drag
               dragMomentum={false}
               className="absolute w-64 h-64 md:w-80 md:h-80 cursor-grab active:cursor-grabbing z-10"
               style={{ left: tear.x - 160, top: tear.y - 160, rotate: tear.rotation }}
               initial={{ scale: 0, opacity: 0, filter: 'blur(20px)' }}
               animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
               exit={{ scale: 0, opacity: 0 }}
               transition={{ type: "spring", stiffness: 250, damping: 25 }}
               whileDrag={{ scale: 1.05, zIndex: 50 }}
             >
                {/* Simulating a paper tear revealing the colorful image underneath */}
                <div 
                  className="w-full h-full border-8 border-white bg-white p-2 shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
                  style={{
                    // Random-ish polygon for paper tear look
                    clipPath: `polygon(
                      ${Math.random() * 10}% ${Math.random() * 10}%, 
                      ${90 + Math.random() * 10}% ${Math.random() * 10}%, 
                      ${95 + Math.random() * 5}% ${90 + Math.random() * 10}%, 
                      ${Math.random() * 10}% ${95 + Math.random() * 5}%, 
                      ${Math.random() * 5}% ${40 + Math.random() * 20}%
                    )`
                  }}
                >
                  {/* The revealed image is offset so it looks like it's revealing the background */}
                  <img 
                    src="/images/hero-collage.webp" 
                    alt="Revealed" 
                    className="w-[200vw] h-[200vh] max-w-none max-h-none object-cover pointer-events-none" 
                    style={{ 
                      // Counter-rotate the image so it stays upright while the frame rotates
                      rotate: -tear.rotation,
                      // Offset to align roughly with the screen
                      transform: `translate(${-tear.x}px, ${-tear.y}px)` 
                    }} 
                  />
                </div>
             </motion.div>
           ))}
         </AnimatePresence>
      </div>

    </div>
  );
}