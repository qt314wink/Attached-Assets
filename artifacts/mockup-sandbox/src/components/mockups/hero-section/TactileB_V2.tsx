import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './_group.css';

export function TactileB_V2() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="min-h-screen bg-[#FDFCFB] overflow-hidden relative flex flex-col justify-center font-sans text-[#1A1A1A]">
      
      {/* Soft Silk Texture Overlay */}
      <div 
        className="absolute inset-0 z-50 pointer-events-none opacity-[0.04] mix-blend-color-burn"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      {/* Gentle Gradient Dye Background */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#F2EBE1] to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-[#E8F0EE] to-transparent" />
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-8 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-20">
        
        {/* Left: Soft Organic Swatch */}
        <div className="w-full lg:w-1/2 relative flex justify-center" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
          
          <motion.div 
            className="relative w-full max-w-md aspect-[4/5] overflow-hidden bg-[#F5F2EC]"
            animate={{ 
              borderRadius: hovered ? '30% 70% 70% 30% / 30% 30% 70% 70%' : '50% 50% 50% 50% / 50% 50% 50% 50%',
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{
              boxShadow: '0 20px 40px rgba(0,0,0,0.03), inset 0 2px 20px rgba(255,255,255,1)'
            }}
          >
            <motion.img 
              src="/images/hero-collage.webp" 
              alt="Textile Soft" 
              className="w-full h-full object-cover object-center filter saturate-[0.8] contrast-110"
              animate={{ scale: hovered ? 1.05 : 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
            {/* Color Wash Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#3D4C53]/30 to-transparent mix-blend-multiply" />
          </motion.div>

          {/* Drifting Background Shape */}
          <motion.div 
            className="absolute -z-10 w-full max-w-md aspect-square bg-[#E6AE7C]/20 mix-blend-multiply filter blur-2xl"
            animate={{ 
              x: hovered ? 30 : -20,
              y: hovered ? -20 : 30,
              scale: hovered ? 1.1 : 0.9 
            }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />

          {/* Delicate Thread overlay */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" viewBox="0 0 100 100" preserveAspectRatio="none">
             <motion.path 
               d="M-10,50 Q40,30 50,50 T110,50" 
               fill="transparent" 
               stroke="#3D4C53" 
               strokeWidth="0.2" 
               animate={{ d: hovered ? "M-10,50 Q40,70 50,50 T110,50" : "M-10,50 Q40,30 50,50 T110,50" }}
               transition={{ duration: 2, ease: "easeInOut" }}
             />
          </svg>
        </div>

        {/* Right: Elegant Editorial Typography */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
          
          <p className="text-[#A39B8E] font-serif italic text-xl mb-4">01. Genesis Collection</p>

          <h1 className="text-[4rem] md:text-[6rem] mb-6 text-[#1A1A1A] leading-[0.9]" style={{ fontFamily: "Georgia, serif" }}>
            The Textile <br/>
            <span className="text-[#3D4C53] opacity-90">Interface.</span>
          </h1>
          
          <p className="text-lg text-[#737373] mb-12 max-w-md leading-loose font-light">
            Translating the physical qualities of weave, stitch, and drape into a digital sanctuary for creators. Elegant, fluid, and profoundly tactile.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-8">
            <button className="group relative px-12 py-5 bg-[#1A1A1A] rounded-full text-white font-medium tracking-widest text-sm uppercase overflow-hidden shadow-[0_10px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.15)] transition-shadow">
              <span className="relative z-10">Start Weaving</span>
              <div className="absolute inset-0 bg-[#3D4C53] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-in-out" />
            </button>

            <button className="text-[#A39B8E] font-medium tracking-widest text-sm uppercase hover:text-[#1A1A1A] transition-colors relative group">
              Explore Loom
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#1A1A1A] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}