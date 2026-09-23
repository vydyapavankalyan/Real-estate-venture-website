import React, { useState, useEffect } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { SearchBar } from '../components/home/SearchBar';
import { ProjectCard } from '../components/projects/ProjectCard';
import { ServicesSection } from '../components/home/ServicesSection';
import { ValuesSection } from '../components/home/ValuesSection';
import { WhyInvestSection } from '../components/home/WhyInvestSection';
import { projectService } from '../services/projectService';
import { ArrowRight, Sparkles, Building, Star, CheckCircle, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HomePage = ({ onOpenSiteVisit, onOpenEnquiry }) => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    projectService.getFeatured()
      .then((data) => {
        setFeaturedProjects(data || []);
      })
      .catch((err) => {
        console.error('Error fetching featured projects:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-0">
      
      {/* 1. Hero Section */}
      <HeroSection onOpenSiteVisit={onOpenSiteVisit} onOpenEnquiry={onOpenEnquiry} />

      {/* 2. Interactive Search Bar */}
      <SearchBar />

      {/* 3. Featured Projects Showcase */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <span className="text-xs font-serif uppercase tracking-widest text-gold-400 font-bold block mb-1">
              Curated Portfolio
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Featured Real Estate Ventures
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Architecturally distinctive developments offering panoramic vantage points, ultra-luxury clubhouses, and RERA transparency.
            </p>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-400 hover:text-gold-300 transition-colors"
          >
            <span>View All Ventures</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-96 rounded-2xl bg-obsidian-900 border border-white/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpenSiteVisit={() => onOpenSiteVisit(project)}
                onOpenEnquiry={() => onOpenEnquiry(project)}
              />
            ))}
          </div>
        )}
      </section>

      {/* 4. Real Estate Services (From Reference Website) */}
      <ServicesSection />

      {/* 5. Hyderabad: Building The Future Teaser */}
      <section className="py-24 bg-gradient-to-b from-obsidian-950 via-obsidian-900 to-obsidian-950 border-t border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <span className="text-xs font-serif uppercase tracking-widest text-gold-400 font-bold">
                Infrastructure & Vision
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
                Hyderabad: Building The Future State
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                From the 31-km Airport Express Metro and the 340-km Regional Ring Road (RRR) to the 500-acre Neopolis Central Business District and Telangana AI City, Hyderabad is rapidly building South Asia's most sophisticated urban growth machine.
              </p>
              
              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <strong className="text-white">Three Development Rings:</strong> Master-planned concentric development targeting urban core, semi-urban growth corridors, and regional satellite towns.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <strong className="text-white">Neopolis & Trump Tower Hub:</strong> 65-story skyscraper zoning with integrated subterranean utility networks.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <strong className="text-white">Authoritative Milestone Tracking:</strong> Every project cataloged with official government source citations and verified timeline indicators.
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/future-development"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian-950 font-bold text-xs uppercase tracking-wider shadow-luxury hover:from-gold-400 hover:to-gold-500 transition-all"
                >
                  <span>Explore Infrastructure Tracker</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Visual preview card */}
            <div className="relative rounded-2xl overflow-hidden border border-gold-500/30 shadow-2xl bg-obsidian-950 group">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
                alt="Neopolis Skyscraper Corridor"
                className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-obsidian-900/90 border border-white/10 backdrop-blur-md">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-gold-400">Master Plan Feature</span>
                <h4 className="font-serif text-lg font-bold text-white mt-0.5">Neopolis CBD & High-Density Corridors</h4>
                <p className="text-xs text-slate-300 mt-1">Source: Telangana HMDA & Infrastructure Development Authority 2024-2030</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Core Values Section (From Reference Website) */}
      <ValuesSection />

      {/* 7. Why Invest Section */}
      <WhyInvestSection />

      {/* 8. Call to Action Banner */}
      <section className="py-20 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-700 text-obsidian-950 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6 relative z-10">
          <span className="text-xs uppercase tracking-widest font-bold text-obsidian-900/80 font-serif">
            Private Homebuyer & Investor Services
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-obsidian-950">
            Ready to Experience Hyderabad's Finest Residences?
          </h2>
          <p className="text-sm sm:text-base text-obsidian-900/90 max-w-2xl mx-auto font-medium">
            Schedule a private guided viewing with complimentary luxury chauffeur service or request developer pricing and brochures today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onOpenSiteVisit()}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-obsidian-950 text-white font-bold text-xs uppercase tracking-wider shadow-2xl hover:bg-obsidian-900 transition-all"
            >
              Book Guided Site Visit
            </button>
            <button
              onClick={() => onOpenEnquiry()}
              className="w-full sm:w-auto px-8 py-4 rounded-xl border-2 border-obsidian-950 text-obsidian-950 font-bold text-xs uppercase tracking-wider hover:bg-obsidian-950/10 transition-all"
            >
              Request Developer Callback
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
