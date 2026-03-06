"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Zap, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-24 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0D0D1A 0%, #1A0A2E 100%)" }}>
      {/* Top Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-48 rounded-full blur-[100px] opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, #7C3AED, transparent)" }} />
      <div className="absolute top-0 right-1/4 w-64 h-48 rounded-full blur-[80px] opacity-15 pointer-events-none"
        style={{ background: "radial-gradient(circle, #FF6B6B, transparent)" }} />

      {/* Newsletter Section */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Stay in the loop</p>
            <h3 className="text-3xl font-serif font-black italic text-white">Get the best reads, weekly.</h3>
            <p className="text-white/40 text-sm font-medium">New arrivals, exclusive deals, no spam. Ever.</p>
          </div>
          <form className="flex w-full max-w-sm gap-3" onSubmit={(e) => e.preventDefault()}>
            <div className="relative flex-1">
              <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full h-12 pl-10 pr-4 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm font-medium placeholder:text-white/20 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            <button
              className="h-12 px-6 rounded-full text-white text-[11px] font-black uppercase tracking-widest transition-all hover:opacity-90 active:scale-95 shrink-0"
              style={{ background: "linear-gradient(135deg, #7C3AED, #5B21B6)" }}
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="md:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <span className="font-serif text-2xl font-black text-white px-3 py-1.5 rounded-xl"
                style={{ background: "linear-gradient(135deg, #7C3AED, #5B21B6)" }}>
                DB
              </span>
              <div>
                <span className="font-serif text-xl font-black text-white">Delhi <span style={{ color: "#FFD166" }}>Books</span></span>
                <p className="text-[9px] font-black uppercase tracking-widest text-white/30">Since 2024</p>
              </div>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed font-medium max-w-xs">
              Curated physical and digital books for the modern reader. Where great stories meet great design.
            </p>
            <div className="flex gap-3">
              {["𝕏", "▶", "📸", "in"].map((icon) => (
                <button key={icon}
                  className="h-10 w-10 rounded-full border border-white/10 text-white/40 hover:text-white hover:border-white/30 transition-all text-sm font-black flex items-center justify-center">
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Library */}
          <div className="space-y-4">
            <h4 className="font-serif italic font-black text-base text-white">Library</h4>
            <ul className="space-y-3">
              {[["All Books", "/books"], ["Fiction", "/books/category/fiction"], ["Non-Fiction", "/books/category/non-fiction"], ["Digital PDFs", "/books/category/digital"], ["Academic", "/books/category/academic"]].map(([label, path]) => (
                <li key={label}>
                  <Link href={path} className="text-[13px] text-white/40 font-medium hover:text-white transition-colors group flex items-center gap-2">
                    <span className="w-0 h-px bg-primary group-hover:w-3 transition-all duration-300" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div className="space-y-4">
            <h4 className="font-serif italic font-black text-base text-white">Account</h4>
            <ul className="space-y-3">
              {[["Dashboard", "/user/dashboard"], ["My Orders", "/user/dashboard"], ["Downloads", "/user/downloads"], ["Sign In", "/auth/signin"]].map(([label, path]) => (
                <li key={label}>
                  <Link href={path} className="text-[13px] text-white/40 font-medium hover:text-white transition-colors group flex items-center gap-2">
                    <span className="w-0 h-px bg-fire group-hover:w-3 transition-all duration-300" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-serif italic font-black text-base text-white">Company</h4>
            <ul className="space-y-3">
              {[["Support", "/support"], ["Shipping Policy", "/shipping-policy"], ["Privacy Policy", "/privacy-policy"], ["Admin Portal", "/admin/dashboard"]].map(([label, path]) => (
                <li key={label}>
                  <Link href={path} className="text-[13px] text-white/40 font-medium hover:text-white transition-colors group flex items-center gap-2">
                    <span className="w-0 h-px bg-gold group-hover:w-3 transition-all duration-300" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-white/20 font-black uppercase tracking-widest">
            © {currentYear} Delhi Books — Curating Knowledge Across India
          </p>
          <div className="flex gap-1">
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <Link key={item} href={`/${item.toLowerCase()}`}
                className="px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-white/60 transition-colors rounded-full hover:bg-white/5">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
