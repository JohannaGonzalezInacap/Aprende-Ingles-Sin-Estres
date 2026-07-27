import React, { useState, useEffect } from 'react';
import { GameLevel, UserProfile, VocabItem } from './types';
import { INITIAL_LEVELS, INITIAL_ACHIEVEMENTS } from './data/courses';
import { Header } from './components/Header';
import { BakeryMap } from './components/BakeryMap';
import { LessonModal } from './components/LessonModal';
import { SRSReviewModal } from './components/SRSReviewModal';
import { MemoryNotebook } from './components/MemoryNotebook';
import { PastryCabinet } from './components/PastryCabinet';
import { TutorChatModal } from './components/TutorChatModal';
import { getDueItems, getStoredSRSData } from './utils/srs';

const PROFILE_STORAGE_KEY = 'pastry_english_profile_v1';
const LEVELS_STORAGE_KEY = 'pastry_english_levels_v1';

export default function App() {
  // Initialize Profile
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(PROFILE_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to load profile:", e);
    }
    return {
      name: "Chef",
      totalSugarCups: 10,
      streakDays: 3,
      lastActiveDate: new Date().toISOString().split('T')[0],
      unlockedPastries: ["croissant_mantequilla"],
      nightShiftMode: false,
      slowAudioDefault: true,
      unlockedAchievements: ["primer_paso"]
    };
  });

  // Initialize Levels
  const [levels, setLevels] = useState<GameLevel[]>(() => {
    try {
      const saved = localStorage.getItem(LEVELS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to load levels:", e);
    }
    return INITIAL_LEVELS;
  });

  // Active Tab
  const [activeTab, setActiveTab] = useState<'map' | 'review' | 'notebook' | 'cabinet' | 'tutor'>('map');

  // Currently Selected Level Modal
  const [selectedLevel, setSelectedLevel] = useState<GameLevel | null>(null);

  // Collect all vocab items across all levels
  const allVocabItems: VocabItem[] = React.useMemo(() => {
    return levels.flatMap(l => l.vocabItems);
  }, [levels]);

  // SRS due items count
  const [dueCount, setDueCount] = useState<number>(() => getDueItems(allVocabItems).length);

  const refreshDueCount = () => {
    setDueCount(getDueItems(allVocabItems).length);
  };

  // Save state updates
  useEffect(() => {
    try {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.error("Error saving profile:", e);
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem(LEVELS_STORAGE_KEY, JSON.stringify(levels));
    } catch (e) {
      console.error("Error saving levels:", e);
    }
  }, [levels]);

  useEffect(() => {
    refreshDueCount();
  }, [levels]);

  // Handle completing a level
  const handleCompleteLevel = (levelId: number, sugarCupsEarned: number, pastryId: string) => {
    // 1. Update Levels: Mark current level complete, unlock next level
    setLevels(prevLevels => {
      return prevLevels.map(lvl => {
        if (lvl.id === levelId) {
          return { ...lvl, completed: true, stars: 3 };
        }
        if (lvl.id === levelId + 1) {
          return { ...lvl, unlocked: true };
        }
        return lvl;
      });
    });

    // 2. Update Profile stats & pastries
    setProfile(prev => {
      const newPastries = prev.unlockedPastries.includes(pastryId)
        ? prev.unlockedPastries
        : [...prev.unlockedPastries, pastryId];

      const newAchievements = prev.unlockedAchievements.includes("primer_paso")
        ? prev.unlockedAchievements
        : [...prev.unlockedAchievements, "primer_paso"];

      return {
        ...prev,
        totalSugarCups: prev.totalSugarCups + sugarCupsEarned,
        unlockedPastries: newPastries,
        unlockedAchievements: newAchievements
      };
    });

    // Close lesson overlay
    setSelectedLevel(null);
  };

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        profile.nightShiftMode
          ? 'bg-[#FAF6F0] text-rose-950 sepia-[0.08]'
          : 'bg-[#FFFDF9] text-rose-950'
      }`}
    >
      {/* Top Navigation Bar */}
      <Header
        profile={profile}
        setProfile={setProfile}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        dueCount={dueCount}
      />

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 pt-6">
        {activeTab === 'map' && (
          <BakeryMap
            levels={levels}
            profile={profile}
            onSelectLevel={(lvl) => setSelectedLevel(lvl)}
            dueCount={dueCount}
            onOpenSRS={() => setActiveTab('review')}
            onOpenTutor={() => setActiveTab('tutor')}
          />
        )}

        {activeTab === 'review' && (
          <SRSReviewModal
            allVocab={allVocabItems}
            profile={profile}
            onClose={() => setActiveTab('map')}
            onProgressUpdated={refreshDueCount}
          />
        )}

        {activeTab === 'notebook' && (
          <MemoryNotebook allVocab={allVocabItems} profile={profile} />
        )}

        {activeTab === 'cabinet' && (
          <PastryCabinet levels={levels} profile={profile} />
        )}

        {activeTab === 'tutor' && (
          <TutorChatModal profile={profile} />
        )}
      </main>

      {/* Interactive Level Modal Overlay */}
      {selectedLevel && (
        <LessonModal
          level={selectedLevel}
          profile={profile}
          onClose={() => setSelectedLevel(null)}
          onCompleteLevel={handleCompleteLevel}
        />
      )}

      {/* Footer */}
      <footer className="mt-12 py-6 border-t border-pink-200/60 text-center text-xs text-rose-700/70">
        <div className="max-w-4xl mx-auto px-4 space-y-1">
          <p className="font-serif italic">
            Pastry English • Creado con amor para aprender inglés sin estrés, a tu ritmo y disfrutando del proceso. 🌸
          </p>
          <p className="text-[11px] text-rose-500/60">
            Repetición espaciada suave • Refuerzo positivo constante • Estética Pastelería Chic
          </p>
        </div>
      </footer>
    </div>
  );
}
