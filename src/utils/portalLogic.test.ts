import test from 'node:test';
import assert from 'node:assert/strict';
import {
  parseVideoSourceUrl,
  filterSpecialPrograms,
  getSteppedSlideIndex,
  calculateChecklistStats,
} from './portalLogic';
import { SPECIAL_PROGRAMS } from '../data/specialEduData';

test('parseVideoSourceUrl converts YouTube watch, short, and Google Drive URLs to embed URLs', () => {
  const ytWatch = parseVideoSourceUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  assert.equal(ytWatch.type, 'youtube');
  assert.equal(ytWatch.embedUrl, 'https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0');

  const ytShort = parseVideoSourceUrl('https://youtu.be/dQw4w9WgXcQ?t=15');
  assert.equal(ytShort.type, 'youtube');
  assert.equal(ytShort.embedUrl, 'https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0');

  const gdrive = parseVideoSourceUrl('https://drive.google.com/file/d/1AbCdEfGhIjKlMnOpQrStUvWxYz/view?usp=sharing');
  assert.equal(gdrive.type, 'gdrive');
  assert.equal(gdrive.embedUrl, 'https://drive.google.com/file/d/1AbCdEfGhIjKlMnOpQrStUvWxYz/preview');

  const localVideo = parseVideoSourceUrl('/video.mp4');
  assert.equal(localVideo.type, 'direct-video');
  assert.equal(localVideo.embedUrl, '/video.mp4');
});

test('filterSpecialPrograms filters by category and Kazakh search query', () => {
  const all = filterSpecialPrograms(SPECIAL_PROGRAMS, 'Барлығы', '');
  assert.equal(all.length, 7);

  const sensory = filterSpecialPrograms(SPECIAL_PROGRAMS, 'Сенсорлық', '');
  assert.equal(sensory.length, 2);

  const brailleSearch = filterSpecialPrograms(SPECIAL_PROGRAMS, 'Барлығы', 'Брайль');
  assert.equal(brailleSearch.length, 1);
  assert.equal(brailleSearch[0]?.id, 'visual-impairment');

  const autismSearch = filterSpecialPrograms(SPECIAL_PROGRAMS, 'Аутизм спектрі', 'TEACCH');
  assert.equal(autismSearch.length, 1);
  assert.equal(autismSearch[0]?.id, 'autism-spectrum');
});

test('getSteppedSlideIndex clamps slide navigation within bounds', () => {
  assert.equal(getSteppedSlideIndex(0, 'prev', 6), 0);
  assert.equal(getSteppedSlideIndex(0, 'next', 6), 1);
  assert.equal(getSteppedSlideIndex(5, 'next', 6), 5);
  assert.equal(getSteppedSlideIndex(5, 'prev', 6), 4);
});

test('calculateChecklistStats computes progress percentage accurately', () => {
  const stats = calculateChecklistStats(['visual-clarity', 'subtitles-diction'], 4);
  assert.equal(stats.completed, 2);
  assert.equal(stats.total, 4);
  assert.equal(stats.percentage, 50);
});
