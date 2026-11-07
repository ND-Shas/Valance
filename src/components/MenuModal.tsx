import React from 'react';
import { BlandinaWordmark } from './BlandinaWordmark';
import { soundEngine } from '../utils/audioEngine';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenMeet: () => void;
  onOpenBreathGuide: () => void;
  onOpenFilm: () => void;
}

export const MenuModal: React.FC<MenuModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenMeet,
  onOpenBreathGuide,
  onOpenFilm
}) => {
  if (!isOpen) return null;

  const navLinks = [
    { num: '01', label: 'The Manifesto', id: 'manifesto' },
    { num: '02', label: 'Connect With Yourself', id: 'connect' },
    { num: '03', label: 'Create The Life You Want', id: 'create' },
    { num: '04', label: 'Change The World', id: 'change' },
    { num: '05', label: 'Presence & Moments', id: 'moments' },
    { num: '06', label: 'Sanctuary & Spaces', id: 'spaces' }
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
      className="fixed inset-0 z-50 bg-[#1a1109]/95 backdrop-blur-xl text-[#edece8] flex flex-col justify-between p-6 sm:p-10 md:p-16 select-none animate-fadeIn overflow-y-auto"
    >
      {/* Top Bar inside Menu */}
      <div className="w-full flex items-center justify-between border-b border-white/10 pb-6">
        <div className="w-full max-w-[180px] sm:max-w-[220px]">
          <BlandinaWordmark color="#edece8" className="w-full" />
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono tracking-widest uppercase transition-colors"
          aria-label="Close menu"
        >
          <span>Close</span>
          <span>✕</span>
        </button>
      </div>

      {/* Main Chapter Navigation List */}
      <div className="my-auto py-10 max-w-4xl w-full mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-8 flex flex-col space-y-4">
          <span className="text-xs uppercase font-mono tracking-[0.3em] text-[#a54d25] font-semibold">
            Table of Chapters
          </span>
          <nav className="flex flex-col space-y-2">
            {navLinks.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onNavigate(item.id);
                  onClose();
                }}
                className="group flex items-baseline gap-4 text-left py-2 hover:translate-x-2 transition-all duration-300"
              >
                <span className="text-xs font-mono text-[#a54d25] font-semibold">
                  {item.num}
                </span>
                <span className="text-2xl sm:text-3xl md:text-4xl font-light font-editorial-sans text-[#edece8] group-hover:text-[#fa712a] transition-colors">
                  {item.label}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Right Side: Interactive Experiences & Direct Contacts */}
        <div className="md:col-span-4 flex flex-col space-y-8 pt-4 md:border-l md:border-white/10 md:pl-8">
          {/* Experiences */}
          <div className="space-y-3">
            <span className="text-xs uppercase font-mono tracking-[0.3em] text-[#edece8]/40">
              Experiences
            </span>
            <div className="flex flex-col space-y-2">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenFilm();
                }}
                className="flex items-center gap-2 text-sm text-[#edece8] hover:text-[#a54d25] transition-colors text-left font-medium"
              >
                <span>▶ Watch The Film</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenBreathGuide();
                }}
                className="flex items-center gap-2 text-sm text-[#edece8] hover:text-[#a54d25] transition-colors text-left font-medium"
              >
                <span>● Take A Moment (Breath)</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenMeet();
                }}
                className="flex items-center gap-2 text-sm text-[#edece8] hover:text-[#a54d25] transition-colors text-left font-medium"
              >
                <span>👋 Meet Blandina Stecca</span>
              </button>
              <button
                type="button"
                onClick={() => soundEngine.toggle()}
                className="flex items-center gap-2 text-sm text-[#edece8] hover:text-[#a54d25] transition-colors text-left font-medium"
              >
                <span>♫ Soundscape: {soundEngine.getStatus() ? 'Mute' : 'Play'}</span>
              </button>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-2 text-xs font-mono text-[#edece8]/70">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#edece8]/40 block">
              Contact & Locations
            </span>
            <p>blandina.stecca@gmail.com</p>
            <p>+39 351 554 5728</p>
            <p className="text-[#a54d25]">Padua · Dolomites · Online</p>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="w-full border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#edece8]/50 font-mono">
        <span>Connect, Create, Change: Manifesto of Blandina</span>
        <span>© 2026 Blandina</span>
      </div>
    </div>
  );
};
