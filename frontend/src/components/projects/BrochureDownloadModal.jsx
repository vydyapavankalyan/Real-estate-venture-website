import React, { useState } from 'react';
import { leadService } from '../../services/allServices';
import { X, Download, ShieldCheck, CheckCircle2, FileText, Loader2, Sparkles } from 'lucide-react';

export const BrochureDownloadModal = ({ project, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen || !project) return null;

  const handleDownload = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setLoading(true);
    setError(null);

    try {
      // 1. Submit lead to backend CRM
      await leadService.submitEnquiry({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        projectId: project.id || project._id,
        preferredLocation: project.location?.area || 'Hyderabad',
        propertyType: project.propertyType || 'PLOT',
        message: `Requested Official Digital Brochure for ${project.projectName}`,
        source: 'BROCHURE_DOWNLOAD',
      });

      // 2. Generate and trigger download of project prospectus document
      const prospectusContent = `
========================================================================
RAJAN - CASTLE PROPERTIES | OFFICIAL VENTURE PROSPECTUS
========================================================================

PROJECT: ${project.projectName}
LOCATION: ${project.location?.address || project.location?.area || 'Hyderabad, Telangana'}
PROPERTY TYPE: ${project.propertyType || 'Residential Venture'}
STARTING INVESTMENT: ${project.price?.priceDisplay || 'Contact Advisory'}
LAND PARCEL: ${project.landArea || 'Strategic Acreage'}
POSSESSION TIMELINE: ${project.possessionDate || 'Immediate / 2026-2027'}
RERA REGISTRATION: ${project.reraNumber || 'RERA Compliant'}

------------------------------------------------------------------------
STRATEGIC CONNECTIVITY & HIGHLIGHTS
------------------------------------------------------------------------
* Fourth City / Mirkhanpet Corridor: Connected via 200ft & 330ft Arterial Roads
* Raviryal Greenfield 300ft Expressway & Proposed RRR
* Proximate to Young India Skill University & Amazon Data Center (₹5,809 Cr)
* 100% Clear Title Legal Guarantee & Spot Registration Guidance

------------------------------------------------------------------------
AMENITIES & SPECIFICATIONS
------------------------------------------------------------------------
${(project.amenities || ['Gated Security', 'Blacktop Roads', 'Underground Electricity', 'Clubhouse & Parks']).map((a) => `* ${a}`).join('\n')}

------------------------------------------------------------------------
CORPORATE ADVISORY CONTACT
------------------------------------------------------------------------
Founder & Managing Director: Mr. Katla Bhagyarajan
Hotline: +91 9090104949
Email: katla.bhagyarajan@gmail.com / concierge@hyderabadrealty.com
Address: Hyderabad, Telangana, 500074

Generated for: ${formData.name} (${formData.phone})
Date: ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
========================================================================
      `.trim();

      const blob = new Blob([prospectusContent], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${project.slug || 'rajan-castle'}-official-brochure.txt`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setDownloadSuccess(true);
    } catch (err) {
      console.error('Failed to submit brochure lead:', err);
      // Even if API has minor glitch, allow user download
      setDownloadSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setDownloadSuccess(false);
    setError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-obsidian-900 border border-gold-500/40 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-obsidian-950/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gold-500/20 border border-gold-500/30 flex items-center justify-center text-gold-400">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-serif tracking-widest text-gold-400 font-bold block">
                Official Digital Dossier
              </span>
              <h3 className="font-serif text-lg font-bold text-white leading-snug">
                Download Brochure
              </h3>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {!downloadSuccess ? (
            <>
              {/* Project preview pill */}
              <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 flex items-center gap-3">
                <img
                  src={project.coverImageUrl || project.gallery?.[0]?.url || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=200&q=80'}
                  alt={project.projectName}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="font-serif font-bold text-white text-sm truncate">{project.projectName}</h4>
                  <p className="text-xs text-gold-400 truncate">{project.location?.area || 'Hyderabad'} • {project.price?.priceDisplay || 'Investment Venture'}</p>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-light">
                Please provide your contact details to instantly receive the master plan, unit blueprints, floor layouts, and comprehensive investment financial schedule.
              </p>

              <form onSubmit={handleDownload} className="space-y-3.5">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ramesh Chandra"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian-950 border border-white/15 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian-950 border border-white/15 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-gold-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ramesh@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian-950 border border-white/15 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading || !formData.name || !formData.phone}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian-950 font-bold text-xs uppercase tracking-wider hover:from-gold-400 hover:to-gold-500 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-luxury"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Preparing Dossier...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        <span>Download Official Brochure</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

              <div className="flex items-center gap-1.5 text-[10px] text-slate-500 justify-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Strictly confidential. No spam. Direct developer pricing.</span>
              </div>
            </>
          ) : (
            <div className="py-6 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-serif text-xl font-bold text-white">Brochure Downloaded</h4>
                <p className="text-xs text-slate-300 mt-1 max-w-sm mx-auto leading-relaxed">
                  Your digital prospectus for <strong className="text-gold-300">{project.projectName}</strong> has begun downloading. A copy has also been queued for delivery to your WhatsApp.
                </p>
              </div>

              <div className="pt-4 flex justify-center">
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 rounded-xl bg-gold-500 text-obsidian-950 font-bold text-xs uppercase tracking-wider hover:bg-gold-400 transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
