
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

const QuizStep: React.FC<QuizStepProps> = ({ question, selectedOption, onSelect, onNext, onBack, isFirst, isLast }) => {
  const handleOptionClick = (value: string) => {
    onSelect(value);
    // Avanço rápido para manter a fluidez
    setTimeout(() => {
      onNext();
    }, 180);
  };

  return (
    <div className="flex flex-col h-full justify-center animate-fadeIn px-4 py-2 gap-y-4">
      {/* Título de Impacto - text-2xl ou 3xl */}
      <div className="text-center shrink-0 px-2 space-y-3">
        <h2 className="text-2xl md:text-3xl font-black text-[#0f172a] leading-tight tracking-tight">
          {question.text}
        </h2>
        <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">
          SELECIONE UMA OPÇÃO ABAIXO:
        </div>
      </div>
      
      {/* Opções com Legibilidade Elevada */}
      <div className="flex flex-col space-y-3 w-full max-w-sm mx-auto flex-1 justify-center">
        {question.options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleOptionClick(option.value)}
            className={`w-full flex flex-col items-center justify-center text-center py-4 px-5 rounded-[1.25rem] border-2 transition-all duration-150 active:scale-[0.97] ${
              selectedOption === option.value
                ? 'border-[#0f766e] bg-teal-50 text-slate-900 shadow-md ring-1 ring-[#0f766e]/20'
                : 'border-slate-100 bg-white text-slate-700 shadow-sm'
            }`}
          >
            <span className="font-extrabold text-lg md:text-xl leading-tight flex items-center justify-center">
              {option.label}
            </span>
            {option.subLabel && (
              <span className="text-sm font-medium opacity-60 mt-1.5 leading-snug max-w-[90%] mx-auto">
                {option.subLabel}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Navegação Secundária Minimalista */}
      <div className="mt-4 flex justify-center shrink-0 pb-4">
        {!isFirst && (
          <button 
            onClick={onBack} 
            className="text-slate-300 font-black text-[11px] uppercase tracking-[0.25em] px-6 py-3 opacity-60 active:opacity-100 transition-opacity"
          >
            ← Voltar Pergunta
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizStep;

