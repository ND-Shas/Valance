import React from 'react';
import { ValueCardData } from './ValueCard';

interface TiltedChapterFlowProps {
  onOpenCourse: (course: ValueCardData) => void;
  cardStep: number; // 0 to 5
  onStepChange: (newStep: number) => void;
  onNextPage: () => void;
}

interface ChapterItem extends ValueCardData {
  categoryBadge: string;
  secondaryQuote: string;
}

const chapters: ChapterItem[] = [
  {
    id: 'innovate',
    number: '01',
    title: 'INTELLIGENT BUSINESS SYSTEMS',
    tagline: 'Recruitment CRM. Candidate Management. Client Relationships.',
    categoryBadge: 'CAPABILITY: CUSTOM CRM DEVELOPMENT',
    philosophy:
      'WE ENGINEER CUSTOM CRM PLATFORMS THAT CENTRALIZE CANDIDATE PIPELINES, CLIENT RELATIONSHIPS, RECRUITER WORKFLOWS, AND OPERATIONAL REPORTING.',
    secondaryQuote:
      'FROM RECRUITMENT DESKS TO MULTI-TEAM OPERATIONS, EVERY INTERACTION BECOMES STRUCTURED, TRACKABLE, AND ACTIONABLE.',
    bgImage: '/value-connect.jpg',
    courseTag: 'Custom CRM Development',
    courseTitle: 'Centralized Candidate & Recruiter Desks',
    courseImage: '/gallery/01.jpg',
    courseDescription:
      'Centralize candidate pipelines, recruiter workflows, interview assignments, automated candidate follow-ups, and clean client submissions.',
    courseDuration: 'Custom Architecture'
  },
  {
    id: 'build',
    number: '02',
    title: 'SOFTWARE BUILT AROUND YOU',
    tagline: 'Custom Software. Business Websites. Dashboards. Internal Platforms.',
    categoryBadge: 'CAPABILITY: CUSTOM SOFTWARE ENGINEERING',
    philosophy:
      'WE TRANSFORM BUSINESS REQUIREMENTS INTO PURPOSE-BUILT SOFTWARE, FROM PREMIUM WEBSITES AND INTERACTIVE DASHBOARDS TO INTERNAL PLATFORMS.',
    secondaryQuote:
      'EVERY INTERFACE IS DESIGNED FOR CLARITY. EVERY FEATURE SERVES A PURPOSE. EVERY SYSTEM IS BUILT AROUND YOUR BUSINESS.',
    bgImage: '/value-create.jpg',
    courseTag: 'Custom Software Engineering',
    courseTitle: 'Operational Dashboards & Portals',
    courseImage: '/gallery/02.jpg',
    courseDescription:
      'High-velocity client portals, real-time analytics dashboards, milestone payment tracking, and responsive web applications with zero seat bloat.',
    courseDuration: 'Scalable Engineering'
  },
  {
    id: 'scale',
    number: '03',
    title: 'AUTOMATION WITHOUT FRICTION',
    tagline: 'Workflow Automation. API Integration. Connected Operations.',
    categoryBadge: 'CAPABILITY: BUSINESS PROCESS AUTOMATION',
    philosophy:
      'WE CONNECT APPLICATIONS, AUTOMATE REPETITIVE WORKFLOWS, ORCHESTRATE NOTIFICATIONS, AND SYNCHRONIZE PROCESSES THROUGH APIS AND WEBHOOKS.',
    secondaryQuote:
      'LESS MANUAL COORDINATION. MORE CONNECTED EXECUTION. WHAT YOU AUTOMATE TODAY BECOMES YOUR PREDICTABLE REVENUE ENGINE.',
    bgImage: '/value-change.jpg',
    courseTag: 'Business Process Automation',
    courseTitle: 'Sub-60s Workflow & API Dispatch',
    courseImage: '/gallery/03.jpg',
    courseDescription:
      'Event-driven webhooks, instant multi-channel WhatsApp/email notifications, automated SLA escalations, and cross-platform database synchronization.',
    courseDuration: 'Autonomous Systems'
  }
];

