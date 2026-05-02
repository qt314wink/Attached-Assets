import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ShieldCheck, Zap, HeartPulse, Activity, Skull, Trophy } from 'lucide-react';

export default function BestiaryModule({ setPage }: { setPage: (p: string) => void }) {
  const [battleState, setBattleState] = useState<'intro' | 'choice' | 'victory' | 'sympathetic'>('intro');
  const [playerHp, setPlayerHp] = useState(100);
  const [enemyHp, setEnemyHp] = useState(100);

  const attack = () => {
    // Player attacks
    const damage = Math.floor(Math.random() * 20) + 15;
    setEnemyHp(prev => Math.max(0, prev - damage));
    
    if (enemyHp - damage <= 0) {
      setTimeout(() => setBattleState('victory'), 1000);
      return;
    }

    // Enemy counters
    setTimeout(() => {
      setBattleState('sympathetic');
      const enemyDmg = Math.floor(Math.random() * 25) + 10;
      setPlayerHp(prev => Math.max(0, prev - enemyDmg));
    }, 1000);
  };

  const heal = () => {
    setPlayerHp(prev => Math.min(100, prev + 30));
    setBattleState('choice');
  };

  return (
    <div className="min-h-screen bg-[#111] font-sans selection:bg-[#FF0055] selection:text-white relative overflow-hidden pb-24">
      {/* Heavy Grit Background */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-50 mix-blend-overlay" />
      
      {/* Screen flash on damage */}
      <AnimatePresence>
        {battleState === 'sympathetic' && (
          <motion.div 
            initial={{ opacity: 0.8, backgroundColor: '#FF0055' }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 pointer-events-none mix-blend-color"
          />
        )}
      </AnimatePresence>

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative z-10 pt-8">
        
        <header className="flex justify-between items-end mb-12 border-b-[8px] border-white pb-8">
          <div>
            <button 
              onClick={() => setPage('home')}
              className="flex items-center gap-2 font-black uppercase mb-6 text-white hover:text-black hover:bg-white px-4 py-2 border-[4px] border-white transition-colors w-fit text-sm"
            >
              <ArrowLeft size={16} /> Retreat
            </button>
            <h1 className="text-5xl md:text-7xl font-black uppercase leading-[0.8] tracking-tighter text-white" style={{ textShadow: '4px 4px 0 #FF0055' }}>
              Combat Engine
            </h1>
          </div>
          <div className="bg-[#FFFF00] text-black px-6 py-2 border-[4px] border-black font-black uppercase text-xl rotate-3 shadow-[6px_6px_0_#00E5FF]">
             Battle Mode
          </div>
        </header>

        {/* HUD: Health Bars */}
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-12">
           {/* Player HUD */}
           <div className="flex-1 bg-white border-[6px] border-black p-4 shadow-[8px_8px_0_#00FF66] transform -rotate-1 relative">
             <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#00FF66] rounded-full border-[4px] border-black flex items-center justify-center">
               <ShieldCheck className="text-black" />
             </div>
             <h3 className="font-black uppercase text-xl ml-10">You (Creator)</h3>
             <div className="w-full h-8 bg-gray-200 border-[4px] border-black mt-2 relative">
               <motion.div 
                 className="absolute left-0 top-0 bottom-0 bg-[#00FF66] border-r-[4px] border-black" 
                 animate={{ width: `${playerHp}%` }} 
                 transition={{ type: 'spring' }}
               />
             </div>
             <p className="font-black text-right mt-1">{playerHp} / 100 HP</p>
           </div>

           {/* Enemy HUD */}
           <div className="flex-1 bg-white border-[6px] border-black p-4 shadow-[8px_8px_0_#FF0055] transform rotate-1 relative">
             <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#FF0055] rounded-full border-[4px] border-black flex items-center justify-center">
               <Skull className="text-white" />
             </div>
             <h3 className="font-black uppercase text-xl text-right mr-10">The Distortion</h3>
             <div className="w-full h-8 bg-gray-200 border-[4px] border-black mt-2 relative flex justify-end">
               <motion.div 
                 className="absolute right-0 top-0 bottom-0 bg-[#FF0055] border-l-[4px] border-black" 
                 animate={{ width: `${enemyHp}%` }} 
                 transition={{ type: 'spring' }}
               />
             </div>
             <p className="font-black text-left mt-1">{enemyHp} / 100 HP</p>
           </div>
        </div>

        {/* Battle Arena */}
        <div className="relative aspect-video bg-[#E5E5E5] border-[12px] border-white shadow-[16px_16px_0_#FF0055] mb-8 overflow-hidden flex items-center justify-center">
           {/* Arena Background */}
           <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #000 4px, transparent 4px)', backgroundSize: '32px 32px' }} />
           
           <AnimatePresence mode="wait">
             {battleState === 'intro' && (
               <motion.div 
                 key="intro"
                 initial={{ scale: 0, rotate: 180 }}
                 animate={{ scale: 1, rotate: 0 }}
                 exit={{ scale: 0 }}
                 className="bg-black text-white font-black uppercase text-5xl p-8 border-[8px] border-[#FF0055] text-center"
               >
                 A wild Distortion<br/>Appears!
               </motion.div>
             )}

             {battleState === 'choice' && (
               <motion.div 
                 key="choice"
                 className="flex gap-12 items-center justify-center w-full"
               >
                 <motion.div 
                   animate={{ y: [-10, 10, -10] }} 
                   transition={{ repeat: Infinity, duration: 2 }}
                   className="w-48 h-48 bg-black rounded-full border-[8px] border-[#00FF66] shadow-[0_0_40px_#00FF66] flex items-center justify-center relative"
                 >
                    <ShieldCheck size={80} className="text-[#00FF66]" />
                    <span className="absolute -bottom-4 bg-white text-black font-black uppercase px-4 border-[4px] border-black">Ready</span>
                 </motion.div>
                 <div className="font-black text-6xl italic text-black">VS</div>
                 <motion.div 
                   animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }} 
                   transition={{ repeat: Infinity, duration: 1 }}
                   className="w-48 h-48 bg-black rounded-tl-full rounded-br-full border-[8px] border-[#FF0055] shadow-[0_0_40px_#FF0055] flex items-center justify-center relative"
                 >
                    <Skull size={80} className="text-[#FF0055]" />
                 </motion.div>
               </motion.div>
             )}

             {battleState === 'sympathetic' && (
               <motion.div 
                 key="sympathetic"
                 initial={{ scale: 0.5, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 exit={{ opacity: 0 }}
                 className="bg-[#FF0055] text-white font-black uppercase text-7xl p-8 border-[12px] border-black text-center transform -rotate-12 shadow-[20px_20px_0_#000]"
               >
                 BAM!!<br/><span className="text-3xl">Enemy attacks!</span>
               </motion.div>
             )}

             {battleState === 'victory' && (
               <motion.div 
                 key="victory"
                 initial={{ y: 50, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 className="bg-[#FFFF00] text-black font-black uppercase text-6xl p-12 border-[12px] border-black text-center transform rotate-6 shadow-[20px_20px_0_#00E5FF]"
               >
                 <Trophy size={80} className="mx-auto mb-4" />
                 Victory!
               </motion.div>
             )}
           </AnimatePresence>
        </div>

        {/* Action Menu */}
        {battleState === 'intro' ? (
          <button 
            onClick={() => setBattleState('choice')}
            className="w-full bg-[#00E5FF] text-black font-black uppercase text-4xl py-6 border-[8px] border-black hover:bg-[#FFFF00] transition-colors shadow-[12px_12px_0_#FF0055]"
          >
            FIGHT!
          </button>
        ) : battleState === 'choice' || battleState === 'sympathetic' ? (
          <div className="grid grid-cols-2 gap-6">
            <button 
              onClick={attack}
              disabled={battleState === 'sympathetic'}
              className="bg-[#FF0055] text-white font-black uppercase text-3xl py-6 border-[8px] border-black hover:bg-black hover:text-[#FF0055] transition-colors shadow-[8px_8px_0_#000] flex items-center justify-center gap-4 disabled:opacity-50"
            >
              <Zap size={32} /> Strike
            </button>
            <button 
              onClick={heal}
              disabled={battleState === 'sympathetic'}
              className="bg-[#00FF66] text-black font-black uppercase text-3xl py-6 border-[8px] border-black hover:bg-black hover:text-[#00FF66] transition-colors shadow-[8px_8px_0_#000] flex items-center justify-center gap-4 disabled:opacity-50"
            >
              <HeartPulse size={32} /> Heal (Breathe)
            </button>
          </div>
        ) : (
          <button 
            onClick={() => { setBattleState('intro'); setPlayerHp(100); setEnemyHp(100); }}
            className="w-full bg-[#00FF66] text-black font-black uppercase text-4xl py-6 border-[8px] border-black hover:bg-[#FFFF00] transition-colors shadow-[12px_12px_0_#000]"
          >
            Play Again!
          </button>
        )}

      </div>
    </div>
  );
}