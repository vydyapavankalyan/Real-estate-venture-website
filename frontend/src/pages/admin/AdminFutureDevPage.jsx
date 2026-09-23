import React, { useState, useEffect } from 'react';
import { futureDevService } from '../../services/allServices';
import { Plus, Edit, Trash2, Train, ExternalLink, X, MapPin } from 'lucide-react';

export const AdminFutureDevPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'METRO',
    zone: 'WEST',
    locationName: '',
    latitude: 17.3890,
    longitude: 78.3280,
    description: '',
    impactSummary: '',
    status: 'UNDER_CONSTRUCTION',
    expectedTimeline: '2026 - 2028',
    sourceReference: 'HMDA & HMR Master Plan',
    lastUpdatedDate: 'September 2026',
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=80',
    keyHighlights: 'High-speed corridor, 31 km length, 4 intermediate stations',
    verified: true,
  });

  const loadItems = () => {
    setLoading(true);
    futureDevService.getAll()
      .then((data) => setItems(data || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      category: 'METRO',
      zone: 'WEST',
      locationName: 'Raidurg to RGIA via Financial District',
      latitude: 17.3750,
      longitude: 78.3600,
      description: '',
      impactSummary: '',
      status: 'UNDER_CONSTRUCTION',
      expectedTimeline: '2026 - 2028',
      sourceReference: 'Telangana Infrastructure Bulletin',
      lastUpdatedDate: 'September 2026',
      imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=80',
      keyHighlights: 'Phase 2 Expansion, Direct airport linkage',
      verified: true,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      category: item.category,
      zone: item.zone,
      locationName: item.locationName,
      latitude: item.latitude,
      longitude: item.longitude,
      description: item.description,
      impactSummary: item.impactSummary,
      status: item.status,
      expectedTimeline: item.expectedTimeline,
      sourceReference: item.sourceReference,
      lastUpdatedDate: item.lastUpdatedDate,
      imageUrl: item.imageUrl,
      keyHighlights: item.keyHighlights ? item.keyHighlights.join(', ') : '',
      verified: item.verified,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      keyHighlights: formData.keyHighlights.split(',').map(s => s.trim()).filter(Boolean),
    };

    try {
      if (editingItem) {
        await futureDevService.update(editingItem.id, payload);
      } else {
        await futureDevService.create(payload);
      }
      setModalOpen(false);
      loadItems();
    } catch (err) {
      alert('Failed to save development milestone');
    }
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Delete milestone "${title}"?`)) {
      try {
        await futureDevService.delete(id);
        loadItems();
      } catch (err) {
        alert('Failed to delete');
      }
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn text-xs">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-gold-400 font-mono font-semibold">Infrastructure CMS</span>
          <h1 className="font-serif text-2xl font-bold text-white mt-0.5">Hyderabad Growth Milestones</h1>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian-950 font-bold uppercase tracking-wider text-xs shadow hover:from-gold-400 hover:to-gold-500 transition-all flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add Infrastructure Milestone</span>
        </button>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-obsidian-900 border border-white/10 overflow-hidden shadow-2xl">
        <table className="w-full text-left">
          <thead className="bg-obsidian-950 text-[10px] uppercase text-slate-400 border-b border-white/10">
            <tr>
              <th className="p-4">Project / Milestone</th>
              <th className="p-4">Category & Zone</th>
              <th className="p-4">Status</th>
              <th className="p-4">Timeline</th>
              <th className="p-4">Verified Source</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-white/[0.02]">
                <td className="p-4">
                  <span className="font-bold text-white text-sm block">{item.title}</span>
                  <span className="text-[10px] text-slate-400">{item.locationName}</span>
                </td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] uppercase font-semibold text-slate-300 mr-1.5">
                    {item.category}
                  </span>
                  <span className="text-[10px] text-gold-400">{item.zone}</span>
                </td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-gold-500/20 text-gold-300 border border-gold-500/30">
                    {item.status?.replace('_', ' ')}
                  </span>
                </td>
                <td className="p-4 font-mono text-slate-200">{item.expectedTimeline}</td>
                <td className="p-4 text-slate-400 truncate max-w-xs">{item.sourceReference}</td>
                <td className="p-4 text-right space-x-2">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id, item.title)}
                    className="p-1.5 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-300"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-obsidian-900 border border-gold-500/30 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-serif text-xl font-bold text-white">
                {editingItem ? `Edit Milestone: ${editingItem.title}` : 'Add Infrastructure Project'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-1.5 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-slate-300 mb-1 font-medium">Milestone Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-obsidian-950 border border-white/15 text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-obsidian-950 border border-white/15 text-white"
                  >
                    <option value="METRO">Metro Expansion</option>
                    <option value="ROADWAYS">Roadways & Expressways</option>
                    <option value="IT_SEZ">IT & Commercial CBD</option>
                    <option value="DATA_CENTERS">AI & Data Centers</option>
                    <option value="PHARMA_LIFE_SCIENCES">Pharma & Life Sciences</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Zone *</label>
                  <select
                    value={formData.zone}
                    onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-obsidian-950 border border-white/15 text-white"
                  >
                    <option value="WEST">West Hyderabad</option>
                    <option value="SOUTH">South Hyderabad</option>
                    <option value="REGIONAL">Regional Arc (RRR)</option>
                    <option value="CENTRAL">Central Core</option>
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
                    <option value="UNDER_PLANNING">Under Planning</option>
                    <option value="OPERATIONAL">Operational</option>
                    <option value="ANNOUNCED">Announced</option>
                    <option value="PROPOSED">Proposed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Location Corridor Name</label>
                  <input
                    type="text"
                    value={formData.locationName}
                    onChange={(e) => setFormData({ ...formData, locationName: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-obsidian-950 border border-white/15 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Expected Timeline *</label>
                  <input
                    type="text"
                    required
                    value={formData.expectedTimeline}
                    onChange={(e) => setFormData({ ...formData, expectedTimeline: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-obsidian-950 border border-white/15 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Verified Source / Reference *</label>
                  <input
                    type="text"
                    required
                    value={formData.sourceReference}
                    onChange={(e) => setFormData({ ...formData, sourceReference: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-obsidian-950 border border-white/15 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Last Updated Date</label>
                  <input
                    type="text"
                    value={formData.lastUpdatedDate}
                    onChange={(e) => setFormData({ ...formData, lastUpdatedDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-obsidian-950 border border-white/15 text-white"
                  />
                </div>
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
                  Save Milestone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
