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

    let score = 48;
    let riskLevel: "Moderado" | "Alto" | "Crítico" = "Moderado";

    if (criticalCount >= 2) {
      score = 90;
      riskLevel = "Crítico";
    }
    else if (criticalCount === 1 && moderateCount >= 1) {
      score = 90;
      riskLevel = "Crítico";
    }
    else if (criticalCount === 1) {
      score = 75;
      riskLevel = "Alto";
    }
    else if (moderateCount >= 2) {
      score = 75;
      riskLevel = "Alto";
    }
    else if (moderateCount === 1) {
      score = 65;
      riskLevel = "Moderado";
    }

    // 🔥 COMENTÁRIOS PERSONALIZADOS

    let insights: string[] = [];

    if (answers[4] === "uso_parou_rebote") {
      insights.push("O peso já começou a reagir sem a medicação. Isso mostra que a base alimentar ainda não está sustentando o resultado.");
    }

    if (answers[4] === "uso_desmame") {
      insights.push("Você está numa fase sensível. O desmame exige ajuste fino na alimentação para evitar ganho silencioso nas próximas semanas.");
    }

    if (answers[4] === "uso_atual_plato") {
      insights.push("O platô indica que o corpo já reduziu o gasto energético mais do que parece.");
    }

    if (answers[5] === "forca_caiu_muito") {
      insights.push("Queda forte de força sugere perda de massa muscular, o que reduz seu metabolismo.");
    }

    if (answers[6] === "forca_nao_treina") {
      insights.push("Sem treino de força, o corpo preserva menos músculo durante o emagrecimento.");
    }

    if (answers[6] === "forca_irregular") {
      insights.push("Treinar sem progressão clara dificulta manter massa muscular.");
    }

    if (answers[7] === "proteina_0_1") {
      insights.push("Pouca proteína ao longo do dia aumenta risco de perda muscular.");
    }

    if (answers[7] === "proteina_2") {
      insights.push("Duas refeições com proteína pode não ser suficiente para proteger totalmente sua massa magra.");
    }

    if (answers[7] === "proteina_3") {
      insights.push("Três refeições com proteína ajudam, mas a distribuição ainda pode ser otimizada.");
    }

    if (answers[8] === "proteina_nunca") {
      insights.push("Não calcular proteína normalmente leva a ingestão abaixo do ideal.");
    }

    if (answers[8] === "proteina_feeling") {
      insights.push("Ter noção aproximada é positivo, mas pequenas diferenças diárias já impactam seu metabolismo.");
    }

    if (answers[9] === "dieta_reduzi") {
      insights.push("Apenas reduzir quantidades não garante manutenção após a retirada da medicação.");
    }

    if (answers[9] === "dieta_feeling") {
      insights.push("Ajustar alimentação no feeling costuma falhar na fase pós-medicação.");
    }

    if (answers[9] === "dieta_emagrecer") {
      insights.push("Focar só em emagrecer sem estruturar a fase seguinte aumenta risco de rebote.");
    }

    if (answers[10] === "colateral_varios") {
      insights.push("Vários colaterais indicam estresse metabólico adaptativo.");
    }

    if (answers[10] === "colateral_cansaco") {
      insights.push("Cansaço constante pode sinalizar ingestão abaixo do ideal.");
    }

    if (answers[10] === "colateral_digestivo") {
      insights.push("Alterações digestivas frequentes indicam possível desequilíbrio alimentar.");
    }

    if (insights.length === 0) {
      insights.push("Sua base está acima da média. O ponto crítico agora está na fase pós-medicação, onde pequenos ajustes fazem grande diferença.");
    }

    return {
      score,
      riskLevel,
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
      {/* RESTO DO APP PERMANECE EXATAMENTE IGUAL */}
    </div>
  );
};

export default App;
