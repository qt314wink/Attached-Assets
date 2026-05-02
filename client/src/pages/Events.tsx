import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowRight, Video, Megaphone } from 'lucide-react';

export default function Events({ setPage }: { setPage: (p: string) => void }) {
  const events = [
    { date: "10.24", title: "Neural Synthesis Workshop", type: "Virtual", location: "Global Node" },
    { date: "11.02", title: "Brutalist UX Patterns", type: "Live Stream", location: "Sector 4" },
    { date: "11.15", title: "The Forge: Masterclass", type: "Hybrid", location: "Neo-Tokyo / VR" },
  ];

  return (
    <div className="pt-32 pb-24 px-6 bg-[#FFFF00] text-black min-h-screen relative overflow-hidden font-sans selection:bg-black selection:text-[#FFFF00]">
      {/* Comic Action Lines */}
      <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay">
         <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
            <path d="M50,50 L0,0 M50,50 L100,0 M50,50 L100,100 M50,50 L0,100" stroke="black" strokeWidth="2" vectorEffect="non-scaling-stroke" />
         </svg>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <header className="mb-16 bg-white border-[12px] border-black p-8 shadow-[20px_20px_0_#FF0055] transform -rotate-1 relative">
          <div className="absolute -top-8 -left-8 bg-[#00E5FF] p-4 border-[6px] border-black rounded-full shadow-[8px_8px_0_#000] rotate-[-10deg]">
             <Megaphone size={48} className="text-black" />
          </div>
          <h1 className="text-6xl md:text-9xl font-black uppercase mb-4 leading-none" style={{ textShadow: '6px 6px 0 #00E5FF, 12px 12px 0 #000' }}>
            Transmissions!
          </h1>
          <div className="bg-black text-[#FFFF00] p-4 border-[6px] border-black font-black uppercase text-xl shadow-[8px_8px_0_#00FF66] inline-block transform rotate-2">
            Incoming Signals & Live Events!
          </div>
        </header>
        
        <div className="grid gap-12">
          {events.map((e, i) => (
            <motion.div 
              key={i}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`bg-white border-[8px] border-black p-8 hover:bg-black hover:text-white transition-all group flex flex-col md:flex-row items-start md:items-center justify-between gap-6 cursor-pointer shadow-[12px_12px_0_#000] hover:translate-x-2 hover:translate-y-2 hover:shadow-none ${i % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}
            >
              <div className="flex items-center gap-8">
                <div className="text-6xl font-black text-[#FF0055] bg-black px-4 py-2 border-[4px] border-white shadow-[6px_6px_0_#FF0055] transform rotate-3 group-hover:bg-white group-hover:border-black group-hover:shadow-[6px_6px_0_#00E5FF] transition-all">
                  {e.date}
                </div>
                <div>
                  <h3 className="text-3xl md:text-5xl font-black uppercase mb-4 leading-none">{e.title}</h3>
                  <div className="flex flex-wrap items-center gap-4 mt-2 text-lg font-black uppercase tracking-widest">
                    <span className="flex items-center gap-2 bg-[#00FF66] text-black px-3 py-1 border-[4px] border-black shadow-[4px_4px_0_#000] -rotate-1"><Video size={20}/> {e.type}</span>
                    <span className="flex items-center gap-2 bg-[#00E5FF] text-black px-3 py-1 border-[4px] border-black shadow-[4px_4px_0_#000] rotate-1"><MapPin size={20}/> {e.location}</span>
                  </div>
                </div>
              </div>
              <button className="p-6 border-[6px] border-black bg-[#FFFF00] text-black group-hover:bg-[#FF0055] group-hover:text-white group-hover:scale-110 transition-transform shadow-[6px_6px_0_#000]">
                <ArrowRight size={40} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}