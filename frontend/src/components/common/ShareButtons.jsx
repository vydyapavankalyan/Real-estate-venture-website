import React, { useState } from 'react';
import { Share2, Copy, MessageCircle, Check, Twitter, Facebook } from 'lucide-react';

export const ShareButtons = ({ title, url }) => {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  const shareUrl = url || window.location.href;
  const shareText = `Check out ${title} — premium real estate by Rajan Castle Properties, Hyderabad.`;

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const whatsapp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`, '_blank');
  };

  const twitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const facebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/15 text-slate-300 text-xs font-semibold hover:border-gold-500/40 hover:text-white transition-all"
      >
        <Share2 className="w-4 h-4" />
        Share
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-12 z-50 bg-obsidian-900 border border-white/15 rounded-2xl shadow-2xl p-4 w-52 space-y-2 backdrop-blur-md">
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold px-1">Share This Project</p>
            {[
              { icon: MessageCircle, label: 'WhatsApp', action: whatsapp, color: 'text-emerald-400' },
              { icon: Twitter, label: 'Twitter / X', action: twitter, color: 'text-sky-400' },
              { icon: Facebook, label: 'Facebook', action: facebook, color: 'text-blue-400' },
            ].map(({ icon: Icon, label, action, color }) => (
              <button
                key={label}
                onClick={() => { action(); setOpen(false); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-slate-300 hover:text-white transition-all text-sm"
              >
                <Icon className={`w-4 h-4 ${color}`} />
                {label}
              </button>
            ))}
            <div className="border-t border-white/10 pt-2">
              <button
                onClick={copyLink}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-slate-300 hover:text-white transition-all text-sm"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
                {copied ? 'Copied!' : 'Copy Link'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
