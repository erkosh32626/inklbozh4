import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Link2,
  MonitorPlay,
  Play,
  RotateCcw,
  Upload,
  Video,
  Volume2,
} from 'lucide-react';
import {
  DEFAULT_VIDEO_CONFIG,
  INTERACTIVE_VIDEO_SCENES,
  VIDEO_ADAPTATION_CRITERIA,
} from '../data/specialEduData';
import {
  calculateChecklistStats,
  parseVideoSourceUrl,
} from '../utils/portalLogic';

type VideoTabMode = 'configured' | 'link' | 'upload';

export function AdaptedVideoSection({ highContrast }: { highContrast: boolean }) {
  const [activeTab, setActiveTab] = useState<VideoTabMode>('configured');

  // Mode 1: Configured video state (/video.mp4 or YouTube/Drive in DEFAULT_VIDEO_CONFIG)
  const [nativeVideoAvailable, setNativeVideoAvailable] = useState<boolean>(false);
  const [tryNativePlayer, setTryNativePlayer] = useState<boolean>(false);

  // Interactive Storyboard Player State (when /video.mp4 isn't placed in public/ yet or presenter uses interactive demo)
  const [sceneIndex, setSceneIndex] = useState<number>(0);
  const [isPlayingDemo, setIsPlayingDemo] = useState<boolean>(false);
  const [showSubtitles, setShowSubtitles] = useState<boolean>(true);
  const [showSignLanguage, setShowSignLanguage] = useState<boolean>(true);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});

  // Mode 2: Custom Link (YouTube / Google Drive / Direct MP4)
  const [linkInput, setLinkInput] = useState<string>('');
  const [submittedLink, setSubmittedLink] = useState<string>('');

  // Mode 3: Local Laptop File Upload (<input type="file" accept="video/*" />)
  const [localFileUrl, setLocalFileUrl] = useState<string>('');
  const [localFileName, setLocalFileName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Adaptation Criteria Checklist State
  const [checkedCriteriaIds, setCheckedCriteriaIds] = useState<string[]>(
    VIDEO_ADAPTATION_CRITERIA.map((c) => c.id)
  );

  // Auto-advance storyboard scenes when playing demo
  useEffect(() => {
    if (!isPlayingDemo) return;
    const timer = window.setInterval(() => {
      setSceneIndex((prev) => {
        if (prev + 1 < INTERACTIVE_VIDEO_SCENES.length) {
          return prev + 1;
        }
        setIsPlayingDemo(false);
        return prev;
      });
    }, 6500);

    return () => window.clearInterval(timer);
  }, [isPlayingDemo]);

  // Clean up object URL on unmount or replacement
  useEffect(() => {
    return () => {
      if (localFileUrl) {
        URL.revokeObjectURL(localFileUrl);
      }
    };
  }, [localFileUrl]);

  const configuredSource = parseVideoSourceUrl(DEFAULT_VIDEO_CONFIG.sourceUrl);
  const customLinkSource = parseVideoSourceUrl(submittedLink);
  const checklistStats = calculateChecklistStats(
    checkedCriteriaIds,
    VIDEO_ADAPTATION_CRITERIA.length
  );

  const currentScene =
    INTERACTIVE_VIDEO_SCENES[sceneIndex] || INTERACTIVE_VIDEO_SCENES[0];

  const handleLinkSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmittedLink(linkInput.trim());
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (localFileUrl) {
      URL.revokeObjectURL(localFileUrl);
    }
    const objectUrl = URL.createObjectURL(file);
    setLocalFileUrl(objectUrl);
    setLocalFileName(file.name);
  };

  const toggleCriterion = (id: string) => {
    setCheckedCriteriaIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section
      id="adapted-video"
      className={`py-12 sm:py-16 border-b transition-colors ${
        highContrast
          ? 'bg-black border-neutral-800 text-white'
          : 'bg-white border-slate-200/80 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-10">
          <div
            className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
              highContrast ? 'text-yellow-300' : 'text-teal-800'
            }`}
          >
            04-бөлім · БӨЖ 4 практикалық бөлімі
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
            Бейімделген қысқа бейнеролик (3–5 минут) және бейімделу критерийлері
          </h2>
          <p
            className={`text-sm sm:text-base leading-relaxed ${
              highContrast ? 'text-neutral-300' : 'text-slate-600'
            }`}
          >
            Тапсырма талабына сәйкес, таңдалған білім алушылардың нақты
            қажеттіліктерін (көру контрасты, синхронды субтитр, e-Ымдау тірегі,
            3–5 минуттық зейін регламенті және интерактивті үзілістер) ескере
            отырып дайындалған бейнеролик модулі.
          </p>
        </div>

        {/* Main 2-Column Split: Left (Video Player & 3 Modes) + Right (Adaptation Criteria Checklist) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 7 Columns: Video Showcase & 3 Loading Modes */}
          <div className="lg:col-span-7">
            <div
              className={`rounded-2xl border p-5 sm:p-6 ${
                highContrast
                  ? 'bg-neutral-950 border-yellow-400 text-white'
                  : 'bg-slate-50 border-slate-200/90 text-slate-900'
              }`}
            >
              {/* Video Header Metadata */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-200 dark:border-neutral-800">
                <div>
                  <div
                    className={`text-xs font-mono font-semibold ${
                      highContrast ? 'text-yellow-300' : 'text-teal-800'
                    }`}
                  >
                    Хронометраж: {DEFAULT_VIDEO_CONFIG.durationLabel} ·{' '}
                    {DEFAULT_VIDEO_CONFIG.targetGroupLabel}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold mt-0.5">
                    {DEFAULT_VIDEO_CONFIG.title}
                  </h3>
                </div>
                <Video
                  className={`w-5 h-5 shrink-0 ${
                    highContrast ? 'text-yellow-300' : 'text-teal-700'
                  }`}
                />
              </div>

              {/* 3 Convenient Video Source Tabs */}
              <div
                role="tablist"
                aria-label="Бейнеролик көзін таңдау режимдері"
                className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-5"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'configured'}
                  onClick={() => setActiveTab('configured')}
                  className={`inline-flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-semibold rounded-xl border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    activeTab === 'configured'
                      ? highContrast
                        ? 'bg-yellow-400 text-black border-yellow-300'
                        : 'bg-teal-800 text-white border-teal-800 shadow-xs'
                      : highContrast
                        ? 'bg-neutral-900 text-neutral-200 border-neutral-700 hover:border-yellow-400'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <MonitorPlay className="w-3.5 h-3.5 shrink-0" />
                  <span>1. Дайын бейне (/video.mp4)</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'link'}
                  onClick={() => setActiveTab('link')}
                  className={`inline-flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-semibold rounded-xl border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    activeTab === 'link'
                      ? highContrast
                        ? 'bg-yellow-400 text-black border-yellow-300'
                        : 'bg-teal-800 text-white border-teal-800 shadow-xs'
                      : highContrast
                        ? 'bg-neutral-900 text-neutral-200 border-neutral-700 hover:border-yellow-400'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Link2 className="w-3.5 h-3.5 shrink-0" />
                  <span>2. Сілтеме қосу (YouTube/Drive)</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'upload'}
                  onClick={() => setActiveTab('upload')}
                  className={`inline-flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-semibold rounded-xl border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    activeTab === 'upload'
                      ? highContrast
                        ? 'bg-yellow-400 text-black border-yellow-300'
                        : 'bg-teal-800 text-white border-teal-800 shadow-xs'
                      : highContrast
                        ? 'bg-neutral-900 text-neutral-200 border-neutral-700 hover:border-yellow-400'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Upload className="w-3.5 h-3.5 shrink-0" />
                  <span>3. Компьютерден жүктеу</span>
                </button>
              </div>

              {/* TAB 1: Configured Video (/video.mp4 or interactive storyboard fallback) */}
              {activeTab === 'configured' && (
                <div>
                  {/* If DEFAULT_VIDEO_CONFIG points to YouTube or Google Drive */}
                  {(configuredSource.type === 'youtube' ||
                    configuredSource.type === 'gdrive') && (
                    <div className="aspect-video w-full rounded-xl overflow-hidden border border-slate-300 bg-black">
                      <iframe
                        src={configuredSource.embedUrl}
                        title={DEFAULT_VIDEO_CONFIG.title}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  )}

                  {/* If DEFAULT_VIDEO_CONFIG points to /video.mp4 */}
                  {configuredSource.type === 'direct-video' && (
                    <div>
                      {tryNativePlayer ? (
                        <div className="space-y-3">
                          <div className="aspect-video w-full rounded-xl overflow-hidden border border-slate-300 bg-black flex items-center justify-center">
                            <video
                              src={configuredSource.embedUrl}
                              controls
                              playsInline
                              onLoadedData={() => setNativeVideoAvailable(true)}
                              onError={() => setNativeVideoAvailable(false)}
                              className="w-full h-full object-contain"
                            >
                              Сіздің браузеріңіз HTML5 бейне ойнатқышын қолдамайды.
                            </video>
                          </div>
                          {!nativeVideoAvailable && (
                            <div
                              className={`rounded-xl border p-3.5 text-xs flex flex-wrap items-center justify-between gap-3 ${
                                highContrast
                                  ? 'bg-neutral-900 border-yellow-400 text-yellow-200'
                                  : 'bg-amber-50/90 border-amber-300 text-amber-950'
                              }`}
                            >
                              <span>
                                Ескерту: <code>public/video.mp4</code> файлы әлі
                                орналастырылмаған болса, интерактивті бейнесабақ
                                режиміне оралуға немесе компьютерден файл таңдауға
                                болады.
                              </span>
                              <button
                                type="button"
                                onClick={() => setTryNativePlayer(false)}
                                className="px-3 py-1.5 font-semibold rounded-lg bg-teal-800 text-white hover:bg-teal-700 cursor-pointer whitespace-nowrap"
                              >
                                Бейнесабақ симуляторын ашу
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        /* Interactive Adapted Video Player Storyboard (Default Clean Showcase) */
                        <div
                          className={`rounded-xl border overflow-hidden ${
                            highContrast
                              ? 'bg-black border-yellow-400'
                              : 'bg-slate-900 border-slate-800 text-white'
                          }`}
                        >
                          {/* Top Player Bar */}
                          <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-slate-950/90 border-b border-slate-800 text-xs">
                            <div className="flex items-center gap-2 font-mono text-teal-300">
                              <Play className="w-3.5 h-3.5" />
                              <span>{currentScene.timeRange}</span>
                              <span aria-hidden="true">·</span>
                              <span>
                                Кадр {sceneIndex + 1} /{' '}
                                {INTERACTIVE_VIDEO_SCENES.length}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => setShowSubtitles((s) => !s)}
                                aria-pressed={showSubtitles}
                                className={`px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                                  showSubtitles
                                    ? 'bg-yellow-400 text-black'
                                    : 'bg-slate-800 text-slate-300 hover:text-white'
                                }`}
                              >
                                Субтитр (CC): {showSubtitles ? 'ҚОСУЛЫ' : 'ӨШІРУЛІ'}
                              </button>
                              <button
                                type="button"
                                onClick={() => setShowSignLanguage((s) => !s)}
                                aria-pressed={showSignLanguage}
                                className={`px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                                  showSignLanguage
                                    ? 'bg-teal-600 text-white'
                                    : 'bg-slate-800 text-slate-300 hover:text-white'
                                }`}
                              >
                                e-Ымдау: {showSignLanguage ? 'ҚОСУЛЫ' : 'ӨШІРУЛІ'}
                              </button>
                            </div>
                          </div>

                          {/* Visual Frame Stage */}
                          <div className="p-5 sm:p-6 space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                              <div className="space-y-2 flex-1">
                                <div className="text-xs font-mono uppercase tracking-wider text-teal-300">
                                  Интерактивті бейнесабақ кадры
                                </div>
                                <h4 className="text-lg sm:text-xl font-bold text-white">
                                  {currentScene.sceneTitle}
                                </h4>
                              </div>

                              {/* Sign Language / Dactyl Box */}
                              {showSignLanguage && (
                                <div className="sm:w-64 rounded-xl border border-teal-500/40 bg-teal-950/60 p-3 text-xs text-teal-100 shrink-0">
                                  <div className="font-bold text-teal-300 mb-1 flex items-center gap-1.5">
                                    <Volume2 className="w-3.5 h-3.5" />
                                    <span>Сурдопедагогикалық тірек</span>
                                  </div>
                                  <p className="leading-relaxed">
                                    {currentScene.signLanguageHint}
                                  </p>
                                </div>
                              )}
                            </div>

                            {/* Visual Adaptation Highlights inside Frame */}
                            <div className="rounded-xl bg-slate-800/80 border border-slate-700 p-4">
                              <div className="text-xs font-semibold text-slate-300 mb-2">
                                {currentScene.visualCueTitle}
                              </div>
                              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-100">
                                {currentScene.visualCuePoints.map((pt) => (
                                  <li key={pt} className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                                    <span>{pt}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* High-Contrast Synchronized Subtitle Strip */}
                            {showSubtitles && (
                              <div
                                aria-live="polite"
                                className="rounded-xl bg-black border-2 border-yellow-400 px-4 py-3 text-center"
                              >
                                <p className="text-sm sm:text-base font-bold text-yellow-300 leading-relaxed">
                                  {currentScene.narrationSubtitle}
                                </p>
                              </div>
                            )}

                            {/* Interactive Pause Checkpoint Question */}
                            <div className="rounded-xl bg-slate-950/80 border border-slate-700 p-4">
                              <div className="text-xs font-mono uppercase text-amber-300 mb-1">
                                Интерактивті үзіліс тапсырмасы (Оқушының назарын бекіту):
                              </div>
                              <p className="text-sm font-semibold text-white mb-3">
                                {currentScene.interactiveQuestion.prompt}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {currentScene.interactiveQuestion.options.map(
                                  (option, idx) => {
                                    const chosen =
                                      selectedAnswers[currentScene.id] === idx;
                                    const isCorrect =
                                      idx ===
                                      currentScene.interactiveQuestion.correctIndex;
                                    return (
                                      <button
                                        key={option}
                                        type="button"
                                        onClick={() =>
                                          setSelectedAnswers((prev) => ({
                                            ...prev,
                                            [currentScene.id]: idx,
                                          }))
                                        }
                                        className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg border transition-colors cursor-pointer ${
                                          chosen
                                            ? isCorrect
                                              ? 'bg-emerald-500 text-black border-emerald-400'
                                              : 'bg-amber-400 text-black border-amber-300'
                                            : 'bg-slate-800 text-white border-slate-600 hover:bg-slate-700'
                                        }`}
                                      >
                                        {option}
                                      </button>
                                    );
                                  }
                                )}
                              </div>
                              {selectedAnswers[currentScene.id] !== undefined && (
                                <p className="mt-2.5 text-xs font-semibold text-emerald-300">
                                  {currentScene.interactiveQuestion.feedback}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Player Transport Controls */}
                          <div className="px-4 py-3 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => setIsPlayingDemo((p) => !p)}
                                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg bg-teal-600 text-white hover:bg-teal-500 cursor-pointer"
                              >
                                <Play className="w-3.5 h-3.5" />
                                <span>
                                  {isPlayingDemo
                                    ? 'Пауза (Тоқтату)'
                                    : 'Авто-көрсетілімді бастау'}
                                </span>
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  setIsPlayingDemo(false);
                                  setSceneIndex(0);
                                }}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 cursor-pointer"
                              >
                                <RotateCcw className="w-3.5 h-3.5" />
                                <span>Басынан</span>
                              </button>
                            </div>

                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() =>
                                  setSceneIndex((i) => Math.max(0, i - 1))
                                }
                                disabled={sceneIndex === 0}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 text-white hover:bg-slate-700 disabled:opacity-40 cursor-pointer"
                              >
                                <ChevronLeft className="w-3.5 h-3.5" />
                                <span>Алдыңғы кадр</span>
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  setSceneIndex((i) =>
                                    Math.min(
                                      INTERACTIVE_VIDEO_SCENES.length - 1,
                                      i + 1
                                    )
                                  )
                                }
                                disabled={
                                  sceneIndex ===
                                  INTERACTIVE_VIDEO_SCENES.length - 1
                                }
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-yellow-400 text-black hover:bg-yellow-300 disabled:opacity-40 cursor-pointer"
                              >
                                <span>Келесі кадр</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Helper note for /video.mp4 config */}
                      <div
                        className={`mt-4 rounded-xl border p-3.5 text-xs flex flex-wrap items-center justify-between gap-2 ${
                          highContrast
                            ? 'bg-black border-neutral-700 text-neutral-300'
                            : 'bg-white border-slate-200 text-slate-600'
                        }`}
                      >
                        <span>
                          Конфигурациядағы жол:{' '}
                          <code className="font-mono font-semibold">
                            {DEFAULT_VIDEO_CONFIG.sourceUrl}
                          </code>{' '}
                          (<code>src/data/specialEduData.ts</code> ішіндегі{' '}
                          <code>DEFAULT_VIDEO_CONFIG</code>)
                        </span>
                        <button
                          type="button"
                          onClick={() => setTryNativePlayer((prev) => !prev)}
                          className={`font-semibold underline cursor-pointer ${
                            highContrast ? 'text-yellow-300' : 'text-teal-800'
                          }`}
                        >
                          {tryNativePlayer
                            ? 'Симулятор режиміне ауысу'
                            : 'HTML5 <video> ойнатқышын тексеру'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: Paste YouTube or Google Drive Link */}
              {activeTab === 'link' && (
                <div className="space-y-4">
                  <form onSubmit={handleLinkSubmit} className="space-y-3">
                    <label
                      htmlFor="video-url-input"
                      className="block text-xs sm:text-sm font-semibold"
                    >
                      YouTube немесе Google Drive сілтемесін енгізіңіз:
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        id="video-url-input"
                        type="url"
                        value={linkInput}
                        onChange={(e) => setLinkInput(e.target.value)}
                        placeholder="https://www.youtube.com/watch?v=... немесе https://drive.google.com/file/d/..."
                        className={`flex-1 px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border focus:outline-none ${
                          highContrast
                            ? 'bg-black border-yellow-400 text-white'
                            : 'bg-white border-slate-300 text-slate-900 focus:border-teal-700'
                        }`}
                      />
                      <button
                        type="submit"
                        className={`px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          highContrast
                            ? 'bg-yellow-400 text-black hover:bg-yellow-300'
                            : 'bg-teal-800 text-white hover:bg-teal-700'
                        }`}
                      >
                        Бейнені қосу
                      </button>
                    </div>
                  </form>

                  {submittedLink ? (
                    customLinkSource.type === 'invalid' ? (
                      <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-xs text-red-900">
                        Сілтеме форматы танылмады. YouTube (
                        <code>youtube.com/watch?v=...</code>,{' '}
                        <code>youtu.be/...</code>), Google Drive (
                        <code>drive.google.com/file/d/...</code>) немесе тікелей{' '}
                        <code>.mp4</code> сілтемесін енгізіңіз.
                      </div>
                    ) : customLinkSource.type === 'direct-video' ? (
                      <div className="aspect-video w-full rounded-xl overflow-hidden border border-slate-300 bg-black">
                        <video
                          src={customLinkSource.embedUrl}
                          controls
                          playsInline
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="text-xs font-mono text-teal-800 dark:text-yellow-300">
                          Embed URL: {customLinkSource.embedUrl}
                        </div>
                        <div className="aspect-video w-full rounded-xl overflow-hidden border border-slate-300 bg-black">
                          <iframe
                            src={customLinkSource.embedUrl}
                            title="Енгізілген бейімделген бейнеролик"
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      </div>
                    )
                  ) : (
                    <div
                      className={`rounded-xl border border-dashed p-8 text-center ${
                        highContrast
                          ? 'border-neutral-700 text-neutral-300'
                          : 'border-slate-300 bg-white text-slate-600'
                      }`}
                    >
                      <Link2 className="w-8 h-8 mx-auto mb-2 opacity-60" />
                      <p className="text-sm font-semibold mb-1">
                        YouTube немесе Google Drive сілтемесін жоғарыға қойыңыз
                      </p>
                      <p className="text-xs opacity-80">
                        Жүйе кез келген <code>watch?v=</code> немесе{' '}
                        <code>youtu.be/</code> сілтемесін автоматты түрде{' '}
                        <code>/embed/</code> форматына түрлендіреді.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: Local Laptop File Picker (<input type="file" accept="video/*" />) */}
              {activeTab === 'upload' && (
                <div className="space-y-4">
                  <div
                    className={`rounded-xl border-2 border-dashed p-6 text-center transition-colors ${
                      highContrast
                        ? 'bg-black border-yellow-400 text-white'
                        : 'bg-white border-slate-300 hover:border-teal-700 text-slate-700'
                    }`}
                  >
                    <Upload
                      className={`w-8 h-8 mx-auto mb-2 ${
                        highContrast ? 'text-yellow-300' : 'text-teal-700'
                      }`}
                    />
                    <p className="text-sm font-bold mb-1">
                      Компьютерден дайын бейнеролик файлын (.mp4, .webm) таңдаңыз
                    </p>
                    <p
                      className={`text-xs mb-4 ${
                        highContrast ? 'text-neutral-300' : 'text-slate-500'
                      }`}
                    >
                      Семинарда қорғау кезінде интернетсіз және серверге жүктемей-ақ
                      ноутбугіңізден тікелей ойнатуға арналған.
                    </p>

                    <input
                      ref={fileInputRef}
                      id="local-video-upload"
                      type="file"
                      accept="video/*"
                      onChange={handleFileChange}
                      className="sr-only"
                    />
                    <label
                      htmlFor="local-video-upload"
                      className={`inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-colors cursor-pointer ${
                        highContrast
                          ? 'bg-yellow-400 text-black hover:bg-yellow-300'
                          : 'bg-teal-800 text-white hover:bg-teal-700'
                      }`}
                    >
                      <Upload className="w-4 h-4" />
                      <span>Видео файлды таңдау (MP4 / WebM)</span>
                    </label>
                  </div>

                  {localFileUrl && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span>Таңдалған файл: {localFileName}</span>
                        <button
                          type="button"
                          onClick={() => {
                            URL.revokeObjectURL(localFileUrl);
                            setLocalFileUrl('');
                            setLocalFileName('');
                            if (fileInputRef.current) {
                              fileInputRef.current.value = '';
                            }
                          }}
                          className="underline text-red-600 dark:text-red-400 cursor-pointer"
                        >
                          Файлды өшіру
                        </button>
                      </div>
                      <div className="aspect-video w-full rounded-xl overflow-hidden border border-slate-300 bg-black">
                        <video
                          src={localFileUrl}
                          controls
                          playsInline
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right 5 Columns: Бейнероликтің бейімделу критерийлері (Чек-лист) */}
          <div className="lg:col-span-5">
            <div
              className={`rounded-2xl border p-5 sm:p-6 ${
                highContrast
                  ? 'bg-neutral-950 border-yellow-400 text-white'
                  : 'bg-white border-slate-200/90 text-slate-900'
              }`}
            >
              <div className="flex items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-200 dark:border-neutral-800">
                <div>
                  <div
                    className={`text-xs font-mono uppercase tracking-wider font-semibold ${
                      highContrast ? 'text-yellow-300' : 'text-teal-800'
                    }`}
                  >
                    Әдістемелік сараптама
                  </div>
                  <h3 className="text-lg font-bold mt-0.5">
                    Бейнероликтің бейімделу критерийлері (Чек-лист)
                  </h3>
                </div>
                <div
                  className={`text-sm font-mono font-bold tabular-nums px-3 py-1 rounded-lg border ${
                    highContrast
                      ? 'bg-black border-yellow-400 text-yellow-300'
                      : 'bg-teal-50 border-teal-200 text-teal-900'
                  }`}
                >
                  {checklistStats.completed}/{checklistStats.total} ({checklistStats.percentage}%)
                </div>
              </div>

              <p
                className={`text-xs sm:text-sm leading-relaxed mb-4 ${
                  highContrast ? 'text-neutral-300' : 'text-slate-600'
                }`}
              >
                БӨЖ 4 шарты: <em>«Қатысушылар таңдалған білім алушылардың нақты қажеттіліктерін ескеруі керек»</em>. Төмендегі критерийлерді белгілеп, әр бейімдеу тәсілінің негіздемесін тексеріңіз:
              </p>

              <div className="space-y-3">
                {VIDEO_ADAPTATION_CRITERIA.map((criterion) => {
                  const isChecked = checkedCriteriaIds.includes(criterion.id);
                  return (
                    <div
                      key={criterion.id}
                      className={`rounded-xl border p-4 transition-colors ${
                        highContrast
                          ? isChecked
                            ? 'bg-neutral-900 border-yellow-300'
                            : 'bg-black border-neutral-800'
                          : isChecked
                            ? 'bg-teal-50/30 border-teal-700/40'
                            : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => toggleCriterion(criterion.id)}
                        aria-pressed={isChecked}
                        className="w-full text-left flex items-start gap-3 cursor-pointer"
                      >
                        <CheckCircle2
                          className={`w-5 h-5 shrink-0 mt-0.5 transition-colors ${
                            isChecked
                              ? highContrast
                                ? 'text-yellow-300'
                                : 'text-teal-700'
                              : 'text-slate-400'
                          }`}
                        />
                        <div className="flex-1">
                          <div
                            className={`text-xs font-mono mb-0.5 ${
                              highContrast ? 'text-yellow-300' : 'text-teal-800'
                            }`}
                          >
                            {criterion.categoryLabel}
                          </div>
                          <div className="text-sm font-bold leading-snug mb-1.5">
                            {criterion.title}
                          </div>
                          <p
                            className={`text-xs leading-relaxed mb-2 ${
                              highContrast ? 'text-neutral-200' : 'text-slate-600'
                            }`}
                          >
                            {criterion.description}
                          </p>
                          <div
                            className={`text-xs pt-2 border-t ${
                              highContrast
                                ? 'border-neutral-800 text-neutral-300'
                                : 'border-slate-200/70 text-slate-500'
                            }`}
                          >
                            <span className="font-semibold">Педагогикалық негіздеме: </span>
                            <span>{criterion.rationale}</span>
                          </div>
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
