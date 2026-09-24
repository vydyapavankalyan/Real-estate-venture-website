import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Building, Calendar, ArrowRight, ShieldCheck, Check, Scale } from 'lucide-react';
import { useComparison } from '../../context/ComparisonContext';

export const ProjectCard = ({ project, onOpenSiteVisit, onOpenEnquiry }) => {
  const { toggleCompare, isComparing } = useComparison();
  const comparing = isComparing(project);

  const statusColor = {
    'READY_TO_MOVE': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    'UNDER_CONSTRUCTION': 'bg-gold-500/20 text-gold-300 border-gold-500/30',
    'UPCOMING': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  }[project.status] || 'bg-slate-500/20 text-slate-300';

  const statusLabel = {
    'READY_TO_MOVE': 'Ready To Move',
    'UNDER_CONSTRUCTION': 'Under Construction',
    'UPCOMING': 'Pre-Launch / Upcoming',
  }[project.status] || project.status;

  return (
    <div className="group rounded-2xl bg-obsidian-900 border border-white/10 hover:border-gold-500/40 overflow-hidden shadow-luxury hover:shadow-luxury-hover transition-all duration-300 flex flex-col">
      
      {/* Image container */}
      <div className="relative h-64 overflow-hidden bg-obsidian-950">
        <img
          src={project.coverImageUrl || project.gallery?.[0]?.url || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'}
          alt={project.projectName}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/20 to-transparent" />

        {/* Status & Type Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <span className={`text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md border backdrop-blur-md ${statusColor}`}>
            {statusLabel}
          </span>
          <span className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md bg-black/60 text-white border border-white/20 backdrop-blur-md">
            {project.propertyType}
          </span>
        </div>

        {/* Compare Toggle Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleCompare(project);
          }}
          className={`absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider backdrop-blur-md transition-all ${
            comparing
              ? 'bg-gold-500 text-obsidian-950 shadow-luxury'
              : 'bg-black/60 text-slate-300 hover:text-white border border-white/20 hover:border-gold-500/50'
          }`}
          title="Compare property side-by-side"
        >
          <Scale className="w-3 h-3" />
          <span>{comparing ? 'Comparing' : 'Compare'}</span>
        </button>

        {/* Pricing badge */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-slate-300 block font-medium">Investment Starts</span>
            <span className="font-serif text-lg font-bold text-gold-300 drop-shadow-md">
              {project.price?.priceDisplay || 'Price on Request'}
            </span>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block">Configurations</span>
            <span className="text-xs font-semibold text-white">
              {project.configurations?.slice(0, 2).join(' • ') || '3 & 4 BHK'}
            </span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-gold-400 font-medium mb-1">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span>{project.location?.area || 'Hyderabad'}, Telangana</span>
          </div>

          <Link to={`/projects/${project.slug}`}>
            <h3 className="font-serif text-xl font-bold text-white group-hover:text-gold-300 transition-colors">
              {project.projectName}
            </h3>
          </Link>

          <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Specifications snippet */}
        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/10 text-[11px] text-slate-300">
          <div>
            <span className="text-slate-400 block text-[10px]">Land Area</span>
            <span className="font-medium">{project.landArea || '4+ Acres'}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Possession</span>
            <span className="font-medium">{project.possessionDate || '2027'}</span>
          </div>
        </div>

        {/* Amenities Highlights */}
        {project.amenities && project.amenities.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.amenities.slice(0, 3).map((a, i) => (
              <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/5 text-slate-300">
                {a}
              </span>
            ))}
            {project.amenities.length > 3 && (
              <span className="text-[10px] px-1.5 py-0.5 text-gold-400 font-semibold">
                +{project.amenities.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* RERA Badge Placeholder */}
        <div className="text-[10px] text-slate-400 flex items-center gap-1 pt-1">
          <ShieldCheck className="w-3.5 h-3.5 text-gold-400 shrink-0" />
          <span className="truncate">RERA: {project.reraNumber || 'Registration In Progress'}</span>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 grid grid-cols-2 gap-2">
          <Link
            to={`/projects/${project.slug}`}
            className="flex items-center justify-center gap-1 text-xs font-semibold py-2.5 px-3 rounded-lg border border-white/20 text-slate-200 hover:bg-white/5 hover:border-gold-400 hover:text-white transition-all"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={() => onOpenSiteVisit(project)}
            className="flex items-center justify-center gap-1 text-xs font-bold py-2.5 px-3 rounded-lg bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian-950 shadow hover:from-gold-400 hover:to-gold-500 transition-all"
          >
            <span>Book Visit</span>
          </button>
        </div>
      </div>
    </div>
  );
};
