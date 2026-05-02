import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, Sliders, Activity, Disc } from 'lucide-react';

export function AcousticHero({ setPage }: { setPage: (p: string) => void }) {
  const [absorption, setAbsorption] = useState(30);
  const [resolution, setResolution] = useState(5000);

  return (
    <div className="min-h-[85vh] bg-[#0a0a0c] text-[#e0e0e0] font-mono overflow-hidden relative flex flex-col p-8 md:p-16 pt-24 pb-12">
      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-10" 
           style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Header */}
      <header className="flex justify-between items-center z-10 mb-16 opacity-70">
        <div className="flex items-center gap-3">
          <Disc className="text-emerald-400 animate-spin-slow" size={24} />
          <span className="tracking-widest uppercase text-sm">Spatial Audio Core // BEM Solver</span>
        </div>
        <div className="text-xs tracking-widest text-emerald-400">STATUS: SOLVING_HELMHOLTZ</div>
      </header>

      <div className="flex flex-col md:flex-row gap-12 z-10 flex-1 max-w-7xl mx-auto w-full">
        {/* Left Column: Typography */}
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-5xl md:text-7xl font-light tracking-tighter mb-6">
            Design for the <br />
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
              Acoustic Field.
            </span>
          </h1>
          <p className="text-gray-400 max-w-md leading-relaxed mb-8 text-sm">
            Boundary Element Method (BEM) spatialization in real-time. 
            Stop designing flat interfaces. Hear your UI components resonate in physical space with physics-accurate HRTFs.
          </p>
          <button 
            onClick={() => setPage('forge')}
            className="self-start px-6 py-3 border border-emerald-500/30 hover:bg-emerald-500/10 text-emerald-400 tracking-widest uppercase text-xs transition-colors rounded"
          >
            Initialize Mesh2HRTF
          </button>
        </div>

        {/* Right Column: Interactive Console */}
        <div className="flex-1 relative flex items-center justify-center">
          <div className="w-full max-w-md bg-[#111113] border border-gray-800 rounded-xl p-8 shadow-2xl">
            <div className="flex justify-between items-end border-b border-gray-800 pb-4 mb-6">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-300 flex items-center gap-2">
                <Sliders size={16} /> BEM Parameters
              </h3>
              <Activity className="text-emerald-400" size={16} />
            </div>

            <div className="space-y-8">
              {/* Slider 1 */}
              <div>
                <div className="flex justify-between text-xs text-gray-500 mb-2 uppercase tracking-wide">
                  <span>Material Absorption</span>
                  <span className="text-emerald-400">{(absorption / 100).toFixed(2)} α</span>
                </div>
                <input 
                  type="range" 
                  min="0" max="100" 
                  value={absorption}
                  onChange={(e) => setAbsorption(parseInt(e.target.value))}
                  className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
                <div className="flex justify-between text-[10px] text-gray-600 mt-1 uppercase">
                  <span>Metal (0.1)</span>
                  <span>Wood (0.6)</span>
                </div>
              </div>

              {/* Slider 2 */}
              <div>
                <div className="flex justify-between text-xs text-gray-500 mb-2 uppercase tracking-wide">
                  <span>Mesh Resolution</span>
                  <span className="text-cyan-400">{resolution} elements</span>
                </div>
                <input 
                  type="range" 
                  min="1000" max="50000" step="1000"
                  value={resolution}
                  onChange={(e) => setResolution(parseInt(e.target.value))}
                  className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[10px] text-gray-600 mt-1 uppercase">
                  <span>Preview</span>
                  <span>Full Export</span>
                </div>
              </div>

              {/* Real-time wave visualizer stub */}
              <div className="mt-8 pt-6 border-t border-gray-800">
                <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-3">Live Impulse Response</div>
                <div className="flex items-end gap-1 h-12">
                  {[...Array(32)].map((_, i) => (
                    <motion.div 
                      key={i} 
                      className="flex-1 bg-gradient-to-t from-emerald-500/20 to-emerald-400"
                      animate={{ 
                        height: [`20%`, `${Math.max(20, Math.random() * 100 * (absorption/50))}%`, `20%`] 
                      }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.05 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}