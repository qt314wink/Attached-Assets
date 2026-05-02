import React, { useState, useEffect } from 'react';
import { Terminal, Command, Cpu, Network } from 'lucide-react';

export function ApproachA_Terminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    'Welcome to Collective OS [Version 2.4.1]',
    'Initializing creative environment...',
    'Loading tactile modules... OK',
    'Type "help" for available commands or "start" to launch workspace.'
  ]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim()) {
      setHistory([...history, `> ${input}`, `Command not found: ${input}`]);
      setInput('');
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#00FF41] font-mono p-8 flex flex-col">
      <header className="flex justify-between items-center border-b border-[#00FF41]/30 pb-4 mb-8">
        <div className="flex items-center gap-2">
          <Terminal size={20} />
          <span className="font-bold tracking-widest uppercase">Collective_OS</span>
        </div>
        <div className="flex gap-4 text-xs opacity-70">
          <span className="flex items-center gap-1"><Cpu size={14}/> SYS: ONLINE</span>
          <span className="flex items-center gap-1"><Network size={14}/> NET: SECURE</span>
        </div>
      </header>

      <div className="flex-1 flex flex-col max-w-4xl w-full mx-auto">
        <div className="mb-12">
          <pre className="text-[10px] md:text-sm leading-tight opacity-80 mb-6 hidden md:block">
{`   _____      ll          __  _               ____  _____ 
  / ___/____  ll ___  ___/ /_(_)  _____      / __ \\/ ___/
 / /__/ __ \\/ // _ \\/ __/ __/ / |/ / _ \\    / / / /\\__ \\ 
 \\___/\\____/_/ \\___/\\__/\\__/_/|___/\\___/    \\____/___/ / 
`}
          </pre>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">A Terminal for<br/>Visual Thinkers.</h1>
          <p className="text-[#00FF41]/70 max-w-xl mb-8 leading-relaxed">
            Bypass the GUI. Direct access to generative pipelines, spatial audio solvers, and physics-based components via command line.
          </p>
        </div>

        <div className="flex-1 bg-[#050505] border border-[#00FF41]/30 p-6 rounded-sm shadow-[0_0_20px_rgba(0,255,65,0.1)] flex flex-col font-mono">
          <div className="flex-1 overflow-y-auto space-y-2 mb-4">
            {history.map((line, i) => (
              <div key={i} className={`${line.startsWith('>') ? 'text-white' : 'opacity-80'}`}>
                {line}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-auto">
            <span className="text-white font-bold">{`root@collective:~#`}</span>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-[#00FF41] placeholder-[#00FF41]/30"
              autoFocus
              spellCheck="false"
            />
          </div>
        </div>
      </div>
    </div>
  );
}