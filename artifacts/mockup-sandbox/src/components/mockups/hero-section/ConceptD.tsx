import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './_group.css';

export function ConceptD() {
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);

  const handleMouseEnter = (word: string) => setHoveredWord(word);
  const handleMouseLeave = () => setHoveredWord(null);

  const images: Record<string, string> = {
    'ARTISTS': 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&q=80',
    'POETS': 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&q=80',
    'DISRUPTORS': 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?w=800&q=80'
  };

  return (
    <div className="min-h-screen bg-white font-sans overflow-hidden flex flex-col justify-center px-4 md:px-12 py-20 relative">
      
      {/* Dynamic Background Image based on hover */}
      <div className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-500 ease-in-out bg-black" style={{ opacity: hoveredWord ? 1 : 0 }}>
        {Object.entries(images).map(([word, src]) => (
          <img 
            key={word}
            src={src}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${hoveredWord === word ? 'opacity-50 grayscale' : 'opacity-0'}`}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-[90vw] mx-auto w-full">
        <div className="mb-12 border-b-4 border-black pb-4 inline-block transition-colors duration-500" style={{ borderColor: hoveredWord ? 'white' : 'black' }}>
          <h2 className={`font-black uppercase tracking-widest text-sm transition-colors duration-500 ${hoveredWord ? 'text-white' : 'text-black'}`}>Collective OS Manifesto</h2>
        </div>

        <h1 className={`text-4xl md:text-6xl lg:text-[7.5rem] font-black uppercase leading-[0.85] tracking-tighter transition-colors duration-500 ${hoveredWord ? 'text-white/30' : 'text-black'}`}>
          A decentralized sanctuary built explicitly for 
          <span 
            className={`cursor-pointer transition-all duration-300 inline-block mx-4 relative ${hoveredWord === 'ARTISTS' ? 'text-white scale-110 z-20' : hoveredWord ? 'text-transparent blur-sm' : 'text-[#E85D04]'}`}
            onMouseEnter={() => handleMouseEnter('ARTISTS')}
            onMouseLeave={handleMouseLeave}
            style={hoveredWord && hoveredWord !== 'ARTISTS' ? { WebkitTextStroke: '1px rgba(255,255,255,0.2)' } : {}}
          >
            ARTISTS,
          </span> 
          visionary 
          <span 
            className={`cursor-pointer transition-all duration-300 inline-block mx-4 relative ${hoveredWord === 'POETS' ? 'text-white scale-110 z-20' : hoveredWord ? 'text-transparent blur-sm' : 'text-[#c4ff00]'}`}
            onMouseEnter={() => handleMouseEnter('POETS')}
            onMouseLeave={handleMouseLeave}
            style={hoveredWord && hoveredWord !== 'POETS' ? { WebkitTextStroke: '1px rgba(255,255,255,0.2)' } : {}}
          >
            POETS,
          </span> 
          and creative 
          <span 
            className={`cursor-pointer transition-all duration-300 inline-block ml-4 relative ${hoveredWord === 'DISRUPTORS' ? 'text-white scale-110 z-20' : hoveredWord ? 'text-transparent blur-sm' : 'text-[#00FFD1]'}`}
            onMouseEnter={() => handleMouseEnter('DISRUPTORS')}
            onMouseLeave={handleMouseLeave}
            style={hoveredWord && hoveredWord !== 'DISRUPTORS' ? { WebkitTextStroke: '1px rgba(255,255,255,0.2)' } : {}}
          >
            DISRUPTORS.
          </span>
        </h1>

        <div className={`mt-24 flex flex-col md:flex-row gap-6 transition-opacity duration-500 ${hoveredWord ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <p className="text-xl max-w-xl font-medium text-gray-600">
            Build, showcase, and evolve your digital identity on a network that belongs to the creators, not the algorithms.
          </p>
          <div className="flex-1 flex justify-end items-end gap-4">
            <button className="text-lg font-black uppercase underline underline-offset-8 hover:text-[#E85D04] transition-colors">
              Enter Forge
            </button>
            <button className="text-lg font-black uppercase underline underline-offset-8 hover:text-[#E85D04] transition-colors">
              Explore Works
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}