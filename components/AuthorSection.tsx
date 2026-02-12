
import React from 'react';
import { Author } from '../types';

interface AuthorSectionProps {
  t: (key: string) => string;
  authors: Author[];
}

const AuthorSection: React.FC<AuthorSectionProps> = ({ t, authors }) => {
  return (
    <section id="authors" className="scroll-mt-32">
      <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8 animate-fadeInUp">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <span className="h-1.5 w-16 bg-emerald-500 rounded-full"></span>
            <span className="text-emerald-600 font-black text-xs uppercase tracking-widest">{t('featuredAuthors')}</span>
          </div>
          <h2 className="text-5xl font-black text-slate-900 tracking-tight">{t('featuredAuthors')}</h2>
        </div>
        <button className="text-slate-400 font-bold hover:text-emerald-600 transition-all flex items-center gap-3 group">
          <span>{document.documentElement.lang === 'ar' ? 'عرض كافة العلماء' : 'View All Scholars'}</span>
          <i className="fas fa-arrow-left group-hover:-translate-x-2 transition-transform"></i>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {authors.map((author, idx) => (
          <div 
            key={author.id} 
            className="group relative animate-fadeInUp" 
            style={{ animationDelay: `${idx * 150}ms` }}
          >
            <div className="glass-card rounded-[3.5rem] p-10 text-center hover:bg-white transition-all duration-500 border border-slate-100 hover:border-emerald-200 group">
              <div className="relative w-40 h-40 mx-auto mb-8">
                <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-2xl group-hover:bg-emerald-500/30 transition-all"></div>
                <div className="relative w-full h-full p-2 bg-white rounded-full shadow-2xl group-hover:scale-105 transition-transform duration-500">
                  <img src={author.image} alt={author.name} className="w-full h-full object-cover rounded-full border-4 border-slate-50 grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight group-hover:text-emerald-600 transition-colors">{author.name}</h3>
              <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-8">{author.desc}</p>
              
              <div className="flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                <button className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 hover:bg-emerald-500 hover:text-white transition-all"><i className="fas fa-book"></i></button>
                <button className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 hover:bg-emerald-500 hover:text-white transition-all"><i className="fas fa-headphones"></i></button>
                <button className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 hover:bg-emerald-500 hover:text-white transition-all"><i className="fas fa-info-circle"></i></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AuthorSection;
