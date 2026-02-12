
import React from 'react';
import { ContentCardProps } from '../types';
import { categories } from '../constants';

interface ContentGridProps {
  content: ContentCardProps[];
  filter: string;
  typeFilter: 'all' | 'audio' | 'video' | 'text';
  categoryFilter: string;
  onPlayAudio: (item: ContentCardProps) => void;
  isAuthorized: boolean;
  onDelete: (title: string) => void;
}

const ContentGrid: React.FC<ContentGridProps> = ({ 
  content, filter, typeFilter, categoryFilter, onPlayAudio, isAuthorized, onDelete 
}) => {
  const currentLang = (document.documentElement.lang as any) || 'ar';

  const filteredItems = content.filter(item => {
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    const query = filter.toLowerCase();
    const matchesSearch = item.title.toLowerCase().includes(query) || item.author.toLowerCase().includes(query);
    return matchesCategory && matchesType && matchesSearch;
  });

  if (filteredItems.length === 0) {
    return (
      <div className="text-center py-40 glass-premium rounded-[4rem] border-dashed border-2 border-slate-200 animate-fadeIn">
        <div className="w-32 h-32 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner">
          <i className="fas fa-scroll text-5xl text-emerald-200"></i>
        </div>
        <h3 className="text-3xl font-black text-slate-800 mb-4 quran-font">
          {typeFilter === 'text' ? 'لا توجد كتب في هذا التصنيف' : 'لا توجد نتائج مطابقة'}
        </h3>
        <p className="text-slate-400 font-bold max-w-md mx-auto">
          {typeFilter === 'text' 
            ? 'كن أول من ينشر كتاباً أو مصنفاً في هذا القسم لإثراء المكتبة.' 
            : 'حاول تغيير معايير البحث أو تصفح الأقسام الأخرى.'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
      {filteredItems.map((item, idx) => {
        const categoryObj = categories.find(c => c.id === item.category);
        const isText = item.type === 'text';

        return (
          <article 
            key={`${item.title}-${idx}`} 
            className={`group relative glass-premium rounded-[3.5rem] overflow-hidden flex flex-col transition-all duration-700 hover:-translate-y-4 border border-white h-full ${
              isText ? 'bg-[#fffcf5] border-amber-100 shadow-[0_20px_40px_rgba(180,140,0,0.05)]' : '' 
            }`}
          >
            {/* غلاف الكنز */}
            <div className={`relative overflow-hidden shrink-0 ${isText ? 'h-80 p-6' : 'h-72'}`}>
              <div className={`w-full h-full overflow-hidden rounded-[2.5rem] shadow-xl relative ${isText ? 'border-r-8 border-amber-800' : ''}`}>
                <img 
                  src={item.image} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                  alt={item.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              </div>
              
              {/* شارة التصنيف */}
              <div className="absolute top-10 right-10">
                <div className={`px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl backdrop-blur-md border border-white/20 flex items-center gap-2 ${
                  isText ? 'bg-amber-700 text-white' : 'bg-emerald-900 text-white'
                }`}>
                  <i className={`fas ${isText ? 'fa-book-bookmark' : item.type === 'audio' ? 'fa-headphones' : 'fa-video'}`}></i>
                  {isText ? (currentLang === 'ar' ? 'مُصنّف كتاب' : 'Book') : item.type}
                </div>
              </div>

              {/* زر الحذف للناشر */}
              {isAuthorized && (
                <button 
                  onClick={(e) => { e.stopPropagation(); onDelete(item.title); }}
                  className="absolute bottom-10 left-10 w-12 h-12 bg-red-600/90 text-white rounded-2xl flex items-center justify-center shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity z-10"
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              )}
            </div>

            {/* تفاصيل الكنز */}
            <div className="p-10 flex flex-col flex-1">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                   <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isText ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-900'}`}>
                      <i className={`fas ${categoryObj?.icon || 'fa-tag'}`}></i>
                   </div>
                   <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">{categoryObj?.title}</span>
                </div>
              </div>

              <h3 className={`font-black text-slate-900 mb-6 line-clamp-2 quran-font leading-snug group-hover:text-amber-800 transition-colors ${isText ? 'text-3xl' : 'text-2xl'}`}>
                {item.title}
              </h3>

              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-amber-50 group-hover:text-amber-600 transition-all">
                  <i className="fas fa-feather-alt"></i>
                </div>
                <div>
                   <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{currentLang === 'ar' ? 'المؤلف / المصنف' : 'Author'}</p>
                   <p className="text-sm font-bold text-slate-600">{item.author}</p>
                </div>
              </div>

              <div className="mt-auto pt-8 border-t border-slate-50">
                <button 
                  onClick={() => item.type === 'audio' ? onPlayAudio(item) : null}
                  className={`w-full py-5 rounded-[2rem] font-black text-sm flex items-center justify-center gap-4 transition-all active:scale-95 shadow-lg ${
                    isText 
                      ? 'bg-amber-800 text-white hover:bg-amber-950 shadow-amber-900/20' 
                      : 'bg-emerald-900 text-white hover:bg-black'
                  }`}
                >
                  <i className={`fas ${isText ? 'fa-book-open-reader' : 'fa-play'}`}></i>
                  {isText ? (currentLang === 'ar' ? 'ابدأ القراءة والمطالعة' : 'Start Reading') : (currentLang === 'ar' ? 'تشغيل المحتوى' : 'Play Content')}
                </button>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default ContentGrid;
