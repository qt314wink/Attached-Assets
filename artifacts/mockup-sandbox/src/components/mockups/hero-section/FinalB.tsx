import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './_group.css';

export function FinalB() {
  const [tension, setTension] = useState(0);

  return (
    <div className="min-h-screen bg-[#F5F0E8] overflow-hidden relative flex flex-col justify-center font-sans text-[#2C2C2C]">
      
      {/* Global Linen Texture */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.12] mix-blend-multiply"
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

      {/* Dynamic Background Dye Bleed */}
      <motion.div 
        className="absolute -top-[20%] -right-[10%] w-[70vw] h-[70vw] rounded-full mix-blend-multiply filter blur-[100px] opacity-30 z-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #2C3E7E 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute -bottom-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full mix-blend-multiply filter blur-[80px] opacity-20 z-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #FF9F1C 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="w-full max-w-7xl mx-auto px-8 relative z-10 flex flex-col items-center text-center">
        
        {/* Animated Loom Thread SVG */}
        <div 
          className="w-full max-w-2xl h-32 relative mb-8 cursor-crosshair"
          onMouseMove={(e) => {
             const rect = e.currentTarget.getBoundingClientRect();
             const y = e.clientY - rect.top;
             setTension(Math.max(0, Math.min(1, Math.abs(y - rect.height/2) / (rect.height/2))));
          }}
          onMouseLeave={() => setTension(0)}
        >
          <svg className="w-full h-full overflow-visible pointer-events-none" preserveAspectRatio="none">
            {/* Multiple thread lines responding to tension */}
            {[0, 1, 2].map((i) => (
              <motion.path 
                key={i}
                d={`M0,64 Q${300 + (tension * 200 * (i%2===0?1:-1))},${64 + (tension * 80 * (i===1?-1:1))} 1280,64`}
                fill="none"
                stroke={i === 1 ? "#2C3E7E" : "#FF9F1C"}
                strokeWidth={i === 1 ? 2 : 1}
                strokeDasharray={i === 0 ? "4 4" : "none"}
                opacity={0.5 + (i * 0.2)}
                animate={{ pathLength: 1 }}
                initial={{ pathLength: 0 }}
                transition={{ duration: 1.5, delay: i * 0.2, ease: "circOut" }}
              />
            ))}
          </svg>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2C3E7E]/20 bg-white/50 backdrop-blur-md mb-8 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-[#0A8C6B] animate-pulse" />
            <span className="text-xs font-medium tracking-widest uppercase text-[#2C3E7E]">Digital Loom Active</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-medium mb-6 text-[#2C2C2C] leading-[0.95]" style={{ fontFamily: "Georgia, serif", letterSpacing: "-0.03em" }}>
            The Textile <br/>
            <span className="italic text-[#2C3E7E]">Interface.</span>
          </h1>
          
          <p className="text-xl text-[#6B6B6B] mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            A sanctuary where digital creation feels like physical craft. Woven with intention, stitched with code, draped in soft light.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="group relative overflow-hidden px-10 py-5 bg-white border-[3px] border-dashed border-[#2C3E7E] rounded-full text-[#2C3E7E] font-medium tracking-wider hover:text-white transition-colors duration-300 shadow-[0_8px_20px_rgba(44,62,126,0.15)] hover:shadow-[0_12px_25px_rgba(44,62,126,0.25)] active:scale-95 active:shadow-inner">
              <span className="relative z-10">Start Weaving</span>
              <div className="absolute inset-0 bg-[#2C3E7E] origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-out" />
            </button>

            <button className="group px-8 py-5 text-[#FF9F1C] font-medium tracking-wider border-b-2 border-transparent hover:border-[#FF9F1C] transition-all flex items-center gap-2">
              <span className="group-hover:-translate-y-1 transition-transform">Explore Pattern Library</span>
            </button>
          </div>
        </motion.div>

        {/* Decorative Swatch Cards at the bottom */}
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-full max-w-4xl flex justify-center gap-8 opacity-80 pointer-events-none">
           {[
             { color: '#2C3E7E', rotate: -15, y: 20 },
             { color: '#FF9F1C', rotate: -5, y: -10 },
             { color: '#0A8C6B', rotate: 10, y: 10 }
           ].map((swatch, i) => (
             <motion.div 
               key={i}
               className="w-48 h-64 rounded-2xl border-2 border-dashed border-white/50 shadow-[0_10px_30px_rgba(0,0,0,0.1)] relative overflow-hidden"
               style={{ rotate: swatch.rotate, y: swatch.y, backgroundColor: swatch.color }}
               initial={{ opacity: 0, y: 100 }}
               animate={{ opacity: 1, y: swatch.y }}
               transition={{ delay: 1 + (i * 0.2), type: "spring" }}
             >
                <div className="absolute inset-0 bg-white/20 mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
             </motion.div>
           ))}
        </div>

      </div>
    </div>
  );
}