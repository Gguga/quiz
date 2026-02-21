import React, { useState, useRef, useEffect } from 'react';
import { QUESTIONS } from './constants';
import { UserAnswers, QuizResults } from './types';
import QuizStep from './QuizStep';
import ResultsView from './ResultsView';
import VslView from './components/VslView';
import NewsInterstitial from './components/NewsInterstitial';
import { analyzeQuizResults } from './services/geminiService';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [answers, setAnswers] = useState<UserAnswers>({});
  const [results, setResults] = useState<QuizResults | null>(null);
  const [showVsl, setShowVsl] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [loadingStatus, setLoadingStatus] = useState<string>("Analisando...");

  const apiDataRef = useRef<QuizResults | null>(null);

  const isQuestionStep =
    currentStep >= 0 && currentStep < QUESTIONS.length;

  const isNewsStep = currentStep === 2; 
  // após idade (sexo=0, idade=1, news=2)

  const handleSelectOption = (value: string) => {
    const questionId = QUESTIONS[currentStep].id;
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentStep < QUESTIONS.length) {
      setCurrentStep(prev => prev + 1);
    } else {
      startAnalysis();
    }
  };

  const startAnalysis = () => {
    setLoading(true);
    setLoadingProgress(0);

    analyzeQuizResults(answers)
      .then(res => {
        apiDataRef.current = res;
      })
      .catch(() => {
        apiDataRef.current = {
          score: 85,
          riskLevel: "Alto",
          personalizedMessage: "Risco elevado detectado.",
          keyInsights: ["Proteínas", "Treino", "Hidratação"]
        };
      });
  };

  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        const next = prev + (Math.random() * 4);

        if (next >= 99 && !apiDataRef.current) return 99;
        if (apiDataRef.current && next >= 90) return 100;

        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [loading]);

  useEffect(() => {
    if (loadingProgress < 30) setLoadingStatus("Calculando...");
    else if (loadingProgress < 70) setLoadingStatus("Verificando...");
    else setLoadingStatus("Concluindo...");

    if (loadingProgress >= 100 && apiDataRef.current) {
      setTimeout(() => {
        setResults(apiDataRef.current);
        setLoading(false);
      }, 300);
    }
  }, [loadingProgress]);

  const progress =
    currentStep >= 0
      ? ((currentStep + 1) / (QUESTIONS.length + 1)) * 100
      : 0;

  return (
    <div className="fixed inset-0 h-[100dvh] w-full bg-[#fdfbf7] flex flex-col font-sans overflow-hidden">

      {currentStep >= 0 && !loading && !results && !showVsl && (
        <div className="absolute top-0 left-0 w-full h-[3px] z-50">
          <div
            className="bg-[#0f766e] h-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <main className="flex-1 flex flex-col pt-2 max-w-md mx-auto w-full relative h-full overflow-hidden justify-center">

        {/* CAPA */}
        {currentStep === -1 && !loading && !results && !showVsl && (
          <div className="flex-1 flex flex-col justify-center items-center p-6 text-center gap-6">
            <h1 className="text-2xl font-black text-[#0f766e] uppercase">
              Diagnóstico Metabólico
            </h1>
            <p className="text-slate-600">
              Descubra seu risco de rebote após interromper a medicação.
            </p>
            <button
              onClick={() => setCurrentStep(0)}
              className="w-full py-4 bg-[#0f766e] text-white rounded-xl font-bold uppercase"
            >
              começar avaliação
            </button>
          </div>
        )}

        {/* PERGUNTAS */}
        {isQuestionStep && !loading && !results && !showVsl && currentStep !== 2 && (
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

        {/* NEWS INTERSTITIAL */}
        {isNewsStep && !loading && !results && !showVsl && (
          <div className="flex-1 overflow-y-auto py-4 px-2">
            <NewsInterstitial onNext={handleNext} />
          </div>
        )}

        {/* LOADING */}
        {loading && !showVsl && (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
            <h2 className="text-xl font-bold text-[#0f766e]">
              {Math.round(loadingProgress)}%
            </h2>
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden mt-4">
              <div
                className="bg-[#0f766e] h-full transition-all duration-300"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <p className="text-slate-400 mt-3 text-sm uppercase">
              {loadingStatus}
            </p>
          </div>
        )}

        {/* RESULTADO OU VSL */}
        {(results || showVsl) && !loading && (
          <div className="flex-1 overflow-y-auto">
            {showVsl ? (
              <VslView
                videoType={
                  answers[1] === "sexo_homem"
                    ? "masculina"
                    : "feminina"
                }
                onCheckout={() =>
                  window.open('https://lp.metodopsc.com.br/psc-v1/', '_blank')
                }
              />
            ) : (
              <ResultsView
                results={results!}
                onCtaClick={() => setShowVsl(true)}
              />
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
