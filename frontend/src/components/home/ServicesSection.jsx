import React from 'react';
import { Search, LineChart, Building, Users, TrendingUp, Scale, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ServicesSection = () => {
  const services = [
    {
      icon: Search,
      title: "Property Search",
      description: "Find your ideal residence with our curated portfolio of premium ventures, high-rise towers, and gated villa communities across Hyderabad.",
      tag: "Buyer Service"
    },
    {
      icon: LineChart,
      title: "Market Analysis",
      description: "Get accurate property valuations, price per square foot appreciation metrics, and corridor forecasts across West and South Hyderabad.",
      tag: "Data Driven"
    },
    {
      icon: Building,
      title: "Property Management",
      description: "End-to-end asset management, tenant vetting, and rental yield optimization for high-net-worth investors and NRI homeowners.",
      tag: "Full Cycle"
    },
    {
      icon: Users,
      title: "Buyer Representation",
      description: "Dedicated advisory support throughout your acquisition journey, from initial private site tour to handover and registration.",
      tag: "Personalized"
    },
    {
      icon: TrendingUp,
      title: "Investment Analysis",
      description: "Specialized strategic analysis identifying high-yield corridors influenced by the Regional Ring Road (RRR) and Airport Metro.",
      tag: "Wealth Growth"
    },
    {
      icon: Scale,
      title: "Legal & RERA Due Diligence",
      description: "Independent legal scrutiny of land titles, sanctioned municipal layouts, HMDA approvals, and strict RERA compliance verification.",
      tag: "100% Secure"
    },
  ];

  return (
    <section className="py-24 bg-obsidian-900 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-serif uppercase tracking-widest text-gold-400 font-bold">
            Comprehensive Real Estate Services
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Tailored Real Estate Advisory for Modern Investors
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            From discovering landmark sky mansions to navigating RERA documentation and investment portfolios, our seasoned team guides every step with clarity and precision.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-obsidian-950 border border-white/10 hover:border-gold-500/40 hover:shadow-luxury-hover transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-500/20 to-gold-700/10 border border-gold-500/30 flex items-center justify-center text-gold-400 group-hover:scale-110 group-hover:bg-gold-500 group-hover:text-obsidian-950 transition-all duration-300">
                      <Icon className="w-6 h-6 stroke-[2]" />
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded bg-white/5 border border-white/10 text-slate-300">
                      {service.tag}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-gold-300 transition-colors mb-2.5">
                    {service.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-xs text-gold-400 font-medium group-hover:text-gold-300">
                  <Link to="/services" className="inline-flex items-center gap-1.5 hover:underline">
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
