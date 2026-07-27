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
    <header className="sticky top-0 z-30 bg-pink-50/90 backdrop-blur-md border-b border-pink-200/60 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Brand Title */}
        <button 
          onClick={() => setActiveTab('map')}
          className="flex items-center gap-2.5 text-left group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-300 to-rose-200 flex items-center justify-center text-xl shadow-sm group-hover:scale-105 transition-transform">
            🥐
          </div>
          <div>
            <h1 className="font-serif text-lg font-bold text-rose-950 tracking-wide flex items-center gap-1.5">
              Pastry English
              <span className="text-xs font-sans font-normal px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 border border-pink-200">
                Pâtisserie Chic
              </span>
            </h1>
            <p className="text-xs text-rose-700/80 font-medium">Aprende a tu ritmo sin estrés</p>
          </div>
        </button>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 bg-white/80 p-1 rounded-2xl border border-pink-100 shadow-xs">
          <button
            onClick={() => setActiveTab('map')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all ${
              activeTab === 'map'
                ? 'bg-rose-100 text-rose-900 shadow-xs font-semibold'
                : 'text-rose-700/70 hover:text-rose-900 hover:bg-pink-50'
            }`}
          >
            <Coffee className="w-3.5 h-3.5" />
            <span>Ruta Pastelera</span>
          </button>

          <button
            onClick={() => setActiveTab('review')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all relative ${
              activeTab === 'review'
                ? 'bg-rose-100 text-rose-900 shadow-xs font-semibold'
                : 'text-rose-700/70 hover:text-rose-900 hover:bg-pink-50'
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
            className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all ${
              activeTab === 'notebook'
                ? 'bg-rose-100 text-rose-900 shadow-xs font-semibold'
                : 'text-rose-700/70 hover:text-rose-900 hover:bg-pink-50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Cuaderno</span>
          </button>

          <button
            onClick={() => setActiveTab('cabinet')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all ${
              activeTab === 'cabinet'
                ? 'bg-rose-100 text-rose-900 shadow-xs font-semibold'
                : 'text-rose-700/70 hover:text-rose-900 hover:bg-pink-50'
            }`}
          >
            <span>Vitrina</span>
            <span className="text-xs">🍰</span>
          </button>

          <button
            onClick={() => setActiveTab('tutor')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all ${
              activeTab === 'tutor'
                ? 'bg-amber-100 text-amber-900 shadow-xs font-semibold'
                : 'text-amber-800/80 hover:bg-amber-50'
            }`}
          >
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-300" />
            <span>Madame Amélie</span>
          </button>
        </nav>

        {/* User Stats & Accommodations */}
        <div className="flex items-center gap-2">
          {/* Sugar Cups (Stars) */}
          <div className="px-2.5 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold flex items-center gap-1.5 shadow-2xs">
            <span>🧁</span>
            <span>{profile.totalSugarCups} Copas</span>
          </div>

          {/* Gentle Streak */}
          <div className="px-2.5 py-1 rounded-xl bg-pink-100/80 border border-pink-200 text-rose-900 text-xs font-semibold flex items-center gap-1 shadow-2xs">
            <span>🌸</span>
            <span>{profile.streakDays} Días</span>
          </div>

          {/* Night Shift Friendly Mode Toggle */}
          <button
            onClick={toggleNightShiftMode}
            title={profile.nightShiftMode ? "Modo descanso activado (tonos cálidos)" : "Activar modo luz suave"}
            className={`p-1.5 rounded-xl border transition-colors ${
              profile.nightShiftMode
                ? 'bg-amber-100 border-amber-300 text-amber-900'
                : 'bg-white border-pink-200 text-rose-700 hover:bg-pink-50'
            }`}
          >
            {profile.nightShiftMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          {/* Audio Slow Mode Toggle */}
          <button
            onClick={toggleSlowAudio}
            title={profile.slowAudioDefault ? "Audio lento (Paso a paso)" : "Audio normal"}
            className={`p-1.5 rounded-xl border transition-colors ${
              profile.slowAudioDefault
                ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
                : 'bg-white border-pink-200 text-rose-700 hover:bg-pink-50'
            }`}
          >
            {profile.slowAudioDefault ? <VolumeX className="w-4 h-4 text-emerald-700" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
