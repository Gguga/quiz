
import React from 'react';

interface Props {
  onNext: () => void;
}

const SolutionDetailSlide1: React.FC<Props> = ({ onNext }) => {
  return (
    <div className="w-full max-w-xl mx-auto animate-fadeIn px-6 space-y-8 text-center pb-10">
      {/* Badge Superior */}
      <div className="pt-4">
        <span className="text-[#0f766e] font-black text-[10px] uppercase tracking-widest bg-teal-50 px-5 py-2 rounded-full border border-teal-100">
          FASE DE TRANSIÇÃO
        </span>
      </div>

      {/* Título e Subtítulo */}
      <div className="space-y-3">
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-none tracking-tighter">
          protocolo anti rebote
        </h2>
        <p className="text-lg font-bold text-slate-900 uppercase tracking-tight">
          Estratégia de manutenção para estabilizar seu peso
        </p>
      </div>

      {/* Bloco de Texto Conectado ao Quiz */}
      <div className="space-y-4 max-w-md mx-auto text-left">
        <p className="text-slate-600 font-medium text-sm md:text-base leading-relaxed">
          Pelo seu resultado no diagnóstico, seu organismo precisa de suporte metabólico agora.
        </p>
        <p className="text-slate-600 font-medium text-sm md:text-base leading-relaxed">
          O ponto principal não é comer menos, mas ajustar a densidade do que você ingere para proteger sua massa magra.
        </p>
        <p className="text-slate-600 font-medium text-sm md:text-base leading-relaxed">
          Este protocolo organiza sua rotina para que o metabolismo se mantenha ativo durante a fase de transição.
        </p>
      </div>

      {/* Lista de Entregáveis Enxuta */}
      <div className="space-y-4 py-4 text-center max-w-sm mx-auto border-t border-slate-100 pt-6">
        <p className="text-base md:text-lg font-black text-slate-900 leading-tight">
          Refeições com alta densidade nutricional
        </p>
        <p className="text-base md:text-lg font-black text-slate-900 leading-tight">
          Cardápios prontos com foco em proteínas
        </p>
        <p className="text-base md:text-lg font-black text-slate-900 leading-tight">
          Opções de 3 ou 4 refeições diárias
        </p>
        <p className="text-base md:text-lg font-black text-slate-900 leading-tight">
          Ajustado para quem treina ou não treina
        </p>
      </div>

      {/* Botão de Transição / Objeção */}
      <div className="pt-6 space-y-4">
        <button
          onClick={onNext}
          className="w-full py-6 bg-[#0f766e] hover:bg-[#134e4a] text-white rounded-2xl font-black text-lg transition-all shadow-xl shadow-teal-900/20 uppercase tracking-tight"
        >
          É DIFÍCIL DE SEGUIR?
        </button>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Leva poucos minutos para organizar sua semana
        </p>
      </div>
    </div>
  );
};

export default SolutionDetailSlide1;
