
import React from 'react';

interface NewsInterstitialProps {
  onNext: () => void;
}

const NewsInterstitial: React.FC<NewsInterstitialProps> = ({ onNext }) => {
  return (
    <div className="w-full max-w-xl mx-auto animate-fadeIn px-4">
      <div className="bg-white rounded-[1.5rem] shadow-2xl overflow-hidden border border-slate-200 flex flex-col">
        
        {/* Header Estilo Portal de Notícias */}
        <div className="bg-black px-6 py-6 flex items-center justify-center border-b-4 border-[#cc0000]">
          <div className="text-white font-black text-2xl tracking-tighter uppercase italic">
            SAÚDE
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-6">
          {/* Informações da Publicação */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-[#cc0000] font-black text-xs uppercase tracking-wider">CNN BRASIL</span>
            </div>
            <div className="text-slate-400 font-bold text-[10px] uppercase tracking-wide border-b border-slate-100 pb-2">
              01/12/25 às 15:47 | Atualizado 01/12/25 às 15:47
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-[1.15] tracking-tight">
              Mounjaro, Wegovy e Ozempic: <br/>
              <span className="text-[#cc0000]">82% dos usuários</span> recuperam o peso após interrupção do tratamento
            </h2>

            <p className="text-slate-700 text-sm md:text-base leading-relaxed font-medium">
              Um estudo clínico publicado na <span className="font-bold text-slate-900 underline decoration-[#cc0000] decoration-2 underline-offset-4">JAMA Network</span> acompanhou quem emagreceu com tirzepatida (Mounjaro) e depois interrompeu o tratamento. A maioria recuperou uma parte importante do peso, e os marcadores metabólicos pioraram conforme o reganho aumentou.
            </p>
            
            {/* Box com fundo vermelho e texto formatado conforme solicitado */}
            <div className="bg-[#cc0000] p-6 rounded-xl shadow-lg border-l-4 border-black">
              <p className="text-white text-base md:text-lg leading-snug tracking-tight">
                Agora vem a parte que importa: você sabe se o seu emagrecimento está estruturado pra se manter, ou se está só <span className="font-black">‘emprestado’ pela caneta?</span>
              </p>
            </div>
          </div>

          <div className="pt-2">
            {/* Botão com a cor padrão do app #0f766e */}
            <button
              onClick={onNext}
              className="w-full py-5 bg-[#0f766e] text-white rounded-xl font-black text-base hover:bg-[#0d6b63] transition-all shadow-xl uppercase tracking-wider flex items-center justify-center group"
            >
              <span className="mr-3">CONTINUAR PARA O DIAGNÓSTICO</span>
              <svg 
                className="w-5 h-5 text-white transform transition-transform group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>

        <div className="bg-slate-50 px-6 py-3 flex items-center justify-between border-t border-slate-100">
           <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Fonte: Reuters / JAMA Network / Health News</span>
           <div className="flex space-x-1">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default NewsInterstitial;
