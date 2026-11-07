/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Preloader } from './components/Preloader';
import { Corners } from './components/Corners';
import { HeroSection } from './components/HeroSection';
import { IntroSection } from './components/IntroSection';
import { ImmersiveVideoSection } from './components/ImmersiveVideoSection';
import { ValueCard, ValueCardData } from './components/ValueCard';
import { InspirationalGallery } from './components/InspirationalGallery';
import { OutroSection } from './components/OutroSection';
import { PreviewVideoLoop } from './components/PreviewVideoLoop';
import { EditorialPoemSection } from './components/EditorialPoemSection';
import { FooterSection } from './components/FooterSection';
import { MenuModal } from './components/MenuModal';
import { MeetModal } from './components/MeetModal';
import { BreathGuideModal } from './components/BreathGuideModal';
import { FilmModal } from './components/FilmModal';
import { CreditsModal } from './components/CreditsModal';
import { CourseModal } from './components/CourseModal';
import { BottomProgressBar } from './components/BottomProgressBar';

const valueCardsData: ValueCardData[] = [
  {
    id: 'connect',
    number: '01',
    title: 'Connect with yourself',
    tagline: 'Free Guided Meditation & Relaxation',
    philosophy:
      'Come back to the body. Listen to the breath. Make space for what is alive within you. The relationship you have with yourself shapes everything that follows.',
    bgImage: '/value-connect.jpg',
    courseTag: 'Free Guided Meditation & Relaxation',
    courseTitle: 'Breathing Space',
    courseImage: '/courses/breathing-space.jpg',
    courseDescription:
      'A curated sanctuary of guided breathwork and mindfulness meditations designed to anchor your mind, soften sympathetic arousal, and return awareness to physical sensations.',
    courseDuration: '20 min daily practice'
  },
  {
    id: 'create',
    number: '02',
    title: 'Create the life you want',
    tagline: 'Move with intention',
    philosophy:
      'Create from presence, not pressure. Choose with awareness. Embody your values. Trust your own rhythm. Make space for what truly matters.',
    bgImage: '/value-create.jpg',
    courseTag: 'Move with intention',
    courseTitle: 'Mindful Flow Yoga',
    courseImage: '/courses/mindful-flow-yoga.jpg',
    courseDescription:
      'Embodied Vinyasa and Hatha yoga sequences exploring kinetic balance, spinal fluidity, and deep somatic resilience in studio spaces in Padua and online.',
    courseDuration: '6-week immersive cohort'
  },
  {
    id: 'change',
    number: '03',
    title: 'Change the world',
    tagline: 'The way you care shapes the world',
    philosophy:
      'Inner change reaches beyond you. Living with authenticity and purpose shapes how you relate and care. What you cultivate within becomes what you bring to others—to your relationships, community, and the world.',
    bgImage: '/value-change.jpg',
    courseTag: 'The way you care shapes the world',
    courseTitle: 'Mindful Parenting & Community',
    courseImage: '/courses/mindful-parenting.jpg',
    courseDescription:
      'Workshops and guided circles on compassionate communication, conscious parenting, and bringing grounded mindfulness to families, classrooms, and communities.',
    courseDuration: 'Monthly gathering circles'
  }
];

