
import React from 'react';

interface ChoiceInterstitialProps {
  onNext: () => void;
}

const ChoiceInterstitial: React.FC<ChoiceInterstitialProps> = ({ onNext }) => {
  return (
    <div className="w-full max-w-xl mx-auto animate-fadeIn px-6 text-center space-y-10 pb-10">
      <div className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">
          Você aceita receber um <span className="text-[#0f766e]">Guia de Cardápios Prontos</span> e fáceis de seguir, com o que você já tem em casa, para <span className="text-[#0f766e]">Blindar seu corpo contra o rebote</span>?
        </h2>
        
        <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed max-w-md mx-auto">
          Esqueça dietas caras ou complicadas. Tenha em mãos um passo a passo prático, desenhado para quem tem <span className="font-bold text-slate-800">rotina corrida</span> e precisa manter os resultados das canetas sem esforço.
        </p>
      </div>

      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        Sua próxima fase começa com um clique:
      </p>

      <div className="space-y-4">
        <button
          onClick={onNext}
          className="w-full p-6 bg-white border-2 border-slate-100 rounded-2xl flex items-center shadow-soft hover:border-[#0f766e] hover:bg-teal-50/30 transition-all group"
        >
          <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
            <span className="text-2xl">🥗</span>
          </div>
          <div className="text-left">
            <span className="block font-black text-[#0f766e] text-lg leading-tight tracking-tight uppercase">Sim, quero blindar meu corpo!</span>
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Acessar meus cardápios práticos agora</span>
          </div>
        </button>

        <button
          onClick={onNext}
          className="w-full p-6 bg-white border-2 border-slate-100 rounded-2xl flex items-center shadow-soft hover:border-rose-200 hover:bg-rose-50/30 transition-all group opacity-80"
        >
          <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
            <span className="text-2xl">🔄</span>
          </div>
          <span className="font-bold text-slate-500 text-sm md:text-base text-left leading-tight">
            Não, prefiro continuar tentando por conta própria e arriscar o efeito rebote.
          </span>
        </button>
      </div>

      <div className="pt-4">
        <div className="inline-flex items-center space-x-2 text-[10px] font-black text-emerald-600 uppercase tracking-wider bg-emerald-50 px-4 py-2 rounded-full">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
          <span>Acesso Imediato ao Plano Pós-Quiz</span>
        </div>
      </div>
    </div>
  );
};

export default ChoiceInterstitial;
