import React from 'react';
import { motion } from 'framer-motion';
import { Database, Zap, Sparkles, Layers, ArrowRight } from 'lucide-react';

export function ComicB_Panels({ setPage = () => {} }: { setPage?: (p: string) => void }) {
  const modules = [
    { title: "Generative Engine", icon: <Zap size={32} />, color: "bg-[#FF3366]", desc: "Open-source models.", onClick: () => setPage('module-somatic') },
    { title: "Collage Pipeline", icon: <Sparkles size={32} />, color: "bg-[#33CCFF]", desc: "Procedural textures.", onClick: () => setPage('module-materials') },
    { title: "Asset Database", icon: <Database size={32} />, color: "bg-[#CCFF00]", desc: "Vector storage.", onClick: () => setPage('module-liquid') },
    { title: "Component UI", icon: <Layers size={32} />, color: "bg-[#FF9900]", desc: "Tactile components.", onClick: () => setPage('module-neumorphic') },
  ];

  return (
    <div className="min-h-screen bg-white relative font-sans p-4 md:p-8">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 h-full auto-rows-fr">
        
        {/* Panel 1: Hero Title (Spans 8 cols) */}
        <div className="md:col-span-8 border-8 border-black p-8 md:p-12 relative overflow-hidden flex flex-col justify-center min-h-[400px] bg-[#E5E5E5] group">
          {/* Halftone overlay */}
          <div className="absolute inset-0 opacity-20 mix-blend-multiply" style={{ backgroundImage: 'radial-gradient(circle, #000 2px, transparent 2.5px)', backgroundSize: '12px 12px' }} />
          
          <div className="relative z-10">
            <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8] mb-6">
              <span className="text-[#FF3366] block" style={{ WebkitTextStroke: '4px black' }}>Tactile</span>
              <span className="text-[#33CCFF] block" style={{ WebkitTextStroke: '4px black' }}>System</span>
            </h1>
            <div className="bg-black text-white font-black uppercase px-6 py-3 inline-block text-xl border-4 border-white shadow-[8px_8px_0_#CCFF00] transform -rotate-2">
              Physics-Driven Design!
            </div>
          </div>
        </div>

        {/* Panel 2: CTA (Spans 4 cols) */}
        <div className="md:col-span-4 border-8 border-black bg-[#CCFF00] p-8 flex flex-col justify-center items-center text-center group cursor-pointer hover:bg-[#FF3366] transition-colors" onClick={() => setPage('systems')}>
          <div className="w-24 h-24 bg-white border-8 border-black rounded-full flex items-center justify-center mb-6 shadow-[8px_8px_0_#000] group-hover:scale-110 transition-transform">
            <ArrowRight size={48} />
          </div>
          <h2 className="text-4xl font-black uppercase leading-none mb-4">Explore<br/>Now!</h2>
          <p className="font-bold text-lg uppercase px-4 py-2 bg-white border-4 border-black">Click Here</p>
        </div>

        {/* Panel 3: Secondary CTA (Spans 4 cols) */}
        <div className="md:col-span-4 border-8 border-black bg-white p-8 flex flex-col justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-[#33CCFF] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
          <div className="relative z-10">
            <h2 className="text-4xl font-black uppercase mb-4">The Forge</h2>
            <p className="font-bold mb-6 text-lg border-l-8 border-black pl-4">Build custom UI objects.</p>
            <button onClick={() => setPage('forge')} className="bg-black text-white font-black uppercase px-6 py-3 hover:text-[#CCFF00]">
              Access >>
            </button>
          </div>
        </div>

        {/* Panels 4-7: The Modules (Span 2 cols each on desktop) */}
        <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {modules.map((mod, i) => (
            <div 
              key={i} 
              onClick={mod.onClick}
              className={`${mod.color} border-8 border-black p-6 flex flex-col items-center justify-between text-center group cursor-pointer hover:shadow-[inset_0_0_0_8px_white] transition-all`}
            >
              <div className="bg-white p-3 border-4 border-black shadow-[4px_4px_0_#000] rounded-full group-hover:-translate-y-2 transition-transform">
                {mod.icon}
              </div>
              <div>
                <h3 className="font-black uppercase text-xl mb-2">{mod.title}</h3>
                <p className="font-bold text-sm bg-white border-2 border-black px-2">{mod.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
