"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { 
  CheckCircle2, 
  Download, 
  ArrowLeft, 
  Printer, 
  Receipt, 
  ShieldCheck, 
  FileText
} from "lucide-react";

function ThankYouContent() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("payment_id");
  const orderId = searchParams.get("order_id");
  const status = searchParams.get("status");
  const isFree = status === "free";

  const [downloadStarted, setDownloadStarted] = useState(false);
  const [purchaseDate, setPurchaseDate] = useState("");

  useEffect(() => {
    // Set formatted client date
    const now = new Date();
    setPurchaseDate(
      now.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    );

    // Auto-trigger download
    const timer = setTimeout(() => {
      const link = document.createElement("a");
      link.href = "/api/download-pdf";
      link.download = "30-Micro-SaaS-You-Can-Build-Without-Coding.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloadStarted(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const invoiceNumber = orderId 
    ? `NCF-${orderId.replace("order_", "").toUpperCase()}`
    : paymentId 
      ? `NCF-${paymentId.replace("pay_", "").toUpperCase().slice(0, 10)}`
      : "NCF-ONLINE";

  return (
    <div className="min-h-screen bg-[#FFFDF8] py-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-magenta/20 selection:text-magenta text-navy">
      
      {/* Background Glow */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-golden/20 rounded-full blur-[120px] pointer-events-none print:hidden"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#F2CAD5]/30 rounded-full blur-[120px] pointer-events-none print:hidden"></div>

      <div className="max-w-3xl mx-auto relative z-10">
        
        {/* --- Top Success Message & Download Notice --- */}
        <div className="bg-white rounded-3xl border border-black/5 shadow-xl p-8 sm:p-10 mb-8 text-center print:hidden">
          
          <div className="w-16 h-16 bg-[#6A9B68]/15 border border-[#6A9B68]/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <CheckCircle2 className="w-8 h-8 text-[#6A9B68]" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif text-navy font-bold mb-3 tracking-tight">
            Thank you! Your order is confirmed.
          </h1>
          <p className="text-brown text-base sm:text-lg mb-8 max-w-lg mx-auto font-light">
            We appreciate your purchase. Your digital playbook is being delivered to your device.
          </p>

          {/* User Required Notice Box */}
          <div className="bg-[#FFFDF8] border-2 border-[#FADC98] rounded-2xl p-5 sm:p-6 mb-8 text-left shadow-sm">
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-[#FADC98]/40 rounded-xl shrink-0 mt-0.5">
                <Download className="w-5 h-5 text-navy" />
              </div>
              <div className="space-y-1">
                <h2 className="font-semibold text-navy text-base">File Download Status</h2>
                <p className="text-navy/90 text-sm sm:text-base leading-relaxed font-medium">
                  Check your file in the Downloads. If you have not received the file in the Downloads, kindly email us at{" "}
                  <a 
                    href="mailto:help@nocodefounder.site" 
                    className="text-magenta font-bold underline hover:text-navy transition-colors inline-flex items-center gap-1"
                  >
                    help@nocodefounder.site
                  </a>.
                </p>
                {downloadStarted && (
                  <p className="text-xs text-green font-medium pt-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Download triggered automatically to your device
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="/api/download-pdf" 
              download="30-Micro-SaaS-You-Can-Build-Without-Coding.pdf"
              style={{ backgroundColor: "#F2CAD5" }}
              className="w-full sm:w-auto text-black border border-black/10 font-medium py-3.5 px-7 rounded-xl shadow-lg shadow-black/5 transition-all text-base flex items-center justify-center gap-2 hover:-translate-y-0.5 hover:brightness-105 cursor-pointer"
            >
              <Download className="w-4 h-4" /> Download Playbook (PDF)
            </a>
            <button
              onClick={handlePrint}
              className="w-full sm:w-auto bg-cream hover:bg-cream/80 text-navy border border-black/10 font-medium py-3.5 px-6 rounded-xl transition-all text-base flex items-center justify-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" /> Print / Save Invoice
            </button>
          </div>
        </div>

        {/* --- ON-SITE DIGITAL INVOICE & RECEIPT --- */}
        <div id="invoiceCard" className="bg-white rounded-3xl border border-black/10 shadow-xl overflow-hidden mb-8 print:border-none print:shadow-none print:m-0 print:p-0">
          
          {/* Invoice Header */}
          <div className="bg-black text-white p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="font-serif font-bold text-2xl tracking-tight text-white flex items-center gap-2 mb-1">
                NoCode<span className="font-sans font-normal text-xl italic text-white/70">Founder</span>
              </div>
              <p className="text-white/60 text-xs tracking-wider uppercase font-medium">Official Payment Receipt & Tax Invoice</p>
            </div>
            <div className="sm:text-right">
              <span className="inline-flex items-center gap-1.5 bg-[#6A9B68]/20 border border-[#6A9B68]/40 text-[#6A9B68] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5" /> Paid & Confirmed
              </span>
            </div>
          </div>

          {/* Invoice Details Grid */}
          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pb-6 border-b border-black/10 text-sm">
              <div>
                <span className="text-black/50 text-xs uppercase tracking-wider block mb-1">Invoice No.</span>
                <span className="font-mono font-bold text-black">{invoiceNumber}</span>
              </div>
              <div>
                <span className="text-black/50 text-xs uppercase tracking-wider block mb-1">Date & Time</span>
                <span className="font-medium text-black">{purchaseDate || "Today"}</span>
              </div>
              <div>
                <span className="text-black/50 text-xs uppercase tracking-wider block mb-1">Payment Method</span>
                <span className="font-medium text-black">{isFree ? "Promo Code" : "Razorpay"}</span>
              </div>
              <div>
                <span className="text-black/50 text-xs uppercase tracking-wider block mb-1">Payment ID</span>
                <span className="font-mono font-semibold text-black text-xs break-all">
                  {paymentId || (isFree ? "PROMO-100" : "rzp_verified")}
                </span>
              </div>
            </div>

            {orderId && (
              <div className="py-3 border-b border-black/5 text-xs text-black/60 flex items-center justify-between">
                <span>Razorpay Order ID: <strong className="font-mono text-black/80">{orderId}</strong></span>
                <span className="flex items-center gap-1 text-[#6A9B68] font-medium"><ShieldCheck className="w-3.5 h-3.5" /> 256-Bit SSL Encrypted</span>
              </div>
            )}

            {/* Line Items */}
            <div className="pt-6">
              <div className="flex items-center gap-4 pb-4 border-b border-black/10">
                <div className="p-3 bg-[#FADC98]/20 rounded-xl shrink-0 hidden sm:block">
                  <FileText className="w-6 h-6 text-navy" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif font-bold text-lg text-black">
                    30 Micro SaaS You Can Build Without Coding
                  </h3>
                  <p className="text-black/60 text-xs sm:text-sm mt-0.5">
                    Complete Playbook eBook • 55 Pages PDF • Tech Stacks & 4-Week Validation Sprint Blueprint
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-black">
                    {isFree ? "₹ 0.00" : "₹ 99.00"}
                  </span>
                </div>
              </div>

              {/* Price Calculation */}
              <div className="pt-6 space-y-2 max-w-xs ml-auto text-sm">
                <div className="flex justify-between text-black/70">
                  <span>Subtotal:</span>
                  <span>{isFree ? "₹ 0.00" : "₹ 99.00"}</span>
                </div>
                <div className="flex justify-between text-black/70">
                  <span>Tax (Included):</span>
                  <span>₹ 0.00</span>
                </div>
                <div className="flex justify-between font-bold text-base text-black pt-3 border-t border-black/10">
                  <span>Total Amount Paid:</span>
                  <span className="text-lg text-navy">{isFree ? "₹ 0.00" : "₹ 99.00"}</span>
                </div>
              </div>
            </div>

            {/* Invoice Footer Support Contact */}
            <div className="mt-8 pt-6 border-t border-black/10 text-xs text-black/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left bg-cream/50 -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 p-6">
              <div>
                <p className="font-medium text-black">Need assistance with your order or download?</p>
                <p>Email our dedicated support team at <a href="mailto:help@nocodefounder.site" className="text-magenta font-semibold underline">help@nocodefounder.site</a></p>
              </div>
              <p className="text-[11px] text-black/50">
                Issued by No Code Founder • nocodefounder.site
              </p>
            </div>
          </div>
        </div>

        {/* --- Navigation Back --- */}
        <div className="text-center print:hidden">
          <Link 
            href="/" 
            className="inline-flex items-center text-brown hover:text-black font-medium transition-colors text-sm py-2 px-4 rounded-lg hover:bg-black/5"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Return to Homepage
          </Link>
        </div>

      </div>
    </div>
  );
}

export default function ThankYou() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FFFDF8] flex items-center justify-center font-sans text-navy">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-magenta border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-lg font-medium text-brown">Loading your order confirmation...</p>
        </div>
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  );
}
