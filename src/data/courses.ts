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
  },
  {
    id: 6,
    title: "Nivel 6: Pequeños Antojos y Horas Dulces",
    subtitle: "Expresa tus preferencias de tiempo y antojos con total calma",
    pastryReward: {
      id: "muffin_arandanos",
      name: "Muffin Esponjoso de Arándanos",
      description: "Tierno y lleno de frutos frescos, celebra tu constancia diaria.",
      imageEmoji: "🫐",
      colorBg: "bg-indigo-100 text-indigo-900 border-indigo-300"
    },
    description: "Palabras amables para expresar momentos de tiempo, pequeñas cantidades y tus gustos cotidianos.",
    unlocked: false,
    completed: false,
    stars: 0,
    vocabItems: [
      {
        id: "v6_1",
        english: "Now",
        spanish: "Ahora",
        phonetic: "Nau",
        category: "Tiempo",
        mnemonic: "Como la brisa fresca del momento presente para disfrutar de un té.",
        exampleEn: "I want a warm tea now.",
        exampleEs: "Quiero un té caliente ahora."
      },
      {
        id: "v6_2",
        english: "Later",
        spanish: "Más tarde",
        phonetic: "Lei-ter",
        category: "Tiempo",
        mnemonic: "Para cuando prefieres tomarte un descanso reparador antes de continuar.",
        exampleEn: "We can eat cake later.",
        exampleEs: "Podemos comer pastel más tarde."
      },
      {
        id: "v6_3",
        english: "A little bit",
        spanish: "Un poquito / Un poco",
        phonetic: "A li-tl bit",
        category: "Cantidades",
        mnemonic: "Como espolvorear un toque delicado de azúcar impalpable.",
        exampleEn: "A little bit of sugar, please.",
        exampleEs: "Un poquito de azúcar, por favor."
      },
      {
        id: "v6_4",
        english: "Fresh",
        spanish: "Fresco / Recién hecho",
        phonetic: "Fresh",
        category: "Sensaciones",
        mnemonic: "Suena al pan de la mañana o fruta fresca en la terraza.",
        exampleEn: "This bread is very fresh.",
        exampleEs: "Este pan está muy fresco."
      },
      {
        id: "v6_5",
        english: "I prefer...",
        spanish: "Prefiero...",
        phonetic: "Ai pri-fer...",
        category: "Elecciones",
        mnemonic: "Para elegir amablemente entre café o té sin dudar.",
        exampleEn: "I prefer tea with honey.",
        exampleEs: "Prefiero té con miel."
      }
    ]
  },
  {
    id: 7,
    title: "Nivel 7: La Brisa del Jardín y el Tiempo Libre",
    subtitle: "Vocabulario reconfortante para disfrutar del clima y pasear",
    pastryReward: {
      id: "tarta_frambuesa",
      name: "Tartaleta de Frambuesa Silvestre",
      description: "Un toque de frescura del jardín para recargar tus energías.",
      imageEmoji: "🍰",
      colorBg: "bg-rose-100 text-rose-900 border-rose-300"
    },
    description: "Aprende a hablar del entorno, paseos relajantes y emociones llenas de paz.",
    unlocked: false,
    completed: false,
    stars: 0,
    vocabItems: [
      {
        id: "v7_1",
        english: "Sunny",
        spanish: "Soleado / Con sol",
        phonetic: "Sa-ni",
        category: "Clima",
        mnemonic: "Piensa en 'Sun' (el Sol brillante que ilumina tu mesa).",
        exampleEn: "It is a sunny afternoon.",
        exampleEs: "Es una tarde soleada."
      },
      {
        id: "v7_2",
        english: "Walk",
        spanish: "Caminar / Pasear",
        phonetic: "Uok",
        category: "Bienestar",
        mnemonic: "Pasear tranquilamente al atardecer para despejar la mente.",
        exampleEn: "Let's take a walk outside.",
        exampleEs: "Vamos a dar un paseo afuera."
      },
      {
        id: "v7_3",
        english: "Peaceful",
        spanish: "Pacífico / Lleno de paz",
        phonetic: "Pis-ful",
        category: "Emociones",
        mnemonic: "Una mente llena de 'Paz' sintiendo cero presiones.",
        exampleEn: "This bakery is so peaceful.",
        exampleEs: "Esta pastelería es tan tranquila."
      },
      {
        id: "v7_4",
        english: "Music",
        spanish: "Música",
        phonetic: "Miu-sic",
        category: "Pasatiempos",
        mnemonic: "Casi idéntico a Música, tu mejor compañera mientras horneas.",
        exampleEn: "I love listening to music.",
        exampleEs: "Me encanta escuchar música."
      },
      {
        id: "v7_5",
        english: "I feel happy",
        spanish: "Me siento feliz",
        phonetic: "Ai fil ja-pi",
        category: "Emociones",
        mnemonic: "La emoción radiante de ver cuánto estás logrando.",
        exampleEn: "I feel happy with my progress.",
        exampleEs: "Me siento feliz con mi progreso."
      }
    ]
  },
  {
    id: 8,
    title: "Nivel 8: De Viaje y Nuevos Horizontes",
    subtitle: "Frases viajeras y amables para moverte con soltura y seguridad",
    pastryReward: {
      id: "cannoli_pistacho",
      name: "Cannoli Siciliano de Pistacho",
      description: "Crocante y aventurero, listo para acompañarte en tus viajes.",
      imageEmoji: "🥐",
      colorBg: "bg-emerald-100 text-emerald-900 border-emerald-300"
    },
    description: "Preguntas útiles para viajar, pedir indicaciones e interactuar con amabilidad.",
    unlocked: false,
    completed: false,
    stars: 0,
    vocabItems: [
      {
        id: "v8_1",
        english: "Where can I find...?",
        spanish: "¿Dónde puedo encontrar...?",
        phonetic: "Uer can ai faind...?",
        category: "Orientación",
        mnemonic: "Pregunta clave para descubrir rincones con encanto.",
        exampleEn: "Where can I find a good bakery?",
        exampleEs: "¿Dónde puedo encontrar una buena pastelería?"
      },
      {
        id: "v8_2",
        english: "Ticket",
        spanish: "Boleto / Entrada",
        phonetic: "Ti-ket",
        category: "Viajes",
        mnemonic: "Tu pase seguro hacia un nuevo destino dulce.",
        exampleEn: "One ticket for the train, please.",
        exampleEs: "Un boleto para el tren, por favor."
      },
      {
        id: "v8_3",
        english: "Near",
        spanish: "Cerca",
        phonetic: "Nir",
        category: "Ubicación",
        mnemonic: "Suena a estar muy cercano, a pocos pasos de ti.",
        exampleEn: "Is the cafe near here?",
        exampleEs: "¿El café está cerca de aquí?"
      },
      {
        id: "v8_4",
        english: "Welcome",
        spanish: "Bienvenido / De nada",
        phonetic: "Uel-com",
        category: "Hospitalidad",
        mnemonic: "Abrir los brazos con amabilidad a quien te visita.",
        exampleEn: "You are always welcome here.",
        exampleEs: "Siempre eres bienvenida aquí."
      },
      {
        id: "v8_5",
        english: "Have a safe trip",
        spanish: "Que tengas un buen viaje",
        phonetic: "Jav a seif trip",
        category: "Deseos",
        mnemonic: "Deseos dulces y tranquilos para tus seres queridos.",
        exampleEn: "Good bye and have a safe trip!",
        exampleEs: "¡Adiós y que tengas un buen viaje!"
      }
    ]
  },
  {
    id: 9,
    title: "Nivel 9: Palabras de Conexión y Amistad",
    subtitle: "Aprende a unir frases y compartir historias bonitas",
    pastryReward: {
      id: "profiterol_avellana",
      name: "Profiterol Crujiente de Avellana",
      description: "Bocado fino de alta repostería que celebra tus charlas amables.",
      imageEmoji: "🍩",
      colorBg: "bg-amber-100 text-amber-900 border-amber-300"
    },
    description: "Conectores y modismos para expresarte de manera continua y fluida.",
    unlocked: false,
    completed: false,
    stars: 0,
    vocabItems: [
      {
        id: "v9_1",
        english: "Because",
        spanish: "Porque",
        phonetic: "Bi-cos",
        category: "Conectores",
        mnemonic: "Te permite explicar los motivos dulces de tus decisiones.",
        exampleEn: "I smile because I am relaxed.",
        exampleEs: "Sonrío porque estoy relajada."
      },
      {
        id: "v9_2",
        english: "Together",
        spanish: "Juntos / Juntas",
        phonetic: "Tu-ge-der",
        category: "Relaciones",
        mnemonic: "Aprender acompañados siempre es más placentero.",
        exampleEn: "We can learn together.",
        exampleEs: "Podemos aprender juntas."
      },
      {
        id: "v9_3",
        english: "Remember",
        spanish: "Recordar",
        phonetic: "Ri-mem-ber",
        category: "Memoria",
        mnemonic: "Traer a la mente recuerdos cálidos y bonitos.",
        exampleEn: "I remember this sweet word.",
        exampleEs: "Recuerdo esta palabra dulce."
      },
      {
        id: "v9_4",
        english: "Always",
        spanish: "Siempre",
        phonetic: "Ol-weis",
        category: "Tiempo",
        mnemonic: "Como el constante cuidado que te dedicas a ti misma.",
        exampleEn: "You can always rest when needed.",
        exampleEs: "Siempre puedes descansar cuando lo necesites."
      },
      {
        id: "v9_5",
        english: "What do you think?",
        spanish: "¿Qué opina? / ¿Qué piensas?",
        phonetic: "Uat du yu zink?",
        category: "Conversación",
        mnemonic: "Una invitación cariñosa a compartir ideas.",
        exampleEn: "This dessert is lovely. What do you think?",
        exampleEs: "Este postre es encantador. ¿Qué opinas?"
      }
    ]
  },
  {
    id: 10,
    title: "Nivel 10: Confianza, Sueños y Celebración",
    subtitle: "Habla sobre tus metas y logros con total serenidad",
    pastryReward: {
      id: "pavlova_frutas_bosque",
      name: "Pavlova Etérea de Frutos del Bosque",
      description: "Ligera como una nube, representa tu libertad para comunicarte sin miedos.",
      imageEmoji: "🧁",
      colorBg: "bg-pink-100 text-pink-900 border-pink-300"
    },
    description: "Celebra la culminación de tu viaje inicial con expresiones de confianza y satisfacción.",
    unlocked: false,
    completed: false,
    stars: 0,
    vocabItems: [
      {
        id: "v10_1",
        english: "Dream",
        spanish: "Sueño / Soñar",
        phonetic: "Drim",
        category: "Deseos",
        mnemonic: "Los sueños bonitos que se van haciendo realidad paso a paso.",
        exampleEn: "My dream is to travel and speak freely.",
        exampleEs: "Mi sueño es viajar y hablar libremente."
      },
      {
        id: "v10_2",
        english: "I believe",
        spanish: "Yo creo / Confío",
        phonetic: "Ai bi-liv",
        category: "Confianza",
        mnemonic: "Confiar en tus capacidades sin compararte con nadie.",
        exampleEn: "I believe in my own pace.",
        exampleEs: "Confío en mi propio ritmo."
      },
      {
        id: "v10_3",
        english: "Wonderful",
        spanish: "Maravilloso / Fantástico",
        phonetic: "Uan-der-ful",
        category: "Sensaciones",
        mnemonic: "Lleno de 'Wonder' (asombro bonito por la vida).",
        exampleEn: "What a wonderful progress you made!",
        exampleEs: "¡Qué progreso tan maravilloso has hecho!"
      },
      {
        id: "v10_4",
        english: "I am ready",
        spanish: "Estoy lista / Estoy preparado",
        phonetic: "Ai am re-di",
        category: "Confianza",
        mnemonic: "Sentirse en paz y lista para cualquier momento dulce.",
        exampleEn: "I am ready for new sweet moments.",
        exampleEs: "Estoy lista para nuevos momentos dulces."
      },
      {
        id: "v10_5",
        english: "Congratulations!",
        spanish: "¡Felicitaciones!",
        phonetic: "Con-gra-chu-lei-shons!",
        category: "Celebración",
        mnemonic: "¡El aplauso cálido por todo lo que has construido!",
        exampleEn: "Congratulations on finishing your journey!",
        exampleEs: "¡Felicitaciones por terminar tu recorrido!"
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
