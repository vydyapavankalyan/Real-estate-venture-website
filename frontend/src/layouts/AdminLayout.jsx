import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard, Building, Users, Calendar, Train,
  LogOut, Globe, ShieldCheck, ChevronRight, FileText
} from 'lucide-react';

export const AdminLayout = () => {
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const links = [
    { name: 'Executive Overview', path: '/admin', icon: LayoutDashboard },
    { name: 'Projects & Galleries', path: '/admin/projects', icon: Building },
    { name: 'Leads & Enquiries CRM', path: '/admin/leads', icon: Users },
    { name: 'Site Visit Bookings', path: '/admin/site-visits', icon: Calendar },
    { name: 'Blog & Articles CMS', path: '/admin/blog', icon: FileText },
    { name: 'Future Infrastructure', path: '/admin/future-dev', icon: Train },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-obsidian-950 flex flex-col md:flex-row text-slate-100">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-obsidian-900 border-r border-white/10 flex flex-col justify-between shrink-0">
        <div>
          {/* Logo & Portal Branding */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <Link to="/admin" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gold-500 flex items-center justify-center text-obsidian-950 font-bold">
                <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <span className="font-serif font-bold text-sm text-white tracking-wider block">AURUM ADMIN</span>
                <span className="text-[10px] text-gold-400 font-mono">Operations Portal</span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {links.map((link) => {
              const active = location.pathname === link.path;
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? 'bg-gold-500 text-obsidian-950 shadow-luxury font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer / User Profile & Public Site Link */}
        <div className="p-4 border-t border-white/10 space-y-3">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-gold-400" />
              <span>View Public Portal</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          </Link>

          <div className="pt-2 flex items-center justify-between px-2 text-xs">
            <div className="truncate">
              <span className="text-white font-medium block truncate">{user?.fullName || 'Staff Member'}</span>
              <span className="text-[10px] text-slate-400 truncate">{user?.email}</span>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 text-slate-400 hover:text-rose-400 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-6 sm:p-10">
        <Outlet />
      </main>

    </div>
  );
};
