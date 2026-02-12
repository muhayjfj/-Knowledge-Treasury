
import React from 'react';
import { Language } from '../types';

interface FooterProps {
  lang: Language;
  t: (key: string) => string;
}

const Footer: React.FC<FooterProps> = ({ lang, t }) => {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-black text-emerald-500 mb-6">{t('siteTitle')}</h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              {t('footerAboutDesc')}
            </p>
            <div className="flex gap-4">
              {['facebook-f', 'twitter', 'instagram', 'youtube', 'telegram'].map(social => (
                <a key={social} href="#" className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-emerald-600 transition-all group">
                  <i className={`fab fa-${social} text-slate-400 group-hover:text-white`}></i>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">{t('footerQuickLinksTitle')}</h4>
            <ul className="space-y-4 text-slate-400">
              {['navHome', 'navAudio', 'navVideo', 'navAuthors', 'navCategories'].map(item => (
                <li key={item}>
                  <a href="#" className="hover:text-emerald-500 transition-colors flex items-center gap-2">
                    <i className="fas fa-chevron-left text-[10px]"></i>
                    {t(item)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">{t('navCategories')}</h4>
            <ul className="space-y-4 text-slate-400">
              {['quran', 'hadith', 'fiqh', 'aqeedah', 'tazkiyah'].map(cat => (
                <li key={cat}>
                   <a href="#" className="hover:text-emerald-500 transition-colors flex items-center gap-2">
                    <i className="fas fa-chevron-left text-[10px]"></i>
                    {t(`category${cat.charAt(0).toUpperCase() + cat.slice(1)}Title`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">{t('footerContactTitle')}</h4>
            <ul className="space-y-4 text-slate-400">
              <li className="flex items-center gap-3">
                <i className="fas fa-envelope text-emerald-500"></i>
                info@kanz-almaarifa.com
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-phone text-emerald-500 text-sm"></i>
                +123456789
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-location-dot text-emerald-500"></i>
                مكتبة المشاريع، الرياض
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
          <p>© 2024 {t('siteTitle')} - {lang === 'ar' ? 'جميع الحقوق محفوظة' : 'All rights reserved'}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
