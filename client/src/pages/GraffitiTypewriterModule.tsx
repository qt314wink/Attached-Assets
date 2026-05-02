import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Volume2, PenTool } from 'lucide-react';

// Web Audio API for Typewriter Clack
let audioCtx: AudioContext | undefined;
const playTypewriterSound = () => {
  if (typeof window === 'undefined') return;
  if (!audioCtx) audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  if (audioCtx.state === 'suspended') audioCtx.resume();

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  const now = audioCtx.currentTime;
  osc.type = 'square';
  osc.frequency.setValueAtTime(150, now);
  osc.frequency.exponentialRampToValueAtTime(40, now + 0.05);
  
  gain.gain.setValueAtTime(0.3, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

  osc.start(now);
  osc.stop(now + 0.05);
};

const playBellSound = () => {
  if (typeof window === 'undefined') return;
  if (!audioCtx) audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  if (audioCtx.state === 'suspended') audioCtx.resume();

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  const now = audioCtx.currentTime;
  osc.type = 'sine';
  osc.frequency.setValueAtTime(1200, now);
  osc.frequency.exponentialRampToValueAtTime(400, now + 0.3);
  
  gain.gain.setValueAtTime(0.2, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

  osc.start(now);
  osc.stop(now + 0.3);
};

export default function GraffitiTypewriterModule({ setPage }: { setPage: (p: string) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [domain, setDomain] = useState<'luminous' | 'mist' | 'obsidian' | 'frost'>('obsidian');
  const [chaosMode, setChaosMode] = useState(false);

  const DOMAINS = {
    luminous: { bg: '#F4F2EF', text: '#111', name: 'Luminous Verge' },
    mist: { bg: '#E6DBCF', text: '#2d3748', name: 'Mist & Timber' },
    obsidian: { bg: '#111111', text: '#C2A875', name: 'Obsidian & Sun' },
    frost: { bg: '#e0f2fe', text: '#0284c7', name: 'Frost & Glass' }
  };

  const currentDomain = DOMAINS[domain];
  const posRef = useRef({ x: 50, y: 80 });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore meta keys
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key.length === 1 || e.key === 'Enter' || e.key === 'Backspace') {
        e.preventDefault();
        drawCharacter(e.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [domain, chaosMode]);

  const drawCharacter = (char: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (char === 'Enter') {
      playBellSound();
      posRef.current.y += 80;
      posRef.current.x = 50;
      return;
    }

    if (char === 'Backspace') {
      playTypewriterSound();
      posRef.current.x = Math.max(50, posRef.current.x - 50);
      ctx.clearRect(posRef.current.x - 25, posRef.current.y - 70, 60, 90);
      return;
    }

    playTypewriterSound();

    const x = posRef.current.x;
    const y = posRef.current.y;

    ctx.save();
    
    // Randomize slightly for graffiti effect
    const rot = (Math.random() - 0.5) * 0.4;
    const scale = 1 + (Math.random() - 0.5) * 0.5;
    
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.scale(scale, scale);

    // Style
    ctx.font = '900 64px "Impact", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';

    // Shadow
    ctx.shadowColor = chaosMode ? '#ff00ff' : 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = chaosMode ? 15 : 8;
    ctx.shadowOffsetX = 4;
    ctx.shadowOffsetY = 4;

    // Fill
    const hue = chaosMode ? Math.random() * 360 : (domain === 'obsidian' ? 40 : 200);
    ctx.fillStyle = chaosMode ? `hsl(${hue}, 80%, 50%)` : currentDomain.text;
    
    // Draw Outline
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'white';
    if (!chaosMode) ctx.strokeText(char.toUpperCase(), 0, 0);
    
    // Draw Fill
    ctx.fillText(char.toUpperCase(), 0, 0);
    
    // Add some random splatters
    if (Math.random() > 0.6) {
      for(let i=0; i<3; i++) {
        ctx.beginPath();
        ctx.arc((Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40, Math.random() * 5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.restore();

    posRef.current.x += 50;
    
    if (posRef.current.x > canvas.width - 50) {
      playBellSound();
      posRef.current.y += 80;
      posRef.current.x = 50;
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      posRef.current = { x: 50, y: 80 };
    }
  };

  // Setup Canvas Dimensions
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    }
  }, []);

  return (
    <motion.div 
      className="pt-32 pb-24 px-6 min-h-screen relative font-sans transition-colors duration-1000 overflow-hidden"
      style={{ backgroundColor: currentDomain.bg, color: currentDomain.text }}
      animate={chaosMode ? { 
        filter: ['hue-rotate(0deg)', 'hue-rotate(90deg)', 'hue-rotate(-90deg)', 'hue-rotate(0deg)'],
        scale: [1, 1.01, 0.99, 1]
      } : {}}
      transition={{ repeat: chaosMode ? Infinity : 0, duration: 0.2 }}
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <button 
          onClick={() => setPage('home')}
          className="flex items-center gap-2 font-black uppercase mb-12 opacity-50 hover:opacity-100 transition-opacity w-fit text-sm tracking-widest"
        >
          <ArrowLeft size={16} /> Return to Nexus
        </button>

        <header className="mb-12 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
          <div>
            <span className="font-black uppercase tracking-[0.3em] text-xs block mb-4 opacity-50 flex items-center gap-2">
              <PenTool size={14} /> // TACTILE INTERFACE & ASMR
            </span>
            <h1 className="text-5xl md:text-7xl font-black uppercase leading-none mb-4 tracking-tighter">
              Graffiti<br/>Typewriter
            </h1>
            <p className="text-lg font-medium max-w-xl opacity-70">
              Strike any key on your keyboard. Each keystroke triggers procedurally generated canvas graffiti and a synthesized mechanical clack. 
            </p>
          </div>
          
          <div className="flex gap-2">
            {(Object.keys(DOMAINS) as Array<keyof typeof DOMAINS>).map(d => (
              <button 
                key={d}
                onClick={() => setDomain(d)}
                className={`w-10 h-10 rounded-full border-4 transition-all ${domain === d ? 'scale-110 border-current' : 'border-transparent opacity-50 hover:opacity-100 shadow-md'}`}
                style={{ backgroundColor: DOMAINS[d].bg }}
                title={DOMAINS[d].name}
              />
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            {/* The Canvas Paper */}
            <div className="relative w-full aspect-square md:aspect-[4/3] bg-[#f8f9fa] rounded-lg shadow-2xl overflow-hidden border-2 border-black/10 group">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-80 pointer-events-none mix-blend-multiply" />
              
              {!chaosMode && (
                <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none group-hover:opacity-0 transition-opacity">
                  <span className="font-black text-4xl uppercase tracking-widest text-black">START TYPING</span>
                </div>
              )}

              <canvas 
                ref={canvasRef}
                className="w-full h-full cursor-text relative z-10"
              />
              <div className="absolute bottom-4 right-4 flex gap-4 z-20">
                <button onClick={clearCanvas} className="text-xs font-black uppercase text-black/40 hover:text-black transition-colors bg-white/80 px-3 py-1 rounded backdrop-blur">
                  [ Clear Canvas ]
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="p-8 rounded-2xl border-2 transition-all" style={{ borderColor: `${currentDomain.text}20`, backgroundColor: `${currentDomain.text}05` }}>
              <h3 className="font-black uppercase mb-4 text-sm flex items-center gap-2">
                <Volume2 size={16} /> ASMR Synthesizer
              </h3>
              <p className="text-xs opacity-70 leading-relaxed mb-6">
                Instead of loading static MP3s, this module uses the Web Audio API to synthesize satisfying, crunchy audio cues in real-time to match the tactile impact of the graffiti.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-current pb-2 opacity-50">
                  <span className="text-xs font-bold uppercase">Keystroke Clack</span>
                  <span className="text-[10px] font-mono">150Hz Square Wave</span>
                </div>
                <div className="flex items-center justify-between border-b border-current pb-2 opacity-50">
                  <span className="text-xs font-bold uppercase">Carriage Return</span>
                  <span className="text-[10px] font-mono">1.2kHz Sine Sweep</span>
                </div>
                <div className="flex items-center justify-between border-b border-current pb-2 opacity-50">
                  <span className="text-xs font-bold uppercase">Backspace Erase</span>
                  <span className="text-[10px] font-mono">Canvas ClearRect</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setChaosMode(!chaosMode)}
              className="w-full py-6 font-black uppercase text-sm border-2 transition-all relative group shadow-lg"
              style={{ borderColor: currentDomain.text, color: chaosMode ? currentDomain.bg : currentDomain.text, backgroundColor: chaosMode ? currentDomain.text : 'transparent' }}
            >
              {chaosMode ? "Disable Glitch-Melt" : "Trigger Glitch-Melt (Chaos Mode)"}
            </button>

            {chaosMode && (
              <div className="p-4 border-l-4 border-red-500 bg-red-500/10 text-red-500 font-mono text-xs animate-pulse">
                [WARNING] CHAOS MORPHING ENGAGED. LUMINANCE THRESHOLD BREACHED.
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
