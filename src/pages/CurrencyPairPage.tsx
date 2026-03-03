import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { translations, Language } from '@/lib/i18n';
import { fetchPairRate, getHistoricalData } from '@/lib/api';
import { ExchangeChart } from '@/components/ExchangeChart';
import { ArrowRight } from 'lucide-react';

export const CurrencyPairPage: React.FC = () => {
  const { pair } = useParams<{ pair: string }>();
  const location = useLocation();
  const lang: Language = location.pathname.startsWith('/th') ? 'th' : 'en';
  const t = translations[lang];

  const [base, target] = (pair || "usd-to-thb").split("-to-").map(s => s.toUpperCase());
  const [rate, setRate] = useState<number | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchPairRate(base, target);
        setRate(data.conversion_rate);
        setHistory(getHistoricalData(base, target, data.conversion_rate));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [base, target]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 text-[10px] text-emerald-600 font-black uppercase tracking-widest mb-2">
          {base} <ArrowRight size={12} /> {target}
        </div>
        <h1 className="text-3xl font-black text-slate-900">
          1 {base} = {rate?.toFixed(4)} {target}
        </h1>
      </section>

      <ExchangeChart data={history} base={base} target={target} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h4 className="font-black text-slate-900 mb-4 uppercase text-[10px] tracking-widest">Popular Pairs</h4>
          <div className="space-y-2">
            {['USD-to-EUR', 'EUR-to-USD', 'GBP-to-USD', 'USD-to-JPY', 'USD-to-THB'].map(p => (
              <a 
                key={p} 
                href={`/${p.toLowerCase()}`}
                className="flex justify-between items-center p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all group"
              >
                <span className="text-sm font-bold text-slate-700">{p.replace('-to-', ' / ')}</span>
                <ArrowRight size={14} className="text-slate-300 group-hover:text-emerald-600 transition-colors" />
              </a>
            ))}
          </div>
        </div>

        <div className="bg-emerald-600 p-6 rounded-2xl text-white flex flex-col justify-center">
          <h4 className="font-black uppercase text-[10px] tracking-widest mb-2">Support</h4>
          <p className="text-sm text-emerald-100 mb-4">Need help with conversions? Our team is available 24/7.</p>
          <button className="w-full py-3 bg-white text-emerald-600 font-bold rounded-xl hover:bg-emerald-50 transition-colors">
            Contact
          </button>
        </div>
      </div>
    </div>
  );
};
