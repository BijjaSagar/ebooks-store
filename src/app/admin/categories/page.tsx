"use client";

import { useState } from "react";
import { Plus, Trash2, Edit3, Layers, LayoutGrid, List, Search, ArrowRight } from "lucide-react";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([
    { id: "1", name: "Fiction", slug: "fiction", count: 42 },
    { id: "2", name: "Non-Fiction", slug: "non-fiction", count: 28 },
    { id: "3", name: "Digital (PDF)", slug: "digital", count: 115 },
    { id: "4", name: "Academic", slug: "academic", count: 12 },
    { id: "5", name: "Classics", slug: "classics", count: 8 },
  ]);

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      <div className="bg-accent text-white p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
         <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-1000">
            <Layers size={150} />
         </div>
         <div className="relative z-10 max-w-2xl space-y-6">
            <span className="text-accent-blue font-serif font-black uppercase tracking-[0.3em] text-xs">Taxonomy & Organization</span>
            <h1 className="text-4xl md:text-5xl font-serif font-black italic italic leading-tight">Master Category Console</h1>
            <p className="text-gray-400 font-medium text-lg leading-relaxed">
               Define the architecture of your bookstore. Categorize books for better discoverability and SEO performance.
            </p>
            <div className="pt-4">
               <button className="btn-primary bg-white text-accent hover:bg-gray-100 py-4 px-8 italic font-black text-xl flex items-center gap-3 shadow-2xl">
                  <Plus size={24} strokeWidth={3} /> Define New Category
               </button>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
         {/* Category List */}
         <div className="lg:col-span-8 space-y-6">
            <div className="flex items-end justify-between border-b-2 border-accent pb-2">
               <h2 className="text-2xl font-serif font-black italic text-accent">Active Taxonomies</h2>
               <div className="flex items-center gap-4">
                  <button className="p-2 bg-muted rounded-lg text-accent-blue"><LayoutGrid size={18} /></button>
                  <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground"><List size={18} /></button>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {categories.map((cat) => (
                  <div key={cat.id} className="p-8 border border-border rounded-3xl bg-white hover:shadow-xl hover:border-accent-blue transition-all group relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-125 transition-transform duration-500">
                        <Layers size={64} />
                     </div>
                     <div className="space-y-4 relative z-10">
                        <div className="flex justify-between items-start">
                           <div>
                              <h3 className="text-2xl font-serif font-black italic text-accent leading-none">{cat.name}</h3>
                              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-2 italic">Slug: /{cat.slug}</p>
                           </div>
                           <span className="bg-muted text-accent px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{cat.count} Books</span>
                        </div>
                        
                        <div className="flex items-center gap-2 pt-6 border-t border-muted opacity-0 group-hover:opacity-100 transition-opacity">
                           <button className="flex-1 py-2 rounded-xl bg-accent text-white text-[10px] font-black uppercase tracking-widest italic flex items-center justify-center gap-2">
                              <Edit3 size={14} /> Edit
                           </button>
                           <button className="flex-1 py-2 rounded-xl border border-border text-muted-foreground hover:text-red-500 hover:border-red-500 transition-all text-[10px] font-black uppercase tracking-widest italic flex items-center justify-center gap-2">
                              <Trash2 size={14} /> Delete
                           </button>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Stats/Quick Actions */}
         <div className="lg:col-span-1 space-y-8">
            <div className="p-8 bg-muted rounded-3xl border border-border space-y-6 shadow-inner">
               <h4 className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground italic border-b border-border pb-2">Category Health</h4>
               <div className="space-y-6">
                  <div className="flex items-center gap-4">
                     <div className="h-10 w-10 bg-white rounded-2xl flex items-center justify-center text-accent shadow-sm"><Layers size={18} /></div>
                     <div>
                        <p className="text-2xl font-serif font-black italic leading-none">52</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Total Categories</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="h-10 w-10 bg-white rounded-2xl flex items-center justify-center text-accent shadow-sm"><Search size={18} /></div>
                     <div>
                        <p className="text-2xl font-serif font-black italic leading-none">12%</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Uncategorized Books</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="p-8 bg-white border border-border rounded-3xl space-y-4 group cursor-pointer hover:bg-accent hover:text-white transition-all">
               <h4 className="font-serif font-black italic text-lg leading-tight group-hover:translate-x-1 transition-transform">Optimize Taxonomy</h4>
               <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-gray-400">Run AI analysis to merge similar categories and optimize for search filters.</p>
               <div className="pt-2 flex justify-end">
                  <div className="p-2 bg-accent text-white group-hover:bg-white group-hover:text-accent rounded-full transition-all">
                    <ArrowRight size={18} />
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
