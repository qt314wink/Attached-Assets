import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, ArrowRight, ShieldCheck, Layers, Cpu, 
  Terminal, Database, Activity, Code2, Box,
  ChevronRight, Monitor, Share2, Download, RefreshCcw, Loader2, Globe, Clock, Video
} from 'lucide-react';
import { Nav, Footer } from '@/components/Layout';
import { 
  PrismText, ActiveSonar, OmniSearch, 
  SecureEnclave, FluxCapacitor, Glass, 
  SoftBtn, GravityDrop, QuantumToggle 
} from '@/components/Toolkit';
import Home from './pages/Home';

// --- Page Components ---

const ForgePage = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState<string | null>(null);

  const handleForge = () => {
    if (!prompt) return;
    setLoading(true);
    setTimeout(() => {
      setImg("/hero-art.png");
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 space-y-8">
          <div className="brutalist-border bg-black text-white p-8">
            <h1 className="kinetic-text text-6xl mb-4">The Forge</h1>
            <p className="text-xs font-bold uppercase tracking-widest text-[#c4ff00]">Neural Asset Generator // v4.0</p>
          </div>

          <div className="glass-card p-8 bg-white/50 space-y-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase">Input Latent Prompt</label>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., Shattered glass, neon rain, abstract organic forms..."
                className="w-full h-32 bg-transparent border-b-2 border-black p-4 outline-none font-bold uppercase resize-none text-sm"
              />
            </div>
            
            <button 
              onClick={handleForge}
              disabled={loading}
              className="w-full bg-black text-white py-4 font-black uppercase flex items-center justify-center gap-4 hover:bg-[#c4ff00] hover:text-black transition-all group"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Zap className="group-hover:fill-current" />}
              {loading ? "Synthesizing..." : "Initiate Forge"}
            </button>
          </div>

          <div className="brutalist-border bg-white p-6">
            <h3 className="font-black uppercase text-xs mb-4">Neural Parameters</h3>
            <div className="space-y-4">
              {['Chaos Level', 'Grain Density', 'Spatial Depth'].map(label => (
                <div key={label} className="flex justify-between items-center">
                  <span className="text-[10px] font-bold uppercase">{label}</span>
                  <div className="w-24 h-2 bg-gray-100"><div className="w-1/2 h-full bg-black" /></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="relative aspect-video brutalist-border bg-gray-900 overflow-hidden group">
            {!img && !loading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white/20">
                <Monitor className="w-20 h-20 mb-4" />
                <span className="font-black uppercase tracking-[0.5em] text-sm">Waiting for Neural Stream</span>
              </div>
            )}
            
            {loading && (
              <div className="absolute inset-0 mesh-gradient opacity-30 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="font-black text-black uppercase tracking-widest text-xs animate-pulse">Mapping Latent Space...</p>
                </div>
              </div>
            )}

            {img && !loading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full w-full">
                <img src={img} className="w-full h-full object-cover" alt="Generated art" />
                <div className="absolute bottom-6 right-6 flex gap-2">
                  <button className="p-4 bg-white brutalist-border !shadow-none hover:bg-[#c4ff00] transition-all"><Download size={20}/></button>
                  <button className="p-4 bg-white brutalist-border !shadow-none hover:bg-[#c4ff00] transition-all"><Share2 size={20}/></button>
                </div>
              </motion.div>
            )}
          </div>
          
          <div className="mt-8 grid grid-cols-4 gap-4">
             {[1,2,3,4].map(i => (
               <div key={i} className="aspect-square glass-card border-dashed border-2 border-black/20 flex items-center justify-center hover:bg-white transition-all cursor-pointer">
                 <RefreshCcw className="text-black/10 w-6 h-6" />
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const SystemsPage = () => {
  return (
    <div className="pt-32 pb-24 px-6 bg-[#0f172a] text-[#fef3c7] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <span className="text-[#a3e635] font-black uppercase tracking-widest text-sm">ARCHITECTURAL ONTOLOGY</span>
          <h1 className="kinetic-text text-5xl md:text-9xl mt-4 leading-none">
            The <span className="text-[#22d3ee]">Logic</span> <br />
            of Flow.
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {[
            { title: "Ingestion Layers", icon: <Database size={48} />, color: "text-violet-400", desc: "High-throughput data normalization using Memphis-style grouping." },
            { title: "Inference Engines", icon: <Cpu size={48} />, color: "text-coral-400", desc: "Multi-model orchestration with weighted bias control." },
            { title: "Governance Walls", icon: <ShieldCheck size={48} />, color: "text-green-400", desc: "Automated brand alignment checks via deterministic logic." }
          ].map((item, i) => (
            <div key={i} className="border-4 border-[#fef3c7]/20 p-10 hover:border-[#fbbf24] transition-all relative overflow-hidden group cursor-pointer bg-[#0f172a]">
              <div className={`mb-8 group-hover:scale-110 transition-transform duration-500 ${item.color}`}>
                {item.icon}
              </div>
              <h3 className="text-2xl font-black uppercase mb-4">{item.title}</h3>
              <p className="text-slate-400 leading-relaxed mb-8">{item.desc}</p>
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#fbbf24]">
                Explore Layer <ArrowRight size={14} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-32 p-12 bg-[#fef3c7] text-[#0f172a] border-[12px] border-[#fbbf24] relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
             <div className="w-full md:w-1/3">
                <img src="/architecture-elevated.png" className="w-full brutalist-border" alt="System architecture" />
             </div>
             <div className="w-full md:w-2/3">
                <h2 className="text-4xl font-black uppercase italic mb-6 leading-tight">Autonomous Orchestration</h2>
                <p className="text-lg font-bold leading-relaxed mb-8">
                  Our systems don't just "process" — they decide. Using a tiered approach to model routing, we reduce latency by 40% while ensuring 100% brand safety across all LLM outputs.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="px-4 py-2 bg-[#0f172a] text-[#fef3c7] font-black text-xs uppercase border border-[#0f172a]">Latency: 140ms</div>
                  <div className="px-4 py-2 bg-[#ff6b6b] text-[#0f172a] font-black text-xs uppercase border border-[#0f172a]">Reliability: 99.9%</div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ToolkitPage = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="pt-32 pb-24 px-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 border-b-4 border-black pb-8">
          <h1 className="kinetic-text text-7xl uppercase">System<br/>Toolkit</h1>
          <p className="text-gray-500 font-bold uppercase tracking-widest mt-4">Modular UI primitives for the collective interface</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="font-black uppercase text-xs text-gray-400">Inputs & Controls</h3>
            <div className="bg-white p-8 brutalist-border space-y-8">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase">Quantum Toggle</span>
                <QuantumToggle active={toggle} onToggle={setToggle} />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase">Secure Enclave</span>
                <SecureEnclave />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase">Soft Touch</span>
                <div className="flex gap-4"><SoftBtn label="Action" /><SoftBtn label="Sync" /></div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-black uppercase text-xs text-gray-400">Status & Feedback</h3>
            <div className="bg-white p-8 brutalist-border space-y-8">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase">Active Sonar</span>
                <ActiveSonar />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase">Flux Capacitor</span>
                <FluxCapacitor pct={72} />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase">Omni Search</span>
                <OmniSearch />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-black uppercase text-xs text-gray-400">Containers & Layers</h3>
            <div className="bg-white p-8 brutalist-border space-y-8">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase">Gravity Drop</span>
                <GravityDrop />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase">Glass Morphism</span>
                <div className="h-32 bg-[url('/texture.png')] bg-cover flex items-center justify-center p-4">
                  <Glass><span className="text-[10px] font-black uppercase">Layer 01</span></Glass>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EventsPage = () => {
  const events = [
    { title: "Mastering Latent Spaces", type: "Free Webinar // Oct 28", color: "bg-[#c4ff00]", img: "/event-webinar.png", desc: "Learn to use generative tools to expand your traditional practice. 2-hour intensive." },
    { title: "Portfolio Disruption", type: "1-on-1 // Design Consult", color: "bg-[#ff6b6b]", img: "/event-consult.png", desc: "Critical review of your current trajectory with senior nodes. Tailored advice." }
  ];

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 border-b-4 border-black pb-8">
          <h1 className="kinetic-text text-7xl uppercase">Node<br/>Events</h1>
          <p className="text-gray-500 font-bold uppercase tracking-widest mt-4">Sync cycles and architectural deep-dives</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-12">
            {events.map((event, idx) => (
              <div key={idx} className={`brutalist-border p-12 flex flex-col md:flex-row gap-12 group cursor-pointer hover:bg-black hover:text-white transition-all ${idx === 1 ? 'bg-[#0f172a] text-[#fef3c7]' : 'bg-[#f8f8f8]'}`}>
                <div className="w-full md:w-1/3 aspect-square glass-card rounded-none overflow-hidden border-2 border-black">
                  <img src={event.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt={event.title} />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <span className={`${event.color} text-black px-3 py-1 text-[10px] font-black uppercase mb-4 inline-block`}>{event.type}</span>
                    <h2 className="text-5xl font-black uppercase leading-none mb-4">{event.title}</h2>
                    <p className="font-medium opacity-70">{event.desc}</p>
                  </div>
                  <button className="mt-8 self-start flex items-center gap-4 font-black uppercase group-hover:gap-6 transition-all">
                    Book My Spot <ArrowRight />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="glass-card p-8 bg-gray-50 border-black/10 text-black">
              <h3 className="font-black uppercase text-sm mb-6 flex items-center gap-2">
                <Clock className="w-4 h-4" /> Node Timeline
              </h3>
              <div className="space-y-6">
                {[
                  { time: '14:00', event: 'Node Check-in', type: 'Daily' },
                  { time: '16:30', event: 'WebGL Workshop', type: 'Pro' },
                  { time: '19:00', event: 'Artist Mixer', type: 'Social' }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start pb-6 border-b border-black/5">
                    <span className="font-black text-xs text-[#ff6b6b]">{item.time}</span>
                    <div>
                      <h4 className="font-black uppercase text-xs">{item.event}</h4>
                      <p className="text-[10px] font-bold text-gray-400 uppercase">{item.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="brutalist-border p-8 bg-black text-white">
              <Video className="w-10 h-10 mb-4 text-[#c4ff00]" />
              <h3 className="font-black uppercase text-xl leading-none mb-4">Archive<br/>Access</h3>
              <p className="text-xs font-medium text-gray-400 mb-6">Missed a sync? Access all previous recordings in the node vault.</p>
              <button className="text-xs font-black uppercase underline decoration-2 underline-offset-4 hover:text-[#c4ff00]">Enter Vault</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [page, setPage] = useState('home');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  return (
    <div className="bg-white selection:bg-[#c4ff00] selection:text-black min-h-screen">
      <Nav currentPage={page} setPage={setPage} />
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {page === 'home' && <Home setPage={setPage} />}
            {page === 'systems' && <SystemsPage />}
            {page === 'forge' && <ForgePage />}
            {page === 'toolkit' && <ToolkitPage />}
            {page === 'events' && <EventsPage />}
            {['submit'].includes(page) && (
              <div className="pt-40 text-center min-h-screen">
                <h1 className="kinetic-text text-8xl uppercase">Coming<br/>Soon</h1>
                <button onClick={() => setPage('home')} className="mt-8 underline font-black uppercase tracking-widest text-xs">Return Home</button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
