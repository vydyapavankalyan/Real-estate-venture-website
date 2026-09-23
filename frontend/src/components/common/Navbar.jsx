import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Building2, Compass, MapPin, Sparkles, PhoneCall, ShieldCheck, Menu, X, User } from 'lucide-react';

export const Navbar = ({ onOpenSiteVisit, onOpenEnquiry }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAdmin, logout } = useAuth();

  const navLinks = [
    { name: 'Projects', path: '/projects' },
    { name: 'Corridors', path: '/locations' },
    { name: 'Future Hyderabad', path: '/future-development' },
    { name: 'Insights', path: '/insights' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-obsidian-950/85 backdrop-blur-md border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Identity */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold-400 via-gold-500 to-gold-700 flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform duration-300">
              <Building2 className="w-6 h-6 text-obsidian-950 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif tracking-widest text-lg font-bold text-white uppercase group-hover:text-gold-300 transition-colors">
                AURUM <span className="text-gold-400">HYDERABAD</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                Venture Real Estate • Est. 2026
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-gold-400 relative py-1 ${
                    active ? 'text-gold-400' : 'text-slate-300'
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

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={onOpenEnquiry}
              className="text-xs uppercase tracking-wider font-semibold px-4 py-2.5 rounded-lg border border-gold-500/40 text-gold-300 hover:bg-gold-500/10 hover:border-gold-400 transition-all"
            >
              Request Callback
            </button>

            <button
              onClick={onOpenSiteVisit}
              className="text-xs uppercase tracking-wider font-semibold px-5 py-2.5 rounded-lg bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian-950 shadow-luxury hover:from-gold-400 hover:to-gold-500 hover:shadow-luxury-hover transition-all font-bold"
            >
              Schedule Visit
            </button>

            {user ? (
              <div className="flex items-center gap-3 pl-2 border-l border-white/10">
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Dashboard
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
                className="text-xs text-slate-400 hover:text-gold-300 flex items-center gap-1 ml-2 font-medium"
              >
                <User className="w-3.5 h-3.5" />
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
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
