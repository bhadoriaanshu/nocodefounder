import { notFound } from "next/navigation";
import { blogs } from "../../../data/blogs";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const blog = blogs.find((b) => b.slug === params.slug);
  if (!blog) return {};
  return {
    title: `${blog.title} | No Code Founder Blog`,
    description: blog.excerpt,
  };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const blog = blogs.find((b) => b.slug === params.slug);
  
  if (!blog) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white font-sans text-navy pt-28 pb-16 selection:bg-magenta selection:text-ivory">
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/60 backdrop-blur-xl border-b border-white/40 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-[75px] flex items-center justify-between">
          <Link href="/" className="font-serif font-bold text-2xl tracking-tight text-black flex items-center gap-2">
            NoCode<span className="font-sans font-normal text-xl italic text-black/60">Founder</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/blog" className="text-black/70 hover:text-black font-medium text-sm transition-colors flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
          </div>
        </div>
      </nav>

      <article className="max-w-3xl mx-auto px-6">
        <div className="mb-10 text-center">
          <div className="text-sm font-semibold text-magenta uppercase tracking-wider mb-4">{blog.category}</div>
          <h1 className="text-4xl md:text-5xl font-serif text-black mb-6 leading-tight">{blog.title}</h1>
          <div className="text-black/50 text-sm">{blog.date}</div>
        </div>
        
        <div 
          className="prose prose-lg prose-headings:font-serif prose-headings:text-black prose-p:text-brown/90 max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
        
        <div className="mt-16 pt-8 border-t border-black/10 text-center">
          <h3 className="text-2xl font-serif text-black mb-4">Ready to scale your business?</h3>
          <Link href="/#booking-form" className="inline-block bg-black text-white font-medium py-3 px-8 rounded-full hover:-translate-y-1 transition-transform">
            Book a Free Consultation
          </Link>
        </div>
      </article>
    </div>
  );
}
