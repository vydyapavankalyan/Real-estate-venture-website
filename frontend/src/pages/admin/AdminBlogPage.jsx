import React, { useState, useEffect } from 'react';
import { blogService } from '../../services/allServices';
import { Plus, Edit2, Trash2, Eye, Calendar, Tag, Search, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

const EMPTY_FORM = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  category: 'Development News',
  tags: '',
  coverImageUrl: '',
  published: false,
};

const CATEGORIES = ['Development News', 'Infrastructure', 'Future Development', 'Investment Tips', 'Video Content', 'Market Analysis'];

export const AdminBlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState('');

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    blogService.getAll()
      .then(data => setPosts(Array.isArray(data) ? data : []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  const openNew = () => {
    setEditingPost(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
  };

  const openEdit = (post) => {
    setEditingPost(post);
    setForm({
      title: post.title || '',
      slug: post.slug || '',
      excerpt: post.excerpt || '',
      content: post.content || '',
      category: post.category || 'Development News',
      tags: Array.isArray(post.tags) ? post.tags.join(', ') : (post.tags || ''),
      coverImageUrl: post.coverImageUrl || '',
      published: post.published || false,
    });
    setShowForm(true);
  };

  const handleSlug = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setForm(prev => ({
      ...prev,
      [name]: val,
      ...(name === 'title' && !editingPost ? { slug: handleSlug(value) } : {}),
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setSaving(true);
    const payload = { ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) };
    try {
      if (editingPost) {
        // update
        const res = await fetch(`/api/blogs/${editingPost.id || editingPost._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('rcp_token')}` },
          body: JSON.stringify(payload),
        });
        const updated = await res.json();
        setPosts(prev => prev.map(p => (p.id || p._id) === (editingPost.id || editingPost._id) ? updated : p));
      } else {
        // create
        const res = await fetch('/api/blogs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('rcp_token')}` },
          body: JSON.stringify(payload),
        });
        const created = await res.json();
        setPosts(prev => [created, ...prev]);
      }
      showToast(editingPost ? 'Post updated!' : 'Post created!');
      setShowForm(false);
    } catch {
      showToast('Save failed. Please try again.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (post) => {
    if (!window.confirm(`Delete "${post.title}"?`)) return;
    try {
      await fetch(`/api/blogs/${post.id || post._id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('rcp_token')}` },
      });
      setPosts(prev => prev.filter(p => (p.id || p._id) !== (post.id || post._id)));
      showToast('Post deleted.');
    } catch {
      showToast('Delete failed.', 'error');
    }
  };

  const filtered = posts.filter(p => p.title?.toLowerCase().includes(search.toLowerCase()) || p.category?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl text-sm font-semibold transition-all ${toast.type === 'error' ? 'bg-red-900 border border-red-500/40 text-red-200' : 'bg-emerald-900 border border-emerald-500/40 text-emerald-200'}`}>
          {toast.type === 'error' ? <AlertCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-white">Blog & Articles</h1>
          <p className="text-slate-400 text-sm mt-1">{posts.length} articles &nbsp;·&nbsp; Manage market insights and news</p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian-950 font-bold text-sm hover:from-gold-400 hover:to-gold-500 transition-all"
        >
          <Plus className="w-4 h-4" /> New Article
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search articles..."
          className="w-full pl-11 pr-4 py-3 rounded-xl bg-obsidian-900 border border-white/10 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-gold-500/50"
        />
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-obsidian-900 border border-white/15 rounded-2xl w-full max-w-2xl my-8 shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="font-serif text-xl font-bold text-white">{editingPost ? 'Edit Article' : 'New Article'}</h2>
              <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-white transition-colors text-2xl leading-none">&times;</button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Title *', name: 'title', type: 'text', placeholder: 'Fourth City Mirkhanpet: 2026 Overview', full: true },
                  { label: 'Slug', name: 'slug', type: 'text', placeholder: 'auto-generated', full: false },
                  { label: 'Cover Image URL', name: 'coverImageUrl', type: 'url', placeholder: 'https://...', full: false },
                ].map(f => (
                  <div key={f.name} className={f.full ? 'sm:col-span-2' : ''}>
                    <label className="block text-xs text-slate-400 font-semibold mb-1.5">{f.label}</label>
                    <input name={f.name} type={f.type} value={form[f.name]} onChange={handleChange} placeholder={f.placeholder}
                      className="w-full px-4 py-2.5 rounded-xl bg-obsidian-950 border border-white/10 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-gold-500/50" />
                  </div>
                ))}
                <div>
                  <label className="block text-xs text-slate-400 font-semibold mb-1.5">Category</label>
                  <select name="category" value={form.category} onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-obsidian-950 border border-white/10 text-white text-sm focus:outline-none focus:border-gold-500/50">
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 font-semibold mb-1.5">Tags (comma-separated)</label>
                  <input name="tags" value={form.tags} onChange={handleChange} placeholder="Mirkhanpet, HMDA, Investment"
                    className="w-full px-4 py-2.5 rounded-xl bg-obsidian-950 border border-white/10 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-gold-500/50" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-slate-400 font-semibold mb-1.5">Excerpt</label>
                <textarea name="excerpt" value={form.excerpt} onChange={handleChange} rows={2} placeholder="Short summary shown in article cards..."
                  className="w-full px-4 py-2.5 rounded-xl bg-obsidian-950 border border-white/10 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-gold-500/50 resize-none" />
              </div>
              <div>
                <label className="block text-xs text-slate-400 font-semibold mb-1.5">Content (Markdown or HTML)</label>
                <textarea name="content" value={form.content} onChange={handleChange} rows={8} placeholder="Full article content..."
                  className="w-full px-4 py-2.5 rounded-xl bg-obsidian-950 border border-white/10 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-gold-500/50 resize-none font-mono" />
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" name="published" checked={form.published} onChange={handleChange} className="w-4 h-4 accent-gold-500" />
                <span className="text-sm text-slate-300">Publish immediately (visible on website)</span>
              </label>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian-950 font-bold text-sm hover:from-gold-400 hover:to-gold-500 disabled:opacity-50 transition-all">
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                  {saving ? 'Saving...' : (editingPost ? 'Update Article' : 'Publish Article')}
                </button>
                <button type="button" onClick={() => setShowForm(false)}
                  className="px-6 py-3 rounded-xl border border-white/15 text-slate-400 text-sm hover:border-white/30 hover:text-white transition-all">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Posts table */}
      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 text-gold-400 animate-spin" /></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <Tag className="w-10 h-10 mx-auto mb-4 opacity-30" />
          <p>{search ? 'No articles match your search.' : 'No articles yet. Create your first one!'}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(post => (
            <div key={post.id || post._id} className="bg-obsidian-900 border border-white/10 rounded-2xl p-5 flex items-start gap-4 hover:border-white/20 transition-colors">
              {post.coverImageUrl && (
                <img src={post.coverImageUrl} alt={post.title} className="w-16 h-12 rounded-lg object-cover shrink-0 hidden sm:block" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${post.published ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-700 text-slate-400 border border-white/10'}`}>
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                  <span className="text-[10px] text-slate-500 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">{post.category}</span>
                </div>
                <h3 className="font-semibold text-white text-sm truncate">{post.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{post.excerpt}</p>
                {post.createdAt && (
                  <div className="flex items-center gap-1 mt-1.5 text-[10px] text-slate-500">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => openEdit(post)} className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-gold-400 transition-colors" title="Edit">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(post)} className="p-2 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-colors" title="Delete">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
