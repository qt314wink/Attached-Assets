import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Workflow, GitMerge, Cpu, ArrowRight, Zap, Target, Layers, Settings, Eye, CheckCircle2 } from 'lucide-react';
import { Nav } from '@/components/Layout';

const MODES = [
  { id: 'intake', label: 'Ingestion / Intake', icon: <Eye size={18} />, color: 'bg-[#FF0055]' },
  { id: 'breakdown', label: 'Breakdown', icon: <Layers size={18} />, color: 'bg-[#00E5FF]' },
  { id: 'translation', label: 'Translation & Processing', icon: <GitMerge size={18} />, color: 'bg-[#FFFF00]' },
  { id: 'strategy', label: 'Strategizing', icon: <Target size={18} />, color: 'bg-[#00FF66]' }
];

export default function AgencyBuilderModule({ setPage }: { setPage: (p: string) => void }) {
  const [activeMode, setActiveMode] = useState(MODES[0]);
  const [inputIdea, setInputIdea] = useState('');
  const [workflows, setWorkflows] = useState([
    { id: 1, title: 'Concept to Market Plan', status: 'Active', nodes: 4 },
    { id: 2, title: 'Automated Content Machine', status: 'Learning', nodes: 7 }
  ]);

  const handleProcess = (e: React.FormEvent) => {
    e.preventDefault();
    if(!inputIdea) return;

    const currentIndex = MODES.findIndex(m => m.id === activeMode.id);
    if (currentIndex < MODES.length - 1) {
      setActiveMode(MODES[currentIndex + 1]);
    } else {
      setWorkflows([...workflows, { id: Math.random(), title: inputIdea.slice(0, 20) + '...', status: 'New', nodes: 5 }]);
      setInputIdea('');
      setActiveMode(MODES[0]);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      <div className="fixed inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #000 2px, transparent 2.5px)', backgroundSize: '20px 20px' }} />
      <Nav currentPage="module-agency" setPage={setPage} />

      <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto relative z-10">
        
        <div className="mb-12 border-b-[8px] border-black pb-8">
           <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none" style={{ textShadow: '4px 4px 0 #FF0055, 8px 8px 0 #000' }}>
            Agency Builder
          </h1>
          <div className="bg-black text-[#FFFF00] font-black uppercase px-6 py-2 border-[6px] border-[#FFFF00] shadow-[8px_8px_0_#000] transform -rotate-1 mt-6 text-xl inline-block">
            Vol 16: Systems Thinking & Automation
          </div>
          <p className="mt-8 text-xl font-bold uppercase max-w-2xl border-l-[6px] border-[#FF0055] pl-6 bg-white py-2">
            Curate and facilitate agency. Lean in hard to productize ideas. Set the system up with your A-game, then steer and adjust.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Cognitive Pipeline */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white border-[8px] border-black p-6 shadow-[12px_12px_0_#000]">
              <h3 className="font-black uppercase text-3xl mb-6 flex items-center gap-3">
                <Cpu size={32} /> Processing Modes
              </h3>

              {/* Mode Stepper */}
              <div className="flex flex-wrap gap-2 mb-8">
                {MODES.map((mode, idx) => (
                  <React.Fragment key={mode.id}>
                    <button 
                      onClick={() => setActiveMode(mode)}
                      className={`flex-1 font-black uppercase text-sm border-[4px] border-black p-3 flex items-center justify-center gap-2 transition-colors ${
                        activeMode.id === mode.id ? `${mode.color} text-black shadow-[4px_4px_0_#000] translate-y-[-4px]` : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                      }`}
                    >
                      {mode.icon} {mode.label}
                    </button>
                    {idx < MODES.length - 1 && <div className="hidden md:flex items-center text-black"><ArrowRight size={24}/></div>}
                  </React.Fragment>
                ))}
              </div>

              {/* Active Mode Workspace */}
              <div className={`border-[6px] border-black p-8 ${activeMode.color} transition-colors duration-500`}>
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={activeMode.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white border-[4px] border-black p-6 shadow-[8px_8px_0_#000]"
                  >
                    <h4 className="font-black uppercase text-xl mb-4 border-b-2 border-black pb-2">Current Context: {activeMode.label}</h4>
                    <p className="font-bold text-sm mb-6">
                      {activeMode.id === 'intake' && "Raw ingestion of chaotic data. The AI observes without judgment."}
                      {activeMode.id === 'breakdown' && "Deconstructing the input into elemental components and variables."}
                      {activeMode.id === 'translation' && "Translating abstract concepts into actionable frameworks and productizable structures."}
                      {activeMode.id === 'strategy' && "Finalizing the automated workflow. Ready to steer and adjust."}
                    </p>

                    <form onSubmit={handleProcess} className="flex flex-col gap-4">
                      <textarea 
                        value={inputIdea}
                        onChange={(e) => setInputIdea(e.target.value)}
                        placeholder="Drop raw thought or concept here..."
                        className="w-full bg-gray-100 border-[4px] border-black p-4 font-bold uppercase resize-none h-32 focus:outline-none focus:bg-white transition-colors"
                      />
                      <button type="submit" className="self-end bg-black text-white px-8 py-3 font-black uppercase text-lg border-[4px] border-black hover:bg-[#FFFF00] hover:text-black transition-colors flex items-center gap-2">
                        Push to next stage <Zap size={20}/>
                      </button>
                    </form>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>

          {/* Active Workflows Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-black text-white border-[8px] border-black p-6 shadow-[12px_12px_0_#00FF66] transform rotate-1">
              <h3 className="font-black uppercase text-2xl mb-6 border-b-4 border-white pb-2 flex items-center gap-2 text-[#00FF66]">
                <Workflow size={24} /> Active Systems
              </h3>
              
              <div className="space-y-4">
                {workflows.map((wf, idx) => (
                  <div key={idx} className="bg-white text-black border-[4px] border-[#00FF66] p-4 flex flex-col gap-2 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[#00FF66]/10 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                    <div className="flex justify-between items-start relative z-10">
                      <span className="font-black uppercase">{wf.title}</span>
                      <span className={`text-[10px] font-black uppercase px-2 py-1 border-2 border-black ${wf.status === 'Active' ? 'bg-[#00FF66]' : wf.status === 'New' ? 'bg-[#FFFF00]' : 'bg-[#FF0055] text-white'}`}>
                        {wf.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-2 font-bold text-xs uppercase text-gray-600 relative z-10">
                      <span className="flex items-center gap-1"><Settings size={12}/> {wf.nodes} Nodes</span>
                      <span className="flex items-center gap-1 text-black cursor-pointer hover:underline"><CheckCircle2 size={12}/> Steer/Adjust</span>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 bg-[#00FF66] text-black border-[4px] border-white p-4 font-black uppercase text-center hover:bg-white transition-colors">
                + New Workflow
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}