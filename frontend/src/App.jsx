import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { projectService } from './services/projectService';

// Common Components
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { MobileStickyBar } from './components/common/MobileStickyBar';
import { WhatsAppWidget } from './components/common/WhatsAppWidget';
import { ScrollToTopButton } from './components/common/ScrollToTopButton';
import { CookieConsent } from './components/common/CookieConsent';
import { EnquiryModal } from './components/leads/EnquiryModal';
import { SiteVisitModal } from './components/leads/SiteVisitModal';

// Public Pages
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { LocationsPage } from './pages/LocationsPage';
import { FutureDevelopmentPage } from './pages/FutureDevelopmentPage';
import { ServicesPage } from './pages/ServicesPage';
import { MessagePage } from './pages/MessagePage';
import { ArticlesPage } from './pages/ArticlesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { CalculatorPage } from './pages/CalculatorPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { FAQPage } from './pages/FAQPage';
import { TrackEnquiryPage } from './pages/TrackEnquiryPage';
import { LoginPage } from './pages/LoginPage';
import { ErrorBoundary } from './components/common/ErrorBoundary';

// Admin Pages & Layout
import { AdminLayout } from './layouts/AdminLayout';
import { DashboardPage } from './pages/admin/DashboardPage';
import { AdminProjectsPage } from './pages/admin/AdminProjectsPage';
import { AdminLeadsPage } from './pages/admin/AdminLeadsPage';
import { AdminSiteVisitsPage } from './pages/admin/AdminSiteVisitsPage';
import { AdminFutureDevPage } from './pages/admin/AdminFutureDevPage';
import { AdminBlogPage } from './pages/admin/AdminBlogPage';

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Protected Route Guard for Staff/Admin Area
function ProtectedAdminRoute({ children }) {
  const { user, loading, isAdmin } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-obsidian-950 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-gold-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-obsidian-950 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-serif font-bold text-white mb-2">Access Restricted</h2>
        <p className="text-slate-400 text-sm mb-6">Staff or Administrator credentials required to access the operations console.</p>
      </div>
    );
  }

  return children;
}

