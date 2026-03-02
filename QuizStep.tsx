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
      className="min-h-[88vh] w-full max-w-md mx-auto px-6 flex flex-col justify-center"
    >

      <div className="animate-fadeInUp">

        {/* Pergunta */}
        <div className="text-center mb-14 px-2">

          <h2 className="text-2xl md:text-3xl font-bold text-[#115e59] leading-snug tracking-tight max-w-[340px] mx-auto">
            {question.text}
          </h2>

          <p className="text-slate-400 text-[11px] uppercase tracking-[0.25em] mt-6">
            SELECIONE UMA OPÇÃO
          </p>

        </div>

        {/* Opções */}
        <div className="space-y-4">
          {question.options.map((option, index) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleOptionClick(option.value)}
              style={{ animationDelay: `${index * 60}ms` }}
              className="option-animate w-full py-4 rounded-2xl
                         font-medium text-[15px]
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

        {/* Voltar */}
        {!isFirst && (
          <div className="mt-16 text-center">
            <button
              type="button"
              onClick={onBack}
              className="text-slate-400 text-[11px] uppercase tracking-[0.25em] transition-colors"
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
