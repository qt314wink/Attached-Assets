import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, Zap, Layers, Cpu, ShieldCheck, Code2, BrainCircuit, Users, Palette, Waves, Network, Box, PenTool } from 'lucide-react';
import './_group.css';

// Stubbed PrismText
const PrismText = ({ text }: { text: string }) => (
  <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 font-black animate-gradient bg-[length:200%_auto] bg-300%">
    {text}
  </span>
);

export function VariantC() {
  return (
    <div className="min-h-screen pt-32 pb-20 font-sans antialiased bg-[#f5f5f5] text-black overflow-hidden relative">
      {/* Background Graphic elements */}
      <div className="absolute top-0 right-0 w-1/2 h-screen opacity-5 pointer-events-none">
         <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
            <line x1="0" y1="0" x2="100" y2="100" stroke="black" strokeWidth="0.5" />
            <line x1="100" y1="0" x2="0" y2="100" stroke="black" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="40" stroke="black" strokeWidth="0.5" fill="none" />
         </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* Navigation/Header Stub integrated into layout */}
        <div className="w-full flex justify-between items-center mb-24 border-b-2 border-black pb-6">
          <div className="font-black text-2xl uppercase tracking-tighter">Collective OS</div>
          <div className="hidden md:flex gap-8 font-bold uppercase text-sm">
             <span>Platform</span>
             <span>Network</span>
             <span>Forge</span>
          </div>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4">
          {/* Main Typography Area */}
          <div className="md:col-span-12 lg:col-span-8 flex flex-col justify-center">
            <motion.h1 
              className="kinetic-text text-6xl md:text-8xl lg:text-[9rem] mb-6 text-black leading-[0.85] font-black uppercase tracking-tighter"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              UNLEASH
              <br/>
              <span className="bg-black text-white px-4 inline-block mt-2">CREATIVITY</span>
            </motion.h1>
          </div>

          {/* Action & Stats Area */}
          <div className="md:col-span-6 lg:col-span-4 flex flex-col justify-end space-y-8 pt-8 lg:pt-0">
            <motion.p 
              className="text-xl text-gray-700 font-medium leading-snug"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              A decentralized sanctuary for visual artists, poets, and creative disruptors. Build, showcase, and evolve your <PrismText text="digital identity" />.
            </motion.p>
            
            <motion.div 
              className="flex flex-col gap-3 w-full"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <button className="brutalist-border bg-[#c4ff00] w-full py-4 text-black font-black uppercase text-lg flex items-center justify-between px-6 hover:bg-black hover:text-[#c4ff00] transition-colors">
                <span>Explore Works</span>
                <ArrowRight />
              </button>
              <button className="border-4 border-black bg-transparent w-full py-4 text-black font-black uppercase text-lg hover:bg-gray-200 transition-colors">
                Enter Forge
              </button>
            </motion.div>

            <motion.div 
              className="grid grid-cols-2 gap-4 border-t-2 border-black pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <div>
                <div className="font-black text-3xl">24k</div>
                <div className="text-xs font-bold uppercase tracking-widest text-gray-500">Active Nodes</div>
              </div>
              <div>
                <div className="font-black text-3xl">$1.2M</div>
                <div className="text-xs font-bold uppercase tracking-widest text-gray-500">Value Exchanged</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Full width image banner at bottom */}
        <motion.div 
          className="w-full h-64 md:h-96 mt-20 brutalist-border overflow-hidden relative"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
           <img 
              src="https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1000&auto=format&fit=crop" 
              className="w-full h-full object-cover grayscale mix-blend-multiply"
              alt="Art piece"
              style={{ objectPosition: "50% 30%" }}
            />
            <div className="absolute inset-0 bg-[#c4ff00] mix-blend-overlay opacity-30"></div>
        </motion.div>
      </div>
    </div>
  );
}