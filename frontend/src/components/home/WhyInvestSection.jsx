import React from 'react';
import { TrendingUp, Plane, Network, ShieldCheck, Award, Building2 } from 'lucide-react';

export const WhyInvestSection = () => {
  const pillars = [
    {
      icon: TrendingUp,
      title: "Fastest-Growing GCC Capital",
      desc: "Home to Google, Microsoft, Apple, Amazon, and over 1,500 Global Capability Centers driving sustained demand for luxury housing."
    },
    {
      icon: Network,
      title: "World-Class Infrastructure",
      desc: "158 km Outer Ring Road expressway, 340 km Regional Ring Road, and multi-tier elevated corridors ensuring unhindered city mobility."
    },
    {
      icon: Plane,
      title: "Aerotropolis Connectivity",
      desc: "Rajiv Gandhi International Airport connects to 70+ global destinations, with upcoming Airport Express Metro cutting travel to under 22 mins."
    },
    {
      icon: Building2,
      title: "Neopolis & Golden Mile",
      desc: "India's highest commercial skyscraper zoning with underground utilities and master-planned arterial avenues in Kokapet."
    },
    {
      icon: Award,
      title: "#1 Liveable Metro in India",
      desc: "Consistently ranked as Mercer's Best City to Live in India for over 5 consecutive years due to green cover, cosmopolitan safety, and medical infrastructure."
    },
    {
      icon: ShieldCheck,
      title: "Transparent RERA Governance",
      desc: "Telangana RERA and streamlined municipal approvals guarantee clear titles and accountable construction milestones."
    }
  ];

  return (
    <section className="py-24 bg-obsidian-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <span className="text-xs font-serif uppercase tracking-widest text-gold-400 font-bold">
            The Hyderabad Advantage
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Why Hyderabad Commands India's Most Resilient Real Estate Growth
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Backed by massive foreign direct investment, state-of-the-art ring roads, and tech leadership, Hyderabad offers investors unparalleled capital appreciation and rental yield security.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={index}
                className="p-7 rounded-2xl bg-obsidian-900 border border-white/10 hover:border-gold-500/40 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 mb-5 group-hover:scale-110 group-hover:bg-gold-500 group-hover:text-obsidian-950 transition-all">
                  <Icon className="w-6 h-6 stroke-[2]" />
                </div>
                <h3 className="font-serif text-xl font-bold text-white mb-2 group-hover:text-gold-300 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
