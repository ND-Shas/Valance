import React, { useRef, useEffect } from 'react';

interface ElasticBaselineProps {
  className?: string;
}

export const ElasticBaseline: React.FC<ElasticBaselineProps> = ({ className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  
  // Physics state
  const mouse = useRef({ x: -1000, y: 0, active: false });
  const current = useRef({ y: 0, vy: 0 });
  const animFrame = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const relX = e.clientX;
      const relY = e.clientY - (rect.top + rect.height / 2);

      // Only engage if cursor is within 100px vertical distance
      if (Math.abs(relY) < 100) {
        mouse.current.active = true;
        mouse.current.x = relX;
        // Dampen the displacement so it bends gracefully (max 35px)
        const sign = Math.sign(relY);
        const pull = Math.min(Math.abs(relY), 70);
        mouse.current.y = sign * (pull * 0.45);
      } else {
        mouse.current.active = false;
      }
    };

    const handleMouseLeave = () => {
      mouse.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    // Spring physics render loop
    const render = () => {
      const targetY = mouse.current.active ? mouse.current.y : 0;
      
      // Spring formula: F = -k * (x - target) - damping * v
      const k = 0.12;       // spring stiffness
      const damping = 0.82; // oscillation damping
      
      const force = -k * (current.current.y - targetY);
      current.current.vy = (current.current.vy + force) * damping;
      current.current.y += current.current.vy;

      if (pathRef.current) {
        const w = window.innerWidth;
        const cy = current.current.y;
        const cx = Math.max(0, Math.min(w, mouse.current.x));

        if (Math.abs(cy) > 0.05 || Math.abs(current.current.vy) > 0.05) {
          // Quadratic bezier curve bending towards (cx, cy)
          pathRef.current.setAttribute(
            'd',
            `M 0 50 Q ${cx} ${50 + cy} ${w} 50`
          );
        } else {
          pathRef.current.setAttribute('d', `M 0 50 L ${w} 50`);
        }
      }

      animFrame.current = requestAnimationFrame(render);
    };

    animFrame.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animFrame.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-x-0 top-1/2 -translate-y-1/2 h-[100px] pointer-events-none select-none overflow-visible z-0 ${className}`}
    >
      <svg
        className="w-full h-full overflow-visible"
        preserveAspectRatio="none"
        viewBox={`0 0 ${typeof window !== 'undefined' ? window.innerWidth : 1920} 100`}
      >
        <path
          ref={pathRef}
          d="M 0 50 L 1920 50"
          fill="none"
          stroke="rgba(255, 255, 255, 0.72)"
          strokeWidth="1.2"
          className="transition-[stroke] duration-300 drop-shadow-[0_0_6px_rgba(255,255,255,0.45)]"
        />
      </svg>
    </div>
  );
};

