import React, { useState, useEffect } from 'react';
import { Building, TrendingUp, Users, Trophy, Star } from 'lucide-react';

// Animated number counter hook
const useCounter = (target, duration = 2000, startCounting = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCounting) return;

    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, duration, startCounting]);

  return count;
};

export const StatsCounter = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const el = document.getElementById('stats-counter-section');
    if (el) observer.observe(el);

    return () => observer.disconnect();
  }, []);

  const propertiesSold = useCounter(500, 2000, isVisible);
  const happyClients = useCounter(1000, 2500, isVisible);
  const yearsExperience = useCounter(15, 1500, isVisible);
  const rating = useCounter(49, 1800, isVisible); // 4.9 * 10

  const stats = [
    {
      icon: Building,
      value: `${propertiesSold}+`,
      label: 'Properties Sold',
      color: 'text-gold-400',
    },
    {
      icon: Users,
      value: `${happyClients}+`,
      label: 'Happy Clients',
      color: 'text-emerald-400',
    },
    {
      icon: Trophy,
      value: `${yearsExperience}+`,
      label: 'Years Experience',
      color: 'text-sky-400',
    },
    {
      icon: Star,
      value: `${(rating / 10).toFixed(1)}`,
      label: 'Client Rating',
      color: 'text-amber-400',
    },
  ];

  return (
    <section
      id="stats-counter-section"
      className="py-16 bg-obsidian-950 border-y border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="space-y-2 group">
                <div className="w-12 h-12 rounded-2xl mx-auto bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:border-gold-500/30 transition-colors">
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
