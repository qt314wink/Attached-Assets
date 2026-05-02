import React, { useState, useRef, useEffect } from 'react';
import './_group.css';

interface PhysicsCardProps {
  title: string;
  tier: string;
  desc: string;
  imageSrc: string;
  accentColor: string;
  delay: number;
}

function PhysicsCard({ title, tier, desc, imageSrc, accentColor, delay }: PhysicsCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rAFRef = useRef<number | null>(null);
  const [tilt, setTilt] = useState({ active: false, mouseX: 0, mouseY: 0 });
  const [physicsState, setPhysicsState] = useState({ currentX: 0, currentY: 0, targetX: 0, targetY: 0 });

  const mass = 4;
  const friction = 0.85;

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

    const maxTilt = 35;
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
      className={`relative w-full max-w-[380px] aspect-[4/5] bg-white border-8 border-black p-4 cursor-pointer opacity-0 animate-fade-in-up flex flex-col group`}
      style={{
        transform: `perspective(1000px) rotateX(${physicsState.currentX}deg) rotateY(${physicsState.currentY}deg) ${tilt.active ? 'scale3d(1.1, 1.1, 1.1) translateZ(50px)' : 'scale3d(1, 1, 1) translateZ(0)'}`,
        transition: tilt.active ? 'transform 0.1s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.2s' : 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.5s',
        boxShadow: tilt.active ? `40px 40px 0px 0px rgba(0,0,0,1)` : `16px 16px 0px 0px rgba(0,0,0,1)`,
        animationDelay: `${delay}s`,
        animationFillMode: 'forwards'
      }}
    >
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(60px) perspective(1000px) rotateX(25deg); }
          100% { opacity: 1; transform: translateY(0) perspective(1000px) rotateX(0deg); }
        }
      `}</style>
      
      {/* Structural Headers */}
      <div className="flex justify-between items-center mb-4 border-b-4 border-black pb-2" style={{ transform: tilt.active ? 'translateZ(20px)' : 'translateZ(0)', transition: 'transform 0.3s' }}>
        <h3 className="text-2xl font-black uppercase tracking-tighter text-black">
          {title}
        </h3>
        <span className="text-sm font-bold font-mono px-2 py-1 border-2 border-black" style={{ backgroundColor: accentColor }}>
          T_{tier}
        </span>
      </div>

      {/* Main Image Viewport */}
      <div className="flex-1 border-4 border-black bg-black relative overflow-hidden group-hover:p-0 p-2 transition-all duration-300" style={{ transform: tilt.active ? 'translateZ(40px)' : 'translateZ(0)', transition: 'transform 0.3s, padding 0.3s' }}>
        <img 
          src={imageSrc} 
          className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100" 
          alt="Artifact" 
        />
        {/* Parallax Overlay Info */}
        <div 
          className="absolute bottom-4 left-4 bg-white text-black font-mono text-xs font-bold px-3 py-1 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ transform: tilt.active ? `translate(${-physicsState.currentY * 0.5}px, ${physicsState.currentX * 0.5}px)` : 'translate(0,0)' }}
        >
          [ EXTRACTING DATA ]
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-4 flex flex-col gap-2" style={{ transform: tilt.active ? 'translateZ(20px)' : 'translateZ(0)', transition: 'transform 0.3s' }}>
        <div className="w-full h-2 border-y-2 border-black" style={{ backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 2px, black 2px, black 4px)` }} />
        <p className="text-xs font-bold uppercase tracking-wider text-black font-mono">
          {desc}
        </p>
      </div>
    </div>
  );
}

export function TactileC_V2() {
  return (
    <div className="min-h-screen bg-[#e0e0e0] overflow-hidden relative flex flex-col items-center justify-center font-sans text-black p-8 selection:bg-black selection:text-white">
      
      {/* Background brutalist grid */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(black 2px, transparent 2px), linear-gradient(90deg, black 2px, transparent 2px)', backgroundSize: '120px 120px', opacity: 0.05 }} />

      <div className="relative z-10 w-full max-w-7xl flex flex-col lg:flex-row gap-16 items-center lg:items-end justify-center">
        
        {/* Typographic Hero Section */}
        <div className="flex-1 flex flex-col gap-6 w-full max-w-xl">
          <div className="inline-flex self-start border-4 border-black px-4 py-2 font-black uppercase tracking-widest text-sm bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
             System Module 04
          </div>
          
          <h1 className="text-[5rem] lg:text-[7rem] font-black uppercase tracking-tighter leading-[0.8] flex flex-col">
            <span className="transform -rotate-2">Tactile</span>
            <span className="bg-black text-white px-4 py-2 self-start transform rotate-1 mt-2">Physics.</span>
          </h1>
          
          <p className="text-xl font-bold border-l-[12px] border-[#CCFF00] pl-6 py-2 mt-4 font-mono leading-relaxed">
            Hover over the artifacts to experience digital mass. The interfaces react with rigid spring physics and deep structural shadows.
          </p>
        </div>

        {/* Physics Artifacts Showcase */}
        <div className="flex-[1.5] w-full flex flex-col sm:flex-row gap-8 md:gap-12 justify-center lg:justify-end perspective-[2000px]">
          <PhysicsCard 
            title="Gen_Alpha"
            tier="01"
            desc="Primary Collage Assembler"
            imageSrc="/images/hero-collage.webp"
            accentColor="#FF3366"
            delay={0}
          />
          
          <div className="mt-0 sm:mt-24">
            <PhysicsCard 
              title="Gen_Beta"
              tier="02"
              desc="Latent Space Extractor"
              imageSrc="/images/hero-collage.webp"
              accentColor="#33CCFF"
              delay={0.2}
            />
          </div>
        </div>
        
      </div>
    </div>
  );
}