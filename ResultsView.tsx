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
      texto: "Com base nas suas respostas, seu corpo já pode estar entrando no processo de recuperação do peso após a interrupção da medicação."
    });
  }

  if (treino === "forca_nao_treina") {
    fatores.push({
      peso: 3,
      texto: "Pelas suas respostas, hoje seu corpo não recebe estímulo de musculação suficiente para proteger a massa muscular."
    });
  }

  if (quedaForca === "forca_caiu_muito") {
    fatores.push({
      peso: 3,
      texto: "Suas respostas indicam que houve uma queda relevante de força ao longo do processo, um sinal comum de perda de massa muscular."
    });
  }

  if (proteinaRef === "proteina_0_1" || proteinaCalc === "proteina_nunca") {
    fatores.push({
      peso: 3,
      texto: "Com base nas suas respostas, sua ingestão de proteína pode não estar suficiente para preservar sua massa muscular durante o emagrecimento."
    });
  }

  if (dieta === "dieta_feeling") {
    fatores.push({
      peso: 2,
      texto: "Sua alimentação parece estar sendo ajustada mais por tentativa e erro do que por uma estratégia metabólica estruturada."
    });
  }

  // 🟠 MODERADOS

  if (situacao === "uso_atual_plato") {
    fatores.push({
      peso: 2,
      texto: "Pelas suas respostas, mesmo com a medicação ativa, o peso já não está respondendo como antes."
    });
  }

  if (treino === "forca_irregular") {
    fatores.push({
      peso: 2,
      texto: "O estímulo de treino de força aparece de forma irregular, o que dificulta preservar massa muscular."
    });
  }

  if (proteinaRef === "proteina_2") {
    fatores.push({
      peso: 2,
      texto: "A distribuição de proteína ao longo do dia ainda pode estar limitada para proteger a massa muscular."
    });
  }

  if (tempo === "tempo_longo" || tempo === "tempo_eterno") {
    fatores.push({
      peso: 1,
      texto: "Existe um histórico prolongado de tentativas de emagrecimento, o que costuma tornar o metabolismo mais resistente."
    });
  }

  if (idade === "idade_40_49" || idade === "idade_50_plus") {
    fatores.push({
      peso: 1,
      texto: "A partir dessa faixa etária, o metabolismo tende a responder com menos facilidade do que antes."
    });
  }

  if (colateral === "colateral_varios") {
    fatores.push({
      peso: 1,
      texto: "Alguns sinais indicam que seu corpo pode estar passando por instabilidade durante o processo."
    });
  }

  fatores.sort((a, b) => b.peso - a.peso);
  const principais = fatores.slice(0, 2);

  const descricao =
    principais.map(f => f.texto).join("\n\n") +
    "\n\n" +
    "Quando esses fatores aparecem juntos, o emagrecimento pode até acontecer por um tempo, mas tende a não se sustentar a longo prazo.";

  // 🎨 COR DINÂMICA POR NÍVEL

  let colorClass = "text-green-600";

  if (results.riskLevel === "Crítico") {
    colorClass = "text-red-700";
  } else if (results.riskLevel === "Alto") {
    colorClass = "text-red-600";
  } else if (results.riskLevel === "Moderado") {
    colorClass = "text-amber-600";
  }

  return (
    <div className="w-full max-w-xl mx-auto px-6 pb-20 pt-12 space-y-10 animate-fadeIn">

      {/* SCORE */}

      <div className="text-center space-y-4">

        <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
          Risco estimado de efeito rebote
        </p>

        <div className={`text-7xl font-black ${colorClass}`}>
          {results.score}%
        </div>

        <p className={`text-sm font-bold uppercase tracking-wide ${colorClass}`}>
          {results.riskLevel}
        </p>

      </div>

      {/* INSIGHTS DETECTADOS */}

      {results.keyInsights.length > 0 && (

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3">

          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
            Sinais detectados no seu perfil
          </p>

          <ul className="space-y-2 text-sm text-slate-700">

            {results.keyInsights.map((insight, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-red-500 font-bold">•</span>
                <span>{insight}</span>
              </li>
            ))}

          </ul>

        </div>

      )}

      {/* DIAGNÓSTICO */}

      <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 whitespace-pre-line">
        <p className="text-amber-800 font-semibold text-sm leading-relaxed">
          {descricao}
        </p>
      </div>

      {/* ANÁLISE METABÓLICA */}

      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3">

        <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
          Análise do seu perfil metabólico
        </p>

        <p className="text-sm text-slate-700 leading-relaxed">
          Pelas respostas do seu questionário, o seu emagrecimento pode não estar
          sendo sustentado por mecanismos metabólicos estáveis.
        </p>

        <p className="text-sm text-slate-700 leading-relaxed">
          Isso significa que, mesmo quando o peso desce, o corpo pode acabar
          recuperando gordura com relativa facilidade após a interrupção da
          medicação ou mudanças na rotina.
        </p>

        <p className="text-sm font-semibold text-slate-900 leading-relaxed">
          A boa notícia é que esses fatores normalmente podem ser corrigidos
          quando existe uma estratégia correta de preservação muscular e ajuste
          metabólico.
        </p>

      </div>

      {/* CTA */}

      <button
        onClick={onCtaClick}
        className="w-full py-6 bg-[#0f766e] hover:bg-[#134e4a] text-white rounded-2xl font-black text-lg transition-all shadow-xl uppercase"
      >
        Ver como estabilizar meu metabolismo
      </button>

    </div>
  );
};

export default ResultsView;
