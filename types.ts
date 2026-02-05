
export interface QuestionOption {
  label: string;
  subLabel?: string;
  value: string;
  weight: number;
  icon?: string;
}

export interface Question {
  id: number;
  text: string;
  image?: string;
  options: QuestionOption[];
}

export interface QuizResults {
  score: number;
  riskLevel: 'Baixo' | 'Moderado' | 'Alto' | 'Crítico';
  personalizedMessage: string;
  keyInsights: string[];
}

export interface UserAnswers {
  [key: number]: string;
}
