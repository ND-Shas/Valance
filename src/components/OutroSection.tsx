import React from 'react';

interface OutroSectionProps {
  onExploreCourses?: () => void;
  onOpenContact?: () => void;
}

export const OutroSection: React.FC<OutroSectionProps> = ({ onExploreCourses, onOpenContact }) => {
  const handleAction = () => {
    if (onOpenContact) {
      onOpenContact();
    } else if (onExploreCourses) {
      onExploreCourses();
    }
  };

  return (
    <section className="relative w-full h-full min-h-[100svh] flex-shrink-0 flex items-center justify-center px-6 md:px-16 lg:px-24 py-16 bg-[#edece8] select-none border-l border-[#1d150c]/8">
      <div className="max-w-4xl w-full mx-auto flex flex-col items-center text-center space-y-8">
        {/* Official Brand Logo (Light Mode Variant: Orange V + Dark Charcoal Text for Light Background) */}
        <div className="w-full flex justify-center opacity-95">
          <img
            src="/assets/logo-light.png"
            alt="VALENCE Info Tech Solutions"
            className="h-11 sm:h-14 w-auto object-contain filter drop-shadow-[0_2px_10px_rgba(26,17,9,0.08)]"
          />
        </div>

        <div className="space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] font-mono text-[#fa712a] font-semibold">
            Start a Project
          </span>
          <h2
            style={{ fontFamily: "var(--font-serif), 'Cinzel', Georgia, serif" }}
            className="text-3xl sm:text-5xl md:text-6xl font-light text-[#1d150c] tracking-tight uppercase"
          >
            YOUR BUSINESS. BETTER ENGINEERED.
          </h2>
          <p className="max-w-xl mx-auto text-base sm:text-lg font-light text-[#1d150c]/85 leading-relaxed pt-2 font-editorial-sans">
            Your operations deserve more than disconnected tools and repetitive manual work. Let's identify what is slowing your business down and engineer a system designed around how you actually operate.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={handleAction}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#fa712a] text-white hover:bg-[#1d150c] transition-all duration-300 shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span className="text-xs font-mono font-semibold tracking-wider uppercase">
              START A PROJECT →
            </span>
          </button>

          <button
            type="button"
            onClick={handleAction}
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/70 border border-[#1d150c]/30 text-[#1d150c] hover:bg-white hover:border-[#fa712a] transition-all text-xs font-mono font-semibold tracking-wider uppercase cursor-pointer"
          >
            <span>BOOK DISCOVERY CALL</span>
          </button>
        </div>
      </div>
    </section>
  );
};
