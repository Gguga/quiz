
import React, { useState, useRef } from 'react';

interface VideoInterstitialProps {
  onNext: () => void;
}

const VideoInterstitial: React.FC<VideoInterstitialProps> = ({ onNext }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayToggle = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.muted = false; // Garante que o som saia ao clicar
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto animate-fadeIn px-6 text-center space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight tracking-tight">
          Antes de prosseguirmos, deixa eu me apresentar.
        </h2>
      </div>

      <div className="relative aspect-[9/16] max-w-[300px] mx-auto rounded-[2.5rem] overflow-hidden shadow-soft border-4 border-white bg-slate-900 group">
        {/* VIDEO TAG: Substitua o 'src' abaixo pelo link do seu vídeo */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover opacity-90"
          playsInline
          muted // Começa mudo para permitir autoplay/preview se desejar
          loop
          poster="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800" // Capa do vídeo antes do play
          src="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" // LINK DO SEU VÍDEO AQUI
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent pointer-events-none"></div>
        
        {/* Overlay de Controle */}
        <div className="absolute inset-0 flex items-center justify-center p-4">
          {!isPlaying && (
            <button 
              onClick={handlePlayToggle}
              className="bg-[#0f766e] p-6 rounded-3xl text-white shadow-2xl transform transition-transform hover:scale-110 active:scale-95 flex flex-col items-center space-y-2 z-20"
            >
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
              </svg>
              <span className="text-[10px] font-black uppercase tracking-widest">Ouvir Explicação</span>
            </button>
          )}

          {/* Botão pequeno para pausar caso já esteja tocando */}
          {isPlaying && (
            <button 
              onClick={handlePlayToggle}
              className="absolute top-6 right-6 bg-white/20 backdrop-blur-md p-2 rounded-full text-white z-20"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
        
        <div className="absolute bottom-10 left-6 right-6 text-left pointer-events-none">
          <span className="bg-[#0f766e] text-white text-[11px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-2 inline-block shadow-sm">Gustavo Campos</span>
          <p className="text-white font-extrabold text-lg md:text-xl leading-tight drop-shadow-md uppercase tracking-tight">
            Nutricionista
          </p>
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full py-6 bg-[#0f766e] text-white rounded-2xl font-black text-lg hover:bg-[#134e4a] transition-all shadow-xl shadow-teal-900/10 uppercase"
      >
        CONTINUAR CONSULTA
      </button>
    </div>
  );
};

export default VideoInterstitial;
