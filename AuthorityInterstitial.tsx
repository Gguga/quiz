
import React from 'react';

interface AuthorityInterstitialProps {
  onNext: () => void;
}

const AuthorityInterstitial: React.FC<AuthorityInterstitialProps> = ({ onNext }) => {
  return (
    <div className="w-full max-w-xl mx-auto animate-fadeIn px-6 text-center space-y-12">
      <div className="space-y-6">
        <h2 className="inline-block bg-[#cc0000] text-white font-black text-xl px-6 py-2.5 uppercase tracking-tighter transform -rotate-1 shadow-lg">
          O PONTO QUE MUITOS IGNORAM...
        </h2>
        
        <div className="space-y-4">
          <p className="text-slate-800 font-extrabold text-xl md:text-2xl leading-tight tracking-tight">
            Você está investindo alto no tratamento, e provavelmente já passou por tentativas sem sucesso anteriormente... <br/>
            <span className="text-[#0f766e]">Então faz sentido querer que o resultado seja de qualidade e sustentável.</span>
          </p>
          
          <p className="text-slate-600 font-bold text-lg leading-relaxed max-w-md mx-auto">
            Sem uma alimentação bem estruturada, boa parte da perda rápida pode ser de <span className="text-slate-900">massa magra</span>, o que dificulta muito manter o peso depois.
          </p>
          
          <div className="bg-teal-50 p-6 rounded-3xl border border-teal-100 mt-6">
            <p className="text-[#0f766e] font-black text-sm uppercase tracking-wide leading-relaxed">
              Nosso objetivo é garantir que seu metabolismo não "trave" e que você não recupere o peso ao finalizar o uso.
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full py-6 bg-[#0f766e] text-white rounded-2xl font-black text-lg hover:bg-[#134e4a] transition-all shadow-xl shadow-teal-900/10 uppercase"
      >
        ENTENDI, CONTINUAR DIAGNÓSTICO
      </button>
    </div>
  );
};

export default AuthorityInterstitial;
