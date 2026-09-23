import React, { useState, useEffect } from 'react';
import { useLocation as useRouterLocation } from 'react-router-dom';
import { projectService } from '../services/projectService';
import { locationService } from '../services/allServices';
import { ProjectCard } from '../components/projects/ProjectCard';
import { Search, Filter, SlidersHorizontal, MapPin, Building, RotateCcw } from 'lucide-react';

export const ProjectsPage = ({ onOpenSiteVisit, onOpenEnquiry }) => {
  const routerLocation = useRouterLocation();
  const [projects, setProjects] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="space-y-2">
          <span className="text-xs font-serif uppercase tracking-widest text-gold-400 font-bold">
            Hyderabad Real Estate Portfolio
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white">
            Explore Premium Developments
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl">
            Filter through carefully verified high-rise residences, sky villas, and gated estates in Hyderabad's premier investment vectors.
          </p>
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
                  placeholder="Project name or developer..."
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
                <option value="">All Property Types</option>
                <option value="APARTMENT">Apartments / High-Rise</option>
                <option value="VILLA">Luxury Gated Villas</option>
                <option value="PLOT">Villa Plots</option>
                <option value="COMMERCIAL">Commercial Spaces</option>
              </select>
            </div>

            {/* Configuration */}
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-1">Configuration</label>
              <select
                value={filters.bhk}
                onChange={(e) => setFilters({ ...filters, bhk: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg bg-obsidian-950 border border-white/15 text-white focus:outline-none focus:border-gold-500"
              >
                <option value="">Any BHK</option>
                <option value="2 BHK">2 BHK</option>
                <option value="3 BHK">3 BHK</option>
                <option value="4 BHK">4 BHK</option>
                <option value="PENTHOUSE">Penthouse / Sky Mansion</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-1">Possession Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg bg-obsidian-950 border border-white/15 text-white focus:outline-none focus:border-gold-500"
              >
                <option value="">All Statuses</option>
                <option value="READY_TO_MOVE">Ready To Move</option>
                <option value="UNDER_CONSTRUCTION">Under Construction</option>
                <option value="UPCOMING">Upcoming / Pre-Launch</option>
              </select>
            </div>
          </div>

          {/* Bottom row of filter bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between pt-2 border-t border-white/10 gap-3 text-xs">
            <div className="flex items-center gap-3">
              <span className="text-slate-400 font-medium">
                Showing <strong className="text-white">{projects.length}</strong> of {totalElements} ventures
              </span>
              <button
                onClick={handleReset}
                className="flex items-center gap-1 text-slate-400 hover:text-gold-400 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <label className="text-slate-400">Sort By:</label>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                className="px-3 py-1.5 rounded-lg bg-obsidian-950 border border-white/15 text-white focus:outline-none focus:border-gold-500 text-xs"
              >
                <option value="featured">Featured First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="newest">Newest Additions</option>
              </select>
            </div>
          </div>
        </div>

        {/* Project Listings Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-96 rounded-2xl bg-obsidian-900 border border-white/5 animate-pulse" />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="p-16 rounded-2xl bg-obsidian-900 border border-white/10 text-center space-y-4">
            <Building className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="font-serif text-2xl font-bold text-white">No Properties Found</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              No ventures matched your selected criteria. Try resetting filters or exploring other corridors.
            </p>
            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-lg bg-gold-500 text-obsidian-950 font-bold text-xs"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-4">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpenSiteVisit={() => onOpenSiteVisit(project)}
                onOpenEnquiry={() => onOpenEnquiry(project)}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
