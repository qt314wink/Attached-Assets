import React from 'react';
import { motion } from 'framer-motion';
import './_group.css';

// Stubbed PrismText
const PrismText = ({ text }: { text: string }) => (
  <span className="text-[#00FFD1] font-mono">
    [{text}]
  </span>
);

export function VibeC() {
  return (
    <div className="min-h-screen pt-32 pb-20 font-sans antialiased bg-[#0B0D0F] text-white overflow-x-hidden relative">
      
      {/* Structural Grid Background */}
      <div className="absolute inset-0 pointer-events-none" 
           style={{ 
             backgroundImage: 'linear-gradient(to right, #1A1D24 1px, transparent 1px), linear-gradient(to bottom, #1A1D24 1px, transparent 1px)',
             backgroundSize: '4rem 4rem',
             backgroundPosition: 'center center'
           }} 
      />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        <div className="lg:col-span-7 z-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="border-l-2 border-[#00FFD1] pl-8"
          >
            <div className="mb-8 font-mono text-xs text-[#00FFD1] tracking-[0.3em] uppercase flex items-center gap-4">
              <span>SYS.INIT</span>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-[#00FFD1]/50 to-transparent"></div>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-[9rem] mb-8 text-white leading-[0.85] font-black uppercase tracking-tighter" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              UNLEASH<br />
              <span className="text-transparent" style={{ WebkitTextStroke: '1px #00FFD1' }}>CREATIVITY</span>
            </h1>
            
            <p className="text-lg max-w-lg mb-10 text-gray-400 font-mono leading-relaxed">
              &gt; A decentralized sanctuary for visual artists, poets, and creative disruptors.<br/><br/>
              &gt; Build, showcase, and evolve your <PrismText text="digital identity" />.
            </p>

            <div className="flex flex-wrap gap-4 font-mono">
              <button 
                className="bg-[#00FFD1]/10 border border-[#00FFD1] px-8 py-4 text-[#00FFD1] uppercase text-sm tracking-widest hover:bg-[#00FFD1] hover:text-[#0B0D0F] transition-colors"
              >
                Explore_Works
              </button>
              <button 
                className="px-8 py-4 border border-[#1A1D24] text-gray-400 hover:text-white hover:border-gray-600 transition-colors uppercase text-sm tracking-widest bg-[#0B0D0F]"
              >
                Enter_Forge
              </button>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-5 relative">
          <motion.div 
            className="relative w-full aspect-square bg-[#0B0D0F] border border-[#1A1D24] p-2"
            initial={{ opacity: 0, filter: "brightness(0.5)" }}
            animate={{ opacity: 1, filter: "brightness(1)" }}
            transition={{ duration: 1 }}
          >
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00FFD1]" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00FFD1]" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00FFD1]" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00FFD1]" />

            <div className="w-full h-full overflow-hidden bg-[#1A1D24] relative group">
              <img 
                src="https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1000&auto=format&fit=crop" 
                className="w-full h-full object-cover grayscale contrast-150 mix-blend-luminosity opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500"
                alt="Art piece"
              />
              {/* Scanline effect */}
              <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none" />
            </div>
          </motion.div>
          
          <motion.div 
            className="absolute -bottom-8 -left-12 bg-[#0B0D0F] border border-[#1A1D24] p-6 hidden md:block"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="font-mono text-right">
               <div className="text-3xl font-black text-white">24,000</div>
               <div className="text-[10px] uppercase tracking-widest text-[#00FFD1] mt-1">Active_Nodes</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}