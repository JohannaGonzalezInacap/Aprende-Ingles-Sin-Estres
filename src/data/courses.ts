import { GameLevel, Achievement } from '../types';

export const INITIAL_LEVELS: GameLevel[] = [
  {
    id: 1,
    title: "Nivel 1: Primeros Saludos & Un Buen Café",
    subtitle: "Pierde el miedo con expresiones básicas y amables",
    pastryReward: {
      id: "croissant_mantequilla",
      name: "Croissant de Mantequilla Dorada",
      description: "Símbolo de tu primer gran paso sin miedo al inglés.",
      imageEmoji: "🥐",
      colorBg: "bg-amber-100 text-amber-900 border-amber-300"
    },
    description: "Inicia tu camino en la pastelería. Aprende a saludar con calidez y pedir lo que te apetezca sin prisas.",
    unlocked: true,
    completed: false,
    stars: 0,
    vocabItems: [
      {
        id: "v1_1",
        english: "Good morning",
        spanish: "Buenos días",
        phonetic: "Gud mor-nin",
        category: "Saludos",
        mnemonic: "Piensa en 'Morn' como la Mañana iluminada que despierta la pastelería.",
        exampleEn: "Good morning, I would like a coffee.",
        exampleEs: "Buenos días, me gustaría un café."
      },
      {
        id: "v1_2",
        english: "Please",
        spanish: "Por favor",
        phonetic: "Plis",
        category: "Cortesía",
        mnemonic: "Suena a 'Plis' (como pedir una caricia dulce de crema).",
        exampleEn: "A cup of tea, please.",
        exampleEs: "Una taza de té, por favor."
      },
      {
        id: "v1_3",
        english: "Thank you",
        spanish: "Gracias",
        phonetic: "Zank yu",
        category: "Cortesía",
        mnemonic: "Piensa en dar las 'Gracias' con una gran sonrisa al recibir tus galletas.",
        exampleEn: "Thank you for the delicious cake!",
        exampleEs: "¡Gracias por el pastel delicioso!"
      },
      {
        id: "v1_4",
        english: "I would like...",
        spanish: "Me gustaría...",
        phonetic: "Ai wud laik...",
        category: "Pedidos",
        mnemonic: "Es la forma más suave y respetuosa de pedir cualquier cosa.",
        exampleEn: "I would like a croissant.",
        exampleEs: "Me gustaría un croissant."
      },
      {
        id: "v1_5",
        english: "Have a nice day",
        spanish: "Que tengas un buen día",
        phonetic: "Jav a nais dei",
        category: "Despedidas",
        mnemonic: "'Nais' suena a algo 'Agradable' como un bizcocho de vainilla.",
        exampleEn: "Good bye! Have a nice day.",
        exampleEs: "¡Adiós! Que tengas un buen día."
      }
    ]
  },
  {
    id: 2,
    title: "Nivel 2: Los Sabores de la Vida",
    subtitle: "Aprende palabras dulces para expresar tus gustos",
    pastryReward: {
      id: "macaron_fresa",
      name: "Macaron Rosado de Fresa",
      description: "Delicado y suave, representa la dulzura de recordar vocabulario.",
      imageEmoji: "🧁",
      colorBg: "bg-pink-100 text-pink-900 border-pink-300"
    },
    description: "Descubre cómo expresar lo que te gusta y cómo te sientes en el día a día.",
    unlocked: false,
    completed: false,
    stars: 0,
    vocabItems: [
      {
        id: "v2_1",
        english: "Delicious",
        spanish: "Delicioso / Deliciosa",
        phonetic: "Di-li-shas",
        category: "Sabores",
        mnemonic: "Suena muy parecido a 'Delicioso', imagínatelo con un toque de canela.",
        exampleEn: "This pie is delicious.",
        exampleEs: "Esta tarta está deliciosa."
      },
      {
        id: "v2_2",
        english: "Sweet",
        spanish: "Dulce / Agradable",
        phonetic: "Suit",
        category: "Sabores",
        mnemonic: "Piensa en 'Suit' como un suéter suave y abrigador.",
        exampleEn: "I love sweet desserts.",
        exampleEs: "Me encantan los postres dulces."
      },
      {
        id: "v2_3",
        english: "Warm",
        spanish: "Tibio / Calientito",
        phonetic: "Uorm",
        category: "Sensaciones",
        mnemonic: "Como el calorcito de una taza en las manos en invierno.",
        exampleEn: "A warm chocolate milk.",
        exampleEs: "Un chocolate con leche tibio."
      },
      {
        id: "v2_4",
        english: "I love...",
        spanish: "Me encanta / Amo...",
        phonetic: "Ai lov...",
        category: "Gustos",
        mnemonic: "Para expresar lo que reconforta tu corazón.",
        exampleEn: "I love baking on Sundays.",
        exampleEs: "Me encanta hornear los domingos."
      },
      {
        id: "v2_5",
        english: "How much is it?",
        spanish: "¿Cuánto cuesta?",
        phonetic: "Jau mach is it?",
        category: "Compras",
        mnemonic: "'Mach' se parece a 'Mucha' cantidad de harina para hornear.",
        exampleEn: "Excuse me, how much is it?",
        exampleEs: "Disculpe, ¿cuánto cuesta?"
      }
    ]
  },
  {
    id: 3,
    title: "Nivel 3: El Ritmo Tranquilo del Hogar",
    subtitle: "Rutinas simples para revitalizar la mente y descansar",
    pastryReward: {
      id: "tartaleta_limon",
      name: "Tartaleta Chic de Limón y Merengue",
      description: "Fresca y luminosa, premia tu esfuerzo constante y constante.",
      imageEmoji: "🍋",
      colorBg: "bg-yellow-100 text-yellow-900 border-yellow-300"
    },
    description: "Palabras para tu rutina diaria, el descanso reparador y el autocuidado sin prisas.",
    unlocked: false,
    completed: false,
    stars: 0,
    vocabItems: [
      {
        id: "v3_1",
        english: "Rest",
        spanish: "Descansar / Descanso",
        phonetic: "Rest",
        category: "Bienestar",
        mnemonic: "Visualiza 'Rest' como poner en pausa el estrés para tomar té.",
        exampleEn: "Today I need to rest.",
        exampleEs: "Hoy necesito descansar."
      },
      {
        id: "v3_2",
        english: "Quiet",
        spanish: "Tranquilo / En silencio",
        phonetic: "Cuai-et",
        category: "Sensaciones",
        mnemonic: "Suena suave como el murmullo de una tarde tranquila.",
        exampleEn: "It is a quiet evening.",
        exampleEs: "Es una tarde tranquila."
      },
      {
        id: "v3_3",
        english: "Beautiful",
        spanish: "Hermoso / Bonito",
        phonetic: "Biu-ti-ful",
        category: "Adjetivos",
        mnemonic: "'Biu' como la belleza de una flor de lavanda en la mesa.",
        exampleEn: "What a beautiful cake!",
        exampleEs: "¡Qué pastel tan hermoso!"
      },
      {
        id: "v3_4",
        english: "I feel good",
        spanish: "Me siento bien",
        phonetic: "Ai fil gud",
        category: "Emociones",
        mnemonic: "La frase perfecta para repetir cada mañana al despertar.",
        exampleEn: "I feel good and relaxed today.",
        exampleEs: "Hoy me siento bien y relajada."
      },
      {
        id: "v3_5",
        english: "Take your time",
        spanish: "Tómate tu tiempo / Sin prisa",
        phonetic: "Teik iur taim",
        category: "Paciencia",
        mnemonic: "El lema de tu app: cada cerebro aprende a su ritmo perfecto.",
        exampleEn: "No stress, take your time.",
        exampleEs: "Sin estrés, tómate tu tiempo."
      }
    ]
  },
  {
    id: 4,
    title: "Nivel 4: Conversación en la Terraza",
    subtitle: "Conecta con otros de forma relajada y natural",
    pastryReward: {
      id: "eclair_violeta",
      name: "Éclair de Violeta y Vainilla",
      description: "Elegancia parisina que celebra tu soltura en el idioma.",
      imageEmoji: "🥖",
      colorBg: "bg-purple-100 text-purple-900 border-purple-300"
    },
    description: "Preguntas y respuestas cotidianas para conversar con serenidad en cualquier lugar.",
    unlocked: false,
    completed: false,
    stars: 0,
    vocabItems: [
      {
        id: "v4_1",
        english: "How are you?",
        spanish: "¿Cómo estás?",
        phonetic: "Jau ar yu?",
        category: "Preguntas",
        mnemonic: "Abre la puerta a una conversación cálida con un amigo.",
        exampleEn: "Hello! How are you today?",
        exampleEs: "¡Hola! ¿Cómo estás hoy?"
      },
      {
        id: "v4_2",
        english: "Where is...?",
        spanish: "¿Dónde está...?",
        phonetic: "Uer is...?",
        category: "Ubicación",
        mnemonic: "'Uer' suena a buscar con la mirada con tranquilidad.",
        exampleEn: "Excuse me, where is the bakery?",
        exampleEs: "Disculpe, ¿dónde está la pastelería?"
      },
      {
        id: "v4_3",
        english: "I understand",
        spanish: "Entiendo / Comprendo",
        phonetic: "Ai an-der-stand",
        category: "Comprensión",
        mnemonic: "Siente la alegría de comprender una frase sin bloquearte.",
        exampleEn: "Ah, yes! I understand now.",
        exampleEs: "¡Ah, sí! Ahora entiendo."
      },
      {
        id: "v4_4",
        english: "Could you help me?",
        spanish: "¿Podrías ayudarme?",
        phonetic: "Cud yu jelp mi?",
        category: "Peticiones",
        mnemonic: "Pedir ayuda con dulzura siempre abre puertas.",
        exampleEn: "Could you help me with this word?",
        exampleEs: "¿Podrías ayudarme con esta palabra?"
      },
      {
        id: "v4_5",
        english: "Step by step",
        spanish: "Paso a paso",
        phonetic: "Step bai step",
        category: "Filosofía",
        mnemonic: "Así se hornea el mejor pan y así se aprende un idioma.",
        exampleEn: "I am learning step by step.",
        exampleEs: "Estoy aprendiendo paso a paso."
      }
    ]
  },
  {
    id: 5,
    title: "Nivel 5: La Gran Fiesta del Té",
    subtitle: "Celebra tu progreso y fluidez sin presiones",
    pastryReward: {
      id: "tarta_nupcial_pastel",
      name: "Tarta Magna Pastelería Chic",
      description: "Tu obra maestra de confianza y superación personal.",
      imageEmoji: "🎂",
      colorBg: "bg-rose-100 text-rose-900 border-rose-300"
    },
    description: "Consolida todo tu aprendizaje con frases completas para sentirte segura y libre.",
    unlocked: false,
    completed: false,
    stars: 0,
    vocabItems: [
      {
        id: "v5_1",
        english: "I can do it",
        spanish: "Puedo lograrlo / Yo puedo",
        phonetic: "Ai can du it",
        category: "Afirmación",
        mnemonic: "La frase poderosa para derribar cualquier viejo bloqueo.",
        exampleEn: "English is easy, I can do it!",
        exampleEs: "El inglés es fácil, ¡puedo lograrlo!"
      },
      {
        id: "v5_2",
        english: "It is a pleasure",
        spanish: "Es un placer",
        phonetic: "It is a ple-zhur",
        category: "Cortesía",
        mnemonic: "Disfrutar del proceso de aprender cada día.",
        exampleEn: "It is a pleasure to meet you.",
        exampleEs: "Es un placer conocerte."
      },
      {
        id: "v5_3",
        english: "Welcome home",
        spanish: "Bienvenida a casa",
        phonetic: "Uel-com jom",
        category: "Calidez",
        mnemonic: "El sentimiento acogedor que te brinda esta app.",
        exampleEn: "Relax and welcome home.",
        exampleEs: "Relájate y bienvenida a casa."
      },
      {
        id: "v5_4",
        english: "Everything is fine",
        spanish: "Todo está bien",
        phonetic: "Evri-zin is fain",
        category: "Paz",
        mnemonic: "Para calmar la mente en momentos de fatiga.",
        exampleEn: "Don't worry, everything is fine.",
        exampleEs: "No te preocupes, todo está bien."
      },
      {
        id: "v5_5",
        english: "I am proud of myself",
        spanish: "Estoy orgullosa de mí misma",
        phonetic: "Ai am praud of mai-self",
        category: "Amor Propio",
        mnemonic: "La meta máxima: reconocer tu propia valentía.",
        exampleEn: "Today I am proud of myself.",
        exampleEs: "Hoy estoy orgullosa de mí misma."
      }
    ]
  }
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: "primer_paso",
    title: "Primer Horneado 🥐",
    description: "Iniciaste tu primera lección relajada sin presiones.",
    icon: "🌸",
    unlocked: false
  },
  {
    id: "bloqueo_superado",
    title: "Mente Relajada 💆‍♀️",
    description: "Completaste una sesión de repaso en el Repaso Dulce.",
    icon: "🕊️",
    unlocked: false
  },
  {
    id: "memoria_firme",
    title: "Memoria de Oro 🌟",
    description: "Consolidaste 5 frases en tu Cuaderno de Memoria.",
    icon: "📖",
    unlocked: false
  },
  {
    id: "constancia_dulce",
    title: "Ritmo Suave ☕",
    description: "Practicaste 3 días seguidos a tu propio ritmo.",
    icon: "🍰",
    unlocked: false
  },
  {
    id: "charla_amelie",
    title: "Amiga de Madame Amélie 💬",
    description: "Consultaste a tu tutora de IA para una explicación amorosa.",
    icon: "🧁",
    unlocked: false
  }
];

export const DAILY_ENCOURAGEMENT_QUOTES = [
  "«El descanso es parte del aprendizaje. Cada palabra que lees florece suavemente en tu memoria.»",
  "«Aprender un idioma no es una carrera de velocidad, es como dejar leudar la masa a fuego lento.»",
  "«Olvídate de las malas experiencias del pasado. Hoy estás construyendo tu propia historia con amor.»",
  "«Trabajar duro merece un espacio suave para ti. Tu cerebro está creando conexiones brillantes hoy.»",
  "«No hay errores aquí, solo intentos dulces que te acercan a la libertad de expresarte.»"
];
