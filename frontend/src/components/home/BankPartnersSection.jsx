import React from 'react';
import { Building2, Globe, BadgeCheck, Users, TrendingUp, MapPin } from 'lucide-react';

const BANKS = [
  { name: 'SBI Bank', abbr: 'SBI', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
  { name: 'HDFC Bank', abbr: 'HDFC', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
  { name: 'ICICI Bank', abbr: 'ICICI', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
  { name: 'Axis Bank', abbr: 'AXIS', color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
  { name: 'LIC Housing', abbr: 'LIC', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
  { name: 'DHFL Finance', abbr: 'DHFL', color: 'text-sky-400', bg: 'bg-sky-500/10 border-sky-500/20' },
  { name: 'PNB Housing', abbr: 'PNB', color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20' },
  { name: 'Bank of Baroda', abbr: 'BOB', color: 'text-teal-400', bg: 'bg-teal-500/10 border-teal-500/20' },
];

export const BankPartnersSection = () => {
  return (
    <section className="py-16 bg-obsidian-950 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10 space-y-2">
          <span className="text-xs font-serif uppercase tracking-widest text-gold-400 font-bold">
            Verified Financing Partners
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Home Loan Pre-Approval in{' '}
            <span className="text-gold-300">48 Hours</span>
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            Our dedicated finance desk has exclusive tie-ups with 8+ leading banks and NBFCs, ensuring the fastest possible loan disbursals for your Rajan Castle investment.
          </p>
        </div>

        {/* Bank Logos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-10">
          {BANKS.map((bank) => (
            <div
              key={bank.abbr}
              className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border ${bank.bg} transition-all hover:scale-105 cursor-default`}
            >
              <span className={`font-serif font-bold text-xl tracking-tight ${bank.color}`}>
                {bank.abbr}
              </span>
              <span className="text-[9px] text-slate-500 text-center leading-tight font-medium uppercase tracking-wider">
                {bank.name}
              </span>
            </div>
          ))}
        </div>

        {/* Feature Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: BadgeCheck, label: 'Pre-Approval', sub: 'In-principle letter in 48 hrs', color: 'text-gold-400' },
            { icon: TrendingUp, label: 'Up to 80% LTV', sub: 'On property value', color: 'text-emerald-400' },
            { icon: Users, label: 'NRI Loans', sub: 'Dollar & Rupee accounts', color: 'text-sky-400' },
            { icon: Globe, label: 'Doorstep Service', sub: 'Bank exec visits you', color: 'text-purple-400' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3 p-4 rounded-2xl bg-obsidian-900 border border-white/8">
              <div className={`w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center shrink-0 ${item.color}`}>
                <item.icon className="w-4 h-4" />
              </div>
              <div>
                <span className="font-semibold text-white text-sm block">{item.label}</span>
                <span className="text-[10px] text-slate-400">{item.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
