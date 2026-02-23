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
  const [loadingStatus, setLoadingStatus] = useState<string>("Analisando respostas...");

  const isQuestionStep =
    currentStep >= 0 && currentStep < QUESTIONS.length;

  const isNewsStep = currentStep === 5;

  const handleSelectOption = (value: string) => {
    const questionId = QUESTIONS[currentStep].id;
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      startAnalysis();
    }
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
    if (normalized < 40) normalized = 42;

    let riskLevel = "Moderado";
    if (normalized >= 75) riskLevel = "Crítico";
    else if (normalized >= 60) riskLevel = "Alto";

    return {
      score: Math.round(normalized),
      riskLevel,
      personalizedMessage: "",
      keyInsights: []
    };
  };

  const startAnalysis = () => {
    setLoading(true);
    setLoadingProgress(0);

    const result = calculateScore();

    setTimeout(() => {
      setResults(result);
      setLoading(false);
    }, 2200);
  };

  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        const next = prev + (Math.random() * 3);
        return next >= 100 ? 100 : next;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [loading]);

  useEffect(() => {
    if (loadingProgress < 30) setLoadingStatus("Analisando padrão metabólico...");
    else if (loadingProgress < 70) setLoadingStatus("Calculando risco de rebote...");
    else setLoadingStatus("Finalizando diagnóstico...");
  }, [loadingProgress]);

  const progress =
    currentStep >= 0
      ? ((currentStep + 1) / QUESTIONS.length) * 100
      : 0;

  const getSexo = () => {
    const sexoAnswer = Object.values(answers).find(v =>
      v === "sexo_homem" || v === "sexo_mulher"
    );
    return sexoAnswer === "sexo_homem" ? "masculina" : "feminina";
  };

  return (
    <div className="fixed inset-0 h-[100dvh] w-full bg-[#f5f6f7] flex flex-col font-sans overflow-hidden">

      {currentStep >= 0 && !loading && !results && !showVsl && (
        <div className="absolute top-0 left-0 w-full h-[4px] bg-slate-200">
          <div
            className="bg-black h-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <main className="flex-1 flex flex-col max-w-md mx-auto w-full justify-center">

        {/* 🔥 CAPA ESTILO DA IMAGEM */}
        {currentStep === -1 && !loading && !results && !showVsl && (
          <div className="flex-1 flex flex-col justify-center items-center p-6 text-center space-y-6">

            <div className="bg-teal-100 text-teal-700 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
              Avaliação Gratuita
            </div>

            <h1 className="text-3xl font-black text-teal-700 leading-tight">
              DIAGNÓSTICO METABÓLICO:
            </h1>

            <h2 className="text-3xl font-black text-slate-900 leading-tight">
              RISCO DE REBOTE
            </h2>

            <p className="text-slate-600 text-base leading-relaxed">
              Descubra em <span className="font-bold">2 minutos</span> seu risco de rebote após interromper a medicação.
            </p>

            {/* Comparativo Visual */}
            <div className="grid grid-cols-2 gap-4 w-full mt-4">

              <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
                <div className="w-6 h-20 bg-slate-200 rounded-full relative overflow-hidden">
                  <div className="absolute bottom-0 w-full h-4 bg-green-500 rounded-full"></div>
                </div>
                <p className="mt-3 text-sm font-semibold text-slate-700">Baixo risco</p>
              </div>

              <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
                <div className="w-6 h-20 bg-slate-200 rounded-full relative overflow-hidden">
                  <div className="absolute bottom-0 w-full h-16 bg-red-500 rounded-full"></div>
                </div>
                <p className="mt-3 text-sm font-semibold text-slate-700">Alto risco</p>
              </div>

            </div>

            <button
              onClick={() => setCurrentStep(0)}
              className="w-full py-5 bg-[#0f766e] text-white rounded-xl font-black uppercase text-base mt-4"
            >
              Começar avaliação gratuita
            </button>

          </div>
        )}

        {/* PERGUNTAS */}
        {isQuestionStep && !loading && !results && !showVsl && currentStep !== 5 && (
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
          <div className="flex-1 overflow-y-auto py-4 px-2">
            <NewsInterstitial onNext={handleNext} />
          </div>
        )}

        {/* LOADING */}
        {loading && (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
            <h2 className="text-xl font-bold text-teal-700">
              {Math.round(loadingProgress)}%
            </h2>
            <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden mt-4">
              <div
                className="bg-teal-700 h-full transition-all duration-300"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <p className="text-slate-500 mt-3 text-xs uppercase tracking-wider">
              {loadingStatus}
            </p>
          </div>
        )}

        {/* RESULTADO / VSL */}
        {(results || showVsl) && !loading && (
          <div className="flex-1 overflow-y-auto">
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
