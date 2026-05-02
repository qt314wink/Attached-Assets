import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Box, Sliders, Type } from 'lucide-react';

export default function LabyrinthModule({ setPage }: { setPage: (p: string) => void }) {
  const [blur, setBlur] = useState(18);
  const [opacity, setOpacity] = useState(15);
  const [glitchActive, setGlitchActive] = useState(false);
  const [kineticWeight, setKineticWeight] = useState(400);

  return (
    <div className="pt-32 pb-24 px-6 bg-[url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center min-h-screen relative text-black">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col h-full">
        <button 
          onClick={() => setPage('home')}
          className="flex items-center gap-2 font-black uppercase mb-12 text-white hover:text-black hover:bg-white px-4 py-2 border-2 border-transparent hover:border-white transition-all w-fit"
        >
          <ArrowLeft size={16} /> Back to Systems
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Controls Panel */}
          <div className="lg:col-span-4 bg-white brutalist-border p-8 h-fit">
            <h2 className="font-black uppercase text-2xl mb-8 flex items-center gap-2">
              <Sliders size={24} /> Component Forge
            </h2>

            <div className="space-y-8">
              <div>
                <label className="flex justify-between font-black uppercase text-xs mb-2">
                  <span>Glass Blur (px)</span>
                  <span>{blur}</span>
                </label>
                <input 
                  type="range" min="0" max="40" value={blur} 
                  onChange={(e) => setBlur(parseInt(e.target.value))}
                  className="w-full accent-black"
                />
              </div>

              <div>
                <label className="flex justify-between font-black uppercase text-xs mb-2">
                  <span>Glass Opacity (%)</span>
                  <span>{opacity}</span>
                </label>
                <input 
                  type="range" min="0" max="100" value={opacity} 
                  onChange={(e) => setOpacity(parseInt(e.target.value))}
                  className="w-full accent-black"
                />
              </div>

              <div>
                <label className="flex justify-between font-black uppercase text-xs mb-2">
                  <span>Kinetic Font Weight</span>
                  <span>{kineticWeight}</span>
                </label>
                <input 
                  type="range" min="100" max="900" step="100" value={kineticWeight} 
                  onChange={(e) => setKineticWeight(parseInt(e.target.value))}
                  className="w-full accent-black"
                />
              </div>

              <div className="pt-4 border-t-2 border-black">
                <button 
                  onMouseEnter={() => setGlitchActive(true)}
                  onMouseLeave={() => setGlitchActive(false)}
                  className={`w-full py-4 font-black uppercase text-lg border-4 border-black transition-all relative overflow-hidden ${glitchActive ? 'bg-black text-white' : 'bg-[#ff6b6b] text-black'}`}
                >
                  {glitchActive ? (
                    <div className="relative inline-block">
                      <span className="absolute top-0 left-[2px] text-cyan-400" style={{ clipPath: 'inset(10% 0 30% 0)' }}>GLITCH TEST</span>
                      <span className="absolute top-0 left-[-2px] text-pink-500" style={{ clipPath: 'inset(60% 0 10% 0)' }}>GLITCH TEST</span>
                      <span className="relative text-white">GLITCH TEST</span>
                    </div>
                  ) : "Hover for Glitch"}
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Canvas */}
          <div className="lg:col-span-8 flex items-center justify-center relative min-h-[500px]">
            {/* The Glassmorphism Card */}
            <motion.div 
              className="relative p-12 w-full max-w-lg rounded-3xl overflow-hidden border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] transition-all"
              style={{
                background: `rgba(255, 255, 255, ${opacity / 100})`,
                backdropFilter: `blur(${blur}px)`,
                WebkitBackdropFilter: `blur(${blur}px)`
              }}
              whileHover={{ scale: 1.02 }}
              drag
              dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
            >
              {/* Internal lighting / Rim light */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
              
              <div className="relative z-10 text-white">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-8 border border-white/40 shadow-inner">
                  <Box size={32} className="text-white" />
                </div>
                
                <h3 
                  className="text-4xl mb-4 transition-all duration-300 tracking-tighter"
                  style={{ fontWeight: kineticWeight }}
                >
                  Interactive Glass
                </h3>
                
                <p className="text-white/80 font-medium leading-relaxed text-lg" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                  This panel utilizes true CSS backdrop-filter compositing. Drag it around to see how it refracts the high-contrast background imagery.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}