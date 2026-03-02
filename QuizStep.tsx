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
      className="min-h-screen w-full max-w-md mx-auto px-6 flex flex-col justify-center"
    >

      <div>

        <div className="text-center mb-12">

          <h2 className="text-2xl md:text-3xl font-bold text-teal-800 leading-tight max-w-sm mx-auto">
            {question.text}
          </h2>

          <p className="text-slate-400 text-xs uppercase tracking-wider mt-6">
            Selecione uma opção
          </p>

        </div>

        <div className="space-y-4">
          {question.options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleOptionClick(option.value)}
              className="w-full py-4 rounded-2xl font-medium text-base
                         bg-white text-slate-800
                         border border-slate-200
                         shadow-sm
                         transition-all duration-200
                         active:scale-95
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
              className="text-slate-400 text-xs uppercase tracking-wider"
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
