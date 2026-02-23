import React from 'react';
import { Question } from './types';

interface QuizStepProps {
  question: Question;
  selectedOption: string | null;
  onSelect: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const QuizStep: React.FC<QuizStepProps> = ({
  question,
  selectedOption,
  onSelect,
  onNext,
  onBack,
  isFirst
}) => {

  return (
    <div className="w-full max-w-xl mx-auto px-6 pt-16 pb-10">

      {/* PERGUNTA */}
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-black text-[#0f766e] leading-tight">
          {question.text}
        </h2>
        <p className="text-slate-400 text-xs uppercase tracking-widest mt-3">
          Selecione uma opção abaixo
        </p>
      </div>

      {/* OPÇÕES */}
      <div className="space-y-4">
        {question.options.map((option) => (
          <button
            key={option.value}
            onClick={() => {
              onSelect(option.value);
              setTimeout(onNext, 250);
            }}
            className={`w-full py-5 rounded-2xl font-bold text-base transition-all shadow-sm border
              ${selectedOption === option.value
                ? 'bg-[#0f766e] text-white border-[#0f766e]'
                : 'bg-white text-slate-800 border-slate-200 hover:border-[#0f766e]'
              }
            `}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* VOLTAR */}
      {!isFirst && (
        <div className="mt-12 text-center">
          <button
            onClick={onBack}
            className="text-slate-400 text-sm uppercase tracking-widest"
          >
            ← Voltar pergunta
          </button>
        </div>
      )}

    </div>
  );
};

export default QuizStep;
