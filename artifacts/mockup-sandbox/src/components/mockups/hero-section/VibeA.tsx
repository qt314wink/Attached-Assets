import React from 'react';
import { motion } from 'framer-motion';
import './_group.css';

// Stubbed PrismText
const PrismText = ({ text }: { text: string }) => (
  <span className="text-[#E85D04] font-black italic">
    {text}
  </span>
);

export function VibeA() {
  return (
    <div className="min-h-screen pt-32 pb-20 font-sans antialiased bg-[#F9F6F0] text-[#2C2A25] overflow-x-hidden relative">
      {/* Organic texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        <div className="lg:col-span-7 z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="mb-6 flex items-center gap-3">
               <div className="h-[2px] w-12 bg-[#E85D04]"></div>
               <span className="uppercase tracking-[0.2em] text-xs font-bold text-[#E85D04]">Collective OS</span>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-[9rem] mb-8 text-[#2C2A25] leading-[0.85] font-black tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              UNLEASH<br />
              <span className="text-[#F9F6F0]" style={{ WebkitTextStroke: '2px #2C2A25' }}>CREATIVITY</span>
            </h1>
            
            <p className="text-xl max-w-lg mb-12 text-[#5A564C] font-medium leading-relaxed">
              A decentralized sanctuary for visual artists, poets, and creative disruptors. Build, showcase, and evolve your <PrismText text="digital identity" />.
            </p>

            <div className="flex flex-wrap gap-4">
              <button 
                className="bg-[#E85D04] px-8 py-4 rounded-full text-[#F9F6F0] font-bold uppercase text-sm tracking-wider hover:bg-[#2C2A25] hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(232,93,4,0.3)] transition-all duration-300"
              >
                Explore Works
              </button>
              <button 
                className="px-8 py-4 rounded-full border-2 border-[#2C2A25] font-bold text-[#2C2A25] hover:bg-[#2C2A25] hover:text-[#F9F6F0] transition-all uppercase text-sm tracking-wider"
              >
                Enter Forge
              </button>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-5 relative">
          <motion.div 
            className="relative w-full aspect-square rounded-[3rem] border border-[#2C2A25]/10 overflow-hidden shadow-[0_20px_40px_rgba(44,42,37,0.08)] bg-white"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1000&auto=format&fit=crop" 
              className="w-full h-full object-cover sepia-[0.3] contrast-125 saturate-110 mix-blend-multiply"
              alt="Art piece"
            />
            {/* Warm overlay */}
            <div className="absolute inset-0 bg-[#E85D04] mix-blend-overlay opacity-20 pointer-events-none" />
          </motion.div>
          
          <motion.div 
            className="absolute -bottom-8 -left-8 w-40 h-40 bg-[#2C2A25] rounded-full p-4 flex items-center justify-center shadow-xl hidden md:flex"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 20 }}
          >
            <div className="text-[#F9F6F0] text-center">
               <div className="text-4xl font-black text-[#E85D04]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>24k</div>
               <div className="text-[10px] font-bold uppercase tracking-widest mt-1 opacity-80">Active Nodes</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}