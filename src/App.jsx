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

    </div>
  );
}
