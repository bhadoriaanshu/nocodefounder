"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { 
  Code2, 
  Database, 
  LineChart, 
  TrendingUp, 
  Megaphone,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ExternalLink
} from "lucide-react";
import Link from "next/link";

// --- ANIMATION VARIANTS ---
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 80, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 80, damping: 20 } }
};

const stagger: Variants = {
  visible: { transition: { staggerChildren: 0.2 } }
};

// --- DATA ---
const services = [
  { icon: <Code2 className="w-8 h-8" />, title: "Website Development", desc: "Fast, responsive, and SEO-optimized websites built to convert visitors into customers.", bgHex: "#FADC98" },
  { icon: <Database className="w-8 h-8" />, title: "Custom CRM Solutions", desc: "Tailored Customer Relationship Management systems to streamline your sales pipeline.", bgHex: "#DDE5EE" },
  { icon: <LineChart className="w-8 h-8" />, title: "ERP Systems", desc: "Enterprise Resource Planning software to manage operations, inventory, and HR efficiently.", bgHex: "#F2CAD5" },
  { icon: <TrendingUp className="w-8 h-8" />, title: "SEO Optimization", desc: "Dominate search rankings in the USA, GCC, and India with our proven GEO AIO strategies.", bgHex: "#DDE8DD" },
  { icon: <Megaphone className="w-8 h-8" />, title: "Google Marketing", desc: "High-ROI Google Ads campaigns that capture high-intent leads instantly.", bgHex: "#FADC98" },
  { icon: <Target className="w-8 h-8" />, title: "Facebook Marketing", desc: "Laser-targeted social media campaigns to build brand awareness and drive sales.", bgHex: "#DDE5EE" },
];

function Target({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
    </svg>
  );
}

