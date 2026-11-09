import React, { useState } from 'react';

interface WorkProject {
  id: string;
  number: string;
  title: string;
  type: string;
  description: string;
  badge: string;
}

const projects: WorkProject[] = [
  {
    id: '01',
    number: '01',
    title: 'VALENCE CRM',
    type: 'INTERNAL PRODUCT / DEVELOPMENT',
    description: 'An internal CRM concept exploring lead management, follow-up workflows, sales pipelines, task assignment, and business operations.',
    badge: 'CORE ATS & CRM'
  },
  {
    id: '02',
    number: '02',
    title: 'PROCESS ANALYST DASHBOARD',
    type: 'INTERNAL PRODUCT / DEVELOPMENT',
    description: 'An operational analytics interface designed around KPI tracking, monthly reporting, performance comparisons, and business intelligence.',
    badge: 'ANALYTICS & BI'
  },
  {
    id: '03',
    number: '03',
    title: 'MAIL INTELLIGENCE ENGINE',
    type: 'TECHNICAL PROTOTYPE / DEVELOPMENT',
    description: 'A technical exploration into email intelligence, workflow automation, backend processing, and connected communication systems.',
    badge: 'EVENT ENGINE'
  },
  {
    id: '04',
    number: '04',
    title: 'WORKFLOW AUTOMATION ENGINE',
    type: 'INTERNAL PRODUCT / CONCEPT',
    description: 'An automation concept connecting events, task assignment, notifications, operational workflows, and reporting.',
    badge: 'INTELLIGENT DISPATCH'
  }
];

export const PreviewVideoLoop: React.FC = () => {
  const [activeProjectIdx, setActiveProjectIdx] = useState<number>(0);
  const activeProj = projects[activeProjectIdx];

  return (
    <section className="relative w-full h-full min-h-[100svh] flex-shrink-0 flex flex-col justify-between items-center px-6 md:px-14 lg:px-20 py-10 md:py-14 bg-[#140c06] text-white select-none overflow-hidden">
      {/* Background Ambient Video Loop */}
      <div className="absolute inset-0 w-full h-full pointer-events-none opacity-40 mix-blend-screen">
        <video
          src="/preview-loop-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#140c06] via-[#140c06]/50 to-[#140c06]" />
      </div>

      {/* 1. Top Eyebrow */}
      <header className="relative z-10 w-full max-w-6xl mx-auto flex items-center justify-between pointer-events-none">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#fa712a] font-semibold">
          Section 06 · Our Work
        </span>
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-white/50">
          Proof Over Claims
        </span>
      </header>

      {/* 2. Main Content: Header & Interactive Project Showcase */}
      <div className="relative z-10 w-full max-w-5xl mx-auto my-auto flex flex-col items-center text-center space-y-8">
        <div className="space-y-3">
          <h2
            style={{ fontFamily: "var(--font-serif), 'Cinzel', Georgia, serif" }}
            className="text-2xl sm:text-4xl md:text-5xl font-light text-[#edece8] tracking-tight uppercase"
          >
            SYSTEMS IN DEVELOPMENT. IDEAS IN EXECUTION.
          </h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-white/75 font-editorial-sans leading-relaxed">
            We believe engineering should be demonstrated, not merely described. Explore internal products, functional prototypes, and technical explorations designed to solve real operational challenges.
          </p>
        </div>

        {/* Project Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {projects.map((proj, idx) => (
            <button
              key={proj.id}
              type="button"
              onClick={() => setActiveProjectIdx(idx)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeProjectIdx === idx
                  ? 'bg-[#fa712a] text-white shadow-lg scale-105 font-semibold'
                  : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
              }`}
            >
              Project {proj.number}
            </button>
          ))}
        </div>

        {/* Active Project Highlight Card */}
        <div className="w-full max-w-3xl bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 text-left space-y-4 shadow-2xl transition-all duration-500">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#fa712a] font-semibold block mb-1">
                {activeProj.badge} · {activeProj.type}
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-normal text-white uppercase tracking-wide">
                {activeProj.title}
              </h3>
            </div>
            <span className="text-xs font-mono text-white/50 bg-white/10 px-3 py-1 rounded-full self-start sm:self-auto">
              {activeProj.number} / 04
            </span>
          </div>

          <p className="text-sm sm:text-base text-white/85 font-editorial-sans leading-relaxed">
            {activeProj.description}
          </p>

          <div className="pt-2 flex items-center justify-between text-xs font-mono text-white/60">
            <span>Engineering Status: Active Technical Architecture</span>
            <span className="text-[#fa712a]">Verified Core Model ↗</span>
          </div>
        </div>
      </div>

      {/* 3. Bottom Indicator */}
      <footer className="relative z-10 w-full max-w-6xl mx-auto flex items-center justify-between text-xs font-mono text-white/40">
        <span>Click tabs to explore projects</span>
        <span>Scroll to continue →</span>
      </footer>
    </section>
  );
};
