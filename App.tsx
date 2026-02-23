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

  // 🔥 animação do gráfico
  const [animateGraph, setAnimateGraph] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateGraph(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2600);
  };

  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        const next = prev + (Math.random() * 4);
        return next >= 100 ? 100 : next;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [loading]);

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
          <div className="flex flex-col items-center p-6 text-center space-y-8 pt-20">

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

            {/* 🔥 GRÁFICO */}
            <div className="grid grid-cols-2 gap-6 w-full mt-2">

              {/* BAIXO RISCO */}
              <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
                <div className="w-6 h-24 bg-slate-200 rounded-full relative overflow-hidden">
                  <div
                    className="absolute bottom-0 w-full bg-green-500 rounded-full transition-all duration-700"
                    style={{
                      height: animateGraph ? '20%' : '0%'
                    }}
                  />
                </div>
                <p className="mt-3 text-sm font-semibold text-slate-700">
                  Baixo risco
                </p>
              </div>

              {/* ALTO RISCO */}
              <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
                <div className="w-6 h-24 bg-slate-200 rounded-full relative overflow-hidden">
                  <div
                    className="absolute bottom-0 w-full bg-red-500 rounded-full transition-all duration-700"
                    style={{
                      height: animateGraph ? '80%' : '0%'
                    }}
                  />
                </div>
                <p className="mt-3 text-sm font-semibold text-slate-700">
                  Alto risco
                </p>
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
          <div className="py-6 px-4">
            <NewsInterstitial onNext={handleNext} />
          </div>
        )}

        {/* LOADING */}
        {loading && (
          <div className="flex flex-col items-center justify-center text-center p-6 pt-24">
            <p className="text-slate-600 font-medium">
              Estruturando relatório clínico...
            </p>
          </div>
        )}

        {/* RESULTADO / VSL */}
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
