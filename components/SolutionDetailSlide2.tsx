
import React from 'react';

interface Props {
  onNext: () => void;
}

const SolutionDetailSlide2: React.FC<Props> = ({ onNext }) => {
  return (
    <div className="w-full max-w-xl mx-auto animate-fadeIn px-6 space-y-10 text-center pb-10">
      <div className="space-y-4">
        <span className="text-rose-600 font-black text-[10px] uppercase tracking-widest bg-rose-50 px-4 py-1.5 rounded-full border border-rose-100">Praticidade Máxima</span>
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight tracking-tight">
          Feito para quem <br/><span className="text-[#0f766e]">não tem tempo</span>
        </h2>
        <p className="text-slate-500 font-bold text-base">Chega de receitas complicadas e ingredientes caros que você nunca encontra.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft space-y-3">
          <span className="text-3xl block">🍳</span>
          <h4 className="font-black text-slate-900 text-xs uppercase tracking-tighter">Cozinha em <br/>15 min</h4>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft space-y-3">
          <span className="text-3xl block">🛒</span>
          <h4 className="font-black text-slate-900 text-xs uppercase tracking-tighter">Supermercado <br/>Comum</h4>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft space-y-3">
          <span className="text-3xl block">🍱</span>
          <h4 className="font-black text-slate-900 text-xs uppercase tracking-tighter">Fácil de <br/>Transportar</h4>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft space-y-3">
          <span className="text-3xl block">🍱</span>
          <h4 className="font-black text-slate-900 text-xs uppercase tracking-tighter">Resultados <br/>Visíveis</h4>
        </div>
      </div>

      <div className="bg-teal-50 p-6 rounded-[2rem] border border-teal-100 italic font-bold text-[#0f766e]">
        "Pense no Guia como o seu manual de instruções para o corpo novo. Prático, direto ao ponto e sem enrolação."
      </div>

      <button
        onClick={onNext}
        className="w-full py-6 bg-[#0f766e] text-white rounded-2xl font-black text-lg hover:bg-[#134e4a] transition-all shadow-xl shadow-teal-900/10 uppercase"
      >
        QUERO CONHECER O GUIA
      </button>
    </div>
  );
};

export default SolutionDetailSlide2;
