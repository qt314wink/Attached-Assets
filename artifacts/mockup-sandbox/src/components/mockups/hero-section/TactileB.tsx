import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './_group.css';

export function TactileB() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F0E8] overflow-hidden relative flex flex-col justify-center font-sans text-[#2C2C2C]">
      
      {/* Linen Noise Texture Overlay */}
      <div 
        className="absolute inset-0 z-50 pointer-events-none opacity-[0.08] mix-blend-multiply"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      <div className="w-full max-w-6xl mx-auto px-8 relative z-10 flex flex-col md:flex-row items-center gap-12">
        
        {/* Left: Swatch Image */}
        <div className="w-full md:w-1/2 relative group" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
          <motion.div 
            className="relative aspect-square rounded-[2rem] overflow-hidden border-2 border-dashed border-[#2C3E7E]/30 bg-white"
            initial={{ y: 0 }}
            animate={{ y: hovered ? -8 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{
              boxShadow: hovered 
                ? '0 15px 35px rgba(44,62,126,0.15), inset 0 2px 10px rgba(255,255,255,0.8)' 
                : '0 8px 25px rgba(0,0,0,0.08), inset 0 2px 10px rgba(255,255,255,0.8)'
            }}
          >
            {/* The Image as a "dyed fabric" */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#2C3E7E] via-transparent to-[#FF9F1C] mix-blend-color z-10 opacity-40 group-hover:opacity-20 transition-opacity duration-500" />
            <img src="/images/hero-tactile.webp" alt="Textile Art" className="w-full h-full object-cover object-center filter contrast-125 saturate-50" />
            
            {/* Stitching detail */}
            <div className="absolute inset-4 border border-dashed border-white/50 rounded-[1.2rem] pointer-events-none" />
          </motion.div>

          {/* SVG Thread pulling effect */}
          <svg className="absolute -right-12 top-1/2 -translate-y-1/2 w-24 h-24 pointer-events-none z-20 overflow-visible">
             <motion.path 
               d="M0,48 C40,48 60,48 96,48" 
               fill="transparent" 
               stroke="#FF9F1C" 
               strokeWidth="2" 
               strokeDasharray="4 4"
               animate={{ d: hovered ? "M0,48 C40,20 60,76 96,48" : "M0,48 C40,48 60,48 96,48" }}
               transition={{ type: "spring", stiffness: 200, damping: 10 }}
             />
          </svg>
        </div>

        {/* Right: Typography */}
        <div className="w-full md:w-1/2 pl-0 md:pl-12">
          {/* Yarn Path Decoration */}
          <svg className="w-32 h-12 mb-6" viewBox="0 0 100 40">
            <motion.path 
              d="M0,20 Q25,0 50,20 T100,20" 
              fill="transparent" 
              stroke="#0A8C6B" 
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </svg>

          <h1 className="text-5xl md:text-7xl mb-6 text-[#2C2C2C] leading-tight" style={{ fontFamily: "Georgia, serif", letterSpacing: "-0.02em" }}>
            The Textile <br/>
            <span className="italic text-[#2C3E7E]">Interface.</span>
          </h1>
          
          <p className="text-lg text-[#6B6B6B] mb-10 max-w-md leading-relaxed font-light">
            Translating the physical qualities of weave, stitch, and drape into a digital sanctuary for creators. Crafted with intent, coded with tension.
          </p>

          <div className="flex items-center gap-6">
            <button className="relative overflow-hidden px-8 py-4 bg-[#F5F0E8] border-2 border-dashed border-[#2C3E7E] rounded-full text-[#2C3E7E] font-medium tracking-wide hover:bg-[#2C3E7E] hover:text-white transition-colors duration-300 group shadow-[0_4px_10px_rgba(0,0,0,0.05)]">
              <span className="relative z-10">Start Weaving</span>
              {/* Thread fill animation */}
              <div className="absolute inset-0 bg-[#2C3E7E] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </button>

            <div className="flex items-center gap-3 text-sm font-medium text-[#FF9F1C] cursor-pointer group">
              <div className="w-8 h-8 rounded-full border border-[#FF9F1C] flex items-center justify-center group-hover:scale-110 transition-transform">
                <div className="w-2 h-2 bg-[#FF9F1C] rounded-full" />
              </div>
              Explore Loom
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}