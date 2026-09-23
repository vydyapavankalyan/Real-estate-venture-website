import React from 'react';
import { Phone, MessageSquare, Calendar } from 'lucide-react';

export const MobileStickyBar = ({ onOpenSiteVisit, onOpenEnquiry }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-obsidian-950/95 backdrop-blur-lg border-t border-white/10 px-4 py-2.5 flex items-center justify-between gap-2 shadow-2xl">
      <a
        href="tel:+919849000000"
        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-white/5 border border-white/10 text-white text-xs font-semibold hover:bg-white/10 active:scale-95 transition-all"
      >
        <Phone className="w-3.5 h-3.5 text-gold-400" />
        <span>Call</span>
      </a>

      <a
        href="https://wa.me/919849000000?text=Hi%2C%20I%20am%20interested%20in%20Hyderabad%20luxury%20properties"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 text-xs font-semibold hover:bg-emerald-600/30 active:scale-95 transition-all"
      >
        <MessageSquare className="w-3.5 h-3.5" />
        <span>WhatsApp</span>
      </a>

      <button
        onClick={onOpenSiteVisit}
        className="flex-[1.4] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian-950 text-xs font-bold shadow-luxury active:scale-95 transition-all"
      >
        <Calendar className="w-3.5 h-3.5" />
        <span>Book Visit</span>
      </button>
    </div>
  );
};
