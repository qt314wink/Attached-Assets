import React, { useState, useRef, useEffect } from 'react';
import './_group.css';

interface PhysicsCardProps {
  title: string;
  tier: string;
  desc: string;
  bgColors: string[];
  shadowColor: string;
  delay: number;
}

function PhysicsCard({ title, tier, desc, bgColors, shadowColor, delay }: PhysicsCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rAFRef = useRef<number | null>(null);
  const [tilt, setTilt] = useState({ active: false, mouseX: 0, mouseY: 0 });
  const [physicsState, setPhysicsState] = useState({ currentX: 0, currentY: 0, targetX: 0, targetY: 0 });
  const [glareAngle, setGlareAngle] = useState(0);

  const mass = 5;
  const friction = 0.8;

  useEffect(() => {
    const loop = () => {
      setPhysicsState(prev => {
        const lerpFactor = Math.max(0.01, Math.min(1, 1 / (mass * friction)));
        const dx = prev.targetX - prev.currentX;
        const dy = prev.targetY - prev.currentY;
        return {
          ...prev,
          currentX: prev.currentX + dx * lerpFactor,
          currentY: prev.currentY + dy * lerpFactor
        };
      });
      rAFRef.current = requestAnimationFrame(loop);
    };
    rAFRef.current = requestAnimationFrame(loop);
    return () => {
      if (rAFRef.current) cancelAnimationFrame(rAFRef.current);
    };
  }, [mass, friction]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
    setGlareAngle(angle);

    const maxTilt = 30;
    const targetTiltX = ((y - centerY) / centerY) * -maxTilt;
    const targetTiltY = ((x - centerX) / centerX) * maxTilt;

    setTilt({ active: true, mouseX: x, mouseY: y });
    setPhysicsState(prev => ({ ...prev, targetX: targetTiltX, targetY: targetTiltY }));
  };

  const handleMouseLeave = () => {
    setTilt(prev => ({ ...prev, active: false }));
    setPhysicsState(prev => ({ ...prev, targetX: 0, targetY: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full max-w-[320px] aspect-[3/4] rounded-3xl border-2 overflow-hidden flex flex-col justify-between p-6 cursor-pointer opacity-0 animate-fade-in-up`}
      style={{
        borderColor: shadowColor,
        transform: `perspective(1200px) rotateX(${physicsState.currentX}deg) rotateY(${physicsState.currentY}deg) ${tilt.active ? 'scale3d(1.05, 1.05, 1.05) translateZ(30px)' : 'scale3d(1, 1, 1) translateZ(0)'}`,
        transition: tilt.active ? 'transform 0.1s cubic-bezier(0.25, 0.8, 0.25, 1)' : 'transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)',
        background: `radial-gradient(circle at center, ${bgColors[0]} 0%, ${bgColors[1]} 50%, ${bgColors[2]} 100%)`,
        boxShadow: tilt.active ? `0 20px 60px ${shadowColor}80, inset 0 0 20px ${shadowColor}40` : `0 10px 30px rgba(0,0,0,0.5)`,
        animationDelay: `${delay}s`,
        animationFillMode: 'forwards'
      }}
    >
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(40px) perspective(1200px) rotateX(20deg); }
          100% { opacity: 1; transform: translateY(0) perspective(1200px) rotateX(0deg); }
        }
      `}</style>
      
      {/* Glare */}
      <div 
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          opacity: tilt.active ? 1 : 0,
          transition: 'opacity 0.4s',
          background: `linear-gradient(${glareAngle}deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%)`,
          mixBlendMode: 'color-dodge'
        }}
      />

      <div className="relative z-10" style={{ transform: tilt.active ? 'translateZ(40px)' : 'translateZ(0)', transition: 'transform 0.3s' }}>
        <div className="flex justify-between items-start mb-6">
          <div className="p-3 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 shadow-xl" style={{ color: shadowColor }}>✦</div>
          <span className="text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-white">
            Tier {tier}
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-black/40 backdrop-blur-md border border-white/5">
          <h3 className="text-xl font-black text-white mb-1" style={{ textShadow: `0 0 20px ${shadowColor}80` }}>{title}</h3>
          <p className="text-[10px] font-bold uppercase tracking-wider text-white/80">{desc}</p>
        </div>
      </div>
      
      <div className="relative z-10 mt-auto" style={{ transform: tilt.active ? 'translateZ(50px)' : 'translateZ(0)', transition: 'transform 0.3s' }}>
        <div className="p-4 rounded-2xl bg-black/40 backdrop-blur-md border border-white/5">
           <button className="w-full py-2 bg-white/10 hover:bg-white/20 transition-colors rounded-lg text-white text-xs font-bold uppercase tracking-widest border border-white/10">
             Initialize Artifact
           </button>
        </div>
      </div>
    </div>
  );
}

export function TactileC() {
  return (
    <div className="min-h-screen bg-[#050505] overflow-hidden relative flex flex-col items-center justify-center font-sans text-white p-8">
      
      {/* Background environment */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(75,0,130,0.15)_0%,transparent_60%)]" />
      
      <div className="relative z-10 text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
          The Physics Artifacts
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
          Interfaces that obey the laws of physics. Hover the components to feel the mass, friction, and radiometric tension of Tier 6 and 7 digital entities.
        </p>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center justify-center w-full max-w-5xl">
        <PhysicsCard 
          title="Spectral Graviton Core"
          tier="6"
          desc="Refractive Vortex Synthesis"
          bgColors={['#000000', '#4b0082', '#00ffff']}
          shadowColor="#00ffff"
          delay={0}
        />
        
        <PhysicsCard 
          title="Radiometric Singularity"
          tier="7"
          desc="Isentropic Fluidity Tension"
          bgColors={['#0a0015', '#2a0045', '#010103']}
          shadowColor="#e0f7fa"
          delay={0.2}
        />
      </div>
    </div>
  );
}