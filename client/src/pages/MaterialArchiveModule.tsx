import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ZoomIn, Microscope, Layers, Maximize } from 'lucide-react';

import imgThermochromic from '@assets/Slide_1777310682714_1777745431991.png';
import imgGuilloche from '@assets/Slide_1777310674498_1777745432494.png';
import imgStructuralColor from '@assets/Slide_1777310668581_1777745432502.png';
import imgTopography from '@assets/Slide_1777310644699_1777745432504.png';
import imgArchitectural from '@assets/Slide_1777310618977_1777745432507.png';
import imgVisuoHaptic from '@assets/Slide_1777310577560_1777745432509.png';
import imgLoomFramework from '@assets/Slide_1777310574403_1777745432513.png';
import imgAnimateSpectrum from '@assets/Slide_1777310567421_1777745432515.png';
import imgLenticular from '@assets/Slide_1777310563561_1777745432516.png';
import imgRehabilitation from '@assets/Slide_1777307590408_1777745432517.png';

const MATERIALS = [
  { id: 'thermo', name: 'Thermochromic', src: imgThermochromic, desc: 'Heat-reactive Leuco Dyes!' },
  { id: 'guilloche', name: 'Guilloche', src: imgGuilloche, desc: 'Algorithmic offset security!' },
  { id: 'structural', name: 'Structural Color', src: imgStructuralColor, desc: 'Holographic threads!' },
  { id: 'topography', name: 'Topography', src: imgTopography, desc: 'Z-Axis tactile alteration!' },
  { id: 'architectural', name: 'Architectural', src: imgArchitectural, desc: 'CNC knitted active structures!' },
  { id: 'visuo', name: 'Visuo-Haptic', src: imgVisuoHaptic, desc: 'Visual + physical microgeometry!' },
  { id: 'loom', name: 'Loom Framework', src: imgLoomFramework, desc: 'Rigid vs Volatile matrices!' },
  { id: 'animate', name: 'Animate Spectrum', src: imgAnimateSpectrum, desc: 'Proto-living biomaterials!' },
  { id: 'lenticular', name: 'Lenticular Lens', src: imgLenticular, desc: 'Voxel Lens Exploder!' },
  { id: 'rehab', name: 'Rehabilitation', src: imgRehabilitation, desc: 'Reality first, then action.' }
];

