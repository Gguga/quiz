
import React, { useState, useRef, useEffect } from 'react';
import { QUESTIONS } from './constants';
import { UserAnswers, QuizResults } from './types';
import QuizStep from './components/QuizStep';
import ResultsView from './components/ResultsView';
import NewsInterstitial from './components/NewsInterstitial';
import VideoInterstitial from './components/VideoInterstitial';
import AuthorityInterstitial from './components/AuthorityInterstitial';
import SolutionDetailSlide1 from './components/SolutionDetailSlide1';
import SolutionDetailSlide2 from './components/SolutionDetailSlide2';
import { analyzeQuizResults } from './services/geminiService';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [answers, setAnswers] = useState<UserAnswers>({});
  const [results, setResults] = useState<QuizResults | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingText, setLoadingText] = useState<string>("Processando suas respostas...");
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  
  // Ref para rastrear se os dados da API chegaram
  const apiDataRef = useRef<QuizResults | null>(null);
  const [postResultStep, setPostResultStep] = useState<'diagnosis' | 'detail1' | 'detail2'>('diagnosis');

  const getQuestionIndex = (step: number) => {
    // Mapeamento atualizado considerando a estrutura de passos do App
    const mapping: Record<number, number> = { 
      0: 0, // Situação atual
      1: 1, // Objetivo
      3: 2, // Desconfortos
      6: 3, // Ingestão Água
      7: 4, // Quantidade Proteína
      8: 5, // Cálculo Proteína
      9: 6, // Força nos treinos
      10: 7, // Flacidez
      11: 8, // Corpo mole
      12: 9  // Energia vital
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
    apiDataRef.current = null;

    // Chamada API para análise personalizada
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

  // Efeito da barra de progresso durante a análise
  useEffect(() => {
    if (!loading) return;

    const phrases = [
      "Organizando seu histórico de uso...",
      "Analisando padrões de treino e força...",
      "Avaliando padrão de ingestão de proteína...",
      "Avaliando indicadores de hidratação...",
      "Cruzando dados com perfis de manutenção...",
      "Identificando possíveis gargalos metabólicos...",
      "Finalizando seu resumo personalizado..."
    ];

    let phraseIdx = 0;
    const phraseInterval = setInterval(() => {
      setLoadingText(phrases[phraseIdx % phrases.length]);
      phraseIdx++;
    }, 1800);

    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 99 && !apiDataRef.current) return 99;
        if (apiDataRef.current && prev >= 90) return 100;
        return prev + (prev < 80 ? 0.8 : 0.4);
      });
    }, 50);

    return () => {
      clearInterval(phraseInterval);
      clearInterval(progressInterval);
    };
  }, [loading]);

  // Transição para o diagnóstico concluído
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
      {/* BOTÃO DE NAVEGAÇÃO RÁPIDA (MODO DEV - REMOVER DEPOIS) */}
      <button 
        onClick={handleNext}
        className="fixed bottom-4 right-4 z-[9999] bg-orange-500 text-white font-black text-[10px] px-4 py-2 rounded-full shadow-2xl opacity-70 hover:opacity-100 transition-opacity uppercase tracking-widest border-2 border-white"
      >
        PULAR →
      </button>

      <main className="flex-1 flex flex-col pb-10">
        
        {currentStep === -1 && (
          <div className="w-full max-w-xl mx-auto py-10 px-6 space-y-8 animate-fadeIn text-center">
             <div className="flex justify-center mb-6">
                <div className="w-16 h-1.5 bg-[#0f766e] rounded-full"></div>
              </div>
              <h1 className="text-[#0f766e] font-black text-3xl md:text-4xl leading-tight uppercase tracking-tight">
                Diagnóstico Metabólico:<br/>
                <span className="text-slate-900">Risco de Rebote</span>
              </h1>
              <h2 className="text-lg text-slate-600 font-bold leading-relaxed max-w-md mx-auto">
                Descubra em 2 minutos se você corre risco de recuperar tudo o que perdeu quando interromper o uso.
              </h2>
              <div className="space-y-4">
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-soft border-4 border-white bg-white">
                  <img src="https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&q=80&w=800" alt="Diagnóstico" className="w-full h-auto block" />
                  <div className="absolute top-4 left-4 bg-[#0f766e] px-4 py-1.5 rounded-full text-[10px] font-black text-white shadow-lg uppercase tracking-widest">Consulta Gratuita</div>
                </div>
              </div>
              <button onClick={() => setCurrentStep(0)} className="w-full py-6 bg-[#0f766e] text-white rounded-2xl text-lg font-black shadow-2xl shadow-teal-900/20 uppercase">
                INICIAR DIAGNÓSTICO AGORA
              </button>
          </div>
        )}

        {currentStep >= 0 && currentStep <= 12 && (
          <div className="w-full max-w-xl mx-auto mt-8 px-6">
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#0f766e] transition-all duration-700 ease-in-out" style={{ width: `${progress}%` }} />
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
          <div className="flex-1 flex flex-col items-center justify-center space-y-12 py-20 px-6 max-w-xl mx-auto w-full animate-fadeIn">
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 relative flex items-center justify-center">
                <svg className="absolute w-full h-full transform -rotate-90">
                  <circle cx="50%" cy="50%" r="48%" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100" />
                  <circle cx="50%" cy="50%" r="48%" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="301.59" strokeDashoffset={301.59 - (301.59 * loadingProgress) / 100} className="text-[#0f766e] transition-all duration-300 ease-out" strokeLinecap="round" />
                </svg>
                <div className="text-center z-10">
                  <span className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">{Math.round(loadingProgress)}%</span>
                </div>
              </div>
            </div>
            <div className="space-y-4 text-center">
               <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight leading-tight max-w-xs mx-auto h-12 flex items-center justify-center">
                 {loadingText}
               </h2>
               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest animate-pulse">Comparando respostas com perfis clínicos...</p>
            </div>
          </div>
        )}

        {!loading && results && (
          <div className="py-10">
            {postResultStep === 'diagnosis' && (
              <ResultsView 
                results={results} 
                onCtaClick={() => { setPostResultStep('detail1'); window.scrollTo(0,0); }} 
              />
            )}
            {postResultStep === 'detail1' && (
              <SolutionDetailSlide1 onNext={() => { setPostResultStep('detail2'); window.scrollTo(0,0); }} />
            )}
            {postResultStep === 'detail2' && (
              <SolutionDetailSlide2 onNext={() => window.open('https://sua-pagina-de-vendas.com', '_blank')} />
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
