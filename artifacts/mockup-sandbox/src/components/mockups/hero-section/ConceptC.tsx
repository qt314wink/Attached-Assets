import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import './_group.css';

const images = [
  "https://images.unsplash.com/photo-1549490349-8643362247b5?w=500&q=80",
  "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=500&q=80",
  "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?w=500&q=80",
  "https://images.unsplash.com/photo-1574169208507-84376144848b?w=500&q=80",
  "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=500&q=80",
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&q=80"
];

export function ConceptC() {
  return (
    <div className="h-screen bg-black overflow-hidden relative flex items-center justify-center font-sans">
      
      {/* Background Auto-scrolling Gallery */}
      <div className="absolute inset-0 opacity-40 flex gap-4 md:gap-8 -rotate-12 scale-125 z-0">
        
        {/* Column 1 - Scrolling UP */}
        <motion.div 
          className="flex flex-col gap-4 md:gap-8 w-1/3"
          animate={{ y: ["-50%", "0%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
           {[...images, ...images].map((src, i) => (
             <img key={i} src={src} className="w-full h-64 md:h-96 object-cover grayscale" alt="" />
           ))}
        </motion.div>

        {/* Column 2 - Scrolling DOWN */}
        <motion.div 
          className="flex flex-col gap-4 md:gap-8 w-1/3"
          animate={{ y: ["0%", "-50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
           {[...images.slice().reverse(), ...images.slice().reverse()].map((src, i) => (
             <img key={i} src={src} className="w-full h-80 md:h-[30rem] object-cover grayscale" alt="" />
           ))}
        </motion.div>

        {/* Column 3 - Scrolling UP */}
        <motion.div 
          className="flex flex-col gap-4 md:gap-8 w-1/3"
          animate={{ y: ["-50%", "0%"] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        >
           {[...images, ...images].map((src, i) => (
             <img key={i} src={src} className="w-full h-72 md:h-[28rem] object-cover grayscale" alt="" />
           ))}
        </motion.div>

      </div>

      {/* Foreground Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="backdrop-blur-xl bg-black/40 border border-white/10 p-8 md:p-16 rounded-3xl"
        >
          <div className="inline-block px-4 py-1 border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest text-white/70 mb-8">
            The Gallery is Open
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6 leading-tight">
            Immersion over <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-200">Information.</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 font-medium mb-12 max-w-2xl mx-auto">
            Stop reading features. Start experiencing art. A decentralized network where the work speaks for itself before the UI gets in the way.
          </p>

          <button className="px-10 py-5 bg-white text-black font-black uppercase tracking-widest text-sm rounded-full hover:bg-[#c4ff00] transition-colors shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(196,255,0,0.4)]">
            Explore the Collection
          </button>
        </motion.div>

      </div>

      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="text-[10px] font-bold uppercase tracking-widest">Scroll to descend</span>
        <ArrowDown size={16} />
      </motion.div>

    </div>
  );
}