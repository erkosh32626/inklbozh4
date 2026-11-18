import {
  ProgramCategory,
  SpecialProgram,
} from '../data/specialEduData';

export interface ParsedVideoSource {
  type: 'youtube' | 'gdrive' | 'direct-video' | 'invalid';
  embedUrl: string;
  originalUrl: string;
}

/**
 * YouTube, Google Drive немесе тікелей .mp4/.webm сілтемелерін талдап,
 * iframe немесе <video> элементіне дайын URL қайтарады.
 */
export function parseVideoSourceUrl(rawInput: string): ParsedVideoSource {
  const trimmed = rawInput.trim();
  if (!trimmed) {
    return { type: 'invalid', embedUrl: '', originalUrl: '' };
  }

  // 1. Локалды жол немесе тікелей видео файлы (/video.mp4, blob:..., https://.../file.mp4)
  if (
    trimmed.startsWith('/') ||
    trimmed.startsWith('blob:') ||
    /\.(mp4|webm|ogg)(\?.*)?$/i.test(trimmed)
  ) {
    return {
      type: 'direct-video',
      embedUrl: trimmed,
      originalUrl: trimmed,
    };
  }

  try {
    const parsed = new URL(trimmed);
    const host = parsed.hostname.toLowerCase();

    // 2. YouTube сілтемелері (youtube.com/watch?v=..., youtu.be/..., youtube.com/embed/..., youtube.com/shorts/...)
    if (host.includes('youtube.com') || host.includes('youtu.be')) {
      let videoId = '';

      if (host.includes('youtu.be')) {
        videoId = parsed.pathname.replace(/^\/+/, '').split('/')[0] || '';
      } else if (parsed.pathname.startsWith('/embed/')) {
        videoId = parsed.pathname.replace('/embed/', '').split('/')[0] || '';
      } else if (parsed.pathname.startsWith('/shorts/')) {
        videoId = parsed.pathname.replace('/shorts/', '').split('/')[0] || '';
      } else {
        videoId = parsed.searchParams.get('v') || '';
      }

      const cleanId = videoId.replace(/[^a-zA-Z0-9_-]/g, '');
      if (cleanId.length >= 6) {
        return {
          type: 'youtube',
          embedUrl: `https://www.youtube.com/embed/${cleanId}?rel=0`,
          originalUrl: trimmed,
        };
      }
    }

    // 3. Google Drive сілтемелері (drive.google.com/file/d/<ID>/view -> /preview)
    if (host.includes('drive.google.com')) {
      const match = parsed.pathname.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
      if (match && match[1]) {
        return {
          type: 'gdrive',
          embedUrl: `https://drive.google.com/file/d/${match[1]}/preview`,
          originalUrl: trimmed,
        };
      }
      const idParam = parsed.searchParams.get('id');
      if (idParam) {
        return {
          type: 'gdrive',
          embedUrl: `https://drive.google.com/file/d/${idParam}/preview`,
          originalUrl: trimmed,
        };
      }
    }
  } catch {
    return { type: 'invalid', embedUrl: '', originalUrl: trimmed };
  }

  return { type: 'invalid', embedUrl: '', originalUrl: trimmed };
}

/**
 * Даму бұзылыстары бойынша білім беру бағдарламаларын санат және іздеу сөзі бойынша сүзгілейді.
 */
export function filterSpecialPrograms(
  programs: SpecialProgram[],
  selectedCategory: ProgramCategory,
  searchQuery: string
): SpecialProgram[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return programs.filter((program) => {
    const matchesCategory =
      selectedCategory === 'Барлығы' || program.category === selectedCategory;

    if (!matchesCategory) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    const searchableText = [
      program.title,
      program.code,
      program.pedagogyField,
      program.shortSummary,
      program.targetGroup,
      program.digitalSupportOnPortal,
      ...program.adaptationMethods,
      ...program.educationalTools,
    ]
      .join(' ')
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });
}

/**
 * Презентация режиміндегі («Слайд режимі») келесі немесе алдыңғы слайд индексін есептейді.
 */
export function getSteppedSlideIndex(
  currentIndex: number,
  direction: 'next' | 'prev',
  totalSlides: number
): number {
  if (totalSlides <= 0) return 0;
  if (direction === 'next') {
    return currentIndex + 1 < totalSlides ? currentIndex + 1 : currentIndex;
  }
  return currentIndex - 1 >= 0 ? currentIndex - 1 : currentIndex;
}

/**
 * Бейнероликтің бейімделу критерийлері чек-листінің орындалу пайызын есептейді.
 */
export function calculateChecklistStats(
  checkedIds: string[],
  totalCriteriaCount: number
): { completed: number; total: number; percentage: number } {
  if (totalCriteriaCount <= 0) {
    return { completed: 0, total: 0, percentage: 0 };
  }
  const uniqueChecked = new Set(checkedIds);
  const completed = Math.min(uniqueChecked.size, totalCriteriaCount);
  const percentage = Math.round((completed / totalCriteriaCount) * 100);
  return { completed, total: totalCriteriaCount, percentage };
}
