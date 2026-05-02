import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Maximize, ZoomIn, ZoomOut, MousePointer2, Box, Layers, Image as ImageIcon } from 'lucide-react';

export function ApproachB_Canvas() {
  const constraintsRef = useRef(null);
  const [zoom, setZoom] = useState(1);

  const nodes = [
    { id: 1, x: 20, y: 20, title: "Start Here", type: "intro", content: "Welcome to the infinite workspace." },
    { id: 2, x: 60, y: 10, title: "Asset Pipeline", type: "system", content: "Generative tools & collages." },
    { id: 3, x: 30, y: 60, title: "Physics Engine", type: "module", content: "Rigid body UI components." },
    { id: 4, x: 70, y: 50, title: "Spatial Audio", type: "module", content: "BEM solver for UI sounds." },
  ];

  return (
    <div className="min-h-screen bg-[#F0F0F0] overflow-hidden relative font-sans text-gray-800" ref={constraintsRef}>
      {/* Infinite Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20" 
        style={{ 
          backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', 
          backgroundSize: `${40 * zoom}px ${40 * zoom}px`,
          transformOrigin: '0 0',
        }} 
      />

      {/* UI Overlay */}
      <div className="absolute top-6 left-6 z-50 pointer-events-none">
        <h1 className="text-3xl font-bold tracking-tight">Collective OS</h1>
        <p className="text-gray-500 font-medium">Infinite Canvas Interface</p>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-2 bg-white p-2 rounded-xl shadow-lg border border-gray-200">
        <button className="p-2 hover:bg-gray-100 rounded-lg"><MousePointer2 size={20}/></button>
        <button className="p-2 hover:bg-gray-100 rounded-lg"><Box size={20}/></button>
        <button className="p-2 hover:bg-gray-100 rounded-lg"><Layers size={20}/></button>
        <div className="w-px bg-gray-200 mx-2 my-1" />
        <button onClick={() => setZoom(Math.max(0.5, zoom - 0.1))} className="p-2 hover:bg-gray-100 rounded-lg"><ZoomOut size={20}/></button>
        <span className="flex items-center px-2 font-mono text-sm">{Math.round(zoom * 100)}%</span>
        <button onClick={() => setZoom(Math.min(2, zoom + 0.1))} className="p-2 hover:bg-gray-100 rounded-lg"><ZoomIn size={20}/></button>
      </div>

      {/* Draggable Nodes Area */}
      <motion.div 
        drag
        dragConstraints={constraintsRef}
        className="w-[300vw] h-[300vh] absolute top-[-100vh] left-[-100vw]"
        style={{ scale: zoom }}
      >
        {nodes.map((node) => (
          <div 
            key={node.id}
            className="absolute bg-white rounded-2xl p-6 shadow-xl border border-gray-100 w-80 cursor-grab active:cursor-grabbing hover:shadow-2xl transition-shadow"
            style={{ top: `${node.y}%`, left: `${node.x}%` }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-lg ${node.type === 'intro' ? 'bg-blue-100 text-blue-600' : node.type === 'system' ? 'bg-purple-100 text-purple-600' : 'bg-emerald-100 text-emerald-600'}`}>
                {node.type === 'intro' ? <Maximize size={20}/> : node.type === 'system' ? <ImageIcon size={20}/> : <Box size={20}/>}
              </div>
              <h3 className="font-bold text-lg">{node.title}</h3>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">{node.content}</p>
            {node.type === 'intro' && (
              <button className="w-full py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition-colors">
                Enter Platform
              </button>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
}