import React, { useState } from 'react';
import { GameLevel, VocabItem, UserProfile } from '../types';
import { Volume2, Sparkles, Check, ArrowRight, Heart, BookOpen, RefreshCw, X, HelpCircle } from 'lucide-react';
import { speakEnglish, soundFx } from '../utils/audio';
import { updateSRSProgress } from '../utils/srs';

interface LessonModalProps {
  level: GameLevel;
  profile: UserProfile;
  onClose: () => void;
  onCompleteLevel: (levelId: number, sugarCupsEarned: number, pastryId: string) => void;
}

export const LessonModal: React.FC<LessonModalProps> = ({
  level,
  profile,
  onClose,
  onCompleteLevel
}) => {
  // Stages: 1: Discover, 2: Puzzle, 3: Quiz, 4: Story, 5: Reward
  const [stage, setStage] = useState<number>(1);
  const [vocabIndex, setVocabIndex] = useState<number>(0);

  // Puzzle State
  const [assembledWords, setAssembledWords] = useState<string[]>([]);
  const [puzzleFeedback, setPuzzleFeedback] = useState<string | null>(null);

  // Quiz State
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<string | null>(null);

  const currentVocab: VocabItem = level.vocabItems[vocabIndex] || level.vocabItems[0];

  // Speech Helper
  const handleListen = (text: string) => {
    speakEnglish(text, profile.slowAudioDefault);
    soundFx.playSoftTap();
  };

  // Move to next word in Discover mode
  const handleNextDiscoverWord = () => {
    soundFx.playSoftTap();
    if (vocabIndex < level.vocabItems.length - 1) {
      setVocabIndex(prev => prev + 1);
    } else {
      // Move to Stage 2: Puzzle
      setVocabIndex(0);
      setStage(2);
      resetPuzzleForIndex(0);
    }
  };

  // Prepare puzzle words for sentence building
  const resetPuzzleForIndex = (index: number) => {
    const item = level.vocabItems[index];
    if (!item) return;
    setAssembledWords([]);
    setPuzzleFeedback(null);
  };

  // Get shuffled words for puzzle
  const targetWords = currentVocab.exampleEn.split(' ');
  const shuffledPuzzleWords = React.useMemo(() => {
    return [...targetWords].sort(() => Math.random() - 0.5);
  }, [currentVocab.id]);

  const handleSelectPuzzleWord = (word: string, index: number) => {
    soundFx.playSoftTap();
    setAssembledWords(prev => [...prev, word]);
  };

  const handleRemovePuzzleWord = (wordIndex: number) => {
    soundFx.playSoftTap();
    setAssembledWords(prev => prev.filter((_, idx) => idx !== wordIndex));
  };

  const handleVerifyPuzzle = () => {
    const currentBuilt = assembledWords.join(' ');
    if (currentBuilt.toLowerCase() === currentVocab.exampleEn.toLowerCase()) {
      soundFx.playSuccessChime();
      setPuzzleFeedback('🌸 ¡Perfecto! Tu frase quedó perfecta y natural.');
      
      // Update SRS progress gently
      updateSRSProgress(currentVocab.id, 'excelente');

      setTimeout(() => {
        if (vocabIndex < level.vocabItems.length - 1) {
          const nextIdx = vocabIndex + 1;
          setVocabIndex(nextIdx);
          resetPuzzleForIndex(nextIdx);
        } else {
          // Move to Stage 3: Quiz
          setVocabIndex(0);
          setStage(3);
          setSelectedOption(null);
          setQuizFeedback(null);
        }
      }, 1200);
    } else {
      soundFx.playEncouragementSparkle();
      setPuzzleFeedback(`🌸 ¡Casi casi! La frase exacta es: "${currentVocab.exampleEn}". ¡Tranquila, tómate tu tiempo!`);
    }
  };

  // Quiz Handling
  const handleQuizAnswer = (option: string) => {
    soundFx.playSoftTap();
    setSelectedOption(option);

    if (option === currentVocab.spanish) {
      soundFx.playSuccessChime();
      setQuizFeedback('✨ ¡Excelente respuesta! Tu memoria está cada vez más fuerte.');
      updateSRSProgress(currentVocab.id, 'bien');

      setTimeout(() => {
        if (vocabIndex < level.vocabItems.length - 1) {
          setVocabIndex(prev => prev + 1);
          setSelectedOption(null);
          setQuizFeedback(null);
        } else {
          // Move to Stage 4: Story
          setStage(4);
        }
      }, 1200);
    } else {
      soundFx.playEncouragementSparkle();
      setQuizFeedback(`🌷 Sin presiones: "${currentVocab.english}" significa "${currentVocab.spanish}". ¡Vamos a recordarla juntas!`);
    }
  };

  // Finish Lesson
  const handleFinishLesson = () => {
    soundFx.playSuccessChime();
    onCompleteLevel(level.id, 25, level.pastryReward.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rose-950/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-pink-200 relative overflow-hidden max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-pink-50 text-rose-700 hover:bg-pink-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Progress Tracker */}
        <div className="mb-6 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-rose-800">
            <span>Nivel {level.id}: {level.title}</span>
            <span className="px-2 py-0.5 rounded-full bg-pink-100 text-pink-700">
              Etapa {stage} de 5
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-pink-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-pink-400 to-rose-400 h-full transition-all duration-500 rounded-full"
              style={{ width: `${(stage / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* STAGE 1: Descubrir (Vocabulary Flashcards) */}
        {stage === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-1">
              <span className="text-xs font-bold text-rose-600 bg-pink-50 px-3 py-1 rounded-full border border-pink-100">
                Paso 1: Descubrir Vocabulario ({vocabIndex + 1}/{level.vocabItems.length})
              </span>
              <h3 className="font-serif text-2xl font-bold text-rose-950 pt-2">
                Escucha y conecta sin juzgarte 🌸
              </h3>
            </div>

            {/* Main Word Card */}
            <div className="bg-gradient-to-b from-pink-50/80 to-amber-50/50 rounded-3xl p-6 sm:p-8 border border-pink-200 shadow-sm space-y-5 text-center relative">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-3">
                  <h4 className="font-serif text-3xl sm:text-4xl font-bold text-rose-950 tracking-wide">
                    {currentVocab.english}
                  </h4>
                  <button
                    onClick={() => handleListen(currentVocab.english)}
                    className="p-3 rounded-2xl bg-white text-rose-700 shadow-sm hover:scale-105 active:scale-95 transition-all border border-pink-200 cursor-pointer"
                    title="Escuchar pronunciación"
                  >
                    <Volume2 className="w-6 h-6 text-rose-600" />
                  </button>
                </div>

                <p className="text-xs font-medium text-rose-600 bg-white/80 inline-block px-3 py-1 rounded-full border border-pink-100">
                  Pronunciación fácil: <span className="font-bold">{currentVocab.phonetic}</span>
                </p>
              </div>

              <div className="pt-2 border-t border-pink-200/60">
                <p className="text-xl font-semibold text-rose-900">
                  "{currentVocab.spanish}"
                </p>
              </div>

              {/* Memory Trick / Mnemonic */}
              <div className="bg-white/90 p-4 rounded-2xl border border-pink-100 text-left space-y-1.5 shadow-2xs">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Truco Dulce para tu Memoria:</span>
                </div>
                <p className="text-xs text-rose-900/90 leading-relaxed">
                  {currentVocab.mnemonic}
                </p>
              </div>

              {/* Example Sentence */}
              <div className="text-left bg-rose-50/80 p-3.5 rounded-2xl border border-rose-100 text-xs space-y-1">
                <span className="font-bold text-rose-800">Ejemplo en frase:</span>
                <p className="text-rose-950 font-medium">"{currentVocab.exampleEn}"</p>
                <p className="text-rose-700 italic">"{currentVocab.exampleEs}"</p>
              </div>
            </div>

            {/* Discover Action Button */}
            <button
              onClick={handleNextDiscoverWord}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-400 to-pink-400 text-white font-medium text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{vocabIndex < level.vocabItems.length - 1 ? "Siguiente Palabra Dulce" : "Continuar al Puzle de Frases"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STAGE 2: Puzle Dulce (Word Assembly) */}
        {stage === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-1">
              <span className="text-xs font-bold text-rose-600 bg-pink-50 px-3 py-1 rounded-full border border-pink-100">
                Paso 2: Puzle Dulce ({vocabIndex + 1}/{level.vocabItems.length})
              </span>
              <h3 className="font-serif text-2xl font-bold text-rose-950 pt-1">
                Arma la frase paso a paso 🧁
              </h3>
              <p className="text-xs text-rose-700">Traduce al inglés: "{currentVocab.exampleEs}"</p>
            </div>

            {/* Assembled Phrase Drop Area */}
            <div className="min-h-16 p-4 rounded-2xl bg-pink-50/80 border-2 border-dashed border-pink-200 flex flex-wrap items-center gap-2 justify-center">
              {assembledWords.length === 0 ? (
                <span className="text-xs text-rose-400 italic">Toca las fichas de abajo para formar la frase...</span>
              ) : (
                assembledWords.map((word, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleRemovePuzzleWord(idx)}
                    className="px-3.5 py-1.5 rounded-xl bg-white text-rose-950 font-semibold text-xs border border-pink-300 shadow-2xs hover:bg-rose-100 transition-colors cursor-pointer"
                  >
                    {word} ×
                  </button>
                ))
              )}
            </div>

            {/* Available Shuffled Words */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {shuffledPuzzleWords.map((word, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectPuzzleWord(word, idx)}
                  className="px-4 py-2 rounded-2xl bg-white text-rose-900 font-medium text-xs border border-pink-200 shadow-xs hover:border-rose-400 hover:bg-pink-50 transition-all active:scale-95 cursor-pointer"
                >
                  {word}
                </button>
              ))}
            </div>

            {puzzleFeedback && (
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium text-center animate-fade-in">
                {puzzleFeedback}
              </div>
            )}

            <div className="flex items-center gap-3">
              <button
                onClick={() => resetPuzzleForIndex(vocabIndex)}
                className="px-4 py-3 rounded-2xl bg-pink-50 text-rose-700 hover:bg-pink-100 font-medium text-xs border border-pink-200 cursor-pointer"
              >
                Limpiar Fichas
              </button>

              <button
                onClick={handleVerifyPuzzle}
                disabled={assembledWords.length === 0}
                className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-rose-400 to-pink-400 text-white font-medium text-sm shadow-md hover:shadow-lg disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Verificar Frase</span>
                <Check className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STAGE 3: Elección Suave (Gentle Quiz) */}
        {stage === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-1">
              <span className="text-xs font-bold text-rose-600 bg-pink-50 px-3 py-1 rounded-full border border-pink-100">
                Paso 3: Elección Suave ({vocabIndex + 1}/{level.vocabItems.length})
              </span>
              <h3 className="font-serif text-2xl font-bold text-rose-950 pt-1">
                ¿Qué significa "{currentVocab.english}"?
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {[
                currentVocab.spanish,
                level.vocabItems[(vocabIndex + 1) % level.vocabItems.length].spanish,
                level.vocabItems[(vocabIndex + 2) % level.vocabItems.length].spanish
              ]
                .sort(() => Math.random() - 0.5)
                .map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuizAnswer(opt)}
                    className={`p-4 rounded-2xl border text-left font-medium text-sm transition-all cursor-pointer ${
                      selectedOption === opt
                        ? opt === currentVocab.spanish
                          ? 'bg-emerald-100 border-emerald-300 text-emerald-900 shadow-sm'
                          : 'bg-amber-100 border-amber-300 text-amber-900'
                        : 'bg-white border-pink-200 text-rose-950 hover:bg-pink-50'
                    }`}
                  >
                    <span>{opt}</span>
                  </button>
                ))}
            </div>

            {quizFeedback && (
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs font-medium text-center animate-fade-in">
                {quizFeedback}
              </div>
            )}
          </div>
        )}

        {/* STAGE 4: Mini Historia en la Pastelería */}
        {stage === 4 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-1">
              <span className="text-xs font-bold text-rose-600 bg-pink-50 px-3 py-1 rounded-full border border-pink-100">
                Paso 4: Mini Historia en la Pastelería ☕
              </span>
              <h3 className="font-serif text-2xl font-bold text-rose-950 pt-1">
                Un Momento Dulce con Madame Amélie
              </h3>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-pink-50 p-6 rounded-3xl border border-pink-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-900 bg-white/80 px-3 py-1 rounded-full border border-amber-200">
                  Lectura Relajada
                </span>
                <button
                  onClick={() => handleListen(currentVocab.exampleEn)}
                  className="p-2 rounded-xl bg-white text-rose-700 shadow-2xs hover:scale-105 transition-all cursor-pointer"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2">
                <p className="font-serif text-lg text-rose-950 font-bold leading-relaxed">
                  "Good morning! I would like a warm tea and a sweet croissant, please. Thank you so much!"
                </p>
                <p className="text-xs text-rose-800 italic">
                  "¡Buenos días! Me gustaría un té caliente y un croissant dulce, por favor. ¡Muchas gracias!"
                </p>
              </div>

              <div className="pt-2 border-t border-pink-200/60 text-xs text-rose-900 font-medium">
                🌸 <span className="font-bold">Felicitaciones:</span> Acabas de conectar 4 frases esenciales sin ninguna dificultad. ¡Tu cerebro retiene más de lo que crees!
              </div>
            </div>

            <button
              onClick={() => setStage(5)}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-400 to-pink-400 text-white font-medium text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Ver mi Recompensa de Receta</span>
              <Sparkles className="w-4 h-4 text-amber-200" />
            </button>
          </div>
        )}

        {/* STAGE 5: Celebración de Receta */}
        {stage === 5 && (
          <div className="space-y-6 text-center animate-fade-in py-4">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-100 flex items-center justify-center text-5xl shadow-md border border-amber-300 animate-bounce">
              {level.pastryReward.imageEmoji}
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                ¡Nivel {level.id} Completado con Éxito!
              </span>
              <h3 className="font-serif text-3xl font-bold text-rose-950">
                ¡Has Desbloqueado: {level.pastryReward.name}!
              </h3>
              <p className="text-xs text-rose-800 max-w-md mx-auto">
                {level.pastryReward.description}
              </p>
            </div>

            <div className="bg-pink-50 p-4 rounded-2xl border border-pink-200 inline-block text-xs font-semibold text-rose-900">
              🧁 +25 Copas de Azúcar Ganadas
            </div>

            <button
              onClick={handleFinishLesson}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 text-white font-medium text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Guardar en mi Vitrina y Volver a la Ruta</span>
              <Check className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
