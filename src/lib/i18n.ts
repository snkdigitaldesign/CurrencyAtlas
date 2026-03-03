export type Language = 'en' | 'th';

export interface Translation {
  title: string;
  subtitle: string;
  converter: {
    amount: string;
    from: string;
    to: string;
    convert: string;
    result: string;
    lastUpdated: string;
  };
  nav: {
    home: string;
    about: string;
    privacy: string;
    contact: string;
    rates: string;
    charts: string;
  };
  table: {
    title: string;
    currency: string;
    unit: string;
    buy: string;
    sell: string;
    search: string;
  };
  seo: {
    description: string;
  };
}

export const translations: Record<Language, Translation> = {
  en: {
    title: "CurrencyAtlas",
    subtitle: "Exchange Rates",
    converter: {
      amount: "Amount",
      from: "From",
      to: "To",
      convert: "Convert",
      result: "Result",
      lastUpdated: "Updated",
    },
    nav: {
      home: "Home",
      about: "About",
      privacy: "Privacy",
      contact: "Contact",
      rates: "Rates",
      charts: "Charts",
    },
    table: {
      title: "Rates",
      currency: "Currency",
      unit: "Unit",
      buy: "Buy",
      sell: "Sell",
      search: "Search...",
    },
    seo: {
      description: "Real-time exchange rates.",
    },
  },
  th: {
    title: "CurrencyAtlas",
    subtitle: "อัตราแลกเปลี่ยน",
    converter: {
      amount: "จำนวนเงิน",
      from: "จาก",
      to: "ถึง",
      convert: "แปลงค่า",
      result: "ผลลัพธ์",
      lastUpdated: "อัปเดต",
    },
    nav: {
      home: "หน้าแรก",
      about: "เกี่ยวกับเรา",
      privacy: "นโยบาย",
      contact: "ติดต่อ",
      rates: "ตารางเรท",
      charts: "กราฟ",
    },
    table: {
      title: "ตารางอัตราแลกเปลี่ยน",
      currency: "สกุลเงิน",
      unit: "หน่วย",
      buy: "ซื้อ",
      sell: "ขาย",
      search: "ค้นหา...",
    },
    seo: {
      description: "อัตราแลกเปลี่ยนแบบเรียลไทม์",
    },
  },
};
