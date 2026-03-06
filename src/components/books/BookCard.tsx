"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";

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
    <div className="book-card p-4 h-full flex flex-col group">
      <Link href={`/books/detail/${id}`} className="block flex-grow">
        <div className="aspect-[3/4] overflow-hidden rounded-xl mb-4 bg-muted relative border border-border/50">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground p-6 text-center">
              <span className="font-serif text-[10px] font-black mb-1 opacity-50 uppercase tracking-widest">{isbn}</span>
              <span className="font-serif text-sm font-black opacity-75 italic">{title}</span>
            </div>
          )}
          {isDigital && (
             <span className="absolute top-3 right-3 bg-accent text-foreground text-[8px] uppercase font-black px-2 py-1 rounded-lg shadow-xl backdrop-blur-sm">Digital PDF</span>
          )}
        </div>
        <div className="space-y-1">
          <h3 className="font-serif text-lg font-black text-foreground truncate group-hover:text-primary transition-colors italic leading-tight">{title}</h3>
          <p className="text-[11px] text-muted-foreground font-black uppercase tracking-widest">{author}</p>
          <div className="flex items-center justify-between pt-4 mt-4 border-t border-border">
            <span className="font-serif text-xl font-black text-primary italic">₹{price}</span>
            <button className="p-3 bg-muted text-foreground hover:bg-primary hover:text-white rounded-xl transition-all active:scale-90 shadow-sm">
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
