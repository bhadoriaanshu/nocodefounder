"use client";

import Link from "next/link";
import { CheckCircle2, ArrowLeft } from "lucide-react";

export default function BookingSuccess() {
  return (
    <div className="min-h-screen bg-[#FFFDF8] flex flex-col items-center justify-center p-6 selection:bg-magenta/20 selection:text-magenta text-navy">
      <div className="bg-white rounded-3xl border border-black/5 shadow-xl p-10 max-w-lg w-full text-center">
        <div className="w-20 h-20 bg-[#6A9B68]/15 border border-[#6A9B68]/30 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
          <CheckCircle2 className="w-10 h-10 text-[#6A9B68]" />
        </div>
        
        <h1 className="text-4xl font-serif text-navy font-bold mb-4 tracking-tight">
          Request Received
        </h1>
        <p className="text-brown text-lg mb-8 font-light">
          Thank you for booking a strategy call. Our team will review your request and get back to you within 24 hours.
        </p>
        
        <Link 
          href="/"
          className="inline-flex items-center text-white bg-black hover:bg-black/80 font-medium transition-colors text-base py-3.5 px-8 rounded-xl shadow-lg hover:-translate-y-0.5"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>
      </div>
    </div>
  );
}
