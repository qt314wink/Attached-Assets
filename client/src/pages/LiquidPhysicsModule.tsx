import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, ShoppingCart, Droplets } from 'lucide-react';

export default function LiquidPhysicsModule({ setPage }: { setPage: (p: string) => void }) {
  const [droplets, setDroplets] = useState<{id: number, x: number, y: number, size: number, color: string}[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // States for individual components
  const [buttonState, setButtonState] = useState<'idle' | 'loading' | 'done'>('idle');
  const [sliderVal, setSliderVal] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [toggleState, setToggleState] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const handleButtonClick = () => {
    if (buttonState !== 'idle') return;
    setButtonState('loading');
    setTimeout(() => setButtonState('done'), 2000);
    setTimeout(() => setButtonState('idle'), 4000);
  };

  const handlePour = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newDroplets = Array.from({ length: 3 }).map((_, i) => ({
      id: Date.now() + i,
      x: x + (Math.random() - 0.5) * 60,
      y: y + (Math.random() - 0.5) * 60,
      size: Math.random() * 50 + 30,
      color: ['bg-[#FF0055]', 'bg-[#00E5FF]', 'bg-[#FFFF00]', 'bg-black'][Math.floor(Math.random() * 4)]
    }));

    setDroplets(prev => [...prev, ...newDroplets]);

    setTimeout(() => {
      setDroplets(prev => prev.filter(p => !newDroplets.find(np => np.id === p.id)));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#00E5FF] font-sans selection:bg-black selection:text-[#00E5FF] relative overflow-hidden pb-24">
      {/* THE INVISIBLE SVG FILTER ENGINE */}
      <svg className="hidden absolute w-0 h-0">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -10" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* Halftone Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'radial-gradient(circle, #000 2px, transparent 2.5px)', backgroundSize: '16px 16px' }} />

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 relative z-10 pt-8">
        
        <button 
          onClick={() => setPage('home')}
          className="flex items-center gap-2 font-black uppercase mb-8 text-black hover:text-white hover:bg-black px-4 py-2 border-[4px] border-black transition-colors w-fit text-lg shadow-[4px_4px_0_#000]"
        >
          <ArrowLeft size={24} /> Back to Nexus
        </button>

        <header className="mb-12 bg-white border-[8px] border-black p-8 md:p-12 shadow-[16px_16px_0_#000] relative">
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#FFFF00] rounded-full border-[6px] border-black flex items-center justify-center shadow-[6px_6px_0_#000] transform -rotate-12">
            <Droplets size={40} className="text-black" />
          </div>
          
          <span className="font-black uppercase tracking-widest text-xl block mb-4 bg-black text-white px-4 py-2 w-fit border-[4px] border-black transform rotate-2 shadow-[4px_4px_0_#FF0055]">
            Vol 03: The Liquid Layer
          </span>
          <h1 className="text-6xl md:text-9xl font-black uppercase leading-[0.8] mb-8 tracking-tighter text-black" style={{ textShadow: '6px 6px 0 #FFFF00, 12px 12px 0 #000' }}>
            Liquid<br/>Physics!
          </h1>
          <p className="text-2xl font-black uppercase max-w-4xl text-black border-l-[8px] border-[#FFFF00] pl-6 bg-[#E5E5E5] p-6 border-r-[8px] border-y-[8px]">
            Fluid dynamics applied to state transitions! Bypassing canvas limits using DOM-native SVG Matrix Filters for gooey, stretchy, splatter effects. Available for purchase! SPLASH!
          </p>
        </header>

        {/* Storefront Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-[minmax(400px,auto)]">
          
          {/* Item 1: Gooey Button */}
          <div className="border-[8px] border-black bg-white shadow-[12px_12px_0_#000] flex flex-col relative overflow-hidden group">
            <div className="absolute top-4 right-4 bg-[#FF0055] text-white font-black uppercase px-4 py-2 border-[4px] border-black shadow-[4px_4px_0_#000] transform rotate-6 z-20">
              $19.99
            </div>
            
            <div className="bg-[#FFFF00] flex-1 flex items-center justify-center border-b-[8px] border-black relative overflow-hidden" style={{ filter: "url(#goo)" }}>
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1.5px)', backgroundSize: '8px 8px' }} />
              
              <div className="relative">
                <motion.button 
                  onClick={handleButtonClick}
                  animate={{
                    width: buttonState === 'loading' ? 80 : buttonState === 'done' ? 80 : 200,
                    height: buttonState === 'loading' ? 80 : buttonState === 'done' ? 80 : 80,
                    backgroundColor: buttonState === 'done' ? '#00FF66' : buttonState === 'loading' ? '#000' : '#FF0055',
                  }}
                  className="relative z-20 flex items-center justify-center rounded-full text-white font-black uppercase text-2xl transition-colors overflow-hidden border-[4px] border-black"
                >
                  <AnimatePresence mode="wait">
                    {buttonState === 'idle' && <motion.span key="idle">Ignite</motion.span>}
                    {buttonState === 'loading' && (
                      <motion.div key="loading" className="absolute inset-0 flex items-end justify-center rounded-full overflow-hidden">
                         <motion.div 
                           initial={{ height: "0%" }}
                           animate={{ height: "100%" }}
                           transition={{ duration: 1.8, ease: "easeInOut" }}
                           className="w-full bg-[#00FF66]"
                         />
                      </motion.div>
                    )}
                    {buttonState === 'done' && <motion.div key="done" className="text-black z-10"><Check size={40} strokeWidth={4} /></motion.div>}
                  </AnimatePresence>
                </motion.button>
                
                {/* Goo bubbles */}
                <motion.div 
                  animate={{
                    scale: buttonState === 'loading' ? [1, 1.5, 1] : 1,
                    x: buttonState === 'loading' ? [0, -40, 0] : 0,
                    y: buttonState === 'loading' ? [0, -50, 0] : 0,
                    backgroundColor: buttonState === 'done' ? '#00FF66' : '#FF0055',
                  }}
                  transition={{ repeat: buttonState === 'loading' ? Infinity : 0, duration: 0.8 }}
                  className="absolute top-0 left-4 w-12 h-12 rounded-full -z-10 transition-colors border-[4px] border-black group-hover:-translate-y-8 group-hover:translate-x-4" 
                />
                <motion.div 
                  animate={{
                    scale: buttonState === 'loading' ? [1, 1.8, 1] : 1,
                    x: buttonState === 'loading' ? [0, 50, 0] : 0,
                    y: buttonState === 'loading' ? [0, 40, 0] : 0,
                    backgroundColor: buttonState === 'done' ? '#00FF66' : '#FF0055',
                  }}
                  transition={{ repeat: buttonState === 'loading' ? Infinity : 0, duration: 1.2 }}
                  className="absolute bottom-0 right-4 w-10 h-10 rounded-full -z-10 transition-colors border-[4px] border-black group-hover:translate-y-8 group-hover:-translate-x-6" 
                />
              </div>
            </div>

            <div className="p-6 flex flex-col justify-between bg-white z-10">
              <div>
                <h3 className="font-black uppercase text-2xl mb-2">The Igniter Button</h3>
                <p className="font-bold text-gray-600 uppercase text-sm mb-4">State Shift with fluid volume retention.</p>
              </div>
              <button className="w-full bg-black text-white font-black uppercase py-4 flex items-center justify-center gap-2 hover:bg-[#00E5FF] hover:text-black border-[4px] border-black transition-colors">
                <ShoppingCart size={20} /> Add to Cart
              </button>
            </div>
          </div>

          {/* Item 2: Elastic Slider */}
          <div className="border-[8px] border-black bg-white shadow-[12px_12px_0_#000] flex flex-col relative overflow-hidden group">
            <div className="absolute top-4 right-4 bg-[#FF0055] text-white font-black uppercase px-4 py-2 border-[4px] border-black shadow-[4px_4px_0_#000] transform -rotate-3 z-20">
              $24.99
            </div>
            
            <div className="bg-[#FF9900] flex-1 flex flex-col items-center justify-center border-b-[8px] border-black relative px-8" style={{ filter: "url(#goo)" }}>
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1.5px)', backgroundSize: '8px 8px' }} />
              
              <div className="relative w-full h-32 flex items-center justify-center z-10">
                <div className="absolute w-full h-4 bg-black rounded-full border-[2px] border-black" />
                
                <div 
                  className="absolute left-0 h-8 bg-white border-[4px] border-black rounded-full transition-all"
                  style={{ width: `calc(${sliderVal}% + 24px)` }}
                />

                <input 
                  type="range" min="0" max="100" value={sliderVal} 
                  onMouseDown={() => setIsDragging(true)}
                  onMouseUp={() => setIsDragging(false)}
                  onTouchStart={() => setIsDragging(true)}
                  onTouchEnd={() => setIsDragging(false)}
                  onChange={(e) => setSliderVal(parseInt(e.target.value))}
                  className="absolute w-full h-full opacity-0 z-20 cursor-grab active:cursor-grabbing"
                />
                
                <motion.div 
                  animate={{ 
                    scale: isDragging ? 0.8 : 1,
                    height: isDragging ? '56px' : '48px',
                    width: isDragging ? '56px' : '48px',
                  }}
                  className="absolute bg-white border-[6px] border-black rounded-full z-10 flex items-center justify-center pointer-events-none shadow-inner"
                  style={{ left: `calc(${sliderVal}% - 24px)` }}
                >
                  <div className="w-4 h-4 bg-black rounded-full" />
                </motion.div>
                
                {/* Stretching goop effect */}
                <motion.div 
                  animate={{ scale: isDragging ? 0.6 : 1, opacity: isDragging ? 1 : 0 }}
                  className="absolute bg-white border-[4px] border-black rounded-full w-8 h-8 pointer-events-none transition-all duration-150 ease-out"
                  style={{ left: `calc(${sliderVal}% - 16px)`, transform: isDragging ? 'translateX(-25px)' : 'translateX(0)' }}
                />
              </div>

              <div className="text-5xl font-black text-black tracking-tighter" style={{ WebkitTextStroke: '1px white' }}>
                {sliderVal}%
              </div>
            </div>

            <div className="p-6 flex flex-col justify-between bg-white z-10">
              <div>
                <h3 className="font-black uppercase text-2xl mb-2">Elastic Goo Slider</h3>
                <p className="font-bold text-gray-600 uppercase text-sm mb-4">Viscous dragging with snap-back physics.</p>
              </div>
              <button className="w-full bg-black text-white font-black uppercase py-4 flex items-center justify-center gap-2 hover:bg-[#00E5FF] hover:text-black border-[4px] border-black transition-colors">
                <ShoppingCart size={20} /> Add to Cart
              </button>
            </div>
          </div>

          {/* Item 3: Splatter Canvas */}
          <div className="border-[8px] border-black bg-white shadow-[12px_12px_0_#000] flex flex-col relative overflow-hidden group md:col-span-2 lg:col-span-1">
            <div className="absolute top-4 right-4 bg-[#FF0055] text-white font-black uppercase px-4 py-2 border-[4px] border-black shadow-[4px_4px_0_#000] transform rotate-3 z-20">
              $29.99
            </div>
            
            <div 
              ref={containerRef}
              onMouseMove={(e) => { if (e.buttons === 1) handlePour(e); }}
              onClick={handlePour}
              className="bg-[#00E5FF] flex-1 border-b-[8px] border-black relative overflow-hidden cursor-crosshair" 
              style={{ filter: "url(#goo)" }}
            >
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1.5px)', backgroundSize: '8px 8px' }} />
              
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="font-black text-3xl uppercase tracking-widest text-black transform -rotate-12 bg-white px-4 py-2 border-[4px] border-black">Click & Drag</span>
              </div>

              {droplets.map(drop => (
                <motion.div
                  key={drop.id}
                  initial={{ opacity: 1, scale: 1 }}
                  animate={{ opacity: 0, scale: 2, y: drop.y + 150 }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  className={`absolute rounded-full border-[4px] border-black ${drop.color}`}
                  style={{
                    left: drop.x - drop.size/2,
                    top: drop.y - drop.size/2,
                    width: drop.size,
                    height: drop.size,
                  }}
                />
              ))}
            </div>

            <div className="p-6 flex flex-col justify-between bg-white z-10">
              <div>
                <h3 className="font-black uppercase text-2xl mb-2">Splatter Engine</h3>
                <p className="font-bold text-gray-600 uppercase text-sm mb-4">Interactive fluid emission on cursor drag.</p>
              </div>
              <button className="w-full bg-black text-white font-black uppercase py-4 flex items-center justify-center gap-2 hover:bg-[#FFFF00] hover:text-black border-[4px] border-black transition-colors">
                <ShoppingCart size={20} /> Add to Cart
              </button>
            </div>
          </div>

          {/* Item 4: Liquid Tabs */}
          <div className="border-[8px] border-black bg-white shadow-[12px_12px_0_#000] flex flex-col relative overflow-hidden group">
            <div className="absolute top-4 right-4 bg-[#FF0055] text-white font-black uppercase px-4 py-2 border-[4px] border-black shadow-[4px_4px_0_#000] transform rotate-6 z-20">
              $14.99
            </div>
            
            <div className="bg-[#c4ff00] flex-1 flex flex-col items-center justify-center border-b-[8px] border-black relative overflow-hidden p-8" style={{ filter: "url(#goo)" }}>
               <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1.5px)', backgroundSize: '8px 8px' }} />
               
               <div className="relative flex bg-black p-2 border-[4px] border-black rounded-full z-10 w-full max-w-[280px]">
                 {/* Active background indicator */}
                 <motion.div 
                    layoutId="activeTabGoo"
                    className="absolute top-2 bottom-2 bg-white rounded-full border-[4px] border-black"
                    style={{ width: 'calc(33.33% - 5.33px)' }}
                    initial={false}
                    animate={{ x: `calc(${activeTab * 100}% + ${activeTab * 8}px)` }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                 />
                 {[0, 1, 2].map((idx) => (
                   <button 
                     key={idx}
                     onClick={() => setActiveTab(idx)}
                     className="flex-1 relative z-10 py-3 text-center font-black uppercase text-xl transition-colors mix-blend-exclusion text-white"
                   >
                     {idx + 1}
                   </button>
                 ))}
               </div>
            </div>

            <div className="p-6 flex flex-col justify-between bg-white z-10">
              <div>
                <h3 className="font-black uppercase text-2xl mb-2">Gooey Tabs</h3>
                <p className="font-bold text-gray-600 uppercase text-sm mb-4">Navigation indicator with fluid stretching.</p>
              </div>
              <button className="w-full bg-black text-white font-black uppercase py-4 flex items-center justify-center gap-2 hover:bg-[#00E5FF] hover:text-black border-[4px] border-black transition-colors">
                <ShoppingCart size={20} /> Add to Cart
              </button>
            </div>
          </div>

          {/* Item 5: Morph Spinner */}
          <div className="border-[8px] border-black bg-white shadow-[12px_12px_0_#000] flex flex-col relative overflow-hidden group">
            <div className="absolute top-4 right-4 bg-[#FF0055] text-white font-black uppercase px-4 py-2 border-[4px] border-black shadow-[4px_4px_0_#000] transform -rotate-6 z-20">
              $9.99
            </div>
            
            <div className="bg-[#FF3366] flex-1 flex flex-col items-center justify-center border-b-[8px] border-black relative overflow-hidden" style={{ filter: "url(#goo)" }}>
               <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1.5px)', backgroundSize: '8px 8px' }} />
               
               <div className="relative w-32 h-32 flex items-center justify-center z-10">
                 {[0, 1, 2, 3].map((i) => (
                   <motion.div
                     key={i}
                     animate={{
                       rotate: [0, 360],
                       scale: [1, 1.5, 1],
                     }}
                     transition={{
                       duration: 2,
                       repeat: Infinity,
                       ease: "easeInOut",
                       delay: i * 0.2
                     }}
                     className="absolute w-12 h-12 bg-[#00E5FF] border-[4px] border-black rounded-full"
                     style={{ originX: 2, originY: 2 }}
                   />
                 ))}
                 <div className="w-16 h-16 bg-white border-[6px] border-black rounded-full z-20 absolute" />
               </div>
            </div>

            <div className="p-6 flex flex-col justify-between bg-white z-10">
              <div>
                <h3 className="font-black uppercase text-2xl mb-2">Morph Spinner</h3>
                <p className="font-bold text-gray-600 uppercase text-sm mb-4">Loading state that organically bubbles.</p>
              </div>
              <button className="w-full bg-black text-white font-black uppercase py-4 flex items-center justify-center gap-2 hover:bg-[#FFFF00] hover:text-black border-[4px] border-black transition-colors">
                <ShoppingCart size={20} /> Add to Cart
              </button>
            </div>
          </div>

          {/* Item 6: Blob Toggle */}
          <div className="border-[8px] border-black bg-white shadow-[12px_12px_0_#000] flex flex-col relative overflow-hidden group">
            <div className="absolute top-4 right-4 bg-[#FF0055] text-white font-black uppercase px-4 py-2 border-[4px] border-black shadow-[4px_4px_0_#000] transform rotate-2 z-20">
              $12.99
            </div>
            
            <div className="bg-black flex-1 flex flex-col items-center justify-center border-b-[8px] border-black relative overflow-hidden" style={{ filter: "url(#goo)" }}>
               <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1.5px)', backgroundSize: '8px 8px' }} />
               
               <button 
                 onClick={() => setToggleState(!toggleState)}
                 className="relative w-48 h-24 bg-white border-[6px] border-black rounded-full p-2 flex items-center z-10 outline-none"
               >
                 <motion.div 
                   animate={{ x: toggleState ? 96 : 0, backgroundColor: toggleState ? '#00FF66' : '#FF0055' }}
                   transition={{ type: "spring", stiffness: 500, damping: 20 }}
                   className="w-16 h-16 rounded-full border-[6px] border-black z-20 flex items-center justify-center relative"
                 >
                   <div className="w-4 h-4 bg-black rounded-full" />
                   
                   {/* Trailing goop */}
                   <motion.div 
                     animate={{ opacity: 1, scale: [1, 0.8, 1], x: toggleState ? -20 : 20 }}
                     transition={{ duration: 0.3 }}
                     className="absolute w-8 h-8 rounded-full border-[4px] border-black -z-10"
                     style={{ backgroundColor: toggleState ? '#00FF66' : '#FF0055' }}
                   />
                 </motion.div>
                 
                 <div className="absolute inset-0 flex justify-between items-center px-8 pointer-events-none font-black uppercase text-2xl text-black/20">
                   <span>Off</span>
                   <span>On</span>
                 </div>
               </button>
            </div>

            <div className="p-6 flex flex-col justify-between bg-white z-10">
              <div>
                <h3 className="font-black uppercase text-2xl mb-2">Blob Switch</h3>
                <p className="font-bold text-gray-600 uppercase text-sm mb-4">A boolean toggle with viscous snapping.</p>
              </div>
              <button className="w-full bg-black text-white font-black uppercase py-4 flex items-center justify-center gap-2 hover:bg-[#00E5FF] hover:text-black border-[4px] border-black transition-colors">
                <ShoppingCart size={20} /> Add to Cart
              </button>
            </div>
          </div>

          {/* Item 7: Liquid Checkbox */}
          <div className="border-[8px] border-black bg-white shadow-[12px_12px_0_#000] flex flex-col relative overflow-hidden group">
            <div className="absolute top-4 right-4 bg-[#FF0055] text-white font-black uppercase px-4 py-2 border-[4px] border-black shadow-[4px_4px_0_#000] transform rotate-6 z-20">
              $7.99
            </div>
            
            <div className="bg-[#00FF66] flex-1 flex flex-col items-center justify-center border-b-[8px] border-black relative overflow-hidden" style={{ filter: "url(#goo)" }}>
               <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1.5px)', backgroundSize: '8px 8px' }} />
               
               <label className="relative cursor-pointer z-10 flex items-center justify-center w-32 h-32">
                 <input type="checkbox" className="peer sr-only" />
                 {/* Box */}
                 <div className="w-16 h-16 border-[6px] border-black bg-white transition-all peer-checked:bg-black peer-checked:border-black rounded-xl z-20 flex items-center justify-center">
                    <Check size={32} strokeWidth={4} className="text-[#00FF66] opacity-0 peer-checked:opacity-100 transition-opacity delay-100" />
                 </div>
                 {/* Splash drops */}
                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
                   <div className="w-10 h-10 bg-black rounded-full absolute opacity-0 peer-checked:opacity-100 peer-checked:animate-[splash_0.6s_ease-out_forwards]" style={{ '--splash-x': '-30px', '--splash-y': '-30px' } as any} />
                   <div className="w-8 h-8 bg-black rounded-full absolute opacity-0 peer-checked:opacity-100 peer-checked:animate-[splash_0.5s_ease-out_forwards]" style={{ '--splash-x': '30px', '--splash-y': '-20px' } as any} />
                   <div className="w-12 h-12 bg-black rounded-full absolute opacity-0 peer-checked:opacity-100 peer-checked:animate-[splash_0.7s_ease-out_forwards]" style={{ '--splash-x': '0px', '--splash-y': '40px' } as any} />
                 </div>
               </label>
               <style>{`
                 @keyframes splash {
                   0% { transform: translate(0, 0) scale(1); opacity: 1; }
                   50% { opacity: 1; }
                   100% { transform: translate(var(--splash-x), var(--splash-y)) scale(0); opacity: 0; }
                 }
               `}</style>
            </div>

            <div className="p-6 flex flex-col justify-between bg-white z-10">
              <div>
                <h3 className="font-black uppercase text-2xl mb-2">Splash Checkbox</h3>
                <p className="font-bold text-gray-600 uppercase text-sm mb-4">Emits viscous ink droplets on checked state.</p>
              </div>
              <button className="w-full bg-black text-white font-black uppercase py-4 flex items-center justify-center gap-2 hover:bg-[#FFFF00] hover:text-black border-[4px] border-black transition-colors">
                <ShoppingCart size={20} /> Add to Cart
              </button>
            </div>
          </div>

          {/* Item 8: Melting Card */}
          <div className="border-[8px] border-black bg-white shadow-[12px_12px_0_#000] flex flex-col relative overflow-hidden group">
            <div className="absolute top-4 right-4 bg-[#FF0055] text-white font-black uppercase px-4 py-2 border-[4px] border-black shadow-[4px_4px_0_#000] transform -rotate-2 z-20">
              $19.99
            </div>
            
            <div className="bg-[#FFFF00] flex-1 flex flex-col items-center justify-center border-b-[8px] border-black relative overflow-hidden" style={{ filter: "url(#goo)" }}>
               <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1.5px)', backgroundSize: '8px 8px' }} />
               
               <div className="relative z-10 bg-black text-white border-[6px] border-black p-4 w-40 h-40 flex items-center justify-center hover:-translate-y-4 transition-transform duration-500">
                 <span className="font-black uppercase text-xl">Hover Me</span>
                 
                 {/* Drips */}
                 <div className="absolute top-full left-4 w-6 h-12 bg-black rounded-b-full origin-top transition-all duration-500 scale-y-0 group-hover:scale-y-100 delay-100" />
                 <div className="absolute top-full left-12 w-4 h-8 bg-black rounded-b-full origin-top transition-all duration-500 scale-y-0 group-hover:scale-y-100 delay-200" />
                 <div className="absolute top-full right-8 w-8 h-16 bg-black rounded-b-full origin-top transition-all duration-500 scale-y-0 group-hover:scale-y-100 delay-75" />
                 <div className="absolute top-full right-2 w-3 h-6 bg-black rounded-b-full origin-top transition-all duration-500 scale-y-0 group-hover:scale-y-100 delay-300" />
                 
                 {/* Falling droplets */}
                 <div className="absolute top-full left-4 w-6 h-6 bg-black rounded-full opacity-0 group-hover:animate-[drip_1.5s_ease-in_infinite_0.6s]" />
                 <div className="absolute top-full right-8 w-8 h-8 bg-black rounded-full opacity-0 group-hover:animate-[drip_2s_ease-in_infinite_0.8s]" />
               </div>
               <style>{`
                 @keyframes drip {
                   0% { transform: translateY(0) scale(1); opacity: 1; }
                   80% { opacity: 1; }
                   100% { transform: translateY(100px) scale(0.5); opacity: 0; }
                 }
               `}</style>
            </div>

            <div className="p-6 flex flex-col justify-between bg-white z-10">
              <div>
                <h3 className="font-black uppercase text-2xl mb-2">Melting Card</h3>
                <p className="font-bold text-gray-600 uppercase text-sm mb-4">Surfaces that lose structural integrity.</p>
              </div>
              <button className="w-full bg-black text-white font-black uppercase py-4 flex items-center justify-center gap-2 hover:bg-[#00E5FF] hover:text-black border-[4px] border-black transition-colors">
                <ShoppingCart size={20} /> Add to Cart
              </button>
            </div>
          </div>

          {/* Item 9: Stringy Menu */}
          <div className="border-[8px] border-black bg-white shadow-[12px_12px_0_#000] flex flex-col relative overflow-hidden group">
            <div className="absolute top-4 right-4 bg-[#FF0055] text-white font-black uppercase px-4 py-2 border-[4px] border-black shadow-[4px_4px_0_#000] transform rotate-4 z-20">
              $21.99
            </div>
            
            <div className="bg-[#FF9900] flex-1 flex flex-col items-center justify-center border-b-[8px] border-black relative overflow-hidden" style={{ filter: "url(#goo)" }}>
               <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1.5px)', backgroundSize: '8px 8px' }} />
               
               <div className="relative z-10 w-48 h-48 flex items-center justify-center cursor-pointer">
                 {/* Sub Items */}
                 <div className="absolute w-12 h-12 bg-white border-[4px] border-black rounded-full transition-transform duration-500 group-hover:-translate-y-16 group-hover:-translate-x-12" />
                 <div className="absolute w-12 h-12 bg-white border-[4px] border-black rounded-full transition-transform duration-500 group-hover:-translate-y-20 group-hover:translate-x-0 delay-75" />
                 <div className="absolute w-12 h-12 bg-white border-[4px] border-black rounded-full transition-transform duration-500 group-hover:-translate-y-16 group-hover:translate-x-12 delay-150" />
                 
                 {/* Main Button */}
                 <div className="w-20 h-20 bg-black border-[4px] border-black rounded-full z-20 flex items-center justify-center transition-transform group-hover:scale-90">
                   <div className="w-8 h-1 bg-white rounded-full relative before:absolute before:-top-3 before:w-8 before:h-1 before:bg-white before:rounded-full after:absolute after:top-3 after:w-8 after:h-1 after:bg-white after:rounded-full transition-all group-hover:rotate-180" />
                 </div>
               </div>
            </div>

            <div className="p-6 flex flex-col justify-between bg-white z-10">
              <div>
                <h3 className="font-black uppercase text-2xl mb-2">Viscous FAB</h3>
                <p className="font-bold text-gray-600 uppercase text-sm mb-4">Floating Action Button that spawns gooey children.</p>
              </div>
              <button className="w-full bg-black text-white font-black uppercase py-4 flex items-center justify-center gap-2 hover:bg-[#FF0055] hover:text-black border-[4px] border-black transition-colors">
                <ShoppingCart size={20} /> Add to Cart
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}