export const TiltedChapterFlow: React.FC<TiltedChapterFlowProps> = ({
  onOpenCourse,
  cardStep,
  onStepChange,
  onNextPage
}) => {
  // Active card index for bottom indicator:
  // 0: innovate (steps 0, 1)
  // 1: build (steps 2, 3)
  // 2: scale (steps 4, 5)
  const activeChapterIdx = cardStep <= 1 ? 0 : cardStep <= 3 ? 1 : 2;

  return (
    <div className="relative w-screen h-screen flex-shrink-0 overflow-hidden select-none bg-[#c44919]">
      {/* ========================================================================= */}
      {/* 3 CHAPTER CARDS LAYERED IN A TRUE "Z" ORDER STACK                         */}
      {/* - Card 1 (Innovate): Base floor (z-index 10). NEVER drops down!           */}
      {/* - Card 2 (Build): z-index 20. Peels in from bottom over Card 1.           */}
      {/* - Card 3 (Scale): z-index 30. Peels in from bottom over Card 2.           */}
      {/* ========================================================================= */}
      {chapters.map((chapter, idx) => {
        // Z-stack positioning:
        // Card 0 (Innovate): Always at translateY(0%) - solid base floor!
        // Card 1 (Build): Peels up at step >= 2, otherwise translateY(105%) rotate(-3.5deg)
        // Card 2 (Scale): Peels up at step >= 4, otherwise translateY(105%) rotate(-3.5deg)
        let cardTransform = 'translateY(105%) rotate(-3.5deg)';

        if (idx === 0) {
          cardTransform = 'translateY(0%) rotate(0deg)'; // Base floor never drops!
        } else if (idx === 1) {
          cardTransform = cardStep >= 2 ? 'translateY(0%) rotate(0deg)' : 'translateY(105%) rotate(-3.5deg)';
        } else if (idx === 2) {
          cardTransform = cardStep >= 4 ? 'translateY(0%) rotate(0deg)' : 'translateY(105%) rotate(-3.5deg)';
        }

        // Current phase within this card:
        // Card 0: phase 0 at step 0, phase 1 at step >= 1
        // Card 1: phase 0 at step 2, phase 1 at step >= 3
        // Card 2: phase 0 at step 4, phase 1 at step >= 5
        let currentPhase = 0;
        if (idx === 0) {
          currentPhase = cardStep >= 1 ? 1 : 0;
        } else if (idx === 1) {
          currentPhase = cardStep >= 3 ? 1 : 0;
        } else if (idx === 2) {
          currentPhase = cardStep >= 5 ? 1 : 0;
        }

        const imageScale = currentPhase === 1 ? 'scale(1.06)' : 'scale(1.02)';
        const imageTranslateY = currentPhase === 1 ? '-20px' : '0px';

        return (
          <div
            key={chapter.id}
            style={{
              transform: cardTransform,
              transformOrigin: 'top left',
              zIndex: 10 + idx * 10,
              boxShadow: idx > 0 ? '0 -30px 80px rgba(0, 0, 0, 0.65)' : 'none',
              transition: 'transform 0.38s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            className="absolute inset-0 w-full h-full flex flex-col justify-between items-center px-6 md:px-14 lg:px-20 py-8 md:py-12 text-[#edece8] overflow-hidden bg-[#c44919]"
          >
            {/* Slanted Top Highlight Line on Peel Edge (Matches 2.mp4 4s, 14s, 22s) */}
            {idx > 0 && (
              <div className="absolute top-0 inset-x-0 h-[2px] bg-white/90 shadow-[0_0_12px_rgba(255,255,255,0.85)] z-50 pointer-events-none" />
            )}

            {/* ===================================================================== */}
            {/* FULL BLEED ATMOSPHERIC BACKGROUND IMAGE (Exact 2.mp4 Full Atmosphere) */}
            {/* ===================================================================== */}
            <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
              <img
                src={chapter.bgImage}
                alt={chapter.title}
                style={{
                  transform: `${imageScale} translateY(${imageTranslateY})`,
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                className="w-full h-full object-cover object-center"
                loading="eager"
              />
              {/* Warm amber glaze for cohesive branding */}
              <div className="absolute inset-0 bg-[#b34012]/32 mix-blend-multiply" />
              {/* Vertical soft contrast vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/35" />
              {/* Right side gentle darkening to guarantee text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/50" />
            </div>

            {/* Continuous Horizontal Baseline across the middle */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-white/40 pointer-events-none z-20 shadow-[0_0_6px_rgba(255,255,255,0.4)]" />
            {/* Central Wireframe Circular Dome */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-96 sm:h-96 md:w-[480px] md:h-[480px] lg:w-[580px] lg:h-[580px] rounded-full border border-white/35 pointer-events-none z-20 shadow-[0_0_30px_rgba(255,255,255,0.06)]" />

            {/* ===================================================================== */}
            {/* 1. TOP GRAND TITLE: Scrolls UP and exits off top edge in Phase 1      */}
            {/* ===================================================================== */}
            <div
              style={{
                transform: currentPhase === 1 ? 'translateY(-140%)' : 'translateY(0%)',
                opacity: currentPhase === 1 ? 0 : 1,
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              className="relative z-30 w-full max-w-6xl mx-auto pt-2 text-center pointer-events-none"
            >
              <h2
                style={{
                  fontFamily: "var(--font-serif), 'Libertinus Sans', 'Cinzel', Georgia, serif",
                  letterSpacing: '-0.04em',
                  lineHeight: 1.08,
                }}
                className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-white uppercase tracking-tight drop-shadow-md"
              >
                {chapter.title}
              </h2>
            </div>

            {/* ===================================================================== */}
            {/* 2. RIGHT-SIDE SEQUENTIAL TEXTS & FLOATING SOLUTION CARD               */}
            {/* ===================================================================== */}
            <div className="relative z-30 max-w-6xl w-full mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Empty left column: Lets the focal subject breathe */}
              <div className="hidden lg:block lg:col-span-5 pointer-events-none" />

              {/* Right column: Text 1 + Text 2 + Floating Solution Card */}
              <div className="lg:col-span-7 flex flex-col justify-center space-y-6 lg:pl-6">
                
                {/* Text 1 (Initial Philosophy Quote) */}
                <div
                  style={{
                    transform: currentPhase === 1 ? 'translateY(-35px)' : 'translateY(0px)',
                    opacity: currentPhase === 1 ? 0.6 : 1,
                    transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-sans), 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                      lineHeight: 1.28,
                      letterSpacing: '-0.01em',
                    }}
                    className="text-lg sm:text-2xl md:text-3xl lg:text-[32px] text-white font-medium uppercase tracking-wide max-w-xl drop-shadow-md"
                  >
                    {chapter.philosophy}
                  </p>
                </div>

                {/* Text 2 (Reveals below Text 1 with orange line in Phase 1) */}
                <div
                  style={{
                    transform: currentPhase === 1 ? 'translateY(0px)' : 'translateY(40px)',
                    opacity: currentPhase === 1 ? 1 : 0,
                    pointerEvents: currentPhase === 1 ? 'auto' : 'none',
                    transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  className="space-y-3"
                >
                  <span className="w-12 h-[1.5px] bg-[#fa712a] block shadow-[0_0_8px_rgba(250,113,42,0.8)]" />
                  <p
                    style={{
                      fontFamily: "var(--font-sans), 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                      lineHeight: 1.28,
                      letterSpacing: '-0.01em',
                    }}
                    className="text-base sm:text-xl md:text-2xl text-white/95 font-medium uppercase tracking-wide max-w-lg drop-shadow-md"
                  >
                    {chapter.secondaryQuote}
                  </p>
                </div>

                {/* Floating Solution Card (Rises and settles right on the central horizontal line) */}
                <div
                  style={{
                    transform: currentPhase === 1 ? 'translateY(0px)' : 'translateY(80px)',
                    opacity: currentPhase === 1 ? 1 : 0,
                    pointerEvents: currentPhase === 1 ? 'auto' : 'none',
                    transition: 'all 0.38s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  className="pt-2"
                >
                  <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#fa712a] font-semibold block mb-2 drop-shadow-sm">
                    {chapter.categoryBadge}
                  </span>

                  <div
                    onClick={() => onOpenCourse(chapter)}
                    className="w-full max-w-lg bg-[#f7f5f0] text-[#1d150c] rounded-xl p-4 sm:p-5 shadow-2xl border border-white/60 cursor-pointer group hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-all duration-300"
                  >
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      {/* Left Thumbnail Image */}
                      <div className="relative w-full sm:w-44 aspect-[16/11] rounded-lg overflow-hidden flex-shrink-0 bg-black/10">
                        <img
                          src={chapter.courseImage}
                          alt={chapter.courseTitle}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/65 backdrop-blur-md text-[10px] font-mono text-white tracking-wider">
                          {chapter.courseDuration}
                        </div>
                      </div>

                      {/* Right Details */}
                      <div className="flex-1 space-y-1.5 w-full">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono uppercase tracking-wider text-[#a54d25] font-semibold">
                            {chapter.courseTag}
                          </span>
                          <span className="text-sm font-mono text-[#1d150c] opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                            ↗
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-serif font-semibold text-[#1d150c] group-hover:text-[#a54d25] transition-colors leading-snug">
                          {chapter.courseTitle}
                        </h3>
                        <p className="text-xs text-[#1d150c]/75 line-clamp-2 leading-relaxed">
                          {chapter.courseDescription}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* ===================================================================== */}
            {/* 3. BOTTOM PILLAR INDICATOR & STEP SWITCHER                            */}
            {/* ===================================================================== */}
            <div className="relative z-30 w-full max-w-6xl mx-auto flex items-center justify-between pt-3 border-t border-white/20 text-xs font-mono text-white/80">
              <div className="flex items-center gap-3">
                <span className="text-[#fa712a] font-bold">PILLAR 0{idx + 1} / 03</span>
                <span className="text-white/30">·</span>
                <span className="hidden sm:inline">{chapter.tagline}</span>
              </div>

              {/* Clickable Step Switcher */}
              <div className="flex items-center gap-2">
                {[0, 1, 2].map((stepIdx) => {
                  const isCurrent = activeChapterIdx === stepIdx;
                  return (
                    <button
                      key={stepIdx}
                      type="button"
                      onClick={() => onStepChange(stepIdx * 2)}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        isCurrent
                          ? 'w-8 bg-[#fa712a] shadow-[0_0_8px_rgba(250,113,42,0.8)]'
                          : 'w-2 bg-white/40 hover:bg-white/70'
                      }`}
                      aria-label={`Jump to Pillar 0${stepIdx + 1}`}
                    />
                  );
                })}

                <button
                  type="button"
                  onClick={() => {
                    if (cardStep < 5) {
                      onStepChange(cardStep + 1);
                    } else {
                      onNextPage();
                    }
                  }}
                  className="ml-3 hover:text-white transition-colors cursor-pointer text-[11px] uppercase tracking-wider text-white/70 hover:text-white"
                >
                  {cardStep >= 5 ? 'Next: Gallery →' : 'Scroll Down ↓'}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
