import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Building2, Phone, PhoneCall, ShieldCheck, Menu, X, User, MessageSquare } from 'lucide-react';

export const Navbar = ({ onOpenSiteVisit, onOpenEnquiry }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAdmin, logout } = useAuth();

  const navLinks = [
    { name: 'Projects', path: '/properties' },
    { name: 'Message', path: '/message' },
    { name: 'Services', path: '/services' },
    { name: 'Articles', path: '/articles' },
    { name: 'Fourth City', path: '/future-development' },
    { name: 'Calculator', path: '/calculator' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-obsidian-950/90 backdrop-blur-md border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Identity */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold-400 via-gold-500 to-gold-700 flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform duration-300">
              <Building2 className="w-6 h-6 text-obsidian-950 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif tracking-widest text-base sm:text-lg font-bold text-white uppercase group-hover:text-gold-300 transition-colors">
                RAJAN <span className="text-gold-400">CASTLE</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                Properties • Hyderabad
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => {
              const active = location.pathname === link.path || (link.path === '/properties' && location.pathname === '/projects');
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-xs xl:text-sm font-medium tracking-wide uppercase transition-colors hover:text-gold-400 relative py-1 ${
                    active ? 'text-gold-400 font-bold' : 'text-slate-300'
                  }`}
                >
                  {link.name}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons & Direct Phone */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+919090104949"
              className="flex items-center gap-1.5 text-xs text-white/90 hover:text-gold-400 font-semibold px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-gold-500/40 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-gold-400" />
              <span>+91 9090104949</span>
            </a>

            <button
              onClick={onOpenEnquiry}
              className="text-xs uppercase tracking-wider font-semibold px-3.5 py-2 rounded-lg border border-gold-500/40 text-gold-300 hover:bg-gold-500/10 hover:border-gold-400 transition-all"
            >
              Enquire
            </button>

            <button
              onClick={onOpenSiteVisit}
              className="text-xs uppercase tracking-wider font-semibold px-4 py-2 rounded-lg bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian-950 shadow-luxury hover:from-gold-400 hover:to-gold-500 hover:shadow-luxury-hover transition-all font-bold"
            >
              Site Visit
            </button>

            {user ? (
              <div className="flex items-center gap-3 pl-2 border-l border-white/10">
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Admin
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="text-xs text-slate-400 hover:text-white transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-xs text-slate-400 hover:text-gold-300 flex items-center gap-1 ml-1 font-medium"
              >
                <User className="w-3.5 h-3.5" />
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-3">
            <a
              href="tel:+919090104949"
              className="flex items-center gap-1 text-xs text-gold-400 font-semibold px-2 py-1 rounded bg-white/5 border border-white/10"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call</span>
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-obsidian-900 border-b border-white/10 px-4 pt-4 pb-6 space-y-3">
          <div className="pb-3 border-b border-white/10 flex items-center justify-between">
            <span className="text-xs text-slate-400">Concierge Desk:</span>
            <a href="tel:+919090104949" className="text-xs text-gold-400 font-bold flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" />
              +91 9090104949
            </a>
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:text-gold-400 hover:bg-white/5"
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-4 border-t border-white/10 space-y-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenSiteVisit(); }}
              className="w-full text-center py-3 rounded-lg bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian-950 font-bold text-sm tracking-wide"
            >
              Schedule Site Visit
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenEnquiry(); }}
              className="w-full text-center py-3 rounded-lg border border-gold-500/40 text-gold-300 text-sm font-semibold"
            >
              Request Callback
            </button>
            {user ? (
              <div className="pt-2 flex items-center justify-between px-3">
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xs text-emerald-400 font-semibold"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="text-xs text-slate-400"
                >
                  Logout ({user.fullName})
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center text-xs text-slate-400 py-2"
              >
                Agent / Admin Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
