import React, { useState, useRef, useEffect } from 'react';
import './_group.css';
import { Fingerprint, Zap, Combine, Orbit } from 'lucide-react';

interface PhysicsCardProps {
  title: string;
  tier: string;
  desc: string;
  bgColors: string[];
  shadowColor: string;
  delay: number;
  icon: React.ReactNode;
}

function PhysicsCard({ title, tier, desc, bgColors, shadowColor, delay, icon }: PhysicsCardProps) {
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

    const maxTilt = 25;
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
      className={`relative w-full max-w-[340px] aspect-[3/4] border-4 overflow-hidden flex flex-col justify-between p-8 cursor-pointer opacity-0 animate-fade-in-up bg-black group`}
      style={{
        borderColor: shadowColor,
        transform: `perspective(1200px) rotateX(${physicsState.currentX}deg) rotateY(${physicsState.currentY}deg) ${tilt.active ? 'scale3d(1.05, 1.05, 1.05) translateZ(40px)' : 'scale3d(1, 1, 1) translateZ(0)'}`,
        transition: tilt.active ? 'transform 0.1s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.3s' : 'transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.6s',
        boxShadow: tilt.active ? `30px 30px 0px 0px ${shadowColor}` : `12px 12px 0px 0px rgba(255,255,255,0.1)`,
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
      
      {/* Glare effect */}
      <div 
        className="absolute inset-0 pointer-events-none z-20 mix-blend-screen"
        style={{
          opacity: tilt.active ? 0.8 : 0,
          transition: 'opacity 0.4s',
          background: `linear-gradient(${glareAngle}deg, rgba(255,255,255,0) 0%, ${shadowColor} 50%, rgba(255,255,255,0) 100%)`,
        }}
      />
      
      {/* Brutalist Grid Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none z-0" style={{ backgroundImage: `linear-gradient(${shadowColor} 1px, transparent 1px), linear-gradient(90deg, ${shadowColor} 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />

      <div className="relative z-10" style={{ transform: tilt.active ? 'translateZ(30px)' : 'translateZ(0)', transition: 'transform 0.3s' }}>
        <div className="flex justify-between items-start mb-10">
          <div className="p-3 bg-white text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,0.5)]">
            {icon}
          </div>
          <div className="text-xs font-black tracking-widest uppercase px-4 py-2 border-2 border-white bg-black text-white group-hover:bg-white group-hover:text-black transition-colors">
            Tier {tier}
          </div>
        </div>
        
        <div>
          <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-2 leading-none" style={{ textShadow: tilt.active ? `4px 4px 0px ${shadowColor}` : 'none', transition: 'text-shadow 0.3s' }}>
            {title}
          </h3>
          <div className="w-12 h-2 bg-white mb-4" style={{ backgroundColor: shadowColor }} />
          <p className="text-sm font-bold uppercase tracking-wider text-gray-400 font-mono">
            {desc}
          </p>
        </div>
      </div>
      
      <div className="relative z-10 mt-auto" style={{ transform: tilt.active ? 'translateZ(50px)' : 'translateZ(0)', transition: 'transform 0.3s' }}>
        <button className="w-full py-4 bg-transparent hover:bg-white hover:text-black transition-colors text-white text-sm font-black uppercase tracking-widest border-4 border-white flex justify-between items-center px-6">
          <span>Initialize</span>
          <Zap size={16} />
        </button>
      </div>
    </div>
  );
}

export function TactileC_V1() {
  return (
    <div className="min-h-screen bg-[#111] overflow-hidden relative flex flex-col items-center justify-center font-sans text-white p-8">
      
      <div className="relative z-10 flex flex-col items-center mb-20 w-full max-w-5xl">
        <div className="flex items-center gap-4 mb-6 border-4 border-[#CCFF00] px-6 py-2 bg-black text-[#CCFF00] font-black uppercase tracking-widest shadow-[8px_8px_0px_0px_#CCFF00]">
          <Fingerprint /> Tactical Physics Engine
        </div>
        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-6 text-center leading-[0.8] text-white" style={{ textShadow: '8px 8px 0px rgba(255,255,255,0.1)' }}>
          Physical <br/> Artifacts.
        </h1>
        <p className="text-xl font-bold font-mono text-gray-400 max-w-2xl text-center border-l-8 border-[#33CCFF] pl-6 py-2">
          Interfaces that obey the laws of physics. Hover the components to feel the mass, friction, and tension of digital entities.
        </p>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row gap-12 lg:gap-24 items-center justify-center w-full max-w-6xl perspective-[2000px]">
        <PhysicsCard 
          title="Spectral Core"
          tier="06"
          desc="Refractive Vortex Synthesis Module"
          bgColors={['#000000', '#000000', '#000000']}
          shadowColor="#33CCFF"
          delay={0}
          icon={<Orbit size={24} />}
        />
        
        <PhysicsCard 
          title="Isentropic Node"
          tier="07"
          desc="Radiometric Fluidity Tension"
          bgColors={['#000000', '#000000', '#000000']}
          shadowColor="#FF3366"
          delay={0.2}
          icon={<Combine size={24} />}
        />
      </div>
    </div>
  );
}