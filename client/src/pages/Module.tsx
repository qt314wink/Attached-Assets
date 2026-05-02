import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Cpu, Activity, Database, Lock } from 'lucide-react';

export default function Module({ setPage }: { setPage: (p: string) => void }) {
  return (
    <div className="pt-32 pb-24 px-6 bg-white min-h-screen relative">
      <div className="pixel-grid absolute inset-0 opacity-50 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <button 
          onClick={() => setPage('home')}
          className="flex items-center gap-2 font-black uppercase mb-12 hover:text-[#c4ff00] hover:bg-black px-4 py-2 border-2 border-transparent hover:border-black transition-all w-fit"
        >
          <ArrowLeft size={16} /> Back to Systems
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h1 className="kinetic-text text-6xl md:text-8xl uppercase leading-none mb-6">
              NEURAL<br/>LINK
            </h1>
            <div className="flex gap-4 mb-8">
              <span className="bg-black text-[#c4ff00] px-3 py-1 text-[10px] font-black uppercase">v4.2.1 Active</span>
              <span className="bg-gray-200 text-black px-3 py-1 text-[10px] font-black uppercase flex items-center gap-1"><Lock size={10} /> Secure</span>
            </div>
            
            <p className="text-lg font-bold leading-relaxed mb-8">
              The Neural Link module coordinates real-time generation between the Forge Interface and our decentralized GPU clusters. It handles prompt engineering parsing, tensor allocation, and style extraction using the 40-variable schema.
            </p>

            <div className="space-y-4">
              {[
                { label: "Throughput", val: "8.4 TF/s", icon: <Activity size={16}/> },
                { label: "Active Nodes", val: "14,204", icon: <Database size={16}/> },
                { label: "Model Sync", val: "FLUX.1-dev", icon: <Cpu size={16}/> }
              ].map((stat, i) => (
                <div key={i} className="flex justify-between items-center p-4 border-2 border-black font-black uppercase">
                  <span className="flex items-center gap-3">{stat.icon} {stat.label}</span>
                  <span className="text-[#c4ff00] bg-black px-2 py-1 text-xs">{stat.val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative aspect-square brutalist-border bg-black p-8 text-[#c4ff00] font-mono text-xs overflow-hidden flex flex-col">
            <h3 className="font-black uppercase text-white mb-4 border-b border-white/20 pb-2">Terminal Output</h3>
            <div className="flex-1 overflow-hidden relative">
              <motion.div 
                animate={{ y: [0, -200] }} 
                transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                className="space-y-2 opacity-80"
              >
                {Array.from({length: 20}).map((_, i) => (
                  <div key={i}>
                    <span className="text-gray-500">[{new Date().toISOString().split('T')[1].slice(0,8)}]</span> INGEST_TENSOR_BATCH_{Math.random().toString(36).substring(7).toUpperCase()}: OK
                  </div>
                ))}
              </motion.div>
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
            </div>
            <div className="mt-4 pt-4 border-t border-white/20 flex items-center gap-2">
              <div className="w-3 h-3 bg-[#c4ff00] rounded-full animate-pulse" />
              SYSTEM_READY
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}