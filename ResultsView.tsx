import React from 'react';
import { QuizResults, UserAnswers } from './types';

interface ResultsViewProps {
  results: QuizResults;
  answers: UserAnswers;
  onCtaClick: () => void;
}

const ResultsView: React.FC<ResultsViewProps> = ({
  results,
  answers,
  onCtaClick
}) => {

  const situacao = answers[4];
  const tempo = answers[3];
  const idade = answers[2];
  const quedaForca = answers[5];
  const treino = answers[6];
  const proteinaRef = answers[7];
  const proteinaCalc = answers[8];
  const dieta = answers[9];

  let perfil = "";
  let descricao = "";

  // 🔴 REBOTE ESTRUTURAL
  if (
    situacao === "uso_parou_rebote" &&
    (treino === "forca_nao_treina" || quedaForca === "forca_caiu_muito")
  ) {
    perfil = "Rebote Estrutural";
    descricao =
      "O peso já começou a voltar após a medicação.\n\n" +
      "Ao mesmo tempo, houve queda de força ou falta de treino consistente.\n\n" +
      "Isso indica que a base muscular enfraqueceu. Sem essa proteção, o metabolismo desacelera.\n\n" +
      "Quando a estrutura não sustenta o emagrecimento, o corpo tende a recuperar o peso.";
  }

  // 🟠 PLATÔ ADAPTATIVO
  else if (
    situacao === "uso_atual_plato" &&
    (dieta === "dieta_feeling" || dieta === "dieta_reduzi")
  ) {
    perfil = "Platô Adaptativo";
    descricao =
      "Mesmo com a medicação ativa, o peso parou de responder.\n\n" +
      "A alimentação está mais focada em reduzir quantidades do que em construir uma estratégia metabólica sólida.\n\n" +
      "Com o tempo, o corpo se adapta. Ele aprende a funcionar com menos e passa a resistir à perda de peso.";
  }

  // 🟡 VULNERABILIDADE MUSCULAR
  else if (
    (proteinaRef === "proteina_0_1" || proteinaCalc === "proteina_nunca") &&
    (treino === "forca_irregular" || treino === "forca_nao_treina")
  ) {
    perfil = "Vulnerabilidade Muscular";
    descricao =
      "A ingestão de proteína está abaixo do ideal e o treino de força não é consistente.\n\n" +
      "Isso compromete a preservação da massa muscular.\n\n" +
      "Quando o músculo diminui, o gasto energético também cai. Um metabolismo mais lento facilita o retorno do peso.";
  }

  // 🔵 CICLO METABÓLICO CRÔNICO
  else if (
    (tempo === "tempo_longo" || tempo === "tempo_eterno") &&
    (idade === "idade_40_49" || idade === "idade_50_plus")
  ) {
    perfil = "Ciclo Metabólico Crônico";
    descricao =
      "Existe um histórico prolongado de tentativas de emagrecimento.\n\n" +
      "Além disso, o metabolismo já não responde com a mesma facilidade de antes.\n\n" +
      "Cada ciclo deixa adaptações acumuladas. Manter o peso agora exige mais estrutura do que no passado.";
  }

  // 🟣 TRANSIÇÃO VULNERÁVEL (fallback)
  else {
    perfil = "Estrutura Metabólica em Transição";
    descricao =
      "A estrutura alimentar e metabólica ainda não está totalmente consolidada.\n\n" +
      "Sem uma estratégia clara de proteção muscular e metabólica, o risco de recuperação de peso aumenta após a retirada da medicação.";
  }

  return (
    <div className="w-full max-w-xl mx-auto px-6 pb-20 pt-12 space-y-10 animate-fadeIn">

      <div className="text-center space-y-4">

        <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
          Risco estimado de rebote
        </p>

        <div className="text-7xl font-black text-slate-900">
          {results.score}%
        </div>

        <p className="text-sm font-bold text-slate-500 uppercase tracking-wide">
          {results.riskLevel}
        </p>

        <h3 className="text-xl font-black text-[#0f766e]">
          {perfil}
        </h3>

      </div>

      <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 whitespace-pre-line">
        <p className="text-amber-800 font-semibold text-sm leading-relaxed">
          {descricao}
        </p>
      </div>

      <button
        onClick={onCtaClick}
        className="w-full py-6 bg-[#0f766e] hover:bg-[#134e4a] text-white rounded-2xl font-black text-lg transition-all shadow-xl uppercase"
      >
        Ver protocolo recomendado
      </button>

    </div>
  );
};

export default ResultsView;
