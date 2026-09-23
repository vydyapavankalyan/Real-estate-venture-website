import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-20 md:bottom-6 left-5 z-40 p-3 rounded-full bg-obsidian-900/90 border border-gold-500/40 text-gold-400 hover:text-white hover:bg-gold-500/20 shadow-2xl transition-all duration-300 backdrop-blur-md"
      title="Back to top"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};
