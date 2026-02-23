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
  const colateral = answers[10];

  // =========================
  // PERFIS POR COMBINAÇÃO FORTE
  // =========================

  let perfil = "";
  let descricao = "";

  // Rebote + perda muscular
  if (
    situacao === "uso_parou_rebote" &&
    (treino === "forca_nao_treina" || quedaForca === "forca_caiu_muito")
  ) {
    perfil = "Rebote Estrutural";
    descricao =
      "Você marcou que já parou a medicação e o peso começou a voltar. Ao mesmo tempo, relatou queda importante de força ou ausência de musculação — isso indica perda de estrutura muscular que deveria proteger seu metabolismo.";
  }

  // Platô + dieta fraca
  else if (
    situacao === "uso_atual_plato" &&
    (dieta === "dieta_feeling" || dieta === "dieta_reduzi")
  ) {
    perfil = "Platô Adaptativo";
    descricao =
      "Você está usando a medicação, mas o peso travou. Além disso, sua estratégia alimentar é baseada apenas em reduzir quantidades ou ajustar no feeling — esse combo favorece adaptação metabólica.";
  }

  // Proteína baixa + treino ruim
  else if (
    (proteinaRef === "proteina_0_1" || proteinaCalc === "proteina_nunca") &&
    (treino === "forca_irregular" || treino === "forca_nao_treina")
  ) {
    perfil = "Vulnerabilidade Muscular";
    descricao =
      "Você relatou consumir proteína de verdade em 0–1 refeições ou nunca calcular proteína. Somado a treino irregular ou ausência de musculação, isso aumenta fortemente o risco de perder massa magra.";
  }

  // Histórico crônico
  else if (
    (tempo === "tempo_longo" || tempo === "tempo_eterno") &&
    (idade === "idade_40_49" || idade === "idade_50_plus")
  ) {
    perfil = "Ciclo Metabólico Crônico";
    descricao =
      "Você está na faixa dos 40+ e tenta emagrecer há muitos anos. Esse padrão prolongado geralmente envolve múltiplas adaptações metabólicas e maior dificuldade de manter resultados.";
  }

  // =========================
  // FALLBACK SEM SER GENÉRICO
  // =========================
  else {

    const fatores: string[] = [];

    if (situacao === "uso_desmame") {
      fatores.push("você está reduzindo a dose da medicação");
    }

    if (proteinaRef === "proteina_2") {
      fatores.push("você consome proteína em apenas 2 refeições por dia");
    }

    if (dieta === "dieta_emagrecer") {
      fatores.push("sua dieta está focada apenas em emagrecer, não em proteger metabolismo");
    }

    if (colateral === "colateral_varios") {
      fatores.push("você relatou múltiplos colaterais (cansaço + digestivos)");
    }

    if (quedaForca === "forca_caiu_pouco") {
      fatores.push("você percebeu queda de força desde que iniciou a medicação");
    }

    perfil = "Risco Metabólico Estrutural";

    descricao =
      `Pelo que você marcou — ${fatores.slice(0,2).join(" e ")} — seu corpo ainda não demonstra estrutura sólida para manter o peso após a retirada da medicação.`;
  }

  return (
    <div className="w-full max-w-xl mx-auto px-6 pb-20 pt-12 space-y-10 animate-fadeIn">

      <div className="text-center space-y-4">

        <div className="text-7xl font-black text-slate-900">
          {results.score}%
        </div>

        <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">
          Risco {results.riskLevel}
        </p>

        <h3 className="text-xl font-black text-[#0f766e]">
          Perfil Identificado: {perfil}
        </h3>

      </div>

      <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6">
        <p className="text-amber-800 font-semibold text-sm leading-relaxed">
          {descricao}
        </p>
      </div>

      <button
        onClick={onCtaClick}
        className="w-full py-6 bg-[#0f766e] text-white rounded-2xl font-black uppercase"
      >
        Ver protocolo recomendado
      </button>

    </div>
  );
};

export default ResultsView;
