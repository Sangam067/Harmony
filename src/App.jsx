import React, { useState, useEffect } from 'react';
import BackgroundCrystallized from './components/BackgroundCrystallized';
import ResnHeader from './components/ResnHeader';
import HeroSection from './components/HeroSection';

import AiMaterialStudio from './components/AiMaterialStudio';
import StoreFootprint from './components/StoreFootprint';
import SpecModal from './components/SpecModal';
import AllGoodsPage from './components/AllGoodsPage';

export default function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' or 'all-collections'
  const [previewItem, setPreviewItem] = useState(null);

  // Sync with URL hash
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#all-collections') {
        setCurrentView('all-collections');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentView('home');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const goToAllCollections = () => {
    window.location.hash = 'all-collections';
    setCurrentView('all-collections');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goHome = () => {
    window.location.hash = 'hero';
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [showScrollTop, setShowScrollTop] = useState(false);

  // Track scroll position for quick scroll-to-top feature
  useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen text-[#2c0b0e] bg-[#fbf1e2] overflow-x-hidden selection:bg-[#9e1822] selection:text-[#ffe79a]">
      
      {/* 1. Warm Amber Texture Canvas with Low Opacity */}
      <BackgroundCrystallized />

      {/* 2. Navigation Header with Harmony Logo */}
      <ResnHeader 
        currentView={currentView}
        onGoHome={goHome}
        onViewAllCollections={goToAllCollections}
      />

      {/* 3. Conditional Page View */}
      {currentView === 'all-collections' ? (
        /* Dedicated Full-Page Goods Showroom */
        <AllGoodsPage 
          onBack={goHome} 
          onOpenPreview={(item) => setPreviewItem(item)} 
        />
      ) : (
        /* Main Sanctuary Landing Page */
        <>
          {/* Hero Section with "View All Collections" Button */}
          <HeroSection 
            onOpenPreview={(item) => setPreviewItem(item)}
            onViewAllCollections={goToAllCollections}
          />



          {/* Bespoke AI Material Matchmaker */}
          <AiMaterialStudio />

          {/* Flagship Store Footprint & Boutique Details */}
          <StoreFootprint />
        </>
      )}

      {/* 4. Specification Preview Modal */}
      <SpecModal item={previewItem} onClose={() => setPreviewItem(null)} />

      {/* 5. Scroll to Top Quick Navigation */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-[#9e1822] text-[#ffe79a] shadow-xl hover:bg-[#7d121b] hover:scale-105 active:scale-95 transition-all duration-300 border border-[#e5b869]/40 flex items-center justify-center cursor-pointer"
        >
          <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 15l-6-6-6 6"/>
          </svg>
        </button>
      )}

    </div>
  );
}
