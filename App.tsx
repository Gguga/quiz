import React, { useState, useEffect } from 'react';
import { QUESTIONS } from './constants';
import { UserAnswers, QuizResults } from './types';
import QuizStep from './QuizStep';
import ResultsView from './ResultsView';
import VslView from './components/VslView';
import NewsInterstitial from './components/NewsInterstitial';

const App: React.FC = () => {

  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [answers, setAnswers] = useState<UserAnswers>({});
  const [results, setResults] = useState<QuizResults | null>(null);
  const [showVsl, setShowVsl] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [animateGraph, setAnimateGraph] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateGraph(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const TOTAL_STEPS = QUESTIONS.length + 1; // +1 para news

  const isCover = currentStep === -1;
  const isNews = currentStep === 4;
  const isQuestion =
    currentStep >= 0 &&
    currentStep < QUESTIONS.length &&
    !isNews;

  const handleSelectOption = (value: string) => {
    const questionId = QUESTIONS[currentStep].id;
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {

    // Ir para NEWS
    if (currentStep === 3) {
      setCurrentStep(4);
      return;
    }

    // Sair da NEWS
    if (currentStep === 4) {
      setCurrentStep(5);
      return;
    }

    // Última pergunta real
    if (currentStep === QUESTIONS.length - 1) {
      startAnalysis();
      return;
    }

    setCurrentStep(prev => prev + 1);
  };

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
    if (normalized < 45) normalized = 48;

    return {
      score: Math.round(normalized),
      riskLevel: "Alto",
      personalizedMessage: "",
      keyInsights: []
    };
  };

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

  const getSexo = () => {
    return answers[1] === "sexo_homem" ? "masculina" : "feminina";
  };

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

          </div>
        )}

        {/* PERGUNTAS */}
        {isQuestion && !loading && !results && (
          <QuizStep
            question={QUESTIONS[currentStep]}
            selectedOption={answers[QUESTIONS[currentStep].id] || null}
            onSelect={handleSelectOption}
            onNext={handleNext}
            onBack={() => setCurrentStep(prev => prev - 1)}
            isFirst={currentStep === 0}
            isLast={currentStep === QUESTIONS.length - 1}
          />
        )}

        {/* NEWS */}
        {isNews && !loading && !results && (
          <NewsInterstitial onNext={handleNext} />
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
        {results && !loading && (
          <ResultsView
            results={results}
            answers={answers}
            onCtaClick={() => setShowVsl(true)}
          />
        )}

        {/* VSL */}
        {showVsl && !loading && (
          <VslView
            videoType={getSexo()}
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
