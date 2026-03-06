"use client";

import Link from "next/link";
import { Search, ShoppingCart, User, Menu, X, Loader2, Sparkles } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { debounce } from "lodash";
import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { cartCount } = useCart();
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fetchResults = useRef(
    debounce(async (query: string) => {
      if (!query || query.length < 2) { setResults([]); return; }
      setLoading(true);
      try {
        const res = await axios.get(`/api/search?q=${query}`);
        setResults(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 300)
  ).current;

  useEffect(() => { fetchResults(searchQuery); }, [searchQuery]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowDropdown(false);
      router.push(`/books?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-canvas/90 backdrop-blur-xl shadow-lg shadow-ink/5 border-b border-border"
          : "bg-canvas border-b border-border/50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="relative">
            <span
              className="font-serif text-xl font-black text-white px-3 py-1 rounded-xl"
              style={{ background: "linear-gradient(135deg,#7C3AED,#5B21B6)" }}
            >
              DB
            </span>
            <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-gold rounded-full border-2 border-canvas animate-pulse"></span>
          </div>
          <span className="font-serif text-lg tracking-tight font-black hidden sm:block text-ink">
            Delhi <span className="text-primary">Books</span>
          </span>
        </Link>

        {/* Nav Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1">
          {["Books", "New Arrivals", "Digital", "Deals"].map((item) => (
            <Link
              key={item}
              href={item === "Books" ? "/books" : item === "Digital" ? "/books/category/digital" : "/books"}
              className="px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-widest text-muted-foreground hover:text-ink hover:bg-muted transition-all"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-sm relative" ref={dropdownRef}>
          <form onSubmit={handleSearchSubmit} className="w-full">
            <div className="relative">
              <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search books, authors..."
                className="w-full h-10 pl-10 pr-4 bg-muted border border-border rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all placeholder:text-muted-foreground"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setShowDropdown(true); }}
                onFocus={() => setShowDropdown(true)}
              />
              {loading && <Loader2 size={14} className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-primary" />}
            </div>
          </form>

          {showDropdown && searchQuery.length > 1 && (
            <div className="absolute top-12 left-0 right-0 bg-white border border-border rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
              {!loading && results.length === 0 && searchQuery.length > 2 && (
                <div className="p-6 text-center text-muted-foreground text-xs font-medium italic">No books found.</div>
              )}
              {results.map((book) => (
                <Link
                  key={book.id}
                  href={`/books/detail/${book.id}`}
                  onClick={() => setShowDropdown(false)}
                  className="flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors border-b border-border last:border-none group"
                >
                  <div className="h-12 w-9 bg-muted rounded-lg overflow-hidden shrink-0">
                    {book.imageUrl ? <img src={book.imageUrl} className="w-full h-full object-cover" alt={book.title} /> : null}
                  </div>
                  <div className="flex-grow overflow-hidden">
                    <p className="font-black text-sm text-ink group-hover:text-primary truncate transition-colors">{book.title}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{book.author}</p>
                  </div>
                  <span className="text-sm font-black text-primary shrink-0">₹{book.pricePhysical || book.priceDigital}</span>
                </Link>
              ))}
              {results.length > 0 && (
                <Link href={`/books?q=${searchQuery}`} onClick={() => setShowDropdown(false)}
                  className="block py-3 text-center text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/5 transition-colors">
                  View All Results →
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-3">
          <Link
            href={session ? "/user/dashboard" : "/auth/signin"}
            className="hidden sm:flex flex-col items-center gap-0.5 text-muted-foreground hover:text-primary transition-colors group"
          >
            <User size={20} />
            <span className="text-[9px] font-black uppercase tracking-widest">{session ? "Account" : "Sign In"}</span>
          </Link>

          <Link href="/cart" className="relative flex flex-col items-center gap-0.5 text-muted-foreground hover:text-primary transition-colors">
            <ShoppingCart size={20} />
            <span className="text-[9px] font-black uppercase tracking-widest hidden sm:block">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 h-5 w-5 rounded-full text-[9px] font-black text-ink flex items-center justify-center shadow-lg"
                style={{ background: "linear-gradient(135deg,#FFD166,#FF6B6B)" }}>
                {cartCount}
              </span>
            )}
          </Link>

          <button
            className="lg:hidden p-2 rounded-full hover:bg-muted transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-border bg-canvas/95 backdrop-blur-xl px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4">
          <form onSubmit={handleSearchSubmit}>
            <div className="relative">
              <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search books..."
                className="w-full h-11 pl-10 pr-4 bg-muted border border-border rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </form>
          <nav className="flex flex-col gap-1">
            {["Home /", "All Books /books", "Digital Store /books/category/digital", "New Arrivals /books"].map((item) => {
              const [label, path] = item.split(" ");
              return (
                <Link key={label} href={path || "/"} onClick={() => setIsMenuOpen(false)}
                  className="py-3 px-4 rounded-xl hover:bg-muted font-black text-sm transition-colors flex items-center justify-between group">
                  {label}
                  <span className="text-muted-foreground group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              );
            })}
            <Link href="/admin/dashboard" onClick={() => setIsMenuOpen(false)}
              className="py-2 px-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
              <Sparkles size={12} /> Admin Console
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
