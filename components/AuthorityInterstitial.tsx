
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
          
          <p className="text-[#0f766e] font-black text-sm uppercase tracking-wide">
            É isso que vamos analisar no seu resultado.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          Resultado Típico de Proteção Metabólica:
        </p>
        <div className="rounded-[2rem] overflow-hidden shadow-soft border-4 border-white bg-white">
          <img 
            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800" 
            alt="Resultado Real Metabolismo" 
            className="w-full h-auto object-cover"
          />
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
