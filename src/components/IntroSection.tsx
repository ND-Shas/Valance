import React from 'react';

interface IntroSectionProps {
  onOpenMeet: () => void;
}

export const IntroSection: React.FC<IntroSectionProps> = ({ onOpenMeet }) => {
  return (
    <section className="relative w-full h-full min-h-[100svh] flex-shrink-0 flex items-center justify-center px-6 md:px-16 lg:px-24 py-16 bg-[#edece8] select-none border-l border-[#1d150c]/8">
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Left Column: Typography & Philosophy */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#a54d25] font-semibold">
              A different way of being
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#1d150c] font-editorial-sans tracking-tight leading-[1.1]">
              Everything begins within.
            </h2>
          </div>

          <div className="space-y-4 text-base sm:text-lg md:text-xl font-light text-[#1d150c]/80 leading-relaxed max-w-xl">
            <p>
              The life you create begins with the way you meet yourself.
            </p>
            <div className="flex items-center gap-3 text-[#a54d25] font-editorial-serif tracking-widest text-sm md:text-base font-semibold py-1">
              <span>Body</span>
              <span className="text-[#1d150c]/30">·</span>
              <span>Breath</span>
              <span className="text-[#1d150c]/30">·</span>
              <span>Awareness</span>
            </div>
            <p>
              Presence starts here. This is where everything changes.
            </p>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={onOpenMeet}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#1d150c] text-[#edece8] hover:bg-[#a54d25] transition-all duration-300 text-sm font-medium shadow-md hover:scale-105 active:scale-95"
            >
              <span>Let's meet 👋</span>
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor">
                <path d="M6 3l5 5-5 5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Right Column: Editorial Portrait */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-md aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-[#1d150c]/10 group">
            <img
              src="/intro.jpg"
              alt="Blandina Stecca - Founder & Teacher"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1d150c]/40 via-transparent to-transparent opacity-60" />
            
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/70 backdrop-blur-md border border-white/40">
              <p className="text-xs font-mono text-[#1d150c]/70 tracking-widest uppercase">
                Padua · Dolomites · Online
              </p>
              <p className="text-sm font-editorial-serif text-[#1d150c] font-semibold mt-0.5">
                Blandina Stecca
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
