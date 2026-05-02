import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Activity, Battery, Volume2, Shield } from 'lucide-react';

export default function BiomimesisModule({ setPage }: { setPage: (p: string) => void }) {
  const [stressLevel, setStressLevel] = useState(30); // 0-100
  const [batteryLevel, setBatteryLevel] = useState(80); // 0-100

  const isQuietMode = stressLevel > 70;
  const isEnergySaver = batteryLevel < 20;

  // Sentient UI dynamic classes
  const bgColor = isEnergySaver ? 'bg-[#050505]' : (isQuietMode ? 'bg-[#f0f4f8]' : 'bg-[#e2e8f0]');
  const textColor = isEnergySaver ? 'text-gray-500' : (isQuietMode ? 'text-slate-600' : 'text-slate-900');
  const cardClass = isEnergySaver 
    ? 'bg-black border border-gray-800' 
    : (isQuietMode ? 'bg-white border-none shadow-sm rounded-3xl' : 'bg-white/40 backdrop-blur-xl border border-white/50 shadow-xl rounded-xl');

  return (
    <div className={`pt-32 pb-24 px-6 min-h-screen transition-colors duration-1000 ${bgColor} ${textColor}`}>
      <div className="max-w-6xl mx-auto relative z-10">
        <button 
          onClick={() => setPage('home')}
          className={`flex items-center gap-2 font-black uppercase mb-12 px-4 py-2 border-2 transition-all w-fit ${
            isEnergySaver ? 'text-gray-500 border-transparent hover:border-gray-500' 
            : 'text-current border-transparent hover:border-current'
          }`}
        >
          <ArrowLeft size={16} /> Back to Systems
        </button>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="lg:w-1/3">
            <h1 className={`text-5xl md:text-7xl font-black uppercase leading-none mb-6 transition-all ${isEnergySaver ? 'opacity-50' : ''}`}>
              SENTIENT<br/>UX
            </h1>
            <p className={`text-lg font-bold mb-12 transition-all ${isQuietMode ? 'opacity-60' : 'opacity-80'}`}>
              The interface is an organism. It adapts its layout, colors, and sensory feedback based on your physiological stress and device state.
            </p>

            <div className="space-y-8 p-6 bg-black/5 rounded-2xl backdrop-blur">
              <div>
                <label className="flex justify-between font-black uppercase text-xs mb-4">
                  <span className="flex items-center gap-2"><Activity size={14}/> User Stress Level</span>
                  <span>{stressLevel}%</span>
                </label>
                <input 
                  type="range" 
                  min="0" max="100" 
                  value={stressLevel} 
                  onChange={(e) => setStressLevel(parseInt(e.target.value))}
                  className="w-full accent-black"
                />
                <p className="text-[10px] mt-2 opacity-60">High stress triggers "Quiet Mode" (Trauma-Informed Design)</p>
              </div>

              <div>
                <label className="flex justify-between font-black uppercase text-xs mb-4">
                  <span className="flex items-center gap-2"><Battery size={14}/> Device Battery</span>
                  <span>{batteryLevel}%</span>
                </label>
                <input 
                  type="range" 
                  min="0" max="100" 
                  value={batteryLevel} 
                  onChange={(e) => setBatteryLevel(parseInt(e.target.value))}
                  className="w-full accent-black"
                />
                <p className="text-[10px] mt-2 opacity-60">Low battery triggers "Regenerative Energy-Aware UI"</p>
              </div>
            </div>
          </div>

          <div className="lg:w-2/3 w-full">
            <div className="grid grid-cols-2 gap-4">
              <AnimatePresence mode="popLayout">
                <motion.div 
                  layout
                  className={`col-span-2 p-8 transition-all duration-1000 ${cardClass}`}
                >
                  <h3 className="font-black uppercase mb-2">Mycelial Network Status</h3>
                  <div className={`h-24 w-full rounded-lg flex items-center justify-center transition-all ${isEnergySaver ? 'bg-gray-900' : 'bg-gradient-to-r from-teal-200 to-emerald-200'}`}>
                    {isQuietMode ? 'Systems Normal. Take a breath.' : 'Decentralized Architecture Active'}
                  </div>
                </motion.div>

                {!isQuietMode && (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className={`p-8 transition-all duration-1000 ${cardClass}`}
                  >
                    <Volume2 className="mb-4 opacity-50" />
                    <h4 className="font-black uppercase text-sm mb-1">Digital Synesthesia</h4>
                    <p className="text-xs opacity-70">Organic soundscapes enabled.</p>
                  </motion.div>
                )}

                <motion.div 
                  layout
                  className={`p-8 transition-all duration-1000 ${isQuietMode ? 'col-span-2' : 'col-span-1'} ${cardClass}`}
                >
                  <Shield className="mb-4 opacity-50" />
                  <h4 className="font-black uppercase text-sm mb-1">Psychological Safety</h4>
                  <p className="text-xs opacity-70">
                    {isQuietMode 
                      ? 'Quiet mode engaged. Intrusive elements filtered. Ventral Vagal state prioritized.'
                      : 'Predictable patterns established.'}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}