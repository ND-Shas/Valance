import React from 'react';
import { BlandinaWordmark } from './BlandinaWordmark';

interface OutroSectionProps {
  onExploreCourses: () => void;
}

export const OutroSection: React.FC<OutroSectionProps> = ({ onExploreCourses }) => {
  return (
    <section className="relative w-full h-full min-h-[100svh] flex-shrink-0 flex items-center justify-center px-6 md:px-16 lg:px-24 py-16 bg-[#edece8] select-none border-l border-[#1d150c]/8">
      <div className="max-w-4xl w-full mx-auto flex flex-col items-center text-center space-y-8">
        {/* Subtle Wordmark Emblem */}
        <div className="w-full flex justify-center opacity-85">
          <BlandinaWordmark className="w-full max-w-[280px] sm:max-w-[380px]" />
        </div>

        <div className="space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] font-mono text-[#a54d25] font-semibold">
            Your Journey
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-light text-[#1d150c] font-editorial-sans tracking-tight">
            An invitation to begin
          </h2>
          <p className="max-w-xl mx-auto text-base sm:text-lg md:text-xl font-light text-[#1d150c]/80 leading-relaxed pt-2">
            Your path starts where you are. There's no single way forward. I'll help you find the practice that supports who you are, what you need, and where you want to go.
          </p>
        </div>

        <div className="pt-4">
          <button
            type="button"
            onClick={onExploreCourses}
            className="group relative inline-flex items-center gap-4 px-8 py-4 rounded-full bg-[#a54d25] text-white hover:bg-[#1d150c] transition-all duration-300 shadow-xl hover:scale-105 active:scale-95"
          >
            <span className="text-sm font-semibold tracking-wide font-editorial-sans">
              Explore the courses
            </span>
            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
              →
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};
