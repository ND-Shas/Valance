import React, { useState, useEffect } from 'react';
import { soundEngine } from '../utils/audioEngine';

interface BreathGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type BreathPhase = 'inhale' | 'hold' | 'exhale' | 'rest';

export const BreathGuideModal: React.FC<BreathGuideModalProps> = ({ isOpen, onClose }) => {
  const [phase, setPhase] = useState<BreathPhase>('inhale');
  const [secondsLeft, setSecondsLeft] = useState(4);
  const [cycleCount, setCycleCount] = useState(1);

  useEffect(() => {
    if (!isOpen) return;

    soundEngine.playSingingBowl();

    const phaseDurations: Record<BreathPhase, number> = {
      inhale: 4,
      hold: 4,
      exhale: 6,
      rest: 2
    };

    let currentPhase: BreathPhase = 'inhale';
    let count = phaseDurations.inhale;
    setPhase(currentPhase);
    setSecondsLeft(count);

    const timer = setInterval(() => {
      count -= 1;
      if (count <= 0) {
        if (currentPhase === 'inhale') {
          currentPhase = 'hold';
        } else if (currentPhase === 'hold') {
          currentPhase = 'exhale';
        } else if (currentPhase === 'exhale') {
          currentPhase = 'rest';
        } else {
          currentPhase = 'inhale';
          setCycleCount((c) => c + 1);
          soundEngine.playSingingBowl();
        }
        count = phaseDurations[currentPhase];
        setPhase(currentPhase);
      }
      setSecondsLeft(count);
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const getPhaseInstruction = () => {
    switch (phase) {
      case 'inhale':
        return 'Inhale deeply into the abdomen...';
      case 'hold':
        return 'Hold gently in stillness...';
      case 'exhale':
        return 'Release slowly through the breath...';
      case 'rest':
        return 'Pause in pure awareness...';
    }
  };

  const getScaleClass = () => {
    switch (phase) {
      case 'inhale':
        return 'scale-125 bg-[#a54d25]/30 border-[#a54d25]';
      case 'hold':
        return 'scale-125 bg-[#a54d25]/40 border-[#fa712a]';
      case 'exhale':
        return 'scale-90 bg-[#1d150c]/10 border-[#1d150c]/30';
      case 'rest':
        return 'scale-75 bg-[#1d150c]/5 border-[#1d150c]/20';
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Guided Breathing Exercise"
      className="fixed inset-0 z-50 bg-[#1a1109]/95 backdrop-blur-2xl flex items-center justify-center p-6 select-none animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-xl w-full flex flex-col items-center text-center text-[#edece8] py-8"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-0 right-0 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors text-sm"
          aria-label="Close breathing exercise"
        >
          ✕
        </button>

        <span className="text-xs uppercase font-mono tracking-[0.3em] text-[#a54d25] font-semibold mb-3">
          Focus & Clarity Moment
        </span>

        <h3 className="text-2xl sm:text-3xl font-light font-editorial-sans tracking-wide">
          Cognitive Reset
        </h3>

        {/* Dynamic Expanding/Contracting Breathing Ring */}
        <div className="relative my-14 w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
          {/* Outer glow ring */}
          <div
            className={`absolute inset-0 rounded-full border-2 transition-all duration-[3000ms] ease-in-out ${getScaleClass()}`}
          />

          {/* Secondary pulsating ring */}
          <div
            className={`absolute inset-6 rounded-full border border-dashed transition-all duration-[2000ms] ease-out ${
              phase === 'inhale' ? 'border-[#fa712a]/60 scale-110' : 'border-[#edece8]/20 scale-95'
            }`}
          />

          {/* Center Seconds & Phase Indicator */}
          <div className="relative z-10 flex flex-col items-center">
            <span className="text-5xl sm:text-6xl font-light font-mono text-[#edece8]">
              {secondsLeft}
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-[#a54d25] font-semibold mt-2">
              {phase.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Live Instruction Text */}
        <p className="text-base sm:text-lg font-light text-[#edece8]/90 italic font-editorial-sans h-8 transition-opacity duration-300">
          {getPhaseInstruction()}
        </p>

        <div className="mt-8 flex items-center gap-6 text-xs font-mono text-[#edece8]/50">
          <span>Cycle: {cycleCount}</span>
          <span>·</span>
          <span>4 - 4 - 6 Rhythm</span>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-8 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono tracking-widest uppercase transition-colors"
        >
          Complete Session
        </button>
      </div>
    </div>
  );
};
