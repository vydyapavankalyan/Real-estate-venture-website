import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Star, 
  Quote, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  Building2, 
  Users, 
  Award, 
  MapPin, 
  Calendar, 
  Play, 
  Pause, 
  CheckCircle2, 
  ArrowRight,
  PhoneCall
} from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    name: "Dr. K. Srinivas Rao",
    role: "Senior Consultant Surgeon & NRI Investor",
    city: "Dallas, USA / Hyderabad",
    location: "Fourth City Mirkhanpet",
    subLocation: "Adjacent to Young India Skill University",
    investmentType: "2.5 Acre High-Growth Land Parcel",
    rating: 5.0,
    date: "February 2025",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    quote: "Investing in Mirkhanpet through Bhagyarajan and Castle Properties has been my most rewarding real estate decision. With the Skill University and Amazon Data Center right nearby, land appreciation here has exceeded all our projections. Their 100% legal diligence and clear title documentation gave me complete peace of mind as an overseas NRI.",
    category: "Fourth City Mirkhanpet",
    verified: true
  },
  {
    id: 2,
    name: "Pooja & Vikram Reddy",
    role: "VP of Engineering & FinTech Founder",
    city: "Kokapet, Hyderabad",
    location: "Neopolis, Kokapet",
    subLocation: "Golden Mile Skyscraper Corridor",
    investmentType: "4 BHK Ultra-Luxury Sky Villa (5,200 sq.ft)",
    rating: 5.0,
    date: "January 2025",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    quote: "We spent 8 months hunting for an ultra-luxury apartment in Kokapet before meeting Castle Properties. Their insider access to high-floor units in Neopolis was invaluable. Bhagyarajan personally negotiated terms with the developer and managed RERA registration seamlessly. A truly five-star advisory experience.",
    category: "Neopolis",
    verified: true
  },
  {
    id: 3,
    name: "Anand Varma",
    role: "Managing Director, Varma Logistics & Infra",
    city: "Jubilee Hills, Hyderabad",
    location: "Financial District",
    subLocation: "Nanakramguda Commercial Hub",
    investmentType: "Grade-A Pre-Leased Commercial Floor",
    rating: 4.9,
    date: "December 2024",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    quote: "Acquiring prime commercial space in Hyderabad's Financial District requires deep market relationships. Castle Properties identified an off-market high-yield asset with corporate tenants already signed. The transparency, prompt RERA scrutiny, and zero brokerage speculation set them miles apart from typical brokers.",
    category: "Financial District",
    verified: true
  },
  {
    id: 4,
    name: "Sunita & Rajesh Kothari",
    role: "Enterprise Architects, Amazon AWS",
    city: "Gachibowli, Hyderabad",
    location: "Fourth City Mirkhanpet",
    subLocation: "Amazon Data Center Growth Belt",
    investmentType: "600 Sq. Yds Gated Villa Plot",
    rating: 5.0,
    date: "November 2024",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
    quote: "When Telangana announced the Fourth City master plan, we wanted early entry before prices skyrocketed. Rajan Castle Properties arranged an exclusive chauffeur site inspection to Mirkhanpet, walked us through regional ring road access points, and finalized our registration within two weeks. Exceptional professionalism.",
    category: "Fourth City Mirkhanpet",
    verified: true
  },
  {
    id: 5,
    name: "Harsha Vardhan Goud",
    role: "Serial Tech Entrepreneur & Angel Investor",
    city: "Kokapet, Hyderabad",
    location: "Kokapet",
    subLocation: "Overlooking Osman Sagar Lake",
    investmentType: "Triplex Lake-View Penthouse",
    rating: 4.9,
    date: "October 2024",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80",
    quote: "The team at Castle Properties understands discretion and luxury at the highest echelon. They secured an exclusive corner penthouse in Kokapet overlooking Osman Sagar lake. From title search to private banking liaison, the journey was effortless. Rajan is our lifetime property consultant.",
    category: "Kokapet",
    verified: true
  },
  {
    id: 6,
    name: "Deepika Chigurupati",
    role: "Partner, Life Sciences VC & Angel Syndicate",
    city: "Banjara Hills, Hyderabad",
    location: "Neopolis, Kokapet",
    subLocation: "Trump Tower & Signature Towers Precinct",
    investmentType: "Strategic High-Rise Asset Holding",
    rating: 5.0,
    date: "September 2024",
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=300&q=80",
    quote: "Castle Properties has a pulse on Hyderabad's growth corridors that no one else can match. Bhagyarajan guided our family into high-value holdings in both Neopolis and Fourth City. His integrity, punctual updates, and RERA-first verification standard are second to none in Telangana real estate.",
    category: "Neopolis",
    verified: true
  },
  {
    id: 7,
    name: "Venkatesh Mandava",
    role: "Director of Product, Google Hyderabad",
    city: "Financial District, Hyderabad",
    location: "Financial District",
    subLocation: "Wipro Junction & ORR Access",
    investmentType: "3 BHK Premium Gated Residence",
    rating: 4.8,
    date: "August 2024",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
    quote: "I wanted a home close to my office in Financial District with resort-level amenities. Castle Properties shortlisted only genuine Tier-1 developer projects, saved me weeks of unnecessary site visits, and negotiated a pricing structure that was better than direct market rates.",
    category: "Financial District",
    verified: true
  },
  {
    id: 8,
    name: "Madhuri & Chaitanya Alluri",
    role: "Non-Resident Indian Investors",
    city: "Singapore / Hyderabad",
    location: "Fourth City Mirkhanpet",
    subLocation: "Pharma City & Mega Industrial Corridor",
    investmentType: "Strategic Agro-Commercial Land Holding",
    rating: 5.0,
    date: "July 2024",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
    quote: "Managing property acquisitions from Singapore used to be daunting. Castle Properties provided end-to-end video walkthroughs, drone boundary mapping, revenue department verification, and power-of-attorney coordination. They are the benchmark of real estate integrity in Hyderabad.",
    category: "Fourth City Mirkhanpet",
    verified: true
  }
];

