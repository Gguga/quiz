import React from 'react';

interface NewsInterstitialProps {
  onNext: () => void;
}

const NewsInterstitial: React.FC<NewsInterstitialProps> = ({ onNext }) => {
  return (
    <div className="w-full max-w-md mx-auto px-4 pt-6 pb-6">

      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">

        {/* HEADER CNN */}
        <div className="bg-black px-5 py-4 flex items-center justify-center border-b-4 border-[#cc0000]">
          <span className="text-white font-black text-xl uppercase tracking-tight italic">
            CNN BRASIL
          </span>
        </div>

        <div className="px-5 py-5 space-y-4">

          {/* DATA */}
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Saúde | 01/12/2025 – 15h47
          </div>

          {/* MANCHETE */}
          <h2 className="text-xl font-extrabold text-slate-900 leading-tight">
            <span className="text-[#cc0000]">82% recuperam peso</span> após interromper as canetas emagrecedoras
          </h2>

          {/* SUBTÍTULO */}
          <p className="text-sm text-slate-700 leading-snug font-medium">
            Estudo clínico publicado na <span className="font-bold">JAMA</span> acompanhou pacientes após a suspensão do tratamento com agonistas de GLP-1.
          </p>

          {/* BLOCO IMPACTO */}
          <div className="bg-[#cc0000] p-4 rounded-xl">
            <p className="text-white text-sm font-semibold leading-snug">
              A pergunta não é se a caneta funciona.
            </p>
            <p className="text-white text-sm font-black mt-1">
              É se você está preparado para manter o peso sem ela.
            </p>
          </div>

          {/* BOTÃO */}
          <button
            onClick={onNext}
            className="w-full py-4 bg-[#0f766e] text-white rounded-xl font-black uppercase text-sm tracking-wide shadow-md hover:bg-[#0d6b63] transition"
          >
            Continuar diagnóstico
          </button>

        </div>
      </div>

    </div>
  );
};

export default NewsInterstitial;
