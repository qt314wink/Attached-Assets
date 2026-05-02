import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, ArrowRight, ShieldCheck, Layers, Cpu, 
  Terminal, Database, Activity, Code2, Box,
  ChevronRight, Monitor, Share2, Download, RefreshCcw, Loader2, Globe, Clock, Video,
  AlertTriangle, Fingerprint, Upload, FileText, Image as ImageIcon, Sparkles,
  Layers as LayersIcon, Layout, Presentation, Briefcase, Smile, Palette, Eye, 
  Maximize, Target, Compass, Box as BoxIcon, Frame, MousePointer2, Columns, 
  CreditCard, Grid
} from 'lucide-react';
import { Nav, Footer } from '@/components/Layout';
import Home from './pages/Home';
import EventsPage from './pages/Events';
import ToolkitPage from './pages/Toolkit';
import SomaticModule from './pages/SomaticModule';
import PromptwareModule from './pages/PromptwareModule';
import BestiaryModule from './pages/BestiaryModule';
import LabyrinthModule from './pages/LabyrinthModule';
import BiomimesisModule from './pages/BiomimesisModule';
import FrameworksModule from './pages/FrameworksModule';
import VisionariesModule from './pages/VisionariesModule';
import StyleMatrixModule from './pages/StyleMatrixModule';

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

// --- Neural Forge Logic & Components ---

const ANALYZE_VARIABLES = [
  "essence", "theme", "message", "signal", "aesthetic", "design", "idea", "genre", "method", 
  "material", "subject", "technique", "shapes", "symbols", "archetypes", "adjacent designs", 
  "focus point", "descriptive words", "use of depth", "layout", "texture", "thickness", 
  "quality (x5)", "use of lighting", "perspective", "scope", "field of view", "color palette", 
  "intent", "thoughts provoked", "looks like", "reminds me of", "feels like...", 
  "makes me want to", "makes me wish", "makes me assume", "makes me care about", 
  "makes me decide to...", "use cases", "industry application"
];

const OUTPUT_PRESETS = [
  { id: 'brand_pack', label: 'Brand Pack', icon: <Briefcase size={14}/> },
  { id: 'social_pack', label: 'Social Media Pack', icon: <Share2 size={14}/> },
  { id: 'hero', label: 'Hero/Post', icon: <ImageIcon size={14}/> },
  { id: 'art_scene', label: 'Art/Story Scene', icon: <Palette size={14}/> },
  { id: 'comic_reel', label: 'Comic Reel', icon: <Video size={14}/> },
  { id: 'infographic', label: 'Infographic', icon: <Activity size={14}/> },
  { id: 'pins', label: 'Pins/Posts', icon: <Target size={14}/> },
  { id: 'guides', label: 'Guides/Manuals', icon: <FileText size={14}/> },
  { id: 'web_layout', label: 'Web Layout', icon: <Layout size={14}/> },
  { id: 'app_layout', label: 'App Layout', icon: <Presentation size={14}/> },
  { id: 'symbols', label: 'Symbols/Icons', icon: <Sparkles size={14}/> },
  { id: 'greeting_card', label: 'Greeting Card', icon: <CreditCard size={14}/> },
  { id: 'caricature', label: 'Satire/Caricature', icon: <Smile size={14}/> },
  { id: 'mood_board', label: 'Mood Board', icon: <Grid size={14}/> },
  { id: 'poc', label: 'Design PoC', icon: <Eye size={14}/> },
  { id: 'packaging', label: 'Packaging', icon: <BoxIcon size={14}/> },
  { id: 'product', label: 'Product Design', icon: <Target size={14}/> },
  { id: 'asset_trans', label: 'Isolated Asset (Alpha)', icon: <LayersIcon size={14}/> },
  { id: 'ux_components', label: 'UX Components', icon: <MousePointer2 size={14}/> }
];

const COMPONENT_VARIANTS = [
  { id: 'buttons', label: 'Buttons', icon: <MousePointer2 size={12}/> },
  { id: 'cursors', label: 'Cursors', icon: <MousePointer2 size={12}/> },
  { id: 'navbar', label: 'Nav Bar', icon: <Columns size={12}/> },
  { id: 'sliders', label: 'Sliders', icon: <Activity size={12}/> },
  { id: 'frames', label: 'Frames', icon: <Frame size={12}/> },
  { id: 'sections', label: 'Sections', icon: <Columns size={12}/> },
  { id: 'cards', label: 'Cards', icon: <BoxIcon size={12}/> }
];

