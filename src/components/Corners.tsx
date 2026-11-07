import React from 'react';
import { SoundToggle } from './SoundToggle';

interface CornersProps {
  onOpenMenu: () => void;
  onOpenMeet: () => void;
  scrollProgress: number; // 0 to 1
  isMenuOpen: boolean;
}

export const Corners: React.FC<CornersProps> = ({
  onOpenMenu,
  onOpenMeet,
  scrollProgress,
  isMenuOpen
}) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-40 p-4 sm:p-6 md:p-8 flex flex-col justify-between">
      {/* Top Bar / Corners */}
      <div className="w-full flex items-center justify-between">
        {/* Top-Left: Sound Toggle */}
        <div className="pointer-events-auto">
          <SoundToggle />
        </div>

        {/* Top-Right: Menu Button */}
        <div className="pointer-events-auto">
          <button
            type="button"
            onClick={onOpenMenu}
            className="group relative flex items-center justify-center w-11 h-11 rounded-full bg-white/70 backdrop-blur-md border border-[#1d150c]/10 hover:border-[#1d150c]/30 hover:bg-white shadow-sm transition-all duration-300"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <svg
                className="w-5 h-5 text-[#1d150c] transition-transform duration-300 group-hover:rotate-90"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="w-5 h-3.5 text-[#1d150c] transition-transform duration-300"
                viewBox="0 0 24 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M0 1.5H24" />
                <path d="M0 8H24" />
                <path d="M0 14.5H24" />
              </svg>
            )}
          </button>
        </div>
      </div>



      {/* Bottom Bar / Corners */}
      <div className="w-full flex items-center justify-between">
        {/* Bottom-Left: Let's meet button */}
        <div className="pointer-events-auto">
          <button
            type="button"
            onClick={onOpenMeet}
            className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/80 backdrop-blur-md border border-[#1d150c]/12 hover:border-[#1d150c]/30 hover:bg-white text-xs sm:text-sm font-medium text-[#1d150c] shadow-sm transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Let's meet 👋
          </button>
        </div>

        {/* Bottom-Right: Instagram Link */}
        <div className="pointer-events-auto">
          <a
            href="https://www.instagram.com/blandinaspace/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/80 backdrop-blur-md border border-[#1d150c]/12 hover:border-[#1d150c]/30 hover:bg-white text-xs sm:text-sm font-medium text-[#1d150c] shadow-sm transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <span>Instagram</span>
            <svg
              className="w-3 h-3 text-[#1d150c]/60"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M3 1h8v8M11 1L1 11" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};
