import React from 'react';
import { Building2, Award, Users, ShieldCheck, HeartHandshake, Leaf, CheckCircle2 } from 'lucide-react';
import { ValuesSection } from '../components/home/ValuesSection';
import { SEO } from '../components/common/SEO';
import { SEO_DATA } from '../components/common/SEOConfig';

export const AboutPage = ({ onOpenEnquiry }) => {
  return (
    <div className="min-h-screen bg-obsidian-950 py-16 text-slate-100 space-y-20">
      <SEO {...SEO_DATA.about} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-serif uppercase tracking-widest text-gold-400 font-bold">
              Our Legacy & Purpose
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Shaping Hyderabad's Real Estate Landscape for Over 15 Years
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed font-light">
              With over 15 years of distinguished experience in Telangana's evolving real estate landscape, Rajan - Castle Properties has established itself as an authoritative partner for discerning homebuyers, NRIs, and forward-looking investors.
            </p>
            <p className="text-sm text-slate-400 leading-relaxed font-light">
              Our founder, Mr. Katla Bhagyarajan, brings over 16 years of hands-on private sector expertise and an authentic middle-class perspective. We take pride in transparent relationships, zero speculative promises, and delivering simpler, smaller, and smarter investment opportunities in high-growth corridors like Fourth City Mirkhanpet, Maheshwaram, and Kadthal.
            </p>

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => onOpenEnquiry()}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian-950 font-bold text-xs uppercase tracking-wider shadow-luxury hover:from-gold-400 hover:to-gold-500 transition-all"
              >
                Schedule Private Consultation
              </button>
            </div>
          </div>

          {/* Image & Stats Card */}
          <div className="relative rounded-3xl overflow-hidden border border-gold-500/30 shadow-2xl bg-obsidian-900 group">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
              alt="Rajan Castle Properties Headquarters"
              className="w-full h-[450px] object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/40 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 rounded-xl bg-obsidian-900/90 border border-white/10 backdrop-blur-md">
                <span className="font-serif text-2xl font-bold text-gold-300 block">500+</span>
                <span className="text-[10px] text-slate-300">Properties Sold</span>
              </div>
              <div className="p-3 rounded-xl bg-obsidian-900/90 border border-white/10 backdrop-blur-md">
                <span className="font-serif text-2xl font-bold text-gold-300 block">1000+</span>
                <span className="text-[10px] text-slate-300">Happy Clients</span>
              </div>
              <div className="p-3 rounded-xl bg-obsidian-900/90 border border-white/10 backdrop-blur-md">
                <span className="font-serif text-2xl font-bold text-gold-300 block">15+</span>
                <span className="text-[10px] text-slate-300">Years Exp</span>
              </div>
              <div className="p-3 rounded-xl bg-obsidian-900/90 border border-white/10 backdrop-blur-md">
                <span className="font-serif text-2xl font-bold text-gold-300 block">4.9</span>
                <span className="text-[10px] text-slate-300">Client Rating</span>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values Section */}
        <ValuesSection />

        {/* Leadership Profile */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-serif uppercase tracking-widest text-gold-400 font-bold">
              Leadership
            </span>
            <h2 className="font-serif text-3xl font-bold text-white">
              Guiding Principles of Our Leadership
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-obsidian-900 border border-gold-500/30 text-center space-y-4">
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-2 border-gold-400/80 shadow-luxury">
                <img
                  src="https://www.rajan-castle-properties.net/lovable-uploads/19fd2692-690a-4751-ab6b-2edd4890fbae.png"
                  alt="Mr. Katla Bhagyarajan"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80';
                  }}
                />
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-white">Mr. Katla Bhagyarajan</h4>
                <span className="text-xs text-gold-400 font-medium">Founder & Managing Director</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                16+ years of private sector experience. Dedicated to empowering investors and families with high-growth land assets in Telangana's Fourth City.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-obsidian-900 border border-white/10 text-center space-y-4">
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-2 border-gold-400/50">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
                  alt="Senior Land Acquisition Advisor"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-white">Strategic Land Team</h4>
                <span className="text-xs text-gold-400 font-medium">Corridor Acquisition & Master Planning</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Specialists in government master plans, 200ft/330ft arterial road connectivity, and HMDA/DTCP layout clearances across South Hyderabad.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-obsidian-900 border border-white/10 text-center space-y-4">
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-2 border-gold-400/50">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
                  alt="Legal & Compliance Officer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-white">Legal Due Diligence</h4>
                <span className="text-xs text-gold-400 font-medium">Clear Title & RERA Verification</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Rigorous 30-year link document verification, encumbrance verification, and complete compliance protection for every investor.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
