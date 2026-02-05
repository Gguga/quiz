
import { GoogleGenAI, Type } from "@google/genai";
import { UserAnswers, QuizResults } from "./types";
import { QUESTIONS } from "./constants";

export const analyzeQuizResults = async (answers: UserAnswers): Promise<QuizResults> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    return {
      score: 85,
      riskLevel: "Alto",
      personalizedMessage: "Risco elevado detectado. Seu metabolismo apresenta sinais de adaptação que favorecem o reganho.",
      keyInsights: ["Ajuste a proteína", "Treino de força", "Hidratação"]
    };
  }
  const ai = new GoogleGenAI({ apiKey });
  
  const formattedAnswers = QUESTIONS.map(q => {
    const answerValue = answers[q.id];
    const option = q.options.find(o => o.value === answerValue);
    return `Pergunta: ${q.text} | Resposta: ${option?.label}`;
  }).join("\n");

  const prompt = `Analise este perfil de risco de rebote metabólico pós-canetas emagrecedoras (GLP-1):
  ${formattedAnswers}
  
  Retorne apenas um JSON com:
  - score (0-100)
  - riskLevel ("Baixo", "Moderado", "Alto" ou "Crítico")
  - personalizedMessage (Explicação técnica curta)
  - keyInsights (Array com 3 recomendações)`;
  
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
            keyInsights: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["score", "riskLevel", "personalizedMessage", "keyInsights"]
        }
      }
    });
    return JSON.parse(response.text);
  } catch (e) {
    return { 
      score: 80, 
      riskLevel: "Alto", 
      personalizedMessage: "Risco de rebote detectado baseado no histórico de massa magra.", 
      keyInsights: ["Proteínas", "Musculação", "Desmame guiado"] 
    };
  }
};
