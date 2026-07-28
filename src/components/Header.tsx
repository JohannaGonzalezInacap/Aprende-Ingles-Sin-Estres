import React from 'react';
import { UserProfile } from '../types';
import { Sparkles, Moon, Sun, Volume2, VolumeX, BookOpen, Heart, Coffee } from 'lucide-react';

interface HeaderProps {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  activeTab: 'map' | 'review' | 'notebook' | 'cabinet' | 'tutor';
  setActiveTab: (tab: 'map' | 'review' | 'notebook' | 'cabinet' | 'tutor') => void;
  dueCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  setProfile,
  activeTab,
  setActiveTab,
  dueCount
}) => {
  const toggleNightShiftMode = () => {
    setProfile(prev => ({
      ...prev,
      nightShiftMode: !prev.nightShiftMode
    }));
  };

  const toggleSlowAudio = () => {
    setProfile(prev => ({
      ...prev,
      slowAudioDefault: !prev.slowAudioDefault
    }));
  };

  return (
    <header className="sticky top-0 z-30 bg-pink-50/95 backdrop-blur-md border-b border-pink-200/80 transition-colors duration-300 shadow-2xs">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 space-y-2">
        {/* Top Row: Brand & User Profile Stats */}
        <div className="flex items-center justify-between gap-2">
          {/* Brand Title */}
          <button 
            onClick={() => setActiveTab('map')}
            className="flex items-center gap-2 text-left group focus:outline-none shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-pink-300 to-rose-200 flex items-center justify-center text-lg sm:text-xl shadow-xs group-hover:scale-105 transition-transform">
              🥐
            </div>
            <div>
              <h1 className="font-serif text-base sm:text-lg font-bold text-rose-950 tracking-wide flex items-center gap-1.5">
                Pastry English
                <span className="hidden sm:inline-block text-[10px] sm:text-xs font-sans font-normal px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 border border-pink-200">
                  Pâtisserie Chic
                </span>
              </h1>
              <p className="text-[10px] sm:text-xs text-rose-700/80 font-medium">Aprende a tu ritmo sin estrés</p>
            </div>
          </button>

          {/* User Stats & Accommodations */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Sugar Cups (Stars) */}
            <div className="px-2 sm:px-2.5 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] sm:text-xs font-semibold flex items-center gap-1 shadow-2xs">
              <span>🧁</span>
              <span>{profile.totalSugarCups}</span>
              <span className="hidden sm:inline">Copas</span>
            </div>

            {/* Gentle Streak */}
            <div className="px-2 sm:px-2.5 py-1 rounded-xl bg-pink-100/80 border border-pink-200 text-rose-900 text-[11px] sm:text-xs font-semibold flex items-center gap-1 shadow-2xs">
              <span>🌸</span>
              <span>{profile.streakDays}d</span>
            </div>

            {/* Night Shift Friendly Mode Toggle */}
            <button
              onClick={toggleNightShiftMode}
              title={profile.nightShiftMode ? "Modo descanso activado (tonos cálidos)" : "Activar modo luz suave"}
              className={`p-1.5 sm:p-2 rounded-xl border transition-colors cursor-pointer ${
                profile.nightShiftMode
                  ? 'bg-amber-100 border-amber-300 text-amber-900'
                  : 'bg-white border-pink-200 text-rose-700 hover:bg-pink-50'
              }`}
            >
              {profile.nightShiftMode ? <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            </button>

            {/* Audio Slow Mode Toggle */}
            <button
              onClick={toggleSlowAudio}
              title={profile.slowAudioDefault ? "Audio lento (Paso a paso)" : "Audio normal"}
              className={`p-1.5 sm:p-2 rounded-xl border transition-colors cursor-pointer ${
                profile.slowAudioDefault
                  ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
                  : 'bg-white border-pink-200 text-rose-700 hover:bg-pink-50'
              }`}
            >
              {profile.slowAudioDefault ? <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-700" /> : <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            </button>
          </div>
        </div>

        {/* Navigation Tabs - Horizontally scrollable on mobile for easy touching */}
        <nav className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 max-w-full">
          <button
            onClick={() => setActiveTab('map')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 whitespace-nowrap transition-all shrink-0 cursor-pointer ${
              activeTab === 'map'
                ? 'bg-rose-100 text-rose-950 shadow-xs font-bold border border-rose-200'
                : 'bg-white/80 text-rose-800/80 hover:text-rose-900 hover:bg-pink-50 border border-pink-100'
            }`}
          >
            <Coffee className="w-3.5 h-3.5 text-rose-600" />
            <span>Ruta Pastelera</span>
          </button>

          <button
            onClick={() => setActiveTab('review')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 whitespace-nowrap transition-all relative shrink-0 cursor-pointer ${
              activeTab === 'review'
                ? 'bg-rose-100 text-rose-950 shadow-xs font-bold border border-rose-200'
                : 'bg-white/80 text-rose-800/80 hover:text-rose-900 hover:bg-pink-50 border border-pink-100'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Repaso Dulce</span>
            {dueCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-pink-500 text-white animate-pulse">
                {dueCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('notebook')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 whitespace-nowrap transition-all shrink-0 cursor-pointer ${
              activeTab === 'notebook'
                ? 'bg-rose-100 text-rose-950 shadow-xs font-bold border border-rose-200'
                : 'bg-white/80 text-rose-800/80 hover:text-rose-900 hover:bg-pink-50 border border-pink-100'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-rose-600" />
            <span>Cuaderno</span>
          </button>

          <button
            onClick={() => setActiveTab('cabinet')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 whitespace-nowrap transition-all shrink-0 cursor-pointer ${
              activeTab === 'cabinet'
                ? 'bg-rose-100 text-rose-950 shadow-xs font-bold border border-rose-200'
                : 'bg-white/80 text-rose-800/80 hover:text-rose-900 hover:bg-pink-50 border border-pink-100'
            }`}
          >
            <span>Vitrina 🍰</span>
          </button>

          <button
            onClick={() => setActiveTab('tutor')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 whitespace-nowrap transition-all shrink-0 cursor-pointer ${
              activeTab === 'tutor'
                ? 'bg-amber-100 text-amber-950 shadow-xs font-bold border border-amber-300'
                : 'bg-white/80 text-amber-800/90 hover:bg-amber-50 border border-pink-100'
            }`}
          >
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-300" />
            <span>Madame Amélie</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
