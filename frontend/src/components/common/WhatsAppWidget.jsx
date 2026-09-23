import React, { useState } from 'react';
import { MessageSquare, X, Send, Phone, CheckCircle2, Sparkles } from 'lucide-react';

export const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const quickPrompts = [
    "I want Fourth City Mirkhanpet project details & pricing",
    "Schedule a site visit with luxury chauffeur pickup",
    "Request an investor consultation with Mr. Rajan",
    "Please send me the master plan & RERA brochures"
  ];

  const handleSend = (text) => {
    const message = encodeURIComponent(text || customMsg || "Hello Rajan Castle Properties, I am interested in your Hyderabad and Fourth City developments.");
    window.open(`https://wa.me/919090104949?text=${message}`, '_blank');
    setIsOpen(false);
    setCustomMsg('');
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 right-5 z-50">
      
      {/* Popover Window */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 rounded-2xl bg-obsidian-900 border border-gold-500/40 shadow-2xl overflow-hidden animate-fadeIn text-slate-100">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-emerald-700 via-emerald-800 to-obsidian-900 text-white flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-obsidian-950 shadow">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-obsidian-900" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-white flex items-center gap-1.5">
                  <span>Rajan Castle Desk</span>
                  <Sparkles className="w-3 h-3 text-gold-400" />
                </h4>
                <p className="text-[10px] text-emerald-200">Online • Typically replies in 5 mins</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3 bg-obsidian-950/90 text-xs">
            
            <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-slate-300 space-y-1">
              <p className="font-medium text-white">Namaste! 🙏</p>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Welcome to Rajan - Castle Properties. How can we assist your real estate journey today?
              </p>
            </div>

            {/* Quick Prompt Chips */}
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-semibold text-gold-400 tracking-wider block">
                Quick Inquiries:
              </span>
              {quickPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(p)}
                  className="w-full text-left p-2 rounded-lg bg-obsidian-900 border border-white/10 hover:border-gold-500/40 text-slate-300 hover:text-white transition-colors text-[11px]"
                >
                  💬 {p}
                </button>
              ))}
            </div>

            {/* Custom Input */}
            <div className="pt-2 flex items-center gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 px-3 py-2 text-xs rounded-xl bg-obsidian-900 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
              <button
                onClick={() => handleSend()}
                className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shadow"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            <div className="text-center pt-1 text-[10px] text-slate-500">
              Direct Helpline: +91 9090104949
            </div>
          </div>

        </div>
      )}

      {/* Floating Action Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-xs uppercase tracking-wider shadow-2xl transition-all duration-300 transform hover:scale-105"
        title="Chat on WhatsApp with Rajan Castle Properties"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
        </span>
        <MessageSquare className="w-5 h-5 text-white" />
        <span className="hidden sm:inline font-semibold">WhatsApp Concierge</span>
      </button>

    </div>
  );
};
