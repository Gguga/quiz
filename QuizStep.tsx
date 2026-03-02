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
      className="min-h-screen w-full max-w-md mx-auto px-6 flex flex-col"
    >

      {/* Espaçamento superior consistente */}
      <div className="pt-24 flex-1 flex flex-col">

        {/* Pergunta */}
        <div className="text-center mb-14">

          <h2 className="text-3xl md:text-4xl font-extrabold text-teal-800 leading-[1.15] tracking-tight max-w-xs mx-auto">
            {question.text}
          </h2>

          <p className="text-slate-400 text-xs uppercase tracking-[0.25em] mt-6">
            Selecione uma opção
          </p>

        </div>

        {/* Opções */}
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
                         hover:shadow-md
                         focus:outline-none"
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Botão voltar */}
        {!isFirst && (
          <div className="mt-16 text-center">
            <button
              type="button"
              onClick={onBack}
              className="text-slate-400 text-xs uppercase tracking-[0.25em] hover:text-slate-600 transition-colors"
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
