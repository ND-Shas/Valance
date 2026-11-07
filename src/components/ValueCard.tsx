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
      className="relative w-full h-full min-h-[100svh] flex-shrink-0 flex items-center justify-center px-6 md:px-16 lg:px-24 py-16 bg-[#edece8] select-none border-l border-[#1d150c]/8 overflow-hidden"
    >
      {/* Background with organic texture and subtle opacity */}
      <div className="absolute inset-0 w-full h-full pointer-events-none opacity-20 mix-blend-multiply">
        <img
          src={data.bgImage}
          alt={data.title}
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#edece8] via-[#edece8]/90 to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Left Column: Number, Title, Philosophy */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
          <div className="flex items-center gap-4">
            <span className="text-4xl md:text-5xl font-mono font-light text-[#a54d25]">
              {data.number}
            </span>
            <span className="w-12 h-[1px] bg-[#a54d25]/40" />
            <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#1d150c]/60 font-semibold">
              Principle {data.number}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#1d150c] font-editorial-sans tracking-tight leading-[1.1]">
            {data.title}
          </h2>

          <p className="text-base sm:text-lg md:text-xl font-light text-[#1d150c]/85 leading-relaxed max-w-xl">
            {data.philosophy}
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => onOpenCourse(data)}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#1d150c] text-[#edece8] hover:bg-[#a54d25] transition-all duration-300 text-sm font-medium shadow-sm hover:scale-105 active:scale-95"
            >
              <span>Explore Practice</span>
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor">
                <path d="M6 3l5 5-5 5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Right Column: Featured Course Preview Card */}
        <div className="lg:col-span-5 flex justify-center">
          <div
            onClick={() => onOpenCourse(data)}
            className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl p-5 border border-[#1d150c]/10 shadow-xl hover:shadow-2xl hover:border-[#a54d25]/40 transition-all duration-500 cursor-pointer group"
          >
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4">
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
              <h3 className="text-lg md:text-xl font-editorial-serif text-[#1d150c] font-semibold group-hover:text-[#a54d25] transition-colors">
                {data.courseTitle}
              </h3>
              <p className="text-xs md:text-sm text-[#1d150c]/70 line-clamp-2 leading-relaxed">
                {data.courseDescription}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#1d150c]/10 flex items-center justify-between text-xs font-medium text-[#1d150c]">
              <span className="group-hover:translate-x-1 transition-transform">View Course Details →</span>
              <span className="text-[#a54d25]">Begin</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
