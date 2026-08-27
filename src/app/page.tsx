"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { 
  CheckCircle2, 
  Star, 
  Zap, 
  Target, 
  Clock, 
  ArrowRight,
  ShieldCheck,
  LayoutTemplate
} from "lucide-react";

// --- ANIMATION VARIANTS ---
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 80, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 80, damping: 20 } }
};

const stagger: Variants = {
  visible: { transition: { staggerChildren: 0.2 } }
};

// --- DATA ---
const features = [
  { icon: <Zap className="w-8 h-8" />, title: "30 Actionable Ideas", desc: "No generic fluff. Specific niches, pain points, and target audiences.", bgHex: "#FADC98" }, // Soft Yellow
  { icon: <LayoutTemplate className="w-8 h-8" />, title: "Exact No-Code Stacks", desc: "Airtable, Softr, Make, Stripe—we tell you exactly what tools to connect.", bgHex: "#DDE5EE" }, // Light Blue
  { icon: <Target className="w-8 h-8" />, title: "Pricing Strategies", desc: "Know exactly what to charge and how to position your SaaS.", bgHex: "#F2CAD5" }, // Light Magenta
  { icon: <Clock className="w-8 h-8" />, title: "4-Week Sprint", desc: "A day-by-day blueprint to get your first paying customer in 30 days.", bgHex: "#DDE8DD" }, // Light Green
];

const sneakPeek = [
  {
    title: "The Solo Consultant Portal",
    audience: "Freelancers",
    stack: "Softr + Airtable",
    price: "$29/mo",
    desc: "A branded portal replacing endless email threads with secure file sharing and status timelines.",
    bgHex: "#DDE5EE" // Light Blue
  },
  {
    title: "Automated Client Reporting",
    audience: "Marketing Agencies",
    stack: "Retool + Make",
    price: "$99/mo",
    desc: "Automatically pull data from ad platforms, format it into a branded PDF, and email it weekly.",
    bgHex: "#FADC98" // Soft Yellow
  },
  {
    title: "Review Alert Dashboard",
    audience: "Local Businesses",
    stack: "Glide + Zapier",
    price: "$49/loc",
    desc: "Aggregate reviews from Google and Yelp. Send SMS alerts instantly for any rating under 4 stars.",
    bgHex: "#F2CAD5" // Light Magenta
  }
];

