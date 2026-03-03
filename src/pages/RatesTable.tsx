import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { translations, Language } from '@/lib/i18n';
import { fetchLatestRates, currencies } from '@/lib/api';
import { Search, ArrowUpDown, Info } from 'lucide-react';

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

// Simulated denominations for major currencies
const denominations: Record<string, string[]> = {
  'USD': ['100', '50', '20 - 10', '5', '2 - 1'],
  'EUR': ['500 - 100', '50 - 5'],
  'GBP': ['50', '20 - 5'],
  'JPY': ['10000', '5000', '1000'],
};

export const RatesTable: React.FC = () => {
  const location = useLocation();
  const lang: Language = location.pathname.startsWith('/th') ? 'th' : 'en';
  const t = translations[lang];

  const [base, setBase] = useState("USD");
  const [rates, setRates] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadRates = async () => {
      setLoading(true);
      try {
        // For SuperRich style, we usually want to see how much THB we get for other currencies
        // So we fetch rates with THB as base to get the relative values, 
        // or fetch with the currency as base and see the THB value.
        // Let's stick to the user's selected base for flexibility.
        const data = await fetchLatestRates(base);
        setRates(data.conversion_rates);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadRates();
  }, [base]);

  const filteredCurrencies = Object.entries(rates)
    .filter(([code]) => code.toLowerCase().includes(search.toLowerCase()))
    .filter(([code]) => code !== base); // Don't show the base currency itself

  return (
    <div className="space-y-4 pb-8">
      <section className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder={t.table.search}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            />
          </div>
          <select
            value={base}
            onChange={(e) => setBase(e.target.value)}
            className="w-full sm:w-auto p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none font-bold text-slate-700 shadow-sm"
          >
            {currencies.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </section>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-md">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200">
                <th className="px-1.5 sm:px-4 md:px-6 py-2 md:py-4 text-[9px] md:text-xs font-bold text-slate-600 uppercase tracking-wider">
                  {t.table.currency}
                </th>
                <th className="px-1.5 sm:px-4 md:px-6 py-2 md:py-4 text-[9px] md:text-xs font-bold text-slate-600 uppercase tracking-wider text-center">
                  {t.table.unit}
                </th>
                <th className="px-1.5 sm:px-4 md:px-6 py-2 md:py-4 text-[9px] md:text-xs font-bold text-emerald-700 uppercase tracking-wider text-right">
                  {t.table.buy}
                </th>
                <th className="px-1.5 sm:px-4 md:px-6 py-2 md:py-4 text-[9px] md:text-xs font-bold text-slate-600 uppercase tracking-wider text-right">
                  {t.table.sell}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-20 text-center">
                    <div className="inline-block w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                    <p className="mt-4 text-slate-400 font-medium animate-pulse">Loading market data...</p>
                  </td>
                </tr>
              ) : filteredCurrencies.length > 0 ? (
                filteredCurrencies.map(([code, midRate]) => {
                  const rateValue = midRate as number;
                  // Simulate buying and selling rates with a small spread
                  const buyRate = rateValue * 0.9985;
                  const sellRate = rateValue * 1.0015;
                  const currencyDenoms = denominations[code] || ['1'];

                  return (
                    <React.Fragment key={code}>
                      {currencyDenoms.map((denom, idx) => (
                        <tr key={`${code}-${denom}`} className="active:bg-slate-50 transition-colors group">
                          {idx === 0 && (
                            <td className="px-1.5 sm:px-4 md:px-6 py-2 md:py-4 align-top" rowSpan={currencyDenoms.length}>
                              <div className="flex items-center gap-1.5 md:gap-4">
                                <img 
                                  src={getFlagUrl(code)} 
                                  alt={code} 
                                  className="w-5 h-3.5 sm:w-10 sm:h-7 object-cover rounded-sm shadow-sm border border-slate-200 shrink-0"
                                  referrerPolicy="no-referrer"
                                />
                                <div>
                                  <div className="font-black text-slate-900 text-[11px] sm:text-base md:text-lg leading-tight">{code}</div>
                                  <div className="hidden sm:block text-[10px] text-slate-400 font-medium mt-1 uppercase">
                                    {lang === 'th' ? 'เรียลไทม์' : 'Real-time'}
                                  </div>
                                </div>
                              </div>
                            </td>
                          )}
                          <td className="px-1.5 sm:px-4 md:px-6 py-2 md:py-4 text-center font-bold text-slate-500 text-xs sm:text-lg md:text-xl">
                            {denom}
                          </td>
                          <td className="px-1.5 sm:px-4 md:px-6 py-2 md:py-4 text-right">
                            <span className="text-[13px] sm:text-xl md:text-2xl font-black text-emerald-600 tracking-tight">
                              {(buyRate * (denom.includes('-') ? 1 : 1)).toFixed(2)}
                            </span>
                          </td>
                          <td className="px-1.5 sm:px-4 md:px-6 py-2 md:py-4 text-right">
                            <span className="text-[13px] sm:text-xl md:text-2xl font-black text-slate-700 tracking-tight">
                              {(sellRate * (denom.includes('-') ? 1 : 1)).toFixed(2)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-20 text-center text-slate-400 italic">
                    No matching currencies found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
};
