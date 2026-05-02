import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Volume2, PenTool, Download, SlidersHorizontal, Image as ImageIcon, Type, Sparkles, Wand2, Palette } from 'lucide-react';

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
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Permanent+Marker&family=Sedgwick+Ave+Display&family=Creepster&family=Rubik+Glitch&family=Bungee+Shade&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
};

export default function GraffitiTypewriterModule({ setPage }: { setPage: (p: string) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Settings
  const [styleMode, setStyleMode] = useState<'graffiti' | 'neobrutalist' | 'gooey' | 'comic' | 'boxy'>('graffiti');
  const [bgColor, setBgColor] = useState('#E5E5E5');
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
  const posRef = useRef({ x: 50, y: 100 });
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
    // Simulate generation delay then apply changes
    setTimeout(() => {
      setIsGenerating(false);
      // Randomly change some settings to simulate "applying" the generated style
      const randomColor = `hsl(${Math.random() * 360}, 80%, 50%)`;
      setFillColor(randomColor);
      setPatternEnabled(Math.random() > 0.5);
      setGradientEnabled(Math.random() > 0.5);
      setPrompt("");
      // Draw a massive generative element
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
    
    for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.bezierCurveTo(
            Math.random() * canvas.width, Math.random() * canvas.height,
            Math.random() * canvas.width, Math.random() * canvas.height,
            Math.random() * canvas.width, Math.random() * canvas.height
        );
        ctx.lineWidth = Math.random() * 40 + 10;
        ctx.strokeStyle = `hsla(${Math.random() * 360}, 100%, 50%, 0.5)`;
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
      posRef.current.x = 50;
      return;
    }

    if (char === 'Backspace') {
      playTypewriterSound();
      posRef.current.x = Math.max(50, posRef.current.x - (fontSize * 0.7));
      ctx.clearRect(posRef.current.x - (fontSize * 0.5), posRef.current.y - fontSize, fontSize * 1.2, fontSize * 1.5);
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
        // Snap to grid-like offset
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

    // Font Setup
    ctx.font = fontStr;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';

    // Measure text for accurate backgrounds
    const metrics = ctx.measureText(char.toUpperCase());
    const charW = metrics.width;
    
    // 1. Draw Background Element (depending on style)
    if (styleMode === 'neobrutalist') {
        ctx.fillStyle = '#000';
        ctx.fillRect(-charW/2 - 10, -fontSize + 10, charW + 20, fontSize + 10);
        ctx.fillStyle = fillColor;
        ctx.fillRect(-charW/2 - 15, -fontSize + 5, charW + 20, fontSize + 10);
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 4;
        ctx.strokeRect(-charW/2 - 15, -fontSize + 5, charW + 20, fontSize + 10);
    } else if (styleMode === 'boxy') {
        ctx.fillStyle = '#fff';
        ctx.fillRect(-charW/2 - 5, -fontSize + 15, charW + 10, fontSize);
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 6;
        ctx.strokeRect(-charW/2 - 5, -fontSize + 15, charW + 10, fontSize);
    }

    // 2. Prepare Fill
    let activeFill: string | CanvasGradient | CanvasPattern = fillColor;
    
    if (gradientEnabled) {
      const grad = ctx.createLinearGradient(0, -fontSize, 0, 0);
      grad.addColorStop(0, fillColor);
      grad.addColorStop(1, chaosMode ? '#000' : '#fff');
      activeFill = grad;
    }

    if (patternEnabled) {
      // Create a temporary canvas for the pattern
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

    // 3. Shadow / Glow
    if (styleMode === 'graffiti' || styleMode === 'comic') {
      ctx.shadowColor = strokeColor;
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = styleMode === 'comic' ? 8 : 4;
      ctx.shadowOffsetY = styleMode === 'comic' ? 8 : 4;
    } else if (styleMode === 'gooey') {
      ctx.shadowColor = fillColor;
      ctx.shadowBlur = 15;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    }

    // 4. Draw Stroke
    ctx.lineWidth = styleMode === 'comic' ? 8 : (styleMode === 'graffiti' ? 4 : 2);
    ctx.strokeStyle = strokeColor;
    ctx.lineJoin = 'round';
    
    if (styleMode !== 'neobrutalist') {
        ctx.strokeText(char.toUpperCase(), 0, 0);
    }
    
    // 5. Draw Fill
    ctx.shadowColor = 'transparent'; // reset shadow for fill
    ctx.fillText(char.toUpperCase(), 0, 0);
    
    // 6. Draw Accents (Swishes, Splatters, Drips)
    if (swishesEnabled) {
      if (styleMode === 'graffiti' && Math.random() > 0.7) {
        // Draw swoosh under text
        ctx.beginPath();
        ctx.moveTo(-charW/2, 10);
        ctx.quadraticCurveTo(0, 30, charW/2, 5);
        ctx.lineWidth = 4;
        ctx.strokeStyle = fillColor;
        ctx.stroke();
      }
      if (styleMode === 'gooey' && Math.random() > 0.6) {
        // Draw drips
        ctx.fillStyle = fillColor;
        ctx.beginPath();
        ctx.arc(0, 5, 4, 0, Math.PI*2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(10, 15, 3, 0, Math.PI*2);
        ctx.fill();
      }
      if (styleMode === 'comic' && Math.random() > 0.8) {
        // Action lines
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(charW/2 + 5, -fontSize/2);
        ctx.lineTo(charW/2 + 20, -fontSize/2 - 10);
        ctx.stroke();
      }
    }

    ctx.restore();

    // Advance cursor
    posRef.current.x += charW + (styleMode === 'neobrutalist' ? 25 : 10);
    
    if (posRef.current.x > canvas.width - fontSize) {
      playBellSound();
      posRef.current.y += fontSize * 1.5;
      posRef.current.x = 50;
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      posRef.current = { x: 50, y: 100 };
      charsDrawn.current = 0;
      hasStartedTypingRef.current = false;
      setShowOverlay(true);
    }
  };

  const handleDownload = (transparent: boolean) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // If we want a solid background, we need to create a temporary canvas to draw the background first
    if (!transparent) {
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const tempCtx = tempCanvas.getContext('2d');
        if (tempCtx) {
            tempCtx.fillStyle = bgColor;
            tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
            tempCtx.drawImage(canvas, 0, 0);
            
            const link = document.createElement('a');
            link.download = `graffiti-typewriter-${Date.now()}.png`;
            link.href = tempCanvas.toDataURL('image/png');
            link.click();
            return;
        }
    }

    // Transparent download
    const link = document.createElement('a');
    link.download = `graffiti-typewriter-transparent-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  // Setup Canvas Dimensions
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas && canvas.parentElement) {
        // Save current content if any
        const ctx = canvas.getContext('2d');
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width || 1;
        tempCanvas.height = canvas.height || 1;
        const tempCtx = tempCanvas.getContext('2d');
        if (tempCtx && canvas.width > 0 && canvas.height > 0) {
            tempCtx.drawImage(canvas, 0, 0);
        }

        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;

        // Restore content
        if (tempCanvas.width > 1 && tempCanvas.height > 1) {
            ctx?.drawImage(tempCanvas, 0, 0);
        }
      }
    };

    // Run after a tiny delay to ensure layout is complete
    setTimeout(handleResize, 100);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      
      {/* Top Header */}
      <header className="bg-black text-white p-4 flex items-center justify-between z-20 border-b-8 border-[#FF0055]">
        <div className="flex items-center gap-4">
          <button onClick={() => setPage('home')} className="hover:text-[#00FF66] transition-colors">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-black uppercase tracking-widest"><PenTool className="inline mr-2"/> Graffiti Typewriter 2.0</h1>
        </div>
        <div className="flex gap-2">
            <button onClick={() => handleDownload(false)} className="bg-white text-black px-4 py-2 font-black uppercase text-sm flex items-center gap-2 hover:bg-[#00FF66] transition-colors border-2 border-black">
                <ImageIcon size={16} /> Save BG
            </button>
            <button onClick={() => handleDownload(true)} className="bg-[#FFFF00] text-black px-4 py-2 font-black uppercase text-sm flex items-center gap-2 hover:bg-[#00E5FF] transition-colors border-2 border-black">
                <Download size={16} /> Save PNG
            </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
        
        {/* Left Toolbar - Settings */}
        <aside className="w-full md:w-80 bg-white border-r-4 border-black overflow-y-auto p-6 flex flex-col gap-8 z-10 custom-scrollbar">
            
            <section className="space-y-4">
                <h3 className="font-black uppercase flex items-center gap-2 text-xl border-b-4 border-black pb-2"><Type size={20}/> Style Engine</h3>
                <div className="grid grid-cols-2 gap-2">
                    {(['graffiti', 'neobrutalist', 'gooey', 'comic', 'boxy'] as const).map(style => (
                        <button 
                            key={style}
                            onClick={() => setStyleMode(style)}
                            className={`p-2 border-2 border-black font-black uppercase text-xs transition-all ${styleMode === style ? 'bg-black text-white shadow-[4px_4px_0_#00FF66] -translate-y-1' : 'bg-white hover:bg-gray-100 shadow-[2px_2px_0_#000]'}`}
                        >
                            {style}
                        </button>
                    ))}
                </div>
            </section>

            <section className="space-y-4">
                <h3 className="font-black uppercase flex items-center gap-2 text-xl border-b-4 border-black pb-2"><Palette size={20}/> Color & Ink</h3>
                
                <div className="space-y-2">
                    <label className="font-bold text-xs uppercase flex justify-between">
                        Fill Color
                        <input type="color" value={fillColor} onChange={e => setFillColor(e.target.value)} className="w-6 h-6 p-0 border-2 border-black cursor-pointer"/>
                    </label>
                </div>
                
                <div className="space-y-2">
                    <label className="font-bold text-xs uppercase flex justify-between">
                        Stroke / Shadow Color
                        <input type="color" value={strokeColor} onChange={e => setStrokeColor(e.target.value)} className="w-6 h-6 p-0 border-2 border-black cursor-pointer"/>
                    </label>
                </div>

                <div className="space-y-2 pt-2">
                    <label className="font-bold text-xs uppercase flex justify-between">
                        Canvas Background
                        <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-6 h-6 p-0 border-2 border-black cursor-pointer"/>
                    </label>
                </div>
            </section>

            <section className="space-y-4">
                <h3 className="font-black uppercase flex items-center gap-2 text-xl border-b-4 border-black pb-2"><SlidersHorizontal size={20}/> Modifiers</h3>
                
                <div className="space-y-4">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-6 h-6 border-2 border-black flex items-center justify-center transition-colors ${patternEnabled ? 'bg-[#FF0055]' : 'bg-white'}`}>
                            {patternEnabled && <div className="w-2 h-2 bg-black rounded-full" />}
                        </div>
                        <span className="font-bold text-sm uppercase group-hover:text-[#FF0055] transition-colors">Dot Pattern Fill</span>
                        <input type="checkbox" checked={patternEnabled} onChange={e => setPatternEnabled(e.target.checked)} className="hidden" />
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-6 h-6 border-2 border-black flex items-center justify-center transition-colors ${gradientEnabled ? 'bg-[#00E5FF]' : 'bg-white'}`}>
                            {gradientEnabled && <div className="w-full h-1 bg-black" />}
                        </div>
                        <span className="font-bold text-sm uppercase group-hover:text-[#00E5FF] transition-colors">Linear Gradient</span>
                        <input type="checkbox" checked={gradientEnabled} onChange={e => setGradientEnabled(e.target.checked)} className="hidden" />
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-6 h-6 border-2 border-black flex items-center justify-center transition-colors ${swishesEnabled ? 'bg-[#FFFF00]' : 'bg-white'}`}>
                            {swishesEnabled && <div className="w-3 h-1 bg-black transform rotate-45" />}
                        </div>
                        <span className="font-bold text-sm uppercase group-hover:text-[#ff9900] transition-colors">Auto-Accents (Drips/Lines)</span>
                        <input type="checkbox" checked={swishesEnabled} onChange={e => setSwishesEnabled(e.target.checked)} className="hidden" />
                    </label>
                </div>

                <div className="pt-4 border-t-2 border-dashed border-gray-300">
                    <label className="font-bold text-xs uppercase mb-2 block">Font Size ({fontSize}px)</label>
                    <input 
                        type="range" 
                        min="24" max="200" 
                        value={fontSize} 
                        onChange={e => setFontSize(Number(e.target.value))}
                        className="w-full accent-black"
                    />
                </div>
            </section>

            <section className="space-y-4 bg-black text-white p-4 border-4 border-[#00FF66] shadow-[8px_8px_0_#FF0055]">
                <h3 className="font-black uppercase flex items-center gap-2 text-lg text-[#00FF66]"><Wand2 size={20}/> Generative Agent</h3>
                <p className="text-[10px] uppercase font-bold text-gray-300">Describe custom accents, swishes, or background elements.</p>
                <input 
                    type="text" 
                    value={prompt}
                    onChange={e => setPrompt(e.target.value)}
                    placeholder="e.g. 'cyberpunk grid' or 'ink splatters'"
                    className="w-full bg-gray-900 border-2 border-[#00FF66] p-2 text-white outline-none font-mono text-xs focus:bg-gray-800"
                />
                <button 
                    onClick={handleGenerate}
                    disabled={isGenerating || !prompt}
                    className="w-full bg-[#00FF66] text-black font-black uppercase py-2 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {isGenerating ? 'Synthesizing...' : 'Generate & Apply'}
                </button>
            </section>

            <div className="mt-auto pt-8">
                <button 
                    onClick={() => setChaosMode(!chaosMode)}
                    className={`w-full py-4 font-black uppercase text-sm border-4 border-black transition-all ${chaosMode ? 'bg-red-500 text-white animate-pulse shadow-[0_0_20px_red]' : 'bg-white hover:bg-red-100 shadow-[4px_4px_0_#000]'}`}
                >
                    {chaosMode ? "Disable Chaos" : "Enable Chaos Mode"}
                </button>
            </div>
        </aside>

        {/* Main Canvas Area */}
        <main className="flex-1 relative overflow-hidden flex flex-col" style={{ backgroundColor: bgColor }}>
            
            {/* Ambient background pattern for empty canvas */}
            <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'radial-gradient(circle, #000 2px, transparent 2.5px)', backgroundSize: '32px 32px' }} />
            
            {/* The Canvas */}
            <canvas 
                ref={canvasRef}
                className="absolute inset-0 w-full h-full cursor-text"
                style={{ zIndex: 5 }}
            />
            
            {/* Overlay UI */}
            <div className="absolute bottom-6 right-6 z-20 flex gap-4">
                 <button onClick={clearCanvas} className="bg-black text-white px-6 py-3 font-black uppercase text-sm hover:bg-red-500 transition-colors shadow-[6px_6px_0_#000] border-4 border-white hover:border-black">
                    Trash It [Clear]
                 </button>
            </div>

            {/* Instruction Overlay (fades out when typed) */}
            <AnimatePresence>
                {showOverlay && (
                    <motion.div 
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
                    >
                        <div className="bg-white/80 backdrop-blur border-8 border-black p-8 shadow-[16px_16px_0_#FF0055] text-center transform -rotate-2">
                            <h2 className="text-4xl font-black uppercase mb-2">Start Typing</h2>
                            <p className="font-bold text-gray-600 uppercase">Your keyboard is the spray can.</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </main>
      </div>
    </div>
  );
}