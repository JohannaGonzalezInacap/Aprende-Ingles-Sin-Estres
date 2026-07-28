import React from 'react';
import { GameLevel, Achievement, UserProfile } from '../types';
import { INITIAL_ACHIEVEMENTS } from '../data/courses';
import { Sparkles, Trophy, Heart, Award, CheckCircle2 } from 'lucide-react';

interface PastryCabinetProps {
  levels: GameLevel[];
  profile: UserProfile;
}

export const PastryCabinet: React.FC<PastryCabinetProps> = ({ levels, profile }) => {
  return (
    <div className="space-y-6 sm:space-y-8 pb-12 animate-fade-in">
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-100 via-pink-100 to-rose-100 p-5 sm:p-8 rounded-3xl border border-pink-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white text-rose-800 text-xs font-semibold border border-pink-200">
            <Trophy className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>Colección de Superación Personal</span>
          </div>
          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-rose-950">
            Mi Vitrina de Pasteles Chic
          </h2>
          <p className="text-xs text-rose-800">
            Cada postre desbloqueado es el reflejo de tu constancia, valentía y amor propio.
          </p>
        </div>

        <div className="px-3.5 py-2 rounded-2xl bg-white text-rose-950 font-bold text-xs border border-pink-200 shadow-2xs flex items-center gap-2 shrink-0">
          <span className="text-lg">🧁</span>
          <span>{profile.totalSugarCups} Copas Totales</span>
        </div>
      </div>

      {/* Unlocked Pastries Cabinet */}
      <div className="space-y-3 sm:space-y-4">
        <h3 className="font-serif text-lg sm:text-xl font-bold text-rose-950 flex items-center gap-2">
          <span>🍰</span>
          <span>Recetas Desbloqueadas en tu Pastelería</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {levels.map((lvl) => {
            const isUnlocked = profile.unlockedPastries.includes(lvl.pastryReward.id) || lvl.completed;

            return (
              <div
                key={lvl.pastryReward.id}
                className={`rounded-3xl p-5 sm:p-6 border transition-all space-y-3 relative overflow-hidden ${
                  isUnlocked
                    ? `${lvl.pastryReward.colorBg} border-pink-300/80 shadow-sm hover:scale-102`
                    : 'bg-stone-50 border-stone-200 opacity-50'
                }`}
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/80 flex items-center justify-center text-3xl sm:text-4xl shadow-xs border border-white/60">
                  {lvl.pastryReward.imageEmoji}
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-white/60 text-rose-900 border border-white/40">
                    Nivel {lvl.id}
                  </span>
                  <h4 className="font-serif text-base sm:text-lg font-bold text-rose-950">
                    {lvl.pastryReward.name}
                  </h4>
                  <p className="text-xs text-rose-900/80 leading-relaxed">
                    {lvl.pastryReward.description}
                  </p>
                </div>

                {isUnlocked ? (
                  <div className="pt-1 flex items-center gap-1 text-[11px] font-bold text-emerald-800">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Desbloqueado en tu Vitrina</span>
                  </div>
                ) : (
                  <div className="pt-1 text-[11px] font-semibold text-stone-500">
                    🔒 Desbloquéalo completando el Nivel {lvl.id}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievements & Badges */}
      <div className="space-y-3 sm:space-y-4">
        <h3 className="font-serif text-lg sm:text-xl font-bold text-rose-950 flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-500 shrink-0" />
          <span>Logros del Corazón</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {INITIAL_ACHIEVEMENTS.map((ach) => {
            const isUnlocked = profile.unlockedAchievements.includes(ach.id);

            return (
              <div
                key={ach.id}
                className={`p-4 sm:p-5 rounded-3xl border transition-all flex items-start gap-3 sm:gap-3.5 ${
                  isUnlocked
                    ? 'bg-gradient-to-br from-amber-50 to-pink-50 border-amber-200/80 shadow-2xs'
                    : 'bg-stone-50 border-stone-200 opacity-50'
                }`}
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white flex items-center justify-center text-xl sm:text-2xl shadow-2xs border border-pink-100 shrink-0">
                  {ach.icon}
                </div>

                <div className="space-y-1">
                  <h4 className="font-serif text-xs sm:text-sm font-bold text-rose-950">
                    {ach.title}
                  </h4>
                  <p className="text-xs text-rose-800 leading-snug">
                    {ach.description}
                  </p>
                  {isUnlocked && (
                    <span className="inline-block pt-0.5 text-[10px] font-bold text-emerald-700">
                      ✨ Conquistado
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
