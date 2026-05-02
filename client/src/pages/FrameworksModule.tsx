import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, Cpu, Trash2, ArrowRight, Zap, Target, GitMerge } from 'lucide-react';

export default function FrameworksModule({ setPage }: { setPage: (p: string) => void }) {
  const [pipeline, setPipeline] = useState<{id: string, type: string, name: string}[]>([]);
  const [compiling, setCompiling] = useState(false);
  const [compiledData, setCompiledData] = useState<any>(null);

  const availableNodes = [
    { type: 'signature', name: 'Input -> Output', icon: <Target size={16}/> },
    { type: 'module', name: 'Modular Operator', icon: <Cpu size={16}/> },
    { type: 'module', name: 'ChainOfThought', icon: <GitMerge size={16}/> },
    { type: 'compiler', name: 'BootstrapFewShot', icon: <Zap size={16}/> },
  ];

  const addNode = (node: any) => {
    setPipeline([...pipeline, { ...node, id: Math.random().toString(36).substr(2, 9) }]);
    setCompiledData(null);
  };

  const removeNode = (id: string) => {
    setPipeline(pipeline.filter(n => n.id !== id));
    setCompiledData(null);
  };

  const handleCompile = () => {
    if (pipeline.length === 0) return;
    setCompiling(true);
    setCompiledData(null);
    
    setTimeout(() => {
      setCompiling(false);
      setCompiledData({
        traces: Math.floor(Math.random() * 500) + 100,
        accuracy: (Math.random() * 40 + 55).toFixed(1) + '%',
      });
    }, 2000);
  };

  return (
    <div className="pt-32 pb-24 px-6 bg-[#00E5FF] min-h-screen relative text-black selection:bg-black selection:text-[#00E5FF] font-sans">
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(#000 2px, transparent 2px), linear-gradient(90deg, #000 2px, transparent 2px)', backgroundSize: '40px 40px' }} />

      <div className="max-w-6xl mx-auto relative z-10">
        
        <header className="mb-12 bg-white border-[8px] border-black p-8 shadow-[16px_16px_0_#000] relative transform -rotate-1">
          <button 
            onClick={() => setPage('home')}
            className="flex items-center gap-2 font-black uppercase mb-6 text-white bg-black hover:bg-[#FF0055] px-4 py-2 border-[4px] border-black transition-colors w-fit text-sm shadow-[4px_4px_0_#000]"
          >
            <ArrowLeft size={16} /> Back
          </button>
          
          <h1 className="text-6xl md:text-8xl font-black uppercase leading-[0.8] tracking-tighter text-black" style={{ textShadow: '4px 4px 0 #FFFF00, 8px 8px 0 #000' }}>
            Pipeline<br/>Forge
          </h1>
          <div className="absolute top-4 right-4 bg-black text-[#c4ff00] font-black uppercase px-4 py-2 border-[4px] border-white shadow-[6px_6px_0_#FF0055] rotate-6">
            DSPy Orchestration!
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Node Palette */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border-[8px] border-black p-6 shadow-[12px_12px_0_#000] transform rotate-1">
              <h3 className="font-black uppercase mb-6 text-2xl border-b-[4px] border-black pb-2 flex items-center gap-2">
                <Cpu size={24} /> Toolbox
              </h3>
              <div className="space-y-4">
                {availableNodes.map((node, i) => (
                  <button 
                    key={i}
                    onClick={() => addNode(node)}
                    className="w-full text-left p-4 border-[4px] border-black bg-gray-50 hover:bg-[#FFFF00] transition-colors shadow-[4px_4px_0_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-black text-white p-2 border-2 border-transparent group-hover:border-white">
                        {node.icon}
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase bg-black text-white px-1 inline-block mb-1">{node.type}</div>
                        <div className="font-black uppercase">{node.name}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Canvas */}
          <div className="lg:col-span-8">
            <div className="bg-[#E5E5E5] border-[12px] border-black p-8 min-h-[500px] flex flex-col relative shadow-[16px_16px_0_#000]">
              <div className="absolute top-0 right-0 bg-black text-white px-4 py-2 font-black uppercase text-xl border-l-[8px] border-b-[8px] border-black shadow-[-4px_4px_0_#00E5FF]">
                Graph Compiler
              </div>

              <div className="flex-1 flex flex-wrap gap-4 items-center content-start pt-16">
                <AnimatePresence>
                  {pipeline.length === 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-500 font-black uppercase text-2xl w-full text-center mt-20 transform -rotate-2">
                      Drop Nodes Here!
                    </motion.div>
                  )}
                  {pipeline.map((node, i) => (
                    <motion.div 
                      key={node.id}
                      initial={{ scale: 0, opacity: 0, rotate: -10 }}
                      animate={{ scale: 1, opacity: 1, rotate: 0 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="flex items-center gap-4"
                    >
                      <div className="bg-white border-[6px] border-black p-4 min-w-[200px] relative group shadow-[6px_6px_0_#000]">
                        <button 
                          onClick={() => removeNode(node.id)}
                          className="absolute -top-4 -right-4 bg-[#FF0055] text-white p-2 rounded-full border-[4px] border-black opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110 shadow-[4px_4px_0_#000]"
                        >
                          <Trash2 size={16} />
                        </button>
                        <div className="text-[10px] font-black uppercase bg-black text-white px-2 inline-block mb-2">{node.type}</div>
                        <div className="font-black uppercase text-xl leading-none">{node.name}</div>
                      </div>
                      {i < pipeline.length - 1 && (
                        <ArrowRight size={32} className="text-black animate-pulse" />
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <div className="mt-8 flex gap-4 relative z-20">
                <button 
                  onClick={handleCompile}
                  disabled={compiling || pipeline.length === 0}
                  className="w-full bg-[#FFFF00] text-black font-black uppercase text-3xl py-6 border-[8px] border-black flex items-center justify-center gap-4 hover:bg-black hover:text-[#FFFF00] transition-colors shadow-[12px_12px_0_#FF0055] disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                >
                  {compiling ? (
                    <><Cpu size={32} className="animate-spin" /> Compiling...</>
                  ) : (
                    <><Play size={32} className="group-hover:scale-125 transition-transform" /> Compile Graph!</>
                  )}
                </button>
              </div>

              {/* Output Result */}
              <AnimatePresence>
                {compiledData && (
                  <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -bottom-8 left-8 right-8 bg-black text-white border-[6px] border-white p-6 shadow-[12px_12px_0_#00E5FF] transform -rotate-1 z-30"
                  >
                    <div className="absolute -top-4 left-4 bg-[#00FF66] text-black px-2 py-1 font-black uppercase border-2 border-black rotate-3 text-sm">Success!</div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                       <div>
                         <div className="text-[10px] text-gray-400 font-black uppercase">Traces</div>
                         <div className="text-3xl font-black">{compiledData.traces}</div>
                       </div>
                       <div>
                         <div className="text-[10px] text-gray-400 font-black uppercase">Accuracy</div>
                         <div className="text-3xl font-black text-[#00FF66]">{compiledData.accuracy}</div>
                       </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}