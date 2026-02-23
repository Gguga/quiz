import React from 'react';

interface NewsInterstitialProps {
  onNext: () => void;
}

const NewsInterstitial: React.FC<NewsInterstitialProps> = ({ onNext }) => {
  return (
    <div className="w-full max-w-xl mx-auto animate-fadeIn px-4">
      <div className="bg-white rounded-[1.5rem] shadow-2xl overflow-hidden border border-slate-200 flex flex-col">

        {/* HEADER ESTILO PORTAL */}
        <div className="bg-black px-6 py-6 flex items-center justify-center border-b-4 border-red-600">
          <div className="text-white font-black text-2xl tracking-tight uppercase">
            CNN BRASIL
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-6">

          {/* INFO PUBLICAÇÃO */}
          <div className="text-slate-400 font-bold text-[10px] uppercase tracking-wide border-b border-slate-100 pb-2">
            Seção: Saúde • Atualizado conforme publicação original
          </div>

          {/* HEADLINE */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-[1.15] tracking-tight">
              Mounjaro, Wegovy e Ozempic:
              <br />
              <span className="text-red-600">82% recuperam peso</span> após interrupção do tratamento
            </h2>

            <p className="text-slate-700 text-sm md:text-base leading-relaxed font-medium">
              Reportagem publicada pela <span className="font-bold">CNN Brasil</span> destacou estudo clínico divulgado na <span className="font-bold">JAMA Network</span> acompanhando pacientes após a interrupção de agonistas de GLP-1.
            </p>

            <p className="text-slate-700 text-sm md:text-base leading-relaxed font-medium">
              O acompanhamento mostrou que a maioria recuperou parte significativa do peso perdido ao suspender a medicação.
            </p>

            {/* CAIXA DE IMPACTO */}
            <div className="bg-red-600 p-6 rounded-xl shadow-lg">
              <p className="text-white text-base md:text-lg leading-snug tracking-tight font-semibold">
                A questão não é se a caneta funciona.
                <br /><br />
                A questão é: <span className="font-black">se seu emagrecimento está estruturado para se manter sem ela.</span>
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-2">
            <button
              onClick={onNext}
              className="w-full py-5 bg-[#0f766e] text-white rounded-xl font-black text-base hover:bg-[#0d6b63] transition-all shadow-xl uppercase tracking-wider"
            >
              continuar diagnóstico
            </button>
          </div>

        </div>

        {/* RODAPÉ */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-100">
          <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">
            Fonte: CNN Brasil • JAMA Network • Dados de acompanhamento clínico
          </span>
        </div>

      </div>
    </div>
  );
};

export default NewsInterstitial;
