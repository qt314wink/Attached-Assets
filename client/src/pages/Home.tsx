import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, Zap, Layers, Cpu, ShieldCheck } from 'lucide-react';
import { PrismText } from '@/components/Toolkit';

export default function Home({ setPage }: { setPage: (p: string) => void }) {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="kinetic-text text-7xl md:text-9xl lg:text-[10rem] mb-8 text-black leading-[0.8]">
              UNLEASH<br />
              <span className="text-transparent" style={{ WebkitTextStroke: '2px black' }}>CREATIVITY</span>
            </h1>
            
            <p className="text-xl max-w-lg mb-10 text-gray-600 font-medium leading-relaxed">
              A decentralized sanctuary for visual artists, poets, and creative disruptors. Build, showcase, and evolve your <PrismText text="digital identity" />.
            </p>

            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => setPage('systems')}
                className="brutalist-border bg-[#c4ff00] px-8 py-4 text-black font-black uppercase text-lg hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
              >
                Explore Works
              </button>
              <button 
                onClick={() => setPage('forge')}
                className="px-8 py-4 glass-card rounded-none border-2 border-black font-bold text-black hover:bg-black hover:text-white transition-all uppercase"
              >
                Enter Forge
              </button>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-5 relative">
          <motion.div 
            className="relative w-full aspect-square glass-card rounded-none border-4 border-black overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            initial={{ rotate: 5, scale: 0.9 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ duration: 1.5, ease: "circOut" }}
            whileHover={{ rotate: -2, scale: 1.02 }}
          >
            <img 
              src="/hero-art.png" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 mix-blend-multiply"
              alt="Art piece"
            />
            <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />
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

      <section className="mt-40 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16 border-b-4 border-black pb-8">
            <h2 className="kinetic-text text-5xl md:text-7xl">Featured<br/>Systems</h2>
            <div className="text-right hidden md:block">
              <p className="font-bold text-gray-400">01 / 02 / 03</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
               { title: "Governance Engine", icon: <ShieldCheck size={32}/>, color: "bg-purple-200" },
               { title: "Prompt Matrix", icon: <Layers size={32}/>, color: "bg-[#c4ff00]" },
               { title: "Neural Link", icon: <Cpu size={32}/>, color: "bg-blue-200" }
             ].map((item, idx) => (
               <motion.div 
                 key={idx}
                 className={`group relative p-10 min-h-[350px] flex flex-col justify-between border-4 border-black transition-all hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${item.color}`}
                 whileHover={{ scale: 1.02 }}
               >
                 <div>
                   <div className="mb-6 p-4 bg-black text-white inline-block rounded-full">
                     {item.icon}
                   </div>
                   <h3 className="text-4xl font-black uppercase leading-none text-black">
                     {item.title}
                   </h3>
                 </div>
                 
                 <button 
                   onClick={() => setPage('module')}
                   className="flex items-center gap-2 font-bold text-sm uppercase group-hover:gap-4 transition-all"
                 >
                   Access Module <ArrowRight className="w-4 h-4" />
                 </button>
               </motion.div>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
}
