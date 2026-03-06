import Link from "next/link";
import BookCard from "@/components/books/BookCard";
import { ArrowRight, BookOpen, Truck, Download, ShieldCheck } from "lucide-react";

export default function HomePage() {
  const featuredBooks = [
    { id: "1", title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 299, isbn: "9780743273565", isDigital: false },
    { id: "2", title: "1984", author: "George Orwell", price: 199, isbn: "9780451524935", isDigital: true },
    { id: "3", title: "Pride and Prejudice", author: "Jane Austen", price: 249, isbn: "9780141439518", isDigital: false },
    { id: "4", title: "To Kill a Mockingbird", author: "Harper Lee", price: 349, isbn: "9780061120084", isDigital: true },
  ];

  const categories = [
    { name: "Fiction", slug: "fiction", color: "bg-[#E3F2FD]" },
    { name: "Non-Fiction", slug: "non-fiction", color: "bg-[#FFF3E0]"},
    { name: "Digital (PDF)", slug: "digital", color: "bg-[#E8F5E9]" },
    { name: "Academic", slug: "academic", color: "bg-[#F3E5F5]" },
  ];

  return (
    <div className="space-y-16 animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] bg-primary rounded-3xl overflow-hidden shadow-2xl group">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent z-10"></div>
        <div className="absolute inset-0 z-0 bg-gray-950 overflow-hidden">
          {/* Subtle animated pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_2px_2px,_#ffffff_1px,_transparent_0)] bg-[length:40px_40px] animate-pulse"></div>
        </div>
        
        <div className="relative z-20 h-full flex flex-col justify-center px-8 md:px-16 space-y-6 max-w-3xl">
          <span className="text-accent font-serif font-black uppercase tracking-[0.3em] text-xs md:text-sm animate-in slide-in-from-left duration-1000">Discover Your Next Favorite Read</span>
          <h1 className="text-4xl md:text-7xl font-serif font-black text-white leading-tight animate-in slide-in-from-left duration-1000 delay-100 italic">
            Delhi Books. <br/><span className="text-white/40 not-italic">Home of Good Reads.</span>
          </h1>
          <p className="text-white/70 text-base md:text-xl font-medium max-w-lg leading-relaxed animate-in slide-in-from-left duration-1000 delay-200">
            Explore thousands of physical hardcovers and instant digital PDF editions. Premium quality for the true book lover.
          </p>
          <div className="flex flex-wrap gap-4 pt-4 animate-in slide-in-from-bottom duration-1000 delay-300">
            <Link href="/books" className="btn-primary py-4 px-10 shadow-xl shadow-primary/30">
              Browse Collection <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/books/category/digital" className="btn-secondary text-white border-white hover:bg-white hover:text-primary py-4 px-10">
              E-Books (PDF) <Download size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-8 border-y border-border px-4">
        {[
          { icon: <BookOpen className="text-primary" />, title: "Wide Library", desc: "Classic & Modern" },
          { icon: <Truck className="text-accent" />, title: "India Shipping", desc: "Reliable & Fast" },
          { icon: <Download className="text-green-600" />, title: "Instant PDF", desc: "Buy and Download" },
          { icon: <ShieldCheck className="text-primary" />, title: "Secure Payment", desc: "Razorpay & PayPal" },
        ].map((f, i) => (
          <div key={i} className="flex items-center gap-4 group">
            <div className="p-4 rounded-2xl bg-white border border-border group-hover:bg-primary group-hover:text-white transition-all duration-300 group-hover:shadow-xl shadow-sm">{f.icon}</div>
            <div>
              <h4 className="font-serif text-sm font-black uppercase tracking-wider">{f.title}</h4>
              <p className="text-xs text-muted-foreground font-medium">{f.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Popular Categories */}
      <section className="space-y-6">
        <div className="flex items-end justify-between border-b-2 border-primary/20 pb-2">
          <h2 className="text-3xl font-serif font-black italic tracking-tight">Popular Collections</h2>
          <Link href="/books" className="text-xs font-black text-primary hover:underline uppercase tracking-[0.2em] flex items-center gap-1 group">
             View All <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {categories.map((cat, i) => (
            <Link 
              key={i} 
              href={`/books/category/${cat.slug}`}
              className={`${cat.color} p-10 rounded-[2rem] border border-transparent hover:border-primary hover:bg-white group transition-all text-center relative overflow-hidden shadow-sm hover:shadow-xl`}
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-150 transition-transform duration-700">
                <BookOpen size={64} className="text-primary" />
              </div>
              <h3 className="font-serif text-xl font-black italic group-hover:scale-110 transition-transform mb-1">{cat.name}</h3>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest opacity-50">Explore Collection</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="space-y-8 py-8">
        <div className="flex items-end justify-between border-b-2 border-primary/20 pb-2">
           <h2 className="text-3xl font-serif font-black italic tracking-tight underline decoration-accent decoration-8 underline-offset-8">Editor's Picks</h2>
           <Link href="/books" className="text-xs font-black text-primary hover:underline uppercase tracking-[0.2em]">Explore All</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredBooks.map((book) => (
            <BookCard key={book.id} {...book} />
          ))}
        </div>
      </section>

      {/* Digital Promo Section */}
      <section className="bg-white p-12 md:p-20 rounded-[3rem] text-center space-y-8 shadow-xl border border-border relative overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-pulse-slow"></div>
        
        <div className="max-w-3xl mx-auto space-y-4 relative z-10">
          <span className="font-serif italic font-black text-primary uppercase tracking-[0.3em] text-[10px]">The Future of Reading</span>
          <h2 className="text-4xl md:text-5xl font-serif font-black italic">Read Anywhere, Instantly.</h2>
          <p className="text-muted-foreground text-lg leading-relaxed font-medium">
            Order digital PDF versions of our bestselling titles and start reading immediately after checkout. Encrypted, high-quality, and ours to keep forever.
          </p>
          <div className="pt-6">
             <Link href="/books/category/digital" className="btn-primary px-16 py-5 text-lg italic shadow-2xl shadow-primary/30">Browse Digital Store</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
