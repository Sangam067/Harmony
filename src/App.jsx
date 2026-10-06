import React, { useState, useEffect } from 'react';
import BackgroundCrystallized from './components/BackgroundCrystallized';
import ResnHeader from './components/ResnHeader';
import HeroSection from './components/HeroSection';

import AiMaterialStudio from './components/AiMaterialStudio';
import StoreFootprint from './components/StoreFootprint';
import SpecModal from './components/SpecModal';
import AllGoodsPage from './components/AllGoodsPage';
import AdminPanel from './components/AdminPanel';

export default function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home', 'all-collections', or 'admin'
  const [previewItem, setPreviewItem] = useState(null);

  // Sync with URL pathname, hash, and search for /admin2151 route
  useEffect(() => {
    const handleRoute = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();

      if (path.includes('admin2151') || hash.includes('admin2151') || search.includes('admin2151')) {
        setCurrentView('admin');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#all-collections') {
        setCurrentView('all-collections');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentView('home');
      }
    };

    handleRoute();
    window.addEventListener('hashchange', handleRoute);
    window.addEventListener('popstate', handleRoute);
    return () => {
      window.removeEventListener('hashchange', handleRoute);
      window.removeEventListener('popstate', handleRoute);
    };
  }, []);

  const goToAdmin = () => {
    try {
      window.history.pushState(null, '', '/admin2151');
    } catch (e) {
      window.location.hash = '#admin2151';
    }
    setCurrentView('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToAllCollections = () => {
    window.location.hash = 'all-collections';
    if (window.location.pathname.includes('admin2151')) {
      try {
        window.history.pushState(null, '', '/#all-collections');
      } catch (e) {}
    }
    setCurrentView('all-collections');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goHome = () => {
    window.location.hash = 'hero';
    if (window.location.pathname.includes('admin2151')) {
      try {
        window.history.pushState(null, '', '/');
      } catch (e) {}
    }
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

      {/* 2. Navigation Header with Harmony Logo (hidden in admin view) */}
      {currentView !== 'admin' && (
        <ResnHeader 
          currentView={currentView}
          onGoHome={goHome}
          onViewAllCollections={goToAllCollections}
        />
      )}

      {/* 3. Conditional Page View */}
      {currentView === 'admin' ? (
        /* Dedicated Atelier Admin Panel at /admin2151 */
        <AdminPanel 
          onExitAdmin={goHome} 
          onOpenPreview={(item) => setPreviewItem(item)} 
        />
      ) : currentView === 'all-collections' ? (
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
          <StoreFootprint onGoToAdmin={goToAdmin} />
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
