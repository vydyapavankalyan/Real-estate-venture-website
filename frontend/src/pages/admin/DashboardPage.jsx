import React, { useState, useEffect } from 'react';
import { adminService, leadService, siteVisitService } from '../../services/allServices';
import { Link } from 'react-router-dom';
import {
  Building, Users, Calendar, TrendingUp, Clock, CheckCircle2,
  AlertCircle, ArrowUpRight, ArrowRight, ShieldCheck, MapPin
} from 'lucide-react';

export const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.getStats()
      .then((data) => setStats(data))
      .catch((err) => console.error('Failed to load dashboard metrics:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-gold-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const kpis = [
    { title: "Total Projects", value: stats?.totalProjects || 0, sub: `${stats?.activeProjects || 0} Published Live`, icon: Building, color: "text-gold-400" },
    { title: "Total Inbound Leads", value: stats?.totalLeads || 0, sub: `${stats?.newEnquiries || 0} Require First Contact`, icon: Users, color: "text-blue-400" },
    { title: "Site Visits Scheduled", value: stats?.siteVisitsScheduled || 0, sub: `${stats?.siteVisitsCompleted || 0} Successfully Completed`, icon: Calendar, color: "text-emerald-400" },
    { title: "Converted Buyers", value: stats?.convertedLeads || 0, sub: `${stats?.pendingFollowUps || 0} In Negotiation / Follow-up`, icon: TrendingUp, color: "text-purple-400" },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-gold-400 font-mono font-semibold">Executive Dashboard</span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-0.5">Real Estate Operations Center</h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/projects"
            className="px-4 py-2 rounded-xl bg-gold-500 text-obsidian-950 font-bold text-xs uppercase tracking-wider shadow hover:bg-gold-400 transition-all"
          >
            + Add New Project
          </Link>
          <Link
            to="/admin/leads"
            className="px-4 py-2 rounded-xl border border-white/20 text-white font-semibold text-xs uppercase tracking-wider hover:bg-white/5 transition-all"
          >
            View Lead Pipeline
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="p-6 rounded-2xl bg-obsidian-900 border border-white/10 shadow-luxury space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">{kpi.title}</span>
                <Icon className={`w-5 h-5 ${kpi.color}`} />
              </div>
              <div className="font-serif text-3xl font-bold text-white tracking-tight">{kpi.value}</div>
              <div className="text-[11px] text-slate-400 font-medium">{kpi.sub}</div>
            </div>
          );
        })}
      </div>

      {/* Corridor Breakdown & Pipeline Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Inquiries by Corridor */}
        <div className="p-6 rounded-2xl bg-obsidian-900 border border-white/10 space-y-4">
          <h3 className="font-serif text-lg font-bold text-white">Demand by Corridor</h3>
          <div className="space-y-3">
            {stats?.leadsByCorridor && Object.keys(stats.leadsByCorridor).length > 0 ? (
              Object.entries(stats.leadsByCorridor).map(([corridor, count]) => (
                <div key={corridor} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium">{corridor}</span>
                    <span className="text-gold-400 font-mono font-bold">{count} leads</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-obsidian-950 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-gold-500 to-gold-400 rounded-full"
                      style={{ width: `${Math.min(100, (count / (stats.totalLeads || 1)) * 100)}%` }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500">No corridor inquiries recorded yet.</p>
            )}
          </div>
        </div>

        {/* Recent Inbound Leads */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-obsidian-900 border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-white">Recent Homebuyer Inquiries</h3>
            <Link to="/admin/leads" className="text-xs text-gold-400 hover:underline flex items-center gap-1 font-semibold">
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[10px] uppercase text-slate-400 border-b border-white/10">
                <tr>
                  <th className="pb-3">Buyer Name</th>
                  <th className="pb-3">Contact</th>
                  <th className="pb-3">Interested Corridor</th>
                  <th className="pb-3">Budget</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {stats?.recentLeads?.map((lead) => (
                  <tr key={lead.id} className="hover:bg-white/[0.02]">
                    <td className="py-3 font-semibold text-white">{lead.name}</td>
                    <td className="py-3 text-slate-400 font-mono">{lead.phone}</td>
                    <td className="py-3 text-slate-300">{lead.preferredLocation || lead.projectName || 'Kokapet'}</td>
                    <td className="py-3 text-gold-300 font-medium">{lead.budget || '₹2.5 Cr+'}</td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-gold-500/20 text-gold-300 border border-gold-500/30">
                        {lead.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Upcoming Site Visits */}
      <div className="p-6 rounded-2xl bg-obsidian-900 border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-lg font-bold text-white">Upcoming Guided Site Visits</h3>
          <Link to="/admin/site-visits" className="text-xs text-gold-400 hover:underline flex items-center gap-1 font-semibold">
            <span>Manage All Bookings</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats?.upcomingSiteVisits?.map((visit) => (
            <div key={visit.id} className="p-4 rounded-xl bg-obsidian-950 border border-white/5 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-gold-400 font-semibold">{visit.visitCode}</span>
                <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                  visit.status === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-gold-500/20 text-gold-300 border border-gold-500/30'
                }`}>
                  {visit.status}
                </span>
              </div>
              <h4 className="font-bold text-white text-sm">{visit.name}</h4>
              <p className="text-slate-400 font-medium">{visit.projectName}</p>
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-300">
                <span>{visit.preferredDate} ({visit.preferredTimeSlot})</span>
                <span className="font-semibold text-gold-300">{visit.numberOfVisitors} Visitors</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
