import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { translations, Language } from '../lib/i18n';
import { currencies, fetchPairRate, getHistoricalData } from '../lib/api';
import { ExchangeChart } from '../components/ExchangeChart';
import { ArrowRightLeft, TrendingUp, Loader2 } from 'lucide-react';

export const Charts: React.FC = () => {
  const location = useLocation();
  const lang: Language = location.pathname.startsWith('/th') ? 'th' : 'en';
  const t = translations[lang];

  const [base, setBase] = useState('USD');
  const [target, setTarget] = useState('THB');
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const loadChartData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchPairRate(base, target);
      const data = getHistoricalData(base, target, response.conversion_rate);
      setChartData(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load chart data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadChartData();
  }, [base, target]);

  const handleSwap = () => {
    setBase(target);
    setTarget(base);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 md:py-8">
      <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] items-center gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.converter.from}</label>
            <select
              value={base}
              onChange={(e) => setBase(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all appearance-none cursor-pointer font-bold"
            >
              {currencies.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleSwap}
            className="p-3 md:mt-5 bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-600 rounded-xl transition-colors self-center"
          >
            <ArrowRightLeft className="w-5 h-5" />
          </button>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.converter.to}</label>
            <select
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all appearance-none cursor-pointer font-bold"
            >
              {currencies.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-200">
          <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
        </div>
      ) : error ? (
        <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-center text-sm">
          {error}
        </div>
      ) : (
        <div className="space-y-4">
          <ExchangeChart data={chartData} base={base} target={target} />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Current</p>
              <p className="text-sm font-black text-slate-900">
                1 {base} = {chartData[chartData.length - 1]?.rate}
              </p>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">High</p>
              <p className="text-sm font-black text-emerald-600">
                {Math.max(...chartData.map(d => d.rate)).toFixed(4)}
              </p>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Low</p>
              <p className="text-sm font-black text-red-600">
                {Math.min(...chartData.map(d => d.rate)).toFixed(4)}
              </p>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Avg</p>
              <p className="text-sm font-black text-slate-900">
                {(chartData.reduce((acc, d) => acc + d.rate, 0) / chartData.length).toFixed(4)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
