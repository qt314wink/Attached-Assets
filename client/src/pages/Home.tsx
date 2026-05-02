import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, Zap, Layers, Cpu, ShieldCheck, Code2, BrainCircuit, Users, Palette, Waves, Network, Box, PenTool } from 'lucide-react';
import { PrismText } from '@/components/Toolkit';
import { ComicHero } from '@/components/ComicHero';

export default function Home({ setPage }: { setPage: (p: string) => void }) {
  const modules = [
    { title: "Somatic Engine", icon: <ShieldCheck size={48}/>, color: "bg-[#FF0055]", id: "module-somatic", desc: "Physical UI interactions! Boom!" },
    { title: "Animate Materials", icon: <Layers size={48}/>, color: "bg-[#00E5FF]", id: "module-materials", desc: "Procedural textures! Zap!" },
    { title: "Liquid Physics", icon: <Waves size={48}/>, color: "bg-[#FFFF00]", id: "module-liquid", desc: "Fluid dynamics! Splash!" },
    { title: "Soft UI Logic", icon: <Box size={48}/>, color: "bg-[#FF9900]", id: "module-neumorphic", desc: "Tactile components! Pow!" },
    { title: "Inner Odyssey", icon: <BrainCircuit size={48}/>, color: "bg-[#CCFF00]", id: "module-individuation", desc: "Generative workflows! Wham!" },
    { title: "Component Forge", icon: <Code2 size={48}/>, color: "bg-white", id: "module-labyrinth", desc: "Custom element builder! Clang!" }
  ];

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-black selection:text-[#FFFF00]">
      <ComicHero setPage={setPage} />

      <section className="bg-[#E5E5E5] relative overflow-hidden py-24">
        {/* Halftone Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'radial-gradient(circle, #000 2px, transparent 2.5px)', backgroundSize: '16px 16px' }} />

        <div className="max-w-[1600px] mx-auto px-8 md:px-12 relative z-10">
          
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 border-b-[8px] border-black pb-8 bg-white p-8 shadow-[12px_12px_0_#000]">
            <div className="relative">
              <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none" style={{ textShadow: '4px 4px 0 #00E5FF, 8px 8px 0 #000' }}>
                Featured
              </h2>
              <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none" style={{ textShadow: '4px 4px 0 #FF0055, 8px 8px 0 #000' }}>
                Systems!
              </h2>
            </div>
            <div className="bg-black text-white font-black uppercase px-8 py-3 border-[6px] border-white shadow-[8px_8px_0_#FFFF00] transform rotate-3 mt-8 md:mt-0 text-2xl">
              Pick Your Power!
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
             {modules.map((item, idx) => (
               <div 
                 key={idx}
                 onClick={() => setPage(item.id)}
                 className={`group relative p-10 flex flex-col justify-between border-[8px] border-black transition-all hover:-translate-y-3 hover:shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] ${item.color} cursor-pointer min-h-[400px]`}
               >
                 <div className="absolute top-4 right-4 bg-white border-4 border-black px-3 py-1 font-black text-xl shadow-[4px_4px_0_#000] rotate-6 group-hover:-rotate-3 transition-transform">
                   #0{idx + 1}
                 </div>

                 <div className="relative z-10">
                   <div className="mb-8 w-24 h-24 bg-white border-[6px] border-black flex items-center justify-center rounded-full shadow-[6px_6px_0_#000] group-hover:scale-110 transition-transform relative">
                     {/* Action lines on hover */}
                     <div className="absolute -inset-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                       <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow">
                         <path d="M50 0 L50 20 M100 50 L80 50 M50 100 L50 80 M0 50 L20 50" stroke="black" strokeWidth="4" />
                       </svg>
                     </div>
                     {item.icon}
                   </div>
                   <h3 className="text-3xl font-black uppercase leading-tight text-black bg-white px-4 py-2 border-[6px] border-black inline-block mb-6 shadow-[6px_6px_0_#000] transform -rotate-2 group-hover:rotate-0 transition-transform">
                     {item.title}
                   </h3>
                   <div className="bg-white p-4 border-[6px] border-black shadow-[6px_6px_0_#000]">
                     <p className="font-black text-xl uppercase">
                       {item.desc}
                     </p>
                   </div>
                 </div>
                 
                 <div className="relative z-10 mt-12 self-start">
                   <div className="flex items-center gap-4 font-black text-2xl uppercase bg-black text-white px-6 py-3 border-[6px] border-black group-hover:bg-white group-hover:text-black transition-colors shadow-[6px_6px_0_#000]">
                     Enter <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
                   </div>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
}