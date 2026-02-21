
import React, { useState, useRef } from 'react';

interface VslViewProps {
  onCheckout: () => void;
}

const VslView: React.FC<VslViewProps> = ({ onCheckout }) => {
  const [showOffer, setShowOffer] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = videoRef.current.currentTime / videoRef.current.duration;
      if (progress >= 0.8 && !showOffer) {
        setShowOffer(true);
      }
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8 animate-fadeIn px-6 pb-20 pt-4">
      {/* Header VSL */}
      <div className="text-center space-y-4">
        <h2 className="text-2xl md:text-4xl font-black text-slate-900 leading-tight tracking-tight uppercase italic">
          Assista ao vídeo abaixo para <span className="text-[#0f766e]">desbloquear</span> seu acesso:
        </h2>
        <div className="flex items-center justify-center space-x-2 text-[#cc0000] font-bold text-xs animate-pulse uppercase tracking-widest">
          <div className="w-2 h-2 rounded-full bg-[#cc0000]"></div>
          <span>Vídeo Exclusivo para você</span>
        </div>
      </div>

      {/* Container do Vídeo */}
      <div className="relative aspect-video w-full rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-black">
        <video
          ref={videoRef}
          onTimeUpdate={handleTimeUpdate}
          className="w-full h-full object-cover"
          controls
          playsInline
          src="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" 
        />
      </div>

      <div className="text-center">
         <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Som ligado! Aumente o volume.</p>
      </div>

      {/* Oferta Velada (Aparece em 80% do vídeo) */}
      {showOffer && (
        <div className="space-y-10 animate-fadeIn pt-10 border-t border-slate-200">
          <div className="text-center space-y-4">
            <h3 className="text-3xl font-black text-slate-900 leading-tight tracking-tighter uppercase">
              O Plano de Intervenção que o seu <br/><span className="text-[#0f766e]">Metabolismo Precisa.</span>
            </h3>
            <p className="text-slate-600 font-bold text-base max-w-md mx-auto">
              Recalibre seu corpo, proteja seus músculos e garanta que o investimento na sua medicação não seja em vão.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: '🥗', title: 'CARDÁPIOS PROTEICOS', desc: 'Fáceis de seguir e práticos.' },
              { icon: '📉', title: 'PROTOCOLOS ANTI-PLATÔ', desc: 'Destrave seu peso hoje.' },
              { icon: '🔄', title: 'MANUAL DE TRANSIÇÃO', desc: 'Vida livre de rebote.' }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft text-center space-y-2">
                <span className="text-3xl block">{item.icon}</span>
                <h4 className="font-black text-slate-900 text-xs uppercase tracking-tight">{item.title}</h4>
                <p className="text-[10px] text-slate-400 font-bold uppercase">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white text-center space-y-6 shadow-2xl relative overflow-hidden">
            <div className="space-y-2">
              <div className="inline-block bg-amber-400/20 text-amber-400 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-400/20">
                BÔNUS INCLUSO: Lista de Compras Inteligente
              </div>
              <div className="flex flex-col items-center justify-center pt-2">
                <span className="text-slate-400 text-xs line-through font-bold">De R$ 197,00</span>
                <div className="flex items-baseline space-x-1">
                  <span className="text-sm font-bold">Por apenas</span>
                  <span className="text-5xl font-black text-teal-400">R$ 44,00</span>
                </div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Acesso Vitalício e Imediato</span>
              </div>
            </div>

            <button
              onClick={onCheckout}
              className="w-full py-6 bg-teal-500 hover:bg-teal-400 text-slate-900 rounded-2xl font-black text-xl transition-all shadow-xl shadow-teal-500/20 uppercase tracking-tight animate-pulse"
            >
              GARANTIR MEU ACESSO AGORA
            </button>

            <div className="flex items-center justify-center space-x-4 opacity-50">
                <span className="text-[8px] font-bold uppercase tracking-widest">Cartão de Crédito</span>
                <span className="text-[8px] font-bold uppercase tracking-widest">PIX</span>
                <span className="text-[8px] font-bold uppercase tracking-widest">Compra Segura</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VslView;
