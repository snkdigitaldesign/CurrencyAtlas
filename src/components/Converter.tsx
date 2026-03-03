import React, { useState, useEffect } from 'react';
import { RefreshCw, ArrowRightLeft } from 'lucide-react';
import { fetchLatestRates, currencies } from '@/lib/api';
import { Translation } from '@/lib/i18n';

interface ConverterProps {
  t: Translation;
}

// Helper to get flag URL
const getFlagUrl = (currencyCode: string) => {
  const countryCode = currencyCode.substring(0, 2).toLowerCase();
  // Special cases
  if (currencyCode === 'EUR') return 'https://flagcdn.com/w80/eu.png';
  if (currencyCode === 'USD') return 'https://flagcdn.com/w80/us.png';
  if (currencyCode === 'GBP') return 'https://flagcdn.com/w80/gb.png';
  if (currencyCode === 'JPY') return 'https://flagcdn.com/w80/jp.png';
  return `https://flagcdn.com/w80/${countryCode}.png`;
};

export const Converter: React.FC<ConverterProps> = ({ t }) => {
  const [amount, setAmount] = useState<number>(1);
  const [from, setFrom] = useState<string>("USD");
  const [to, setTo] = useState<string>("THB");
  const [rates, setRates] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const loadRates = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchLatestRates(from);
      setRates(data.conversion_rates);
      setLastUpdated(new Date(data.time_last_update_utc).toLocaleString());
    } catch (err: any) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRates();
    const interval = setInterval(loadRates, 60000);
    return () => clearInterval(interval);
  }, [from]);

  const result = rates[to] ? (amount * rates[to]).toFixed(2) : "0.00";

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-200">
      <div className="flex flex-col gap-4">
        <div className="w-full">
          <input
            type="number"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-black text-2xl text-center"
            placeholder="0.00"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-7 gap-3 items-center">
          <div className="md:col-span-3">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <img 
                  src={getFlagUrl(from)} 
                  alt={from} 
                  className="w-7 h-5 object-cover rounded-sm border border-slate-200"
                  referrerPolicy="no-referrer"
                />
              </div>
              <select
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full p-4 pl-14 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-black appearance-none text-slate-900 text-lg"
              >
                {currencies.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-center md:col-span-1">
            <button
              onClick={handleSwap}
              className="p-3 rounded-full bg-emerald-50 text-emerald-600 active:scale-90 transition-all border border-emerald-100"
            >
              <ArrowRightLeft size={20} className="rotate-90 md:rotate-0" />
            </button>
          </div>

          <div className="md:col-span-3">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <img 
                  src={getFlagUrl(to)} 
                  alt={to} 
                  className="w-7 h-5 object-cover rounded-sm border border-slate-200"
                  referrerPolicy="no-referrer"
                />
              </div>
              <select
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full p-4 pl-14 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-black appearance-none text-slate-900 text-lg"
              >
                {currencies.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-6 bg-emerald-50 rounded-2xl border border-emerald-100 shadow-inner text-center">
        {error ? (
          <p className="text-red-500 font-bold">{error}</p>
        ) : (
          <div className="space-y-1">
            <p className="text-xs font-black text-emerald-600 uppercase tracking-widest">
              {amount} {from}
            </p>
            <h2 className="text-4xl font-black text-slate-900">
              {result} <span className="text-xl font-bold text-slate-400">{to}</span>
            </h2>
            <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-slate-300 uppercase tracking-tighter mt-4">
              <RefreshCw size={10} className={loading ? "animate-spin" : ""} />
              {t.converter.lastUpdated} {lastUpdated}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