export default function Home() {
  const loadRazorpay = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (typeof window !== "undefined" && (window as any).Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleCheckout = async (btnId: string) => {
    try {
      const btn = document.getElementById(btnId) as HTMLButtonElement | HTMLAnchorElement;
      if (!btn) return;
      
      const originalText = btn.innerText;
      btn.innerText = "Processing...";
      if ('disabled' in btn) btn.disabled = true;
      
      const couponEl = document.getElementById("couponCode") as HTMLInputElement;
      const coupon = couponEl ? couponEl.value.trim().toLowerCase() : "";
      
      // 1. Create order
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 99, coupon })
      });
      const data = await res.json();
      
      if (data.isFree && data.downloadUrl) {
         window.location.href = data.downloadUrl;
         return;
      }

      if (!data.success) {
         alert('Failed to create order: ' + (data.error || 'Unknown error'));
         btn.innerText = originalText;
         if ('disabled' in btn) btn.disabled = false;
         return;
      }

      // Ensure Razorpay SDK is loaded
      const isLoaded = await loadRazorpay();
      if (!isLoaded) {
        alert('Could not load payment gateway. Please check your internet connection.');
        btn.innerText = originalText;
        if ('disabled' in btn) btn.disabled = false;
        return;
      }

      // 2. Open Razorpay Widget
      const options = {
        key: "rzp_live_TUpX0sFML2vjqy",
        amount: data.amount,
        currency: data.currency || "INR",
        name: "No Code Founder",
        description: "30 Micro SaaS Playbook",
        order_id: data.orderId,
        handler: async function (response: any) {
          btn.innerText = "Verifying...";
          const verifyRes = await fetch('/api/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            })
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            window.location.href = verifyData.downloadUrl;
          } else {
            alert("Payment verification failed: " + (verifyData.error || 'Please contact support'));
            btn.innerText = originalText;
            if ('disabled' in btn) btn.disabled = false;
          }
        },
        theme: { color: "#121C30" }
      };
      const rzp = new (window as any).Razorpay(options);
      rzp.open();
      
      rzp.on('payment.failed', function (resp: any) {
         alert("Payment failed: " + (resp.error?.description || "Cancelled"));
         btn.innerText = originalText;
         if ('disabled' in btn) btn.disabled = false;
      });
    } catch (err: any) {
      console.error(err);
      alert("An error occurred: " + (err?.message || err));
      const btn = document.getElementById(btnId) as HTMLButtonElement | HTMLAnchorElement;
      if (btn) {
        btn.innerText = "Buy Now";
        if ('disabled' in btn) btn.disabled = false;
      }
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-magenta selection:text-ivory">
      
      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/60 backdrop-blur-xl border-b border-white/40 shadow-sm transition-all duration-700 opacity-100 translate-y-0">
        <div className="max-w-6xl mx-auto px-6 h-[75px] flex items-center justify-between">
          <div className="font-serif font-bold text-2xl tracking-tight text-black flex items-center gap-2">
            NoCode<span className="font-sans font-normal text-xl italic text-black/60">Founder</span>
          </div>
          <button 
            id="navBuyBtn"
            onClick={() => handleCheckout("navBuyBtn")}
            className="bg-white hover:bg-gray-50 text-black border border-black/10 text-sm font-medium py-2.5 px-6 rounded-full transition-all shadow-sm cursor-pointer"
          >
            Get Playbook
          </button>
        </div>
      </nav>

      {/* --- HERO SECTION --- (White Background) */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-white overflow-hidden border-t border-black/5 shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
        {/* Soft decorative color washes */}
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-golden/40 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-ivory/60 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            <motion.div 
              initial="hidden" animate="visible" variants={stagger}
              className="lg:w-1/2 text-center lg:text-left"
            >
              <motion.div variants={fadeUp} className="flex items-center justify-center lg:justify-start gap-3 mb-8 bg-cream/60 border border-golden/20 w-fit mx-auto lg:mx-0 px-5 py-2 rounded-full backdrop-blur-sm shadow-sm">
                <div className="flex" style={{ color: "#FBD54B" }}>
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <span className="text-brown text-xs font-semibold tracking-wider uppercase">Trusted by 2,500+ Founders</span>
              </motion.div>
              
              <motion.h1 variants={fadeUp} className="text-5xl lg:text-7xl font-serif text-navy tracking-tight mb-6 leading-[1.05]">
                Launch a Micro SaaS <br className="hidden lg:block"/>
                <span className="italic text-magenta">
                  Without Coding.
                </span>
              </motion.h1>
              
              <motion.p variants={fadeUp} className="text-lg lg:text-xl text-brown mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light">
                Stop overthinking your ideas. Get 30 actionable Micro SaaS blueprints, the exact no-code stacks to build them, and a 4-week sprint to your first paying customer.
              </motion.p>
              
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-6">
                <button 
                  id="heroBuyBtn"
                  onClick={() => handleCheckout("heroBuyBtn")}
                  style={{ backgroundColor: "#F2CAD5" }}
                  className="w-full sm:w-auto text-black border border-black/10 font-medium text-lg py-4 px-8 rounded-2xl flex items-center justify-center shadow-xl shadow-black/5 transition-all hover:-translate-y-1 hover:brightness-105 cursor-pointer"
                >
                  Get the Playbook - ₹ 99
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
                <p className="text-brown text-sm font-medium flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-green" /> 100% Risk-Free
                </p>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="lg:w-1/2 relative"
            >
              <div className="absolute inset-0 bg-golden/30 blur-3xl rounded-full translate-y-10 translate-x-5 opacity-60"></div>
              <motion.div 
                animate={{ y: [-15, 15, -15] }}
                transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                className="relative"
              >
                <Image 
                  src="/new-cover.png" 
                  alt="Book Cover" 
                  width={500} height={700} 
                  className="mx-auto rounded-xl shadow-2xl"
                  priority
                />
              </motion.div>
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* --- SOCIAL PROOF LOGOS (Centered) --- */}
      <section className="py-16 bg-white relative border-y border-black/5 flex flex-col items-center justify-center text-center">
        <div className="max-w-6xl mx-auto px-6 w-full flex flex-col items-center justify-center">
          <p className="text-xs font-semibold text-brown uppercase tracking-widest mb-8 text-center">
            Build using industry-leading No-Code tools
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 w-full">
             {["Airtable", "Make", "Softr", "Stripe", "Webflow"].map((logo) => (
                <span key={logo} className="text-2xl md:text-3xl font-serif text-navy/80 hover:text-navy transition-all duration-300">
                  {logo}
                </span>
             ))}
          </div>
        </div>
      </section>

      {/* --- THE AGITATION --- */}
      <section className="py-24 min-h-screen flex flex-col justify-center bg-white  z-30 border-t border-black/5 shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
        <div className="absolute inset-0 bg-black/5 opacity-50"></div>
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-serif text-navy mb-6 tracking-tight">
              You don&apos;t need another list of random ideas.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-xl text-brown mb-16 leading-relaxed font-light max-w-3xl mx-auto">
              99% of &quot;SaaS Idea&quot; lists fail because they just give you a generic title. They don&apos;t tell you <strong className="text-navy font-medium border-b border-navy/50 pb-1">how to build it</strong>, <strong className="text-navy font-medium border-b border-navy/50 pb-1">who to sell it to</strong>, or <strong className="text-navy font-medium border-b border-navy/50 pb-1">what to charge</strong>.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 text-left">
            {[
              { q: "I can't code.", a: "We give you the exact no-code stack to use (e.g., Airtable + Softr).", bgHex: "#FADC98" },
              { q: "I don't know what to build.", a: "We provide 30 specific ideas targeting validated pain points.", bgHex: "#F2CAD5" }, // Light Magenta
              { q: "I don't want to waste months.", a: "We outline a strict 4-week validation sprint to get your first customer.", bgHex: "#DDE8DD" } // Light Green
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ y: 30, scale: 0.95 }}
                whileInView={{ y: 0, scale: 1 }}
                whileHover={{ scale: 1.03, y: -8, rotate: i % 2 === 0 ? 1 : -1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: i * 0.1 }}
                style={{ backgroundColor: item.bgHex }}
                className="p-8 rounded-[2rem] shadow-xl border border-white/40 cursor-pointer"
              >
                <div className="w-10 h-10 bg-black/10 text-black rounded-full flex items-center justify-center font-normal mb-6 text-lg">✕</div>
                <h3 className="text-2xl font-serif text-black mb-3 font-normal">&quot;{item.q}&quot;</h3>
                <p className="text-black/80 text-base leading-relaxed font-normal">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- WHAT'S INSIDE --- */}
      <section className="py-24 min-h-screen flex flex-col justify-center bg-white overflow-hidden  z-40 border-t border-black/5 shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-serif text-navy mb-6">Everything you need to launch.</h2>
            <p className="text-lg text-brown font-light">The playbook is designed for execution. No fluff, just actionable blueprints.</p>
          </div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}
            className="grid md:grid-cols-2 gap-8"
          >
            {features.map((feat, i) => (
              <motion.div 
                key={i}
                variants={fadeUp}
                whileHover={{ scale: 1.02, y: -5, rotate: i % 2 === 0 ? -1 : 1 }}
                style={{ backgroundColor: feat.bgHex }}
                className="p-10 rounded-[2rem] shadow-xl flex flex-col sm:flex-row gap-8 cursor-pointer"
              >
                <div className="shrink-0">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-black/10 text-black backdrop-blur-sm">
                    {feat.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-serif text-black mb-3 font-normal">{feat.title}</h3>
                  <p className="text-black/80 leading-relaxed font-normal">{feat.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- SNEAK PEEK --- */}
      <section className="py-24 min-h-screen flex flex-col justify-center bg-white  z-50 border-t border-black/5 shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-serif text-navy mb-6">A peek inside the playbook.</h2>
            <p className="text-lg text-brown font-light">Here are 3 of the 30 ideas you&apos;ll find inside.</p>
          </div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid md:grid-cols-3 gap-8"
          >
            {sneakPeek.map((item, i) => (
              <motion.div 
                key={i}
                variants={fadeUp}
                whileHover={{ scale: 1.03, y: -8, rotate: i === 1 ? -1 : 1 }}
                style={{ backgroundColor: item.bgHex }}
                className="rounded-[2rem] p-10 relative shadow-xl border border-white/40 cursor-pointer"
              >
                <div className="text-black text-xs font-normal uppercase tracking-wider mb-6 bg-black/10 w-fit px-4 py-1.5 rounded-full">
                  {item.audience}
                </div>
                <h3 className="text-3xl font-serif text-black mb-4 leading-tight font-normal">{item.title}</h3>
                <p className="text-black/80 text-base mb-8 leading-relaxed font-normal">
                  {item.desc}
                </p>
                <div className="space-y-4 pt-6 border-t border-black/10">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-black/70 font-normal">Stack:</span>
                    <span className="font-normal text-black bg-black/5 px-3 py-1 rounded-md">{item.stack}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-black/70 font-normal">Target Price:</span>
                    <span className="font-normal text-black bg-black/5 px-3 py-1 rounded-md">{item.price}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- PRICING SECTION --- */}
      <section id="pricing" className="py-32 min-h-screen flex flex-col justify-center bg-white  z-60 border-t border-black/5 shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
        <div className="absolute inset-0 bg-black/5 opacity-10"></div>
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ y: 30, scale: 0.95 }}
            whileInView={{ y: 0, scale: 1 }}
            whileHover={{ scale: 1.01, y: -5 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="bg-black rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 cursor-pointer"
          >
            <div className="grid md:grid-cols-5">
              <div className="md:col-span-3 p-12 lg:p-16">
                <h2 className="text-4xl font-serif text-white mb-4">Get the Complete Playbook</h2>
                <p className="text-white/70 mb-10 font-light text-lg">Instant lifetime access to the PDF. Updates included forever.</p>
                
                <ul className="space-y-5 mb-10">
                  {[
                    "55-Page High-Quality PDF eBook",
                    "30 Actionable Micro SaaS Blueprints",
                    "Exact No-Code Tool Stacks",
                    "4-Week Validation Sprint Guide",
                    "Pricing & Distribution Strategies"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center text-white font-normal text-lg">
                      <CheckCircle2 className="w-6 h-6 text-green mr-4 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Checkout Side */}
              <div className="md:col-span-2 bg-white/5 p-12 lg:p-16 text-white flex flex-col justify-center items-center text-center relative border-t md:border-t-0 md:border-l border-white/10">
                <div className="relative z-10 w-full flex flex-col gap-4">
                  <div>
                    <div className="text-white/50 line-through text-xl font-medium mb-2">₹ 499</div>
                    <div className="text-6xl font-serif text-white">₹ 99</div>
                  </div>
                  
                  <input 
                    type="text" 
                    placeholder="Coupon Code" 
                    id="couponCode"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-white/50 text-center uppercase"
                  />
                  
                  <button 
                    onClick={async () => {
                      try {
                        const btn = document.getElementById("buyBtn") as HTMLButtonElement;
                        btn.innerText = "Processing...";
                        btn.disabled = true;
                        
                        const coupon = (document.getElementById("couponCode") as HTMLInputElement).value.toLowerCase();
                        
                        // 1. Create order
                        const res = await fetch('/api/order', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ amount: 99, coupon })
                        });
                        const data = await res.json();
                        
                        if (data.isFree && data.downloadUrl) {
                           window.location.href = data.downloadUrl;
                           return;
                        }

                        if (!data.success) {
                           alert('Failed to create order');
                           btn.innerText = "Buy Now";
                           btn.disabled = false;
                           return;
                        }

                        // 2. Open Razorpay Widget
                        const options = {
                          key: "rzp_live_TUpX0sFML2vjqy",
                          amount: data.amount,
                          currency: data.currency,
                          name: "No Code Founder",
                          description: "30 Micro SaaS Playbook",
                          order_id: data.orderId,
                          handler: async function (response: any) {
                            btn.innerText = "Verifying...";
                            const verifyRes = await fetch('/api/verify', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                              })
                            });
                            const verifyData = await verifyRes.json();
                            if (verifyData.success) {
                              window.location.href = verifyData.downloadUrl;
                            } else {
                              alert("Payment verification failed");
                              btn.innerText = "Buy Now";
                              btn.disabled = false;
                            }
                          },
                          theme: { color: "#F2CAD5" }
                        };
                        const rzp = new (window as any).Razorpay(options);
                        rzp.open();
                        
                        rzp.on('payment.failed', function () {
                           btn.innerText = "Buy Now";
                           btn.disabled = false;
                        });
                      } catch (err) {
                        console.error(err);
                        alert("An error occurred");
                        const btn = document.getElementById("buyBtn") as HTMLButtonElement;
                        btn.innerText = "Buy Now";
                        btn.disabled = false;
                      }
                    }}
                    id="buyBtn"
                    className="bg-white block w-full text-black border border-black/10 font-bold py-4 px-6 rounded-2xl shadow-xl shadow-black/5 transition-all text-xl mt-2 hover:-translate-y-1 hover:brightness-105 disabled:opacity-70 disabled:hover:translate-y-0 cursor-pointer"
                  >
                    Buy Now
                  </button>
                  <div className="flex items-center justify-center gap-2 text-white/50 text-sm font-medium mt-2">
                    <ShieldCheck className="w-4 h-4 text-green" /> Secure SSL Checkout
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-white text-center relative z-70 border-t border-black/5 py-12 pb-24 md:pb-12">
        <p className="text-brown/70 font-light text-sm tracking-wide">
          © {new Date().getFullYear()} No Code Founder. Build something beautiful.
        </p>
      </footer>

      {/* --- MOBILE FLOATING BUY BUTTON --- */}
      <div className="md:hidden fixed bottom-0 inset-x-0 p-4 bg-white/90 backdrop-blur-lg border-t border-black/10 z-[100]">
        <button 
          id="mobileBuyBtn"
          onClick={() => handleCheckout("mobileBuyBtn")}
          style={{ backgroundColor: "#F2CAD5" }}
          className="w-full text-black border border-black/10 font-medium py-3.5 px-6 rounded-xl shadow-lg shadow-black/5 transition-all text-lg flex items-center justify-center cursor-pointer"
        >
          Buy Now - ₹ 99
        </button>
      </div>
    </div>
  );
}
