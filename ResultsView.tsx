import React from 'react';
import { QuizResults, UserAnswers } from './types';

const ResultsView: React.FC<{
  results: QuizResults;
  answers: UserAnswers;
  onCtaClick: () => void;
}> = ({ results, answers, onCtaClick }) => {

  const generateRiskFactors = () => {
    const factors: string[] = [];

    // 🔹 Proteína baixa
    if (answers[8] === "proteina_0_1") {
      factors.push("Ingestão proteica insuficiente para preservação muscular.");
    }

    if (answers[9] === "proteina_nunca" || answers[9] === "proteina_feeling") {
      factors.push("Proteína não está estrategicamente calculada.");
    }

    // 🔹 Força / treino
    if (
      answers[10] === "forca_caiu_muito" ||
      answers[10] === "forca_nao_treina"
    ) {
      factors.push("Ausência de estímulo adequado para manutenção muscular.");
    }

    // 🔹 Histórico longo
    if (
      answers[3] === "tempo_longo" ||
      answers[3] === "tempo_eterno"
    ) {
      factors.push("Histórico prolongado de tentativas aumenta adaptação metabólica.");
    }

    // 🔹 Sintomas
    if (answers[11] === "colaterais_frequentes") {
      factors.push("Sintomas indicam impacto metabólico relevante.");
    }

    // Limitar a 3
    return factors.slice(0, 3);
  };

  const riskFactors = generateRiskFactors();

  return (
    <div className="w-full max-w-xl mx-auto px-6 pb-24 pt-16 space-y-12 animate-fadeIn">

      {/* HEADER */}
      <div className="text-center space-y-6">

        <div className="inline-block bg-teal-50 text-[#0f766e] px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest border border-teal-100">
          Diagnóstico Concluído
        </div>

        <div className="flex flex-col items-center">
          <h2 className="text-7xl font-black text-red-600 tracking-tighter">
            {results.score}%
          </h2>
          <p className="text-slate-500 font-semibold text-xs uppercase tracking-[0.25em] mt-3">
            Risco de Rebote Identificado
          </p>
        </div>

      </div>

      {/* FRASE CENTRAL */}
      <div className="text-center">
        <h3 className="text-xl md:text-2xl font-bold text-slate-900 leading-snug max-w-md mx-auto">
          Risco elevado de dependência da medicação para manter o peso.
        </h3>
      </div>

      {/* BULLETS PERSONALIZADOS */}
      {riskFactors.length > 0 && (
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 space-y-3">
          <p className="text-amber-900 font-bold text-sm uppercase tracking-wider">
            Fatores que aumentam seu risco:
          </p>

          <ul className="space-y-2">
            {riskFactors.map((factor, index) => (
              <li key={index} className="text-amber-800 text-sm font-medium leading-relaxed">
                • {factor}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* CONSEQUÊNCIA CLÍNICA */}
      <div className="text-center max-w-md mx-auto">
        <p className="text-slate-700 font-medium text-base leading-relaxed">
          Esse padrão aumenta a adaptação metabólica e reduz sua capacidade de manter o peso sem apoio da medicação.
        </p>
      </div>

      {/* ESPELHO EMOCIONAL */}
      <div className="text-center max-w-md mx-auto">
        <p className="text-slate-900 font-semibold text-base leading-relaxed">
          Você não tem ainda uma estratégia adequada para essa fase.
        </p>
      </div>

      {/* CTA */}
      <div className="pt-6">
        <button
          onClick={onCtaClick}
          className="w-full py-7 bg-[#0f766e] hover:bg-[#134e4a] text-white rounded-2xl font-black text-lg transition-all shadow-xl shadow-teal-900/40 uppercase"
        >
          Proteger meu emagrecimento
          
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
