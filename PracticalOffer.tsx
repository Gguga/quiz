
import React from 'react';

interface Props {
  onNext: () => void;
}

const PracticalOffer: React.FC<Props> = ({ onNext }) => {
  return (
    <div className="w-full max-w-xl mx-auto animate-fadeIn px-6 space-y-8 text-center pb-20">
      {/* Header Informativo */}
      <div className="space-y-4">
        <div className="inline-block bg-teal-50 text-[#0D9488] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-teal-100">
          Triagem Concluída
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight tracking-tight">
          Análise de Risco e <br/><span className="text-[#0D9488]">Protocolo de Intervenção</span>
        </h2>
      </div>

      {/* Bloco de Diagnóstico */}
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-soft p-6 md:p-8 text-left space-y-4">
        <p className="text-slate-700 font-medium text-sm md:text-base leading-relaxed">
          Com base nas suas respostas, você apresenta um perfil com <span className="font-black text-slate-900">maior risco de perda de massa magra</span>, platô de perda de peso e reganho após a retirada da medicação.
        </p>
        <p className="text-slate-700 font-medium text-sm md:text-base leading-relaxed">
          Esse padrão é comum em usuários de injetáveis para emagrecimento quando não existe estratégia nutricional e de transição bem definida.
        </p>
        <div className="bg-amber-50 p-4 rounded-2xl border-l-4 border-amber-400">
          <p className="text-[11px] text-amber-900 font-bold leading-tight uppercase tracking-tight mb-1">Nota Importante:</p>
          <p className="text-[11px] text-amber-800 font-medium leading-relaxed">
            Este material não substitui acompanhamento clínico. Ele funciona como um guia prático de alimentação e estrutura de rotina para ajudar você a aproveitar melhor o investimento na medicação e aumentar as chances de manter os resultados no médio e longo prazo.
          </p>
        </div>
      </div>

      {/* Entrega do Protocolo */}
      <div className="space-y-4 text-left">
        <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest pl-2">O que o protocolo entrega:</h3>
        
        <div className="grid grid-cols-1 gap-3">
          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-start space-x-4">
            <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center shrink-0 text-xl">
              🥗
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-slate-900 text-sm leading-tight uppercase tracking-tight">Cardápios proteicos de fácil adesão</h4>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">Para manter ingestão adequada mesmo com baixa fome e desconforto gastrointestinal.</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-start space-x-4">
            <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center shrink-0 text-xl">
              📉
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-slate-900 text-sm leading-tight uppercase tracking-tight">Estratégias para fase de platô</h4>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">Ajustes práticos de ingestão e estrutura alimentar quando o peso trava.</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-start space-x-4">
            <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center shrink-0 text-xl">
              🔄
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-slate-900 text-sm leading-tight uppercase tracking-tight">Manual de transição pós-medicação</h4>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">Passo a passo para reduzir o risco de reganho nas primeiras semanas sem o fármaco.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Final */}
      <div className="pt-6">
        <button
          onClick={onNext}
          className="w-full py-6 bg-[#0D9488] hover:bg-[#0f766e] text-white rounded-2xl font-black text-lg transition-all shadow-xl shadow-teal-900/20 uppercase tracking-tight flex items-center justify-center space-x-3 group"
        >
          <span className="group-hover:translate-x-1 transition-transform">👉</span>
          <span>Ver protocolo de suporte e transição</span>
        </button>
        
        <div className="mt-6 flex flex-col items-center space-y-2">
            <div className="flex items-baseline space-x-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Apenas</span>
                <span className="text-2xl font-black text-slate-900">R$ 44,00</span>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Acesso Imediato ao Protocolo</p>
        </div>
      </div>
    </div>
  );
};

export default PracticalOffer;
