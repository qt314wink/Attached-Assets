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

  const mass = 2; // Light, bouncy
  const friction = 0.7; // Less friction

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

    const maxTilt = 45; // Extreme tilt for playfulness
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
      className={`relative w-full max-w-[360px] aspect-[4/5] bg-white rounded-[3rem] p-3 cursor-pointer opacity-0 animate-fade-in-up flex flex-col group`}
      style={{
        transform: `perspective(1000px) rotateX(${physicsState.currentX}deg) rotateY(${physicsState.currentY}deg) ${tilt.active ? 'scale3d(1.15, 1.15, 1.15)' : 'scale3d(1, 1, 1)'}`,
        transition: tilt.active ? 'transform 0.1s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        boxShadow: tilt.active ? `0 40px 80px rgba(0,0,0,0.15), 0 20px 40px ${accentColor}40` : `0 20px 40px rgba(0,0,0,0.05)`,
        animationDelay: `${delay}s`,
        animationFillMode: 'forwards'
      }}
    >
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(60px) perspective(1000px) rotateX(30deg) scale(0.9); }
          100% { opacity: 1; transform: translateY(0) perspective(1000px) rotateX(0deg) scale(1); }
        }
      `}</style>
      
      {/* Playful bright glare */}
      <div 
        className="absolute inset-0 rounded-[3rem] pointer-events-none z-20 mix-blend-overlay transition-opacity duration-300"
        style={{
          opacity: tilt.active ? 1 : 0,
          background: `radial-gradient(circle at ${tilt.mouseX}px ${tilt.mouseY}px, rgba(255, 255, 255, 0.9) 0%, transparent 50%)`,
        }}
      />

      {/* Main Image Viewport - Soft rounded */}
      <div className="flex-1 relative overflow-hidden rounded-[2.5rem] mb-4 bg-gray-100" style={{ transform: tilt.active ? 'translateZ(30px)' : 'translateZ(0)', transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
        <img 
          src={imageSrc} 
          className="w-full h-full object-cover filter saturate-150 hue-rotate-15 group-hover:scale-110 transition-transform duration-500" 
          alt="Artifact" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Footer Info - Soft, rounded, bouncy */}
      <div className="px-4 pb-4 flex justify-between items-end" style={{ transform: tilt.active ? 'translateZ(40px)' : 'translateZ(0)', transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
        <div>
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white mb-2" style={{ backgroundColor: accentColor }}>
            Tier {tier}
          </span>
          <h3 className="text-2xl font-black tracking-tight text-gray-900 leading-none">
            {title}
          </h3>
          <p className="text-sm font-medium text-gray-500 mt-1">
            {desc}
          </p>
        </div>
        
        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg transform transition-transform duration-300"
          style={{ backgroundColor: accentColor, scale: tilt.active ? 1.2 : 1 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </div>
      </div>
    </div>
  );
}

export function TactileC_V5() {
  return (
    <div className="min-h-screen bg-[#F0F4F8] overflow-hidden relative flex flex-col items-center justify-center font-sans text-gray-900 p-8 selection:bg-[#FF4D8D] selection:text-white">
      
      {/* Playful Background Elements */}
      <div className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] bg-[#FF4D8D] opacity-10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[80vw] h-[80vw] bg-[#4D8DFF] opacity-10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl flex flex-col lg:flex-row gap-16 items-center justify-center">
        
        {/* Typographic Hero Section - Bouncy & Soft */}
        <div className="flex-1 flex flex-col gap-6 w-full max-w-xl">
          <div className="inline-flex self-start bg-white rounded-full px-5 py-2 font-bold uppercase tracking-widest text-xs text-[#4D8DFF] shadow-sm">
             Module // 04
          </div>
          
          <h1 className="text-[5rem] lg:text-[7rem] font-black tracking-tighter leading-[0.9] text-gray-900">
            Soft <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D8D] to-[#4D8DFF]">Physics.</span>
          </h1>
          
          <p className="text-lg font-medium text-gray-600 mt-2 leading-relaxed bg-white/50 backdrop-blur-sm p-6 rounded-3xl border border-white">
            Interact to feel the underlying physics. The interfaces react with springy, playful responsiveness, emphasizing joy and fluidity over rigidity.
          </p>
        </div>

        {/* Physics Artifacts Showcase */}
        <div className="flex-[1.5] w-full flex flex-col sm:flex-row gap-8 md:gap-12 justify-center lg:justify-end perspective-[2000px]">
          <PhysicsCard 
            title="Gen Alpha"
            tier="1"
            desc="Primary Assembler"
            imageSrc="/images/hero-collage.webp"
            accentColor="#FF4D8D"
            delay={0}
          />
          
          <div className="mt-0 sm:mt-16">
            <PhysicsCard 
              title="Gen Beta"
              tier="2"
              desc="Latent Extractor"
              imageSrc="/images/hero-collage.webp"
              accentColor="#4D8DFF"
              delay={0.15}
            />
          </div>
        </div>
        
      </div>
    </div>
  );
}