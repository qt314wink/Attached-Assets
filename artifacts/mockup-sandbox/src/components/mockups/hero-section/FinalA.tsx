import React, { useState, useRef, useEffect } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { Layers, Activity, Maximize } from 'lucide-react';
import './_group.css';

export function FinalA() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse position tracking for 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for tilt
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { damping: 30, stiffness: 200 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { damping: 30, stiffness: 200 });

  // Interactive Parameters
  const [absorption, setAbsorption] = useState(30); // Maps to blur/softness
  const [resolution, setResolution] = useState(5000); // Maps to detail/sharpness

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-[#111] overflow-hidden relative flex items-center justify-center font-sans text-white"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 2000 }}
    >
      {/* Background brushed metal texture (simulated via CSS) */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-overlay" 
           style={{ 
             backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, #fff 2px, #fff 4px)',
             backgroundSize: '10px 10px'
           }} 
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(167,139,250,0.15),transparent_50%)] z-0 pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto px-8 relative z-10 flex flex-col md:flex-row gap-12 items-center">
        
        {/* Left: Typography & Controls */}
        <div className="flex-1 space-y-10">
          <div>
            <div className="flex items-center gap-2 text-violet-400 text-xs font-bold uppercase tracking-widest mb-6">
              <Layers size={14} /> Lumina BEM Engine
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[0.9]">
              Physical <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">Interfaces.</span>
            </h1>
            <p className="text-gray-400 max-w-md text-sm leading-relaxed">
              Synthesizing boundary element acoustics with neo-skeuomorphic depth. Adjust the physical parameters below to see real-time material rendering.
            </p>
          </div>

          {/* Tactile Controls */}
          <div className="space-y-6 max-w-sm bg-black/40 p-6 rounded-2xl border border-white/5 backdrop-blur-xl shadow-2xl">
            <div>
              <div className="flex justify-between text-xs text-gray-400 mb-2 font-mono uppercase tracking-wider">
                <span>Acoustic Absorption</span>
                <span className="text-violet-400">{(absorption / 100).toFixed(2)} α</span>
              </div>
              <input 
                type="range" min="0" max="100" value={absorption}
                onChange={(e) => setAbsorption(parseInt(e.target.value))}
                className="w-full h-1.5 bg-gray-800 rounded-full appearance-none cursor-pointer accent-violet-400"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs text-gray-400 mb-2 font-mono uppercase tracking-wider">
                <span>Mesh Resolution</span>
                <span className="text-fuchsia-400">{resolution} Polys</span>
              </div>
              <input 
                type="range" min="1000" max="10000" step="500" value={resolution}
                onChange={(e) => setResolution(parseInt(e.target.value))}
                className="w-full h-1.5 bg-gray-800 rounded-full appearance-none cursor-pointer accent-fuchsia-400"
              />
            </div>
          </div>
        </div>

        {/* Right: The 3D Artifact */}
        <div className="flex-1 flex justify-center items-center">
          <motion.div 
            style={{ 
              rotateX, 
              rotateY,
              transformStyle: 'preserve-3d'
            }}
            className="relative"
          >
            {/* The Glass Card */}
            <div 
              className="w-[380px] aspect-[4/5] rounded-[2.5rem] relative overflow-hidden flex flex-col justify-end p-8 border border-white/20 transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.02))`,
                backdropFilter: `blur(${absorption / 2}px)`,
                boxShadow: `
                  inset 0 1px 1px rgba(255,255,255,0.4),
                  0 20px 40px rgba(0,0,0,0.5),
                  0 ${absorption / 2}px ${absorption}px rgba(167,139,250,${0.2 * (resolution/10000)})
                `,
                transform: 'translateZ(50px)'
              }}
            >
              {/* Dynamic Top-Left Light Highlight */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent pointer-events-none"
                style={{
                  opacity: useTransform(mouseX, [-0.5, 0.5], [0.8, 0])
                }}
              />

              <div className="relative z-10" style={{ transform: 'translateZ(30px)' }}>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 mb-6 shadow-[inset_0_2px_4px_rgba(255,255,255,0.5),_0_10px_20px_rgba(167,139,250,0.4)] flex items-center justify-center">
                  <Activity size={24} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2 drop-shadow-lg">Tactile Renaissance</h3>
                <p className="text-sm text-gray-300 font-medium">
                  {resolution > 5000 ? "High-fidelity surface rendering active." : "Optimized preview mesh active."}
                </p>
              </div>
            </div>

            {/* Floating Elements for Parallax Depth */}
            <div 
              className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-violet-500/20 blur-xl pointer-events-none"
              style={{ transform: 'translateZ(-50px)' }}
            />
            <motion.div 
              className="absolute -bottom-6 -left-6 w-16 h-16 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center shadow-xl"
              style={{ transform: 'translateZ(80px)' }}
              whileHover={{ scale: 1.1, translateZ: 100 }}
            >
              <Maximize size={20} className="text-gray-400" />
            </motion.div>

          </motion.div>
        </div>

      </div>
    </div>
  );
}