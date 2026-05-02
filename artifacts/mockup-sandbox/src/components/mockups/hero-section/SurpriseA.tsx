import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { ArrowRight, Crosshair, Radar } from 'lucide-react';
import './_group.css';

export function SurpriseA() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [rings, setRings] = useState<number[]>([]);

  // Periodically emit a radar pulse
  useEffect(() => {
    const interval = setInterval(() => {
      setRings(prev => [...prev.slice(-4), Date.now()]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div 
      className="min-h-screen bg-[#050B14] overflow-hidden relative cursor-none"
      onMouseMove={handleMouseMove}
    >
      {/* Custom Crosshair */}
      <motion.div 
        className="fixed pointer-events-none z-50 mix-blend-difference"
        animate={{ x: mousePos.x - 16, y: mousePos.y - 16 }}
        transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
      >
        <Crosshair size={32} className="text-[#00FFD1] opacity-70" />
      </motion.div>

      {/* Radar Sweep Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <motion.div 
          className="w-[150vw] h-[150vw] rounded-full border border-[#00FFD1]"
          style={{ background: 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(0, 255, 209, 0.1) 360deg)' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Expanding Pulse Rings */}
        {rings.map(ring => (
          <motion.div 
            key={ring}
            className="absolute rounded-full border border-[#00FFD1]"
            initial={{ width: 0, height: 0, opacity: 0.8 }}
            animate={{ width: '150vw', height: '150vw', opacity: 0 }}
            transition={{ duration: 8, ease: "easeOut" }}
          />
        ))}
        
        {/* Grid */}
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at center, #00FFD1 1px, transparent 1px)', backgroundSize: '100px 100px', opacity: 0.2 }} />
      </div>

      {/* Content HUD */}
      <div className="relative z-10 w-full h-screen flex flex-col justify-between p-8 md:p-16">
        
        {/* Top HUD */}
        <div className="flex justify-between items-start font-mono text-[#00FFD1] text-xs uppercase tracking-widest opacity-80">
          <div>
            <div>STATUS: ONLINE</div>
            <div>NODES: 24,091</div>
            <div>SYS_TENSION: NOMINAL</div>
          </div>
          <div className="text-right">
            <div><Radar size={14} className="inline mr-2 animate-pulse" /> COLLECTIVE OS</div>
            <div>LAT: {Math.floor(mousePos.y)}</div>
            <div>LON: {Math.floor(mousePos.x)}</div>
          </div>
        </div>

        {/* Central HUD Element */}
        <div className="flex-1 flex items-center justify-center">
           <div className="text-center relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-[#00FFD1]/30 rounded-full flex items-center justify-center">
                 <div className="w-[200px] h-[200px] border border-[#00FFD1]/20 rounded-full flex items-center justify-center">
                    <div className="w-[100px] h-[100px] bg-[#00FFD1]/10 rounded-full blur-xl" />
                 </div>
              </div>
              
              <h1 className="text-7xl md:text-9xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 mb-4 tracking-tighter relative z-10" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Signal <br/> <span className="text-[#00FFD1]">Detected</span>
              </h1>
              <p className="text-[#00FFD1] font-mono text-sm max-w-sm mx-auto uppercase tracking-widest opacity-80 relative z-10 bg-[#050B14] px-4 py-2 border border-[#00FFD1]/30">
                A decentralized sanctuary for creators. Broadcast your digital identity to the network.
              </p>
           </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col md:flex-row justify-between items-end">
          <div className="hidden md:block w-1/3">
            {/* Decorative Audio Waveform stub */}
            <div className="flex items-end gap-1 h-8 opacity-50">
               {[...Array(20)].map((_, i) => (
                 <motion.div key={i} className="w-1 bg-[#00FFD1]" animate={{ height: [4, Math.random() * 30 + 4, 4] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }} />
               ))}
            </div>
          </div>
          
          <div className="flex gap-4">
            <button className="bg-transparent border border-[#00FFD1]/50 text-[#00FFD1] font-mono text-xs uppercase tracking-widest px-8 py-4 hover:bg-[#00FFD1]/10 transition-colors">
              [ SCAN NETWORK ]
            </button>
            <button className="bg-[#00FFD1] text-[#050B14] font-black uppercase text-sm tracking-widest px-8 py-4 hover:bg-white transition-colors flex items-center gap-2">
              INITIATE FORGE <ArrowRight size={16} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}