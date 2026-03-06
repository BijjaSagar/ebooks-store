"use client";

import Link from "next/link";
import { ShoppingCart, Zap } from "lucide-react";

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  price: number;
  imageUrl?: string;
  isbn: string;
  isDigital?: boolean;
}

export default function BookCard({ id, title, author, price, imageUrl, isbn, isDigital }: BookCardProps) {
  return (
    <div className="book-card bg-white group">
      <Link href={`/books/detail/${id}`} className="block">
        {/* Cover */}
        <div className="aspect-[3/4] relative overflow-hidden bg-gradient-to-br from-muted to-border">
          {imageUrl ? (
            <img src={imageUrl} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          ) : (
            <div className="w-full h-full flex flex-col items-end justify-end p-4"
              style={{ background: `linear-gradient(135deg, hsl(${Math.random() * 60 + 220},60%,35%), hsl(${Math.random() * 60 + 220},50%,20%))` }}>
              <span className="font-serif text-[9px] font-black text-white/60 uppercase tracking-widest text-right leading-tight">{isbn}</span>
            </div>
          )}

          {/* Digital badge */}
          {isDigital && (
            <div className="absolute top-3 left-3">
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-ink"
                style={{ background: "linear-gradient(135deg, #06EF8F, #FFD166)" }}>
                <Zap size={8} /> Digital
              </span>
            </div>
          )}

          {/* Overlay on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center"
            style={{ background: "linear-gradient(to top, rgba(13,13,26,0.85) 0%, transparent 50%)" }}>
          </div>
        </div>

        {/* Info */}
        <div className="p-5 space-y-2">
          <h3 className="font-serif font-black italic text-base text-ink leading-tight group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{author}</p>

          <div className="flex items-center justify-between pt-3 mt-3 border-t border-border">
            <span className="font-serif font-black italic text-2xl" style={{ background: "linear-gradient(135deg, #7C3AED, #FF6B6B)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              ₹{price}
            </span>
            <button
              className="h-10 w-10 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg"
              style={{ background: "linear-gradient(135deg, #7C3AED, #5B21B6)" }}
              onClick={(e) => { e.preventDefault(); }}
            >
              <ShoppingCart size={16} />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
