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
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [showVsl, setShowVsl] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep, results, showVsl, loading]);

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

  const calculateScore = (): QuizResults => {

    const criticalAnswers = [
      "uso_parou_rebote",
      "forca_nao_treina",
      "forca_caiu_muito",
      "proteina_0_1",
      "proteina_nunca",
      "dieta_feeling"
    ];

    const moderateAnswers = [
      "uso_atual_plato",
      "forca_irregular",
      "proteina_2",
      "dieta_reduzi",
      "colateral_varios",
      "tempo_longo",
      "tempo_eterno"
    ];

    let criticalCount = 0;
    let moderateCount = 0;

    Object.values(answers).forEach(value => {
      if (criticalAnswers.includes(value)) criticalCount++;
      else if (moderateAnswers.includes(value)) moderateCount++;
    });

    let score = 48;
    let riskLevel: "Moderado" | "Alto" | "Crítico" = "Moderado";

    if (criticalCount >= 2) {
      score = 90;
      riskLevel = "Crítico";
    }
    else if (criticalCount === 1 && moderateCount >= 1) {
      score = 90;
      riskLevel = "Crítico";
    }
    else if (criticalCount === 1) {
      score = 75;
      riskLevel = "Alto";
    }
    else if (moderateCount >= 2) {
      score = 75;
      riskLevel = "Alto";
    }
    else if (moderateCount === 1) {
      score = 65;
      riskLevel = "Moderado";
    }

    return {
      score,
      riskLevel,
      personalizedMessage:
        "Existe uma vulnerabilidade estrutural que pode comprometer a manutenção do peso caso nada seja ajustado.",
      keyInsights: []
    };
  };

  const startAnalysis = () => {

    setLoading(true);
    setLoadingProgress(0);

    const result = calculateScore();
    let progress = 0;

    const interval = setInterval(() => {

      if (progress < 90) {
        progress += 3;
        setLoadingProgress(progress);
      } else {
        clearInterval(interval);

        setTimeout(() => {
          setLoadingProgress(100);
          setResults(result);
          setLoading(false);
        }, 1200);
      }

    }, 150);
  };

  const progressBar =
    currentStep >= 0
      ? ((currentStep + 1) / (QUESTIONS.length + 1)) * 100
      : 0;

  return (
    <div className="min-h-screen w-full bg-[#f5f6f7] flex flex-col font-sans">

      {currentStep >= 0 && !loading && !results && !showVsl && (
        <div className="w-full h-[4px] bg-slate-200">
          <div
            className="bg-black h-full transition-all duration-300"
            style={{ width: `${progressBar}%` }}
          />
        </div>
      )}

      <main className="flex-1 w-full max-w-md mx-auto">

        {currentStep === -1 && !loading && !results && !showVsl && (
          <div className="flex flex-col items-center px-6 text-center space-y-8 pt-20">

            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                Diagnóstico Gratuito
              </p>

              <h1 className="text-3xl font-black text-[#0f766e]">
                Risco de Rebote
              </h1>

              <h2 className="text-base text-slate-600 max-w-sm mx-auto">
                Emagrecer é só a primeira etapa. Descubra se você tem estrutura para manter.
              </h2>
            </div>

            <button
              onClick={() => setCurrentStep(0)}
              className="w-full py-5 bg-[#0f766e] text-white rounded-2xl font-bold uppercase mt-6 shadow-lg"
            >
              Começar Avaliação Gratuita
            </button>

          </div>
        )}

        {isQuestionStep && !loading && !results && !showVsl && (
          <QuizStep
            key={currentStep}
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
          <div className="py-6 px-4">
            <NewsInterstitial onNext={handleNext} />
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center text-center p-6 pt-24 space-y-6">

            <h2 className="text-xl font-bold text-[#0f766e] uppercase">
              Analisando Estrutura Metabólica
            </h2>

            <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
              <div
                className="bg-[#0f766e] h-full transition-all duration-300"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>

          </div>
        )}

        {results && !loading && !showVsl && (
          <ResultsView
            results={results}
            answers={answers}
            onCtaClick={() => setShowVsl(true)}
          />
        )}

        {showVsl && !loading && (
          <VslView />
        )}

      </main>
    </div>
  );
};

export default App;
