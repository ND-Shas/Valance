import React from 'react';

interface ShivTechWordmarkProps {
  className?: string;
  color?: string;
}

export const ShivTechWordmark: React.FC<ShivTechWordmarkProps> = ({
  className = "w-full max-w-[360px] sm:max-w-[580px] md:max-w-[780px] lg:max-w-[960px]",
  color = "#8c3310"
}) => {
  return (
    <div className={`relative ${className} select-none flex flex-col items-center justify-center`}>
      <svg
        viewBox="0 0 540 84"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto overflow-visible"
        style={{ color }}
      >
        {/* Main Wordmark: SHIV TECH in Classical Roman Inscriptional Serif */}
        <text
          x="270"
          y="50"
          textAnchor="middle"
          fill="currentColor"
          style={{
            fontFamily: "var(--font-serif), 'Libertinus Sans', 'Cinzel', Georgia, serif",
            fontSize: '56px',
            fontWeight: 400,
            letterSpacing: '-0.04em',
            textTransform: 'uppercase',
          }}
        >
          SHIV TECH
        </text>

        {/* Subtitle: INFO TECH SOLUTIONS (Refined Minimalist Tracking) */}
        <text
          x="270"
          y="74"
          textAnchor="middle"
          fill="currentColor"
          opacity="0.85"
          style={{
            fontFamily: "var(--font-sans), 'Host Grotesk', sans-serif",
            fontSize: '11.5px',
            fontWeight: 500,
            letterSpacing: '0.42em',
            textTransform: 'uppercase',
          }}
        >
          INFO TECH SOLUTIONS
        </text>
      </svg>
    </div>
  );
};

