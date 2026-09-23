import React, { useState, useEffect } from 'react';
import { leadService } from '../../services/allServices';
import { Users, Phone, Mail, Clock, MessageSquare, Plus, CheckCircle2, ChevronRight, UserCheck } from 'lucide-react';

export const AdminLeadsPage = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [newNote, setNewNote] = useState('');

  const statuses = [
    'NEW', 'CONTACTED', 'QUALIFIED', 'SITE_VISIT_SCHEDULED',
    'SITE_VISIT_COMPLETED', 'NEGOTIATION', 'CONVERTED', 'LOST'
  ];

  const loadLeads = () => {
    setLoading(true);
    const params = { size: 50 };
    if (statusFilter) params.status = statusFilter;

    leadService.getLeads(params)
      .then((res) => {
        setLeads(res.content || []);
        if (res.content && res.content.length > 0 && !selectedLead) {
          setSelectedLead(res.content[0]);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadLeads();
  }, [statusFilter]);

  const handleStatusChange = async (leadId, newStatus) => {
    try {
      const updated = await leadService.updateStatus(leadId, {
        status: newStatus,
        note: `Status changed to ${newStatus}`
      });
      setLeads(leads.map(l => l.id === leadId ? updated : l));
      if (selectedLead?.id === leadId) setSelectedLead(updated);
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim() || !selectedLead) return;

    try {
      const updated = await leadService.addNote(selectedLead.id, newNote);
      setLeads(leads.map(l => l.id === selectedLead.id ? updated : l));
      setSelectedLead(updated);
      setNewNote('');
    } catch (err) {
      alert('Failed to append note');
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn text-xs">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-gold-400 font-mono font-semibold">CRM Pipeline</span>
          <h1 className="font-serif text-2xl font-bold text-white mt-0.5">Prospective Homebuyer Leads</h1>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setStatusFilter('')}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              statusFilter === '' ? 'bg-gold-500 text-obsidian-950 font-bold' : 'bg-obsidian-900 text-slate-300 border-white/10'
            }`}
          >
            All Leads ({leads.length})
          </button>
          {statuses.slice(0, 4).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg border transition-all ${
                statusFilter === s ? 'bg-gold-500 text-obsidian-950 font-bold' : 'bg-obsidian-900 text-slate-300 border-white/10'
              }`}
            >
              {s.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Leads List Table */}
        <div className="lg:col-span-2 rounded-2xl bg-obsidian-900 border border-white/10 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-obsidian-950 text-[10px] uppercase text-slate-400 border-b border-white/10">
                <tr>
                  <th className="p-4">Lead Code / Name</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Corridor & Budget</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">View</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {leads.map((lead) => {
                  const active = selectedLead?.id === lead.id;
                  return (
                    <tr
                      key={lead.id}
                      onClick={() => setSelectedLead(lead)}
                      className={`cursor-pointer transition-colors ${active ? 'bg-gold-500/10' : 'hover:bg-white/[0.02]'}`}
                    >
                      <td className="p-4">
                        <span className="font-mono text-[10px] text-gold-400 font-semibold block">{lead.leadCode}</span>
                        <span className="font-bold text-white text-sm">{lead.name}</span>
                      </td>
                      <td className="p-4">
                        <div className="font-mono text-slate-300">{lead.phone}</div>
                        <div className="text-[10px] text-slate-400">{lead.email || 'No email provided'}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-white font-medium">{lead.preferredLocation || lead.projectName || 'Kokapet'}</div>
                        <div className="text-[10px] text-gold-300">{lead.budget || '₹2.5 Cr+'}</div>
                      </td>
                      <td className="p-4">
                        <select
                          value={lead.status}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          className="px-2 py-1 rounded bg-obsidian-950 border border-white/15 text-[10px] font-semibold uppercase text-gold-300 focus:outline-none focus:border-gold-500 cursor-pointer"
                        >
                          {statuses.map((st) => (
                            <option key={st} value={st}>{st.replace('_', ' ')}</option>
                          ))}
                        </select>
                      </td>
                      <td className="p-4 text-right">
                        <ChevronRight className="w-4 h-4 text-slate-500 inline" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 1 Col: Lead Inspection & Notes Panel */}
        <div className="space-y-6">
          {selectedLead ? (
            <div className="p-6 rounded-2xl bg-obsidian-900 border border-gold-500/30 shadow-2xl space-y-5">
              <div className="border-b border-white/10 pb-4">
                <span className="font-mono text-[10px] text-gold-400 font-bold block">{selectedLead.leadCode}</span>
                <h3 className="font-serif text-xl font-bold text-white mt-0.5">{selectedLead.name}</h3>
                <span className="text-[11px] text-slate-400">Captured via {selectedLead.source}</span>
              </div>

              {/* Contact Quick links */}
              <div className="space-y-2 text-xs">
                <a
                  href={`tel:${selectedLead.phone}`}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-mono transition-colors"
                >
                  <Phone className="w-4 h-4 text-gold-400" />
                  <span>{selectedLead.phone}</span>
                </a>
                {selectedLead.email && (
                  <a
                    href={`mailto:${selectedLead.email}`}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
                  >
                    <Mail className="w-4 h-4 text-gold-400" />
                    <span>{selectedLead.email}</span>
                  </a>
                )}
              </div>

              {/* Notes History */}
              <div className="space-y-3 pt-2">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block">
                  CRM Activity & Follow-Up Notes
                </span>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {selectedLead.notes && selectedLead.notes.length > 0 ? (
                    selectedLead.notes.map((note, i) => (
                      <div key={i} className="p-2.5 rounded-lg bg-obsidian-950 border border-white/5 text-[11px] space-y-1">
                        <p className="text-slate-200">{note.note}</p>
                        <div className="text-[9px] text-slate-400 flex items-center justify-between">
                          <span>{note.addedBy}</span>
                          <span>{new Date(note.addedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-400 text-[11px]">No notes logged yet.</p>
                  )}
                </div>

                {/* Add Note Input */}
                <form onSubmit={handleAddNote} className="flex gap-2 pt-2">
                  <input
                    type="text"
                    placeholder="Log call remarks or notes..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg bg-obsidian-950 border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-gold-500"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 rounded-lg bg-gold-500 text-obsidian-950 font-bold hover:bg-gold-400"
                  >
                    Post
                  </button>
                </form>
              </div>

            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-obsidian-900 border border-white/10 text-center text-slate-400">
              Select a lead from the table to view CRM activity.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
