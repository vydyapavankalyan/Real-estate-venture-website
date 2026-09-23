import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Shield, Phone, Mail, MapPin, Clock } from 'lucide-react';

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
                RAJAN <span className="text-gold-400">CASTLE</span> PROPERTIES
              </span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed font-serif italic text-gold-200/90">
              "Your trusted partner in finding exceptional properties. We make real estate dreams come true."
            </p>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              With over 15 years of industry experience, Rajan - Castle Properties specializes in high-yield investments across Hyderabad and Telangana's emerging Fourth City (Mirkhanpet, Maheshwaram, and Kadthal).
            </p>
            <div className="pt-2 text-xs space-y-2 text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                <span>Hyderabad, Telangana, 500074 / 500070</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                <span>+91 9090104949</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                <span>katla.bhagyarajan@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                <span>Mon-Fri: 9:00 AM - 6:00 PM | Sat-Sun: 10:00 AM - 4:00 PM</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-white font-serif">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/" className="hover:text-gold-400 transition-colors">Home</Link></li>
              <li><Link to="/properties" className="hover:text-gold-400 transition-colors">Projects</Link></li>
              <li><Link to="/message" className="hover:text-gold-400 transition-colors">Founder's Message</Link></li>
              <li><Link to="/services" className="hover:text-gold-400 transition-colors">Our Services</Link></li>
              <li><Link to="/articles" className="hover:text-gold-400 transition-colors">Articles & Videos</Link></li>
              <li><Link to="/about" className="hover:text-gold-400 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-gold-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Fourth City Focus */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-white font-serif">
              Fourth City Hubs
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/properties?location=Mirkhanpet" className="hover:text-gold-400 transition-colors">Mirkhanpet Skill Univ Hub</Link></li>
              <li><Link to="/properties?location=Maheshwaram" className="hover:text-gold-400 transition-colors">Maheshwaram Highway</Link></li>
              <li><Link to="/properties?location=Kadthal" className="hover:text-gold-400 transition-colors">Kadthal Green Living</Link></li>
              <li><Link to="/properties?location=Kokapet" className="hover:text-gold-400 transition-colors">Kokapet Golden Mile</Link></li>
              <li><Link to="/properties?location=Neopolis" className="hover:text-gold-400 transition-colors">Neopolis Towers</Link></li>
              <li><Link to="/properties?location=Financial%20District" className="hover:text-gold-400 transition-colors">Financial District Core</Link></li>
            </ul>
          </div>

          {/* Infrastructure Themes */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-white font-serif">
              Infrastructure
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/articles" className="hover:text-gold-400 transition-colors">Young India Skill University</Link></li>
              <li><Link to="/articles" className="hover:text-gold-400 transition-colors">Amazon Data Center (₹5,809 Cr)</Link></li>
              <li><Link to="/future-development" className="hover:text-gold-400 transition-colors">300ft Greenfield Highway</Link></li>
              <li><Link to="/future-development" className="hover:text-gold-400 transition-colors">330ft Road Connectivity</Link></li>
              <li><Link to="/future-development" className="hover:text-gold-400 transition-colors">Regional Ring Road (RRR)</Link></li>
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
            Information on this website is subject to change. Project availability, pricing, specifications, approvals and timelines should be independently verified before making a purchase or investment decision. All project photographs, architectural renders, floor plans, and amenities are artist impressions unless specified. RERA numbers provided are sample placeholders for development demonstration.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 pt-6 border-t border-white/5 gap-4">
          <p>© 2026 Rajan - Castle Properties. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/contact" className="hover:text-gold-400">Contact Concierge</Link>
            <Link to="/admin" className="hover:text-gold-400">Staff Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
