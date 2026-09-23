import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2, Tag } from 'lucide-react';

export const ProjectGalleryViewer = ({ images = [] }) => {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const categories = ['ALL', ...Array.from(new Set(images.map(img => img.category).filter(Boolean)))];

  const filteredImages = activeCategory === 'ALL'
    ? images
    : images.filter(img => img.category === activeCategory);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setIsZoomed(false);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    setIsZoomed(false);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev + 1) % filteredImages.length);
    setIsZoomed(false);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
    setIsZoomed(false);
  };

  if (!images || images.length === 0) {
    return (
      <div className="p-8 text-center bg-obsidian-900 rounded-2xl border border-white/10 text-slate-400 text-sm">
        No gallery photographs available for this venture yet.
      </div>
    );
  }

  const currentImg = lightboxIndex !== null ? filteredImages[lightboxIndex] : null;

  return (
    <div className="space-y-6">
      
      {/* Category Albums Filter Tabs */}
      {categories.length > 1 && (
        <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs font-semibold px-3.5 py-1.5 rounded-lg border transition-all ${
                activeCategory === cat
                  ? 'bg-gold-500 text-obsidian-950 border-gold-400 shadow-luxury'
                  : 'bg-white/5 text-slate-300 border-white/10 hover:border-gold-500/30'
              }`}
            >
              {cat.replace('_', ' ')}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredImages.map((img, index) => (
          <div
            key={index}
            onClick={() => openLightbox(index)}
            className="group relative h-64 rounded-xl overflow-hidden cursor-pointer bg-obsidian-950 border border-white/10 hover:border-gold-500/50 transition-all duration-300"
          >
            <img
              src={img.url}
              alt={img.caption || 'Project visual'}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
              <span className="font-medium truncate drop-shadow">{img.caption || 'Residence View'}</span>
              <Maximize2 className="w-4 h-4 text-gold-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {img.category && (
              <span className="absolute top-3 left-3 text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/10 text-gold-300">
                {img.category.replace('_', ' ')}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Full-Screen Lightbox Modal */}
      {lightboxIndex !== null && currentImg && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-8 animate-fadeIn"
        >
          {/* Top Control Bar */}
          <div className="w-full flex items-center justify-between z-10 text-white" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold font-serif">
                {currentImg.category?.replace('_', ' ') || 'Gallery Preview'}
              </span>
              <span className="text-xs text-slate-400">
                ({lightboxIndex + 1} of {filteredImages.length})
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 transition-colors"
                title={isZoomed ? "Zoom Out" : "Zoom In"}
              >
                {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
              </button>

              <button
                onClick={closeLightbox}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Photo Center Container */}
          <div
            className="relative flex-1 w-full max-w-5xl flex items-center justify-center my-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentImg.url}
              alt={currentImg.caption}
              className={`max-h-[75vh] w-auto max-w-full rounded-lg object-contain transition-transform duration-300 shadow-2xl ${
                isZoomed ? 'scale-150 cursor-grab active:cursor-grabbing' : 'scale-100 cursor-zoom-in'
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
            />

            {/* Navigation Arrows */}
            {filteredImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 sm:left-4 p-3 rounded-full bg-black/60 border border-white/10 text-white hover:bg-gold-500 hover:text-obsidian-950 transition-all"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 sm:right-4 p-3 rounded-full bg-black/60 border border-white/10 text-white hover:bg-gold-500 hover:text-obsidian-950 transition-all"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Bottom Caption & Thumbnail Strip */}
          <div className="w-full max-w-3xl text-center space-y-3 z-10" onClick={(e) => e.stopPropagation()}>
            <p className="text-sm text-slate-200 font-medium">
              {currentImg.caption || 'Architectural visual of residence and development.'}
            </p>

            <div className="flex items-center justify-center gap-2 overflow-x-auto py-2">
              {filteredImages.map((thumb, idx) => (
                <button
                  key={idx}
                  onClick={() => { setLightboxIndex(idx); setIsZoomed(false); }}
                  className={`relative w-14 h-10 rounded-md overflow-hidden shrink-0 border-2 transition-all ${
                    idx === lightboxIndex ? 'border-gold-400 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={thumb.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
