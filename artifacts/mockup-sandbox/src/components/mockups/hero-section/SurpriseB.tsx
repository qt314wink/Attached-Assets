import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './_group.css';

const DATA_STREAMS = [
  "minting_node_0x8f2... SUCCESS",
  "routing_asset_ipfs... OK",
  "verifying_signature... VALID",
  "compiling_shader_graph... DONE",
  "syncing_peer_state... 24k nodes",
  "deploying_smart_contract... PENDING"
];

export function SurpriseB() {
  const [logs, setLogs] = useState<string[]>([]);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs(prev => {
        const newLog = DATA_STREAMS[Math.floor(Math.random() * DATA_STREAMS.length)];
        return [...prev.slice(-15), newLog];
      });
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-mono overflow-hidden relative flex flex-col md:flex-row">
      
      {/* Left Data Column - Continuous Waterfall */}
      <div 
        className="hidden md:flex w-1/3 border-r border-[#333] flex-col justify-end p-8 relative overflow-hidden"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Gradient fade out at top */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent z-10" />
        
        <div className="flex flex-col gap-2 text-xs md:text-sm text-gray-500 opacity-60 transition-opacity duration-300" style={{ opacity: hovered ? 1 : 0.4 }}>
          <AnimatePresence>
            {logs.map((log, i) => (
              <motion.div 
                key={`${i}-${log}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={log.includes('SUCCESS') || log.includes('OK') || log.includes('VALID') ? 'text-[#c4ff00]' : ''}
              >
                &gt; {log}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Right Content Column */}
      <div className="flex-1 flex flex-col justify-center p-8 md:p-24 relative">
        <div className="absolute top-8 right-8 text-xs text-gray-500 uppercase tracking-widest">
          Node Status: Active
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-[8rem] font-black uppercase leading-[0.8] tracking-tighter mb-8 text-white">
            Raw <br/>
            <span className="text-[#c4ff00]">Output.</span>
          </h1>

          <p className="text-xl md:text-2xl font-light text-gray-400 mb-12 max-w-xl">
            A decentralized sanctuary for visual artists. We stripped away the marketing fluff to show you the engine underneath.
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
            <button className="bg-white text-black font-black uppercase tracking-widest px-8 py-5 hover:bg-[#c4ff00] transition-colors w-fit">
              Connect Wallet / Enter Forge
            </button>
            <button className="border-b-2 border-gray-600 text-gray-400 font-bold uppercase tracking-widest px-4 py-5 hover:text-white hover:border-white transition-colors w-fit">
              View Global Feed
            </button>
          </div>
        </motion.div>

        {/* Brutalist Decorative Block */}
        <div className="absolute bottom-8 right-8 w-32 h-32 border-4 border-[#333] p-2 flex flex-col justify-between">
           <div className="text-[#c4ff00] font-black text-2xl">24K</div>
           <div className="text-[10px] uppercase text-gray-500 tracking-widest">Connected<br/>Entities</div>
        </div>
      </div>

    </div>
  );
}