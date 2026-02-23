import React, { useState, useEffect } from 'react';
import { QUESTIONS } from './constants';
import { UserAnswers, QuizResults } from './types';
import QuizStep from './QuizStep';
import ResultsView from './ResultsView';
import VslView from './components/VslView';
import NewsInterstitial from './components/NewsInterstitial';

const NEWS_STEP = 4;

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

  // ================= FLUXO =================

  const handleNext = () => {

    if (currentStep === NEWS_STEP - 1) {
      setCurrentStep(NEWS_STEP);
      return;
    }

    if (currentStep === NEWS_STEP) {
      setCurrentStep(NEWS_STEP + 1);
      return;
    }

    if (currentStep === QUESTIONS.length - 1) {
      startAnalysis();
      return;
    }

    setCurrentStep(prev => prev + 1);
  };

  const handleSelectOption = (value: string) => {
    const questionId = QUESTIONS[currentStep].id;
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  // ================= CÁLCULO =================

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

    const score = Math.round(normalized);

    return {
      score,
      riskLevel: score >= 75 ? "Crítico" : score >= 60 ? "Alto" : "Moderado",
      personalizedMessage: "",
      keyInsights: []
    };
  };

  // ================= LOADING =================

  const startAnalysis = () => {

    setLoading(true);
    setLoadingProgress(0);

    const result = calculateScore();

    let progressValue = 0;

    const interval = setInterval(() => {

      progressValue += Math.random() * 4 + 1;

      if (progressValue >= 100) {
        progressValue = 100;
        clearInterval(interval);

        setTimeout(() => {
          setResults(result);
          setLoading(false);
        }, 400);
      }

      setLoadingProgress(progressValue);

    }, 120);
  };

  const getSexo = () => {
    return answers[1] === "sexo_homem" ? "masculina" : "feminina";
  };

  const progress =
    currentStep >= 0
      ? ((currentStep + 1) / QUESTIONS.length) * 100
      : 0;

  const isQuestionStep =
    currentStep >= 0 &&
    currentStep < QUESTIONS.length &&
    currentStep !== NEWS_STEP;

  const isNewsStep = currentStep === NEWS_STEP;

  return (
    <div className="min-h-screen w-full bg-[#f5f6f7] flex flex-col font-sans">

      {currentStep >= 0 && !loading && !results && !showVsl && (
        <div className="w-full h-[4px] bg-slate-200">
          <div
            className="bg-black h-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <main className="flex-1 w-full max-w-md mx-auto">

        {/* CAPA */}
        {currentStep === -1 && !loading && !results && !showVsl && (
          <div className="flex flex-col items-center px-6 text-center space-y-8 pt-24">

            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
                Diagnóstico Gratuito
              </p>

              <h1 className="text-3xl md:text-4xl font-black text-[#0f766e] leading-tight">
                Risco de Rebote
              </h1>

              <h2 className="text-base md:text-lg text-slate-600 max-w-sm mx-auto leading-relaxed">
                Descubra em 2 minutos seu risco de recuperar o peso após interromper a medicação.
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-6 w-full mt-4">

              <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
                <div className="w-8 h-28 bg-slate-200 rounded-full relative overflow-hidden">
                  <div
                    className="absolute bottom-0 w-full bg-green-500 rounded-full transition-all duration-[2000ms]"
                    style={{ height: animateGraph ? '22%' : '0%' }}
                  />
                </div>
                <p className="mt-4 text-sm font-semibold text-slate-700">
                  Baixo risco
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
                <div className="w-8 h-28 bg-slate-200 rounded-full relative overflow-hidden">
                  <div
                    className="absolute bottom-0 w-full bg-red-500 rounded-full transition-all duration-[2000ms]"
                    style={{ height: animateGraph ? '82%' : '0%' }}
                  />
                </div>
                <p className="mt-4 text-sm font-semibold text-slate-700">
                  Alto risco
                </p>
              </div>

            </div>

            <button
              onClick={() => setCurrentStep(0)}
              className="w-full py-6 bg-[#0f766e] text-white rounded-2xl font-black uppercase mt-6 shadow-xl"
            >
              Começar Avaliação Gratuita
            </button>

            <p className="text-xs text-slate-400 pt-6">
              © 2026 Protocolo Anti-Rebote
            </p>

          </div>
        )}

        {/* PERGUNTAS */}
        {isQuestionStep && !loading && !results && !showVsl && (
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
        {isNewsStep && !loading && !results && !showVsl && (
          <div className="py-6 px-4">
            <NewsInterstitial onNext={handleNext} />
          </div>
        )}

        {/* LOADING */}
        {loading && (
          <div className="flex flex-col items-center justify-center text-center p-6 pt-24 space-y-8">

            <h2 className="text-xl font-black text-[#0f766e] uppercase">
              Analisando Seu Perfil Metabólico
            </h2>

            <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
              <div
                className="bg-[#0f766e] h-full transition-all duration-300"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>

            <div className="text-sm text-slate-600 space-y-2">
              {loadingProgress > 20 && <p>✔ Histórico metabólico analisado</p>}
              {loadingProgress > 40 && <p>✔ Fase da medicação identificada</p>}
              {loadingProgress > 60 && <p>✔ Indicadores musculares avaliados</p>}
              {loadingProgress > 80 && <p>✔ Classificação de risco concluída</p>}
            </div>

          </div>
        )}

        {/* RESULTADO + VSL */}
        {(results || showVsl) && !loading && (
          <div className="py-6 px-4">
            {showVsl ? (
              <VslView
                videoType={getSexo()}
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
          </div>
        )}

      </main>
    </div>
  );
};

export default App;
