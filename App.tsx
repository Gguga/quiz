import React, { useState } from 'react';
import { QUESTIONS } from './constants';
import { UserAnswers, QuizResults } from './types';
import QuizStep from './QuizStep';
import ResultsView from './ResultsView';
import VslView from './components/VslView';
import NewsInterstitial from './components/NewsInterstitial';

const NEWS_AFTER_QUESTION_INDEX = 3; // após pergunta 4 (index 3)

type Step =
  | { type: "cover" }
  | { type: "question"; index: number }
  | { type: "news" }
  | { type: "loading" }
  | { type: "result" }
  | { type: "vsl" };

const App: React.FC = () => {

  const [step, setStep] = useState<Step>({ type: "cover" });
  const [answers, setAnswers] = useState<UserAnswers>({});
  const [results, setResults] = useState<QuizResults | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // =========================
  // RESPOSTA
  // =========================

  const handleSelectOption = (questionId: string | number, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  // =========================
  // NEXT
  // =========================

  const goToNext = () => {

    if (step.type !== "question") return;

    const currentIndex = step.index;
    const questionId = QUESTIONS[currentIndex].id;

    if (!answers[questionId]) return;

    const isLastQuestion = currentIndex === QUESTIONS.length - 1;

    if (isLastQuestion) {
      startAnalysis();
      return;
    }

    if (currentIndex === NEWS_AFTER_QUESTION_INDEX) {
      setStep({ type: "news" });
      return;
    }

    setStep({ type: "question", index: currentIndex + 1 });
  };

  const goBack = () => {
    if (step.type !== "question") return;

    const currentIndex = step.index;

    if (currentIndex === 0) {
      setStep({ type: "cover" });
      return;
    }

    if (currentIndex - 1 === NEWS_AFTER_QUESTION_INDEX) {
      setStep({ type: "question", index: currentIndex - 1 });
      return;
    }

    setStep({ type: "question", index: currentIndex - 1 });
  };

  // =========================
  // SCORE
  // =========================

  const calculateScore = (): QuizResults => {

    let totalWeight = 0;
    let maxWeight = 0;

    QUESTIONS.forEach(q => {
      if (!q.options?.length) return;

      const maxOptionWeight = Math.max(...q.options.map(o => o.weight));
      maxWeight += maxOptionWeight;

      const selected = q.options.find(o => o.value === answers[q.id]);
      if (selected) totalWeight += selected.weight;
    });

    const normalized =
      maxWeight > 0 ? (totalWeight / maxWeight) * 100 : 0;

    return {
      score: Math.round(normalized < 45 ? 48 : normalized),
      riskLevel: "Alto",
      personalizedMessage: "",
      keyInsights: []
    };
  };

  // =========================
  // LOADING
  // =========================

  const startAnalysis = () => {

    setStep({ type: "loading" });
    setLoadingProgress(0);

    const result = calculateScore();
    let progress = 0;

    const interval = setInterval(() => {

      progress += 5;

      if (progress >= 100) {
        clearInterval(interval);
        setResults(result);
        setStep({ type: "result" });
      }

      setLoadingProgress(progress);

    }, 100);
  };

  // =========================
  // RENDER
  // =========================

  return (
    <div className="min-h-screen w-full bg-[#f5f6f7] flex flex-col font-sans">

      <main className="flex-1 w-full max-w-md mx-auto">

        {step.type === "cover" && (
          <div className="flex flex-col items-center px-6 text-center space-y-8 pt-24">

            <h1 className="text-3xl font-black text-[#0f766e]">
              Risco de Rebote
            </h1>

            <button
              onClick={() => setStep({ type: "question", index: 0 })}
              className="w-full py-6 bg-[#0f766e] text-white rounded-2xl font-black uppercase"
            >
              Começar Avaliação
            </button>

          </div>
        )}

        {step.type === "question" && (
          <QuizStep
            question={QUESTIONS[step.index]}
            selectedOption={
              answers[QUESTIONS[step.index].id] || null
            }
            onSelect={(value) =>
              handleSelectOption(QUESTIONS[step.index].id, value)
            }
            onNext={goToNext}
            onBack={goBack}
            isFirst={step.index === 0}
          />
        )}

        {step.type === "news" && (
          <NewsInterstitial
            onNext={() =>
              setStep({
                type: "question",
                index: NEWS_AFTER_QUESTION_INDEX + 1
              })
            }
          />
        )}

        {step.type === "loading" && (
          <div className="p-10 text-center">
            <h2 className="font-black text-[#0f766e] mb-6">
              Analisando Perfil...
            </h2>

            <div className="w-full bg-slate-200 h-3 rounded-full">
              <div
                className="bg-[#0f766e] h-full transition-all"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
          </div>
        )}

        {step.type === "result" && results && (
          <ResultsView
            results={results}
            answers={answers}
            onCtaClick={() => setStep({ type: "vsl" })}
          />
        )}

        {step.type === "vsl" && (
          <VslView
            onCheckout={() =>
              window.open('https://lp.metodopsc.com.br/psc-v1/', '_blank')
            }
          />
        )}

      </main>
    </div>
  );
};

export default App;
