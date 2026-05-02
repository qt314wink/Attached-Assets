import React from 'react';
import { motion } from 'framer-motion';
import './_group.css';

// Stubbed PrismText
const PrismText = ({ text }: { text: string }) => (
  <span className="text-blue-500 font-semibold">
    {text}
  </span>
);

export function VibeB() {
  return (
    <div className="min-h-screen pt-32 pb-20 font-sans antialiased bg-gradient-to-br from-slate-50 via-white to-blue-50/50 text-slate-800 overflow-x-hidden relative">
      
      {/* Ambient background glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-200/40 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-5%] w-[30%] h-[50%] bg-purple-200/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        <div className="lg:col-span-7 z-10">
          <motion.div 
            initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 border border-white/80 shadow-sm backdrop-blur-md mb-8">
               <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
               <span className="text-xs font-medium text-slate-500 tracking-wide">Collective OS is Live</span>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-[8rem] mb-6 text-slate-900 leading-[0.9] font-medium tracking-tight">
              Unleash
              <br />
              <span className="text-slate-300 font-light italic">Creativity.</span>
            </h1>
            
            <p className="text-xl max-w-lg mb-10 text-slate-500 font-light leading-relaxed">
              A decentralized sanctuary for visual artists, poets, and creative disruptors. Build, showcase, and evolve your <PrismText text="digital identity" />.
            </p>

            <div className="flex flex-wrap gap-4">
              <button 
                className="bg-white/80 backdrop-blur-lg border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] px-8 py-4 rounded-2xl text-slate-800 font-medium hover:bg-white hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-all duration-300"
              >
                Explore Works
              </button>
              <button 
                className="px-8 py-4 rounded-2xl text-slate-500 font-medium hover:text-slate-900 hover:bg-slate-100/50 transition-all"
              >
                Enter Forge &rarr;
              </button>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-5 relative">
          <motion.div 
            className="relative w-full aspect-square rounded-[2rem] border border-white/60 overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] bg-white/40 backdrop-blur-xl p-2"
            initial={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          >
            <div className="w-full h-full rounded-[1.5rem] overflow-hidden">
               <img 
                 src="https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1000&auto=format&fit=crop" 
                 className="w-full h-full object-cover opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-1000"
                 alt="Art piece"
               />
            </div>
          </motion.div>
          
          <motion.div 
            className="absolute -bottom-6 -left-6 w-48 h-32 bg-white/70 backdrop-blur-2xl border border-white/80 rounded-2xl p-6 flex flex-col justify-center shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] hidden md:flex"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <div className="text-4xl font-light text-blue-500">24k</div>
            <div className="text-xs font-medium text-slate-400 tracking-wide mt-1">Active Nodes</div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}