import React from 'react';
import { GameLevel, UserProfile } from '../types';
import { DAILY_ENCOURAGEMENT_QUOTES } from '../data/courses';
import { Sparkles, Heart, Lock, CheckCircle2, ArrowRight, RefreshCw, Coffee } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface BakeryMapProps {
  levels: GameLevel[];
  profile: UserProfile;
  onSelectLevel: (level: GameLevel) => void;
  dueCount: number;
  onOpenSRS: () => void;
  onOpenTutor: () => void;
}

export const BakeryMap: React.FC<BakeryMapProps> = ({
  levels,
  profile,
  onSelectLevel,
  dueCount,
  onOpenSRS,
  onOpenTutor
}) => {
  // Pick random quote based on day
  const quoteIndex = new Date().getDate() % DAILY_ENCOURAGEMENT_QUOTES.length;
  const currentQuote = DAILY_ENCOURAGEMENT_QUOTES[quoteIndex];

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Banner & Affirmation */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-pink-100 via-rose-50 to-amber-50 p-6 sm:p-8 border border-pink-200/80 shadow-xs">
        <div className="max-w-3xl relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 text-rose-800 text-xs font-semibold border border-rose-200/60 shadow-2xs">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-300" />
            <span>Bienvenida a tu espacio seguro, {profile.name}</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-rose-950 leading-tight">
            Hoy tu cerebro aprende en paz, sin prisas ni presiones 🌸
          </h2>

          <p className="text-sm text-rose-900/80 font-serif italic bg-white/50 p-3 rounded-2xl border border-rose-100/60">
            {currentQuote}
          </p>

          {dueCount > 0 && (
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => {
                  soundFx.playSoftTap();
                  onOpenSRS();
                }}
                className="px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-400 to-rose-400 text-white font-medium text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 transform active:scale-98 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4 animate-spin-slow" />
                <span>Tienes {dueCount} palabras para tu Repaso Dulce hoy</span>
              </button>
            </div>
          )}
        </div>

        {/* Decorative Pastry Icon background */}
        <div className="absolute -right-6 -bottom-6 text-9xl opacity-15 pointer-events-none select-none">
          🍰
        </div>
      </div>

      {/* Main Path Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-xl font-bold text-rose-950 flex items-center gap-2">
              <Coffee className="w-5 h-5 text-rose-600" />
              La Ruta de los Caprichos Dulces
            </h3>
            <p className="text-xs text-rose-700/80">Sube de nivel a tu ritmo y desbloquea recetas para tu vitrina</p>
          </div>

          <button
            onClick={onOpenTutor}
            className="px-3.5 py-1.5 rounded-2xl bg-pink-100/80 hover:bg-pink-200/80 text-rose-900 border border-pink-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>💬 Madame Amélie (IA)</span>
          </button>
        </div>

        {/* Level Map Grid / Pathway */}
        <div className="relative space-y-6">
          {levels.map((level, idx) => {
            const isCurrent = level.unlocked && !level.completed;
            return (
              <div
                key={level.id}
                className={`relative rounded-3xl p-6 transition-all duration-300 border ${
                  level.completed
                    ? 'bg-emerald-50/70 border-emerald-200/80 shadow-2xs'
                    : level.unlocked
                    ? 'bg-white border-pink-200 shadow-sm hover:shadow-md ring-2 ring-pink-100/50'
                    : 'bg-stone-50/80 border-stone-200 opacity-60'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  {/* Left Info */}
                  <div className="flex items-start gap-4">
                    {/* Pastry Reward Icon Badge */}
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-xs border shrink-0 ${level.pastryReward.colorBg}`}
                    >
                      {level.pastryReward.imageEmoji}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-rose-700 uppercase tracking-wider bg-pink-50 px-2 py-0.5 rounded-md border border-pink-100">
                          Nivel {level.id}
                        </span>
                        {level.completed && (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Completado
                          </span>
                        )}
                        {isCurrent && (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full animate-bounce">
                            <Sparkles className="w-3.5 h-3.5 text-amber-600" /> ¡Nivel Actual!
                          </span>
                        )}
                      </div>

                      <h4 className="font-serif text-lg font-bold text-rose-950">
                        {level.title}
                      </h4>
                      <p className="text-xs text-rose-900/80">
                        {level.subtitle}
                      </p>
                      <p className="text-[11px] text-rose-600/70 italic">
                        Recompensa: {level.pastryReward.name}
                      </p>
                    </div>
                  </div>

                  {/* Right Action Button */}
                  <div className="w-full sm:w-auto flex items-center justify-end shrink-0">
                    {level.unlocked ? (
                      <button
                        onClick={() => {
                          soundFx.playSoftTap();
                          onSelectLevel(level);
                        }}
                        className={`w-full sm:w-auto px-5 py-2.5 rounded-2xl font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          level.completed
                            ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300'
                            : 'bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500 text-white shadow-md hover:shadow-lg transform active:scale-98'
                        }`}
                      >
                        <span>{level.completed ? "Volver a Practicar" : "Empezar Lección Relajada"}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <div className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-stone-200/80 text-stone-600 text-xs font-medium">
                        <Lock className="w-3.5 h-3.5" />
                        <span>Completa el Nivel {level.id - 1}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Vocabulary preview pills */}
                <div className="mt-4 pt-3 border-t border-pink-100/60 flex flex-wrap gap-1.5">
                  {level.vocabItems.map((v) => (
                    <span
                      key={v.id}
                      className="px-2.5 py-0.5 rounded-lg bg-pink-50/70 text-rose-900/90 text-[11px] border border-pink-100"
                    >
                      {v.english} <span className="text-rose-400">({v.spanish})</span>
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
