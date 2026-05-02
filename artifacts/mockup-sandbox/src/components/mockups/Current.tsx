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

export function Current() {
  return (
    <div className="min-h-screen pt-32 pb-20 font-sans antialiased bg-white text-black overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="kinetic-text text-7xl md:text-9xl lg:text-[10rem] mb-8 text-black leading-[0.8] font-black uppercase tracking-tighter">
              UNLEASH<br />
              <span className="text-transparent" style={{ WebkitTextStroke: '2px black' }}>CREATIVITY</span>
            </h1>
            
            <p className="text-xl max-w-lg mb-10 text-gray-600 font-medium leading-relaxed">
              A decentralized sanctuary for visual artists, poets, and creative disruptors. Build, showcase, and evolve your <PrismText text="digital identity" />.
            </p>

            <div className="flex flex-wrap gap-4">
              <button 
                className="brutalist-border bg-[#c4ff00] px-8 py-4 text-black font-black uppercase text-lg hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
              >
                Explore Works
              </button>
              <button 
                className="px-8 py-4 bg-white/40 backdrop-blur-xl border-2 border-black font-bold text-black hover:bg-black hover:text-white transition-all uppercase"
              >
                Enter Forge
              </button>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-5 relative">
          <motion.div 
            className="relative w-full aspect-square bg-white/40 backdrop-blur-xl rounded-none border-4 border-black overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            initial={{ rotate: 5, scale: 0.9 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ duration: 1.5, ease: "circOut" }}
            whileHover={{ rotate: -2, scale: 1.02 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1000&auto=format&fit=crop" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 mix-blend-multiply"
              alt="Art piece"
            />
            <div className="absolute inset-0 bg-black/5 opacity-20 pointer-events-none" />
          </motion.div>
          
          <motion.div 
            className="absolute -bottom-12 -left-12 w-48 h-48 bg-black p-4 flex items-center justify-center brutalist-border hidden md:flex"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="text-white text-center">
               <div className="text-4xl font-black text-[#c4ff00]">24k</div>
               <div className="text-xs font-bold uppercase tracking-widest">Active Nodes</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}