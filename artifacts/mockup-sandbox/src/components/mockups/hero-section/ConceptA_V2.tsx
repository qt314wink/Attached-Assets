import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ScanLine, Radio, Crosshair } from 'lucide-react';
import './_group.css';

export function ConceptA_V2() {
  const [elements, setElements] = useState([
    { id: 1, type: 'glitch-text', content: 'COLLECTIVE', x: 50, y: 150 },
    { id: 2, type: 'outline-text', content: 'OS', x: 120, y: 300 },
    { id: 3, type: 'image-node', src: '/images/hero-collage.webp', x: 500, y: 100 },
    { id: 4, type: 'data-node', content: 'LATENT_SPACE', value: 'ACTIVE', x: 850, y: 400 }
  ]);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans overflow-hidden flex flex-col selection:bg-[#33CCFF] selection:text-black">
      
      {/* HUD Header */}
      <div className="flex items-center justify-between p-4 px-6 border-b border-gray-800 bg-[#0a0a0a]/90 backdrop-blur-md z-20 font-mono text-xs uppercase tracking-widest text-gray-400">
        <div className="flex items-center gap-4">
           <Radio size={16} className="text-[#33CCFF] animate-pulse" />
           <span>Sys.Status: Nominal</span>
        </div>
        <div className="flex gap-8">
          <span>X: {Math.round(mousePos.x)} Y: {Math.round(mousePos.y)}</span>
          <span className="hidden md:inline">Drag Nodes to Calibrate</span>
        </div>
      </div>

      {/* Main Kinetic Canvas Area */}
      <div 
        className="flex-1 relative w-full h-full cursor-crosshair" 
        ref={containerRef}
        onMouseMove={handleMouseMove}
      >
        {/* Kinetic Noise Background */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />
        
        {/* Glowing Cursor Tracker */}
        <motion.div 
          className="absolute w-[600px] h-[600px] bg-[#33CCFF] rounded-full blur-[150px] opacity-10 pointer-events-none z-0 transform -translate-x-1/2 -translate-y-1/2"
          animate={{ x: mousePos.x, y: mousePos.y }}
          transition={{ type: "spring", stiffness: 50, damping: 20, mass: 1 }}
        />

        {/* Draggable Kinetic Nodes */}
        {elements.map((el) => (
          <motion.div
            key={el.id}
            drag
            dragConstraints={containerRef}
            dragElastic={0.2}
            initial={{ x: el.x, y: el.y }}
            className="absolute cursor-grab active:cursor-grabbing z-10"
            whileHover={{ scale: 1.05 }}
            whileDrag={{ scale: 1.1, zIndex: 50 }}
          >
            {el.type === 'glitch-text' && (
              <div className="relative group">
                <div className="text-7xl md:text-9xl font-black uppercase tracking-tighter text-white opacity-90 group-hover:text-[#33CCFF] transition-colors mix-blend-difference">
                  {el.content}
                </div>
                {/* Glitch layers on hover */}
                <div className="absolute inset-0 text-7xl md:text-9xl font-black uppercase tracking-tighter text-[#FF3366] opacity-0 group-hover:opacity-50 mix-blend-screen translate-x-2 -translate-y-1 transition-all">
                  {el.content}
                </div>
                <div className="absolute inset-0 text-7xl md:text-9xl font-black uppercase tracking-tighter text-[#CCFF00] opacity-0 group-hover:opacity-50 mix-blend-screen -translate-x-2 translate-y-1 transition-all">
                  {el.content}
                </div>
              </div>
            )}
            
            {el.type === 'outline-text' && (
              <div className="text-[8rem] md:text-[12rem] font-black uppercase tracking-tighter text-transparent" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.2)' }}>
                {el.content}
              </div>
            )}

            {el.type === 'image-node' && el.src && (
              <div className="relative group">
                <div className="w-72 md:w-96 aspect-[3/4] border border-gray-800 bg-[#111] p-1 overflow-hidden">
                   <img src={el.src} className="w-full h-full object-cover mix-blend-luminosity opacity-80 group-hover:opacity-100 group-hover:mix-blend-normal transition-all duration-700 group-hover:scale-105" alt="Kinetic Asset" />
                </div>
                {/* HUD Corners */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#33CCFF]" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#33CCFF]" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#33CCFF]" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#33CCFF]" />
              </div>
            )}

            {el.type === 'data-node' && (
              <div className="w-64 bg-[#111] border border-gray-800 p-6 backdrop-blur-md">
                <ScanLine className="text-[#CCFF00] mb-4" size={24} />
                <h3 className="text-xl font-black uppercase mb-1 tracking-widest">{el.content}</h3>
                <div className="text-sm font-mono text-[#33CCFF]">STATUS: {el.value}</div>
              </div>
            )}
          </motion.div>
        ))}

        {/* Floating Kinetic Overlay */}
        <div className="absolute bottom-10 right-10 max-w-sm pointer-events-none z-20 mix-blend-difference">
          <h2 className="text-4xl font-black uppercase leading-[0.8] mb-4 text-white">
            Construct <br/> <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>The System</span>
          </h2>
          <p className="text-sm font-mono text-gray-300">
            A dynamic, physics-driven canvas for generative asset manipulation. Interact with the nodes to build your environment.
          </p>
        </div>

        {/* Minimal Action Button */}
        <div className="absolute bottom-10 left-10 z-20">
          <button className="group relative px-8 py-4 bg-transparent text-white font-mono text-sm uppercase tracking-widest border border-white/20 hover:border-white overflow-hidden transition-colors">
            <span className="relative z-10 flex items-center gap-2 group-hover:text-black transition-colors duration-300">
              <Crosshair size={16} /> Enter Forge
            </span>
            <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0" />
          </button>
        </div>

      </div>
    </div>
  );
}