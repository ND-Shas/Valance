import React, { useState } from 'react';
import { FounderId } from './FounderVisionModal';
import { industriesData, IndustryDetail } from '../data/industriesData';

interface EditorialPoemSectionProps {
  onOpenMeet: () => void;
  onOpenIndustries?: () => void;
  onSelectFounder?: (founderId: FounderId) => void;
  onSelectIndustryDetail?: (industry: IndustryDetail) => void;
}

export const EditorialPoemSection: React.FC<EditorialPoemSectionProps> = ({
  onOpenMeet,
  onOpenIndustries,
  onSelectFounder,
  onSelectIndustryDetail
}) => {
  // Tabs: 01 About, 02 Process, 03 Industries, 04 What We Build (02 Founders removed as requested)
  const [activeTab, setActiveTab] = useState<'about' | 'process' | 'industries' | 'capabilities'>('about');

  const handleFounderClick = (id: FounderId) => {
    if (onSelectFounder) {
      onSelectFounder(id);
    }
  };

  const handleIndustryCardClick = (ind: IndustryDetail) => {
    if (onSelectIndustryDetail) {
      onSelectIndustryDetail(ind);
    } else if (onOpenIndustries) {
      onOpenIndustries();
    }
  };

  const coreSolutions = [
    {
      title: 'Custom CRM Systems',
      desc: 'Sales CRM, Recruitment CRM, Client CRM, Lead Management, Candidate Tracking & Employee Management.'
    },
    {
      title: 'Business Websites',
      desc: 'Premium corporate websites, landing pages, business portals, digital experiences & customer platforms.'
    },
    {
      title: 'Custom Software',
      desc: 'Internal platforms, business applications, management systems, operational tools & business-specific software.'
    },
    {
      title: 'Business Automation',
      desc: 'Automated follow-ups, notifications, reporting, task workflows, communication systems & event dispatch.'
    },
    {
      title: 'Business Intelligence',
      desc: 'Business dashboards, KPI reporting, revenue analytics, performance monitoring & executive reports.'
    },
    {
      title: 'API & System Integrations',
      desc: 'Connect applications, databases, communication channels, payment systems & third-party tools via webhooks.'
    },
    {
      title: 'AI-Assisted Workflows',
      desc: 'AI-assisted document processing, information extraction, communication intelligence & reporting assistance.'
    }
  ];

  const deliverySteps = [
    { num: '01', title: 'DISCOVER', desc: 'Understand operational bottlenecks, requirements, and outcomes.' },
    { num: '02', title: 'ARCHITECT', desc: 'Map workflows, define system architecture, and establish scope.' },
    { num: '03', title: 'ENGINEER', desc: 'Develop application, integrate systems, and validate functionality.' },
    { num: '04', title: 'DEPLOY', desc: 'Launch system, configure access, and prepare for operational use.' },
    { num: '05', title: 'EVOLVE', desc: 'Maintain, improve, and extend systems as business grows.' },
  ];

  return (
    <section
      id="spaces"
      className="relative w-full h-full min-h-[100svh] flex-shrink-0 flex items-center justify-center px-6 md:px-14 lg:px-20 py-10 md:py-14 bg-[#edece8] text-[#1d150c] select-none border-l border-[#1d150c]/8 overflow-hidden"
    >
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
        
        {/* Left Column: Dual Editorial Visuals with Transparent Hover Card */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-4 items-center">
          
          {/* 1. Shivang Mishra (CEO) Card */}
          <div className="space-y-3">
            <div
              onClick={() => handleFounderClick('shivang')}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border border-[#1d150c]/10 bg-neutral-200 cursor-pointer group"
              title="Click to know more about Shivang Mishra & his vision"
            >
              <img
                src="/editorial-primary.jpg"
                alt="Shivang Mishra & Commercial Strategy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />

              {/* Transparent Black Cover on Hover */}
              <div className="absolute inset-0 bg-[#0c0603]/80 backdrop-blur-[3px] opacity-0 group-hover:opacity-100 transition-all duration-400 flex flex-col items-center justify-between p-3.5 sm:p-4 text-center">
                <div className="w-full flex justify-end">
                  <span className="w-7 h-7 rounded-full bg-white/20 text-white flex items-center justify-center text-xs backdrop-blur-md group-hover:scale-110 transition-transform">
                    ↗
                  </span>
                </div>

                <div className="space-y-1.5 px-1">
                  <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.25em] uppercase text-[#fa712a] font-semibold block">
                    FOUNDER ESSAY
                  </span>
                  <p
                    style={{ fontFamily: "var(--font-serif), 'Cinzel', Georgia, serif" }}
                    className="text-[11px] sm:text-xs font-light text-white uppercase tracking-tight leading-snug"
                  >
                    KNOW MORE ABOUT FOUNDER AND HIS VISION
                  </p>
                </div>

                <div className="w-full">
                  <span className="inline-block text-[9px] font-mono uppercase tracking-[0.18em] px-2.5 py-1 rounded-full bg-white/15 text-white/95 border border-white/25">
                    READ VISION →
                  </span>
                </div>
              </div>
            </div>

            <div className="text-center space-y-0.5">
              <p
                style={{ fontFamily: "var(--font-serif), 'Cinzel', Georgia, serif" }}
                className="text-xs sm:text-sm font-normal text-[#1d150c] tracking-wider uppercase"
              >
                SHIVANG MISHRA
              </p>
              <p className="text-[10px] font-mono text-[#a54d25] uppercase tracking-[0.2em] font-semibold">
                CEO & BUSINESS DEV
              </p>
            </div>
          </div>

          {/* 2. Shashank Mishra (CTO) Card */}
          <div className="space-y-3 pt-6">
            <div
              onClick={() => handleFounderClick('shashank')}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border border-[#1d150c]/10 bg-neutral-200 cursor-pointer group"
              title="Click to know more about Shashank Mishra & his vision"
            >
              <img
                src="/editorial-secondary.jpg?v=cto1"
                alt="Shashank Mishra & Technology Architecture"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />

              {/* Transparent Black Cover on Hover */}
              <div className="absolute inset-0 bg-[#0c0603]/80 backdrop-blur-[3px] opacity-0 group-hover:opacity-100 transition-all duration-400 flex flex-col items-center justify-between p-3.5 sm:p-4 text-center">
                <div className="w-full flex justify-end">
                  <span className="w-7 h-7 rounded-full bg-white/20 text-white flex items-center justify-center text-xs backdrop-blur-md group-hover:scale-110 transition-transform">
                    ↗
                  </span>
                </div>

                <div className="space-y-1.5 px-1">
                  <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.25em] uppercase text-[#fa712a] font-semibold block">
                    FOUNDER ESSAY
                  </span>
                  <p
                    style={{ fontFamily: "var(--font-serif), 'Cinzel', Georgia, serif" }}
                    className="text-[11px] sm:text-xs font-light text-white uppercase tracking-tight leading-snug"
                  >
                    KNOW MORE ABOUT FOUNDER AND HIS VISION
                  </p>
                </div>

                <div className="w-full">
                  <span className="inline-block text-[9px] font-mono uppercase tracking-[0.18em] px-2.5 py-1 rounded-full bg-white/15 text-white/95 border border-white/25">
                    READ VISION →
                  </span>
                </div>
              </div>
            </div>

            <div className="text-center space-y-0.5">
              <p
                style={{ fontFamily: "var(--font-serif), 'Cinzel', Georgia, serif" }}
                className="text-xs sm:text-sm font-normal text-[#1d150c] tracking-wider uppercase"
              >
                SHASHANK MISHRA
              </p>
              <p className="text-[10px] font-mono text-[#a54d25] uppercase tracking-[0.2em] font-semibold">
                CTO & TECHNOLOGY
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Tabbed Editorial Narrative (All adhering to Tab 01 typography) */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-5">
          
          {/* Tab Selector: 01 About, 02 Process, 03 Industries, 04 What We Build */}
          <div className="flex items-center gap-1.5 border-b border-[#1d150c]/15 pb-2.5 overflow-x-auto no-scrollbar">
            <button
              type="button"
              onClick={() => setActiveTab('about')}
              className={`text-[11px] font-mono uppercase tracking-[0.18em] px-3.5 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'about'
                  ? 'bg-[#1d150c] text-white font-semibold'
                  : 'text-[#1d150c]/60 hover:text-[#1d150c]'
              }`}
            >
              01 · About
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('process')}
              className={`text-[11px] font-mono uppercase tracking-[0.18em] px-3.5 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'process'
                  ? 'bg-[#1d150c] text-white font-semibold'
                  : 'text-[#1d150c]/60 hover:text-[#1d150c]'
              }`}
            >
              02 · Process
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('industries')}
              className={`text-[11px] font-mono uppercase tracking-[0.18em] px-3.5 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'industries'
                  ? 'bg-[#a54d25] text-white font-semibold shadow-sm'
                  : 'text-[#a54d25] hover:bg-[#a54d25]/10 font-medium'
              }`}
            >
              <span>03 · Industries (12)</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#fa712a] animate-pulse" />
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('capabilities')}
              className={`text-[11px] font-mono uppercase tracking-[0.18em] px-3.5 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'capabilities'
                  ? 'bg-[#1d150c] text-white font-semibold'
                  : 'text-[#1d150c]/60 hover:text-[#1d150c]'
              }`}
            >
              04 · What We Build
            </button>
          </div>

          {/* TAB 1: ABOUT VALENCE */}
          {activeTab === 'about' && (
            <div className="space-y-4 animate-fadeIn">
              <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#a54d25] font-semibold block">
                About VALENCE
              </span>
              <h2
                style={{ fontFamily: "var(--font-serif), 'Cinzel', Georgia, serif" }}
                className="text-2xl sm:text-3xl font-light text-[#1d150c] tracking-tight uppercase leading-snug"
              >
                A DIFFERENT WAY TO BUILD TECHNOLOGY.
              </h2>
              <p className="text-xs sm:text-sm font-light text-[#1d150c]/80 leading-relaxed font-editorial-sans">
                VALENCE is a business technology studio, focused on custom software, CRM platforms, workflow automation, and connected business systems. We work at the intersection of business operations and engineering — translating complex workflows into software that is practical, intuitive, and built for real-world execution.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-[#1d150c]/10 text-xs font-mono text-[#1d150c]/80">
                <span className="p-2 rounded bg-white/60 border border-[#1d150c]/5 text-center">01 Understand</span>
                <span className="p-2 rounded bg-white/60 border border-[#1d150c]/5 text-center">02 Engineer</span>
                <span className="p-2 rounded bg-white/60 border border-[#1d150c]/5 text-center">03 Connect</span>
                <span className="p-2 rounded bg-white/60 border border-[#1d150c]/5 text-center">04 Enable</span>
              </div>
            </div>
          )}

          {/* TAB 2: DELIVERY PROCESS */}
          {activeTab === 'process' && (
            <div className="space-y-4 animate-fadeIn">
              <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#a54d25] font-semibold block">
                From Discovery to Deployment
              </span>
              <h2
                style={{ fontFamily: "var(--font-serif), 'Cinzel', Georgia, serif" }}
                className="text-2xl sm:text-3xl font-light text-[#1d150c] tracking-tight uppercase leading-snug"
              >
                STRUCTURED DELIVERY. PREDICTABLE VELOCITY.
              </h2>
              <p className="text-xs sm:text-sm font-light text-[#1d150c]/80 leading-relaxed font-editorial-sans">
                Every project follows a defined engineering discipline from operational discovery to production launch. No vague scopes, no unexpected delays.
              </p>
              <div className="space-y-2 pt-1 border-t border-[#1d150c]/10">
                {deliverySteps.map((step) => (
                  <div
                    key={step.num}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-white/60 border border-[#1d150c]/8"
                  >
                    <span className="text-xs font-mono text-[#a54d25] font-bold tracking-wider whitespace-nowrap">
                      {step.num} · {step.title}:
                    </span>
                    <span className="text-xs font-light text-[#1d150c]/80 font-editorial-sans leading-snug">
                      {step.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: INDUSTRIES WE EMPOWER (12 THEMED CARDS WITH CLICKABLE MODAL) */}
          {activeTab === 'industries' && (
            <div className="space-y-4 animate-fadeIn">
              <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#a54d25] font-semibold block">
                Industries We Empower
              </span>
              <h2
                style={{ fontFamily: "var(--font-serif), 'Cinzel', Georgia, serif" }}
                className="text-2xl sm:text-3xl font-light text-[#1d150c] tracking-tight uppercase leading-snug"
              >
                ENGINEERED AROUND HOW YOU ACTUALLY OPERATE.
              </h2>
              <p className="text-xs sm:text-sm font-light text-[#1d150c]/80 leading-relaxed font-editorial-sans">
                We don't believe in one-size-fits-all software. Every industry has unique workflows, challenges, and opportunities. Click any card below to explore tailored systems.
              </p>

              {/* 12 Themed Industry Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[220px] overflow-y-auto pr-1">
                {industriesData.map((ind) => (
                  <button
                    key={ind.id}
                    type="button"
                    onClick={() => handleIndustryCardClick(ind)}
                    className="p-3 rounded-xl border border-[#1d150c]/10 bg-white/70 hover:bg-white hover:border-[#a54d25] hover:shadow-md transition-all duration-300 text-left cursor-pointer flex flex-col justify-between space-y-1.5 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg p-1 rounded-lg bg-[#edece8] group-hover:scale-110 transition-transform">
                        {ind.icon}
                      </span>
                      <span className="text-[10px] font-mono text-[#a54d25] uppercase tracking-wider font-bold">
                        {ind.number}
                      </span>
                    </div>

                    <div>
                      <h4
                        style={{ fontFamily: "var(--font-serif), 'Cinzel', Georgia, serif" }}
                        className="text-xs font-normal text-[#1d150c] group-hover:text-[#a54d25] transition-colors leading-snug uppercase tracking-wide"
                      >
                        {ind.name}
                      </h4>
                      <p className="text-[10px] font-light text-[#1d150c]/70 font-editorial-sans line-clamp-1 mt-0.5">
                        {ind.badge || ind.shortName}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-[#1d150c]/8 text-[9px] font-mono text-[#a54d25] uppercase tracking-widest font-semibold">
                      <span>EXPLORE</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="pt-2 border-t border-[#1d150c]/10 flex items-center justify-between text-xs font-mono text-[#1d150c]/70">
                <span className="text-[11px] font-mono text-[#1d150c]/70">
                  ⚡ Click on any industry card above to inspect common frictions &amp; engineered systems
                </span>
              </div>
            </div>
          )}

          {/* TAB 4: WHAT VALENCE CAN BUILD (CORE TECHNOLOGY SOLUTIONS) */}
          {activeTab === 'capabilities' && (
            <div className="space-y-4 animate-fadeIn">
              <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#a54d25] font-semibold block">
                Core Technology Solutions
              </span>
              <h2
                style={{ fontFamily: "var(--font-serif), 'Cinzel', Georgia, serif" }}
                className="text-2xl sm:text-3xl font-light text-[#1d150c] tracking-tight uppercase leading-snug"
              >
                WHAT VALENCE ACTUALLY BUILDS.
              </h2>
              <p className="text-xs sm:text-sm font-light text-[#1d150c]/80 leading-relaxed font-editorial-sans">
                We don't sell technology for the sake of technology. We engineer solutions around measurable business needs, operational visibility, and predictable growth.
              </p>

              {/* 7 Solutions Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[220px] overflow-y-auto pr-1">
                {coreSolutions.map((cap, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-white/70 border border-[#1d150c]/10 flex flex-col justify-center space-y-1 hover:border-[#a54d25]/40 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[#a54d25] font-bold text-xs font-mono">0{i + 1}</span>
                      <h4
                        style={{ fontFamily: "var(--font-serif), 'Cinzel', Georgia, serif" }}
                        className="text-xs font-normal text-[#1d150c] uppercase tracking-wide"
                      >
                        {cap.title}
                      </h4>
                    </div>
                    <p className="text-xs font-light text-[#1d150c]/80 leading-snug font-editorial-sans pl-5">
                      {cap.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action CTAs (Matching Tab 01 style) */}
          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenMeet}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#1d150c] text-white hover:bg-[#a54d25] transition-all duration-300 text-xs font-mono font-semibold uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Work With The Founders →</span>
            </button>

            {onOpenIndustries && (
              <button
                type="button"
                onClick={onOpenIndustries}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/70 border border-[#1d150c]/20 hover:border-[#a54d25] text-[#1d150c] hover:bg-white text-xs font-mono uppercase tracking-wider font-semibold transition-all cursor-pointer"
              >
                <span>Systems Matrix →</span>
              </button>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
