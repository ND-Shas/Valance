import React, { useEffect, useState } from 'react';

export type FounderId = 'shivang' | 'shashank';

interface FounderVisionModalProps {
  isOpen: boolean;
  founderId: FounderId | null;
  onClose: () => void;
  onOpenMeet: () => void;
  onSwitchFounder?: (id: FounderId) => void;
}

export const FounderVisionModal: React.FC<FounderVisionModalProps> = ({
  isOpen,
  founderId,
  onClose,
  onOpenMeet,
  onSwitchFounder
}) => {
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Trigger smooth entrance animation after mount
      const timer = setTimeout(() => setIsRendered(true), 20);
      return () => clearTimeout(timer);
    } else {
      setIsRendered(false);
    }
  }, [isOpen]);

  // ESC key listener to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !founderId) return null;

  const isShivang = founderId === 'shivang';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={isShivang ? "Shivang Mishra Vision" : "Shashank Mishra Vision"}
      className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 md:p-10 select-none overflow-y-auto"
      onClick={onClose}
      style={{
        transition: 'opacity 0.4s ease-out',
        opacity: isRendered ? 1 : 0
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-5xl w-full bg-[#110a05]/95 border border-white/20 rounded-3xl p-6 sm:p-8 md:p-12 shadow-[0_25px_80px_rgba(0,0,0,0.95)] text-white my-auto flex flex-col max-h-[90vh] overflow-hidden"
        style={{
          transform: isRendered ? 'scale(1) translateY(0)' : 'scale(0.96) translateY(20px)',
          transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease-out',
          opacity: isRendered ? 1 : 0
        }}
      >
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#fa712a]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Bar with Close Button (✕) */}
        <div className="w-full flex items-center justify-between pb-4 border-b border-white/10 z-20 flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#fa712a] animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#fa712a] font-semibold">
              FOUNDER ESSAY · VALENCE LEADERSHIP
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/25 border border-white/25 text-white transition-all duration-300 cursor-pointer"
            aria-label="Close modal"
          >
            <span className="text-[11px] font-mono tracking-wider uppercase font-semibold">CLOSE</span>
            <span className="text-sm font-light group-hover:rotate-90 transition-transform">✕</span>
          </button>
        </div>

        {/* Split Grid Layout: Left Photo (Smooth Left Slide) + Right Content (Smooth Right Slide) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center overflow-y-auto pr-1 my-auto py-4 flex-1">
          
          {/* ======================================================== */}
          {/* LEFT COLUMN: Smooth Photo Entrance                       */}
          {/* ======================================================== */}
          <div
            className="md:col-span-5 flex flex-col items-center justify-center space-y-4"
            style={{
              transform: isRendered ? 'translateX(0)' : 'translateX(-40px)',
              opacity: isRendered ? 1 : 0,
              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 bg-neutral-900 group">
              <img
                src={isShivang ? "/editorial-primary.jpg" : "/editorial-secondary.jpg?v=cto1"}
                alt={isShivang ? "Shivang Mishra · CEO" : "Shashank Mishra · CTO"}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
                <span className="text-[10px] font-mono tracking-widest text-[#fa712a] uppercase font-bold block mb-0.5">
                  {isShivang ? "CEO & BUSINESS DEVELOPMENT" : "CTO & TECHNOLOGY ARCHITECTURE"}
                </span>
                <p
                  style={{ fontFamily: "var(--font-serif), 'Cinzel', Georgia, serif" }}
                  className="text-lg sm:text-xl font-bold text-white tracking-wide uppercase"
                >
                  {isShivang ? "SHIVANG MISHRA" : "SHASHANK MISHRA"}
                </p>
                <p className="text-[10px] font-mono text-white/70">
                  VALENCE Architecture Studio
                </p>
              </div>
            </div>

            {/* Quick Switcher Between Both Founders */}
            {onSwitchFounder && (
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => onSwitchFounder('shivang')}
                  className={`text-[11px] font-mono uppercase tracking-wider px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                    isShivang
                      ? 'bg-[#fa712a] text-white font-bold shadow-md'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  Shivang (CEO)
                </button>
                <button
                  type="button"
                  onClick={() => onSwitchFounder('shashank')}
                  className={`text-[11px] font-mono uppercase tracking-wider px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                    !isShivang
                      ? 'bg-[#fa712a] text-white font-bold shadow-md'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  Shashank (CTO)
                </button>
              </div>
            )}
          </div>

          {/* ======================================================== */}
          {/* RIGHT COLUMN: Smooth White Text Content                  */}
          {/* ======================================================== */}
          <div
            className="md:col-span-7 flex flex-col justify-center space-y-5 text-left"
            style={{
              transform: isRendered ? 'translateX(0)' : 'translateX(40px)',
              opacity: isRendered ? 1 : 0,
              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s'
            }}
          >
            {/* Headline */}
            <h2
              style={{ fontFamily: "var(--font-serif), 'Cinzel', Georgia, serif" }}
              className="text-2xl sm:text-3xl md:text-4xl font-light text-white tracking-tight uppercase leading-snug"
            >
              {isShivang
                ? "Building Businesses. Creating Possibilities."
                : "Engineering the Future of Business."}
            </h2>

            {/* Essay Content Body */}
            <div className="space-y-3.5 text-xs sm:text-sm text-white/90 font-light leading-relaxed font-editorial-sans max-h-[380px] overflow-y-auto pr-2 no-scrollbar">
              {isShivang ? (
                <>
                  <p>
                    I have always believed that great businesses are built on more than ideas. They are built on vision, relationships, execution, and the courage to create something meaningful.
                  </p>
                  <p>
                    My journey toward VALENCE began with a simple observation: businesses have immense potential, but often lack the right technology and strategic direction to unlock it.
                  </p>
                  <p>
                    I wanted to build a company that bridges this gap — connecting business ambition with technology that delivers real value.
                  </p>
                  <p>
                    At VALENCE, my focus is understanding businesses, identifying opportunities, building meaningful partnerships, and translating client challenges into solutions that create lasting impact.
                  </p>
                  <p>
                    As CEO, I believe our responsibility extends beyond delivering projects. It is about understanding where our clients want to go, helping them navigate their challenges, and building relationships that grow alongside their businesses.
                  </p>
                  <p>
                    My vision is to establish VALENCE as a trusted technology partner for businesses worldwide — a company recognized not merely for what it builds, but for the difference it makes.
                  </p>
                  
                  {/* Highlighted Quote Box */}
                  <div className="p-4 rounded-xl bg-white/5 border-l-2 border-[#fa712a] my-3">
                    <p className="font-medium text-white text-xs sm:text-sm leading-relaxed italic">
                      "We are not here simply to deliver technology. We are here to create opportunities, build trust, and move businesses forward."
                    </p>
                  </div>

                  <p className="text-xs font-mono text-[#fa712a] uppercase tracking-wider pt-1 font-semibold">
                    — Shivang Mishra · CEO, VALENCE
                  </p>
                </>
              ) : (
                <>
                  <p>
                    My vision has always been to make technology meaningful.
                  </p>
                  <p>
                    I see businesses struggling with complexity that software should have already solved. Disconnected systems. Repetitive operations. Limited visibility. Untapped potential.
                  </p>
                  <p>
                    At VALENCE, I lead the engineering vision behind turning these challenges into intelligent, scalable digital systems.
                  </p>
                  <p>
                    From custom software and CRM platforms to business automation and connected infrastructure, every solution begins with understanding the business and ends with engineering something that moves it forward.
                  </p>

                  {/* Highlighted Quote Box */}
                  <div className="p-4 rounded-xl bg-white/5 border-l-2 border-[#fa712a] my-3">
                    <p className="font-medium text-white text-xs sm:text-sm leading-relaxed italic">
                      "My ambition is simple. Build technology that doesn't just support businesses — but transforms how they operate, compete, and grow."
                    </p>
                  </div>

                  <p className="text-xs font-mono text-[#fa712a] uppercase tracking-wider pt-1 font-semibold">
                    — Shashank Mishra · CTO &amp; Co-Founder, VALENCE
                  </p>
                </>
              )}
            </div>

            {/* Bottom Action CTAs */}
            <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-[11px] font-mono text-white/60">
                Direct consultation with founders · Zero fluff
              </span>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenMeet();
                }}
                className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-[#fa712a] text-white hover:bg-white hover:text-[#120a05] transition-all duration-300 text-xs font-mono uppercase tracking-wider font-semibold shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Work With The Founders →</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
