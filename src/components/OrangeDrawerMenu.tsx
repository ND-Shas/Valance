import React, { useEffect, useState } from 'react';

interface OrangeDrawerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenMeet: () => void;
  onOpenIndustries?: () => void;
  onOpenContact?: () => void;
}

const menuItems = [
  { id: 'hero', label: 'OVERVIEW' },
  { id: 'innovate', label: 'INNOVATE' },
  { id: 'build', label: 'BUILD' },
  { id: 'scale', label: 'SCALE' },
  { id: 'gallery', label: 'CAPABILITIES' },
  { id: 'spaces', label: 'ABOUT' },
];

export const OrangeDrawerMenu: React.FC<OrangeDrawerMenuProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenMeet,
  onOpenIndustries,
  onOpenContact,
}) => {
  const [mounted, setMounted] = useState(false);
  const [isSlidIn, setIsSlidIn] = useState(false);
  const [circlesActive, setCirclesActive] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(0); // Default first item active as in screenshot

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      // Step 1: Slide up orange rectangle smoothly
      const slideTimer = setTimeout(() => {
        setIsSlidIn(true);
      }, 30);

      // Step 2: Trigger staggered circle drawing at 1.5s per circle, completing by ~2.5s
      const circleTimer = setTimeout(() => {
        setCirclesActive(true);
      }, 200);

      return () => {
        clearTimeout(slideTimer);
        clearTimeout(circleTimer);
      };
    } else {
      setIsSlidIn(false);
      setCirclesActive(false);
      const closeTimer = setTimeout(() => {
        setMounted(false);
      }, 650);
      return () => clearTimeout(closeTimer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleSmoothClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSmoothClose = () => {
    setIsSlidIn(false);
    setCirclesActive(false);
    setTimeout(() => {
      onClose();
    }, 600);
  };

  if (!mounted && !isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Table of Chapters Navigation"
      className="fixed inset-0 z-50 overflow-hidden select-none"
    >
      {/* 1. Backdrop Blur Overlay (Upper portion showing dark blurred background) */}
      <div
        onClick={handleSmoothClose}
        className={`absolute inset-0 bg-[#120a05]/75 backdrop-blur-xl transition-opacity duration-600 ease-out cursor-pointer flex flex-col items-center justify-start pt-10 sm:pt-14 ${
          isSlidIn ? 'opacity-100' : 'opacity-0'
        }`}
        title="Click anywhere to close"
      >
        {/* Subtle floating cursor close hint at top */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white/90 text-xs tracking-wider uppercase backdrop-blur-md transition-all shadow-md group">
          <span className="text-sm font-light group-hover:rotate-90 transition-transform">✕</span>
          <span>CLICK ANYWHERE TO CLOSE</span>
        </div>
      </div>

      {/* 2. Orange Rectangle Card (Starts from ~30-33% down to bottom, matching live Blandina) */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`absolute inset-x-0 bottom-0 top-[28%] sm:top-[28%] md:top-[32%] bg-[#e85a12] text-white flex flex-col justify-between p-5 sm:p-7 md:p-10 shadow-[0_-20px_50px_rgba(0,0,0,0.45)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isSlidIn ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {/* Top Handle / Pull Down Bar (Clicking closes the drawer) */}
        <div
          onClick={handleSmoothClose}
          className="w-full flex justify-center -mt-2 pb-2 cursor-pointer group"
          title="Click to close"
        >
          <span className="w-16 h-1 rounded-full bg-white/35 group-hover:bg-white transition-all shadow-sm" />
        </div>

        {/* Top Header Bar: CLOSE ✕ on left, ✕ button on right */}
        <div className="w-full flex items-center justify-between z-10 -mt-1">
          <button
            type="button"
            onClick={handleSmoothClose}
            className="flex items-center gap-2 text-white font-sans text-xs sm:text-sm tracking-[-0.04em] uppercase hover:opacity-75 transition-opacity cursor-pointer font-normal p-2 -ml-2"
            aria-label="Close navigation drawer"
            title="Close navigation"
          >
            <span>CLOSE</span>
            <span className="text-base">✕</span>
          </button>

          <button
            type="button"
            onClick={handleSmoothClose}
            className="p-2 -mr-2 text-white/80 hover:text-white text-lg transition-opacity cursor-pointer"
            aria-label="Close"
            title="Close navigation"
          >
            ✕
          </button>
        </div>

        {/* Center: Horizon Baseline & 6 Interlocking Wireframe Rings */}
        <div className="relative my-auto w-full max-w-7xl mx-auto flex items-center justify-center py-4">
          {/* Continuous Horizontal Baseline across the card */}
          <div className="absolute left-[-20vw] right-[-20vw] top-1/2 -translate-y-1/2 h-[1px] bg-white/20 pointer-events-none" />

          {/* Staggered Circles Flow: 6 interlocking rings loading smoothly */}
          <div className="relative z-10 flex items-center justify-center -space-x-6 sm:-space-x-8 md:-space-x-12 lg:-space-x-14 overflow-x-auto no-scrollbar py-6 px-4 w-full">
            {menuItems.map((item, index) => {
              // Stagger calculation: 0.18s between items, each taking 1.5s to draw, completing at ~2.5s
              const delayMs = index * 180;
              const isItemLoaded = circlesActive;
              const isCurrentHovered = hoveredIdx === index;

              return (
                <button
                  key={item.id}
                  type="button"
                  onMouseEnter={() => setHoveredIdx(index)}
                  onClick={() => {
                    handleSmoothClose();
                    onNavigate(item.id);
                  }}
                  style={{
                    transitionDelay: `${delayMs}ms`,
                    transitionDuration: '1500ms',
                  }}
                  className={`relative flex-shrink-0 flex flex-col items-center justify-center rounded-full border transition-all ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer group w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 ${
                    isCurrentHovered
                      ? 'border-white bg-white/[0.08] scale-[1.04] shadow-[0_0_30px_rgba(255,255,255,0.25)]'
                      : 'border-white/35 hover:border-white bg-white/[0.03] hover:bg-white/[0.08] shadow-[0_0_15px_rgba(255,255,255,0.04)]'
                  } ${
                    isItemLoaded
                      ? 'opacity-100 translate-y-0 filter-none'
                      : 'opacity-0 scale-75 translate-y-6 blur-[8px]'
                  }`}
                  aria-label={`Go to ${item.label}`}
                >
                  {/* Exact Serif Typography Style matching live Blandina (Cinzel / Libertinus Sans Serif) */}
                  <span
                    style={{
                      fontFamily: "var(--font-serif), 'Libertinus Sans', 'Cinzel', 'Playfair Display', Georgia, serif",
                      letterSpacing: '-0.05em',
                      fontSize: 'clamp(20px, 2.08333vw, 40px)',
                      fontWeight: 400,
                      lineHeight: 1.07,
                    }}
                    className="text-[#edece8] uppercase drop-shadow-sm transition-all duration-300 px-2 text-center select-none whitespace-nowrap"
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Bar: LET'S MEET 👋, [ TEXT US ] [ CALL US ] [ INDUSTRIES & SYSTEMS ], CONTACT / LOGO */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-white/20 z-10">
          {/* Bottom-Left: LET'S MEET (Directly routes to Contact) */}
          <button
            type="button"
            onClick={() => {
              handleSmoothClose();
              if (onOpenContact) onOpenContact();
              else onOpenMeet();
            }}
            className="text-white hover:opacity-80 text-xs sm:text-sm font-sans tracking-[-0.03em] uppercase transition-opacity cursor-pointer font-normal flex items-center gap-1.5"
          >
            <span>LET'S MEET 👋</span>
          </button>

          {/* Bottom-Center: 3 Rectangular Outline Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => {
                handleSmoothClose();
                if (onOpenContact) onOpenContact();
                else onOpenMeet();
              }}
              style={{
                fontFamily: "var(--font-serif), 'Cinzel', serif",
                letterSpacing: '-0.03em',
              }}
              className="px-6 py-2.5 rounded-none border border-white text-white text-xs uppercase hover:bg-white hover:text-[#e85a12] transition-all duration-300 cursor-pointer shadow-sm font-normal"
            >
              START A PROJECT
            </button>
            <a
              href="mailto:contact@valenceinfotech.com"
              style={{
                fontFamily: "var(--font-serif), 'Cinzel', serif",
                letterSpacing: '-0.03em',
              }}
              className="px-6 py-2.5 rounded-none border border-white text-white text-xs uppercase hover:bg-white hover:text-[#e85a12] transition-all duration-300 cursor-pointer shadow-sm font-normal"
            >
              EMAIL US
            </a>
            <button
              type="button"
              onClick={() => {
                handleSmoothClose();
                if (onOpenIndustries) {
                  onOpenIndustries();
                } else {
                  onNavigate('build');
                }
              }}
              style={{
                fontFamily: "var(--font-serif), 'Cinzel', serif",
                letterSpacing: '-0.03em',
              }}
              className="px-6 py-2.5 rounded-none border border-white text-white text-xs uppercase hover:bg-white hover:text-[#e85a12] transition-all duration-300 cursor-pointer shadow-sm font-normal"
            >
              INDUSTRIES & SYSTEMS
            </button>
          </div>

          {/* Bottom-Right: Official White Logo Variant B for Orange Background */}
          <button
            type="button"
            onClick={() => {
              handleSmoothClose();
              if (onOpenContact) onOpenContact();
              else onOpenMeet();
            }}
            className="hover:opacity-85 transition-opacity cursor-pointer block"
            title="VALENCE Info Tech Solutions — Contact"
          >
            <img
              src="/assets/logo-dark.png"
              alt="VALENCE"
              className="h-6 sm:h-7 w-auto object-contain brightness-100"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
