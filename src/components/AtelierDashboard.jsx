import React, { useState, useEffect } from 'react';

export default function AtelierDashboard() {
  const [activeTab, setActiveTab] = useState('all');
  const [gsmValue, setGsmValue] = useState(450);
  const [tcValue, setTcValue] = useState(600);
  const [liveTime, setLiveTime] = useState('');

  // Kathmandu Nepal Time Clock (UTC + 5:45)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const nst = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kathmandu',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }).format(now);
      setLiveTime(nst);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const inventory = [
    {
      id: "INV-101",
      item: "Egyptian Sateen Bedcover & Sheet Set",
      category: "sheets",
      stock: "28 Sets Available",
      status: "In Stock",
      badgeColor: "bg-emerald-800/15 text-emerald-900 border-emerald-600/30",
      specs: "600 TC Egyptian Combed Cotton",
      price: "NPR 8,500"
    },
    {
      id: "INV-102",
      item: "Himalayan Winter Thermal Quilt",
      category: "quilts",
      stock: "14 Pieces Remaining",
      status: "High Demand",
      badgeColor: "bg-amber-800/15 text-amber-950 border-amber-600/30",
      specs: "450 GSM Microfiber Baffled Box",
      price: "NPR 12,800"
    },
    {
      id: "INV-103",
      item: "Dual-Ply Cloud Fleece Blanket",
      category: "blankets",
      stock: "35 Pieces Available",
      status: "In Stock",
      badgeColor: "bg-emerald-800/15 text-emerald-900 border-emerald-600/30",
      specs: "550 GSM Heavy Cloud Fleece",
      price: "NPR 6,200"
    },
    {
      id: "INV-104",
      item: "Imperial Zari Embroidered Cushion Covers",
      category: "cushions",
      stock: "8 Sets Available",
      status: "Artisanal Reserve",
      badgeColor: "bg-rose-800/15 text-rose-950 border-rose-600/30",
      specs: "Handcrafted Velvet & Gold Zari",
      price: "NPR 4,500"
    },
    {
      id: "INV-105",
      item: "Kathmandu Valley Woven Carpet Runner",
      category: "carpets",
      stock: "5 Pieces Limited",
      status: "Limited Edition",
      badgeColor: "bg-purple-800/15 text-purple-950 border-purple-600/30",
      specs: "Hand-Knotted Mountain Wool Blend",
      price: "NPR 18,500"
    }
  ];

  const filteredInventory = activeTab === 'all' 
    ? inventory 
    : inventory.filter(i => i.category === activeTab);

  const getDrapeProfile = (gsm, tc) => {
    if (gsm < 300) return { feel: "Light & Airy", season: "Summer / Breathable", score: "92%" };
    if (gsm < 550) return { feel: "Plush & Insulating", season: "Kathmandu Autumn/Winter", score: "98%" };
    return { feel: "Heavyweight Cocoon", season: "Sub-Zero Mountain Cold", score: "95%" };
  };

  const drape = getDrapeProfile(gsmValue, tcValue);

  const inquiries = [
    { name: "Pooja Shrestha", loc: "Baluwatar, Kathmandu", item: "Thermal Quilt (King)", time: "18 mins ago", status: "Reserved" },
    { name: "Rajesh Agrawal", loc: "Jhamsikhel, Lalitpur", item: "600 TC Sateen Sheets (Set of 2)", time: "1 hr ago", status: "Ready for Pickup" },
    { name: "Bikash Gurung", loc: "Lakeside, Pokhara", item: "Cloud Blankets & Velvet Cushions", time: "3 hrs ago", status: "Dispatching" },
  ];

  return (
    <section id="dashboard" className="relative min-h-screen py-24 px-6 sm:px-12 select-none z-10">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-[#e5901c]/30 gap-4">
          <div>
            <span className="text-[10px] tracking-[0.3em] font-sans font-semibold text-[#e5901c] uppercase block">
              Live Operations & Inventory
            </span>
            <h2 className="font-editorial-title text-4xl sm:text-5xl text-[#9e1822] font-bold mt-1">
              Atelier Dashboard
            </h2>
            <p className="text-xs sm:text-sm text-[#5c2419] font-light mt-1">
              Real-time boutique inventory, Kathmandu atmospheric monitoring, and textile metrics.
            </p>
          </div>

          {/* Live Status Pill in Warm Amber Glass */}
          <div className="flex items-center space-x-3 glass-amber-box rounded-2xl px-5 py-2.5 shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
            <div>
              <span className="text-[9px] uppercase tracking-wider text-[#e5901c] font-bold block">
                Shop 141 NST Time
              </span>
              <span className="font-mono text-sm font-bold text-[#2c0b0e]">
                {liveTime || "07:30 PM NST"}
              </span>
            </div>
          </div>
        </div>

        {/* Top 3 KPI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          
          <div className="glass-regal rounded-2xl p-6 border border-[#e5901c]/35 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-[#e5901c] text-xs font-semibold uppercase tracking-wider">
              <span>Boutique Status</span>
              <span className="px-2 py-0.5 rounded-full text-[9px] bg-emerald-800/15 text-emerald-950 font-bold border border-emerald-600/30">Active</span>
            </div>
            <p className="text-2xl font-editorial-title font-bold text-[#9e1822]">Open for Consultation</p>
            <p className="text-xs text-[#5c2419]">China Town Shopping Complex #141, Ground Floor</p>
          </div>

          <div className="glass-regal rounded-2xl p-6 border border-[#e5901c]/35 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-[#e5901c] text-xs font-semibold uppercase tracking-wider">
              <span>Kathmandu Climate</span>
              <span className="text-xs font-mono text-[#5c2419]">Sundhara</span>
            </div>
            <p className="text-2xl font-editorial-title font-bold text-[#9e1822]">18°C &middot; 48% RH</p>
            <p className="text-xs text-[#5c2419]">Optimal preservation climate for sateen & down</p>
          </div>

          <div className="glass-regal rounded-2xl p-6 border border-[#e5901c]/35 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-[#e5901c] text-xs font-semibold uppercase tracking-wider">
              <span>Artisan Weaves</span>
              <span className="text-xs font-mono text-[#5c2419]">Sundhara Hub</span>
            </div>
            <p className="text-2xl font-editorial-title font-bold text-[#9e1822]">90+ Handcrafted Units</p>
            <p className="text-xs text-[#5c2419]">Available for touch & feel inspection at boutique</p>
          </div>

        </div>

        {/* Main Dashboard Section: Inventory Ledger & Fabric Drape Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left: Inventory Ledger */}
          <div className="lg:col-span-2 glass-regal rounded-3xl p-6 sm:p-8 border border-[#e5901c]/45 shadow-md space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#e5901c]/25">
              <div>
                <h3 className="font-editorial-title text-xl sm:text-2xl font-bold text-[#9e1822]">
                  Live Inventory Ledger
                </h3>
                <p className="text-xs text-[#5c2419]">Curated textiles at China Town Shop 141</p>
              </div>

              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-1.5 glass-amber-box p-1 rounded-xl">
                {[
                  { key: 'all', label: 'All' },
                  { key: 'sheets', label: 'Sheets' },
                  { key: 'quilts', label: 'Quilts' },
                  { key: 'blankets', label: 'Blankets' },
                  { key: 'cushions', label: 'Cushions' }
                ].map(t => (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => setActiveTab(t.key)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold tracking-wider transition-all ${
                      activeTab === t.key 
                        ? 'bg-gradient-to-r from-[#9e1822] to-[#770f17] text-white shadow-xs' 
                        : 'text-[#2c0b0e] hover:bg-[#fae2b8]/60'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Inventory Items List in Glass Amber Boxes */}
            <div className="space-y-3">
              {filteredInventory.map(item => (
                <div 
                  key={item.id} 
                  className="p-4 rounded-xl glass-amber-box flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all duration-200 hover:shadow-sm"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-[10px] text-[#e5901c] font-bold">{item.id}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${item.badgeColor}`}>
                        {item.status}
                      </span>
                    </div>
                    <h4 className="font-editorial-title text-base font-bold text-[#2c0b0e]">{item.item}</h4>
                    <p className="text-xs text-[#5c2419] font-light">{item.specs} &middot; {item.stock}</p>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1">
                    <span className="font-editorial-title text-base font-bold text-[#9e1822]">{item.price}</span>
                    <a 
                      href={`mailto:shyammudbhari2151@gmail.com?subject=Reserve%20${encodeURIComponent(item.item)}&body=Hello%20Shyam%20ji,%20I%20would%20like%20to%20reserve%20item%20${item.id}%20(${encodeURIComponent(item.item)})%20at%20Shop%20141.`}
                      className="text-[11px] font-bold text-[#e5901c] hover:text-[#9e1822] uppercase tracking-wider hover:underline"
                    >
                      Reserve &rarr;
                    </a>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right: Textile GSM & Drape Simulator */}
          <div className="glass-regal rounded-3xl p-6 sm:p-8 border border-[#e5901c]/45 shadow-md space-y-6 flex flex-col justify-between">
            
            <div className="space-y-4">
              <div>
                <span className="text-[10px] tracking-widest text-[#e5901c] font-bold uppercase block">
                  Interactive Simulator
                </span>
                <h3 className="font-editorial-title text-xl font-bold text-[#9e1822]">
                  Fabric Thermal Index
                </h3>
                <p className="text-xs text-[#5c2419] mt-0.5">
                  Adjust weight & weave density to simulate thermal efficiency.
                </p>
              </div>

              {/* Slider 1: GSM Weight */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-[#2c0b0e]">Fabric Weight (GSM)</span>
                  <span className="font-mono font-bold text-[#9e1822]">{gsmValue} GSM</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="750"
                  step="25"
                  value={gsmValue}
                  onChange={e => setGsmValue(parseInt(e.target.value))}
                  className="w-full slider-regal cursor-pointer"
                />
              </div>

              {/* Slider 2: Thread Count */}
              <div className="space-y-2 pt-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-[#2c0b0e]">Thread Count (TC)</span>
                  <span className="font-mono font-bold text-[#9e1822]">{tcValue} TC</span>
                </div>
                <input
                  type="range"
                  min="300"
                  max="1000"
                  step="50"
                  value={tcValue}
                  onChange={e => setTcValue(parseInt(e.target.value))}
                  className="w-full slider-regal cursor-pointer"
                />
              </div>

              {/* Dynamic Results in Amber Glass */}
              <div className="p-4 rounded-2xl glass-amber-box space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#5c2419]">Tactile Feel:</span>
                  <span className="font-serif font-bold text-[#9e1822]">{drape.feel}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#5c2419]">Best Season:</span>
                  <span className="font-serif font-bold text-[#2c0b0e]">{drape.season}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#5c2419]">Comfort Index:</span>
                  <span className="font-mono font-bold text-emerald-800">{drape.score}</span>
                </div>
              </div>
            </div>

            {/* Direct Inquiry Action */}
            <div className="pt-4 border-t border-[#e5901c]/25 space-y-2 text-center">
              <a 
                href="#footprint" 
                className="w-full block py-3 rounded-xl bg-gradient-to-r from-[#9e1822] to-[#7a1017] text-white text-xs font-semibold uppercase tracking-widest shadow-sm hover:shadow-md transition-all border border-[#f5a623]/30"
              >
                Inquire at Shop 141
              </a>
              <span className="text-[10px] text-[#5c2419] font-light">
                Call proprietor Shyam Mudbhari: 01-5312761
              </span>
            </div>

          </div>

        </div>

        {/* Live Recent Inquiries Tracker in Amber Glass */}
        <div className="glass-regal rounded-3xl p-6 sm:p-8 border border-[#e5901c]/45 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#e5901c]/25">
            <h3 className="font-editorial-title text-lg font-bold text-[#9e1822]">
              Recent Sanctuary Consultations & Requests
            </h3>
            <span className="text-xs font-mono text-[#e5901c] font-semibold">Nepal Live Stream</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {inquiries.map((inq, i) => (
              <div key={i} className="p-4 rounded-xl glass-amber-box space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[#2c0b0e]">{inq.name}</span>
                  <span className="text-[10px] text-[#e5901c] font-mono">{inq.time}</span>
                </div>
                <p className="text-[#5c2419]">{inq.item}</p>
                <div className="flex justify-between items-center pt-1 text-[10px]">
                  <span className="text-[#854a39]">{inq.loc}</span>
                  <span className="text-emerald-800 font-semibold">{inq.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
