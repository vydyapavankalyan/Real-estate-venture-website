import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { locationService } from '../services/allServices';
import { MapPin, Navigation, TrendingUp, ArrowRight, Building } from 'lucide-react';

export const LocationsPage = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    locationService.getAll()
      .then((data) => setLocations(data || []))
      .catch((err) => console.error('Failed to load locations:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-obsidian-950 py-16 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-serif uppercase tracking-widest text-gold-400 font-bold">
            Hyderabad Growth Corridors
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Strategic Investment Vectors
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed font-light">
            Deep-dive into Hyderabad's highest-appreciating micro-markets. Explore connectivity, price benchmarks, and planned infrastructure across West and South Hyderabad.
          </p>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {locations.map((loc) => (
            <div
              key={loc.id || loc.slug}
              className="rounded-2xl bg-obsidian-900 border border-white/10 hover:border-gold-500/40 overflow-hidden shadow-luxury hover:shadow-luxury-hover transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-56 overflow-hidden bg-obsidian-950">
                  <img
                    src={loc.heroImageUrl || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'}
                    alt={loc.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/20 to-transparent" />
                  
                  <span className="absolute top-3 left-3 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10 text-gold-300">
                    {loc.zone?.replace('_', ' ')}
                  </span>

                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                    <div>
                      <h3 className="font-serif text-2xl font-bold">{loc.name}</h3>
                      <span className="text-[10px] text-slate-300 block">{loc.pricePerSqFtRange || '₹9,500 - ₹14,000 / sq.ft*'}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {loc.description}
                  </p>

                  {loc.connectivityHighlights && loc.connectivityHighlights.length > 0 && (
                    <div className="space-y-1.5 pt-2 border-t border-white/5">
                      <span className="text-[10px] uppercase tracking-wider text-gold-400 font-semibold block">Key Connectivity</span>
                      {loc.connectivityHighlights.slice(0, 3).map((c, i) => (
                        <div key={i} className="text-[11px] text-slate-400 flex items-center gap-1.5">
                          <span className="text-gold-400">•</span>
                          <span>{c}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  to={`/projects?location=${encodeURIComponent(loc.name)}`}
                  className="w-full py-2.5 rounded-xl border border-gold-500/40 text-gold-300 hover:bg-gold-500 hover:text-obsidian-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>Explore Projects in {loc.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
