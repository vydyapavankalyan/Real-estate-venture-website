import React from 'react';
import { useComparison } from '../../context/ComparisonContext';
import { X, Check, MapPin, Building, Calendar, ShieldCheck, IndianRupee, Layers, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PropertyComparisonModal = ({ onOpenSiteVisit, onOpenEnquiry }) => {
  const { compareList, removeFromCompare, isModalOpen, setIsModalOpen } = useComparison();

  if (!isModalOpen || compareList.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      <div className="bg-obsidian-950 border border-gold-500/40 rounded-3xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-obsidian-900/60 shrink-0">
          <div>
            <span className="text-[10px] uppercase font-serif tracking-widest text-gold-400 font-bold block">
              Direct Side-by-Side Analysis
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-white mt-0.5">
              Property Comparison
            </h2>
          </div>
          <button
            onClick={() => setIsModalOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Content Table */}
        <div className="flex-1 overflow-x-auto overflow-y-auto p-5 sm:p-6 space-y-6">
          <div className="min-w-[650px]">
            {/* Headers / Thumbnails */}
            <div className="grid grid-cols-4 gap-4 pb-6 border-b border-white/10">
              <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold self-end pb-2">
                Parameters
              </div>
              {compareList.map((project) => (
                <div key={project.id || project._id || project.slug} className="space-y-3 relative group">
                  <button
                    onClick={() => removeFromCompare(project.id || project._id || project.slug)}
                    className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-black/70 text-slate-400 hover:text-white backdrop-blur-sm"
                    title="Remove"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                  <div className="h-36 rounded-2xl overflow-hidden bg-obsidian-900 border border-white/10">
                    <img
                      src={project.coverImageUrl || project.gallery?.[0]?.url || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80'}
                      alt={project.projectName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-white text-base leading-snug">
                      {project.projectName}
                    </h4>
                    <span className="text-[11px] text-gold-400 block mt-0.5">
                      {project.location?.area || 'Hyderabad'}
                    </span>
                  </div>
                  <Link
                    to={`/projects/${project.slug}`}
                    onClick={() => setIsModalOpen(false)}
                    className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-gold-300 font-medium"
                  >
                    <span>View Venture Details</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              ))}
              {/* If fewer than 3, render placeholder column */}
              {Array.from({ length: 3 - compareList.length }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center p-6 text-center text-slate-500 text-xs min-h-[160px]"
                >
                  <span>Select another property from the listings to compare</span>
                </div>
              ))}
            </div>

            {/* Comparison Rows */}
            <div className="divide-y divide-white/5 text-xs text-slate-300">
              
              {/* Starting Investment */}
              <div className="grid grid-cols-4 gap-4 py-4 items-center">
                <div className="font-semibold text-slate-400 flex items-center gap-1.5">
                  <IndianRupee className="w-4 h-4 text-gold-400" />
                  <span>Investment Starts</span>
                </div>
                {compareList.map((p) => (
                  <div key={p.id || p.slug} className="font-serif text-base font-bold text-gold-300">
                    {p.price?.priceDisplay || 'Price on Request'}
                  </div>
                ))}
              </div>

              {/* Property Type */}
              <div className="grid grid-cols-4 gap-4 py-4 items-center">
                <div className="font-semibold text-slate-400 flex items-center gap-1.5">
                  <Building className="w-4 h-4 text-gold-400" />
                  <span>Property Type</span>
                </div>
                {compareList.map((p) => (
                  <div key={p.id || p.slug} className="font-medium text-white">
                    {p.propertyType || 'Open Plot / Villa'}
                  </div>
                ))}
              </div>

              {/* Corridor & Address */}
              <div className="grid grid-cols-4 gap-4 py-4 items-center">
                <div className="font-semibold text-slate-400 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-gold-400" />
                  <span>Strategic Corridor</span>
                </div>
                {compareList.map((p) => (
                  <div key={p.id || p.slug}>
                    <p className="font-medium text-white">{p.location?.area || 'Hyderabad'}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{p.location?.address || 'Telangana'}</p>
                  </div>
                ))}
              </div>

              {/* Land Parcel & Scale */}
              <div className="grid grid-cols-4 gap-4 py-4 items-center">
                <div className="font-semibold text-slate-400 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-gold-400" />
                  <span>Land Parcel / Scale</span>
                </div>
                {compareList.map((p) => (
                  <div key={p.id || p.slug} className="font-medium text-white">
                    {p.landArea || '4.5+ Acres'} {p.totalUnits ? `(${p.totalUnits} Units)` : ''}
                  </div>
                ))}
              </div>

              {/* Configurations */}
              <div className="grid grid-cols-4 gap-4 py-4 items-center">
                <div className="font-semibold text-slate-400">Configurations</div>
                {compareList.map((p) => (
                  <div key={p.id || p.slug} className="text-white">
                    {p.configurations && p.configurations.length > 0
                      ? p.configurations.join(', ')
                      : 'Residential Plots'}
                  </div>
                ))}
              </div>

              {/* Possession Date */}
              <div className="grid grid-cols-4 gap-4 py-4 items-center">
                <div className="font-semibold text-slate-400 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-gold-400" />
                  <span>Possession</span>
                </div>
                {compareList.map((p) => (
                  <div key={p.id || p.slug} className="font-medium text-white">
                    {p.possessionDate || 'Immediate / Q4 2026'}
                  </div>
                ))}
              </div>

              {/* RERA Compliance */}
              <div className="grid grid-cols-4 gap-4 py-4 items-center">
                <div className="font-semibold text-slate-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>RERA Status</span>
                </div>
                {compareList.map((p) => (
                  <div key={p.id || p.slug} className="font-mono text-emerald-300 text-[11px]">
                    {p.reraNumber || 'Verified RERA Track'}
                  </div>
                ))}
              </div>

              {/* Amenities Comparison */}
              <div className="grid grid-cols-4 gap-4 py-4 items-start">
                <div className="font-semibold text-slate-400">Selected Amenities</div>
                {compareList.map((p) => (
                  <div key={p.id || p.slug} className="space-y-1.5">
                    {p.amenities?.slice(0, 5).map((a, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                        <span className="truncate">{a}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="grid grid-cols-4 gap-4 py-5 items-center">
                <div className="font-semibold text-slate-400">Direct Actions</div>
                {compareList.map((p) => (
                  <div key={p.id || p.slug} className="space-y-2">
                    <button
                      onClick={() => {
                        setIsModalOpen(false);
                        onOpenSiteVisit(p);
                      }}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian-950 font-bold text-xs uppercase tracking-wider hover:from-gold-400 hover:to-gold-500 transition-all text-center block shadow"
                    >
                      Book Site Visit
                    </button>
                    <button
                      onClick={() => {
                        setIsModalOpen(false);
                        onOpenEnquiry(p);
                      }}
                      className="w-full py-2 rounded-xl border border-white/15 text-slate-300 hover:text-white hover:border-gold-400/50 text-xs font-semibold transition-all text-center block"
                    >
                      Enquire Pricing
                    </button>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
