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

  const getManipulatedProgress = (index: number) => {

    const map = [
      18, 27, 39, 52, 61, 70, 79, 86, 92, 96, 100
    ];

    return map[index] || 100;
  };

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

    const sinaisDetectados = criticalCount + moderateCount;

    let score =
      55 +
      criticalCount * 12 +
      moderateCount * 7 +
      Math.floor(Math.random() * 5) - 2;

    score = Math.max(60, Math.min(score, 88));

    let riskLevel: "Baixo" | "Moderado" | "Alto" | "Crítico";

    if (score >= 85) riskLevel = "Crítico";
    else if (score >= 72) riskLevel = "Alto";
    else if (score >= 60) riskLevel = "Moderado";
    else riskLevel = "Baixo";

    const indiceMetabolico =
      100 - score + Math.floor(Math.random() * 5) - 2;

    let comparacaoPopulacional = "";

    if (riskLevel === "Crítico") {

      comparacaoPopulacional =
        "Seu perfil apresenta um padrão frequentemente observado em pessoas que recuperam peso após interromper o processo de emagrecimento.";

    } else if (riskLevel === "Alto") {

      comparacaoPopulacional =
        "Seu perfil apresenta características acima da média observada em outros usuários avaliados neste diagnóstico.";

    } else {

      comparacaoPopulacional =
        "Seu perfil está dentro de uma faixa intermediária observada neste diagnóstico.";

    }

    const insights: string[] = [];

    if (answers[6] === "forca_nao_treina") {
      insights.push("Ausência de estímulo de musculação para preservar massa muscular");
    }

    if (answers[5] === "forca_caiu_muito") {
      insights.push("Queda relevante de força ao longo do processo");
    }

    if (answers[7] === "proteina_0_1" || answers[8] === "proteina_nunca") {
      insights.push("Ingestão de proteína abaixo da faixa ideal para preservação muscular");
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

        }, 1200);

      }

    }, 120);
  };

  const startQuiz = () => {
    setCurrentStep(0);
  };

  const questionNumber = getQuestionIndex() + 1;
  const totalQuestions = QUESTIONS.length;

  const progressPercent =
    isQuestionStep
      ? getManipulatedProgress(getQuestionIndex())
      : 0;

  return (
    <div className="min-h-screen w-full bg-[#f5f6f7] flex flex-col font-sans">

      {isQuestionStep && !loading && !results && !showVsl && (

        <div className="w-full px-6 pt-6 space-y-3">

          <div className="flex justify-center text-xs font-semibold text-slate-500">
            Pergunta {questionNumber} de {totalQuestions}
          </div>

          <div className="w-full h-[6px] bg-slate-200 rounded-full overflow-hidden">
            <div
              className="bg-[#0f766e] h-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

        </div>

      )}

      <main className="flex-1 w-full max-w-md mx-auto">

        {currentStep === -1 && !loading && !results && !showVsl && (

          <div className="flex flex-col items-center px-6 text-center space-y-10 pt-20">

            <div className="space-y-4">

              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                Diagnóstico metabólico
              </p>

              <h1 className="text-3xl md:text-4xl font-black text-[#0f766e] leading-tight">
                Seu corpo está preparado
                para não recuperar o peso?
              </h1>

              <p className="text-slate-600 text-base max-w-sm mx-auto">
                Algumas pessoas emagrecem e recuperam tudo meses depois.
                Outras conseguem manter.
              </p>

              <p className="text-sm text-amber-600 font-semibold">
                ⚠️ Muitas pessoas descobrem que seu metabolismo ainda
                não está preparado para manter o peso.
              </p>

              <p className="text-xs text-slate-500">
                Leva menos de 2 minutos.
              </p>

            </div>

            <button
              onClick={startQuiz}
              className="w-full py-6 bg-[#0f766e] text-white rounded-2xl font-black uppercase shadow-xl"
            >
              Descobrir meu risco
            </button>

            <div className="text-xs text-slate-400 pt-6">
              Baseado em padrões observados em avaliações metabólicas.
            </div>

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
