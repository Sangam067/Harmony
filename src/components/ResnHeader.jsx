import React, { useState, useEffect } from 'react';

export default function ResnHeader({ onGoHome, onViewAllCollections, currentView }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-12 py-4 pointer-events-auto transition-all duration-300">
      <div className={`max-w-6xl mx-auto rounded-full px-6 sm:px-10 py-3 flex items-center justify-between transition-all duration-500 ${
        scrolled 
          ? 'bg-white/[0.12] backdrop-blur-2xl shadow-lg border border-white/[0.25]' 
          : 'bg-white/[0.06] backdrop-blur-md border border-white/[0.15]'
      }`}>
        
        {/* Brand with Harmony Logo */}
        <button 
          onClick={onGoHome} 
          className="flex items-center space-x-3 group cursor-pointer text-left"
        >
          <img
            src="/harmony-logo.png"
            alt="Harmony"
            className="h-8 sm:h-10 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </button>

        {/* Clean Minimal Nav — Dashboard removed */}
        <nav className="flex items-center space-x-5 sm:space-x-8 text-[11px] font-semibold tracking-[0.2em] text-[#9e1822] uppercase font-sans">
          <button
            onClick={onViewAllCollections}
            className={`transition-colors cursor-pointer ${
              currentView === 'all-collections' ? 'text-[#c44e2b] font-bold' : 'hover:text-[#e5901c]'
            }`}
          >
            Collections
          </button>
          
          <a href="#ai-studio" onClick={onGoHome} className="hover:text-[#e5901c] transition-colors">
            AI Matchmaker
          </a>
          <a href="#footprint" onClick={onGoHome} className="hover:text-[#e5901c] transition-colors">
            Store
          </a>
        </nav>

        {/* Direct Link — Crystal Glass Pill */}
        <div className="hidden sm:block">
          <a
            href="#footprint"
            onClick={onGoHome}
            className="px-5 py-2 rounded-full border border-white/20 text-[#9e1822] text-[11px] font-semibold tracking-[0.16em] uppercase transition-all glass-crystal hover:bg-white/[0.15] shadow-xs"
          >
            Shop 141
          </a>
        </div>

      </div>
    </header>
  );
}
