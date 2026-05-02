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

export function VariantA() {
  return (
    <div className="min-h-screen pt-32 pb-20 font-sans antialiased bg-black text-white overflow-x-hidden flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 flex flex-col items-center text-center">
        
        <motion.div 
          className="mb-8 brutalist-border bg-white px-6 py-2 text-black font-black uppercase tracking-widest text-sm inline-block rotate-[-2deg]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          v2.0 Beta Live
        </motion.div>

        <motion.h1 
          className="kinetic-text text-6xl md:text-8xl lg:text-[11rem] mb-8 text-white leading-[0.8] font-black uppercase tracking-tighter max-w-5xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          UNLEASH<br />
          <span className="text-[#c4ff00]">CREATIVITY</span>
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl max-w-2xl mx-auto mb-12 text-gray-400 font-medium leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          A decentralized sanctuary for visual artists, poets, and creative disruptors. Build, showcase, and evolve your <PrismText text="digital identity" />.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row justify-center items-center gap-6 w-full max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <button 
            className="w-full brutalist-border bg-[#c4ff00] px-8 py-5 text-black font-black uppercase text-xl hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-2 group"
          >
            Explore Works <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </button>
          <button 
            className="w-full px-8 py-5 border-4 border-white font-black text-white hover:bg-white hover:text-black transition-all uppercase text-xl"
          >
            Enter Forge
          </button>
        </motion.div>

        {/* Decorative background element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-pink-500/20 via-purple-500/20 to-indigo-500/20 rounded-full blur-[100px] -z-10 pointer-events-none" />
        
      </div>
    </div>
  );
}