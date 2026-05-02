import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './_group.css';

export function Gen2C() {
  const [woken, setWoken] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (woken) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ 
      x: e.clientX - rect.left, 
      y: e.clientY - rect.top 
    });
  };

  if (!woken) {
    // The Dormant State (Shytech principle)
    return (
      <div 
        className="min-h-screen bg-[#0a0a0a] cursor-pointer flex items-center justify-center relative overflow-hidden"
        onMouseMove={handleMouseMove}
        onClick={() => setWoken(true)}
      >
        {/* Subtle spotlight following mouse */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-1000"
          style={{
            background: `radial-gradient(circle 300px at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.05), transparent 100%)`
          }}
        />
        
        {/* Barely visible hint */}
        <p className="text-[#333] font-mono text-sm tracking-[0.5em] uppercase select-none opacity-50 hover:opacity-100 transition-opacity duration-700">
          Click to initialize
        </p>
      </div>
    );
  }

  // The Awakened State
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center relative overflow-hidden">
      
      {/* Expanding Light Burst */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-tr from-indigo-900/40 via-transparent to-black pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />

      <div className="relative z-10 text-center max-w-4xl px-8">
        <motion.div
          initial={{ scale: 0.9, filter: 'blur(10px)', opacity: 0 }}
          animate={{ scale: 1, filter: 'blur(0px)', opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <div className="w-px h-24 bg-gradient-to-b from-transparent to-white/30 mx-auto mb-8" />
          
          <h1 className="text-6xl md:text-8xl font-serif italic tracking-tight mb-8">
            The Canvas is <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600 font-sans font-black not-italic uppercase tracking-tighter">
              Awake.
            </span>
          </h1>

          <motion.div 
            className="flex flex-col md:flex-row gap-8 justify-center items-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <button className="px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform">
              Enter Platform
            </button>
            <button className="px-8 py-4 border border-white/20 text-white font-medium uppercase tracking-widest text-sm hover:bg-white/10 transition-colors">
              Read Protocol
            </button>
          </motion.div>
        </motion.div>
      </div>

    </div>
  );
}