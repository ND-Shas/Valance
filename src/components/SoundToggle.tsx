import React, { useEffect, useRef, useState } from 'react';
import { soundEngine } from '../utils/audioEngine';

export const SoundToggle: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const unsub = soundEngine.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return () => {
      unsub();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set high-DPI resolution
    const dpr = window.devicePixelRatio || 1;
    canvas.width = 44 * dpr;
    canvas.height = 24 * dpr;
    ctx.scale(dpr, dpr);

    const freqData = new Uint8Array(16);
    let phase = 0;

    const render = () => {
      ctx.clearRect(0, 0, 44, 24);

      if (isPlaying) {
        soundEngine.getFrequencyData(freqData);
        phase += 0.08;

        // Draw 4 organic equalizer bars
        const numBars = 4;
        const barWidth = 2.5;
        const spacing = 4;
        const startX = (44 - (numBars * barWidth + (numBars - 1) * spacing)) / 2;

        for (let i = 0; i < numBars; i++) {
          const val = freqData[i * 2] || 0;
          // Combine frequency data with gentle sine wave for aesthetic smoothness
          const dynamicHeight = Math.max(
            4,
            Math.min(18, (val / 255) * 16 + Math.sin(phase + i * 0.9) * 4 + 7)
          );
          const x = startX + i * (barWidth + spacing);
          const y = (24 - dynamicHeight) / 2;

          ctx.fillStyle = '#1d150c';
          ctx.beginPath();
          ctx.roundRect(x, y, barWidth, dynamicHeight, 1.5);
          ctx.fill();
        }
      } else {
        // Draw 3 static minimal dots / muted state
        const numDots = 3;
        const dotSize = 2.5;
        const spacing = 5;
        const startX = (44 - (numDots * dotSize + (numDots - 1) * spacing)) / 2;

        ctx.fillStyle = 'rgba(29, 21, 12, 0.4)';
        for (let i = 0; i < numDots; i++) {
          const x = startX + i * (dotSize + spacing);
          ctx.beginPath();
          ctx.arc(x + dotSize / 2, 12, dotSize / 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying]);

  return (
    <button
      type="button"
      onClick={() => soundEngine.toggle()}
      className="group relative flex items-center justify-center w-11 h-11 rounded-full bg-white/70 backdrop-blur-md border border-[#1d150c]/10 hover:border-[#1d150c]/30 hover:bg-white shadow-sm transition-all duration-300"
      aria-pressed={isPlaying}
      aria-label={isPlaying ? "Mute ambient sound" : "Enable ambient sound"}
      title={isPlaying ? "Sound on (click to mute)" : "Sound off (click to play)"}
    >
      <canvas
        ref={canvasRef}
        className="w-11 h-6 pointer-events-none"
        aria-hidden="true"
      />
      <span className="sr-only">{isPlaying ? "Sound on" : "Sound off"}</span>
    </button>
  );
};
