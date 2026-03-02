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
  const [animateGraph, setAnimateGraph] = useState<boolean>(false);
  const [stageCompleted, setStageCompleted] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateGraph(true), 500);
    return () => clearTimeout(timer);
  }, []);

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

  const getStageInfo = () => {
    const index = getQuestionIndex();

    if (index <= 3) {
      return {
        label: "Etapa 1 • Perfil Metabólico",
        total: 4,
        position: index + 1
      };
    }

    if (index <= 7) {
      return {
        label: "Etapa 2 • Proteção Muscular",
        total: 4,
        position: index - 3
      };
    }

    return {
      label: "Etapa 3 • Estrutura Alimentar",
      total: 3,
      position: index - 7
    };
  };

  const handleSelectOption = (value: string) => {
    const questionIndex = getQuestionIndex();
    const questionId = QUESTIONS[questionIndex].id;
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const triggerStageComplete = (text: string) => {
    setStageCompleted(text);
    setTimeout(() => setStageCompleted(null), 1200);
  };

  const handleNext = () => {
    const questionIndex = getQuestionIndex();

    if (questionIndex === 3) {
      triggerStageComplete("Perfil Metabólico mapeado");
    }

    if (questionIndex === 7) {
      triggerStageComplete("Proteção Muscular analisada");
    }

    if (questionIndex === QUESTIONS.length - 1) {
      startAnalysis();
      return;
    }

    setCurrentStep(prev => prev + 1);
  };

  const calculateScore = (): QuizResults => {
    let score = 65;
    let riskLevel: "Moderado" | "Alto" | "Crítico" = "Moderado";

    const insights: string[] = [];

    // PERSONALIZAÇÃO ALIMENTAÇÃO
    if (answers[7] === "proteina_3") {
      insights.push("Você já distribui proteína em 3 refeições. Isso é um bom começo, mas o ajuste fino na quantidade é o que realmente protege na transição.");
    }

    if (answers[8] === "proteina_feeling") {
      insights.push("Você tem noção aproximada da proteína. Transformar isso em um número claro por dia reduz muito o risco de rebote.");
    }

    if (answers[9] === "dieta_feeling") {
      insights.push("Ajustar tudo no feeling funciona no começo, mas na retirada da medicação isso costuma falhar.");
      riskLevel = "Alto";
      score = 75;
    }

    if (answers[6] === "forca_nao_treina") {
      insights.push("Sem treino de força estruturado, a chance de perder massa magra aumenta — e isso acelera o reganho.");
      riskLevel = "Alto";
      score = 80;
    }

    const personalizedMessage =
      "Seu diagnóstico mostra pontos específicos que podem colocar seu resultado em risco quando a dose mudar. Existe um detalhe simples que muda completamente o desfecho.";

    return {
      score,
      riskLevel,
      personalizedMessage,
      keyInsights: insights
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

  const stageInfo = isQuestionStep ? getStageInfo() : null;
  const stagePercent = stageInfo
    ? Math.round((stageInfo.position / stageInfo.total) * 100)
    : 0;

  return (
    <div className="min-h-screen w-full bg-[#f5f6f7] flex flex-col font-sans">

      {isQuestionStep && !loading && !results && !showVsl && stageInfo && (
        <div className="w-full px-6 pt-6 space-y-2">
          <div className="flex justify-between text-xs font-semibold text-slate-500">
            <span>{stageInfo.label}</span>
            <span>{stagePercent}%</span>
          </div>

          <div className="w-full h-[6px] bg-slate-200 rounded-full overflow-hidden">
            <div
              className="bg-[#0f766e] h-full transition-all duration-500"
              style={{ width: `${stagePercent}%` }}
            />
          </div>
        </div>
      )}

      {stageCompleted && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
          <div className="bg-white px-8 py-6 rounded-2xl shadow-xl text-center space-y-3">
            <div className="text-3xl">✔️</div>
            <p className="font-bold text-[#0f766e]">{stageCompleted}</p>
          </div>
        </div>
      )}

      <main className="flex-1 w-full max-w-md mx-auto">

        {currentStep === -1 && !loading && !results && !showVsl && (
          <div className="flex flex-col items-center px-6 text-center space-y-8 pt-20">
            <h1 className="text-3xl font-black text-[#0f766e]">
              Risco de Rebote
            </h1>

            <button
              onClick={() => setCurrentStep(0)}
              className="w-full py-6 bg-[#0f766e] text-white rounded-2xl font-black uppercase mt-6 shadow-xl"
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

        {loading && (
          <div className="flex flex-col items-center justify-center text-center p-6 pt-24 space-y-6">
            <h2 className="text-xl font-black text-[#0f766e] uppercase">
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

        {showVsl && !loading && <VslView />}
      </main>
    </div>
  );
};

export default App;
