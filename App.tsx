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

  const isQuestionStep =
    currentStep >= 0 && currentStep < QUESTIONS.length;

  const isNewsStep = currentStep === 4;

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

  // 🔥 CÁLCULO PERSONALIZADO
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

    // 🔴 RISCO CENTRAL
    const fase = answers[4];
    let centralRisk = "";

    if (fase === "uso_atual_perda") {
      centralRisk = "Risco elevado de dependência da medicação para manter o peso.";
    } else if (fase === "uso_atual_plato") {
      centralRisk = "Indícios de adaptação metabólica durante o uso.";
    } else if (fase === "uso_desmame") {
      centralRisk = "Alto risco de rebote na fase de redução.";
    } else if (fase === "uso_parou_rebote") {
      centralRisk = "Reversão metabólica em curso após interrupção.";
    } else {
      centralRisk = "Risco elevado de dependência da medicação para manter o peso.";
    }

    // 🔥 FATORES ESPELHADOS
    const riskFactors: string[] = [];

    // Proteína
    if (answers[8] === "proteina_0_1") {
      riskFactors.push(
        "Você relatou consumir proteína em poucas refeições, o que aumenta o risco de perda muscular durante e após o uso da medicação."
      );
    }

    if (answers[9] === "proteina_nunca" || answers[9] === "proteina_feeling") {
      riskFactors.push(
        "Você informou que não calcula sua ingestão proteica, o que pode comprometer a preservação da massa magra."
      );
    }

    // Força
    if (answers[10] === "forca_caiu_muito") {
      riskFactors.push(
        "Você percebeu queda significativa de força, sinal clássico de perda muscular progressiva."
      );
    }

    if (answers[10] === "forca_nao_treina") {
      riskFactors.push(
        "A ausência de treino de força reduz a proteção contra perda muscular e aumenta o risco de rebote."
      );
    }

    // Histórico
    if (answers[3] === "tempo_longo" || answers[3] === "tempo_eterno") {
      riskFactors.push(
        "Seu histórico prolongado de tentativas indica maior propensão à adaptação metabólica."
      );
    }

    // Colaterais
    if (answers[11] === "colaterais_intensos") {
      riskFactors.push(
        "Os colaterais relatados sugerem possível déficit nutricional durante o processo."
      );
    }

    if (answers[11] === "colaterais_moderados") {
      riskFactors.push(
        "Os sinais físicos relatados indicam que seu corpo pode estar sob estresse metabólico."
      );
    }

    // 🔥 GARANTIR SEMPRE 2
    if (riskFactors.length === 0) {
      riskFactors.push(
        "Mesmo com respostas equilibradas, existe risco silencioso de perda muscular durante o processo."
      );
      riskFactors.push(
        "Sem uma estratégia adequada, a dependência da medicação pode se manter."
      );
    }

    if (riskFactors.length === 1) {
      riskFactors.push(
        "A fase atual do seu processo exige uma estratégia específica para consolidar o resultado."
      );
    }

    return {
      score,
      riskLevel: score >= 75 ? "Crítico" : score >= 60 ? "Alto" : "Moderado",
      personalizedMessage: centralRisk,
      keyInsights: riskFactors.slice(0, 2)
    };
  };

  // 🔥 LOADING REALISTA
  const startAnalysis = () => {
    setLoading(true);
    setLoadingProgress(0);

    const result = calculateScore();

    const interval = setInterval(() => {
      setLoadingProgress(prev => {

        if (prev < 60) return prev + 3;
        if (prev < 85) return prev + 1.5;
        if (prev < 95) return prev + 0.5;

        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setResults(result);
            setLoading(false);
          }, 400);
          return 100;
        }

        return prev + 1;
      });
    }, 140);
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
      <main className="flex-1 w-full max-w-md mx-auto">

        {currentStep === -1 && !loading && !results && !showVsl && (
          <div className="flex flex-col items-center px-6 text-center space-y-8 pt-24">
            <h1 className="text-3xl font-black text-[#0f766e]">
              Diagnóstico Metabólico
            </h1>

            <div className="grid grid-cols-2 gap-6 w-full mt-4">

              <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
                <div className="w-8 h-28 bg-slate-200 rounded-full relative overflow-hidden">
                  <div
                    className="absolute bottom-0 w-full bg-green-500 rounded-full transition-all duration-[1900ms]"
                    style={{
                      height: animateGraph ? '22%' : '0%',
                      transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                    }}
                  />
                </div>
                <p className="mt-4 text-sm font-semibold text-slate-700">
                  Baixo risco
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
                <div className="w-8 h-28 bg-slate-200 rounded-full relative overflow-hidden">
                  <div
                    className="absolute bottom-0 w-full bg-red-500 rounded-full transition-all duration-[1900ms]"
                    style={{
                      height: animateGraph ? '82%' : '0%',
                      transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                    }}
                  />
                </div>
                <p className="mt-4 text-sm font-semibold text-slate-700">
                  Alto risco
                </p>
              </div>

            </div>

            <button
              onClick={() => setCurrentStep(0)}
              className="w-full py-5 bg-[#0f766e] text-white rounded-2xl font-black uppercase mt-6"
            >
              Começar Avaliação Gratuita
            </button>

          </div>
        )}

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
