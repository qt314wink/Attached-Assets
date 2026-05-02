import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Layers, Waves, Box, BrainCircuit, Code2 } from 'lucide-react';

export function StorybookB_Editorial({ setPage = () => {} }: { setPage?: (p: string) => void }) {
  const modules = [
    { title: "Somatic Engine", excerpt: "Physical interactions in a digital plane.", desc: "We wanted a UI that didn't just respond to clicks, but reacted to momentum. The Somatic Engine introduces mass and gravity to digital objects, creating a tactile experience.", author: "Lead Architect" },
    { title: "Animate Materials", excerpt: "Textures that live and breathe.", desc: "Static hex codes are dead. Materials bend light, reflect their surroundings, and change state based on user interaction. It's procedural generation for UI.", author: "Design Systems" },
    { title: "Liquid Physics", excerpt: "Fluid state transitions.", desc: "Moving from state A to state B should feel like water displacing. Liquid physics ensures volume is maintained during complex component morphs.", author: "UX Engineer" }
  ];

  return (
    <div className="bg-[#F5F5F0] text-[#111] font-serif min-h-screen">
      <div className="max-w-[1400px] mx-auto p-6 md:p-12">
        <header className="border-b-[1px] border-black pb-6 mb-12 flex justify-between items-end">
          <div className="font-sans font-bold uppercase tracking-widest text-xs">Collective OS // Editorial</div>
          <div className="font-sans font-bold uppercase tracking-widest text-xs text-right">Vol. 01<br/>The Foundation</div>
        </header>

        <h1 className="text-6xl md:text-[9rem] font-serif leading-[0.8] mb-12 tracking-tight">
          Designing<br/>
          <span className="italic text-gray-500">&</span> Architecture.
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t-[1px] border-black pt-12">
          
          {/* Left Column: Intro / Table of Contents */}
          <div className="md:col-span-3">
            <p className="text-xl leading-relaxed mb-12">
              A deep dive into the core systems powering the Collective OS. From kinetic physics to procedural materials, exploring the boundary between digital and physical.
            </p>
            
            <div className="font-sans uppercase text-sm font-bold tracking-widest mb-6 border-b-[1px] border-black pb-2">Index</div>
            <ul className="space-y-4">
              {modules.map((m, i) => (
                <li key={i} className="flex justify-between items-baseline group cursor-pointer hover:text-blue-600 transition-colors">
                  <span className="font-serif italic text-lg">{m.title}</span>
                  <span className="font-sans text-xs border-b border-dotted flex-1 mx-4 opacity-30 group-hover:border-blue-600"></span>
                  <span className="font-sans font-bold text-xs">0{i+1}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-9 space-y-32">
            {modules.map((mod, i) => (
              <article key={i} className="relative">
                <div className="font-sans font-bold uppercase tracking-widest text-xs mb-8 text-gray-400">Section 0{i+1}</div>
                <h2 className="text-5xl md:text-7xl font-serif mb-8">{mod.title}</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                  <div>
                    <h3 className="text-3xl font-serif italic mb-8 text-blue-600">"{mod.excerpt}"</h3>
                    <p className="text-xl leading-relaxed text-gray-800">
                      {mod.desc}
                    </p>
                    <div className="mt-8 pt-8 border-t-[1px] border-black inline-block">
                      <span className="font-sans font-bold uppercase text-xs tracking-widest block mb-1">Perspective</span>
                      <span className="font-serif italic text-gray-500">{mod.author}</span>
                    </div>
                  </div>
                  
                  <div className="aspect-[4/5] bg-gray-200 relative overflow-hidden group">
                    <img src={`https://images.unsplash.com/photo-${1600000000000 + i * 100000000}?q=80&w=1200&auto=format&fit=crop`} className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Editorial" />
                    <div className="absolute inset-0 bg-blue-600/10 mix-blend-multiply" />
                  </div>
                </div>
              </article>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
