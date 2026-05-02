import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Network, Volume2, Shield, LayoutGrid, Server, BrainCircuit } from 'lucide-react';

export default function BiomimesisModule({ setPage }: { setPage: (p: string) => void }) {
  const [activeNode, setActiveNode] = useState<number | null>(null);

  const nodes = [
    {
      title: "Mycelial Architecture",
      icon: <Network size={32} />,
      desc: "Information architecture modeled after fungal networks. Navigation is decentralized, contextual, and organic rather than relying on rigid, hierarchical folders.",
      color: "border-[#a3e635] text-[#a3e635]"
    },
    {
      title: "Digital Synesthesia",
      icon: <Volume2 size={32} />,
      desc: "Multi-sensory feedback loops. Visuals are replaced or enhanced by subtle, organic soundscapes (rustling grass) and localized haptics to reduce cognitive load.",
      color: "border-[#22d3ee] text-[#22d3ee]"
    },
    {
      title: "Trauma-Informed Design",
      icon: <Shield size={32} />,
      desc: "Interfaces designed for psychological safety (Polyvagal Theory). Predictable patterns, permanent undo, and 'Quiet Modes' keep users in a relaxed Ventral Vagal state.",
      color: "border-[#ff6b6b] text-[#ff6b6b]"
    },
    {
      title: "Fractal & Bento UI",
      icon: <LayoutGrid size={32} />,
      desc: "Complex information chunked into distinct, bite-sized modules (Bento Box) following fractal geometry rules that scale perfectly across all viewports.",
      color: "border-[#fbbf24] text-[#fbbf24]"
    },
    {
      title: "Server-Driven UI (SDUI)",
      icon: <Server size={32} />,
      desc: "Backend dictates layout and logic in real-time. AI instantly restructures the interface based on behavioral patterns without requiring software updates.",
      color: "border-[#c4ff00] text-[#c4ff00]"
    },
    {
      title: "Agentic Protocols",
      icon: <BrainCircuit size={32} />,
      desc: "MCP (Model Context Protocol) and AG-UI govern AI interactions. Real-time event streaming replaces loading spinners with 'Human-in-the-Loop' transparency.",
      color: "border-purple-400 text-purple-400"
    }
  ];

  return (
    <div className="pt-32 pb-24 px-6 bg-[#0a0a0a] min-h-screen relative text-white overflow-hidden">
      {/* Mycelial background effect */}
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.6" stitchTiles="stitch"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>

      <div className="max-w-6xl mx-auto relative z-10">
        <button 
          onClick={() => setPage('home')}
          className="flex items-center gap-2 font-black uppercase mb-12 text-white hover:text-black hover:bg-white px-4 py-2 border-2 border-transparent hover:border-white transition-all w-fit"
        >
          <ArrowLeft size={16} /> Back to Systems
        </button>

        <div className="mb-20 text-center">
          <span className="text-[#a3e635] font-black uppercase tracking-[0.5em] text-xs block mb-4">
            // NEXT-GEN ARCHITECTURE
          </span>
          <h1 className="text-6xl md:text-8xl font-black uppercase leading-none mb-6">
            BIOMIMETIC<br/>
            <span className="text-transparent" style={{ WebkitTextStroke: '2px white' }}>INTERFACE</span>
          </h1>
          <p className="text-xl font-medium max-w-2xl mx-auto text-gray-400">
            Moving past static screens into dynamic, sentient ecosystems that adapt, grow, and respond to physiological contexts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {nodes.map((node, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              onHoverStart={() => setActiveNode(i)}
              onHoverEnd={() => setActiveNode(null)}
              className={`p-8 bg-black/50 backdrop-blur-md border border-white/10 hover:bg-black hover:border-white/50 transition-all cursor-crosshair relative overflow-hidden group`}
            >
              <div className={`absolute top-0 left-0 w-1 h-full ${node.color.split(' ')[0].replace('border-', 'bg-')} opacity-0 group-hover:opacity-100 transition-opacity`} />
              
              <div className={`mb-6 ${node.color.split(' ')[1]} opacity-50 group-hover:opacity-100 transition-opacity group-hover:scale-110 transform origin-left`}>
                {node.icon}
              </div>
              
              <h3 className="text-2xl font-black uppercase mb-4 text-white group-hover:text-white transition-colors">{node.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300">
                {node.desc}
              </p>

              {/* Connecting lines logic (visual only) */}
              {activeNode === i && (
                <motion.div 
                  layoutId="mycelium-glow"
                  className="absolute inset-0 bg-white/5 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}