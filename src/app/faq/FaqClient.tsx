"use client";

import Link from "next/link";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqs } from "../../data/faqs";

export default function FaqClient() {
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
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} />
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

