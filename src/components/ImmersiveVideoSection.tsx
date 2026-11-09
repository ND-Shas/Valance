import React, { useRef, useState } from 'react';

interface ImmersiveVideoSectionProps {
  onOpenFilm: () => void;
}

export const ImmersiveVideoSection: React.FC<ImmersiveVideoSectionProps> = ({ onOpenFilm }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section
      id="manifesto"
      className="relative w-full h-full min-h-[100svh] flex-shrink-0 flex items-center justify-center px-6 md:px-16 lg:px-24 py-16 bg-[#1a1109] text-[#edece8] select-none overflow-hidden"
    >
      {/* Background Ambient Video Loop */}
      <div className="absolute inset-0 w-full h-full pointer-events-none opacity-45 mix-blend-screen">
        <video
          ref={videoRef}
          src="/immersive-video-bg.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1109] via-transparent to-[#1a1109]" />
      </div>

      {/* Center Cinematic Card */}
      <div className="relative z-10 max-w-4xl w-full mx-auto flex flex-col items-center text-center space-y-8">
        <div className="space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] font-mono text-[#a54d25] font-semibold">
            How We Engineer
          </span>
          <h2
            style={{ fontFamily: "var(--font-serif), 'Cinzel', Georgia, serif" }}
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#edece8] tracking-tight uppercase"
          >
            ENGINEERED FOR REAL OPERATIONS.
          </h2>
          <p className="text-base sm:text-lg font-serif text-[#fa712a] font-medium pt-1">
            We don't begin with software. We begin with the business.
          </p>
          <p className="max-w-2xl mx-auto text-sm sm:text-base font-light text-[#edece8]/80 leading-relaxed font-editorial-sans pt-2">
            Every system is designed around the workflows, decisions, and operational challenges it needs to solve. From database architecture to intuitive interfaces, we connect technology with the way businesses actually work. We build systems that are structured, scalable, and designed to evolve.
          </p>
        </div>

        {/* Cinematic Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
          <button
            type="button"
            onClick={onOpenFilm}
            className="group relative flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#a54d25] text-white hover:bg-[#fa712a] transition-all duration-300 shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Explore System Architecture"
          >
            <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <svg className="w-3.5 h-3.5 fill-current text-white translate-x-0.5" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span className="text-xs font-mono font-semibold tracking-wider uppercase">
              EXPLORE ARCHITECTURE
            </span>
          </button>

          <button
            type="button"
            onClick={toggleVideo}
            className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-[#edece8]/90 text-xs font-mono tracking-widest uppercase transition-colors"
          >
            {isPlaying ? 'PAUSE BACKGROUND' : 'PLAY BACKGROUND'}
          </button>
        </div>
      </div>
    </section>
  );
};
