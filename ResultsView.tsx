
import React from 'react';
import { QuizResults } from './types';

const ResultsView: React.FC<{results: QuizResults, onCtaClick: () => void}> = ({ results, onCtaClick }) => (
  <div className="w-full max-w-xl mx-auto p-6 text-center space-y-6">
    <h2 className="text-3xl font-black">Seu Resultado: <span className="text-[#0f766e]">{results.score}%</span></h2>
    <div className="bg-rose-50 p-4 rounded-xl border border-rose-200">
      <p className="text-rose-700 font-bold">{results.personalizedMessage}</p>
    </div>
    <button onClick={onCtaClick} className="w-full py-6 bg-slate-900 text-white rounded-2xl font-black">VER PROTOCOLO</button>
  </div>
);
export default ResultsView;
