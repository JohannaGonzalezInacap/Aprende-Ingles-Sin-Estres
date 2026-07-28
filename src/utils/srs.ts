import { SRSData, VocabItem } from '../types';

const SRS_STORAGE_KEY = 'pastry_english_srs_v1';

export function getStoredSRSData(): Record<string, SRSData> {
  try {
    const raw = localStorage.getItem(SRS_STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to load SRS data from storage:", e);
    return {};
  }
}

export function saveSRSData(data: Record<string, SRSData>): void {
  try {
    localStorage.setItem(SRS_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Failed to save SRS data to storage:", e);
  }
}

// Get SRS entry for a specific vocabulary ID, or create default
export function getOrCreateSRSEntry(vocabId: string): SRSData {
  const allData = getStoredSRSData();
  if (allData[vocabId]) {
    return allData[vocabId];
  }

  const todayStr = new Date().toISOString().split('T')[0];
  const newEntry: SRSData = {
    vocabId,
    interval: 1,
    repetition: 0,
    easeFactor: 2.5,
    dueDate: todayStr,
    masteryLevel: 'nuevo'
  };

  allData[vocabId] = newEntry;
  saveSRSData(allData);
  return newEntry;
}

/**
 * Super Gentle Spaced Repetition Update
 * Rating:
 * 'pronto' -> review tomorrow (interval 1 day)
 * 'bien' -> review in 3 days
 * 'excelente' -> review in 7 days or more
 */
export function updateSRSProgress(
  vocabId: string,
  rating: 'pronto' | 'bien' | 'excelente'
): SRSData {
  const allData = getStoredSRSData();
  const current = getOrCreateSRSEntry(vocabId);

  let newInterval = 1;
  let newRepetition = current.repetition + 1;
  let newEase = current.easeFactor;
  let newMastery: SRSData['masteryLevel'] = current.masteryLevel;

  if (rating === 'pronto') {
    newInterval = 1;
    newMastery = 'en_proceso';
  } else if (rating === 'bien') {
    if (current.repetition === 0) {
      newInterval = 2;
    } else if (current.repetition === 1) {
      newInterval = 4;
    } else {
      newInterval = Math.round(current.interval * 2);
    }
    newMastery = 'firme';
  } else if (rating === 'excelente') {
    if (current.repetition === 0) {
      newInterval = 3;
    } else {
      newInterval = Math.round(current.interval * 2.5 + 2);
    }
    newEase = Math.min(newEase + 0.1, 3.0);
    newMastery = 'dominado';
  }

  const today = new Date();
  const nextDueDate = new Date(today);
  nextDueDate.setDate(nextDueDate.getDate() + newInterval);
  const nextDueDateStr = nextDueDate.toISOString().split('T')[0];
  const todayStr = today.toISOString().split('T')[0];

  const updatedEntry: SRSData = {
    vocabId,
    interval: newInterval,
    repetition: newRepetition,
    easeFactor: newEase,
    dueDate: nextDueDateStr,
    lastReviewed: todayStr,
    masteryLevel: newMastery
  };

  allData[vocabId] = updatedEntry;
  saveSRSData(allData);
  return updatedEntry;
}

export function getDueItems(allVocab: VocabItem[]): { item: VocabItem; srs: SRSData }[] {
  const allData = getStoredSRSData();
  const todayStr = new Date().toISOString().split('T')[0];

  return allVocab
    .map(item => {
      const srs = allData[item.id] || {
        vocabId: item.id,
        interval: 1,
        repetition: 0,
        easeFactor: 2.5,
        dueDate: todayStr,
        masteryLevel: 'nuevo' as const
      };
      return { item, srs };
    })
    .filter(({ srs }) => srs.dueDate <= todayStr || srs.repetition === 0);
}
