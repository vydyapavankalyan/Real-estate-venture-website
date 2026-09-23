import React from 'react';
import { EmiRoiCalculator } from '../components/tools/EmiRoiCalculator';
import { SEO } from '../components/common/SEO';
import { SEO_DATA } from '../components/common/SEOConfig';
import { ShieldCheck, Sparkles, Building2, HelpCircle } from 'lucide-react';

export const CalculatorPage = ({ onOpenEnquiry, onOpenSiteVisit }) => {
  return (
    <div className="min-h-screen bg-obsidian-950 py-12 text-slate-100">
      <SEO {...SEO_DATA.calculator} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Breadcrumb / Intro */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-serif uppercase tracking-widest text-gold-400 font-bold">
            Rajan - Castle Properties Advisory Tools
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Financial & Investment Calculator
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Transparently compute your returns in Telangana’s upcoming Fourth City (Mirkhanpet, Maheshwaram, Kadthal) or structure your monthly home loan installments.
          </p>
        </div>

        {/* The Calculator Component */}
        <div className="rounded-3xl border border-gold-500/20 shadow-luxury overflow-hidden bg-obsidian-900/40">
          <EmiRoiCalculator
            onOpenEnquiry={onOpenEnquiry}
            onOpenSiteVisit={onOpenSiteVisit}
          />
        </div>

        {/* Investment FAQ / Notes Section */}
        <div className="p-8 sm:p-10 rounded-3xl bg-obsidian-900 border border-white/10 space-y-6">
          <div className="flex items-center gap-3">
            <HelpCircle className="w-6 h-6 text-gold-400" />
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
              Understanding Hyderabad Land Appreciation Dynamics
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
              <h4 className="font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold-400" />
                Why 22-26% CAGR in Fourth City?
              </h4>
              <p className="text-slate-400 leading-relaxed text-xs">
                Historically, when Hitec City (Cyberabad) and Financial District (Neopolis) received designated government transit and IT corridors, early land investments multiplied 4x to 8x within 5-7 years. The upcoming Fourth City corridor in Mirkhanpet is anchored by ₹5,809 Cr Amazon Data Center and Skill University.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
              <h4 className="font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Bank Loan Affiliations
              </h4>
              <p className="text-slate-400 leading-relaxed text-xs">
                All ventures promoted by Rajan - Castle Properties adhere strictly to 100% clear titles, RERA approvals, and DTCP/HMDA layouts, making them eligible for preferential home loan rates from leading banks such as SBI, HDFC, and ICICI.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
              <h4 className="font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-400" />
                Personalized Financial Plan
              </h4>
              <p className="text-slate-400 leading-relaxed text-xs">
                Need customized financial modeling for corporate land parcels or syndicated NRI plots? Mr. Katla Bhagyarajan and our advisory team offer confidential 1-on-1 portfolio consultations.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
