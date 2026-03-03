import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { translations, Language } from '@/lib/i18n';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Logo } from './Logo';
import { Home, Table, Info, Mail, BarChart3 } from 'lucide-react';

export const Layout: React.FC = () => {
  const location = useLocation();
  const lang: Language = location.pathname.startsWith('/th') ? 'th' : 'en';
  const t = translations[lang];

  const prefix = lang === 'th' ? '/th' : '';
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    const fullPath = prefix + path;
    if (path === '' || path === '/') {
      return currentPath === (prefix || '/') || currentPath === prefix;
    }
    return currentPath.includes(fullPath);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20 md:pb-0">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm md:shadow-none">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to={prefix || '/'} className="flex items-center gap-2 text-emerald-600">
            <Logo size={36} />
            <span className="font-bold text-xl tracking-tight text-slate-900">{t.title}</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
            <Link to={prefix || '/'} className={`transition-colors ${isActive('/') ? 'text-emerald-600' : 'hover:text-emerald-600'}`}>{t.nav.home}</Link>
            <Link to={`${prefix}/rates`} className={`transition-colors ${isActive('/rates') ? 'text-emerald-600' : 'hover:text-emerald-600'}`}>{t.nav.rates}</Link>
            <Link to={`${prefix}/charts`} className={`transition-colors ${isActive('/charts') ? 'text-emerald-600' : 'hover:text-emerald-600'}`}>{t.nav.charts}</Link>
            <Link to={`${prefix}/about`} className={`transition-colors ${isActive('/about') ? 'text-emerald-600' : 'hover:text-emerald-600'}`}>{t.nav.about}</Link>
            <Link to={`${prefix}/contact`} className={`transition-colors ${isActive('/contact') ? 'text-emerald-600' : 'hover:text-emerald-600'}`}>{t.nav.contact}</Link>
          </nav>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        <Outlet />
      </main>

      {/* Bottom Navigation for Mobile (Android Style) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 h-16 flex items-center justify-around z-50 px-2 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <Link to={prefix || '/'} className={`flex flex-col items-center gap-1 transition-colors ${isActive('/') ? 'text-emerald-600' : 'text-slate-400'}`}>
          <Home size={22} strokeWidth={isActive('/') ? 2.5 : 2} />
          <span className="text-[10px] font-bold uppercase tracking-tighter">{t.nav.home}</span>
        </Link>
        <Link to={`${prefix}/rates`} className={`flex flex-col items-center gap-1 transition-colors ${isActive('/rates') ? 'text-emerald-600' : 'text-slate-400'}`}>
          <Table size={22} strokeWidth={isActive('/rates') ? 2.5 : 2} />
          <span className="text-[10px] font-bold uppercase tracking-tighter">{t.nav.rates}</span>
        </Link>
        <Link to={`${prefix}/charts`} className={`flex flex-col items-center gap-1 transition-colors ${isActive('/charts') ? 'text-emerald-600' : 'text-slate-400'}`}>
          <BarChart3 size={22} strokeWidth={isActive('/charts') ? 2.5 : 2} />
          <span className="text-[10px] font-bold uppercase tracking-tighter">{t.nav.charts}</span>
        </Link>
      </nav>

      <footer className="hidden md:block bg-white border-t border-slate-200 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Link to={prefix || '/'} className="flex items-center gap-2 text-emerald-600">
              <Logo size={24} />
              <span className="font-bold text-lg tracking-tight text-slate-900">{t.title}</span>
            </Link>
            <div className="flex gap-6 text-sm text-slate-400">
              <Link to={`${prefix}/privacy-policy`} className="hover:text-emerald-600">{t.nav.privacy}</Link>
              <Link to={`${prefix}/contact`} className="hover:text-emerald-600">{t.nav.contact}</Link>
            </div>
          </div>
          <div className="mt-8 text-center text-[10px] text-slate-300 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} {t.title}
          </div>
        </div>
      </footer>
    </div>
  );
};
