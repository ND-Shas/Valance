import React from 'react';

interface FooterSectionProps {
  onOpenBreathGuide: () => void;
  onOpenCredits: () => void;
  onOpenIndustries?: () => void;
  onOpenContact?: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  onOpenBreathGuide,
  onOpenCredits,
  onOpenIndustries,
  onOpenContact
}) => {
  return (
    <footer className="relative w-full h-full min-h-[100svh] flex-shrink-0 flex flex-col justify-between px-6 md:px-16 lg:px-24 py-16 bg-[#1a1109] text-[#edece8] select-none border-l border-white/10 overflow-hidden">
      {/* Top Logo and Tagline (Official Dark Variant A Logo for Dark Background) */}
      <div className="w-full pt-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/10 pb-8">
        <div className="flex items-center">
          <img
            src="/assets/logo-dark.png"
            alt="VALENCE Info Tech Solutions"
            className="h-10 sm:h-12 w-auto object-contain filter drop-shadow-[0_2px_12px_rgba(250,113,42,0.2)]"
          />
        </div>
        <p className="text-xs font-mono tracking-widest text-[#edece8]/70 uppercase">
          Technology That Moves Business Forward.
        </p>
      </div>

      {/* Centerpiece: Grand Statement & Action CTAs */}
      <div className="my-auto py-10 flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fa712a]/15 border border-[#fa712a]/30 text-[#fa712a] text-xs font-mono uppercase tracking-[0.25em] font-semibold">
          <span className="w-2 h-2 rounded-full bg-[#fa712a] animate-pulse" />
          <span>VALENCE SYSTEMS · FUTURE READY</span>
        </div>

        <h2
          style={{ fontFamily: "var(--font-serif), 'Cinzel', Georgia, serif" }}
          className="text-3xl sm:text-5xl md:text-6xl font-light text-[#edece8] tracking-tight leading-[1.12] uppercase"
        >
          YOUR NEXT BIG MOVE<br />
          STARTS HERE.
        </h2>

        <p className="text-sm sm:text-base md:text-lg font-light text-[#edece8]/85 max-w-2xl mx-auto leading-relaxed font-editorial-sans">
          Let's turn complex challenges into intelligent systems and ambitious ideas into scalable business solutions.
        </p>

        {/* Primary and Secondary CTA Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={onOpenContact}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#fa712a] text-white hover:bg-white hover:text-[#1a1109] transition-all duration-300 shadow-xl hover:scale-105 active:scale-95 cursor-pointer text-xs font-mono font-semibold uppercase tracking-wider"
          >
            <span>START YOUR PROJECT →</span>
          </button>

          <button
            type="button"
            onClick={onOpenContact}
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/5 border border-white/20 hover:border-[#fa712a] text-white hover:bg-white/10 transition-all text-xs font-mono font-semibold uppercase tracking-wider cursor-pointer"
          >
            <span>CONTACT VALENCE</span>
          </button>
        </div>

        {/* Industries exploration sub-link */}
        {onOpenIndustries && (
          <button
            type="button"
            onClick={onOpenIndustries}
            className="text-xs font-mono text-[#fa712a] hover:underline uppercase tracking-wider pt-2 cursor-pointer transition-colors"
          >
            Explore 12 Supported Industries &amp; Architecture Matrix →
          </button>
        )}
      </div>

      {/* Lower Bar: Socials, Legal, and Studio Credits */}
      <div className="w-full border-t border-white/10 pt-8 flex flex-col lg:flex-row items-center justify-between gap-6 text-xs text-[#edece8]/70">
        {/* Brand Parentage Line */}
        <div className="flex items-center gap-3 font-mono text-[11px] text-[#edece8]/75">
          <span className="text-[#fa712a] font-semibold uppercase tracking-wider">Engineered by</span>
          <span className="text-white font-medium">VALENCE Systems</span>
        </div>

        {/* Copyright */}
        <div className="flex items-center gap-4 font-mono text-[11px] text-[#edece8]/50">
          <span>© 2026 VALENCE. All Rights Reserved.</span>
        </div>

        {/* Engineering Credits Button */}
        <div>
          <button
            type="button"
            onClick={onOpenCredits}
            className="group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-[11px] font-mono text-[#edece8]/70 hover:text-white cursor-pointer"
          >
            <span>Systems Architecture</span>
            <span className="text-[#fa712a]">●</span>
            <span>View Specifications</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
