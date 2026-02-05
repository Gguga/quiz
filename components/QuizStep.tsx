
import React from 'react';
import { Question } from '../types';

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
  isFirst,
  isLast
}) => {
  return (
    <div className="w-full max-w-xl mx-auto animate-fadeIn px-6">
      <div className="text-center space-y-6">
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight tracking-tight">
          {question.text}
        </h2>
        
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-white inline-block px-4 py-1 rounded-full border border-slate-100">
          Selecione uma das opções abaixo:
        </p>

        {question.image && (
          <div className="pt-2">
             <img 
              src={question.image} 
              alt="Referência Visual" 
              className="w-full max-w-[340px] mx-auto rounded-[2rem] shadow-soft border-4 border-white"
            />
          </div>
        )}

        <div className={`space-y-3 pt-4 ${question.id === 2 ? 'grid grid-cols-2 gap-4 space-y-0' : ''}`}>
          {question.options.map((option) => (
            <button
              key={option.value}
              onClick={() => onSelect(option.value)}
              className={`w-full p-5 text-left rounded-2xl border-2 transition-all duration-300 flex flex-col group relative overflow-hidden ${
                selectedOption === option.value
                  ? 'border-[#0f766e] bg-teal-50/30 text-slate-900 shadow-soft'
                  : 'border-white hover:border-slate-200 bg-white text-slate-600 shadow-soft'
              }`}
            >
              <div className="flex items-center w-full mb-1 relative z-10">
                {option.icon && (
                  <div className={`mr-3 text-2xl transition-transform duration-300 ${selectedOption === option.value ? 'scale-110' : 'group-hover:scale-110'}`}>
                    {option.icon}
                  </div>
                )}
                <span className={`font-extrabold text-sm md:text-base leading-snug flex-1 ${selectedOption === option.value ? 'text-[#0f766e]' : 'text-slate-700'}`}>
                  {option.label}
                </span>
                {selectedOption === option.value && (
                  <div className="ml-2 text-[#0f766e]">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  </div>
                )}
              </div>
              
              {option.subLabel && (
                <p className={`text-[11px] font-medium leading-relaxed pl-1 relative z-10 ${
                  selectedOption === option.value ? 'text-[#0f766e]/70' : 'text-slate-400'
                }`}>
                  {option.subLabel}
                </p>
              )}
            </button>
          ))}
        </div>

        <div className="pt-8 flex flex-col space-y-4 pb-10">
          <button
            onClick={onNext}
            disabled={!selectedOption}
            className={`w-full py-5 rounded-2xl font-black text-white transition-all transform active:scale-95 shadow-xl ${
              selectedOption 
                ? 'bg-[#0f766e] hover:bg-[#134e4a] shadow-teal-900/20' 
                : 'bg-slate-200 cursor-not-allowed text-slate-400 shadow-none'
            }`}
          >
            {isLast ? 'GERAR PARECER TÉCNICO' : 'PRÓXIMO PASSO'}
          </button>

          {!isFirst && (
            <button
              onClick={onBack}
              className="text-slate-400 hover:text-[#0f766e] font-black text-[10px] uppercase tracking-[0.2em] transition-colors"
            >
              Voltar pergunta
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizStep;
