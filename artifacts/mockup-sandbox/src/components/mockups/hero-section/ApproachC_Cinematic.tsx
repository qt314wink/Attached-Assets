import React from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowRight, Menu } from 'lucide-react';

export function ApproachC_Cinematic() {
  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-hidden relative flex flex-col justify-between p-8 md:p-12">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10" /> {/* Dimming overlay */}
        <img 
          src="/images/hero-collage.webp" 
          alt="Cinematic showcase" 
          className="w-full h-full object-cover object-center scale-105 transform origin-center animate-[slowPan_30s_ease-in-out_infinite_alternate]"
        />
        <style>{`
          @keyframes slowPan {
            0% { transform: scale(1.05) translate(0, 0); }
            100% { transform: scale(1.1) translate(-2%, -2%); }
          }
        `}</style>
      </div>

      {/* Minimal Header */}
      <header className="relative z-20 flex justify-between items-center mix-blend-difference">
        <div className="font-bold tracking-[0.2em] uppercase text-sm">Collective</div>
        <button className="flex items-center gap-2 text-sm uppercase tracking-widest hover:opacity-70 transition-opacity">
          <Menu size={20} /> Menu
        </button>
      </header>

      {/* Centered Cinematic Content */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center text-center max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-6xl md:text-8xl lg:text-[120px] font-light tracking-tighter leading-none mb-6">
            Pure.<br/>Creation.
          </h1>
        </motion.div>

        <motion.p 
          className="text-lg md:text-xl font-light text-white/80 max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          A sanctuary for visual artists. No clutter, no distractions. Just your ideas, manifesting in real-time through powerful generative pipelines.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <button className="bg-white text-black px-8 py-4 rounded-full font-medium tracking-wide flex items-center gap-3 hover:scale-105 transition-transform">
            <Play size={18} fill="currentColor" /> Watch the Film
          </button>
          <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-medium tracking-wide flex items-center gap-3 hover:bg-white/20 transition-colors">
            Explore Platform <ArrowRight size={18} />
          </button>
        </motion.div>
      </div>

      {/* Footer Meta */}
      <footer className="relative z-20 flex justify-between items-end text-xs uppercase tracking-widest text-white/50 mix-blend-difference">
        <div>Volume 01 / Issue 4</div>
        <div className="text-right">Scroll to explore<br/>↓</div>
      </footer>
    </div>
  );
}