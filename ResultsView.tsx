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
      texto: "Seu corpo já pode estar iniciando um processo de recuperação de peso após a interrupção da medicação."
    });
  }

  if (treino === "forca_nao_treina") {
    fatores.push({
      peso: 3,
      texto: "Atualmente seu organismo não recebe estímulo de musculação suficiente para preservar a massa muscular."
    });
  }

  if (quedaForca === "forca_caiu_muito") {
    fatores.push({
      peso: 3,
      texto: "Suas respostas indicam uma queda relevante de força durante o processo, um sinal comum de perda de massa muscular."
    });
  }

  if (proteinaRef === "proteina_0_1" || proteinaCalc === "proteina_nunca") {
    fatores.push({
      peso: 3,
      texto: "Sua ingestão de proteína provavelmente está abaixo do nível necessário para preservar a massa muscular durante o emagrecimento."
    });
  }

  if (dieta === "dieta_feeling") {
    fatores.push({
      peso: 2,
      texto: "Sua alimentação parece estar sendo conduzida mais por tentativa e erro do que por uma estratégia metabólica estruturada."
    });
  }

  // 🟠 MODERADOS

  if (situacao === "uso_atual_plato") {
    fatores.push({
      peso: 2,
      texto: "Mesmo utilizando a medicação, seu peso parece já não responder com a mesma facilidade."
    });
  }

  if (treino === "forca_irregular") {
    fatores.push({
      peso: 2,
      texto: "O estímulo de musculação aparece de forma irregular, o que dificulta preservar massa muscular."
    });
  }

  if (proteinaRef === "proteina_2") {
    fatores.push({
      peso: 2,
      texto: "A distribuição de proteína ao longo do dia pode ainda não estar suficiente para proteger a massa muscular."
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
      texto: "Com o avanço da idade, o metabolismo tende a responder com mais dificuldade ao emagrecimento."
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
    "Quando esses fatores aparecem juntos, o emagrecimento pode até acontecer inicialmente, mas o corpo tende a recuperar gordura com o tempo.";

  // 🎨 COR DINÂMICA

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

      {/* PADRÕES */}

      <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center space-y-2">

        <p className="text-xs uppercase tracking-widest text-slate-500 font-bold">
          Padrões detectados
        </p>

        <p className="text-2xl font-black text-slate-900">
          {results.sinaisDetectados} sinais metabólicos identificados
        </p>

        <p className="text-xs text-slate-500">
          {results.comparacaoPopulacional}
        </p>

      </div>

      {/* INSIGHTS */}

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

      {/* EXPLICAÇÃO */}

      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3">

        <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
          Interpretação metabólica
        </p>

        <p className="text-sm text-slate-700 leading-relaxed">
          Pelas respostas do seu questionário, o emagrecimento pode não estar sendo sustentado por mecanismos metabólicos estáveis.
        </p>

        <p className="text-sm text-slate-700 leading-relaxed">
          Quando a perda de peso acontece sem preservação adequada de massa muscular e sem estrutura alimentar estratégica, o organismo tende a recuperar gordura ao longo do tempo.
        </p>

        <p className="text-sm font-semibold text-slate-900 leading-relaxed">
          A boa notícia é que esses fatores normalmente podem ser corrigidos quando existe uma estratégia correta de proteção metabólica.
        </p>

      </div>

      {/* VALIDAÇÃO */}

      <p className="text-xs text-slate-500 text-center leading-relaxed">
        Este diagnóstico foi gerado automaticamente a partir das respostas fornecidas no questionário.
      </p>

      {/* CTA */}

      <button
        onClick={onCtaClick}
        className="w-full py-6 bg-[#0f766e] hover:bg-[#134e4a] text-white rounded-2xl font-black text-lg transition-all shadow-xl uppercase"
      >
        Ver como reduzir meu risco de rebote
      </button>

    </div>
  );
};

export default ResultsView;
