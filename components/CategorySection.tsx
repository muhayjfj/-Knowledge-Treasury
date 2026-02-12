
import React from 'react';
import { Category } from '../types';

interface CategorySectionProps {
  t: (key: string) => string;
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({ t, categories, selectedCategory, onSelectCategory }) => {
  return (
    <section id="categories" className="scroll-mt-24">
      <div className="text-center mb-16">
        <div className="inline-block px-6 py-2 bg-emerald-50 rounded-full text-emerald-700 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
          {t('categoriesTitle')}
        </div>
        <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-4 quran-font">تصفح كنوز العلم حسب القسم</h2>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        {categories.map((cat, idx) => (
          <button 
            key={cat.id} 
            onClick={() => onSelectCategory(cat.id)}
            className={`group relative p-8 rounded-[3rem] transition-all duration-500 flex flex-col items-center text-center overflow-hidden animate-fadeInUp ${
              selectedCategory === cat.id 
                ? 'bg-emerald-800 text-white shadow-2xl scale-105 ring-4 ring-gold-accent/20' 
                : 'bg-white text-slate-800 hover:bg-slate-50 hover:shadow-xl hover:-translate-y-2 border border-slate-100'
            }`}
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <div className={`w-20 h-20 rounded-[1.8rem] flex items-center justify-center mb-6 transition-all duration-500 ${
              selectedCategory === cat.id ? 'bg-white/10' : 'bg-emerald-50 group-hover:bg-emerald-500'
            }`}>
              <i className={`fas ${cat.icon} text-3xl ${
                selectedCategory === cat.id ? 'text-gold-accent' : 'text-emerald-600 group-hover:text-white'
              }`}></i>
            </div>
            
            <h3 className="font-black text-sm tracking-tight leading-tight">
              {cat.title}
            </h3>
            
            {selectedCategory === cat.id && (
              <div className="absolute top-4 right-4 animate-bounce">
                <i className="fas fa-check-circle text-gold-accent text-sm"></i>
              </div>
            )}
            
            <div className={`absolute -right-4 -bottom-4 opacity-5 transition-opacity ${
              selectedCategory === cat.id ? 'text-white' : 'text-emerald-900'
            }`}>
              <i className={`fas ${cat.icon} text-7xl`}></i>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
