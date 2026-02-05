
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
  return (
    <div className="w-full animate-fadeIn space-y-6">
      <h2 className="text-2xl font-black text-slate-900 text-center leading-tight">
        {question.text}
      </h2>
      <div className="space-y-3">
        {question.options.map((option) => (
          <button
            key={option.value}
            onClick={() => onSelect(option.value)}
            className={`w-full p-5 text-left rounded-2xl border-2 transition-all flex flex-col ${
              selectedOption === option.value 
                ? 'border-[#0f766e] bg-teal-50 shadow-md' 
                : 'border-white bg-white hover:border-slate-200'
            }`}
          >
            <span className="font-bold text-slate-800">{option.label}</span>
            {option.subLabel && <span className="text-xs text-slate-400 mt-1">{option.subLabel}</span>}
          </button>
        ))}
      </div>
      <div className="pt-6 space-y-4">
        <button 
          onClick={onNext} 
          disabled={!selectedOption} 
          className="w-full py-5 bg-[#0f766e] text-white rounded-2xl font-black text-lg shadow-lg disabled:opacity-50 uppercase"
        >
          {isLast ? 'Ver Resultado' : 'Próxima Pergunta'}
        </button>
        {!isFirst && (
          <button onClick={onBack} className="w-full text-slate-400 font-bold text-xs uppercase tracking-widest">
            Voltar
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizStep;
