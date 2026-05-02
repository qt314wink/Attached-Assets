import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Plus, ArrowUpRight, GripHorizontal } from 'lucide-react';
import './_group.css';

export function ConceptA_V1() {
  const [elements, setElements] = useState([
    { id: 1, type: 'text', title: 'PRIMARY_NODE', content: 'COLLECTIVE', x: 80, y: 120, rotate: -2 },
    { id: 2, type: 'text', title: 'SYSTEM_CORE', content: 'OS', x: 220, y: 280, rotate: 4 },
    { id: 3, type: 'image', title: 'ASSET_REF', src: '/images/hero-collage.webp', x: 600, y: 150, rotate: -3 },
    { id: 4, type: 'info', title: 'DIRECTIVE', content: 'Design System', desc: 'Tactile interfaces for active creative nodes. Drag to construct.', x: 900, y: 250, rotate: 2 }
  ]);

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-[#E5E5E5] font-sans overflow-hidden flex flex-col selection:bg-black selection:text-[#c4ff00]">
      
      {/* Structural Header */}
      <div className="flex items-center justify-between p-4 px-6 border-b-4 border-black bg-white z-20">
        <div className="font-black uppercase tracking-widest text-sm flex items-center gap-3">
           <div className="w-4 h-4 bg-[#c4ff00] border-2 border-black rounded-sm animate-pulse shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" />
           Interactive Canvas // V1.0
        </div>
        <div className="flex gap-4">
          <div className="text-xs font-bold uppercase text-black bg-gray-200 px-3 py-1 border-2 border-black">Grid: Active</div>
          <div className="text-xs font-bold uppercase text-black bg-gray-200 px-3 py-1 border-2 border-black hidden md:block">Physics: Linear</div>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 relative w-full h-full bg-[#f4f4f4]" ref={containerRef}>
        
        {/* Strict Grid Background */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 2px, transparent 2px), linear-gradient(90deg, rgba(0,0,0,0.1) 2px, transparent 2px)', backgroundSize: '100px 100px' }} />

        {/* Draggable Structural Nodes */}
        {elements.map((el, i) => (
          <motion.div
            key={el.id}
            drag
            dragConstraints={containerRef}
            dragElastic={0.1}
            dragMomentum={false}
            initial={{ x: el.x, y: el.y, rotate: el.rotate }}
            className="absolute cursor-grab active:cursor-grabbing group shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] transition-shadow border-4 border-black bg-white"
            whileHover={{ scale: 1.02 }}
            whileDrag={{ scale: 1.05, zIndex: 50, shadow: "24px 24px 0px 0px rgba(0,0,0,1)", rotate: 0 }}
          >
            {/* Node Header */}
            <div className="flex items-center justify-between border-b-4 border-black px-3 py-2 bg-gray-100 group-active:bg-[#c4ff00] transition-colors">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-2">
                <GripHorizontal size={14} /> {el.title}
              </span>
              <span className="font-mono text-[10px] font-bold">{`ID:${el.id}`}</span>
            </div>

            {/* Node Content */}
            <div className="p-6">
              {el.type === 'text' && (
                <div className="text-6xl md:text-7xl font-black uppercase leading-none tracking-tighter text-black">
                  {el.content}
                </div>
              )}
              
              {el.type === 'image' && el.src && (
                <div className="w-64 md:w-80 aspect-[4/3] border-4 border-black bg-black p-2">
                   <img src={el.src} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt="Node Asset" />
                </div>
              )}

              {el.type === 'info' && (
                <div className="w-48 md:w-64">
                  <h3 className="text-xl font-black uppercase mb-2 border-l-4 border-[#FF3366] pl-2 leading-tight">{el.content}</h3>
                  <p className="text-sm font-medium text-gray-700">{el.desc}</p>
                </div>
              )}
            </div>
          </motion.div>
        ))}

        {/* Structural CTA Panel */}
        <div className="absolute bottom-8 left-8 right-8 pointer-events-none flex flex-col md:flex-row items-end justify-between z-10 gap-6">
          <div className="max-w-lg bg-white p-8 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] pointer-events-auto relative">
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#FF3366] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" />
            <h2 className="text-3xl font-black uppercase mb-4 leading-none tracking-tight">A Sanctuary For<br/>Creative Disruptors.</h2>
            <p className="text-base font-medium text-gray-700 mb-8 border-l-4 border-black pl-4">
              You are not just a viewer. You are an active node in the system. Drag elements to reconstruct the interface.
            </p>
            <button className="w-full py-4 bg-[#c4ff00] text-black font-black uppercase tracking-widest border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-[#c4ff00] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2">
              Enter The Forge <ArrowUpRight size={20} />
            </button>
          </div>
          
          <div className="hidden md:flex gap-4 pointer-events-auto">
             <button className="w-16 h-16 border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center hover:bg-[#c4ff00] active:translate-y-1 active:shadow-none transition-all">
               <Plus size={32} />
             </button>
          </div>
        </div>

      </div>
    </div>
  );
}