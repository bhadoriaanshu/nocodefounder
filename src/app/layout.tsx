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

export const metadata: Metadata = {
  metadataBase: new URL("https://nocodefounder.site"),
  title: "No Code Founder | Custom Web Development, CRM, ERP & SEO Agency",
  description: "Top-tier Web Development, Custom CRM & ERP solutions, and ROI-driven Digital Marketing (SEO, Google Ads, Facebook Ads) for businesses in the USA, GCC, and India.",
  keywords: ["Website Development", "CRM Development", "ERP Solutions", "SEO Agency", "Google Marketing", "Facebook Marketing", "USA", "GCC", "India", "Software Agency"],
  openGraph: {
    images: ["/new-cover.png"],
    title: "No Code Founder | Custom Web Development & Marketing",
    description: "Scale your business with our Custom Web Development, CRM, ERP, and Digital Marketing services tailored for the USA, GCC, and Indian markets."
  },
  twitter: {
    card: "summary_large_image",
    images: ["/new-cover.png"]
  }
};

import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${outfit.variable} ${playfair.variable} font-sans antialiased text-navy`}>
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
        <noscript>
          <img 
            height="1" 
            width="1" 
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1456342243003290&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
