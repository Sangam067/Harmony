import React from 'react';

export default function SpecModal({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#200a10]/80 backdrop-blur-md transition-all">
      <div className="glass-regal-dark max-w-lg w-full rounded-3xl p-6 sm:p-8 border border-[#d4af37]/50 shadow-2xl relative text-white">

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Specification Modal"
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-[#f3e5ab] font-sans text-sm flex items-center justify-center border border-[#d4af37]/40 transition-colors"
        >
          &times;
        </button>

        <div className="space-y-4">
          
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono tracking-widest text-[#d4af37] uppercase font-bold">
              SPECIFICATION // {item.num || "01"}
            </span>
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-editorial-title font-bold text-white">
              {item.title}
            </h3>
            <p className="text-xs text-[#f3e5ab]/90 font-serif italic mt-0.5">
              {item.subtitle || "Authentic Handcrafted Textile"}
            </p>
          </div>

          {/* Photo */}
          <div className="h-52 w-full rounded-2xl overflow-hidden relative border border-[#d4af37]/35 bg-black/40">
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#200a10] via-transparent to-transparent" />
            
            <span className="absolute bottom-3 left-3 px-3 py-1 rounded-md bg-[#4a0e17]/90 text-[#f7e7a9] text-xs border border-[#d4af37]/50 backdrop-blur font-mono">
              {item.tc || "600 TC Sateen"}
            </span>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-white/80 font-sans leading-relaxed font-light">
            {item.desc}
          </p>

          {/* Actions */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <a
              href="#ai-studio"
              onClick={onClose}
              className="flex-1 py-3 text-center rounded-xl bg-gradient-to-r from-[#9e1822] to-[#770f17] hover:from-[#b51c27] hover:to-[#8c121b] text-white text-xs font-bold tracking-widest uppercase transition-all shadow-md border border-[#f5a623]/40"
            >
              Match in AI Studio &rarr;
            </a>

            <a
              href={`mailto:shyammudbhari2151@gmail.com?subject=Inquiry%20regarding%20${encodeURIComponent(item.title)}`}
              className="px-5 py-3 text-center rounded-xl bg-[#fae2b8]/20 hover:bg-[#fae2b8]/40 border border-[#e5901c]/45 text-[#ffe79a] text-xs font-semibold tracking-wider uppercase transition-colors"
            >
              Email Atelier
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
