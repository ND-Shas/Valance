import React from 'react';

export const PreviewVideoLoop: React.FC = () => {
  return (
    <section className="relative w-full h-full min-h-[100svh] flex-shrink-0 flex items-center justify-center bg-[#1a1109] text-white select-none overflow-hidden">
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <video
          src="/preview-loop-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1109] via-transparent to-[#1a1109] opacity-80" />
      </div>

      <div className="relative z-10 max-w-2xl px-6 text-center space-y-4">
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#fa712a]">
          Presence
        </span>
        <blockquote className="text-2xl sm:text-3xl md:text-4xl font-light italic font-serif leading-relaxed text-[#edece8]">
          “The breath is the bridge which connects life to consciousness, which unites your body to your thoughts.”
        </blockquote>
        <p className="text-xs font-mono tracking-widest text-[#edece8]/50 uppercase">
          — Thích Nhất Hạnh
        </p>
      </div>
    </section>
  );
};
