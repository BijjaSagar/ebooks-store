"use client";

import { useState } from "react";
import { Search, Loader2, Save, X, BookOpen, Truck, Download, Plus } from "lucide-react";
import { fetchBookByISBN, GoogleBookInfo } from "@/lib/google-books";
import { createBook, getCategories } from "@/actions/book";
import { useEffect } from "react";

export default function AddBookPage() {
  const [isbn, setIsbn] = useState("");
  const [loading, setLoading] = useState(false);
  const [bookData, setBookData] = useState<Partial<GoogleBookInfo> | null>(null);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  const handleIsbnSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isbn) return;

    setLoading(true);
    setError("");
    setBookData(null);

    const result = await fetchBookByISBN(isbn);
    if (result) {
      setBookData(result);
    } else {
      setError("No book found with this ISBN. Please check and try again.");
    }
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    
    const result = await createBook({
        ...data,
        googleBooksId: bookData?.googleBooksId,
        imageUrl: bookData?.imageUrl
    });

    if (result.success) {
        alert("Book added successfully!");
        setBookData(null);
        setIsbn("");
    } else {
        setError(result.error || "Failed to save book");
    }
    setSaving(false);
  };

  return (
    <div className="max-w-5xl space-y-12 animate-in fade-in duration-500">
      {/* ISBN Search Section */}
      <section className="bg-muted/50 p-10 rounded-3xl border border-border shadow-inner">
        <div className="flex flex-col md:flex-row gap-8 items-center">
           <div className="md:w-1/2 space-y-4">
              <h2 className="text-2xl font-serif font-black italic color-accent">ISBN Smart Import</h2>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                Save time by importing book details directly from the Google Books database. Enter a valid ISBN-10 or ISBN-13 below.
              </p>
           </div>
           <form onSubmit={handleIsbnSearch} className="md:w-1/2 w-full flex gap-3 relative">
              <input
                type="text"
                placeholder="Enter ISBN (e.g., 9780451524935)..."
                className="flex-grow h-14 px-6 rounded-2xl border-2 border-border focus:border-accent-blue focus:ring-4 focus:ring-accent-blue/10 outline-none transition-all font-black"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
              />
              <button 
                disabled={loading}
                className="w-14 h-14 bg-accent text-white rounded-2xl flex items-center justify-center hover:opacity-90 transition-all shadow-lg active:scale-95 disabled:opacity-50"
              >
                {loading ? <Loader2 size={24} className="animate-spin" /> : <Search size={24} />}
              </button>
           </form>
        </div>
        {error && <p className="mt-4 text-xs font-black text-red-500 uppercase tracking-widest text-center">{error}</p>}
      </section>

      {/* Manual/Auto-fill Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Preview Card */}
        <div className="lg:col-span-4 space-y-6">
           <h3 className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground border-b border-border pb-2 italic">Product Preview</h3>
           <div className="bg-white border border-border rounded-3xl p-6 shadow-sm sticky top-10 overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-150 transition-transform duration-1000">
                 <BookOpen size={100} />
              </div>
              <div className="aspect-[3/4] bg-muted rounded-2xl mb-6 overflow-hidden border border-border">
                 {bookData?.imageUrl ? (
                   <img src={bookData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                 ) : (
                   <div className="w-full h-full flex items-center justify-center text-muted-foreground italic font-black text-xs p-10 text-center">No Cover Image Available</div>
                 )}
              </div>
              <div className="space-y-4 relative z-10">
                 <h4 className="font-serif font-black italic text-xl truncate">{bookData?.title || "Book Title"}</h4>
                 <p className="text-sm font-bold text-muted-foreground italic truncate">{bookData?.author || "Author Name"}</p>
                 <div className="flex justify-between items-center pt-4 border-t border-border">
                    <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Catalog Price</span>
                    <span className="text-2xl font-serif font-black italic text-accent">₹0.00</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Detailed Form */}
        <div className="lg:col-span-8 space-y-10">
           <form className="space-y-8" onSubmit={handleSave}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Book Title</label>
                    <input type="text" name="title" defaultValue={bookData?.title} className="w-full h-12 px-4 rounded-xl border border-border focus:border-accent-blue outline-none font-bold" required />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Author(s)</label>
                    <input type="text" name="author" defaultValue={bookData?.author} className="w-full h-12 px-4 rounded-xl border border-border focus:border-accent-blue outline-none font-bold" required />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Primary Category</label>
                    <select name="categoryId" className="w-full h-12 px-4 rounded-xl border border-border focus:border-accent-blue outline-none font-bold bg-white" required>
                       <option value="">Select Category...</option>
                       {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                       ))}
                    </select>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">ISBN</label>
                    <input type="text" name="isbn" defaultValue={bookData?.isbn} className="w-full h-12 px-4 rounded-xl border border-border focus:border-accent-blue outline-none font-bold" required />
                 </div>
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Book Description</label>
                 <textarea name="description" defaultValue={bookData?.description} rows={5} className="w-full p-4 rounded-xl border border-border focus:border-accent-blue outline-none font-medium text-sm leading-relaxed" required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2 flex items-center gap-2">
                       <Truck size={12} className="text-orange-600" /> Physical Price
                    </label>
                    <input type="number" name="pricePhysical" placeholder="₹" className="w-full h-12 px-4 rounded-xl border border-border focus:border-accent-blue outline-none font-black" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2 flex items-center gap-2">
                       <Download size={12} className="text-green-600" /> Digital Price
                    </label>
                    <input type="number" name="priceDigital" placeholder="₹" className="w-full h-12 px-4 rounded-xl border border-border focus:border-accent-blue outline-none font-black" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Initial Stock</label>
                    <input type="number" name="stock" placeholder="0" className="w-full h-12 px-4 rounded-xl border border-border focus:border-accent-blue outline-none font-black" />
                 </div>
              </div>

              <div className="pt-8 border-t border-border flex flex-col sm:flex-row gap-4">
                 <button type="submit" disabled={saving} className="flex-1 btn-primary py-4 italic font-black text-lg shadow-2xl flex items-center justify-center gap-3 disabled:opacity-50">
                    {saving ? <Loader2 className="animate-spin" /> : <Save size={20} />} Publish to Store
                 </button>
                 <button type="button" className="sm:w-48 border-2 border-border text-muted-foreground hover:text-red-500 hover:border-red-500 py-4 rounded-full font-black text-lg transition-all italic">
                    Discard
                 </button>
              </div>
           </form>
        </div>
      </div>
    </div>
  );
}
