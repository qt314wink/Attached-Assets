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

    const maxTilt = 20; // Reduced tilt for a more grounded feel
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
      className={`relative w-full max-w-[380px] aspect-[4/5] bg-[#F5F5F0] border-[12px] border-[#2A2A28] p-4 cursor-pointer opacity-0 animate-fade-in-up flex flex-col group`}
      style={{
        transform: `perspective(1500px) rotateX(${physicsState.currentX}deg) rotateY(${physicsState.currentY}deg) ${tilt.active ? 'scale3d(1.05, 1.05, 1.05) translateZ(30px)' : 'scale3d(1, 1, 1) translateZ(0)'}`,
        transition: tilt.active ? 'transform 0.1s cubic-bezier(0.25, 0.8, 0.25, 1)' : 'transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)',
        boxShadow: tilt.active ? `24px 24px 0px 0px #2A2A28` : `8px 8px 0px 0px #2A2A28`,
        animationDelay: `${delay}s`,
        animationFillMode: 'forwards',
        borderRadius: '2px'
      }}
    >
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(60px) perspective(1500px) rotateX(15deg); }
          100% { opacity: 1; transform: translateY(0) perspective(1500px) rotateX(0deg); }
        }
      `}</style>
      
      {/* Soft, warm glare */}
      <div 
        className="absolute inset-0 pointer-events-none z-20 mix-blend-overlay transition-opacity duration-300"
        style={{
          opacity: tilt.active ? 0.6 : 0,
          background: `radial-gradient(circle at ${tilt.mouseX}px ${tilt.mouseY}px, rgba(255, 250, 240, 0.8) 0%, transparent 60%)`,
        }}
      />

      {/* Structural Headers - Warm & Dense */}
      <div className="flex justify-between items-center mb-4 border-b-[6px] border-[#2A2A28] pb-3" style={{ transform: tilt.active ? 'translateZ(15px)' : 'translateZ(0)', transition: 'transform 0.4s' }}>
        <h3 className="text-3xl font-black uppercase tracking-tighter text-[#2A2A28] leading-none">
          {title}
        </h3>
        <span className="text-base font-bold px-3 py-1 border-[4px] border-[#2A2A28] shadow-[2px_2px_0px_0px_#2A2A28]" style={{ backgroundColor: accentColor, color: '#2A2A28' }}>
          T-{tier}
        </span>
      </div>

      {/* Main Image Viewport - Deep inset */}
      <div className="flex-1 border-[8px] border-[#2A2A28] bg-[#1A1A18] relative overflow-hidden shadow-[inset_0_10px_20px_rgba(0,0,0,0.5)]" style={{ transform: tilt.active ? 'translateZ(25px)' : 'translateZ(0)', transition: 'transform 0.4s' }}>
        <img 
          src={imageSrc} 
          className="w-full h-full object-cover filter sepia-[0.3] contrast-[1.2] group-hover:sepia-0 group-hover:contrast-100 transition-all duration-700 scale-[1.02] group-hover:scale-100 opacity-90 group-hover:opacity-100" 
          alt="Artifact" 
        />
        {/* Analog Label Overlay */}
        <div 
          className="absolute bottom-4 right-4 bg-[#F5F5F0] text-[#2A2A28] font-bold text-sm px-3 py-1 border-[4px] border-[#2A2A28] shadow-[4px_4px_0px_0px_#2A2A28] transform rotate-[-3deg] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ transform: tilt.active ? `rotate(-3deg) translate(${-physicsState.currentY * 0.3}px, ${physicsState.currentX * 0.3}px)` : 'rotate(-3deg) translate(0,0)' }}
        >
          ANALYZING...
        </div>
      </div>

      {/* Footer Info - Chunky */}
      <div className="mt-5" style={{ transform: tilt.active ? 'translateZ(10px)' : 'translateZ(0)', transition: 'transform 0.4s' }}>
        <p className="text-sm font-black uppercase tracking-widest text-[#2A2A28] border-l-[6px] border-[#2A2A28] pl-3 py-1 bg-[#E8E8E0]">
          {desc}
        </p>
      </div>
    </div>
  );
}

export function TactileC_V3() {
  return (
    <div className="min-h-screen bg-[#DEDEC8] overflow-hidden relative flex flex-col items-center justify-center font-sans text-[#2A2A28] p-8 selection:bg-[#2A2A28] selection:text-[#DEDEC8]">
      
      {/* Background warm texture */}
      <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#2A2A28 1px, transparent 1px), linear-gradient(90deg, #2A2A28 1px, transparent 1px)', backgroundSize: '120px 120px', opacity: 0.08 }} />

      <div className="relative z-10 w-full max-w-7xl flex flex-col lg:flex-row gap-16 items-center lg:items-end justify-center">
        
        {/* Typographic Hero Section */}
        <div className="flex-1 flex flex-col gap-6 w-full max-w-xl">
          <div className="inline-flex self-start border-[6px] border-[#2A2A28] px-5 py-2 font-black uppercase tracking-widest text-base bg-[#F5F5F0] shadow-[6px_6px_0px_0px_#2A2A28] transform rotate-[-2deg]">
             Module // 04
          </div>
          
          <h1 className="text-[5.5rem] lg:text-[8rem] font-black uppercase tracking-tighter leading-[0.85] flex flex-col text-[#2A2A28]">
            <span className="transform -rotate-1">Analog</span>
            <span className="bg-[#2A2A28] text-[#F5F5F0] px-5 py-2 self-start transform rotate-1 mt-3">Weight.</span>
          </h1>
          
          <p className="text-xl font-bold border-l-[12px] border-[#E86A33] pl-6 py-3 mt-6 leading-relaxed bg-[#F5F5F0] border-y-[4px] border-r-[4px] border-y-[#2A2A28] border-r-[#2A2A28] shadow-[8px_8px_0px_0px_#2A2A28]">
            Feel the mass. Interfaces constructed with rigid, mechanical physics and deep structural shadows that react to your presence.
          </p>
        </div>

        {/* Physics Artifacts Showcase */}
        <div className="flex-[1.5] w-full flex flex-col sm:flex-row gap-8 md:gap-16 justify-center lg:justify-end perspective-[2000px]">
          <PhysicsCard 
            title="Entity_A"
            tier="01"
            desc="Primary Assembler"
            imageSrc="/images/hero-collage.webp"
            accentColor="#E86A33"
            delay={0}
          />
          
          <div className="mt-0 sm:mt-32">
            <PhysicsCard 
              title="Entity_B"
              tier="02"
              desc="Latent Extractor"
              imageSrc="/images/hero-collage.webp"
              accentColor="#A3B18A"
              delay={0.2}
            />
          </div>
        </div>
        
      </div>
    </div>
  );
}