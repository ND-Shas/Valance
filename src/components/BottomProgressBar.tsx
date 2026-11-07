import React, { useState, useRef, useCallback } from 'react';

interface BottomProgressBarProps {
  progress: number; // 0 to 1
  onSeek: (progress: number) => void;
}

const chapters = [
  { label: 'Hero', ratio: 0 },
  { label: 'Intro', ratio: 0.1 },
  { label: 'Film', ratio: 0.2 },
  { label: 'Connect', ratio: 0.3 },
  { label: 'Create', ratio: 0.4 },
  { label: 'Change', ratio: 0.5 },
  { label: 'Moments', ratio: 0.6 },
  { label: 'Outro', ratio: 0.7 },
  { label: 'Presence', ratio: 0.8 },
  { label: 'Spaces', ratio: 0.9 },
  { label: 'Footer', ratio: 1.0 }
];

export const BottomProgressBar: React.FC<BottomProgressBarProps> = ({ progress, onSeek }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverX, setHoverX] = useState<number | null>(null);
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);

  const calculateRatioFromEvent = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return 0;
    const rect = track.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    return Math.max(0, Math.min(1, clickX / rect.width));
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const ratio = calculateRatioFromEvent(e);
    onSeek(ratio);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    setHoverX(e.clientX);

    // Find closest chapter label
    let closest = chapters[0];
    let minDiff = 1;
    chapters.forEach((c) => {
      const diff = Math.abs(c.ratio - ratio);
      if (diff < minDiff) {
        minDiff = diff;
        closest = c;
      }
    });
    setHoverLabel(closest.label);
  };

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-40 group pointer-events-auto select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setHoverX(null);
        setHoverLabel(null);
      }}
    >
      {/* Tooltip on Hover */}
      {isHovered && hoverX !== null && hoverLabel && (
        <div
          className="absolute bottom-4 -translate-x-1/2 pointer-events-none transition-all duration-100 ease-out"
          style={{ left: `${hoverX}px` }}
        >
          <div className="px-2.5 py-1 rounded-full bg-[#1d150c] text-[#edece8] text-[10px] font-mono tracking-wider shadow-lg flex items-center gap-1.5 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a54d25]" />
            <span>{hoverLabel}</span>
          </div>
        </div>
      )}

      {/* Progress Track */}
      <div
        ref={trackRef}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        role="progressbar"
        aria-valuenow={Math.round(progress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Horizontal scroll progress"
        className="w-full h-[2px] hover:h-[5px] bg-[#1d150c]/12 hover:bg-[#1d150c]/20 transition-all duration-300 cursor-pointer relative"
      >
        {/* Active Fill Bar */}
        <div
          className="h-full bg-gradient-to-r from-[#a54d25] via-[#a54d25] to-[#fa712a] transition-all duration-150 ease-out relative"
          style={{ width: `${Math.max(0, Math.min(100, progress * 100))}%` }}
        >
          {/* Subtle Lead Glow Node */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#fa712a] opacity-0 group-hover:opacity-100 shadow-sm transition-opacity" />
        </div>

        {/* Subtle Chapter Marker Notches */}
        {chapters.map((ch, idx) => (
          <div
            key={idx}
            className="absolute top-0 bottom-0 w-[1px] bg-[#1d150c]/15 pointer-events-none opacity-0 group-hover:opacity-60 transition-opacity"
            style={{ left: `${ch.ratio * 100}%` }}
          />
        ))}
      </div>
    </div>
  );
};
