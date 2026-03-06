"use client";

import Link from "next/link";
import { Search, ShoppingCart, User, Menu, X, Loader2, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { debounce } from "lodash";
import { useCart } from "@/context/CartContext";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const navLinks = [
  { label: "All Books", href: "/books" },
  { label: "New Arrivals", href: "/books/category/new-arrivals" },
  { label: "Digital Store", href: "/books/category/digital" },
  { label: "Admin", href: "/admin/dashboard" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
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
      } catch {
        /* search errors are non-fatal */
      } finally {
        setLoading(false);
      }
    }, 300)
  ).current;

  useEffect(() => { fetchResults(searchQuery); }, [searchQuery]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setShowDropdown(false);
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) setShowUserMenu(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
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
            >DB</span>
            <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-gold rounded-full border-2 border-canvas animate-pulse" />
          </div>
          <span className="font-serif text-lg tracking-tight font-black hidden sm:block text-ink">
            Delhi <span className="text-primary">Books</span>
          </span>
        </Link>

        {/* ── Desktop Nav ── */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-widest text-muted-foreground hover:text-ink hover:bg-muted transition-all"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* ── Search ── */}
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
                  onClick={() => { setShowDropdown(false); setSearchQuery(""); }}
                  className="flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors border-b border-border last:border-none group"
                >
                  <div className="h-12 w-9 bg-muted rounded-lg overflow-hidden shrink-0">
                    {book.imageUrl && <img src={book.imageUrl} className="w-full h-full object-cover" alt={book.title} />}
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

        {/* ── Right Icons ── */}
        <div className="flex items-center gap-2">
          {/* User Menu */}
          <div className="relative hidden sm:block" ref={userMenuRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-ink"
            >
              {session?.user?.image ? (
                <img src={session.user.image} className="h-6 w-6 rounded-full object-cover" alt="avatar" />
              ) : (
                <User size={18} />
              )}
              <span className="text-[10px] font-black uppercase tracking-widest">
                {session ? (session.user?.name?.split(" ")[0] || "Account") : "Sign In"}
              </span>
              <ChevronDown size={12} className={`transition-transform ${showUserMenu ? "rotate-180" : ""}`} />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 top-12 w-52 bg-white border border-border rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                {session ? (
                  <>
                    <div className="px-5 py-4 border-b border-border bg-muted/30">
                      <p className="font-black text-sm text-ink truncate">{session.user?.name}</p>
                      <p className="text-[10px] text-muted-foreground font-medium truncate">{session.user?.email}</p>
                    </div>
                    <div className="py-2">
                      <Link href="/user/dashboard" onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-3 px-5 py-3 text-sm font-medium hover:bg-muted transition-colors">
                        📦 My Orders
                      </Link>
                      <Link href="/user/dashboard" onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-3 px-5 py-3 text-sm font-medium hover:bg-muted transition-colors">
                        ⬇️ Downloads
                      </Link>
                      <Link href="/admin/dashboard" onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-3 px-5 py-3 text-sm font-medium hover:bg-muted transition-colors">
                        ⚙️ Admin Panel
                      </Link>
                    </div>
                    <div className="border-t border-border py-2">
                      <button
                        onClick={() => { signOut({ callbackUrl: "/" }); setShowUserMenu(false); }}
                        className="flex items-center gap-3 px-5 py-3 text-sm font-black text-fire hover:bg-fire/5 transition-colors w-full text-left"
                      >
                        🚪 Sign Out
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="p-4 space-y-2">
                    <Link href="/auth/signin" onClick={() => setShowUserMenu(false)}
                      className="block w-full text-center py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest text-white transition-all hover:opacity-90"
                      style={{ background: "linear-gradient(135deg,#7C3AED,#5B21B6)" }}>
                      Sign In
                    </Link>
                    <Link href="/auth/signup" onClick={() => setShowUserMenu(false)}
                      className="block w-full text-center py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest border-2 border-ink text-ink hover:bg-ink hover:text-white transition-all">
                      Create Account
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Cart */}
          <Link href="/cart" className="relative flex items-center gap-1.5 px-3 py-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-ink">
            <ShoppingCart size={18} />
            <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">Cart</span>
            {cartCount > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full text-[9px] font-black text-ink flex items-center justify-center shadow-lg"
                style={{ background: "linear-gradient(135deg,#FFD166,#FF6B6B)" }}
              >
                {cartCount}
              </span>
            )}
          </Link>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden p-2 rounded-full hover:bg-muted transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Open menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-border bg-canvas/95 backdrop-blur-xl px-6 py-6 space-y-3 animate-in fade-in slide-in-from-top-4">
          {/* Mobile Search */}
          <form onSubmit={(e) => { e.preventDefault(); router.push(`/books?q=${searchQuery}`); setIsMenuOpen(false); }}>
            <div className="relative">
              <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-10 pr-4 bg-muted border border-border rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </form>

          {/* Mobile Nav Links */}
          <nav className="flex flex-col gap-1 pt-2">
            {navLinks.map((item) => (
              <Link key={item.label} href={item.href} onClick={() => setIsMenuOpen(false)}
                className="py-3 px-4 rounded-xl hover:bg-muted font-black text-sm transition-colors flex items-center justify-between group">
                {item.label}
                <span className="text-muted-foreground group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            ))}
          </nav>

          {/* Mobile Auth Buttons */}
          <div className="pt-3 border-t border-border space-y-2">
            {session ? (
              <>
                <Link href="/user/dashboard" onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-center py-3 rounded-xl text-[11px] font-black uppercase tracking-widest text-white"
                  style={{ background: "linear-gradient(135deg,#7C3AED,#5B21B6)" }}>
                  My Account
                </Link>
                <button onClick={() => { signOut({ callbackUrl: "/" }); setIsMenuOpen(false); }}
                  className="block w-full text-center py-3 rounded-xl border-2 border-fire text-fire text-[11px] font-black uppercase tracking-widest hover:bg-fire hover:text-white transition-all">
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/signin" onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-center py-3 rounded-xl text-[11px] font-black uppercase tracking-widest text-white"
                  style={{ background: "linear-gradient(135deg,#7C3AED,#5B21B6)" }}>
                  Sign In
                </Link>
                <Link href="/auth/signup" onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-center py-3 rounded-xl text-[11px] font-black uppercase tracking-widest border-2 border-ink text-ink hover:bg-ink hover:text-white transition-all">
                  Create Account
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
