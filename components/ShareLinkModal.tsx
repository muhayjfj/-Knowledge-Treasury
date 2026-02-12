
import React, { useState, useEffect } from 'react';

// External declaration for confetti library
declare var confetti: any;

interface ShareLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: string;
  t: (key: string) => string;
}

const ShareLinkModal: React.FC<ShareLinkModalProps> = ({ isOpen, onClose, lang, t }) => {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    // Detect the best URL to share
    const currentUrl = window.location.origin + window.location.pathname;
    if (currentUrl.includes('localhost') || currentUrl.includes('127.0.0.1') || currentUrl.startsWith('about')) {
      // If local, provide the global domain as default
      setShareUrl('https://knowledge-treasury.com');
    } else {
      setShareUrl(currentUrl);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    
    if (typeof confetti !== 'undefined') {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#059669', '#d4af37']
      });
    }
  };

  const shareText = lang === 'ar' 
    ? "انضم إلي في 'كنز المعرفة'، المنصة العالمية للعلوم الشرعية الموثوقة 📚:" 
    : "Join me in 'Knowledge Treasury', the global hub for authentic Islamic science 📚:";

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`;
  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden animate-slideUp">
        <div className="bg-emerald-600 p-8 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
          <i className="fas fa-paper-plane text-5xl mb-4 animate-bounce"></i>
          <h2 className="text-3xl font-black mb-2">{t('inviteFriends')}</h2>
          <p className="text-emerald-100/80 font-medium">انسخ الرابط وأرسله لأصدقائك الآن</p>
        </div>

        <div className="p-10 space-y-8">
          <div className="space-y-4">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 px-2">
              {lang === 'ar' ? 'تأكد من الرابط قبل النسخ' : 'Confirm link before copying'}
            </label>
            <div className="flex flex-col gap-3">
              <input 
                type="text"
                value={shareUrl}
                onChange={(e) => setShareUrl(e.target.value)}
                className="w-full bg-slate-50 p-4 rounded-2xl border border-slate-200 text-slate-700 font-bold text-sm focus:ring-2 ring-emerald-500 outline-none"
                placeholder="https://..."
              />
              <button 
                onClick={handleCopy}
                className={`w-full py-5 rounded-2xl font-black text-lg transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3 ${
                  copied ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white hover:bg-black'
                }`}
              >
                <i className={`fas ${copied ? 'fa-check' : 'fa-copy'}`}></i>
                {copied ? (lang === 'ar' ? 'تم نسخ الرابط!' : 'Copied!') : t('copyLinkBtn')}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <a 
              href={whatsappUrl} 
              target="_blank" 
              className="flex flex-col items-center justify-center p-6 bg-emerald-50 rounded-3xl border border-emerald-100 hover:bg-emerald-600 hover:text-white transition-all group"
            >
              <i className="fab fa-whatsapp text-3xl mb-3 text-emerald-600 group-hover:text-white transition-colors"></i>
              <span className="font-black text-xs">{t('shareViaWhatsApp')}</span>
            </a>
            <a 
              href={telegramUrl} 
              target="_blank" 
              className="flex flex-col items-center justify-center p-6 bg-sky-50 rounded-3xl border border-sky-100 hover:bg-sky-600 hover:text-white transition-all group"
            >
              <i className="fab fa-telegram-plane text-3xl mb-3 text-sky-600 group-hover:text-white transition-colors"></i>
              <span className="font-black text-xs">{t('shareViaTelegram')}</span>
            </a>
          </div>

          <button 
            onClick={onClose}
            className="w-full py-4 text-slate-400 font-bold text-sm hover:text-emerald-600 transition-colors"
          >
            {lang === 'ar' ? 'إغلاق اللوحة' : 'Close Panel'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareLinkModal;
