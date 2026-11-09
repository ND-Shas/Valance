import React, { useState, useEffect } from 'react';
import { ValenceWordmark } from './ValenceWordmark';
import { AtmosphericCanvas } from './AtmosphericCanvas';
import { ElasticBaseline } from './ElasticBaseline';

interface HeroSectionProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenMenu?: () => void;
}

interface ChapterMeta {
  id: 'innovate' | 'build' | 'scale';
  label: string;
  taglineIndex: number;
  bgImage: string;
  title: string;
  subHeader: string;
  description: string;
}

const chapters: ChapterMeta[] = [
  {
    id: 'innovate',
    label: 'INNOVATE',
    taglineIndex: 0,
    bgImage: '/value-connect.jpg',
    title: 'INTELLIGENT BUSINESS SYSTEMS',
    subHeader: 'Recruitment CRM. Candidate Management. Client Relationship Systems.',
    description: 'Centralize candidate pipelines, client relationships, recruiter workflows, and operational visibility.'
  },
  {
    id: 'build',
    label: 'BUILD',
    taglineIndex: 1,
    bgImage: '/value-create.jpg',
    title: 'SOFTWARE BUILT AROUND YOU',
    subHeader: 'Custom Software. Business Websites. Dashboards. Internal Platforms.',
    description: 'Transform business requirements into purpose-built software with clarity and scalable architecture.'
  },
  {
    id: 'scale',
    label: 'SCALE',
    taglineIndex: 2,
    bgImage: '/value-change.jpg',
    title: 'AUTOMATION WITHOUT FRICTION',
    subHeader: 'Workflow Automation. API Integration. Connected Operations.',
    description: 'Connect applications, automate repetitive workflows, and synchronize business processes through APIs and webhooks.'
  }
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigateSection, onOpenMenu }) => {
  const [circlesReady, setCirclesReady] = useState(false);
  const [hoveredCircle, setHoveredCircle] = useState<'innovate' | 'build' | 'scale' | null>(null);
  const [activeChapter, setActiveChapter] = useState<'innovate' | 'build' | 'scale' | null>(null);

  useEffect(() => {
    // Flowing staggered entrance for the 3 interlocking rings
    const timer = setTimeout(() => {
      setCirclesReady(true);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  const handleCircleClick = (id: 'innovate' | 'build' | 'scale') => {
    if (activeChapter === id) {
      // Toggle back to overview
      setActiveChapter(null);
    } else {
      // Zoom into chapter mode (matches 1.mp4 5s-10s)
      setActiveChapter(id);
    }
  };

  const handleProceedToSection = (id: string) => {
    onNavigateSection(id);
  };

  const activeMeta = chapters.find((c) => c.id === activeChapter);
  const hoveredMeta = chapters.find((c) => c.id === hoveredCircle);

  return (
    <section className="relative w-full h-full min-h-[100svh] flex-shrink-0 flex flex-col justify-between items-center px-6 md:px-12 py-10 md:py-14 select-none overflow-hidden bg-[#c44919]">
      {/* 1. Base Background Image (Terracotta Atmosphere) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <img
          src="/hero-bg.jpg"
          alt="Valence Architecture Background"
          className="w-full h-full object-cover object-center opacity-90 animate-wave-drift"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#b34012]/30 via-transparent to-[#94330d]/50 mix-blend-multiply" />
      </div>

      {/* 2. Hovered/Active Chapter Background Overlay (Fades in like 1.mp4 preview) */}
      <div
        className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-700 ease-out overflow-hidden ${
          activeChapter || hoveredCircle ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {(hoveredMeta || activeMeta) && (
          <div className="relative w-full h-full">
            <img
              src={(activeMeta || hoveredMeta)!.bgImage}
              alt="Chapter Preview"
              className={`w-full h-full object-cover object-center transition-transform duration-1000 ease-out ${
                activeChapter ? 'scale-105' : 'scale-100'
              }`}
            />
            {/* Ambient vignette gradient */}
            <div className="absolute inset-0 bg-[#c44919]/40 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
          </div>
        )}
      </div>

      {/* Atmospheric Canvas Layer */}
      <AtmosphericCanvas />

      {/* Top Spacer */}
      <div className="w-full pt-2 md:pt-4" />

      {/* Center Content Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center text-center my-auto">
        
        {/* ========================================================================= */}
        {/* TOP WORDMARK: VALENCE (Fades out when a chapter is clicked, like 1.mp4)   */}
        {/* ========================================================================= */}
        <div
          className={`w-full flex justify-center transition-all duration-700 ease-out ${
            activeChapter
              ? 'opacity-0 -translate-y-10 pointer-events-none scale-95'
              : 'opacity-100 translate-y-0 scale-100'
          }`}
        >
          <ValenceWordmark
            color="#edece8"
            className="w-full max-w-[360px] sm:max-w-[580px] md:max-w-[780px] lg:max-w-[1020px] drop-shadow-sm"
          />
        </div>

        {/* ========================================================================= */}
        {/* ACTIVE CHAPTER GRAND TITLE: Slides in when clicked (matches 1.mp4 10s)    */}
        {/* ========================================================================= */}
        <div
          className={`absolute -top-6 sm:-top-8 md:-top-12 inset-x-0 mx-auto max-w-4xl transition-all duration-700 ease-out pointer-events-none ${
            activeChapter
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 -translate-y-8 scale-95'
          }`}
        >
          {activeMeta && (
            <h2
              style={{
                fontFamily: "var(--font-serif), 'Libertinus Sans', 'Cinzel', Georgia, serif",
                letterSpacing: '-0.04em',
                lineHeight: 1.1,
              }}
              className="text-[#edece8] uppercase text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-normal drop-shadow-md tracking-tight"
            >
              {activeMeta.title}
            </h2>
          )}
        </div>

        {/* ========================================================================= */}
        {/* 3 INTERLOCKING CIRCLES & ELASTIC BASELINE CONTAINER                       */}
        {/* ========================================================================= */}
        <div className="relative w-full max-w-4xl mx-auto mt-8 md:mt-12 py-6">
          
          {/* Elastic Guitar-String Baseline (Physics flex on cursor proximity) */}
          <div className="absolute -left-[calc((100vw-100%)/2)] w-screen top-1/2 -translate-y-1/2 pointer-events-none z-0">
            <ElasticBaseline />
          </div>

          {/* Left Edge: 3 Horizontal Lines (☰) sitting DIRECTLY on the baseline */}
          <div className="absolute -left-[calc((100vw-100%)/2)] pl-5 sm:pl-7 md:pl-9 top-1/2 -translate-y-1/2 z-30 pointer-events-auto">
            <button
              type="button"
              onClick={onOpenMenu}
              className="group flex flex-col justify-center items-start gap-[5px] p-2 cursor-pointer hover:opacity-80 transition-opacity"
              aria-label="Open Table of Chapters"
              title="Open Menu"
            >
              <span className="w-6 h-[1.5px] bg-white/85 group-hover:bg-white transition-all shadow-[0_0_4px_rgba(255,255,255,0.3)]" />
              <span className="w-6 h-[1.5px] bg-white group-hover:bg-white transition-all shadow-[0_0_6px_rgba(255,255,255,0.5)]" />
              <span className="w-6 h-[1.5px] bg-white/85 group-hover:bg-white transition-all shadow-[0_0_4px_rgba(255,255,255,0.3)]" />
            </button>
          </div>

          {/* Staggered Circles Flow: 3 Pillars (INNOVATE, BUILD, SCALE) */}
          <div className="relative z-10 flex items-center justify-center -space-x-8 sm:-space-x-12 md:-space-x-16">
            {chapters.map((chapter, index) => {
              const isHovered = hoveredCircle === chapter.id;
              const isActive = activeChapter === chapter.id;
              const isAnotherActive = activeChapter !== null && !isActive;

              return (
                <button
                  key={chapter.id}
                  type="button"
                  onMouseEnter={() => setHoveredCircle(chapter.id)}
                  onMouseLeave={() => setHoveredCircle(null)}
                  onClick={() => handleCircleClick(chapter.id)}
                  style={{
                    transitionDelay: isAnotherActive ? '0ms' : `${180 + index * 300}ms`
                  }}
                  className={`relative flex items-center justify-center rounded-full transition-all duration-700 ease-out cursor-pointer group select-none ${
                    circlesReady
                      ? 'translate-y-0'
                      : 'translate-y-6'
                  } ${
                    isAnotherActive
                      ? 'opacity-0 scale-50 pointer-events-none'
                      : isActive
                      ? 'opacity-100 scale-125 z-30 border-white bg-white/10 shadow-[0_0_40px_rgba(255,255,255,0.35)]'
                      : isHovered
                      ? 'opacity-100 scale-105 z-20 border-white bg-white/[0.08] shadow-[0_0_30px_rgba(255,255,255,0.25)]'
                      : 'opacity-100 scale-100 z-10 border-white/40 bg-white/[0.03] shadow-[0_0_20px_rgba(255,255,255,0.05)]'
                  } border w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72`}
                  aria-label={`${chapter.label} Chapter`}
                >
                  {/* Glowing SVG Arc Tracer (Animated draw along perimeter on hover) */}
                  <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
                    <circle
                      cx="50%"
                      cy="50%"
                      r="49%"
                      fill="none"
                      stroke="rgba(255, 255, 255, 0.9)"
                      strokeWidth="2"
                      strokeDasharray="900"
                      strokeDashoffset={isHovered || isActive ? '0' : '900'}
                      className="transition-all duration-700 ease-out"
                    />
                  </svg>

                  {/* Center Plus / Minus Icon sitting DIRECTLY on the horizontal baseline */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center pointer-events-none z-20">
                    {/* Horizontal bar (cuts seamlessly along the baseline) */}
                    <span className="w-3.5 h-[1.5px] bg-white transition-all shadow-[0_0_6px_rgba(255,255,255,0.5)]" />
                    {/* Vertical bar (fades & rotates into horizontal bar on hover or click) */}
                    <span
                      className={`absolute w-[1.5px] h-3.5 bg-white transition-all duration-300 ease-out shadow-[0_0_6px_rgba(255,255,255,0.5)] ${
                        isHovered || isActive
                          ? 'scale-y-0 opacity-0 rotate-90'
                          : 'scale-y-100 opacity-100 rotate-0'
                      }`}
                    />
                  </div>

                  {/* Label positioned below center line */}
                  <span
                    style={{
                      fontFamily: "var(--font-serif), 'Libertinus Sans', 'Cinzel', 'Playfair Display', Georgia, serif",
                      letterSpacing: '-0.04em',
                      lineHeight: 1.07,
                    }}
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-7 sm:translate-y-8 md:translate-y-9 uppercase font-normal drop-shadow-sm select-none whitespace-nowrap transition-all duration-300 ${
                      isHovered || isActive
                        ? 'text-white font-medium scale-105 drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]'
                        : 'text-white/95 text-xs sm:text-sm md:text-base'
                    }`}
                  >
                    {chapter.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ========================================================================= */}
          {/* ACTIVE CHAPTER RIGHT DETAIL TEXT: (Matches 1.mp4 13s-16s)                 */}
          {/* ========================================================================= */}
          {activeMeta && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-12 md:translate-x-20 max-w-xs text-left space-y-3 z-30 animate-fadeIn pointer-events-auto">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#fa712a] font-semibold block">
                {activeMeta.subHeader}
              </span>
              <p className="text-xs sm:text-sm md:text-base font-light text-white/90 leading-relaxed font-editorial-sans">
                {activeMeta.description}
              </p>
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleProceedToSection(activeMeta.id)}
                  className="px-5 py-2 rounded-full bg-white text-[#1d150c] text-xs font-mono font-semibold uppercase tracking-wider hover:bg-[#fa712a] hover:text-white transition-all shadow-md hover:scale-105 cursor-pointer"
                >
                  Explore Solution →
                </button>
                <button
                  type="button"
                  onClick={() => setActiveChapter(null)}
                  className="px-3 py-2 rounded-full bg-white/10 text-white/80 text-xs font-mono tracking-wider hover:bg-white/20 transition-all cursor-pointer"
                  title="Close and return to overview"
                >
                  ✕ Close
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* HERO CORE HEADLINE, SUBTEXT & CTA (Exact Finalized Content)               */}
        {/* ========================================================================= */}
        <div
          className={`mt-8 md:mt-12 text-center max-w-3xl mx-auto px-4 transition-all duration-700 ease-out ${
            activeChapter
              ? 'opacity-0 translate-y-8 pointer-events-none'
              : 'opacity-100 translate-y-0'
          }`}
        >
          <h1
            style={{
              fontFamily: "var(--font-serif), 'Libertinus Sans', 'Cinzel', 'Playfair Display', Georgia, serif",
              letterSpacing: '-0.04em',
              lineHeight: 1.15,
            }}
            className="text-[#edece8] uppercase text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal drop-shadow-sm mb-3 tracking-tight"
          >
            Technology That Moves Business.
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-white/90 font-editorial-sans max-w-2xl mx-auto leading-relaxed mb-6 font-normal">
            Custom CRMs, business automation, and connected software engineered for modern businesses.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => onNavigateSection('intro')}
              className="px-7 py-2.5 rounded-full bg-[#edece8] text-[#1d150c] text-xs font-mono font-semibold uppercase tracking-widest hover:bg-[#fa712a] hover:text-white transition-all shadow-xl hover:scale-105 cursor-pointer"
            >
              EXPLORE SYSTEMS →
            </button>
          </div>
        </div>
      </div>

      {/* Clean Bottom Spacer */}
      <div className="w-full pb-4" />
    </section>
  );
};
