"use client";

import Link from "next/link";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "What is GEO AIO (Geographic AI Optimization)?",
    a: "GEO AIO is the evolution of Local SEO. It uses Artificial Intelligence to analyze local search intent, semantic variations, and hyper-local data to ensure your business ranks at the top of AI-driven search engines (like Google SGE and ChatGPT) for specific geographic regions like the USA, GCC, or India."
  },
  {
    q: "How long does it take to see results from a custom Website Development project?",
    a: "A standard custom website takes 4-6 weeks from discovery to launch. For complex e-commerce or web applications, it can take 8-12 weeks. SEO optimization is baked into the code from day one to ensure fast indexing."
  },
  {
    q: "Do you build custom CRM and ERP systems from scratch?",
    a: "Yes. While we can implement and customize platforms like Salesforce or HubSpot, we specialize in building bespoke CRM and ERP solutions tailored exactly to your business workflow, saving you thousands in monthly per-user licensing fees."
  },
  {
    q: "Why should a GCC-based business invest in custom software over off-the-shelf?",
    a: "The GCC region has unique regulatory, taxation (like VAT), and language (Arabic/English) requirements. Custom software ensures 100% compliance, seamless localization, and integration with local payment gateways that generic software often lacks."
  },
  {
    q: "How does your SEO strategy differ for the USA vs. the Indian market?",
    a: "The USA market requires highly authoritative backlinks and deep content silos due to extreme competition. The Indian market often benefits from high-volume, long-tail keyword targeting and hyper-local content in multiple regional dialects. Our GEO AIO adapts to these specific market algorithms."
  },
  {
    q: "Are Facebook Ads still effective for B2B lead generation?",
    a: "Absolutely. With Meta's advanced AI targeting, we use lookalike audiences based on your existing high-LTV clients. By using Lead Ads with qualifying questions, we can capture B2B leads at a significantly lower Cost Per Acquisition (CPA) than LinkedIn."
  },
  {
    q: "What is included in your Google Marketing services?",
    a: "We manage Google Search Ads, Performance Max, Display, and YouTube campaigns. Our service includes comprehensive keyword research, ad copywriting, bid management, and continuous A/B testing to maximize your Return on Ad Spend (ROAS)."
  },
  {
    q: "Will I have full ownership of my website and custom software?",
    a: "Yes. Once the project is completed and fully paid, you own 100% of the intellectual property, source code, and assets. We do not hold your code hostage."
  },
  {
    q: "Do you offer ongoing maintenance after launch?",
    a: "Yes, we offer flexible retainer packages for ongoing SEO, ad management, software updates, server maintenance, and feature additions to ensure your digital assets scale with your business."
  },
  {
    q: "How do I get started with No Code Founder services?",
    a: "Simply fill out the 'Book a Free Consultation' form on our homepage. We will schedule a discovery call to understand your goals, audit your current digital presence, and propose a customized growth roadmap."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-white font-sans text-navy pt-28 pb-16 selection:bg-magenta selection:text-ivory">
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/60 backdrop-blur-xl border-b border-white/40 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-[75px] flex items-center justify-between">
          <Link href="/" className="font-serif font-bold text-2xl tracking-tight text-black flex items-center gap-2">
            NoCode<span className="font-sans font-normal text-xl italic text-black/60">Founder</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-black/70 hover:text-black font-medium text-sm transition-colors flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-navy mb-6">Frequently Asked Questions</h1>
          <p className="text-lg text-brown font-light">Everything you need to know about our Web Development, GEO AIO, and Marketing services.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-black/10 rounded-2xl overflow-hidden bg-cream/20"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left px-6 py-5 flex items-center justify-between font-serif text-lg text-black focus:outline-none"
              >
                <span>{faq.q}</span>
                <ChevronDown className={\`w-5 h-5 transition-transform duration-300 \${openIndex === index ? 'rotate-180' : ''}\`} />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-brown/90 leading-relaxed font-light">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-brown mb-4">Still have questions?</p>
          <Link href="/#booking-form" className="inline-block bg-black text-white font-medium py-3 px-8 rounded-full hover:-translate-y-1 transition-transform">
            Book a Free Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
