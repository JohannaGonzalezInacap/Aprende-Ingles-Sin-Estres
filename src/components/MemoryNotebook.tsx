import React, { useState } from 'react';
import { VocabItem, UserProfile } from '../types';
import { getStoredSRSData } from '../utils/srs';
import { speakEnglish, soundFx } from '../utils/audio';
import { BookOpen, Search, Volume2, Sparkles, Filter, Heart } from 'lucide-react';

interface MemoryNotebookProps {
  allVocab: VocabItem[];
  profile: UserProfile;
}

export const MemoryNotebook: React.FC<MemoryNotebookProps> = ({ allVocab, profile }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');

  const srsData = getStoredSRSData();

  const categories = ['Todas', ...Array.from(new Set(allVocab.map(v => v.category)))];

  const filteredVocab = allVocab.filter(item => {
    const matchesSearch =
      item.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.spanish.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todas' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSpeak = (text: string) => {
    soundFx.playSoftTap();
    speakEnglish(text, profile.slowAudioDefault);
  };

  return (
    <div className="space-y-4 sm:space-y-6 pb-12 animate-fade-in">
      {/* Banner */}
      <div className="bg-gradient-to-r from-pink-100 via-rose-50 to-amber-100 p-5 sm:p-8 rounded-3xl border border-pink-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white text-rose-800 text-xs font-semibold border border-pink-200">
            <BookOpen className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span>Glosario Personalizado</span>
          </div>
          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-rose-950">
            Mi Cuaderno de Memoria
          </h2>
          <p className="text-xs text-rose-800">
            Tu archivo de frases aprendidas. Repásalas con audio y trucos visuales en cualquier momento.
          </p>
        </div>

        <div className="px-3.5 py-1.5 rounded-2xl bg-white text-rose-900 font-bold text-xs border border-pink-200 shadow-2xs shrink-0">
          📖 {allVocab.length} Palabras en tu Colección
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3 bg-white p-2.5 sm:p-3 rounded-2xl border border-pink-200 shadow-2xs">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-2.5 sm:top-3 text-rose-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar palabra o frase..."
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm text-rose-950 bg-pink-50/50 rounded-xl focus:outline-none focus:ring-1 focus:ring-pink-300"
          />
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto py-0.5">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => {
                soundFx.playSoftTap();
                setSelectedCategory(cat);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                selectedCategory === cat
                  ? 'bg-rose-100 text-rose-950 font-bold shadow-2xs border border-rose-200'
                  : 'text-rose-800/80 hover:bg-pink-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Vocabulary Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredVocab.map((item) => {
          const srs = srsData[item.id];
          const level = srs?.masteryLevel || 'nuevo';

          return (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-5 border border-pink-200/80 shadow-xs hover:shadow-md transition-all space-y-3 relative group"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-pink-700 bg-pink-50 px-2.5 py-0.5 rounded-full border border-pink-100">
                      {item.category}
                    </span>
                    {level === 'dominado' && (
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                        ✨ Dominada
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-rose-950 pt-1">
                    {item.english}
                  </h3>
                  <p className="text-xs text-rose-500 font-medium">
                    Pronunciación: {item.phonetic}
                  </p>
                </div>

                <button
                  onClick={() => handleSpeak(item.english)}
                  className="p-2.5 rounded-2xl bg-pink-50 text-rose-700 hover:bg-pink-100 transition-colors border border-pink-200 shrink-0 cursor-pointer"
                  title="Escuchar pronunciación"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              <div className="pt-2 border-t border-pink-100/80">
                <p className="text-sm font-semibold text-rose-900">
                  "{item.spanish}"
                </p>
              </div>

              {/* Mnemonic trick */}
              <div className="bg-amber-50/80 p-3 rounded-2xl border border-amber-200 text-xs text-amber-950 space-y-0.5">
                <span className="font-bold text-amber-900 block flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Truco Mnemotécnico:</span>
                </span>
                <p>{item.mnemonic}</p>
              </div>

              {/* Example */}
              <div className="bg-rose-50/50 p-2.5 rounded-xl text-xs space-y-0.5">
                <p className="text-rose-950 font-medium">"{item.exampleEn}"</p>
                <p className="text-rose-700 italic">"{item.exampleEs}"</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
