import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShieldCheck, Layers, Waves, Box, BrainCircuit, Code2 } from 'lucide-react';

export function StorybookA_Narrative({ setPage = () => {} }: { setPage?: (p: string) => void }) {
  const containerRef = useRef(null);
  
  const modules = [
    { 
      title: "Somatic Engine", 
      icon: <ShieldCheck size={64}/>, 
      color: "bg-[#FF0055]", 
      text: "The origin point. A kinetic framework where UI isn't just clicked, it's felt. Physical constraints apply, momentum is preserved, and digital objects possess mass.",
      img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2864&auto=format&fit=crop"
    },
    { 
      title: "Animate Materials", 
      icon: <Layers size={64}/>, 
      color: "bg-[#00E5FF]", 
      text: "Procedural generation of textures that react to their environment. Glass bends light, rubber stretches under pressure, and metal reflects the ambient color palette.",
      img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2940&auto=format&fit=crop"
    },
    { 
      title: "Liquid Physics", 
      icon: <Waves size={64}/>, 
      color: "bg-[#FFFF00]", 
      text: "State transitions behave like fluid. Morphing between states isn't a linear crossfade; it's a dynamic splash, a ripple effect that maintains volume and viscosity.",
      img: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2834&auto=format&fit=crop"
    },
  ];

  return (
    <div className="bg-white text-black font-serif min-h-screen" ref={containerRef}>
      <header className="min-h-[80vh] flex flex-col items-center justify-center text-center p-8 border-b-8 border-black">
        <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-8 font-sans" style={{ WebkitTextStroke: '2px black' }}>
          The <span className="text-[#FF0055]">Collective</span><br/>Story
        </h1>
        <p className="text-2xl md:text-3xl max-w-3xl leading-relaxed">
          How we architected a system that feels alive, combining tactile physics with brutalist clarity.
        </p>
        <div className="mt-12 w-12 h-12 border-b-8 border-r-8 border-black transform rotate-45 animate-bounce" />
      </header>

      {modules.map((mod, i) => (
        <section key={i} className="min-h-screen flex flex-col md:flex-row border-b-8 border-black relative">
          <div className={`md:w-1/2 border-r-8 border-black p-8 md:p-16 flex flex-col justify-center ${mod.color}`}>
            <div className="mb-12 bg-white w-32 h-32 rounded-full border-8 border-black flex items-center justify-center shadow-[12px_12px_0_#000]">
              {mod.icon}
            </div>
            <h2 className="text-5xl md:text-7xl font-black uppercase font-sans mb-8">Chapter 0{i + 1}:<br/>{mod.title}</h2>
            <p className="text-2xl md:text-3xl leading-relaxed font-serif bg-white p-8 border-8 border-black shadow-[12px_12px_0_#000]">
              {mod.text}
            </p>
            <button className="mt-12 self-start font-black uppercase text-xl font-sans bg-black text-white px-8 py-4 border-4 border-black hover:bg-white hover:text-black transition-colors">
              Read the documentation
            </button>
          </div>
          <div className="md:w-1/2 relative min-h-[50vh] md:min-h-screen overflow-hidden group">
             <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
             <img src={mod.img} alt={mod.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
          </div>
        </section>
      ))}
      
      <footer className="p-16 md:p-32 text-center bg-black text-white">
        <h2 className="text-5xl md:text-8xl font-black uppercase font-sans mb-8">Continue the Journey</h2>
        <button onClick={() => setPage('systems')} className="text-2xl md:text-4xl font-serif italic hover:text-[#00E5FF] transition-colors">
          Explore all components &rarr;
        </button>
      </footer>
    </div>
  );
}
