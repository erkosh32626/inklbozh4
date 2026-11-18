import { useState } from 'react';
import {
  CheckCircle2,
  ExternalLink,
  GraduationCap,
} from 'lucide-react';

export function ConclusionAndFooter({ highContrast }: { highContrast: boolean }) {
  const [studentName, setStudentName] = useState<string>('Студент аты-жөні, тобы');
  const [isEditingStudent, setIsEditingStudent] = useState<boolean>(false);

  return (
    <>
      {/* Section 5/6: Academic Conclusion of БӨЖ 4 */}
      <section
        id="conclusion-section"
        className={`py-12 sm:py-16 border-b transition-colors ${
          highContrast
            ? 'bg-black border-neutral-800 text-white'
            : 'bg-[#F8FAFC] border-slate-200/80 text-slate-900'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl mb-8">
            <div
              className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
                highContrast ? 'text-yellow-300' : 'text-teal-800'
              }`}
            >
              05-бөлім · БӨЖ 4 қорытынды тұжырымдамасы
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
              Қорытынды және педагогикалық түйін
            </h2>
            <p
              className={`text-sm sm:text-base leading-relaxed ${
                highContrast ? 'text-neutral-300' : 'text-slate-600'
              }`}
            >
              ҚР Оқу-ағарту министрлігінің «Арнайы және инклюзивті білім беруді
              дамытудың ұлттық ғылыми-практикалық орталығы» РММ ресми порталы (
              <strong>special-edu.kz</strong>) — ерекше білім беруді қажет ететін
              балаларды оқыту мен сүйемелдеудің бірыңғай ғылыми-әдістемелік
              іргетасы.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              className={`rounded-2xl border p-6 ${
                highContrast
                  ? 'bg-neutral-950 border-yellow-400'
                  : 'bg-white border-slate-200/90'
              }`}
            >
              <div
                className={`text-xs font-mono font-semibold mb-2 ${
                  highContrast ? 'text-yellow-300' : 'text-teal-800'
                }`}
              >
                01 · НОРМАТИВТІК ЖҮЙЕЛІЛІК
              </div>
              <h3 className="text-lg font-bold mb-2">
                Үш деңгейлі үлгілік бағдарламалар
              </h3>
              <p
                className={`text-sm leading-relaxed ${
                  highContrast ? 'text-neutral-200' : 'text-slate-600'
                }`}
              >
                Мектепке дейінгі (№721), бастауыш (№51) және негізгі орта (№469)
                білім беру деңгейлерінде даму бұзылыстарының барлық 8 бағыты
                бойынша сабақтастық пен мемлекеттік стандарт талаптары толық
                сақталған.
              </p>
            </div>

            <div
              className={`rounded-2xl border p-6 ${
                highContrast
                  ? 'bg-neutral-950 border-yellow-400'
                  : 'bg-white border-slate-200/90'
              }`}
            >
              <div
                className={`text-xs font-mono font-semibold mb-2 ${
                  highContrast ? 'text-yellow-300' : 'text-teal-800'
                }`}
              >
                02 · ЦИФРЛЫҚ ИНКЛЮЗИЯ
              </div>
              <h3 className="text-lg font-bold mb-2">
                Отандық ассистивті ресурстар
              </h3>
              <p
                className={`text-sm leading-relaxed ${
                  highContrast ? 'text-neutral-200' : 'text-slate-600'
                }`}
              >
                Порталдағы «e-Ымдау», «Дактиль», қазақ тіліндегі «Сөйлеу синтезі»
                және 100% ашық PDF оқулықтар қоры есту, көру және сөйлеу қабілеті
                бұзылған оқушылардың білімге тең қол жеткізуін қамтамасыз етеді.
              </p>
            </div>

            <div
              className={`rounded-2xl border p-6 ${
                highContrast
                  ? 'bg-neutral-950 border-yellow-400'
                  : 'bg-white border-slate-200/90'
              }`}
            >
              <div
                className={`text-xs font-mono font-semibold mb-2 ${
                  highContrast ? 'text-yellow-300' : 'text-teal-800'
                }`}
              >
                03 · ПРАКТИКАЛЫҚ БЕЙІМДЕУ
              </div>
              <h3 className="text-lg font-bold mb-2">
                Қажеттілікке бағытталған медиа
              </h3>
              <p
                className={`text-sm leading-relaxed ${
                  highContrast ? 'text-neutral-200' : 'text-slate-600'
                }`}
              >
                3–5 минуттық бейімделген оқу бейнероликтерін әзірлеуде визуалды
                контрастты, синхронды субтитрді, баяу дикцияны және интерактивті
                үзілістерді қолдану оқу материалын меңгеру тиімділігін арттырады.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Reference Footer */}
      <footer
        className={`py-8 px-4 sm:px-8 transition-colors ${
          highContrast
            ? 'bg-neutral-950 text-white'
            : 'bg-white text-slate-700'
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2 text-sm font-bold">
              <CheckCircle2
                className={`w-4 h-4 ${
                  highContrast ? 'text-yellow-300' : 'text-teal-700'
                }`}
              />
              <span>Дереккөз: https://special-edu.kz/ — АИБД ҰҒПО</span>
              <span aria-hidden="true">·</span>
              <a
                href="https://special-edu.kz/"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1 underline-offset-4 hover:underline ${
                  highContrast ? 'text-yellow-300' : 'text-teal-800'
                }`}
              >
                <span>Ресми порталға сілтеме</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <p
              className={`text-xs ${
                highContrast ? 'text-neutral-300' : 'text-slate-500'
              }`}
            >
              БӨЖ 4: «Даму бұзылыстары бар оқушыларға арналған білім беру
              бағдарламалары» тақырыбындағы веб-анықтама және презентация.
            </p>
          </div>

          {/* Student Name / Group Editable Attribution */}
          <div
            className={`rounded-xl border px-4 py-2.5 flex items-center gap-3 text-xs sm:text-sm ${
              highContrast
                ? 'bg-black border-yellow-400 text-white'
                : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}
          >
            <GraduationCap
              className={`w-4 h-4 shrink-0 ${
                highContrast ? 'text-yellow-300' : 'text-teal-700'
              }`}
            />
            {isEditingStudent ? (
              <div className="flex items-center gap-2">
                <label htmlFor="student-name-input" className="sr-only">
                  Студент аты-жөні, тобы
                </label>
                <input
                  id="student-name-input"
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className={`px-2 py-1 text-xs rounded border ${
                    highContrast
                      ? 'bg-neutral-900 border-yellow-300 text-white'
                      : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setIsEditingStudent(false)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded cursor-pointer ${
                    highContrast
                      ? 'bg-yellow-400 text-black'
                      : 'bg-teal-800 text-white'
                  }`}
                >
                  Сақтау
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span>
                  <strong>Орындаған:</strong> {studentName}
                </span>
                <button
                  type="button"
                  onClick={() => setIsEditingStudent(true)}
                  className={`text-xs underline cursor-pointer ${
                    highContrast ? 'text-yellow-300' : 'text-teal-800'
                  }`}
                >
                  Өзгерту
                </button>
              </div>
            )}
          </div>
        </div>
      </footer>
    </>
  );
}
