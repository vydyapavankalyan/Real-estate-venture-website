import React, { useState, useEffect } from 'react';
import { futureDevService } from '../services/allServices';
import {
  Train, MapPin, Calendar, Clock, ExternalLink, ShieldCheck,
  Video, FileText, ChevronRight, Layers, Building, Eye, Download, Info
} from 'lucide-react';

export const FutureDevelopmentPage = ({ onOpenEnquiry }) => {
  const [developments, setDevelopments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedZone, setSelectedZone] = useState('ALL');
  const [selectedDev, setSelectedDev] = useState(null);

  useEffect(() => {
    futureDevService.getAll()
      .then((data) => {
        setDevelopments(data || []);
        if (data && data.length > 0) {
          setSelectedDev(data[0]);
        }
      })
      .catch((err) => console.error('Failed to load future developments:', err))
      .finally(() => setLoading(false));
  }, []);

  const categories = ['ALL', 'METRO', 'ROADWAYS', 'IT_SEZ', 'DATA_CENTERS', 'PHARMA_LIFE_SCIENCES'];
  const zones = ['ALL', 'WEST', 'SOUTH', 'REGIONAL'];

  const filtered = developments.filter((dev) => {
    const matchesCat = selectedCategory === 'ALL' || dev.category === selectedCategory;
    const matchesZone = selectedZone === 'ALL' || dev.zone === selectedZone;
    return matchesCat && matchesZone;
  });

  const getStatusBadge = (status) => {
    const map = {
      'OPERATIONAL': { label: 'Operational', cls: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
      'UNDER_CONSTRUCTION': { label: 'Under Construction', cls: 'bg-gold-500/20 text-gold-300 border-gold-500/30' },
      'UNDER_PLANNING': { label: 'Under Planning', cls: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
      'ANNOUNCED': { label: 'Announced', cls: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
      'PROPOSED': { label: 'Proposed', cls: 'bg-slate-500/20 text-slate-300 border-slate-500/30' },
    };
    return map[status] || { label: status, cls: 'bg-slate-500/20 text-slate-300' };
  };

  return (
    <div className="min-h-screen bg-obsidian-950 py-12 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Hero */}
        <div className="space-y-4 max-w-4xl">
          <span className="text-xs font-serif uppercase tracking-widest text-gold-400 font-bold">
            Infrastructure Roadmap & Mega Projects
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Hyderabad: Building The Future State
          </h1>
          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            A comprehensive, verified guide to the strategic infrastructure shaping Hyderabad's next decade of real estate appreciation. Track high-speed metro lines, expressway rings, Future City master plans, and technology clusters.
          </p>
        </div>

        {/* Reference Highlight: 3 Development Rings & Future City */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-obsidian-900 to-obsidian-950 border border-gold-500/30 shadow-2xl space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-gold-400 font-semibold">
                Strategic State Framework
              </span>
              <h2 className="font-serif text-2xl font-bold text-white mt-1">
                The Three Development Rings Vision
              </h2>
            </div>
            <span className="text-xs text-slate-400">
              Source: Official Government of Telangana Future State Masterplan
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 text-xs">
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
              <span className="font-serif text-gold-300 font-bold block text-sm">Ring 1: Core Urban Hub</span>
              <p className="text-slate-300 leading-relaxed">
                Within Outer Ring Road (ORR) — High-density skyscraper hubs including Kokapet Golden Mile, Neopolis CBD, and Financial District.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
              <span className="font-serif text-gold-300 font-bold block text-sm">Ring 2: Semi-Urban Expansion</span>
              <p className="text-slate-300 leading-relaxed">
                Between ORR & RRR — Rapidly burgeoning gated villa corridors, Tellapur Techno City, Kollur, Mokila, and Shankarpally.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
              <span className="font-serif text-gold-300 font-bold block text-sm">Ring 3: Future City Regional Arc</span>
              <p className="text-slate-300 leading-relaxed">
                Along the 340 km Regional Ring Road — Integrated industrial freight corridors, Pharma City, Telangana AI City, and aero hubs.
              </p>
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 rounded-2xl bg-obsidian-900 border border-white/10">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-semibold px-3.5 py-1.5 rounded-lg border transition-all ${
                  selectedCategory === cat
                    ? 'bg-gold-500 text-obsidian-950 border-gold-400 font-bold'
                    : 'bg-obsidian-950 text-slate-300 border-white/10 hover:border-gold-500/30'
                }`}
              >
                {cat.replace('_', ' ')}
              </button>
            ))}
          </div>

          {/* Zone Selector */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Zone:</span>
            {zones.map((z) => (
              <button
                key={z}
                onClick={() => setSelectedZone(z)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  selectedZone === z
                    ? 'bg-white/15 text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {z}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Master Development Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => {
            const badge = getStatusBadge(item.status);
            return (
              <div
                key={item.id}
                onClick={() => setSelectedDev(item)}
                className="p-6 rounded-2xl bg-obsidian-900 border border-white/10 hover:border-gold-500/40 shadow-luxury hover:shadow-luxury-hover transition-all duration-300 flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  <div className="relative h-48 rounded-xl overflow-hidden mb-5 bg-obsidian-950 border border-white/5">
                    <img
                      src={item.imageUrl || 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80'}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent" />
                    
                    <span className={`absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md border backdrop-blur-md ${badge.cls}`}>
                      {badge.label}
                    </span>

                    <span className="absolute bottom-3 left-3 text-[10px] font-medium text-slate-300 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-gold-400" />
                      <span>{item.locationName}</span>
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-gold-300 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-400 mt-2.5 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>

                  {/* Highlights */}
                  {item.keyHighlights && item.keyHighlights.length > 0 && (
                    <div className="mt-4 space-y-1.5 pt-3 border-t border-white/10">
                      {item.keyHighlights.slice(0, 2).map((h, i) => (
                        <div key={i} className="text-[11px] text-slate-300 flex items-center gap-1.5">
                          <span className="text-gold-400">•</span>
                          <span className="truncate">{h}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Authoritative Metadata Footer */}
                <div className="pt-5 mt-5 border-t border-white/10 space-y-2 text-[10px] text-slate-400">
                  <div className="flex items-center justify-between">
                    <span>Expected Timeline:</span>
                    <strong className="text-gold-300 font-mono">{item.expectedTimeline || '2026 - 2028'}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Verified Source:</span>
                    <span className="text-slate-300 truncate max-w-[180px]">{item.sourceReference || 'HMDA Master Plan'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Last Updated:</span>
                    <span>{item.lastUpdatedDate || 'August 2026'}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Media & Attachments Section (Matching reference site) */}
        <div className="p-8 rounded-2xl bg-obsidian-900 border border-white/10 space-y-6">
          <div className="border-b border-white/10 pb-4">
            <span className="text-xs font-serif uppercase tracking-widest text-gold-400 font-bold">
              Official Media & Master Plan Documents
            </span>
            <h3 className="font-serif text-2xl font-bold text-white mt-1">
              Downloadable Development Plans & Videos
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-obsidian-950 border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-gold-400" />
                <div>
                  <h4 className="text-xs font-bold text-white">Three Development Rings Plan.pdf</h4>
                  <span className="text-[10px] text-slate-400">Telangana Future State Overview</span>
                </div>
              </div>
              <button onClick={() => onOpenEnquiry({ projectName: 'Development Plan Details' })} className="p-2 text-gold-400 hover:text-white">
                <Download className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-obsidian-950 border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-gold-400" />
                <div>
                  <h4 className="text-xs font-bold text-white">Financial District Plans.pdf</h4>
                  <span className="text-[10px] text-slate-400">Infrastructure Mapping & Projections</span>
                </div>
              </div>
              <button onClick={() => onOpenEnquiry({ projectName: 'Financial District Plans' })} className="p-2 text-gold-400 hover:text-white">
                <Download className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-obsidian-950 border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Video className="w-8 h-8 text-rose-400" />
                <div>
                  <h4 className="text-xs font-bold text-white">Watch Development Video</h4>
                  <span className="text-[10px] text-slate-400">Hyderabad Development Vision Overview</span>
                </div>
              </div>
              <a
                href="https://www.youtube.com/watch?v=dxKDwsEJbUI"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gold-400 hover:text-white"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
