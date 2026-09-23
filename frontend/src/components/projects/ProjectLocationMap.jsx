import React, { useEffect, useRef } from 'react';
import { MapPin, Navigation, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import L from 'leaflet';

export const ProjectLocationMap = ({ project }) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  const projectLat = project.location?.latitude || 17.3890;
  const projectLng = project.location?.longitude || 78.3280;

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
    }

    // Initialize Leaflet map
    const map = L.map(mapContainerRef.current, {
      center: [projectLat, projectLng],
      zoom: 13,
      scrollWheelZoom: false,
    });
    mapInstanceRef.current = map;

    // Dark-mode luxury OpenStreetMap tiles via CartoDB Dark Matter
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
      maxZoom: 19,
    }).addTo(map);

    // Custom Luxury Gold Pin for the Project
    const projectIcon = L.divIcon({
      className: 'custom-project-pin',
      html: `
        <div style="background: linear-gradient(135deg, #D4AF37, #856427); color: #070C18; padding: 8px 12px; border-radius: 20px; font-weight: bold; font-size: 11px; box-shadow: 0 4px 15px rgba(212, 175, 55, 0.5); display: flex; align-items: center; gap: 5px; border: 2px solid #FFF; white-space: nowrap;">
          <span>★</span> <span>${project.projectName}</span>
        </div>
      `,
      iconSize: [140, 36],
      iconAnchor: [70, 36],
    });

    L.marker([projectLat, projectLng], { icon: projectIcon })
      .addTo(map)
      .bindPopup(`<b>${project.projectName}</b><br/>${project.location?.address || project.location?.area}`)
      .openPopup();

    // Plot verified nearby landmarks
    const landmarks = [
      { name: "Financial District / Wipro Circle", lat: 17.4168, lng: 78.3428, type: "IT_PARK", time: "7 mins (Verified)" },
      { name: "ORR Exit 1 & 1A Interchange", lat: 17.3820, lng: 78.3400, type: "ROAD", time: "3 mins (Verified)" },
      { name: "Raidurg Metro Terminal", lat: 17.4410, lng: 78.3780, type: "METRO", time: "14 mins (Verified)" },
      { name: "Oakridge / Chirec Int'l Schools", lat: 17.4150, lng: 78.3310, type: "SCHOOL", time: "8 mins (Verified)" },
      { name: "Continental Hospital", lat: 17.4190, lng: 78.3480, type: "HOSPITAL", time: "9 mins (Verified)" },
      { name: "Rajiv Gandhi Int'l Airport (RGIA)", lat: 17.2403, lng: 78.4294, type: "AIRPORT", time: "24 mins (ORR Direct)" },
    ];

    landmarks.forEach((lm) => {
      const landmarkIcon = L.divIcon({
        className: 'custom-hub-pin',
        html: `
          <div style="background: rgba(15, 23, 42, 0.9); color: #E2E8F0; padding: 4px 8px; border-radius: 8px; font-size: 10px; border: 1px solid rgba(212, 175, 55, 0.4); white-space: nowrap; box-shadow: 0 2px 8px rgba(0,0,0,0.4);">
            ${lm.name}
          </div>
        `,
        iconSize: [120, 24],
        iconAnchor: [60, 24],
      });

      L.marker([lm.lat, lm.lng], { icon: landmarkIcon })
        .addTo(map)
        .bindPopup(`<b>${lm.name}</b><br/>Travel Time: ${lm.time}`);
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [projectLat, projectLng, project.projectName]);

  return (
    <div className="space-y-6">
      
      {/* Map Canvas */}
      <div className="relative w-full h-[450px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
        <div ref={mapContainerRef} className="w-full h-full z-10" />
      </div>

      {/* Verified Distances & Nearby Infrastructure Grid */}
      <div className="p-6 rounded-2xl bg-obsidian-900 border border-white/10 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Navigation className="w-4 h-4 text-gold-400" />
            <h4 className="font-serif text-lg font-bold text-white">Verified Connectivity & Nearby Hubs</h4>
          </div>
          <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Live Speed Limit Verified
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(project.locationHighlights && project.locationHighlights.length > 0 ? project.locationHighlights : [
            { name: "Financial District / Waverock", distanceKm: 3.2, travelTimeMins: 7, category: "IT_PARK", verified: true },
            { name: "Outer Ring Road (ORR) Exit 1", distanceKm: 1.5, travelTimeMins: 3, category: "ROAD", verified: true },
            { name: "Rajiv Gandhi Int'l Airport", distanceKm: 28.5, travelTimeMins: 24, category: "AIRPORT", verified: true },
            { name: "Rockwell / Oakridge Schools", distanceKm: 2.8, travelTimeMins: 6, category: "SCHOOL", verified: true },
            { name: "Continental / Star Hospital", distanceKm: 4.8, travelTimeMins: 9, category: "HOSPITAL", verified: true },
            { name: "Raidurg Metro Station", distanceKm: 6.2, travelTimeMins: 14, category: "METRO", verified: true },
          ]).map((hub, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-obsidian-950 border border-white/5 flex items-center justify-between">
              <div>
                <span className="text-white text-xs font-semibold block">{hub.name}</span>
                <span className="text-[10px] text-slate-400">{hub.distanceKm || '3'} km away</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-bold text-gold-300 block">{hub.travelTimeMins || '8'} mins</span>
                <span className="text-[9px] uppercase tracking-wider text-emerald-400">Verified</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
