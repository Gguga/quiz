import React from 'react';
import { QuizResults, UserAnswers } from './types';

const ResultsView: React.FC<{
  results: QuizResults;
  answers: UserAnswers;
  onCtaClick: () => void;
}> = ({ results, answers, onCtaClick }) => {

  const generateRiskFactors = () => {
    const factors: string[] = [];

    // 🔹 Proteína baixa (id 7)
    if (answers[7] === "proteina_0_1") {
      factors.push(
        "Você relatou consumir proteína em poucas refeições, o que aumenta o risco de perda muscular."
      );
    }

    // 🔹 Proteína não calculada (id 8)
    if (
      answers[8] === "proteina_nunca" ||
      answers[8] === "proteina_feeling"
    ) {
      factors.push(
        "Sua ingestão proteica não está estrategicamente calculada para preservar massa magra."
      );
    }

    // 🔹 Força caiu (id 5)
    if (answers[5] === "forca_caiu_muito") {
      factors.push(
        "A queda significativa de força é um indicativo de perda muscular progressiva."
      );
    }

    // 🔹 Não treina (id 6)
    if (answers[6] === "forca_nao_treina") {
      factors.push(
        "A ausência de musculação reduz sua proteção contra perda muscular."
      );
    }

    // 🔹 Histórico longo (id 3)
    if (
      answers[3] === "tempo_longo" ||
      answers[3] === "tempo_eterno"
    ) {
      factors.push(
        "Seu histórico prolongado de tentativas aumenta a adaptação metabólica."
      );
    }

    // 🔹 Dieta não estruturada (id 9)
    if (
      answers[9] === "dieta_reduzi" ||
      answers[9] === "dieta_feeling"
    ) {
      factors.push(
        "Sua dieta não foi estruturada para proteger o metabolismo durante e após a medicação."
      );
    }

    // 🔹 Colaterais (id 10)
    if (
      answers[10] === "colateral_varios" ||
      answers[10] === "colateral_cansaco"
    ) {
      factors.push(
        "Os sinais relatados indicam possível estresse metabólico no processo."
      );
    }

    // 🔥 GARANTIR SEMPRE 2
    if (factors.length === 0) {
      factors.push(
        "Existe risco silencioso de perda muscular mesmo sem sintomas aparentes."
      );
      factors.push(
        "Sem estratégia específica, a dependência da medicação pode se manter."
      );
    }

    if (factors.length === 1) {
      factors.push(
        "A fase atual exige um plano específico para consolidar o resultado."
      );
    }

    return factors.slice(0, 2);
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
          {results.personalizedMessage}
        </h3>
      </div>

      {/* BULLETS PERSONALIZADOS */}
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

      {/* CONSEQUÊNCIA CLÍNICA */}
      <div className="text-center max-w-md mx-auto">
        <p className="text-slate-700 font-medium text-base leading-relaxed">
          Esse padrão aumenta a adaptação metabólica e reduz sua capacidade de manter o peso sem apoio da medicação.
        </p>
      </div>

      {/* ESPELHO EMOCIONAL */}
      <div className="text-center max-w-md mx-auto">
        <p className="text-slate-900 font-semibold text-base leading-relaxed">
          Seu problema não é falta de disciplina, mas ausência de estratégia adequada.
        </p>
      </div>

      {/* CTA */}
      <div className="pt-6">
        <button
          onClick={onCtaClick}
          className="w-full py-7 px-8 bg-[#0f766e] hover:bg-[#134e4a] text-white rounded-2xl font-black text-base md:text-lg leading-tight tracking-wide transition-all shadow-xl shadow-teal-900/40 uppercase"
        >
          Proteger Meu Emagrecimento Agora
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
