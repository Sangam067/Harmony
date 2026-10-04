import React, { useEffect, useRef } from 'react';

/**
 * BackgroundCanvas:
 * Uses the uploaded pure texture (/texture-amber.jpg) with decreased low opacity
 * across the whole website, layered with soft ambient golden radiance and floating dust motes.
 */
export default function BackgroundCrystallized() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let animId;

    const resize = () => {
      if (!canvas) return;
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    // Subtle drifting golden light particles
    const particles = [];
    const count = 35;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        radius: 1 + Math.random() * 2,
        speedY: -0.12 - Math.random() * 0.28,
        speedX: (Math.random() - 0.5) * 0.2,
        alpha: 0.15 + Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2
      });
    }

    let t = 0;
    const render = () => {
      t += 0.007;
      ctx.clearRect(0, 0, w, h);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        if (p.y < -10) p.y = h + 10;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;

        const currentAlpha = p.alpha * (0.6 + 0.4 * Math.sin(t * 3 + p.phase));
        ctx.fillStyle = `rgba(245, 166, 35, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none select-none">
      
      {/* 1. Base Amber Parchment Canvas */}
      <div className="absolute inset-0 bg-[#fbf1e2]" />

      {/* 2. Uploaded Texture with Decreased Low Opacity (Image 2) */}
      <img
        src="/texture-amber.jpg"
        alt="Amber Canvas Texture"
        className="absolute inset-0 w-full h-full object-cover opacity-[0.28] mix-blend-multiply contrast-[1.08] saturate-[1.15]"
      />

      {/* 3. Soft Ambient Golden Glow */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 28%, rgba(245, 166, 35, 0.22) 0%, rgba(229, 144, 28, 0.08) 45%, rgba(251, 241, 226, 0) 75%)'
        }}
      />

      {/* 4. Golden Floating Dust Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10" />

      {/* 5. Subtle Edge Vignette */}
      <div 
        className="absolute inset-0 z-20"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 45%, rgba(251, 241, 226, 0.4) 80%, rgba(251, 241, 226, 0.85) 100%)'
        }}
      />
    </div>
  );
}
