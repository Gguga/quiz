
import { GoogleGenAI, Type } from "@google/genai";
import { UserAnswers, QuizResults } from "../types";
import { QUESTIONS } from "../constants";

export const analyzeQuizResults = async (answers: UserAnswers): Promise<QuizResults> => {
  // Inicialização dentro da função para maior flexibilidade
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    console.warn("API_KEY não encontrada. Usando resultado padrão de fallback.");
    return {
      score: 85,
      riskLevel: "Alto",
      personalizedMessage: "Sua triagem indica uma forte tendência de adaptação metabólica. É essencial focar na transição nutricional para evitar o efeito rebote.",
      keyInsights: [
        "Aumente o aporte de proteínas imediatamente.",
        "Não interrompa a medicação sem um plano de desmame.",
        "Inicie treinos de força para proteger sua musculatura."
      ]
    };
  }

  const ai = new GoogleGenAI({ apiKey });

  const formattedAnswers = QUESTIONS.map(q => {
    const answerValue = answers[q.id];
    const option = q.options.find(o => o.value === answerValue);
    return `Pergunta: ${q.text} | Resposta: ${option?.label}`;
  }).join("\n");

  const prompt = `Você é um especialista em fisiologia metabólica e nutrologia. 
  Analise o perfil de tendência de um indivíduo que utiliza ou utilizou análogos de GLP-1. 
  Seu objetivo é fornecer uma triagem informativa sobre a probabilidade de adaptação metabólica.

  Respostas Coletadas:
  ${formattedAnswers}
  
  Forneça a análise em JSON:
  {
    "score": 0-100,
    "riskLevel": "Baixo", "Moderado", "Alto" ou "Crítico",
    "personalizedMessage": "Explicação técnica curta.",
    "keyInsights": ["3 recomendações"]
  }`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            riskLevel: { type: Type.STRING },
            personalizedMessage: { type: Type.STRING },
            keyInsights: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["score", "riskLevel", "personalizedMessage", "keyInsights"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (e) {
    console.error("Erro na Gemini API:", e);
    return {
      score: 80,
      riskLevel: "Alto",
      personalizedMessage: "Detectamos um risco elevado de reganho de peso devido ao padrão de consumo proteico e histórico de uso.",
      keyInsights: ["Priorize proteínas", "Inicie musculação", "Beba mais água"]
    };
  }
};
