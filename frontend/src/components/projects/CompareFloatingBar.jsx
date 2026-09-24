import React from 'react';
import { useComparison } from '../../context/ComparisonContext';
import { Scale, X, ArrowRight, Trash2 } from 'lucide-react';

export const CompareFloatingBar = () => {
  const { compareList, removeFromCompare, clearCompare, setIsModalOpen } = useComparison();

  if (compareList.length === 0) return null;

  return (
    <aside aria-label="Property comparison dock" className="fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-2xl animate-slideUp">
      <div className="bg-obsidian-900/95 border border-gold-500/40 rounded-2xl shadow-2xl p-3 sm:p-4 backdrop-blur-xl flex items-center justify-between gap-3">
        
        {/* Left: Indicator & Chips */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto py-1 scrollbar-none">
          <div className="hidden sm:flex items-center gap-1.5 text-gold-400 font-serif font-bold text-xs uppercase tracking-wider shrink-0 pl-1">
            <Scale className="w-4 h-4" />
            <span>Compare ({compareList.length}/3)</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {compareList.map((project) => (
              <div
                key={project.id || project._id || project.slug}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-white/[0.05] border border-white/10 text-xs text-white max-w-[150px] shrink-0"
              >
                <img
                  src={project.coverImageUrl || project.gallery?.[0]?.url || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=100&q=80'}
                  alt={project.projectName}
                  className="w-5 h-5 rounded-md object-cover"
                />
                <span className="truncate text-[11px] font-medium">{project.projectName}</span>
                <button
                  onClick={() => removeFromCompare(project.id || project._id || project.slug)}
                  className="text-slate-400 hover:text-white"
                  title="Remove from comparison"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={clearCompare}
            className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-white/5 transition-colors"
            title="Clear all"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian-950 font-bold text-xs uppercase tracking-wider hover:from-gold-400 hover:to-gold-500 transition-all flex items-center gap-1.5 shadow-luxury"
          >
            <span>Compare Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </aside>
  );
};
