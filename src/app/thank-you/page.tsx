import { CheckCircle2, Download, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center p-6 font-sans selection:bg-magenta/20 selection:text-magenta">
      
      {/* Background Glow */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple/10 rounded-full blur-[120px] mix-blend-multiply pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-magenta/10 rounded-full blur-[120px] mix-blend-multiply pointer-events-none"></div>

      <div className="bg-cream max-w-2xl w-full p-12 lg:p-16 rounded-[2.5rem] border border-beige/30 shadow-xl text-center relative z-10">
        
        <div className="w-20 h-20 bg-green/10 border border-green/20 rounded-full flex items-center justify-center mx-auto mb-10 shadow-lg shadow-green/10">
          <CheckCircle2 className="w-10 h-10 text-green" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-black">You&apos;re in.</h1>
        <p className="text-gray mb-12 text-xl max-w-md mx-auto font-medium">
          Thank you for your purchase. Your copy of the playbook is ready for download below.
        </p>
        
        <div className="bg-ivory p-8 rounded-3xl mb-12 flex flex-col sm:flex-row items-center gap-8 text-left border border-beige/40 shadow-sm">
           <Image src="/new-cover.png" alt="Cover" width={80} height={100} className="rounded-md shadow-md" />
           <div>
             <h3 className="font-bold text-xl tracking-tight mb-1 text-black">30 Micro SaaS Playbook</h3>
             <p className="text-sm text-gray mb-4 font-medium">PDF Format • 55 Pages</p>
             <a 
                href="/30-Micro-SaaS-You-Can-Build-Without-Coding.pdf" 
                download
                className="inline-flex items-center text-blue font-bold hover:text-navy transition-colors"
              >
                <Download className="w-5 h-5 mr-2" /> Download PDF
              </a>
           </div>
        </div>
        
        <a 
          href="/30-Micro-SaaS-You-Can-Build-Without-Coding.pdf" 
          download
          style={{ backgroundColor: "#F2CAD5" }}
          className="block w-full text-black border border-black/10 font-bold py-5 px-6 rounded-2xl shadow-xl shadow-black/5 transition-all text-xl mb-10 hover:-translate-y-1 hover:brightness-105"
        >
          Download eBook
        </a>

        <Link href="/" className="inline-flex items-center text-gray hover:text-black font-medium transition-colors text-sm">
          <ArrowLeft className="w-4 h-4 mr-2" /> Return to homepage
        </Link>
      </div>
    </div>
  );
}
