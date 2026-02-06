
import React from 'react';
import { QuizResults } from '../types';

interface ResultsViewProps {
  results: QuizResults;
  onCtaClick: () => void;
}

const ResultsView: React.FC<ResultsViewProps> = ({ results, onCtaClick }) => {
  const getRiskStyles = (level: string) => {
    switch (level) {
      case 'Baixo': return 'text-emerald-700 bg-emerald-50 border-emerald-100';
      case 'Moderado': return 'text-slate-600 bg-slate-50 border-slate-200';
      case 'Alto': return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'Crítico': return 'text-slate-800 bg-amber-100 border-amber-300';
      default: return 'text-slate-600 bg-slate-50 border-slate-100';
    }
  };

  const displayRiskLevel = results.riskLevel === 'Crítico' ? 'Elevado' : results.riskLevel;

  return (
    <div className="w-full max-w-xl mx-auto space-y-8 animate-fadeIn px-6 pb-20">
      {/* Header de Triagem Concluída */}
      <div className="text-center space-y-4">
        <div className="inline-block bg-teal-50 text-[#0f766e] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-teal-100">
          Triagem Concluída
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight tracking-tight">
          Análise de Risco e <br/><span className="text-[#0f766e]">Protocolo de Intervenção</span>
        </h2>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-soft border border-slate-100 overflow-hidden">
        <div className="p-8 md:p-10 text-center space-y-8">
          
          {/* Indicador de Risco e Porcentagem */}
          <div className="space-y-4">
            <span className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border ${getRiskStyles(results.riskLevel)}`}>
              Nível de Atenção: {displayRiskLevel}
            </span>
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-7xl font-black text-slate-900 tracking-tighter">{results.score}%</h3>
              <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] mt-2 max-w-[250px] mx-auto">
                Probabilidade Estimada de Adaptação Metabólica
              </p>
            </div>
          </div>

          {/* Box de Alerta Vermelho Solicitado */}
          <div className="bg-rose-50 p-4 rounded-2xl border border-rose-100 animate-fadeIn">
            <p className="text-rose-700 font-bold text-sm md:text-base leading-snug">
              <span className="text-rose-800 font-black">Resultado:</span> Risco alto de reganho, importante corrigir a alimentação
            </p>
          </div>

          {/* Texto de Análise */}
          <div className="text-left space-y-4">
            <p className="text-slate-600 font-medium text-sm md:text-base leading-relaxed">
              Com base nas suas respostas, você apresenta um perfil com <span className="font-bold text-slate-900">maior risco de perda de massa magra</span>, platô de perda de peso e reganho após a retirada da medicação.
            </p>
            <p className="text-slate-600 font-medium text-sm md:text-base leading-relaxed">
              Esse padrão é comum em usuários de injetáveis para emagrecimento quando não existe estratégia nutricional e de transição bem definida.
            </p>
          </div>

          {/* Informação de Adequação */}
          <div className="py-4 border-t border-slate-100">
             <p className="text-[#0f766e] font-black text-sm md:text-base leading-snug">
               ✅ Você tem um perfil que se adequa para a realização do protocolo anti rebote.
             </p>
          </div>
        </div>

        {/* CTA Profissional */}
        <div className="p-8 bg-slate-900 text-white text-center space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold leading-tight uppercase tracking-tight">
              Acessar seu <span className="text-teal-400">Protocolo Anti-Rebote</span>
            </h3>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
              Plano prático para potencializar seu resultado e aproveitar melhor seu investimento no tratamento.
            </p>
          </div>
          
          <button
            onClick={onCtaClick}
            className="w-full py-6 bg-[#0f766e] hover:bg-[#134e4a] text-white rounded-2xl font-black text-lg transition-all shadow-xl shadow-teal-900/20 uppercase"
          >
            VER PROTOCOLO AGORA
          </button>
        </div>
      </div>

      {/* Rodapé: Nota Importante com menos destaque */}
      <div className="px-4 text-center">
        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-2">Nota Importante</p>
        <p className="text-slate-400 font-medium text-[10px] leading-relaxed max-w-sm mx-auto">
          Este material não substitui acompanhamento clínico. É um guia prático de alimentação pra que você aproveite melhor o investimento na medicação e aumente suas chances de manter os resultados no longo prazo.
        </p>
      </div>
    </div>
  );
};

export default ResultsView;
