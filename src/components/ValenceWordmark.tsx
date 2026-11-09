import React from 'react';

interface ValenceWordmarkProps {
  className?: string;
  color?: string;
  theme?: 'terracotta' | 'ivory';
}

/**
 * ValenceWordmark
 * Renders VALENCE in classical high-contrast Roman inscriptional serif proportions
 * matching the authentic Blandina typographic aesthetic.
 * Supports Option A (Deep Terracotta #8c3310) and Option B (Warm Ivory #edece8).
 */
export const ValenceWordmark: React.FC<ValenceWordmarkProps> = ({
  className = "w-full max-w-[360px] sm:max-w-[580px] md:max-w-[780px] lg:max-w-[960px]",
  color = "#edece8"
}) => {
  return (
    <div className={`relative ${className} select-none flex flex-col items-center justify-center group`}>
      <svg
        viewBox="0 0 480 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto overflow-visible transition-colors duration-500 ease-out"
        style={{ color }}
      >
        {/* Main Wordmark: VALENCE */}
        <text
          x="240"
          y="50"
          textAnchor="middle"
          fill="currentColor"
          className="transition-all duration-500 ease-out group-hover:drop-shadow-[0_0_20px_rgba(237,236,232,0.35)]"
          style={{
            fontFamily: "var(--font-serif), 'Libertinus Sans', 'Cinzel', Georgia, serif",
            fontSize: '58px',
            fontWeight: 400,
            letterSpacing: '-0.04em',
            textTransform: 'uppercase',
          }}
        >
          VALENCE
        </text>

        {/* Subtitle: INFO TECH SOLUTIONS */}
        <text
          x="240"
          y="73"
          textAnchor="middle"
          fill="currentColor"
          opacity="0.82"
          style={{
            fontFamily: "var(--font-sans), 'Host Grotesk', sans-serif",
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.40em',
            textTransform: 'uppercase',
          }}
        >
          INFO TECH SOLUTIONS
        </text>
      </svg>
    </div>
  );
};

