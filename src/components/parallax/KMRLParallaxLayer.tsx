import React, { useEffect, useState, useRef } from 'react';

export const KMRLParallaxLayer: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleMotionChange);

    // Passive, throttled scroll listener for 2D parallax translation
    const handleScroll = () => {
      if (rafId.current) return;

      rafId.current = window.requestAnimationFrame(() => {
        // Only track while hero is in upper viewport to preserve CPU
        const currentScroll = window.scrollY;
        if (currentScroll < 1200) {
          setScrollY(currentScroll);
        }
        rafId.current = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      mediaQuery.removeEventListener('change', handleMotionChange);
      if (rafId.current) {
        window.cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  // Multipliers for subtle 2D depth layers (very gentle factors)
  const bgOffset = reducedMotion ? 0 : scrollY * 0.035;
  const midOffset = reducedMotion ? 0 : scrollY * 0.075;
  const fgOffset = reducedMotion ? 0 : scrollY * 0.12;

  return (
    <div 
      className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none"
      aria-hidden="true"
    >
      {/* ================= LAYER 1: DISTANT CITY & SKYLINE OUTLINES (BACKGROUND) ================= */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-transform ease-out"
        style={{
          transform: `translate3d(0px, ${bgOffset}px, 0px)`,
          willChange: 'transform'
        }}
      >
        <svg 
          className="w-full h-full min-w-[1280px] max-w-[1920px] opacity-10" 
          viewBox="0 0 1600 500" 
          fill="none"
        >
          {/* Distant Kochi Urban Skyline & Harbor Silhouette Outline */}
          <path
            d="M 0 380 L 120 380 L 120 340 L 160 340 L 160 380 L 220 380 L 220 300 L 260 300 L 260 380 L 340 380 L 340 320 L 390 320 L 390 380 L 480 380 L 510 270 L 540 270 L 570 380 L 680 380 L 680 330 L 730 330 L 730 380 L 820 380 L 820 290 L 870 290 L 870 380 L 980 380 L 980 340 L 1040 340 L 1040 380 L 1150 380 L 1170 310 L 1200 310 L 1220 380 L 1340 380 L 1340 350 L 1400 350 L 1400 380 L 1600 380"
            stroke="#170C79"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Distant Cable-Stayed Pylons */}
          <path
            d="M 525 270 L 525 380 M 510 380 L 540 380 M 1185 310 L 1185 380 M 1170 380 L 1200 380"
            stroke="#170C79"
            strokeWidth="0.9"
            strokeDasharray="3 3"
          />
        </svg>
      </div>

      {/* ================= LAYER 2: ELEVATED METRO VIADUCT, MASTS & SIGNALS (MIDDLE) ================= */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-transform ease-out"
        style={{
          transform: `translate3d(0px, ${midOffset}px, 0px)`,
          willChange: 'transform'
        }}
      >
        <svg 
          className="w-full h-full min-w-[1280px] max-w-[1920px] opacity-16" 
          viewBox="0 0 1600 500" 
          fill="none"
        >
          {/* Elevated Viaduct Concrete Deck Outline */}
          <path
            d="M -50 290 C 250 290, 400 240, 650 240 C 900 240, 1100 310, 1350 310 C 1480 310, 1550 280, 1650 280"
            stroke="#56B6C6"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M -50 298 C 250 298, 400 248, 650 248 C 900 248, 1100 318, 1350 318 C 1480 318, 1550 288, 1650 288"
            stroke="#170C79"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Viaduct Support Piers */}
          {[150, 350, 550, 750, 950, 1150, 1350, 1550].map((x) => (
            <g key={`viaduct-pier-${x}`}>
              <line x1={x} y1={250} x2={x} y2={430} stroke="#170C79" strokeWidth="1.5" strokeDasharray="4 3" />
              <line x1={x - 12} y1={430} x2={x + 12} y2={430} stroke="#170C79" strokeWidth="2" />
            </g>
          ))}

          {/* Minimalist Catenary Electrical Overhead Masts */}
          {[250, 450, 650, 850, 1050, 1250, 1450].map((x, idx) => (
            <g key={`mast-${x}`}>
              <line x1={x} y1={235} x2={x} y2={185} stroke="#56B6C6" strokeWidth="1.2" />
              <line x1={x - 14} y1={185} x2={x + 14} y2={185} stroke="#56B6C6" strokeWidth="1.5" />
              <line x1={x} y1={195} x2={x + (idx % 2 === 0 ? 10 : -10)} y2={185} stroke="#56B6C6" strokeWidth="0.75" />
            </g>
          ))}

          {/* Overhead Messenger Wire */}
          <path
            d="M -50 185 C 250 185, 400 135, 650 135 C 900 135, 1100 205, 1350 205 C 1480 205, 1550 175, 1650 175"
            stroke="#56B6C6"
            strokeWidth="0.75"
            strokeDasharray="5 5"
          />

          {/* Minimal Railway Searchlight Signal Post Silhouettes */}
          {[380, 880, 1380].map((sigX) => (
            <g key={`signal-post-${sigX}`}>
              <line x1={sigX} y1={285} x2={sigX} y2={230} stroke="#170C79" strokeWidth="1.5" />
              <rect x={sigX - 4} y={230} width={8} height={18} rx={2} fill="none" stroke="#170C79" strokeWidth="1.2" />
              <circle cx={sigX} cy={235} r={1.5} fill="#56B6C6" />
              <circle cx={sigX} cy={242} r={1.5} fill="#170C79" />
            </g>
          ))}
        </svg>
      </div>

      {/* ================= LAYER 3: DUAL RAILWAY TRACK GEOMETRY (FOREGROUND) ================= */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-transform ease-out"
        style={{
          transform: `translate3d(0px, ${fgOffset}px, 0px)`,
          willChange: 'transform'
        }}
      >
        <svg 
          className="w-full h-full min-w-[1280px] max-w-[1920px] opacity-22" 
          viewBox="0 0 1600 500" 
          fill="none"
        >
          {/* Main Primary Rail Alignment Curve (Kochi Metro) */}
          <path
            d="M -20 340 C 220 340, 320 220, 560 220 C 800 220, 940 370, 1180 370 C 1360 370, 1460 260, 1620 260"
            stroke="#170C79"
            strokeWidth="2"
            strokeDasharray="8 6"
          />

          {/* Secondary Siding Alignment Path */}
          <path
            d="M 180 160 C 300 160, 380 280, 520 280 L 680 280 C 820 280, 890 190, 1020 190"
            stroke="#56B6C6"
            strokeWidth="1.5"
            strokeDasharray="5 5"
          />

          {/* Minimal Siding Crossover Nodes */}
          <circle cx="560" cy="220" r="4" fill="#170C79" stroke="#EFE3CA" strokeWidth="1.5" />
          <circle cx="1180" cy="370" r="4" fill="#56B6C6" stroke="#170C79" strokeWidth="1.5" />
        </svg>
      </div>
    </div>
  );
};
