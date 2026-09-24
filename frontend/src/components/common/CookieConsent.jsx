import React, { useState, useEffect } from 'react';
import { Cookie, X, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('rcp_cookies_accepted');
    if (!accepted) {
      const t = setTimeout(() => setVisible(true), 2500);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('rcp_cookies_accepted', 'true');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem('rcp_cookies_accepted', 'false');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 left-4 md:left-auto md:right-6 md:max-w-md z-50 animate-slideUp">
      <div className="bg-obsidian-900 border border-white/15 rounded-2xl shadow-2xl p-5 space-y-4 backdrop-blur-md">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-gold-500/15 border border-gold-500/30 flex items-center justify-center shrink-0">
            <Cookie className="w-5 h-5 text-gold-400" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-white mb-1 flex items-center gap-2">
              Cookie Preferences
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              We use cookies to enhance your experience and analyze site traffic. By clicking "Accept", you agree to our{' '}
              <Link to="/privacy" className="text-gold-400 hover:text-gold-300 underline underline-offset-2">Privacy Policy</Link>.
            </p>
          </div>
          <button onClick={decline} className="text-slate-500 hover:text-white transition-colors shrink-0">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="flex gap-3">
          <button
            onClick={accept}
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian-950 font-bold text-xs uppercase tracking-wider hover:from-gold-400 hover:to-gold-500 transition-all"
          >
            Accept All
          </button>
          <button
            onClick={decline}
            className="flex-1 py-2.5 rounded-xl border border-white/15 text-slate-400 text-xs font-semibold hover:border-white/30 hover:text-white transition-all"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};
