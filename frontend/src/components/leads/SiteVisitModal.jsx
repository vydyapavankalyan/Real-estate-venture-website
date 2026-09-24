import React, { useState } from 'react';
import { X, Calendar, Clock, Users, Car, CheckCircle2, Shield, Building2 } from 'lucide-react';
import { siteVisitService } from '../../services/allServices';

export const SiteVisitModal = ({ isOpen, onClose, projects = [], preselectedProject = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    projectId: preselectedProject?.id || (projects[0]?.id || ''),
    projectName: preselectedProject?.projectName || (projects[0]?.projectName || 'Skyline Heights'),
    preferredDate: '',
    preferredTimeSlot: '11:00 AM - 01:00 PM',
    numberOfVisitors: 2,
    transportationRequired: false,
    pickupAddress: '',
    specialRequests: '',
  });

  const [loading, setLoading] = useState(false);
  const [confirmedCode, setConfirmedCode] = useState(null);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleProjectChange = (e) => {
    const selected = projects.find(p => p.id === e.target.value);
    setFormData({
      ...formData,
      projectId: e.target.value,
      projectName: selected ? selected.projectName : formData.projectName,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await siteVisitService.book(formData);
      setConfirmedCode(res.data?.visitCode || 'VISIT-CONFIRMED');
    } catch (err) {
      setError(err?.message || 'Failed to book site visit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setConfirmedCode(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-obsidian-900 border border-gold-500/30 rounded-2xl shadow-2xl p-6 sm:p-8 animate-fadeIn">
        
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmedCode ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-white">Site Visit Confirmed</h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              Your guided experience to <span className="text-gold-300 font-semibold">{formData.projectName}</span> on <span className="text-white font-medium">{formData.preferredDate}</span> ({formData.preferredTimeSlot}) has been registered.
            </p>
            <div className="inline-block px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-gold-400">
              Pass / Booking ID: {confirmedCode}
            </div>
            {formData.transportationRequired && (
              <p className="text-xs text-emerald-400 flex items-center justify-center gap-1.5">
                <Car className="w-4 h-4" />
                Complimentary luxury chauffeur details will be SMS'd prior to appointment.
              </p>
            )}
            <div className="pt-4">
              <button
                onClick={handleReset}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian-950 font-bold text-sm"
              >
                Close & Return
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-[11px] uppercase tracking-widest text-gold-400 font-bold font-serif">
                Private Experience
              </span>
              <h3 className="font-serif text-2xl font-bold text-white mt-1">
                Schedule a Private Site Visit
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Explore designer sample suites, tower viewpoints, and clubhouse amenities accompanied by a dedicated senior relationship manager.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-medium">Select Venture / Project *</label>
                <div className="relative">
                  <select
                    value={formData.projectId}
                    onChange={handleProjectChange}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-obsidian-950 border border-white/15 text-white focus:outline-none focus:border-gold-500 text-xs"
                  >
                    {projects.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.projectName} ({p.location?.area} - {p.propertyType})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Visitor Name *</label>
                  <input
                    type="text"
                    required
                    placeholder=""
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-obsidian-950 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-gold-500 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder=""
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-obsidian-950 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-gold-500 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Preferred Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg bg-obsidian-950 border border-white/15 text-white focus:outline-none focus:border-gold-500 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Time Slot *</label>
                  <select
                    value={formData.preferredTimeSlot}
                    onChange={(e) => setFormData({ ...formData, preferredTimeSlot: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg bg-obsidian-950 border border-white/15 text-white focus:outline-none focus:border-gold-500 text-xs"
                  >
                    <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
                    <option value="12:00 PM - 02:00 PM">12:00 PM - 02:00 PM</option>
                    <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
                    <option value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Attendees Count</label>
                  <select
                    value={formData.numberOfVisitors}
                    onChange={(e) => setFormData({ ...formData, numberOfVisitors: parseInt(e.target.value) })}
                    className="w-full px-3 py-2.5 rounded-lg bg-obsidian-950 border border-white/15 text-white focus:outline-none focus:border-gold-500 text-xs"
                  >
                    <option value={1}>1 Guest</option>
                    <option value={2}>2 Guests</option>
                    <option value={3}>3 Guests</option>
                    <option value={4}>4+ Family Members</option>
                  </select>
                </div>
              </div>

              {/* Chauffeur Service Toggle */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Car className="w-4 h-4 text-gold-400" />
                    <div>
                      <span className="text-white font-medium block">Complimentary Chauffeur Transit</span>
                      <span className="text-[11px] text-slate-400">Luxury door-to-door pick-up within Hyderabad</span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.transportationRequired}
                    onChange={(e) => setFormData({ ...formData, transportationRequired: e.target.checked })}
                    className="w-4 h-4 accent-gold-500 rounded cursor-pointer"
                  />
                </div>

                {formData.transportationRequired && (
                  <div className="pt-2 animate-fadeIn">
                    <input
                      type="text"
                      placeholder=""
                      value={formData.pickupAddress}
                      onChange={(e) => setFormData({ ...formData, pickupAddress: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-obsidian-950 border border-white/20 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-gold-500"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">Special Requests (Optional)</label>
                <input
                  type="text"
                  placeholder=""
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-obsidian-950 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-gold-500 text-xs"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian-950 font-bold text-sm tracking-wide shadow-luxury hover:from-gold-400 hover:to-gold-500 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? 'Confirming Booking...' : 'Confirm Guided Site Visit'}
                  <Calendar className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
