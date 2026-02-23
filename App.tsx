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
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const isQuestionStep =
    currentStep >= 0 && currentStep < QUESTIONS.length;

  const isNewsStep = currentStep === 2;

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

  // ---------------------------
  // 🔥 CÁLCULO PERSONALIZADO
  // ---------------------------
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

    // 🔹 RISCO CENTRAL
    let centralRisk = "";
    const fase = answers[3];

    if (fase === "uso_atual_perda") {
      centralRisk = "Alto risco de dependência da medicação para manutenção do peso.";
    } else if (fase === "uso_atual_plato") {
      centralRisk = "Indícios de adaptação metabólica durante o uso da medicação.";
    } else if (fase === "uso_desmame") {
      centralRisk = "Alto risco de rebote durante a fase de redução da medicação.";
    } else if (fase === "uso_parou_rebote") {
      centralRisk = "Reversão metabólica em curso após interrupção da medicação.";
    } else {
      centralRisk = "Alto risco de dependência da medicação para manutenção do peso.";
    }

    // 🔹 RISCO SECUNDÁRIO
    let secondaryRisk = "";

    if (
      answers[7] === "proteina_0_1" ||
      answers[8] === "proteina_nunca" ||
      answers[8] === "proteina_feeling"
    ) {
      secondaryRisk = "Ingestão proteica insuficiente para preservação muscular.";
    }
    else if (
      answers[9] === "forca_caiu_muito" ||
      answers[9] === "forca_caiu_pouco" ||
      answers[9] === "forca_nao_treina"
    ) {
      secondaryRisk = "Indícios de perda progressiva de massa muscular.";
    }
    else if (
      answers[4] === "tempo_longo" ||
      answers[4] === "tempo_eterno"
    ) {
      secondaryRisk = "Sinais de adaptação metabólica crônica.";
    }
    else if (answers[6] === "agua_baixa") {
      secondaryRisk = "Baixa sustentação comportamental para manutenção.";
    }

    return {
      score,
      riskLevel: score >= 75 ? "Crítico" : score >= 60 ? "Alto" : "Moderado",
      personalizedMessage: centralRisk,
      keyInsights: secondaryRisk ? [secondaryRisk] : []
    };
  };

  const startAnalysis = () => {
    setLoading(true);
    setLoadingProgress(0);

    const result = calculateScore();

    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setResults(result);
          setLoading(false);
          return 100;
        }
        return prev + 5;
      });
    }, 120);
  };

  const progress =
    currentStep >= 0
      ? ((currentStep + 1) / QUESTIONS.length) * 100
      : 0;

  const getSexo = () => {
    return answers[1] === "sexo_homem" ? "masculina" : "feminina";
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

        {/* CAPA COM GRÁFICO */}
        {currentStep === -1 && !loading && !results && !showVsl && (
          <div className="flex flex-col items-center p-6 text-center space-y-8 pt-20">

            <h1 className="text-3xl font-black text-[#0f766e] leading-tight">
              TESTE GRATUITO
            </h1>

            <p className="text-slate-600">
              Descubra seu risco de rebote após interromper a medicação.
            </p>

            <div className="grid grid-cols-2 gap-6 w-full mt-2">

              <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
                <div className="w-6 h-24 bg-slate-200 rounded-full relative overflow-hidden">
                  <div
                    className="absolute bottom-0 w-full bg-green-500 rounded-full transition-all duration-700"
                    style={{ height: animateGraph ? '20%' : '0%' }}
                  />
                </div>
                <p className="mt-3 text-sm font-semibold text-slate-700">
                  Baixo risco
                </p>
              </div>

              <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
                <div className="w-6 h-24 bg-slate-200 rounded-full relative overflow-hidden">
                  <div
                    className="absolute bottom-0 w-full bg-red-500 rounded-full transition-all duration-700"
                    style={{ height: animateGraph ? '80%' : '0%' }}
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
        {isQuestionStep && !loading && !results && !showVsl && currentStep !== 2 && (
     <QuizStep
  question={QUESTIONS[currentStep]}
  selectedOption={answers[QUESTIONS[currentStep].id] || null}
  onSelect={handleSelectOption}
  onNext={handleNext}
  onBack={() => setCurrentStep(prev => prev - 1)}
  isFirst={currentStep === 0}
  answers={answers}
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
          <div className="flex flex-col items-center justify-center text-center p-6 pt-24 space-y-6">

            <h2 className="text-xl font-black text-[#0f766e] uppercase">
              Triagem Clínica em Andamento
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
              {loadingProgress > 80 && <p>✔ Classificação de risco estruturada</p>}
            </div>

          </div>
        )}

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
