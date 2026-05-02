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

export function VariantB() {
  return (
    <div className="min-h-screen font-sans antialiased bg-white text-black overflow-hidden flex flex-col lg:flex-row">
      {/* Left Content Column */}
      <div className="lg:w-1/2 min-h-[50vh] lg:min-h-screen flex items-center justify-center p-8 lg:p-20 relative z-10 border-b-4 lg:border-b-0 lg:border-r-4 border-black bg-white">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl w-full"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-black flex items-center justify-center rounded-full text-[#c4ff00]">
               <Layers size={24} />
            </div>
            <span className="font-black uppercase tracking-widest text-sm">Collective OS</span>
          </div>

          <h1 className="kinetic-text text-6xl md:text-8xl mb-6 text-black leading-[0.9] font-black uppercase tracking-tighter">
            UNLEASH<br />
            CREATIVITY
          </h1>
          
          <p className="text-xl mb-10 text-gray-600 font-medium leading-relaxed border-l-4 border-black pl-6 py-2">
            A decentralized sanctuary for visual artists, poets, and creative disruptors. Build, showcase, and evolve your <PrismText text="digital identity" />.
          </p>

          <div className="flex flex-col gap-4 w-full sm:w-fit">
            <button 
              className="brutalist-border bg-[#c4ff00] px-8 py-4 text-black font-black uppercase text-lg hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-between min-w-[250px]"
            >
              <span>Explore Works</span>
              <ArrowRight size={20} />
            </button>
            <button 
              className="px-8 py-4 bg-black text-white font-bold hover:bg-gray-800 transition-all uppercase flex items-center justify-center min-w-[250px]"
            >
              Enter Forge
            </button>
          </div>
        </motion.div>
      </div>

      {/* Right Image/Grid Column */}
      <div className="lg:w-1/2 min-h-[50vh] lg:min-h-screen bg-[#f0f0f0] p-4 lg:p-8 flex items-center justify-center relative">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
        
        <motion.div 
          className="relative w-full max-w-lg aspect-[4/5] bg-white brutalist-border p-4"
          initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
          animate={{ opacity: 1, scale: 1, rotate: -2 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="w-full h-full border-2 border-black overflow-hidden relative">
            <img 
              src="https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1000&auto=format&fit=crop" 
              className="w-full h-full object-cover grayscale mix-blend-multiply"
              alt="Art piece"
            />
            
            {/* UI overlay elements */}
            <div className="absolute top-4 right-4 brutalist-border bg-[#c4ff00] px-3 py-1 font-black text-xs uppercase">
              Live
            </div>
            
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm border-2 border-black p-4 flex items-center justify-between">
              <div>
                <div className="font-black uppercase text-sm">Active Nodes</div>
                <div className="text-gray-500 text-xs font-bold">Global Network</div>
              </div>
              <div className="text-3xl font-black">24k</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}