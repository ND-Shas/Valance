import React, { useState } from 'react';
import { soundEngine } from '../utils/audioEngine';

interface CornersProps {
  onOpenMenu: () => void;
  onOpenMeet: () => void;
  scrollProgress: number; // 0 to 1
  isMenuOpen: boolean;
}

export const Corners: React.FC<CornersProps> = ({
  onOpenMenu,
  onOpenMeet,
  isMenuOpen,
  scrollProgress = 0
}) => {
  const [soundEnabled, setSoundEnabled] = useState(false);

  const toggleSound = () => {
    soundEngine.toggle();
    setSoundEnabled(soundEngine.getStatus());
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-40 p-5 sm:p-7 md:p-9 flex flex-col justify-between">
      {/* Top Bar */}
      <div className="w-full flex items-center justify-between">
        {/* Top-Left: Empty (matching Image 1) */}
        <div />

        {/* Top-Right: Turn Sound On + Status Pill (Exact match to Image 1) */}
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            type="button"
            onClick={toggleSound}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-[#1d150c] text-[11px] font-mono tracking-widest uppercase font-semibold shadow-sm hover:opacity-85 transition-opacity cursor-pointer"
            aria-label="Toggle Sound"
          >
            <span className="text-[10px] text-[#1d150c]/60">
              {soundEnabled ? '●' : '✕'}
            </span>
            <span>{soundEnabled ? 'SOUND ON' : 'TURN SOUND ON'}</span>
          </button>

          <button
            type="button"
            onClick={toggleSound}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 flex items-center justify-center text-white text-xs transition-colors cursor-pointer"
            aria-label="Sound status indicator"
          >
            <span className="w-2.5 h-[1.5px] bg-white rounded-full" />
          </button>
        </div>
      </div>

      {/* Left Edge: 3 Horizontal Lines Trigger (☰) sitting on the baseline (hidden on Hero where Hero's own aligned button renders) */}
      <div
        className={`absolute left-6 md:left-9 top-1/2 -translate-y-1/2 pointer-events-auto z-[60] transition-opacity duration-300 ${
          scrollProgress < 0.04 ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <button
          type="button"
          onClick={onOpenMenu}
          className="group flex flex-col justify-center items-start gap-[5px] p-2 cursor-pointer hover:opacity-80 transition-opacity"
          aria-label={isMenuOpen ? 'Close Menu' : 'Open Table of Chapters'}
          title={isMenuOpen ? 'Close Menu' : 'Open Menu'}
        >
          {isMenuOpen ? (
            <span className="text-white text-xl font-light leading-none hover:rotate-90 transition-transform">✕</span>
          ) : (
            <>
              <span className="w-6 h-[1.5px] bg-white/80 group-hover:bg-white transition-all shadow-sm" />
              <span className="w-6 h-[1.5px] bg-white/80 group-hover:bg-white transition-all shadow-sm" />
              <span className="w-6 h-[1.5px] bg-white/80 group-hover:bg-white transition-all shadow-sm" />
            </>
          )}
        </button>
      </div>

      {/* Bottom Bar */}
      <div className="w-full flex items-end justify-between">
        {/* Bottom-Left: Cookie Badge + LET'S MEET 👋 (Exact match to Image 1) */}
        <div className="pointer-events-auto flex flex-col items-start gap-3">
          {/* Green keyhole privacy badge in small white rounded box */}
          <div className="w-6 h-6 rounded bg-white flex items-center justify-center shadow-sm">
            <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 fill-[#10b981]" aria-hidden="true">
              <path d="M8 1a3 3 0 00-3 3v2H4a1 1 0 00-1 1v7a1 1 0 001 1h8a1 1 0 001-1V7a1 1 0 00-1-1h-1V4a3 3 0 00-3-3zm1 7.5a1.5 1.5 0 011 1.415V12a1 1 0 11-2 0v-2.085A1.5 1.5 0 019 8.5z" />
            </svg>
          </div>

          <button
            type="button"
            onClick={onOpenMeet}
            className="text-white hover:opacity-80 text-xs sm:text-sm font-mono tracking-widest uppercase transition-opacity cursor-pointer font-medium drop-shadow-sm"
          >
            LET'S MEET 👋
          </button>
        </div>

        {/* Bottom-Right: Clean empty spacer */}
        <div />
      </div>
    </div>
  );
};
