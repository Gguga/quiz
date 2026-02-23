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
    <div className="min-h-[85vh] w-full max-w-xl mx-auto px-6 flex flex-col justify-center">

      <div className="space-y-12">

        {/* PERGUNTA */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl md:text-3xl font-black text-[#0f766e] leading-tight">
            {question.text}
          </h2>
          <p className="text-slate-400 text-xs uppercase tracking-widest">
            Selecione uma opção
          </p>
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

        {/* VOLTAR */}
        {!isFirst && (
          <div className="pt-6 text-center">
            <button
              onClick={onBack}
              className="text-slate-400 text-xs uppercase tracking-widest hover:text-slate-600 transition-colors"
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
