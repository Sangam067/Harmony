import React from 'react';
import { GaneshaFaceBorder, TempleArch, SacredMandala, ToranGarland } from './IndianMotifs';

export default function HeroSection({ onOpenPreview, onViewAllCollections }) {
  const collections = [
    {
      id: "bedcovers",
      num: "01",
      title: "Bedcovers & Sheets",
      subtitle: "600 TC Egyptian Sateen",
      desc: "Silken long-staple combed cotton woven in a delicate sateen weave. Exceptionally breathable and smooth.",
      tc: "600 Thread Count",
      specs: "100% Combed Sateen",
      feel: "Silky, Cool & Fluid",
      warmth: "All Seasons",
      img: "/stack-cushions.jpg",
    },
    {
      id: "quilts",
      num: "02",
      title: "Luxury Quilts",
      subtitle: "Thermal Himalayan Microfibers",
      desc: "Architecturally baffled chambers filled with ultra-fine hollow microfiber, encased in rich cotton jacquard.",
      tc: "450 GSM Microfiber",
      specs: "Baffled Box Construction",
      feel: "Plush, Cloud-Loft",
      warmth: "Sub-Zero Rated",
      img: "/hero-bed.jpg",
    },
    {
      id: "blankets",
      num: "03",
      title: "Wool Blankets",
      subtitle: "Dual-Ply Cloud Fleece",
      desc: "Double-layered plush fleece engineered for supreme thermal retention and weightless, soothing warmth.",
      tc: "Dual-Ply 550 GSM",
      specs: "Anti-Pilling Finish",
      feel: "Velvety & Enveloping",
      warmth: "High Thermal Index",
      img: "/stack-cushions.jpg",
    },
    {
      id: "cushions",
      num: "04",
      title: "Cushion Covers",
      subtitle: "Embroidered Velvet Accents",
      desc: "Handcrafted decorative cushions featuring intricate traditional gold embroidery and rich velvet.",
      tc: "Heavyweight Velvet",
      specs: "Zari Thread Accents",
      feel: "Opulent & Structured",
      warmth: "Decorative Layer",
      img: "/hero-bed.jpg",
    }
  ];

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-between px-6 sm:px-12 pt-24 pb-16 select-none overflow-hidden">
      
      {/* ── Wide Ganesha Art: Low opacity across section with emphasis on center Ganesha ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10 overflow-hidden">
        <div 
          className="w-full h-full relative"
          style={{
            maskImage: 'radial-gradient(ellipse 75% 75% at 50% 50%, black 50%, transparent 95%)',
            WebkitMaskImage: 'radial-gradient(ellipse 75% 75% at 50% 50%, black 50%, transparent 95%)'
          }}
        >
          <img
            src="/ganesh-wide.jpg"
            alt="Lord Ganesha Sacred Background"
            className="w-full h-full object-cover sm:object-contain object-center opacity-30 mix-blend-multiply contrast-[1.12] saturate-[1.2]"
          />
        </div>
      </div>

      {/* ── Central Focal Shrine: Border covers Ganesha face with text in between ── */}
      <div className="text-center my-auto py-8 sm:py-16 max-w-4xl mx-auto relative z-10 w-full flex flex-col items-center justify-center">
        
        {/* Sacred Concentric Rotating Mandala */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] sm:w-[680px] h-[480px] sm:h-[680px] pointer-events-none -z-10 flex items-center justify-center">
          <SacredMandala className="w-full h-full animate-spin-slow opacity-35" color="#e5901c" size={680} />
        </div>

        {/* Ambient Golden Halo Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[440px] sm:w-[680px] h-[360px] sm:h-[480px] bg-gradient-to-r from-[#f5a623]/25 via-[#e5901c]/20 to-[#f5a623]/25 blur-3xl rounded-full pointer-events-none -z-10" />

        {/* ── BORDER COVERS FACE OF GANESHA WITH TEXT IN BETWEEN ── */}
        <div className="relative w-full max-w-[520px] sm:max-w-[700px] md:max-w-[820px] py-12 sm:py-16 px-8 sm:px-12 flex flex-col items-center justify-center">
          
          {/* The Border precisely framing Ganesha's face & upper shrine */}
          <div className="absolute inset-0 pointer-events-none">
            <GaneshaFaceBorder className="w-full h-full drop-shadow-md" color="#9e1822" />
          </div>

          {/* Forefront Harmony Logo in between that border */}
          <div className="relative z-10 w-full max-w-[340px] sm:max-w-[460px] md:max-w-[540px] mx-auto px-2 pt-2">
            <img
              src="/harmony-logo.png"
              alt="Harmony Home Textiles"
              className="w-full h-auto object-contain drop-shadow-[0_4px_16px_rgba(158,24,34,0.22)] hover:scale-[1.02] transition-transform duration-500"
            />
          </div>

          {/* Subtitle "Bring Harmony Home." in between the border */}
          <p className="mt-3 sm:mt-5 text-2xl sm:text-4xl md:text-5xl font-editorial-italic font-normal text-[#2c0b0e] tracking-wide relative drop-shadow-[0_1px_12px_rgba(251,241,226,0.95)]">
            Bring Harmony Home<span className="text-[#e5901c]">.</span>
          </p>

        </div>

        {/* Minimal Subtext below the framed shrine */}
        <p className="mt-4 max-w-md mx-auto text-sm text-[#5c2419] font-sans font-normal leading-relaxed relative">
          Tactile luxury textiles curated for peaceful sanctuaries. Visit Shop 141, China Town Complex, Sundhara, Kathmandu.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex items-center justify-center gap-4 relative z-10">
          <a
            href="#ai-studio"
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#9e1822] to-[#7a1017] hover:from-[#b51c27] hover:to-[#8c121b] text-white text-xs font-semibold tracking-[0.18em] uppercase transition-all duration-300 shadow-md hover:shadow-lg border border-[#f5a623]/40"
          >
            AI Material Matchmaker
          </a>
          <a
            href="#footprint"
            className="px-7 py-3.5 rounded-full glass-crystal hover:bg-white/25 text-[#9e1822] text-xs font-semibold tracking-[0.18em] uppercase transition-all duration-300 shadow-xs"
          >
            Visit Boutique
          </a>
        </div>
      </div>

      {/* Decorative Toran Garland */}
      <div className="w-full max-w-5xl my-4 opacity-55">
        <ToranGarland className="w-full h-7" color="#e5901c" />
      </div>

      {/* ── Spacious Curated Collections Section ── */}
      <div id="collections" className="w-full max-w-6xl mx-auto pt-20 pb-12 z-10">
        <div className="flex items-end justify-between pb-6 border-b border-[#e5901c]/25">
          <div>
            <span className="text-[10px] tracking-[0.3em] font-sans font-semibold text-[#e5901c] uppercase block">
              Curated Essentials
            </span>
            <h2 className="font-editorial-title text-3xl sm:text-4xl text-[#9e1822] font-bold mt-1">
              Sanctuary Collections
            </h2>
          </div>
          <span className="text-xs text-[#5c2419] font-sans font-light hidden sm:inline">
            Shop 141 &middot; Sundhara, Kathmandu
          </span>
        </div>

        {/* 4 Clean Elegant Cards in Amber Glass */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {collections.map((item) => (
            <div
              key={item.id}
              onClick={() => onOpenPreview && onOpenPreview(item)}
              className="glass-regal rounded-2xl p-4 group cursor-pointer hover:-translate-y-1.5 transition-all duration-500 border border-white/20"
            >
              <div className="h-56 rounded-xl overflow-hidden mb-3.5 relative bg-[#fae2b8]/40">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2c0b0e]/50 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-[10px] font-sans font-medium text-white/95">
                  {item.tc}
                </span>
              </div>

              <div className="px-1">
                <h3 className="font-editorial-title text-lg font-bold text-[#9e1822] group-hover:text-[#b51c27] transition-colors">
                  {item.title}
                </h3>
                <p className="text-[11px] text-[#e5901c] font-medium mt-0.5">
                  {item.subtitle}
                </p>
                <p className="text-xs text-[#5c2419] line-clamp-2 mt-2 leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* View All Collections Button */}
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={onViewAllCollections}
            className="px-9 py-4 rounded-full bg-gradient-to-r from-[#9e1822] to-[#7a1017] hover:from-[#b51c27] hover:to-[#8c121b] text-white text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-md hover:shadow-lg border border-[#f5a623]/40 inline-flex items-center space-x-2.5 group cursor-pointer"
          >
            <span>View All Collections</span>
            <span className="text-[#ffe79a] group-hover:translate-x-1.5 transition-transform duration-300">&rarr;</span>
          </button>
          <p className="text-[11px] text-[#5c2419] font-sans font-light mt-2.5">
            Browse complete showroom inventory &middot; Bedcovers, Sheets, Blankets, Quilts & Rugs
          </p>
        </div>

      </div>

    </section>
  );
}
