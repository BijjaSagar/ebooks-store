import Link from "next/link";
import { ShoppingCart, Truck, ShieldCheck, Download, Star, Share2, Facebook, Twitter, Mail } from "lucide-react";

export default function BookDetailPage({ params }: { params: { id: string } }) {
  // Mock data for now
  const book = {
    id: params.id,
    title: "1984 | A Masterpiece of Dystopian Fiction",
    author: "George Orwell",
    description: `A masterpiece of rebellion and control. Winston Smith works at the Ministry of Truth, rewriting history to suit the whims of the Party. But deep down, he feels a sense of unrest. This dystopian classic explores themes of surveillance, power, and the fragility of truth in a chillingly relatable future. 

Included in the Delhi Books "Essentials" collection. This edition features an exclusive foreword and high-quality cream paper for the physical edition, and an optimized, searchable PDF for digital readers.`,
    pricePhysical: 299,
    priceDigital: 149,
    isbn: "9780451524935",
    rating: 4.8,
    reviews: 1242,
    stock: 45,
    imageUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1532714506i/40961427.jpg",
    category: "Fiction / Classics",
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 py-8 px-4 animate-in fade-in duration-500">
      {/* Breadcrumbs */}
      <nav className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
        <Link href="/" className="hover:text-accent">Home</Link>
        <span>/</span>
        <Link href="/books" className="hover:text-accent">Books</Link>
        <span>/</span>
        <span className="text-accent italic">{book.category}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20">
        {/* Left: Images */}
        <div className="md:col-span-5 space-y-6">
          <div className="aspect-[3/4] bg-muted rounded-3xl overflow-hidden shadow-2xl border border-border group relative">
             <div className="absolute inset-0 bg-accent-blue/5 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
             {book.imageUrl ? (
               <img src={book.imageUrl} alt={book.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" />
             ) : (
               <div className="w-full h-full flex items-center justify-center font-serif text-2xl font-black italic text-muted-foreground">No Image</div>
             )}
          </div>
          
          {/* Quick Info */}
          <div className="grid grid-cols-3 gap-2 text-center p-4 border border-border rounded-2xl bg-muted/30">
            <div className="flex flex-col items-center gap-1">
               <Star className="text-orange-400" size={16} fill="currentColor" />
               <span className="text-[10px] font-black uppercase tracking-tighter">{book.rating} ({book.reviews})</span>
            </div>
            <div className="flex flex-col items-center gap-1 border-x border-border">
               <ShieldCheck className="text-accent-blue" size={16} />
               <span className="text-[10px] font-black uppercase tracking-tighter">Verified</span>
            </div>
            <div className="flex flex-col items-center gap-1">
               <Truck className="text-orange-600" size={16} />
               <span className="text-[10px] font-black uppercase tracking-tighter">Free Ship*</span>
            </div>
          </div>
        </div>

        {/* Right: Details */}
        <div className="md:col-span-7 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
               <span className="text-accent-blue font-serif italic font-black text-sm uppercase tracking-widest">{book.isbn}</span>
               <div className="flex gap-3 text-muted-foreground">
                  <Share2 size={18} className="cursor-pointer hover:text-accent transition-colors" />
               </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-serif font-black italic tracking-tight text-accent leading-tight">{book.title}</h1>
            <p className="text-xl text-muted-foreground font-medium flex items-center gap-2">
              by <span className="text-accent font-black border-b border-accent/20 cursor-pointer hover:border-accent transition-colors">{book.author}</span>
            </p>
          </div>

          <div className="prose prose-sm prose-accent prose-invert max-w-none text-muted-foreground leading-relaxed whitespace-pre-line font-medium text-base">
            {book.description}
          </div>

          <div className="space-y-6 pt-4 border-t border-border">
            <h3 className="font-serif italic font-black uppercase tracking-widest text-sm text-accent">Select Format</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {/* Physical Option */}
               <label className="relative p-6 border-2 border-border rounded-2xl cursor-pointer hover:border-accent-blue transition-all group has-[:checked]:border-accent has-[:checked]:bg-accent/5 shadow-sm">
                 <input type="radio" name="format" className="sr-only peer" defaultChecked />
                 <div className="space-y-2">
                    <div className="flex justify-between items-center">
                       <span className="font-serif font-black italic">Hardcover</span>
                       <Truck size={18} className="text-muted-foreground group-hover:text-accent transition-colors" />
                    </div>
                    <div className="text-2xl font-black text-accent">₹{book.pricePhysical}</div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Standard Delivery: 3-5 Days</p>
                 </div>
                 <div className="absolute -top-3 -right-3 h-7 w-7 bg-accent text-white rounded-full hidden peer-checked:flex items-center justify-center shadow-lg transform rotate-12 scale-110 -z-10">✓</div>
               </label>

               {/* Digital Option */}
               <label className="relative p-6 border-2 border-border rounded-2xl cursor-pointer hover:border-accent-blue transition-all group has-[:checked]:border-accent has-[:checked]:bg-accent/5 shadow-sm">
                 <input type="radio" name="format" className="sr-only peer" />
                 <div className="space-y-2">
                    <div className="flex justify-between items-center">
                       <span className="font-serif font-black italic">Digital PDF</span>
                       <Download size={18} className="text-muted-foreground group-hover:text-accent transition-colors" />
                    </div>
                    <div className="text-2xl font-black text-accent-blue">₹{book.priceDigital}</div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-accent-blue">Instant Download</p>
                 </div>
               </label>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
             <button className="flex-1 btn-primary py-4 text-lg italic tracking-tight flex items-center justify-center gap-3 shadow-xl shadow-accent/20">
               <ShoppingCart size={22} strokeWidth={2.5} /> Add to Cart
             </button>
             <button className="flex-1 border-2 border-accent text-accent py-4 rounded-full font-black text-lg italic tracking-tight hover:bg-accent hover:text-white transition-all">
               Buy Now
             </button>
          </div>

          <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-black uppercase tracking-widest text-muted-foreground">
             <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl">
                <Truck size={18} className="text-orange-500" />
                <span>Pan-India Delivery</span>
             </div>
             <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl">
                <Download size={18} className="text-green-600" />
                <span>Encrypted PDF Access</span>
             </div>
          </div>
        </div>
      </div>

      {/* Recommended Section (Coming Soon) */}
      <section className="pt-20 space-y-10 border-t border-border">
         <h2 className="text-4xl font-serif font-black italic text-center underline decoration-accent-blue/30 decoration-8 underline-offset-10">Readers Also Loved</h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 opacity-40 grayscale pointer-events-none">
            <div className="h-[400px] border-2 border-dashed border-border rounded-3xl flex items-center justify-center italic text-muted-foreground font-black">Related Book</div>
            <div className="h-[400px] border-2 border-dashed border-border rounded-3xl flex items-center justify-center italic text-muted-foreground font-black">Related Book</div>
            <div className="h-[400px] border-2 border-dashed border-border rounded-3xl flex items-center justify-center italic text-muted-foreground font-black">Related Book</div>
            <div className="h-[400px] border-2 border-dashed border-border rounded-3xl flex items-center justify-center italic text-muted-foreground font-black">Related Book</div>
         </div>
         <p className="text-center text-xs font-black uppercase tracking-[0.3em] text-muted-foreground animate-pulse">Personalizing Your Recommendations...</p>
      </section>
    </div>
  );
}
