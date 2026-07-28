import React, { useState } from 'react';
import { VocabItem, UserProfile } from '../types';
import { getDueItems, updateSRSProgress } from '../utils/srs';
import { speakEnglish, soundFx } from '../utils/audio';
import { Volume2, Sparkles, RefreshCw, CheckCircle2, Heart, ArrowRight } from 'lucide-react';

interface SRSReviewModalProps {
  allVocab: VocabItem[];
  profile: UserProfile;
  onClose: () => void;
  onProgressUpdated: () => void;
}

export const SRSReviewModal: React.FC<SRSReviewModalProps> = ({
  allVocab,
  profile,
  onClose,
  onProgressUpdated
}) => {
  const [dueItems, setDueItems] = useState(() => getDueItems(allVocab));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewedCount, setReviewedCount] = useState(0);

  const currentPair = dueItems[currentIndex];

  const handleFlipCard = () => {
    soundFx.playSoftTap();
    setIsFlipped(!isFlipped);
  };

  const handleSpeak = (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    speakEnglish(text, profile.slowAudioDefault);
  };

  const handleRating = (rating: 'pronto' | 'bien' | 'excelente') => {
    if (!currentPair) return;

    soundFx.playSuccessChime();
    updateSRSProgress(currentPair.item.id, rating);
    setReviewedCount(prev => prev + 1);

    setIsFlipped(false);

    if (currentIndex < dueItems.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Finished review session!
      setDueItems([]);
      onProgressUpdated();
    }
  };

  return (
    <div className="space-y-6 pb-8 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-pink-100 via-amber-50 to-rose-100 p-6 rounded-3xl border border-pink-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white text-rose-800 text-xs font-semibold border border-pink-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Repetición Espaciada Suave</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-rose-950">
            El Repaso Dulce de la Memoria
          </h2>
          <p className="text-xs text-rose-800">
            Las palabras vuelven a aparecer justo cuando tu cerebro necesita reforzarlas de forma natural.
          </p>
        </div>

        <div className="px-4 py-2 rounded-2xl bg-white text-rose-900 font-bold text-xs border border-pink-200 shadow-2xs">
          {dueItems.length > 0
            ? `${currentIndex + 1} de ${dueItems.length} palabras hoy`
            : "¡Sin repasos pendientes!"}
        </div>
      </div>

      {/* Main Review Card or Empty State */}
      {dueItems.length > 0 && currentPair ? (
        <div className="max-w-xl mx-auto space-y-6">
          {/* Flip Card Container */}
          <div
            onClick={handleFlipCard}
            className="cursor-pointer perspective-1000 select-none group min-h-[320px] relative"
          >
            <div
              className={`relative w-full min-h-[320px] transition-transform duration-500 transform-style-3d ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* Front Side */}
              <div className="absolute inset-0 w-full h-full rounded-3xl p-6 sm:p-8 border-2 bg-white border-pink-200 hover:border-pink-300 hover:shadow-lg shadow-md flex flex-col justify-between text-center backface-hidden">
                <div className="my-auto space-y-4">
                  <span className="text-xs font-bold text-pink-600 bg-pink-50 px-3 py-1 rounded-full border border-pink-100 inline-block">
                    {currentPair.item.category}
                  </span>

                  <div className="flex items-center justify-center gap-3">
                    <h3 className="font-serif text-3xl sm:text-4xl font-bold text-rose-950">
                      {currentPair.item.english}
                    </h3>
                    <button
                      onClick={(e) => handleSpeak(currentPair.item.english, e)}
                      className="p-3 rounded-2xl bg-pink-50 text-rose-700 hover:bg-pink-100 transition-colors border border-pink-200 cursor-pointer"
                      title="Escuchar pronunciación"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>

                  <p className="text-xs text-rose-500 font-medium">
                    Pronunciación: {currentPair.item.phonetic}
                  </p>

                  <div className="pt-4 text-xs font-medium text-rose-400 animate-pulse">
                    🌸 Toca la tarjeta para ver el significado y truco dulce...
                  </div>
                </div>
              </div>

              {/* Back Side */}
              <div className="absolute inset-0 w-full h-full rounded-3xl p-6 sm:p-8 border-2 bg-amber-50/95 border-amber-300 shadow-md flex flex-col justify-between text-center backface-hidden rotate-y-180 overflow-y-auto">
                <div className="my-auto space-y-4 text-left">
                  <div className="text-center">
                    <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full inline-block">
                      Significado
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-rose-950 pt-1">
                      "{currentPair.item.spanish}"
                    </h3>
                  </div>

                  {/* Mnemonic */}
                  <div className="bg-white/90 p-3.5 rounded-2xl border border-amber-200 text-xs text-amber-950 space-y-1">
                    <span className="font-bold text-amber-900 block">💡 Truco Mnemotécnico:</span>
                    <p>{currentPair.item.mnemonic}</p>
                  </div>

                  {/* Example */}
                  <div className="bg-rose-50 p-3 rounded-2xl border border-pink-200 text-xs text-rose-900 space-y-0.5">
                    <span className="font-bold block">Ejemplo:</span>
                    <p className="font-medium">"{currentPair.item.exampleEn}"</p>
                    <p className="text-rose-700 italic">"{currentPair.item.exampleEs}"</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SRS Feedback Buttons (Enabled after flipped) */}
          {isFlipped ? (
            <div className="space-y-2.5 animate-fade-in pt-1">
              <p className="text-xs sm:text-sm font-semibold text-center text-rose-900">
                ¿Qué tan cómodo fue recordar esta palabra?
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                <button
                  onClick={() => handleRating('pronto')}
                  className="w-full py-3 px-3 rounded-2xl bg-pink-100 hover:bg-pink-200 text-rose-950 font-bold text-xs sm:text-sm border border-pink-300 transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer min-h-[48px] active:scale-98"
                >
                  <span>🌸 Repasar pronto</span>
                  <span className="text-[11px] text-rose-800 font-normal">Mañana</span>
                </button>

                <button
                  onClick={() => handleRating('bien')}
                  className="w-full py-3 px-3 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold text-xs sm:text-sm border border-amber-300 transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer min-h-[48px] active:scale-98"
                >
                  <span>🧁 Bien</span>
                  <span className="text-[11px] text-amber-900 font-normal">En 3 días</span>
                </button>

                <button
                  onClick={() => handleRating('excelente')}
                  className="w-full py-3 px-3 rounded-2xl bg-emerald-100 hover:bg-emerald-200 text-emerald-950 font-bold text-xs sm:text-sm border border-emerald-300 transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer min-h-[48px] active:scale-98"
                >
                  <span>✨ ¡Dominado!</span>
                  <span className="text-[11px] text-emerald-900 font-normal">En 7+ días</span>
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={handleFlipCard}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-300 to-rose-300 text-rose-950 font-bold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all cursor-pointer min-h-[48px] active:scale-98"
            >
              Girar Tarjeta para Evaluar Memoria
            </button>
          )}
        </div>
      ) : (
        /* Empty / All Reviewed State */
        <div className="bg-white rounded-3xl p-8 border border-pink-200 text-center space-y-4 max-w-lg mx-auto shadow-sm">
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-3xl">
            🌸
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-2xl font-bold text-rose-950">
              ¡Tu memoria está totalmente al día!
            </h3>
            <p className="text-xs text-rose-800 leading-relaxed">
              Has repasado tus tarjetas pendientes. Puedes descansar tranquilamente sabiendo que tu cerebro procesa la información incluso en momentos de reposo.
            </p>
          </div>
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-400 to-pink-400 text-white font-medium text-xs sm:text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            Volver a la Ruta Pastelera
          </button>
        </div>
      )}
    </div>
  );
};
