import React from 'react';

export const About: React.FC = () => (
  <div className="max-w-3xl mx-auto py-12 space-y-8">
    <h1 className="text-4xl font-extrabold text-slate-900">About CurrencyAtlas</h1>
    <div className="prose prose-slate prose-lg max-w-none text-slate-600">
      <p>
        CurrencyAtlas provides real-time currency exchange rates and financial data. 
        Our mission is to provide accurate and reliable financial information.
      </p>
    </div>
  </div>
);

export const PrivacyPolicy: React.FC = () => (
  <div className="max-w-3xl mx-auto py-12 space-y-8">
    <h1 className="text-4xl font-extrabold text-slate-900">Privacy Policy</h1>
    <div className="prose prose-slate prose-lg max-w-none text-slate-600">
      <p>
        At CurrencyAtlas, we take your privacy seriously. We do not collect personal information 
        unless you voluntarily provide it to us.
      </p>
    </div>
  </div>
);

export const Contact: React.FC = () => (
  <div className="max-w-3xl mx-auto py-12 space-y-8">
    <h1 className="text-4xl font-extrabold text-slate-900 text-center">Contact</h1>
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Name</label>
            <input type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500" />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Email</label>
            <input type="email" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500" />
          </div>
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Message</label>
          <textarea rows={4} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"></textarea>
        </div>
        <button className="w-full py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors">
          Send
        </button>
      </form>
    </div>
  </div>
);
