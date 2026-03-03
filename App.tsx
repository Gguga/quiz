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
        position: index,
        isLast: index === 3
      };
    }

    if (index <= 7) {
      return {
        label: "Etapa 2 • Proteção Muscular",
        total: 4,
        position: index - 4,
        isLast: index === 7
      };
    }

    return {
      label: "Etapa 3 • Estrutura Alimentar",
      total: 3,
      position: index - 8,
      isLast: index === 10
    };
  };

  const handleSelectOption = (value: string) => {
    const questionIndex = getQuestionIndex();
    const questionId = QUESTIONS[questionIndex].id;
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const triggerStageComplete = (text: string) => {
    setStageCompleted(text);
    setTimeout(() => setStageCompleted(null), 1400);
  };

  const handleNext = () => {

    const questionIndex = getQuestionIndex();

    if (questionIndex === 3) {
      triggerStageComplete("Perfil metabólico identificado");
    }

    if (questionIndex === 7) {
      triggerStageComplete("Proteção muscular analisada");
    }

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

    const sinaisDetectados = criticalCount + moderateCount;

    let score =
      40 +
      criticalCount * 18 +
      moderateCount * 9 +
      Math.floor(Math.random() * 6) - 3;

    score = Math.max(42, Math.min(score, 95));

    let riskLevel: "Moderado" | "Alto" | "Crítico";

    if (score >= 88) riskLevel = "Crítico";
    else if (score >= 72) riskLevel = "Alto";
    else riskLevel = "Moderado";

    const indiceMetabolico =
      100 - score + Math.floor(Math.random() * 6) - 3;

    let comparacaoPopulacional = "";

    if (riskLevel === "Crítico") {
      comparacaoPopulacional =
        "Seu perfil apresenta um padrão metabólico frequentemente associado a alto risco de recuperação de peso.";
    }
    else if (riskLevel === "Alto") {
      comparacaoPopulacional =
        "Seu perfil apresenta características acima da média observada em outros usuários avaliados.";
    }
    else {
      comparacaoPopulacional =
        "Seu perfil está dentro de uma faixa intermediária observada neste diagnóstico.";
    }

    const insights: string[] = [];

    if (answers[6] === "forca_nao_treina") {
      insights.push("Ausência de estímulo de musculação para preservar massa muscular");
    }

    if (answers[5] === "forca_caiu_muito") {
      insights.push("Queda de força detectada durante o processo de emagrecimento");
    }

    if (answers[7] === "proteina_0_1" || answers[8] === "proteina_nunca") {
      insights.push("Ingestão de proteína abaixo da faixa de preservação muscular");
    }

    if (answers[4] === "uso_parou_rebote") {
      insights.push("Sinais iniciais de recuperação de peso após interrupção da medicação");
    }

    if (answers[9] === "dieta_feeling") {
      insights.push("Estrutura alimentar sem estratégia metabólica consistente");
    }

    if (answers[6] === "forca_irregular") {
      insights.push("Treino de força irregular ao longo do processo");
    }

    const keyInsights = insights.slice(0, 3);

    return {
      score,
      riskLevel,
      personalizedMessage:
        "Seu perfil apresenta fatores que podem comprometer a estabilidade do peso após o emagrecimento.",
      keyInsights,
      sinaisDetectados,
      comparacaoPopulacional,
      indiceMetabolico
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
        }, 1400);
      }

    }, 150);
  };

  const stageInfo = isQuestionStep ? getStageInfo() : null;

  const stagePercent =
    stageInfo
      ? (() => {
        const raw = Math.round(((stageInfo.position + 1) / stageInfo.total) * 100);

        if (stageCompleted) return 100;

        if (stageInfo.isLast) return Math.min(raw, 92);

        return raw;
      })()
      : 0;

  const questionNumber = getQuestionIndex() + 1;
  const totalQuestions = QUESTIONS.length;

  return (
    <div className="min-h-screen w-full bg-[#f5f6f7] flex flex-col font-sans">

      {isQuestionStep && !loading && !results && !showVsl && stageInfo && (

        <div className="w-full px-6 pt-6 space-y-3">

          {/* INDICADOR PERGUNTA X DE Y */}

          <div className="flex justify-center text-xs font-semibold text-slate-500">
            Pergunta {questionNumber} de {totalQuestions}
          </div>

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
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50 pointer-events-auto">
          <div className="bg-white px-8 py-6 rounded-2xl shadow-xl text-center space-y-3 pointer-events-none">
            <div className="text-3xl">✔️</div>
            <p className="font-bold text-[#0f766e]">{stageCompleted}</p>
          </div>
        </div>
      )}

      <main className="flex-1 w-full max-w-md mx-auto">

        {currentStep === -1 && !loading && !results && !showVsl && (

          <div className="flex flex-col items-center px-6 text-center space-y-8 pt-20">

            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
                Diagnóstico Gratuito
              </p>

              <h1 className="text-3xl md:text-4xl font-black text-[#0f766e]">
                Risco de Rebote
              </h1>

              <h2 className="text-base text-slate-600 max-w-sm mx-auto">
                Emagrecer é só a primeira etapa. Descubra se você tem estrutura para manter.
              </h2>
            </div>

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

        {isNewsStep && !loading && !results && !showVsl && (

          <div className="py-6 px-4">
            <NewsInterstitial onNext={handleNext} />
          </div>

        )}

        {loading && (

          <div className="flex flex-col items-center justify-center text-center p-6 pt-24 space-y-6">

            <h2 className="text-xl font-black text-[#0f766e] uppercase">
              Gerando Diagnóstico Personalizado
            </h2>

            <p className="text-xs text-slate-500">
              Seu perfil está sendo comparado com padrões metabólicos observados em outros usuários.
            </p>

            <div className="space-y-2 text-sm text-slate-500 font-medium">
              {loadingProgress > 5 && <p>✓ Processando respostas...</p>}
              {loadingProgress > 25 && <p>✓ Analisando estímulo muscular...</p>}
              {loadingProgress > 45 && <p>✓ Calculando ingestão proteica...</p>}
              {loadingProgress > 65 && <p>✓ Identificando padrão metabólico...</p>}
              {loadingProgress > 85 && (
                <p className="font-bold text-[#0f766e]">
                  ✓ Gerando diagnóstico final...
                </p>
              )}
            </div>

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
