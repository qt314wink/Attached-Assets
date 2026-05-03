import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, Zap, Layers, Cpu, ShieldCheck, Code2, BrainCircuit, Users, Palette, Waves, Network, Box, PenTool } from 'lucide-react';
import { ComicHero } from '@/components/ComicHero';

export default function Home({ setPage }: { setPage: (p: string) => void }) {
  const modules = [
    { 
      title: "Somatic Engine", 
      icon: <ShieldCheck size={64} strokeWidth={2.5}/>, 
      color: "bg-[#FF0055]", 
      id: "module-somatic", 
      narrative: "Volume 01: The Physical Layer",
      desc: "Physical UI interactions that obey the laws of digital gravity. Buttons have mass, panels have friction. It's not just a click; it's a collision. BOOM!",
      span: "md:col-span-8 md:row-span-2",
      type: "hero-panel"
    },
    { 
      title: "Animate Materials", 
      icon: <Layers size={48}/>, 
      color: "bg-[#00E5FF]", 
      id: "module-materials", 
      narrative: "Vol 02",
      desc: "Procedural textures generated in real-time. Glass, rubber, chrome. ZAP!",
      span: "md:col-span-4 md:row-span-1",
      type: "standard"
    },
    { 
      title: "Liquid Physics", 
      icon: <Waves size={48}/>, 
      color: "bg-[#FFFF00]", 
      id: "module-liquid", 
      narrative: "Vol 03",
      desc: "Fluid dynamics applied to state transitions. Watch the UI splash and ripple.",
      span: "md:col-span-4 md:row-span-1",
      type: "standard"
    },
    { 
      title: "Soft UI Logic", 
      icon: <Box size={48}/>, 
      color: "bg-[#FF9900]", 
      id: "module-neumorphic", 
      narrative: "Vol 04: The Tactile Shift",
      desc: "Neumorphism reimagined. Extruded components that respond to virtual light sources and cast realistic shadows. POW!",
      span: "md:col-span-6 md:row-span-1",
      type: "wide"
    },
    { 
      title: "Inner Odyssey", 
      icon: <BrainCircuit size={48}/>, 
      color: "bg-[#CCFF00]", 
      id: "module-individuation", 
      narrative: "Vol 05: Cognitive Architecture",
      desc: "Generative workflows that adapt to the user's intent. The interface learns, shifts, and provides psychological feedback. WHAM!",
      span: "md:col-span-6 md:row-span-1",
      type: "wide"
    },
    { 
      title: "Component Forge", 
      icon: <Code2 size={64}/>, 
      color: "bg-white", 
      id: "module-labyrinth", 
      narrative: "Vol 06: The Builder's Domain",
      desc: "A brutalist sandbox where you hammer out custom elements. Code meets visual assembly. CLANG!",
      span: "md:col-span-4 md:row-span-2",
      type: "tall"
    },
    { 
      title: "Sentient UX", 
      icon: <Globe size={48}/>, 
      color: "bg-[#FF3366]", 
      id: "module-biomimesis", 
      narrative: "Vol 07: Biomimesis",
      desc: "Interfaces that breathe. Elements inspired by biological patterns, cellular automata, and organic growth.",
      span: "md:col-span-8 md:row-span-1",
      type: "wide"
    },
    { 
      title: "Agentic Sandbox", 
      icon: <Users size={48}/>, 
      color: "bg-[#33CCFF]", 
      id: "module-visionaries", 
      narrative: "Vol 08",
      desc: "Multi-agent systems collaborating on the canvas. BZZZT!",
      span: "md:col-span-4 md:row-span-1",
      type: "standard"
    },
    { 
      title: "SVG Matrix", 
      icon: <Palette size={48}/>, 
      color: "bg-[#FFCC00]", 
      id: "module-stylematrix", 
      narrative: "Vol 09",
      desc: "Raw vector manipulation. Bend the curves of reality. CRACK!",
      span: "md:col-span-4 md:row-span-1",
      type: "standard"
    },
    { 
      title: "Elementalmorphism", 
      icon: <Cpu size={80}/>, 
      color: "bg-[#00FF66]", 
      id: "module-elemental", 
      narrative: "Vol 10: The Master System",
      desc: "Matter-based logic where data types are represented by physical states: solid blocks of data, gaseous streams of information, and energetic events. THUD!",
      span: "md:col-span-12 md:row-span-2",
      type: "banner"
    },
    { 
      title: "Paradox of Power", 
      icon: <Network size={48}/>, 
      color: "bg-[#FF66CC]", 
      id: "module-sovereignty", 
      narrative: "Vol 11: Decentralized Control",
      desc: "Peer-to-peer data flow visualized as kinetic nodes. BANG!",
      span: "md:col-span-6 md:row-span-1",
      type: "wide"
    },
    { 
      title: "Graffiti Typewriter", 
      icon: <PenTool size={48}/>, 
      color: "bg-[#9900FF]", 
      id: "module-graffiti", 
      narrative: "Vol 12: Kinetic Typography",
      desc: "Words that shatter the grid. Typography as an explosive, physical element. SMASH!",
      span: "md:col-span-6 md:row-span-1",
      type: "wide"
    },
    { 
      title: "Tactile Synthesis", 
      icon: <Layers size={48}/>, 
      color: "bg-[#00FF66]", 
      id: "module-tactile", 
      narrative: "Vol 13: Drag & Drop Alchemy",
      desc: "Pick up the pieces. Feel the weight. Combine them in the crucible. Tactility is the new logic.",
      span: "md:col-span-12 md:row-span-2",
      type: "banner"
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-black selection:text-[#FFFF00]">
      <ComicHero setPage={setPage} />

      <section className="bg-[#E5E5E5] relative overflow-hidden py-16 md:py-24">
        {/* Halftone Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'radial-gradient(circle, #000 2px, transparent 2.5px)', backgroundSize: '16px 16px' }} />

        <div className="max-w-[1600px] mx-auto px-4 md:px-8 relative z-10">
          
          <div className="flex flex-col md:flex-row items-end justify-between mb-8 md:mb-12 border-b-[8px] border-black pb-8 bg-white p-8 shadow-[12px_12px_0_#000]">
            <div className="relative w-full md:w-auto">
              <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none" style={{ textShadow: '4px 4px 0 #00E5FF, 8px 8px 0 #000' }}>
                The Complete
              </h2>
              <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none" style={{ textShadow: '4px 4px 0 #FF0055, 8px 8px 0 #000' }}>
                Saga!
              </h2>
            </div>
            <div className="bg-black text-white font-black uppercase px-6 py-2 md:px-8 md:py-3 border-[6px] border-white shadow-[8px_8px_0_#FFFF00] transform rotate-2 mt-8 md:mt-0 text-xl md:text-2xl self-start md:self-end">
              13 Issues Included!
            </div>
          </div>

          {/* Comic Panel Layout using CSS Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 auto-rows-[minmax(350px,auto)]">
             {modules.map((item, idx) => (
               <div 
                 key={idx}
                 onClick={() => setPage(item.id)}
                 className={`group relative p-6 md:p-10 flex flex-col justify-between border-[8px] border-black transition-all hover:-translate-y-2 hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${item.color} cursor-pointer overflow-hidden ${item.span}`}
               >
                 {/* Panel Numbering */}
                 <div className="absolute top-4 right-4 bg-white border-4 border-black px-3 py-1 font-black text-xl shadow-[4px_4px_0_#000] rotate-6 group-hover:-rotate-3 transition-transform z-20">
                   #{String(idx + 1).padStart(2, '0')}
                 </div>

                 {/* Background action lines for hero panels */}
                 {item.type === 'hero-panel' || item.type === 'banner' ? (
                   <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none z-0">
                      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                        <path d="M0,0 L100,100 M50,0 L50,100 M100,0 L0,100 M0,50 L100,50" stroke="black" strokeWidth="2" vectorEffect="non-scaling-stroke" className="origin-center animate-spin-slow"/>
                      </svg>
                   </div>
                 ) : null}

                 <div className="relative z-10 flex-1 flex flex-col">
                   <div className="font-black uppercase tracking-widest text-xs md:text-sm bg-white border-[4px] border-black inline-block px-3 py-1 mb-6 shadow-[4px_4px_0_#000] w-fit transform -rotate-1 group-hover:rotate-0 transition-transform">
                     {item.narrative}
                   </div>
                   
                   <div className="flex items-center gap-6 mb-6">
                     <div className={`w-20 h-20 md:w-24 md:h-24 bg-white border-[6px] border-black flex items-center justify-center rounded-full shadow-[6px_6px_0_#000] group-hover:scale-110 transition-transform flex-shrink-0 ${item.type === 'banner' ? 'md:w-32 md:h-32' : ''}`}>
                       {item.icon}
                     </div>
                     <h3 className={`font-black uppercase leading-tight text-black bg-white px-4 py-2 border-[6px] border-black shadow-[6px_6px_0_#000] transform -rotate-2 group-hover:rotate-0 transition-transform ${item.type === 'hero-panel' || item.type === 'banner' ? 'text-4xl md:text-6xl' : 'text-3xl md:text-4xl'}`} style={{ WebkitTextStroke: item.type === 'banner' ? '1px black' : '0' }}>
                       {item.title}
                     </h3>
                   </div>

                   <div className={`bg-white p-4 md:p-6 border-[6px] border-black shadow-[6px_6px_0_#000] mt-auto relative ${item.type === 'hero-panel' || item.type === 'wide' || item.type === 'banner' ? 'text-lg md:text-2xl' : 'text-base md:text-lg'}`}>
                     {/* Speech bubble tail */}
                     <div className="absolute -top-4 left-12 w-6 h-6 bg-white border-l-[6px] border-t-[6px] border-black transform rotate-45" />
                     <p className="font-black uppercase leading-snug relative z-10">
                       {item.desc}
                     </p>
                   </div>
                 </div>
                 
                 <div className="relative z-10 mt-8 self-end">
                   <div className="flex items-center gap-2 font-black text-xl uppercase bg-black text-white px-6 py-3 border-[6px] border-black group-hover:bg-[#FFFF00] group-hover:text-black transition-colors shadow-[6px_6px_0_#000]">
                     Read <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
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