import React from 'react';

interface EditorialPoemSectionProps {
  onOpenMeet: () => void;
}

export const EditorialPoemSection: React.FC<EditorialPoemSectionProps> = ({ onOpenMeet }) => {
  return (
    <section
      id="spaces"
      className="relative w-full h-full min-h-[100svh] flex-shrink-0 flex items-center justify-center px-6 md:px-16 lg:px-24 py-16 bg-[#edece8] select-none border-l border-[#1d150c]/8 overflow-hidden"
    >
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Left: Dual Photography Composition */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-4 items-center">
          <div className="space-y-4">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border border-[#1d150c]/10">
              <img
                src="/editorial-primary.jpg"
                alt="Mindfulness practice spaces"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
            </div>
            <p className="text-[11px] font-mono text-[#1d150c]/50 text-center tracking-widest uppercase">
              The Body as Sanctuary
            </p>
          </div>

          <div className="space-y-4 pt-8">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border border-[#1d150c]/10">
              <img
                src="/editorial-secondary.jpg"
                alt="Nature and stillness in the Dolomites"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
            </div>
            <p className="text-[11px] font-mono text-[#1d150c]/50 text-center tracking-widest uppercase">
              Dolomites & Studio Spaces
            </p>
          </div>
        </div>

        {/* Right: Typography & Manifesto Prose */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
          <div className="flex items-center gap-3 text-xs md:text-sm font-editorial-serif tracking-widest uppercase font-semibold text-[#a54d25]">
            <span>Connect</span>
            <span className="text-[#1d150c]/25">/</span>
            <span>Create</span>
            <span className="text-[#1d150c]/25">/</span>
            <span>Change</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-[#1d150c] font-editorial-sans tracking-tight leading-snug">
            I create spaces for listening, presence, and transformation to be experienced through the body, breath, and movement.
          </h2>

          <p className="text-base sm:text-lg font-light text-[#1d150c]/70 leading-relaxed max-w-lg">
            Through somatic mindfulness, tailored movement sequences, and reflective silence, each gathering provides an anchor to release external tension and arrive completely in your own living truth.
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={onOpenMeet}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-transparent border border-[#1d150c]/30 text-[#1d150c] hover:bg-[#1d150c] hover:text-[#edece8] transition-all duration-300 text-sm font-medium hover:scale-105 active:scale-95"
            >
              <span>About me</span>
              <span className="text-[#a54d25]">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
