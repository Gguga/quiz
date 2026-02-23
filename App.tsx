import React, { useState } from 'react';
import { QUESTIONS } from './constants';
import { UserAnswers, QuizResults } from './types';
import QuizStep from './QuizStep';
import ResultsView from './ResultsView';
import NewsInterstitial from './components/NewsInterstitial';

const NEWS_POSITION = 4;

const App: React.FC = () => {

  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [answers, setAnswers] = useState<UserAnswers>({});
  const [results, setResults] = useState<QuizResults | null>(null);
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
  // 🚨 SCORE BASEADO EM GATILHO
  // =========================

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
      if (criticalAnswers.includes(value)) {
        criticalCount++;
      } else if (moderateAnswers.includes(value)) {
        moderateCount++;
      }
    });

    let score = 0;
    let riskLevel: "Baixo" | "Moderado" | "Alto" | "Crítico" = "Baixo";

    if (criticalCount >= 2) {
      score = 85;
      riskLevel = "Crítico";
    }

    else if (criticalCount === 1) {
      score = 72;
      riskLevel = "Alto";
    }

    else if (moderateCount >= 1) {
      score = 60;
      riskLevel = "Moderado";
    }

    else {
      score = 48;
      riskLevel = "Baixo";
    }

    return {
      score,
      riskLevel,
      personalizedMessage: "",
      keyInsights: []
    };
  };

  // =========================
  // LOADING 5s COM TRAVA 90%
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

        {currentStep === -1 && !loading && !results && (
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

        {isQuestionStep && !loading && !results && (
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

        {isNewsStep && !loading && !results && (
          <NewsInterstitial onNext={handleNext} />
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center text-center p-6 pt-24 space-y-6">

            <h2 className="text-xl font-black text-[#0f766e] uppercase">
              Analisando seu perfil metabólico
            </h2>

            <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
              <div
                className="bg-[#0f766e] h-full transition-all duration-300"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>

          </div>
        )}

        {results && !loading && (
          <ResultsView
            results={results}
            answers={answers}
            onCtaClick={() => {}}
          />
        )}

      </main>
    </div>
  );
};

export default App;
