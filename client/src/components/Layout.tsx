import React from 'react';
import { motion } from 'framer-motion';

export const Nav = ({ currentPage, setPage }: { currentPage: string, setPage: (p: string) => void }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-6 mix-blend-difference text-white">
    <div className="text-2xl font-black tracking-tighter cursor-pointer" onClick={() => setPage('home')}>
      COLLECTIVE_OS
    </div>
    
    <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest">
      {['home', 'systems', 'forge', 'events', 'toolkit'].map((p) => (
        <button 
          key={p} 
          onClick={() => setPage(p)}
          className={`relative group ${currentPage === p ? 'text-[#c4ff00]' : 'hover:text-[#c4ff00]'} transition-colors`}
        >
          {p}
          {currentPage === p && (
            <motion.div 
              layoutId="underline" 
              className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#c4ff00]" 
            />
          )}
        </button>
      ))}
    </div>

    <button className="bg-white text-black px-6 py-2 rounded-none text-xs font-black uppercase hover:bg-[#c4ff00] transition-colors border-2 border-transparent hover:border-black">
      Connect
    </button>
  </nav>
);

export const Footer = () => (
  <footer className="bg-black text-white pt-20 pb-10 px-6 overflow-hidden relative">
    <div className="max-w-7xl mx-auto relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-end border-b border-white/20 pb-20">
        <div>
          <h2 className="kinetic-text text-6xl md:text-[8rem] text-white opacity-20 leading-none select-none">
            COLLABORATE
          </h2>
          <div className="mt-12 flex flex-wrap gap-8 text-white font-bold uppercase tracking-widest text-xs">
            {['Newsletter', 'Privacy', 'Terms', 'Twitter', 'Instagram'].map(link => (
              <a key={link} href="#" className="hover:text-[#c4ff00] transition-colors">{link}</a>
            ))}
          </div>
        </div>

        <div className="bg-white p-12 brutalist-border text-black">
          <h3 className="font-black text-3xl uppercase mb-6">Stay In The Loop</h3>
          <div className="flex border-b-2 border-black pb-4">
            <input 
              type="text" 
              placeholder="YOUR@EMAIL.COM" 
              className="bg-transparent flex-1 outline-none font-black placeholder:text-gray-300 text-black uppercase"
            />
            <button className="font-black uppercase text-sm hover:underline">Subscribe</button>
          </div>
        </div>
      </div>
      
      <div className="pt-10 flex justify-between items-center text-[10px] text-white/40 font-bold tracking-widest uppercase">
        <span>© 2026 ART_COLLECTIVE GLOBAL</span>
        <span>EN / GLOBAL</span>
      </div>
    </div>
    
    <div className="absolute bottom-0 left-0 right-0 h-[500px] bg-[url('/texture.png')] opacity-10 pointer-events-none mix-blend-overlay" />
  </footer>
);
