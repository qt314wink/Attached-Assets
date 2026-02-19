import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Activity, Command, Lock, Layers, MousePointer2, Upload, Search, File } from 'lucide-react';

export const QuantumToggle = ({ active, onToggle }: { active: boolean; onToggle: (val: boolean) => void }) => (
  <button 
    onClick={() => onToggle(!active)}
    className={`w-14 h-8 rounded-full p-1 transition-all duration-300 ${active ? 'bg-indigo-600 shadow-inner' : 'bg-slate-200 shadow-inner'}`}
  >
    <motion.div 
      layout
      className="w-6 h-6 bg-white rounded-full shadow-md"
      animate={{ x: active ? 24 : 0 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    />
  </button>
);

export const PrismText = ({ text }: { text: string }) => (
  <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 font-black animate-gradient bg-[length:200%_auto] bg-300%">
    {text}
  </span>
);

export const ActiveSonar = () => (
  <span className="relative flex h-3 w-3">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
  </span>
);

export const OmniSearch = () => (
  <div className="bg-white border border-slate-200 rounded-lg shadow-xl overflow-hidden w-64">
    <div className="flex items-center px-3 py-2 border-b border-slate-100">
      <Search size={14} className="text-slate-400 mr-2" />
      <input className="bg-transparent outline-none text-sm w-full placeholder:text-slate-400" placeholder="Type a command..." />
      <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 font-mono">⌘K</span>
    </div>
    <div className="p-1">
       <div className="px-2 py-1.5 hover:bg-slate-50 rounded text-sm flex items-center gap-2 text-slate-600 cursor-pointer">
         <File size={14} /> index.js
       </div>
       <div className="px-2 py-1.5 hover:bg-slate-50 rounded text-sm flex items-center gap-2 text-slate-600 cursor-pointer">
         <Layers size={14} /> styles.css
       </div>
    </div>
  </div>
);

export const SecureEnclave = () => (
  <div className="flex gap-2">
    {[1,2,3,4].map(i => (
      <div key={i} className={`w-10 h-12 flex items-center justify-center rounded border ${i === 3 ? 'border-indigo-500 ring-2 ring-indigo-500/20' : 'border-slate-200 bg-slate-50'}`}>
        {i < 3 ? <div className="w-2 h-2 bg-slate-800 rounded-full" /> : <div className="w-0.5 h-5 bg-indigo-500 animate-pulse" />}
      </div>
    ))}
  </div>
);

export const FluxCapacitor = ({ pct }: { pct: number }) => (
  <div className="relative w-12 h-12">
    <svg className="w-full h-full -rotate-90">
      <circle r="18" cx="24" cy="24" className="stroke-slate-200" strokeWidth="4" fill="none" />
      <motion.circle 
        r="18" cx="24" cy="24" 
        className="stroke-indigo-600" 
        strokeWidth="4" 
        fill="none" 
        strokeDasharray="113" 
        animate={{ strokeDashoffset: 113 - (113 * pct) / 100 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
    </svg>
    <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-slate-700">
      {pct}%
    </div>
  </div>
);

export const Glass = ({ children }: { children: React.ReactNode }) => (
  <div className="backdrop-blur-xl bg-white/40 border border-white/50 rounded-xl p-6 shadow-xl relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
    <div className="relative z-10">{children}</div>
  </div>
);

export const SoftBtn = ({ label }: { label: string }) => (
  <button className="px-6 py-2 bg-slate-100 rounded-xl shadow-[4px_4px_10px_#d1d5db,-4px_-4px_10px_#ffffff] text-slate-700 font-bold active:shadow-inner active:translate-y-[1px] transition-all">
    {label}
  </button>
);

export const GravityDrop = () => (
  <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center text-slate-400 hover:border-indigo-500 hover:text-indigo-500 hover:bg-indigo-50 transition-all cursor-pointer group">
    <Upload className="mb-2 group-hover:-translate-y-1 transition-transform" />
    <span className="text-xs font-bold uppercase tracking-widest">Drop Assets Here</span>
  </div>
);
