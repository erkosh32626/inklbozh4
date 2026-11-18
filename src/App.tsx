import { useEffect, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  MonitorPlay,
} from 'lucide-react';
import { PRESENTATION_SLIDES } from './data/specialEduData';
import { getSteppedSlideIndex } from './utils/portalLogic';
import { HeaderAndAccessibilityBar } from './components/HeaderAndAccessibilityBar';
import {
  HeroSection,
  PortalStructureSection,
} from './components/HeroAndStructureSection';
import { ProgramCatalogSection } from './components/ProgramCatalogSection';
import { EcosystemSection } from './components/EcosystemSection';
import { AdaptedVideoSection } from './components/AdaptedVideoSection';
import { ConclusionAndFooter } from './components/ConclusionAndFooter';

export default function App() {
  const [largeFont, setLargeFont] = useState<boolean>(false);
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [presentationMode, setPresentationMode] = useState<boolean>(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);

  // Sync accessibility classes with <html> root element so font scaling and high contrast work globally
  useEffect(() => {
    const root = document.documentElement;
    if (largeFont) {
      root.classList.add('a11y-large-font');
    } else {
      root.classList.remove('a11y-large-font');
    }
  }, [largeFont]);

  useEffect(() => {
    const root = document.documentElement;
    if (highContrast) {
      root.classList.add('a11y-high-contrast');
    } else {
      root.classList.remove('a11y-high-contrast');
    }
  }, [highContrast]);

  // Keyboard ArrowLeft / ArrowRight navigation in Presentation Mode ("Слайд режимі")
  useEffect(() => {
    if (!presentationMode) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        setCurrentSlideIndex((prev) =>
          getSteppedSlideIndex(prev, 'next', PRESENTATION_SLIDES.length)
        );
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setCurrentSlideIndex((prev) =>
          getSteppedSlideIndex(prev, 'prev', PRESENTATION_SLIDES.length)
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [presentationMode]);

  const handleStepSlide = (direction: 'prev' | 'next') => {
    setCurrentSlideIndex((prev) =>
      getSteppedSlideIndex(prev, direction, PRESENTATION_SLIDES.length)
    );
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSlide = (index: number) => {
    setCurrentSlideIndex(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleJumpToSection = (sectionId: string, slideIdx: number) => {
    if (presentationMode) {
      handleSelectSlide(slideIdx);
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const activeSlide =
    PRESENTATION_SLIDES[currentSlideIndex] || PRESENTATION_SLIDES[0];

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors ${
        highContrast
          ? 'bg-black text-white'
          : 'bg-[#F8FAFC] text-slate-900'
      }`}
    >
      <HeaderAndAccessibilityBar
        largeFont={largeFont}
        onToggleLargeFont={() => setLargeFont((prev) => !prev)}
        highContrast={highContrast}
        onToggleHighContrast={() => setHighContrast((prev) => !prev)}
        presentationMode={presentationMode}
        onSetPresentationMode={(enabled) => {
          setPresentationMode(enabled);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentSlideIndex={currentSlideIndex}
        onSelectSlideIndex={handleSelectSlide}
        onStepSlide={handleStepSlide}
      />

      <main className="flex-1">
        {presentationMode ? (
          /* INTERACTIVE PRESENTATION MODE ("Слайд режимі") */
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
            {/* Slide Deck Header Card */}
            <div
              className={`rounded-2xl border p-4 sm:p-5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                highContrast
                  ? 'bg-neutral-950 border-yellow-400 text-white'
                  : 'bg-white border-slate-200/90 text-slate-900 shadow-2xs'
              }`}
            >
              <div>
                <div
                  className={`flex items-center gap-2 text-xs font-mono font-semibold mb-1 ${
                    highContrast ? 'text-yellow-300' : 'text-teal-800'
                  }`}
                >
                  <MonitorPlay className="w-4 h-4" />
                  <span>
                    ПРЕЗЕНТАЦИЯ РЕЖИМІ · СЛАЙД {activeSlide.slideNumber} /{' '}
                    {PRESENTATION_SLIDES.length}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>Пернетақта: ← / → бағыттауыштары</span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold">
                  {activeSlide.fullTitle}
                </h2>
                <p
                  className={`text-xs sm:text-sm mt-0.5 ${
                    highContrast ? 'text-neutral-300' : 'text-slate-600'
                  }`}
                >
                  {activeSlide.summary}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleStepSlide('prev')}
                  disabled={currentSlideIndex === 0}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl border transition-colors whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                    highContrast
                      ? 'bg-neutral-900 border-yellow-400 text-yellow-300 hover:bg-neutral-800'
                      : 'bg-slate-50 border-slate-300 text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Алдыңғы слайд</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleStepSlide('next')}
                  disabled={currentSlideIndex === PRESENTATION_SLIDES.length - 1}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl border transition-colors whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                    highContrast
                      ? 'bg-yellow-400 border-yellow-400 text-black hover:bg-yellow-300'
                      : 'bg-teal-800 border-teal-800 text-white hover:bg-teal-700'
                  }`}
                >
                  <span>Келесі слайд</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Active Slide Body */}
            <div className="rounded-2xl overflow-hidden border border-slate-200/80 dark:border-neutral-800">
              {currentSlideIndex === 0 && (
                <HeroSection
                  highContrast={highContrast}
                  onJumpToVideo={() => handleSelectSlide(4)}
                  onJumpToPrograms={() => handleSelectSlide(2)}
                />
              )}
              {currentSlideIndex === 1 && (
                <PortalStructureSection highContrast={highContrast} />
              )}
              {currentSlideIndex === 2 && (
                <ProgramCatalogSection highContrast={highContrast} />
              )}
              {currentSlideIndex === 3 && (
                <EcosystemSection highContrast={highContrast} />
              )}
              {currentSlideIndex === 4 && (
                <AdaptedVideoSection highContrast={highContrast} />
              )}
              {currentSlideIndex === 5 && (
                <ConclusionAndFooter highContrast={highContrast} />
              )}
            </div>

            {/* Bottom Slide Deck Footer Controls */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setPresentationMode(false)}
                className={`text-xs sm:text-sm font-semibold underline cursor-pointer ${
                  highContrast ? 'text-yellow-300' : 'text-teal-800'
                }`}
              >
                Барлық бөлімдерді бір бетте ашу («Толық бет» режиміне оралу)
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleStepSlide('prev')}
                  disabled={currentSlideIndex === 0}
                  className={`inline-flex items-center gap-1 px-3.5 py-2 text-xs font-semibold rounded-xl border transition-colors cursor-pointer disabled:opacity-40 ${
                    highContrast
                      ? 'bg-neutral-900 border-yellow-400 text-yellow-300'
                      : 'bg-white border-slate-300 text-slate-800'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Алдыңғы</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleStepSlide('next')}
                  disabled={currentSlideIndex === PRESENTATION_SLIDES.length - 1}
                  className={`inline-flex items-center gap-1 px-3.5 py-2 text-xs font-semibold rounded-xl border transition-colors cursor-pointer disabled:opacity-40 ${
                    highContrast
                      ? 'bg-yellow-400 border-yellow-400 text-black'
                      : 'bg-teal-800 border-teal-800 text-white'
                  }`}
                >
                  <span>Келесі</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* FULL-PAGE REFERENCE PORTAL MODE ("Толық бет") */
          <>
            <HeroSection
              highContrast={highContrast}
              onJumpToVideo={() => handleJumpToSection('adapted-video', 4)}
              onJumpToPrograms={() =>
                handleJumpToSection('programs-catalog', 2)
              }
            />
            <PortalStructureSection highContrast={highContrast} />
            <ProgramCatalogSection highContrast={highContrast} />
            <EcosystemSection highContrast={highContrast} />
            <AdaptedVideoSection highContrast={highContrast} />
            <ConclusionAndFooter highContrast={highContrast} />
          </>
        )}
      </main>
    </div>
  );
}
