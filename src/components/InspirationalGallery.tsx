import React, { useState, useEffect } from 'react';

interface InspirationalGalleryProps {
  step?: number; // 0: Tucked Behind, 1: Spread / Fan-Out, 2: Folded Back / Zoomed
}

interface CapabilityItem {
  id: string;
  number: string;
  title: string;
  description: string;
  src: string;
}

const capabilities: CapabilityItem[] = [
  {
    id: '01',
    number: '01',
    title: 'Custom CRM Development',
    description: 'Business-specific CRM software built around your sales, recruitment, and client workflows.',
    src: '/gallery/01.jpg'
  },
  {
    id: '02',
    number: '02',
    title: 'Recruitment Technology',
    description: 'Candidate tracking, recruiter workspaces, interview pipelines, and recruitment reporting.',
    src: '/gallery/02.jpg'
  },
  {
    id: '03',
    number: '03',
    title: 'Business Automation',
    description: 'Automated follow-ups, notifications, task assignments, and event-driven business processes.',
    src: '/gallery/03.jpg'
  },
  {
    id: '04',
    number: '04',
    title: 'Connected Core Architecture',
    description: 'Intelligent systems, robust schemas, and low-latency database connectivity.',
    src: '/gallery/04.jpg' // Iconic Black & White Portrait
  },
  {
    id: '05',
    number: '05',
    title: 'Dashboards & Analytics',
    description: 'Interactive business dashboards, KPI tracking, monthly reporting, and operational intelligence.',
    src: '/gallery/05.jpg'
  },
  {
    id: '06',
    number: '06',
    title: 'Web Development',
    description: 'Premium business websites, responsive interfaces, and conversion-focused digital platforms.',
    src: '/gallery/06.jpg'
  },
  {
    id: '07',
    number: '07',
    title: 'API & System Integration',
    description: 'Connect business applications, databases, communication channels, and third-party webhooks.',
    src: '/gallery/07.jpg'
  }
];

