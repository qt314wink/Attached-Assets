import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, PenTool, Download, SlidersHorizontal, Image as ImageIcon, Type, Wand2, Palette, Trash2 } from 'lucide-react';

// Web Audio API for Typewriter Clack
let audioCtx: AudioContext | undefined;
const playTypewriterSound = () => {
  if (typeof window === 'undefined') return;
  try {
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
  } catch(e) {}
};

const playBellSound = () => {
  if (typeof window === 'undefined') return;
  try {
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
  } catch(e) {}
};

// --- Add custom fonts to the document ---
const loadFonts = () => {
  if (typeof document === 'undefined') return;
  if (document.getElementById('graffiti-fonts')) return;
  const link = document.createElement('link');
  link.id = 'graffiti-fonts';
  link.href = 'https://fonts.googleapis.com/css2?family=Permanent+Marker&family=Sedgwick+Ave+Display&family=Creepster&family=Rubik+Glitch&family=Bungee+Shade&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
};

export default function GraffitiTypewriterModule({ setPage }: { setPage: (p: string) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Settings
  const [styleMode, setStyleMode] = useState<'graffiti' | 'neobrutalist' | 'gooey' | 'comic' | 'boxy'>('graffiti');
  const [bgColor, setBgColor] = useState('#FFFF00');
  const [fillColor, setFillColor] = useState('#FF0055');
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [patternEnabled, setPatternEnabled] = useState(false);
  const [gradientEnabled, setGradientEnabled] = useState(false);
  const [swishesEnabled, setSwishesEnabled] = useState(true);
  const [chaosMode, setChaosMode] = useState(false);
  const [fontSize, setFontSize] = useState(80);
  
  // Custom Swish generator prompt
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const [showOverlay, setShowOverlay] = useState(true);
  const hasStartedTypingRef = useRef(false);
  const posRef = useRef({ x: 60, y: 120 });
  const charsDrawn = useRef(0);

  useEffect(() => {
    loadFonts();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore meta keys and typing in the prompt input
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;
      
      if (e.key.length === 1 || e.key === 'Enter' || e.key === 'Backspace' || e.key === ' ') {
        e.preventDefault();
        drawCharacter(e.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [styleMode, fillColor, strokeColor, patternEnabled, gradientEnabled, chaosMode, swishesEnabled, fontSize]);

  // --- Generative Logic (Mocked) ---
  const handleGenerate = () => {
    if (!prompt) return;
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      const randomColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
      setFillColor(randomColor);
      setPatternEnabled(Math.random() > 0.5);
      setGradientEnabled(Math.random() > 0.5);
      setPrompt("");
      drawGenerativeElement();
    }, 1500);
  };

  const drawGenerativeElement = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.save();
    ctx.globalCompositeOperation = 'overlay';
    
    for (let i = 0; i < 8; i++) {
        ctx.beginPath();
        ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.bezierCurveTo(
            Math.random() * canvas.width, Math.random() * canvas.height,
            Math.random() * canvas.width, Math.random() * canvas.height,
            Math.random() * canvas.width, Math.random() * canvas.height
        );
        ctx.lineWidth = Math.random() * 60 + 20;
        ctx.strokeStyle = `hsla(${Math.random() * 360}, 100%, 50%, 0.6)`;
        ctx.lineCap = 'round';
        ctx.stroke();
    }
    ctx.restore();
  }

  // --- Core Drawing Logic ---
  const drawCharacter = (char: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (char === 'Enter') {
      playBellSound();
      posRef.current.y += fontSize * 1.5;
      posRef.current.x = 60;
      return;
    }

    if (char === 'Backspace') {
      playTypewriterSound();
      posRef.current.x = Math.max(60, posRef.current.x - (fontSize * 0.7));
      ctx.clearRect(posRef.current.x - (fontSize * 0.5), posRef.current.y - fontSize * 1.2, fontSize * 1.5, fontSize * 1.8);
      return;
    }

    if (char === ' ') {
      posRef.current.x += fontSize * 0.5;
      return;
    }

    playTypewriterSound();
    if (!hasStartedTypingRef.current) {
      hasStartedTypingRef.current = true;
      setShowOverlay(false);
    }
    charsDrawn.current++;

    const x = posRef.current.x;
    const y = posRef.current.y;

    ctx.save();
    
    // Style-specific transformations
    let rot = 0;
    let scale = 1;
    let fontStr = `${fontSize}px "Impact", sans-serif`;
    
    switch(styleMode) {
      case 'graffiti':
        rot = (Math.random() - 0.5) * 0.4;
        scale = 1 + (Math.random() - 0.5) * 0.3;
        fontStr = `${fontSize}px "Permanent Marker", cursive`;
        break;
      case 'neobrutalist':
        fontStr = `900 ${fontSize}px monospace`;
        break;
      case 'gooey':
        rot = Math.sin(charsDrawn.current) * 0.2;
        fontStr = `${fontSize}px "Rubik Glitch", system-ui`;
        break;
      case 'comic':
        rot = (Math.random() - 0.5) * 0.1;
        fontStr = `900 ${fontSize}px "Bangers", "Impact", sans-serif`;
        break;
      case 'boxy':
        fontStr = `900 ${fontSize}px "Bungee Shade", sans-serif`;
        break;
    }

    if (chaosMode) {
      rot += (Math.random() - 0.5);
      scale += Math.random() * 0.5;
    }
    
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.scale(scale, scale);

    ctx.font = fontStr;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';

    const metrics = ctx.measureText(char.toUpperCase());
    const charW = metrics.width;
    
    // Background Element
    if (styleMode === 'neobrutalist') {
        ctx.fillStyle = '#000';
        ctx.fillRect(-charW/2 - 10, -fontSize + 10, charW + 20, fontSize + 10);
        ctx.fillStyle = fillColor;
        ctx.fillRect(-charW/2 - 15, -fontSize + 5, charW + 20, fontSize + 10);
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 6;
        ctx.strokeRect(-charW/2 - 15, -fontSize + 5, charW + 20, fontSize + 10);
    } else if (styleMode === 'boxy') {
        ctx.fillStyle = '#fff';
        ctx.fillRect(-charW/2 - 5, -fontSize + 15, charW + 10, fontSize);
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 8;
        ctx.strokeRect(-charW/2 - 5, -fontSize + 15, charW + 10, fontSize);
    }

    // Fill
    let activeFill: string | CanvasGradient | CanvasPattern = fillColor;
    
    if (gradientEnabled) {
      const grad = ctx.createLinearGradient(0, -fontSize, 0, 0);
      grad.addColorStop(0, fillColor);
      grad.addColorStop(1, chaosMode ? '#000' : '#fff');
      activeFill = grad;
    }

    if (patternEnabled) {
      const pCanvas = document.createElement('canvas');
      pCanvas.width = 10;
      pCanvas.height = 10;
      const pCtx = pCanvas.getContext('2d');
      if (pCtx) {
        pCtx.fillStyle = fillColor;
        pCtx.fillRect(0,0,10,10);
        pCtx.fillStyle = strokeColor;
        pCtx.beginPath();
        pCtx.arc(5, 5, 2, 0, Math.PI*2);
        pCtx.fill();
        const pattern = ctx.createPattern(pCanvas, 'repeat');
        if (pattern) activeFill = pattern;
      }
    }

    ctx.fillStyle = chaosMode ? `hsl(${Math.random()*360}, 100%, 50%)` : activeFill;

    // Shadow
    if (styleMode === 'graffiti' || styleMode === 'comic') {
      ctx.shadowColor = strokeColor;
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = styleMode === 'comic' ? 12 : 6;
      ctx.shadowOffsetY = styleMode === 'comic' ? 12 : 6;
    } else if (styleMode === 'gooey') {
      ctx.shadowColor = fillColor;
      ctx.shadowBlur = 20;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    }

    // Stroke
    ctx.lineWidth = styleMode === 'comic' ? 12 : (styleMode === 'graffiti' ? 6 : 4);
    ctx.strokeStyle = strokeColor;
    ctx.lineJoin = 'round';
    
    if (styleMode !== 'neobrutalist') {
        ctx.strokeText(char.toUpperCase(), 0, 0);
    }
    
    // Fill text
    ctx.shadowColor = 'transparent';
    ctx.fillText(char.toUpperCase(), 0, 0);
    
    // Accents
    if (swishesEnabled) {
      if (styleMode === 'graffiti' && Math.random() > 0.7) {
        ctx.beginPath();
        ctx.moveTo(-charW/2, 10);
        ctx.quadraticCurveTo(0, 40, charW/2, 5);
        ctx.lineWidth = 6;
        ctx.strokeStyle = fillColor;
        ctx.stroke();
      }
      if (styleMode === 'gooey' && Math.random() > 0.6) {
        ctx.fillStyle = fillColor;
        ctx.beginPath();
        ctx.arc(0, 10, 6, 0, Math.PI*2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(15, 20, 4, 0, Math.PI*2);
        ctx.fill();
      }
      if (styleMode === 'comic' && Math.random() > 0.8) {
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(charW/2 + 10, -fontSize/2);
        ctx.lineTo(charW/2 + 30, -fontSize/2 - 15);
        ctx.stroke();
      }
    }

    ctx.restore();

    // Advance cursor
    posRef.current.x += charW + (styleMode === 'neobrutalist' ? 30 : 15);
    
    if (posRef.current.x > canvas.width - fontSize) {
      playBellSound();
      posRef.current.y += fontSize * 1.5;
      posRef.current.x = 60;
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      posRef.current = { x: 60, y: 120 };
      charsDrawn.current = 0;
      hasStartedTypingRef.current = false;
      setShowOverlay(true);
    }
  };

  const handleDownload = (transparent: boolean) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    if (!transparent) {
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const tempCtx = tempCanvas.getContext('2d');
        if (tempCtx) {
            tempCtx.fillStyle = bgColor;
            tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
            // Replicate dot matrix on download if possible (basic approach)
            tempCtx.drawImage(canvas, 0, 0);
            
            const link = document.createElement('a');
            link.download = `graffiti-typewriter-${Date.now()}.png`;
            link.href = tempCanvas.toDataURL('image/png');
            link.click();
            return;
        }
    }

    const link = document.createElement('a');
    link.download = `graffiti-typewriter-transparent-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  // Improved Canvas Resizing Logic
  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (canvas && container) {
        const { clientWidth, clientHeight } = container;
        
        // Only resize if dimensions actually changed
        if (canvas.width !== clientWidth || canvas.height !== clientHeight) {
          const ctx = canvas.getContext('2d');
          
          // Save existing content
          let tempCanvas: HTMLCanvasElement | null = null;
          if (canvas.width > 0 && canvas.height > 0) {
            tempCanvas = document.createElement('canvas');
            tempCanvas.width = canvas.width;
            tempCanvas.height = canvas.height;
            const tCtx = tempCanvas.getContext('2d');
            if (tCtx) tCtx.drawImage(canvas, 0, 0);
          }

          // Apply new dimensions
          canvas.width = clientWidth;
          canvas.height = clientHeight;

          // Restore content
          if (tempCanvas && ctx) {
            ctx.drawImage(tempCanvas, 0, 0);
          }
        }
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Ensure fonts are loaded before we allow typing to prevent weird spacing
    document.fonts.ready.then(() => {
        // Ready
    });

    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-black selection:text-[#00FF66]">
      
      {/* Top Header */}
      <header className="bg-black text-white p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between z-20 border-b-[12px] border-[#00E5FF] gap-4">
        <div className="flex items-center gap-4">
          <button onClick={() => setPage('home')} className="bg-white text-black p-2 border-[4px] border-black hover:bg-[#FF0055] hover:text-white transition-colors shadow-[4px_4px_0_#00E5FF]">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter" style={{ textShadow: '2px 2px 0 #FF0055' }}>
            <PenTool className="inline mr-2 mb-1" size={40} /> Typewriter
          </h1>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
            <button onClick={clearCanvas} className="flex-1 md:flex-none bg-white text-black px-4 py-2 font-black uppercase text-sm flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors border-[4px] border-black shadow-[4px_4px_0_#FF0055]">
                <Trash2 size={20} /> Clear
            </button>
            <button onClick={() => handleDownload(false)} className="flex-1 md:flex-none bg-[#00FF66] text-black px-4 py-2 font-black uppercase text-sm flex items-center justify-center gap-2 hover:bg-white transition-colors border-[4px] border-black shadow-[4px_4px_0_#000]">
                <ImageIcon size={20} /> BG
            </button>
            <button onClick={() => handleDownload(true)} className="flex-1 md:flex-none bg-[#FFFF00] text-black px-4 py-2 font-black uppercase text-sm flex items-center justify-center gap-2 hover:bg-white transition-colors border-[4px] border-black shadow-[4px_4px_0_#000]">
                <Download size={20} /> PNG
            </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        
        {/* Left Toolbar - Settings */}
        <aside className="w-full md:w-[400px] bg-[#E5E5E5] border-r-[12px] border-black overflow-y-auto p-6 md:p-8 flex flex-col gap-10 z-10 custom-scrollbar shrink-0">
            
            <section className="space-y-6">
                <h3 className="font-black uppercase flex items-center gap-3 text-2xl border-b-[6px] border-black pb-2 bg-white p-2 shadow-[6px_6px_0_#000] transform -rotate-1"><Type size={28}/> Style Engine</h3>
                <div className="grid grid-cols-2 gap-3">
                    {(['graffiti', 'neobrutalist', 'gooey', 'comic', 'boxy'] as const).map(style => (
                        <button 
                            key={style}
                            onClick={() => setStyleMode(style)}
                            className={`p-3 border-[4px] border-black font-black uppercase text-sm transition-all ${styleMode === style ? 'bg-black text-[#00FF66] shadow-[6px_6px_0_#00E5FF] translate-x-1 translate-y-1' : 'bg-white text-black hover:bg-[#FFFF00] shadow-[6px_6px_0_#000]'}`}
                        >
                            {style}
                        </button>
                    ))}
                </div>
            </section>

            <section className="space-y-6">
                <h3 className="font-black uppercase flex items-center gap-3 text-2xl border-b-[6px] border-black pb-2 bg-white p-2 shadow-[6px_6px_0_#000] transform rotate-1"><Palette size={28}/> Inks & Canvas</h3>
                
                <div className="bg-white p-4 border-[6px] border-black shadow-[6px_6px_0_#000] space-y-4">
                  <div className="flex items-center justify-between">
                      <label className="font-black text-sm uppercase">Fill Color</label>
                      <input type="color" value={fillColor} onChange={e => setFillColor(e.target.value)} className="w-12 h-12 p-0 border-[4px] border-black cursor-pointer bg-white"/>
                  </div>
                  
                  <div className="flex items-center justify-between">
                      <label className="font-black text-sm uppercase">Stroke Color</label>
                      <input type="color" value={strokeColor} onChange={e => setStrokeColor(e.target.value)} className="w-12 h-12 p-0 border-[4px] border-black cursor-pointer bg-white"/>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t-[4px] border-black">
                      <label className="font-black text-sm uppercase">Canvas Color</label>
                      <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-12 h-12 p-0 border-[4px] border-black cursor-pointer bg-white"/>
                  </div>
                </div>
            </section>

            <section className="space-y-6">
                <h3 className="font-black uppercase flex items-center gap-3 text-2xl border-b-[6px] border-black pb-2 bg-white p-2 shadow-[6px_6px_0_#000] transform -rotate-1"><SlidersHorizontal size={28}/> Modifiers</h3>
                
                <div className="bg-white p-4 border-[6px] border-black shadow-[6px_6px_0_#000] space-y-6">
                  <label className="flex items-center gap-4 cursor-pointer group">
                      <div className={`w-8 h-8 border-[4px] border-black flex items-center justify-center transition-colors ${patternEnabled ? 'bg-[#FF0055]' : 'bg-white'}`}>
                          {patternEnabled && <div className="w-3 h-3 bg-black rounded-full" />}
                      </div>
                      <span className="font-black text-lg uppercase group-hover:text-[#FF0055] transition-colors">Dot Fill</span>
                      <input type="checkbox" checked={patternEnabled} onChange={e => setPatternEnabled(e.target.checked)} className="hidden" />
                  </label>

                  <label className="flex items-center gap-4 cursor-pointer group">
                      <div className={`w-8 h-8 border-[4px] border-black flex items-center justify-center transition-colors ${gradientEnabled ? 'bg-[#00E5FF]' : 'bg-white'}`}>
                          {gradientEnabled && <div className="w-full h-2 bg-black" />}
                      </div>
                      <span className="font-black text-lg uppercase group-hover:text-[#00E5FF] transition-colors">Gradient</span>
                      <input type="checkbox" checked={gradientEnabled} onChange={e => setGradientEnabled(e.target.checked)} className="hidden" />
                  </label>

                  <label className="flex items-center gap-4 cursor-pointer group">
                      <div className={`w-8 h-8 border-[4px] border-black flex items-center justify-center transition-colors ${swishesEnabled ? 'bg-[#FFFF00]' : 'bg-white'}`}>
                          {swishesEnabled && <div className="w-4 h-2 bg-black transform rotate-45" />}
                      </div>
                      <span className="font-black text-lg uppercase group-hover:text-[#ff9900] transition-colors">Auto-Accents</span>
                      <input type="checkbox" checked={swishesEnabled} onChange={e => setSwishesEnabled(e.target.checked)} className="hidden" />
                  </label>

                  <div className="pt-6 border-t-[4px] border-black">
                      <label className="font-black text-sm uppercase mb-4 block">Font Size ({fontSize}px)</label>
                      <input 
                          type="range" 
                          min="32" max="250" 
                          value={fontSize} 
                          onChange={e => setFontSize(Number(e.target.value))}
                          className="w-full h-4 bg-black appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:bg-[#00FF66] [&::-webkit-slider-thumb]:border-[4px] [&::-webkit-slider-thumb]:border-black cursor-pointer"
                      />
                  </div>
                </div>
            </section>

            <section className="space-y-4 bg-black text-white p-6 border-[8px] border-[#00E5FF] shadow-[12px_12px_0_#FF0055] transform rotate-1">
                <h3 className="font-black uppercase flex items-center gap-2 text-2xl text-[#00FF66]"><Wand2 size={28}/> Generator</h3>
                <p className="text-xs uppercase font-bold text-gray-300">Describe custom accents or styles.</p>
                <input 
                    type="text" 
                    value={prompt}
                    onChange={e => setPrompt(e.target.value)}
                    placeholder="e.g. 'cyberpunk ink'"
                    className="w-full bg-white border-[4px] border-black p-4 text-black font-black uppercase outline-none focus:border-[#00FF66]"
                />
                <button 
                    onClick={handleGenerate}
                    disabled={isGenerating || !prompt}
                    className="w-full bg-[#00FF66] text-black border-[4px] border-white font-black uppercase py-4 text-lg hover:bg-[#FFFF00] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {isGenerating ? 'Synthesizing...' : 'Apply'}
                </button>
            </section>

            <div className="mt-auto pt-8">
                <button 
                    onClick={() => setChaosMode(!chaosMode)}
                    className={`w-full py-6 font-black uppercase text-xl border-[6px] border-black transition-all ${chaosMode ? 'bg-[#FF0055] text-white animate-pulse shadow-[8px_8px_0_#000]' : 'bg-white hover:bg-[#FF0055] hover:text-white shadow-[8px_8px_0_#000]'}`}
                >
                    {chaosMode ? "Disable Chaos" : "Enable Chaos Mode"}
                </button>
            </div>
        </aside>

        {/* Main Canvas Area */}
        <main className="flex-1 relative overflow-hidden flex flex-col" style={{ backgroundColor: bgColor }}>
            
            {/* Ambient background pattern for empty canvas */}
            <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'radial-gradient(circle, #000 3px, transparent 4px)', backgroundSize: '32px 32px' }} />
            
            {/* Inner frame */}
            <div className="absolute inset-4 md:inset-8 border-[12px] border-black pointer-events-none z-10 shadow-[inset_16px_16px_0_rgba(0,0,0,0.1)]" />

            {/* The Canvas */}
            <div ref={containerRef} className="absolute inset-0 overflow-hidden">
              <canvas 
                  ref={canvasRef}
                  className="absolute inset-0 cursor-text"
                  style={{ zIndex: 5 }}
              />
            </div>
            
            <AnimatePresence>
                {showOverlay && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
                    >
                        <div className="bg-white border-[8px] border-black p-8 md:p-12 text-center shadow-[20px_20px_0_#000] transform rotate-3">
                            <PenTool size={64} className="mx-auto mb-6 text-[#FF0055]" />
                            <h2 className="text-4xl md:text-6xl font-black uppercase mb-4 text-black" style={{ textShadow: '4px 4px 0 #00E5FF' }}>Start Typing</h2>
                            <p className="text-xl font-bold uppercase text-gray-600 bg-gray-200 px-4 py-2 border-[4px] border-black inline-block transform -rotate-2">
                                Use your keyboard.
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
      </div>
    </div>
  );
}