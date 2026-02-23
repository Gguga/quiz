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
  const [showCommitment, setShowCommitment] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [loadingStatus, setLoadingStatus] = useState<string>("Processando dados metabólicos...");

  const isQuestionStep =
    currentStep >= 0 && currentStep < QUESTIONS.length;

  const isNewsStep = currentStep === 5; 
  // após pergunta de efeito sanfona

  const handleSelectOption = (value: string) => {
    const questionId = QUESTIONS[currentStep].id;
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setShowCommitment(true);
    }
  };

  // 🔥 SCORE CONTROLADO LOCALMENTE
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

    // 🔥 SCORE MÍNIMO ESTRATÉGICO
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
    setShowCommitment(false);
    setLoading(true);
    setLoadingProgress(0);

    const result = calculateScore();

    setTimeout(() => {
      setResults(result);
      setLoading(false);
    }, 2500);
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
    else if (loadingProgress < 70) setLoadingStatus("Verificando risco de adaptação...");
    else setLoadingStatus("Consolidando diagnóstico...");
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
    <div className="fixed inset-0 h-[100dvh] w-full bg-[#fdfbf7] flex flex-col font-sans overflow-hidden">

      {currentStep >= 0 && !loading && !results && !showVsl && !showCommitment && (
        <div className="absolute top-0 left-0 w-full h-[3px] z-50">
          <div
            className="bg-[#0f766e] h-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <main className="flex-1 flex flex-col pt-2 max-w-md mx-auto w-full relative h-full overflow-hidden justify-center">

        {/* CAPA */}
        {currentStep === -1 && !loading && !results && !showVsl && !showCommitment && (
          <div className="flex-1 flex flex-col justify-center items-center p-6 text-center gap-6">
            <h1 className="text-2xl font-black text-[#0f766e] uppercase">
              Avaliação de Consolidação Pós-GLP-1
            </h1>
            <p className="text-slate-600">
              Descubra seu risco estrutural de rebote metabólico.
            </p>
            <button
              onClick={() => setCurrentStep(0)}
              className="w-full py-4 bg-[#0f766e] text-white rounded-xl font-bold uppercase"
            >
              iniciar avaliação
            </button>
          </div>
        )}

        {/* PERGUNTAS */}
        {isQuestionStep && !loading && !results && !showVsl && !showCommitment && currentStep !== 5 && (
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
        {isNewsStep && !loading && !results && !showVsl && !showCommitment && (
          <div className="flex-1 overflow-y-auto py-4 px-2">
            <NewsInterstitial onNext={handleNext} />
          </div>
        )}

        {/* 🔥 MINI COMPROMISSO */}
        {showCommitment && !loading && !results && (
          <div className="flex-1 flex flex-col justify-center items-center p-6 text-center gap-6">
            <h2 className="text-xl font-bold text-slate-900 leading-snug">
              Deseja receber seu diagnóstico personalizado agora?
            </h2>
            <p className="text-slate-500 text-sm max-w-sm">
              Seu perfil será analisado com base nas respostas fornecidas para identificar seu nível de vulnerabilidade metabólica.
            </p>
            <button
              onClick={startAnalysis}
              className="w-full py-5 bg-[#0f766e] text-white rounded-2xl font-black uppercase"
            >
              gerar diagnóstico
            </button>
          </div>
        )}

        {/* LOADING */}
        {loading && (
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
            <p className="text-slate-400 mt-3 text-xs uppercase tracking-wider">
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
