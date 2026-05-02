import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, Zap, Layers, Cpu, ShieldCheck, Code2, BrainCircuit, Users, Palette, Waves, Network, Box, PenTool } from 'lucide-react';
import { PrismText } from '@/components/Toolkit';
import { CollageHero } from '@/components/CollageHero';

export default function Home({ setPage }: { setPage: (p: string) => void }) {
  return (
    <div className="min-h-screen pb-20 bg-[#E5E5E5]">
      <CollageHero setPage={setPage} />

      <section className="mt-40 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16 border-b-4 border-black pb-8">
            <h2 className="kinetic-text text-5xl md:text-7xl">Featured<br/>Systems</h2>
            <div className="text-right hidden md:block">
              <p className="font-bold text-gray-400">01 / 02 / 03</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {[
               { title: "Somatic Engine", icon: <ShieldCheck size={32}/>, color: "bg-purple-200", id: "module-somatic" },
               { title: "Animate Materials", icon: <Layers size={32}/>, color: "bg-[#c4ff00]", id: "module-materials" },
               { title: "Liquid Physics", icon: <Waves size={32}/>, color: "bg-pink-200", id: "module-liquid" },
               { title: "Soft UI Logic", icon: <Box size={32}/>, color: "bg-slate-200", id: "module-neumorphic" },
               { title: "Inner Odyssey", icon: <BrainCircuit size={32}/>, color: "bg-indigo-200", id: "module-individuation" },
               { title: "Component Forge", icon: <Code2 size={32}/>, color: "bg-orange-200", id: "module-labyrinth" },
               { title: "Sentient UX", icon: <Globe size={32}/>, color: "bg-teal-200", id: "module-biomimesis" },
               { title: "Agentic Sandbox", icon: <Users size={32}/>, color: "bg-blue-200", id: "module-visionaries" },
               { title: "SVG Matrix", icon: <Palette size={32}/>, color: "bg-rose-200", id: "module-stylematrix" },
               { title: "Elementalmorphism", icon: <Box size={32}/>, color: "bg-emerald-200", id: "module-elemental" },
               { title: "Paradox of Power", icon: <Network size={32}/>, color: "bg-amber-200", id: "module-sovereignty" },
               { title: "Graffiti Typewriter", icon: <PenTool size={32}/>, color: "bg-red-200", id: "module-graffiti" }
             ].map((item, idx) => (
               <motion.div 
                 key={idx}
                 className={`group relative p-10 min-h-[350px] flex flex-col justify-between border-4 border-black transition-all hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${item.color}`}
                 whileHover={{ scale: 1.02 }}
               >
                 <div>
                   <div className="mb-6 p-4 bg-black text-white inline-block rounded-full">
                     {item.icon}
                   </div>
                   <h3 className="text-4xl font-black uppercase leading-none text-black">
                     {item.title}
                   </h3>
                 </div>
                 
                 <button 
                   onClick={() => setPage(item.id)}
                   className="flex items-center gap-2 font-bold text-sm uppercase group-hover:gap-4 transition-all"
                 >
                   Access Module <ArrowRight className="w-4 h-4" />
                 </button>
               </motion.div>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
}
