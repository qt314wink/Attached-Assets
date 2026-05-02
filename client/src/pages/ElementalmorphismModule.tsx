import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Droplets, Zap, Wind, ArrowLeft, Wand2 } from 'lucide-react';

const playSound = (type: 'hover' | 'down' | 'up') => {
  // Silent in mockup unless specifically requested
};

const ElementalCard = ({ title, description, icon: Icon, primaryColor }: any) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: 2 }}
      whileTap={{ scale: 0.95 }}
      className="relative overflow-hidden border-[8px] border-black bg-white shadow-[12px_12px_0_#000] transition-shadow hover:shadow-none h-[400px] flex flex-col group cursor-pointer"
    >
      {/* Background Graphic */}
      <div className={`absolute -right-12 -top-12 w-48 h-48 rounded-full border-[8px] border-black ${primaryColor} opacity-50 group-hover:scale-150 transition-transform duration-500`} />
      
      {/* Action Lines Overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none mix-blend-overlay">
         <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
            <path d="M50,50 L0,0 M50,50 L100,0 M50,50 L100,100 M50,50 L0,100" stroke="black" strokeWidth="2" vectorEffect="non-scaling-stroke" />
         </svg>
      </div>

      <div className="relative z-20 p-8 flex flex-col justify-between h-full">
        <div className={`p-4 rounded-full border-[6px] border-black shadow-[6px_6px_0_#000] w-fit bg-white transform -rotate-6`}>
          <Icon size={40} className="text-black" />
        </div>
        <div className="bg-white border-[6px] border-black p-6 shadow-[8px_8px_0_#000] transform rotate-1 mt-auto">
          <h2 className="text-3xl font-black uppercase mb-4 text-black leading-none">
            {title}
          </h2>
          <p className="text-black font-bold text-lg leading-tight uppercase border-l-[4px] border-black pl-4">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default function ElementalmorphismModule({ setPage }: { setPage: (p: string) => void }) {
  return (
    <div className="min-h-screen bg-[#00E5FF] text-black flex flex-col pt-32 pb-24 px-6 overflow-hidden font-sans selection:bg-black selection:text-[#00E5FF] relative">
      {/* Halftone Pattern */}
      <div className="absolute inset-0 opacity-30 mix-blend-multiply pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #000 3px, transparent 4px)', backgroundSize: '24px 24px' }} />

      <div className="max-w-[1400px] mx-auto w-full relative z-10">
        
        <header className="mb-16 bg-white border-[12px] border-black p-8 shadow-[20px_20px_0_#FF0055] relative flex flex-col md:flex-row justify-between items-start md:items-end">
          <div className="absolute -top-10 -left-10 bg-[#FFFF00] p-6 border-[8px] border-black rounded-full shadow-[8px_8px_0_#000] rotate-[-15deg] animate-pulse">
            <Wand2 size={64} className="text-black" />
          </div>

          <div className="ml-16">
            <button 
              onClick={() => setPage('home')}
              className="flex items-center gap-2 font-black uppercase mb-8 text-white bg-black hover:bg-[#00FF66] hover:text-black px-6 py-3 border-[4px] border-black transition-colors w-fit text-sm shadow-[6px_6px_0_#000]"
            >
              <ArrowLeft size={20} /> Back
            </button>
            <h1 className="text-6xl md:text-9xl font-black uppercase leading-[0.8] tracking-tighter" style={{ textShadow: '6px 6px 0 #FFFF00, 12px 12px 0 #000' }}>
              Elemental<br/>Morphism
            </h1>
          </div>

          <div className="bg-black text-[#00E5FF] font-black uppercase px-6 py-3 border-[6px] border-white shadow-[8px_8px_0_#FF0055] transform rotate-3 text-2xl mt-8 md:mt-0 max-w-sm">
            Fluid interfaces that react to your presence with magical physics!
          </div>
        </header>

        {/* UI Grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 w-full mt-24">
          <ElementalCard
            title="Hydro Magic"
            description="Fluid interfaces that flow around interactions like water."
            icon={Droplets}
            primaryColor="bg-[#00E5FF]"
          />
          <ElementalCard
            title="Plasma Zap"
            description="High-energy interactions. Specular highlights track your cursor."
            icon={Zap}
            primaryColor="bg-[#FFFF00]"
          />
          <ElementalCard
            title="Aero Float"
            description="Weightless 3D manipulation. Cards tilt with spring physics."
            icon={Wind}
            primaryColor="bg-[#FF0055]"
          />
        </div>
      </div>
    </div>
  );
}