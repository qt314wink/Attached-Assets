import React from 'react';
import { motion } from 'framer-motion';
import { Download, Box, Layers, Frame, Type, Cpu } from 'lucide-react';

export default function Toolkit({ setPage }: { setPage: (p: string) => void }) {
  const tools = [
    { title: "Crunchy UI Kit", desc: "Neo-brutalist component library for Figma", icon: <Box size={48} />, tag: "Figma" },
    { title: "Glitch Shaders", desc: "WebGL shaders for web distortion", icon: <Layers size={48} />, tag: "Code" },
    { title: "Neuro-Fonts", desc: "Variable fonts driven by AI", icon: <Type size={48} />, tag: "Typography" },
    { title: "Forge API SDK", desc: "Direct access to the synthesis engine", icon: <Cpu size={48} />, tag: "SDK" },
  ];

  return (
    <div className="pt-32 pb-24 px-6 bg-black text-white min-h-screen relative overflow-hidden">
      <div className="scanline opacity-20" />
      <div className="max-w-7xl mx-auto relative z-10">
        <h1 className="kinetic-text text-7xl md:text-9xl mb-4 uppercase text-[#c4ff00]">
          Toolkit
        </h1>
        <p className="text-xl font-bold uppercase tracking-widest mb-16 opacity-50 border-b-2 border-[#c4ff00] pb-8">
          Open Source // Creative Arsenal
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tools.map((t, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.02 }}
              className="border-4 border-white p-8 hover:bg-[#c4ff00] hover:text-black hover:border-[#c4ff00] transition-colors group cursor-pointer"
            >
              <div className="flex justify-between items-start mb-12">
                <div className="p-4 border-2 border-white group-hover:border-black rounded-full">
                  {t.icon}
                </div>
                <span className="text-xs font-black uppercase px-3 py-1 border-2 border-white group-hover:border-black">
                  {t.tag}
                </span>
              </div>
              <h3 className="text-3xl font-black uppercase mb-2">{t.title}</h3>
              <p className="font-bold opacity-70">{t.desc}</p>
              
              <div className="mt-8 flex justify-end">
                <Download size={32} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}