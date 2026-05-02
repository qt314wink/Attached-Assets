import React from 'react';
import { ArrowLeft, Target, Eye, ShieldAlert, Sparkles } from 'lucide-react';

export default function SovereigntyParadoxModule({ setPage }: { setPage: (p: string) => void }) {
  const shadowAudit = [
    { title: "Behavioral Truth", desc: "What did we actually do or say?", icon: <Target size={32} /> },
    { title: "Emotional Truth", desc: "What was felt during the exclusion?", icon: <ShieldAlert size={32} /> },
    { title: "Mythic Truth", desc: "What catastrophic judgment justified it?", icon: <Eye size={32} /> }
  ];

  const transformations = [
    { shadow: "Control", gift: "Equilibrium", siddhi: "Realization", bg: "bg-[#FF0055]" },
    { shadow: "Dishonor", gift: "Integrity", siddhi: "Honor", bg: "bg-[#FFFF00]" },
    { shadow: "Incompetence", gift: "Expression", siddhi: "Wisdom", bg: "bg-[#00E5FF]" }
  ];

  return (
    <div className="pt-32 pb-24 px-6 bg-black min-h-screen relative text-white font-sans selection:bg-[#c4ff00] selection:text-black">
      {/* Checkerboard overlay */}
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(45deg, #333 25%, transparent 25%, transparent 75%, #333 75%, #333), linear-gradient(45deg, #333 25%, transparent 25%, transparent 75%, #333 75%, #333)', backgroundPosition: '0 0, 20px 20px', backgroundSize: '40px 40px' }} />

      <div className="max-w-6xl mx-auto relative z-10">
        
        <header className="mb-16 bg-[#c4ff00] border-[12px] border-white p-8 shadow-[20px_20px_0_#FF0055] transform -rotate-1 relative flex flex-col md:flex-row justify-between items-start md:items-end">
          <div className="absolute -top-8 -right-8 bg-black p-4 border-[6px] border-white rounded-full shadow-[8px_8px_0_#00E5FF] rotate-12">
            <Sparkles size={64} className="text-[#FFFF00]" />
          </div>

          <div>
            <button 
              onClick={() => setPage('home')}
              className="flex items-center gap-2 font-black uppercase mb-8 text-black bg-white hover:bg-black hover:text-[#c4ff00] px-6 py-3 border-[4px] border-black transition-colors w-fit text-sm shadow-[6px_6px_0_#000]"
            >
              <ArrowLeft size={20} /> Back
            </button>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-black leading-[0.8]" style={{ textShadow: '4px 4px 0 #fff, 8px 8px 0 #000' }}>
              Sovereignty<br/>Paradox
            </h1>
          </div>
          
          <div className="bg-black text-white font-black uppercase px-6 py-4 border-[6px] border-white shadow-[8px_8px_0_#FF0055] text-2xl transform rotate-2 mt-8 md:mt-0">
            The Heyoka Principle!
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Truth Audit */}
          <div className="bg-white text-black border-[12px] border-black p-8 shadow-[20px_20px_0_#00E5FF] transform rotate-1">
            <h2 className="text-5xl font-black uppercase mb-8 border-b-[8px] border-black pb-4 flex items-center gap-4">
              Truth Audit <Eye size={40} className="text-[#FF0055]" />
            </h2>
            <div className="bg-black text-white p-6 border-[6px] border-[#FFFF00] font-bold text-xl uppercase mb-8 shadow-[8px_8px_0_#000] -rotate-1">
              To identify the "Shadow's Deepest Lie", a leader must audit the exiled parts of the system.
            </div>

            <div className="space-y-6">
              {shadowAudit.map((audit, i) => (
                <div key={i} className="bg-[#E5E5E5] border-[6px] border-black p-6 flex items-start gap-6 shadow-[6px_6px_0_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all group">
                  <div className="bg-white p-4 border-[4px] border-black shadow-[4px_4px_0_#000] group-hover:scale-110 transition-transform">
                    {audit.icon}
                  </div>
                  <div>
                    <h3 className="font-black uppercase text-2xl mb-2 leading-none">{audit.title}</h3>
                    <p className="font-bold text-lg uppercase text-black/60">{audit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Transformations */}
          <div className="bg-[#FF0055] text-white border-[12px] border-black p-8 shadow-[20px_20px_0_#FFFF00] transform -rotate-1">
            <h2 className="text-5xl font-black uppercase mb-8 border-b-[8px] border-black pb-4 text-black" style={{ textShadow: '2px 2px 0 #fff' }}>
              Transformations
            </h2>
            <p className="bg-black text-[#c4ff00] p-6 border-[6px] border-white font-bold text-xl uppercase mb-12 shadow-[8px_8px_0_#000] rotate-1">
              The Sacred Clown mirrors institutional hypocrisy by "showing the opposite".
            </p>

            <div className="space-y-8">
              {transformations.map((t, i) => (
                <div key={i} className="flex items-center justify-between p-6 border-[8px] border-black bg-white text-black shadow-[12px_12px_0_#000] hover:scale-[1.02] transition-transform">
                  <div className="w-1/3 text-center">
                    <div className="text-sm font-black uppercase bg-black text-white px-2 py-1 inline-block mb-2">Shadow</div>
                    <div className="font-black text-3xl uppercase leading-none">{t.shadow}</div>
                  </div>
                  <div className="w-1/3 text-center flex flex-col items-center px-4">
                    <div className="w-full h-4 bg-black border-2 border-black rounded-full mb-4 relative overflow-hidden">
                       <div className={`absolute top-0 left-0 bottom-0 w-1/2 ${t.bg} border-r-2 border-black`} />
                    </div>
                    <div className="text-xs font-black uppercase bg-gray-200 px-2 py-1 mb-1 border-2 border-black">Gift</div>
                    <div className="font-black text-xl uppercase">{t.gift}</div>
                  </div>
                  <div className="w-1/3 text-center">
                    <div className="text-sm font-black uppercase bg-[#00E5FF] text-black px-2 py-1 inline-block mb-2 border-2 border-black">Siddhi</div>
                    <div className={`font-black text-3xl uppercase leading-none ${t.bg} text-black px-2 py-1 border-[4px] border-black transform rotate-2 inline-block`}>{t.siddhi}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}