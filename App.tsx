
import React, { useState, useRef, useEffect } from 'react';
import { QUESTIONS } from './constants';
import { UserAnswers, QuizResults } from './types';
import QuizStep from './QuizStep';
import ResultsView from './ResultsView';
import VslView from './components/VslView';
import NewsInterstitial from './components/NewsInterstitial';
import VideoInterstitial from './components/VideoInterstitial';
import AuthorityInterstitial from './components/AuthorityInterstitial';
import { analyzeQuizResults } from './services/geminiService';

// Importação direta da imagem para garantir que o Vite a encontre na raiz do projeto
import capaImg from './capa.jpeg';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [answers, setAnswers] = useState<UserAnswers>({});
  const [results, setResults] = useState<QuizResults | null>(null);
  const [showVsl, setShowVsl] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [loadingStatus, setLoadingStatus] = useState<string>("Analisando...");
  const [animateCharts, setAnimateCharts] = useState<boolean>(false);
  
  const apiDataRef = useRef<QuizResults | null>(null);

  useEffect(() => {
    if (currentStep === -1) {
      const timer = setTimeout(() => setAnimateCharts(true), 300);
      return () => clearTimeout(timer);
    } else {
      setAnimateCharts(false);
    }
  }, [currentStep]);

  const getQuestionIndex = (step: number) => {
    const mapping: Record<number, number> = { 
      0: 0, 1: 1, 3: 2, 6: 3, 7: 4, 8: 5, 9: 6, 10: 7, 11: 8, 12: 9, 13: 10, 14: 11
    };
    return mapping[step] !== undefined ? mapping[step] : null;
  };

  const handleSelectOption = (value: string) => {
    const qIdx = getQuestionIndex(currentStep);
    if (qIdx !== null) {
      const questionId = QUESTIONS[qIdx].id;
      setAnswers(prev => ({ ...prev, [questionId]: value }));
    }
  };

  const handleNext = () => {
    if (currentStep < 14) {
      setCurrentStep(prev => prev + 1);
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
        personalizedMessage: "Risco elevado detectado.",
        keyInsights: ["Proteínas", "Treino", "Hidratação"]
      };
    });
  };

  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        const next = prev + (Math.random() * 4);
        if (next >= 99 && !apiDataRef.current) return 99;
        if (apiDataRef.current && next >= 90) return 100;
        return next;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [loading]);

  useEffect(() => {
    if (loadingProgress < 30) setLoadingStatus("Calculando...");
    else if (loadingProgress < 70) setLoadingStatus("Verificando...");
    else setLoadingStatus("Concluindo...");

    if (loadingProgress >= 100 && apiDataRef.current) {
      setTimeout(() => {
        setResults(apiDataRef.current);
        setLoading(false);
      }, 300);
    }
  }, [loadingProgress]);

  const qIdx = getQuestionIndex(currentStep);
  const totalSteps = 15;
  const progress = currentStep >= 0 ? ((currentStep + 1) / totalSteps) * 100 : 0;

  return (
    <div className="fixed inset-0 h-[100dvh] w-full bg-[#fdfbf7] flex flex-col font-sans overflow-hidden">
      {currentStep >= 0 && currentStep <= 14 && !loading && !results && !showVsl && (
        <div className="absolute top-0 left-0 w-full h-[3px] z-50">
          <div className="bg-[#0f766e] h-full transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      )}

      <main className="flex-1 flex flex-col max-w-md mx-auto w-full relative h-full overflow-hidden">
        {currentStep === -1 && !loading && !results && !showVsl && (
          <div className="flex-1 flex flex-col justify-between py-3 px-6 text-center animate-fadeIn h-full overflow-hidden">
            
            {/* Topo: Títulos Ultra Compactos */}
            <div className="shrink-0 space-y-0.5">
              <span className="bg-white text-[#0f766e] px-3 py-0.5 rounded-full text-[9px] font-black uppercase border border-teal-100 shadow-sm inline-block tracking-widest">Avaliação Gratuita</span>
              <h1 className="text-[#64a39e] font-black text-xl md:text-2xl uppercase tracking-tighter leading-none mt-1">Diagnóstico Metabólico</h1>
              <h2 className="text-slate-600 font-bold text-base md:text-lg uppercase tracking-tight leading-none">Risco de Rebote</h2>
            </div>

            {/* Meio: Foto com Importação Garantida */}
            <div className="flex-1 flex items-center justify-center min-h-0 py-1">
              <div className="relative group max-h-[130px] md:max-h-[160px] w-auto">
                <img 
                  src={capaImg} 
                  alt="Protocolo Pós-Caneta" 
                  className="max-h-[130px] md:max-h-[160px] w-auto rounded-[1.5rem] shadow-xl border-[5px] border-white object-contain"
                />
              </div>
            </div>

            {/* Texto de Apoio e Gráficos Super Compactos */}
            <div className="shrink-0 space-y-2.5">
              <p className="text-slate-500 font-medium text-[10px] md:text-sm leading-snug px-4">
                Descubra em 2 min seu <span className="font-black text-slate-700 uppercase">risco de reganho</span> após interromper a medicação.
              </p>

              <div className="flex flex-row w-full gap-2 justify-center items-center">
                <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-1.5 flex-1 flex flex-col items-center max-w-[85px]">
                  <div className="w-full bg-slate-50 h-7 rounded-lg relative overflow-hidden flex flex-col justify-end">
                     <div 
                      className="bg-emerald-500 w-full rounded-b-lg flex items-center justify-center transition-all duration-[1500ms] ease-out" 
                      style={{ height: animateCharts ? '20%' : '0%' }}
                     >
                       <span className={`text-[6px] font-black text-white ${animateCharts ? 'opacity-100' : 'opacity-0'}`}>20%</span>
                     </div>
                  </div>
                  <span className="text-[7px] font-bold text-slate-400 uppercase mt-1 leading-none">Baixo Risco</span>
                </div>

                <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-1.5 flex-1 flex flex-col items-center max-w-[85px]">
                  <div className="w-full bg-slate-50 h-7 rounded-lg relative overflow-hidden flex flex-col justify-end">
                     <div 
                      className="bg-red-600 w-full rounded-b-lg flex items-center justify-center transition-all duration-[1500ms] ease-out" 
                      style={{ height: animateCharts ? '90%' : '0%' }}
                     >
                       <span className={`text-[6px] font-black text-white ${animateCharts ? 'opacity-100' : 'opacity-0'}`}>90%</span>
                     </div>
                  </div>
                  <span className="text-[7px] font-black text-red-600 uppercase mt-1 leading-none">Alto Risco</span>
                </div>
              </div>
            </div>

            {/* Base: Botão com altura fixa para não gerar scroll */}
            <div className="shrink-0 pt-2 pb-3">
              <button 
                onClick={() => setCurrentStep(0)} 
                className="w-full py-3.5 bg-[#0f766e] text-white rounded-xl text-lg font-black uppercase shadow-lg active:scale-95 transition-transform tracking-tight"
              >
                começar avaliação
              </button>
            </div>
          </div>
        )}

        {qIdx !== null && !loading && !results && !showVsl && (
          <div className="flex-1 overflow-y-auto no-scrollbar">
            <QuizStep
              question={QUESTIONS[qIdx]}
              selectedOption={answers[QUESTIONS[qIdx].id] || null}
              onSelect={handleSelectOption}
              onNext={handleNext}
              onBack={() => setCurrentStep(prev => prev - 1)}
              isFirst={currentStep === 0}
              isLast={currentStep === 14}
            />
          </div>
        )}

        {(currentStep === 2 || currentStep === 4 || currentStep === 5) && !loading && !showVsl && (
          <div className="flex-1 overflow-y-auto no-scrollbar py-4 px-2">
            {currentStep === 2 && <NewsInterstitial onNext={handleNext} />}
            {currentStep === 4 && <AuthorityInterstitial onNext={handleNext} />}
            {currentStep === 5 && <VideoInterstitial onNext={handleNext} />}
          </div>
        )}

        {loading && !showVsl && (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 animate-fadeIn">
            <div className="w-full max-w-xs space-y-6 bg-white p-8 rounded-[2rem] shadow-xl border border-slate-50">
              <div className="space-y-2">
                <h2 className="text-xl font-black text-[#0f766e] uppercase tracking-widest">{Math.round(loadingProgress)}%</h2>
                <div className="w-full bg-slate-50 h-3 rounded-full overflow-hidden">
                  <div className="bg-[#0f766e] h-full transition-all duration-300" style={{ width: `${loadingProgress}%` }} />
                </div>
              </div>
              <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em]">{loadingStatus}</p>
            </div>
          </div>
        )}

        {(results || showVsl) && !loading && (
          <div className="flex-1 overflow-y-auto no-scrollbar">
            {showVsl ? (
              <VslView onCheckout={() => window.open('https://lp.metodopsc.com.br/psc-v1/', '_blank')} />
            ) : (
              <ResultsView 
                results={results!} 
                onCtaClick={() => setShowVsl(true)} 
              />
            )}
          </div>
        )}
      </main>
      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
};

export default App;