export const InspirationalGallery: React.FC<InspirationalGalleryProps> = ({ step = 1 }) => {
  const [heldId, setHeldId] = useState<string | null>(null);

  // Auto-reset held state on global mouseup, touch, or step change
  useEffect(() => {
    const handleGlobalRelease = () => {
      setHeldId(null);
    };

    window.addEventListener('mouseup', handleGlobalRelease);
    window.addEventListener('touchend', handleGlobalRelease);
    window.addEventListener('scroll', handleGlobalRelease);

    return () => {
      window.removeEventListener('mouseup', handleGlobalRelease);
      window.removeEventListener('touchend', handleGlobalRelease);
      window.removeEventListener('scroll', handleGlobalRelease);
    };
  }, [step]);

  // Transform styles based on 3-Stage Card Deck animation (Step 0: Tucked, Step 1: Spread, Step 2: Re-tucked)
  const getTransform = (id: string) => {
    if (heldId === id) {
      return 'scale(2.2)';
    }

    if (step === 0) {
      // ENTRY: All photos are tucked behind the main B&W image (04)
      switch (id) {
        case '01':
          return 'translateX(450px) scale(0.65) rotate(-5deg)';
        case '02':
          return 'translateX(280px) scale(0.75) rotate(-3deg)';
        case '03':
          return 'translateX(110px) scale(0.88)';
        case '04':
          return 'translate(-50%, -50%) scale(1)';
        case '05':
          return 'translateX(-110px) scale(0.88)';
        case '06':
          return 'translateX(-280px) scale(0.75) rotate(3deg)';
        case '07':
          return 'translateX(-450px) scale(0.65) rotate(5deg)';
        default:
          return 'translateX(0px)';
      }
    } else if (step === 1) {
      // SPREAD: All 7 photos unroll/spread across the horizontal screen
      if (id === '04') {
        return 'translate(-50%, -50%) scale(1)';
      }
      return 'translateX(0px) scale(1) rotate(0deg)';
    } else {
      // EXIT: All photos fold back inward behind the main B&W image, which expands
      switch (id) {
        case '01':
          return 'translateX(450px) scale(0.65) rotate(-5deg)';
        case '02':
          return 'translateX(280px) scale(0.75) rotate(-3deg)';
        case '03':
          return 'translateX(110px) scale(0.85)';
        case '04':
          return 'translate(-50%, -50%) scale(1.42) translateY(-2%)';
        case '05':
          return 'translateX(-110px) scale(0.85)';
        case '06':
          return 'translateX(-280px) scale(0.75) rotate(3deg)';
        case '07':
          return 'translateX(-450px) scale(0.65) rotate(5deg)';
        default:
          return 'translateX(0px)';
      }
    }
  };

  const getOpacity = (id: string) => {
    if (heldId && heldId !== id) {
      return 0.2;
    }
    if (step === 1) {
      return 1;
    }
    if (id === '04') {
      return 1;
    }
    if (step === 0) {
      return id === '03' || id === '05' ? 0.25 : 0;
    }
    // step === 2
    return 0;
  };

  const activeHeldCapability = capabilities.find((c) => c.id === heldId);

  return (
    <section
      id="moments"
      className="relative w-screen h-screen flex flex-col justify-between px-6 md:px-14 lg:px-20 py-8 md:py-12 bg-[#edece8] text-[#1d150c] select-none overflow-hidden"
    >
      {/* 1. Continuous Horizontal Center Horizon Line */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-black/20 pointer-events-none z-10" />

      {/* 2. Top Header Bar (Editorial Blandina Style) */}
      <header
        style={{
          opacity: step === 2 ? 0.2 : step === 0 ? 0.6 : 1,
          transform: step === 2 ? 'translateY(-12px)' : 'translateY(0px)',
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        className="relative z-20 w-full flex items-center justify-between pointer-events-none"
      >
        <span
          style={{ fontFamily: "var(--font-serif), 'Cinzel', Georgia, serif" }}
          className="text-xs md:text-sm uppercase tracking-[0.22em] text-[#1d150c]/50 font-normal"
        >
          INNOVATE
        </span>

        <span
          style={{ fontFamily: "var(--font-serif), 'Cinzel', Georgia, serif" }}
          className="text-xs md:text-sm tracking-[0.16em] uppercase text-[#1d150c]/80 font-normal text-center"
        >
          CAPABILITIES — WHAT VALENCE CAN BUILD
        </span>

        <span
          style={{ fontFamily: "var(--font-serif), 'Cinzel', Georgia, serif" }}
          className="text-xs md:text-sm uppercase tracking-[0.22em] text-[#1d150c]/50 font-normal"
        >
          SCALE
        </span>
      </header>

      {/* 3. Master Artistic Collage: 3-Stage Card Deck Unfold & Re-fold */}
      <div className="relative z-20 w-full my-auto flex items-center justify-center">
        <div className="relative flex items-center justify-center gap-4 sm:gap-6 lg:gap-7 w-full max-w-[1780px] px-2">
          
          {/* PHOTO 1 (Left 1) */}
          <div
            onMouseDown={() => step === 1 && setHeldId('01')}
            onTouchStart={() => step === 1 && setHeldId('01')}
            style={{
              transform: getTransform('01'),
              opacity: getOpacity('01'),
              pointerEvents: step === 1 ? 'auto' : 'none',
              transition: 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.45s ease-out'
            }}
            className={`relative flex-shrink-0 w-36 sm:w-44 md:w-52 lg:w-56 aspect-[3/4] overflow-hidden cursor-pointer bg-neutral-200 shadow-md ${
              heldId === '01' ? 'z-50 shadow-2xl ring-2 ring-black/40' : 'hover:scale-[1.03]'
            }`}
          >
            <img
              src="/gallery/01.jpg"
              alt="01 Custom CRM Development"
              className="w-full h-full object-cover pointer-events-none"
              draggable={false}
            />
          </div>

          {/* PHOTO 2 (Left 2) */}
          <div
            onMouseDown={() => step === 1 && setHeldId('02')}
            onTouchStart={() => step === 1 && setHeldId('02')}
            style={{
              transform: getTransform('02'),
              opacity: getOpacity('02'),
              pointerEvents: step === 1 ? 'auto' : 'none',
              transition: 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.45s ease-out'
            }}
            className={`relative flex-shrink-0 w-36 sm:w-44 md:w-52 lg:w-56 aspect-[3/4] overflow-hidden cursor-pointer bg-neutral-200 shadow-md ${
              heldId === '02' ? 'z-50 shadow-2xl ring-2 ring-black/40' : 'hover:scale-[1.03]'
            }`}
          >
            <img
              src="/gallery/02.jpg"
              alt="02 Recruitment Technology"
              className="w-full h-full object-cover pointer-events-none"
              draggable={false}
            />
          </div>

          {/* CENTER GROUP: PHOTO 3 + PHOTO 4 (B&W FACE OVERLAY) + PHOTO 5 */}
          <div className="relative flex items-center justify-center flex-shrink-0">
            {/* PHOTO 3 (Center Left Warm Amber) */}
            <div
              onMouseDown={() => step === 1 && setHeldId('03')}
              onTouchStart={() => step === 1 && setHeldId('03')}
              style={{
                transform: getTransform('03'),
                opacity: getOpacity('03'),
                pointerEvents: step === 1 ? 'auto' : 'none',
                transition: 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.45s ease-out'
              }}
              className={`relative w-44 sm:w-56 md:w-64 lg:w-72 aspect-[3/4] overflow-hidden cursor-pointer bg-neutral-200 shadow-md ${
                heldId === '03' ? 'z-50 shadow-2xl ring-2 ring-black/40' : 'hover:scale-[1.03]'
              }`}
            >
              <img
                src="/gallery/03.jpg"
                alt="03 Business Automation"
                className="w-full h-full object-cover pointer-events-none"
                draggable={false}
              />
            </div>

            {/* PHOTO 5 (Center Right Warm Amber) */}
            <div
              onMouseDown={() => step === 1 && setHeldId('05')}
              onTouchStart={() => step === 1 && setHeldId('05')}
              style={{
                transform: getTransform('05'),
                opacity: getOpacity('05'),
                pointerEvents: step === 1 ? 'auto' : 'none',
                transition: 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.45s ease-out'
              }}
              className={`relative w-44 sm:w-56 md:w-64 lg:w-72 aspect-[3/4] overflow-hidden cursor-pointer bg-neutral-200 shadow-md ${
                heldId === '05' ? 'z-50 shadow-2xl ring-2 ring-black/40' : 'hover:scale-[1.03]'
              }`}
            >
              <img
                src="/gallery/05.jpg"
                alt="05 Dashboards & Analytics"
                className="w-full h-full object-cover pointer-events-none"
                draggable={false}
              />
            </div>

            {/* PHOTO 4 (THE ICONIC BLACK & WHITE CENTER PORTRAIT) */}
            <div
              onMouseDown={() => step === 1 && setHeldId('04')}
              onTouchStart={() => step === 1 && setHeldId('04')}
              style={{
                transform: getTransform('04'),
                opacity: getOpacity('04'),
                zIndex: heldId === '04' ? 50 : step === 2 ? 40 : 30,
                transition: 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.45s ease-out, box-shadow 0.55s ease'
              }}
              className={`absolute top-1/2 left-1/2 w-40 sm:w-52 md:w-60 lg:w-64 aspect-[3/4] overflow-hidden cursor-pointer ${
                heldId === '04'
                  ? 'shadow-2xl ring-2 ring-black/60'
                  : step === 2
                  ? 'shadow-[0_24px_70px_rgba(0,0,0,0.45)]'
                  : 'shadow-[0_12px_40px_rgba(0,0,0,0.35)] hover:scale-[1.03]'
              }`}
            >
              <img
                src="/gallery/04.jpg"
                alt="04 Connected Core Architecture"
                className="w-full h-full object-cover pointer-events-none grayscale contrast-110"
                draggable={false}
              />
            </div>
          </div>

          {/* PHOTO 6 (Right 1) */}
          <div
            onMouseDown={() => step === 1 && setHeldId('06')}
            onTouchStart={() => step === 1 && setHeldId('06')}
            style={{
              transform: getTransform('06'),
              opacity: getOpacity('06'),
              pointerEvents: step === 1 ? 'auto' : 'none',
              transition: 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.45s ease-out'
            }}
            className={`relative flex-shrink-0 w-36 sm:w-44 md:w-52 lg:w-56 aspect-[3/4] overflow-hidden cursor-pointer bg-neutral-200 shadow-md ${
              heldId === '06' ? 'z-50 shadow-2xl ring-2 ring-black/40' : 'hover:scale-[1.03]'
            }`}
          >
            <img
              src="/gallery/06.jpg"
              alt="06 Web Development"
              className="w-full h-full object-cover pointer-events-none"
              draggable={false}
            />
          </div>

          {/* PHOTO 7 (Right 2) */}
          <div
            onMouseDown={() => step === 1 && setHeldId('07')}
            onTouchStart={() => step === 1 && setHeldId('07')}
            style={{
              transform: getTransform('07'),
              opacity: getOpacity('07'),
              pointerEvents: step === 1 ? 'auto' : 'none',
              transition: 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.45s ease-out'
            }}
            className={`relative flex-shrink-0 w-36 sm:w-44 md:w-52 lg:w-56 aspect-[3/4] overflow-hidden cursor-pointer bg-neutral-200 shadow-md ${
              heldId === '07' ? 'z-50 shadow-2xl ring-2 ring-black/40' : 'hover:scale-[1.03]'
            }`}
          >
            <img
              src="/gallery/07.jpg"
              alt="07 API & System Integration"
              className="w-full h-full object-cover pointer-events-none"
              draggable={false}
            />
          </div>

        </div>
      </div>

      {/* 4. Bottom Hint Bar: Adaptive Dynamic Instruction or Active Held Capability */}
      <footer className="relative z-20 w-full flex items-center justify-center pointer-events-none">
        {activeHeldCapability ? (
          <div className="flex flex-col items-center text-center animate-fadeIn">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#a54d25] font-semibold">
              Capability {activeHeldCapability.number} · {activeHeldCapability.title}
            </span>
            <p className="text-xs text-[#1d150c]/80 font-editorial-sans max-w-md mt-0.5">
              {activeHeldCapability.description}
            </p>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-xs md:text-sm uppercase tracking-[0.24em] text-[#1d150c]/65 font-editorial-sans font-medium transition-all duration-300">
            <span className="w-2.5 h-2.5 rounded-full border border-[#1d150c]/50 inline-block animate-pulse" />
            <span>
              {step === 0
                ? '( SCROLL TO EXPAND CAPABILITIES )'
                : step === 1
                ? '( HOLD ANY IMAGE FOR DETAILS )'
                : '( SCROLL TO CONTINUE → )'}
            </span>
          </div>
        )}
      </footer>
    </section>
  );
};
