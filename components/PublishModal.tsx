
import React, { useState, useEffect } from 'react';
import { ContentCardProps } from '../types';
import { categories } from '../constants';

interface PublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublish: (item: ContentCardProps) => void;
  t: (key: string) => string;
  onAuthSuccess: () => void;
}

const PUBLISHER_KEY = "2025"; 

const PublishModal: React.FC<PublishModalProps> = ({ isOpen, onClose, onPublish, t, onAuthSuccess }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authKey, setAuthKey] = useState('');
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState<ContentCardProps>({
    title: '',
    author: '',
    description: '',
    duration: '1 ساعة',
    type: 'text',
    category: 'quran',
    image: `https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/400/600`, // أبعاد الغلاف للكتب
    lang: 'ar'
  });

  useEffect(() => {
    const savedAuth = sessionStorage.getItem('is_publisher_authorized');
    if (savedAuth === 'true') setIsAuthorized(true);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (authKey === PUBLISHER_KEY) {
      setIsAuthorized(true);
      setError(false);
      sessionStorage.setItem('is_publisher_authorized', 'true');
      onAuthSuccess();
    } else {
      setError(true);
      setAuthKey('');
      setTimeout(() => setError(false), 3000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.author) return;
    onPublish(formData);
  };

  const selectedCat = categories.find(c => c.id === formData.category);

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-2xl" onClick={onClose}></div>
      
      <div className="relative bg-white w-full max-w-5xl rounded-[4rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row max-h-[90vh] animate-slideUp">
        
        {/* معلومات القسم الجانبي */}
        <div className="lg:w-80 bg-slate-50 p-12 border-r border-slate-100 flex flex-col items-center">
           <div className={`w-full aspect-[3/4] rounded-[2rem] bg-white shadow-2xl overflow-hidden mb-10 border-b-8 ${formData.type === 'text' ? 'border-amber-700' : 'border-emerald-700'}`}>
              <img src={formData.image} className="w-full h-full object-cover" />
           </div>
           <h3 className="text-xl font-black text-slate-900 quran-font text-center mb-4">{formData.title || 'عنوان الكنز'}</h3>
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">{formData.author || 'اسم المصنف'}</p>
           
           <div className="mt-auto w-full space-y-4">
              <div className="p-4 bg-emerald-50 rounded-2xl flex items-center gap-3">
                 <i className="fas fa-shield-halved text-emerald-600"></i>
                 <span className="text-[10px] font-black text-emerald-900 uppercase">بيانات موثوقة</span>
              </div>
           </div>
        </div>

        {/* نموذج النشر */}
        <div className="flex-1 overflow-y-auto p-12 lg:p-16 custom-scrollbar">
          {!isAuthorized ? (
            <div className="max-w-md mx-auto text-center space-y-10">
              <div className="w-24 h-24 bg-emerald-900 text-gold-accent rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl animate-bounce">
                <i className="fas fa-key text-3xl"></i>
              </div>
              <h2 className="text-4xl font-black text-slate-900 quran-font">منطقة الناشرين</h2>
              <p className="text-slate-400 font-bold">يرجى إدخال رمز التحقق لنشر كتاب أو محتوى جديد.</p>
              <form onSubmit={handleAuth} className="space-y-6">
                <input 
                  type="password" required autoFocus placeholder="الرمز السري..."
                  className={`w-full bg-slate-100 border-4 rounded-[2rem] px-8 py-6 text-center text-3xl font-black transition-all ${error ? 'border-red-500 animate-shake' : 'border-transparent focus:border-emerald-500'}`}
                  value={authKey}
                  onChange={e => setAuthKey(e.target.value)}
                />
                <button type="submit" className="w-full bg-emerald-900 text-gold-accent py-6 rounded-[2rem] font-black text-xl hover:bg-black transition-all shadow-xl">
                  دخول اللوحة
                </button>
              </form>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="flex justify-between items-center">
                <h2 className="text-4xl font-black text-slate-900 quran-font">نشر كنز جديد</h2>
                <button type="button" onClick={onClose} className="text-slate-300 hover:text-red-500"><i className="fas fa-times text-2xl"></i></button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-2">عنوان المصنف / الكتاب</label>
                  <input required className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-5 font-black focus:border-emerald-500 transition-all outline-none" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-2">اسم المؤلف / الشيخ</label>
                  <input required className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-5 font-black focus:border-emerald-500 transition-all outline-none" value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-2">التصنيف الشرعي</label>
                  <select className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-5 font-black outline-none focus:border-emerald-500" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                    {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.title}</option>)}
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-2">نوع الكنز (مهم جداً للفصل)</label>
                  <select className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-5 font-black outline-none focus:border-emerald-500" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value as any})}>
                    <option value="text">📖 كتاب مصنف (نصوص ومطالعة)</option>
                    <option value="audio">🎧 مكتبة صوتية (محاضرات)</option>
                    <option value="video">📺 مكتبة مرئية (فيديوهات)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-2">وصف مختصر للكنز</label>
                <textarea rows={3} className="w-full bg-slate-50 border-2 border-slate-100 rounded-3xl px-6 py-5 font-bold outline-none focus:border-emerald-500" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-2">رابط الغلاف (Image URL)</label>
                  <input className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-5 font-bold outline-none" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} />
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-2">المدة / عدد الصفحات</label>
                  <input className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-5 font-black outline-none" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} />
                </div>
              </div>

              <div className="pt-6">
                <button type="submit" className="w-full bg-emerald-800 text-white py-7 rounded-[2.5rem] font-black text-xl hover:bg-black transition-all shadow-2xl flex items-center justify-center gap-4 shimmer">
                  <i className="fas fa-file-export"></i>
                  {formData.type === 'text' ? 'اعتماد نشر الكتاب في المكتبة' : 'اعتماد نشر المحتوى'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublishModal;
