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
  { id: 'thermo', name: 'Thermochromic Molecule', src: imgThermochromic, desc: 'Leuco Dyes (Closed vs Open) responding to heat.' },
  { id: 'guilloche', name: 'Guilloche & Rainbow', src: imgGuilloche, desc: 'Algorithmic geometric elements and offset security printing.' },
  { id: 'structural', name: 'Structural Color', src: imgStructuralColor, desc: 'Metallic vs Holographic threads.' },
  { id: 'topography', name: 'Topography of Touch', src: imgTopography, desc: 'Mechanical vs Chemical alteration on the Z-Axis.' },
  { id: 'architectural', name: 'Architectural Textiles', src: imgArchitectural, desc: 'Form-active structures via CNC knitting.' },
  { id: 'visuo', name: 'Visuo-Haptic Paradigm', src: imgVisuoHaptic, desc: 'Simultaneous computation of visual appearance and physical microgeometry.' },
  { id: 'loom', name: 'The Loom Framework', src: imgLoomFramework, desc: 'Rigid Matrix, Origami Matrix, and Volatile Fiber.' },
  { id: 'animate', name: 'Animate Materials Spectrum', src: imgAnimateSpectrum, desc: 'From Active & Adaptive to Proto-Living / Biomaterials.' },
  { id: 'lenticular', name: 'Lenticular Lens', src: imgLenticular, desc: 'Voxel Lens Exploder with VeroClear and VeroVivid.' },
  { id: 'rehab', name: 'Rehabilitation Protocol', src: imgRehabilitation, desc: 'Reality first, then action. The transition to accountability.' }
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
    <div className="pt-32 pb-24 px-6 bg-[#0f172a] min-h-screen relative text-white font-sans">
      <div className="max-w-7xl mx-auto relative z-10">
        <button 
          onClick={() => setPage('home')}
          className="flex items-center gap-2 font-black uppercase mb-8 text-slate-400 hover:text-white transition-colors w-fit text-sm"
        >
          <ArrowLeft size={16} /> Retreat to Nexus
        </button>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <div className="lg:w-1/3 flex flex-col h-[calc(100vh-200px)]">
            <div className="mb-8">
              <span className="text-[#38bdf8] font-black uppercase tracking-[0.3em] text-xs block mb-2">
                // MATERIA MEDICA
              </span>
              <h1 className="text-4xl font-black uppercase leading-none mb-4">
                Animate<br/>Materials
              </h1>
              <p className="text-sm font-bold text-slate-400">
                Explore the tactical convergence of structural color, visuo-haptic printing, and programmable matter.
              </p>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-4 custom-scrollbar">
              {MATERIALS.map(m => (
                <button
                  key={m.id}
                  onClick={() => { setActiveId(m.id); setZoomMode(false); }}
                  className={`w-full text-left p-4 border-2 transition-all flex items-center justify-between group ${
                    activeId === m.id 
                      ? 'bg-[#38bdf8] border-[#38bdf8] text-slate-900' 
                      : 'border-slate-800 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <div>
                    <div className="font-black text-sm uppercase mb-1">{m.name}</div>
                    <div className={`text-[10px] ${activeId === m.id ? 'text-slate-800' : 'text-slate-500'}`}>
                      {m.desc.substring(0, 40)}...
                    </div>
                  </div>
                  <Layers size={16} className={`transition-opacity ${activeId === m.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Main Viewer */}
          <div className="lg:w-2/3 flex flex-col">
            <div className="flex items-center justify-between bg-slate-900 p-4 border-t-2 border-x-2 border-slate-800">
              <div className="font-mono text-xs text-[#38bdf8] uppercase flex items-center gap-2">
                <Microscope size={14} /> Scan Target: {activeMaterial.name}
              </div>
              <button 
                onClick={() => setZoomMode(!zoomMode)}
                className={`px-4 py-2 font-black uppercase text-xs flex items-center gap-2 border-2 transition-all ${
                  zoomMode ? 'bg-[#ff6b6b] border-[#ff6b6b] text-white' : 'border-slate-700 text-slate-400 hover:text-white hover:border-slate-500'
                }`}
              >
                <ZoomIn size={14} /> {zoomMode ? 'Disable Micro-Scan' : 'Enable Micro-Scan'}
              </button>
            </div>

            <div 
              ref={containerRef}
              onMouseMove={handleMouseMove}
              className={`relative flex-1 min-h-[500px] border-2 border-slate-800 bg-black overflow-hidden flex items-center justify-center ${zoomMode ? 'cursor-crosshair' : 'cursor-default'}`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMaterial.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
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
                    <img 
                      src={activeMaterial.src} 
                      alt={activeMaterial.name}
                      className="w-full h-full object-contain p-4"
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {zoomMode && (
                <div className="absolute bottom-6 left-6 bg-black/80 backdrop-blur text-[#38bdf8] font-mono text-xs p-4 border border-slate-800 pointer-events-none">
                  <div className="font-black uppercase mb-2 text-white flex items-center gap-2">
                    <Maximize size={14} /> Telemetry
                  </div>
                  <div>X_COORD: {mousePos.x.toFixed(2)}%</div>
                  <div>Y_COORD: {mousePos.y.toFixed(2)}%</div>
                  <div className="text-[#ff6b6b] mt-1">&gt; LENS MAGNIFICATION: 2.5x</div>
                </div>
              )}
            </div>
            
            <div className="mt-4 p-6 bg-slate-900 border border-slate-800 font-mono text-sm leading-relaxed text-slate-300">
              <span className="text-[#c4ff00]">&gt; SYSTEM NOTE:</span> {activeMaterial.desc}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}