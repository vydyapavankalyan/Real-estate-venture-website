import React from 'react';
import { Phone, Mail, MapPin, Award, CheckCircle2, TrendingUp, Sparkles, Building2, ArrowRight } from 'lucide-react';

export const MessagePage = ({ onOpenEnquiry, onOpenSiteVisit }) => {
  return (
    <div className="min-h-screen bg-obsidian-950 py-16 text-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Breadcrumb & Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-serif uppercase tracking-widest text-gold-400 font-bold">
            Leadership Vision
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            A Personal Message from Mr. Rajan
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Founder & Managing Director, Rajan - Castle Properties
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-gold-400 to-gold-600 mx-auto rounded-full mt-4" />
        </div>

        {/* Message Container Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-obsidian-900/90 via-obsidian-900 to-obsidian-950 border border-gold-500/30 shadow-luxury">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Founder Portrait & Quick Credentials */}
            <div className="md:col-span-4 flex flex-col items-center text-center space-y-5">
              <div className="relative group">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-gold-400 to-gold-600 opacity-30 blur-md group-hover:opacity-60 transition duration-500" />
                <img
                  src="https://www.rajan-castle-properties.net/lovable-uploads/19fd2692-690a-4751-ab6b-2edd4890fbae.png"
                  alt="Mr. Katla Bhagyarajan - Founder of Rajan Castle Properties"
                  className="relative w-56 sm:w-64 h-auto rounded-2xl shadow-2xl object-cover border border-gold-500/40"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80';
                  }}
                />
              </div>

              <div className="space-y-1">
                <h3 className="font-serif text-xl font-bold text-white">Mr. Katla Bhagyarajan</h3>
                <p className="text-xs text-gold-400 font-medium">Founder & Managing Director</p>
                <p className="text-[11px] text-slate-400">Rajan - Castle Properties</p>
              </div>

              {/* Verified Trust Badges */}
              <div className="w-full pt-4 border-t border-white/10 space-y-2.5 text-left text-xs text-slate-300">
                <div className="flex items-center gap-2.5">
                  <Award className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>16+ Years Private Sector Leadership</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Smarter, High-Yield Land Allocation</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>Pioneer in Fourth City Ventures</span>
                </div>
              </div>

              {/* Direct Connect Buttons */}
              <div className="w-full pt-3 flex flex-col gap-2.5">
                <a
                  href="tel:+919090104949"
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian-950 font-bold text-xs uppercase tracking-wider shadow hover:from-gold-400 hover:to-gold-500 transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call +91 9090104949</span>
                </a>
                <a
                  href="https://wa.me/919090104949?text=Hello%20Mr.%20Rajan%2C%20I%20read%20your%20message%20and%20want%20to%20know%20more%20about%20Fourth%20City%20investments"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 font-semibold text-xs uppercase tracking-wider hover:bg-emerald-600/30 transition-all flex items-center justify-center gap-2"
                >
                  <span>Connect on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Founder Letter Content */}
            <div className="md:col-span-8 space-y-6 text-slate-300 text-sm sm:text-base leading-relaxed">
              
              <div className="p-4 rounded-xl bg-gold-500/10 border border-gold-500/20 text-gold-300 font-serif font-bold text-lg">
                "To my Friends, Investors and Customers,"
              </div>

              <p className="font-light text-slate-200">
                After more than <strong>16 years in the competitive private sector</strong>, I've developed a deep understanding of economic growth. Coming from a middle-class background, I'm also well-acquainted with financial challenges and the importance of budgeting to meet family needs.
              </p>

              <div className="p-5 rounded-2xl bg-white/[0.03] border-l-4 border-gold-500 space-y-2">
                <p className="text-white font-medium italic font-serif">
                  "It's clear that we're currently spending too much on land acquisition compared to what we're earning from it."
                </p>
                <p className="text-xs text-slate-400">
                  Market realization from evaluating over 15 years of land acquisition patterns across Telangana.
                </p>
              </div>

              <p>
                My vision is to create <strong>simpler, smaller, and smarter investment opportunities</strong> for my investors, channel partners, and customers. This shift aims to optimize our resources and ensure sustainable, long-term capital compounding without speculative overhead.
              </p>

              <p>
                With your support and well wishes, I'm incredibly excited to embark on my entrepreneurial journey; the timing feels absolutely right. Join me on this path, and I'm confident you'll profit significantly.
              </p>

              <div className="p-6 rounded-2xl bg-gradient-to-r from-obsidian-850 to-obsidian-900 border border-gold-500/30 space-y-3">
                <div className="flex items-center gap-2 text-gold-400 font-serif font-bold text-base">
                  <Sparkles className="w-5 h-5" />
                  <span>Our Flagship Upcoming Hubs: Telangana's Fourth City</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300">
                  Our upcoming landmark ventures are strategically located in the emerging fourth city:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-lg bg-black/40 border border-white/10 text-center">
                    <span className="font-bold text-white block text-sm">Mirkhanpet</span>
                    <span className="text-[11px] text-gold-400">Next to Skill Univ & Amazon</span>
                  </div>
                  <div className="p-3 rounded-lg bg-black/40 border border-white/10 text-center">
                    <span className="font-bold text-white block text-sm">Maheshwaram</span>
                    <span className="text-[11px] text-emerald-400">Srisailam Highway Corridor</span>
                  </div>
                  <div className="p-3 rounded-lg bg-black/40 border border-white/10 text-center">
                    <span className="font-bold text-white block text-sm">Kadthal</span>
                    <span className="text-[11px] text-blue-400">Pharma City & RRR Node</span>
                  </div>
                </div>
              </div>

              {/* Sign-off */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-400">Best always,</p>
                  <p className="font-serif text-xl font-bold text-white mt-1">Mr. Katla Bhagyarajan</p>
                  <p className="text-xs text-gold-400 font-mono">Founder, Rajan - Castle Properties</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onOpenEnquiry && onOpenEnquiry({ message: 'Requesting advisory meeting with Mr. Rajan regarding Fourth City investments' })}
                    className="px-5 py-2.5 rounded-xl bg-gold-500 text-obsidian-950 font-bold text-xs uppercase tracking-wider hover:bg-gold-400 transition-all shadow"
                  >
                    Request Investor Meeting
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Bottom Highlights & Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-6 rounded-2xl bg-obsidian-900 border border-white/10">
            <span className="font-serif text-3xl font-bold text-gold-400 block">500+</span>
            <span className="text-xs text-slate-400 mt-1 block">Properties Sold</span>
          </div>
          <div className="p-6 rounded-2xl bg-obsidian-900 border border-white/10">
            <span className="font-serif text-3xl font-bold text-white block">1000+</span>
            <span className="text-xs text-slate-400 mt-1 block">Happy Clients</span>
          </div>
          <div className="p-6 rounded-2xl bg-obsidian-900 border border-white/10">
            <span className="font-serif text-3xl font-bold text-gold-400 block">16+</span>
            <span className="text-xs text-slate-400 mt-1 block">Years Experience</span>
          </div>
          <div className="p-6 rounded-2xl bg-obsidian-900 border border-white/10">
            <span className="font-serif text-3xl font-bold text-emerald-400 block">4.9 / 5.0</span>
            <span className="text-xs text-slate-400 mt-1 block">Client Satisfaction</span>
          </div>
        </div>

      </div>
    </div>
  );
};
