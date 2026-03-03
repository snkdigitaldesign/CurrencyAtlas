export interface ExchangeRateResponse {
  result: string;
  base_code: string;
  conversion_rates: Record<string, number>;
  time_last_update_utc: string;
}

export interface PairResponse {
  result: string;
  base_code: string;
  target_code: string;
  conversion_rate: number;
  time_last_update_utc: string;
}

const apiKey = process.env.NEXT_PUBLIC_EXCHANGE_API_KEY;

export const fetchLatestRates = async (base: string): Promise<ExchangeRateResponse> => {
  if (!apiKey || apiKey === "MY_EXCHANGE_API_KEY" || apiKey === "") {
    throw new Error("API key not configured. Please set NEXT_PUBLIC_EXCHANGE_API_KEY.");
  }

  const res = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${base}`);
  const data = await res.json();
  
  if (data.result === "error") {
    throw new Error(data["error-type"] || "Failed to fetch rates");
  }
  
  return data;
};

export const fetchPairRate = async (base: string, target: string): Promise<PairResponse> => {
  if (!apiKey || apiKey === "MY_EXCHANGE_API_KEY" || apiKey === "") {
    throw new Error("API key not configured.");
  }

  const res = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${base}/${target}`);
  const data = await res.json();

  if (data.result === "error") {
    throw new Error(data["error-type"] || "Failed to fetch pair rate");
  }

  return data;
};

// Simulated historical data for Recharts since free tier API is limited
export const getHistoricalData = (base: string, target: string, baseRate: number) => {
  const data = [];
  const now = new Date();
  for (let i = 30; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    // Add some random fluctuation around the base rate
    const fluctuation = (Math.random() - 0.5) * 0.05 * baseRate;
    data.push({
      date: date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      rate: Number((baseRate + fluctuation).toFixed(4)),
    });
  }
  return data;
};

export const currencies = [
  "USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "HKD", "NZD", "SEK", "KRW", "SGD", "NOK", "MXN", "INR", "RUB", "ZAR", "TRY", "BRL", "TWD", "DKK", "PLN", "THB", "IDR", "HUF", "CZK", "ILS", "CLP", "PHP", "AED", "COP", "SAR", "MYR", "RON"
];
