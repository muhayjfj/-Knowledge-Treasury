
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Language, ContentCardProps } from './types';
import { translations } from './translations';
import { categories, authors, mockContent } from './constants';
import Header from './components/Header';
import Hero from './components/Hero';
import CategorySection from './components/CategorySection';
import ContentGrid from './components/ContentGrid';
import AuthorSection from './components/AuthorSection';
import GeminiAssistant from './components/GeminiAssistant';
import AudioPlayer from './components/AudioPlayer';
import Footer from './components/Footer';
import PublishModal from './components/PublishModal';
import ShareLinkModal from './components/ShareLinkModal';

declare var confetti: any;

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>(() => {
    return (localStorage.getItem('preferredLanguage') as Language) || 'ar';
  });
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'audio' | 'video' | 'text'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  
  const [isAuthorized, setIsAuthorized] = useState(() => {
    const authStatus = sessionStorage.getItem('is_publisher_authorized');
    return authStatus === 'true';
  });
  
  const [toast, setToast] = useState<{msg: string, type: 'success' | 'error'} | null>(null);

  const [contentList, setContentList] = useState<ContentCardProps[]>(() => {
    try {
      const saved = localStorage.getItem('knowledge_treasury_content');
      return saved ? JSON.parse(saved) : mockContent;
    } catch (e) {
      return mockContent;
    }
  });
  
  const [currentAudio, setCurrentAudio] = useState<ContentCardProps | null>(null);
  const [dailyWisdom, setDailyWisdom] = useState<string>('');

  const stats = useMemo(() => ({
    total: contentList.length + 1240,
    countries: 62,
    listeningNow: Math.floor(Math.random() * 500) + 240
  }), [contentList.length]);

  useEffect(() => {
    localStorage.setItem('preferredLanguage', lang);
    localStorage.setItem('knowledge_treasury_content', JSON.stringify(contentList));
    
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    const handleInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleInstallPrompt);

    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    const wisdoms = {
      ar: "إنما العلم بالتعلم، والبركة في الإخلاص والعمل الدؤوب.",
      en: "True knowledge is acquired through learning, and blessing lies in sincerity.",
      am: "እውቀት በትምህርት ይገኛል።"
    };
    setDailyWisdom(wisdoms[lang]);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeinstallprompt', handleInstallPrompt);
    };
  }, [lang, contentList]);

  const t = useCallback((key: string) => translations[key]?.[lang] || key, [lang]);

  const handleInstallApp = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') setDeferredPrompt(null);
  };

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleCategoryClick = (id: string) => {
    setSelectedCategory(id);
    const contentElement = document.getElementById('content');
    if (contentElement) {
      contentElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddNewContent = (newItem: ContentCardProps) => {
    setContentList(prev => [newItem, ...prev]);
    setIsPublishModalOpen(false);
    
    setSelectedCategory(newItem.category);
    setTypeFilter(newItem.type);
    
    setTimeout(() => {
      document.getElementById('content')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);

    if (typeof confetti !== 'undefined') {
      confetti({ 
        particleCount: 200, 
        spread: 80, 
        origin: { y: 0.7 },
        colors: ['#064e3b', '#d4af37', '#ffffff']
      });
    }
    showToast(lang === 'ar' ? `تم نشر "${newItem.title}" بنجاح!` : `Published "${newItem.title}" successfully!`);
  };

  return (
    <div className={`min-h-screen bg-[#fcfdfe] transition-all duration-700 ${lang === 'am' ? 'lang-am' : ''}`}>
      {toast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[400] animate-bounce">
          <div className={`glass-premium ${toast.type === 'success' ? 'bg-emerald-800' : 'bg-red-800'} text-white px-8 py-4 rounded-3xl shadow-2xl flex items-center gap-4 border border-white/20`}>
            <i className={`fas ${toast.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
            <span className="font-bold">{toast.msg}</span>
          </div>
        </div>
      )}

      <div className="fixed bottom-10 right-10 z-[150] flex flex-col items-end gap-4">
        <button 
          onClick={() => setIsShareModalOpen(true)}
          className="w-14 h-14 bg-white text-emerald-900 rounded-2xl shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all border border-emerald-100"
          title={t('inviteFriends')}
        >
          <i className="fas fa-share-alt text-xl"></i>
        </button>
        <button 
          onClick={() => setIsPublishModalOpen(true)}
          className="w-20 h-20 bg-gold-accent text-emerald-950 rounded-[2.5rem] shadow-[0_20px_50px_rgba(212,175,55,0.4)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all premium-pulse group"
        >
          <i className="fas fa-plus text-3xl group-hover:rotate-90 transition-transform duration-500"></i>
        </button>
      </div>

      <Header 
        lang={lang} setLang={setLang} isScrolled={isScrolled} t={t} 
        onOpenPublish={() => setIsPublishModalOpen(true)}
        isAuthorized={isAuthorized} canInstall={!!deferredPrompt} onInstall={handleInstallApp}
      />

      <main>
        <Hero 
          lang={lang} 
          t={t} 
          onSearch={(q) => { setSearchQuery(q); document.getElementById('content')?.scrollIntoView({ behavior: 'smooth' }); }} 
          onSetCategory={handleCategoryClick} 
        />
        
        <div className="max-w-7xl mx-auto px-6 md:px-10 -mt-20 relative z-20">
          <div className="glass-premium rounded-[3.5rem] p-10 shadow-[0_40px_100px_rgba(6,78,59,0.1)] flex flex-col lg:flex-row items-center justify-between gap-12 animate-fadeInUp">
            <div className="flex items-center gap-8 w-full lg:w-1/2">
              <div className="flex items-center gap-5 bg-emerald-900 text-white px-8 py-4 rounded-[2rem] shadow-xl shrink-0">
                <i className="fas fa-star-and-crescent text-gold-accent animate-pulse"></i>
                <span className="font-black text-xs uppercase tracking-[0.3em]">{lang === 'ar' ? 'نور اليوم' : 'Daily Light'}</span>
              </div>
              <p className="text-slate-800 font-bold italic text-xl quran-font line-clamp-1">{dailyWisdom}</p>
            </div>
            
            <div className="flex items-center gap-12 border-r border-slate-100 pr-12 hidden md:flex">
               <div className="text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{lang === 'ar' ? 'إجمالي الكنوز' : 'Total Treasures'}</p>
                <p className="text-2xl font-black text-emerald-700">+{stats.total}</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{lang === 'ar' ? 'دولة مستفيدة' : 'Countries'}</p>
                <p className="text-2xl font-black text-emerald-700">{stats.countries}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{lang === 'ar' ? 'يستمعون الآن' : 'Listening Now'}</p>
                </div>
                <p className="text-2xl font-black text-slate-800">{stats.listeningNow}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-10 py-32 space-y-40">
          
          <CategorySection 
            t={t} 
            categories={categories} 
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategoryClick}
          />
          
          <section id="content" className="scroll-mt-32">
             <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 gap-12">
              <div>
                <div className="flex items-center gap-5 mb-6">
                  <div className="h-1.5 w-16 bg-gold-accent rounded-full"></div>
                  <span className="text-emerald-700 font-black text-[10px] uppercase tracking-[0.4em]">
                    {selectedCategory === 'all' ? t('latestContent') : categories.find(c => c.id === selectedCategory)?.title}
                  </span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight quran-font">
                   {typeFilter === 'text' ? (lang === 'ar' ? 'مكتبة المصنفات والكتب' : 'Books Library') : (selectedCategory === 'all' ? t('latestContent') : categories.find(c => c.id === selectedCategory)?.title)}
                </h2>
              </div>
              
              <div className="flex bg-white/50 backdrop-blur-xl p-2.5 rounded-[3rem] shadow-2xl border border-slate-100/50 overflow-x-auto max-w-full">
                {['all', 'text', 'audio', 'video'].map(type => (
                  <button
                    key={type}
                    onClick={() => setTypeFilter(type as any)}
                    className={`px-10 py-5 rounded-[2.5rem] text-xs font-black transition-all whitespace-nowrap flex items-center gap-3 ${
                      typeFilter === type ? 'bg-emerald-800 text-white shadow-xl' : 'text-slate-400 hover:text-emerald-700 hover:bg-white'
                    }`}
                  >
                    <i className={`fas ${type === 'text' ? 'fa-book' : type === 'audio' ? 'fa-headphones' : type === 'video' ? 'fa-film' : 'fa-th-large'}`}></i>
                    {t(`filter${type.charAt(0).toUpperCase() + type.slice(1)}`)}
                  </button>
                ))}
              </div>
            </div>

            <ContentGrid 
              content={contentList} 
              filter={searchQuery} 
              typeFilter={typeFilter} 
              categoryFilter={selectedCategory} 
              onPlayAudio={(item) => setCurrentAudio(item)}
              isAuthorized={isAuthorized}
              onDelete={(title) => setContentList(prev => prev.filter(i => i.title !== title))}
            />
          </section>

          <AuthorSection t={t} authors={authors} />
          <GeminiAssistant lang={lang} t={t} />
        </div>
      </main>

      <Footer lang={lang} t={t} />
      {currentAudio && <AudioPlayer item={currentAudio} onClose={() => setCurrentAudio(null)} t={t} lang={lang} />}
      <PublishModal isOpen={isPublishModalOpen} onClose={() => setIsPublishModalOpen(false)} onPublish={handleAddNewContent} t={t} onAuthSuccess={() => setIsAuthorized(true)} />
      <ShareLinkModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} lang={lang} t={t} />
    </div>
  );
};

export default App;
