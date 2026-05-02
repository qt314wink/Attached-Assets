import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Activity, Heart, Hand, Eye, Wind, MousePointer2 } from 'lucide-react';

export default function SomaticModule({ setPage }: { setPage: (p: string) => void }) {
  const [somatic, setSomatic] = useState({
    solarPlexusHeat: 10,
    chestOpenness: 10,
    fingertipTingle: 10,
    eyeSoftness: 10
  });

  const [logs, setLogs] = useState<string[]>(["[SYS] SOMATIC SENSORS ONLINE. AWAITING INPUT."]);
  const [phase, setPhase] = useState("ENTRANCE");
  
  const mousePos = useRef({ x: 0, y: 0 });
  const lastMouseTime = useRef(Date.now());
  const isBreathing = useRef(false);

  // Decay over time
  useEffect(() => {
    const interval = setInterval(() => {
      setSomatic(prev => ({
        solarPlexusHeat: Math.max(0, prev.solarPlexusHeat - 1),
        chestOpenness: Math.max(0, prev.chestOpenness - (isBreathing.current ? 0 : 2)),
        fingertipTingle: Math.max(0, prev.fingertipTingle - 2),
        eyeSoftness: Math.max(0, prev.eyeSoftness + (Date.now() - lastMouseTime.current > 2000 ? 2 : -1))
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Breath (Spacebar)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        isBreathing.current = true;
        setSomatic(prev => ({ ...prev, chestOpenness: Math.min(100, prev.chestOpenness + 5) }));
      } else {
        // Typing increases fingertip tingle
        setSomatic(prev => ({ ...prev, fingertipTingle: Math.min(100, prev.fingertipTingle + 5) }));
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') isBreathing.current = false;
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Mouse speed (Heat)
  const handleMouseMove = (e: React.MouseEvent) => {
    const now = Date.now();
    const dt = now - lastMouseTime.current;
    const dx = e.clientX - mousePos.current.x;
    const dy = e.clientY - mousePos.current.y;
    const speed = Math.sqrt(dx*dx + dy*dy) / dt;
    
    if (speed > 2) {
      setSomatic(prev => ({ ...prev, solarPlexusHeat: Math.min(100, prev.solarPlexusHeat + 2) }));
    }
    
    mousePos.current = { x: e.clientX, y: e.clientY };
    lastMouseTime.current = now;
  };

  // Phase logic
  useEffect(() => {
    if (somatic.solarPlexusHeat > 30 && phase === "ENTRANCE") {
      setPhase("HUM");
      addLog("The floor is cool beneath you. Warmth gathers low, behind the navel.");
    }
    if (somatic.chestOpenness > 40 && phase === "HUM") {
      setPhase("OPENING");
      addLog("The walls breathe. Not metaphor—the actual expansion and contraction of a space that has learned your name.");
    }
    if (somatic.fingertipTingle > 50 && phase === "OPENING") {
      setPhase("SPARK");
      addLog("The room anticipates your touch. The air hums with latent static.");
    }
    if (somatic.eyeSoftness > 60 && phase === "SPARK") {
      setPhase("SIGHT");
      addLog(`"Do not pretend you don't remember me." The voice comes from the vent you thought was closed.`);
    }
  }, [somatic, phase]);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, msg]);
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className={`pt-32 pb-24 px-6 min-h-screen relative transition-colors duration-1000 ${phase === 'SIGHT' ? 'bg-[#c4ff00] text-black' : 'bg-black text-white'}`}
    >
      <div className="pixel-grid absolute inset-0 opacity-20 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <button 
          onClick={() => setPage('home')}
          className={`flex items-center gap-2 font-black uppercase mb-12 px-4 py-2 border-2 border-transparent transition-all w-fit ${phase === 'SIGHT' ? 'text-black hover:bg-black hover:text-[#c4ff00]' : 'text-white hover:bg-white hover:text-black'}`}
        >
          <ArrowLeft size={16} /> Back to Systems
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h1 className="kinetic-text text-6xl md:text-8xl uppercase leading-none mb-6">
              SOMATIC<br/>ENGINE
            </h1>
            <div className="flex gap-4 mb-8">
              <span className={`${phase === 'SIGHT' ? 'bg-black text-[#c4ff00]' : 'bg-white text-black'} px-3 py-1 text-[10px] font-black uppercase`}>
                Phase: {phase}
              </span>
            </div>
            
            <p className="text-lg font-bold leading-relaxed mb-8 opacity-70">
              The room learns you. <br/>
              <strong>Action:</strong> Move mouse quickly (Heat). Hold SPACEBAR (Breath/Chest). Type any keys (Fingertip). Stop moving mouse (Eye Softness).
            </p>

            <div className="space-y-4">
              {[
                { label: "Solar Plexus Heat", val: somatic.solarPlexusHeat, desc: "Move mouse quickly to activate", icon: <Activity size={16}/> },
                { label: "Chest Openness", val: somatic.chestOpenness, desc: "Hold SPACEBAR to breathe", icon: <Wind size={16}/> },
                { label: "Fingertip Tingle", val: somatic.fingertipTingle, desc: "Type any keys", icon: <Hand size={16}/> },
                { label: "Eye Softness", val: somatic.eyeSoftness, desc: "Pause mouse movement to soften", icon: <Eye size={16}/> }
              ].map((stat, i) => (
                <div key={i} className={`p-4 border-2 transition-colors ${phase === 'SIGHT' ? 'border-black' : 'border-white/20'}`}>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-3 font-black uppercase text-sm">
                      {stat.icon} {stat.label}
                    </div>
                    <span className="font-mono text-xs">{stat.val.toFixed(0)}%</span>
                  </div>
                  <div className="text-[10px] opacity-50 mb-2 font-bold uppercase">{stat.desc}</div>
                  <div className="w-full h-2 bg-gray-800 overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${phase === 'SIGHT' ? 'bg-black' : 'bg-white'}`} 
                      style={{ width: `${stat.val}%` }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`relative aspect-square brutalist-border border-4 p-8 font-mono text-xs overflow-hidden flex flex-col ${phase === 'SIGHT' ? 'bg-white border-black text-black' : 'bg-[#0f172a] border-white text-[#22d3ee]'}`}>
            <h3 className="font-black uppercase mb-4 border-b border-current pb-2">The Mirror Engine</h3>
            <div className="flex-1 overflow-y-auto space-y-4 custom-scrollbar pr-4">
              <AnimatePresence>
                {logs.map((log, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`leading-relaxed ${log.includes('SYS') ? 'opacity-50' : 'font-bold'}`}
                  >
                    {log}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            {/* Visual indicator of hallway state */}
            <div className="mt-8 h-24 border-2 border-current relative flex items-center justify-center overflow-hidden">
              <motion.div 
                className="absolute inset-y-0 bg-current opacity-10"
                animate={{ 
                  left: `${50 - (somatic.chestOpenness / 2)}%`, 
                  right: `${50 - (somatic.chestOpenness / 2)}%` 
                }}
              />
              <span className="font-black uppercase text-[10px] z-10">Hallway Dimensions</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}