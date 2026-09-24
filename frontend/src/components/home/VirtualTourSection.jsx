import React from 'react';
import { Video, Play, MapPin, Compass, ChevronRight, Smartphone } from 'lucide-react';

const TOUR_POINTS = [
  { label: 'Entrance Gate & Security', time: '0:00' },
  { label: 'Blacktop Internal Roads', time: '1:20' },
  { label: 'Clubhouse & Amenity Zone', time: '2:45' },
  { label: 'Sample Plot / Unit Walk-through', time: '4:10' },
  { label: 'Panoramic Skyline & Surroundings', time: '5:30' },
  { label: 'Connectivity & Highway Access', time: '6:50' },
];

export const VirtualTourSection = ({ projectName = 'Rajan Castle — Mirkhanpet, Fourth City', youtubeId = 'dxKDwsEJbUI' }) => {
  return (
    <section className="py-20 bg-obsidian-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Embed or Thumbnail */}
          <div className="relative rounded-3xl overflow-hidden border border-gold-500/30 shadow-2xl group">
            <div className="aspect-video bg-obsidian-950 relative">
              {/* YouTube embed */}
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?rel=0&showinfo=0&modestbranding=1`}
                title={`Virtual Site Tour — ${projectName}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                loading="lazy"
              />
              {/* Gold border accent */}
              <div className="absolute inset-0 pointer-events-none ring-2 ring-gold-500/20 rounded-3xl" />
            </div>

            {/* Badge overlay */}
            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/80 border border-gold-500/40 backdrop-blur-md">
              <Video className="w-3.5 h-3.5 text-gold-400" />
              <span className="text-[11px] font-bold text-gold-300 uppercase tracking-wider">
                Official Virtual Tour
              </span>
            </div>
          </div>

          {/* Right: Details & Tour Points */}
          <div className="space-y-6">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-gold-400 font-bold font-serif block mb-2">
                Experience Before You Invest
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-snug">
                Virtual Site Tour &{' '}
                <span className="text-gold-300">360° Exploration</span>
              </h2>
              <p className="text-sm text-slate-400 mt-3 leading-relaxed font-light">
                Explore the exact land topography, internal roads, connectivity, and future infrastructure corridor of <strong className="text-slate-200">{projectName}</strong> — from your home, office, or even overseas.
              </p>
            </div>

            {/* Tour Chapters */}
            <div className="space-y-2">
              <h4 className="text-[11px] font-serif uppercase font-bold tracking-widest text-gold-400 pb-1 border-b border-white/5">
                Tour Chapters
              </h4>
              {TOUR_POINTS.map((point, i) => (
                <div key={i} className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-white/[0.04] transition-colors group/item cursor-default">
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-gold-500/20 border border-gold-500/30 flex items-center justify-center text-gold-400 text-[9px] font-bold shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-xs text-slate-300 group-hover/item:text-white transition-colors">{point.label}</span>
                  </div>
                  <span className="text-[10px] text-gold-500 font-mono">{point.time}</span>
                </div>
              ))}
            </div>

            {/* CTA Chips */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={`https://www.youtube.com/watch?v=${youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian-950 font-bold text-xs uppercase tracking-wider hover:from-gold-400 hover:to-gold-500 transition-all shadow-luxury"
              >
                <Play className="w-4 h-4" />
                <span>Watch Full Tour</span>
              </a>
              <a
                href="https://wa.me/919090104949?text=Hi%2C%20I%20want%20to%20schedule%20a%20physical%20site%20visit%20to%20Mirkhanpet%20Fourth%20City"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/15 text-slate-200 hover:text-white hover:border-gold-400/40 text-xs font-semibold uppercase tracking-wider transition-all"
              >
                <MapPin className="w-4 h-4 text-gold-400" />
                <span>Schedule Physical Visit</span>
              </a>
            </div>

            {/* Mobile QR hint */}
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Scan & tour on any device — mobile, tablet, desktop</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
