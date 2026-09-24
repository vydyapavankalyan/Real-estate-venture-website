import React, { useState } from 'react';
import { Mail, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';

export const NewsletterWidget = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setStatus('loading');
    // Simulate API call (replace with real endpoint when backend endpoint is added)
    await new Promise(r => setTimeout(r, 1200));
    setStatus('success');
    setEmail('');
  };

  return (
    <div className="space-y-3">
      <h4 className="text-xs uppercase tracking-widest font-semibold text-white font-serif">
        Market Alerts
      </h4>
      <p className="text-xs text-slate-400 leading-relaxed">
        Get Fourth City investment alerts, new project launches, and market insights delivered to your inbox.
      </p>
      {status === 'success' ? (
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold py-2">
          <CheckCircle2 className="w-4 h-4" />
          Subscribed! We'll keep you updated.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-white/[0.05] border border-white/10 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-gold-500/50"
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading' || !email}
              className="px-3 py-2.5 rounded-lg bg-gold-500 text-obsidian-950 hover:bg-gold-400 transition-all disabled:opacity-50"
            >
              {status === 'loading'
                ? <Loader2 className="w-4 h-4 animate-spin" />
                : <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-[10px] text-slate-600">No spam. Unsubscribe anytime.</p>
        </form>
      )}
    </div>
  );
};
