"use client";

import { useState } from "react";
import BookCard from "@/components/books/BookCard";
import { Filter, Search, ChevronDown, LayoutGrid, List } from "lucide-react";

export default function BookListingPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  
  const books = [
    { id: "1", title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 299, isbn: "9780743273565", isDigital: false },
    { id: "2", title: "1984", author: "George Orwell", price: 199, isbn: "9780451524935", isDigital: true },
    { id: "3", title: "Pride and Prejudice", author: "Jane Austen", price: 249, isbn: "9780141439518", isDigital: false },
    { id: "4", title: "To Kill a Mockingbird", author: "Harper Lee", price: 349, isbn: "9780061120084", isDigital: true },
    { id: "5", title: "Animal Farm", author: "George Orwell", price: 149, isbn: "9780451526342", isDigital: true },
    { id: "6", title: "Fahrenheit 451", author: "Ray Bradbury", price: 399, isbn: "9781451673319", isDigital: false },
    { id: "7", title: "The Catcher in the Rye", author: "J.D. Salinger", price: 299, isbn: "9780316769488", isDigital: false },
    { id: "8", title: "Brave New World", author: "Aldous Huxley", price: 329, isbn: "9780060850524", isDigital: true },
  ];

  const categories = ["All", "Fiction", "Non-Fiction", "Digital", "Academic", "Classics"];

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-20">
      {/* Search & Header */}
      <section className="bg-muted p-12 rounded-[2.5rem] border border-border flex flex-col items-center text-center space-y-6 shadow-inner relative overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 bg-accent-blue/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="space-y-2">
           <h1 className="text-4xl md:text-5xl font-serif font-black italic text-accent underline decoration-accent-blue/30 decoration-8 underline-offset-8">The Catalog</h1>
           <p className="text-muted-foreground font-medium text-lg italic">Explore our curated collection of physical and digital masterpieces.</p>
        </div>
        <div className="w-full max-w-2xl relative group">
           <input 
              type="text" 
              placeholder="Filter by title, author, or ISBN..." 
              className="w-full h-16 px-8 rounded-full border-2 border-border focus:border-accent-blue focus:ring-4 focus:ring-accent-blue/5 outline-none transition-all font-black text-lg bg-white shadow-xl"
           />
           <button className="absolute right-2 top-2 h-12 w-12 bg-accent text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform active:scale-95">
              <Search size={20} />
           </button>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Sidebar Filters */}
        <aside className="lg:col-span-3 space-y-10">
           <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground border-b border-border pb-2 italic flex items-center gap-2">
                 <Filter size={14} /> Refine Collection
              </h3>
              <div className="flex flex-col gap-2">
                 {categories.map((cat) => (
                    <button 
                       key={cat}
                       onClick={() => setActiveCategory(cat)}
                       className={`text-left px-6 py-3 rounded-xl transition-all font-black italic text-sm ${
                          activeCategory === cat 
                             ? "bg-accent text-white shadow-lg shadow-accent/20 translate-x-1" 
                             : "text-muted-foreground hover:bg-muted hover:text-accent"
                       }`}
                    >
                       {cat}
                    </button>
                 ))}
              </div>
           </div>

           <div className="p-8 bg-muted/50 rounded-3xl border border-dashed border-border space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground italic">Price Threshold</h4>
              <div className="space-y-4">
                 <input type="range" className="w-full accent-accent-blue" />
                 <div className="flex justify-between text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                    <span>₹0</span>
                    <span>₹2,000+</span>
                 </div>
              </div>
           </div>
        </aside>

        {/* Results Grid */}
        <main className="lg:col-span-9 space-y-8">
           <div className="flex items-center justify-between border-b border-muted pb-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground">
                 <span className="text-accent italic">{books.length}</span> Results Found
              </div>
              <div className="flex items-center gap-4">
                 <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-muted-foreground border border-border px-3 py-1.5 rounded-full cursor-pointer hover:bg-muted transition-all">
                    Sort By: Relevance <ChevronDown size={12} />
                 </div>
                 <div className="flex gap-2 text-muted-foreground">
                    <button className="p-1.5 bg-muted rounded-lg text-accent"><LayoutGrid size={18} /></button>
                    <button className="p-1.5 hover:bg-muted rounded-lg transition-colors"><List size={18} /></button>
                 </div>
              </div>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {books.map((book) => (
                 <BookCard key={book.id} {...book} />
              ))}
           </div>

           <div className="pt-12 flex justify-center">
              <button className="btn-secondary px-12 py-4 italic font-black uppercase tracking-widest text-xs hover:bg-accent hover:text-white shadow-sm active:scale-95">Load More Titles</button>
           </div>
        </main>
      </div>
    </div>
  );
}
