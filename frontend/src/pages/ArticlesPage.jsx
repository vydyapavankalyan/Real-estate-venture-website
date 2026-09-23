import React, { useState } from 'react';
import { FileText, Video, Download, Eye, ExternalLink, Calendar, Tag, Play, X, ArrowRight, ShieldCheck } from 'lucide-react';

export const ArticlesPage = ({ onOpenEnquiry }) => {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [activeVideoModal, setActiveVideoModal] = useState(false);
  const [activeImageModal, setActiveImageModal] = useState(null);

  const categories = ['ALL', 'Development News', 'Infrastructure', 'Future Development', 'Video Content'];

  const articles = [
    {
      id: 1,
      title: "Hyderabad to get its fourth city: CM",
      category: "Development News",
      date: "Latest Official Update",
      image: "https://www.rajan-castle-properties.net/lovable-uploads/e09ca238-4f7a-4677-8f16-aacf50aa98c6.png",
      description: "Concept has three development rings - Chief Minister A. Revanth Reddy outlines the vision for Telangana's Future State with three development rings targeting urban, semi-urban, and rural areas.",
      longText: "Telangana Chief Minister A. Revanth Reddy has announced the creation of Hyderabad's Fourth City (following Hyderabad, Secunderabad, and Cyberabad) centered around Mucherla and Mirkhanpet in Rangareddy district. The master plan designates three concentric development rings connecting inner urban hubs with outer greenfield employment corridors, including the 300-foot greenfield link road and connectivity to the proposed Regional Ring Road (RRR).",
      attachments: [
        { name: "Development Plan Details.pdf", type: "pdf", size: "2.4 MB" }
      ]
    },
    {
      id: 2,
      title: "Another Financial District - Development Plans",
      category: "Infrastructure",
      date: "Master Plan Bulletin",
      image: "https://www.rajan-castle-properties.net/lovable-uploads/75d80626-582a-4d13-b191-4203148bef47.png",
      description: "Comprehensive development plans for financial district and surrounding areas with detailed infrastructure mapping and growth projections for the region.",
      longText: "As the existing Gachibowli and Nanakramguda Financial District reaches peak commercial absorption, HMDA has unveiled the expansion blueprint for a secondary Financial Hub along the South-West growth corridor. This zone integrates high-density commercial zoning, multimodal transit, and dedicated infrastructure corridors designed to house global financial institutions, FinTech enterprises, and data centers.",
      attachments: [
        { name: "Financial District Plans.pdf", type: "pdf", size: "3.1 MB" }
      ]
    },
    {
      id: 3,
      title: "Future City Development",
      category: "Future Development",
      date: "Comprehensive Blueprint",
      image: "https://www.rajan-castle-properties.net/lovable-uploads/9f109d9e-f8fa-4c04-9826-5c7d09a29871.png",
      description: "హైదరాబాద్ చుట్టుపక్కల భవిష్యత్ నగర అభివృద్ధి ప్రణాళికలు. స్మార్ట్ సిటీ ప్రాజెక్టులు, IT హబ్‌లు, మెట్రో విస్తరణ మరియు గ్రీన్ కారిడార్‌లతో కూడిన అధునాతన పట్టణ అభివృద్ధి. Future city development plans around Hyderabad with smart infrastructure, sustainable housing, and integrated transport systems.",
      longText: "The Telangana government is taking rapid steps towards building a future city at Mucherla / Mirkhanpet. As part of this historic initiative, the foundation stone for the Young India Skill University has already been laid. Additionally, Amazon has earmarked over 48 acres in Meerkhanpet for a ₹5,809 Crore data center hub, accompanied by a dedicated 300ft Greenfield highway from Raviryal.",
      attachments: [
        { name: "Future City Master Plan.png", type: "image", url: "https://www.rajan-castle-properties.net/lovable-uploads/9f109d9e-f8fa-4c04-9826-5c7d09a29871.png" },
        { name: "Development Timeline 2024-2030.pdf", type: "pdf", size: "4.2 MB" },
        { name: "Watch Development Video", type: "video", url: "https://www.youtube.com/watch?v=dxKDwsEJbUI" }
      ]
    },
    {
      id: 4,
      title: "Hyderabad Development Vision - Video Overview",
      category: "Video Content",
      date: "Executive Media",
      image: "https://www.rajan-castle-properties.net/lovable-uploads/17d6e73c-0a9a-4a5a-8bfe-d0b2c1973076.png",
      videoUrl: "https://www.youtube.com/embed/dxKDwsEJbUI",
      description: "Watch the comprehensive video overview of Hyderabad's future development plans and infrastructure projects. This video covers the latest updates on urban planning, smart city initiatives, and growth strategies for the region.",
      longText: "A visual briefing highlighting the transformative transit corridors, the Regional Ring Road (RRR) alignment, the Young India Skill University construction, and prime investment corridors across Southern and Western Hyderabad.",
      attachments: [
        { name: "Watch Development Video", type: "video", url: "https://www.youtube.com/watch?v=dxKDwsEJbUI" }
      ]
    }
  ];

  const filteredArticles = selectedCategory === 'ALL'
    ? articles
    : articles.filter(a => a.category === selectedCategory);

  return (
    <div className="min-h-screen bg-obsidian-950 py-16 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-serif uppercase tracking-widest text-gold-400 font-bold">
            News & Market Intelligence
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Latest Articles & Development Updates
          </h1>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-light">
            Stay updated with authoritative developments in Hyderabad's Fourth City, infrastructure expansions, master plans, and video briefings from Rajan - Castle Properties.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-gold-400 to-gold-600 mx-auto rounded-full mt-4" />
        </div>

        {/* Featured Video Player Highlight */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-obsidian-900 to-obsidian-950 border border-gold-500/30 shadow-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black">
              <iframe
                src="https://www.youtube.com/embed/dxKDwsEJbUI"
                title="Hyderabad Development Vision - Rajan Castle Properties"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold">
                <Video className="w-3.5 h-3.5" />
                <span>Featured Video Briefing</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-white">
                Hyderabad Development Vision & Fourth City Blueprint
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Watch the comprehensive overview of Hyderabad's next decade of growth: Mirkhanpet Skill University, 200ft and 330ft connecting highways, and the ₹5,800+ Cr Amazon Data Center campus.
              </p>
              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => onOpenEnquiry && onOpenEnquiry({ message: 'Inquiring about Fourth City Mirkhanpet development video and upcoming project allocations' })}
                  className="px-5 py-2.5 rounded-xl bg-gold-500 text-obsidian-950 font-bold text-xs uppercase tracking-wider hover:bg-gold-400 transition-all shadow"
                >
                  Consult Investment Advisory
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-gold-500 text-obsidian-950 font-bold shadow-luxury'
                  : 'bg-obsidian-900 border border-white/10 text-slate-300 hover:border-gold-500/40 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className="rounded-2xl bg-obsidian-900 border border-white/10 overflow-hidden hover:border-gold-500/40 shadow-luxury hover:shadow-luxury-hover transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Article Image with Zoom Lightbox Trigger */}
                <div className="relative aspect-[16/10] overflow-hidden bg-black/50">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                    onClick={() => setActiveImageModal(article.image)}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-obsidian-950/85 backdrop-blur-md text-gold-400 border border-gold-500/30">
                      {article.category}
                    </span>
                  </div>
                  {article.videoUrl && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <div className="w-12 h-12 rounded-full bg-gold-500/90 text-obsidian-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 fill-current pl-0.5" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Article Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-gold-400" />
                    <span>{article.date}</span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-white group-hover:text-gold-300 transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-4">
                    {article.description}
                  </p>
                </div>
              </div>

              {/* Attachments & Action Footer */}
              <div className="p-6 pt-0 border-t border-white/5 space-y-3">
                {article.attachments && article.attachments.length > 0 && (
                  <div className="space-y-1.5 pt-4">
                    <span className="text-[10px] uppercase font-semibold text-slate-400 block tracking-wider">
                      Official Attachments:
                    </span>
                    {article.attachments.map((att, attIdx) => (
                      <div
                        key={attIdx}
                        className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] border border-white/10 text-xs text-slate-300"
                      >
                        <div className="flex items-center gap-2 truncate">
                          {att.type === 'video' ? (
                            <Video className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                          ) : (
                            <FileText className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                          )}
                          <span className="truncate">{att.name}</span>
                        </div>
                        {att.url ? (
                          <a
                            href={att.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 hover:text-gold-400 transition-colors"
                            title="Open"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        ) : (
                          <span className="text-[10px] text-slate-400">{att.size || 'PDF'}</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-2">
                  <button
                    onClick={() => onOpenEnquiry && onOpenEnquiry({ message: `Inquiring about document details: ${article.title}` })}
                    className="w-full text-center py-2.5 rounded-lg border border-gold-500/30 text-gold-400 hover:bg-gold-500/10 text-xs font-semibold transition-colors"
                  >
                    Request Full Documentation
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Image Preview Modal */}
      {activeImageModal && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setActiveImageModal(null)}
        >
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setActiveImageModal(null)}
              className="absolute -top-10 right-0 p-2 text-white hover:text-gold-400"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={activeImageModal}
              alt="Plan detail"
              className="w-full h-auto rounded-xl shadow-2xl border border-white/10"
            />
          </div>
        </div>
      )}

    </div>
  );
};
