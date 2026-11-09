import React, { useState, useEffect, useRef, useCallback } from 'react';
import { HeroSection } from './components/HeroSection';
import { IntroSection } from './components/IntroSection';
import { ImmersiveVideoSection } from './components/ImmersiveVideoSection';
import { TiltedChapterFlow } from './components/TiltedChapterFlow';
import { InspirationalGallery } from './components/InspirationalGallery';
import { OutroSection } from './components/OutroSection';
import { PreviewVideoLoop } from './components/PreviewVideoLoop';
import { EditorialPoemSection } from './components/EditorialPoemSection';
import { FooterSection } from './components/FooterSection';
import { Corners } from './components/Corners';
import { BottomProgressBar } from './components/BottomProgressBar';
import { Preloader } from './components/Preloader';
import { OrangeDrawerMenu } from './components/OrangeDrawerMenu';
import { MeetModal } from './components/MeetModal';
import { IndustriesModal } from './components/IndustriesModal';
import { FilmModal } from './components/FilmModal';
import { CreditsModal } from './components/CreditsModal';
import { CourseModal } from './components/CourseModal';
import { FounderVisionModal, FounderId } from './components/FounderVisionModal';
import { IndustryDetailModal } from './components/IndustryDetailModal';
import { industriesData, IndustryDetail } from './data/industriesData';
import { FluidLiquidCursor } from './components/FluidLiquidCursor';
import { ValueCardData } from './components/ValueCard';
import { ContactPage } from './pages/ContactPage';

const valueCardsData: ValueCardData[] = [
  {
    id: 'connect',
    number: '01',
    title: 'Intelligent Business Systems',
    tagline: 'Recruitment CRM & Candidate Management',
    philosophy:
      'We engineer custom CRM platforms that centralize candidate pipelines, client relationships, recruiter workflows, interview assignments, and operational reporting.',
    bgImage: '/value-connect.jpg',
    courseTag: 'Custom CRM Development',
    courseTitle: 'Centralized Candidate & Recruiter Desks',
    courseImage: '/gallery/01.jpg',
    courseDescription:
      'Centralize candidate pipelines, recruiter workflows, interview assignments, automated candidate follow-ups, and clean client submissions.',
    courseDuration: 'Custom Architecture'
  },
  {
    id: 'create',
    number: '02',
    title: 'Software Built Around You',
    tagline: 'Custom Software, Dashboards & Portals',
    philosophy:
      'We transform business requirements into purpose-built software, from premium websites and interactive dashboards to internal platforms. Every interface is designed for clarity.',
    bgImage: '/value-create.jpg',
    courseTag: 'Custom Software Engineering',
    courseTitle: 'Operational Dashboards & Portals',
    courseImage: '/gallery/02.jpg',
    courseDescription:
      'High-velocity client portals, real-time analytics dashboards, milestone payment tracking, and responsive web applications with zero seat bloat.',
    courseDuration: 'Scalable Engineering'
  },
  {
    id: 'change',
    number: '03',
    title: 'Automation Without Friction',
    tagline: 'Workflow Automation & Connected Operations',
    philosophy:
      'We connect applications, automate repetitive workflows, orchestrate notifications, and synchronize business processes through APIs, webhooks, and intelligent automation.',
    bgImage: '/value-change.jpg',
    courseTag: 'Business Process Automation',
    courseTitle: 'Sub-60s Workflow & API Dispatch',
    courseImage: '/gallery/03.jpg',
    courseDescription:
      'Event-driven webhooks, instant multi-channel WhatsApp/email notifications, automated SLA escalations, and cross-platform database synchronization.',
    courseDuration: 'Autonomous Systems'
  }
];

