import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { Home, Search, ArrowLeft, Phone } from 'lucide-react';

export const NotFoundPage = () => (
  <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 py-24 bg-obsidian-950">
    <SEO title="Page Not Found" description="The page you're looking for doesn't exist. Return to Rajan Castle Properties." />
    
    <p className="text-xs uppercase tracking-widest text-gold-400 font-serif font-bold mb-4">404 — Page Not Found</p>
    
    <h1 className="font-serif text-8xl sm:text-[10rem] font-bold bg-gradient-to-b from-gold-300 via-gold-500 to-gold-700 bg-clip-text text-transparent leading-none mb-6">
      404
    </h1>

    <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white mb-4">
      This Plot Has Already Been Sold
    </h2>

    <p className="text-slate-400 max-w-md text-sm leading-relaxed mb-10">
      The property you're looking for may have been sold, relocated, or never existed. 
      Our advisory team can help you find the perfect venture.
    </p>

    <div className="flex flex-col sm:flex-row gap-4">
      <Link
        to="/"
        className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian-950 font-bold text-sm uppercase tracking-wider hover:from-gold-400 hover:to-gold-500 transition-all shadow-luxury"
      >
        <Home className="w-4 h-4" />
        Back to Home
      </Link>
      <Link
        to="/projects"
        className="flex items-center gap-2 px-8 py-3.5 rounded-xl border border-gold-500/40 text-gold-300 font-semibold text-sm uppercase tracking-wider hover:bg-gold-500/10 transition-all"
      >
        <Search className="w-4 h-4" />
        Browse Projects
      </Link>
    </div>

    <a href="tel:+919090104949" className="mt-8 flex items-center gap-2 text-slate-400 hover:text-gold-400 text-sm transition-colors">
      <Phone className="w-4 h-4" />
      Call our advisory desk: +91 9090104949
    </a>
  </div>
);
