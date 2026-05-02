import React, { useState, useRef } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';
import { MousePointer2, Plus, Zap } from 'lucide-react';
import './_group.css';

export function ConceptA() {
  const [elements, setElements] = useState([
    { id: 1, type: 'text', content: 'COLLECTIVE', x: 50, y: 100, color: 'text-black' },
    { id: 2, type: 'text', content: 'OS', x: 150, y: 200, color: 'text-transparent', stroke: true },
    { id: 3, type: 'shape', x: 300, y: 50, rotate: 15 },
    { id: 4, type: 'image', x: 500, y: 150 }
  ]);

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-[#f0f0f0] font-sans overflow-hidden flex flex-col cursor-crosshair">
      
      {/* Header Bar */}
      <div className="flex items-center justify-between p-6 border-b-2 border-black bg-white z-20">
        <div className="font-black uppercase tracking-widest text-sm flex items-center gap-2">
           <div className="w-3 h-3 bg-[#c4ff00] border border-black rounded-full animate-pulse" />
           Interactive Node
        </div>
        <div className="text-xs font-bold uppercase text-gray-500">Drag elements to explore</div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 relative w-full h-full" ref={containerRef}>
        
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0,0,0,0.1) 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        {/* Draggable Elements */}
        {elements.map((el) => (
          <motion.div
            key={el.id}
            drag
            dragConstraints={containerRef}
            dragElastic={0.1}
            dragMomentum={false}
            initial={{ x: el.x, y: el.y }}
            className="absolute cursor-grab active:cursor-grabbing"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95, zIndex: 50 }}
          >
            {el.type === 'text' && (
              <div 
                className={`text-6xl md:text-8xl lg:text-[10rem] font-black uppercase leading-none ${el.color}`}
                style={el.stroke ? { WebkitTextStroke: '2px black' } : {}}
              >
                {el.content}
              </div>
            )}
            
            {el.type === 'shape' && (
              <div className="w-48 h-48 bg-[#c4ff00] brutalist-border rounded-full flex items-center justify-center rotate-[-10deg]">
                <Zap size={48} strokeWidth={1.5} />
              </div>
            )}

            {el.type === 'image' && (
              <div className="w-64 h-80 brutalist-border bg-white p-2">
                 <img 
                   src="https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=600&auto=format&fit=crop" 
                   className="w-full h-full object-cover grayscale"
                   alt="Art placeholder"
                 />
              </div>
            )}
          </motion.div>
        ))}

        {/* Static Content / CTA overlay */}
        <div className="absolute bottom-12 left-12 right-12 pointer-events-none flex flex-col md:flex-row items-end justify-between z-10">
          <div className="max-w-md bg-white/80 backdrop-blur-md p-6 brutalist-border pointer-events-auto">
            <h2 className="text-2xl font-black uppercase mb-4">A sanctuary for creative disruptors</h2>
            <p className="text-sm font-medium text-gray-600 mb-6">You are not just a viewer. You are an active node in the system. Start building your digital identity immediately.</p>
            <button className="w-full py-3 bg-black text-white font-bold uppercase hover:bg-[#c4ff00] hover:text-black transition-colors border-2 border-black">
              Enter The Forge
            </button>
          </div>
          
          <div className="hidden md:flex gap-4 pointer-events-auto mt-6 md:mt-0">
             <button className="w-16 h-16 brutalist-border bg-white flex items-center justify-center hover:bg-gray-100 transition-colors">
               <Plus />
             </button>
          </div>
        </div>

      </div>
    </div>
  );
}