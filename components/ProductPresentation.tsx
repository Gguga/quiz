
import React from 'react';

interface Props {
  onNext: () => void;
}

const ProductPresentation: React.FC<Props> = ({ onNext }) => {
  return (
    <div className="w-full max-w-xl mx-auto animate-fadeIn px-6 space-y-10 text-center pb-20">
      {/* Header da Oferta */}
      <div className="space-y-4">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight tracking-tight">
          O Plano de Intervenção que o seu <span className="text-[#0f766e]">Metabolismo Precisa.</span>
        </h2>
        <p className="text-slate-500 font-bold text-base leading-relaxed max-w-sm mx-auto">
          Recalibre seu corpo, proteja seus músculos e garanta que o investimento na sua medicação não seja em vão.
        </p>
      </div>

      {/* Entregáveis/Pilares */}
      <div className="space-y-4">
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-soft flex items-start text-left space-x-5">
          <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center shrink-0">
            <svg className="w-7 h-7 text-[#0f766e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div className="space-y-1">
            <h4 className="font-black text-slate-900 text-sm uppercase tracking-tight">PILAR 1: Guia de Refeições de Alta Densidade</h4>
            <p className="text-xs text-slate-500 leading-relaxed">Aprenda o que comer quando o apetite some para nutrir o corpo e evitar a flacidez.</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-soft flex items-start text-left space-x-5">
          <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center shrink-0">
            <svg className="w-7 h-7 text-[#0f766e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="space-y-1">
            <h4 className="font-black text-slate-900 text-sm uppercase tracking-tight">PILAR 2: Protocolo Anti-Platô (Ciclagem)</h4>
            <p className="text-xs text-slate-500 leading-relaxed">Estratégia de choque metabólico para destravar a balança sem aumentar a dose do remédio.</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-soft flex items-start text-left space-x-5">
          <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center shrink-0">
            <svg className="w-7 h-7 text-[#0f766e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div className="space-y-1">
            <h4 className="font-black text-slate-900 text-sm uppercase tracking-tight">PILAR 3: Manual de Transição Pós-Caneta</h4>
            <p className="text-xs text-slate-500 leading-relaxed">Passo a passo exato para abandonar a medicação sem sofrer com a fome biológica.</p>
          </div>
        </div>
      </div>

      {/* Bloco de Preço e Bônus */}
      <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" /></svg>
        </div>

        <div className="space-y-2">
          <div className="inline-block bg-amber-400/20 text-amber-400 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-400/20">
            BÔNUS INCLUSO: Lista de Compras Inteligente
          </div>
          <div className="flex flex-col items-center justify-center pt-2">
            <span className="text-slate-400 text-xs line-through font-bold">De R$ 197,00</span>
            <div className="flex items-baseline space-x-1">
              <span className="text-sm font-bold">Por apenas</span>
              <span className="text-4xl font-black text-teal-400">R$ 44,00</span>
            </div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Acesso Vitalício</span>
          </div>
        </div>

        <button
          onClick={onNext}
          className="w-full py-6 bg-teal-500 hover:bg-teal-400 text-slate-900 rounded-2xl font-black text-lg transition-all shadow-xl shadow-teal-500/20 uppercase tracking-tight"
        >
          QUERO O PROTOCOLO E GARANTIR MEU RESULTADO
        </button>

        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em]">
          Pagamento único. Sem mensalidades. Acesso imediato via e-mail.
        </p>
      </div>
    </div>
  );
};

export default ProductPresentation;
