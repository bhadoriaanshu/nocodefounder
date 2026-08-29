import type { Metadata } from "next";
import { faqs } from "../../data/faqs";
import FaqClient from "./FaqClient";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Answers about our Website Development timelines, custom CRM/ERP ownership, GEO AIO/SEO strategy for the USA, GCC & India, and Google/Facebook Ads services.",
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    url: "/faq",
    title: "Frequently Asked Questions | No Code Founder",
    description: "Answers about our Website Development timelines, custom CRM/ERP ownership, GEO AIO/SEO strategy for the USA, GCC & India, and Google/Facebook Ads services.",
  },
};

// FAQPage structured data — this is the single highest-leverage schema for
// AIO/GEO: Google Rich Results, AI Overviews, and chat assistants (ChatGPT,
// Perplexity, Gemini) commonly lift question/answer pairs straight from this
// markup when answering user queries about the business.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <FaqClient />
    </>
  );
}
