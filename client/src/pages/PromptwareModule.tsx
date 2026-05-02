import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Layers, Target, GitMerge, FileCheck } from 'lucide-react';

export default function PromptwareModule({ setPage }: { setPage: (p: string) => void }) {
  const [activeBlueprint, setActiveBlueprint] = useState(0);

  const blueprints = [
    {
      title: "Token-Driven Component State Generation",
      goal: "Generate all states for a complex component referencing design tokens.",
      agents: [
        { role: "Front-End System Engineer", task: "Generate UI properties (CSS/Figma JSON) across four states: default, hover, focus, and error." }
      ],
      output: "Single JSON object mapping states to style definitions."
    },
    {
      title: "Accessibility Audit and Refinement (RSIP)",
      goal: "Automatically audit UI element for WCAG 2.1 AA and self-correct.",
      agents: [
        { role: "Accessibility Specialist", task: "CRITIQUE contrast ratio. PINPOINT failures. REWRITE output to ensure full compliance." }
      ],
      output: "Final, corrected HTML/CSS component block."
    },
    {
      title: "Multi-Agent UI Flow Orchestration",
      goal: "Ensure systematic, structured UI flow by sequentially tasking specialized agents.",
      agents: [
        { role: "Agent A (The Planner)", task: "Outline 7 key steps for user creation." },
        { role: "Agent B (The Detailer)", task: "Generate wireframe JSON based on token map." },
        { role: "Agent C (The Validator)", task: "Review output for compliance (GDPR, CCPA)." }
      ],
      output: "Compliance Report + Final UI Output"
    }
  ];

  return (
    <div className="pt-32 pb-24 px-6 bg-[#c4ff00] min-h-screen relative text-black">
      <div className="max-w-6xl mx-auto relative z-10">
        <button 
          onClick={() => setPage('home')}
          className="flex items-center gap-2 font-black uppercase mb-12 text-black hover:text-white hover:bg-black px-4 py-2 border-2 border-transparent hover:border-black transition-all w-fit"
        >
          <ArrowLeft size={16} /> Back to Systems
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <h1 className="kinetic-text text-6xl md:text-7xl uppercase leading-none mb-6 text-black" style={{ WebkitTextStroke: '2px black', color: 'transparent' }}>
              PROMPTWARE<br/><span className="text-black" style={{ WebkitTextStroke: 'none' }}>BLUEPRINTS</span>
            </h1>
            
            <p className="text-lg font-bold leading-relaxed mb-8">
              Formulas that translate common design challenges into deterministic, system-level instructions for the AI. Moving beyond simple "generate a button" requests to architecting reusable, logic-driven outcomes.
            </p>

            <div className="space-y-4">
              {blueprints.map((bp, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveBlueprint(idx)}
                  className={`w-full text-left p-4 border-4 border-black font-black uppercase transition-all ${activeBlueprint === idx ? 'bg-black text-[#c4ff00] translate-x-2' : 'bg-transparent text-black hover:bg-white'}`}
                >
                  <span className="opacity-50 text-xs block mb-1">Blueprint 0{idx + 1}</span>
                  {bp.title}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeBlueprint}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
              >
                <div className="flex items-center gap-2 font-black uppercase text-xs mb-8 bg-black text-white px-3 py-1 w-fit">
                  <Target size={14} /> Goal
                </div>
                <p className="text-xl font-bold mb-12 pb-8 border-b-2 border-black/10">
                  {blueprints[activeBlueprint].goal}
                </p>

                <div className="space-y-8">
                  <h3 className="font-black uppercase tracking-widest text-sm flex items-center gap-2">
                    <Layers size={16} /> Logic Execution Chain
                  </h3>
                  
                  {blueprints[activeBlueprint].agents.map((agent, i) => (
                    <div key={i} className="relative pl-8 before:absolute before:left-[11px] before:top-2 before:bottom-[-32px] last:before:hidden before:w-[2px] before:bg-black">
                      <div className="absolute left-0 top-1 w-6 h-6 bg-black text-[#c4ff00] rounded-full flex items-center justify-center text-[10px] font-black z-10">
                        {i + 1}
                      </div>
                      <div className="bg-gray-100 p-4 border-2 border-black">
                        <div className="font-black uppercase text-xs mb-2 text-purple-600">{agent.role}</div>
                        <div className="font-bold text-sm">{agent.task}</div>
                      </div>
                    </div>
                  ))}

                  <div className="mt-8 pt-8 border-t-4 border-black border-dashed">
                    <div className="font-black uppercase text-xs mb-2 text-gray-500 flex items-center gap-2">
                      <FileCheck size={14} /> Expected Output
                    </div>
                    <div className="bg-black text-[#c4ff00] p-4 font-mono text-sm">
                      {blueprints[activeBlueprint].output}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}