import React from 'react';

interface MeetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MeetModal: React.FC<MeetModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Direct Architecture - VALENCE"
      className="fixed inset-0 z-50 bg-[#1a1109]/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 md:p-10 select-none animate-fadeIn overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-3xl w-full bg-[#edece8] text-[#1d150c] rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl border border-[#1d150c]/10 my-auto"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#1d150c]/5 hover:bg-[#1d150c]/15 text-[#1d150c] flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close architecture modal"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Portrait Column */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-xl border border-[#1d150c]/10">
              <img
                src="/intro.jpg"
                alt="VALENCE Founders"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-4 text-center space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#a54d25] font-semibold block">
                Founding Leadership
              </span>
              <h3 className="text-base font-serif font-bold text-[#1d150c]">
                Shivang Mishra & Shashank Mishra
              </h3>
              <p className="text-[11px] font-mono text-[#1d150c]/60">
                VALENCE Architecture Studio
              </p>
            </div>
          </div>

          {/* Bio & Details Column */}
          <div className="md:col-span-7 space-y-4">
            <div className="space-y-1.5">
              <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#a54d25] font-semibold">
                Technology That Moves Business
              </span>
              <h2 className="text-xl sm:text-2xl font-light text-[#1d150c] font-serif leading-snug">
                “Software should adapt to your business, not the other way around.”
              </h2>
            </div>

            <p className="text-xs sm:text-sm font-light text-[#1d150c]/80 leading-relaxed font-editorial-sans">
              VALENCE is a business technology studio, focused on custom software, CRM platforms, workflow automation, and connected business systems. We work at the intersection of business operations and engineering — translating complex workflows into software that is practical, intuitive, and built for real-world execution.
            </p>

            <div className="p-3 rounded-xl bg-white/70 border border-[#1d150c]/10 text-xs font-mono space-y-1 text-[#1d150c]/85">
              <p className="text-[#a54d25] font-semibold uppercase tracking-wider text-[10px]">Delivery Roadmap:</p>
              <p>01 Discover ➔ 02 Architect ➔ 03 Engineer ➔ 04 Deploy ➔ 05 Evolve</p>
            </div>

            {/* Direct Contacts & Location Strip */}
            <div className="pt-3 border-t border-[#1d150c]/10 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-[#1d150c]/70">
              <div>
                <p className="text-[#a54d25] font-semibold uppercase tracking-wider text-[10px]">Studio Architecture</p>
                <p className="mt-0.5 text-[#1d150c] font-medium">VALENCE Systems</p>
              </div>
              <div>
                <p className="text-[#a54d25] font-semibold uppercase tracking-wider text-[10px]">Discovery Contact</p>
                <span className="text-[#1d150c] font-medium mt-0.5 block">
                  Shivang Mishra (CEO)
                </span>
              </div>
              <div>
                <p className="text-[#a54d25] font-semibold uppercase tracking-wider text-[10px]">Core Verticals</p>
                <p className="mt-0.5">Recruitment & Agencies</p>
              </div>
              <div>
                <p className="text-[#a54d25] font-semibold uppercase tracking-wider text-[10px]">Technology Lead</p>
                <span className="text-[#1d150c] font-medium mt-0.5 block">
                  Shashank Mishra (CTO)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
