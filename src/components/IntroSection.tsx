import React from 'react';

interface IntroSectionProps {
  onOpenMeet: () => void;
}

export const IntroSection: React.FC<IntroSectionProps> = ({ onOpenMeet }) => {
  return (
    <section className="relative w-full h-full min-h-[100svh] flex-shrink-0 flex items-center justify-center px-6 md:px-16 lg:px-24 py-16 bg-[#edece8] select-none border-l border-[#1d150c]/8">
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Left Column: Typography & Manifesto */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#a54d25] font-semibold">
              The Agency Manifesto
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#1d150c] font-editorial-sans tracking-tight leading-[1.08] uppercase">
              MANUAL ENDS HERE.
            </h2>
            <p className="text-lg sm:text-xl font-serif text-[#a54d25] font-medium leading-snug">
              Growth should create opportunity, not operational chaos.
            </p>
          </div>

          <div className="space-y-4 text-base sm:text-lg font-light text-[#1d150c]/85 leading-relaxed max-w-xl font-editorial-sans">
            <p>
              Disconnected spreadsheets. Scattered customer records. Forgotten follow-ups. Reporting that takes hours. Businesses lose momentum when their systems cannot keep up.
            </p>
            <p className="font-medium text-[#1d150c]">
              VALENCE exists to engineer connected business systems that replace operational friction with visibility, automation, and control.
            </p>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={onOpenMeet}
              className="inline-flex items-center gap-3 px-7 py-3 rounded-full bg-[#1d150c] text-[#edece8] hover:bg-[#a54d25] transition-all duration-300 text-xs font-mono font-semibold tracking-wider uppercase shadow-md hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>OUR PHILOSOPHY →</span>
            </button>
          </div>
        </div>

        {/* Right Column: Editorial Portrait (Preserving existing image) */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-md aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-[#1d150c]/10 group">
            <img
              src="/intro.jpg"
              alt="Valence Architecture Studio"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1d150c]/50 via-transparent to-transparent opacity-60" />
            
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/80 backdrop-blur-md border border-white/40">
              <p className="text-xs font-mono text-[#a54d25] tracking-widest uppercase font-semibold">
                Connected Operations
              </p>
              <p className="text-sm font-editorial-serif text-[#1d150c] font-semibold mt-0.5">
                VALENCE Engineering
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
