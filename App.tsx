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
      return { label: "Etapa 1 • Perfil Metabólico", total: 4, position: index + 1 };
    }

    if (index <= 7) {
      return { label: "Etapa 2 • Proteção Muscular", total: 4, position: index - 3 };
    }

    return { label: "Etapa 3 • Estrutura Alimentar", total: 3, position: index - 7 };
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

    if (questionIndex === 3) triggerStageComplete("Perfil Metabólico mapeado");
    if (questionIndex === 7) triggerStageComplete("Proteção Muscular analisada");

    if (questionIndex === QUESTIONS.length - 1) {
      startAnalysis();
      return;
    }

    setCurrentStep(prev => prev + 1);
  };

  const calculateScore = (): QuizResults => {

    const insights: string[] = [];

    // 🔥 COMENTÁRIOS POR RESPOSTA

    Object.values(answers).forEach(value => {

      switch (value) {

        case "uso_parou_rebote":
          insights.push("O peso já começou a reagir sem a medicação. Isso mostra que a base alimentar ainda não está sustentando o resultado.");
          break;

        case "uso_desmame":
          insights.push("Você está numa fase sensível. O desmame exige ajuste estratégico para evitar ganho silencioso.");
          break;

        case "uso_atual_plato":
          insights.push("O platô indica que seu metabolismo já reduziu o gasto energético.");
          break;

        case "forca_caiu_muito":
          insights.push("Queda forte de força pode indicar perda de massa muscular.");
          break;

        case "forca_irregular":
          insights.push("Treinar sem progressão clara dificulta proteger a massa magra.");
          break;

        case "forca_nao_treina":
          insights.push("Sem treino de força, a tendência é perder mais músculo durante o emagrecimento.");
          break;

        case "proteina_0_1":
          insights.push("Consumir proteína em apenas 1 refeição aumenta risco de perda muscular.");
          break;

        case "proteina_2":
          insights.push("Duas refeições com proteína podem não ser suficientes para proteger totalmente sua massa magra.");
          break;

        case "proteina_3":
          insights.push("Três refeições com proteína é positivo, mas a quantidade e distribuição ainda podem ser otimizadas.");
          break;

        case "proteina_feeling":
          insights.push("Ter noção aproximada da proteína é bom, mas pequenas diferenças diárias impactam diretamente seu metabolismo.");
          break;

        case "proteina_nunca":
          insights.push("Não calcular proteína normalmente leva a ingestão abaixo do necessário.");
          break;

        case "dieta_reduzi":
          insights.push("Apenas reduzir quantidades não garante manutenção após a retirada.");
          break;

        case "dieta_feeling":
          insights.push("Ajustar alimentação no feeling aumenta risco de rebote.");
          break;

        case "dieta_emagrecer":
          insights.push("Focar só em emagrecer sem estruturar a fase seguinte aumenta risco de reganho.");
          break;

        case "colateral_varios":
          insights.push("Vários colaterais indicam estresse metabólico adaptativo.");
          break;

        case "colateral_cansaco":
          insights.push("Cansaço constante pode indicar ingestão inadequada.");
          break;

        case "colateral_digestivo":
          insights.push("Alterações digestivas frequentes indicam possível desequilíbrio alimentar.");
          break;
      }

    });

    if (insights.length === 0) {
      insights.push("Sua base está acima da média. O ponto crítico agora está na fase pós-medicação.");
    }

    return {
      score: 75,
      riskLevel: "Alto",
      personalizedMessage: insights.join("\n\n"),
      keyInsights: []
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

      <main className="flex-1 w-full max-w-md mx-auto">
        {/* RESTO DO APP PERMANECE EXATAMENTE COMO ESTAVA */}
      </main>
    </div>
  );
};

export default App;
