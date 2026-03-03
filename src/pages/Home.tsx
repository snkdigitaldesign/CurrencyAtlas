import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { translations, Language } from '@/lib/i18n';
import { Converter } from '@/components/Converter';
import { TrendingUp, Shield, Zap, ArrowRight } from 'lucide-react';

export const Home: React.FC = () => {
  const location = useLocation();
  const lang: Language = location.pathname.startsWith('/th') ? 'th' : 'en';
  const t = translations[lang];
  const prefix = lang === 'th' ? '/th' : '';

  return (
    <div className="space-y-8">
      <section className="text-center space-y-2 py-8">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          {t.subtitle}
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          {t.seo.description}
        </p>
      </section>

      <section className="max-w-4xl mx-auto">
        <Converter t={t} />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
          <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
            <Zap size={20} />
          </div>
          <h3 className="text-base font-bold">Real-time</h3>
          <p className="text-slate-500 text-sm">Updated every 60 seconds.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3 flex flex-col">
          <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
            <TrendingUp size={20} />
          </div>
          <h3 className="text-base font-bold">Charts</h3>
          <p className="text-slate-500 text-sm flex-grow">30-day historical trends.</p>
          <Link 
            to={`${prefix}/charts`}
            className="inline-flex items-center gap-2 text-emerald-600 font-bold text-sm hover:gap-3 transition-all mt-2"
          >
            {t.nav.charts} <ArrowRight size={14} />
          </Link>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
          <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
            <Shield size={20} />
          </div>
          <h3 className="text-base font-bold">Reliable</h3>
          <p className="text-slate-500 text-sm">Accurate financial data.</p>
        </div>
      </section>
    </div>
  );
};
