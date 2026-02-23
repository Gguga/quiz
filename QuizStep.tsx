import React from 'react';
import { Question } from './types';

interface QuizStepProps {
  question: Question;
  selectedOption: string | null;
  onSelect: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
  isFirst: boolean;
  answers: { [key: number]: string };
}

const QuizStep: React.FC<QuizStepProps> = ({
  question,
  selectedOption,
  onSelect,
  onNext,
  onBack,
  isFirst,
  answers
}) => {

  // 🔹 Ajuste dinâmico de gênero para pergunta 11
  const getDynamicText = () => {
    if (question.id === 11) {
      const sexo = answers[1];
      if (sexo === "sexo_mulher") {
        return question.text.replace("disposto(a)", "disposta");
      }
      if (sexo === "sexo_homem") {
        return question.text.replace("disposto(a)", "disposto");
      }
    }
    return question.text;
  };

  return (
    <div className="w-full max-w-xl mx-auto px-6 pt-24 pb-16 animate-fadeIn">

      {/* PERGUNTA */}
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-black text-[#0f766e] leading-tight tracking-tight">
          {getDynamicText()}
        </h2>
      </div>

      {/* OPÇÕES */}
      <div className="space-y-4">
        {question.options.map((option) => (
          <button
            key={option.value}
            onClick={() => {
              onSelect(option.value);
              setTimeout(onNext, 200);
            }}
            className={`w-full py-5 rounded-2xl font-semibold text-base transition-all duration-200 border shadow-sm
              ${
                selectedOption === option.value
                  ? 'bg-[#0f766e] text-white border-[#0f766e] shadow-lg'
                  : 'bg-white text-slate-800 border-slate-200 hover:border-[#0f766e] hover:shadow-md'
              }
            `}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* VOLTAR */}
      {!isFirst && (
        <div className="mt-14 text-center">
          <button
            onClick={onBack}
            className="text-slate-400 text-sm uppercase tracking-widest hover:text-slate-600 transition-colors"
          >
            ← Voltar
          </button>
        </div>
      )}

    </div>
  );
};

export default QuizStep;
