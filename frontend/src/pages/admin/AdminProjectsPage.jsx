import React, { useState, useEffect } from 'react';
import { projectService } from '../../services/projectService';
import { Plus, Trash2, Edit, Eye, EyeOff, Building, MapPin, IndianRupee, X, Check } from 'lucide-react';

export const AdminProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const [formData, setFormData] = useState({
    projectName: '',
    developer: 'Aurum Hyderabad Developments',
    area: 'Kokapet',
    address: 'Golden Mile Road, Sector 3, Kokapet',
    latitude: 17.3890,
    longitude: 78.3280,
    propertyType: 'APARTMENT',
    configurations: '3 BHK, 4 BHK',
    startingFrom: 21000000,
    priceDisplay: 'Starting from ₹2.10 Cr*',
    status: 'UNDER_CONSTRUCTION',
    reraNumber: 'P0240000XXXX (Placeholder)',
    description: '',
    landArea: '4.5 Acres',
    totalUnits: 320,
    totalTowers: '3 Towers (G+45 Floors)',
    possessionDate: 'December 2027',
    coverImageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=80',
    amenities: '50,000 sq.ft Clubhouse, Infinity Sky Pool, Padel Court, EV Bays, Spa',
    featured: true,
    published: true,
  });

  const loadProjects = () => {
    setLoading(true);
    projectService.search({ size: 50 })
      .then((res) => setProjects(res.content || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleOpenCreate = () => {
    setEditingProject(null);
    setFormData({
      projectName: '',
      developer: 'Aurum Hyderabad Developments',
      area: 'Kokapet',
      address: 'Golden Mile Road, Kokapet',
      latitude: 17.3890,
      longitude: 78.3280,
      propertyType: 'APARTMENT',
      configurations: '3 BHK, 4 BHK',
      startingFrom: 21000000,
      priceDisplay: 'Starting from ₹2.10 Cr*',
      status: 'UNDER_CONSTRUCTION',
      reraNumber: 'P0240000XXXX (Placeholder)',
      description: 'Luxury high-rise residence featuring panoramic 270-degree balconies.',
      landArea: '4.5 Acres',
      totalUnits: 320,
      totalTowers: '3 Towers (G+45)',
      possessionDate: 'December 2027',
      coverImageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=80',
      amenities: 'Clubhouse, Sky Pool, Padel Court, Gym, EV Bays',
      featured: true,
      published: true,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (project) => {
    setEditingProject(project);
    setFormData({
      projectName: project.projectName || '',
      developer: project.developer || '',
      area: project.location?.area || 'Kokapet',
      address: project.location?.address || '',
      latitude: project.location?.latitude || 17.3890,
      longitude: project.location?.longitude || 78.3280,
      propertyType: project.propertyType || 'APARTMENT',
      configurations: project.configurations ? project.configurations.join(', ') : '',
      startingFrom: project.price?.startingFrom || 20000000,
      priceDisplay: project.price?.priceDisplay || '',
      status: project.status || 'UNDER_CONSTRUCTION',
      reraNumber: project.reraNumber || '',
      description: project.description || '',
      landArea: project.landArea || '',
      totalUnits: project.totalUnits || 0,
      totalTowers: project.totalTowers || '',
      possessionDate: project.possessionDate || '',
      coverImageUrl: project.coverImageUrl || '',
      amenities: project.amenities ? project.amenities.join(', ') : '',
      featured: project.featured,
      published: project.published,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      projectName: formData.projectName,
      developer: formData.developer,
      location: {
        area: formData.area,
        city: 'Hyderabad',
        state: 'Telangana',
        address: formData.address,
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
      },
      propertyType: formData.propertyType,
      configurations: formData.configurations.split(',').map(s => s.trim()).filter(Boolean),
      price: {
        startingFrom: parseInt(formData.startingFrom),
        maxPrice: parseInt(formData.startingFrom) * 2,
        priceDisplay: formData.priceDisplay,
        currency: 'INR',
      },
      status: formData.status,
      reraNumber: formData.reraNumber,
      description: formData.description,
      landArea: formData.landArea,
      totalUnits: parseInt(formData.totalUnits),
      totalTowers: formData.totalTowers,
      possessionDate: formData.possessionDate,
      coverImageUrl: formData.coverImageUrl,
      amenities: formData.amenities.split(',').map(s => s.trim()).filter(Boolean),
      featured: formData.featured,
      published: formData.published,
    };

    try {
      if (editingProject) {
        await projectService.update(editingProject.id, payload);
      } else {
        await projectService.create(payload);
      }
      setModalOpen(false);
      loadProjects();
    } catch (err) {
      alert('Failed to save project: ' + (err.message || err));
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete venture "${name}"?`)) {
      try {
        await projectService.delete(id);
        loadProjects();
      } catch (err) {
        alert('Failed to delete: ' + (err.message || err));
      }
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn text-xs">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-gold-400 font-mono font-semibold">Inventory Manager</span>
          <h1 className="font-serif text-2xl font-bold text-white mt-0.5">Real Estate Ventures & Projects</h1>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian-950 font-bold uppercase tracking-wider text-xs shadow hover:from-gold-400 hover:to-gold-500 transition-all flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Venture</span>
        </button>
      </div>

      {/* Projects Table */}
      <div className="rounded-2xl bg-obsidian-900 border border-white/10 overflow-hidden shadow-2xl">
        <table className="w-full text-left">
          <thead className="bg-obsidian-950 text-[10px] uppercase text-slate-400 border-b border-white/10">
            <tr>
              <th className="p-4">Venture Name</th>
              <th className="p-4">Corridor</th>
              <th className="p-4">Type</th>
              <th className="p-4">Starting Price</th>
              <th className="p-4">Status</th>
              <th className="p-4">Live</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {projects.map((p) => (
              <tr key={p.id} className="hover:bg-white/[0.02]">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={p.coverImageUrl || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=200&q=80'}
                      alt=""
                      className="w-10 h-10 rounded-lg object-cover bg-obsidian-950"
                    />
                    <div>
                      <span className="font-serif font-bold text-white block text-sm">{p.projectName}</span>
                      <span className="text-[10px] text-slate-400">{p.developer}</span>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-slate-300 font-medium">{p.location?.area}</td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] uppercase font-semibold text-slate-300">
                    {p.propertyType}
                  </span>
                </td>
                <td className="p-4 font-mono font-semibold text-gold-300">
                  {p.price?.priceDisplay || '₹--'}
                </td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-gold-500/20 text-gold-300 border border-gold-500/30">
                    {p.status?.replace('_', ' ')}
                  </span>
                </td>
                <td className="p-4">
                  {p.published ? (
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-semibold">
                      <Eye className="w-3 h-3" /> Live
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] text-slate-500 font-semibold">
                      <EyeOff className="w-3 h-3" /> Draft
                    </span>
                  )}
                </td>
                <td className="p-4 text-right space-x-2">
                  <button
                    onClick={() => handleOpenEdit(p)}
                    className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white"
                    title="Edit Venture"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(p.id, p.projectName)}
                    className="p-1.5 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-300"
                    title="Delete Venture"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Create / Edit */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-obsidian-900 border border-gold-500/30 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-serif text-xl font-bold text-white">
                {editingProject ? `Edit Venture: ${editingProject.projectName}` : 'Add New Real Estate Venture'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-1.5 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Venture Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.projectName}
                    onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-obsidian-950 border border-white/15 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Developer *</label>
                  <input
                    type="text"
                    required
                    value={formData.developer}
                    onChange={(e) => setFormData({ ...formData, developer: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-obsidian-950 border border-white/15 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Growth Corridor *</label>
                  <select
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-obsidian-950 border border-white/15 text-white"
                  >
                    <option value="Kokapet">Kokapet</option>
                    <option value="Neopolis">Neopolis</option>
                    <option value="Financial District">Financial District</option>
                    <option value="Tellapur">Tellapur</option>
                    <option value="Narsingi">Narsingi</option>
                    <option value="Mokila">Mokila</option>
                    <option value="Shamshabad">Shamshabad</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Property Type *</label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-obsidian-950 border border-white/15 text-white"
                  >
                    <option value="APARTMENT">Apartment</option>
                    <option value="VILLA">Villa</option>
                    <option value="PLOT">Plot</option>
                    <option value="COMMERCIAL">Commercial</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Status *</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-obsidian-950 border border-white/15 text-white"
                  >
                    <option value="UNDER_CONSTRUCTION">Under Construction</option>
                    <option value="READY_TO_MOVE">Ready To Move</option>
                    <option value="UPCOMING">Upcoming / Pre-Launch</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Starting Price (INR Number) *</label>
                  <input
                    type="number"
                    required
                    value={formData.startingFrom}
                    onChange={(e) => setFormData({ ...formData, startingFrom: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-obsidian-950 border border-white/15 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Price Display Text *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Starting from ₹2.10 Cr*"
                    value={formData.priceDisplay}
                    onChange={(e) => setFormData({ ...formData, priceDisplay: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-obsidian-950 border border-white/15 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">Cover Image URL</label>
                <input
                  type="text"
                  value={formData.coverImageUrl}
                  onChange={(e) => setFormData({ ...formData, coverImageUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-obsidian-950 border border-white/15 text-white font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">Amenities (Comma separated)</label>
                <input
                  type="text"
                  value={formData.amenities}
                  onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-obsidian-950 border border-white/15 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">Description</label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-obsidian-950 border border-white/15 text-white"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 accent-gold-500"
                  />
                  <span>Featured On Homepage</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="w-4 h-4 accent-gold-500"
                  />
                  <span>Publish Live</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-white/15 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-gold-500 text-obsidian-950 font-bold"
                >
                  Save Venture
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
