
import React, { useState, useRef, useEffect } from 'react';
import { QUESTIONS } from './constants';
import { UserAnswers, QuizResults } from './types';
import QuizStep from './QuizStep';
import ResultsView from './ResultsView';
import { analyzeQuizResults } from './geminiService';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [answers, setAnswers] = useState<UserAnswers>({});
  const [results, setResults] = useState<QuizResults | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  
  const apiDataRef = useRef<QuizResults | null>(null);

  // Mapeamento simples das perguntas existentes em constants.tsx
  const handleSelectOption = (value: string) => {
    const questionId = QUESTIONS[currentStep]?.id;
    if (questionId !== undefined) {
      setAnswers(prev => ({ ...prev, [questionId]: value }));
    }
  };

  const handleNext = () => {
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      startAnalysis();
    }
  };

  const startAnalysis = () => {
    setLoading(true);
    setLoadingProgress(0);
    analyzeQuizResults(answers).then(res => {
      apiDataRef.current = res;
    }).catch(() => {
      apiDataRef.current = {
        score: 85,
        riskLevel: "Alto",
        personalizedMessage: "Risco elevado de rebote metabólico detectado.",
        keyInsights: ["Aumente a ingestão de proteínas.", "Inicie treinos de força."]
      };
    });
  };

  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 99 && !apiDataRef.current) return 99;
        if (apiDataRef.current && prev >= 90) return 100;
        return prev + 1;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [loading]);

  useEffect(() => {
    if (loadingProgress >= 100 && apiDataRef.current) {
      setResults(apiDataRef.current);
      setLoading(false);
    }
  }, [loadingProgress]);

  return (
    <div className="min-h-screen bg-[#fdfbf7] flex flex-col font-sans">
      <main className="flex-1 flex flex-col items-center py-10 px-6">
        
        {/* Tela Inicial */}
        {currentStep === -1 && !loading && !results && (
          <div className="w-full max-w-xl text-center space-y-8 animate-fadeIn mt-10">
            <h1 className="text-[#0f766e] font-black text-4xl uppercase tracking-tighter leading-tight">
              Diagnóstico de <br/><span className="text-slate-900">Risco Rebote</span>
            </h1>
            <p className="text-slate-600 font-medium">
              Descubra em 2 minutos se o seu metabolismo está protegido ou se você corre risco de recuperar o peso após as canetas.
            </p>
            <button 
              onClick={() => setCurrentStep(0)} 
              className="w-full py-6 bg-[#0f766e] text-white rounded-2xl text-xl font-black shadow-xl shadow-teal-900/20 uppercase"
            >
              Começar Avaliação
            </button>
          </div>
        )}

        {/* Quiz */}
        {currentStep >= 0 && currentStep < QUESTIONS.length && !loading && !results && (
          <div className="w-full max-w-xl space-y-8">
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-[#0f766e] h-full transition-all duration-500" 
                style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>
            <QuizStep
              question={QUESTIONS[currentStep]}
              selectedOption={answers[QUESTIONS[currentStep].id] || null}
              onSelect={handleSelectOption}
              onNext={handleNext}
              onBack={() => setCurrentStep(prev => prev - 1)}
              isFirst={currentStep === 0}
              isLast={currentStep === QUESTIONS.length - 1}
            />
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex-1 flex flex-col items-center justify-center space-y-6 text-center">
            <div className="text-6xl font-black text-[#0f766e]">{loadingProgress}%</div>
            <h2 className="text-xl font-bold text-slate-800 uppercase tracking-widest">
              Analisando Perfil Metabólico...
            </h2>
          </div>
        )}

        {/* Resultados */}
        {results && !loading && (
          <ResultsView 
            results={results} 
            onCtaClick={() => window.open('https://lp.metodopsc.com.br/psc-v1/', '_blank')} 
          />
        )}
      </main>
    </div>
  );
};

export default App;
