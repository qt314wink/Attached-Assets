import React from 'react';
import { ArrowDown, Wrench } from 'lucide-react';
import './_group.css';

export function SplashPage() {
  return (
    <div className="min-h-screen bg-[#E5E5E5] relative font-sans selection:bg-black selection:text-[#00FF66] overflow-hidden flex flex-col items-center justify-center p-4 md:p-12">
      {/* Heavy halftone background */}
      <div className="absolute inset-0 opacity-30 mix-blend-multiply pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #000 3px, transparent 3.5px)', backgroundSize: '16px 16px' }} />
      
      {/* Massive Central Typography */}
      <div className="relative z-10 text-center w-full max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Floating action bubble 1 */}
        <div className="absolute top-10 left-10 md:top-20 md:left-20 bg-[#FFFF00] border-[8px] border-black rounded-[100%] px-8 py-6 shadow-[16px_16px_0_#000] transform -rotate-12 z-20 animate-[bounce_4s_ease-in-out_infinite]">
           <span className="font-black text-4xl uppercase tracking-widest">KRAKOOM!</span>
           <div className="absolute -bottom-6 right-10 w-8 h-8 bg-[#FFFF00] border-[8px] border-black rounded-full" />
           <div className="absolute -bottom-14 right-4 w-4 h-4 bg-[#FFFF00] border-[6px] border-black rounded-full" />
        </div>

        {/* Floating action bubble 2 */}
        <div className="absolute bottom-32 right-10 md:right-20 bg-white border-[8px] border-black px-6 py-4 shadow-[12px_12px_0_#FF0055] transform rotate-6 z-20 hover:scale-110 transition-transform cursor-pointer">
           <span className="font-black text-2xl uppercase">Physics-Driven!</span>
        </div>

        <h1 className="text-[12vw] md:text-[180px] font-black uppercase tracking-tighter leading-[0.75] mb-12 relative">
          <span className="text-[#FF0055] block transform -rotate-2 origin-left hover:scale-105 transition-transform" style={{ WebkitTextStroke: '6px black', textShadow: '16px 16px 0 #000' }}>Tactile</span>
          <span className="text-[#00E5FF] block transform rotate-2 origin-right hover:scale-105 transition-transform relative left-4" style={{ WebkitTextStroke: '6px black', textShadow: '16px 16px 0 #000' }}>System</span>
        </h1>
        
        {/* CTAs breaking the grid */}
        <div className="flex flex-col md:flex-row items-center gap-12 mt-12 relative z-30">
          
          <button className="group relative bg-[#00FF66] border-[8px] border-black shadow-[16px_16px_0_#000] hover:shadow-[24px_24px_0_#000] hover:-translate-y-2 hover:-translate-x-2 transition-all px-12 py-8 flex items-center gap-6 transform -rotate-3">
             <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center group-hover:animate-spin">
               <ArrowDown size={32} className="text-[#00FF66]" />
             </div>
             <span className="font-black text-5xl uppercase" style={{ WebkitTextStroke: '1px white' }}>Explore</span>
             {/* Spiky starburst accent behind CTA */}
             <div className="absolute -inset-8 bg-black -z-10 [clip-path:polygon(50%_0%,61%_35%,98%_35%,68%_57%,79%_91%,50%_70%,21%_91%,32%_57%,2%_35%,39%_35%)] opacity-0 group-hover:opacity-100 transition-opacity scale-150 animate-pulse" />
          </button>

          <button className="group relative bg-black border-[8px] border-black text-white hover:bg-white hover:text-black shadow-[16px_16px_0_#FF0055] hover:shadow-[24px_24px_0_#FF0055] hover:-translate-y-2 transition-all px-10 py-6 flex items-center gap-4 transform rotate-2">
             <Wrench size={32} className="group-hover:rotate-45 transition-transform" />
             <span className="font-black text-3xl uppercase">The Forge</span>
          </button>

        </div>
      </div>
    </div>
  );
}