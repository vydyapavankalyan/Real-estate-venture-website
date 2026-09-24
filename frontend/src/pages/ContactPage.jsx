import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import { leadService } from '../services/allServices';
import { SEO } from '../components/common/SEO';
import { SEO_DATA } from '../components/common/SEOConfig';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    preferredLocation: 'Financial District',
    propertyType: 'APARTMENT',
    budget: '₹2.5 - ₹4.0 Cr',
    message: '',
    source: 'CONTACT_PAGE'
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await leadService.submitEnquiry(formData);
      setSubmitted(true);
    } catch (err) {
      setError(err?.message || 'Failed to submit contact message. Please try calling directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian-950 py-16 text-slate-100">
      <SEO {...SEO_DATA.contact} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-serif uppercase tracking-widest text-gold-400 font-bold">
            Concierge & Advisory
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Connect with Our Advisory Team
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed font-light">
            Visit our corporate office in Hyderabad's Financial District or send an inquiry to arrange a discreet consultation regarding our ventures.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Contact Details (Left col) */}
          <div className="space-y-6">
            <div className="p-8 rounded-2xl bg-obsidian-900 border border-white/10 space-y-6">
              <h3 className="font-serif text-xl font-bold text-white border-b border-white/10 pb-4">
                Corporate Headquarters
              </h3>

              <div className="space-y-5 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Physical Address</strong>
                    <span>Hyderabad, Telangana - 500074 / 500070 (Registered Office)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Telephone Hotline</strong>
                    <a href="tel:+919090104949" className="font-mono text-gold-300 hover:underline block text-sm font-semibold">
                      +91 9090104949
                    </a>
                    <span className="text-[11px] text-slate-400">Direct Desk: Mr. Katla Bhagyarajan</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageSquare className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Instant WhatsApp</strong>
                    <a
                      href="https://wa.me/919090104949?text=Hello%20Mr.%20Rajan%2C%20I%20am%20interested%20in%20Rajan%20Castle%20Properties"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline block font-semibold"
                    >
                      Chat on WhatsApp (+91 9090104949)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Email Inquiries</strong>
                    <a href="mailto:katla.bhagyarajan@gmail.com" className="text-gold-300 hover:underline">
                      katla.bhagyarajan@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Operational Hours</strong>
                    <span>Mon - Fri: 9:00 AM – 6:00 PM | Sat - Sun: 10:00 AM – 4:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 text-xs text-slate-400 space-y-2">
              <span className="text-gold-400 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                Data Privacy Guarantee
              </span>
              <p className="text-[11px] leading-relaxed">
                All communications and property criteria remain strictly confidential. Your details are never monetized or shared with third-party telemarketers.
              </p>
            </div>
          </div>

          {/* Contact & Inquiry Form (Right 2 cols) */}
          <div className="lg:col-span-2">
            <div className="p-8 sm:p-10 rounded-2xl bg-obsidian-900 border border-white/10 shadow-2xl">
              
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-white">Message Received</h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    Thank you, <span className="text-gold-300 font-semibold">{formData.name}</span>. An executive concierge representative will contact you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-lg bg-gold-500 text-obsidian-950 font-bold text-xs"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 text-xs">
                  <div>
                    <span className="text-[11px] uppercase tracking-widest text-gold-400 font-semibold font-serif">
                      Send An Inquiry
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-white mt-1">
                      Direct Advisory Message
                    </h3>
                  </div>

                  {error && (
                    <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 mb-1 font-medium">Full Name *</label>
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

                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">Email Address</label>
                    <input
                      type="email"
                      placeholder=""
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-obsidian-950 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-gold-500 text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-slate-300 mb-1 font-medium">Interested Location</label>
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
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1 font-medium">Property Category</label>
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
                      <label className="block text-slate-300 mb-1 font-medium">Budget</label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-lg bg-obsidian-950 border border-white/15 text-white focus:outline-none focus:border-gold-500 text-xs"
                      >
                        <option value="Under ₹2.0 Cr">Under ₹2.0 Cr</option>
                        <option value="₹2.0 - ₹3.5 Cr">₹2.0 - ₹3.5 Cr</option>
                        <option value="₹3.5 - ₹5.0 Cr">₹3.5 - ₹5.0 Cr</option>
                        <option value="₹5.0 Cr+">₹5.0 Cr+ (Ultra Luxury)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-medium">Message & Specific Preferences</label>
                    <textarea
                      rows="4"
                      placeholder="Please mention preferred unit layouts, floor preferences, or questions..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-obsidian-950 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-gold-500 text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian-950 font-bold text-xs uppercase tracking-wider shadow-luxury hover:from-gold-400 hover:to-gold-500 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? 'Sending Message...' : 'Send Confidential Inquiry'}
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
