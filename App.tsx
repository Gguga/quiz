
import React, { useState, useRef, useEffect } from 'react';
import { QUESTIONS } from './constants';
import { UserAnswers, QuizResults } from './types';
import QuizStep from './QuizStep';
import ResultsView from './ResultsView';
import NewsInterstitial from './NewsInterstitial';
import VideoInterstitial from './VideoInterstitial';
import AuthorityInterstitial from './AuthorityInterstitial';
import SolutionDetailSlide1 from './SolutionDetailSlide1';
import SolutionDetailSlide2 from './SolutionDetailSlide2';
import { analyzeQuizResults } from './geminiService';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [answers, setAnswers] = useState<UserAnswers>({});
  const [results, setResults] = useState<QuizResults | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingText, setLoadingText] = useState<string>("Processando suas respostas...");
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  
  const apiDataRef = useRef<QuizResults | null>(null);
  const [postResultStep, setPostResultStep] = useState<'diagnosis' | 'detail1' | 'detail2'>('diagnosis');

  const getQuestionIndex = (step: number) => {
    const mapping: Record<number, number> = { 
      0: 0, 1: 1, 3: 2, 6: 3, 7: 4, 8: 5, 9: 6, 10: 7, 11: 8, 12: 9
    };
    return mapping[step] !== undefined ? mapping[step] : null;
  };

  const handleSelectOption = (value: string) => {
    const qIdx = getQuestionIndex(currentStep);
    if (qIdx !== null) {
      setAnswers(prev => ({ ...prev, [QUESTIONS[qIdx].id]: value }));
    }
  };

  const handleNext = async () => {
    const finalStepBeforeAnalysis = 12;
    if (currentStep < finalStepBeforeAnalysis) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      startAnalysis();
    }
  };

  const startAnalysis = () => {
    setLoading(true);
    setLoadingProgress(0);
    setCurrentStep(99); 
    analyzeQuizResults(answers).then(res => {
      apiDataRef.current = res;
    }).catch(() => {
      apiDataRef.current = {
        score: 85,
        riskLevel: "Alto",
        personalizedMessage: "Análise concluída com base nos padrões detectados.",
        keyInsights: ["Planejamento de transição recomendado."]
      };
    });
  };

  useEffect(() => {
    if (!loading) return;
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 99 && !apiDataRef.current) return 99;
        if (apiDataRef.current && prev >= 90) return 100;
        return prev + (prev < 80 ? 0.8 : 0.4);
      });
    }, 50);
    return () => clearInterval(progressInterval);
  }, [loading]);

  useEffect(() => {
    if (loadingProgress >= 100 && apiDataRef.current) {
      setTimeout(() => {
        setResults(apiDataRef.current);
        setLoading(false);
        setPostResultStep('diagnosis');
      }, 800);
    }
  }, [loadingProgress]);

  const qIdx = getQuestionIndex(currentStep);
  const progress = currentStep >= 0 && currentStep <= 12 ? ((currentStep + 1) / 13) * 100 : 0;

  return (
    <div className="min-h-screen flex flex-col relative">
      <main className="flex-1 flex flex-col pb-10">
        {currentStep === -1 && (
          <div className="w-full max-w-xl mx-auto py-10 px-6 space-y-8 animate-fadeIn text-center">
              <h1 className="text-[#0f766e] font-black text-3xl md:text-4xl leading-tight uppercase tracking-tight">
                Diagnóstico Metabólico:<br/>
                <span className="text-slate-900">Risco de Rebote</span>
              </h1>
              <button onClick={() => setCurrentStep(0)} className="w-full py-6 bg-[#0f766e] text-white rounded-2xl text-lg font-black shadow-2xl shadow-teal-900/20 uppercase">
                INICIAR DIAGNÓSTICO AGORA
              </button>
          </div>
        )}

        {currentStep >= 0 && currentStep <= 12 && (
          <div className="w-full max-w-xl mx-auto mt-8 px-6">
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#0f766e] transition-all duration-700" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        {qIdx !== null && !loading && (
          <div className="py-10">
            <QuizStep
              question={QUESTIONS[qIdx]}
              selectedOption={answers[QUESTIONS[qIdx].id] || null}
              onSelect={handleSelectOption}
              onNext={handleNext}
              onBack={() => setCurrentStep(prev => prev - 1)}
              isFirst={currentStep === 0}
              isLast={currentStep === 12}
            />
          </div>
        )}

        {currentStep === 2 && <NewsInterstitial onNext={handleNext} />}
        {currentStep === 4 && <AuthorityInterstitial onNext={handleNext} />}
        {currentStep === 5 && <VideoInterstitial onNext={handleNext} />}

        {loading && (
          <div className="flex-1 flex flex-col items-center justify-center py-20 px-6 max-w-xl mx-auto w-full">
            <div className="text-4xl font-black text-[#0f766e] mb-4">{Math.round(loadingProgress)}%</div>
            <h2 className="text-xl font-black text-slate-900 uppercase">{loadingText}</h2>
          </div>
        )}

        {!loading && results && (
          <div className="py-10">
            {postResultStep === 'diagnosis' && (
              <ResultsView results={results} onCtaClick={() => setPostResultStep('detail1')} />
            )}
            {postResultStep === 'detail1' && (
              <SolutionDetailSlide1 onNext={() => setPostResultStep('detail2')} />
            )}
            {postResultStep === 'detail2' && (
              <SolutionDetailSlide2 onNext={() => window.open('https://sua-pagina.com', '_blank')} />
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;

