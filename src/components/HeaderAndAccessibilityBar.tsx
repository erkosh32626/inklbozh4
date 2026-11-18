import {
  Accessibility,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Eye,
  MonitorPlay,
} from 'lucide-react';
import { PRESENTATION_SLIDES } from '../data/specialEduData';

export interface HeaderAndAccessibilityBarProps {
  largeFont: boolean;
  onToggleLargeFont: () => void;
  highContrast: boolean;
  onToggleHighContrast: () => void;
  presentationMode: boolean;
  onSetPresentationMode: (enabled: boolean) => void;
  currentSlideIndex: number;
  onSelectSlideIndex: (index: number) => void;
  onStepSlide: (direction: 'prev' | 'next') => void;
}

export function HeaderAndAccessibilityBar({
  largeFont,
  onToggleLargeFont,
  highContrast,
  onToggleHighContrast,
  presentationMode,
  onSetPresentationMode,
  currentSlideIndex,
  onSelectSlideIndex,
  onStepSlide,
}: HeaderAndAccessibilityBarProps) {
  const handleNavClick = (sectionId: string, slideIdx: number) => {
    if (presentationMode) {
      onSelectSlideIndex(slideIdx);
      return;
    }
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="sticky top-0 z-40">
      {/* Zone 1, 2, 3 Top Bar Contract */}
      <header
        className={`flex items-center justify-between gap-8 px-4 sm:px-8 py-3.5 border-b transition-colors ${
          highContrast
            ? 'bg-black border-yellow-400 text-white'
            : 'bg-white/95 backdrop-blur-md border-slate-200 text-slate-900'
        }`}
      >
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#about-center"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('about-center', 0);
          }}
          className={`text-base sm:text-lg font-bold tracking-tight whitespace-nowrap shrink-0 ${
            highContrast ? 'text-yellow-300' : 'text-teal-900'
          }`}
        >
          special-edu.kz — Анықтама
        </a>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav
          aria-label="Негізгі навигация"
          className="hidden lg:flex items-center gap-6 text-sm font-medium"
        >
          <a
            href="#about-center"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('about-center', 0);
            }}
            className={`whitespace-nowrap shrink-0 transition-colors underline-offset-4 hover:underline ${
              highContrast
                ? 'text-white hover:text-yellow-300'
                : 'text-slate-600 hover:text-teal-800'
            }`}
          >
            Орталық туралы
          </a>
          <a
            href="#programs-catalog"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('programs-catalog', 2);
            }}
            className={`whitespace-nowrap shrink-0 transition-colors underline-offset-4 hover:underline ${
              highContrast
                ? 'text-white hover:text-yellow-300'
                : 'text-slate-600 hover:text-teal-800'
            }`}
          >
            Бағдарламалар
          </a>
          <a
            href="#infrastructure-ecosystem"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('infrastructure-ecosystem', 3);
            }}
            className={`whitespace-nowrap shrink-0 transition-colors underline-offset-4 hover:underline ${
              highContrast
                ? 'text-white hover:text-yellow-300'
                : 'text-slate-600 hover:text-teal-800'
            }`}
          >
            Инфрақұрылым
          </a>
          <a
            href="#adapted-video"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('adapted-video', 4);
            }}
            className={`whitespace-nowrap shrink-0 transition-colors underline-offset-4 hover:underline ${
              highContrast
                ? 'text-white hover:text-yellow-300'
                : 'text-slate-600 hover:text-teal-800'
            }`}
          >
            Бейімделген бейнеролик
          </a>
          <a
            href="#conclusion-section"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('conclusion-section', 5);
            }}
            className={`whitespace-nowrap shrink-0 transition-colors underline-offset-4 hover:underline ${
              highContrast
                ? 'text-white hover:text-yellow-300'
                : 'text-slate-600 hover:text-teal-800'
            }`}
          >
            Қорытынды
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center shrink-0">
          <a
            href="https://special-edu.kz/"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              highContrast
                ? 'bg-yellow-400 text-black hover:bg-yellow-300'
                : 'bg-teal-800 text-white hover:bg-teal-700'
            }`}
          >
            <span>special-edu.kz порталы</span>
            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
          </a>
        </div>
      </header>

      {/* Accessibility & Presentation Control Bar (Қолжетімділік панелі) */}
      <div
        role="region"
        aria-label="Қолжетімділік және презентация панелі"
        className={`border-b px-4 sm:px-8 py-2 transition-colors ${
          highContrast
            ? 'bg-neutral-950 border-yellow-400/70 text-yellow-200'
            : 'bg-slate-100/95 backdrop-blur-sm border-slate-200/90 text-slate-700'
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Assignment Metadata Line (Unboxed text with typographic separators) */}
          <div className="flex items-center gap-2 text-xs font-medium whitespace-nowrap shrink-0">
            <Accessibility
              className={`w-4 h-4 shrink-0 ${
                highContrast ? 'text-yellow-300' : 'text-teal-700'
              }`}
            />
            <span className="font-semibold">БӨЖ 4 | Веб-презентация</span>
            <span aria-hidden="true">·</span>
            <span className="hidden sm:inline">Инклюзивті интерфейс панелі</span>
          </div>

          {/* Interactive Accessibility & View Mode Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Font Size Toggle */}
            <button
              type="button"
              onClick={onToggleLargeFont}
              aria-pressed={largeFont}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                largeFont
                  ? highContrast
                    ? 'bg-yellow-400 text-black border-yellow-300'
                    : 'bg-teal-800 text-white border-teal-800'
                  : highContrast
                    ? 'bg-neutral-900 text-white border-neutral-700 hover:border-yellow-400'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              <span>Қаріп: {largeFont ? 'Үлкейтілген' : 'Қалыпты'}</span>
            </button>

            {/* High Contrast Toggle */}
            <button
              type="button"
              onClick={onToggleHighContrast}
              aria-pressed={highContrast}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                highContrast
                  ? 'bg-yellow-400 text-black border-yellow-300'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              <Eye className="w-3.5 h-3.5 shrink-0" />
              <span>Жоғары контраст</span>
            </button>

            {/* Presentation Mode Segmented Control */}
            <div
              role="group"
              aria-label="Көрсетілім режимі"
              className={`inline-flex items-center p-0.5 rounded-lg border ${
                highContrast
                  ? 'bg-neutral-900 border-yellow-400/60'
                  : 'bg-slate-200/80 border-slate-300/80'
              }`}
            >
              <button
                type="button"
                onClick={() => onSetPresentationMode(false)}
                aria-pressed={!presentationMode}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  !presentationMode
                    ? highContrast
                      ? 'bg-yellow-400 text-black'
                      : 'bg-white text-slate-900 shadow-xs'
                    : highContrast
                      ? 'text-neutral-300 hover:text-white'
                      : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Толық бет
              </button>
              <button
                type="button"
                onClick={() => onSetPresentationMode(true)}
                aria-pressed={presentationMode}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  presentationMode
                    ? highContrast
                      ? 'bg-yellow-400 text-black'
                      : 'bg-teal-800 text-white shadow-xs'
                    : highContrast
                      ? 'text-neutral-300 hover:text-white'
                      : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <MonitorPlay className="w-3.5 h-3.5 shrink-0" />
                <span>Слайд режимі</span>
              </button>
            </div>
          </div>
        </div>

        {/* Slide Deck Navigation Strip when Presentation Mode is Active */}
        {presentationMode && (
          <div
            className={`max-w-7xl mx-auto mt-2 pt-2 border-t flex flex-wrap items-center justify-between gap-3 ${
              highContrast ? 'border-neutral-800' : 'border-slate-200'
            }`}
          >
            <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
              {PRESENTATION_SLIDES.map((slide, index) => {
                const isActive = index === currentSlideIndex;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => onSelectSlideIndex(index)}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isActive
                        ? highContrast
                          ? 'bg-yellow-400 text-black font-bold'
                          : 'bg-teal-800 text-white font-semibold'
                        : highContrast
                          ? 'bg-neutral-900 text-neutral-300 hover:text-white'
                          : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                    }`}
                  >
                    {slide.shortTitle}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-mono tabular-nums whitespace-nowrap">
                Слайд {currentSlideIndex + 1} / {PRESENTATION_SLIDES.length}
              </span>
              <button
                type="button"
                onClick={() => onStepSlide('prev')}
                disabled={currentSlideIndex === 0}
                className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                  highContrast
                    ? 'bg-neutral-900 border-yellow-400 text-yellow-300 hover:bg-neutral-800'
                    : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
                }`}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Алдыңғы</span>
              </button>
              <button
                type="button"
                onClick={() => onStepSlide('next')}
                disabled={currentSlideIndex === PRESENTATION_SLIDES.length - 1}
                className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                  highContrast
                    ? 'bg-yellow-400 border-yellow-400 text-black hover:bg-yellow-300'
                    : 'bg-teal-800 border-teal-800 text-white hover:bg-teal-700'
                }`}
              >
                <span>Келесі</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
