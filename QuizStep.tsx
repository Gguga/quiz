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

  // 🔥 quebra automática elegante para perguntas muito longas
  const formattedText =
    question.text.length > 70
      ? question.text.replace(/ e /g, ' e\n')
      : question.text;

  return (
    <div
      key={question.id}
      className="min-h-screen w-full max-w-md mx-auto px-6 flex flex-col justify-center"
    >

      <div className="w-full">

        {/* HEADER */}
        <div className="text-center mb-10">

          <h2 className="text-[28px] md:text-[32px] font-semibold text-[#0f766e] leading-[1.25] tracking-tight whitespace-pre-line">
            {formattedText}
          </h2>

          <p className="text-slate-400 text-[11px] uppercase tracking-[0.25em] mt-6">
            Selecione uma opção
          </p>

        </div>

        {/* OPTIONS */}
        <div className="space-y-4">

          {question.options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleOptionClick(option.value)}
              className="w-full py-5 rounded-2xl
                         bg-white
                         border border-slate-200
                         shadow-sm
                         text-slate-800
                         text-[17px]
                         font-medium
                         transition-all duration-200
                         active:scale-[0.97]
                         focus:outline-none"
            >
              {option.label}
            </button>
          ))}

        </div>

        {/* BACK */}
        {!isFirst && (
          <div className="mt-14 text-center">
            <button
              type="button"
              onClick={onBack}
              className="text-slate-400 text-[12px] uppercase tracking-[0.3em]"
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
