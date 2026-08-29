import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const BASE_URL = "https://nocodefounder.site";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "No Code Founder | Scale Your Business with Custom Tech",
    template: "%s | No Code Founder",
  },
  description: "Scale your business with custom Web Development, CRM/ERP software, and ROI-driven SEO, Google & Facebook Ads for the USA, GCC and India.",
  keywords: ["Website Development", "CRM Development", "ERP Solutions", "SEO Agency", "GEO AIO", "Google Ads Agency", "Facebook Ads Agency", "USA", "GCC", "Dubai", "India", "Software Agency"],
  applicationName: "No Code Founder",
  authors: [{ name: "No Code Founder" }],
  category: "Web Development & Digital Marketing Agency",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Replace this placeholder with your real Google Search Console verification
  // string from https://search.google.com/search-console -> Settings -> Ownership verification -> HTML tag
  verification: {
    google: "REPLACE_WITH_GOOGLE_SITE_VERIFICATION_CODE",
  },
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "No Code Founder",
    locale: "en_US",
    images: [{ url: "/new-cover.png", width: 1200, height: 630, alt: "No Code Founder - Web Development, CRM, ERP & Digital Marketing Agency" }],
    title: "No Code Founder | Scale Your Business with Custom Tech",
    description: "Scale your business with custom Web Development, CRM/ERP software, and ROI-driven SEO, Google & Facebook Ads for the USA, GCC and India."
  },
  twitter: {
    card: "summary_large_image",
    title: "No Code Founder | Scale Your Business with Custom Tech",
    description: "Scale your business with custom Web Development, CRM/ERP software, and ROI-driven SEO, Google & Facebook Ads for the USA, GCC and India.",
    images: ["/new-cover.png"]
  }
};

// --- STRUCTURED DATA (JSON-LD) ---
// Helps Google Rich Results, Google AI Overviews, and AI assistants
// (ChatGPT, Perplexity, Claude, Gemini) accurately understand and cite
// the business entity, its services and its service areas (SEO/AIO/GEO).
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${BASE_URL}/#organization`,
  name: "No Code Founder",
  url: BASE_URL,
  logo: `${BASE_URL}/new-cover.png`,
  image: `${BASE_URL}/new-cover.png`,
  description: "Web Development, Custom CRM & ERP solutions, and ROI-driven Digital Marketing (SEO, Google Ads, Facebook Ads) agency serving the USA, GCC, and India.",
  email: "help@nocodefounder.site",
  areaServed: [
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Country", name: "Saudi Arabia" },
    { "@type": "Country", name: "India" },
  ],
  priceRange: "$$",
  sameAs: [],
  makesOffer: [
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Website Development" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom CRM Solutions" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "ERP Systems" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "SEO Optimization / GEO AIO" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Google Marketing" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Facebook Marketing" } },
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  url: BASE_URL,
  name: "No Code Founder",
  publisher: { "@id": `${BASE_URL}/#organization` },
};

import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${outfit.variable} ${playfair.variable} font-sans antialiased text-navy`} suppressHydrationWarning>
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1456342243003290');
            fbq('track', 'PageView');
          `}
        </Script>

        <Script
          id="ld-organization"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Script
          id="ld-website"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />

        {children}
      </body>
    </html>
  );
}
