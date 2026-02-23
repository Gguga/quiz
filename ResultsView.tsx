import React from 'react';
import { QuizResults } from './types';

const ResultsView: React.FC<{results: QuizResults, onCtaClick: () => void}> = ({ results, onCtaClick }) => {

  return (
    <div className="w-full max-w-xl mx-auto px-6 pb-20 pt-12 space-y-10 animate-fadeIn">

      {/* HEADER */}
      <div className="text-center space-y-4">

        <div className="inline-block bg-teal-50 text-[#0f766e] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-teal-100">
          Diagnóstico Concluído
        </div>

        {/* PERCENTUAL GRANDE */}
        <div className="flex flex-col items-center">
          <h2 className="text-7xl font-black text-slate-900 tracking-tighter">
            {results.score}%
          </h2>
          <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] mt-2">
            Índice de Vulnerabilidade Metabólica
          </p>
        </div>

      </div>

      {/* RISCO CENTRAL */}
      <div className="text-center space-y-3">
        <h3 className="text-xl font-bold text-slate-900 leading-snug">
          {results.personalizedMessage}
        </h3>
      </div>

      {/* RISCO SECUNDÁRIO */}
      {results.keyInsights.length > 0 && (
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <p className="text-amber-800 font-semibold text-sm leading-relaxed">
            {results.keyInsights[0]}
          </p>
        </div>
      )}

      {/* CONCLUSÃO CLÍNICA */}
      <div className="text-center">
        <p className="text-slate-600 font-medium text-sm leading-relaxed max-w-md mx-auto">
          Seu emagrecimento ainda não está sustentado por estrutura metabólica consolidada.
        </p>
      </div>

      {/* CTA */}
      <div className="pt-6">
        <button
          onClick={onCtaClick}
          className="w-full py-6 bg-[#0f766e] hover:bg-[#134e4a] text-white rounded-2xl font-black text-lg transition-all shadow-xl shadow-teal-900/40 uppercase"
        >
          Ver protocolo recomendado
        </button>
      </div>

      {/* DISCLAIMER */}
      <div className="text-center pt-4">
        <p className="text-slate-400 font-medium text-[10px] leading-relaxed max-w-sm mx-auto uppercase tracking-tighter">
          *Este diagnóstico tem caráter informativo e não substitui avaliação médica presencial.
        </p>
      </div>

    </div>
  );
};

export default ResultsView;
