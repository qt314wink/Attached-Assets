import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, Cpu, Trash2, ArrowRight } from 'lucide-react';

export default function FrameworksModule({ setPage }: { setPage: (p: string) => void }) {
  const [pipeline, setPipeline] = useState<{id: string, type: string, name: string}[]>([]);
  const [compiling, setCompiling] = useState(false);
  const [compiledData, setCompiledData] = useState<any>(null);

  const availableNodes = [
    { type: 'signature', name: 'Signature (Input -> Output)' },
    { type: 'module', name: 'Predict (Modular Operator)' },
    { type: 'module', name: 'ChainOfThought (Reasoning)' },
    { type: 'compiler', name: 'BootstrapFewShot (Teleprompter)' },
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
        driftMitigated: true
      });
    }, 2000);
  };

  return (
    <div className="pt-32 pb-24 px-6 bg-[#0f172a] min-h-screen relative text-white">
      <div className="max-w-6xl mx-auto relative z-10">
        <button 
          onClick={() => setPage('home')}
          className="flex items-center gap-2 font-black uppercase mb-12 text-white hover:text-black hover:bg-white px-4 py-2 border-2 border-transparent hover:border-white transition-all w-fit"
        >
          <ArrowLeft size={16} /> Back to Systems
        </button>

        <div className="mb-12">
          <span className="text-[#22d3ee] font-black uppercase tracking-[0.5em] text-xs block mb-4">
            // DSPy ORCHESTRATION
          </span>
          <h1 className="kinetic-text text-5xl md:text-7xl uppercase leading-none mb-6">
            DECLARATIVE<br/>PIPELINES
          </h1>
          <p className="text-xl font-bold max-w-2xl text-gray-400">
            Transition from manual prompt engineering to compiled, programmatic transformation graphs. Build your self-improving pipeline below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white/5 border border-white/10 p-6">
              <h3 className="font-black uppercase mb-4 text-[#22d3ee]">Available Nodes</h3>
              <div className="space-y-3">
                {availableNodes.map((node, i) => (
                  <button 
                    key={i}
                    onClick={() => addNode(node)}
                    className="w-full text-left p-3 border border-white/20 hover:border-[#22d3ee] hover:bg-[#22d3ee]/10 transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-[10px] font-black uppercase text-gray-500">{node.type}</div>
                      <div className="font-bold text-sm">{node.name}</div>
                    </div>
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#22d3ee]" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="bg-black border-2 border-[#22d3ee] p-8 min-h-[400px] flex flex-col relative">
              <div className="absolute top-4 right-4 text-[10px] font-mono text-[#22d3ee] opacity-50">
                DEFINE-BY-RUN GRAPH
              </div>

              <div className="flex-1 flex flex-wrap gap-4 items-start content-start">
                <AnimatePresence>
                  {pipeline.length === 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-600 font-mono text-sm w-full text-center mt-20">
                      Empty Graph. Add a Signature to begin.
                    </motion.div>
                  )}
                  {pipeline.map((node, i) => (
                    <motion.div 
                      key={node.id}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="flex items-center gap-4"
                    >
                      <div className="bg-[#1e293b] border border-white/20 p-4 min-w-[200px] relative group">
                        <button 
                          onClick={() => removeNode(node.id)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                        >
                          <Trash2 size={12} />
                        </button>
                        <div className="text-[10px] font-black uppercase text-[#22d3ee] mb-1">{node.type}</div>
                        <div className="font-bold text-sm">{node.name}</div>
                      </div>
                      {i < pipeline.length - 1 && (
                        <ArrowRight className="text-gray-500" />
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10 flex gap-4">
                <button 
                  onClick={handleCompile}
                  disabled={compiling || pipeline.length === 0}
                  className="flex-1 bg-[#22d3ee] text-black font-black uppercase py-4 flex items-center justify-center gap-2 hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {compiling ? (
                    <><Cpu className="animate-pulse" /> Compiling Pipeline...</>
                  ) : (
                    <><Play size={18} /> Compile Graph</>
                  )}
                </button>
              </div>

              <AnimatePresence>
                {compiledData && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 bg-[#0f172a] border border-[#22d3ee]/30 p-4 font-mono text-xs text-[#22d3ee]"
                  >
                    <div className="mb-2 text-white font-bold uppercase border-b border-white/10 pb-2">Compilation Results</div>
                    <div>&gt; Generated Traces: {compiledData.traces}</div>
                    <div>&gt; Passage Accuracy: {compiledData.accuracy} (Optimized)</div>
                    <div>&gt; Prompt Drift Mitigated: {compiledData.driftMitigated ? 'YES' : 'NO'}</div>
                    <div className="mt-2 text-green-400">&gt; Status: Self-Improving Pipeline Active</div>
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