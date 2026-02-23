import React, { useState } from 'react';
import { QUESTIONS } from './constants';
import { UserAnswers, QuizResults } from './types';
import QuizStep from './QuizStep';
import ResultsView from './ResultsView';
import VslView from './components/VslView';
import NewsInterstitial from './components/NewsInterstitial';

const NEWS_STEP = 4; // após pergunta 4 (index 3)

const App: React.FC = () => {

  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [answers, setAnswers] = useState<UserAnswers>({});
  const [results, setResults] = useState<QuizResults | null>(null);
  const [showVsl, setShowVsl] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);

  // =========================
  // 🧠 INDEX REAL DA PERGUNTA
  // =========================

  const getQuestionIndex = (): number => {
    if (currentStep < 0) return -1;
    if (currentStep < NEWS_STEP) return currentStep;
    if (currentStep === NEWS_STEP) return -1;
    return currentStep - 1;
  };

  const questionIndex = getQuestionIndex();

  const isCover = currentStep === -1;
  const isNews = currentStep === NEWS_STEP;

  const isQuestion =
    questionIndex >= 0 &&
    questionIndex < QUESTIONS.length;

  // =========================
  // 🟢 RESPOSTAS
  // =========================

  const handleSelectOption = (value: string) => {

    if (!isQuestion) return;

    const questionId = QUESTIONS[questionIndex].id;

    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  // ✅ HANDLE NEXT CORRIGIDO
  const handleNext = () => {

    if (!isQuestion) {
      setCurrentStep(prev => prev + 1);
      return;
    }

    const questionId = QUESTIONS[questionIndex].id;

    // Bloqueia avanço sem resposta
    if (!answers[questionId]) return;

    const isLastQuestion =
      questionIndex === QUESTIONS.length - 1;

    if (isLastQuestion) {
      startAnalysis();
      return;
    }

    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(-1, prev - 1));
  };

  // =========================
  // 🔢 SCORE
  // =========================

  const calculateScore = (): QuizResults => {

    let totalWeight = 0;
    let maxWeight = 0;

    QUESTIONS.forEach(q => {

      if (!q.options || q.options.length === 0) return;

      const maxOptionWeight = Math.max(...q.options.map(o => o.weight));
      maxWeight += maxOptionWeight;

      const selected = q.options.find(o => o.value === answers[q.id]);
      if (selected) totalWeight += selected.weight;
    });

    const normalized =
      maxWeight > 0
        ? (totalWeight / maxWeight) * 100
        : 0;

    const finalScore = normalized < 45 ? 48 : normalized;

    return {
      score: Math.round(finalScore),
      riskLevel: "Alto",
      personalizedMessage: "",
      keyInsights: []
    };
  };

  // =========================
  // ⏳ LOADING
  // =========================

  const startAnalysis = () => {

    setLoading(true);
    setLoadingProgress(0);

    const result = calculateScore();
    let progressValue = 0;

    const interval = setInterval(() => {

      progressValue += 4;

      if (progressValue >= 100) {
        progressValue = 100;
        clearInterval(interval);

        setTimeout(() => {
          setResults(result);
          setLoading(false);
        }, 300);
      }

      setLoadingProgress(progressValue);

    }, 120);
  };

  // =========================
  // 🎨 RENDER
  // =========================

  return (
    <div className="min-h-screen w-full bg-[#f5f6f7] flex flex-col font-sans">

      <main className="flex-1 w-full max-w-md mx-auto">

        {/* CAPA */}
        {isCover && !loading && !results && (
          <div className="flex flex-col items-center px-6 text-center space-y-8 pt-24">

            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
                Diagnóstico Gratuito
              </p>

              <h1 className="text-3xl md:text-4xl font-black text-[#0f766e]">
                Risco de Rebote
              </h1>

              <h2 className="text-base text-slate-600 max-w-sm mx-auto">
                Descubra em 2 minutos seu risco de recuperar o peso após interromper a medicação.
              </h2>
            </div>

            <button
              onClick={() => setCurrentStep(0)}
              className="w-full py-6 bg-[#0f766e] text-white rounded-2xl font-black uppercase mt-6"
            >
              Começar Avaliação Gratuita
            </button>

            <p className="text-xs text-slate-400 pt-6">
              ©️ 2026 Protocolo Anti-Rebote
            </p>

          </div>
        )}

        {/* PERGUNTAS */}
        {isQuestion && !loading && !results && (
          <QuizStep
            question={QUESTIONS[questionIndex]}
            selectedOption={
              answers[QUESTIONS[questionIndex].id] || null
            }
            onSelect={handleSelectOption}
            onNext={handleNext}
            onBack={handleBack}
            isFirst={questionIndex === 0}
          />
        )}

        {/* NEWS */}
        {isNews && !loading && !results && (
          <NewsInterstitial
            onNext={() => setCurrentStep(prev => prev + 1)}
          />
        )}

        {/* LOADING */}
        {loading && (
          <div className="flex flex-col items-center justify-center text-center p-6 pt-24 space-y-6">
            <h2 className="text-xl font-black text-[#0f766e] uppercase">
              Analisando Perfil Metabólico
            </h2>

            <div className="w-full bg-slate-200 h-3 rounded-full">
              <div
                className="bg-[#0f766e] h-full transition-all duration-300"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* RESULTADO */}
        {results && !loading && !showVsl && (
          <ResultsView
            results={results}
            answers={answers}
            onCtaClick={() => setShowVsl(true)}
          />
        )}

        {/* VSL */}
        {showVsl && !loading && (
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
