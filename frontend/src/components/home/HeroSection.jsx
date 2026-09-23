import React from 'react';
import { ArrowRight, Calendar, Compass, ShieldCheck, Sparkles, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HeroSection = ({ onOpenSiteVisit, onOpenEnquiry }) => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-obsidian-950">
      
      {/* Background cinematic visuals with luxury overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2000&q=85"
          alt="Hyderabad Luxury Real Estate Skyline"
          className="w-full h-full object-cover object-center scale-105 animate-pulse duration-10000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian-950 via-obsidian-950/85 to-obsidian-950/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-obsidian-950/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 flex flex-col items-center text-center">
        
        {/* Top Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-gold-500/30 text-gold-300 text-xs font-medium tracking-widest uppercase mb-8 backdrop-blur-md animate-fadeIn shadow-luxury">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span>Discover Better Living. Invest in Hyderabad's Future.</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] max-w-4xl">
          Build Your Future in <span className="bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 bg-clip-text text-transparent">Hyderabad</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-2xl font-light leading-relaxed">
          Premium residential towers, sky mansions, and signature gated villas in carefully selected growth corridors of Kokapet, Neopolis, and the Financial District.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            to="/projects"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian-950 font-bold text-sm tracking-wider uppercase shadow-luxury hover:from-gold-400 hover:to-gold-500 hover:shadow-luxury-hover transition-all flex items-center justify-center gap-2 group"
          >
            <span>Explore Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <button
            onClick={onOpenSiteVisit}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 border border-white/20 text-white font-semibold text-sm tracking-wider uppercase backdrop-blur-md hover:bg-white/15 hover:border-gold-400 transition-all flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4 text-gold-400" />
            <span>Schedule Site Visit</span>
          </button>

          <button
            onClick={onOpenEnquiry}
            className="w-full sm:w-auto px-8 py-4 rounded-xl border border-gold-500/40 text-gold-300 font-semibold text-sm tracking-wider uppercase hover:bg-gold-500/10 transition-all"
          >
            Talk to an Expert
          </button>
        </div>

        {/* Quick Highlights Strip */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-12 text-slate-400 text-xs border-t border-white/10 pt-8 w-full max-w-4xl">
          <div className="space-y-1">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-white block">500+</span>
            <span className="text-[11px] uppercase tracking-wider text-slate-400">Properties Curated</span>
          </div>
          <div className="space-y-1">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-white block">₹1,200 Cr+</span>
            <span className="text-[11px] uppercase tracking-wider text-slate-400">Asset Value Managed</span>
          </div>
          <div className="space-y-1">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-white block">100%</span>
            <span className="text-[11px] uppercase tracking-wider text-slate-400">RERA Verified Guidelines</span>
          </div>
          <div className="space-y-1">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-white block">4.9 / 5</span>
            <span className="text-[11px] uppercase tracking-wider text-slate-400">Client Satisfaction</span>
          </div>
        </div>

      </div>
    </section>
  );
};
