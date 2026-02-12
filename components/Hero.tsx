
import React, { useState } from 'react';
import { Language } from '../types';

interface HeroProps {
  lang: Language;
  t: (key: string) => string;
  onSearch: (query: string) => void;
  onSetCategory: (id: string) => void; // إضافة الوظيفة لتعيين القسم
}

const Hero: React.FC<HeroProps> = ({ lang, t, onSearch, onSetCategory }) => {
  const [inputValue, setInputValue] = useState('');

  const keywords = [
    { label: 'تفسير', cat: 'quran' },
    { label: 'حديث', cat: 'hadith' },
    { label: 'سيرة', cat: 'history' },
    { label: 'أخلاق', cat: 'tazkiyah' }
  ];

  const handleKeywordClick = (label: string, catId: string) => {
    setInputValue(label);
    onSearch(label);
    onSetCategory(catId);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-32 overflow-hidden">
      {/* Background Layers */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-950 via-slate-900 to-emerald-900 opacity-98"></div>
        <img 
          src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=2000" 
          className="w-full h-full object-cover opacity-30 mix-blend-luminosity scale-110 blur-sm"
          alt="Luxury Background"
        />
        {/* Glowing Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gold-accent/5 rounded-full blur-[100px] animate-pulse [animation-delay:2s]"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl px-6 text-center">
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-4 px-6 py-2.5 bg-white/5 backdrop-blur-3xl rounded-full border border-white/10 mb-12 animate-fadeInDown">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-accent"></span>
          </span>
          <span className="text-gold-accent font-black tracking-[0.3em] uppercase text-[10px] drop-shadow-sm">
            {lang === 'ar' ? 'رحلة العلم تبدأ من هنا' : 'The Journey of Wisdom Starts Here'}
          </span>
        </div>
        
        <h1 className="text-6xl md:text-[8.5rem] font-black leading-[0.9] text-white mb-10 tracking-tighter quran-font drop-shadow-2xl">
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40">
            {t('heroTitle').split(' - ')[0]}
          </span>
          <span className="block text-gold-accent text-3xl md:text-5xl mt-8 font-bold tracking-normal opacity-90 italic quran-font">
             {t('heroTitle').split(' - ')[1] || ''}
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-16 font-medium leading-relaxed opacity-80 animate-fadeIn">
          {t('heroDesc')}
        </p>

        {/* Super Search Box - Central Focus */}
        <div className="max-w-4xl mx-auto group mb-12 animate-fadeInUp [animation-delay:0.3s]">
          <div className="relative p-3 bg-white/5 backdrop-blur-3xl rounded-[4rem] border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] transition-all group-focus-within:border-gold-accent/40 group-focus-within:shadow-gold-accent/10">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 bg-white rounded-[3.5rem] px-10 py-6 flex items-center gap-6 shadow-inner relative overflow-hidden">
                <i className="fas fa-search text-slate-300 text-2xl group-focus-within:text-emerald-600 transition-all"></i>
                <input
                  type="text"
                  value={inputValue}
                  placeholder={t('searchPlaceholder')}
                  onChange={(e) => { setInputValue(e.target.value); onSearch(e.target.value); }}
                  className="w-full text-slate-800 focus:outline-none bg-transparent font-black text-xl placeholder:text-slate-300"
                />
              </div>
              <button 
                onClick={() => document.getElementById('content')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gold-accent hover:bg-[#c4a130] text-emerald-950 px-16 py-6 rounded-[3.5rem] font-black text-xl transition-all hover:scale-[1.03] active:scale-95 shadow-2xl shimmer"
              >
                {lang === 'ar' ? 'بحث' : 'Search'}
              </button>
            </div>
          </div>
          
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {keywords.map((kw, i) => (
              <button
                key={kw.label}
                onClick={() => handleKeywordClick(kw.label, kw.cat)}
                className="px-7 py-3 rounded-full bg-white/5 hover:bg-gold-accent text-slate-400 hover:text-emerald-950 border border-white/10 text-xs font-black transition-all hover:-translate-y-1"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <i className="fas fa-hashtag text-[10px] opacity-40 mr-1"></i>
                {kw.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Wave Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#f8fafc] to-transparent"></div>
    </section>
  );
};

export default Hero;
