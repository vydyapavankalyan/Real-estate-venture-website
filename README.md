# Real-estate-venture-website

> **RAJAN - CASTLE PROPERTIES — Hyderabad Luxury Real Estate Platform**  
> *"Your trusted partner in finding exceptional properties. We make real estate dreams come true."*  
> *Reference Website: [https://www.rajan-castle-properties.net/](https://www.rajan-castle-properties.net/)*

A production-ready luxury real estate venture platform built specifically for Hyderabad's high-growth corridors (Kokapet, Neopolis, Financial District, Tellapur) and Telangana's emerging **Fourth City** (Mirkhanpet, Maheshwaram, and Kadthal).

Incorporating the full design, branding, leadership message, services, articles, and upcoming projects from [Rajan Castle Properties](https://www.rajan-castle-properties.net/), this platform delivers:
- **A Personal Message from Mr. Rajan (Katla Bhagyarajan, Founder)**: Entrepreneurial journey, middle-class roots, and vision for simpler, smaller, and smarter investment opportunities.
- **Strategic Location in Mirkhanpet & Telangana's Fourth City**:
  - Positioned closely to the **Young India Skill University** and **Amazon Data Center** (₹5,809 Crores across 48+ acres).
  - 200-foot road facing & 330-foot road connectivity.
  - Upcoming 300ft Greenfield Highway from Raviryal to Meerkhanpet.
  - Proposed Regional Ring Road (RRR) junction.
- **Latest Articles, Master Plans & Video Briefings (`/articles`)**:
  - "Hyderabad to get its fourth city: CM" (3 development rings by CM A. Revanth Reddy)
  - "Another Financial District - Development Plans" (Detailed infrastructure mapping)
  - "Future City Development" (Bilingual Telugu & English master plan blueprint)
  - "Hyderabad Development Vision - Video Overview" (with embedded YouTube player: [https://www.youtube.com/watch?v=dxKDwsEJbUI](https://www.youtube.com/watch?v=dxKDwsEJbUI))
- **6 Core Advisory Services**: Property Search, Market Analysis, Asset & Property Management, Buyer Representation, Investment Analysis, and Legal Diligence.
- **VIP Site Visit Experience**: Instant online scheduling with optional **Chauffeur-Driven Luxury Vehicle Pickup** toggle.
- **Operations CRM & Staff Portal**: Executive overview KPIs, lead pipeline stages (`NEW` → `CONTACTED` → `QUALIFIED` → `SITE_VISIT_SCHEDULED` → `CONVERTED`), and inventory management.
- **Direct Concierge Hotline**: `+91 9090104949` | `katla.bhagyarajan@gmail.com`

---

## 🏗️ Architecture & Technology Stack

```
                          ┌────────────────────────┐
                          │  React 18 + Vite SPA   │ (Port 5173 / Nginx 80)
                          │ Tailwind CSS + Leaflet │
                          └───────────┬────────────┘
                                      │ REST API / JWT
                                      ▼
                      ┌────────────────────────────────┐
                      │  Java 21 Spring Boot 3.3.4     │ (Port 8085)
                      │     Modular Monolith Backend   │
                      ├────────────────────────────────┤
                      │ • Auth & User Module           │
                      │ • Project & Inventory Module   │
                      │ • Growth Corridor Module       │
                      │ • Lead & CRM Pipeline Module   │
                      │ • Site Visit Scheduling Module │
                      │ • Future Infrastructure Module │
                      │ • Analytics & Admin Module     │
                      └───────────────┬────────────────┘
                                      │ Spring Data MongoDB
                                      ▼
                          ┌────────────────────────┐
                          │     MongoDB 8.0+       │ (Port 27017)
                          │   Database: `venture`  │
                          └────────────────────────┘
```

---

## 🧭 Web Application Routes

| Route | Page | Key Details |
|---|---|---|
| `/` | **Home** | Hero property, Fourth City showcase, Mr. Rajan message snippet, featured ventures, services, video preview |
| `/properties` / `/projects` | **Projects Directory** | Fourth City Mirkhanpet master plan showcase, dynamic multi-facet filters (BHK, corridor, budget) |
| `/message` | **Founder's Message** | A Personal Message from Mr. Katla Bhagyarajan, 16+ years private sector experience, Fourth City hubs |
| `/services` | **Our Services** | 6 core services (Property Search, Valuation, Asset Management, Buyer Representation, Investment, Legal) |
| `/articles` | **Articles & Video Hub** | 4 detailed articles, PDF master plan downloads, embedded YouTube briefing video |
| `/future-development` | **Future City Tracker** | Infrastructure milestone roadmap (Skill University, Amazon DC, RRR, Metro Phase 2) |
| `/about` | **About Us** | 15+ years experience, stats (500+ properties sold, 1000+ happy clients), values (People First, Sustainable, Trust) |
| `/contact` | **Contact** | Direct concierge desk: `+91 9090104949`, `katla.bhagyarajan@gmail.com`, Hyderabad 500074 office |
| `/login` | **Staff Sign In** | Administrator and Sales Agent JWT authentication |
| `/admin/*` | **Operations CRM** | KPI Dashboard, Projects CRUD, Inquiries Pipeline, Site Visits Manager, Infrastructure Editor |

---

## 🚀 Quick Start Guide

### Native Local Setup
1. **MongoDB**: Ensure MongoDB is running locally on port `27017` with database `venture`.
2. **Backend**:
   ```powershell
   cd backend
   mvn spring-boot:run
   ```
   Backend runs on `http://localhost:8085`.  
   Swagger UI is available at `http://localhost:8085/swagger-ui/index.html`.
3. **Frontend**:
   ```powershell
   cd ../frontend
   npm install
   npm run dev
   ```
   Frontend runs on `http://localhost:5173`.

### Docker Multi-Container Setup
```powershell
docker compose up --build
```
Spins up MongoDB (`27017`), Spring Boot Backend (`8085`), and Nginx Frontend (`80`).

---

## 🔐 Staff & Admin Credentials

| Role | Email | Password |
|---|---|---|
| **System Administrator** | `admin@hyderabadrealty.com` | `Admin@2026` |
| **Sales Manager** | `sales@hyderabadrealty.com` | `Agent@2026` |

---

## 📞 Direct Contact

- **Founder & MD**: Mr. Katla Bhagyarajan
- **Hotline**: `+91 9090104949`
- **Email**: `katla.bhagyarajan@gmail.com`
- **Office**: Hyderabad, Telangana - 500074 / 500070
- **Hours**: Mon - Fri: 9:00 AM - 6:00 PM | Sat - Sun: 10:00 AM - 4:00 PM
