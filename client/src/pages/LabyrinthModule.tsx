import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Box, Hexagon, Component, CheckCircle2, Copy } from 'lucide-react';

export default function LabyrinthModule({ setPage }: { setPage: (p: string) => void }) {
  const [activeTab, setActiveTab] = useState('components');
  
  const components = [
    {
      name: "Glassmorphism Card UI",
      desc: "A futuristic translucent card with blurred backdrop and interactive hover glow effect.",
      tags: ["CSS", "React", "Design"],
      price: "$12.00"
    },
    {
      name: "Magnetic Button",
      desc: "Button that smoothly follows the cursor on hover using physics-based animation.",
      tags: ["Framer Motion", "React", "Interaction"],
      price: "$8.00"
    },
    {
      name: "Liquid Swipe Navigation",
      desc: "A viscous, gooey transition effect between pages inspired by fluid dynamics.",
      tags: ["SVG", "React", "Animation"],
      price: "$15.00"
    }
  ];

  return (
    <div className="pt-32 pb-24 px-6 bg-white min-h-screen relative text-black">
      <div className="max-w-6xl mx-auto relative z-10">
        <button 
          onClick={() => setPage('home')}
          className="flex items-center gap-2 font-black uppercase mb-12 text-black hover:text-white hover:bg-black px-4 py-2 border-2 border-transparent hover:border-black transition-all w-fit"
        >
          <ArrowLeft size={16} /> Back to Systems
        </button>

        <div className="mb-16">
          <h1 className="kinetic-text text-6xl md:text-8xl uppercase leading-none mb-6">
            COMPONENT<br/>ARSENAL
          </h1>
          <p className="text-xl font-bold max-w-2xl text-gray-600">
            A modular marketplace of high-performance, generative UI components. 
            Built for scale, designed for impact.
          </p>
        </div>

        <div className="flex gap-4 mb-12 border-b-4 border-black pb-4 overflow-x-auto">
          {[
            { id: 'components', label: 'UI Blocks', icon: <Box size={18}/> },
            { id: 'systems', label: 'Design Systems', icon: <Hexagon size={18}/> },
            { id: 'logic', label: 'Logic Hooks', icon: <Component size={18}/> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 font-black uppercase px-6 py-3 transition-all whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'bg-black text-[#c4ff00]' 
                  : 'bg-gray-100 text-black hover:bg-gray-200'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {components.map((comp, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="brutalist-border p-6 bg-white flex flex-col group hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-indigo-100 flex items-center justify-center rounded-none brutalist-border">
                  <Component size={24} className="text-indigo-600" />
                </div>
                <span className="font-black text-indigo-600 bg-indigo-50 px-3 py-1 border-2 border-indigo-600">
                  {comp.price}
                </span>
              </div>
              
              <h3 className="text-2xl font-black uppercase mb-3">{comp.name}</h3>
              <p className="text-gray-600 font-bold mb-6 flex-1">
                {comp.desc}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {comp.tags.map((tag, j) => (
                  <span key={j} className="text-[10px] font-black uppercase px-2 py-1 bg-gray-100 text-gray-500">
                    {tag}
                  </span>
                ))}
              </div>

              <button className="w-full bg-black text-white font-black uppercase py-3 flex items-center justify-center gap-2 group-hover:bg-[#c4ff00] group-hover:text-black transition-colors">
                <Copy size={16} /> Copy Component
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}