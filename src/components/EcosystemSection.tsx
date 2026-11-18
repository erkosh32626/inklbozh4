import { useState } from 'react';
import {
  Building2,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import { ECOSYSTEM_ORGANIZATIONS } from '../data/specialEduData';

export function EcosystemSection({ highContrast }: { highContrast: boolean }) {
  const [selectedOrgId, setSelectedOrgId] = useState<string>(
    ECOSYSTEM_ORGANIZATIONS[0]?.id || 'pmpk'
  );

  const activeOrg =
    ECOSYSTEM_ORGANIZATIONS.find((org) => org.id === selectedOrgId) ||
    ECOSYSTEM_ORGANIZATIONS[0];

  return (
    <section
      id="infrastructure-ecosystem"
      className={`py-12 sm:py-16 border-b transition-colors ${
        highContrast
          ? 'bg-black border-neutral-800 text-white'
          : 'bg-[#F8FAFC] border-slate-200/80 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-3xl mb-8 sm:mb-10">
          <div
            className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
              highContrast ? 'text-yellow-300' : 'text-teal-800'
            }`}
          >
            03-бөлім · Инфрақұрылым және ұйымдар желісі
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
            Арнайы білім беру ұйымдарының жүйесі (ҚР экожүйесі)
          </h2>
          <p
            className={`text-sm sm:text-base leading-relaxed ${
              highContrast ? 'text-neutral-300' : 'text-slate-600'
            }`}
          >
            special-edu.kz порталында Қазақстан Республикасы бойынша жұмыс істейтін
            арнайы білім беру ұйымдарының 6 негізгі түрі тіркелген. Төмендегі
            маршруттық сызба арқылы әр ұйымның баланы диагностикалаудан бастап
            оқыту мен оңалтуға дейінгі экожүйедегі орнын көре аласыз.
          </p>
        </div>

        {/* Interactive Educational Route / Flow Strip */}
        <div
          className={`rounded-2xl border p-5 sm:p-6 mb-8 ${
            highContrast
              ? 'bg-neutral-950 border-yellow-400'
              : 'bg-white border-slate-200/90'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <span
              className={`text-xs font-mono font-semibold uppercase ${
                highContrast ? 'text-yellow-300' : 'text-teal-800'
              }`}
            >
              Интерактивті білім беру маршруты (Ұйымды таңдаңыз):
            </span>
            <span
              className={`text-xs ${
                highContrast ? 'text-neutral-300' : 'text-slate-500'
              }`}
            >
              1. Диагностика (ПМПК) → 2. Білім беру (Балабақша / Мектеп) → 3. Түзеу және оңалту (ППТК / ОО / АО)
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-5">
            {ECOSYSTEM_ORGANIZATIONS.map((org) => {
              const isSelected = org.id === selectedOrgId;
              return (
                <button
                  key={org.id}
                  type="button"
                  onClick={() => setSelectedOrgId(org.id)}
                  aria-pressed={isSelected}
                  className={`p-3 rounded-xl border text-left transition-colors cursor-pointer ${
                    isSelected
                      ? highContrast
                        ? 'bg-yellow-400 text-black border-yellow-300'
                        : 'bg-teal-800 text-white border-teal-800 shadow-xs'
                      : highContrast
                        ? 'bg-neutral-900 text-white border-neutral-700 hover:border-yellow-400'
                        : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="text-xs font-mono opacity-80 mb-0.5">
                    {org.stepNumber}-буын
                  </div>
                  <div className="text-sm font-bold whitespace-nowrap truncate">
                    {org.acronym}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Route Node Highlight */}
          {activeOrg && (
            <div
              className={`rounded-xl border p-4 sm:p-5 ${
                highContrast
                  ? 'bg-black border-neutral-700'
                  : 'bg-teal-50/40 border-teal-800/20'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="text-base sm:text-lg font-bold">
                  {activeOrg.stepNumber}. {activeOrg.title} ({activeOrg.acronym})
                </div>
                <span
                  className={`text-xs font-mono font-semibold ${
                    highContrast ? 'text-yellow-300' : 'text-teal-800'
                  }`}
                >
                  {activeOrg.roleTag}
                </span>
              </div>
              <p
                className={`text-xs sm:text-sm leading-relaxed ${
                  highContrast ? 'text-neutral-200' : 'text-slate-600'
                }`}
              >
                {activeOrg.description}
              </p>
            </div>
          )}
        </div>

        {/* 6 Ecosystem Organization Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ECOSYSTEM_ORGANIZATIONS.map((org) => {
            const isSelected = org.id === selectedOrgId;
            return (
              <article
                key={org.id}
                onClick={() => setSelectedOrgId(org.id)}
                className={`rounded-2xl border p-6 flex flex-col justify-between transition-colors cursor-pointer ${
                  highContrast
                    ? isSelected
                      ? 'bg-neutral-900 border-yellow-300 ring-2 ring-yellow-300'
                      : 'bg-neutral-950 border-yellow-400/80'
                    : isSelected
                      ? 'bg-white border-teal-700 ring-2 ring-teal-700/15'
                      : 'bg-white border-slate-200/90 hover:border-teal-700/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span
                      className={`text-xs font-mono font-semibold ${
                        highContrast ? 'text-yellow-300' : 'text-teal-800'
                      }`}
                    >
                      {org.stepNumber} · {org.acronym}
                    </span>
                    <Building2
                      className={`w-4 h-4 shrink-0 ${
                        highContrast ? 'text-yellow-300' : 'text-slate-400'
                      }`}
                    />
                  </div>

                  <h3 className="text-lg font-bold leading-snug mb-2">
                    {org.title}
                  </h3>

                  <div
                    className={`text-xs font-medium mb-3 ${
                      highContrast ? 'text-yellow-200' : 'text-slate-500'
                    }`}
                  >
                    {org.roleTag}
                  </div>

                  <p
                    className={`text-sm leading-relaxed mb-5 ${
                      highContrast ? 'text-neutral-200' : 'text-slate-600'
                    }`}
                  >
                    {org.description}
                  </p>
                </div>

                <div
                  className={`pt-4 border-t ${
                    highContrast ? 'border-neutral-800' : 'border-slate-100'
                  }`}
                >
                  <div className="text-xs font-semibold mb-2">Негізгі функциялары:</div>
                  <ul className="space-y-2">
                    {org.functions.map((fn) => (
                      <li
                        key={fn}
                        className="flex items-start gap-2 text-xs leading-relaxed"
                      >
                        <CheckCircle2
                          className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                            highContrast ? 'text-yellow-300' : 'text-teal-700'
                          }`}
                        />
                        <span>{fn}</span>
                      </li>
                    ))}
                  </ul>
                  <div
                    className={`mt-4 inline-flex items-center gap-1 text-xs font-semibold ${
                      highContrast ? 'text-yellow-300' : 'text-teal-800'
                    }`}
                  >
                    <span>Маршрутта белсендіру</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
