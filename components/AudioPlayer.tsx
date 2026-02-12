
import React, { useState } from 'react';
import { ContentCardProps } from '../types';

interface AudioPlayerProps {
  item: ContentCardProps;
  onClose: () => void;
  t: (key: string) => string;
  lang: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ item, onClose, t, lang }) => {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div className="fixed bottom-10 left-0 right-0 z-[200] px-4 md:px-10 pointer-events-none">
      <div className="max-w-6xl mx-auto pointer-events-auto">
        <div className="premium-glass bg-emerald-950/95 backdrop-blur-3xl text-white p-6 md:p-8 rounded-[3.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.6)] border border-white/10 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden group">
          
          {/* Animated Background Decoration */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-gold-accent/10 rounded-full blur-[100px] animate-pulse"></div>

          {/* Info Section */}
          <div className="flex items-center gap-6 w-full md:w-1/3 shrink-0">
            <div className="relative shrink-0">
              <img 
                src={item.image} 
                className={`w-24 h-24 rounded-[2rem] object-cover shadow-2xl transition-all duration-700 ${isPlaying ? 'scale-105 rotate-3' : 'scale-100 rotate-0'}`} 
                alt={item.title} 
              />
              {isPlaying && (
                <div className="absolute -bottom-2 -right-2 bg-gold-accent text-emerald-950 w-8 h-8 rounded-full flex items-center justify-center animate-bounce shadow-lg">
                  <i className="fas fa-volume-up text-xs"></i>
                </div>
              )}
            </div>
            <div className="overflow-hidden">
              <h4 className="text-xl font-black text-white truncate mb-1 quran-font">{item.title}</h4>
              <p className="text-sm font-bold text-gold-accent/80 tracking-widest flex items-center gap-2">
                <i className="fas fa-feather"></i>
                {item.author}
              </p>
            </div>
          </div>

          {/* Controls Section */}
          <div className="flex-1 w-full flex flex-col items-center gap-6">
            <div className="flex items-center gap-10">
              <button className="text-slate-500 hover:text-white transition-all text-xl"><i className="fas fa-random"></i></button>
              <button className="text-slate-300 hover:text-gold-accent transition-all text-2xl"><i className="fas fa-step-backward"></i></button>
              
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-20 h-20 bg-gold-accent text-emerald-950 rounded-[2.5rem] flex items-center justify-center hover:scale-110 active:scale-90 transition-all shadow-[0_20px_40px_rgba(212,175,55,0.4)] group-hover:rotate-6"
              >
                <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'} text-3xl ml-1`}></i>
              </button>

              <button className="text-slate-300 hover:text-gold-accent transition-all text-2xl"><i className="fas fa-step-forward"></i></button>
              <button className="text-slate-500 hover:text-white transition-all text-xl"><i className="fas fa-redo"></i></button>
            </div>

            {/* Progress Bar */}
            <div className="w-full flex items-center gap-6">
              <span className="text-[10px] font-black text-slate-500 w-12 text-right">05:42</span>
              <div className="flex-1 h-2.5 bg-white/5 rounded-full relative cursor-pointer group/progress">
                <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 to-gold-accent w-[45%] rounded-full progress-glow transition-all"></div>
                <div className="absolute left-[45%] top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-2xl border-4 border-gold-accent opacity-0 group-hover/progress:opacity-100 transition-opacity"></div>
              </div>
              <span className="text-[10px] font-black text-slate-500 w-12">{item.duration}</span>
            </div>
          </div>

          {/* Right Side Controls */}
          <div className="hidden md:flex items-center gap-8 w-1/4 justify-end">
             <div className="flex items-center gap-4 group/vol">
              <i className="fas fa-volume-low text-slate-500 group-hover/vol:text-gold-accent"></i>
              <div className="w-24 h-1.5 bg-white/10 rounded-full relative">
                <div className="absolute inset-y-0 left-0 bg-slate-400 w-2/3 rounded-full group-hover/vol:bg-gold-accent transition-all"></div>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="w-14 h-14 bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-500 rounded-2xl transition-all border border-white/5 flex items-center justify-center"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
