
import React from 'react';
import { QuizResults } from './types';

const ResultsView: React.FC<{results: QuizResults, onCtaClick: () => void}> = ({ results, onCtaClick }) => (
  <div className="w-full max-w-xl mx-auto space-y-8 animate-fadeIn text-center">
    <div className="space-y-2">
      <span className="bg-rose-100 text-rose-700 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
        Análise Concluída
      </span>
      <h2 className="text-3xl font-black text-slate-900">Seu Risco: <span className="text-[#0f766e]">{results.score}%</span></h2>
    </div>

    <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 space-y-6">
      <div className={`py-2 px-6 rounded-full inline-block font-black uppercase text-xs ${
        results.riskLevel === 'Alto' ? 'bg-amber-100 text-amber-700' : 'bg-teal-100 text-teal-700'
      }`}>
        Nível {results.riskLevel}
      </div>
      
      <p className="text-slate-600 font-medium leading-relaxed">
        {results.personalizedMessage}
      </p>

      <div className="bg-slate-50 p-6 rounded-2xl text-left space-y-3">
        <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest">Próximos Passos:</h4>
        <ul className="space-y-2">
          {results.keyInsights.map((insight, i) => (
            <li key={i} className="text-sm text-slate-600 flex items-start">
              <span className="text-[#0f766e] mr-2">✓</span> {insight}
            </li>
          ))}
        </ul>
      </div>

      <button 
        onClick={onCtaClick} 
        className="w-full py-6 bg-[#0f766e] text-white rounded-2xl font-black text-xl shadow-xl shadow-teal-900/20 uppercase animate-pulse"
      >
        Acessar Protocolo Anti-Rebote
      </button>
    </div>
  </div>
);

export default ResultsView;


