import React from 'react';
import { Database, Zap, Sparkles, Layers, ArrowRight, Code2 } from 'lucide-react';

export function ComicHero({ setPage }: { setPage: (p: string) => void }) {
  return (
    <div className="bg-white relative font-sans p-4 md:p-8 pt-24 pb-8 border-b-8 border-black">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 h-full auto-rows-fr">
        
        {/* Panel 1: Hero Title (Spans 8 cols) */}
        <div className="md:col-span-8 border-[6px] border-black p-8 md:p-16 relative overflow-hidden flex flex-col justify-center min-h-[400px] bg-[#E5E5E5] group shadow-[12px_12px_0_#000]">
          {/* Halftone overlay */}
          <div className="absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #000 2px, transparent 2.5px)', backgroundSize: '12px 12px' }} />
          
          <div className="relative z-10">
            <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8] mb-8">
              <span className="text-[#FF0055] block" style={{ WebkitTextStroke: '4px black', textShadow: '6px 6px 0 #000' }}>Tactile</span>
              <span className="text-[#00E5FF] block" style={{ WebkitTextStroke: '4px black', textShadow: '6px 6px 0 #000' }}>System</span>
            </h1>
            <div className="bg-black text-white font-black uppercase px-6 py-3 inline-block text-2xl border-[6px] border-white shadow-[8px_8px_0_#FFFF00] transform -rotate-3 hover:rotate-0 transition-transform cursor-default">
              Physics-Driven Design!
            </div>
          </div>
        </div>

        <div className="md:col-span-4 flex flex-col gap-4">
            {/* Panel 2: CTA */}
            <div className="flex-1 border-[6px] border-black bg-[#FFFF00] p-8 flex flex-col justify-center items-center text-center group cursor-pointer hover:bg-[#00E5FF] transition-colors shadow-[12px_12px_0_#000]" onClick={() => window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'})}>
              <div className="w-24 h-24 bg-white border-[6px] border-black rounded-full flex items-center justify-center mb-6 shadow-[8px_8px_0_#000] group-hover:scale-110 transition-transform">
                <ArrowRight size={48} className="transform group-hover:rotate-90 transition-transform" />
              </div>
              <h2 className="text-4xl font-black uppercase leading-none mb-4">Explore<br/>Now!</h2>
              <p className="font-black text-lg uppercase px-4 py-2 bg-white border-[6px] border-black shadow-[4px_4px_0_#000]">Scroll Down</p>
            </div>

            {/* Panel 3: Secondary CTA */}
            <div className="flex-1 border-[6px] border-black bg-white p-8 flex flex-col justify-center relative overflow-hidden group shadow-[12px_12px_0_#000] cursor-pointer" onClick={() => setPage('forge')}>
              <div className="absolute inset-0 bg-[#FF0055] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              <div className="relative z-10 group-hover:text-white transition-colors">
                <div className="w-16 h-16 bg-black text-white border-[6px] border-black group-hover:border-white rounded-full flex items-center justify-center mb-6 transition-colors shadow-[6px_6px_0_#000]">
                  <Code2 size={32} />
                </div>
                <h2 className="text-4xl font-black uppercase mb-4" style={{ WebkitTextStroke: '2px black' }}>The Forge</h2>
                <p className="font-bold mb-6 text-xl border-l-[6px] border-black group-hover:border-white pl-4 transition-colors">Build custom UI objects.</p>
                <button className="bg-black text-white font-black uppercase px-6 py-3 hover:text-[#FFFF00] border-[6px] border-black group-hover:border-white transition-colors shadow-[4px_4px_0_#000]">
                  Access &gt;&gt;
                </button>
              </div>
            </div>
        </div>

      </div>
    </div>
  );
}