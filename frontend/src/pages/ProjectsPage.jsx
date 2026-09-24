import React, { useState, useEffect } from 'react';
import { useLocation as useRouterLocation, Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { SEO_DATA } from '../components/common/SEOConfig';
import { SkeletonGrid } from '../components/common/Skeletons';
import { projectService } from '../services/projectService';
import { locationService } from '../services/allServices';
import { ProjectCard } from '../components/projects/ProjectCard';
import { Search, Filter, SlidersHorizontal, MapPin, Building, RotateCcw, Sparkles, CheckCircle2, ArrowRight, Calculator, LayoutGrid, List, Scale } from 'lucide-react';
import { useComparison } from '../context/ComparisonContext';

export const ProjectsPage = ({ onOpenSiteVisit, onOpenEnquiry }) => {
  const routerLocation = useRouterLocation();
  const [projects, setProjects] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const { toggleCompare, isComparing } = useComparison();

  // Filters state initialized from query params if present
  const queryParams = new URLSearchParams(routerLocation.search);
  const [filters, setFilters] = useState({
    query: queryParams.get('query') || '',
    location: queryParams.get('location') || '',
    propertyType: queryParams.get('propertyType') || '',
    bhk: queryParams.get('bhk') || '',
    status: queryParams.get('status') || '',
    minPrice: queryParams.get('minPrice') || '',
    maxPrice: queryParams.get('maxPrice') || '',
    sortBy: queryParams.get('sortBy') || 'featured',
  });

  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    locationService.getAll().then((data) => setLocations(data || []));
  }, []);

  const fetchProjects = () => {
    setLoading(true);
    const params = {};
    if (filters.query) params.query = filters.query;
    if (filters.location) params.location = filters.location;
    if (filters.propertyType) params.propertyType = filters.propertyType;
    if (filters.bhk) params.bhk = filters.bhk;
    if (filters.status) params.status = filters.status;
    if (filters.minPrice) params.minPrice = filters.minPrice;
    if (filters.maxPrice) params.maxPrice = filters.maxPrice;
    if (filters.sortBy) params.sortBy = filters.sortBy;

    projectService.search(params)
      .then((res) => {
        setProjects(res.content || []);
        setTotalElements(res.totalElements || 0);
      })
      .catch((err) => {
        console.error('Failed to search projects:', err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProjects();
  }, [filters.location, filters.propertyType, filters.bhk, filters.status, filters.sortBy]);

  const handleReset = () => {
    setFilters({
      query: '',
      location: '',
      propertyType: '',
      bhk: '',
      status: '',
      minPrice: '',
      maxPrice: '',
      sortBy: 'featured',
    });
  };

  return (
    <div className="min-h-screen bg-obsidian-950 py-12">
      <SEO {...SEO_DATA.projects} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="space-y-2">
          <span className="text-xs font-serif uppercase tracking-widest text-gold-400 font-bold">
            Real Estate Portfolio
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white">
            Projects & Future Investment Opportunities
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl">
            Explore exclusive developments across Hyderabad and the transformative Telangana Fourth City growth corridors.
          </p>
        </div>

        {/* ============================================================== */}
        {/* 🌟 FOURTH CITY & MIRKHANPET UPCOMING SHOWCASE (REFERENCE WEB)  */}
        {/* ============================================================== */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-obsidian-900 via-obsidian-850 to-obsidian-950 border-2 border-gold-500/30 shadow-luxury space-y-8">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-serif uppercase tracking-widest text-gold-400 font-bold">
              Flagship Announcement
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white">
              Upcoming Projects — Rajan Castle Properties
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-gold-400 to-gold-600 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Strategic Location Details */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2">
                  Strategic Location in Mirkhanpet (Fourth City)
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Our upcoming landmark projects will be strategically located in <strong className="text-gold-400 font-bold">Mirkhanpet</strong>, positioned closely to the <strong className="text-gold-400 font-bold">Skill University</strong> and the <strong className="text-gold-400 font-bold">Amazon Data Center</strong>.
                </p>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-200">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="w-2 h-2 rounded-full bg-gold-400 mt-1.5 shrink-0" />
                  <p>
                    <strong className="text-white">200-foot road facing</strong> — Prime location with maximum visibility and high-speed accessibility.
                  </p>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="w-2 h-2 rounded-full bg-gold-400 mt-1.5 shrink-0" />
                  <p>
                    <strong className="text-white">330-foot road connectivity</strong> — Government-approved arterial infrastructure ensuring seamless regional transport.
                  </p>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="w-2 h-2 rounded-full bg-gold-400 mt-1.5 shrink-0" />
                  <p>
                    <strong className="text-white">Future-ready investment</strong> — Positioned at the epicentre of Telangana's emerging Fourth City across Mirkhanpet, Maheshwaram, and Kadthal.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onOpenEnquiry && onOpenEnquiry({ message: 'Requesting allocation details and priority booking for upcoming Mirkhanpet Fourth City projects' })}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian-950 font-bold text-xs uppercase tracking-wider shadow hover:from-gold-400 hover:to-gold-500 transition-all flex items-center gap-2"
                >
                  <span>Register Priority Interest</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="tel:+919090104949"
                  className="px-5 py-3 rounded-xl bg-white/5 border border-white/15 text-white hover:text-gold-400 text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  Direct Call: +91 9090104949
                </a>
              </div>
            </div>

            {/* Right: Key Advantages Cards */}
            <div className="lg:col-span-5 space-y-3.5">
              <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-gold-400 mb-2">
                Key Strategic Advantages
              </h4>

              <div className="p-4 rounded-2xl bg-black/40 border border-gold-500/20 space-y-1">
                <span className="font-bold text-white text-sm block">📍 Prime Location</span>
                <p className="text-xs text-slate-400">
                  Close proximity to major educational hubs, Rajiv Gandhi International Airport, and Outer Ring Road.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-gold-500/20 space-y-1">
                <span className="font-bold text-white text-sm block">🛣️ Superior Connectivity</span>
                <p className="text-xs text-slate-400">
                  Newly constructed 300ft greenfield highway from Raviryal to Meerkhanpet plus proposed Regional Ring Road (RRR).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-gold-500/20 space-y-1">
                <span className="font-bold text-white text-sm block">💼 High-Capital Economic Drivers</span>
                <p className="text-xs text-slate-400">
                  Amazon Data Center proposed over 48+ acres with ₹5,809 Crores investment & Young India Skill University.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-6 rounded-2xl bg-obsidian-900 border border-white/10 space-y-4 shadow-luxury">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            
            {/* Search input */}
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-1">Keywords</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Project name, corridor..."
                  value={filters.query}
                  onChange={(e) => setFilters({ ...filters, query: e.target.value })}
                  onKeyDown={(e) => e.key === 'Enter' && fetchProjects()}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-obsidian-950 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-gold-500"
                />
              </div>
            </div>

            {/* Location Corridor */}
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-1">Growth Corridor</label>
              <select
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg bg-obsidian-950 border border-white/15 text-white focus:outline-none focus:border-gold-500"
              >
                <option value="">All Corridors</option>
                {locations.map((loc) => (
                  <option key={loc.id || loc.name} value={loc.name}>
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Property Type */}
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-1">Property Type</label>
              <select
                value={filters.propertyType}
                onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg bg-obsidian-950 border border-white/15 text-white focus:outline-none focus:border-gold-500"
              >
                <option value="">All Types</option>
                <option value="APARTMENT">Sky Apartments</option>
                <option value="VILLA">Gated Villas</option>
                <option value="PLOT">Open Plots / Townships</option>
                <option value="COMMERCIAL">Commercial / Mixed Use</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-1">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg bg-obsidian-950 border border-white/15 text-white focus:outline-none focus:border-gold-500"
              >
                <option value="">All Statuses</option>
                <option value="UNDER_CONSTRUCTION">Under Construction</option>
                <option value="READY_TO_MOVE">Ready To Move</option>
                <option value="UPCOMING">Upcoming / New Launch</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-1">Sort By</label>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg bg-obsidian-950 border border-white/15 text-white focus:outline-none focus:border-gold-500"
              >
                <option value="featured">Featured First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>

          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between pt-2 border-t border-white/5">
            <span className="text-xs text-slate-400">
              Showing <strong className="text-white">{projects.length}</strong> of {totalElements} properties
            </span>
            <div className="flex items-center gap-3">
              {/* View Switcher */}
              <div className="flex items-center gap-1 p-1 bg-obsidian-950 border border-white/10 rounded-lg">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-md transition-colors ${
                    viewMode === 'grid' ? 'bg-gold-500 text-obsidian-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Card Grid View"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-md transition-colors ${
                    viewMode === 'list' ? 'bg-gold-500 text-obsidian-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Compact Investor Portfolio View"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={handleReset}
                className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
              <button
                onClick={fetchProjects}
                className="px-5 py-2 rounded-lg bg-gold-500 text-obsidian-950 font-bold text-xs uppercase tracking-wider hover:bg-gold-400 transition-colors shadow"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        {/* Projects Listing */}
        {loading ? (
          <SkeletonGrid count={6} />
        ) : projects.length === 0 ? (
          <div className="text-center py-20 bg-obsidian-900/50 rounded-2xl border border-white/5 space-y-4">
            <Building className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="font-serif text-xl font-bold text-white">No properties matched your criteria</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Try adjusting your corridor filters or reset your search parameters to view our complete portfolio.
            </p>
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpenSiteVisit={() => onOpenSiteVisit(project)}
                onOpenEnquiry={() => onOpenEnquiry(project)}
              />
            ))}
          </div>
        ) : (
          /* Compact Investor Portfolio View */
          <div className="bg-obsidian-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-obsidian-950/80 text-[10px] uppercase font-serif tracking-widest text-gold-400 border-b border-white/10">
                  <tr>
                    <th className="py-4 px-5">Venture / Project</th>
                    <th className="py-4 px-5">Corridor / Location</th>
                    <th className="py-4 px-5">Type</th>
                    <th className="py-4 px-5">Starting Price</th>
                    <th className="py-4 px-5">Scale / Land</th>
                    <th className="py-4 px-5">Possession</th>
                    <th className="py-4 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {projects.map((project) => (
                    <tr key={project.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <img
                            src={project.coverImageUrl || project.gallery?.[0]?.url || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=100&q=80'}
                            alt={project.projectName}
                            className="w-12 h-10 rounded-lg object-cover shrink-0"
                          />
                          <div>
                            <Link to={`/projects/${project.slug}`} className="font-serif font-bold text-white hover:text-gold-300 text-sm block">
                              {project.projectName}
                            </Link>
                            <span className="text-[10px] text-slate-500 font-mono">
                              RERA: {project.reraNumber || 'Verified'}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-5 font-medium text-slate-200">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                          <span>{project.location?.area || 'Hyderabad'}</span>
                        </div>
                      </td>
                      <td className="py-4 px-5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white/5 border border-white/10 text-slate-300">
                          {project.propertyType}
                        </span>
                      </td>
                      <td className="py-4 px-5 font-serif font-bold text-gold-300 text-sm">
                        {project.price?.priceDisplay || 'Price on Request'}
                      </td>
                      <td className="py-4 px-5 text-slate-400">
                        {project.landArea || 'Strategic Acreage'}
                      </td>
                      <td className="py-4 px-5 text-slate-300">
                        {project.possessionDate || 'Immediate'}
                      </td>
                      <td className="py-4 px-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => toggleCompare(project)}
                            className={`p-1.5 rounded-lg border text-xs transition-colors ${
                              isComparing(project)
                                ? 'bg-gold-500 text-obsidian-950 border-gold-500 font-bold'
                                : 'text-slate-400 hover:text-white border-white/10 hover:border-white/20'
                            }`}
                            title="Compare"
                          >
                            <Scale className="w-3.5 h-3.5" />
                          </button>
                          <Link
                            to={`/projects/${project.slug}`}
                            className="px-3 py-1.5 rounded-lg border border-white/15 text-slate-300 hover:text-white hover:border-gold-400/50 text-xs font-semibold transition-colors"
                          >
                            Details
                          </Link>
                          <button
                            onClick={() => onOpenSiteVisit(project)}
                            className="px-3 py-1.5 rounded-lg bg-gold-500 text-obsidian-950 font-bold text-xs uppercase tracking-wider hover:bg-gold-400 transition-colors"
                          >
                            Visit
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Investment ROI & EMI Tool Banner */}
        <div className="mt-14 p-8 rounded-3xl bg-gradient-to-r from-obsidian-900 via-obsidian-850 to-obsidian-900 border border-gold-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-luxury">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 shrink-0">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white">Plan Your Investment: Home Loan EMI & Fourth City ROI</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Simulate potential capital appreciation in Mirkhanpet & Maheshwaram or estimate monthly loan installments.
              </p>
            </div>
          </div>

          <Link
            to="/calculator"
            className="px-6 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-obsidian-950 font-bold text-xs uppercase tracking-wider transition-all shadow flex items-center gap-2 shrink-0"
          >
            <span>Launch Financial Calculator</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
};
