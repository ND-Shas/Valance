import React, { useEffect, useRef, useState } from 'react';

/**
 * Detects whether the current element or its ancestors have a light background
 * (e.g. white, cream #edece8, light gray) vs a dark/vibrant background (black, dark brown, orange).
 */
function detectIsLightBackground(target: HTMLElement | null): boolean {
  if (!target) return false;

  let el: HTMLElement | null = target;
  let depth = 0;

  while (el && el !== document.documentElement && depth < 12) {
    depth++;

    // 1. Explicit data attribute override
    const dataTheme = el.getAttribute('data-theme') || el.dataset?.theme;
    if (dataTheme === 'light') return true;
    if (dataTheme === 'dark') return false;

    // 2. High-speed class matching for VALENCE backgrounds
    const className = typeof el.className === 'string' ? el.className : '';
    if (
      className.includes('bg-[#edece8]') ||
      className.includes('bg-white') ||
      className.includes('bg-[#fafafa]') ||
      className.includes('bg-[#f5f5f0]')
    ) {
      return true;
    }
    if (
      className.includes('bg-[#0d0704]') ||
      className.includes('bg-[#1a1109]') ||
      className.includes('bg-[#110a05]') ||
      className.includes('bg-[#120a05]') ||
      className.includes('bg-[#0a0503]') ||
      className.includes('bg-[#c44919]') ||
      className.includes('bg-[#e85a12]') ||
      className.includes('bg-[#1d150c]') ||
      className.includes('bg-black')
    ) {
      return false;
    }

    // 3. Computed style background color inspection
    try {
      const bg = window.getComputedStyle(el).backgroundColor;
      if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
        const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
        if (match) {
          const alpha = match[4] !== undefined ? parseFloat(match[4]) : 1;
          // Only evaluate if background is reasonably opaque
          if (alpha > 0.3) {
            const r = parseInt(match[1], 10);
            const g = parseInt(match[2], 10);
            const b = parseInt(match[3], 10);
            // Standard ITU-R BT.601 perceived luminance
            const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
            return luminance > 155;
          }
        }
      }
    } catch {
      // Continue walking up DOM tree
    }

    el = el.parentElement;
  }

  return false;
}

/**
 * FluidLiquidCursor
 * Hardware-synchronized circular cursor with intelligent contrast adaptation:
 * - On light/white backgrounds (e.g. #edece8 cream or white cards), becomes crisp jet-black.
 * - On dark or orange backgrounds (e.g. #0d0704, #1a1109, #e85a12, #c44919), remains pure white.
 * - Zero-latency translate3d hardware position tracking.
 */
export const FluidLiquidCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const lastTargetRef = useRef<HTMLElement | null>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    // Disable on small touch screens
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch && window.innerWidth < 768) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const updatePosition = (clientX: number, clientY: number) => {
      // Direct translate3d for instant, pixel-perfect alignment with zero desync
      cursor.style.transform = `translate3d(${clientX}px, ${clientY}px, 0) translate(-50%, -50%)`;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      updatePosition(e.clientX, e.clientY);

      const target = e.target as HTMLElement | null;
      if (target && target !== lastTargetRef.current) {
        lastTargetRef.current = target;

        // 1. Detect background brightness under cursor
        const light = detectIsLightBackground(target);
        setIsLightMode(light);

        // 2. Detect hover over interactive controls
        const interactive = target.closest(
          'button, a, input, select, textarea, [role="button"], .cursor-pointer, [data-cursor="pointer"]'
        );
        setIsHovered(!!interactive);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-[99999] will-change-transform ${
        !isVisible ? 'opacity-0' : 'opacity-100'
      }`}
      style={{
        // Zero-lag transform without desync
        transition: 'opacity 0.15s ease-out',
      }}
      aria-hidden="true"
    >
      <div
        className={`rounded-full border-[1.5px] transition-all duration-200 ease-out flex items-center justify-center ${
          isLightMode
            ? isClicking
              ? 'w-6 h-6 bg-black/35 scale-90 border-[#110a05] shadow-[0_0_8px_rgba(0,0,0,0.3)]'
              : isHovered
              ? 'w-11 h-11 bg-black/[0.09] scale-105 border-[#110a05] shadow-[0_0_16px_rgba(0,0,0,0.35)]'
              : 'w-8 h-8 sm:w-9 sm:h-9 bg-black/[0.04] border-[#110a05]/90 shadow-[0_0_8px_rgba(0,0,0,0.2)]'
            : isClicking
            ? 'w-6 h-6 bg-white/35 scale-90 border-white shadow-[0_0_8px_rgba(255,255,255,0.4)]'
            : isHovered
            ? 'w-11 h-11 bg-white/[0.08] scale-105 border-white shadow-[0_0_15px_rgba(255,255,255,0.45)]'
            : 'w-8 h-8 sm:w-9 sm:h-9 bg-white/[0.03] border-white/90 shadow-[0_0_8px_rgba(255,255,255,0.25)]'
        }`}
      />
    </div>
  );
};
