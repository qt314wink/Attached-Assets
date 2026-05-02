import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, AlertOctagon, Waypoints, Filter, Layers, Database, Brain } from 'lucide-react';

export default function FrameworksModule({ setPage }: { setPage: (p: string) => void }) {
  const failureModes = [
    { title: "Vibes-Based Iteration", desc: "No falsifiable structure. Iteration is a random walk through possibility space.", icon: <AlertOctagon size={24}/> },
    { title: "Recipe Cargo-Culting", desc: "Copying prompts from viral demos. Brittle solutions that break on edge cases.", icon: <Waypoints size={24}/> },
    { title: "Anthropomorphic Role-Play", desc: "Treats inference as improvisation rather than computation under constraints.", icon: <Brain size={24}/> }
  ];

  const layers = [
    { title: "1. Text Modifiers & Lenses", desc: "Perspective, scale, temporality, sensory translation" },
    { title: "2. Reasoning Engines", desc: "Conditional branching, recursive refinement, attention allocation" },
    { title: "3. Multi-Angle Rationale", desc: "Triangulation protocols for integrating competing viewpoints" },
    { title: "4. Strategic Logic Gates", desc: "Boolean and fuzzy decision architectures (OR/AND/XOR cascades)" },
    { title: "5. Sophisticated Structures", desc: "Nested hierarchies, parametric variation, multi-modal synthesis" }
  ];

  return (
    <div className="pt-32 pb-24 px-6 bg-[#fef3c7] min-h-screen relative text-black">
      <div className="max-w-6xl mx-auto relative z-10">
        <button 
          onClick={() => setPage('home')}
          className="flex items-center gap-2 font-black uppercase mb-12 text-black hover:text-white hover:bg-black px-4 py-2 border-2 border-transparent hover:border-black transition-all w-fit"
        >
          <ArrowLeft size={16} /> Back to Systems
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <h1 className="kinetic-text text-5xl md:text-7xl uppercase leading-none mb-6">
              COGNITIVE<br/>INTERFACES
            </h1>
            <p className="text-xl font-bold mb-12 text-gray-700">
              Prompt Engineering as Interaction Design. Reframing prompts from natural language requests to constrained system interfaces.
            </p>

            <div className="bg-black text-white p-8 brutalist-border mb-12 transform -rotate-1 hover:rotate-0 transition-transform">
              <h3 className="font-black uppercase tracking-widest text-[#ff6b6b] mb-6 flex items-center gap-2">
                <AlertOctagon size={18} /> The 3 Failure Modes
              </h3>
              <div className="space-y-6">
                {failureModes.map((mode, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="text-gray-500 mt-1">{mode.icon}</div>
                    <div>
                      <div className="font-black uppercase">{mode.title}</div>
                      <div className="text-sm text-gray-400">{mode.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <h2 className="text-3xl font-black uppercase mb-8 border-b-4 border-black pb-4 flex items-center gap-4">
              <Layers size={32} /> Framework Architecture
            </h2>
            
            <div className="space-y-4 relative">
              <div className="absolute left-[27px] top-4 bottom-4 w-1 bg-black/10" />
              
              {layers.map((layer, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="flex items-center gap-6 relative bg-white p-6 brutalist-border hover:bg-[#c4ff00] transition-colors group cursor-default"
                >
                  <div className="w-14 h-14 bg-black text-white flex items-center justify-center font-black text-xl shrink-0 z-10 group-hover:scale-110 transition-transform">
                    0{i + 1}
                  </div>
                  <div>
                    <h4 className="font-black uppercase text-lg">{layer.title}</h4>
                    <p className="text-gray-600 font-medium text-sm mt-1">{layer.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-16 p-8 border-4 border-black bg-[#22d3ee] brutalist-border">
              <h3 className="font-black uppercase mb-4 flex items-center gap-2">
                <Filter size={20} /> Optimization Target
              </h3>
              <p className="font-bold text-lg leading-relaxed">
                "Transferability over cleverness. Exclude any technique that relies on anthropomorphic role-play, uses 'natural language that happens to work', or cannot be validated systematically."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}