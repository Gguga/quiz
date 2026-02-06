
import React, { useState } from 'react';

interface AudioInterstitialProps {
  onNext: () => void;
}

const AudioInterstitial: React.FC<AudioInterstitialProps> = ({ onNext }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="w-full max-w-xl mx-auto animate-fadeIn px-6 text-center space-y-10">
      <div className="space-y-3">
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight tracking-tight">
          Escute essa rápida explicação 👇
        </h2>
        <p className="text-[10px] font-black text-[#0f766e] uppercase tracking-widest bg-teal-50 px-4 py-1.5 rounded-full inline-block border border-teal-100">
          Clique no player abaixo para iniciar o áudio
        </p>
      </div>

      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-soft">
        <div className="bg-slate-50/50 p-5 rounded-3xl border border-slate-100 flex items-center space-x-4 shadow-inner">
           <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-[#0f766e] shrink-0 shadow-sm bg-teal-100 flex items-center justify-center">
              <span className="text-2xl">🎙️</span>
           </div>
           
           <div className="flex-1 space-y-2">
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-black text-[#0f766e] uppercase tracking-wider">Gustavo Campos</span>
                <span className="text-[9px] font-bold text-slate-400">01:00</span>
              </div>
              <div className="h-7 flex items-center space-x-[3px]">
                {Array.from({length: 45}).map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-0.5 rounded-full transition-all duration-300 ${isPlaying ? 'bg-[#0f766e] animate-pulse' : 'bg-slate-200'}`}
                    style={{ height: `${isPlaying ? Math.random() * 80 + 20 : 15}%`, transitionDelay: `${i * 10}ms` }}
                  />
                ))}
              </div>
           </div>

           <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-12 h-12 bg-[#0f766e] rounded-2xl text-white flex items-center justify-center shadow-xl shadow-teal-900/20 transform active:scale-90 transition-all"
           >
              {isPlaying ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
              ) : (
                <svg className="w-6 h-6 translate-x-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
              )}
           </button>
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full py-6 bg-[#0f766e] text-white rounded-2xl font-black text-lg hover:bg-[#134e4a] transition-all shadow-xl shadow-teal-900/10 uppercase"
      >
        PRÓXIMO PASSO
      </button>
    </div>
  );
};

export default AudioInterstitial;
