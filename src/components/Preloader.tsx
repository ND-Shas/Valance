import React, { useState, useEffect } from 'react';
import { soundEngine } from '../utils/audioEngine';

interface PreloaderProps {
  onEnter: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onEnter }) => {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    // Smooth progress simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsReady(true);
          return 100;
        }
        const delta = Math.floor(Math.random() * 14) + 6;
        return Math.min(100, prev + delta);
      });
    }, 90);

    return () => clearInterval(interval);
  }, []);

  const handleEnter = () => {
    if (!isReady || isExiting) return;
    setIsExiting(true);
    soundEngine.start();
    soundEngine.playSingingBowl();

    setTimeout(() => {
      onEnter();
      setIsMounted(false);
    }, 1100);
  };

  if (!isMounted) return null;

  return (
    <div
      onClick={isReady ? handleEnter : undefined}
      className={`fixed inset-0 z-50 overflow-hidden select-none transition-opacity duration-700 ${
        isReady ? 'cursor-pointer' : 'cursor-wait'
      } ${isExiting ? 'pointer-events-none' : ''}`}
    >
      {/* Top Half Curtain */}
      <div
        className={`absolute inset-x-0 top-0 h-1/2 bg-[#1a1109] transition-transform duration-1000 ease-[cubic-bezier(0.85,0,0.15,1)] ${
          isExiting ? '-translate-y-full' : 'translate-y-0'
        }`}
      />

      {/* Bottom Half Curtain */}
      <div
        className={`absolute inset-x-0 bottom-0 h-1/2 bg-[#1a1109] transition-transform duration-1000 ease-[cubic-bezier(0.85,0,0.15,1)] ${
          isExiting ? 'translate-y-full' : 'translate-y-0'
        }`}
      />

      {/* Content Layer in Center */}
      <div
        className={`relative z-10 w-full h-full flex flex-col justify-between items-center py-12 px-6 text-[#edece8] transition-opacity duration-500 ${
          isExiting ? 'opacity-0 scale-95' : 'opacity-100'
        }`}
      >
        {/* Top Wordmark */}
        <div className="pt-4 text-center">
          <span className="font-editorial-serif text-xs md:text-sm tracking-[0.35em] text-[#edece8]/60 uppercase">
            Manifesto of Blandina
          </span>
        </div>

        {/* Center Philosophy & Progress */}
        <div className="max-w-md w-full flex flex-col items-center text-center space-y-8">
          <div className="space-y-2">
            <p className="text-xl md:text-2xl font-light text-[#edece8]/90 tracking-wide font-editorial-sans">
              A space for <span className="italic text-[#a54d25] font-serif">yoga</span>
            </p>
            <p className="text-xl md:text-2xl font-light text-[#edece8]/90 tracking-wide font-editorial-sans">
              mindfulness & conscious living.
            </p>
          </div>

          {/* Progress Line */}
          <div className="w-48 h-[1px] bg-[#edece8]/20 relative overflow-hidden my-4">
            <div
              className="absolute left-0 top-0 h-full bg-[#a54d25] transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="text-xs font-mono tracking-widest text-[#edece8]/40">
            {progress}%
          </div>
        </div>

        {/* Bottom Interactive Hint */}
        <div className="pb-4">
          {isReady ? (
            <button
              type="button"
              onClick={handleEnter}
              className="text-xs md:text-sm font-mono tracking-widest text-[#edece8]/80 hover:text-[#edece8] transition-all duration-300 animate-pulse py-2 px-4 rounded-full border border-[#edece8]/20 hover:border-[#edece8]/50"
            >
              ( Click to enter )
            </button>
          ) : (
            <span className="text-xs font-mono tracking-widest text-[#edece8]/30">
              Initializing sensory canvas...
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
