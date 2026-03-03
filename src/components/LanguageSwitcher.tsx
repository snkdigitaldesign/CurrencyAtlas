import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { Language } from '@/lib/i18n';

export const LanguageSwitcher: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const currentLang = location.pathname.startsWith('/th') ? 'th' : 'en';

  const toggleLanguage = (lang: Language) => {
    if (lang === currentLang) return;
    
    let newPath = location.pathname;
    if (lang === 'th') {
      newPath = `/th${newPath === '/' ? '' : newPath}`;
    } else {
      newPath = newPath.replace(/^\/th/, '') || '/';
    }
    navigate(newPath);
  };

  return (
    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-full">
      <button
        onClick={() => toggleLanguage('en')}
        className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
          currentLang === 'en' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => toggleLanguage('th')}
        className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
          currentLang === 'th' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
        }`}
      >
        TH
      </button>
    </div>
  );
};
