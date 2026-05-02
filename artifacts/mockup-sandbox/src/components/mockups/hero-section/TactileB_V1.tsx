import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './_group.css';

export function TactileB_V1() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF7F2] overflow-hidden relative flex flex-col justify-center font-sans text-[#2A2A2A] selection:bg-[#2C3E7E] selection:text-white">
      
      {/* Refined Linen Texture */}
      <div 
        className="absolute inset-0 z-50 pointer-events-none opacity-[0.06] mix-blend-multiply"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 relative z-10 flex flex-col md:flex-row items-center justify-between gap-16">
        
        {/* Left: Structural Swatch Image */}
        <div className="w-full md:w-5/12 relative group perspective-[1000px]" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
          {/* Background framing */}
          <div className="absolute inset-0 bg-[#E8E3DA] rounded-sm transform rotate-[-3deg] translate-x-4 translate-y-4 shadow-sm" />
          
          <motion.div 
            className="relative aspect-[4/5] bg-white rounded-sm overflow-hidden border border-[#E8E3DA]"
            initial={{ rotateY: 0, rotateX: 0 }}
            animate={{ 
              rotateY: hovered ? 5 : 0, 
              rotateX: hovered ? -5 : 0,
              y: hovered ? -10 : 0
            }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            style={{
              boxShadow: hovered 
                ? '20px 30px 50px rgba(44,62,126,0.1), inset 0 0 0 1px rgba(255,255,255,0.5)' 
                : '10px 15px 30px rgba(0,0,0,0.05), inset 0 0 0 1px rgba(255,255,255,0.5)'
            }}
          >
            {/* Inner "Canvas" Stretch */}
            <div className="absolute inset-3 border-2 border-dashed border-[#2C3E7E]/20 z-20 pointer-events-none" />
            
            {/* The Image */}
            <div className="absolute inset-0 bg-[#2C3E7E] mix-blend-overlay z-10 opacity-20 group-hover:opacity-0 transition-opacity duration-700" />
            <img src="/images/hero-collage.webp" alt="Textile Art" className="w-full h-full object-cover object-center filter sepia-[0.2] group-hover:sepia-0 transition-all duration-700 scale-105 group-hover:scale-100" />
            
            {/* Woven Corner Detail */}
            <svg className="absolute top-0 right-0 w-16 h-16 pointer-events-none z-20" viewBox="0 0 100 100">
              <path d="M100,0 L0,100 M100,20 L20,100 M100,40 L40,100" stroke="#FF9F1C" strokeWidth="2" fill="none" opacity={hovered ? 1 : 0.4} className="transition-opacity duration-300" />
            </svg>
          </motion.div>

          {/* Interactive Thread */}
          <svg className="absolute -right-20 top-1/3 -translate-y-1/2 w-40 h-32 pointer-events-none z-20 overflow-visible">
             <motion.path 
               d="M0,64 Q40,64 80,64 T160,64" 
               fill="transparent" 
               stroke="#2C3E7E" 
               strokeWidth="1.5" 
               animate={{ d: hovered ? "M0,64 Q40,0 80,64 T160,64" : "M0,64 Q40,64 80,64 T160,64" }}
               transition={{ type: "spring", stiffness: 150, damping: 8 }}
             />
          </svg>
        </div>

        {/* Right: Refined Typography */}
        <div className="w-full md:w-6/12 flex flex-col items-start">
          
          <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-white border border-[#E8E3DA] rounded-full text-[10px] font-bold uppercase tracking-widest text-[#FF9F1C] mb-8 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF9F1C] animate-pulse" />
            System Status: Woven
          </div>

          <h1 className="text-[3.5rem] lg:text-[5rem] mb-6 text-[#2A2A2A] leading-[1.05]" style={{ fontFamily: "Georgia, serif" }}>
            The Textile <br/>
            <span className="italic text-[#2C3E7E] pr-4">Interface.</span>
          </h1>
          
          <p className="text-lg text-[#5A5A5A] mb-12 max-w-md leading-[1.8] font-light">
            Translating the physical qualities of weave, stitch, and drape into a digital sanctuary for creators. Crafted with intent, coded with tension.
          </p>

          <div className="flex flex-wrap items-center gap-6 w-full">
            <button className="group relative overflow-hidden px-10 py-4 bg-[#2C3E7E] rounded-none text-white font-medium tracking-wide hover:bg-[#1E2D5D] transition-colors duration-300 flex items-center gap-4">
              <span className="relative z-10">Start Weaving</span>
              <svg className="w-5 h-5 relative z-10 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
              {/* Subtle fabric ripple effect on hover */}
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            </button>

            <button className="px-6 py-4 text-[#2A2A2A] font-medium text-sm uppercase tracking-widest border-b border-transparent hover:border-[#2A2A28] transition-colors flex items-center gap-3 group">
              <span className="w-6 h-[1px] bg-[#2C3E7E] group-hover:w-10 transition-all duration-300" />
              Explore Loom
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}