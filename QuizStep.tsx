import React from 'react';
import { Question } from './types';

interface QuizStepProps {
  question: Question;
  selectedOption: string | null;
  onSelect: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
  isFirst: boolean;
}

const QuizStep: React.FC<QuizStepProps> = ({
  question,
  selectedOption,
  onSelect,
  onNext,
  onBack,
  isFirst
}) => {

  const handleOptionClick = (value: string) => {
    onSelect(value);
    onNext();
  };

  return (
    <div
      key={question.id}
      className="min-h-screen w-full max-w-md mx-auto px-6 pt-20 pb-16 flex flex-col"
    >

      <div className="w-full">

        <div className="text-center mb-12">

          <h2 className="text-3xl font-semibold text-[#0f766e] leading-snug tracking-tight max-w-xs mx-auto">
            {question.text}
          </h2>

          <p className="text-slate-400 text-xs uppercase tracking-[0.25em] mt-5">
            Selecione uma opção
          </p>

        </div>

        <div className="space-y-4">
          {question.options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleOptionClick(option.value)}
              className="w-full py-5 rounded-2xl font-medium text-base
                         bg-white text-slate-800
                         border border-slate-200
                         shadow-sm
                         transition-all duration-200
                         active:scale-[0.97]
                         focus:outline-none"
            >
              {option.label}
            </button>
          ))}
        </div>

        {!isFirst && (
          <div className="mt-14 text-center">
            <button
              type="button"
              onClick={onBack}
              className="text-slate-400 text-xs uppercase tracking-[0.25em]"
            >
              ← Voltar
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default QuizStep;
