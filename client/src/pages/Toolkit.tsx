import React from 'react';
import { motion } from 'framer-motion';
import { Download, Box, Layers, Frame, Eye, Wrench } from 'lucide-react';
import img1 from '@assets/JPEG_image_1777744002556.jpeg';
import img2 from '@assets/JPEG_image_3_1777744002559.jpeg';
import img3 from '@assets/JPEG_image_2_1777744002561.jpeg';
import img4 from '@assets/IMG_6819-removebg-preview_1777744002562.png';

export default function Toolkit({ setPage }: { setPage: (p: string) => void }) {
  const tools = [
    { title: "Neo-Brutalist UI Kit", desc: "A+B pattern component library with ripped edges", icon: <Box size={48} />, tag: "Figma", color: "bg-[#FF0055]", img: img1 },
    { title: "Content Blocks", desc: "Blog cards, forms built for high-contrast reading", icon: <Layers size={48} />, tag: "React", color: "bg-[#00E5FF]", img: img2 },
    { title: "Hero & Navigation", desc: "Kinetic text, noise textures, brutalist navs", icon: <Frame size={48} />, tag: "CSS", color: "bg-[#00FF66]", img: img3 },
    { title: "Tactile Sliders", desc: "Melting interactive sliders and buttons", icon: <Eye size={48} />, tag: "WebGL", color: "bg-[#FFFF00]", img: img4 },
  ];

  return (
    <div className="pt-32 pb-24 px-6 bg-[#FF0055] text-black min-h-screen relative overflow-hidden font-sans selection:bg-white selection:text-[#FF0055]">
      {/* Heavy Dot Matrix */}
      <div className="absolute inset-0 opacity-30 mix-blend-multiply" style={{ backgroundImage: 'radial-gradient(circle, #000 3px, transparent 4px)', backgroundSize: '24px 24px' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        
        <header className="mb-16 bg-white border-[12px] border-black p-8 shadow-[20px_20px_0_#FFFF00] relative transform rotate-1">
          <div className="absolute -top-8 -right-8 bg-black p-4 border-[6px] border-white rounded-full shadow-[8px_8px_0_#00E5FF] rotate-12">
            <Wrench size={48} className="text-[#FFFF00]" />
          </div>
          <h1 className="text-6xl md:text-9xl font-black uppercase mb-4 leading-[0.8] tracking-tighter" style={{ textShadow: '6px 6px 0 #00E5FF, 12px 12px 0 #000' }}>
            Weaponize<br/>Workflow!
          </h1>
          <div className="bg-black text-white p-4 border-[6px] border-[#00FF66] font-black uppercase text-2xl shadow-[8px_8px_0_#00FF66] inline-block transform -rotate-2 mt-4">
            Modular Component Arsenal
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {tools.map((t, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="bg-white border-[12px] border-black p-8 hover:bg-black hover:text-white transition-colors group cursor-pointer relative flex flex-col shadow-[16px_16px_0_#000] hover:shadow-none hover:translate-x-2 hover:translate-y-2"
            >
              <div className="flex justify-between items-start mb-8 relative z-10">
                <div className={`p-4 border-[6px] border-black rounded-full ${t.color} text-black shadow-[6px_6px_0_#000] transform -rotate-12 group-hover:rotate-0 transition-transform`}>
                  {t.icon}
                </div>
                <span className="text-xl font-black uppercase px-4 py-2 border-[6px] border-black bg-[#E5E5E5] text-black shadow-[6px_6px_0_#000] transform rotate-6">
                  {t.tag}
                </span>
              </div>
              <div className="relative z-10 flex-1 mb-8">
                <h3 className="text-4xl font-black uppercase mb-4 leading-none" style={{ textShadow: '2px 2px 0 #FF0055' }}>{t.title}</h3>
                <p className="font-bold text-xl uppercase border-l-[6px] border-black pl-4 group-hover:border-white">{t.desc}</p>
              </div>

              {t.img && (
                <div className="mt-auto border-[8px] border-black group-hover:border-white overflow-hidden relative z-10 bg-black shadow-[8px_8px_0_#000] group-hover:shadow-[8px_8px_0_#00E5FF]">
                  <img src={t.img} alt={t.title} className="w-full h-64 object-cover opacity-90 group-hover:opacity-100 transition-all group-hover:scale-110 duration-500 grayscale group-hover:grayscale-0" />
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30 mix-blend-overlay" />
                </div>
              )}
              
              <div className="absolute bottom-12 right-12 z-20">
                <div className="bg-[#FFFF00] text-black p-4 border-[4px] border-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:rotate-12 shadow-[4px_4px_0_#000]">
                  <Download size={40} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}