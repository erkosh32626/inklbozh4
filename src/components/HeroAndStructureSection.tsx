import {
  BookOpen,
  Building2,
  CheckCircle2,
  ExternalLink,
  FileText,
  GraduationCap,
  MonitorPlay,
  Users,
} from 'lucide-react';
import { PORTAL_STRUCTURE_ITEMS } from '../data/specialEduData';

export interface HeroProps {
  highContrast: boolean;
  onJumpToVideo: () => void;
  onJumpToPrograms: () => void;
}

export function HeroSection({
  highContrast,
  onJumpToVideo,
  onJumpToPrograms,
}: HeroProps) {
  return (
    <section
      id="about-center"
      className={`py-10 sm:py-14 border-b transition-colors ${
        highContrast
          ? 'bg-black border-neutral-800 text-white'
          : 'bg-gradient-to-b from-white to-[#F8FAFC] border-slate-200/80 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Main 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Academic Editorial Intro */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Quiet unboxed metadata line */}
              <div
                className={`flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wide uppercase mb-4 ${
                  highContrast ? 'text-yellow-300' : 'text-teal-800'
                }`}
              >
                <span>ҚР Оқу-ағарту министрлігі</span>
                <span aria-hidden="true">·</span>
                <span>АИБД ҰҒПО (ННПЦ РСИО)</span>
                <span aria-hidden="true">·</span>
                <span>1992 жылы құрылған</span>
              </div>

              <h1
                className={`text-3xl sm:text-4xl lg:text-[2.65rem] font-bold leading-[1.15] tracking-tight mb-5 ${
                  highContrast ? 'text-white' : 'text-slate-900'
                }`}
              >
                Даму бұзылыстары бар оқушыларға арналған білім беру бағдарламалары
              </h1>

              <p
                className={`text-base sm:text-lg leading-relaxed max-w-2xl mb-6 ${
                  highContrast ? 'text-neutral-200' : 'text-slate-600'
                }`}
              >
                <strong className={highContrast ? 'text-yellow-300' : 'text-slate-900'}>
                  https://special-edu.kz/
                </strong>{' '}
                — Қазақстан Республикасы Оқу-ағарту министрлігінің{' '}
                <em>
                  «Арнайы және инклюзивті білім беруді дамытудың ұлттық
                  ғылыми-практикалық орталығы» РММ
                </em>{' '}
                (Алматы қ., Байзақов көш., 273 «А») ресми цифрлық порталы. Орталық
                ерекше білім беруді қажет ететін (ЕБҚ) балаларды оқытудың
                нормативтік-әдістемелік базасын, үлгілік оқу бағдарламаларын және
                арнайы оқулықтарды әзірлейді.
              </p>
            </div>

            {/* Action Buttons & Institutional Address */}
            <div className="pt-2">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <a
                  href="https://special-edu.kz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-xl transition-colors whitespace-nowrap shrink-0 ${
                    highContrast
                      ? 'bg-yellow-400 text-black hover:bg-yellow-300'
                      : 'bg-teal-800 text-white hover:bg-teal-700 shadow-xs'
                  }`}
                >
                  <span>Ресми сайтты ашу (special-edu.kz)</span>
                  <ExternalLink className="w-4 h-4 shrink-0" />
                </a>

                <button
                  type="button"
                  onClick={onJumpToVideo}
                  className={`inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-xl border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    highContrast
                      ? 'bg-neutral-900 border-yellow-400 text-yellow-300 hover:bg-neutral-800'
                      : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <MonitorPlay className="w-4 h-4 shrink-0" />
                  <span>Бейімделген бейнеролик (3–5 мин)</span>
                </button>

                <button
                  type="button"
                  onClick={onJumpToPrograms}
                  className={`inline-flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    highContrast
                      ? 'text-neutral-200 hover:text-yellow-300 underline'
                      : 'text-teal-800 hover:text-teal-950 hover:bg-teal-50/70'
                  }`}
                >
                  <span>7 бағдарлама каталогі</span>
                </button>
              </div>

              <div
                className={`pt-4 border-t text-xs flex flex-wrap items-center gap-x-4 gap-y-1 ${
                  highContrast
                    ? 'border-neutral-800 text-neutral-300'
                    : 'border-slate-200 text-slate-500'
                }`}
              >
                <span>Мекенжайы: Алматы қ., Байзақов көшесі, 273 «А»</span>
                <span aria-hidden="true">·</span>
                <span>Мәртебесі: ҚР ОМ ведомстволық бағынысты ғылыми орталығы</span>
                <span aria-hidden="true">·</span>
                <span>Құрылған жылы: 1992 ж.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Institutional Dossier & Architectural Visual Card */}
          <div className="lg:col-span-5 flex">
            <div
              className={`w-full rounded-2xl border p-6 sm:p-7 flex flex-col justify-between ${
                highContrast
                  ? 'bg-neutral-950 border-yellow-400 text-white'
                  : 'bg-white border-slate-200/90 shadow-xs text-slate-900'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-4 pb-4 mb-5 border-b border-slate-200/80 dark:border-neutral-800">
                  <div>
                    <div
                      className={`text-xs font-mono uppercase tracking-wider ${
                        highContrast ? 'text-yellow-300' : 'text-teal-800'
                      }`}
                    >
                      АИБД ҰҒПО ТӨЛҚҰЖАТЫ
                    </div>
                    <h2 className="text-lg font-bold mt-0.5">
                      Ұлттық үйлестіруші орталық
                    </h2>
                  </div>
                  <Building2
                    className={`w-8 h-8 shrink-0 ${
                      highContrast ? 'text-yellow-300' : 'text-teal-700'
                    }`}
                  />
                </div>

                {/* Inline SVG Institutional Diagram */}
                <div
                  className={`rounded-xl p-4 mb-5 border ${
                    highContrast
                      ? 'bg-black border-neutral-700'
                      : 'bg-slate-50 border-slate-200/70'
                  }`}
                >
                  <svg
                    viewBox="0 0 420 130"
                    className="w-full h-auto"
                    role="img"
                    aria-label="special-edu.kz порталының ғылыми-әдістемелік архитектурасы"
                  >
                    {/* Central Hub */}
                    <rect
                      x="130"
                      y="8"
                      width="160"
                      height="36"
                      rx="8"
                      fill={highContrast ? '#FACC15' : '#0F766E'}
                    />
                    <text
                      x="210"
                      y="30"
                      textAnchor="middle"
                      fill={highContrast ? '#000000' : '#FFFFFF'}
                      fontSize="11"
                      fontWeight="700"
                    >
                      special-edu.kz (АИБД ҰҒПО)
                    </text>

                    {/* Connecting Lines */}
                    <path
                      d="M210 44 L210 64 M70 64 L350 64 M70 64 L70 80 M210 64 L210 80 M350 64 L350 80"
                      stroke={highContrast ? '#FACC15' : '#0F766E'}
                      strokeWidth="2"
                      fill="none"
                    />

                    {/* Node 1 */}
                    <rect
                      x="10"
                      y="80"
                      width="120"
                      height="42"
                      rx="6"
                      fill={highContrast ? '#171717' : '#FFFFFF'}
                      stroke={highContrast ? '#FACC15' : '#CBD5E1'}
                      strokeWidth="1.5"
                    />
                    <text
                      x="70"
                      y="98"
                      textAnchor="middle"
                      fill={highContrast ? '#FFFFFF' : '#0F172A'}
                      fontSize="10"
                      fontWeight="700"
                    >
                      Нормативтік база
                    </text>
                    <text
                      x="70"
                      y="113"
                      textAnchor="middle"
                      fill={highContrast ? '#FDE047' : '#475569'}
                      fontSize="9"
                    >
                      №721 · №51 · №469
                    </text>

                    {/* Node 2 */}
                    <rect
                      x="150"
                      y="80"
                      width="120"
                      height="42"
                      rx="6"
                      fill={highContrast ? '#171717' : '#FFFFFF'}
                      stroke={highContrast ? '#FACC15' : '#CBD5E1'}
                      strokeWidth="1.5"
                    />
                    <text
                      x="210"
                      y="98"
                      textAnchor="middle"
                      fill={highContrast ? '#FFFFFF' : '#0F172A'}
                      fontSize="10"
                      fontWeight="700"
                    >
                      Арнайы ОӘК & Кітапхана
                    </text>
                    <text
                      x="210"
                      y="113"
                      textAnchor="middle"
                      fill={highContrast ? '#FDE047' : '#475569'}
                      fontSize="9"
                    >
                      0–10 сынып оқулықтары
                    </text>

                    {/* Node 3 */}
                    <rect
                      x="290"
                      y="80"
                      width="120"
                      height="42"
                      rx="6"
                      fill={highContrast ? '#171717' : '#FFFFFF'}
                      stroke={highContrast ? '#FACC15' : '#CBD5E1'}
                      strokeWidth="1.5"
                    />
                    <text
                      x="350"
                      y="98"
                      textAnchor="middle"
                      fill={highContrast ? '#FFFFFF' : '#0F172A'}
                      fontSize="10"
                      fontWeight="700"
                    >
                      Цифрлық платформа
                    </text>
                    <text
                      x="350"
                      y="113"
                      textAnchor="middle"
                      fill={highContrast ? '#FDE047' : '#475569'}
                      fontSize="9"
                    >
                      e-Ымдау · Дактиль · TTS
                    </text>
                  </svg>
                </div>

                <dl className="space-y-2.5 text-xs sm:text-sm">
                  <div className="flex justify-between gap-4 py-1.5 border-b border-slate-100 dark:border-neutral-800">
                    <dt className={highContrast ? 'text-neutral-300' : 'text-slate-500'}>
                      Ғылыми-әдістемелік миссиясы:
                    </dt>
                    <dd className="font-semibold text-right">
                      ЕБҚ бар балаларды диагностикалау және оқыту
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4 py-1.5 border-b border-slate-100 dark:border-neutral-800">
                    <dt className={highContrast ? 'text-neutral-300' : 'text-slate-500'}>
                      Қамтылатын нозологиялар:
                    </dt>
                    <dd className="font-semibold text-right">
                      Есту, көру, сөйлеу, ТҚА, ПДТ, зият, АСБ
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4 py-1.5">
                    <dt className={highContrast ? 'text-neutral-300' : 'text-slate-500'}>
                      Ақпараттық қолжетімділік:
                    </dt>
                    <dd className="font-semibold text-right">
                      Қазақ, орыс, ағылшын тілдерінде (Ашық қор)
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Key Portal Stats Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 sm:mt-10">
          <div
            className={`rounded-2xl border p-5 ${
              highContrast
                ? 'bg-neutral-950 border-yellow-400'
                : 'bg-white border-slate-200/90'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className={`text-2xl sm:text-3xl font-bold font-mono tabular-nums ${
                  highContrast ? 'text-yellow-300' : 'text-teal-800'
                }`}
              >
                541+
              </span>
              <Building2
                className={`w-5 h-5 ${
                  highContrast ? 'text-yellow-300' : 'text-teal-700'
                }`}
              />
            </div>
            <div className="text-sm font-bold mb-1">Арнайы білім беру ұйымдары</div>
            <p
              className={`text-xs leading-relaxed ${
                highContrast ? 'text-neutral-300' : 'text-slate-500'
              }`}
            >
              ҚР бойынша ПМПК, ППТК, арнайы балабақшалар, мектептер мен оңалту орталықтарының интерактивті картасы.
            </p>
          </div>

          <div
            className={`rounded-2xl border p-5 ${
              highContrast
                ? 'bg-neutral-950 border-yellow-400'
                : 'bg-white border-slate-200/90'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className={`text-2xl sm:text-3xl font-bold font-mono tabular-nums ${
                  highContrast ? 'text-yellow-300' : 'text-teal-800'
                }`}
              >
                8 бағыт
              </span>
              <Users
                className={`w-5 h-5 ${
                  highContrast ? 'text-yellow-300' : 'text-teal-700'
                }`}
              />
            </div>
            <div className="text-sm font-bold mb-1">Ғылыми-практикалық зертханалар</div>
            <p
              className={`text-xs leading-relaxed ${
                highContrast ? 'text-neutral-300' : 'text-slate-500'
              }`}
            >
              Даму бұзылыстарының әрбір тобы бойынша мамандандырылған ғылыми зерттеу және әдістемелік зертханалар.
            </p>
          </div>

          <div
            className={`rounded-2xl border p-5 ${
              highContrast
                ? 'bg-neutral-950 border-yellow-400'
                : 'bg-white border-slate-200/90'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className={`text-2xl sm:text-3xl font-bold font-mono tabular-nums ${
                  highContrast ? 'text-yellow-300' : 'text-teal-800'
                }`}
              >
                3 деңгей
              </span>
              <FileText
                className={`w-5 h-5 ${
                  highContrast ? 'text-yellow-300' : 'text-teal-700'
                }`}
              />
            </div>
            <div className="text-sm font-bold mb-1">Үлгілік оқу бағдарламалары</div>
            <p
              className={`text-xs leading-relaxed ${
                highContrast ? 'text-neutral-300' : 'text-slate-500'
              }`}
            >
              Мектепке дейінгі (№721), Бастауыш 0–4 сынып (№51) және Негізгі орта 5–10 сынып (№469) деңгейлері.
            </p>
          </div>

          <div
            className={`rounded-2xl border p-5 ${
              highContrast
                ? 'bg-neutral-950 border-yellow-400'
                : 'bg-white border-slate-200/90'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className={`text-2xl sm:text-3xl font-bold font-mono tabular-nums ${
                  highContrast ? 'text-yellow-300' : 'text-teal-800'
                }`}
              >
                100%
              </span>
              <GraduationCap
                className={`w-5 h-5 ${
                  highContrast ? 'text-yellow-300' : 'text-teal-700'
                }`}
              />
            </div>
            <div className="text-sm font-bold mb-1">Тегін цифрлық кітапхана & ОӘК</div>
            <p
              className={`text-xs leading-relaxed ${
                highContrast ? 'text-neutral-300' : 'text-slate-500'
              }`}
            >
              Барлық арнайы оқулықтардың PDF нұсқалары, e-Ымдау, Дактиль және педагог курстары ашық қолжетімді.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PortalStructureSection({ highContrast }: { highContrast: boolean }) {
  return (
    <section
      id="portal-structure"
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
            01-бөлім · Портал архитектурасына шолу
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
            Сайттың негізгі бөлімдері мен құрылымы (special-edu.kz шолуы)
          </h2>
          <p
            className={`text-sm sm:text-base leading-relaxed ${
              highContrast ? 'text-neutral-300' : 'text-slate-600'
            }`}
          >
            АИБД ҰҒПО ресми сайты педагогтерді, ПМПК/ППТК мамандарын, студенттерді
            және ата-аналарды нормативтік құжаттармен, бейімделген оқулықтармен және
            қазақ тіліндегі сурдо/тифло цифрлық құралдармен қамтамасыз ететін 4 іргелі
            блоктан тұрады.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PORTAL_STRUCTURE_ITEMS.map((item) => (
            <article
              key={item.id}
              className={`rounded-2xl border p-6 sm:p-7 flex flex-col justify-between transition-colors ${
                highContrast
                  ? 'bg-neutral-950 border-yellow-400 text-white'
                  : 'bg-white border-slate-200/90 hover:border-teal-700/40 text-slate-900'
              }`}
            >
              <div>
                {/* Clean unboxed metadata header */}
                <div className="flex items-center justify-between gap-4 mb-3">
                  <div
                    className={`text-xs font-mono font-semibold ${
                      highContrast ? 'text-yellow-300' : 'text-teal-800'
                    }`}
                  >
                    {item.number} · {item.regulatoryTag}
                  </div>
                  <BookOpen
                    className={`w-4 h-4 shrink-0 ${
                      highContrast ? 'text-yellow-300' : 'text-slate-400'
                    }`}
                  />
                </div>

                <h3 className="text-xl font-bold mb-2.5">{item.title}</h3>

                <p
                  className={`text-sm leading-relaxed mb-5 ${
                    highContrast ? 'text-neutral-200' : 'text-slate-600'
                  }`}
                >
                  {item.description}
                </p>

                <ul className="space-y-2.5 mb-6">
                  {item.keyHighlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-2.5 text-xs sm:text-sm"
                    >
                      <CheckCircle2
                        className={`w-4 h-4 shrink-0 mt-0.5 ${
                          highContrast ? 'text-yellow-300' : 'text-teal-700'
                        }`}
                      />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className={`pt-3.5 border-t flex items-center justify-between text-xs ${
                  highContrast
                    ? 'border-neutral-800 text-neutral-300'
                    : 'border-slate-100 text-slate-500'
                }`}
              >
                <span className="font-mono">{item.portalPathLabel}</span>
                <a
                  href="https://special-edu.kz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1 font-semibold underline-offset-4 hover:underline whitespace-nowrap shrink-0 ${
                    highContrast ? 'text-yellow-300' : 'text-teal-800'
                  }`}
                >
                  <span>Бөлімді көру</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