export default function App() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Modals state
  const [isPreloaderEntered, setIsPreloaderEntered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMeetOpen, setIsMeetOpen] = useState(false);
  const [isBreathOpen, setIsBreathOpen] = useState(false);
  const [isFilmOpen, setIsFilmOpen] = useState(false);
  const [isCreditsOpen, setIsCreditsOpen] = useState(false);
  const [activeCourse, setActiveCourse] = useState<ValueCardData | null>(null);

  // Scroll Progress calculation
  const updateScrollProgress = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) {
      setScrollProgress(0);
      return;
    }
    const current = el.scrollLeft;
    setScrollProgress(Math.min(1, Math.max(0, current / maxScroll)));
  }, []);

  // Map vertical mouse wheel to horizontal track scroll on desktop
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      // If modal is open, don't hijack scroll
      if (isMenuOpen || isMeetOpen || isBreathOpen || isFilmOpen || isCreditsOpen || activeCourse) {
        return;
      }

      // Check if mouse is on a nested scrollable element like the gallery strip
      const target = e.target as HTMLElement;
      if (target?.closest('.no-scrollbar') && Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        return;
      }

      if (window.innerWidth >= 768) {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          e.preventDefault();
          el.scrollLeft += e.deltaY * 1.2;
          updateScrollProgress();
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [
    isMenuOpen,
    isMeetOpen,
    isBreathOpen,
    isFilmOpen,
    isCreditsOpen,
    activeCourse,
    updateScrollProgress
  ]);

  // Handle scroll events on the track
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const handleScroll = () => {
      updateScrollProgress();
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateScrollProgress);

    return () => {
      el.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateScrollProgress);
    };
  }, [updateScrollProgress]);

  // Navigate to specific section by id
  const navigateToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    const container = scrollContainerRef.current;
    if (target && container) {
      const containerRect = container.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const offset = targetRect.left - containerRect.left + container.scrollLeft;

      container.scrollTo({
        left: offset,
        behavior: 'smooth'
      });
    }
  };

  // Seek horizontally when clicking/scrubbing bottom progress bar
  const seekToProgress = (ratio: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const maxScroll = container.scrollWidth - container.clientWidth;
    container.scrollTo({
      left: maxScroll * ratio,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#edece8] text-[#1d150c] font-editorial-sans antialiased">
      {/* 1. Introductory Preloader Curtain */}
      <Preloader onEnter={() => setIsPreloaderEntered(true)} />

      {/* 2. Permanent Corner Controls (Sound, Menu, Meet, Instagram) */}
      <Corners
        onOpenMenu={() => setIsMenuOpen((prev) => !prev)}
        onOpenMeet={() => setIsMeetOpen(true)}
        scrollProgress={scrollProgress}
        isMenuOpen={isMenuOpen}
      />

      {/* Subtle, elegant viewport bottom progress bar */}
      <BottomProgressBar
        progress={scrollProgress}
        onSeek={seekToProgress}
      />

      {/* 3. Horizontal Scroll Track Canvas */}
      <main
        ref={scrollContainerRef}
        id="main-content"
        className="relative w-full h-full flex flex-row overflow-x-auto overflow-y-hidden no-scrollbar md:snap-none select-none scroll-smooth"
      >
        {/* Section 1: Hero */}
        <div className="w-screen h-screen flex-shrink-0">
          <HeroSection onNavigateSection={navigateToSection} />
        </div>

        {/* Section 2: Intro */}
        <div className="w-screen h-screen flex-shrink-0">
          <IntroSection onOpenMeet={() => setIsMeetOpen(true)} />
        </div>

        {/* Section 3: Immersive Video Film */}
        <div className="w-screen h-screen flex-shrink-0">
          <ImmersiveVideoSection onOpenFilm={() => setIsFilmOpen(true)} />
        </div>

        {/* Section 4: Value Card 01 - Connect */}
        <div className="w-screen h-screen flex-shrink-0">
          <ValueCard
            data={valueCardsData[0]}
            onOpenCourse={(course) => setActiveCourse(course)}
          />
        </div>

        {/* Section 5: Value Card 02 - Create */}
        <div className="w-screen h-screen flex-shrink-0">
          <ValueCard
            data={valueCardsData[1]}
            onOpenCourse={(course) => setActiveCourse(course)}
          />
        </div>

        {/* Section 6: Value Card 03 - Change */}
        <div className="w-screen h-screen flex-shrink-0">
          <ValueCard
            data={valueCardsData[2]}
            onOpenCourse={(course) => setActiveCourse(course)}
          />
        </div>

        {/* Section 7: Inspirational Gallery */}
        <div className="w-screen h-screen flex-shrink-0">
          <InspirationalGallery />
        </div>

        {/* Section 8: The Outro - An Invitation to Begin */}
        <div className="w-screen h-screen flex-shrink-0">
          <OutroSection
            onExploreCourses={() => setActiveCourse(valueCardsData[0])}
          />
        </div>

        {/* Section 9: Loop Video Transition */}
        <div className="w-screen h-screen flex-shrink-0">
          <PreviewVideoLoop />
        </div>

        {/* Section 10: Editorial Poem & Spaces */}
        <div className="w-screen h-screen flex-shrink-0">
          <EditorialPoemSection onOpenMeet={() => setIsMeetOpen(true)} />
        </div>

        {/* Section 11: The Grand Footer & Breath Moment */}
        <div className="w-screen h-screen flex-shrink-0">
          <FooterSection
            onOpenBreathGuide={() => setIsBreathOpen(true)}
            onOpenCredits={() => setIsCreditsOpen(true)}
          />
        </div>
      </main>

      {/* 4. Interactive Modals & Overlays */}
      <MenuModal
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={navigateToSection}
        onOpenMeet={() => setIsMeetOpen(true)}
        onOpenBreathGuide={() => setIsBreathOpen(true)}
        onOpenFilm={() => setIsFilmOpen(true)}
      />

      <MeetModal
        isOpen={isMeetOpen}
        onClose={() => setIsMeetOpen(false)}
      />

      <BreathGuideModal
        isOpen={isBreathOpen}
        onClose={() => setIsBreathOpen(false)}
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
        onOpenMeet={() => setIsMeetOpen(true)}
      />
    </div>
  );
}
