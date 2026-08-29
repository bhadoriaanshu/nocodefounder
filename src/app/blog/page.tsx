import Link from "next/link";
import { blogs } from "../../data/blogs";
import { ArrowRight, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Blog | No Code Founder - Web Development & Marketing Insights",
  description: "Read the latest insights on Website Development, CRM/ERP integration, and ROI-driven Digital Marketing strategies."
};

export default function BlogIndex() {
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

      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-5xl font-serif text-navy mb-6">Our Blog</h1>
          <p className="text-lg text-brown font-light">Actionable insights on technology, marketing, and scaling your business.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {blogs.map((blog) => (
            <Link href={`/blog/${blog.slug}`} key={blog.slug} className="group flex flex-col bg-cream/30 border border-black/5 rounded-[2rem] p-8 hover:bg-cream/60 transition-colors shadow-sm hover:shadow-md">
              <div className="text-xs font-semibold text-magenta uppercase tracking-wider mb-4">{blog.category}</div>
              <h2 className="text-2xl font-serif text-black mb-3 group-hover:text-magenta transition-colors">{blog.title}</h2>
              <p className="text-brown/80 mb-6 leading-relaxed line-clamp-3">{blog.excerpt}</p>
              <div className="mt-auto flex items-center justify-between text-sm">
                <span className="text-black/50">{blog.date}</span>
                <span className="text-navy font-medium flex items-center gap-1 group-hover:gap-2 transition-all">Read More <ArrowRight className="w-4 h-4" /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
