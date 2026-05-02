import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowRight, Video } from 'lucide-react';

export default function Events({ setPage }: { setPage: (p: string) => void }) {
  const events = [
    { date: "10.24", title: "Neural Synthesis Workshop", type: "Virtual", location: "Global Node" },
    { date: "11.02", title: "Brutalist UX Patterns", type: "Live Stream", location: "Sector 4" },
    { date: "11.15", title: "The Forge: Masterclass", type: "Hybrid", location: "Neo-Tokyo / VR" },
  ];

  return (
    <div className="pt-32 pb-24 px-6 bg-[#c4ff00] text-black min-h-screen relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <h1 className="kinetic-text text-7xl md:text-9xl mb-12 uppercase border-b-8 border-black pb-4">
          Transmissions
        </h1>
        
        <div className="grid gap-8">
          {events.map((e, i) => (
            <motion.div 
              key={i}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="brutalist-border bg-white p-8 hover:bg-black hover:text-[#c4ff00] transition-all group flex flex-col md:flex-row items-start md:items-center justify-between gap-6 cursor-pointer"
            >
              <div className="flex items-center gap-8">
                <div className="text-5xl font-black">{e.date}</div>
                <div>
                  <h3 className="text-2xl md:text-4xl font-black uppercase">{e.title}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100">
                    <span className="flex items-center gap-1"><Video size={16}/> {e.type}</span>
                    <span className="flex items-center gap-1"><MapPin size={16}/> {e.location}</span>
                  </div>
                </div>
              </div>
              <button className="hidden md:flex p-4 brutalist-border group-hover:bg-[#c4ff00] group-hover:text-black">
                <ArrowRight size={32} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}