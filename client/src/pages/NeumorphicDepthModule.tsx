import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Box, MousePointer2, Settings, Zap, Paintbrush } from 'lucide-react';

export default function NeumorphicDepthModule({ setPage }: { setPage: (p: string) => void }) {
  const [blurRadius, setBlurRadius] = useState(20);
  const [offset, setOffset] = useState(10);
  const [isPressed, setIsPressed] = useState(false);

  const lightShadow = `-${offset}px -${offset}px ${blurRadius}px rgba(255,255,255,0.8)`;
  const darkShadow = `${offset}px ${offset}px ${blurRadius}px rgba(163,177,198,0.6)`;
  
  const convexBoxShadow = `${lightShadow}, ${darkShadow}`;
  const concaveBoxShadow = `inset ${lightShadow}, inset ${darkShadow}`;

  return (
    <div className="pt-32 pb-24 px-6 bg-[#e0e5ec] min-h-screen relative text-slate-800 font-sans selection:bg-[#FF0055] selection:text-white">
      {/* Checkerboard Background */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)', backgroundPosition: '0 0, 20px 20px', backgroundSize: '40px 40px' }} />

      <div className="max-w-6xl mx-auto relative z-10">
        
        <header className="mb-16 bg-white border-[12px] border-black p-8 shadow-[20px_20px_0_#00E5FF] relative transform rotate-1 flex flex-col md:flex-row justify-between items-start md:items-end">
          <div className="absolute -top-8 -left-8 bg-[#FFFF00] p-4 border-[6px] border-black rounded-full shadow-[8px_8px_0_#000] rotate-[-10deg]">
            <Paintbrush size={48} className="text-black" />
          </div>

          <div>
            <button 
              onClick={() => setPage('home')}
              className="flex items-center gap-2 font-black uppercase mb-6 text-white bg-black hover:bg-[#FF0055] px-6 py-3 border-[4px] border-black transition-colors w-fit text-sm shadow-[6px_6px_0_#000]"
            >
              <ArrowLeft size={20} /> Back
            </button>
            <h1 className="text-6xl md:text-8xl font-black uppercase leading-[0.8] tracking-tighter text-black" style={{ textShadow: '4px 4px 0 #FF0055, 8px 8px 0 #000' }}>
              Soft UI<br/>Paradox!
            </h1>
          </div>
          
          <div className="bg-black text-[#00FF66] font-black uppercase px-6 py-3 border-[4px] border-white shadow-[8px_8px_0_#FF0055] transform -rotate-3 text-xl mt-8 md:mt-0">
            Soft vs Hard Design!
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Controls */}
          <div className="lg:col-span-4 space-y-8">
            <div className="p-8 border-[8px] border-black bg-white shadow-[12px_12px_0_#000] transform -rotate-1 relative">
              <div className="absolute -top-4 -right-4 bg-[#FF0055] text-white px-3 py-1 font-black uppercase border-[4px] border-black rotate-6 shadow-[4px_4px_0_#000]">
                 Controls
              </div>
              <h3 className="font-black uppercase mb-6 text-2xl border-b-[4px] border-black pb-2 text-black">
                Light Source
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="flex justify-between font-black uppercase text-sm mb-2 text-black">
                    <span className="bg-gray-200 px-2 border-2 border-black">Offset</span>
                    <span className="bg-black text-white px-2 border-2 border-black">{offset}px</span>
                  </label>
                  <input 
                    type="range" min="2" max="30" value={offset} 
                    onChange={(e) => setOffset(parseInt(e.target.value))}
                    className="w-full h-4 bg-black appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-[#00E5FF] [&::-webkit-slider-thumb]:border-[4px] [&::-webkit-slider-thumb]:border-black cursor-pointer shadow-[0_4px_0_#000]"
                  />
                </div>

                <div>
                  <label className="flex justify-between font-black uppercase text-sm mb-2 text-black">
                    <span className="bg-gray-200 px-2 border-2 border-black">Blur</span>
                    <span className="bg-black text-white px-2 border-2 border-black">{blurRadius}px</span>
                  </label>
                  <input 
                    type="range" min="5" max="50" value={blurRadius} 
                    onChange={(e) => setBlurRadius(parseInt(e.target.value))}
                    className="w-full h-4 bg-black appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-[#FFFF00] [&::-webkit-slider-thumb]:border-[4px] [&::-webkit-slider-thumb]:border-black cursor-pointer shadow-[0_4px_0_#000]"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 border-[8px] border-black bg-black text-white shadow-[12px_12px_0_#FF0055] transform rotate-1">
              <p className="font-black uppercase mb-2 text-[#00E5FF] flex items-center gap-2 text-xl"><Zap size={24} /> Dual-Container:</p>
              <p className="font-bold text-sm uppercase leading-relaxed text-gray-300">
                Layer 1: Convex (Outer)<br/>
                Layer 2: Concave (Inner)<br/><br/>
                <span className="text-[#FFFF00]">Action: Toggle opacity (GPU)</span><br/>
                Result: 60 FPS without jank.
              </p>
            </div>
          </div>

          {/* Playground */}
          <div className="lg:col-span-8 flex flex-col items-center justify-center gap-12 bg-white border-[12px] border-black shadow-[20px_20px_0_#000] p-12 relative overflow-hidden">
             
             {/* Background noise inside the frame */}
             <div className="absolute inset-0 bg-[#e0e5ec] opacity-50 mix-blend-multiply pointer-events-none" />

            <div className="flex flex-col md:flex-row gap-16 items-center justify-center w-full relative z-10">
              
              {/* GPU Button */}
              <div className="flex flex-col items-center gap-6">
                <div 
                  className="relative w-40 h-40 cursor-pointer"
                  onMouseDown={() => setIsPressed(true)}
                  onMouseUp={() => setIsPressed(false)}
                  onMouseLeave={() => setIsPressed(false)}
                >
                  <motion.div 
                    className="absolute inset-0 rounded-[2rem] bg-[#e0e5ec] flex items-center justify-center text-slate-400"
                    style={{ boxShadow: convexBoxShadow }}
                    animate={{ opacity: isPressed ? 0 : 1, scale: isPressed ? 0.95 : 1 }}
                    transition={{ duration: 0.1 }}
                  >
                    <MousePointer2 size={40} />
                  </motion.div>
                  <motion.div 
                    className="absolute inset-0 rounded-[2rem] bg-[#e0e5ec] flex items-center justify-center text-[#FF0055]"
                    style={{ boxShadow: concaveBoxShadow }}
                    animate={{ opacity: isPressed ? 1 : 0, scale: isPressed ? 0.95 : 1 }}
                    transition={{ duration: 0.1 }}
                  >
                    <MousePointer2 size={40} />
                  </motion.div>
                </div>
                <span className="font-black uppercase text-xl text-black bg-[#FFFF00] px-4 py-2 border-[4px] border-black shadow-[4px_4px_0_#000] transform -rotate-2">
                  GPU Composited
                </span>
              </div>

              {/* Guardrails Demo */}
              <div className="relative w-80 p-8 rounded-[3rem] bg-[#e0e5ec]">
                <div className="absolute inset-0 rounded-[3rem]" style={{ boxShadow: convexBoxShadow, pointerEvents: 'none' }} />
                <div className="relative z-10 flex flex-col gap-8">
                  <div className="w-16 h-16 rounded-full bg-[#e0e5ec] flex items-center justify-center relative mx-auto">
                     <div className="absolute inset-0 rounded-full" style={{ boxShadow: concaveBoxShadow, pointerEvents: 'none' }} />
                    <Settings size={24} className="text-[#00E5FF] relative z-10" />
                  </div>
                  
                  <div className="space-y-6">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full" style={{ boxShadow: concaveBoxShadow, pointerEvents: 'none' }} />
                      <input type="text" placeholder="Soft Input..." className="w-full bg-transparent px-6 py-4 outline-none text-sm font-black uppercase text-slate-600 placeholder:text-slate-400 relative z-10" />
                    </div>
                    
                    {/* The Contrast: Brutalist CTA inside a Soft UI form */}
                    <button className="w-full py-4 border-[4px] border-black bg-[#00FF66] text-black font-black uppercase text-xl shadow-[6px_6px_0_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                      Hard CTA!
                    </button>
                    <div className="bg-black text-white p-3 font-black uppercase text-[10px] text-center border-[2px] border-white transform rotate-1">
                      Primary actions MUST use high-contrast.
                    </div>
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