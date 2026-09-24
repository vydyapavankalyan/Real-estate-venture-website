import React, { useState } from 'react';
import { SEO } from '../components/common/SEO';
import { ChevronDown, ChevronUp, HelpCircle, Phone, MessageCircle } from 'lucide-react';

const faqs = [
  {
    q: "What is the Fourth City project in Mirkhanpet?",
    a: "Fourth City is Telangana's next major urban expansion area covering Mirkhanpet, Maheshwaram, and Kadthal. It is strategically located near the 200ft and 330ft arterial roads, the 300ft Raviryal Greenfield Highway, Amazon Data Center (₹5,809 Cr investment across 48+ acres), Young India Skill University, and Pharma City. Mr. Katla Bhagyarajan identified this corridor as the single best land investment opportunity for middle-class investors in 2026.",
  },
  {
    q: "Are the plots RERA and DTCP/HMDA approved?",
    a: "Yes. All our ventures are either RERA registered, DTCP approved, or HMDA layout approved as applicable. We ensure 100% clear titles with no legal disputes. Our in-house legal team conducts rigorous due diligence on every property before listing it.",
  },
  {
    q: "How do I book a site visit?",
    a: "Click the 'Schedule Site Visit' button on any page or call +91 9090104949. We offer a complimentary chauffeur-driven pickup from your location in Hyderabad. Site visits are available Monday–Saturday, 9 AM to 6 PM. A WhatsApp confirmation with the exact meeting point and map pin will be sent to you.",
  },
  {
    q: "What are the payment plan options?",
    a: "We offer flexible payment plans tailored to each project: 30-70 construction-linked plans, full cash purchases, and bank loan-assisted purchases. We are affiliated with SBI, HDFC Bank, ICICI Bank, Axis Bank, and Canara Bank for seamless loan processing.",
  },
  {
    q: "What ROI can I expect from a Fourth City land investment?",
    a: "Based on current infrastructure growth trajectory, land in Mirkhanpet/Maheshwaram is projected to appreciate at 22–35% CAGR over the next 3–5 years. Compare this to FD returns (7%) or equity mutual funds (~12.5%). Use our ROI Calculator on the /calculator page to model your specific investment.",
  },
  {
    q: "Can NRIs purchase property through Rajan Castle Properties?",
    a: "Absolutely. NRIs can purchase residential and agricultural plots in India as per FEMA guidelines. We provide end-to-end NRI assistance: Power of Attorney setup, overseas documentation, video site visits, NRE/NRO account-linked transactions, and post-purchase management services.",
  },
  {
    q: "What documents do I need to buy a plot?",
    a: "To purchase: Aadhaar Card, PAN Card, 3 months bank statements, 2 passport photos, and address proof. For NRIs: Passport, OCI/PIO card, overseas address proof, and a valid Power of Attorney. Our team will guide you step by step.",
  },
  {
    q: "What is the stamp duty and registration cost in Telangana?",
    a: "In Telangana, stamp duty for property registration is typically 4% of the market value, with a 0.5% registration fee and 1.5% transfer duty — totaling approximately 6% of the property value. Our team will calculate the exact amount based on the Dharani portal rates applicable to your plot.",
  },
  {
    q: "How long has Mr. Katla Bhagyarajan been in real estate?",
    a: "Mr. Katla Bhagyarajan has over 16 years of private sector experience, with 15+ years specifically in Hyderabad real estate. Coming from middle-class roots himself, his vision is to make land investment simple, transparent, and accessible for everyday Hyderabadis — not just the wealthy.",
  },
  {
    q: "What is the minimum investment amount?",
    a: "Plot sizes and pricing vary by project. Our Fourth City ventures start from as low as ₹15 Lakhs for a 100-yard plot. Larger plots (200–500 yards) are available in premium gated community layouts. Contact us for a personalized investment plan matching your budget.",
  },
  {
    q: "How do I track my enquiry status?",
    a: "After submitting an enquiry or booking a site visit, you receive a unique Lead Code (e.g., LEAD-XXXX) or Visit Code (e.g., VISIT-XXXX). You can track the status of your enquiry on our Track Enquiry page at /track-enquiry, or call +91 9090104949 for instant updates.",
  },
  {
    q: "What happens after I register my interest?",
    a: "Within 2 hours of your enquiry, an assigned property advisor will call you to understand your requirements. We then schedule a site visit at your convenience. Post-visit, we share a detailed project brochure with pricing, legal documents, and master plan. Our process is zero-pressure — we believe the right investment speaks for itself.",
  },
];

const FAQItem = ({ q, a, isOpen, onClick }) => (
  <div className="border border-white/10 rounded-2xl overflow-hidden">
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between gap-4 p-5 text-left bg-obsidian-900 hover:bg-white/[0.04] transition-colors"
    >
      <span className="font-semibold text-white text-sm sm:text-base leading-snug">{q}</span>
      {isOpen
        ? <ChevronUp className="w-5 h-5 text-gold-400 shrink-0" />
        : <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />}
    </button>
    {isOpen && (
      <div className="px-5 py-4 bg-obsidian-950/80 border-t border-white/5">
        <p className="text-sm text-slate-400 leading-relaxed">{a}</p>
      </div>
    )}
  </div>
);

export const FAQPage = ({ onOpenEnquiry, onOpenSiteVisit }) => {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div className="min-h-screen bg-obsidian-950 py-16 text-slate-100">
      <SEO title="Frequently Asked Questions" description="Answers to common questions about Rajan Castle Properties: Fourth City investment, RERA approval, site visits, NRI purchase, and more." />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-serif uppercase tracking-widest text-gold-400 font-bold">Investor Support</span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white">Frequently Asked Questions</h1>
          <p className="text-slate-400 text-sm">Everything you need to know about investing with Rajan Castle Properties.</p>
        </div>

        {/* FAQ list */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              q={faq.q}
              a={faq.a}
              isOpen={openIdx === i}
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center bg-obsidian-900 border border-white/10 rounded-2xl p-8 space-y-4">
          <HelpCircle className="w-10 h-10 text-gold-400 mx-auto" />
          <h3 className="font-serif text-xl font-bold text-white">Still Have Questions?</h3>
          <p className="text-slate-400 text-sm">Our advisory team is available Mon–Sat, 9 AM to 6 PM IST.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <a
              href="tel:+919090104949"
              className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian-950 font-bold text-sm hover:from-gold-400 hover:to-gold-500 transition-all"
            >
              <Phone className="w-4 h-4" /> Call +91 9090104949
            </a>
            <button
              onClick={onOpenEnquiry}
              className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl border border-gold-500/40 text-gold-300 font-semibold text-sm hover:bg-gold-500/10 transition-all"
            >
              <MessageCircle className="w-4 h-4" /> Send an Enquiry
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
