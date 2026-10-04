import React from 'react';

/**
 * Traditional Indian & Sacred Decorative Motifs:
 * - GaneshaFaceBorder: specifically framing the face/crown of Lord Ganesha
 * - TempleArch: grand arch framing the section
 * - SacredMandala: solar radiating chakra
 * - ToranGarland: festoon bandhanwar
 */

/* ── Border framing face/upper torso of Lord Ganesha ───────────────── */
export function GaneshaFaceBorder({ className = '', color = '#9e1822' }) {
  return (
    <svg viewBox="0 0 540 400" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="goldArchGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#e5901c" stopOpacity="0.4" />
          <stop offset="25%" stopColor="#f5a623" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#ffe79a" stopOpacity="1" />
          <stop offset="75%" stopColor="#f5a623" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#e5901c" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      {/* Grand outer torana arch framing the crown & face */}
      <path
        d="M40 400 L40 190 
           C40 90, 130 25, 270 25 
           C410 25, 500 90, 500 190 L500 400"
        stroke="url(#goldArchGrad)" strokeWidth="2.5" strokeDasharray="6 3"
      />

      {/* Inner scalloped arch cusps */}
      <path
        d="M75 400 L75 200 
           C75 120, 150 65, 270 65 
           C390 65, 465 120, 465 200 L465 400"
        stroke={color} strokeWidth="1.8" opacity="0.65"
      />

      {/* Scalloped petal cusps along the arch */}
      {[120, 170, 220, 270, 320, 370, 420].map((cx, i) => {
        const offset = Math.sin((i / 6) * Math.PI) * 45;
        const cy = 135 - offset;
        return (
          <g key={i}>
            <circle cx={cx} cy={cy} r="3.5" fill="#f5a623" opacity="0.85" />
            <circle cx={cx} cy={cy} r="1.5" fill="#fff" />
          </g>
        );
      })}

      {/* Top Temple Finial / Kalash */}
      <path d="M265 25 Q270 8, 275 25 Z" fill="#e5901c" />
      <circle cx="270" cy="5" r="3.5" fill="#ffe79a" />
    </svg>
  );
}

/* ── Royal Scalloped Temple Arch framing the hero ─────────────────── */
export function TempleArch({ className = '', color = '#9e1822' }) {
  return (
    <svg viewBox="0 0 800 480" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMin meet">
      <path
        d="M60 480 L60 220 
           C60 110, 160 30, 280 30 
           Q340 30, 370 65 
           Q400 30, 430 65 
           Q460 30, 520 30 
           C640 30, 740 110, 740 220 L740 480"
        stroke={color} strokeWidth="2.2" opacity="0.35"
      />
      <path
        d="M100 480 L100 240 
           C100 150, 180 80, 270 80 
           Q330 80, 360 110 
           Q400 85, 440 110 
           Q470 80, 530 80 
           C620 80, 700 150, 700 240 L700 480"
        stroke={color} strokeWidth="1.4" opacity="0.22"
      />
    </svg>
  );
}

/* ── Concentric Sacred Mandala (Surya & Padma Chakra) ───────────── */
export function SacredMandala({ className = '', size = 500, color = '#e5901c' }) {
  return (
    <svg viewBox="0 0 400 400" width={size} height={size} className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="200" cy="200" r="190" stroke={color} strokeWidth="1" strokeDasharray="4 4" opacity="0.35" />
      <circle cx="200" cy="200" r="175" stroke={color} strokeWidth="1.5" opacity="0.3" />
      <circle cx="200" cy="200" r="150" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <circle cx="200" cy="200" r="115" stroke={color} strokeWidth="1.2" opacity="0.35" />
      <circle cx="200" cy="200" r="75" stroke={color} strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
      
      {[...Array(16)].map((_, i) => {
        const angle = (i * Math.PI) / 8;
        const x1 = 200 + Math.cos(angle) * 75;
        const y1 = 200 + Math.sin(angle) * 75;
        const x2 = 200 + Math.cos(angle) * 175;
        const y2 = 200 + Math.sin(angle) * 175;
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="0.8" opacity="0.3" />
        );
      })}
    </svg>
  );
}

/* ── Gilded Toran Garland (Bandhanwar) ─────────────────────────── */
export function ToranGarland({ className = '', color = '#e5901c' }) {
  return (
    <svg viewBox="0 0 1000 45" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      {[0, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((x, i) => (
        <g key={i}>
          <path
            d={`M${x} 8 Q${x + 50} 36, ${x + 100} 8`}
            stroke={color} strokeWidth="1.5" fill="none" opacity="0.45"
          />
          <circle cx={x + 50} cy="36" r="2.5" fill={color} opacity="0.6" />
        </g>
      ))}
    </svg>
  );
}
