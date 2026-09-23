import React from 'react';

export const SkeletonCard = () => (
  <div className="rounded-2xl bg-obsidian-900 border border-white/5 overflow-hidden animate-pulse">
    <div className="h-56 bg-obsidian-800" />
    <div className="p-5 space-y-3">
      <div className="h-3 bg-obsidian-800 rounded w-1/3" />
      <div className="h-5 bg-obsidian-800 rounded w-3/4" />
      <div className="h-3 bg-obsidian-800 rounded w-full" />
      <div className="h-3 bg-obsidian-800 rounded w-2/3" />
      <div className="flex gap-3 pt-2">
        <div className="h-8 bg-obsidian-800 rounded-lg flex-1" />
        <div className="h-8 bg-obsidian-800 rounded-lg flex-1" />
      </div>
    </div>
  </div>
);

export const SkeletonGrid = ({ count = 6 }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

export const SkeletonLine = ({ width = 'w-full', height = 'h-4' }) => (
  <div className={`${width} ${height} bg-obsidian-800 rounded animate-pulse`} />
);

export const SkeletonDetailPage = () => (
  <div className="min-h-screen bg-obsidian-950 animate-pulse">
    <div className="h-[65vh] bg-obsidian-900" />
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-6">
      <div className="h-4 bg-obsidian-800 rounded w-1/4" />
      <div className="h-8 bg-obsidian-800 rounded w-2/3" />
      <div className="h-4 bg-obsidian-800 rounded w-full" />
      <div className="h-4 bg-obsidian-800 rounded w-3/4" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="h-20 bg-obsidian-900 rounded-xl border border-white/5" />
        ))}
      </div>
    </div>
  </div>
);
