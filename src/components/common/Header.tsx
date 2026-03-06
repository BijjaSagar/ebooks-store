"use client";

import Link from "next/link";
import { Search, ShoppingCart, User, Menu, X, Loader2 } from "lucide-react";
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
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { cartCount } = useCart();
  const { data: session } = useSession();
  const router = useRouter();

  const fetchResults = useRef(
    debounce(async (query: string) => {
      if (!query || query.length < 2) {
        setResults([]);
        return;
      }
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

  useEffect(() => {
    fetchResults(searchQuery);
  }, [searchQuery]);

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
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-serif text-2xl font-black bg-primary text-white px-2 py-0.5 rounded transition-transform group-hover:scale-105">DB</span>
          <span className="font-serif text-xl tracking-tighter sm:inline hidden font-black">Delhi Books</span>
        </Link>

        {/* Search Bar - Amazon style */}
        <div className="hidden md:flex flex-1 max-w-xl relative" ref={dropdownRef}>
          <form onSubmit={handleSearchSubmit} className="w-full relative">
            <input
              type="text"
              placeholder="Search for books by title, author, or ISBN..."
              className="w-full h-10 px-4 pr-10 border border-border rounded-full focus:ring-4 focus:ring-primary/10 focus:border-primary focus:outline-none transition-all placeholder:text-muted-foreground text-sm font-medium"
              value={searchQuery}
              onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
            />
            <button type="submit" className="absolute right-0 top-0 h-10 w-10 flex items-center justify-center bg-primary text-white rounded-r-full hover:opacity-90 transition-all">
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={18} />}
            </button>
          </form>

          {/* Search Suggestions Dropdown */}
          {showDropdown && (searchQuery.length > 1) && (
            <div className="absolute top-12 left-0 right-0 bg-white border border-border rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 z-50">
                {loading && results.length === 0 && (
                    <div className="p-8 text-center text-muted-foreground italic text-xs">Searching global library...</div>
                )}
                {!loading && results.length === 0 && searchQuery.length > 2 && (
                    <div className="p-8 text-center text-muted-foreground italic text-xs">No books found matching your query.</div>
                )}
                {results.map((book) => (
                    <Link 
                        key={book.id} 
                        href={`/books/detail/${book.id}`}
                        onClick={() => setShowDropdown(false)}
                        className="flex items-center gap-4 p-4 hover:bg-muted transition-colors border-b border-border last:border-none group"
                    >
                        <div className="h-12 w-9 bg-muted rounded overflow-hidden shadow-sm shrink-0 border border-border">
                            {book.imageUrl ? <img src={book.imageUrl} className="w-full h-full object-cover" /> : <div className="p-1 text-[6px] font-black italic">BOOK</div>}
                        </div>
                        <div className="flex-grow overflow-hidden">
                            <p className="font-serif font-black text-sm text-foreground group-hover:text-primary truncate">{book.title}</p>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground truncate">by {book.author}</p>
                        </div>
                        <div className="text-right shrink-0">
                            <p className="text-xs font-black italic text-primary">₹{book.pricePhysical || book.priceDigital}</p>
                            <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">{book.pricePhysical ? "Physical" : "Digital"}</span>
                        </div>
                    </Link>
                ))}
                {results.length > 0 && (
                     <Link href={`/books?q=${searchQuery}`} onClick={() => setShowDropdown(false)} className="block py-3 bg-primary text-white text-center text-[10px] font-black uppercase tracking-[0.2em] hover:opacity-90 transition-all">
                        View All Search Results
                     </Link>
                )}
            </div>
          )}
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Link href={session ? "/user/dashboard" : "/auth/signin"} className="flex flex-col items-center group text-muted-foreground hover:text-accent transition-colors">
            <User size={22} />
            <span className="text-[10px] font-medium hidden sm:block">{session ? "Account" : "Sign In"}</span>
          </Link>
          <Link href="/cart" className="flex flex-col items-center group relative text-muted-foreground hover:text-primary transition-colors">
            <ShoppingCart size={22} />
            <span className="absolute -top-1.5 -right-1.5 bg-accent text-foreground text-[10px] font-black h-4 w-4 rounded-full flex items-center justify-center shadow-sm">{cartCount}</span>
            <span className="text-[10px] font-medium hidden sm:block">Cart</span>
          </Link>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 hover:bg-muted rounded-full transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu & Search */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-white px-4 py-4 animate-in fade-in slide-in-from-top-4">
          <div className="flex mb-4 relative">
             <input
              type="text"
              placeholder="Search..."
              className="w-full h-10 px-4 border border-border rounded-full focus:outline-none text-sm"
            />
            <button className="absolute right-0 top-0 h-10 w-10 flex items-center justify-center bg-accent text-white rounded-r-full">
              <Search size={18} />
            </button>
          </div>
          <nav className="flex flex-col gap-3 font-medium">
            <Link href="/" className="py-2 border-b border-muted">Home</Link>
            <Link href="/books" className="py-2 border-b border-muted">Categories</Link>
            <Link href="/deals" className="py-2 border-b border-muted">New Releases</Link>
            <Link href="/admin/dashboard" className="py-2 text-primary font-black uppercase tracking-widest text-xs">Admin Panel</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
