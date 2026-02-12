
import React, { useState, useRef, useEffect } from 'react';
import { askGemini } from '../services/geminiService';
import { Language } from '../types';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

const GeminiAssistant: React.FC<{ lang: Language; t: (key: string) => string }> = ({ lang, t }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    
    setIsLoading(true);
    try {
      const response = await askGemini(userMsg, lang);
      setMessages(prev => [...prev, { role: 'assistant', text: response }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', text: lang === 'ar' ? "عذراً، حدث خطأ تقني. يرجى المحاولة لاحقاً." : "Sorry, a technical error occurred." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickQuestions = lang === 'ar' 
    ? ['تفسير آية الكرسي', 'من هو الإمام البخاري؟', 'آداب طالب العلم']
    : ['Meaning of Surah Al-Fatiha', 'Who is Imam Shafi’i?', 'Ethics of seeking knowledge'];

  return (
    <section className="max-w-7xl mx-auto px-6 py-20" id="assistant">
      <div className="glass-premium rounded-[4rem] overflow-hidden border border-emerald-100 flex flex-col lg:flex-row shadow-2xl">
        {/* Left Side: Info */}
        <div className="lg:w-1/3 bg-emerald-900 p-12 md:p-16 text-white relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-gold-accent/10 rounded-full blur-[80px]"></div>
          <div className="relative z-10 h-full flex flex-col">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl px-5 py-2 rounded-full text-[10px] font-black tracking-widest uppercase mb-10 border border-white/5">
              <i className="fas fa-brain text-gold-accent"></i>
              Gemini 3 Pro Intelligence
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight quran-font">
              {lang === 'ar' ? 'اسأل المساعد الشرعي' : 'Ask the Sharia Assistant'}
            </h2>
            <p className="text-emerald-100/70 text-lg mb-12 font-medium">
              محرك بحث ذكي مخصص للعلوم الإسلامية، يوفر لك إجابات موثوقة من أمهات الكتب والمصادر المعتمدة.
            </p>
            
            <div className="mt-auto space-y-4">
              <p className="text-xs font-black uppercase tracking-widest text-emerald-500">{lang === 'ar' ? 'أسئلة مقترحة' : 'Suggested Questions'}</p>
              {quickQuestions.map(q => (
                <button 
                  key={q} 
                  onClick={() => setInput(q)}
                  className="w-full text-start p-4 bg-white/5 hover:bg-white/10 rounded-2xl text-sm font-bold border border-white/5 transition-all active:scale-95"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Chat Area */}
        <div className="flex-1 bg-white flex flex-col h-[750px]">
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-10 space-y-8 custom-scrollbar">
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                <div className="w-24 h-24 bg-emerald-50 rounded-[2.5rem] flex items-center justify-center mb-6">
                  <i className="fas fa-comment-dots text-4xl text-emerald-600"></i>
                </div>
                <h4 className="text-2xl font-black text-slate-800">{lang === 'ar' ? 'مرحباً بك في مجلس العلم الذكي' : 'Welcome to the Smart Circle'}</h4>
                <p className="font-bold text-slate-400 mt-2 max-w-sm">{lang === 'ar' ? 'اطرح سؤالك وسأجيبك فوراً بكل أمانة علمية.' : 'Ask your question and I will answer with academic honesty.'}</p>
              </div>
            )}
            
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeInUp`}>
                <div className={`max-w-[90%] px-8 py-6 rounded-[2.5rem] font-bold shadow-lg leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-emerald-700 text-white rounded-br-none' 
                    : 'bg-slate-50 text-slate-800 rounded-bl-none border border-slate-100'
                }`}>
                  <p className="text-base md:text-lg whitespace-pre-wrap">{m.text}</p>
                  {m.role === 'assistant' && (
                    <button 
                      onClick={() => navigator.clipboard.writeText(m.text)}
                      className="mt-4 text-[10px] uppercase font-black text-slate-400 hover:text-emerald-600 transition-colors flex items-center gap-2"
                    >
                      <i className="fas fa-copy"></i>
                      {lang === 'ar' ? 'نسخ الإجابة' : 'Copy Answer'}
                    </button>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-50 px-8 py-5 rounded-[2rem] flex gap-2 border border-slate-100 items-center">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  <span className="text-xs font-bold text-slate-400 mr-2">{lang === 'ar' ? 'جاري البحث في الكنوز...' : 'Searching treasures...'}</span>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="p-8 bg-slate-50 border-t border-slate-100">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('assistantPrompt')}
                className="w-full bg-white px-10 py-6 rounded-3xl text-slate-800 focus:outline-none font-black text-lg shadow-inner border-2 border-transparent focus:border-emerald-500 transition-all"
              />
              <button 
                type="submit"
                disabled={isLoading || !input.trim()}
                className="absolute left-3 top-3 bottom-3 px-8 bg-emerald-700 text-white rounded-2xl hover:bg-emerald-800 transition-all shadow-xl disabled:opacity-50"
              >
                <i className={`fas ${isLoading ? 'fa-circle-notch fa-spin' : 'fa-paper-plane'}`}></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default GeminiAssistant;
