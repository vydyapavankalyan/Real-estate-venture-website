import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Shield, Phone, Mail, MapPin, ExternalLink } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-obsidian-950 border-t border-white/10 pt-16 pb-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-obsidian-950 font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="font-serif tracking-widest text-lg font-bold text-white uppercase">
                AURUM <span className="text-gold-400">HYDERABAD</span>
              </span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed font-serif italic text-gold-200/80">
              "Discover Better Living. Invest in Hyderabad's Future."
            </p>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Premier real estate venture platform dedicated to curating high-growth residential towers, luxury villas, and prime investment destinations across West and South Hyderabad.
            </p>
            <div className="pt-2 text-xs space-y-1.5 text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                <span>Level 14, Aurum One Tower, Financial District, Hyderabad - 500032</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                <span>+91 98490 00000 (Mon - Sun, 9:00 AM - 8:00 PM IST)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                <span>concierge@hyderabadrealty.com</span>
              </div>
            </div>
          </div>

          {/* Premier Corridors */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-white font-serif">
              Growth Corridors
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/projects?location=Kokapet" className="hover:text-gold-400 transition-colors">Kokapet Golden Mile</Link></li>
              <li><Link to="/projects?location=Neopolis" className="hover:text-gold-400 transition-colors">Neopolis Sky Mansions</Link></li>
              <li><Link to="/projects?location=Financial%20District" className="hover:text-gold-400 transition-colors">Financial District Core</Link></li>
              <li><Link to="/projects?location=Tellapur" className="hover:text-gold-400 transition-colors">Tellapur Gated Villas</Link></li>
              <li><Link to="/projects?location=Narsingi" className="hover:text-gold-400 transition-colors">Narsingi Lakefront</Link></li>
              <li><Link to="/projects?location=Shamshabad" className="hover:text-gold-400 transition-colors">Shamshabad Aerotropolis</Link></li>
            </ul>
          </div>

          {/* Quick Portals */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-white font-serif">
              Venture Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/projects" className="hover:text-gold-400 transition-colors">Featured Projects</Link></li>
              <li><Link to="/future-development" className="hover:text-gold-400 transition-colors">Future Hyderabad Tracker</Link></li>
              <li><Link to="/insights" className="hover:text-gold-400 transition-colors">Market Insights & RERA</Link></li>
              <li><Link to="/about" className="hover:text-gold-400 transition-colors">About Aurum Group</Link></li>
              <li><Link to="/contact" className="hover:text-gold-400 transition-colors">Contact Concierge</Link></li>
              <li><Link to="/admin" className="hover:text-gold-400 transition-colors">Staff CRM Portal</Link></li>
            </ul>
          </div>

          {/* Infrastructure Themes */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-white font-serif">
              Building The Future
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/future-development" className="hover:text-gold-400 transition-colors">Airport Express Metro</Link></li>
              <li><Link to="/future-development" className="hover:text-gold-400 transition-colors">340 km Regional Ring Road</Link></li>
              <li><Link to="/future-development" className="hover:text-gold-400 transition-colors">Telangana AI City</Link></li>
              <li><Link to="/future-development" className="hover:text-gold-400 transition-colors">Pharma City & Bio-Cluster</Link></li>
              <li><Link to="/future-development" className="hover:text-gold-400 transition-colors">Foxconn Electronics City</Link></li>
            </ul>
          </div>
        </div>

        {/* Regulatory RERA & Legal Disclaimer */}
        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 mb-8 text-[11px] leading-relaxed text-slate-400">
          <div className="flex items-center gap-2 text-gold-400 font-semibold mb-1">
            <Shield className="w-4 h-4" />
            <span>Official Regulatory Disclaimer & RERA Transparency Statement</span>
          </div>
          <p>
            Information on this website is subject to change. Project availability, pricing, specifications, approvals and timelines should be independently verified before making a purchase or investment decision. All project photographs, architectural renders, floor plans, and amenities are artist impressions unless specified. RERA numbers provided are sample placeholders for development demonstration. We do not provide speculative guarantees of appreciation or financial return.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-300 pt-6 border-t border-white/5 gap-4">
          <p>© 2026 Aurum Hyderabad Real Estate Platform. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-gold-400">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-gold-400">Terms of Use</Link>
            <Link to="/disclaimer" className="hover:text-gold-400">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