const ForgePage = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");
  const [showApiConfig, setShowApiConfig] = useState(false);
  const [apiKeys, setApiKeys] = useState({ hf: "", figma: "" });
  const [analyzing, setAnalyzing] = useState(false);
  const [img, setImg] = useState<string | null>(null);
  const [glitch, setGlitch] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [selectedPreset, setSelectedPreset] = useState('brand_pack');
  const [analysisData, setAnalysisData] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      simulateAnalysis();
    }
  };

  const simulateAnalysis = () => {
    setAnalyzing(true);
    setTimeout(() => {
      const mockAnalysis: Record<string, string> = {};
      ANALYZE_VARIABLES.forEach(v => {
        mockAnalysis[v] = "Detected_Vector_0x" + Math.random().toString(16).slice(2, 6).toUpperCase();
      });
      setAnalysisData(mockAnalysis);
      setAnalyzing(false);
    }, 1500);
  };

  const handleForge = () => {
    if (!prompt && !file) return;
    setLoading(true);
    setGlitch(true);
    
    // Logic to select appropriate mock image based on preset
    const getMockImage = (preset: string) => {
      switch(preset) {
        case 'comic_reel': return "/comic-reel.png";
        case 'social_pack': return "/social-pack.png";
        case 'art_scene': return "/comic-reel.png";
        case 'brand_pack': return "/social-pack.png";
        default: return "/hero-art.png";
      }
    };

    const steps = [
      "INITIALIZING NEURAL PIPELINE...",
      "EXTRACTING 40-VAR VECTORS...",
      "APPLYING NEURAL STYLE TRANSFER...",
      "FINALIZING RENDER..."
    ];
    
    let stepIndex = 0;
    setLoadingStep(steps[0]);
    
    const interval = setInterval(() => {
      stepIndex++;
      if (stepIndex < steps.length) {
        setLoadingStep(steps[stepIndex]);
      }
    }, 600);

    setTimeout(() => {
      clearInterval(interval);
      setImg(getMockImage(selectedPreset));
      setLoading(false);
      setGlitch(false);
    }, 3000);
  };

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen bg-white relative overflow-hidden">
      <div className="pixel-grid absolute inset-0 pointer-events-none" />
      
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* Left Sidebar: Controls */}
        <div className="lg:col-span-3 space-y-6">
          <div className="brutalist-border bg-black text-white p-6">
            <h1 className="kinetic-text text-4xl mb-2">The Forge</h1>
            <p className="text-[10px] font-black uppercase text-[#c4ff00]">Neural Analysis Engine // v4.2</p>
          </div>

          <div className="bg-white p-6 brutalist-border space-y-6">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase flex items-center gap-2">
                <Upload size={12} /> Reference Input
              </label>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="image/*,video/*,.pdf,.doc,.docx"
              />
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-black border-dashed p-8 text-center cursor-pointer hover:bg-gray-50 transition-all group relative overflow-hidden"
              >
                {file ? (
                  <div className="space-y-2">
                    <FileText className="mx-auto w-8 h-8 text-black" />
                    <p className="text-[10px] font-black uppercase truncate">{file.name}</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <ImageIcon className="mx-auto w-8 h-8 text-black/20 group-hover:text-black transition-colors" />
                    <p className="text-[10px] font-black uppercase text-black/40">Drop IMG/VID/DOC</p>
                  </div>
                )}
                {analyzing && <motion.div className="absolute inset-0 bg-[#c4ff00]/20 animate-pulse" />}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase flex items-center gap-2">
                <Terminal size={12} /> Creative Modifier
              </label>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="User Intent / Creative Expectation..."
                className="w-full h-24 bg-gray-50 border-2 border-black p-4 outline-none font-bold uppercase resize-none text-xs focus:bg-white transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase flex items-center gap-2">
                <LayersIcon size={12} /> Output Preset
              </label>
              <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-y-auto custom-scrollbar pr-2">
                {OUTPUT_PRESETS.map(preset => (
                  <button
                    key={preset.id}
                    onClick={() => setSelectedPreset(preset.id)}
                    className={`text-[9px] font-black uppercase p-2 border-2 border-black flex items-center gap-2 transition-all ${selectedPreset === preset.id ? 'bg-[#c4ff00] translate-x-1 translate-y-1 shadow-none' : 'bg-white hover:bg-gray-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'}`}
                  >
                    {preset.icon} {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {selectedPreset === 'ux_components' && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="text-[10px] font-black uppercase flex items-center gap-2">
                  <Grid size={12} /> Component Variant
                </label>
                <div className="grid grid-cols-3 gap-1">
                  {COMPONENT_VARIANTS.map(v => (
                    <button key={v.id} className="text-[7px] font-black uppercase p-1 border border-black hover:bg-[#c4ff00] transition-colors">
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <button 
              onClick={handleForge}
              disabled={loading || analyzing}
              className="crunchy-btn w-full bg-black text-white py-4 font-black uppercase flex items-center justify-center gap-4 hover:bg-[#c4ff00] hover:text-black transition-all active:scale-95 disabled:opacity-50"
            >
              {loading ? <RefreshCcw className="animate-spin" /> : <Zap />}
              {loading ? "Forging..." : "Initiate Synthesis"}
            </button>
          </div>
        </div>

        {/* Center: Live Analysis HUD */}
        <div className="lg:col-span-3">
          <div className="brutalist-border bg-gray-900 text-[#c4ff00] p-6 h-full overflow-y-auto max-h-[800px] font-mono custom-scrollbar">
            <h3 className="text-[10px] font-black uppercase mb-6 border-b border-[#c4ff00]/20 pb-2 flex items-center gap-2">
              <Activity size={14} /> Neural Breakdown
            </h3>
            {Object.keys(analysisData).length > 0 ? (
              <div className="space-y-4">
                {ANALYZE_VARIABLES.map(v => (
                  <div key={v} className="space-y-1">
                    <div className="flex justify-between text-[9px] uppercase">
                      <span className="opacity-50">{v}</span>
                      <span className="text-white">{analysisData[v]}</span>
                    </div>
                    <div className="h-[1px] bg-[#c4ff00]/10 w-full" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-[#c4ff00]/20">
                <Fingerprint size={48} className="mb-4 animate-pulse" />
                <p className="text-[10px] text-center">Awaiting Data Ingestion...</p>
              </div>
            )}
          </div>
        </div>

        {/* Right: Output View */}
        <div className="lg:col-span-6 space-y-6">
          <motion.div 
            className={`relative aspect-[16/10] brutalist-border bg-black overflow-hidden group`}
            variants={GLITCH_VARIANTS}
            animate={glitch ? "animate" : "initial"}
          >
            <div className="scanline" />
            <div className="absolute top-4 right-4 z-20 flex gap-2">
              <button 
                onClick={() => setShowApiConfig(!showApiConfig)}
                className="bg-black/80 backdrop-blur px-3 py-1 text-[8px] font-black text-white brutalist-border !border-white/20 !shadow-none hover:text-[#c4ff00] uppercase flex items-center gap-1"
              >
                <Cpu size={10} /> Engine Config
              </button>
              <div className="bg-black/80 backdrop-blur px-3 py-1 text-[8px] font-black text-[#c4ff00] brutalist-border !border-white/20 !shadow-none uppercase">
                 Mode: {selectedPreset}
              </div>
            </div>

            <AnimatePresence>
              {showApiConfig && (
                <motion.div 
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  className="absolute inset-y-0 right-0 w-80 bg-black z-30 brutalist-border border-l-4 border-white p-6 text-white flex flex-col shadow-2xl"
                >
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="font-black uppercase text-xl text-[#c4ff00]">Engine Setup</h3>
                    <button onClick={() => setShowApiConfig(false)} className="hover:text-[#c4ff00]"><ArrowRight size={20}/></button>
                  </div>
                  
                  <div className="space-y-6 flex-1">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase text-gray-400">Hugging Face API Key</label>
                      <input 
                        type="password" 
                        value={apiKeys.hf}
                        onChange={e => setApiKeys({...apiKeys, hf: e.target.value})}
                        placeholder="hf_..." 
                        className="w-full bg-gray-900 border-2 border-gray-700 p-3 text-xs font-mono focus:border-[#c4ff00] outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase text-gray-400">Figma Weave Token</label>
                      <input 
                        type="password" 
                        value={apiKeys.figma}
                        onChange={e => setApiKeys({...apiKeys, figma: e.target.value})}
                        placeholder="figd_..." 
                        className="w-full bg-gray-900 border-2 border-gray-700 p-3 text-xs font-mono focus:border-[#c4ff00] outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase text-gray-400">Active Model</label>
                      <select className="w-full bg-gray-900 border-2 border-gray-700 p-3 text-xs font-mono focus:border-[#c4ff00] outline-none appearance-none cursor-pointer">
                        <option>black-forest-labs/FLUX.1-dev</option>
                        <option>stabilityai/stable-diffusion-xl</option>
                        <option>collective-os/custom-forge-v1</option>
                      </select>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setShowApiConfig(false)}
                    className="w-full bg-[#c4ff00] text-black font-black uppercase py-3 hover:bg-white transition-colors"
                  >
                    Save Config
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {!img && !loading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white/5">
                <BoxIcon className="w-32 h-32 mb-4 stroke-[0.2]" />
                <span className="font-black uppercase tracking-[1.5em] text-[10px]">Latent Void</span>
              </div>
            )}
            
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                 <div className="text-center relative max-w-sm w-full px-6">
                    <div className="w-24 h-24 border-[12px] border-black border-t-[#c4ff00] animate-spin mb-6 mx-auto" />
                    <p className="kinetic-text text-3xl mb-4">SYNTHESIZING</p>
                    <div className="bg-black text-[#c4ff00] p-3 text-[10px] font-mono font-bold uppercase border-2 border-black w-full overflow-hidden text-left relative">
                      <div className="absolute top-0 left-0 bottom-0 w-1 bg-[#c4ff00] animate-pulse" />
                      <span className="ml-2">{loadingStep}</span>
                    </div>
                 </div>
              </div>
            )}

            {img && !loading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full w-full relative">
                <img src={img} className="w-full h-full object-cover" alt="Generated art" />
                {selectedPreset === 'asset_trans' && (
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
                )}
                <div className="absolute inset-0 bg-[url('/crunchy-texture.png')] opacity-10 pointer-events-none mix-blend-overlay" />
                
                <div className="absolute bottom-6 right-6 flex gap-3">
                  <button className="p-4 bg-white brutalist-border !shadow-none hover:bg-[#c4ff00] transition-all group"><Download size={20} className="group-hover:scale-110"/></button>
                  <button className="p-4 bg-white brutalist-border !shadow-none hover:bg-[#ff6b6b] transition-all group"><Share2 size={20} className="group-hover:rotate-12"/></button>
                </div>
              </motion.div>
            )}
          </motion.div>
          
          <div className="grid grid-cols-4 gap-4">
             {OUTPUT_PRESETS.slice(0, 4).map((p, i) => (
               <div key={i} className="aspect-video bg-gray-50 border-2 border-black border-dashed flex flex-col items-center justify-center opacity-30 hover:opacity-100 transition-all cursor-crosshair p-2">
                 {p.icon}
                 <span className="text-[8px] font-black uppercase mt-1">{p.label}</span>
               </div>
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
            {page === 'toolkit' && <ToolkitPage setPage={setPage} />}
            {page === 'events' && <EventsPage setPage={setPage} />}
            {page === 'module-somatic' && <SomaticModule setPage={setPage} />}
            {page === 'module-promptware' && <PromptwareModule setPage={setPage} />}
            {page === 'module-bestiary' && <BestiaryModule setPage={setPage} />}
            {page === 'module-labyrinth' && <LabyrinthModule setPage={setPage} />}
            {page === 'module-biomimesis' && <BiomimesisModule setPage={setPage} />}
            {page === 'module-frameworks' && <FrameworksModule setPage={setPage} />}
            {page === 'module-visionaries' && <VisionariesModule setPage={setPage} />}
            {page === 'module-stylematrix' && <StyleMatrixModule setPage={setPage} />}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