export default function MaterialArchiveModule({ setPage }: { setPage: (p: string) => void }) {
  const [activeId, setActiveId] = useState(MATERIALS[0].id);
  const [zoomMode, setZoomMode] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const activeMaterial = MATERIALS.find(m => m.id === activeId)!;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!zoomMode || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div className="pt-32 pb-24 px-6 bg-[#FFFF00] min-h-screen relative text-black font-sans selection:bg-black selection:text-[#FFFF00]">
      {/* Halftone Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'radial-gradient(circle, #000 2px, transparent 2.5px)', backgroundSize: '16px 16px' }} />

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        <header className="mb-12 bg-white border-[12px] border-black p-8 shadow-[20px_20px_0_#FF0055] relative flex flex-col md:flex-row justify-between items-start md:items-end">
          <div>
             <button 
              onClick={() => setPage('home')}
              className="flex items-center gap-2 font-black uppercase mb-6 text-white bg-black hover:bg-[#00FF66] hover:text-black px-6 py-3 border-[4px] border-black transition-colors w-fit text-sm shadow-[6px_6px_0_#000]"
            >
              <ArrowLeft size={20} /> Back
            </button>
            <h1 className="text-6xl md:text-8xl font-black uppercase leading-[0.8] tracking-tighter text-black" style={{ textShadow: '4px 4px 0 #00E5FF, 8px 8px 0 #000' }}>
              Material<br/>Archive
            </h1>
          </div>
          <div className="bg-black text-[#FFFF00] font-black uppercase px-6 py-3 border-[4px] border-white shadow-[8px_8px_0_#00FF66] transform rotate-3 text-2xl mt-6 md:mt-0 flex items-center gap-4">
             <Microscope /> Lab Scan!
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="lg:w-1/3 flex flex-col h-[calc(100vh-300px)] bg-white border-[8px] border-black shadow-[16px_16px_0_#000] p-6 relative z-20">
             <div className="absolute -top-6 -left-6 bg-[#FF0055] text-white p-4 border-[6px] border-black rotate-[-10deg] shadow-[6px_6px_0_#000]">
                <Layers size={32} />
             </div>
            <h2 className="text-3xl font-black uppercase mb-6 border-b-[6px] border-black pb-4 pl-12 text-black">
              Specimens
            </h2>

            <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
              {MATERIALS.map(m => (
                <button
                  key={m.id}
                  onClick={() => { setActiveId(m.id); setZoomMode(false); }}
                  className={`w-full text-left p-4 border-[4px] transition-all flex flex-col items-start gap-2 group ${
                    activeId === m.id 
                      ? 'bg-[#00FF66] border-black text-black shadow-[6px_6px_0_#000] translate-x-1' 
                      : 'bg-white border-black text-black hover:bg-gray-100 shadow-[4px_4px_0_#000]'
                  }`}
                >
                  <div className="font-black text-xl uppercase leading-none">{m.name}</div>
                  <div className={`font-bold text-xs uppercase px-2 py-1 ${activeId === m.id ? 'bg-black text-white' : 'bg-gray-200 text-black border-2 border-black'}`}>
                    {m.desc.substring(0, 30)}...
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Main Viewer */}
          <div className="lg:w-2/3 flex flex-col bg-white border-[12px] border-black shadow-[20px_20px_0_#00E5FF] p-6 relative">
            <div className="flex items-center justify-between border-b-[8px] border-black pb-6 mb-6">
              <div className="font-black text-2xl text-black uppercase flex items-center gap-4">
                <span className="bg-black text-[#FFFF00] px-3 py-1 border-[4px] border-black">Target</span> {activeMaterial.name}
              </div>
              <button 
                onClick={() => setZoomMode(!zoomMode)}
                className={`px-6 py-3 font-black uppercase text-xl flex items-center gap-2 border-[4px] border-black shadow-[6px_6px_0_#000] transition-transform hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0_#000] ${
                  zoomMode ? 'bg-[#FF0055] text-white' : 'bg-[#00E5FF] text-black'
                }`}
              >
                <ZoomIn size={24} /> {zoomMode ? 'Reset' : 'Zoom In!'}
              </button>
            </div>

            <div 
              ref={containerRef}
              onMouseMove={handleMouseMove}
              className={`relative flex-1 min-h-[500px] border-[8px] border-black bg-[#E5E5E5] overflow-hidden flex items-center justify-center shadow-[inset_12px_12px_0_rgba(0,0,0,0.1)] ${zoomMode ? 'cursor-crosshair' : 'cursor-default'}`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMaterial.id}
                  initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 1.2, rotate: 5 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 w-full h-full"
                >
                  {zoomMode ? (
                    <div 
                      className="w-full h-full bg-no-repeat"
                      style={{
                        backgroundImage: `url(${activeMaterial.src})`,
                        backgroundPosition: `${mousePos.x}% ${mousePos.y}%`,
                        backgroundSize: '250%'
                      }}
                    />
                  ) : (
                    <div className="w-full h-full p-8 flex items-center justify-center">
                       <img 
                        src={activeMaterial.src} 
                        alt={activeMaterial.name}
                        className="max-w-full max-h-full object-contain shadow-[16px_16px_0_#000] border-[8px] border-black bg-white"
                      />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {zoomMode && (
                <div className="absolute bottom-6 left-6 bg-white text-black font-black uppercase p-6 border-[6px] border-black pointer-events-none shadow-[8px_8px_0_#000] transform rotate-2">
                  <div className="text-xl mb-2 flex items-center gap-2 bg-[#FF0055] text-white px-2 w-fit">
                    <Maximize size={20} /> Telemetry!
                  </div>
                  <div className="text-2xl leading-none mb-1">X: {mousePos.x.toFixed(1)}%</div>
                  <div className="text-2xl leading-none">Y: {mousePos.y.toFixed(1)}%</div>
                  <div className="text-sm mt-2 text-[#00E5FF] bg-black px-2 py-1">2.5X MAGNIFICATION</div>
                </div>
              )}
            </div>
            
            {/* Description Footer */}
            <div className="mt-6 p-6 bg-black border-[6px] border-white font-black uppercase text-xl leading-tight text-white shadow-[8px_8px_0_#000]">
              <span className="text-[#00FF66] bg-white px-2 py-1 mr-4 border-2 border-black inline-block transform -rotate-2">DATA:</span> 
              {activeMaterial.desc}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}