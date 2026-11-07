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
      aria-label="Meet Blandina Stecca"
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
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#1d150c]/5 hover:bg-[#1d150c]/15 text-[#1d150c] flex items-center justify-center transition-colors"
          aria-label="Close biography modal"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Portrait Column */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-xl border border-[#1d150c]/10">
              <img
                src="/intro.jpg"
                alt="Blandina Stecca"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-4 text-center">
              <span className="text-xs font-mono uppercase tracking-widest text-[#a54d25] font-semibold">
                Founder & Teacher
              </span>
              <h3 className="text-xl font-editorial-serif font-bold text-[#1d150c]">
                Blandina Stecca
              </h3>
            </div>
          </div>

          {/* Bio & Details Column */}
          <div className="md:col-span-7 space-y-5">
            <div className="space-y-2">
              <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#a54d25] font-semibold">
                About the Teacher
              </span>
              <h2 className="text-2xl sm:text-3xl font-light text-[#1d150c] font-editorial-sans leading-tight">
                “Everything begins within.”
              </h2>
            </div>

            <p className="text-sm sm:text-base font-light text-[#1d150c]/80 leading-relaxed">
              I am Blandina Stecca, a certified yoga and mindfulness guide based between Padua and the Dolomites. My practice bridges ancient somatic wisdom with contemporary awareness, guiding students to connect with their inner rhythm, cultivate deep presence, and consciously shape their lives.
            </p>

            <p className="text-sm sm:text-base font-light text-[#1d150c]/80 leading-relaxed">
              Whether through private retreats in the Italian Alps, weekly studio sessions in Padua, or worldwide digital circles, each gathering is an open space to listen, breathe, and begin anew.
            </p>

            {/* Direct Contacts & Location Strip */}
            <div className="pt-4 border-t border-[#1d150c]/10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-[#1d150c]/70">
              <div>
                <p className="text-[#a54d25] font-semibold uppercase tracking-wider text-[10px]">Locations</p>
                <p className="mt-0.5">Padua, Dolomites & Online</p>
              </div>
              <div>
                <p className="text-[#a54d25] font-semibold uppercase tracking-wider text-[10px]">Email</p>
                <a href="mailto:blandina.stecca@gmail.com" className="hover:text-[#a54d25] transition-colors mt-0.5 block">
                  blandina.stecca@gmail.com
                </a>
              </div>
              <div>
                <p className="text-[#a54d25] font-semibold uppercase tracking-wider text-[10px]">Telephone</p>
                <a href="tel:+393515545728" className="hover:text-[#a54d25] transition-colors mt-0.5 block">
                  +39 351 554 5728
                </a>
              </div>
              <div>
                <p className="text-[#a54d25] font-semibold uppercase tracking-wider text-[10px]">Main Website</p>
                <a
                  href="https://blandina.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#a54d25] transition-colors mt-0.5 inline-flex items-center gap-1 font-sans font-semibold text-[#1d150c]"
                >
                  <span>blandina.org</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
