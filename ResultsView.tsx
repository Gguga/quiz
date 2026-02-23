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
  const proteinaRefeicoes = answers[7];
  const proteinaCalculo = answers[8];
  const dieta = answers[9];
  const compromisso = answers[11];

  let perfil = "";
  let descricao = "";

  if (
    situacao === "uso_parou_rebote" &&
    (treino === "forca_nao_treina" || quedaForca === "forca_caiu_muito")
  ) {
    perfil = "Rebote Estrutural";
    descricao =
      "Você já interrompeu a medicação e percebeu o peso voltar. Ao mesmo tempo, há sinais claros de perda de estrutura muscular.";
  }

  else if (
    situacao === "uso_atual_plato" &&
    (dieta === "dieta_reduzi" || dieta === "dieta_feeling")
  ) {
    perfil = "Platô Adaptativo";
    descricao =
      "Seu corpo já entrou em adaptação metabólica mesmo usando a medicação.";
  }

  else if (
    (proteinaRefeicoes === "proteina_0_1" || proteinaCalculo === "proteina_nunca") &&
    (treino === "forca_irregular" || quedaForca === "forca_caiu_muito")
  ) {
    perfil = "Vulnerabilidade Muscular";
    descricao =
      "Seu padrão atual indica ingestão proteica insuficiente combinada com estímulo muscular inadequado.";
  }

  else if (
    (tempo === "tempo_longo" || tempo === "tempo_eterno") &&
    (idade === "idade_40_49" || idade === "idade_50_plus")
  ) {
    perfil = "Ciclo Metabólico Crônico";
    descricao =
      "Seu histórico prolongado sugere padrão metabólico crônico.";
  }

  else if (
    situacao === "uso_atual_perda" &&
    (compromisso === "compromisso_talvez" || compromisso === "compromisso_duvida")
  ) {
    perfil = "Dependência da Medicação";
    descricao =
      "Seu emagrecimento depende fortemente da medicação.";
  }

  else {
    perfil = "Vulnerabilidade Metabólica";
    descricao =
      "Existem fragilidades estruturais que podem comprometer a manutenção do peso.";
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
          Perfil: {perfil}
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
