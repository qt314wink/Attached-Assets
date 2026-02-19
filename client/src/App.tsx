import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, ArrowRight, ShieldCheck, Layers, Cpu, 
  Terminal, Database, Activity, Code2, Box,
  ChevronRight, Monitor, Share2, Download, RefreshCcw, Loader2, Globe, Clock, Video,
  AlertTriangle, Fingerprint
} from 'lucide-react';
import { Nav, Footer } from '@/components/Layout';
import Home from './pages/Home';

const GLITCH_VARIANTS = {
  initial: { skew: 0, x: 0 },
  animate: { 
    skew: [0, -5, 5, -2, 0],
    x: [0, 2, -2, 1, 0],
    transition: { 
      duration: 0.2, 
      repeat: Infinity, 
      repeatType: "mirror" as const,
      repeatDelay: Math.random() * 5
    }
  }
};

// --- Page Components with Crunchy Interactions ---

const ForgePage = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState<string | null>(null);
  const [glitch, setGlitch] = useState(false);

  const handleForge = () => {
    if (!prompt) return;
    setLoading(true);
    setGlitch(true);
    setTimeout(() => {
      setImg("/hero-art.png");
      setLoading(false);
      setGlitch(false);
    }, 1800);
  };

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen bg-white relative overflow-hidden">
      <div className="pixel-grid absolute inset-0 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        <motion.div 
          className="lg:col-span-4 space-y-8"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <div className="brutalist-border bg-black text-white p-8 group overflow-hidden">
            <h1 className="kinetic-text text-6xl mb-4 group-hover:skew-x-6 transition-transform">The Forge</h1>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#c4ff00] animate-pulse" />
              <p className="text-[10px] font-black uppercase tracking-widest text-[#c4ff00]">Neural Asset Generator // v4.0.1</p>
            </div>
          </div>

          <div className="bg-white p-8 brutalist-border space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black uppercase flex items-center gap-1">
                  <Fingerprint size={12} /> Latent Input
                </label>
                <span className="text-[8px] font-mono opacity-30">HEX_AUTH_0x44</span>
              </div>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="PROMPT_00: Shattered geometry, digital rust..."
                className="w-full h-32 bg-gray-50 border-2 border-black p-4 outline-none font-bold uppercase resize-none text-sm focus:bg-white transition-colors"
              />
            </div>
            
            <button 
              onClick={handleForge}
              disabled={loading}
              className="crunchy-btn w-full bg-black text-white py-4 font-black uppercase flex items-center justify-center gap-4 hover:bg-[#c4ff00] hover:text-black transition-all active:scale-95 group"
            >
              {loading ? <RefreshCcw className="animate-spin" /> : <Zap className="group-hover:fill-current" />}
              {loading ? "Synthesizing..." : "Initiate Forge"}
            </button>
          </div>

          <div className="brutalist-border bg-[#ff6b6b] p-6 text-black">
            <h3 className="font-black uppercase text-xs mb-4 flex items-center gap-2">
              <AlertTriangle size={14} /> System Stability
            </h3>
            <div className="space-y-4">
              {['ENTROPY', 'LATENCY', 'COHERENCE'].map(label => (
                <div key={label} className="space-y-1">
                  <div className="flex justify-between text-[8px] font-black uppercase">
                    <span>{label}</span>
                    <span>{Math.floor(Math.random() * 100)}%</span>
                  </div>
                  <div className="w-full h-1 bg-black/20"><div className="w-3/4 h-full bg-black" /></div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="lg:col-span-8">
          <motion.div 
            className={`relative aspect-video brutalist-border bg-black overflow-hidden group ${glitch ? 'animate-pulse' : ''}`}
            variants={GLITCH_VARIANTS}
            animate={glitch ? "animate" : "initial"}
          >
            <div className="scanline" />
            {!img && !loading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white/10">
                <Monitor className="w-24 h-24 mb-4 stroke-[0.5]" />
                <span className="font-black uppercase tracking-[1em] text-xs">Waiting for Signal</span>
              </div>
            )}
            
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white">
                 <div className="text-center">
                    <div className="w-16 h-16 border-8 border-black border-t-[#c4ff00] animate-spin mb-4" />
                    <p className="kinetic-text text-2xl">MAPPING_VOID</p>
                 </div>
              </div>
            )}

            {img && !loading && (
              <motion.div initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} className="h-full w-full relative">
                <img src={img} className="w-full h-full object-cover grayscale contrast-125" alt="Generated art" />
                <div className="absolute inset-0 bg-[url('/crunchy-texture.png')] opacity-20 pointer-events-none mix-blend-overlay" />
                <div className="absolute top-6 left-6 bg-[#c4ff00] text-black px-4 py-2 font-black uppercase text-xs brutalist-border">
                  ASSET_ID: {Math.random().toString(16).slice(2, 8).toUpperCase()}
                </div>
                <div className="absolute bottom-6 right-6 flex gap-2">
                  <button className="p-4 bg-white brutalist-border !shadow-none hover:bg-[#22d3ee] transition-all"><Download size={20}/></button>
                  <button className="p-4 bg-white brutalist-border !shadow-none hover:bg-[#ff6b6b] transition-all"><Share2 size={20}/></button>
                </div>
              </motion.div>
            )}
          </motion.div>
          
          <div className="mt-8 grid grid-cols-4 gap-4">
             {[1,2,3,4].map(i => (
               <motion.div 
                 key={i} 
                 whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 2 : -2 }}
                 className="aspect-square bg-gray-50 border-2 border-black border-dashed flex items-center justify-center hover:bg-white transition-all cursor-crosshair opacity-30 hover:opacity-100"
               >
                 <RefreshCcw className="text-black w-6 h-6" />
               </motion.div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const SystemsPage = () => (
  <div className="pt-32 pb-24 px-6 bg-[#0f172a] text-[#fef3c7] min-h-screen relative overflow-hidden">
    <div className="crunchy-overlay" />
    <div className="max-w-7xl mx-auto relative z-10">
      <div className="mb-20">
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[#a3e635] font-black uppercase tracking-[0.5em] text-[10px] block mb-4"
        >
          // ARCHITECTURAL_CORE
        </motion.span>
        <h1 className="kinetic-text text-6xl md:text-9xl mt-4 leading-none glitch-text">
          SYSTEM<br />
          <span className="text-transparent" style={{ WebkitTextStroke: '2px #22d3ee' }}>LOGIC</span>
        </h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-0 border-t-4 border-[#fef3c7]">
        {[
          { title: "Ingestion", icon: <Database />, color: "hover:bg-violet-600", desc: "Data normalization at scale." },
          { title: "Inference", icon: <Cpu />, color: "hover:bg-coral-500", desc: "Multi-model orchestration." },
          { title: "Governance", icon: <ShieldCheck />, color: "hover:bg-[#a3e635]", desc: "Deterministic safety layers." }
        ].map((item, i) => (
          <div key={i} className={`p-12 border-r-4 last:border-r-0 border-b-4 lg:border-b-0 border-[#fef3c7] transition-all group cursor-pointer ${item.color} hover:text-black`}>
            <div className="mb-8 group-hover:rotate-12 transition-transform">
              {React.cloneElement(item.icon as React.ReactElement, { size: 64, strokeWidth: 2.5 })}
            </div>
            <h3 className="text-3xl font-black uppercase mb-4">{item.title}</h3>
            <p className="text-[#fef3c7]/60 group-hover:text-black font-bold uppercase text-xs leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <motion.div 
        className="mt-32 p-1 border-4 border-[#22d3ee] bg-[#22d3ee] relative overflow-hidden"
        whileHover={{ skewX: -1 }}
      >
        <div className="bg-[#0f172a] p-12 flex flex-col md:flex-row items-center gap-12">
           <div className="w-full md:w-1/3">
              <img src="/architecture-elevated.png" className="w-full grayscale contrast-150 brightness-75" alt="Logic diagram" />
           </div>
           <div className="w-full md:w-2/3">
              <h2 className="text-5xl font-black uppercase mb-6 leading-tight">Autonomous<br/>Control</h2>
              <p className="text-lg font-bold leading-relaxed mb-8 opacity-70">
                Tiered approach to model routing. 40% latency reduction. 100% brand safety across all collective outputs.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-[#22d3ee] text-black px-8 py-3 font-black uppercase text-xs brutalist-border !shadow-none hover:translate-y-1">Initialize_OS</button>
              </div>
           </div>
        </div>
      </motion.div>
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [page, setPage] = useState('home');

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [page]);

  return (
    <div className="bg-white selection:bg-[#c4ff00] selection:text-black min-h-screen">
      <div className="crunchy-overlay" />
      <Nav currentPage={page} setPage={setPage} />
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.2, ease: "linear" }}
          >
            {page === 'home' && <Home setPage={setPage} />}
            {page === 'systems' && <SystemsPage />}
            {page === 'forge' && <ForgePage />}
            {page === 'toolkit' && (
               <div className="pt-40 text-center min-h-screen">
                <h1 className="kinetic-text text-8xl uppercase glitch-text">RECALIBRATING</h1>
                <button onClick={() => setPage('home')} className="mt-8 font-black uppercase text-xs brutalist-border px-6 py-2">Return</button>
              </div>
            )}
            {page === 'events' && (
               <div className="pt-40 text-center min-h-screen">
                <h1 className="kinetic-text text-8xl uppercase glitch-text">SYNC_PENDING</h1>
                <button onClick={() => setPage('home')} className="mt-8 font-black uppercase text-xs brutalist-border px-6 py-2">Return</button>
              </div>
            )}
            {['submit'].includes(page) && (
              <div className="pt-40 text-center min-h-screen">
                <h1 className="kinetic-text text-8xl uppercase glitch-text">UPLOAD_LOCKED</h1>
                <button onClick={() => setPage('home')} className="mt-8 font-black uppercase text-xs brutalist-border px-6 py-2">Return</button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
