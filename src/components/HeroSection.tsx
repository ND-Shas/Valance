import React from 'react';
import { BlandinaWordmark } from './BlandinaWordmark';
import { AtmosphericCanvas } from './AtmosphericCanvas';

interface HeroSectionProps {
  onNavigateSection: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigateSection }) => {
  return (
    <section className="relative w-full h-full min-h-[100svh] flex-shrink-0 flex flex-col justify-between items-center px-6 md:px-12 py-16 md:py-20 select-none overflow-hidden bg-[#edece8]">
      {/* Background Image with warm grading */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <img
          src="/hero-bg.jpg"
          alt="Blandina Manifesto - Yoga & Meditation"
          className="w-full h-full object-cover object-center opacity-85 scale-105 transition-transform duration-1000 ease-out"
          loading="eager"
        />
        {/* Soft vignette and ivory overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#edece8]/40 via-transparent to-[#edece8]/80 mix-blend-multiply" />
      </div>

      {/* Atmospheric Canvas Layer */}
      <AtmosphericCanvas />

      {/* Top Spacer */}
      <div className="w-full pt-8" />

      {/* Centerpiece: Blandina Wordmark & Timeline */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Terracotta Brand Wordmark */}
        <div className="w-full flex justify-center transform hover:scale-[1.01] transition-transform duration-500">
          <BlandinaWordmark className="w-full max-w-[340px] sm:max-w-[560px] md:max-w-[760px] lg:max-w-[940px] drop-shadow-sm" />
        </div>

        {/* Interactive 3-Stage Chapter Timeline */}
        <div className="w-full max-w-xl mx-auto mt-12 md:mt-16 px-4">
          <div className="relative flex items-center justify-between">
            {/* Timeline Line */}
            <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-[1px] bg-[#1d150c]/25" />

            {/* Step 1: Connect */}
            <div className="relative z-10 flex flex-col items-center group">
              <button
                type="button"
                onClick={() => onNavigateSection('connect')}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 backdrop-blur-md border border-[#1d150c]/20 hover:border-[#a54d25] flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
                aria-label="Go to Connect chapter"
              >
                <span className="text-[#a54d25] text-xs font-mono font-semibold">01</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigateSection('connect')}
                className="mt-3 text-xs md:text-sm font-editorial-serif tracking-widest text-[#1d150c] uppercase font-medium hover:text-[#a54d25] transition-colors"
              >
                Connect
              </button>
            </div>

            {/* Step 2: Create */}
            <div className="relative z-10 flex flex-col items-center group">
              <button
                type="button"
                onClick={() => onNavigateSection('create')}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 backdrop-blur-md border border-[#1d150c]/20 hover:border-[#a54d25] flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
                aria-label="Go to Create chapter"
              >
                <span className="text-[#a54d25] text-xs font-mono font-semibold">02</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigateSection('create')}
                className="mt-3 text-xs md:text-sm font-editorial-serif tracking-widest text-[#1d150c] uppercase font-medium hover:text-[#a54d25] transition-colors"
              >
                Create
              </button>
            </div>

            {/* Step 3: Change */}
            <div className="relative z-10 flex flex-col items-center group">
              <button
                type="button"
                onClick={() => onNavigateSection('change')}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 backdrop-blur-md border border-[#1d150c]/20 hover:border-[#a54d25] flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
                aria-label="Go to Change chapter"
              >
                <span className="text-[#a54d25] text-xs font-mono font-semibold">03</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigateSection('change')}
                className="mt-3 text-xs md:text-sm font-editorial-serif tracking-widest text-[#1d150c] uppercase font-medium hover:text-[#a54d25] transition-colors"
              >
                Change
              </button>
            </div>
          </div>
        </div>

        {/* Poetic Core Tagline */}
        <div className="mt-10 md:mt-12 space-y-1">
          <p className="text-base sm:text-lg md:text-xl font-light text-[#1d150c] tracking-wide font-editorial-sans">
            <span className="hover:text-[#a54d25] transition-colors">Connect with yourself, </span>
            <span className="hover:text-[#a54d25] transition-colors">Create the life you want, </span>
            <span className="hover:text-[#a54d25] transition-colors">Change the world.</span>
          </p>
        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <div className="relative z-10 pb-4 flex flex-col items-center gap-2">
        <div className="w-[1px] h-8 bg-gradient-to-b from-transparent via-[#1d150c]/30 to-[#a54d25] animate-pulse" />
        <span className="text-[11px] font-mono tracking-widest text-[#1d150c]/60 uppercase">
          Scroll to explore →
        </span>
      </div>
    </section>
  );
};
