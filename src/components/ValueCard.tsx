import React from 'react';

export interface ValueCardData {
  id: string;
  number: string;
  title: string;
  tagline: string;
  philosophy: string;
  bgImage: string;
  courseTag: string;
  courseTitle: string;
  courseImage: string;
  courseDescription: string;
  courseDuration: string;
}

interface ValueCardProps {
  data: ValueCardData;
  onOpenCourse: (course: ValueCardData) => void;
}

export const ValueCard: React.FC<ValueCardProps> = ({ data, onOpenCourse }) => {
  return (
    <section
      id={data.id}
      className="relative w-full h-full min-h-[100svh] flex-shrink-0 flex flex-col justify-between items-center px-6 md:px-16 lg:px-24 py-12 md:py-16 bg-[#edece8] select-none border-l border-[#1d150c]/10 overflow-hidden shadow-[-25px_0_50px_rgba(0,0,0,0.06)]"
    >
      {/* 1. Organic Background Image Texture */}
      <div className="absolute inset-0 w-full h-full pointer-events-none opacity-25 mix-blend-multiply overflow-hidden">
        <img
          src={data.bgImage}
          alt={data.title}
          className="w-full h-full object-cover object-center scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#edece8] via-[#edece8]/85 to-[#edece8]/90" />
      </div>

      {/* 2. Top Grand Chapter Title in Roman Serif (Matches 1.mp4 11s) */}
      <div className="relative z-10 w-full max-w-6xl mx-auto pt-2 text-center">
        <h2
          style={{
            fontFamily: "var(--font-serif), 'Libertinus Sans', 'Cinzel', Georgia, serif",
            letterSpacing: '-0.04em',
            lineHeight: 1.1,
          }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-[#1d150c] uppercase tracking-tight"
        >
          {data.title}
        </h2>
      </div>

      {/* 3. Horizontal Baseline traversing through the center of the card */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-[#1d150c]/15 pointer-events-none z-0" />

      {/* 4. Giant Wireframe Dome/Circle in Center (Matches 1.mp4 12s-16s) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-96 sm:h-96 md:w-[480px] md:h-[480px] lg:w-[560px] lg:h-[560px] rounded-full border border-[#1d150c]/10 pointer-events-none z-0" />

      {/* 5. Center Split Content: Left Philosophy Prose / Right Solution Card */}
      <div className="relative z-10 max-w-6xl w-full mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        
        {/* Left Column: Number, Tagline & All-Caps Manifesto Prose */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-5">
          <div className="flex items-center gap-3">
            <span className="text-3xl md:text-4xl font-mono font-light text-[#a54d25]">
              {data.number}
            </span>
            <span className="w-10 h-[1px] bg-[#a54d25]/40" />
            <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#1d150c]/60 font-semibold">
              Pillar {data.number} · {data.tagline}
            </span>
          </div>

          <p
            style={{
              fontFamily: "var(--font-serif), 'Libertinus Sans', 'Cinzel', Georgia, serif",
              lineHeight: 1.25,
            }}
            className="text-lg sm:text-xl md:text-2xl text-[#1d150c] uppercase font-normal tracking-wide max-w-xl leading-relaxed"
          >
            {data.philosophy}
          </p>

          <div className="pt-2 flex items-center gap-4">
            <button
              type="button"
              onClick={() => onOpenCourse(data)}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#1d150c] text-[#edece8] hover:bg-[#a54d25] transition-all duration-300 text-sm font-medium shadow-md hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Explore Solution</span>
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor">
                <path d="M6 3l5 5-5 5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Right Column: Featured Solution Preview Card */}
        <div className="lg:col-span-5 flex justify-center">
          <div
            onClick={() => onOpenCourse(data)}
            className="w-full max-w-md bg-white/85 backdrop-blur-md rounded-2xl p-5 border border-[#1d150c]/12 shadow-xl hover:shadow-2xl hover:border-[#a54d25]/50 transition-all duration-500 cursor-pointer group"
          >
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-[#1a1109]/10">
              <img
                src={data.courseImage}
                alt={data.courseTitle}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-mono text-white tracking-wider">
                {data.courseDuration}
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#a54d25] font-semibold">
                {data.courseTag}
              </span>
              <h3 className="text-lg md:text-xl font-editorial-serif text-[#1d150c] font-semibold group-hover:text-[#a54d25] transition-colors flex items-center justify-between">
                <span>{data.courseTitle}</span>
                <span className="text-sm font-mono opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">↗</span>
              </h3>
              <p className="text-xs md:text-sm text-[#1d150c]/70 line-clamp-2 leading-relaxed">
                {data.courseDescription}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex items-center justify-between pt-2 border-t border-[#1d150c]/10 text-xs font-mono text-[#1d150c]/50">
        <span>VALENCE ARCHITECTURE · PILLAR {data.number}</span>
        <span>SCROLL TO ADVANCE →</span>
      </div>
    </section>
  );
};
