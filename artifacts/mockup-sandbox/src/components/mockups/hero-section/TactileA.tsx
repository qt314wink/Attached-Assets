import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import heroImage from '@assets/image_1777749324005.webp';
import './_group.css';

export function TactileA() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ 
      x: e.clientX - rect.left, 
      y: e.clientY - rect.top 
    });
  };

  return (
    <div 
      className="min-h-screen bg-[#1a1a1a] overflow-hidden relative flex items-center justify-center font-sans text-[#f8f8f8]"
      onMouseMove={handleMouseMove}
      style={{
        backgroundImage: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(167, 139, 250, 0.15) 0%, transparent 40%)`
      }}
    >
      {/* Background Image with Shytech integration */}
      <div className="absolute inset-0 z-0 opacity-20 mix-blend-luminosity pointer-events-none">
        <img src={heroImage} alt="Background" className="w-full h-full object-cover object-center" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center gap-16">
        
        {/* Left Typography */}
        <div className="flex-1 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-6xl md:text-8xl font-medium tracking-tight leading-[0.9] mb-6" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
              Photons,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a78bfa] to-[#c084fc]">not pixels.</span>
            </h1>
            <p className="text-xl text-[#a0a0a0] max-w-md leading-relaxed font-light">
              Experience the Tactile Renaissance. A decentralized creative platform built with physical depth, soft light, and shytech materials.
            </p>
          </motion.div>

          <motion.div 
            className="flex gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {/* Tactile Button */}
            <button className="group relative px-8 py-4 rounded-3xl bg-[#252525] overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_4px_0_#00000030,0_-2px_0_#ffffff10] hover:shadow-[0_8px_20px_rgba(167,139,250,0.2),0_4px_0_#00000030,0_-1px_0_#ffffff20]">
              <div className="absolute inset-0 bg-gradient-to-b from-[#ffffff10] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10 font-bold tracking-widest uppercase text-sm group-hover:text-[#c084fc] transition-colors">Enter Lumina</span>
            </button>

            {/* Shytech Button */}
            <button className="group relative px-8 py-4 rounded-3xl bg-transparent border border-[#333] overflow-hidden transition-all duration-500 hover:border-[#a78bfa]/50">
              <span className="relative z-10 font-medium tracking-widest text-sm text-[#555] group-hover:text-[#f8f8f8] transition-colors">Read Manifesto</span>
              <div className="absolute inset-0 bg-[#a78bfa]/10 opacity-0 group-hover:opacity-100 transition-opacity blur-md" />
            </button>
          </motion.div>
        </div>

        {/* Right 3D Glass Card */}
        <motion.div 
          className="flex-1 w-full max-w-lg"
          initial={{ opacity: 0, rotateY: 10, translateZ: -100 }}
          animate={{ opacity: 1, rotateY: 0, translateZ: 0 }}
          transition={{ duration: 1.2, type: "spring", bounce: 0.4 }}
        >
          <div 
            className="relative aspect-[4/5] rounded-[2.5rem] bg-[#2a2a2a]/40 backdrop-blur-2xl border border-[#ffffff15] p-8 flex flex-col justify-end overflow-hidden"
            style={{
              boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.1), 0 20px 40px rgba(0,0,0,0.5)',
              transformStyle: 'preserve-3d',
              transform: `perspective(1000px) rotateX(${(mousePos.y - 360) / -40}deg) rotateY(${(mousePos.x - 640) / 40}deg)`
            }}
          >
            {/* Top-left directional light highlight */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
            
            {/* Inner Content */}
            <div className="relative z-10" style={{ transform: 'translateZ(30px)' }}>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#a78bfa] to-[#c084fc] mb-6 shadow-[0_0_20px_rgba(167,139,250,0.4),inset_0_2px_0_rgba(255,255,255,0.5)] flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-white shadow-[0_0_10px_white]" />
              </div>
              <h3 className="text-2xl font-medium mb-2">Zero-Friction Immersion</h3>
              <p className="text-sm text-[#888] leading-relaxed">
                Purposeful motion, spring physics, and instant haptic-like responses. The interface lights up only when your intent is clear.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}