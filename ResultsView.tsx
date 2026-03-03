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
      texto: "Você relatou que interrompeu a medicação recentemente, o que costuma ser um momento em que o corpo inicia recuperação de peso."
    });
  }

  if (treino === "forca_nao_treina") {
    fatores.push({
      peso: 3,
      texto: "Você indicou que atualmente não treina musculação, o que reduz o estímulo necessário para preservar massa muscular."
    });
  }

  if (quedaForca === "forca_caiu_muito") {
    fatores.push({
      peso: 3,
      texto: "Você percebeu queda relevante de força durante o processo, um sinal comum de perda de massa muscular."
    });
  }

  if (proteinaRef === "proteina_0_1" || proteinaCalc === "proteina_nunca") {
    fatores.push({
      peso: 3,
      texto: "Pelas suas respostas, sua ingestão de proteína provavelmente está abaixo do necessário para preservar massa muscular."
    });
  }

  if (dieta === "dieta_feeling") {
    fatores.push({
      peso: 2,
      texto: "Sua alimentação parece estar sendo conduzida mais por tentativa e erro do que por uma estratégia estruturada."
    });
  }

  // 🟠 MODERADOS

  if (situacao === "uso_atual_plato") {
    fatores.push({
      peso: 2,
      texto: "Você relatou que mesmo usando a medicação o peso já não responde com a mesma facilidade."
    });
  }

  if (treino === "forca_irregular") {
    fatores.push({
      peso: 2,
      texto: "O treino de musculação aparece de forma irregular na sua rotina."
    });
  }

  if (proteinaRef === "proteina_2") {
    fatores.push({
      peso: 2,
      texto: "A distribuição de proteína ao longo do dia pode não estar suficiente para proteger massa muscular."
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
      texto: "Com o avanço da idade, o metabolismo tende a responder com mais dificuldade."
    });
  }

  if (colateral === "colateral_varios") {
    fatores.push({
      peso: 1,
      texto: "Alguns sinais indicam instabilidade metabólica durante o processo."
    });
  }

  fatores.sort((a, b) => b.peso - a.peso);

  const principais = fatores.slice(0, 2);

  let descricao = "";

  if (principais.length > 0) {

    descricao =
      principais.map(f => f.texto).join("\n\n") +
      "\n\n" +
      "Quando esses fatores aparecem juntos, muitas pessoas até conseguem emagrecer no início.\n\nMas o corpo tende a recuperar gordura com o tempo.";

  } else {

    descricao =
      "Alguns sinais indicam que o emagrecimento pode não estar sendo sustentado por mecanismos metabólicos estáveis.";
  }

  const sinaisTexto =
    results.sinaisDetectados === 1
      ? "1 padrão metabólico identificado"
      : `${results.sinaisDetectados} padrões metabólicos identificados`;

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
          Análise metabólica do seu perfil
        </p>

        <p className="text-2xl font-black text-slate-900">
          {sinaisTexto}
        </p>

        <p className="text-xs text-slate-500">
          {results.comparacaoPopulacional}
        </p>

      </div>

      {/* DIAGNÓSTICO */}

      <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 whitespace-pre-line">
        <p className="text-amber-800 font-semibold text-sm leading-relaxed">
          {descricao}
        </p>
      </div>

      {/* CONTEXTO PERSONALIZADO */}

      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">

        <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
          O que isso indica
        </p>

        <p className="text-sm text-slate-700 leading-relaxed">
          Pelas respostas do seu questionário, seu emagrecimento pode estar acontecendo sem proteção metabólica suficiente.
        </p>

        <p className="text-sm text-slate-700 leading-relaxed mt-3">
          Nesses casos, o peso até pode cair no início — mas o organismo tende a recuperar gordura depois.
        </p>

      </div>

      {/* TRANSIÇÃO */}

      <div className="text-center space-y-2">

        <p className="text-sm text-slate-700 leading-relaxed">
          Existe uma forma de estruturar o emagrecimento para reduzir esse risco metabólico.
        </p>

        <p className="text-sm font-semibold text-slate-900">
          E é justamente esse ponto que separa quem mantém o resultado de quem recupera o peso depois.
        </p>

      </div>

      {/* CTA */}

      <button
        onClick={onCtaClick}
        className="w-full py-6 bg-[#0f766e] hover:bg-[#134e4a] text-white rounded-2xl font-semibold text-lg transition-all shadow-xl"
      >
        Descobrir como isso funciona
      </button>

    </div>
  );
};

export default ResultsView;
