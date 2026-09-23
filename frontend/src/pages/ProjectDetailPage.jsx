import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projectService } from '../services/projectService';
import { ProjectGalleryViewer } from '../components/projects/ProjectGalleryViewer';
import { ProjectLocationMap } from '../components/projects/ProjectLocationMap';
import {
  MapPin, Building, Calendar, IndianRupee, Layers, ShieldCheck,
  Download, Phone, Car, Share2, Sparkles, Check, CheckCircle2,
  FileText, Home, ArrowLeft
} from 'lucide-react';

export const ProjectDetailPage = ({ onOpenSiteVisit, onOpenEnquiry }) => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeFloorPlan, setActiveFloorPlan] = useState(0);

  useEffect(() => {
    projectService.getBySlug(slug)
      .then((data) => setProject(data))
      .catch((err) => console.error('Failed to load project details:', err))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-obsidian-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-obsidian-950 py-24 text-center space-y-4">
        <h2 className="font-serif text-3xl font-bold text-white">Project Not Found</h2>
        <p className="text-sm text-slate-400">The requested venture could not be located or has been archived.</p>
        <Link to="/projects" className="inline-block px-6 py-2.5 rounded-lg bg-gold-500 text-obsidian-950 font-bold text-xs">
          Return to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian-950 text-slate-100 pb-24">
      
      {/* 1. Hero Cover Banner */}
      <div className="relative h-[65vh] min-h-[450px] overflow-hidden bg-obsidian-950">
        <img
          src={project.coverImageUrl || project.gallery?.[0]?.url || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80'}
          alt={project.projectName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian-950/80 via-transparent to-transparent" />

        {/* Back Link */}
        <div className="absolute top-6 left-6 z-10">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/60 border border-white/10 text-xs font-semibold text-slate-200 hover:text-white backdrop-blur-md transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Projects</span>
          </Link>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="absolute bottom-8 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest text-gold-400 font-bold font-serif px-2.5 py-1 rounded bg-obsidian-950/80 border border-gold-500/30 backdrop-blur-md">
                  {project.propertyType}
                </span>
                <span className="text-xs uppercase tracking-wider text-emerald-300 font-semibold px-2.5 py-1 rounded bg-emerald-500/20 border border-emerald-500/30 backdrop-blur-md">
                  {project.status?.replace('_', ' ')}
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                {project.projectName}
              </h1>

              <div className="flex items-center gap-2 text-sm text-slate-300">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0" />
                <span>{project.location?.address || `${project.location?.area}, Hyderabad`}</span>
              </div>
            </div>

            {/* Price Card */}
            <div className="p-5 rounded-2xl bg-obsidian-900/90 border border-gold-500/30 backdrop-blur-md shadow-2xl text-right">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-medium">Starting Investment</span>
              <span className="font-serif text-2xl sm:text-3xl font-bold text-gold-300 block">
                {project.price?.priceDisplay || 'Price on Request'}
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">*Government taxes & registration extra</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Content (Left 2 cols) */}
          <div className="lg:col-span-2 space-y-14">
            
            {/* Project Overview Stats Grid */}
            <div className="p-6 rounded-2xl bg-obsidian-900 border border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div>
                <span className="text-slate-400 text-xs block mb-1">Developer</span>
                <span className="font-serif font-bold text-white text-sm block">{project.developer || 'Aurum Developments'}</span>
              </div>
              <div>
                <span className="text-slate-400 text-xs block mb-1">Land Parcel</span>
                <span className="font-serif font-bold text-white text-sm block">{project.landArea || '4.5 Acres'}</span>
              </div>
              <div>
                <span className="text-slate-400 text-xs block mb-1">Towers / Units</span>
                <span className="font-serif font-bold text-white text-sm block">{project.totalTowers || '3 Towers'} ({project.totalUnits} Units)</span>
              </div>
              <div>
                <span className="text-slate-400 text-xs block mb-1">Possession</span>
                <span className="font-serif font-bold text-white text-sm block">{project.possessionDate || 'Q4 2027'}</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h3 className="font-serif text-2xl font-bold text-white border-b border-white/10 pb-3">
                Architectural Concept & Vision
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-light">
                {project.description}
              </p>
              {project.tagline && (
                <div className="p-4 rounded-xl bg-gold-500/10 border-l-4 border-gold-500 text-xs font-serif italic text-gold-200">
                  "{project.tagline}"
                </div>
              )}
            </div>

            {/* Photo Gallery Viewer */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="font-serif text-2xl font-bold text-white">
                  Visual Gallery & Suites
                </h3>
                <span className="text-xs text-slate-400">Click photo to zoom in & view full-screen</span>
              </div>
              <ProjectGalleryViewer images={project.gallery || []} />
            </div>

            {/* Floor Plans Showcase */}
            {project.floorPlans && project.floorPlans.length > 0 && (
              <div className="space-y-6">
                <h3 className="font-serif text-2xl font-bold text-white border-b border-white/10 pb-3">
                  Unit Floor Plans & Specifications
                </h3>

                {/* Tab selector */}
                <div className="flex flex-wrap gap-2">
                  {project.floorPlans.map((fp, idx) => (
                    <button
                      key={fp.id || idx}
                      onClick={() => setActiveFloorPlan(idx)}
                      className={`text-xs font-semibold px-4 py-2 rounded-xl border transition-all ${
                        activeFloorPlan === idx
                          ? 'bg-gold-500 text-obsidian-950 border-gold-400 shadow-luxury'
                          : 'bg-obsidian-900 text-slate-300 border-white/10 hover:border-gold-500/30'
                      }`}
                    >
                      {fp.bhk} - {fp.superBuiltUpAreaSqFt} sq.ft
                    </button>
                  ))}
                </div>

                {/* Active floor plan view */}
                {project.floorPlans[activeFloorPlan] && (
                  <div className="p-6 rounded-2xl bg-obsidian-900 border border-white/10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="relative h-64 rounded-xl overflow-hidden bg-obsidian-950 border border-white/10">
                      <img
                        src={project.floorPlans[activeFloorPlan].imageUrl}
                        alt={project.floorPlans[activeFloorPlan].title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="space-y-4 text-xs">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-gold-400 font-semibold">Configuration</span>
                        <h4 className="font-serif text-xl font-bold text-white">{project.floorPlans[activeFloorPlan].title}</h4>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/10">
                        <div>
                          <span className="text-slate-400 block text-[10px]">Super Built-up Area</span>
                          <span className="font-bold text-white text-sm">{project.floorPlans[activeFloorPlan].superBuiltUpAreaSqFt} sq.ft</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">Carpet Area</span>
                          <span className="font-bold text-white text-sm">{project.floorPlans[activeFloorPlan].carpetAreaSqFt} sq.ft</span>
                        </div>
                      </div>

                      <div className="pt-2">
                        <span className="text-slate-400 block text-[10px]">Pricing Estimate</span>
                        <span className="font-serif font-bold text-gold-300 text-base">{project.floorPlans[activeFloorPlan].pricePlaceholder || 'Contact for price'}</span>
                      </div>

                      <button
                        onClick={() => onOpenEnquiry(project)}
                        className="w-full py-2.5 rounded-lg border border-gold-500/40 text-gold-300 font-semibold hover:bg-gold-500/10 text-xs"
                      >
                        Request Complete Floor Plan PDF
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Amenities Grid */}
            <div className="space-y-4">
              <h3 className="font-serif text-2xl font-bold text-white border-b border-white/10 pb-3">
                Curated Lifestyle Amenities
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {project.amenities?.map((amenity, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-obsidian-900 border border-white/5 flex items-center gap-2.5 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Location Map & Verified Landmarks */}
            <div className="space-y-4">
              <h3 className="font-serif text-2xl font-bold text-white border-b border-white/10 pb-3">
                Location & Connectivity Map
              </h3>
              <ProjectLocationMap project={project} />
            </div>

            {/* Regulatory RERA Verification Box */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-gold-500/30 space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2 text-gold-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>RERA Compliance & Title Transparency</span>
              </div>
              <p>
                <strong>RERA Registration:</strong> {project.reraNumber || 'P0240000XXXX (Placeholder - Demonstrative)'}
              </p>
              <p className="text-[11px] leading-relaxed">
                {project.reraDisclaimer || 'Information on this website is subject to change. Project availability, pricing, specifications, approvals and timelines should be independently verified before making a purchase or investment decision.'}
              </p>
            </div>

          </div>

          {/* Sticky Sidebar (Right 1 col) */}
          <div className="space-y-6">
            <div className="sticky top-28 space-y-6">
              
              {/* Action Box */}
              <div className="p-6 rounded-2xl bg-obsidian-900 border border-gold-500/30 shadow-2xl space-y-5">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold font-serif">
                    Direct Venture Access
                  </span>
                  <h3 className="font-serif text-xl font-bold text-white mt-1">
                    Book a Private Site Visit
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Experience this development firsthand with an expert relationship manager.
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => onOpenSiteVisit(project)}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian-950 font-bold text-xs uppercase tracking-wider shadow-luxury hover:from-gold-400 hover:to-gold-500 transition-all flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Schedule Guided Visit</span>
                  </button>

                  <button
                    onClick={() => onOpenEnquiry(project)}
                    className="w-full py-3.5 rounded-xl border border-gold-500/40 text-gold-300 font-semibold text-xs uppercase tracking-wider hover:bg-gold-500/10 transition-all flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Request Callback</span>
                  </button>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-2 text-xs text-slate-400">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Car className="w-4 h-4 text-gold-400" />
                    <span>Complimentary Chauffeur Transit Available</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <FileText className="w-4 h-4 text-gold-400" />
                    <span>Direct Developer Pricing & Payment Plans</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Zero Brokerage / Direct Developer Representative</span>
                  </div>
                </div>
              </div>

              {/* Direct Concierge Contact */}
              <div className="p-6 rounded-2xl bg-obsidian-900 border border-white/10 text-xs space-y-3">
                <span className="font-serif font-bold text-white text-sm block">Direct Concierge Desk</span>
                <p className="text-slate-400 leading-relaxed">
                  Have questions about payment milestones, customization, or high-floor allocations?
                </p>
                <div className="pt-1">
                  <a
                    href="tel:+919090104949"
                    className="font-mono text-gold-300 font-bold text-sm block hover:underline"
                  >
                    +91 9090104949
                  </a>
                  <span className="text-[11px] text-slate-300 block">concierge@hyderabadrealty.com</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
