import React, { useState, useEffect, useRef } from 'react';
import { soundEngine } from '../utils/audioEngine';

interface PreloaderProps {
  onEnter: () => void;
}

type RevealScene = 'void' | 'collision' | 'fusion' | 'formation' | 'wordmark' | 'hold' | 'exiting';

export const Preloader: React.FC<PreloaderProps> = ({ onEnter }) => {
  const [scene, setScene] = useState<RevealScene>('void');
  const [isMounted, setIsMounted] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setScene('hold');
      const timer = setTimeout(() => {
        handleComplete();
      }, 1800);
      return () => clearTimeout(timer);
    }

    // Precise Cinematic Timeline
    // 0ms -> Void
    // 300ms -> Collision (Dual elements rush in from left and right)
    const tCollision = setTimeout(() => {
      setScene('collision');
    }, 300);

    // 800ms -> Supernova Fusion (Impact, rotational spin, flash shockwave)
    const tFusion = setTimeout(() => {
      setScene('fusion');
      try {
        soundEngine.playSingingBowl();
      } catch {
        // audio context handling
      }
    }, 800);

    // 1500ms -> Logo Formation (Stabilization of the core symbol)
    const tFormation = setTimeout(() => {
      setScene('formation');
    }, 1500);

    // 1900ms -> Wordmark Reveal (Cinematic Left-to-Right unveil)
    const tWordmark = setTimeout(() => {
      setScene('wordmark');
    }, 1900);

    // 2500ms -> Final Hold (Crisp complete lockup centered in dark void)
    const tHold = setTimeout(() => {
      setScene('hold');
    }, 2500);

    // 3800ms -> Automatic Smooth Cinematic Workspace Dissolve
    const tExit = setTimeout(() => {
      handleComplete();
    }, 3900);

    return () => {
      clearTimeout(tCollision);
      clearTimeout(tFusion);
      clearTimeout(tFormation);
      clearTimeout(tWordmark);
      clearTimeout(tHold);
      clearTimeout(tExit);
    };
  }, []);

  const handleComplete = () => {
    setScene('exiting');
    try {
      soundEngine.start();
    } catch {
      // ignore
    }

    setTimeout(() => {
      onEnter();
      setIsMounted(false);
    }, 800);
  };

  if (!isMounted) return null;

  return (
    <div
      ref={containerRef}
      onClick={scene === 'hold' ? handleComplete : undefined}
      className={`fixed inset-0 z-[100000] overflow-hidden select-none bg-[#050201] flex items-center justify-center transition-opacity duration-800 ease-out ${
        scene === 'exiting' ? 'opacity-0 pointer-events-none scale-102' : 'opacity-100'
      } ${scene === 'hold' ? 'cursor-pointer' : 'cursor-none'}`}
      style={{
        // Hardware acceleration
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
      }}
    >
      {/* ========================================================================= */}
      {/* SCENE 01 — DARK VOID & AMBIENT RADIAL DEPTH                                */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-radial from-[#120703]/60 via-[#050201] to-[#020100]" />
        
        {/* Subtle Starlight Vignette Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(250,113,42,0.06)_0%,transparent_70%)]" />
      </div>

      {/* ========================================================================= */}
      {/* SCENE 03 — SUPERNOVA FUSION: SHOCKWAVE, RADIAL FLASH & RAYS                */}
      {/* ========================================================================= */}
      {scene !== 'void' && scene !== 'collision' && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-20">
          
          {/* Intense Orange/White Radial Energy Flash */}
          <div
            className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(250,113,42,0.85) 30%, rgba(250,113,42,0.2) 60%, transparent 75%)',
              opacity: scene === 'fusion' ? 1 : 0,
              transform: scene === 'fusion' ? 'scale(2.4)' : 'scale(3.5)',
              transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease-out',
            }}
          />

          {/* Shockwave Ring 1: High velocity orange pulse */}
          <div
            className="absolute rounded-full border border-[#fa712a]"
            style={{
              width: '260px',
              height: '260px',
              opacity: scene === 'fusion' ? 0.9 : 0,
              transform: scene === 'fusion' ? 'scale(3.8)' : 'scale(5.2)',
              boxShadow: '0 0 35px rgba(250,113,42,0.6)',
              transition: 'transform 0.8s cubic-bezier(0.1, 0.9, 0.2, 1), opacity 0.7s ease-out',
            }}
          />

          {/* Shockwave Ring 2: Crisp white outer edge */}
          <div
            className="absolute rounded-full border border-white/80"
            style={{
              width: '180px',
              height: '180px',
              opacity: scene === 'fusion' ? 0.8 : 0,
              transform: scene === 'fusion' ? 'scale(3.2)' : 'scale(4.6)',
              transition: 'transform 0.75s cubic-bezier(0.1, 0.9, 0.2, 1) 0.05s, opacity 0.65s ease-out',
            }}
          />

          {/* Supernova Rotational Starburst Streaks */}
          <div
            className="absolute w-[600px] h-[600px] pointer-events-none opacity-80"
            style={{
              opacity: scene === 'fusion' ? 0.85 : 0,
              transform: scene === 'fusion' ? 'rotate(180deg) scale(1.4)' : 'rotate(360deg) scale(2.2)',
              transition: 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease-out',
            }}
          >
            {/* 8 Radial Light Rays */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <div
                key={deg}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[2px] w-[500px] bg-gradient-to-r from-transparent via-[#fa712a] to-transparent"
                style={{ transform: `translate(-50%, -50%) rotate(${deg}deg)` }}
              />
            ))}
          </div>

          {/* Ambient Persistent Energy Core Aura */}
          <div
            className="absolute w-72 h-72 rounded-full bg-[#fa712a]/25 blur-3xl transition-opacity duration-1000"
            style={{
              opacity: scene === 'formation' || scene === 'wordmark' || scene === 'hold' ? 0.65 : 0,
            }}
          />
        </div>
      )}

      {/* ========================================================================= */}
      {/* SCENE 02 & 03 — DUAL COLLIDING ELEMENTS & ROTATIONAL SUPERNOVA VORTEX     */}
      {/* ========================================================================= */}
      {scene === 'collision' && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-30">
          
          {/* Element Left: Accelerating from LEFT edge (-75vw) to Center */}
          <div
            className="absolute flex items-center justify-center"
            style={{
              animation: 'collideLeft 0.5s cubic-bezier(0.7, 0, 0.3, 1) forwards',
              filter: 'drop-shadow(0 0 25px #fa712a) blur(2px)',
            }}
          >
            <img
              src="/assets/logo-symbol.png"
              alt=""
              className="h-16 sm:h-20 md:h-24 w-auto object-contain"
            />
            {/* Horizontal Speed Streak Trail */}
            <div className="absolute right-full top-1/2 -translate-y-1/2 w-48 h-3 bg-gradient-to-r from-transparent to-[#fa712a] opacity-80 blur-sm" />
          </div>

          {/* Element Right: Accelerating from RIGHT edge (+75vw) to Center */}
          <div
            className="absolute flex items-center justify-center"
            style={{
              animation: 'collideRight 0.5s cubic-bezier(0.7, 0, 0.3, 1) forwards',
              filter: 'drop-shadow(0 0 25px rgba(255,255,255,0.9)) blur(2px)',
            }}
          >
            <img
              src="/assets/logo-symbol.png"
              alt=""
              className="h-16 sm:h-20 md:h-24 w-auto object-contain brightness-125"
            />
            {/* Horizontal Speed Streak Trail */}
            <div className="absolute left-full top-1/2 -translate-y-1/2 w-48 h-3 bg-gradient-to-l from-transparent to-white opacity-80 blur-sm" />
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SCENE 03 (Fusion Spin) — ROTATING SUPERNOVA VORTEX                        */}
      {/* ========================================================================= */}
      {scene === 'fusion' && (
        <div className="absolute flex items-center justify-center z-30 pointer-events-none">
          <div
            className="flex items-center justify-center"
            style={{
              animation: 'supernovaSpin 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
              filter: 'drop-shadow(0 0 35px rgba(250,113,42,0.9))',
            }}
          >
            <img
              src="/assets/logo-symbol.png"
              alt=""
              className="h-20 sm:h-24 md:h-28 w-auto object-contain"
            />
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SCENE 04, 05, 06 — STABILIZED LOGO FORMATION & WORDMARK REVEAL            */}
      {/* ========================================================================= */}
      {(scene === 'formation' || scene === 'wordmark' || scene === 'hold' || scene === 'exiting') && (
        <div className="relative z-30 flex items-center justify-center max-w-[90vw] px-4">
          
          {/* Main Logo Container Lockup */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-5">
            
            {/* Symbol: Forms in center, then shifts to left lockup position during Wordmark reveal */}
            <div
              className="flex-shrink-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                transform: scene === 'formation'
                  ? 'translateX(0) scale(1)'
                  : 'translateX(0) scale(1)',
                filter: 'drop-shadow(0 4px 20px rgba(250,113,42,0.4))',
              }}
            >
              <img
                src="/assets/logo-symbol.png"
                alt="VALENCE"
                className="h-12 sm:h-16 md:h-20 lg:h-24 w-auto object-contain"
              />
            </div>

            {/* Wordmark: Emerges Left-to-Right with smooth cinematic wipe & beam */}
            <div
              className="relative overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                maxWidth: scene === 'formation' ? '0px' : '600px',
                opacity: scene === 'formation' ? 0 : 1,
                clipPath: scene === 'formation' ? 'inset(0 100% 0 0)' : 'inset(0 0% 0 0)',
                transition: 'max-width 0.7s cubic-bezier(0.16, 1, 0.3, 1), clip-path 0.7s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease-out',
              }}
            >
              <img
                src="/assets/logo-wordmark.png"
                alt="VALENCE Info Tech Solutions"
                className="h-11 sm:h-15 md:h-19 lg:h-23 w-auto object-contain flex-shrink-0"
              />

              {/* Leading edge light ray during reveal */}
              {scene === 'wordmark' && (
                <div
                  className="absolute inset-y-0 right-0 w-8 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to right, transparent, rgba(250,113,42,0.6), rgba(255,255,255,0.9))',
                    filter: 'blur(2px)',
                  }}
                />
              )}
            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* KEYFRAME ANIMATIONS INJECTED CLEANLY FOR 60 FPS GPU EXECUTION             */}
      {/* ========================================================================= */}
      <style>{`
        @keyframes collideLeft {
          0% {
            transform: translateX(-75vw) scale(1.3);
            opacity: 0;
          }
          30% {
            opacity: 1;
          }
          100% {
            transform: translateX(0) scale(1);
            opacity: 1;
          }
        }

        @keyframes collideRight {
          0% {
            transform: translateX(75vw) scale(1.3);
            opacity: 0;
          }
          30% {
            opacity: 1;
          }
          100% {
            transform: translateX(0) scale(1);
            opacity: 1;
          }
        }

        @keyframes supernovaSpin {
          0% {
            transform: scale(1.4) rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: scale(1.2) rotate(360deg);
            filter: drop-shadow(0 0 50px #ffffff);
          }
          100% {
            transform: scale(1) rotate(720deg);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};
