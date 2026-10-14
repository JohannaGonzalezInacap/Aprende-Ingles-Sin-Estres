import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Gemini Client server-side safely
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// API Routes

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Warm AI Chef Tutor Explanation
app.post("/api/tutor/explain", async (req, res) => {
  try {
    const { phrase, spanishMeaning, userQuestion } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      // Fallback friendly explanation if API key is not present
      return res.json({
        explanation: `¡No te preocupes! "${phrase}" significa "${spanishMeaning || 'esta expresión'}". Es algo común en inglés. Un truco para recordarlo: asócialo con tu rutina diaria de forma suave y sin presión. ¡Vas excelente! 🌸`,
        mnemonic: `Visualiza una taza de té tibio cada vez que pienses en esta frase.`,
        tip: `La repetición relajada es la clave, no hace falta memorizar de memoria rigida.`
      });
    }

    const prompt = `Actúa como Madame Amélie, una cariñosa chef repostera y tutora de inglés extremadamente paciente, empática y dulce. 
Tu estudiante es una mujer de 45 años que sufrió bloqueo mental y trauma previo con el inglés en el colegio, además de cansancio cognitivo por trabajar muchos años en turno de noche.

Explícale la frase en inglés: "${phrase}" (Significado en español aproximado: "${spanishMeaning || ''}").
Pregunta específica de la estudiante: "${userQuestion || '¿Por qué se usa de esta forma o cómo la recuerdo fácil?'}"

Instrucciones de respuesta:
1. Tono súper cálido, alentador, como una tía dulce o amiga en una cafetería pastel. Sin jerga gramatical complicada.
2. Da una explicación breve en español de 2 a 3 frases fácil de entender.
3. Da una mnemotecnia o truco visual muy sencillo relacionado con la pastelería o la vida diaria.
4. Finaliza con una palabra de apoyo positivo muy sincera.

Responde únicamente en formato JSON con este esquema exacto:
{
  "explanation": "explicación clara y reconfortante en español",
  "mnemonic": "truco de memoria o asociación dulce",
  "tip": "mensaje de apoyo relajante"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        thinkingConfig: { thinkingBudget: 0 },
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (error) {
    console.error("Error in /api/tutor/explain:", error);
    res.json({
      explanation: "¡Tranquila! Esta frase es genial para el día a día. Vamos paso a paso sin prisas.",
      mnemonic: "Piensa en el aroma de unos croissants recién horneados al repetirla.",
      tip: "Tu mente está aprendiendo a su propio ritmo perfecto."
    });
  }
});

// Cozy Pastry Short Story Generator
app.post("/api/tutor/story", async (req, res) => {
  try {
    const { levelTopic } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        title: "Un Café por la Mañana ☕",
        englishStory: "Welcome to the bakery! I would like a warm coffee and a fresh croissant, please.",
        spanishTranslation: "¡Bienvenida a la pastelería! Me gustaría un café caliente y un croissant fresco, por favor.",
        keyWords: [
          { en: "Welcome", es: "Bienvenida" },
          { en: "bakery", es: "pastelería" },
          { en: "warm", es: "caliente/tibio" },
          { en: "fresh", es: "fresco" }
        ],
        encouragement: "¡Has leído tu primera mini historia dulce! Tu cerebro procesa el idioma de forma natural."
      });
    }

    const prompt = `Crea una mini historia súper acogedora de 2 frases en una pastelería artesanal para nivel básico de inglés sobre: "${levelTopic || 'saludos y café'}".
La estudiante es una mujer de 45 años con cansancio de memoria que busca perder el miedo al inglés.

Responde estrictamente en formato JSON con la siguiente estructura:
{
  "title": "Título sugerente con emoji en español",
  "englishStory": "Historia en inglés sencillo (máximo 2-3 frases cortas)",
  "spanishTranslation": "Traducción fiel y dulce en español",
  "keyWords": [
    {"en": "palabra1", "es": "significado1"},
    {"en": "palabra2", "es": "significado2"}
  ],
  "encouragement": "Mensaje amoroso de refuerzo positivo"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        thinkingConfig: { thinkingBudget: 0 },
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (error) {
    console.error("Error in /api/tutor/story:", error);
    res.json({
      title: "Dulce Mañana en París 🥐",
      englishStory: "Hello! A slice of lemon cake makes my day happy.",
      spanishTranslation: "¡Hola! Una rebanada de pastel de limón alegra mi día.",
      keyWords: [{ en: "slice", es: "rebanada" }, { en: "happy", es: "feliz" }],
      encouragement: "¡Paso a paso la memoria fortalece sus conexiones!"
    });
  }
});

// Express & Vite server startup logic
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Import dinámico: "vite" (y su dependencia "rollup") solo se cargan en
    // desarrollo local. Un import estático rompe la función serverless en
    // Vercel, donde el binario nativo de rollup para Linux no está disponible.
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(Number(PORT), "0.0.0.0", () => {
    console.log(`🌸 Pastry English Server running on http://localhost:${PORT}`);
  });
}

// En Vercel no hay servidor persistente: la app de Express se exporta como función
// (Vercel la invoca directamente, sin pasar por app.listen()). Fuera de Vercel
// (local, Render, etc.) se mantiene el arranque normal con app.listen().
if (!process.env.VERCEL) {
  startServer();
}

export default app;
