
import { GoogleGenAI, Type } from "@google/genai";
import { UserAnswers, QuizResults } from "./types";
import { QUESTIONS } from "./constants";

export const analyzeQuizResults = async (answers: UserAnswers): Promise<QuizResults> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    return {
      score: 85, riskLevel: "Alto", personalizedMessage: "Risco elevado detectado.", keyInsights: ["Ajuste a proteína", "Treino de força"]
    };
  }
  const ai = new GoogleGenAI({ apiKey });
  const prompt = `Analise este perfil de risco de rebote pós-Ozempic: ${JSON.stringify(answers)}. Retorne apenas JSON com score, riskLevel, personalizedMessage e keyInsights.`;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: { responseMimeType: "application/json" }
    });
    return JSON.parse(response.text);
  } catch (e) {
    return { score: 80, riskLevel: "Alto", personalizedMessage: "Risco detectado.", keyInsights: ["Proteínas"] };
  }
};
