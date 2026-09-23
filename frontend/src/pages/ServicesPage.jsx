import React from 'react';
import { Search, LineChart, Building, Users, TrendingUp, Scale, CheckCircle2, Phone } from 'lucide-react';

export const ServicesPage = ({ onOpenEnquiry, onOpenSiteVisit }) => {
  const serviceList = [
    {
      icon: Search,
      title: "Property Search & VIP Curation",
      desc: "Find your ideal luxury residence with our advanced search tools and expert guidance. We curate off-market penthouses, high-floor corner units, and signature villas across Hyderabad's top corridors."
    },
    {
      icon: LineChart,
      title: "Market Valuation & Comparative Analysis",
      desc: "Receive rigorous, data-backed property valuations and growth trajectory reports. We evaluate historical per-sq.ft. trends across Kokapet, Neopolis, and Tellapur so you make confident investment choices."
    },
    {
      icon: Building,
      title: "Comprehensive Asset & Property Management",
      desc: "Tailored for NRI investors and enterprise leaders. We manage complete tenant sourcing, rental collection, periodic maintenance inspections, and asset upkeep."
    },
    {
      icon: Users,
      title: "Exclusive Buyer Representation",
      desc: "Our senior advisors exclusively champion your interests. We secure optimal developer terms, flexible payment milestone schedules, and priority unit allocations."
    },
    {
      icon: TrendingUp,
      title: "Strategic Investment Advisory",
      desc: "Maximize capital appreciation and cash-flow yield through micro-market intelligence tied to the Regional Ring Road (RRR) and Airport Express Metro Line."
    },
    {
      icon: Scale,
      title: "Legal Diligence & RERA Compliance",
      desc: "Independent legal verification covering HMDA land approvals, link documents, encumbrance certificates (EC), and strict Telangana RERA escrow verification."
    }
  ];

  return (
    <div className="min-h-screen bg-obsidian-950 py-16 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-serif uppercase tracking-widest text-gold-400 font-bold">
            Real Estate Services
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            End-to-End Real Estate Excellence
          </h1>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-light">
            Whether you are buying your dream sky mansion, expanding a commercial portfolio, or seeking seamless property management, Aurum Hyderabad offers bespoke concierge services tailored to your objectives.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceList.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-obsidian-900 border border-white/10 hover:border-gold-500/40 shadow-luxury hover:shadow-luxury-hover transition-all duration-300 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
                    <Icon className="w-7 h-7 stroke-[1.8]" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-white">{s.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <button
                    onClick={() => onOpenEnquiry({ message: `Inquiring about ${s.title} service` })}
                    className="text-xs font-semibold text-gold-400 hover:text-gold-300 inline-flex items-center gap-1"
                  >
                    <span>Request Service Consultation</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Advisory CTA Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-obsidian-900 to-obsidian-950 border border-gold-500/30 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">Speak with an Aurum Investment Director</h3>
            <p className="text-xs text-slate-400 max-w-xl">
              Get confidential advice on your real estate portfolio, upcoming pre-launch allocations, or bespoke home purchases.
            </p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => onOpenEnquiry()}
              className="px-6 py-3 rounded-xl bg-gold-500 text-obsidian-950 font-bold text-xs uppercase tracking-wider shadow-luxury hover:bg-gold-400 transition-all"
            >
              Request Advisory Call
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
