import React from 'react';

interface CreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreditsModal: React.FC<CreditsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Project Credits"
      className="fixed inset-0 z-50 bg-[#1a1109]/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 select-none animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-lg w-full bg-[#edece8] text-[#1d150c] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#1d150c]/10"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#1d150c]/5 hover:bg-[#1d150c]/15 text-[#1d150c] flex items-center justify-center transition-colors"
          aria-label="Close credits modal"
        >
          ✕
        </button>

        <div className="space-y-6">
          <div>
            <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#a54d25] font-semibold">
              Project Credits
            </span>
            <h3 className="text-2xl font-editorial-serif font-bold text-[#1d150c] mt-1">
              From FPTP to Blandina
            </h3>
          </div>

          <div className="space-y-4 text-sm font-light text-[#1d150c]/80 divide-y divide-[#1d150c]/10">
            <div className="pt-2 flex justify-between items-baseline">
              <span className="font-mono text-xs text-[#1d150c]/50 uppercase">Art Direction & Design</span>
              <a
                href="https://fptp.studio"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:text-[#a54d25] transition-colors"
              >
                FPTP Studio ↗
              </a>
            </div>

            <div className="pt-3 flex justify-between items-baseline">
              <span className="font-mono text-xs text-[#1d150c]/50 uppercase">Creative Development</span>
              <a
                href="https://marea-studio.it"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:text-[#a54d25] transition-colors"
              >
                Marea Studio ↗
              </a>
            </div>

            <div className="pt-3 flex justify-between items-baseline">
              <span className="font-mono text-xs text-[#1d150c]/50 uppercase">Concept & Practice</span>
              <span className="font-medium">Blandina Stecca</span>
            </div>

            <div className="pt-3 flex justify-between items-baseline">
              <span className="font-mono text-xs text-[#1d150c]/50 uppercase">Sound & Atmosphere</span>
              <span className="font-medium">FPTP Sound & Synthetics</span>
            </div>

            <div className="pt-3 flex justify-between items-baseline">
              <span className="font-mono text-xs text-[#1d150c]/50 uppercase">Industry Recognition</span>
              <span className="font-medium text-[#a54d25]">Awwwards & CSSDA Nominee</span>
            </div>
          </div>

          <div className="pt-4 border-t border-[#1d150c]/10 text-center">
            <p className="text-xs text-[#1d150c]/60">
              Created with devotion to bodily presence, mindfulness, and digital craftsmanship.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
