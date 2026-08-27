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
  title: "No Code Founder | Launch a Micro SaaS Without Coding",
  description: "Stop overthinking your ideas. Get 30 actionable Micro SaaS blueprints, the exact no-code stacks to build them, and a 4-week sprint to your first paying customer.",
  openGraph: {
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
        {children}
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
