export interface VocabItem {
  id: string;
  english: string;
  spanish: string;
  phonetic: string; // E.g., "Gud mor-nin"
  category: string;
  mnemonic: string; // Gentle memory trick
  exampleEn: string;
  exampleEs: string;
  difficulty?: number;
}

export interface SRSData {
  vocabId: string;
  interval: number; // in days
  repetition: number;
  easeFactor: number;
  dueDate: string; // ISO date string YYYY-MM-DD
  lastReviewed?: string;
  masteryLevel: 'nuevo' | 'en_proceso' | 'firme' | 'dominado';
}

export interface LevelRecipe {
  id: string;
  name: string;
  description: string;
  imageEmoji: string;
  colorBg: string;
}

export interface GameLevel {
  id: number;
  title: string;
  subtitle: string;
  pastryReward: LevelRecipe;
  description: string;
  vocabItems: VocabItem[];
  unlocked: boolean;
  completed: boolean;
  stars: number;
}

export interface UserProfile {
  name: string;
  totalSugarCups: number;
  streakDays: number;
  lastActiveDate: string;
  unlockedPastries: string[]; // Pastry IDs
  nightShiftMode: boolean; // Soft warm tint & larger text for eyes/fatigue
  slowAudioDefault: boolean;
  unlockedAchievements: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  dateUnlocked?: string;
}
