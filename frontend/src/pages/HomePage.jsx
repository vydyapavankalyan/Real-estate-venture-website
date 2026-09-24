import React, { useState, useEffect } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { SEO } from '../components/common/SEO';
import { SEO_DATA } from '../components/common/SEOConfig';
import { SearchBar } from '../components/home/SearchBar';
import { ProjectCard } from '../components/projects/ProjectCard';
import { ServicesSection } from '../components/home/ServicesSection';
import { ValuesSection } from '../components/home/ValuesSection';
import { WhyInvestSection } from '../components/home/WhyInvestSection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { StatsCounter } from '../components/home/StatsCounter';
import { BankPartnersSection } from '../components/home/BankPartnersSection';
import { VirtualTourSection } from '../components/home/VirtualTourSection';
import { EmiRoiCalculator } from '../components/tools/EmiRoiCalculator';
import { projectService } from '../services/projectService';
import { ArrowRight, Sparkles, Building, Star, CheckCircle, Shield, Award, Phone, Video, Play } from 'lucide-react';
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
      <SEO {...SEO_DATA.home} />
      
      {/* 1. Hero Section */}
      <HeroSection onOpenSiteVisit={onOpenSiteVisit} onOpenEnquiry={onOpenEnquiry} />

      {/* 2. Interactive Search Bar */}
      <SearchBar />

      {/* ============================================================== */}
      {/* 🌟 3. FOURTH CITY MIRKHANPET UPCOMING SHOWCASE (REFERENCE WEB) */}
      {/* ============================================================== */}
      <section className="py-20 bg-gradient-to-b from-obsidian-950 via-obsidian-900 to-obsidian-950 border-y border-gold-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-obsidian-900 via-obsidian-850 to-obsidian-950 border-2 border-gold-500/30 shadow-luxury space-y-8">
            
            <div className="text-center space-y-2">
              <span className="text-xs font-serif uppercase tracking-widest text-gold-400 font-bold">
                Upcoming Projects — Rajan Castle Properties
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white">
                Strategic Location in Mirkhanpet & Telangana's Fourth City
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-gold-400 to-gold-600 mx-auto rounded-full mt-3" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-4 text-slate-300 text-sm leading-relaxed">
                <p>
                  Our upcoming flagship ventures are strategically located in <strong className="text-gold-400">Mirkhanpet</strong>, positioned closely to the <strong className="text-white">Young India Skill University</strong> and the <strong className="text-white">Amazon Data Center (₹5,809 Crores across 48+ acres)</strong>.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                    <span className="font-bold text-white block">🛣️ 200-Foot Road Facing</span>
                    <p className="text-slate-400">High-visibility frontage on government-sanctioned transit corridor.</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                    <span className="font-bold text-white block">⚡ 330-Foot Road Arterial</span>
                    <p className="text-slate-400">Regional connectivity link connecting Outer Ring Road to the Future City.</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                    <span className="font-bold text-white block">📍 300ft Greenfield Highway</span>
                    <p className="text-slate-400">Newly approved high-speed road from Raviryal direct to Meerkhanpet.</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                    <span className="font-bold text-white block">📈 Regional Ring Road (RRR)</span>
                    <p className="text-slate-400">Multi-lane express orbital stimulating unprecedented capital appreciation.</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={() => onOpenEnquiry && onOpenEnquiry({ message: 'Requesting allocation details for upcoming Mirkhanpet Fourth City projects' })}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian-950 font-bold text-xs uppercase tracking-wider shadow hover:from-gold-400 hover:to-gold-500 transition-all flex items-center gap-2"
                  >
                    <span>Register Priority Interest</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <Link
                    to="/properties"
                    className="px-5 py-3 rounded-xl bg-white/5 border border-white/15 text-white hover:text-gold-400 text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    View All Projects
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-gold-500/30 shadow-2xl bg-black">
                <img
                  src="https://www.rajan-castle-properties.net/lovable-uploads/9f109d9e-f8fa-4c04-9826-5c7d09a29871.png"
                  alt="Future City Development Master Plan"
                  className="w-full h-80 object-cover hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-obsidian-900/90 border border-white/10 backdrop-blur-md">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gold-400">Telangana Future City</span>
                  <h4 className="font-serif text-sm font-bold text-white">Mirkhanpet, Maheshwaram & Kadthal Hubs</h4>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 🌟 4. A PERSONAL MESSAGE FROM MR. RAJAN (FOUNDER SECTION)       */}
      {/* ============================================================== */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-obsidian-900 via-obsidian-900 to-obsidian-950 border border-gold-500/30 shadow-luxury">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-4 flex flex-col items-center text-center space-y-4">
              <div className="relative group">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-gold-400 to-gold-600 opacity-30 blur-md group-hover:opacity-60 transition duration-500" />
                <img
                  src="https://www.rajan-castle-properties.net/lovable-uploads/19fd2692-690a-4751-ab6b-2edd4890fbae.png"
                  alt="Mr. Katla Bhagyarajan"
                  className="relative w-48 sm:w-56 h-auto rounded-2xl shadow-xl object-cover border border-gold-500/40"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80';
                  }}
                />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-white">Mr. Katla Bhagyarajan</h3>
                <p className="text-xs text-gold-400 font-medium">Founder & Managing Director</p>
                <p className="text-[11px] text-slate-400">Rajan - Castle Properties</p>
              </div>
            </div>

            <div className="md:col-span-8 space-y-5 text-slate-300 text-sm leading-relaxed">
              <span className="text-xs font-serif uppercase tracking-widest text-gold-400 font-bold block">
                Founder's Perspective
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                A Personal Message to Friends, Investors & Customers
              </h2>

              <p className="italic font-serif text-gold-200/90 text-base">
                "After more than 16 years in the competitive private sector, I've developed a deep understanding of economic growth. Coming from a middle-class background, I'm well-acquainted with financial challenges and the importance of budgeting to meet family needs."
              </p>

              <p>
                "It's clear that we're currently spending too much on land acquisition compared to what we're earning from it. My vision is to create <strong>simpler, smaller, and smarter investment opportunities</strong> for my investors, channel partners and customers."
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/message"
                  className="px-6 py-3 rounded-xl bg-gold-500 text-obsidian-950 font-bold text-xs uppercase tracking-wider hover:bg-gold-400 transition-all shadow flex items-center gap-2"
                >
                  <span>Read Full Founder's Letter</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="tel:+919090104949"
                  className="flex items-center gap-2 text-xs text-white hover:text-gold-400 px-4 py-3 rounded-xl bg-white/5 border border-white/10 font-semibold transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-gold-400" />
                  <span>Call +91 9090104949</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Featured Projects Showcase */}
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
            to="/properties"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-400 hover:text-gold-300 transition-colors"
          >
            <span>View All Projects</span>
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

      {/* 6. Real Estate Services (From Reference Website) */}
      <ServicesSection />

      {/* 7. Articles & Video Hub Preview */}
      <section className="py-20 bg-obsidian-900 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-serif uppercase tracking-widest text-gold-400 font-bold block mb-1">
                Media & Articles
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                Hyderabad Development Vision & News
              </h2>
            </div>
            <Link
              to="/articles"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-400 hover:text-gold-300"
            >
              <span>View All Articles & Videos</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black">
              <iframe
                src="https://www.youtube.com/embed/dxKDwsEJbUI"
                title="Hyderabad Development Vision"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="space-y-4">
              <span className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold inline-block">
                Executive Video
              </span>
              <h3 className="font-serif text-2xl font-bold text-white">
                Hyderabad Development Vision - Video Overview
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Watch the comprehensive overview of Hyderabad's future development plans, urban master planning, and the Fourth City smart infrastructure expansion.
              </p>
              <Link
                to="/articles"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold-500 text-obsidian-950 font-bold text-xs uppercase tracking-wider hover:bg-gold-400 transition-all shadow"
              >
                <span>Read Development Articles</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Interactive ROI & EMI Calculator */}
      <EmiRoiCalculator onOpenEnquiry={onOpenEnquiry} onOpenSiteVisit={onOpenSiteVisit} />

      {/* 9. Core Values Section */}
      <ValuesSection />

      {/* 10. Why Invest Section */}
      <WhyInvestSection />

      {/* 11. Client Testimonials Section */}
      <TestimonialsSection onOpenEnquiry={onOpenEnquiry} onOpenSiteVisit={onOpenSiteVisit} />

      {/* 12. Animated Stats Counter */}
      <StatsCounter />

      {/* 13. Call to Action Banner */}
      <section className="py-20 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-700 text-obsidian-950 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6 relative z-10">
          <span className="text-xs uppercase tracking-widest font-bold text-obsidian-900/80 font-serif">
            Private Homebuyer & Investor Services
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-obsidian-950">
            Ready to Invest in Telangana's Future City?
          </h2>
          <p className="text-sm sm:text-base text-obsidian-900/90 max-w-2xl mx-auto font-medium">
            Schedule a private site viewing with complimentary luxury chauffeur service or connect directly with our advisory desk at +91 9090104949.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onOpenSiteVisit()}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-obsidian-950 text-white font-bold text-xs uppercase tracking-wider shadow-2xl hover:bg-obsidian-900 transition-all"
            >
              Book Guided Site Visit
            </button>
            <a
              href="tel:+919090104949"
              className="w-full sm:w-auto px-8 py-4 rounded-xl border-2 border-obsidian-950 text-obsidian-950 font-bold text-xs uppercase tracking-wider hover:bg-obsidian-950/10 transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call +91 9090104949</span>
            </a>
          </div>
        </div>
      </section>

      {/* Bank Partners & Home Loan Strip */}
      <BankPartnersSection />

      {/* Virtual Site Tour with YouTube Embed */}
      <VirtualTourSection />

    </div>
  );
};
