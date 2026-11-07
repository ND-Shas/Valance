import React, { useRef, useState, useEffect } from 'react';
import { soundEngine } from '../utils/audioEngine';

interface FilmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FilmModal: React.FC<FilmModalProps> = ({ isOpen, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (isOpen) {
      soundEngine.start();
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
        setIsPlaying(true);
      }
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Manifesto Film"
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-8 text-[#edece8] select-none animate-fadeIn"
    >
      {/* Top Controls */}
      <div className="w-full flex items-center justify-between z-10">
        <div>
          <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#a54d25] font-semibold">
            Blandina Short Film
          </span>
          <h4 className="text-lg font-editorial-serif font-semibold">
            From The Inside Out
          </h4>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors text-sm"
          aria-label="Close film"
        >
          ✕
        </button>
      </div>

      {/* Main Video Viewport */}
      <div className="relative my-auto w-full max-w-5xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black flex items-center justify-center group">
        <video
          ref={videoRef}
          src="/immersive-video-bg.mp4"
          playsInline
          className="w-full h-full object-cover"
          onTimeUpdate={() => {
            if (videoRef.current) {
              setCurrentTime(videoRef.current.currentTime);
            }
          }}
          onLoadedMetadata={() => {
            if (videoRef.current) {
              setDuration(videoRef.current.duration);
            }
          }}
          onClick={togglePlay}
        />

        {/* Big Center Play/Pause Overlay Button */}
        <button
          type="button"
          onClick={togglePlay}
          className={`absolute inset-0 m-auto w-16 h-16 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-opacity duration-300 ${
            isPlaying ? 'opacity-0 group-hover:opacity-80' : 'opacity-100'
          }`}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg className="w-6 h-6 fill-current translate-x-0.5" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        {/* Poetic Subtitles */}
        <div className="absolute bottom-6 inset-x-8 text-center pointer-events-none">
          <p className="text-sm sm:text-base md:text-lg font-light italic font-serif text-white/90 drop-shadow-md bg-black/40 px-4 py-2 rounded-xl backdrop-blur-sm inline-block">
            “The relationship you have with yourself shapes everything that follows.”
          </p>
        </div>
      </div>

      {/* Bottom Timeline Controls */}
      <div className="w-full max-w-5xl mx-auto z-10 flex items-center gap-4 text-xs font-mono text-[#edece8]/70 pt-4">
        <button
          type="button"
          onClick={togglePlay}
          className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>

        <span>{formatTime(currentTime)}</span>

        <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden relative cursor-pointer">
          <div
            className="h-full bg-[#a54d25] rounded-full transition-all duration-150"
            style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
          />
        </div>

        <span>{formatTime(duration || 45)}</span>
      </div>
    </div>
  );
};
