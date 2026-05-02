import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Cpu, Activity, Database, Lock, Eye, Hand, Heart } from 'lucide-react';

export default function Module({ setPage }: { setPage: (p: string) => void }) {
  return (
    <div className="pt-32 pb-24 px-6 bg-black min-h-screen relative text-white">
      <div className="pixel-grid absolute inset-0 opacity-30 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <button 
          onClick={() => setPage('home')}
          className="flex items-center gap-2 font-black uppercase mb-12 text-white hover:text-[#ff6b6b] hover:bg-white px-4 py-2 border-2 border-transparent hover:border-white transition-all w-fit"
        >
          <ArrowLeft size={16} /> Back to Systems
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h1 className="kinetic-text text-6xl md:text-8xl uppercase leading-none mb-6">
              SOMATIC<br/>ENGINE
            </h1>
            <div className="flex gap-4 mb-8">
              <span className="bg-white text-black px-3 py-1 text-[10px] font-black uppercase">Phase: CANOPY</span>
              <span className="bg-gray-800 text-white px-3 py-1 text-[10px] font-black uppercase flex items-center gap-1"><Lock size={10} /> Sync Active</span>
            </div>
            
            <p className="text-lg font-bold leading-relaxed mb-8 text-gray-400">
              The somatic tracking layer translates physiological states into environmental responses. Space responds to presence—the room learns your height, and the walls soften based on your biological inputs.
            </p>

            <div className="space-y-4">
              {[
                { label: "Solar Plexus Heat", val: "84%", desc: "Activation", icon: <Activity size={16}/> },
                { label: "Chest Openness", val: "62%", desc: "Vulnerability", icon: <Heart size={16}/> },
                { label: "Fingertip Tingle", val: "91%", desc: "Readiness", icon: <Hand size={16}/> },
                { label: "Eye Softness", val: "45%", desc: "Receptivity", icon: <Eye size={16}/> }
              ].map((stat, i) => (
                <div key={i} className="flex justify-between items-center p-4 border-2 border-white font-black uppercase group hover:bg-white hover:text-black transition-colors cursor-default">
                  <div className="flex items-center gap-3">
                    {stat.icon} 
                    <div>
                      <div>{stat.label}</div>
                      <div className="text-[8px] text-gray-500 group-hover:text-gray-800">{stat.desc}</div>
                    </div>
                  </div>
                  <span className="text-[#ff6b6b] bg-black px-2 py-1 text-xs border border-[#ff6b6b] group-hover:border-transparent">{stat.val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative aspect-square brutalist-border bg-[#0f172a] border-4 border-white p-8 text-[#22d3ee] font-mono text-xs overflow-hidden flex flex-col">
            <h3 className="font-black uppercase text-white mb-4 border-b border-white/20 pb-2">The Mirror Engine</h3>
            <div className="flex-1 overflow-hidden relative">
              <motion.div 
                animate={{ y: [0, -400] }} 
                transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                className="space-y-4 opacity-80"
              >
                <div><span className="text-gray-500">[SYS]</span> INITIATING ABRAXAS VOICE CYCLE...</div>
                <div><span className="text-gray-500">[SYS]</span> DETECTING SCROLL KINEMATICS: HESITATION</div>
                <div className="text-[#ff6b6b]">&gt; "Do not pretend you don't remember me."</div>
                <div><span className="text-gray-500">[SYS]</span> DISTORTION REVEAL: THE INVISIBLE ACHIEVER</div>
                <div><span className="text-gray-500">[SYS]</span> Every room you entered without leaving evidence.</div>
                <div><span className="text-gray-500">[SYS]</span> WAITING FOR SOMATIC SHIFT...</div>
                <div className="text-white">&gt; Player chest expansion detected.</div>
                <div><span className="text-gray-500">[SYS]</span> ACHIEVEMENT UNLOCKED: RECOGNIZED</div>
                <div><span className="text-gray-500">[SYS]</span> INITIATING BRONZE BELL CORRIDOR...</div>
                <div><span className="text-gray-500">[SYS]</span> HALLWAY GROWN 0.25 INCHES.</div>
                <div><span className="text-gray-500">[SYS]</span> DISTORTION REVEAL: MARTYR PROTOCOL</div>
                <div className="text-[#ff6b6b]">&gt; "The room will wait. It has always waited."</div>
                <div><span className="text-gray-500">[SYS]</span> WAITING FOR INPUT...</div>
              </motion.div>
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0f172a] to-transparent" />
            </div>
            <div className="mt-4 pt-4 border-t border-white/20 flex items-center gap-2">
              <div className="w-3 h-3 bg-[#ff6b6b] rounded-full animate-pulse" />
              AWAITING_RECOGNITION
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}