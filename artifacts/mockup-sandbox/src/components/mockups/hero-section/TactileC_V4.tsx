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

  const mass = 8; // Heavier
  const friction = 0.9; // More friction

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

    const maxTilt = 15; // Very subtle tilt
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
      className={`relative w-full max-w-[400px] aspect-[4/5] bg-black p-1 cursor-pointer opacity-0 animate-fade-in-up flex flex-col group`}
      style={{
        transform: `perspective(2000px) rotateX(${physicsState.currentX}deg) rotateY(${physicsState.currentY}deg) ${tilt.active ? 'scale3d(1.02, 1.02, 1.02)' : 'scale3d(1, 1, 1)'}`,
        transition: tilt.active ? 'transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)' : 'transform 1s cubic-bezier(0.2, 0.8, 0.2, 1)',
        boxShadow: tilt.active ? `0 30px 60px rgba(0,0,0,0.8)` : `0 10px 30px rgba(0,0,0,0.5)`,
        animationDelay: `${delay}s`,
        animationFillMode: 'forwards'
      }}
    >
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(40px) perspective(2000px); }
          100% { opacity: 1; transform: translateY(0) perspective(2000px); }
        }
      `}</style>

      {/* Very subtle edge highlight instead of bright glare */}
      <div 
        className="absolute inset-0 pointer-events-none z-20 border border-white/10 rounded-sm transition-colors duration-500"
        style={{ borderColor: tilt.active ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)' }}
      />

      {/* Main Image Viewport - Full bleed, quiet */}
      <div className="flex-1 relative overflow-hidden bg-[#0A0A0A]">
        <img 
          src={imageSrc} 
          className="w-full h-full object-cover filter grayscale contrast-125 opacity-40 group-hover:opacity-80 transition-all duration-1000 group-hover:scale-105" 
          alt="Artifact" 
        />
        
        {/* Subtle Overlay Info */}
        <div className="absolute inset-x-6 top-6 flex justify-between items-start z-10" style={{ transform: tilt.active ? 'translateZ(10px)' : 'translateZ(0)', transition: 'transform 0.5s' }}>
          <h3 className="text-sm font-mono tracking-widest text-white/70 uppercase">
            {title}
          </h3>
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: tilt.active ? accentColor : 'rgba(255,255,255,0.2)', transition: 'background-color 0.3s', boxShadow: tilt.active ? `0 0 10px ${accentColor}` : 'none' }} />
        </div>

        <div className="absolute inset-x-6 bottom-6 z-10" style={{ transform: tilt.active ? 'translateZ(15px)' : 'translateZ(0)', transition: 'transform 0.5s' }}>
          <div className="h-[1px] w-full bg-white/20 mb-4 transform origin-left transition-transform duration-700" style={{ scaleX: tilt.active ? 1 : 0.2 }} />
          <div className="flex justify-between items-end">
            <p className="text-[10px] font-mono tracking-[0.2em] text-white/50 uppercase max-w-[200px]">
              {desc}
            </p>
            <span className="text-[10px] font-mono text-white/30">T-{tier}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TactileC_V4() {
  return (
    <div className="min-h-screen bg-[#050505] overflow-hidden relative flex flex-col items-center justify-center font-sans text-white p-8 selection:bg-white/10 selection:text-white">
      
      {/* Background - Deep, quiet noise */}
      <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-screen" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

      <div className="relative z-10 w-full max-w-7xl flex flex-col lg:flex-row gap-20 items-center justify-center h-full">
        
        {/* Typographic Hero Section - Quiet, spaced */}
        <div className="flex-1 flex flex-col gap-8 w-full max-w-lg">
          <div className="text-[10px] font-mono tracking-[0.3em] text-white/40 uppercase">
             SYS.MOD.04 // KINETIC
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-light tracking-tight leading-[1.1] text-white/90">
            Silent <br/>
            <span className="italic text-white/60">Mass.</span>
          </h1>
          
          <p className="text-sm font-mono tracking-wide text-white/40 leading-relaxed max-w-md mt-4">
            Interact to feel the underlying physics. The interfaces react with deliberate slowness, emphasizing digital density over rapid responsiveness.
          </p>
        </div>

        {/* Physics Artifacts Showcase */}
        <div className="flex-[1.5] w-full flex flex-col sm:flex-row gap-6 md:gap-10 justify-center perspective-[2000px]">
          <PhysicsCard 
            title="Gen_Alpha"
            tier="01"
            desc="Primary Collage Assembler"
            imageSrc="/images/hero-collage.webp"
            accentColor="#FFFFFF"
            delay={0}
          />
          
          <div className="mt-0 sm:mt-20">
            <PhysicsCard 
              title="Gen_Beta"
              tier="02"
              desc="Latent Space Extractor"
              imageSrc="/images/hero-collage.webp"
              accentColor="#FFFFFF"
              delay={0.3}
            />
          </div>
        </div>
        
      </div>
    </div>
  );
}