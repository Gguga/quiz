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
    onNext(); // chama direto, sem timeout
  };

  return (
    <div className="min-h-[88vh] w-full max-w-xl mx-auto px-6 flex flex-col animate-fadeIn">

      <div className="mt-24">

        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-black text-[#0f766e] leading-tight">
            {question.text}
          </h2>

          <p className="text-slate-400 text-xs uppercase tracking-widest mt-4">
            Selecione uma opção abaixo
          </p>
        </div>

        <div className="space-y-5">
          {question.options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleOptionClick(option.value)}
              className={`w-full py-5 rounded-2xl font-bold text-base transition-all duration-200 border
                ${selectedOption === option.value
                  ? 'bg-[#0f766e] text-white border-[#0f766e] shadow-md'
                  : 'bg-white text-slate-800 border-slate-200 hover:border-[#0f766e] hover:shadow-sm'
                }
              `}
            >
              {option.label}
            </button>
          ))}
        </div>

        {!isFirst && (
          <div className="mt-16 text-center">
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
