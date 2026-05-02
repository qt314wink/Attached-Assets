import React from 'react';
import { motion } from 'framer-motion';
import { Download, Box, Layers, Frame, Type, Cpu, Eye } from 'lucide-react';
import img1 from '@assets/JPEG_image_1777744002556.jpeg';
import img2 from '@assets/JPEG_image_3_1777744002559.jpeg';
import img3 from '@assets/JPEG_image_2_1777744002561.jpeg';
import img4 from '@assets/IMG_6819-removebg-preview_1777744002562.png';

export default function Toolkit({ setPage }: { setPage: (p: string) => void }) {
  const tools = [
    { title: "Neo-Brutalist UI Kit", desc: "A+B pattern component library with ripped edges and neon highlights", icon: <Box size={48} />, tag: "Figma", img: img1 },
    { title: "Content Blocks", desc: "Blog cards, forms, and accordions built for high-contrast reading", icon: <Layers size={48} />, tag: "React", img: img2 },
    { title: "Hero & Navigation", desc: "Kinetic text, noise textures, and brutalist nav structures", icon: <Frame size={48} />, tag: "CSS", img: img3 },
    { title: "Tactile Sliders", desc: "Melting/dripping interactive sliders and buttons", icon: <Eye size={48} />, tag: "WebGL", img: img4 },
  ];

  return (
    <div className="pt-32 pb-24 px-6 bg-[#0f172a] text-white min-h-screen relative overflow-hidden">
      <div className="scanline opacity-20" />
      <div className="max-w-7xl mx-auto relative z-10">
        <h1 className="kinetic-text text-7xl md:text-9xl mb-4 uppercase text-[#ff6b6b]">
          Weaponize<br/>Your Workflow
        </h1>
        <p className="text-xl font-bold uppercase tracking-widest mb-16 opacity-50 border-b-2 border-[#ff6b6b] pb-8 text-[#22d3ee]">
          Modular Component Arsenal
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tools.map((t, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.02 }}
              className="border-4 border-white p-8 hover:bg-white hover:text-black hover:border-white transition-colors group cursor-pointer relative overflow-hidden flex flex-col"
            >
              <div className="flex justify-between items-start mb-8 relative z-10">
                <div className="p-4 border-2 border-white group-hover:border-black rounded-full bg-[#0f172a] group-hover:bg-white transition-colors">
                  {t.icon}
                </div>
                <span className="text-xs font-black uppercase px-3 py-1 border-2 border-white group-hover:border-black bg-[#0f172a] group-hover:bg-white transition-colors">
                  {t.tag}
                </span>
              </div>
              <div className="relative z-10 flex-1">
                <h3 className="text-3xl font-black uppercase mb-2">{t.title}</h3>
                <p className="font-bold opacity-70 group-hover:opacity-100">{t.desc}</p>
              </div>

              {t.img && (
                <div className="mt-8 border-2 border-white group-hover:border-black overflow-hidden relative z-10 bg-black">
                  <img src={t.img} alt={t.title} className="w-full h-56 object-cover opacity-80 group-hover:opacity-100 transition-opacity group-hover:scale-105 duration-500 mix-blend-screen" />
                </div>
              )}
              
              <div className="mt-8 flex justify-end relative z-10">
                <Download size={32} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}