export function AppContent() {
  const [isSiteVisitOpen, setIsSiteVisitOpen] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectsList, setProjectsList] = useState([]);

  useEffect(() => {
    projectService.getAll({ size: 50 })
      .then((res) => {
        setProjectsList(res.content || []);
      })
      .catch((err) => console.error('Failed to load project list for modal:', err));
  }, []);

  const handleOpenSiteVisit = (project = null) => {
    setSelectedProject(project);
    setIsSiteVisitOpen(true);
  };

  const handleOpenEnquiry = (project = null) => {
    setSelectedProject(project);
    setIsEnquiryOpen(true);
  };

  return (
    <>
      <ScrollToTop />

      {/* Global Action Modals */}
      <SiteVisitModal
        isOpen={isSiteVisitOpen}
        onClose={() => setIsSiteVisitOpen(false)}
        projects={projectsList}
        preselectedProject={selectedProject}
      />

      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        defaultProject={selectedProject}
      />

      <Routes>
        {/* Public Routes with Navbar and Footer */}
        <Route
          path="/"
          element={
            <div className="min-h-screen flex flex-col bg-obsidian-950 text-slate-100 pb-16 md:pb-0">
              <Navbar
                onOpenSiteVisit={() => handleOpenSiteVisit()}
                onOpenEnquiry={() => handleOpenEnquiry()}
              />
              <main className="flex-grow">
                <HomePage
                  onOpenSiteVisit={handleOpenSiteVisit}
                  onOpenEnquiry={handleOpenEnquiry}
                />
              </main>
              <Footer />
              <MobileStickyBar
                onOpenSiteVisit={() => handleOpenSiteVisit()}
                onOpenEnquiry={() => handleOpenEnquiry()}
              />
            </div>
          }
        />

        <Route
          path="/projects"
          element={
            <div className="min-h-screen flex flex-col bg-obsidian-950 text-slate-100 pb-16 md:pb-0">
              <Navbar
                onOpenSiteVisit={() => handleOpenSiteVisit()}
                onOpenEnquiry={() => handleOpenEnquiry()}
              />
              <main className="flex-grow">
                <ProjectsPage
                  onOpenSiteVisit={handleOpenSiteVisit}
                  onOpenEnquiry={handleOpenEnquiry}
                />
              </main>
              <Footer />
              <MobileStickyBar
                onOpenSiteVisit={() => handleOpenSiteVisit()}
                onOpenEnquiry={() => handleOpenEnquiry()}
              />
            </div>
          }
        />

        {/* Alias /properties from reference website */}
        <Route
          path="/properties"
          element={
            <div className="min-h-screen flex flex-col bg-obsidian-950 text-slate-100 pb-16 md:pb-0">
              <Navbar
                onOpenSiteVisit={() => handleOpenSiteVisit()}
                onOpenEnquiry={() => handleOpenEnquiry()}
              />
              <main className="flex-grow">
                <ProjectsPage
                  onOpenSiteVisit={handleOpenSiteVisit}
                  onOpenEnquiry={handleOpenEnquiry}
                />
              </main>
              <Footer />
              <MobileStickyBar
                onOpenSiteVisit={() => handleOpenSiteVisit()}
                onOpenEnquiry={() => handleOpenEnquiry()}
              />
            </div>
          }
        />

        {/* /message: Founder's Message from Mr. Rajan */}
        <Route
          path="/message"
          element={
            <div className="min-h-screen flex flex-col bg-obsidian-950 text-slate-100 pb-16 md:pb-0">
              <Navbar
                onOpenSiteVisit={() => handleOpenSiteVisit()}
                onOpenEnquiry={() => handleOpenEnquiry()}
              />
              <main className="flex-grow">
                <MessagePage
                  onOpenEnquiry={handleOpenEnquiry}
                  onOpenSiteVisit={handleOpenSiteVisit}
                />
              </main>
              <Footer />
              <MobileStickyBar
                onOpenSiteVisit={() => handleOpenSiteVisit()}
                onOpenEnquiry={() => handleOpenEnquiry()}
              />
            </div>
          }
        />

        {/* /articles: Development updates, Master plans & Video Hub */}
        <Route
          path="/articles"
          element={
            <div className="min-h-screen flex flex-col bg-obsidian-950 text-slate-100 pb-16 md:pb-0">
              <Navbar
                onOpenSiteVisit={() => handleOpenSiteVisit()}
                onOpenEnquiry={() => handleOpenEnquiry()}
              />
              <main className="flex-grow">
                <ArticlesPage onOpenEnquiry={handleOpenEnquiry} />
              </main>
              <Footer />
              <MobileStickyBar
                onOpenSiteVisit={() => handleOpenSiteVisit()}
                onOpenEnquiry={() => handleOpenEnquiry()}
              />
            </div>
          }
        />

        <Route
          path="/projects/:slug"
          element={
            <div className="min-h-screen flex flex-col bg-obsidian-950 text-slate-100 pb-16 md:pb-0">
              <Navbar
                onOpenSiteVisit={() => handleOpenSiteVisit()}
                onOpenEnquiry={() => handleOpenEnquiry()}
              />
              <main className="flex-grow">
                <ProjectDetailPage
                  onOpenSiteVisit={handleOpenSiteVisit}
                  onOpenEnquiry={handleOpenEnquiry}
                />
              </main>
              <Footer />
              <MobileStickyBar
                onOpenSiteVisit={() => handleOpenSiteVisit()}
                onOpenEnquiry={() => handleOpenEnquiry()}
              />
            </div>
          }
        />

        <Route
          path="/locations"
          element={
            <div className="min-h-screen flex flex-col bg-obsidian-950 text-slate-100 pb-16 md:pb-0">
              <Navbar
                onOpenSiteVisit={() => handleOpenSiteVisit()}
                onOpenEnquiry={() => handleOpenEnquiry()}
              />
              <main className="flex-grow">
                <LocationsPage />
              </main>
              <Footer />
              <MobileStickyBar
                onOpenSiteVisit={() => handleOpenSiteVisit()}
                onOpenEnquiry={() => handleOpenEnquiry()}
              />
            </div>
          }
        />

        <Route
          path="/future-development"
          element={
            <div className="min-h-screen flex flex-col bg-obsidian-950 text-slate-100 pb-16 md:pb-0">
              <Navbar
                onOpenSiteVisit={() => handleOpenSiteVisit()}
                onOpenEnquiry={() => handleOpenEnquiry()}
              />
              <main className="flex-grow">
                <FutureDevelopmentPage onOpenEnquiry={handleOpenEnquiry} />
              </main>
              <Footer />
              <MobileStickyBar
                onOpenSiteVisit={() => handleOpenSiteVisit()}
                onOpenEnquiry={() => handleOpenEnquiry()}
              />
            </div>
          }
        />

        <Route
          path="/services"
          element={
            <div className="min-h-screen flex flex-col bg-obsidian-950 text-slate-100 pb-16 md:pb-0">
              <Navbar
                onOpenSiteVisit={() => handleOpenSiteVisit()}
                onOpenEnquiry={() => handleOpenEnquiry()}
              />
              <main className="flex-grow">
                <ServicesPage
                  onOpenEnquiry={handleOpenEnquiry}
                  onOpenSiteVisit={handleOpenSiteVisit}
                />
              </main>
              <Footer />
              <MobileStickyBar
                onOpenSiteVisit={() => handleOpenSiteVisit()}
                onOpenEnquiry={() => handleOpenEnquiry()}
              />
            </div>
          }
        />

        {/* Alias /insights to ServicesPage */}
        <Route
          path="/insights"
          element={
            <div className="min-h-screen flex flex-col bg-obsidian-950 text-slate-100 pb-16 md:pb-0">
              <Navbar
                onOpenSiteVisit={() => handleOpenSiteVisit()}
                onOpenEnquiry={() => handleOpenEnquiry()}
              />
              <main className="flex-grow">
                <ServicesPage
                  onOpenEnquiry={handleOpenEnquiry}
                  onOpenSiteVisit={handleOpenSiteVisit}
                />
              </main>
              <Footer />
              <MobileStickyBar
                onOpenSiteVisit={() => handleOpenSiteVisit()}
                onOpenEnquiry={() => handleOpenEnquiry()}
              />
            </div>
          }
        />

        <Route
          path="/about"
          element={
            <div className="min-h-screen flex flex-col bg-obsidian-950 text-slate-100 pb-16 md:pb-0">
              <Navbar
                onOpenSiteVisit={() => handleOpenSiteVisit()}
                onOpenEnquiry={() => handleOpenEnquiry()}
              />
              <main className="flex-grow">
                <AboutPage onOpenEnquiry={handleOpenEnquiry} />
              </main>
              <Footer />
              <MobileStickyBar
                onOpenSiteVisit={() => handleOpenSiteVisit()}
                onOpenEnquiry={() => handleOpenEnquiry()}
              />
            </div>
          }
        />

        <Route
          path="/contact"
          element={
            <div className="min-h-screen flex flex-col bg-obsidian-950 text-slate-100 pb-16 md:pb-0">
              <Navbar
                onOpenSiteVisit={() => handleOpenSiteVisit()}
                onOpenEnquiry={() => handleOpenEnquiry()}
              />
              <main className="flex-grow">
                <ContactPage />
              </main>
              <Footer />
              <MobileStickyBar
                onOpenSiteVisit={() => handleOpenSiteVisit()}
                onOpenEnquiry={() => handleOpenEnquiry()}
              />
            </div>
          }
        />

        <Route
          path="/calculator"
          element={
            <div className="min-h-screen flex flex-col bg-obsidian-950 text-slate-100 pb-16 md:pb-0">
              <Navbar
                onOpenSiteVisit={() => handleOpenSiteVisit()}
                onOpenEnquiry={() => handleOpenEnquiry()}
              />
              <main className="flex-grow">
                <CalculatorPage
                  onOpenEnquiry={handleOpenEnquiry}
                  onOpenSiteVisit={handleOpenSiteVisit}
                />
              </main>
              <Footer />
              <MobileStickyBar
                onOpenSiteVisit={() => handleOpenSiteVisit()}
                onOpenEnquiry={() => handleOpenEnquiry()}
              />
            </div>
          }
        />

        <Route
          path="/privacy"
          element={
            <div className="min-h-screen flex flex-col bg-obsidian-950 text-slate-100 pb-16 md:pb-0">
              <Navbar onOpenSiteVisit={() => handleOpenSiteVisit()} onOpenEnquiry={() => handleOpenEnquiry()} />
              <main className="flex-grow"><PrivacyPage /></main>
              <Footer />
              <MobileStickyBar onOpenSiteVisit={() => handleOpenSiteVisit()} onOpenEnquiry={() => handleOpenEnquiry()} />
            </div>
          }
        />

        <Route
          path="/faq"
          element={
            <div className="min-h-screen flex flex-col bg-obsidian-950 text-slate-100 pb-16 md:pb-0">
              <Navbar onOpenSiteVisit={() => handleOpenSiteVisit()} onOpenEnquiry={() => handleOpenEnquiry()} />
              <main className="flex-grow"><FAQPage onOpenEnquiry={handleOpenEnquiry} onOpenSiteVisit={handleOpenSiteVisit} /></main>
              <Footer />
              <MobileStickyBar onOpenSiteVisit={() => handleOpenSiteVisit()} onOpenEnquiry={() => handleOpenEnquiry()} />
            </div>
          }
        />

        <Route
          path="/track-enquiry"
          element={
            <div className="min-h-screen flex flex-col bg-obsidian-950 text-slate-100 pb-16 md:pb-0">
              <Navbar onOpenSiteVisit={() => handleOpenSiteVisit()} onOpenEnquiry={() => handleOpenEnquiry()} />
              <main className="flex-grow"><TrackEnquiryPage /></main>
              <Footer />
              <MobileStickyBar onOpenSiteVisit={() => handleOpenSiteVisit()} onOpenEnquiry={() => handleOpenEnquiry()} />
            </div>
          }
        />

        <Route
          path="/login"
          element={
            <div className="min-h-screen flex flex-col bg-obsidian-950 text-slate-100">
              <Navbar
                onOpenSiteVisit={() => handleOpenSiteVisit()}
                onOpenEnquiry={() => handleOpenEnquiry()}
              />
              <main className="flex-grow flex items-center justify-center p-4">
                <LoginPage />
              </main>
              <Footer />
            </div>
          }
        />

        {/* Protected Operations Portal Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="projects" element={<AdminProjectsPage />} />
          <Route path="leads" element={<AdminLeadsPage />} />
          <Route path="site-visits" element={<AdminSiteVisitsPage />} />
          <Route path="blog" element={<AdminBlogPage />} />
          <Route path="future-dev" element={<AdminFutureDevPage />} />
        </Route>

        {/* Catch-all 404 */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex flex-col bg-obsidian-950 text-slate-100">
              <Navbar
                onOpenSiteVisit={() => handleOpenSiteVisit()}
                onOpenEnquiry={() => handleOpenEnquiry()}
              />
              <main className="flex-grow">
                <NotFoundPage />
              </main>
              <Footer />
            </div>
          }
        />
      </Routes>

      {/* Floating 24/7 WhatsApp Concierge Widget */}
      <WhatsAppWidget />
      <ScrollToTopButton />
      <CookieConsent />
    </>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ErrorBoundary>
  );
}
