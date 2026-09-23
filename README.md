# Real-estate-venture-website

> **AURUM HYDERABAD — 2026 Luxury Real Estate Venture Platform**  
> *"Discover Better Living. Invest in Hyderabad's Future."*

A state-of-the-art, production-ready luxury real estate venture platform tailored specifically for the hyper-growth market of Hyderabad (Kokapet Golden Mile, Neopolis Sky Mansions, Financial District, Tellapur Gated Communities, Narsingi Lakefront, and Shamshabad Aerotropolis).

Inspired by premier real estate portals (including [Rajan Castle Properties](https://www.rajan-castle-properties.net/)), Aurum Hyderabad delivers end-to-end client experiences: VIP property curation, interactive Leaflet maps with verified connectivity, multi-angle project galleries with architectural zoom, Telangana RERA & HMDA due diligence, luxury site visit booking (with chauffeur pickup toggle), an active "Hyderabad: Building the Future" infrastructure tracker (Metro Phase 2, Regional Ring Road, AI City), and a staff operations CRM dashboard.

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

### Frontend
- **React 18** with **Vite** tooling for fast HMR
- **React Router v6** for nested public & authenticated admin routing
- **Tailwind CSS** with a custom 2026 Obsidian (`#030712`) & Royal Gold (`#C5A059`, `#D4AF37`) luxury design language
- **Leaflet & OpenStreetMap** for interactive geospatial project mapping & verified connectivity radii
- **Lucide React** icon library
- **Axios** with automatic JWT authentication interceptors and token refresh

### Backend
- **Java 21** & **Spring Boot 3.3.4**
- **Spring Data MongoDB** with dynamic criteria queries & audit indexing
- **Spring Security** with stateless JWT authentication (`jjwt 0.12.6`)
- **SpringDoc OpenAPI 3 / Swagger** interactive API documentation
- **Lombok** for clean, boilerplate-free domain models
- **Automated DataSeeder** initializing seed corridors, verified projects, and infrastructure projects

---

## 🌟 Key Capabilities & Features

### 1. Curated Portfolio & Advanced Search
- Real-time filtering by **Corridor** (Kokapet, Neopolis, Financial District, Tellapur, Narsingi, Shamshabad), **Property Type** (Apartments, Sky Mansions, Gated Villas, Commercial Penthouses), **BHK configuration**, and **Price Range**.
- Multi-dimensional sorting (Price, Recently Added, Handover Date).

### 2. High-End Project Detail Showcase
- **Architectural Gallery Viewer**: Categorized albums (Exterior, Interior, Amenities, Drone / Bird's Eye Views, Master Plans) with full-screen lightbox and zoom.
- **Interactive Floor Plans**: Switch between 3 BHK, 4 BHK, and Penthouse floor layouts with carpet area and balcony specs.
- **Interactive Leaflet Map**: Displays the project location alongside verified transit, airport, and IT corridor times.
- **Telangana RERA & HMDA Compliance Badge**: Full transparency with regulatory disclaimers.

### 3. Comprehensive Real Estate Services
*(Directly modeled with reference to [Rajan Castle Properties](https://www.rajan-castle-properties.net/)):*
- **Property Search & VIP Curation**: Exclusive off-market inventory and corner unit reservations.
- **Market Valuation & Comparative Analysis**: Micro-market trend analysis and per-sq.ft. historical appreciation tracking.
- **Asset & Property Management**: Turnkey NRI property care, tenant onboarding, and periodic maintenance reports.
- **Exclusive Buyer Representation**: Protecting buyer interests with developer contract reviews and milestone optimizations.
- **Strategic Investment Advisory**: Maximizing capital appreciation along the Airport Metro and Regional Ring Road (RRR).
- **Legal Diligence & Title Verification**: Independent scrutiny of link documents, encumbrance certificates, and RERA escrow accounts.

### 4. VIP Site Visit Experience
- Schedule private physical site tours with date picker, preferred arrival slot, and an optional **Chauffeur-Driven Luxury Vehicle Pickup** toggle with address capture.
- Automated instant confirmation code generation (`SV-XXXXXX`).

### 5. "Hyderabad: Building the Future" Infrastructure Tracker
- Tracks major state megaprojects:
  - **Airport Express Metro Line** (Gachibowli to RGIA Shamshabad)
  - **340-km Regional Ring Road (RRR)**
  - **Neopolis Mega High-Rise IT District**
  - **Telangana 200-Acre AI City**
  - **Pharma City & Life Sciences Hub**
  - **Foxconn Kongara Kalan Electronics Campus**
- Categorized by Rings (Inner Ring, Outer Ring Road, Regional Ring Road) and transport zones.

### 6. Operations CRM & Staff Portal
- Protected routes accessible to `ROLE_ADMIN`, `ROLE_SALES_MANAGER`, and `ROLE_CONTENT_MANAGER`.
- **Executive Metrics Dashboard**: Aggregates total active ventures, total pipeline leads, scheduled visits, and average price per sq.ft.
- **Leads Pipeline**: Track inquiry lifecycle (`NEW` → `CONTACTED` → `QUALIFIED` → `SITE_VISIT_SCHEDULED` → `CONVERTED`), append timestamped agent notes.
- **Site Visit Manager**: Review chauffeur requests, visitor counts, and approve/reschedule tours.
- **Inventory & Project Management**: Add or edit projects, unit pricing, specifications, and amenity tags.

---

## 🚀 Quick Start Guide

### Prerequisites
1. **Java Development Kit (JDK) 21+**
2. **Node.js 18+ & npm**
3. **MongoDB 6.0+** running locally on port `27017`
4. **Apache Maven 3.9+** (or use the included wrapper)

---

### Method A: Local Native Setup

#### 1. Start MongoDB
Ensure MongoDB is running on `localhost:27017`:
```powershell
# Using mongod directly or Windows Services
net start MongoDB
```

#### 2. Run the Spring Boot Backend
```powershell
cd backend
mvn spring-boot:run
```
The backend initializes the `venture` database, executes the `DataSeeder`, and starts on **`http://localhost:8085`**.  
Interactive Swagger API documentation is available at **`http://localhost:8085/swagger-ui.html`**.

#### 3. Run the React Frontend
```powershell
cd ../frontend
npm install
npm run dev
```
The frontend starts on **`http://localhost:5173`**. The Vite proxy automatically routes `/api` requests to `http://localhost:8085`.

---

### Method B: Docker & Docker Compose Setup

Run the entire stack with a single command:
```powershell
docker compose up --build
```
Services spun up:
- **MongoDB**: `localhost:27017`
- **Backend API**: `http://localhost:8085`
- **Frontend Web Portal**: `http://localhost` (Port 80 via Nginx)

---

## 🔐 Default Staff & Admin Credentials

| Role | Email | Password |
|---|---|---|
| **System Administrator** | `admin@hyderabadrealty.com` | `Admin@2026` |
| **Senior Sales Manager** | `sales@hyderabadrealty.com` | `Agent@2026` |

*To sign in, navigate to `http://localhost:5173/login` or click **Sign In** in the top navigation bar.*

---

## 📡 REST API Reference Summary

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/auth/login` | Authenticate staff / user & obtain JWT | Public |
| `POST` | `/api/auth/register` | Register new user account | Public |
| `GET` | `/api/projects` | Filtered project catalog with pagination | Public |
| `GET` | `/api/projects/featured` | Curated top venture developments | Public |
| `GET` | `/api/projects/{slug}` | Project details by SEO slug | Public |
| `POST` | `/api/projects` | Create a new real estate venture | Staff / Admin |
| `PUT` | `/api/projects/{id}` | Update venture details & inventory | Staff / Admin |
| `GET` | `/api/locations` | All growth corridors (Kokapet, Neopolis...) | Public |
| `GET` | `/api/future-dev` | Future infrastructure milestones | Public |
| `POST` | `/api/leads` | Submit enquiry from contact forms / modals | Public |
| `GET` | `/api/leads` | Lead CRM query pipeline | Staff / Admin |
| `POST` | `/api/site-visits` | Book a site visit (with chauffeur toggle) | Public |
| `GET` | `/api/site-visits` | List scheduled tours and status | Staff / Admin |
| `GET` | `/api/admin/stats` | Executive KPI overview metrics | Staff / Admin |

---

## ⚖️ Regulatory Transparency & Disclaimers

All project details, architectural 3D renders, and layouts featured are artist impressions. Telangana RERA registration numbers displayed are for demonstration. Users are advised to independently verify all approvals through the official [Telangana RERA Portal](https://rera.telangana.gov.in/) before entering into any purchase commitment.

---

## 📄 License
Designed & Developed for Aurum Hyderabad Real Estate Platform © 2026. All rights reserved.
