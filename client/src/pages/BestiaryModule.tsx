import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Skull, ShieldBan, EyeOff } from 'lucide-react';

export default function BestiaryModule({ setPage }: { setPage: (p: string) => void }) {
  const distortions = [
    {
      id: "D-01",
      name: "The Invisible Achiever",
      icon: <EyeOff size={32} className="text-[#22d3ee]" />,
      desc: "Every room you entered without leaving evidence. It feeds on your hesitation to claim space.",
      stance: "C) Magnetic pull toward creation (redirect its hunger)"
    },
    {
      id: "D-02",
      name: "The Worthless Engine",
      icon: <Skull size={32} className="text-[#ff6b6b]" />,
      desc: "Materializes when you wait for permission. Not attacking. Waiting.",
      stance: "A) Precise forward step (challenge its territory)"
    },
    {
      id: "D-03",
      name: "Martyr Protocol",
      icon: <ShieldBan size={32} className="text-[#fbbf24]" />,
      desc: "The room will wait. It has always waited. A false shield of self-sacrifice.",
      stance: "B) Chest expansion without apology (deny its fuel)"
    }
  ];

  return (
    <div className="pt-32 pb-24 px-6 bg-[#0f172a] min-h-screen relative text-white overflow-hidden">
      {/* Glitchy background noise */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')] opacity-20 pointer-events-none mix-blend-overlay" />
      <div className="scanline opacity-10" />

      <div className="max-w-6xl mx-auto relative z-10">
        <button 
          onClick={() => setPage('home')}
          className="flex items-center gap-2 font-black uppercase mb-12 text-white hover:text-black hover:bg-white px-4 py-2 border-2 border-transparent hover:border-white transition-all w-fit"
        >
          <ArrowLeft size={16} /> Back to Systems
        </button>

        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[#ff6b6b] font-black uppercase tracking-[0.5em] text-xs block mb-4"
          >
            // THE COMBAT SYSTEM
          </motion.span>
          <h1 className="text-6xl md:text-9xl font-black uppercase italic leading-none mb-6">
            DISTORTION<br/>
            <span className="text-transparent" style={{ WebkitTextStroke: '2px #22d3ee' }}>BESTIARY</span>
          </h1>
          <p className="text-xl font-bold max-w-2xl mx-auto opacity-70">
            When a player encounters their own pattern, they don't fight. They witness. Each defeat unlocks that Distortion as a companion—a recognized part of the arsenal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {distortions.map((d, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bg-black/50 border border-white/10 p-8 backdrop-blur-md hover:bg-black transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ff6b6b] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex justify-between items-start mb-12">
                <div className="p-4 bg-white/5 rounded-full border border-white/10 group-hover:scale-110 transition-transform">
                  {d.icon}
                </div>
                <span className="font-mono text-xs text-gray-500 group-hover:text-white transition-colors">{d.id}</span>
              </div>

              <h3 className="text-2xl font-black uppercase mb-4 text-white group-hover:text-[#22d3ee] transition-colors">{d.name}</h3>
              <p className="text-gray-400 font-bold mb-8 leading-relaxed">
                {d.desc}
              </p>

              <div className="mt-auto pt-6 border-t border-white/10">
                <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Optimal Stance:</div>
                <div className="text-xs font-mono text-[#ff6b6b] bg-[#ff6b6b]/10 p-3">
                  &gt; {d.stance}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}