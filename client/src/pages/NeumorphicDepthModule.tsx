import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Lightbulb, Box, MousePointer2, Settings, Zap } from 'lucide-react';

export default function NeumorphicDepthModule({ setPage }: { setPage: (p: string) => void }) {
  const [blurRadius, setBlurRadius] = useState(20);
  const [offset, setOffset] = useState(10);
  const [isPressed, setIsPressed] = useState(false);

  // The Two-Shadow Formula
  const lightShadow = `-${offset}px -${offset}px ${blurRadius}px rgba(255,255,255,0.8)`;
  const darkShadow = `${offset}px ${offset}px ${blurRadius}px rgba(163,177,198,0.6)`;
  
  const convexBoxShadow = `${lightShadow}, ${darkShadow}`;
  const concaveBoxShadow = `inset ${lightShadow}, inset ${darkShadow}`;

  return (
    <div className="pt-32 pb-24 px-6 bg-[#e0e5ec] min-h-screen relative text-slate-800 font-sans">
      <div className="max-w-6xl mx-auto relative z-10">
        <button 
          onClick={() => setPage('home')}
          className="flex items-center gap-2 font-black uppercase mb-12 text-slate-500 hover:text-slate-800 transition-colors w-fit text-sm"
        >
          <ArrowLeft size={16} /> Retreat to Nexus
        </button>

        <div className="mb-16">
          <span className="text-slate-400 font-black uppercase tracking-[0.3em] text-xs block mb-4">
            // NEO-SKEUOMORPHISM & ACCESSIBILITY
          </span>
          <h1 className="text-5xl md:text-7xl font-black uppercase leading-none mb-6 tracking-tighter text-slate-700">
            High-Performance<br/>Soft UI
          </h1>
          <p className="text-xl font-medium max-w-2xl text-slate-500 mb-8">
            Neumorphism is computationally expensive. Animating shadow properties triggers CPU-heavy repaints. We use a "Dual-Container" stack to offload animations to the GPU via opacity toggles.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Controls */}
          <div className="lg:col-span-4 space-y-8">
            <div className="p-8 rounded-3xl bg-[#e0e5ec] relative">
              <div className="absolute inset-0 rounded-3xl" style={{ boxShadow: convexBoxShadow, pointerEvents: 'none' }} />
              <h3 className="font-black uppercase mb-6 flex items-center gap-2 text-slate-600 relative z-10">
                <Lightbulb size={18} /> Global Light Source
              </h3>
              
              <div className="space-y-6 relative z-10">
                <div>
                  <label className="flex justify-between font-bold uppercase text-xs mb-2 text-slate-500">
                    <span>Light Angle (Offset)</span>
                    <span>{offset}px</span>
                  </label>
                  <input 
                    type="range" min="2" max="30" value={offset} 
                    onChange={(e) => setOffset(parseInt(e.target.value))}
                    className="w-full accent-slate-400"
                  />
                </div>

                <div>
                  <label className="flex justify-between font-bold uppercase text-xs mb-2 text-slate-500">
                    <span>Diffusion (Blur)</span>
                    <span>{blurRadius}px</span>
                  </label>
                  <input 
                    type="range" min="5" max="50" value={blurRadius} 
                    onChange={(e) => setBlurRadius(parseInt(e.target.value))}
                    className="w-full accent-slate-400"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#e0e5ec] text-sm text-slate-500 relative">
              <div className="absolute inset-0 rounded-2xl" style={{ boxShadow: concaveBoxShadow, pointerEvents: 'none' }} />
              <div className="relative z-10">
                <p className="font-bold mb-2 text-slate-600 flex items-center gap-2"><Zap size={14} /> Dual-Container Logic:</p>
                <code className="block text-[10px] bg-white/50 p-4 rounded mb-2">
                  Layer 1: Convex (Outer Shadows)<br/>
                  Layer 2: Concave (Inner Shadows)<br/>
                  <br/>
                  Action: Toggle opacity (GPU composited)<br/>
                  Result: 60 FPS without jank.
                </code>
              </div>
            </div>
          </div>

          {/* Interactive Playground */}
          <div className="lg:col-span-8 flex flex-col items-center justify-center gap-16">
            
            <div className="flex flex-wrap gap-16 items-center justify-center w-full">
              {/* GPU Accelerated Button */}
              <div className="flex flex-col items-center gap-4">
                <div 
                  className="relative w-32 h-32 cursor-pointer"
                  onMouseDown={() => setIsPressed(true)}
                  onMouseUp={() => setIsPressed(false)}
                  onMouseLeave={() => setIsPressed(false)}
                >
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-[#e0e5ec] flex items-center justify-center text-slate-400"
                    style={{ boxShadow: convexBoxShadow }}
                    animate={{ opacity: isPressed ? 0 : 1, scale: isPressed ? 0.95 : 1 }}
                    transition={{ duration: 0.1 }}
                  >
                    <MousePointer2 size={32} />
                  </motion.div>
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-[#e0e5ec] flex items-center justify-center text-[#ff6b6b]"
                    style={{ boxShadow: concaveBoxShadow }}
                    animate={{ opacity: isPressed ? 1 : 0, scale: isPressed ? 0.95 : 1 }}
                    transition={{ duration: 0.1 }}
                  >
                    <MousePointer2 size={32} />
                  </motion.div>
                </div>
                <span className="font-black uppercase text-xs text-slate-400 tracking-widest text-center">
                  GPU Composited<br/>(No Jank)
                </span>
              </div>

              {/* Guardrails Demo */}
              <div className="relative w-72 p-8 rounded-[3rem] bg-[#e0e5ec]">
                <div className="absolute inset-0 rounded-[3rem]" style={{ boxShadow: convexBoxShadow, pointerEvents: 'none' }} />
                <div className="relative z-10 flex flex-col gap-6">
                  <div className="w-12 h-12 rounded-full bg-[#e0e5ec] flex items-center justify-center relative">
                     <div className="absolute inset-0 rounded-full" style={{ boxShadow: concaveBoxShadow, pointerEvents: 'none' }} />
                    <Settings size={20} className="text-slate-400 relative z-10" />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full" style={{ boxShadow: concaveBoxShadow, pointerEvents: 'none' }} />
                      <input type="text" placeholder="Input Field (Use Inset)" className="w-full bg-transparent px-4 py-3 outline-none text-xs font-bold text-slate-600 placeholder:text-slate-400 relative z-10" />
                    </div>
                    
                    <button className="w-full py-4 rounded-xl bg-slate-700 text-white font-black uppercase text-xs tracking-widest hover:bg-slate-800 transition-colors shadow-lg">
                      High Contrast CTA
                    </button>
                    <p className="text-[10px] text-slate-400 text-center font-bold">Primary actions must use high-contrast. Never use soft-UI for critical buttons.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}