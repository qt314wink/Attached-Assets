import React from 'react';
import { Database, Zap, Sparkles, Layers, ArrowRight } from 'lucide-react';
import './_group.css';

export function UsabilityC_Accessibility() {
  const modules = [
    { title: "Generative Engine", icon: <Zap size={32} aria-hidden="true" />, color: "bg-[#FF3366]", desc: "Integrating open-source models for instant UI population." },
    { title: "Collage Pipeline", icon: <Sparkles size={32} aria-hidden="true" />, color: "bg-[#33CCFF]", desc: "Procedurally generated textures and collage elements." },
    { title: "Asset Database", icon: <Database size={32} aria-hidden="true" />, color: "bg-[#CCFF00]", desc: "High-performance storage for vector and raster assets." },
    { title: "Component UI", icon: <Layers size={32} aria-hidden="true" />, color: "bg-[#f4f4f4]", desc: "A library of tactile, physics-ready components." },
  ];

  return (
    <div className="min-h-screen bg-white text-black font-sans relative overflow-y-auto">
      
      <main className="max-w-[1440px] mx-auto p-6 md:p-12 lg:p-16 grid grid-cols-1 xl:grid-cols-12 gap-16">
        
        {/* Left Column: Core Value Proposition */}
        <section className="xl:col-span-5 flex flex-col justify-center" aria-labelledby="hero-heading">
          <div className="inline-block bg-black text-white font-bold uppercase tracking-widest text-sm px-4 py-2 mb-8 self-start">
            Tactile Design System
          </div>
          
          <h1 id="hero-heading" className="text-6xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-[1.1]">
            Physics-Driven<br/>
            <span className="bg-[#CCFF00] px-2 leading-[1.1] inline-block mt-2 border-4 border-black">Design.</span>
          </h1>
          
          <p className="text-2xl font-medium mb-12 border-l-[12px] border-black pl-6 py-2 leading-relaxed bg-[#f4f4f4] p-4 text-black">
            We treat UI as physical objects. Elements carry weight, cast solid shadows, and react to kinetic input. Accessible by default.
          </p>
          
          <button 
            className="group w-full sm:w-auto self-start bg-black text-white hover:bg-[#FF3366] focus:bg-[#FF3366] text-xl font-black uppercase tracking-widest py-6 px-12 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-4 focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#33CCFF]"
            aria-label="Explore components library"
          >
            Explore Components <ArrowRight className="group-hover:translate-x-2 transition-transform" aria-hidden="true" />
          </button>
        </section>

        {/* Right Column: Static Grid of Modules (replacing draggable for a11y) */}
        <section className="xl:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8 content-center" aria-label="Core Features">
          {modules.map((mod, i) => (
            <article 
              key={i}
              className={`p-8 border-[6px] border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] ${mod.color} hover:-translate-y-2 hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] transition-all focus-within:ring-4 focus-within:ring-black`}
            >
              <div className="w-20 h-20 bg-white border-4 border-black flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-full mb-8">
                {mod.icon}
              </div>
              <h2 className="font-black text-2xl uppercase tracking-tight bg-white px-4 py-2 border-4 border-black inline-block mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-black">
                {mod.title}
              </h2>
              <p className="font-mono text-base font-bold leading-relaxed bg-white p-4 border-4 border-black text-black">
                {mod.desc}
              </p>
            </article>
          ))}
        </section>

      </main>
    </div>
  );
}