const CATEGORIES = [
  "All Reviews",
  "Fourth City Mirkhanpet",
  "Kokapet",
  "Neopolis",
  "Financial District"
];

const STATS = [
  {
    value: "4.9",
    suffix: "/ 5.0",
    label: "Average Rating",
    subtext: "From 350+ verified Google & client reviews",
    icon: Star,
    highlight: true
  },
  {
    value: "1,000+",
    suffix: "",
    label: "Happy Clients",
    subtext: "HNIs, NRI investors & enterprise leaders",
    icon: Users,
    highlight: false
  },
  {
    value: "500+",
    suffix: "",
    label: "Properties Sold",
    subtext: "Luxury residences & high-growth land parcels",
    icon: Building2,
    highlight: false
  },
  {
    value: "100%",
    suffix: "",
    label: "Clear Title Assurance",
    subtext: "Telangana RERA compliant & verified conveyances",
    icon: ShieldCheck,
    highlight: false
  }
];

export const TestimonialsSection = ({ onOpenEnquiry, onOpenSiteVisit }) => {
  const [selectedCategory, setSelectedCategory] = useState("All Reviews");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [visibleCards, setVisibleCards] = useState(3);
  const containerRef = useRef(null);

  // Update visible cards count on screen resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filtered testimonials
  const filteredTestimonials = useMemo(() => {
    if (selectedCategory === "All Reviews") {
      return TESTIMONIALS;
    }
    return TESTIMONIALS.filter(item => item.category === selectedCategory);
  }, [selectedCategory]);

  const maxIndex = Math.max(0, filteredTestimonials.length - visibleCards);

  // Reset index when category changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCategory]);

  // Ensure index remains in bounds if window resizes
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [currentIndex, maxIndex]);

  // Auto-scroll effect (paused on hover or when auto-play is off)
  useEffect(() => {
    if (!isAutoPlaying || isHovered || maxIndex === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
    }, 5500);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isHovered, maxIndex]);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-24 bg-obsidian-950 border-t border-white/10 relative overflow-hidden select-none">
      {/* Decorative ambient gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl pointer-events-none translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ============================================================== */}
        {/* SECTION HEADER                                                 */}
        {/* ============================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-widest shadow-sm">
            <Award className="w-3.5 h-3.5" />
            <span>Client Acclaim & Trust</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
            Trusted by Hyderabad's Elite <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 bg-clip-text text-transparent">
              Investors & Discerning Families
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Discover why enterprise leaders, tech founders, and NRI families entrust Castle Properties for signature holdings in Fourth City Mirkhanpet, Kokapet, and Neopolis.
          </p>

          <div className="w-20 h-1 bg-gradient-to-r from-gold-400 to-gold-600 mx-auto rounded-full mt-4" />
        </div>

        {/* ============================================================== */}
        {/* 🌟 STATS OVERVIEW RIBBON                                       */}
        {/* ============================================================== */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div 
                key={i} 
                className="p-6 rounded-2xl bg-gradient-to-b from-obsidian-900 to-obsidian-950 border border-gold-500/20 shadow-luxury hover:border-gold-500/40 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  {stat.highlight && (
                    <div className="flex items-center gap-1 text-gold-400">
                      {[...Array(5)].map((_, starIdx) => (
                        <Star key={starIdx} className="w-3.5 h-3.5 fill-gold-400" />
                      ))}
                    </div>
                  )}
                </div>

                <div className="font-serif text-2xl sm:text-3xl font-bold text-white flex items-baseline gap-1">
                  <span>{stat.value}</span>
                  {stat.suffix && <span className="text-sm font-sans text-gold-400">{stat.suffix}</span>}
                </div>

                <div className="text-sm font-semibold text-slate-200 mt-1">
                  {stat.label}
                </div>

                <div className="text-xs text-slate-400 mt-0.5 leading-snug">
                  {stat.subtext}
                </div>
              </div>
            );
          })}
        </div>

        {/* ============================================================== */}
        {/* CATEGORY FILTER TABS & CAROUSEL CONTROLS                        */}
        {/* ============================================================== */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          
          {/* Location category filters */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
            {CATEGORIES.map(category => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? 'bg-gold-500 text-obsidian-950 shadow-luxury font-bold'
                      : 'bg-obsidian-900 text-slate-300 border border-white/10 hover:border-gold-500/40 hover:text-white'
                  }`}
                >
                  {category}
                  {category === "All Reviews" && ` (${TESTIMONIALS.length})`}
                </button>
              );
            })}
          </div>

          {/* Navigation & Autoplay Controls */}
          <div className="flex items-center gap-2 self-end sm:self-center">
            
            {/* Auto-scroll toggle */}
            <button
              onClick={() => setIsAutoPlaying(prev => !prev)}
              title={isAutoPlaying ? "Pause Auto-scroll" : "Play Auto-scroll"}
              className="w-10 h-10 rounded-xl bg-obsidian-900 border border-white/10 text-slate-400 hover:text-gold-400 hover:border-gold-500/30 flex items-center justify-center transition-all"
            >
              {isAutoPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4 ml-0.5" />
              )}
            </button>

            {/* Previous slide */}
            <button
              onClick={handlePrev}
              disabled={maxIndex === 0}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-xl bg-obsidian-900 border border-white/10 text-slate-300 hover:text-gold-400 hover:border-gold-500/40 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Next slide */}
            <button
              onClick={handleNext}
              disabled={maxIndex === 0}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-xl bg-obsidian-900 border border-white/10 text-slate-300 hover:text-gold-400 hover:border-gold-500/40 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* CAROUSEL TRACK                                                 */}
        {/* ============================================================== */}
        <div 
          ref={containerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative overflow-hidden py-2"
        >
          <div 
            className="flex transition-transform duration-700 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`
            }}
          >
            {filteredTestimonials.map((item) => (
              <div
                key={item.id}
                className="flex-shrink-0 px-3"
                style={{ width: `${100 / visibleCards}%` }}
              >
                <div className="h-full rounded-2xl bg-gradient-to-b from-obsidian-900/95 via-obsidian-900/80 to-obsidian-950 border border-gold-500/20 hover:border-gold-500/50 p-6 sm:p-7 flex flex-col justify-between shadow-luxury hover:shadow-luxury-hover transition-all duration-300 relative group">
                  
                  {/* Subtle decorative gold quote watermark */}
                  <Quote className="absolute top-5 right-5 w-12 h-12 text-gold-500/10 group-hover:text-gold-500/20 transition-colors pointer-events-none" />

                  <div className="space-y-4 relative z-10">
                    
                    {/* Top tags: Location & Property Type */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold">
                        <MapPin className="w-3 h-3 text-gold-400" />
                        {item.location}
                      </span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300 text-[11px]">
                        {item.investmentType}
                      </span>
                    </div>

                    {/* Star Rating & Numeric */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-gold-400">
                        {[...Array(5)].map((_, starIndex) => (
                          <Star 
                            key={starIndex} 
                            className="w-4 h-4 fill-gold-400 text-gold-400" 
                          />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-white bg-gold-500/20 px-1.5 py-0.5 rounded">
                        {item.rating.toFixed(1)}
                      </span>
                    </div>

                    {/* Testimonial Quote */}
                    <p className="text-sm text-slate-300 leading-relaxed italic line-clamp-6">
                      "{item.quote}"
                    </p>
                  </div>

                  {/* Client Profile Footer */}
                  <div className="pt-6 mt-6 border-t border-white/10 relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img 
                        src={item.avatar} 
                        alt={item.name} 
                        className="w-12 h-12 rounded-full object-cover border-2 border-gold-400/60 shadow-md flex-shrink-0"
                        loading="lazy"
                      />
                      <div className="min-w-0">
                        <h3 className="font-serif text-sm sm:text-base font-bold text-white group-hover:text-gold-400 transition-colors truncate">
                          {item.name}
                        </h3>
                        <p className="text-xs text-slate-400 truncate">
                          {item.role}
                        </p>
                        <p className="text-[11px] text-slate-500 truncate">
                          {item.city}
                        </p>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0 pl-2">
                      <div className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Verified</span>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-slate-500 mt-0.5 justify-end">
                        <Calendar className="w-3 h-3" />
                        <span>{item.date}</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================== */}
        {/* CAROUSEL PAGINATION PILL DOTS                                  */}
        {/* ============================================================== */}
        {maxIndex > 0 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, dotIdx) => {
              const isActive = currentIndex === dotIdx;
              return (
                <button
                  key={dotIdx}
                  onClick={() => handleDotClick(dotIdx)}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                  className={`transition-all duration-300 rounded-full ${
                    isActive 
                      ? 'w-8 h-2.5 bg-gradient-to-r from-gold-400 to-gold-600 shadow-glow' 
                      : 'w-2.5 h-2.5 bg-white/20 hover:bg-white/40'
                  }`}
                />
              );
            })}
          </div>
        )}

        {/* ============================================================== */}
        {/* TRUST BANNER & CONCIERGE CALLOUT                               */}
        {/* ============================================================== */}
        <div className="mt-16 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-obsidian-900 via-obsidian-850 to-obsidian-900 border border-gold-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-luxury">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-gold-400 text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-gold-400" />
              <span>Telangana RERA Compliant & Independent Due Diligence</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
              Ready to Secure Your Piece of Hyderabad's Next Growth Corridor?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
              Connect directly with our founder Rajan Bhagyarajan for private site walkthroughs in Fourth City Mirkhanpet and off-market residences in Kokapet & Neopolis.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            {onOpenSiteVisit && (
              <button
                onClick={onOpenSiteVisit}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gold-500 text-obsidian-950 font-bold text-xs uppercase tracking-wider hover:bg-gold-400 transition-all shadow-luxury flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <span>Book Guided Site Visit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
            
            <a
              href="tel:+919090104949"
              className="w-full sm:w-auto px-6 py-3 rounded-xl border border-gold-500/40 text-gold-400 hover:bg-gold-500/10 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call +91 9090104949</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
