import React, { useState, useEffect } from 'react';
import { siteVisitService } from '../../services/allServices';
import { Calendar, Clock, Car, User, Check, X, Phone, Mail, AlertCircle } from 'lucide-react';

export const AdminSiteVisitsPage = () => {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadVisits = () => {
    setLoading(true);
    siteVisitService.getVisits({ size: 50 })
      .then((res) => setVisits(res.content || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadVisits();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      await siteVisitService.updateStatus(id, {
        status,
        adminNotes: `Marked ${status} by admin on ${new Date().toLocaleDateString()}`
      });
      loadVisits();
    } catch (err) {
      alert('Failed to update visit status');
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn text-xs">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-5">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-gold-400 font-mono font-semibold">Appointment Calendar</span>
          <h1 className="font-serif text-2xl font-bold text-white mt-0.5">Guided Site Visit Bookings</h1>
        </div>
      </div>

      {/* Visits Table */}
      <div className="rounded-2xl bg-obsidian-900 border border-white/10 overflow-hidden shadow-2xl">
        <table className="w-full text-left">
          <thead className="bg-obsidian-950 text-[10px] uppercase text-slate-400 border-b border-white/10">
            <tr>
              <th className="p-4">Pass Code / Visitor</th>
              <th className="p-4">Venture</th>
              <th className="p-4">Date & Slot</th>
              <th className="p-4">Attendees & Transit</th>
              <th className="p-4">Current Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {visits.map((v) => (
              <tr key={v.id} className="hover:bg-white/[0.02]">
                <td className="p-4">
                  <span className="font-mono text-[10px] text-gold-400 font-bold block">{v.visitCode}</span>
                  <span className="font-bold text-white text-sm block">{v.name}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{v.phone}</span>
                </td>
                <td className="p-4 font-semibold text-white">{v.projectName}</td>
                <td className="p-4">
                  <div className="text-white font-medium">{v.preferredDate}</div>
                  <div className="text-[10px] text-gold-300">{v.preferredTimeSlot}</div>
                </td>
                <td className="p-4">
                  <div className="text-slate-300">{v.numberOfVisitors} Visitors</div>
                  {v.transportationRequired ? (
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
                      <Car className="w-3 h-3" /> Chauffeur Pick-up
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-400">Self Driving</span>
                  )}
                  {v.pickupAddress && (
                    <div className="text-[9px] text-slate-400 truncate max-w-xs">{v.pickupAddress}</div>
                  )}
                </td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${
                    v.status === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                    v.status === 'COMPLETED' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                    'bg-gold-500/20 text-gold-300 border border-gold-500/30'
                  }`}>
                    {v.status}
                  </span>
                </td>
                <td className="p-4 text-right space-x-2">
                  {v.status === 'PENDING' && (
                    <>
                      <button
                        onClick={() => handleUpdateStatus(v.id, 'APPROVED')}
                        className="px-2.5 py-1 rounded bg-emerald-500 text-obsidian-950 font-bold text-[10px] hover:bg-emerald-400"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(v.id, 'REJECTED')}
                        className="px-2.5 py-1 rounded bg-rose-500/20 text-rose-300 font-bold text-[10px] hover:bg-rose-500/30"
                      >
                        Decline
                      </button>
                    </>
                  )}
                  {v.status === 'APPROVED' && (
                    <button
                      onClick={() => handleUpdateStatus(v.id, 'COMPLETED')}
                      className="px-2.5 py-1 rounded bg-blue-500 text-white font-bold text-[10px] hover:bg-blue-400"
                    >
                      Mark Completed
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
