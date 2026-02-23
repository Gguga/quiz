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

  // 🟥 PERFIL 1 – REBOTE ESTRUTURAL
  if (
    situacao === "uso_parou_rebote" &&
    (treino === "forca_nao_treina" || quedaForca === "forca_caiu_muito")
  ) {
    perfil = "Rebote Estrutural";
    descricao =
      "Você já interrompeu a medicação e percebeu o peso voltar. Ao mesmo tempo, há sinais claros de perda de estrutura muscular, reduzindo sua proteção metabólica.";
  }

  // 🟧 PERFIL 2 – PLATÔ ADAPTATIVO
  else if (
    situacao === "uso_atual_plato" &&
    (dieta === "dieta_reduzi" || dieta === "dieta_feeling")
  ) {
    perfil = "Platô Adaptativo";
    descricao =
      "Seu peso já entrou em adaptação mesmo com a medicação. Reduzir quantidades ou ajustar no feeling não está sendo suficiente para sustentar o processo.";
  }

  // 🟨 PERFIL 3 – VULNERABILIDADE MUSCULAR
  else if (
    (proteinaRefeicoes === "proteina_0_1" || proteinaCalculo === "proteina_nunca") &&
    (treino === "forca_irregular" || quedaForca === "forca_caiu_muito")
  ) {
    perfil = "Vulnerabilidade Muscular";
    descricao =
      "Seu padrão atual indica ingestão proteica insuficiente combinada com estímulo muscular inadequado, aumentando o risco de perda de massa magra.";
  }

  // 🟦 PERFIL 4 – CICLO CRÔNICO
  else if (
    (tempo === "tempo_longo" || tempo === "tempo_eterno") &&
    (idade === "idade_40_49" || idade === "idade_50_plus")
  ) {
    perfil = "Ciclo Metabólico Crônico";
    descricao =
      "Seu histórico prolongado de tentativas, somado à sua faixa etária, sugere padrão metabólico crônico que exige estratégia estruturada de manutenção.";
  }

  // 🟩 PERFIL 5 – DEPENDÊNCIA FARMACOLÓGICA
  else if (
    situacao === "uso_atual_perda" &&
    (compromisso === "compromisso_talvez" || compromisso === "compromisso_duvida")
  ) {
    perfil = "Dependência da Medicação";
    descricao =
      "Seu emagrecimento atual depende fortemente da medicação, e ainda não há estrutura consolidada para manter o peso de forma autônoma.";
  }

  // 🔘 PERFIL PADRÃO
  else {
    perfil = "Vulnerabilidade Metabólica";
    descricao =
      "Seu padrão de respostas indica fragilidades estruturais que podem comprometer a manutenção do peso após a retirada da medicação.";
  }

  return (
    <div className="w-full max-w-xl mx-auto px-6 pb-20 pt-12 space-y-10 animate-fadeIn">

      {/* HEADER COM PERCENTUAL */}
      <div className="text-center space-y-4">

        <div className="inline-block bg-teal-50 text-[#0f766e] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-teal-100">
          Diagnóstico Concluído
        </div>

        <div className="flex flex-col items-center">
          <h2 className="text-7xl font-black text-slate-900 tracking-tighter">
            {results.score}%
          </h2>

          <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-2">
            Risco {results.riskLevel}
          </p>
        </div>

      </div>

      {/* PERFIL */}
      <div className="text-center space-y-2">
        <h3 className="text-xl font-black text-[#0f766e]">
          Perfil Identificado: {perfil}
        </h3>
      </div>

      {/* DESCRIÇÃO */}
      <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6">
        <p className="text-amber-800 font-semibold text-sm leading-relaxed">
          {descricao}
        </p>
      </div>

      {/* CTA */}
      <div className="pt-6">
        <button
          onClick={onCtaClick}
          className="w-full py-6 bg-[#0f766e] hover:bg-[#134e4a] text-white rounded-2xl font-black text-lg transition-all shadow-xl uppercase"
        >
          Ver protocolo recomendado
        </button>
      </div>

    </div>
  );
};

export default ResultsView;
