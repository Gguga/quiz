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

  type Fator = {
    peso: number;
    texto: string;
  };

  const fatores: Fator[] = [];

  // 🔴 CRÍTICOS

  if (situacao === "uso_parou_rebote") {
    fatores.push({
      peso: 3,
      texto: "O peso já começou a retornar após a interrupção da medicação."
    });
  }

  if (treino === "forca_nao_treina") {
    fatores.push({
      peso: 3,
      texto: "Não há estímulo consistente de musculação para preservar massa muscular."
    });
  }

  if (quedaForca === "forca_caiu_muito") {
    fatores.push({
      peso: 3,
      texto: "Houve queda significativa de força durante o processo."
    });
  }

  if (proteinaRef === "proteina_0_1" || proteinaCalc === "proteina_nunca") {
    fatores.push({
      peso: 3,
      texto: "A ingestão de proteína está abaixo do necessário para proteger a massa magra."
    });
  }

  if (dieta === "dieta_feeling") {
    fatores.push({
      peso: 2,
      texto: "A alimentação está sendo ajustada sem uma estratégia metabólica estruturada."
    });
  }

  // 🟠 MODERADOS

  if (situacao === "uso_atual_plato") {
    fatores.push({
      peso: 2,
      texto: "O peso parou de responder mesmo com a medicação ativa."
    });
  }

  if (treino === "forca_irregular") {
    fatores.push({
      peso: 2,
      texto: "O treino de força não é feito de forma consistente."
    });
  }

  if (proteinaRef === "proteina_2") {
    fatores.push({
      peso: 2,
      texto: "A distribuição de proteína ao longo do dia ainda é limitada."
    });
  }

  if (tempo === "tempo_longo" || tempo === "tempo_eterno") {
    fatores.push({
      peso: 1,
      texto: "Existe um histórico prolongado de tentativas de emagrecimento."
    });
  }

  if (idade === "idade_40_49" || idade === "idade_50_plus") {
    fatores.push({
      peso: 1,
      texto: "O metabolismo já não responde com a mesma facilidade de anos anteriores."
    });
  }

  if (colateral === "colateral_varios") {
    fatores.push({
      peso: 1,
      texto: "Há sinais de instabilidade física durante o processo."
    });
  }

  fatores.sort((a, b) => b.peso - a.peso);
  const principais = fatores.slice(0, 2);

  const descricao =
    principais.map(f => f.texto).join("\n\n") +
    "\n\n" +
    "Esse conjunto indica que o emagrecimento ainda não está sustentado por uma base metabólica sólida.";

  // 🎨 COR DINÂMICA POR NÍVEL

  let colorClass = "text-green-600";

  if (results.riskLevel === "Crítico") {
    colorClass = "text-red-700";
  } else if (results.riskLevel === "Alto") {
    colorClass = "text-red-600";
  } else if (results.riskLevel === "Moderado") {
    colorClass = "text-amber-600";
  } else {
    colorClass = "text-green-600";
  }

  return (
    <div className="w-full max-w-xl mx-auto px-6 pb-20 pt-12 space-y-10 animate-fadeIn">

      <div className="text-center space-y-4">

        <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
          Risco estimado de rebote
        </p>

        <div className={`text-7xl font-black ${colorClass}`}>
          {results.score}%
        </div>

        <p className={`text-sm font-bold uppercase tracking-wide ${colorClass}`}>
          {results.riskLevel}
        </p>

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
        Quero entender o que está faltando
      </button>

    </div>
  );
};

export default ResultsView;
