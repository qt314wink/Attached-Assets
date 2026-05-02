import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crosshair, Database, Cpu } from 'lucide-react';
import './_group.css';

export function Gen2B() {
  const [points, setPoints] = useState<{x: number, y: number, color: string}[]>([]);
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  useEffect(() => {
    // Generate latent space point cloud
    const newPoints = Array.from({ length: 150 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: Math.random() > 0.8 ? '#f43f5e' : (Math.random() > 0.5 ? '#8b5cf6' : '#64748b')
    }));
    setPoints(newPoints);
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-sans overflow-hidden flex flex-col md:flex-row relative">
      
      {/* Left Data Column */}
      <div className="w-full md:w-1/3 border-r border-slate-800/50 p-8 md:p-12 flex flex-col justify-between relative z-10 bg-[#020617]/80 backdrop-blur-md">
        <div>
          <div className="text-xs font-mono text-fuchsia-500 tracking-widest uppercase mb-12 flex items-center gap-2">
            <Database size={14} /> Latent Space Explorer
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
            Navigate the <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-purple-600">Sonic DNA.</span>
          </h1>
          
          <p className="text-slate-400 text-sm leading-relaxed mb-8">
            Utilize hyperellipsoidal queries to extract specific timbral regions. 
            Adjust your Mahalanobis Distance to find the exact intersection of genres in the multi-dimensional manifold.
          </p>
        </div>

        <div className="space-y-6 font-mono text-xs">
          <div className="flex justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-500">Current Model</span>
            <span className="text-white">music_dcae_f8c8</span>
          </div>
          <div className="flex justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-500">LoRA Rank</span>
            <span className="text-fuchsia-400">256 (Optimal)</span>
          </div>
          <div className="flex justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-500">Query Mode</span>
            <span className="text-purple-400">Hyperellipsoidal</span>
          </div>
          
          <button className="w-full py-4 mt-4 bg-slate-900 hover:bg-slate-800 text-white rounded-lg border border-slate-700 transition-colors flex justify-center items-center gap-2">
            <Cpu size={14} /> INJECT WEIGHTS
          </button>
        </div>
      </div>

      {/* Right Visualization Column */}
      <div className="flex-1 relative bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 to-[#020617] cursor-crosshair">
        
        {/* Latent Space Grid */}
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(circle at center, #334155 1px, transparent 1px)', 
          backgroundSize: '40px 40px',
          opacity: 0.3
        }} />

        {/* Hyperellipsoidal Target Reticle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-fuchsia-500/30 rounded-full animate-pulse pointer-events-none flex items-center justify-center">
          <div className="w-32 h-32 border border-purple-500/50 rounded-full flex items-center justify-center">
             <Crosshair className="text-fuchsia-500/50" size={24} />
          </div>
        </div>

        {/* Data Points */}
        {points.map((pt, i) => (
          <motion.div 
            key={i}
            className="absolute w-2 h-2 rounded-full cursor-pointer"
            style={{ 
              left: `${pt.x}%`, 
              top: `${pt.y}%`, 
              backgroundColor: pt.color,
              boxShadow: `0 0 10px ${pt.color}`
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: Math.random() * 0.5 + 0.3 }}
            transition={{ delay: Math.random() * 2 }}
            onMouseEnter={() => setHoveredPoint(i)}
            onMouseLeave={() => setHoveredPoint(null)}
          >
            {hoveredPoint === i && (
              <div className="absolute top-4 left-4 bg-slate-900 border border-slate-700 text-xs font-mono p-2 rounded whitespace-nowrap z-50 text-white">
                Dim[{Math.floor(pt.x)}]: {Math.floor(pt.y)} <br/>
                <span className="text-slate-500">Vector isolated</span>
              </div>
            )}
          </motion.div>
        ))}

        {/* HUD Overlay */}
        <div className="absolute bottom-8 right-8 text-right font-mono text-[10px] text-slate-500 uppercase">
          <div>D(z, c, K) = (z- c)T K⁻¹ (z- c)</div>
          <div className="text-fuchsia-500 mt-1">Vector Field: Active</div>
        </div>
      </div>
    </div>
  );
}