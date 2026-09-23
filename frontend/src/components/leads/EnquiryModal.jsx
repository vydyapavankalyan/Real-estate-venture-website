import React, { useState } from 'react';
import { X, CheckCircle2, Phone, Mail, Building, Send, Shield } from 'lucide-react';
import { leadService } from '../../services/allServices';

export const EnquiryModal = ({ isOpen, onClose, defaultProject = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    preferredLocation: defaultProject?.location?.area || 'Kokapet',
    propertyType: defaultProject?.propertyType || 'APARTMENT',
    budget: '₹2.0 - ₹3.5 Cr',
    message: '',
    projectId: defaultProject?.id || '',
    projectName: defaultProject?.projectName || '',
    source: 'ENQUIRY_MODAL',
  });

  const [loading, setLoading] = useState(false);
  const [submittedCode, setSubmittedCode] = useState(null);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await leadService.submitEnquiry(formData);
      setSubmittedCode(res.data?.leadCode || 'HYD-CONFIRMED');
    } catch (err) {
      setError(err?.message || 'Failed to submit enquiry. Please try again or call us directly.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmittedCode(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-obsidian-900 border border-gold-500/30 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8 animate-fadeIn">
        
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedCode ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-white">Callback Request Confirmed</h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              Thank you, <span className="text-gold-300 font-semibold">{formData.name}</span>. An Aurum luxury property advisor will connect with you within 30 minutes.
            </p>
            <div className="inline-block px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-gold-400">
              Reference ID: {submittedCode}
            </div>
            <div className="pt-4">
              <button
                onClick={handleReset}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian-950 font-bold text-sm"
              >
                Close & Continue Browsing
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-[11px] uppercase tracking-widest text-gold-400 font-bold font-serif">
                Exclusive Concierge Assistance
              </span>
              <h3 className="font-serif text-2xl font-bold text-white mt-1">
                {formData.projectName ? `Inquire: ${formData.projectName}` : 'Request a Confidential Callback'}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Direct developer pricing, official brochures, floor plans, and priority inventory access.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikram Reddy"
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
                    placeholder="+91 98490 XXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-obsidian-950 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-gold-500 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">Email Address</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-obsidian-950 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-gold-500 text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Preferred Corridor</label>
                  <select
                    value={formData.preferredLocation}
                    onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg bg-obsidian-950 border border-white/15 text-white focus:outline-none focus:border-gold-500 text-xs"
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
                  <label className="block text-slate-300 mb-1 font-medium">Property Type</label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg bg-obsidian-950 border border-white/15 text-white focus:outline-none focus:border-gold-500 text-xs"
                  >
                    <option value="APARTMENT">Apartment</option>
                    <option value="VILLA">Luxury Villa</option>
                    <option value="PLOT">Villa Plot</option>
                    <option value="COMMERCIAL">Commercial</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Target Budget</label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg bg-obsidian-950 border border-white/15 text-white focus:outline-none focus:border-gold-500 text-xs"
                  >
                    <option value="Under ₹1.75 Cr">Under ₹1.75 Cr</option>
                    <option value="₹1.75 - ₹2.5 Cr">₹1.75 - ₹2.5 Cr</option>
                    <option value="₹2.5 - ₹4.0 Cr">₹2.5 - ₹4.0 Cr</option>
                    <option value="₹4.0 - ₹6.5 Cr">₹4.0 - ₹6.5 Cr</option>
                    <option value="₹6.5 Cr+">₹6.5 Cr+ (Ultra Luxury)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-medium">Specific Requirements / Preferred Unit</label>
                <textarea
                  rows="2"
                  placeholder="e.g. East-facing, high floor, 3 BHK with maid room..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-obsidian-950 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-gold-500 text-xs"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian-950 font-bold text-sm tracking-wide shadow-luxury hover:from-gold-400 hover:to-gold-500 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? 'Registering Enquiry...' : 'Request a Callback'}
                  <Send className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[10px] text-center text-slate-300 flex items-center justify-center gap-1">
                <Shield className="w-3 h-3 text-gold-400" />
                Your information is 100% confidential. No spam policy.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
