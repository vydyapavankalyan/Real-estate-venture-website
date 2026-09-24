import React from 'react';
import { SEO } from '../components/common/SEO';
import { Shield, FileText, Mail, Phone } from 'lucide-react';

const Section = ({ title, children }) => (
  <div className="space-y-4">
    <h2 className="font-serif text-xl font-bold text-white border-b border-white/10 pb-3">{title}</h2>
    <div className="text-sm text-slate-400 leading-relaxed space-y-3">{children}</div>
  </div>
);

export const PrivacyPage = () => (
  <div className="min-h-screen bg-obsidian-950 py-16 text-slate-100">
    <SEO title="Privacy Policy & Terms of Service" description="Privacy policy, terms of service, and RERA disclaimer for Rajan Castle Properties, Hyderabad." />
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

      {/* Header */}
      <div className="space-y-3">
        <span className="text-xs font-serif uppercase tracking-widest text-gold-400 font-bold">Legal & Compliance</span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white">Privacy Policy & Terms</h1>
        <p className="text-slate-400 text-sm">Last updated: September 2026 &nbsp;|&nbsp; Rajan - Castle Properties, Hyderabad, Telangana 500074</p>
      </div>

      {/* RERA Disclaimer banner */}
      <div className="p-5 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex gap-3">
        <Shield className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
        <p className="text-sm text-gold-200 leading-relaxed">
          <strong className="text-gold-400">RERA Disclaimer:</strong> All projects and information on this website are subject to applicable RERA (Real Estate Regulation and Development Act, 2016) provisions. Pricing, availability, specifications, and timelines may change. Renders and photographs are artist impressions. Buyers are advised to independently verify all details before making any investment decision.
        </p>
      </div>

      <Section title="1. Information We Collect">
        <p>We collect information you voluntarily provide, including: full name, phone number, email address, city of residence, budget range, and property preferences when you submit an enquiry, book a site visit, or contact us via our website or WhatsApp.</p>
        <p>We may also automatically collect: IP address, browser type, pages visited, and time spent on the website for analytics purposes.</p>
      </Section>

      <Section title="2. How We Use Your Information">
        <p>Your information is used exclusively to: respond to enquiries, schedule site visits, send relevant property updates, and improve our services. We do not sell, trade, or rent your personal information to third parties.</p>
        <p>Our sales advisory team may contact you via phone, email, or WhatsApp to follow up on your enquiry. You may opt out at any time by contacting us.</p>
      </Section>

      <Section title="3. Cookies & Tracking">
        <p>Our website uses cookies to enhance your browsing experience, analyze site traffic, and understand user preferences. By continuing to use this site, you consent to our use of cookies.</p>
        <p>You may disable cookies in your browser settings; however, some features of the website may not function correctly without them.</p>
      </Section>

      <Section title="4. Third-Party Services">
        <p>We use third-party services including Google Analytics (usage analytics), Google Maps / Leaflet (property location mapping), YouTube (video content), and WhatsApp Business (communication). These services have their own privacy policies.</p>
        <p>Images are sourced from Unsplash (used under their license) and our own project photographs.</p>
      </Section>

      <Section title="5. Data Security">
        <p>We implement industry-standard security measures including HTTPS encryption, JWT-based authentication for admin portals, and secure MongoDB storage. We retain your enquiry data for up to 24 months to serve your investment journey.</p>
      </Section>

      <Section title="6. Terms of Service">
        <p><strong className="text-slate-200">Use of Website:</strong> This website is for informational and lead generation purposes. By using this website, you agree not to misuse, scrape, or reverse-engineer any part of the platform.</p>
        <p><strong className="text-slate-200">No Guarantee:</strong> Information on this website does not constitute a legal offer to sell. Final terms are governed by the registered sale agreement and applicable law.</p>
        <p><strong className="text-slate-200">Governing Law:</strong> These terms are governed by the laws of Telangana, India. Any disputes shall be subject to the jurisdiction of courts in Hyderabad, Telangana.</p>
      </Section>

      <Section title="7. Contact for Privacy Requests">
        <p>To request access, correction, or deletion of your personal data, please contact us:</p>
        <div className="flex flex-col sm:flex-row gap-6 pt-2">
          <a href="tel:+919090104949" className="flex items-center gap-2 text-gold-400 hover:text-gold-300">
            <Phone className="w-4 h-4" /> +91 9090104949
          </a>
          <a href="mailto:katla.bhagyarajan@gmail.com" className="flex items-center gap-2 text-gold-400 hover:text-gold-300">
            <Mail className="w-4 h-4" /> katla.bhagyarajan@gmail.com
          </a>
        </div>
      </Section>

    </div>
  </div>
);
