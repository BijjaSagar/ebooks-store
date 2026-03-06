import Link from "next/link";
import BookCard from "@/components/books/BookCard";
import { ArrowRight, BookOpen, Truck, Download, ShieldCheck, Sparkles, Zap, Star } from "lucide-react";

export default function HomePage() {
  const featuredBooks = [
    { id: "1", title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 299, isbn: "9780743273565", isDigital: false },
    { id: "2", title: "1984", author: "George Orwell", price: 199, isbn: "9780451524935", isDigital: true },
    { id: "3", title: "Pride and Prejudice", author: "Jane Austen", price: 249, isbn: "9780141439518", isDigital: false },
    { id: "4", title: "To Kill a Mockingbird", author: "Harper Lee", price: 349, isbn: "9780061120084", isDigital: true },
  ];

  const categories = [
    { name: "Fiction", slug: "fiction", emoji: "📖", description: "42 Titles", color: "from-violet-500/10 to-purple-500/10", border: "hover:border-violet-400" },
    { name: "Non-Fiction", slug: "non-fiction", emoji: "💡", description: "28 Titles", color: "from-amber-400/10 to-orange-400/10", border: "hover:border-amber-400" },
    { name: "Digital PDF", slug: "digital", emoji: "⚡", description: "115 Titles", color: "from-emerald-400/10 to-green-400/10", border: "hover:border-emerald-400" },
    { name: "Academic", slug: "academic", emoji: "🎓", description: "12 Titles", color: "from-rose-400/10 to-pink-400/10", border: "hover:border-rose-400" },
  ];

  return (
    <div className="space-y-24">

      {/* ══════════════ HERO ══════════════ */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden" style={{ background: "linear-gradient(135deg, #0D0D1A 0%, #1A0A2E 50%, #0D0D1A 100%)" }}>
        {/* Background Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] opacity-30 animate-pulse" style={{ background: "radial-gradient(circle, #7C3AED, transparent)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-[120px] opacity-20 animate-pulse" style={{ background: "radial-gradient(circle, #FF6B6B, transparent)", animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px] opacity-15" style={{ background: "radial-gradient(circle, #FFD166, transparent)" }} />

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          {/* Left Content */}
          <div className="space-y-8 animate-in fade-in slide-in-from-left duration-1000">
            <div className="flex items-center gap-2">
              <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-ink"
                style={{ background: "linear-gradient(135deg, #FFD166, #FF6B6B)" }}>
                ✦ New Collection 2025
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-black italic text-white leading-[0.95] tracking-tight">
              Books That{" "}
              <span className="relative inline-block">
                <span style={{ background: "linear-gradient(135deg, #7C3AED, #FF6B6B)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Change
                </span>
              </span>
              {" "}You.
            </h1>

            <p className="text-white/60 text-lg leading-relaxed max-w-md font-medium">
              Curated hardcovers and instant digital editions. From classics to contemporary — your next obsession is one page away.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/books" className="btn-primary text-base px-10 py-4 group">
                Explore Collection
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/books/category/digital" className="btn-ghost-light text-base px-10 py-4">
                Digital Store ⚡
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-4 border-t border-white/10">
              {[["10K+", "Books"], ["50K+", "Readers"], ["4.9★", "Rating"]].map(([num, label]) => (
                <div key={label}>
                  <p className="text-2xl font-black text-white font-serif italic">{num}</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/40">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Floating Book Mosaic */}
          <div className="relative hidden lg:flex items-center justify-center h-[500px] animate-in fade-in slide-in-from-right duration-1000 delay-200">
            {/* Floating book covers */}
            {[
              { top: "5%", left: "20%", rotate: "-8deg", delay: "0s", size: "w-32 h-44" },
              { top: "10%", left: "55%", rotate: "6deg", delay: "0.2s", size: "w-40 h-56" },
              { top: "42%", left: "5%", rotate: "4deg", delay: "0.4s", size: "w-28 h-40" },
              { top: "38%", left: "38%", rotate: "-5deg", delay: "0.1s", size: "w-44 h-60" },
              { top: "62%", left: "62%", rotate: "8deg", delay: "0.3s", size: "w-32 h-44" },
            ].map((pos, i) => (
              <div key={i}
                className={`absolute ${pos.size} rounded-2xl overflow-hidden shadow-2xl`}
                style={{
                  top: pos.top, left: pos.left,
                  transform: `rotate(${pos.rotate})`,
                  animation: `float 4s ease-in-out infinite`,
                  animationDelay: pos.delay,
                  background: `linear-gradient(135deg, hsl(${260 + i * 30}, 70%, 35%), hsl(${260 + i * 30}, 60%, 20%))`,
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <div className="w-full h-full flex items-end p-3">
                  <span className="text-white/80 text-[8px] font-black uppercase tracking-widest leading-tight">
                    {["The Void", "Neon Dreams", "Starfall", "Echoes", "Unknown"][i]}
                  </span>
                </div>
              </div>
            ))}
            {/* Center glow */}
            <div className="absolute inset-0 rounded-full blur-3xl opacity-30 pointer-events-none"
              style={{ background: "radial-gradient(circle, #7C3AED 0%, transparent 70%)" }} />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
          <span className="text-[9px] font-black uppercase tracking-[0.4em]">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
        </div>
      </section>

      {/* ══════════════ FEATURES BAR ══════════════ */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: <BookOpen size={22} />, title: "Wide Library", desc: "Classic & Modern", color: "text-primary", bg: "bg-primary/10" },
            { icon: <Truck size={22} />, title: "Pan-India Shipping", desc: "Free over ₹999", color: "text-fire", bg: "bg-fire/10" },
            { icon: <Zap size={22} />, title: "Instant PDF", desc: "Buy & Download", color: "text-emerald", bg: "bg-emerald/10" },
            { icon: <ShieldCheck size={22} />, title: "Secure Pay", desc: "Razorpay & PayPal", color: "text-gold", bg: "bg-gold/10" },
          ].map((f, i) => (
            <div key={i}
              className="flex items-center gap-4 p-5 rounded-2xl border border-border bg-white hover:shadow-lg hover:border-primary/20 transition-all duration-300 group cursor-default">
              <div className={`p-3 rounded-xl ${f.bg} ${f.color} group-hover:scale-110 transition-transform duration-300`}>
                {f.icon}
              </div>
              <div>
                <h4 className="font-black text-sm text-ink">{f.title}</h4>
                <p className="text-[11px] font-medium text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════ CATEGORIES ══════════════ */}
      <section className="max-w-7xl mx-auto px-6 space-y-8">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-2">Browse by Genre</p>
            <h2 className="text-4xl md:text-5xl font-serif font-black italic text-ink">Popular Collections</h2>
          </div>
          <Link href="/books" className="hidden sm:flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors group">
            View All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <Link
              key={i}
              href={`/books/category/${cat.slug}`}
              className={`relative p-8 rounded-3xl border border-border bg-gradient-to-br ${cat.color} ${cat.border} hover:shadow-xl transition-all duration-500 group overflow-hidden text-center`}
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{cat.emoji}</div>
              <h3 className="font-serif font-black italic text-xl text-ink">{cat.name}</h3>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-1">{cat.description}</p>
              <ArrowRight size={14} className="absolute bottom-4 right-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════════ FEATURED BOOKS ══════════════ */}
      <section className="max-w-7xl mx-auto px-6 space-y-8">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-fire mb-2 flex items-center gap-2">
              <Star size={10} fill="currentColor" /> Editor&apos;s Pick
            </p>
            <h2 className="text-4xl md:text-5xl font-serif font-black italic text-ink">Trending Now</h2>
          </div>
          <Link href="/books" className="hidden sm:flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors group">
            Explore All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBooks.map((book) => (
            <BookCard key={book.id} {...book} />
          ))}
        </div>
      </section>

      {/* ══════════════ DIGITAL PROMO ══════════════ */}
      <section className="max-w-7xl mx-auto px-6">
        <div
          className="relative rounded-[3rem] overflow-hidden p-12 md:p-20 text-center"
          style={{ background: "linear-gradient(135deg, #0D0D1A 0%, #1A0A2E 100%)" }}
        >
          {/* Orbs */}
          <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full blur-[80px] opacity-40"
            style={{ background: "radial-gradient(circle, #7C3AED, transparent)" }} />
          <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full blur-[80px] opacity-30"
            style={{ background: "radial-gradient(circle, #FF6B6B, transparent)" }} />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-ink mb-2"
              style={{ background: "linear-gradient(135deg, #06EF8F, #FFD166)" }}>
              ⚡ Instant Access
            </span>
            <h2 className="text-4xl md:text-6xl font-serif font-black italic text-white leading-tight">
              Read Anywhere,{" "}
              <span style={{ background: "linear-gradient(135deg, #7C3AED, #FF6B6B)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Instantly.
              </span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed font-medium max-w-xl mx-auto">
              Buy digital PDF editions and start reading within seconds. No shipping. No waiting. Pure knowledge at your fingertips.
            </p>
            <div className="pt-4">
              <Link href="/books/category/digital" className="btn-primary px-14 py-5 text-base group">
                <Sparkles size={18} /> Browse Digital Store
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            {/* Floating tags */}
            <div className="flex flex-wrap gap-3 justify-center pt-4 opacity-60">
              {["PDF Format", "Instant Download", "Any Device", "Secure & Encrypted"].map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/60">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Float animation for book mosaic */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(var(--rotate, 0deg)); }
          50% { transform: translateY(-12px) rotate(var(--rotate, 0deg)); }
        }
      `}</style>
    </div>
  );
}
