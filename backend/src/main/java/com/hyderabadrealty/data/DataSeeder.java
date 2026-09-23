package com.hyderabadrealty.data;

import com.hyderabadrealty.modules.blog.entity.BlogPost;
import com.hyderabadrealty.modules.blog.repository.BlogPostRepository;
import com.hyderabadrealty.modules.futuredev.entity.DevStatus;
import com.hyderabadrealty.modules.futuredev.entity.FutureDevelopment;
import com.hyderabadrealty.modules.futuredev.repository.FutureDevelopmentRepository;
import com.hyderabadrealty.modules.lead.entity.Lead;
import com.hyderabadrealty.modules.lead.entity.LeadNote;
import com.hyderabadrealty.modules.lead.entity.LeadStatus;
import com.hyderabadrealty.modules.lead.repository.LeadRepository;
import com.hyderabadrealty.modules.location.entity.Location;
import com.hyderabadrealty.modules.location.entity.NearbyHub;
import com.hyderabadrealty.modules.location.repository.LocationRepository;
import com.hyderabadrealty.modules.project.entity.*;
import com.hyderabadrealty.modules.project.repository.ProjectRepository;
import com.hyderabadrealty.modules.sitevisit.entity.SiteVisit;
import com.hyderabadrealty.modules.sitevisit.entity.VisitStatus;
import com.hyderabadrealty.modules.sitevisit.repository.SiteVisitRepository;
import com.hyderabadrealty.modules.testimonial.entity.Testimonial;
import com.hyderabadrealty.modules.testimonial.repository.TestimonialRepository;
import com.hyderabadrealty.modules.user.entity.Role;
import com.hyderabadrealty.modules.user.entity.User;
import com.hyderabadrealty.modules.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Arrays;
import java.util.List;
import java.util.Set;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final LocationRepository locationRepository;
    private final ProjectRepository projectRepository;
    private final FutureDevelopmentRepository futureDevRepository;
    private final LeadRepository leadRepository;
    private final SiteVisitRepository siteVisitRepository;
    private final TestimonialRepository testimonialRepository;
    private final BlogPostRepository blogPostRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        log.info("Initializing Hyderabad Real Estate Platform seed data check...");

        seedUsers();
        seedLocations();
        seedProjects();
        seedFutureDevelopments();
        seedTestimonials();
        seedBlogPosts();
        seedLeadsAndVisits();

        log.info("Seed check completed successfully.");
    }

    private void seedUsers() {
        if (!userRepository.existsByEmail("admin@hyderabadrealty.com")) {
            User admin = User.builder()
                    .email("admin@hyderabadrealty.com")
                    .fullName("Vikramaditya Rao")
                    .password(passwordEncoder.encode("Admin@2026"))
                    .phone("+91 98490 12345")
                    .roles(Set.of(Role.ROLE_ADMIN, Role.ROLE_SALES_MANAGER))
                    .active(true)
                    .build();
            userRepository.save(admin);
            log.info("Default Admin created: admin@hyderabadrealty.com / Admin@2026");
        }

        if (!userRepository.existsByEmail("sales@hyderabadrealty.com")) {
            User agent = User.builder()
                    .email("sales@hyderabadrealty.com")
                    .fullName("Pooja Reddy")
                    .password(passwordEncoder.encode("Agent@2026"))
                    .phone("+91 98490 67890")
                    .roles(Set.of(Role.ROLE_SALES_AGENT))
                    .active(true)
                    .build();
            userRepository.save(agent);
            log.info("Default Sales Agent created: sales@hyderabadrealty.com / Agent@2026");
        }
    }

    private void seedLocations() {
        if (locationRepository.count() > 0) return;

        List<Location> locations = List.of(
                Location.builder()
                        .name("Kokapet")
                        .slug("kokapet")
                        .zone("WEST_HYDERABAD")
                        .latitude(17.3878)
                        .longitude(78.3264)
                        .description("Hyderabad's most prestigious luxury corridor, home to the Golden Mile and ultra-high-rise residential towers.")
                        .overview("Kokapet has emerged as Hyderabad's ultra-premium growth vector with seamless access to Financial District, Outer Ring Road, and Gandipet lake. Featuring wide 100-foot master plan roads and proximity to top international schools.")
                        .pricePerSqFtRange("₹9,500 - ₹14,500 / sq.ft*")
                        .growthProspects("High capital appreciation driven by Neopolis expansion and luxury IT workforce demand.")
                        .heroImageUrl("https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=80")
                        .connectivityHighlights(List.of("Direct ORR Exit 1 & 1A", "5 mins to Financial District", "25 mins to RGIA Airport"))
                        .nearbyHubs(List.of(
                                new NearbyHub("Financial District", 3.2, 7, "IT_PARK", true),
                                new NearbyHub("Rajiv Gandhi Int'l Airport", 28.5, 25, "AIRPORT", true),
                                new NearbyHub("Rockwell International School", 2.0, 5, "SCHOOL", true),
                                new NearbyHub("Continental Hospital", 5.0, 10, "HOSPITAL", true)
                        ))
                        .featured(true)
                        .active(true)
                        .build(),

                Location.builder()
                        .name("Neopolis")
                        .slug("neopolis")
                        .zone("WEST_HYDERABAD")
                        .latitude(17.3980)
                        .longitude(78.3180)
                        .description("A world-class 500-acre greenfield commercial and ultra-luxury skyscraper central business district.")
                        .overview("Envisioned by HMDA as Hyderabad's futuristic Manhattan, Neopolis features 65-story towers, underground utility tunnels, multi-tier transit hubs, and world-class commercial headquarters.")
                        .pricePerSqFtRange("₹12,000 - ₹18,000 / sq.ft*")
                        .growthProspects("Fastest-growing commercial micro-market in South India with marquee MNC tech investments.")
                        .heroImageUrl("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80")
                        .connectivityHighlights(List.of("Dedicated 45-meter wide arterial roads", "Integrated elevated trumpet interchanges", "Direct connection to Airport Express Metro"))
                        .nearbyHubs(List.of(
                                new NearbyHub("Waverock SEZ", 4.0, 8, "IT_PARK", true),
                                new NearbyHub("US Consulate General", 4.5, 9, "IT_PARK", true),
                                new NearbyHub("Star Hospitals Financial District", 4.2, 8, "HOSPITAL", true)
                        ))
                        .featured(true)
                        .active(true)
                        .build(),

                Location.builder()
                        .name("Financial District")
                        .slug("financial-district")
                        .zone("WEST_HYDERABAD")
                        .latitude(17.4168)
                        .longitude(78.3428)
                        .description("The financial and technological powerhouse of Telangana, housing global GCCs and Fortune 500 headquarters.")
                        .overview("Home to Google, Microsoft, Amazon, Micron, and the world's largest IT campuses. Residential developments here command the highest rental yields and unmatched executive occupancy.")
                        .pricePerSqFtRange("₹10,500 - ₹15,500 / sq.ft*")
                        .growthProspects("Unrivaled rental yield stability and perpetual demand from senior enterprise leadership.")
                        .heroImageUrl("https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&w=1400&q=80")
                        .connectivityHighlights(List.of("Gachibowli flyover connectivity", "Outer Ring Road loop", "Raidurg Metro station within 10 mins"))
                        .nearbyHubs(List.of(
                                new NearbyHub("Raidurg Metro Station", 4.8, 12, "METRO", true),
                                new NearbyHub("Oakridge International School", 3.0, 8, "SCHOOL", true),
                                new NearbyHub("Inorbit Mall", 7.0, 16, "MALL", true)
                        ))
                        .featured(true)
                        .active(true)
                        .build(),

                Location.builder()
                        .name("Tellapur")
                        .slug("tellapur")
                        .zone("WEST_HYDERABAD")
                        .latitude(17.4642)
                        .longitude(78.2917)
                        .description("Lush, expansive gated villa communities and high-end residential enclaves near Kollur and BHEL.")
                        .overview("Favored by tech executives seeking serenity, open green spaces, and luxury clubhouses within 15 minutes of Gachibowli and Financial District.")
                        .pricePerSqFtRange("₹7,800 - ₹11,000 / sq.ft*")
                        .growthProspects("Rapid expansion backed by Tellapur Techno City master plan and radial road widenings.")
                        .heroImageUrl("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80")
                        .connectivityHighlights(List.of("10 mins to Wipro Circle", "Seamless link to ORR Kollur Exit", "MMTS railway station"))
                        .nearbyHubs(List.of(
                                new NearbyHub("Wipro Circle", 8.0, 14, "IT_PARK", true),
                                new NearbyHub("Citizens Specialty Hospital", 4.5, 9, "HOSPITAL", true),
                                new NearbyHub("Glendale Academy", 5.0, 10, "SCHOOL", true)
                        ))
                        .featured(true)
                        .active(true)
                        .build(),

                Location.builder()
                        .name("Narsingi")
                        .slug("narsingi")
                        .zone("WEST_HYDERABAD")
                        .latitude(17.3800)
                        .longitude(78.3580)
                        .description("Prime strategic junction between Gandipet Lake, Financial District, and Mehdipatnam.")
                        .overview("Narsingi offers the optimal balance of immediate IT hub accessibility and tranquil lake views near Osman Sagar and Himayat Sagar.")
                        .pricePerSqFtRange("₹8,500 - ₹12,500 / sq.ft*")
                        .growthProspects("Steadily appreciating due to limited lake-adjacent land parcels and immediate ORR exit access.")
                        .heroImageUrl("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80")
                        .connectivityHighlights(List.of("ORR Exit 1 junction", "7 mins to Gachibowli", "20 mins to Banjara Hills"))
                        .nearbyHubs(List.of(
                                new NearbyHub("Financial District", 4.0, 8, "IT_PARK", true),
                                new NearbyHub("AIG Hospitals Gachibowli", 6.5, 12, "HOSPITAL", true)
                        ))
                        .featured(true)
                        .active(true)
                        .build(),

                Location.builder()
                        .name("Shamshabad")
                        .slug("shamshabad")
                        .zone("SOUTH_HYDERABAD")
                        .latitude(17.2403)
                        .longitude(78.4294)
                        .description("Airport Aerotropolis, GMR Innovation Park, and the gateway to Pharma City.")
                        .overview("Positioned around Rajiv Gandhi International Airport, featuring SEZs, convention centres, and expansive luxury villa layouts.")
                        .pricePerSqFtRange("₹5,500 - ₹8,500 / sq.ft*")
                        .growthProspects("Exponential long-term growth backed by Airport Metro, RRR intersection, and logistics corridors.")
                        .heroImageUrl("https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1400&q=80")
                        .connectivityHighlights(List.of("Rajiv Gandhi International Airport", "Direct PVNR Elevated Expressway", "Bangalore NH-44"))
                        .featured(false)
                        .active(true)
                        .build(),

                Location.builder()
                        .name("Gachibowli")
                        .slug("gachibowli")
                        .zone("WEST_HYDERABAD")
                        .latitude(17.4401)
                        .longitude(78.3489)
                        .description("The heart of Cyberabad with world-class sports stadium, international schools, and premier hospitals.")
                        .pricePerSqFtRange("₹10,000 - ₹14,000 / sq.ft*")
                        .heroImageUrl("https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80")
                        .featured(false)
                        .active(true)
                        .build()
        );

        locationRepository.saveAll(locations);
        log.info("Seeded {} Hyderabad growth locations.", locations.size());
    }

    private void seedProjects() {
        if (projectRepository.count() > 0) return;

        List<Project> projects = List.of(
                Project.builder()
                        .projectName("Skyline Heights")
                        .slug("skyline-heights")
                        .developer("Aurum Hyderabad Developments")
                        .tagline("Sky-High Luxury Overlooking Kokapet Golden Mile")
                        .location(ProjectLocation.builder()
                                .area("Kokapet")
                                .city("Hyderabad")
                                .state("Telangana")
                                .address("Golden Mile Road, Sector 3, Kokapet")
                                .latitude(17.3890)
                                .longitude(78.3280)
                                .build())
                        .propertyType("APARTMENT")
                        .configurations(List.of("3 BHK", "4 BHK", "PENTHOUSE"))
                        .price(ProjectPrice.builder()
                                .startingFrom(21000000L) // 2.10 Cr
                                .maxPrice(42000000L)
                                .priceDisplay("Starting from ₹2.10 Cr*")
                                .currency("INR")
                                .build())
                        .status(ProjectStatus.UNDER_CONSTRUCTION)
                        .reraNumber("P0240000XXXX (Placeholder - Reg Pending)")
                        .reraDisclaimer("RERA registration details are placeholders for demonstration. Verify independently on Telangana RERA portal.")
                        .description("Skyline Heights represents the pinnacle of contemporary high-rise architecture in Hyderabad. Soaring 45 floors into the sky, each residence is crafted with panoramic 270-degree floor-to-ceiling glass facades, grand 11-foot clear ceilings, and private elevator lobbies.")
                        .landArea("4.85 Acres")
                        .totalUnits(340)
                        .totalTowers("3 Iconic Towers (G+45 Floors)")
                        .possessionDate("December 2027")
                        .coverImageUrl("https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=80")
                        .amenities(List.of(
                                "50,000 sq.ft Grand Clubhouse", "Infinity Edge Sky Pool (Level 45)",
                                "Temperature-Controlled Indoor Pool", "Padel Tennis Court",
                                "Co-Working Executive Pods", "Private Screening Cinema",
                                "EV Hyper-Charging Bays", "Health Spa & Cryo Chamber",
                                "Rooftop Stargazing Lounge", "Children's Sensory Play Park"
                        ))
                        .gallery(List.of(
                                new ProjectImage("https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=80", "Grand Exterior Perspective at Dusk", "EXTERIOR", 1, true),
                                new ProjectImage("https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80", "Double-Height Grand Arrival Lobby", "ENTRANCE", 2, false),
                                new ProjectImage("https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80", "Expansive Living Area with Golden Mile Views", "LIVING_ROOM", 3, false),
                                new ProjectImage("https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1400&q=80", "Master Suite with Hardwood Floor Finish", "BEDROOM", 4, false),
                                new ProjectImage("https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1400&q=80", "Designer Italian Kitchen with Quartz Island", "KITCHEN", 5, false),
                                new ProjectImage("https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1400&q=80", "Level 45 Infinity Edge Sky Swimming Pool", "SWIMMING_POOL", 6, false),
                                new ProjectImage("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1400&q=80", "High-Tech Fitness Studio by Technogym", "GYM", 7, false)
                        ))
                        .floorPlans(List.of(
                                FloorPlan.builder()
                                        .id("fp-3bhk")
                                        .bhk("3 BHK")
                                        .title("Type Alpha - 3 BHK Luxury")
                                        .superBuiltUpAreaSqFt(2450)
                                        .carpetAreaSqFt(1780)
                                        .imageUrl("https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80")
                                        .pricePlaceholder("Starting from ₹2.10 Cr*")
                                        .build(),
                                FloorPlan.builder()
                                        .id("fp-4bhk")
                                        .bhk("4 BHK")
                                        .title("Type Royal - 4 BHK Presidential")
                                        .superBuiltUpAreaSqFt(3650)
                                        .carpetAreaSqFt(2680)
                                        .imageUrl("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80")
                                        .pricePlaceholder("Starting from ₹3.15 Cr*")
                                        .build()
                        ))
                        .locationHighlights(List.of(
                                new NearbyHub("Financial District", 3.0, 7, "IT_PARK", true),
                                new NearbyHub("Airport via ORR", 28.0, 24, "AIRPORT", true),
                                new NearbyHub("Continental Hospital", 5.2, 10, "HOSPITAL", true),
                                new NearbyHub("Oakridge International School", 4.1, 8, "SCHOOL", true)
                        ))
                        .featured(true)
                        .published(true)
                        .build(),

                Project.builder()
                        .projectName("The Neopolis Crown")
                        .slug("the-neopolis-crown")
                        .developer("Aurum Hyderabad Developments")
                        .tagline("Hyderabad's Landmark 55-Floor Sky Mansions")
                        .location(ProjectLocation.builder()
                                .area("Neopolis")
                                .city("Hyderabad")
                                .state("Telangana")
                                .address("Sector 1, Neopolis CBD, Kokapet")
                                .latitude(17.3995)
                                .longitude(78.3190)
                                .build())
                        .propertyType("APARTMENT")
                        .configurations(List.of("4 BHK", "5 BHK", "SKY_MANSION"))
                        .price(ProjectPrice.builder()
                                .startingFrom(45000000L) // 4.50 Cr
                                .maxPrice(89000000L)
                                .priceDisplay("Starting from ₹4.50 Cr*")
                                .currency("INR")
                                .build())
                        .status(ProjectStatus.UNDER_CONSTRUCTION)
                        .reraNumber("P0240000YYYY (Placeholder)")
                        .reraDisclaimer("Sample RERA Registration for preview. Check official state portal.")
                        .description("Setting a new benchmark for ultra-luxury residential towers across South India. The Neopolis Crown delivers palatial sky mansions with private sky pools, concierge reception, and unmatched architectural prestige.")
                        .landArea("5.2 Acres")
                        .totalUnits(190)
                        .totalTowers("2 Super-Tall Towers (G+55 Floors)")
                        .possessionDate("Q2 2028")
                        .coverImageUrl("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80")
                        .amenities(List.of(
                                "Helipad Access", "Private Sky Plunge Pools",
                                "70,000 sq.ft Club Imperial", "Michelin-Standard Private Dining",
                                "Temperature-Controlled Wine Cellar", "Valet Parking with 4 Car Bays per Flat"
                        ))
                        .featured(true)
                        .published(true)
                        .build(),

                Project.builder()
                        .projectName("Tellapur Botanica")
                        .slug("tellapur-botanica")
                        .developer("Aurum Hyderabad Developments")
                        .tagline("Signature Triplex Villas Immersed in 25 Acres of Greenery")
                        .location(ProjectLocation.builder()
                                .area("Tellapur")
                                .city("Hyderabad")
                                .state("Telangana")
                                .address("Tellapur Techno Road, Near Kollur Exit")
                                .latitude(17.4650)
                                .longitude(78.2930)
                                .build())
                        .propertyType("VILLA")
                        .configurations(List.of("4 BHK", "5 BHK"))
                        .price(ProjectPrice.builder()
                                .startingFrom(38000000L) // 3.80 Cr
                                .maxPrice(65000000L)
                                .priceDisplay("Starting from ₹3.80 Cr*")
                                .currency("INR")
                                .build())
                        .status(ProjectStatus.UNDER_CONSTRUCTION)
                        .reraNumber("P0240000ZZZZ (Placeholder)")
                        .reraDisclaimer("Information for visualization only. All plans subject to approvals.")
                        .description("Tellapur Botanica is an elite sanctuary of 160 bespoke triplex villas, private plunge pools, landscaped courtyard architecture, and private terrace gardens.")
                        .landArea("25 Acres")
                        .totalUnits(160)
                        .totalTowers("160 Independent Luxury Villas")
                        .possessionDate("March 2027")
                        .coverImageUrl("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80")
                        .amenities(List.of(
                                "Private Villa Courtyards", "2-Acre Central Botanical Lake",
                                "Club Botanica with 4-Lane Bowling", "Half Olympic Swimming Pool",
                                "Organic Orchard & Herb Garden", "24/7 Multi-Tier Biometric Security"
                        ))
                        .featured(true)
                        .published(true)
                        .build(),

                Project.builder()
                        .projectName("Financial District Pinnacle")
                        .slug("financial-district-pinnacle")
                        .developer("Aurum Hyderabad Developments")
                        .tagline("Executive Living Steps Away from Global Tech Campuses")
                        .location(ProjectLocation.builder()
                                .area("Financial District")
                                .city("Hyderabad")
                                .state("Telangana")
                                .address("Nanakramguda Main Road, Financial District")
                                .latitude(17.4175)
                                .longitude(78.3435)
                                .build())
                        .propertyType("APARTMENT")
                        .configurations(List.of("2 BHK", "3 BHK"))
                        .price(ProjectPrice.builder()
                                .startingFrom(17500000L) // 1.75 Cr
                                .maxPrice(28500000L)
                                .priceDisplay("Starting from ₹1.75 Cr*")
                                .currency("INR")
                                .build())
                        .status(ProjectStatus.READY_TO_MOVE)
                        .reraNumber("P0240000AAAA (Placeholder)")
                        .description("Designed for the modern tech leader who values zero-commute living. Located within walking distance of Waverock, Microsoft, and Amazon headquarters.")
                        .landArea("3.6 Acres")
                        .totalUnits(280)
                        .totalTowers("2 Towers (G+38 Floors)")
                        .possessionDate("Ready to Move")
                        .coverImageUrl("https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&w=1400&q=80")
                        .amenities(List.of(
                                "Executive Business Lounge", "Sky Gymnasium",
                                "Squash Courts", "Smart Automation Enabled",
                                "High-Speed Elevators", "On-Premise Cafe & Grocery"
                        ))
                        .featured(true)
                        .published(true)
                        .build(),

                Project.builder()
                        .projectName("Narsingi Crest")
                        .slug("narsingi-crest")
                        .developer("Aurum Hyderabad Developments")
                        .tagline("Lakeview Elegance Moments from ORR Exit 1")
                        .location(ProjectLocation.builder()
                                .area("Narsingi")
                                .city("Hyderabad")
                                .state("Telangana")
                                .address("Near Gandipet Lake Road, Narsingi")
                                .latitude(17.3820)
                                .longitude(78.3590)
                                .build())
                        .propertyType("APARTMENT")
                        .configurations(List.of("3 BHK", "4 BHK"))
                        .price(ProjectPrice.builder()
                                .startingFrom(19500000L) // 1.95 Cr
                                .maxPrice(32000000L)
                                .priceDisplay("Starting from ₹1.95 Cr*")
                                .currency("INR")
                                .build())
                        .status(ProjectStatus.UPCOMING)
                        .reraNumber("P0240000BBBB (Placeholder)")
                        .description("Overlooking the calm waters of Osman Sagar, Narsingi Crest combines resort-style amenities with rapid access to the Financial District.")
                        .landArea("3.8 Acres")
                        .totalUnits(240)
                        .totalTowers("2 Towers (G+36 Floors)")
                        .possessionDate("Q4 2028")
                        .coverImageUrl("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80")
                        .amenities(List.of("Lake-Facing Sky Decks", "Infinity Swimming Pool", "Clubhouse & Spa", "Children's Crèche"))
                        .featured(true)
                        .published(true)
                        .build()
        );

        projectRepository.saveAll(projects);
        log.info("Seeded {} premier Hyderabad projects.", projects.size());
    }

    private void seedFutureDevelopments() {
        if (futureDevRepository.count() > 0) return;

        List<FutureDevelopment> devItems = List.of(
                FutureDevelopment.builder()
                        .title("Hyderabad Metro Phase 2: Airport Express Line")
                        .slug("metro-phase-2-airport-express")
                        .category("METRO")
                        .zone("WEST")
                        .locationName("Raidurg to RGIA Airport via Financial District & ORR")
                        .latitude(17.3750)
                        .longitude(78.3600)
                        .description("A 31-km high-speed elevated and underground metro corridor connecting the IT core at Raidurg and Financial District directly to Rajiv Gandhi International Airport in under 22 minutes.")
                        .impactSummary("Drastically cuts airport commute time, creating premium appreciation across Financial District, Kokapet, Narsingi, and Rajendranagar corridors.")
                        .status(DevStatus.UNDER_CONSTRUCTION)
                        .expectedTimeline("2026 - 2028")
                        .sourceReference("Hyderabad Metro Rail Limited (HMR) Master Plan 2024-2028")
                        .lastUpdatedDate("August 2026")
                        .imageUrl("https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=80")
                        .keyHighlights(List.of(
                                "31 km dedicated high-speed corridor",
                                "Top operating speed 120 km/h",
                                "Stops at Bio-Diversity, Nanakramguda, Narsingi, Shamshabad Airport",
                                "Check-in baggage facilities at terminal stations"
                        ))
                        .verified(true)
                        .active(true)
                        .displayOrder(1)
                        .build(),

                FutureDevelopment.builder()
                        .title("Regional Ring Road (RRR) - Southern & Northern Arc")
                        .slug("regional-ring-road-rrr")
                        .category("ROADWAYS")
                        .zone("REGIONAL")
                        .locationName("Outer 340-km Greenfield Expressway encircling Hyderabad")
                        .latitude(17.2000)
                        .longitude(78.2000)
                        .description("A monumental 340-kilometer, 4-lane access-controlled expressway connecting major regional satellite towns (Sangareddy, Gajwel, Choutuppal, Shadnagar) at a distance of 30 km beyond the current Outer Ring Road.")
                        .impactSummary("Redistributes industrial freight and unlocks suburban satellite townships for high-yield plotted developments and logistics parks.")
                        .status(DevStatus.UNDER_CONSTRUCTION)
                        .expectedTimeline("2027 - 2029")
                        .sourceReference("National Highways Authority of India (NHAI) & Ministry of Road Transport")
                        .lastUpdatedDate("July 2026")
                        .imageUrl("https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1000&q=80")
                        .keyHighlights(List.of(
                                "340 km total circular alignment",
                                "Connects 20+ national and state highways",
                                "Accelerates development around Mokila, Shadnagar, and Sangareddy"
                        ))
                        .verified(true)
                        .active(true)
                        .displayOrder(2)
                        .build(),

                FutureDevelopment.builder()
                        .title("Neopolis CBD & Trump Tower Global High-Street")
                        .slug("neopolis-cbd-expansion")
                        .category("IT_SEZ")
                        .zone("WEST")
                        .locationName("Neopolis, Kokapet (West Hyderabad)")
                        .latitude(17.3980)
                        .longitude(78.3180)
                        .description("Expansion of the 500-acre Neopolis district into an integrated commercial, luxury residential, and entertainment epicenter featuring South India's tallest commercial skyscrapers.")
                        .impactSummary("Establishes Kokapet and Neopolis as the premier luxury hub comparable to Dubai Downtown and Singapore Marina Bay.")
                        .status(DevStatus.UNDER_CONSTRUCTION)
                        .expectedTimeline("2026 - 2028")
                        .sourceReference("HMDA Neopolis Development Authority Progress Bulletin")
                        .lastUpdatedDate("August 2026")
                        .imageUrl("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80")
                        .keyHighlights(List.of(
                                "Underground utility corridors for uninterrupted power and telecom",
                                "Zoning for 50+ to 65+ story luxury towers",
                                "Integrated mass transit connection"
                        ))
                        .verified(true)
                        .active(true)
                        .displayOrder(3)
                        .build(),

                FutureDevelopment.builder()
                        .title("Telangana AI City & Global Data Center Corridor")
                        .slug("telangana-ai-city-data-center")
                        .category("DATA_CENTERS")
                        .zone("SOUTH")
                        .locationName("Tukkuguda - Maheshwaram - Financial District South")
                        .latitude(17.1850)
                        .longitude(78.4720)
                        .description("A 200-acre dedicated artificial intelligence and hyperscale cloud campus hosting global technology cloud hubs, supported by green power and dedicated high-voltage sub-stations.")
                        .impactSummary("Attracts high-compensation global engineering talent and spurs demand for high-end gated communities in South Hyderabad.")
                        .status(DevStatus.UNDER_PLANNING)
                        .expectedTimeline("2026 - 2029")
                        .sourceReference("Telangana IT & Electronics Department Policy Roadmap 2024-2030")
                        .lastUpdatedDate("September 2026")
                        .imageUrl("https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80")
                        .keyHighlights(List.of(
                                "Hyperscale data centers by Microsoft, AWS and Google Cloud",
                                "AI research institutes and incubation parks",
                                "Direct proximity to ORR Exit 14"
                        ))
                        .verified(true)
                        .active(true)
                        .displayOrder(4)
                        .build(),

                FutureDevelopment.builder()
                        .title("Pharma City & Genome Valley Life Sciences Innovation Zone")
                        .slug("pharma-city-genome-valley")
                        .category("PHARMA_LIFE_SCIENCES")
                        .zone("SOUTH")
                        .locationName("Mucherla Corridor & Genome Valley Shamirpet")
                        .latitude(17.1100)
                        .longitude(78.5400)
                        .description("The world's largest integrated life-sciences and biopharmaceutical industrial park, reinforcing Hyderabad's stature as the 'Vaccine Capital of the World'.")
                        .impactSummary("Generates over 150,000 skilled jobs and drives residential township investments across Southern Hyderabad.")
                        .status(DevStatus.UNDER_CONSTRUCTION)
                        .expectedTimeline("2026 - 2030")
                        .sourceReference("Telangana State Industrial Infrastructure Corporation (TSIIC)")
                        .lastUpdatedDate("July 2026")
                        .imageUrl("https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1000&q=80")
                        .keyHighlights(List.of(
                                "Over 19,000 acres planned cluster",
                                "Zero liquid discharge sustainable infrastructure",
                                "Pharma University and R&D Centers"
                        ))
                        .verified(true)
                        .active(true)
                        .displayOrder(5)
                        .build(),

                FutureDevelopment.builder()
                        .title("Foxconn Mega Electronics Campus & Apple Ecosystem")
                        .slug("foxconn-kongara-kalan-campus")
                        .category("IT_SEZ")
                        .zone("SOUTH")
                        .locationName("Kongara Kalan, Ibrahimpatnam Corridor")
                        .latitude(17.1950)
                        .longitude(78.6050)
                        .description("A 200-acre electronics manufacturing facility creating over 35,000 direct technology manufacturing and assembly jobs.")
                        .impactSummary("Rapid urbanization of the south-eastern growth corridor with surge in affordable and mid-segment housing.")
                        .status(DevStatus.OPERATIONAL)
                        .expectedTimeline("Operational / Expanding 2026")
                        .sourceReference("Telangana State Gazette & Industry Notifications")
                        .lastUpdatedDate("August 2026")
                        .imageUrl("https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80")
                        .keyHighlights(List.of(
                                "$500M+ initial foreign direct investment",
                                "Operational manufacturing lines",
                                "Phase 2 expansion under construction"
                        ))
                        .verified(true)
                        .active(true)
                        .displayOrder(6)
                        .build()
        );

        futureDevRepository.saveAll(devItems);
        log.info("Seeded {} future development infrastructure items.", devItems.size());
    }

    private void seedTestimonials() {
        if (testimonialRepository.count() > 0) return;

        List<Testimonial> testimonials = List.of(
                Testimonial.builder()
                        .clientName("Suresh Chandrasekhar")
                        .clientRole("Managing Director, FinTech Global Inc.")
                        .projectName("Skyline Heights, Kokapet")
                        .reviewText("The transparency and execution quality of Aurum Hyderabad are unmatched in the city. From site visit to paperwork, the experience felt truly world-class. Kokapet has appreciated tremendously since our booking.")
                        .rating(5)
                        .avatarUrl("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80")
                        .verifiedBuyer(true)
                        .active(true)
                        .build(),

                Testimonial.builder()
                        .clientName("Ananya & Dr. Raghavan Nair")
                        .clientRole("Consultant Surgeon & NRI Investors")
                        .projectName("Tellapur Botanica")
                        .reviewText("Relocating from Singapore, we wanted a spacious villa that offered both peaceful natural greenery and instant access to Financial District. Tellapur Botanica exceeded every expectation.")
                        .rating(5)
                        .avatarUrl("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80")
                        .verifiedBuyer(true)
                        .active(true)
                        .build(),

                Testimonial.builder()
                        .clientName("Karthik Varma")
                        .clientRole("Senior Engineering Leader, Big Tech")
                        .projectName("Financial District Pinnacle")
                        .reviewText("Being able to walk to my office in Financial District in under 8 minutes is a life upgrade. Beautiful amenities, responsive management, and superb build quality.")
                        .rating(5)
                        .avatarUrl("https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80")
                        .verifiedBuyer(true)
                        .active(true)
                        .build()
        );

        testimonialRepository.saveAll(testimonials);
        log.info("Seeded {} verified customer testimonials.", testimonials.size());
    }

    private void seedBlogPosts() {
        if (blogPostRepository.count() > 0) return;

        List<BlogPost> posts = List.of(
                BlogPost.builder()
                        .title("Why Kokapet and Neopolis Are Leading South India's Luxury Real Estate Surge")
                        .slug("kokapet-neopolis-luxury-real-estate-surge")
                        .category("Hyderabad Real Estate")
                        .excerpt("An in-depth analysis of West Hyderabad's Golden Mile and why high-net-worth investors and tech leaders are concentrating their capital here.")
                        .content("West Hyderabad continues to shatter real estate benchmarks across the country. Led by Kokapet's Golden Mile and the mega commercial zoning of Neopolis, capital appreciation in this corridor has outpaced other South Indian metros. With underground utility systems, 45-meter arterial corridors, and proximity to Wipro Circle and RGIA, high-rise luxury living is reaching global standards.")
                        .authorName("Naveen K. Murthy")
                        .authorTitle("Head of Real Estate Research")
                        .readTimeMinutes("6 min read")
                        .coverImageUrl("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80")
                        .tags(List.of("Kokapet", "Neopolis", "Market Trends", "West Hyderabad"))
                        .relatedProjectSlugs(List.of("skyline-heights", "the-neopolis-crown"))
                        .published(true)
                        .build(),

                BlogPost.builder()
                        .title("The Regional Ring Road (RRR) Factor: Unlocking Plotted & Villa Corridors")
                        .slug("rrr-regional-ring-road-impact-hyderabad")
                        .category("Infrastructure Updates")
                        .excerpt("How the 340-kilometer Regional Ring Road is fundamentally expanding Hyderabad's economic geography and creating future wealth.")
                        .content("While the Outer Ring Road (ORR) defined Hyderabad's transformation over the past decade, the 340-km Regional Ring Road (RRR) is set to catalyze the next 20 years of urbanization. Connecting satellite towns like Sangareddy, Shadnagar, and Choutuppal, the RRR ensures that outward corridors such as Tellapur, Mokila, and Shankarpally will continue to witness stellar growth in gated villa communities.")
                        .authorName("Priya Venkatesh")
                        .authorTitle("Urban Planning Specialist")
                        .readTimeMinutes("5 min read")
                        .coverImageUrl("https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1200&q=80")
                        .tags(List.of("RRR", "Infrastructure", "Investment", "Tellapur"))
                        .relatedProjectSlugs(List.of("tellapur-botanica"))
                        .published(true)
                        .build(),

                BlogPost.builder()
                        .title("Homebuyer's Guide: Understanding RERA Verification and Title Diligence in Telangana")
                        .slug("telangana-rera-verification-guide")
                        .category("Home Buying Guide")
                        .excerpt("Essential checklist for verifying project approvals, carpet area definitions, and escrow compliance before booking a property.")
                        .content("Purchasing a premium residence requires thorough regulatory due diligence. The Real Estate (Regulation and Development) Act (RERA) mandates complete transparency regarding approved floor plans, sanctioned heights, and dedicated escrow accounts for construction expenses. In this guide, our legal advisors explain how to verify RERA registration numbers and identify dependable developers.")
                        .authorName("Advocate Ramesh Sharma")
                        .authorTitle("Senior Legal Counsel")
                        .readTimeMinutes("8 min read")
                        .coverImageUrl("https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80")
                        .tags(List.of("RERA", "Legal Checklist", "Due Diligence", "Consumer Protection"))
                        .published(true)
                        .build()
        );

        blogPostRepository.saveAll(posts);
        log.info("Seeded {} SEO blog articles.", posts.size());
    }

    private void seedLeadsAndVisits() {
        if (leadRepository.count() > 0) return;

        List<Lead> leads = List.of(
                Lead.builder()
                        .leadCode("HYD-LEAD-1001")
                        .name("Ramesh Chandran")
                        .phone("+91 98480 11223")
                        .email("ramesh.c@techcorp.com")
                        .preferredLocation("Kokapet")
                        .propertyType("APARTMENT")
                        .budget("₹2.0 - ₹3.0 Cr")
                        .projectName("Skyline Heights")
                        .message("Interested in 4 BHK East-facing unit with two car parkings.")
                        .source("HOMEPAGE_HERO")
                        .status(LeadStatus.QUALIFIED)
                        .assignedAgentId("sales-01")
                        .assignedAgentName("Pooja Reddy")
                        .notes(List.of(
                                new LeadNote("Customer inquired via website hero.", "System", Instant.now().minusSeconds(86400 * 2)),
                                new LeadNote("Called buyer. Verified pre-approved loan from HDFC. Interested in high floor.", "Pooja Reddy", Instant.now().minusSeconds(86400))
                        ))
                        .nextFollowUpDate("Tomorrow 3:00 PM")
                        .build(),

                Lead.builder()
                        .leadCode("HYD-LEAD-1002")
                        .name("Dr. Sneha Pillai")
                        .phone("+91 97000 44556")
                        .email("dr.sneha.p@apollo.org")
                        .preferredLocation("Tellapur")
                        .propertyType("VILLA")
                        .budget("₹3.5 - ₹5.0 Cr")
                        .projectName("Tellapur Botanica")
                        .message("Looking for peaceful villa community with immediate proximity to international school.")
                        .source("PROJECT_DETAIL")
                        .status(LeadStatus.SITE_VISIT_SCHEDULED)
                        .assignedAgentId("sales-01")
                        .assignedAgentName("Pooja Reddy")
                        .notes(List.of(
                                new LeadNote("Site visit booked for Sunday 11 AM.", "Pooja Reddy", Instant.now().minusSeconds(43200))
                        ))
                        .nextFollowUpDate("Sunday 11:00 AM")
                        .build(),

                Lead.builder()
                        .leadCode("HYD-LEAD-1003")
                        .name("Abhishek Agarwal")
                        .phone("+91 99887 76655")
                        .email("abhishek@venturecapital.in")
                        .preferredLocation("Neopolis")
                        .propertyType("APARTMENT")
                        .budget("₹4.0 Cr+")
                        .projectName("The Neopolis Crown")
                        .message("NRI investment inquiry. Looking for penthouse or sky mansion.")
                        .source("CONTACT_PAGE")
                        .status(LeadStatus.NEW)
                        .build()
        );

        leadRepository.saveAll(leads);

        // Seed site visits
        List<SiteVisit> visits = List.of(
                SiteVisit.builder()
                        .visitCode("VISIT-HYD-5001")
                        .name("Dr. Sneha Pillai")
                        .phone("+91 97000 44556")
                        .email("dr.sneha.p@apollo.org")
                        .projectName("Tellapur Botanica")
                        .preferredDate("2026-09-27")
                        .preferredTimeSlot("11:00 AM - 01:00 PM")
                        .numberOfVisitors(3)
                        .transportationRequired(true)
                        .pickupAddress("Jubilee Hills Checkpost, Road No 36")
                        .specialRequests("Please arrange driver pick-up in luxury sedan. Interested in clubhouse inspection.")
                        .status(VisitStatus.APPROVED)
                        .assignedAgentName("Pooja Reddy")
                        .adminNotes("Driver allocated: Ramesh (+91 98499 11111). Chauffeur booked for 10:15 AM.")
                        .build(),

                SiteVisit.builder()
                        .visitCode("VISIT-HYD-5002")
                        .name("Vijay Krishna")
                        .phone("+91 98855 22334")
                        .email("vijay.k@enterprise.com")
                        .projectName("Skyline Heights")
                        .preferredDate("2026-09-28")
                        .preferredTimeSlot("03:00 PM - 05:00 PM")
                        .numberOfVisitors(2)
                        .transportationRequired(false)
                        .specialRequests("Would like to see actual sample flat view on high floor.")
                        .status(VisitStatus.PENDING)
                        .build()
        );

        siteVisitRepository.saveAll(visits);
        log.info("Seeded sample leads and site visits.");
    }
}
