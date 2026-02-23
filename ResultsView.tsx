import React from 'react';
import { QuizResults, UserAnswers } from './types';

const ResultsView: React.FC<{
  results: QuizResults;
  answers: UserAnswers;
  onCtaClick: () => void;
}> = ({ results, answers, onCtaClick }) => {

  const generateEmotionalMirror = () => {
    const fase = answers[4];

    if (fase === "uso_atual_perda") {
      return "Seu emagrecimento ainda depende da medicação.";
    }

    if (fase === "uso_atual_plato") {
      return "Seu corpo já começou a se adaptar ao uso da medicação.";
    }

    if (fase === "uso_desmame") {
      return "A fase de redução é onde a maioria perde o controle do peso.";
    }

    if (fase === "uso_parou_rebote") {
      return "O reganho não é falta de disciplina. É fisiologia.";
    }

    return "Seu resultado ainda não está protegido.";
  };

  const generateBehaviorInsight = () => {

    if (answers[3] === "tempo_eterno" || answers[3] === "tempo_longo") {
      return "Seu histórico prolongado de tentativas aumenta a adaptação metabólica.";
    }

    if (answers[8] === "proteina_0_1") {
      return "Sua ingestão proteica atual não sustenta preservação muscular.";
    }

    if (answers[10] === "forca_caiu_muito") {
      return "A queda de força indica possível perda muscular em curso.";
    }

    if (answers[11] === "colaterais_frequentes") {
      return "Seus sintomas indicam impacto metabólico relevante.";
    }

    return null;
  };

  const emotionalMirror = generateEmotionalMirror();
  const behaviorInsight = generateBehaviorInsight();

  return (
    <div className="w-full max-w-xl mx-auto px-6 pb-24 pt-16 space-y-12 animate-fadeIn">

      {/* HEADER */}
      <div className="text-center space-y-6">

        <div className="inline-block bg-teal-50 text-[#0f766e] px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest border border-teal-100">
          Diagnóstico Concluído
        </div>

        {/* 🔴 PERCENTUAL EM VERMELHO */}
        <div className="flex flex-col items-center">
          <h2 className="text-7xl font-black text-red-600 tracking-tighter">
            {results.score}%
          </h2>
          <p className="text-slate-500 font-semibold text-xs uppercase tracking-[0.25em] mt-3">
            Risco de Rebote Identificado
          </p>
        </div>

      </div>

      {/* FRASE CENTRAL DRAMÁTICA */}
      <div className="text-center space-y-4">
        <h3 className="text-xl md:text-2xl font-bold text-slate-900 leading-snug max-w-md mx-auto">
          Risco elevado de dependência da medicação para manter o peso.
        </h3>
      </div>

      {/* CAIXA CLÍNICA */}
      {results.keyInsights.length > 0 && (
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <p className="text-amber-800 font-semibold text-sm leading-relaxed">
            {results.keyInsights[0]}
          </p>
        </div>
      )}

      {/* INSIGHT ESPECÍFICO */}
      {behaviorInsight && (
        <div className="text-center max-w-md mx-auto">
          <p className="text-slate-700 font-medium text-base leading-relaxed">
            {behaviorInsight}
          </p>
        </div>
      )}

      {/* ESPELHO EMOCIONAL */}
      <div className="text-center max-w-md mx-auto">
        <p className="text-slate-800 font-medium text-base leading-relaxed">
          {emotionalMirror}
        </p>
      </div>

      {/* PONTE */}
      <div className="text-center max-w-md mx-auto">
        <p className="text-slate-600 text-sm leading-relaxed">
          Existe uma forma de proteger seu resultado durante e após o uso da medicação.
        </p>
      </div>

      {/* CTA */}
      <div className="pt-6">
        <button
          onClick={onCtaClick}
          className="w-full py-6 bg-[#0f766e] hover:bg-[#134e4a] text-white rounded-2xl font-black text-lg transition-all shadow-xl shadow-teal-900/40 uppercase"
        >
          Acessar Protocolo Anti-Rebote
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
