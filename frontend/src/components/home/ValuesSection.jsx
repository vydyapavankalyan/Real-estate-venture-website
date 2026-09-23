import React from 'react';
import { HeartHandshake, Leaf, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const ValuesSection = () => {
  const values = [
    {
      icon: HeartHandshake,
      title: "People First",
      tagline: "Uncompromising Client Focus",
      description: "We prioritize our clients' needs, family lifestyles, and long-term financial dreams above all else, ensuring every recommendation is made with genuine care and dedication."
    },
    {
      icon: Leaf,
      title: "Sustainable Living",
      tagline: "Future-Ready Communities",
      description: "We promote environmentally responsible developments, rainwater harvesting, solar micro-grids, EV mobility hubs, and IGBC Gold/Platinum green-certified buildings."
    },
    {
      icon: ShieldCheck,
      title: "Unwavering Trust",
      tagline: "Radical RERA Transparency",
      description: "We build enduring relationships anchored in absolute transparency. Direct developer pricing, clear title verification, and zero hidden speculation."
    }
  ];

  return (
    <section className="py-20 bg-obsidian-950 border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-serif uppercase tracking-widest text-gold-400 font-bold">
            The Aurum Foundation
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Core Values That Anchor Our Hyderabad Legacy
          </h2>
          <p className="text-sm text-slate-400">
            Guiding high-net-worth families, enterprise leaders, and overseas Indians with integrity for over 15 years.
          </p>
        </div>

        {/* 3 Values Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div
                key={i}
                className="p-8 rounded-2xl bg-obsidian-900 border border-white/10 hover:border-gold-500/40 shadow-luxury hover:shadow-luxury-hover transition-all duration-300 relative group"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-500/20 to-gold-600/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-6 group-hover:scale-105 group-hover:bg-gold-500 group-hover:text-obsidian-950 transition-all">
                  <Icon className="w-7 h-7 stroke-[1.8]" />
                </div>

                <span className="text-[11px] font-serif uppercase tracking-wider text-gold-400 font-semibold block mb-1">
                  {v.tagline}
                </span>

                <h3 className="font-serif text-2xl font-bold text-white mb-3">
                  {v.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {v.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
