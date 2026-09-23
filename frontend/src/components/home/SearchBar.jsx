import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Building, IndianRupee, Layers, SlidersHorizontal } from 'lucide-react';
import { locationService } from '../../services/allServices';

export const SearchBar = () => {
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);
  const [filters, setFilters] = useState({
    location: '',
    propertyType: '',
    bhk: '',
    budget: '',
  });

  useEffect(() => {
    locationService.getAll().then((data) => {
      if (data && data.length > 0) {
        setLocations(data);
      } else {
        // Fallback list
        setLocations([
          { name: 'Kokapet' }, { name: 'Neopolis' }, { name: 'Financial District' },
          { name: 'Tellapur' }, { name: 'Narsingi' }, { name: 'Gachibowli' },
          { name: 'Shamshabad' }, { name: 'Mokila' }
        ]);
      }
    }).catch(() => {
      setLocations([
        { name: 'Kokapet' }, { name: 'Neopolis' }, { name: 'Financial District' },
        { name: 'Tellapur' }, { name: 'Narsingi' }
      ]);
    });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    if (filters.location) queryParams.set('location', filters.location);
    if (filters.propertyType) queryParams.set('propertyType', filters.propertyType);
    if (filters.bhk) queryParams.set('bhk', filters.bhk);
    if (filters.budget) {
      if (filters.budget === 'under-2') queryParams.set('maxPrice', '20000000');
      else if (filters.budget === '2-3.5') {
        queryParams.set('minPrice', '20000000');
        queryParams.set('maxPrice', '35000000');
      } else if (filters.budget === '3.5-5') {
        queryParams.set('minPrice', '35000000');
        queryParams.set('maxPrice', '50000000');
      } else if (filters.budget === 'above-5') {
        queryParams.set('minPrice', '50000000');
      }
    }
    navigate(`/projects?${queryParams.toString()}`);
  };

  return (
    <div className="relative -mt-10 sm:-mt-14 z-20 max-w-6xl mx-auto px-4 sm:px-6">
      <form
        onSubmit={handleSearch}
        className="p-4 sm:p-5 rounded-2xl bg-obsidian-900/95 border border-gold-500/30 backdrop-blur-xl shadow-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3"
      >
        {/* Location Dropdown */}
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-obsidian-950 border border-white/10 hover:border-gold-500/50 transition-colors">
          <MapPin className="w-4 h-4 text-gold-400 shrink-0" />
          <div className="w-full">
            <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Location</label>
            <select
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              className="w-full bg-transparent text-xs text-white focus:outline-none cursor-pointer"
            >
              <option value="" className="bg-obsidian-900">All Corridors</option>
              {locations.map((loc) => (
                <option key={loc.id || loc.name} value={loc.name} className="bg-obsidian-900">
                  {loc.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Property Type Dropdown */}
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-obsidian-950 border border-white/10 hover:border-gold-500/50 transition-colors">
          <Building className="w-4 h-4 text-gold-400 shrink-0" />
          <div className="w-full">
            <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Property Type</label>
            <select
              value={filters.propertyType}
              onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
              className="w-full bg-transparent text-xs text-white focus:outline-none cursor-pointer"
            >
              <option value="" className="bg-obsidian-900">All Types</option>
              <option value="APARTMENT" className="bg-obsidian-900">Apartments / High-Rise</option>
              <option value="VILLA" className="bg-obsidian-900">Luxury Gated Villas</option>
              <option value="PLOT" className="bg-obsidian-900">Premium Villa Plots</option>
              <option value="COMMERCIAL" className="bg-obsidian-900">Commercial / Office</option>
            </select>
          </div>
        </div>

        {/* Configuration / BHK */}
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-obsidian-950 border border-white/10 hover:border-gold-500/50 transition-colors">
          <Layers className="w-4 h-4 text-gold-400 shrink-0" />
          <div className="w-full">
            <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Configuration</label>
            <select
              value={filters.bhk}
              onChange={(e) => setFilters({ ...filters, bhk: e.target.value })}
              className="w-full bg-transparent text-xs text-white focus:outline-none cursor-pointer"
            >
              <option value="" className="bg-obsidian-900">Any Configuration</option>
              <option value="2 BHK" className="bg-obsidian-900">2 BHK Residences</option>
              <option value="3 BHK" className="bg-obsidian-900">3 BHK Luxury</option>
              <option value="4 BHK" className="bg-obsidian-900">4 BHK Presidential</option>
              <option value="PENTHOUSE" className="bg-obsidian-900">Penthouse / Sky Villa</option>
            </select>
          </div>
        </div>

        {/* Budget Dropdown */}
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-obsidian-950 border border-white/10 hover:border-gold-500/50 transition-colors">
          <IndianRupee className="w-4 h-4 text-gold-400 shrink-0" />
          <div className="w-full">
            <label className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Target Budget</label>
            <select
              value={filters.budget}
              onChange={(e) => setFilters({ ...filters, budget: e.target.value })}
              className="w-full bg-transparent text-xs text-white focus:outline-none cursor-pointer"
            >
              <option value="" className="bg-obsidian-900">Any Budget</option>
              <option value="under-2" className="bg-obsidian-900">Under ₹2.00 Cr</option>
              <option value="2-3.5" className="bg-obsidian-900">₹2.00 - ₹3.50 Cr</option>
              <option value="3.5-5" className="bg-obsidian-900">₹3.50 - ₹5.00 Cr</option>
              <option value="above-5" className="bg-obsidian-900">₹5.00 Cr+ (Ultra Luxury)</option>
            </select>
          </div>
        </div>

        {/* Submit Search Button */}
        <div className="flex items-center">
          <button
            type="submit"
            className="w-full h-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian-950 font-bold text-xs uppercase tracking-wider shadow-luxury hover:from-gold-400 hover:to-gold-500 transition-all flex items-center justify-center gap-2 group"
          >
            <Search className="w-4 h-4 stroke-[2.5]" />
            <span>Search</span>
          </button>
        </div>
      </form>
    </div>
  );
};
