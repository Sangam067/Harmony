import React, { useState, useEffect } from 'react';
import { getStoredProducts, DEFAULT_CATEGORIES } from '../utils/productStore';

export default function AllGoodsPage({ onBack, onOpenPreview }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [goods, setGoods] = useState(() => getStoredProducts());

  useEffect(() => {
    const load = () => {
      setGoods(getStoredProducts());
    };
    load();
    window.addEventListener('harmony-products-updated', load);
    return () => window.removeEventListener('harmony-products-updated', load);
  }, []);

  // Compute categories including custom ones
  const categories = [
    { key: "all", label: `All Goods (${goods.length})` },
    ...DEFAULT_CATEGORIES.filter(c => c.key !== 'all').map(c => {
      const count = goods.filter(g => g.category === c.key).length;
      return { ...c, label: count > 0 ? `${c.label} (${count})` : c.label };
    })
  ];

  // Add any custom categories present in items
  goods.forEach(g => {
    if (g.category && !categories.some(c => c.key === g.category)) {
      const formatted = g.category.charAt(0).toUpperCase() + g.category.slice(1);
      const count = goods.filter(item => item.category === g.category).length;
      categories.push({
        key: g.category,
        label: `${formatted} (${count})`
      });
    }
  });

  const filtered = goods.filter(item => {
    const matchCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.specs.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="relative min-h-screen text-[#2c0b0e] py-10 px-4 sm:px-8 select-none z-10">
      
      {/* Top Header Bar */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between pb-8 border-b border-[#e5901c]/30 gap-4">
        
        {/* Logo and Back Button */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="px-4 py-2 rounded-full glass-crystal hover:bg-white/[0.15] text-[#9e1822] text-xs font-bold tracking-wider uppercase transition-all flex items-center space-x-2"
          >
            <span>&larr; Back to Sanctuary</span>
          </button>

          <img
            src="/harmony-logo.png"
            alt="Harmony Home Textiles"
            className="h-8 sm:h-10 w-auto object-contain"
          />
        </div>

        {/* Search Bar */}
        <div className="w-full sm:w-80">
          <input
            type="text"
            placeholder="Search quilts, sheets, blankets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2.5 px-4 rounded-full glass-amber-box text-xs text-[#2c0b0e] placeholder-[#854a39] outline-none focus:border-[#9e1822] transition-colors"
          />
        </div>

      </div>

      {/* Hero Title for Goods Showroom */}
      <div className="max-w-7xl mx-auto pt-10 pb-6 text-center space-y-2">
        <span className="text-[10px] sm:text-[11px] tracking-[0.3em] font-sans font-semibold text-[#e5901c] uppercase block">
          Complete Inventory &middot; Shop 141, China Town Complex, Kathmandu
        </span>
        <h1 className="font-editorial-title text-4xl sm:text-6xl text-[#9e1822] font-bold">
          All Collections & Goods
        </h1>
        <p className="text-sm text-[#5c2419] max-w-lg mx-auto font-sans font-light">
          Browse our complete range of handcrafted bedding, thermal quilts, cloud fleece, and living textiles. Available directly at our Kathmandu boutique.
        </p>
      </div>

      {/* Filter Chips Bar */}
      <div className="max-w-7xl mx-auto pb-8 pt-4 flex flex-wrap items-center justify-center gap-2">
        {categories.map(c => (
          <button
            key={c.key}
            type="button"
            onClick={() => setActiveCategory(c.key)}
            className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
              activeCategory === c.key
                ? 'bg-gradient-to-r from-[#9e1822] to-[#770f17] text-white shadow-md border border-[#f5a623]/40'
                : 'glass-amber-box text-[#2c0b0e] hover:bg-[#fae2b8]/70'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Product Goods Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(item => (
            <div
              key={item.id}
              className="glass-regal rounded-2xl p-4 flex flex-col justify-between group hover:-translate-y-1.5 transition-all duration-300 border border-white/20 shadow-sm hover:shadow-md"
            >
              <div>
                {/* Photo with Badge */}
                <div className="h-56 rounded-xl overflow-hidden mb-3.5 relative bg-[#fae2b8]/40">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2c0b0e]/60 via-transparent to-transparent" />
                  
                  {/* Stock Tag */}
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[9px] font-mono font-bold uppercase tracking-wider bg-[#2c0b0e]/80 text-[#ffe79a] border border-[#e5901c]/40 backdrop-blur-sm">
                    {item.stock}
                  </span>

                  {/* Specification Pill */}
                  <span className="absolute bottom-3 left-3 text-[10px] font-sans font-medium text-white/95">
                    {item.tc}
                  </span>
                </div>

                {/* Details */}
                <div className="px-1">
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#e5901c] font-semibold mb-1">
                    <span>{item.id}</span>
                    <span>{item.size}</span>
                  </div>

                  <h3 className="font-editorial-title text-lg font-bold text-[#9e1822] group-hover:text-[#b51c27] transition-colors leading-tight">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#5c2419] mt-2 line-clamp-2 leading-relaxed font-light">
                    {item.desc}
                  </p>

                  <p className="text-[11px] text-[#e5901c] font-medium mt-2">
                    {item.specs}
                  </p>
                </div>
              </div>

              {/* Price & Action Row */}
              <div className="mt-4 pt-3 border-t border-[#e5901c]/25 flex items-center justify-between gap-2">
                <div>
                  <span className="text-[9px] text-[#854a39] uppercase tracking-wider block font-semibold">Boutique Price</span>
                  <span className="font-editorial-title text-base font-bold text-[#2c0b0e]">{item.price}</span>
                </div>

                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => onOpenPreview && onOpenPreview(item)}
                    className="px-3 py-1.5 rounded-lg glass-amber-box hover:bg-[#fae2b8]/80 text-[#9e1822] text-[10px] font-bold uppercase tracking-wider transition-colors"
                  >
                    Spec
                  </button>

                  <a
                    href={`mailto:shyammudbhari2151@gmail.com?subject=Reserve%20${encodeURIComponent(item.title)}%20(${item.id})&body=Hello%20Shyam%20ji,%20I%20would%20like%20to%20reserve%20item%20${item.id}%20(${encodeURIComponent(item.title)})%20at%20Shop%20141,%20China%20Town%20Shopping%20Complex,%20Sundhara.`}
                    className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#9e1822] to-[#770f17] text-white text-[10px] font-bold uppercase tracking-wider shadow-xs hover:shadow-sm transition-all"
                  >
                    Reserve
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 glass-regal rounded-3xl p-8 max-w-md mx-auto my-8">
            <p className="font-editorial-title text-xl font-bold text-[#9e1822]">No goods found</p>
            <p className="text-xs text-[#5c2419] mt-1">Try a different category or search term.</p>
            <button
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
              className="mt-4 px-5 py-2 rounded-full bg-[#9e1822] text-white text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Footer in Goods Page */}
      <footer className="mt-20 pt-8 border-t border-[#e5901c]/30 text-center text-xs text-[#6e3a2c] space-y-2">
        <p className="font-editorial-italic text-sm text-[#9e1822]">
          &ldquo;Touch and feel our handcrafted textiles in person at Shop 141, China Town Shopping Complex, Sundhara, Kathmandu.&rdquo;
        </p>
        <p className="text-[11px] opacity-75">
          Harmony Home Textiles &middot; Proprietor: Shyam Mudbhari (01-5312761)
        </p>
      </footer>

    </div>
  );
}