export default function Home() {
  const handleScrollToForm = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    const form = document.getElementById("booking-form");
    if (form) {
      form.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-magenta selection:text-ivory">
      
      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/60 backdrop-blur-xl border-b border-white/40 shadow-sm transition-all duration-700 opacity-100 translate-y-0">
        <div className="max-w-6xl mx-auto px-6 h-[75px] flex items-center justify-between">
          <Link href="/" className="font-serif font-bold text-2xl tracking-tight text-black flex items-center gap-2">
            NoCode<span className="font-sans font-normal text-xl italic text-black/60">Founder</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/blog" className="text-black/70 hover:text-black font-medium text-sm transition-colors">Blog</Link>
            <Link href="/faq" className="text-black/70 hover:text-black font-medium text-sm transition-colors">FAQ</Link>
            <button 
              onClick={handleScrollToForm}
              className="bg-white hover:bg-gray-50 text-black border border-black/10 text-sm font-medium py-2.5 px-6 rounded-full transition-all shadow-sm cursor-pointer"
            >
              Book Now
            </button>
          </div>
          <button onClick={handleScrollToForm} className="md:hidden bg-black text-white text-sm font-medium py-2 px-5 rounded-full">
            Book
          </button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 bg-white overflow-hidden border-t border-black/5 flex flex-col justify-center">
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-golden/40 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-ivory/60 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            <motion.div 
              initial="hidden" animate="visible" variants={stagger}
              className="lg:w-1/2 text-center lg:text-left"
            >
              <motion.div variants={fadeUp} className="flex items-center justify-center lg:justify-start gap-3 mb-8 bg-cream/60 border border-golden/20 w-fit mx-auto lg:mx-0 px-5 py-2 rounded-full backdrop-blur-sm shadow-sm">
                <span className="text-brown text-xs font-semibold tracking-wider uppercase">USA • GCC • INDIA</span>
              </motion.div>
              
              <motion.h1 variants={fadeUp} className="text-6xl lg:text-8xl font-serif text-navy tracking-tight mb-8 leading-[1.05]">
                Scale Your Business with <br className="hidden lg:block"/>
                <span className="italic text-magenta">
                  Custom Tech & Marketing.
                </span>
              </motion.h1>
              
              <motion.p variants={fadeUp} className="text-xl lg:text-2xl text-brown mb-12 leading-relaxed max-w-3xl mx-auto lg:mx-0 font-light">
                From high-converting Websites and enterprise-grade CRM/ERP systems to data-driven SEO and Ad campaigns. We engineer growth.
              </motion.p>
              
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-6">
                <button 
                  onClick={handleScrollToForm}
                  style={{ backgroundColor: "#F2CAD5" }}
                  className="w-full sm:w-auto text-black border border-black/10 font-medium text-xl py-5 px-10 rounded-2xl flex items-center justify-center shadow-xl shadow-black/5 transition-all hover:-translate-y-1 hover:brightness-105 cursor-pointer"
                >
                  Book a Free Consultation
                  <ArrowRight className="ml-3 w-6 h-6" />
                </button>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="lg:w-1/2 relative"
            >
              <div className="absolute inset-0 bg-golden/30 blur-3xl rounded-full translate-y-10 translate-x-5 opacity-60"></div>
              
              <div className="relative flex flex-col gap-6">
                
                {/* Card 1 */}
                <motion.div 
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  whileHover={{ scale: 1.05, x: 10 }}
                  className="bg-white p-6 sm:p-8 rounded-[2rem] shadow-xl border border-black/5 flex items-center gap-6 cursor-pointer group w-[90%] md:w-[80%]"
                >
                   <div className="w-16 h-16 shrink-0 rounded-2xl bg-[#FADC98] flex items-center justify-center shadow-inner group-hover:bg-magenta group-hover:text-white transition-colors duration-300">
                     <Code2 className="w-8 h-8 transition-colors"/>
                   </div>
                   <div>
                     <h3 className="font-serif font-bold text-2xl text-navy group-hover:text-magenta transition-colors">Web Development</h3>
                     <p className="text-base text-brown/80 font-medium">Next-gen performance</p>
                   </div>
                </motion.div>

                {/* Card 2 */}
                <motion.div 
                  animate={{ y: [-15, 15, -15] }}
                  transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
                  whileHover={{ scale: 1.05, x: 10 }}
                  className="bg-white p-6 sm:p-8 rounded-[2rem] shadow-xl border border-black/5 flex items-center gap-6 cursor-pointer group self-end w-[90%] md:w-[80%]"
                >
                   <div className="w-16 h-16 shrink-0 rounded-2xl bg-[#DDE5EE] flex items-center justify-center shadow-inner group-hover:bg-magenta group-hover:text-white transition-colors duration-300">
                     <Database className="w-8 h-8 transition-colors"/>
                   </div>
                   <div>
                     <h3 className="font-serif font-bold text-2xl text-navy group-hover:text-magenta transition-colors">Custom CRM/ERP</h3>
                     <p className="text-base text-brown/80 font-medium">Automate your operations</p>
                   </div>
                </motion.div>

                {/* Card 3 */}
                <motion.div 
                  animate={{ y: [-12, 12, -12] }}
                  transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 2 }}
                  whileHover={{ scale: 1.05, x: 10 }}
                  className="bg-white p-6 sm:p-8 rounded-[2rem] shadow-xl border border-black/5 flex items-center gap-6 cursor-pointer group w-[90%] md:w-[80%] ml-4 md:ml-12"
                >
                   <div className="w-16 h-16 shrink-0 rounded-2xl bg-[#F2CAD5] flex items-center justify-center shadow-inner group-hover:bg-magenta group-hover:text-white transition-colors duration-300">
                     <TrendingUp className="w-8 h-8 transition-colors"/>
                   </div>
                   <div>
                     <h3 className="font-serif font-bold text-2xl text-navy group-hover:text-magenta transition-colors">Growth Marketing</h3>
                     <p className="text-base text-brown/80 font-medium">SEO, Google & FB Ads</p>
                   </div>
                </motion.div>

              </div>
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section className="py-16 lg:py-24 relative min-h-screen flex flex-col justify-center bg-white overflow-hidden border-t border-black/5">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="text-5xl md:text-6xl font-serif text-navy mb-8">Our Core Services</h2>
            <p className="text-xl md:text-2xl text-brown font-light leading-relaxed">End-to-end solutions to digitize your operations and scale your revenue globally.</p>
          </div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {services.map((srv, i) => (
              <motion.div 
                key={i}
                variants={fadeUp}
                whileHover={{ scale: 1.02, y: -5 }}
                style={{ backgroundColor: srv.bgHex }}
                className="p-10 lg:p-12 rounded-[2.5rem] shadow-xl flex flex-col cursor-pointer"
              >
                <div className="w-20 h-20 rounded-3xl flex items-center justify-center bg-black/10 text-black backdrop-blur-sm mb-8 shrink-0">
                   <div className="scale-150">
                     {srv.icon}
                   </div>
                </div>
                <h3 className="text-3xl font-serif text-black mb-4 font-normal">{srv.title}</h3>
                <p className="text-black/80 leading-relaxed font-normal text-lg">{srv.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- OUR WORK SECTION --- */}
      <section className="py-16 lg:py-32 relative flex flex-col justify-center bg-cream/30 overflow-hidden border-t border-black/5">
        <div className="max-w-6xl mx-auto px-6 relative z-10 w-full">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-5xl md:text-6xl font-serif text-navy mb-8">Our Work</h2>
            <p className="text-xl md:text-2xl text-brown font-light leading-relaxed">A showcase of high-performance websites and digital platforms we have delivered.</p>
          </div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}
            className="grid md:grid-cols-2 gap-10"
          >
            {[
              { title: "FitnessCrunch", desc: "High-performance fitness tracking and gym management web application.", url: "https://fitnesscrunch.netlify.app/", color: "#F2CAD5" },
              { title: "Durgs", desc: "E-commerce and inventory management solution for the pharmaceutical industry.", url: "https://durgs.netlify.app/", color: "#DDE5EE" },
              { title: "Techalo", desc: "SaaS landing page and software presentation platform for tech startups.", url: "https://techalo.netlify.app/", color: "#FADC98" },
              { title: "ClinicalPlus", desc: "Healthcare portal and patient management CRM for modern clinics.", url: "https://clincalplus.netlify.app/", color: "#DDE8DD" }
            ].map((project, i) => (
              <motion.a 
                key={i}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeUp}
                whileHover={{ scale: 1.02, y: -5 }}
                className="group relative p-10 lg:p-12 rounded-[2.5rem] shadow-xl flex flex-col overflow-hidden bg-white border border-black/5 block"
              >
                <div className="absolute top-0 right-0 w-32 h-32 opacity-20 rounded-bl-[100px] transition-colors duration-500" style={{ backgroundColor: project.color }}></div>
                
                <h3 className="text-4xl font-serif text-black mb-4 font-bold group-hover:text-magenta transition-colors relative z-10">{project.title}</h3>
                <p className="text-black/70 leading-relaxed text-lg mb-10 relative z-10">{project.desc}</p>
                
                <div className="mt-auto inline-flex items-center gap-2 font-medium text-lg text-black group-hover:text-magenta transition-colors relative z-10">
                  View Live Project <ExternalLink className="w-5 h-5" />
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- BOOKING FORM SECTION (NETLIFY FORMS) --- */}
      <section id="booking-form" className="py-16 lg:py-32 relative flex flex-col justify-center bg-white border-t border-black/5">
        <div className="absolute inset-0 bg-black/5 opacity-10"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 w-full">
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="bg-black rounded-[3rem] overflow-hidden shadow-2xl border border-white/10"
          >
            <div className="p-12 lg:p-16">
              <div className="text-center mb-14">
                <h2 className="text-5xl lg:text-6xl font-serif text-white mb-6">Book a Free Strategy Call</h2>
                <p className="text-white/80 font-light text-xl leading-relaxed max-w-2xl mx-auto">Tell us about your project and which services you need. We&apos;ll get back to you within 24 hours.</p>
              </div>

              {/* NETLIFY FORM */}
              <form 
                name="booking" 
                method="POST" 
                data-netlify="true" 
                netlify-honeypot="bot-field"
                action="/thank-you?status=free"
                className="space-y-8"
              >
                <input type="hidden" name="form-name" value="booking" />
                <div className="hidden">
                  <label>Don&apos;t fill this out if you&apos;re human: <input name="bot-field" /></label>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-white/80 text-base font-medium">Full Name *</label>
                    <input required type="text" name="name" className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 text-lg text-white placeholder:text-white/40 focus:outline-none focus:border-white/50" placeholder="John Doe" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-white/80 text-base font-medium">Email Address *</label>
                    <input required type="email" name="email" className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 text-lg text-white placeholder:text-white/40 focus:outline-none focus:border-white/50" placeholder="john@company.com" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-white/80 text-base font-medium">Phone Number</label>
                    <input type="tel" name="phone" className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 text-lg text-white placeholder:text-white/40 focus:outline-none focus:border-white/50" placeholder="+1 (555) 000-0000" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-white/80 text-base font-medium">Company Name</label>
                    <input type="text" name="company" className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 text-lg text-white placeholder:text-white/40 focus:outline-none focus:border-white/50" placeholder="Your Company LLC" />
                  </div>
                </div>

                <div className="space-y-4 pt-6">
                  <label className="text-white/80 text-base font-medium block border-b border-white/10 pb-3">Services Interested In</label>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      "Website Development",
                      "CRM Solution",
                      "ERP System",
                      "SEO Optimization",
                      "Google Marketing",
                      "Facebook Marketing"
                    ].map((service) => (
                      <label key={service} className="flex items-center gap-4 cursor-pointer group">
                        <input type="checkbox" name="services[]" value={service} className="w-6 h-6 rounded-md border-white/20 bg-white/10 text-magenta focus:ring-magenta focus:ring-offset-black accent-magenta cursor-pointer" />
                        <span className="text-white/80 text-lg group-hover:text-white transition-colors">{service}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 pt-6">
                  <label className="text-white/80 text-base font-medium">Additional Comments</label>
                  <textarea name="comments" rows={5} className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 text-lg text-white placeholder:text-white/40 focus:outline-none focus:border-white/50" placeholder="Tell us about your goals..."></textarea>
                </div>

                <div className="pt-10">
                  <button 
                    type="submit"
                    className="bg-white block w-full text-black border border-black/10 font-bold py-5 px-8 rounded-2xl shadow-xl shadow-black/5 transition-all text-2xl hover:-translate-y-1 hover:brightness-105 cursor-pointer"
                  >
                    Submit Request
                  </button>
                  <div className="flex items-center justify-center gap-2 text-white/50 text-base font-medium mt-6">
                    <ShieldCheck className="w-5 h-5 text-green" /> Your information is secure
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-white text-center relative border-t border-black/5 py-12 pb-24 md:pb-12">
        <p className="text-brown/70 font-light text-sm tracking-wide">
          © 2026 No Code Founder. Building Digital Excellence.
        </p>
      </footer>

      {/* --- MOBILE FLOATING BOOK BUTTON --- */}
      <div className="md:hidden fixed bottom-0 inset-x-0 p-4 bg-white/90 backdrop-blur-lg border-t border-black/10 z-[100]">
        <button 
          onClick={handleScrollToForm}
          style={{ backgroundColor: "#F2CAD5" }}
          className="w-full text-black border border-black/10 font-medium py-3.5 px-6 rounded-xl shadow-lg shadow-black/5 transition-all text-lg flex items-center justify-center cursor-pointer"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}
