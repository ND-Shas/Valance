import React from 'react';
import { BlandinaWordmark } from './BlandinaWordmark';

interface FooterSectionProps {
  onOpenBreathGuide: () => void;
  onOpenCredits: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  onOpenBreathGuide,
  onOpenCredits
}) => {
  return (
    <footer className="relative w-full h-full min-h-[100svh] flex-shrink-0 flex flex-col justify-between px-6 md:px-16 lg:px-24 py-16 bg-[#1a1109] text-[#edece8] select-none border-l border-white/10 overflow-hidden">
      {/* Top Logo and Tagline */}
      <div className="w-full pt-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/10 pb-8">
        <div className="w-full max-w-[220px]">
          <BlandinaWordmark color="#edece8" className="w-full" />
        </div>
        <p className="text-xs font-mono tracking-widest text-[#edece8]/50 uppercase">
          Manifesto of Blandina · Padua · Dolomites · Worldwide
        </p>
      </div>

      {/* Centerpiece: Grand Statement & Interactive Breath Moment */}
      <div className="my-auto py-12 flex flex-col items-center text-center space-y-10">
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-[#edece8] font-editorial-sans tracking-tight leading-[1.1] max-w-4xl">
          Connect with yourself,<br />
          Create the life you want,<br />
          Change the world.
        </h2>

        {/* Interactive Breath Moment Orb Button */}
        <button
          type="button"
          onClick={onOpenBreathGuide}
          className="group relative flex items-center gap-4 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-[#a54d25] transition-all duration-300 shadow-lg hover:scale-105 active:scale-95"
          aria-haspopup="dialog"
          aria-label="Take a moment for yourself - Interactive breathing guide"
        >
          {/* Pulsating Orb with Plus Icon */}
          <span className="relative w-7 h-7 rounded-full bg-[#a54d25] flex items-center justify-center text-white transition-transform duration-500 group-hover:rotate-90">
            <span className="absolute inset-0 rounded-full bg-[#a54d25] animate-ping opacity-40" />
            <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor">
              <path d="M8 2v12M2 8h12" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
          <span className="text-sm font-editorial-sans font-medium text-[#edece8] tracking-wide">
            Take a moment for yourself.
          </span>
        </button>
      </div>

      {/* Lower Bar: Socials, Legal, and Studio Credits */}
      <div className="w-full border-t border-white/10 pt-8 flex flex-col lg:flex-row items-center justify-between gap-6 text-xs text-[#edece8]/70">
        {/* Social Icons */}
        <div className="flex items-center gap-5">
          <span className="font-mono text-[11px] text-[#edece8]/40 uppercase tracking-widest">
            Social
          </span>
          {/* Instagram */}
          <a
            href="https://www.instagram.com/blandinaspace/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
            aria-label="Instagram"
          >
            <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="1.6" viewBox="0 0 24 24">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
            </svg>
          </a>
          {/* Facebook */}
          <a
            href="https://www.facebook.com/blandina.stecca"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
            aria-label="Facebook"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.09 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.09 24 18.1 24 12.07z" />
            </svg>
          </a>
          {/* YouTube */}
          <a
            href="https://www.youtube.com/@blandinaspace"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
            aria-label="YouTube"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.08 0 12 0 12s0 3.92.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.92 24 12 24 12s0-3.92-.5-5.81zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z" />
            </svg>
          </a>
          {/* Spotify */}
          <a
            href="https://open.spotify.com/user/blandina.stecca"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
            aria-label="Spotify"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.5 17.32a.75.75 0 0 1-1.03.25c-2.82-1.72-6.36-2.11-10.54-1.16a.75.75 0 1 1-.33-1.46c4.57-1.05 8.49-.6 11.65 1.34.35.22.47.68.25 1.03zm1.47-3.27a.94.94 0 0 1-1.29.31c-3.23-1.99-8.15-2.56-11.97-1.4a.94.94 0 1 1-.54-1.8c4.36-1.32 9.78-.68 13.49 1.6.44.27.58.85.31 1.29zm.13-3.4C15.73 8.28 8.7 8.05 4.85 9.22a1.12 1.12 0 1 1-.65-2.15c4.42-1.34 12.18-1.08 16.99 1.77a1.13 1.13 0 0 1-1.15 1.94z" />
            </svg>
          </a>
        </div>

        {/* Center Links */}
        <div className="flex items-center gap-6">
          <a
            href="https://blandina.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <span>blandina.org</span>
            <span className="text-[10px]">↗</span>
          </a>
          <span>·</span>
          <span className="text-[#edece8]/50">Blandina © 2026</span>
        </div>

        {/* FPTP Design Credits Button */}
        <div>
          <button
            type="button"
            onClick={onOpenCredits}
            className="group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-[11px] font-mono text-[#edece8]/70 hover:text-white"
          >
            <span>From</span>
            {/* FPTP Studio Logo Vector */}
            <svg
              className="w-12 h-3.5 fill-current text-[#edece8] group-hover:text-[#a54d25] transition-colors"
              viewBox="0 0 129 40"
            >
              <path d="M0 39.7227L6.96975 0H33.7278L31.6807 11.6975H16.6202L15.6454 17.2538H29.5361L27.6353 27.9278H13.7445L11.6975 39.7227H0ZM51.6122 0C61.36 0 65.5029 3.80168 65.5029 10.6252C65.5029 11.8437 65.3566 13.0134 64.723 16.7664C63.212 25.3445 58.3869 28.61 46.8356 28.61H42.2054L40.2557 39.7227H28.5583L35.528 0H51.6122ZM43.7162 19.9832H48.1517C51.3196 19.9832 52.4894 19.4958 53.2204 15.4991C53.4642 14.037 53.513 13.4034 53.513 12.8672C53.513 10.6252 52.2944 9.94285 49.9062 9.94285H45.5197L43.7162 19.9832ZM94.9703 11.6975H86.5384L81.6157 39.7227H69.9183L74.841 11.6975H66.4578L68.5049 0H97.0174L94.9703 11.6975ZM115.059 0C124.807 0 128.95 3.80168 128.95 10.6252C128.95 11.8437 128.804 13.0134 128.17 16.7664C126.659 25.3445 121.834 28.61 110.283 28.61H105.652L103.703 39.7227H92.0052L98.975 0H115.059ZM107.163 19.9832H111.599C114.767 19.9832 115.936 19.4958 116.668 15.4991C116.911 14.037 116.96 13.4034 116.96 12.8672C116.96 10.6252 115.741 9.94285 113.353 9.94285H108.967L107.163 19.9832Z" />
            </svg>
            <span>to Blandina</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
