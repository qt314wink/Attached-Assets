import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Droplets, Zap, Wind, ArrowLeft, Activity } from 'lucide-react';

// --- Web Audio API Sound Synthesizer ---
let audioCtx: AudioContext | undefined;
const playSound = (type: 'hover' | 'down' | 'up') => {
  if (typeof window === 'undefined') return;
  if (!audioCtx) audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  if (audioCtx.state === 'suspended') audioCtx.resume();

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  const now = audioCtx.currentTime;

  if (type === 'hover') {
    osc.type = 'sine';
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.1);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.03, now + 0.05);
    gain.gain.linearRampToValueAtTime(0, now + 0.2);
    osc.start(now);
    osc.stop(now + 0.2);
  } else if (type === 'down') {
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(100, now + 0.1);
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    osc.start(now);
    osc.stop(now + 0.1);
  } else if (type === 'up') {
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.4);
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
    osc.start(now);
    osc.stop(now + 0.4);
  }
};

const ElementalCard = ({ title, description, icon: Icon, primaryColor, secondaryColor }: any) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number; size: number }[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  const normX = useMotionValue(0);
  const normY = useMotionValue(0);
  const lightX = useMotionValue(-1000);
  const lightY = useMotionValue(-1000);
  const hoverState = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(normX, springConfig);
  const smoothY = useSpring(normY, springConfig);

  const rotateX = useTransform(smoothY, [-1, 1], [12, -12]);
  const rotateY = useTransform(smoothX, [-1, 1], [-12, 12]);

  const backgroundLight = useTransform(
    [lightX, lightY, hoverState],
    ([x, y, hover]) => `radial-gradient(800px circle at ${x}px ${y}px, rgba(255,255,255,0.1), transparent 40%)`
  );

  const innerGlow = useTransform(
    [lightX, lightY],
    ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, ${secondaryColor}, transparent 40%)`
  );

  useEffect(() => {
    hoverState.set(isHovered ? 1 : 0);
  }, [isHovered, hoverState]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    lightX.set(x);
    lightY.set(y);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    normX.set((x - centerX) / centerX);
    normY.set((y - centerY) / centerY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    playSound('hover');
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    normX.set(0);
    normY.set(0);
    lightX.set(-1000);
    lightY.set(-1000);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    playSound('down');
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = { id: Date.now(), x, y, size: Math.max(rect.width, rect.height) * 2 };
    setRipples((prev) => [...prev, newRipple]);
  };

  const handleMouseUp = () => {
    playSound('up');
  };

  const handleRippleComplete = (id: number) => {
    setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileTap={{ scale: 0.94 }}
      className="relative overflow-hidden rounded-3xl cursor-pointer border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl transition-shadow duration-300 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] h-[400px]"
    >
      {/* Specular Highlight tracking the cursor */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none mix-blend-screen transition-opacity duration-300"
        style={{ background: backgroundLight, opacity: isHovered ? 1 : 0 }}
      />

      {/* Deep Elemental Glow tracking the cursor */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none mix-blend-overlay transition-opacity duration-300"
        style={{ background: innerGlow, opacity: isHovered ? 0.6 : 0 }}
      />

      {/* Ripple Container */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden rounded-3xl">
        <AnimatePresence>
          {ripples.map((ripple) => (
            <motion.div
              key={ripple.id}
              initial={{ scale: 0, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              onAnimationComplete={() => handleRippleComplete(ripple.id)}
              className="absolute rounded-full mix-blend-screen"
              style={{
                background: `radial-gradient(circle, ${primaryColor} 0%, transparent 70%)`,
                width: ripple.size,
                height: ripple.size,
                left: ripple.x - ripple.size / 2,
                top: ripple.y - ripple.size / 2,
              }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Card Content with 3D Parallax */}
      <div
        className="relative z-20 p-8 flex flex-col justify-end h-full gap-4 pointer-events-none"
        style={{ transform: "translateZ(40px)" }}
      >
        <div
          className="p-3 rounded-2xl bg-white/10 border border-white/5 shadow-inner w-fit mb-auto"
          style={{ color: primaryColor }}
        >
          <Icon size={32} strokeWidth={1.5} />
        </div>
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent mb-2">
            {title}
          </h2>
          <p className="text-slate-400 font-light leading-relaxed text-sm">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default function ElementalmorphismModule({ setPage }: { setPage: (p: string) => void }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleGlobalMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleGlobalMove);
    return () => window.removeEventListener('mousemove', handleGlobalMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#050508] text-slate-100 flex flex-col pt-32 pb-24 px-6 overflow-hidden perspective-[1200px] font-sans selection:bg-[#00f2fe]/30 relative">
      <div className="max-w-6xl mx-auto w-full relative z-10">
        <button 
          onClick={() => setPage('home')}
          className="flex items-center gap-2 font-black uppercase mb-12 text-slate-500 hover:text-white transition-colors w-fit text-sm tracking-widest"
        >
          <ArrowLeft size={16} /> Return to Nexus
        </button>

        <header className="mb-16">
          <span className="text-[#00f2fe] font-black uppercase tracking-[0.3em] text-xs block mb-4">
            // PROCEDURAL ILLUSIONS & AUDIO
          </span>
          <h1 className="text-5xl md:text-7xl font-black uppercase leading-none mb-6 tracking-tighter">
            Elementalmorphism
          </h1>
          <p className="text-xl font-medium max-w-2xl text-slate-400">
            Fluid interfaces that react to your presence with Web Audio procedural synthesis and Framer Motion 3D physics.
          </p>
        </header>

        {/* Global Ambient Aura */}
        <motion.div
          className="fixed w-[60vw] h-[60vw] rounded-full mix-blend-screen pointer-events-none z-0 opacity-20 blur-[120px]"
          animate={{
            x: mousePos.x - (typeof window !== 'undefined' ? window.innerWidth / 2 : 500),
            y: mousePos.y - (typeof window !== 'undefined' ? window.innerHeight / 2 : 500),
          }}
          transition={{ type: "tween", ease: "easeOut", duration: 2 }}
          style={{
            background: 'radial-gradient(circle, #00f2fe 0%, transparent 60%)',
          }}
        />

        {/* UI Grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
          <ElementalCard
            title="Hydro Dynamics"
            description="Fluid interfaces that react to your presence. The water element flows around your interactions, featuring procedural sound design."
            icon={Droplets}
            primaryColor="#00f2fe"
            secondaryColor="#4facfe"
          />
          <ElementalCard
            title="Plasma State"
            description="High-energy interactions. Watch the framer-motion powered specular highlights track your cursor with absolute zero latency."
            icon={Zap}
            primaryColor="#fdfbfb"
            secondaryColor="#ebedee"
          />
          <ElementalCard
            title="Aero Physics"
            description="Weightless 3D manipulation. Cards tilt and respond with realistic spring physics, like physical objects suspended in mid-air."
            icon={Wind}
            primaryColor="#a18cd1"
            secondaryColor="#fbc2eb"
          />
        </div>
      </div>
    </div>
  );
}
