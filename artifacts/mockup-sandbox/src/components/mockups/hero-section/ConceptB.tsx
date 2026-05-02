import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, ChevronRight } from 'lucide-react';
import './_group.css';

const TypewriterText = ({ text, delay = 0, onComplete }: { text: string, delay?: number, onComplete?: () => void }) => {
  const [displayed, setDisplayed] = useState('');
  
  useEffect(() => {
    let i = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.substring(0, i));
        i++;
        if (i > text.length) {
          clearInterval(interval);
          if (onComplete) onComplete();
        }
      }, 30);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [text, delay]);

  return <span>{displayed}</span>;
};

export function ConceptB() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 1500);
    const t2 = setTimeout(() => setStep(2), 3500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#00ffcc] font-mono p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-5xl border border-[#333] bg-black/50 backdrop-blur shadow-2xl rounded-xl overflow-hidden flex flex-col h-[80vh]">
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-[#333] bg-[#111]">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="text-xs text-gray-500 flex items-center gap-2">
            <Terminal size={14} /> collective-os-kernel
          </div>
          <div className="w-16" /> {/* Spacer */}
        </div>

        {/* Terminal Body */}
        <div className="flex-1 p-6 md:p-10 overflow-y-auto custom-scrollbar text-sm md:text-base leading-relaxed">
          <div className="mb-4 text-gray-500">
            Collective OS Kernel v2.4.1 initialized.<br/>
            Establishing secure connection to decentralized network... OK.<br/>
            Loading creative modules... [||||||||||||||||||||] 100%
          </div>

          <div className="flex mb-2">
            <span className="text-pink-500 mr-2">guest@collective:~$</span>
            <TypewriterText text="whoami" />
          </div>

          {step >= 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 text-gray-300">
              User identity not found in local registry.<br/>
              Status: <span className="text-yellow-400">UNVERIFIED DISRUPTOR</span>
            </motion.div>
          )}

          {step >= 1 && (
            <div className="flex mb-2">
              <span className="text-pink-500 mr-2">guest@collective:~$</span>
              <TypewriterText text="./init --manifest" delay={500} />
            </div>
          )}

          {step >= 2 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-white border-l-2 border-[#00ffcc] pl-4 py-2 bg-[#00ffcc]/5">
              <h1 className="text-2xl md:text-4xl font-bold mb-4 uppercase text-[#00ffcc]">Welcome to the Sanctuary</h1>
              <p className="mb-4 max-w-2xl text-gray-300">
                You have accessed a decentralized operating system built exclusively for visual artists, poets, and creators who reject the algorithmic feed.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li><span className="text-[#00ffcc]">[+]</span> Build autonomous digital identities</li>
                <li><span className="text-[#00ffcc]">[+]</span> Showcase interactive components</li>
                <li><span className="text-[#00ffcc]">[+]</span> Connect with the global node network</li>
              </ul>
            </motion.div>
          )}

          {step >= 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="flex flex-col sm:flex-row gap-4 mt-8">
              <button className="px-6 py-3 bg-[#00ffcc] text-black font-bold uppercase hover:bg-white transition-colors flex items-center justify-center gap-2 group">
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                Execute Enter_Forge
              </button>
              <button className="px-6 py-3 border border-[#333] text-gray-400 hover:text-white hover:border-gray-500 transition-colors uppercase">
                Read Documentation
              </button>
            </motion.div>
          )}

          <div className="flex mt-8">
            <span className="text-pink-500 mr-2">guest@collective:~$</span>
            <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2.5 h-5 bg-[#00ffcc]" />
          </div>

        </div>
      </div>
    </div>
  );
}