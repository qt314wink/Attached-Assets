import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Database, Sparkles, Activity } from 'lucide-react';

const EsotericCard = ({ element, title, description, colors, isSingularity = false }: any) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 100, mass: 1 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(springY, y => {
    if (!cardRef.current) return 0;
    const h = cardRef.current.offsetHeight;
    return ((y - h / 2) / (h / 2)) * (isSingularity ? 15 : -15);
  });
  const rotateY = useTransform(springX, x => {
    if (!cardRef.current) return 0;
    const w = cardRef.current.offsetWidth;
    return ((x - w / 2) / (w / 2)) * (isSingularity ? -15 : 15);
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const prismaticGlow = useMotionTemplate`radial-gradient(600px circle at ${springX}px ${springY}px, ${colors[0]}80, transparent 50%)`;
  const singularityShadow = useMotionTemplate`radial-gradient(400px circle at ${springX}px ${springY}px, black 0%, transparent 80%)`;

  return (
    <motion.div
      ref={cardRef} 
      onMouseMove={handleMouseMove} 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
      whileTap={{ scale: isSingularity ? 0.95 : 1.02 }}
      style={{
        rotateX, rotateY, transformPerspective: 1200,
        borderColor: isHovered ? colors[0] : 'rgba(255,255,255,0.05)',
        boxShadow: isHovered ? `0 20px 50px -10px ${colors[0]}40, inset 0 0 20px ${colors[0]}20` : '0 10px 30px -10px rgba(0,0,0,0.5)',
      }}
      className="relative p-8 h-[400px] w-full flex flex-col justify-end overflow-hidden cursor-pointer bg-white/5 border rounded-3xl transition-all duration-700"
    >
      <div className="absolute inset-0 backdrop-blur-xl z-0 pointer-events-none" />

      {!isSingularity && (
        <motion.div style={{ background: prismaticGlow, opacity: isHovered ? 1 : 0 }} className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10 mix-blend-color-dodge filter brightness-150" />
      )}
      
      {isSingularity && (
        <motion.div style={{ background: singularityShadow }} className="absolute inset-0 pointer-events-none z-10 mix-blend-multiply opacity-100" />
      )}

      <motion.div
        style={{ zIndex: 20 }} className="relative pointer-events-none flex flex-col h-full"
        animate={{ translateZ: isHovered ? 60 : 0 }} transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <h2 className="text-3xl font-black mb-4 text-transparent bg-clip-text uppercase tracking-widest" style={{ backgroundImage: `linear-gradient(135deg, #fff, ${colors[0]})` }}>
          {title}
        </h2>
        <p className="text-white/70 font-medium leading-relaxed text-sm mb-4 flex-grow">{description}</p>
      </motion.div>
    </motion.div>
  );
};

const InteractiveGrowthChart = () => {
  const dataGrounded = [5, 12, 25, 45, 75, 119];
  const dataOptimistic = [15, 45, 120, 250, 400, 597];
  const maxVal = 600;
  
  return (
    <div className="w-full h-80 bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden backdrop-blur-xl shadow-2xl">
      <h3 className="text-xl font-bold text-white mb-2 tracking-tight flex items-center gap-2"><Activity size={18} className="text-cyan-400" /> Triangulated Forecast</h3>
      <p className="text-white/50 text-sm mb-6">Optimistic vs Grounded ARR Modeling</p>
      
      <div className="absolute inset-0 top-24 bottom-10 left-10 right-10 flex items-end gap-4">
        {dataOptimistic.map((val, i) => (
          <div key={i} className="flex-1 flex flex-col justify-end items-center h-full relative group">
            {/* Optimistic Bar */}
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${(val / maxVal) * 100}%` }}
              transition={{ duration: 1.5, delay: i * 0.1, type: "spring" }}
              className="w-full bg-gradient-to-t from-cyan-500/20 to-cyan-400/80 rounded-t-lg relative flex justify-center cursor-pointer hover:brightness-125 transition-all"
            >
              <div className="opacity-0 group-hover:opacity-100 absolute -top-10 bg-black/80 px-3 py-1 rounded text-xs text-cyan-300 font-mono whitespace-nowrap transition-opacity border border-white/10 pointer-events-none z-20">
                Opt: {val}
              </div>
            </motion.div>
            
            {/* Grounded Bar */}
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${(dataGrounded[i] / maxVal) * 100}%` }}
              transition={{ duration: 1.5, delay: 0.5 + i * 0.1, type: "spring" }}
              className="absolute bottom-0 w-3/4 bg-gradient-to-t from-purple-600/40 to-purple-500/90 rounded-t-md pointer-events-none"
            >
              <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 px-2 py-1 rounded text-xs text-purple-300 font-mono whitespace-nowrap transition-opacity border border-white/10">
                Gnd: {dataGrounded[i]}
              </div>
            </motion.div>
          </div>
        ))}
      </div>
      
      {/* Grid Lines */}
      <div className="absolute inset-0 top-24 bottom-14 left-10 right-10 pointer-events-none flex flex-col justify-between">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="w-full border-b border-white/5 h-0" />
        ))}
      </div>
    </div>
  );
};

export default function ElementalmorphismModule({ setPage }: { setPage: (p: string) => void }) {
  return (
    <div className="pt-32 pb-24 px-6 bg-[#09090b] min-h-screen relative text-slate-200 font-sans">
      <div className="max-w-6xl mx-auto relative z-10">
        <button 
          onClick={() => setPage('home')}
          className="flex items-center gap-2 font-black uppercase mb-12 text-slate-500 hover:text-white transition-colors w-fit text-sm tracking-widest"
        >
          <ArrowLeft size={16} /> Return to Nexus
        </button>

        <header className="mb-16">
          <span className="text-cyan-400 font-black uppercase tracking-[0.3em] text-xs block mb-4">
            // PROCEDURAL ILLUSIONS
          </span>
          <h1 className="text-5xl md:text-7xl font-black uppercase leading-none mb-6 tracking-tighter">
            Elementalmorphism
          </h1>
          <p className="text-xl font-medium max-w-2xl text-slate-400">
            Fusing 3D spatial transforms with esoteric data visualization. Hover over the cards to experience kinetic lighting calculations and procedural physics.
          </p>
        </header>

        <div className="space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <EsotericCard 
              element="prismatic-cinder"
              title="Prismatic Cinder"
              description="A manifestation of raw creative energy. The lighting algorithm utilizes a color-dodge mix blend mode mapped to a spring-damped pointer coordinate system."
              colors={['#ff4b1f']}
            />
            <EsotericCard 
              element="singularity"
              title="The Singularity"
              description="An inversion of light physics. Rather than casting illumination, this component calculates a spatial void that pulls the z-axis away from the observer."
              colors={['#8b5cf6']}
              isSingularity={true}
            />
          </div>

          <div className="pt-8">
            <InteractiveGrowthChart />
          </div>
        </div>
      </div>
    </div>
  );
}