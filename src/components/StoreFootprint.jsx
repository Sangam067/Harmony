import React, { useState } from 'react';

export default function StoreFootprint() {
  const [copied, setCopied] = useState(false);
  const address = "China Town shopping Complex, Shop no: 141, Sundhara, Bagdurbbar, Kathmandu, Nepal";

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const products = [
    "Bedcovers",
    "Bedsheets",
    "Blankets",
    "Quilts",
    "Carpets",
    "Cushion covers",
    "Towels & more"
  ];

  return (
    <section id="footprint" className="relative min-h-screen flex flex-col justify-center px-6 sm:px-12 py-28 select-none z-10">
      <div className="max-w-4xl mx-auto w-full">

        {/* Section Header */}
        <div className="text-center mb-16 space-y-3">
          <span className="text-[11px] tracking-[0.3em] text-[#e5901c] font-sans font-semibold uppercase block">
            Visit Our Sanctuary
          </span>
          <h2 className="font-editorial-title text-4xl sm:text-6xl text-[#9e1822] font-bold">
            China Town <span className="font-editorial-italic font-normal text-[#c44e2b]">Shop 141</span>
          </h2>
          <p className="text-sm text-[#6e3a2c] max-w-md mx-auto font-sans font-light leading-relaxed">
            Sundhara, Bagdurbbar, Kathmandu, Nepal. Touch and feel our textiles in person.
          </p>
        </div>

        {/* Clean Amber Glass Boutique Card */}
        <div className="glass-regal rounded-3xl p-8 sm:p-14 space-y-8 border border-white/20 shadow-lg">

          {/* Proprietor & Location */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#e5901c]/30 gap-4">
            <div>
              <h3 className="font-editorial-title text-2xl sm:text-3xl font-bold text-[#9e1822]">
                Shyam Mudbhari
              </h3>
              <p className="text-xs text-[#6e3a2c] font-sans uppercase tracking-[0.15em] mt-0.5">
                Harmony Home Textiles &middot; Proprietor
              </p>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#e5901c] font-semibold block">Location</span>
              <span className="font-serif text-base font-semibold text-[#2c0b0e]">Shop 141, Ground Floor</span>
            </div>
          </div>

          {/* Details Grid: Warm Amber Text Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="space-y-2 p-5 rounded-2xl glass-amber-box">
              <span className="text-[10px] uppercase tracking-[0.18em] text-[#e5901c] font-semibold block">Address</span>
              <p className="text-[#2c0b0e] leading-relaxed font-light">
                China Town shopping Complex, Shop no: 141,<br />
                Sundhara, Bagdurbbar, Kathmandu, Nepal
              </p>
              <button
                onClick={handleCopy}
                className="text-xs text-[#9e1822] hover:underline font-semibold mt-1 inline-block"
              >
                {copied ? "Copied to clipboard" : "Copy address"}
              </button>
            </div>

            <div className="space-y-2 p-5 rounded-2xl glass-amber-box">
              <span className="text-[10px] uppercase tracking-[0.18em] text-[#e5901c] font-semibold block">Contact</span>
              <a
                href="mailto:shyammudbhari2151@gmail.com"
                className="text-[#9e1822] font-semibold hover:underline block text-base"
              >
                shyammudbhari2151@gmail.com
              </a>
              <p className="text-xs text-[#6e3a2c]">Phone: 01-5312761</p>
            </div>
          </div>

          {/* Deals In */}
          <div className="pt-2">
            <span className="text-[10px] uppercase tracking-[0.18em] text-[#e5901c] font-semibold block mb-3">
              Products Offered
            </span>
            <div className="flex flex-wrap gap-2">
              {products.map(p => (
                <span
                  key={p}
                  className="px-3.5 py-1.5 rounded-full glass-crystal text-[#9e1822] border border-white/20 text-xs font-medium"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 flex flex-wrap items-center justify-between gap-4">
            <a
              href="mailto:shyammudbhari2151@gmail.com?subject=Inquiry%20from%20Harmony%20Website&body=Hello%20Shyam%20ji,%20I%20would%20like%20to%20inquire%20about%20your%20textiles%20at%20Shop%20141."
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#9e1822] to-[#770f17] hover:from-[#b51c27] hover:to-[#8c121b] text-white text-xs font-semibold tracking-[0.18em] uppercase transition-all shadow-md hover:shadow-lg border border-[#f5a623]/30"
            >
              Write to Shyam Mudbhari
            </a>

            <a
              href="https://www.google.com/maps/search/China+Town+shopping+Complex+Sundhara+Kathmandu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-[#9e1822] hover:text-[#e5901c] uppercase tracking-[0.16em] transition-colors"
            >
              Open in Google Maps &rarr;
            </a>
          </div>

          {/* Sacred Blessing */}
          <div className="pt-4 border-t border-[#e5901c]/25 text-center space-y-1">
            <p className="font-serif text-sm text-[#9e1822] font-semibold">
              ।। ॐ श्री गणेशाय नमः ।।
            </p>
            <p className="font-editorial-italic text-xs text-[#6e3a2c]">
              &ldquo;May peace, auspicious harmony, and sacred comfort grace your home.&rdquo;
            </p>
          </div>

        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-xs text-[#6e3a2c] font-light">
          <p>Harmony Home Textiles &middot; China Town Shopping Complex #141 &middot; Kathmandu, Nepal</p>
        </footer>

      </div>
    </section>
  );
}
