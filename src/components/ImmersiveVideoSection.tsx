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
            The Blandina Film
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-[#edece8] font-editorial-sans tracking-tight">
            From the inside out
          </h2>
          <p className="max-w-xl mx-auto text-sm sm:text-base md:text-lg font-light text-[#edece8]/70 leading-relaxed pt-2">
            A visual and sensory manifesto told through body, breath, sound, and film. An exploration of what happens when we pause and return home to ourselves.
          </p>
        </div>

        {/* Cinematic Play Action */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
          <button
            type="button"
            onClick={onOpenFilm}
            className="group relative flex items-center gap-4 px-8 py-4 rounded-full bg-[#a54d25] text-white hover:bg-[#fa712a] transition-all duration-300 shadow-xl hover:scale-105 active:scale-95"
            aria-label="Watch the Blandina manifesto film"
          >
            <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <svg className="w-4 h-4 fill-current text-white translate-x-0.5" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span className="text-sm font-semibold tracking-wide font-editorial-sans">
              Watch the film
            </span>
          </button>

          <button
            type="button"
            onClick={toggleVideo}
            className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-[#edece8]/80 text-xs font-mono tracking-widest uppercase transition-colors"
          >
            {isPlaying ? 'Pause Background' : 'Play Background'}
          </button>
        </div>
      </div>
    </section>
  );
};
