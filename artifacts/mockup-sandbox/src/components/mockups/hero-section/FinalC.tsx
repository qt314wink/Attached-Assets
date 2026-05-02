import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, Database, Workflow, Terminal } from 'lucide-react';
import './_group.css';

export function FinalC() {
  const [stage, setStage] = useState<'dormant' | 'awakening' | 'active'>('dormant');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (stage === 'active') return;
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ 
      x: e.clientX - rect.left, 
      y: e.clientY - rect.top 
    });
  };

  const handleWake = () => {
    if (stage !== 'dormant') return;
    setStage('awakening');
    setTimeout(() => setStage('active'), 2500);
  };

  return (
    <div 
      className={`min-h-screen bg-[#030305] text-slate-300 font-mono overflow-hidden flex flex-col relative transition-colors duration-1000 ${stage === 'dormant' ? 'cursor-pointer' : ''}`}
      onMouseMove={handleMouseMove}
      onClick={handleWake}
    >
      {/* SHYTECH SPOTLIGHT (Only visible in dormant/awakening) */}
      <AnimatePresence>
        {(stage === 'dormant' || stage === 'awakening') && (
          <motion.div 
            className="absolute inset-0 pointer-events-none mix-blend-screen z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: stage === 'dormant' ? 0.3 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: stage === 'dormant' ? 0 : 2 }}
            style={{
              background: `radial-gradient(circle 400px at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.08), transparent 100%)`
            }}
          />
        )}
      </AnimatePresence>

      {/* DORMANT STATE CONTENT */}
      <AnimatePresence>
        {stage === 'dormant' && (
          <motion.div 
            className="absolute inset-0 flex items-center justify-center z-10"
            exit={{ opacity: 0, filter: 'blur(20px)', scale: 1.1 }}
            transition={{ duration: 1.5 }}
          >
            <div className="text-center opacity-30">
              <Fingerprint size={48} className="mx-auto mb-6 text-slate-600" />
              <p className="text-[10px] tracking-[0.5em] uppercase text-slate-500">Provide Intent</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ACTIVE STATE CONTENT (The Latent Engine) */}
      <AnimatePresence>
        {stage === 'active' && (
          <motion.div 
            className="absolute inset-0 flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            {/* Header */}
            <header className="flex justify-between items-center p-8 border-b border-slate-800/50 bg-[#030305]/80 backdrop-blur-md z-30">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-xs uppercase tracking-widest text-slate-400">System Awake // Latent Space Mapped</span>
              </div>
              <div className="flex gap-6 text-xs text-slate-500 uppercase tracking-widest">
                <span className="hover:text-white cursor-pointer transition-colors">Documentation</span>
                <span className="hover:text-white cursor-pointer transition-colors">API Status</span>
              </div>
            </header>

            <div className="flex-1 flex flex-col md:flex-row relative z-20">
              
              {/* Left Content */}
              <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-gradient-to-r from-[#030305] to-transparent">
                <motion.div
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 rounded text-indigo-400 text-xs mb-8 uppercase tracking-widest">
                    <Workflow size={14} /> Collective OS Engine
                  </div>
                  
                  <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6 leading-tight font-sans">
                    Command the <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-fuchsia-400">
                      Creative Manifold.
                    </span>
                  </h1>
                  
                  <p className="text-slate-400 max-w-md leading-relaxed mb-10 font-sans font-light">
                    A decentralized environment for artists. Train LoRAs, explore latent spaces, and synthesize multi-modal art with hyperellipsoidal precision.
                  </p>

                  <div className="flex gap-4">
                    <button className="px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-indigo-400 hover:text-white transition-all rounded shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                      Initialize Forge
                    </button>
                    <button className="px-8 py-4 border border-slate-700 hover:border-slate-500 text-slate-300 font-bold uppercase tracking-widest text-xs transition-all rounded flex items-center gap-2">
                      <Terminal size={14} /> View Docs
                    </button>
                  </div>
                </motion.div>
              </div>

              {/* Right Visualization (The Node Network) */}
              <div className="w-full md:w-1/2 relative flex items-center justify-center">
                 {/* Decorative Node Ring */}
                 <div className="relative w-96 h-96">
                    {/* Center Core */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-indigo-500/20 border border-indigo-500/50 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(99,102,241,0.2)] backdrop-blur-sm z-10">
                      <Database className="text-indigo-400" size={32} />
                    </div>

                    {/* Orbiting Nodes */}
                    {[...Array(6)].map((_, i) => (
                      <motion.div 
                        key={i}
                        className="absolute top-1/2 left-1/2 w-3 h-3 bg-fuchsia-400 rounded-full shadow-[0_0_15px_#e879f9]"
                        initial={{ x: '-50%', y: '-50%', rotate: i * 60 }}
                        animate={{ 
                          rotate: 360 + (i * 60),
                          translateX: ['-50%', '-50%'],
                          translateY: ['-200px', '-200px']
                        }}
                        style={{ originX: 0.5, originY: 0.5 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      >
                         <div className="absolute top-4 left-4 text-[8px] text-fuchsia-400/50 uppercase whitespace-nowrap" style={{ transform: `rotate(${- (360 + (i * 60))}deg)` }}>
                           Node_{i}
                         </div>
                      </motion.div>
                    ))}

                    {/* Connecting Lines */}
                    <svg className="absolute inset-0 w-full h-full animate-spin-slow pointer-events-none opacity-20">
                      <circle cx="192" cy="192" r="150" fill="none" stroke="#818cf8" strokeWidth="1" strokeDasharray="4 8" />
                      <circle cx="192" cy="192" r="200" fill="none" stroke="#e879f9" strokeWidth="0.5" />
                    </svg>
                 </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}