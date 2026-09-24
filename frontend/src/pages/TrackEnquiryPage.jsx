import React, { useState } from 'react';
import { SEO } from '../components/common/SEO';
import { Search, CheckCircle2, Clock, User, Phone, ArrowRight } from 'lucide-react';

const STATUSES = ['Received', 'Assigned to Advisor', 'In Progress', 'Completed'];

export const TrackEnquiryPage = () => {
  const [tab, setTab] = useState('enquiry');
  const [code, setCode] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.trim().length > 3) setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-obsidian-950 py-16 text-slate-100">
      <SEO
        title="Track Your Enquiry"
        description="Track the status of your property enquiry or site visit booking with Rajan Castle Properties. Enter your Lead Code or Visit Code."
      />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-10">

        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-serif uppercase tracking-widest text-gold-400 font-bold">Client Services</span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white">Track Your Enquiry</h1>
          <p className="text-slate-400 text-sm">Enter the code you received after submitting an enquiry or booking a site visit.</p>
        </div>

        {/* Tabs */}
        <div className="flex rounded-xl overflow-hidden border border-white/10 bg-obsidian-900">
          {[['enquiry', 'Track Enquiry'], ['visit', 'Track Site Visit']].map(([key, label]) => (
            <button
              key={key}
              onClick={() => { setTab(key); setSubmitted(false); setCode(''); }}
              className={`flex-1 py-3 text-sm font-semibold transition-all ${tab === key ? 'bg-gold-500 text-obsidian-950' : 'text-slate-400 hover:text-white'}`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Form */}
        <div className="bg-obsidian-900 border border-white/10 rounded-2xl p-8 space-y-6">
          {!submitted ? (
            <>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
                  {tab === 'enquiry' ? 'Lead Code' : 'Visit Code'}
                </label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    value={code}
                    onChange={e => setCode(e.target.value.toUpperCase())}
                    placeholder={tab === 'enquiry' ? 'e.g. LEAD-8472' : 'e.g. VISIT-2391'}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-obsidian-950 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-gold-500/60 text-sm font-mono"
                  />
                </div>
                <p className="text-[11px] text-slate-500">This code was sent to your WhatsApp/email after submission.</p>
              </div>
              <button
                onClick={handleSubmit}
                disabled={code.trim().length < 4}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian-950 font-bold text-sm uppercase tracking-wider hover:from-gold-400 hover:to-gold-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                Check Status <ArrowRight className="w-4 h-4" />
              </button>
            </>
          ) : (
            <div className="space-y-8">
              {/* Code badge */}
              <div className="flex items-center gap-3 p-4 bg-gold-500/10 border border-gold-500/30 rounded-xl">
                <Search className="w-5 h-5 text-gold-400" />
                <div>
                  <p className="text-xs text-slate-400">Tracking code</p>
                  <p className="font-mono font-bold text-gold-300">{code}</p>
                </div>
              </div>

              {/* Status timeline */}
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-4">Status Timeline</p>
                {STATUSES.map((s, i) => {
                  const done = i <= 1; // mock: first 2 done
                  const active = i === 1;
                  return (
                    <div key={s} className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${done ? 'bg-gold-500 border-gold-500' : 'bg-transparent border-white/20'}`}>
                          {done
                            ? <CheckCircle2 className="w-4 h-4 text-obsidian-950" />
                            : <Clock className="w-4 h-4 text-slate-600" />}
                        </div>
                        {i < STATUSES.length - 1 && (
                          <div className={`w-0.5 h-8 mt-1 ${done ? 'bg-gold-500/50' : 'bg-white/10'}`} />
                        )}
                      </div>
                      <div className="pb-6">
                        <p className={`text-sm font-semibold ${done ? 'text-white' : 'text-slate-600'}`}>{s}</p>
                        {active && <p className="text-xs text-gold-400 mt-0.5">Your advisor will contact you shortly.</p>}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Advisor contact mock */}
              <div className="p-4 bg-obsidian-950 rounded-xl border border-white/10 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gold-500/20 flex items-center justify-center">
                  <User className="w-5 h-5 text-gold-400" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-slate-400">Assigned Advisor</p>
                  <p className="text-sm font-semibold text-white">Rajan Castle Advisory Team</p>
                </div>
                <a href="tel:+919090104949" className="flex items-center gap-2 text-gold-400 hover:text-gold-300 text-sm font-semibold transition-colors">
                  <Phone className="w-4 h-4" /> Call
                </a>
              </div>

              <button
                onClick={() => { setSubmitted(false); setCode(''); }}
                className="w-full py-3 rounded-xl border border-white/10 text-slate-400 text-sm hover:border-white/20 hover:text-white transition-all"
              >
                Track Another Code
              </button>
            </div>
          )}
        </div>

        {/* Help */}
        <p className="text-center text-xs text-slate-500">
          Don't have a code?{' '}
          <a href="tel:+919090104949" className="text-gold-400 hover:text-gold-300">Call +91 9090104949</a>
          {' '}for instant status updates.
        </p>

      </div>
    </div>
  );
};
