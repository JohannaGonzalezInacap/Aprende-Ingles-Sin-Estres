import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Heart, Send, Sparkles, Volume2, Bot, MessageCircle, RefreshCw } from 'lucide-react';
import { speakEnglish, soundFx } from '../utils/audio';

interface TutorChatModalProps {
  profile: UserProfile;
}

interface ChatMessage {
  sender: 'user' | 'amelie';
  text: string;
  mnemonic?: string;
  tip?: string;
  time: string;
}

export const TutorChatModal: React.FC<TutorChatModalProps> = ({ profile }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'amelie',
      text: `¡Hola, querida! Soy Madame Amélie, tu tutora de inglés y chef repostera. Estoy aquí para acompañarte con amor, infinita paciencia y sin ningún juicio. Pregúntame lo que quieras sobre frases, dudas de gramática o trucos para la memoria.`,
      tip: 'Recuerda que tu cerebro aprende mejor cuando está relajado y libre de culpa.',
      time: 'Ahora'
    }
  ]);

  const quickQuestions = [
    "☕ Explicación amorosa de 'I would like' vs 'I want'",
    "🌷 ¿Cómo recuerdo las palabras cuando tengo fatiga de memoria?",
    "🥐 Un truco dulce para pedir cosas en una cafetería",
    "✨ ¿Por qué se dice 'Good morning' y no solo 'Good day'?"
  ];

  const handleSend = async (customPrompt?: string) => {
    const textToSend = customPrompt || input;
    if (!textToSend.trim() || loading) return;

    soundFx.playSoftTap();

    const userMsg: ChatMessage = {
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customPrompt) setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/tutor/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phrase: textToSend,
          userQuestion: textToSend
        })
      });

      const data = await response.json();

      const amelieMsg: ChatMessage = {
        sender: 'amelie',
        text: data.explanation || '¡Hola dulce amiga! Tu duda es totalmente natural. Vamos paso a paso juntas.',
        mnemonic: data.mnemonic,
        tip: data.tip,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      soundFx.playSuccessChime();
      setMessages(prev => [...prev, amelieMsg]);
    } catch (e) {
      console.error("Error communicating with Madame Amélie:", e);
      setMessages(prev => [
        ...prev,
        {
          sender: 'amelie',
          text: '¡Tranquila! Esta frase es genial para el día a día. Sigue practicando suavemente.',
          mnemonic: 'Asóciala con el aroma de un pan recién horneado.',
          tip: 'Tu esfuerzo diario es hermoso.',
          time: 'Ahora'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-100 via-pink-100 to-rose-100 p-6 sm:p-8 rounded-3xl border border-pink-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-3xl shadow-sm border border-pink-200 shrink-0">
            🧁
          </div>
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white text-rose-800 text-xs font-semibold border border-pink-200">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-300" />
              <span>Tutora de IA Empática & Paciente</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-rose-950">
              Madame Amélie - Tu Espacio de Consulta
            </h2>
            <p className="text-xs text-rose-800">
              Cero presión, cero exámenes. Pregunta cualquier duda sobre el inglés en español.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Question Chips */}
      <div className="space-y-2">
        <span className="text-xs font-semibold text-rose-800">Sugerencias dulces para preguntar:</span>
        <div className="flex flex-wrap gap-2">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              disabled={loading}
              className="px-3.5 py-1.5 rounded-2xl bg-white hover:bg-pink-50 text-rose-950 text-xs border border-pink-200 shadow-2xs hover:border-pink-300 transition-all cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Conversation History */}
      <div className="bg-white rounded-3xl p-6 border border-pink-200 shadow-sm space-y-4 min-h-96 max-h-[500px] overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex flex-col ${
              msg.sender === 'user' ? 'items-end' : 'items-start'
            } space-y-1`}
          >
            <div className="flex items-center gap-1.5 text-[11px] text-rose-600/70">
              <span>{msg.sender === 'user' ? profile.name : 'Madame Amélie'}</span>
              <span>•</span>
              <span>{msg.time}</span>
            </div>

            <div
              className={`max-w-xl rounded-3xl p-4 shadow-2xs space-y-2 ${
                msg.sender === 'user'
                  ? 'bg-rose-400 text-white rounded-tr-none'
                  : 'bg-amber-50/80 border border-amber-200/80 text-rose-950 rounded-tl-none'
              }`}
            >
              <p className="text-xs sm:text-sm leading-relaxed">{msg.text}</p>

              {msg.mnemonic && (
                <div className="bg-white/90 p-3 rounded-2xl border border-amber-200 text-xs text-amber-950 space-y-1">
                  <span className="font-bold block text-amber-900">💡 Truco Mnemotécnico:</span>
                  <p>{msg.mnemonic}</p>
                </div>
              )}

              {msg.tip && (
                <div className="bg-pink-100/80 p-2.5 rounded-xl text-xs text-rose-900 font-medium">
                  🌸 {msg.tip}
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-rose-700 bg-pink-50 p-3 rounded-2xl inline-block animate-pulse">
            <RefreshCw className="w-4 h-4 animate-spin text-rose-500" />
            <span>Madame Amélie está preparando una explicación dulce para ti...</span>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-pink-200 shadow-xs"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu duda o frase en inglés aquí (ej: ¿Cómo pido la cuenta en inglés?)..."
          className="flex-1 px-4 py-2.5 text-xs sm:text-sm text-rose-950 bg-transparent focus:outline-none placeholder-rose-400"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-400 to-pink-400 text-white text-xs font-semibold shadow-xs hover:shadow-md disabled:opacity-50 transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <span>Consultar</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
