
import React, { useState, useRef, useEffect } from 'react';
import { QUESTIONS } from './constants';
import { UserAnswers, QuizResults } from './types';
import QuizStep from './components/QuizStep';
import ResultsView from './components/ResultsView';
import NewsInterstitial from './components/NewsInterstitial';
import VideoInterstitial from './components/VideoInterstitial';
import AuthorityInterstitial from './components/AuthorityInterstitial';
import { analyzeQuizResults } from './services/geminiService';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [answers, setAnswers] = useState<UserAnswers>({});
  const [results, setResults] = useState<QuizResults | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  
  // Tentativas de nomes de arquivos que vimos no seu GitHub
  const myImages = ['capa.jpeg', 'capa.jpg', 'capa.jpeg.jpeg', '/capa.jpeg'];
  const [imgIdx, setImgIdx] = useState(0);
  const [imgStatus, setImgStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  
  const apiDataRef = useRef<QuizResults | null>(null);

  const getQuestionIndex = (step: number) => {
    const mapping: Record<number, number> = { 
      0: 0, 1: 1, 3: 2, 6: 3, 7: 4, 8: 5, 9: 6, 10: 7, 11: 8, 12: 9
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
    if (currentStep < 12) {
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
        personalizedMessage: "Risco elevado de rebote metabólico detectado devido ao padrão de ingestão proteica e massa magra.",
        keyInsights: ["Priorize o aporte de proteínas.", "Inicie treinos de força.", "Consuma 3L de água."]
      };
    });
  };

  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 99 && !apiDataRef.current) return 99;
        if (apiDataRef.current && prev >= 90) return 100;
        return prev + 0.8;
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

  const handleImageError = () => {
    if (imgIdx < myImages.length - 1) {
      setImgIdx(prev => prev + 1);
    } else {
      setImgStatus('error');
    }
  };

  const handleImageLoad = () => {
    setImgStatus('loaded');
  };

  const qIdx = getQuestionIndex(currentStep);
  const totalSteps = 13;
  const progress = currentStep >= 0 ? ((currentStep + 1) / totalSteps) * 100 : 0;

  return (
    <div className="min-h-screen bg-[#fdfbf7] flex flex-col font-sans">
      <main className="flex-1 flex flex-col items-center py-10 px-6">
        
        {currentStep === -1 && !loading && !results && (
          <div className="w-full max-w-xl text-center space-y-8 animate-fadeIn mt-6">
            <div className="space-y-4">
              <span className="bg-teal-50 text-[#0f766e] px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-teal-100">
                Protocolo Anti-Rebote
              </span>
              <h1 className="text-[#0f766e] font-black text-4xl md:text-5xl uppercase tracking-tighter leading-[0.9] pt-2">
                Diagnóstico Metabólico:<br/>
                <span className="text-slate-900">Risco de Rebote</span>
              </h1>
              
              <h2 className="text-slate-600 font-bold text-lg md:text-xl max-w-md mx-auto leading-tight tracking-tight pt-2">
                Descubra em 2 minutos se você corre risco de recuperar tudo o que perdeu quando parar com a medicação
              </h2>
            </div>

            {/* SLOT DE IMAGEM OTIMIZADO */}
            <div className="relative mx-auto w-full max-w-[380px] aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-100 flex items-center justify-center">
               
               {/* Loader visual enquanto tenta carregar sua imagem */}
               {imgStatus !== 'loaded' && (
                 <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col items-center justify-center p-12 text-center">
                    <div className="w-12 h-12 border-4 border-[#0f766e]/20 border-t-[#0f766e] rounded-full animate-spin mb-4"></div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-tight">
                      {imgStatus === 'error' ? 'Aguardando imagem final...' : 'Processando diagnóstico...'}
                    </p>
                 </div>
               )}

               <img 
                 src={myImages[imgIdx]} 
                 alt="" // Alt vazio para não aparecer o texto se der erro
                 className={`w-full h-full object-cover transition-opacity duration-500 ${imgStatus === 'loaded' ? 'opacity-100' : 'opacity-0'}`}
                 onError={handleImageError}
                 onLoad={handleImageLoad}
               />

               {imgStatus === 'loaded' && (
                 <>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-0 right-0">
                      <p className="text-white text-[10px] font-black uppercase tracking-[0.3em] opacity-90">Análise de Tendência de Reganho</p>
                  </div>
                 </>
               )}
            </div>

            <div className="pt-4">
              <button 
                onClick={() => setCurrentStep(0)} 
                className="w-full py-6 bg-[#0f766e] text-white rounded-2xl text-xl font-black shadow-xl shadow-teal-900/20 uppercase transform active:scale-95 transition-all hover:bg-[#134e4a] animate-pulse"
              >
                começar avaliação gratuita
              </button>
              <p className="text-slate-400 font-bold text-[9px] uppercase tracking-widest mt-4">
                🔒 Resposta rápida e 100% privada
              </p>
            </div>
          </div>
        )}

        {currentStep >= 0 && currentStep <= 12 && !loading && !results && (
          <div className="w-full max-w-xl mb-8">
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-[#0f766e] h-full transition-all duration-700" 
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {qIdx !== null && !loading && !results && (
          <QuizStep
            question={QUESTIONS[qIdx]}
            selectedOption={answers[QUESTIONS[qIdx].id] || null}
            onSelect={handleSelectOption}
            onNext={handleNext}
            onBack={() => setCurrentStep(prev => prev - 1)}
            isFirst={currentStep === 0}
            isLast={currentStep === 12}
          />
        )}

        {currentStep === 2 && !loading && <NewsInterstitial onNext={handleNext} />}
        {currentStep === 4 && !loading && <AuthorityInterstitial onNext={handleNext} />}
        {currentStep === 5 && !loading && <VideoInterstitial onNext={handleNext} />}

        {loading && (
          <div className="flex-1 flex flex-col items-center justify-center space-y-6 text-center py-20">
            <div className="text-7xl font-black text-[#0f766e] tracking-tighter">{Math.round(loadingProgress)}%</div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-slate-800 uppercase tracking-widest">
                Analisando Perfil Metabólico...
              </h2>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-tighter">Cruzando dados com padrões de rebote</p>
            </div>
          </div>
        )}

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
