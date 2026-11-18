import { useState } from 'react';
import {
  Accessibility,
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronRight,
  Ear,
  Eye,
  HeartHandshake,
  RotateCcw,
  Search,
  Sparkles,
  Volume2,
} from 'lucide-react';
import {
  PROGRAM_CATEGORIES,
  ProgramCategory,
  ProgramIconKey,
  SPECIAL_PROGRAMS,
  SpecialProgram,
} from '../data/specialEduData';
import { filterSpecialPrograms } from '../utils/portalLogic';

function renderProgramIcon(iconKey: ProgramIconKey, className: string) {
  switch (iconKey) {
    case 'ear':
      return <Ear className={className} />;
    case 'eye':
      return <Eye className={className} />;
    case 'volume':
      return <Volume2 className={className} />;
    case 'accessibility':
      return <Accessibility className={className} />;
    case 'brain':
      return <Brain className={className} />;
    case 'heart':
      return <HeartHandshake className={className} />;
    case 'sparkles':
      return <Sparkles className={className} />;
  }
}

export function ProgramCatalogSection({ highContrast }: { highContrast: boolean }) {
  const [selectedCategory, setSelectedCategory] = useState<ProgramCategory>('Барлығы');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeProgram, setActiveProgram] = useState<SpecialProgram | null>(null);

  const filteredPrograms = filterSpecialPrograms(
    SPECIAL_PROGRAMS,
    selectedCategory,
    searchQuery
  );

  const handleResetFilters = () => {
    setSelectedCategory('Барлығы');
    setSearchQuery('');
  };

  return (
    <section
      id="programs-catalog"
      className={`py-12 sm:py-16 border-b transition-colors ${
        highContrast
          ? 'bg-black border-neutral-800 text-white'
          : 'bg-white border-slate-200/80 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div className="max-w-3xl">
            <div
              className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
                highContrast ? 'text-yellow-300' : 'text-teal-800'
              }`}
            >
              02-бөлім · Интерактивті бағдарламалар каталогі
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
              Даму бұзылыстары бойынша білім беру бағдарламалары
            </h2>
            <p
              className={`text-sm sm:text-base leading-relaxed ${
                highContrast ? 'text-neutral-300' : 'text-slate-600'
              }`}
            >
              special-edu.kz порталындағы ғылыми зертханалар мен үлгілік оқу
              бағдарламаларына негізделген 7 нозологиялық бағыт. Кез келген
              бағдарламаны басып, оның мақсатты тобын, бейімдеу тәсілдерін және
              оқу-әдістемелік құралдарын толық ашып көріңіз.
            </p>
          </div>

          <div className="text-xs font-mono tabular-nums shrink-0">
            Табылған бағдарламалар: {filteredPrograms.length} / {SPECIAL_PROGRAMS.length}
          </div>
        </div>

        {/* Search & Category Filter Controls */}
        <div
          className={`rounded-2xl border p-4 sm:p-5 mb-8 ${
            highContrast
              ? 'bg-neutral-950 border-yellow-400'
              : 'bg-slate-50 border-slate-200/90'
          }`}
        >
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Interactive Category Tabs */}
            <div
              role="tablist"
              aria-label="Даму бұзылыстары санаттары"
              className="flex flex-wrap items-center gap-1.5"
            >
              {PROGRAM_CATEGORIES.map((category) => {
                const isSelected = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isSelected
                        ? highContrast
                          ? 'bg-yellow-400 text-black'
                          : 'bg-teal-800 text-white shadow-xs'
                        : highContrast
                          ? 'bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-700'
                          : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <label htmlFor="program-search-input" className="sr-only">
                Бағдарламалар бойынша іздеу
              </label>
              <Search
                className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${
                  highContrast ? 'text-yellow-300' : 'text-slate-400'
                }`}
              />
              <input
                id="program-search-input"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Іздеу: мысалы, Брайль, e-Ымдау, логопедия, АСБ..."
                className={`w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border transition-colors focus:outline-none ${
                  highContrast
                    ? 'bg-black border-yellow-400 text-white placeholder:text-neutral-400 focus:ring-2 focus:ring-yellow-300'
                    : 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredPrograms.length === 0 ? (
          <div
            className={`rounded-2xl border p-10 text-center ${
              highContrast
                ? 'bg-neutral-950 border-yellow-400 text-white'
                : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}
          >
            <p className="text-base font-semibold mb-2">
              Сұранысыңыз бойынша бағдарлама табылмады
            </p>
            <p
              className={`text-sm mb-5 ${
                highContrast ? 'text-neutral-300' : 'text-slate-500'
              }`}
            >
              Іздеу сөзін өзгертіп көріңіз немесе барлық санаттарды қайта ашыңыз.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl transition-colors cursor-pointer ${
                highContrast
                  ? 'bg-yellow-400 text-black hover:bg-yellow-300'
                  : 'bg-teal-800 text-white hover:bg-teal-700'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Сүзгіні тазарту</span>
            </button>
          </div>
        ) : (
          /* Program Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.map((program) => {
              const isSelectedCard = activeProgram?.id === program.id;
              return (
                <article
                  key={program.id}
                  className={`rounded-2xl border p-6 flex flex-col justify-between transition-colors ${
                    highContrast
                      ? isSelectedCard
                        ? 'bg-neutral-900 border-yellow-300 ring-2 ring-yellow-300'
                        : 'bg-neutral-950 border-yellow-400/80 hover:border-yellow-300'
                      : isSelectedCard
                        ? 'bg-teal-50/40 border-teal-700 ring-2 ring-teal-700/20'
                        : 'bg-white border-slate-200/90 hover:border-teal-700/50 shadow-2xs'
                  }`}
                >
                  <div>
                    {/* Quiet 1-line text kicker with icon */}
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div
                        className={`text-xs font-mono font-semibold ${
                          highContrast ? 'text-yellow-300' : 'text-teal-800'
                        }`}
                      >
                        {program.code} · {program.category}
                      </div>
                      <div
                        className={`p-2 rounded-xl ${
                          highContrast
                            ? 'bg-neutral-900 text-yellow-300'
                            : 'bg-teal-50 text-teal-800'
                        }`}
                      >
                        {renderProgramIcon(program.iconKey, 'w-5 h-5')}
                      </div>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold leading-snug mb-2">
                      {program.title}
                    </h3>

                    <div
                      className={`text-xs mb-3 ${
                        highContrast ? 'text-neutral-300' : 'text-slate-500'
                      }`}
                    >
                      <span>{program.pedagogyField}</span>
                      <span aria-hidden="true"> · </span>
                      <span>{program.ordersRef}</span>
                    </div>

                    <p
                      className={`text-sm leading-relaxed mb-5 ${
                        highContrast ? 'text-neutral-200' : 'text-slate-600'
                      }`}
                    >
                      {program.shortSummary}
                    </p>
                  </div>

                  <div>
                    <div
                      className={`pt-3 mb-4 border-t text-xs ${
                        highContrast
                          ? 'border-neutral-800 text-neutral-300'
                          : 'border-slate-100 text-slate-500'
                      }`}
                    >
                      <span className="font-semibold">Деңгейлер: </span>
                      <span>{program.gradeRange}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveProgram(program)}
                      aria-label={`${program.title} — толық анықтаманы ашу`}
                      className={`w-full inline-flex items-center justify-between px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        highContrast
                          ? 'bg-yellow-400 text-black border-yellow-400 hover:bg-yellow-300'
                          : 'bg-slate-900 text-white border-slate-900 hover:bg-teal-800 hover:border-teal-800'
                      }`}
                    >
                      <span>Бейімдеу тәсілдері мен ОӘК ашу</span>
                      <ChevronRight className="w-4 h-4 shrink-0" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Modal / Detail Dialog when a Program Card is Clicked */}
        {activeProgram && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-program-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-xs overflow-y-auto"
            onClick={() => setActiveProgram(null)}
          >
            <div
              className={`w-full max-w-3xl rounded-2xl border p-6 sm:p-8 max-h-[90vh] overflow-y-auto transition-colors ${
                highContrast
                  ? 'bg-black border-yellow-400 text-white'
                  : 'bg-white border-slate-200 text-slate-900 shadow-xl'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4 pb-5 mb-6 border-b border-slate-200 dark:border-neutral-800">
                <div>
                  <div
                    className={`text-xs font-mono font-semibold mb-1.5 ${
                      highContrast ? 'text-yellow-300' : 'text-teal-800'
                    }`}
                  >
                    {activeProgram.code} · {activeProgram.pedagogyField} ·{' '}
                    {activeProgram.ordersRef}
                  </div>
                  <h3
                    id="modal-program-title"
                    className="text-xl sm:text-2xl font-bold leading-snug"
                  >
                    {activeProgram.title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveProgram(null)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    highContrast
                      ? 'bg-yellow-400 text-black border-yellow-300'
                      : 'bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200'
                  }`}
                >
                  Жабу ✕
                </button>
              </div>

              {/* Detail Sections: 1. Мақсатты топ, 2. Бейімдеу тәсілдері, 3. Негізгі оқу-әдістемелік құралдар */}
              <div className="space-y-6">
                {/* 1. Мақсатты топ */}
                <div
                  className={`rounded-xl border p-4 sm:p-5 ${
                    highContrast
                      ? 'bg-neutral-950 border-neutral-700'
                      : 'bg-slate-50 border-slate-200/80'
                  }`}
                >
                  <div
                    className={`text-xs font-mono uppercase tracking-wider font-semibold mb-1.5 ${
                      highContrast ? 'text-yellow-300' : 'text-teal-800'
                    }`}
                  >
                    1. Мақсатты топ (Білім алушылар контингенті)
                  </div>
                  <p className="text-sm sm:text-base leading-relaxed">
                    {activeProgram.targetGroup}
                  </p>
                </div>

                {/* 2. Бейімдеу тәсілдері (қажеттіліктерді ескеру) */}
                <div>
                  <h4
                    className={`text-sm font-bold uppercase tracking-wide mb-3 ${
                      highContrast ? 'text-yellow-300' : 'text-slate-900'
                    }`}
                  >
                    2. Бейімдеу тәсілдері (Ерекше қажеттіліктерді ескеру)
                  </h4>
                  <ul className="space-y-2.5">
                    {activeProgram.adaptationMethods.map((method) => (
                      <li
                        key={method}
                        className="flex items-start gap-2.5 text-sm leading-relaxed"
                      >
                        <CheckCircle2
                          className={`w-4 h-4 shrink-0 mt-1 ${
                            highContrast ? 'text-yellow-300' : 'text-teal-700'
                          }`}
                        />
                        <span>{method}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3. Негізгі оқу-әдістемелік құралдар */}
                <div>
                  <h4
                    className={`text-sm font-bold uppercase tracking-wide mb-3 ${
                      highContrast ? 'text-yellow-300' : 'text-slate-900'
                    }`}
                  >
                    3. Негізгі оқу-әдістемелік құралдар (ОӘК және ассистивті база)
                  </h4>
                  <ul className="space-y-2.5">
                    {activeProgram.educationalTools.map((tool) => (
                      <li
                        key={tool}
                        className="flex items-start gap-2.5 text-sm leading-relaxed"
                      >
                        <BookOpen
                          className={`w-4 h-4 shrink-0 mt-1 ${
                            highContrast ? 'text-yellow-300' : 'text-indigo-700'
                          }`}
                        />
                        <span>{tool}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Portal Digital Support Footer inside Modal */}
                <div
                  className={`pt-4 border-t flex flex-wrap items-center justify-between gap-4 text-xs ${
                    highContrast
                      ? 'border-neutral-800 text-neutral-300'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  <div>
                    <span className="font-semibold">Порталдағы цифрлық қолдау: </span>
                    <span>{activeProgram.digitalSupportOnPortal}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveProgram(null)}
                    className={`px-4 py-2 font-semibold rounded-xl transition-colors cursor-pointer ${
                      highContrast
                        ? 'bg-yellow-400 text-black hover:bg-yellow-300'
                        : 'bg-teal-800 text-white hover:bg-teal-700'
                    }`}
                  >
                    Түсінікті, жабу
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
