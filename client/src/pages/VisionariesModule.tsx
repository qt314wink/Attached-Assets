import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, Filter, ExternalLink } from 'lucide-react';

export default function VisionariesModule({ setPage }: { setPage: (p: string) => void }) {
  const artists = [
    { name: "SOPHIE_V", tags: ["3D", "NEON", "SCULPTURE"], img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400" },
    { name: "KAI_ZEN", tags: ["MINIMAL", "WEBGL", "INTERACTIVE"], img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" },
    { name: "ECHO_P", tags: ["POETRY", "SOUND", "PERFORMANCE"], img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400" },
    { name: "NOVA_X", tags: ["GENERATIVE", "AI", "CODE"], img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400" }
  ];

  return (
    <div className="pt-32 pb-24 px-6 bg-white min-h-screen relative text-black">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={() => setPage('home')}
          className="flex items-center gap-2 font-black uppercase mb-12 text-black hover:text-white hover:bg-black px-4 py-2 border-2 border-transparent hover:border-black transition-all w-fit"
        >
          <ArrowLeft size={16} /> Back to Systems
        </button>

        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <h1 className="kinetic-text text-7xl md:text-9xl leading-none uppercase">The<br/>Visionaries</h1>
          
          <div className="flex gap-4 w-full md:w-auto">
            <div className="flex-1 brutalist-border bg-white flex items-center px-4 py-2">
              <Search className="w-4 h-4 mr-2" />
              <input type="text" placeholder="FILTER BY NODE..." className="outline-none w-full font-bold text-xs uppercase" />
            </div>
            <button className="brutalist-border bg-[#c4ff00] p-2 hover:bg-black hover:text-[#c4ff00] transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {artists.map((artist, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer brutalist-border overflow-hidden bg-black flex flex-col"
            >
              <div className="relative aspect-square overflow-hidden">
                <img 
                  src={artist.img} 
                  alt={artist.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-[#c4ff00]/20 opacity-0 group-hover:opacity-100 transition-opacity mix-blend-overlay" />
              </div>
              <div className="p-6 bg-white flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-black text-xl uppercase">{artist.name}</h3>
                  <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {artist.tags.map((tag, j) => (
                    <span key={j} className="text-[10px] font-black uppercase px-2 py-1 bg-gray-100 text-gray-600">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}