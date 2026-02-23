import React, { useState, useEffect } from 'react';
import { QUESTIONS } from './constants';
import { UserAnswers, QuizResults } from './types';
import QuizStep from './QuizStep';
import ResultsView from './ResultsView';
import VslView from './components/VslView';
import NewsInterstitial from './components/NewsInterstitial';

const NEWS_POSITION = 4;

const App: React.FC = () => {

  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [answers, setAnswers] = useState<UserAnswers>({});
  const [results, setResults] = useState<QuizResults | null>(null);
  const [showVsl, setShowVsl] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);

  const getQuestionIndex = () => {
    if (currentStep > NEWS_POSITION) return currentStep - 1;
    return currentStep;
  };

  const isNewsStep = currentStep === NEWS_POSITION;

  const isQuestionStep =
    currentStep >= 0 &&
    currentStep < QUESTIONS.length + 1 &&
    !isNewsStep;

  const handleSelectOption = (value: string) => {
    const questionIndex = getQuestionIndex();
    const questionId = QUESTIONS[questionIndex].id;
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    const questionIndex = getQuestionIndex();

    if (questionIndex === QUESTIONS.length - 1) {
      startAnalysis();
      return;
    }

    setCurrentStep(prev => prev + 1);
  };

  // =========================
  // SCORE COM FORÇADORES
  // =========================

  const calculateScore = (): QuizResults => {

    let totalWeight = 0;
    let maxWeight = 0;

    QUESTIONS.forEach(q => {
      const maxOptionWeight = Math.max(...q.options.map(o => o.weight));
      maxWeight += maxOptionWeight;

      const selected = q.options.find(o => o.value === answers[q.id]);
      if (selected) totalWeight += selected.weight;
    });

    let normalized = (totalWeight / maxWeight) * 100;

    const proteinaRefeicoes = answers[7];
    const proteinaCalculo = answers[8];
    const treino = answers[6];
    const situacao = answers[4];
    const dieta = answers[9];

    if (
      proteinaRefeicoes === "proteina_0_1" ||
      proteinaCalculo === "proteina_nunca"
    ) {
      normalized = Math.max(normalized, 72);
    }

    if (treino === "forca_nao_treina") {
      normalized = Math.max(normalized, 75);
    }

    if (situacao === "uso_parou_rebote") {
      normalized = Math.max(normalized, 80);
    }

    if (dieta === "dieta_feeling") {
      normalized = Math.max(normalized, 70);
    }

    if (normalized < 48) normalized = 48;

    const score = Math.round(normalized);

    return {
      score,
      riskLevel: score >= 75 ? "Crítico" : score >= 60 ? "Alto" : "Moderado",
      personalizedMessage: "",
      keyInsights: []
    };
  };

  // =========================
  // LOADING ESTRATÉGICO 5s
  // =========================

  const startAnalysis = () => {

    setLoading(true);
    setLoadingProgress(0);

    const result = calculateScore();

    let progressValue = 0;

    const interval = setInterval(() => {

      progressValue += 2;

      if (progressValue >= 90) {
        progressValue = 90;
        setLoadingProgress(90);
        clearInterval(interval);

        setTimeout(() => {
          setLoadingProgress(100);

          setTimeout(() => {
            setResults(result);
            setLoading(false);
          }, 500);

        }, 2000);

        return;
      }

      setLoadingProgress(progressValue);

    }, 100);
  };

  return (
    <div className="min-h-screen w-full bg-[#f5f6f7] flex flex-col font-sans">

      <main className="flex-1 w-full max-w-md mx-auto">

        {currentStep === -1 && !loading && !results && !showVsl && (
          <div className="flex flex-col items-center px-6 text-center space-y-8 pt-20">
            <h1 className="text-3xl font-black text-[#0f766e]">
              Risco de Rebote
            </h1>
            <button
              onClick={() => setCurrentStep(0)}
              className="w-full py-6 bg-[#0f766e] text-white rounded-2xl font-black uppercase mt-6"
            >
              Começar Avaliação Gratuita
            </button>
          </div>
        )}

        {isQuestionStep && !loading && !results && !showVsl && (
          <QuizStep
            question={QUESTIONS[getQuestionIndex()]}
            selectedOption={
              answers[QUESTIONS[getQuestionIndex()].id] || null
            }
            onSelect={handleSelectOption}
            onNext={handleNext}
            onBack={() => setCurrentStep(prev => prev - 1)}
            isFirst={currentStep === 0}
          />
        )}

        {isNewsStep && !loading && !results && !showVsl && (
          <NewsInterstitial onNext={handleNext} />
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center text-center p-6 pt-24 space-y-6">

            <h2 className="text-xl font-black text-[#0f766e] uppercase">
              Analisando seu perfil metabólico
            </h2>

            <div className="space-y-2 text-sm text-slate-500 font-medium">

              {loadingProgress > 10 && <p>✓ Avaliando histórico metabólico...</p>}
              {loadingProgress > 30 && <p>✓ Calculando vulnerabilidade muscular...</p>}
              {loadingProgress > 50 && <p>✓ Analisando padrão proteico...</p>}
              {loadingProgress > 70 && <p>✓ Cruzando adaptação à medicação...</p>}
              {loadingProgress >= 90 && <p className="font-bold text-[#0f766e]">Finalizando diagnóstico...</p>}

            </div>

            <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
              <div
                className="bg-[#0f766e] h-full transition-all duration-300"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>

          </div>
        )}

        {(results || showVsl) && !loading && (
          <>
            {showVsl ? (
              <VslView
                onCheckout={() =>
                  window.open('https://lp.metodopsc.com.br/psc-v1/', '_blank')
                }
              />
            ) : (
              <ResultsView
                results={results!}
                answers={answers}
                onCtaClick={() => setShowVsl(true)}
              />
            )}
          </>
        )}

      </main>
    </div>
  );
};

export default App;
