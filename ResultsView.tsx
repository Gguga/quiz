
import React from 'react';
import { QuizResults } from './types';

const ResultsView: React.FC<{results: QuizResults, onCtaClick: () => void}> = ({ results, onCtaClick }) => {
  const displayRisk = results.riskLevel === 'Crítico' ? 'Elevado' : results.riskLevel;

  return (
    <div className="w-full max-w-xl mx-auto space-y-8 animate-fadeIn px-6 pb-20">
      <div className="text-center space-y-4">
        <div className="inline-block bg-teal-50 text-[#0f766e] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-teal-100">
          Triagem Concluída
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight tracking-tight">
          Análise de Risco e <br/><span className="text-[#0f766e]">Protocolo de Intervenção</span>
        </h2>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden">
        <div className="p-8 md:p-10 text-center space-y-8">
          
          <div className="space-y-4">
            <span className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border ${
              results.riskLevel === 'Alto' ? 'text-amber-700 bg-amber-50 border-amber-100' : 'text-teal-700 bg-teal-50 border-teal-100'
            }`}>
              Nível de Atenção: {displayRisk}
            </span>
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-7xl font-black text-slate-900 tracking-tighter">{results.score}%</h3>
              <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] mt-2">
                Probabilidade de Adaptação Metabólica
              </p>
            </div>
          </div>

          <div className="bg-rose-50 p-5 rounded-2xl border border-rose-100">
            <p className="text-rose-700 font-bold text-sm md:text-base leading-snug">
              <span className="text-rose-800 font-black">ALERTA:</span> Risco alto de reganho, importante corrigir a estrutura alimentar agora.
            </p>
          </div>

          <div className="text-left space-y-4">
            <p className="text-slate-600 font-medium text-sm md:text-base leading-relaxed">
              Você apresenta um perfil com <span className="font-bold text-slate-900">vulnerabilidade à perda de massa magra</span> e platô metabólico.
            </p>
            <p className="text-slate-600 font-medium text-sm md:text-base leading-relaxed">
              Esse padrão indica que a retirada da medicação sem uma estratégia de transição resultará no efeito rebote.
            </p>
          </div>

          <div className="py-4 border-t border-slate-100">
             <p className="text-[#0f766e] font-black text-sm md:text-base leading-snug">
               ✅ Perfil qualificado para o protocolo de blindagem metabólica.
             </p>
          </div>
        </div>

        <div className="p-8 bg-slate-900 text-white text-center space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold leading-tight uppercase tracking-tight">
              Acessar seu <span className="text-teal-400">Protocolo Anti-Rebote</span>
            </h3>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
              Manual prático para proteger seu investimento e seu novo peso.
            </p>
          </div>
          
          <button
            onClick={onCtaClick}
            className="w-full py-6 bg-[#0f766e] hover:bg-[#134e4a] text-white rounded-2xl font-black text-lg transition-all shadow-xl shadow-teal-900/40 uppercase animate-pulse"
          >
            VER PROTOCOLO AGORA
          </button>
        </div>
      </div>

      <div className="px-4 text-center">
        <p className="text-slate-400 font-medium text-[10px] leading-relaxed max-w-sm mx-auto uppercase tracking-tighter">
          *Este material tem caráter informativo e não substitui consulta médica ou nutricional presencial.
        </p>
      </div>
    </div>
  );
};

export default ResultsView;
