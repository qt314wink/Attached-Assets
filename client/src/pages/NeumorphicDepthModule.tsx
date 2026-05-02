import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Lightbulb, Box, Layers, MousePointer2 } from 'lucide-react';

export default function NeumorphicDepthModule({ setPage }: { setPage: (p: string) => void }) {
  const [lightIntensity, setLightIntensity] = useState(15); // Spread radius essentially
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
            // THE LOGIC OF DEPTH
          </span>
          <h1 className="text-5xl md:text-7xl font-black uppercase leading-none mb-6 tracking-tighter text-slate-700">
            Soft UI<br/>Engine
          </h1>
          <p className="text-xl font-medium max-w-2xl text-slate-500">
            Neumorphism is a digital material with its own physics. Master the "Two-Shadow Formula" to mold interfaces from the background itself.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Controls */}
          <div className="lg:col-span-4 space-y-8">
            <div className="p-8 rounded-3xl bg-[#e0e5ec]" style={{ boxShadow: convexBoxShadow }}>
              <h3 className="font-black uppercase mb-6 flex items-center gap-2 text-slate-600">
                <Lightbulb size={18} /> Light Physics
              </h3>
              
              <div className="space-y-6">
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

            <div className="p-6 rounded-2xl bg-[#e0e5ec] text-sm text-slate-500" style={{ boxShadow: concaveBoxShadow }}>
              <p className="font-bold mb-2 text-slate-600">The Two-Shadow Formula:</p>
              <code className="block text-[10px] bg-white/50 p-2 rounded mb-2">
                Light: -{offset}px -{offset}px {blurRadius}px #FFFFFF<br/>
                Dark: {offset}px {offset}px {blurRadius}px #A3B1C6
              </code>
            </div>
          </div>

          {/* Interactive Playground */}
          <div className="lg:col-span-8 flex flex-col items-center justify-center gap-16">
            
            <div className="flex gap-16 items-center">
              {/* Convex Button */}
              <div className="flex flex-col items-center gap-4">
                <motion.button
                  onMouseDown={() => setIsPressed(true)}
                  onMouseUp={() => setIsPressed(false)}
                  onMouseLeave={() => setIsPressed(false)}
                  animate={{ scale: isPressed ? 0.95 : 1 }}
                  className="w-32 h-32 rounded-full bg-[#e0e5ec] flex items-center justify-center text-slate-400 hover:text-[#ff6b6b] transition-colors"
                  style={{ boxShadow: isPressed ? concaveBoxShadow : convexBoxShadow }}
                >
                  <MousePointer2 size={32} />
                </motion.button>
                <span className="font-black uppercase text-xs text-slate-400 tracking-widest">
                  {isPressed ? 'Concave (Pressed)' : 'Convex (Raised)'}
                </span>
              </div>

              {/* Neumorphic Card */}
              <div 
                className="w-64 h-80 rounded-[3rem] bg-[#e0e5ec] p-8 flex flex-col justify-between"
                style={{ boxShadow: convexBoxShadow }}
              >
                <div className="w-12 h-12 rounded-full bg-[#e0e5ec] flex items-center justify-center mb-6" style={{ boxShadow: concaveBoxShadow }}>
                  <Box size={20} className="text-slate-400" />
                </div>
                
                <div>
                  <div className="h-4 w-3/4 bg-[#e0e5ec] rounded-full mb-3" style={{ boxShadow: concaveBoxShadow }} />
                  <div className="h-4 w-1/2 bg-[#e0e5ec] rounded-full" style={{ boxShadow: concaveBoxShadow }} />
                </div>

                <div 
                  className="w-full py-4 rounded-xl bg-[#e0e5ec] text-center font-black uppercase text-xs tracking-widest text-slate-400 cursor-pointer transition-all hover:text-slate-600"
                  style={{ boxShadow: convexBoxShadow }}
                  whileHover={{ scale: 1.02 }}
                >
                  Extruded Action
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}