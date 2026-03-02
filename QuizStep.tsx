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
      className="min-h-[88vh] w-full max-w-lg mx-auto px-6 flex flex-col justify-center"
    >

      <div className="animate-fadeInUp">

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f766e] leading-tight tracking-tight">
            {question.text}
          </h2>

          <p className="text-slate-400 text-xs uppercase tracking-widest mt-5">
            Selecione uma opção abaixo
          </p>
        </div>

        <div className="space-y-4">
          {question.options.map((option, index) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleOptionClick(option.value)}
              style={{ animationDelay: `${index * 70}ms` }}
              className="option-animate w-full py-5 rounded-2xl font-semibold text-base
                         bg-white text-slate-800 border border-slate-200
                         transition-all duration-200
                         active:scale-[0.98]
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
              className="text-slate-400 text-xs uppercase tracking-widest hover:text-slate-600 transition-colors"
            >
              ← Voltar pergunta
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default QuizStep;
