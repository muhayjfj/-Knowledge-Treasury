
import React, { useState } from 'react';
import { Language } from '../types';

interface HeaderProps {
  lang: Language;
  setLang: (lang: Language) => void;
  isScrolled: boolean;
  t: (key: string) => string;
  onOpenPublish: () => void;
  isAuthorized: boolean;
  canInstall: boolean;
  onInstall: () => void;
}

const Header: React.FC<HeaderProps> = ({ lang, setLang, isScrolled, t, onOpenPublish, isAuthorized, canInstall, onInstall }) => {
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
      isScrolled ? 'bg-white/90 backdrop-blur-2xl shadow-[0_10px_50px_rgba(0,0,0,0.08)] py-4' : 'bg-transparent py-10 text-white'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div 
            className="flex items-center gap-5 group cursor-pointer" 
            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-700 transform ${
              isScrolled ? 'bg-emerald-800 shadow-2xl rotate-0 scale-90' : 'bg-white/10 backdrop-blur-xl rotate-6 group-hover:rotate-0'
            }`}>
              <span className="text-3xl">📚</span>
            </div>
            <div className="flex flex-col">
              <h1 className={`text-2xl font-black tracking-tight quran-font ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
                {t('siteTitle')}
              </h1>
              {!isScrolled && <span className="text-[9px] font-black uppercase tracking-[0.4em] opacity-60">Global Islamic Hub</span>}
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <nav className="flex items-center gap-8 ml-10">
              {['Home', 'Audio', 'Video', 'Authors'].map(item => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  className={`text-xs font-black uppercase tracking-widest hover:text-gold-accent transition-colors ${isScrolled ? 'text-slate-500' : 'text-white/70'}`}
                >
                  {t(`nav${item}`)}
                </a>
              ))}
            </nav>

            <div className="h-6 w-px bg-slate-200 opacity-20 mx-4"></div>

            {canInstall && (
              <button 
                onClick={onInstall}
                className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-black text-xs transition-all shimmer ${
                  isScrolled ? 'bg-gold-accent text-emerald-950 shadow-xl' : 'bg-white/10 border border-white/20'
                }`}
              >
                <i className="fas fa-download"></i>
                {lang === 'ar' ? 'تثبيت' : 'Install'}
              </button>
            )}

            <button 
              onClick={onOpenPublish}
              className={`px-8 py-3.5 rounded-2xl font-black text-xs flex items-center gap-3 transition-all active:scale-95 ${
                isScrolled ? 'bg-emerald-800 text-white shadow-lg' : 'bg-white/10 border border-white/20 hover:bg-white/20'
              }`}
            >
              <i className={`fas ${isAuthorized ? 'fa-plus' : 'fa-lock'} text-[10px]`}></i>
              {t('publishBtn')}
            </button>

            <div className={`flex items-center gap-1 p-1.5 rounded-2xl border ${
              isScrolled ? 'bg-slate-50 border-slate-200 shadow-inner' : 'bg-white/5 border-white/10'
            }`}>
              {(['ar', 'en', 'am'] as Language[]).map(l => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${
                    lang === l ? 'bg-gold-accent text-emerald-950 shadow-md' : isScrolled ? 'text-slate-400 hover:text-emerald-700' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:hidden flex items-center gap-3">
             {canInstall && (
              <button onClick={onInstall} className="w-12 h-12 bg-gold-accent text-emerald-950 rounded-2xl flex items-center justify-center shadow-lg">
                <i className="fas fa-download"></i>
              </button>
            )}
            <button className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isScrolled ? 'bg-slate-100 text-slate-900' : 'bg-white/10'}`}>
              <i className="fas fa-bars-staggered"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
