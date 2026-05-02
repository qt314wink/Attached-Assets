import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, Database, Cpu, Palette, Play } from 'lucide-react';
import './_group.css';

interface Node {
  id: number;
  x: number;
  y: number;
  icon: React.ReactNode;
  label: string;
  size: number;
}

export function SurpriseC() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [activeNode, setActiveNode] = useState<number | null>(null);

  // Generate random constellation on mount
  useEffect(() => {
    const newNodes = [
      { id: 1, x: 20, y: 30, icon: <Network />, label: "Global Mesh", size: 64 },
      { id: 2, x: 70, y: 20, icon: <Palette />, label: "Canvas Engine", size: 80 },
      { id: 3, x: 85, y: 70, icon: <Database />, label: "Asset Storage", size: 56 },
      { id: 4, x: 15, y: 80, icon: <Cpu />, label: "Compute Matrix", size: 72 },
    ];
    setNodes(newNodes);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 overflow-hidden relative font-sans text-slate-900 flex items-center justify-center">
      
      {/* SVG Connecting Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {nodes.map((node, i) => {
          if (i === nodes.length - 1) return null;
          const nextNode = nodes[i + 1];
          return (
            <motion.line 
              key={`line-${i}`}
              x1={`${node.x}%`} y1={`${node.y}%`} 
              x2={`${nextNode.x}%`} y2={`${nextNode.y}%`}
              stroke={activeNode === node.id || activeNode === nextNode.id ? "#8b5cf6" : "#cbd5e1"} 
              strokeWidth="2"
              strokeDasharray="4 4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: i * 0.2 }}
            />
          );
        })}
        {/* Connect last to first to complete the shape */}
        {nodes.length > 0 && (
          <motion.line 
            x1={`${nodes[nodes.length-1].x}%`} y1={`${nodes[nodes.length-1].y}%`} 
            x2={`${nodes[0].x}%`} y2={`${nodes[0].y}%`}
            stroke={activeNode === nodes[nodes.length-1].id || activeNode === nodes[0].id ? "#8b5cf6" : "#cbd5e1"} 
            strokeWidth="2"
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: nodes.length * 0.2 }}
          />
        )}
      </svg>

      {/* Nodes */}
      {nodes.map(node => (
        <motion.div
          key={node.id}
          className="absolute z-10 flex flex-col items-center justify-center cursor-pointer group"
          style={{ left: `${node.x}%`, top: `${node.y}%`, x: '-50%', y: '-50%' }}
          onMouseEnter={() => setActiveNode(node.id)}
          onMouseLeave={() => setActiveNode(null)}
          animate={{ y: ["-50%", `calc(-50% - 10px)`, "-50%"] }}
          transition={{ duration: 4, repeat: Infinity, delay: node.id * 0.5 }}
        >
          <div 
            className={`rounded-full bg-white shadow-xl flex items-center justify-center transition-colors duration-300 ${activeNode === node.id ? 'bg-violet-100 text-violet-600 border-2 border-violet-500' : 'text-slate-400 border border-slate-200'}`}
            style={{ width: node.size, height: node.size }}
          >
            {React.cloneElement(node.icon as React.ReactElement, { size: node.size / 2.5 })}
          </div>
          <div className={`mt-2 font-bold uppercase tracking-widest text-[10px] transition-opacity duration-300 bg-white/80 backdrop-blur px-2 py-1 rounded ${activeNode === node.id ? 'opacity-100 text-violet-700' : 'opacity-0'}`}>
            {node.label}
          </div>
        </motion.div>
      ))}

      {/* Central Content */}
      <div className="relative z-20 max-w-xl text-center bg-white/90 backdrop-blur-xl p-12 rounded-[3rem] shadow-2xl border border-slate-100">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-slate-900 uppercase">
          Collective OS
        </h1>
        <p className="text-lg text-slate-500 mb-8 font-medium">
          Hover the nodes to explore the decentralized architecture powering the next generation of creative tools.
        </p>
        
        <button className="bg-violet-600 text-white font-bold uppercase tracking-widest px-8 py-4 rounded-full hover:bg-violet-700 transition-all shadow-[0_10px_20px_rgba(139,92,246,0.3)] hover:shadow-none hover:translate-y-1 flex items-center justify-center gap-2 mx-auto w-full max-w-xs">
          <Play size={18} fill="currentColor" /> Initialize Forge
        </button>
      </div>

    </div>
  );
}