export default function App() {
  // Client-side routing state for smooth History API navigation without full-page reloads
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname;
    }
    return '/';
  });

  // Listen for browser Back/Forward popstate events
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Page index: 0 to 8 (9 total full-screen pages)
  // 0: Hero, 1: Intro, 2: Film, 3: Chapters (Cards), 4: Gallery, 5: Outro, 6: Loop, 7: Spaces, 8: Footer
  const [activePageIndex, setActivePageIndex] = useState<number>(0);
  const [activeCardStep, setActiveCardStep] = useState<number>(0); // 0 to 5 on Page 3
  const [activeGalleryStep, setActiveGalleryStep] = useState<number>(0); // 0: Tucked, 1: Spread, 2: Re-tucked

  // Refs for bulletproof synchronous tracking inside event listeners
  const activePageRef = useRef<number>(0);
  const cardStepRef = useRef<number>(0);
  const galleryStepRef = useRef<number>(0);
  const isLocked = useRef<boolean>(false);

  // Modals state
  const [isPreloaderEntered, setIsPreloaderEntered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMeetOpen, setIsMeetOpen] = useState(false);
  const [isIndustriesOpen, setIsIndustriesOpen] = useState(false);
  const [isFilmOpen, setIsFilmOpen] = useState(false);
  const [isCreditsOpen, setIsCreditsOpen] = useState(false);
  const [activeCourse, setActiveCourse] = useState<ValueCardData | null>(null);
  const [selectedFounder, setSelectedFounder] = useState<FounderId | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryDetail | null>(null);

  // Universal navigation handlers
  const navigateToContact = useCallback(() => {
    if (typeof window !== 'undefined' && window.location.pathname !== '/contact') {
      window.history.pushState(null, '', '/contact');
    }
    setCurrentPath('/contact');
    setIsMenuOpen(false);
    setIsMeetOpen(false);
    setIsIndustriesOpen(false);
    setIsFilmOpen(false);
    setIsCreditsOpen(false);
    setActiveCourse(null);
    setSelectedFounder(null);
    setSelectedIndustry(null);
  }, []);

  const navigateToHome = useCallback(() => {
    if (typeof window !== 'undefined' && window.location.pathname !== '/') {
      window.history.pushState(null, '', '/');
    }
    setCurrentPath('/');
  }, []);

  // Reset page state on reload if not on /contact
  useEffect(() => {
    if (currentPath !== '/contact') {
      activePageRef.current = 0;
      cardStepRef.current = 0;
      galleryStepRef.current = 0;
      setActivePageIndex(0);
      setActiveCardStep(0);
      setActiveGalleryStep(0);
      if (typeof window !== 'undefined') {
        if (window.location.hash) {
          window.history.replaceState(null, '', window.location.pathname);
        }
        window.scrollTo(0, 0);
      }
    }

    const preventDrift = () => {
      if (currentPath !== '/contact') {
        if (window.scrollX !== 0 || window.scrollY !== 0) {
          window.scrollTo(0, 0);
        }
      }
    };
    window.addEventListener('scroll', preventDrift, { passive: true });
    return () => window.removeEventListener('scroll', preventDrift);
  }, [currentPath]);

  // Universal page transition handler - Snappy, zero elastic dragging
  const goToPage = useCallback((targetPage: number, targetCardStep: number = 0, targetGalleryStep: number = 0) => {
    const clampedPage = Math.max(0, Math.min(8, targetPage));
    const clampedStep = Math.max(0, Math.min(5, targetCardStep));
    const clampedGalleryStep = Math.max(0, Math.min(2, targetGalleryStep));

    isLocked.current = true;
    activePageRef.current = clampedPage;
    cardStepRef.current = clampedStep;
    galleryStepRef.current = clampedGalleryStep;
    setActivePageIndex(clampedPage);
    setActiveCardStep(clampedStep);
    setActiveGalleryStep(clampedGalleryStep);

    setTimeout(() => {
      isLocked.current = false;
    }, 420);
  }, []);

  // Navigate to specific section by id
  const navigateToSection = useCallback(
    (sectionId: string) => {
      if (sectionId === 'innovate' || sectionId === 'connect') {
        goToPage(3, 0);
      } else if (sectionId === 'build' || sectionId === 'create') {
        goToPage(3, 2);
      } else if (sectionId === 'scale' || sectionId === 'change') {
        goToPage(3, 4);
      } else if (sectionId === 'chapters') {
        goToPage(3, 0);
      } else if (sectionId === 'film') {
        goToPage(2);
      } else if (sectionId === 'intro') {
        goToPage(1);
      } else if (sectionId === 'hero') {
        goToPage(0);
      } else if (sectionId === 'gallery' || sectionId === 'moments') {
        goToPage(4);
      } else if (sectionId === 'outro') {
        goToPage(5);
      } else if (sectionId === 'spaces') {
        goToPage(7);
      } else if (sectionId === 'footer' || sectionId === 'credits' || sectionId === 'breath') {
        goToPage(8);
      }
    },
    [goToPage]
  );

  // Single Unified Wheel Listener (Cursor-independent, Zero-shake, True "Z" Order)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Don't hijack scroll if on /contact page or modal is open
      if (currentPath === '/contact') return;
      if (isMenuOpen || isMeetOpen || isIndustriesOpen || isFilmOpen || isCreditsOpen || activeCourse || selectedFounder || selectedIndustry) {
        return;
      }

      if (window.innerWidth < 768) return;

      if (isLocked.current) {
        e.preventDefault();
        return;
      }

      const delta = e.deltaY;
      if (Math.abs(delta) < 25) return;

      e.preventDefault();

      const page = activePageRef.current;
      const step = cardStepRef.current;
      const galleryStep = galleryStepRef.current;

      if (delta > 0) {
        // FORWARD SCROLLING
        if (page === 3) {
          // Inside Cards Chapter (Steps 0 to 5)
          if (step < 5) {
            isLocked.current = true;
            const nextStep = step + 1;
            cardStepRef.current = nextStep;
            setActiveCardStep(nextStep);
            setTimeout(() => {
              isLocked.current = false;
            }, 380);
            return;
          } else {
            // Step 5 completed ➡️ Move to Page 4 (Gallery: Starts with photos tucked behind main image)
            isLocked.current = true;
            activePageRef.current = 4;
            galleryStepRef.current = 0;
            setActivePageIndex(4);
            setActiveGalleryStep(0);
            setTimeout(() => {
              isLocked.current = false;
            }, 420);
            return;
          }
        } else if (page === 4) {
          // Inside Inspirational Gallery: 3-Stage Card Deck Animation
          // Step 0: Tucked ➡️ Step 1: Spread ➡️ Step 2: Re-tucked/Zoom ➡️ Page 5
          if (galleryStep < 2) {
            isLocked.current = true;
            const nextGalleryStep = galleryStep + 1;
            galleryStepRef.current = nextGalleryStep;
            setActiveGalleryStep(nextGalleryStep);
            setTimeout(() => {
              isLocked.current = false;
            }, 400);
            return;
          } else {
            // Step 2 completed ➡️ Move to Page 5 (Outro)
            isLocked.current = true;
            activePageRef.current = 5;
            setActivePageIndex(5);
            setTimeout(() => {
              isLocked.current = false;
            }, 420);
            return;
          }
        } else if (page < 8) {
          // Other pages forward
          isLocked.current = true;
          const nextPage = page + 1;
          activePageRef.current = nextPage;
          setActivePageIndex(nextPage);
          if (nextPage === 3) {
            cardStepRef.current = 0;
            setActiveCardStep(0);
          }
          setTimeout(() => {
            isLocked.current = false;
          }, 420);
          return;
        }
      } else {
        // BACKWARD / REVERSE SCROLLING ("Z" Order)
        if (page === 4) {
          // Inside Inspirational Gallery
          if (galleryStep > 0) {
            isLocked.current = true;
            const prevGalleryStep = galleryStep - 1;
            galleryStepRef.current = prevGalleryStep;
            setActiveGalleryStep(prevGalleryStep);
            setTimeout(() => {
              isLocked.current = false;
            }, 400);
            return;
          } else {
            // At Step 0: Retract horizontally to Page 3 (Cards Chapter at Step 5)
            isLocked.current = true;
            activePageRef.current = 3;
            cardStepRef.current = 5;
            setActivePageIndex(3);
            setActiveCardStep(5);
            setTimeout(() => {
              isLocked.current = false;
            }, 420);
            return;
          }
        } else if (page === 5) {
          // From Page 5 (Outro) back to Page 4 (Gallery: lands on Re-tucked/Zoomed Step 2)
          isLocked.current = true;
          activePageRef.current = 4;
          galleryStepRef.current = 2;
          setActivePageIndex(4);
          setActiveGalleryStep(2);
          setTimeout(() => {
            isLocked.current = false;
          }, 420);
          return;
        } else if (page === 3) {
          // Inside Cards Chapter
          if (step > 0) {
            isLocked.current = true;
            const prevStep = step - 1;
            cardStepRef.current = prevStep;
            setActiveCardStep(prevStep);
            setTimeout(() => {
              isLocked.current = false;
            }, 380);
            return;
          } else {
            // At Step 0! Card 1 STAYS! Retract horizontally to Page 2 (Film)
            isLocked.current = true;
            activePageRef.current = 2;
            setActivePageIndex(2);
            setTimeout(() => {
              isLocked.current = false;
            }, 420);
            return;
          }
        } else if (page > 0) {
          // Other pages backward
          isLocked.current = true;
          const prevPage = page - 1;
          activePageRef.current = prevPage;
          setActivePageIndex(prevPage);
          if (prevPage === 3) {
            // Entering cards from Gallery ➡️ land on Step 5 (all cards stacked)
            cardStepRef.current = 5;
            setActiveCardStep(5);
          }
          setTimeout(() => {
            isLocked.current = false;
          }, 420);
          return;
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentPath, isMenuOpen, isMeetOpen, isIndustriesOpen, isFilmOpen, isCreditsOpen, activeCourse, selectedFounder, selectedIndustry]);

  // Touch handling for mobile swipe left / right
  const touchStartX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    if (currentPath === '/contact') return;
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (currentPath === '/contact') return;
    const deltaX = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) goToPage(activePageIndex + 1);
      else goToPage(activePageIndex - 1);
    }
  };

  const scrollProgress = activePageIndex / 8;

  // Render dedicated Contact Page if URL is /contact
  if (currentPath === '/contact') {
    return (
      <div className="relative w-screen min-h-screen bg-[#0d0704] text-[#edece8] font-editorial-sans antialiased overflow-x-hidden">
        <FluidLiquidCursor />
        <ContactPage
          onNavigateHome={navigateToHome}
          onExploreServices={() => {
            navigateToHome();
            setTimeout(() => {
              navigateToSection('chapters');
            }, 50);
          }}
        />
      </div>
    );
  }

  // Otherwise render the full horizontal experience
  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-screen h-screen overflow-hidden bg-[#edece8] text-[#1d150c] font-editorial-sans antialiased select-none"
    >
      {/* Dynamic Fluid Liquid Water Spread & Ring Cursor */}
      <FluidLiquidCursor />

      {/* 1. Introductory Preloader Curtain */}
      <Preloader onEnter={() => setIsPreloaderEntered(true)} />

      {/* 2. Permanent Corner Controls (Sound, Menu, Meet, Instagram) */}
      <Corners
        onOpenMenu={() => setIsMenuOpen((prev) => !prev)}
        onOpenMeet={navigateToContact}
        scrollProgress={scrollProgress}
        isMenuOpen={isMenuOpen}
      />

      {/* Viewport bottom progress bar */}
      <BottomProgressBar
        progress={scrollProgress}
        onSeek={(ratio) => goToPage(Math.round(ratio * 8))}
      />

      {/* 3. Master Horizontal Track Canvas: Exact 100vw GPU-Accelerated Transform */}
      <main
        id="main-content"
        style={{
          transform: `translateX(-${activePageIndex * 100}vw)`,
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        className="relative flex flex-row w-[900vw] h-full overflow-hidden"
      >
        {/* Page 0: Hero */}
        <div id="section-hero" className="w-screen h-screen flex-shrink-0 overflow-hidden">
          <HeroSection
            onNavigateSection={navigateToSection}
            onOpenMenu={() => setIsMenuOpen(true)}
          />
        </div>

        {/* Page 1: Intro */}
        <div id="section-intro" className="w-screen h-screen flex-shrink-0 overflow-hidden">
          <IntroSection onOpenMeet={navigateToContact} />
        </div>

        {/* Page 2: Immersive Video Film */}
        <div id="section-film" className="w-screen h-screen flex-shrink-0 overflow-hidden">
          <ImmersiveVideoSection onOpenFilm={() => setIsFilmOpen(true)} />
        </div>

        {/* Page 3: Tilted Card Peel Storytelling Chapters (Innovate -> Build -> Scale) */}
        <div id="section-chapters" className="relative w-screen h-screen flex-shrink-0 overflow-hidden">
          <span id="section-connect" className="sr-only" />
          <span id="section-create" className="sr-only" />
          <span id="section-change" className="sr-only" />
          <span id="connect" className="sr-only" />
          <span id="create" className="sr-only" />
          <span id="change" className="sr-only" />
          <TiltedChapterFlow
            cardStep={activeCardStep}
            onStepChange={(newStep) => {
              cardStepRef.current = newStep;
              setActiveCardStep(newStep);
            }}
            onNextPage={() => goToPage(4)}
            onOpenCourse={(course) => setActiveCourse(course)}
          />
        </div>

        {/* Page 4: Inspirational Gallery (3-Stage Deck: Tucked ➡️ Spread ➡️ Re-tucked) */}
        <div id="section-moments" className="w-screen h-screen flex-shrink-0 overflow-hidden">
          <InspirationalGallery step={activeGalleryStep} />
        </div>

        {/* Page 5: The Outro - An Invitation to Begin */}
        <div id="section-outro" className="w-screen h-screen flex-shrink-0 overflow-hidden">
          <OutroSection
            onExploreCourses={() => setActiveCourse(valueCardsData[0])}
            onOpenContact={navigateToContact}
          />
        </div>

        {/* Page 6: Loop Video Transition */}
        <div className="w-screen h-screen flex-shrink-0 overflow-hidden">
          <PreviewVideoLoop />
        </div>

        {/* Page 7: Editorial Poem & Spaces */}
        <div id="section-spaces" className="w-screen h-screen flex-shrink-0 overflow-hidden">
          <EditorialPoemSection
            onOpenMeet={navigateToContact}
            onOpenIndustries={() => setIsIndustriesOpen(true)}
            onSelectFounder={(id) => setSelectedFounder(id)}
            onSelectIndustryDetail={(ind) => setSelectedIndustry(ind)}
          />
        </div>

        {/* Page 8: The Grand Footer & Systems Matrix */}
        <div className="w-screen h-screen flex-shrink-0 overflow-hidden">
          <FooterSection
            onOpenBreathGuide={() => setIsIndustriesOpen(true)}
            onOpenIndustries={() => setIsIndustriesOpen(true)}
            onOpenCredits={() => setIsCreditsOpen(true)}
            onOpenContact={navigateToContact}
          />
        </div>
      </main>

      {/* 4. Interactive Modals & Overlays */}
      <OrangeDrawerMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={(sectionId) => {
          setIsMenuOpen(false);
          navigateToSection(sectionId);
        }}
        onOpenMeet={navigateToContact}
        onOpenContact={navigateToContact}
        onOpenIndustries={() => {
          setIsMenuOpen(false);
          setIsIndustriesOpen(true);
        }}
      />

      <MeetModal
        isOpen={isMeetOpen}
        onClose={() => setIsMeetOpen(false)}
      />

      <IndustriesModal
        isOpen={isIndustriesOpen}
        onClose={() => setIsIndustriesOpen(false)}
        onOpenMeet={navigateToContact}
      />

      <FounderVisionModal
        isOpen={selectedFounder !== null}
        founderId={selectedFounder}
        onClose={() => setSelectedFounder(null)}
        onOpenMeet={navigateToContact}
        onSwitchFounder={(id) => setSelectedFounder(id)}
      />

      <IndustryDetailModal
        isOpen={selectedIndustry !== null}
        industry={selectedIndustry}
        onClose={() => setSelectedIndustry(null)}
        onOpenMeet={navigateToContact}
        onSelectIndustry={(ind) => setSelectedIndustry(ind)}
        allIndustries={industriesData}
      />

      <FilmModal
        isOpen={isFilmOpen}
        onClose={() => setIsFilmOpen(false)}
      />

      <CreditsModal
        isOpen={isCreditsOpen}
        onClose={() => setIsCreditsOpen(false)}
      />

      <CourseModal
        course={activeCourse}
        onClose={() => setActiveCourse(null)}
        onOpenMeet={navigateToContact}
      />
    </div>
  );
}
