import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Building2, Lock, Mail, ShieldCheck, ArrowRight } from 'lucide-react';

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState('admin@hyderabadrealty.com');
  const [password, setPassword] = useState('Admin@2026');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const from = location.state?.from?.pathname || '/admin';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err?.message || 'Invalid email or password. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] bg-obsidian-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-obsidian-900 border border-gold-500/30 rounded-2xl shadow-2xl p-8 space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-obsidian-950 font-bold mx-auto shadow-glow">
            <Building2 className="w-7 h-7 stroke-[2.2]" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-white tracking-wide">
            AURUM STAFF PORTAL
          </h2>
          <p className="text-xs text-slate-400">
            Sign in to access real estate CRM, project galleries, and lead pipeline
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 mb-1 font-medium">Work Email Address</label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-obsidian-950 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-gold-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 mb-1 font-medium">Password</label>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-obsidian-950 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-gold-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian-950 font-bold text-xs uppercase tracking-wider shadow-luxury hover:from-gold-400 hover:to-gold-500 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In To Dashboard'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Credentials Hint */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-[11px] text-slate-400 space-y-1.5">
          <div className="flex items-center gap-1.5 text-gold-400 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Pre-configured Staff Credentials</span>
          </div>
          <div>Admin: <code className="text-slate-200">admin@hyderabadrealty.com</code> / <code className="text-slate-200">Admin@2026</code></div>
          <div>Agent: <code className="text-slate-200">sales@hyderabadrealty.com</code> / <code className="text-slate-200">Agent@2026</code></div>
        </div>

      </div>
    </div>
  );
};
