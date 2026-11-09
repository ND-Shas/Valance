import React, { useEffect, useState } from 'react';
import { IndustryDetail } from '../data/industriesData';

interface IndustryDetailModalProps {
  isOpen: boolean;
  industry: IndustryDetail | null;
  onClose: () => void;
  onOpenMeet: () => void;
  onSelectIndustry?: (industry: IndustryDetail) => void;
  allIndustries?: IndustryDetail[];
}

export const IndustryDetailModal: React.FC<IndustryDetailModalProps> = ({
  isOpen,
  industry,
  onClose,
  onOpenMeet,
  onSelectIndustry,
  allIndustries
}) => {
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setIsRendered(true), 20);
      return () => clearTimeout(timer);
    } else {
      setIsRendered(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !industry) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`VALENCE Solutions for ${industry.name}`}
      className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 md:p-10 select-none overflow-y-auto"
      onClick={onClose}
      style={{
        transition: 'opacity 0.4s ease-out',
        opacity: isRendered ? 1 : 0
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-5xl w-full bg-[#110a05]/95 border border-white/20 rounded-3xl p-6 sm:p-8 md:p-12 shadow-[0_25px_80px_rgba(0,0,0,0.95)] text-white my-auto flex flex-col max-h-[92vh] overflow-hidden"
        style={{
          transform: isRendered ? 'scale(1) translateY(0)' : 'scale(0.96) translateY(20px)',
          transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease-out',
          opacity: isRendered ? 1 : 0
        }}
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#fa712a]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Bar */}
        <div className="w-full flex items-center justify-between pb-4 border-b border-white/10 z-20 flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-2xl p-2 rounded-xl bg-white/10 border border-white/15">
              {industry.icon}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono tracking-widest text-[#fa712a] uppercase font-bold">
                  INDUSTRY PILLAR {industry.number} / 12
                </span>
                {industry.badge && (
                  <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#fa712a]/20 text-[#fa712a] border border-[#fa712a]/30">
                    {industry.badge}
                  </span>
                )}
              </div>
              <h2
                style={{ fontFamily: "var(--font-serif), 'Cinzel', Georgia, serif" }}
                className="text-lg sm:text-2xl font-bold text-white tracking-wide uppercase"
              >
                {industry.name}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/25 border border-white/25 text-white transition-all duration-300 cursor-pointer"
            aria-label="Close industry modal"
          >
            <span className="text-[11px] font-mono tracking-wider uppercase font-semibold">CLOSE</span>
            <span className="text-sm font-light group-hover:rotate-90 transition-transform">✕</span>
          </button>
        </div>

        {/* Quick Industry Navigation Switcher Bar */}
        {allIndustries && onSelectIndustry && (
          <div className="flex items-center gap-1.5 py-2.5 border-b border-white/10 overflow-x-auto no-scrollbar flex-shrink-0">
            {allIndustries.map((ind) => {
              const isCurrent = ind.id === industry.id;
              return (
                <button
                  key={ind.id}
                  type="button"
                  onClick={() => onSelectIndustry(ind)}
                  className={`text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-full whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    isCurrent
                      ? 'bg-[#fa712a] text-white font-bold shadow-md'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  <span>{ind.icon}</span>
                  <span>{ind.shortName}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Main Split Grid Content Body (Scrollable) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start overflow-y-auto pr-1 my-auto py-4 flex-1">
          
          {/* ======================================================== */}
          {/* LEFT COLUMN: The Business Problem & Expected Outcome      */}
          {/* ======================================================== */}
          <div
            className="md:col-span-5 flex flex-col justify-start space-y-5 text-left"
            style={{
              transform: isRendered ? 'translateX(0)' : 'translateX(-30px)',
              opacity: isRendered ? 1 : 0,
              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* Target Audience Pill */}
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#fa712a] font-semibold block mb-1">
                SECTOR ARCHITECTURE
              </span>
              <p className="text-xs text-white/80 font-mono leading-relaxed">
                {industry.targetAudience}
              </p>
            </div>

            {/* The Business Problem */}
            <div className="space-y-2.5">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#fa712a] font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#fa712a]" />
                THE BUSINESS PROBLEM
              </span>
              <div className="space-y-2.5 text-xs sm:text-sm text-white/85 font-light leading-relaxed font-editorial-sans">
                {industry.problem.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>

            {/* Measurable Outcome Box */}
            <div className="p-4 rounded-xl bg-white/5 border-l-2 border-[#fa712a] space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#fa712a] font-bold block">
                DELIVERED BUSINESS OUTCOME
              </span>
              <p className="text-xs sm:text-sm font-medium text-white italic leading-relaxed">
                "{industry.outcome}"
              </p>
            </div>

            {industry.note && (
              <p className="text-[11px] font-mono text-white/50 italic leading-relaxed">
                * {industry.note}
              </p>
            )}
          </div>

          {/* ======================================================== */}
          {/* RIGHT COLUMN: Common Challenges & How VALENCE Helps       */}
          {/* ======================================================== */}
          <div
            className="md:col-span-7 flex flex-col justify-start space-y-6 text-left"
            style={{
              transform: isRendered ? 'translateX(0)' : 'translateX(30px)',
              opacity: isRendered ? 1 : 0,
              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s'
            }}
          >
            {/* 1. Common Operational Challenges */}
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-red-400 font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                COMMON OPERATIONAL FRICTIONS
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {industry.challenges.map((c, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 p-2.5 rounded-lg bg-white/5 border border-white/8 text-xs text-white/80"
                  >
                    <span className="text-red-400 font-bold leading-none mt-0.5">✕</span>
                    <span className="leading-snug">{c}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. How VALENCE Helps */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#fa712a] font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#fa712a]" />
                HOW VALENCE ENGINEERS THE SOLUTION
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {industry.howWeHelp.map((sol, idx) => {
                  const [title, desc] = sol.split(' — ');
                  return (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/15 hover:border-[#fa712a]/60 transition-all space-y-1 group"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-[#fa712a]/20 text-[#fa712a] flex items-center justify-center text-[10px] font-bold">
                          ✓
                        </span>
                        <h4 className="text-xs font-serif font-bold text-white group-hover:text-[#fa712a] transition-colors">
                          {title}
                        </h4>
                      </div>
                      {desc && (
                        <p className="text-[11px] text-white/75 font-editorial-sans leading-snug pl-6">
                          {desc}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Bar: Action CTA */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0 z-20">
          <span className="text-xs font-mono text-white/60">
            Technology engineered around your business — not forced around tech.
          </span>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenMeet();
              }}
              className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-[#fa712a] text-white hover:bg-white hover:text-[#110a05] transition-all duration-300 text-xs font-mono uppercase tracking-wider font-semibold shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Engineer Your {industry.shortName} System →</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

