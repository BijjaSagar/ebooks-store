import BookCard from "@/components/books/BookCard";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Filter, ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";

export default async function CategoryPage({ params, searchParams }: { params: { slug: string }, searchParams?: { q?: string } }) {
  // Await params to fix Next.js 15+ routing requirements
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const query = resolvedSearchParams?.q || "";

  let title = "Category";
  let books: any[] = [];

  try {
    if (slug === "digital") {
      title = "Digital Editions";
      books = await prisma.book.findMany({
        where: {
          formatPDF: true,
          ...(query ? {
            OR: [
              { title: { contains: query, mode: "insensitive" } },
              { author: { contains: query, mode: "insensitive" } },
            ]
          } : {})
        },
        orderBy: { createdAt: "desc" },
      });
    } else if (slug === "new-arrivals") {
      title = "New Arrivals";
      books = await prisma.book.findMany({
        where: {
          ...(query ? {
            OR: [
              { title: { contains: query, mode: "insensitive" } },
              { author: { contains: query, mode: "insensitive" } },
            ]
          } : {})
        },
        orderBy: { createdAt: "desc" },
        take: 20, // get top 20 latest books 
      });
    } else {
      const category = await prisma.category.findUnique({
        where: { slug }
      });

      if (!category) return notFound();
      
      title = category.name;
      books = await prisma.book.findMany({
        where: {
          categoryId: category.id,
          ...(query ? {
            OR: [
              { title: { contains: query, mode: "insensitive" } },
              { author: { contains: query, mode: "insensitive" } },
            ]
          } : {})
        },
        orderBy: { createdAt: "desc" },
      });
    }
  } catch (error) {
    console.error("Failed to fetch category books", error);
  }

  const filters = ["All", "Fiction", "Non-Fiction", "Digital", "Academic"];
  const currentCategory = filters.find(f => f.toLowerCase().replace(" ", "-") === slug) || title;

  return (
    <div className="space-y-12 pb-20 fade-in animate-in">
      {/* Premium Dark Header */}
      <section 
        className="relative overflow-hidden rounded-[2.5rem] p-12 lg:p-20 text-center"
        style={{ background: "linear-gradient(135deg, #0D0D1A 0%, #1A0A2E 100%)" }}
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/20 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
           <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-ink mx-auto"
              style={{ background: "linear-gradient(135deg, #06EF8F, #FFD166)" }}>
              ✦ {slug === "digital" ? "Instant Access" : slug === "new-arrivals" ? "Latest Drops" : "Curated Genre"}
           </span>
           <h1 className="text-5xl md:text-7xl font-serif font-black italic text-white leading-tight">
              {title} <span style={{ background: "linear-gradient(135deg, #7C3AED, #FF6B6B)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Books.</span>
           </h1>
           <p className="text-white/50 text-lg font-medium">Explore the best selection of {title.toLowerCase()} reads.</p>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl mx-auto px-6">
        {/* Sidebar */}
        <aside className="lg:col-span-3 space-y-10">
           <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-border pb-4">
                 <h3 className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2">
                    <Filter size={14} /> Sections
                 </h3>
              </div>
              <div className="flex flex-col gap-2">
                 {filters.map((cat) => (
                    <Link 
                       href={cat === "All" ? "/books" : `/books/category/${cat.toLowerCase().replace(" ", "-")}`}
                       key={cat}
                       className={`flex items-center justify-between px-6 py-4 rounded-xl transition-all font-black text-xs uppercase tracking-widest ${
                          cat.toLowerCase().replace(" ", "-") === slug 
                             ? "bg-ink text-white shadow-xl translate-x-1" 
                             : "text-muted-foreground border border-border hover:border-primary hover:text-primary"
                       }`}
                    >
                       {cat}
                       {cat.toLowerCase().replace(" ", "-") === slug && <ChevronRight size={14} />}
                    </Link>
                 ))}
              </div>
           </div>
        </aside>

        {/* Results */}
        <main className="lg:col-span-9 space-y-8">
           <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                 Showing <span className="text-ink text-xs">{books.length}</span> Results in {title}
              </div>
           </div>

           {books.length > 0 ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.map((book: any) => (
                   <BookCard key={book.id} {...book} isDigital={book.formatPDF} />
                ))}
             </div>
           ) : (
             <div className="py-24 text-center space-y-4 bg-muted/30 rounded-3xl border border-dashed border-border">
               <h3 className="text-2xl font-serif font-black italic text-ink">No books found</h3>
               <p className="text-muted-foreground text-sm font-medium">There are currently no books in the {title} category.</p>
               <Link href="/books" className="btn-secondary mt-4">Browse All Books</Link>
             </div>
           )}
        </main>
      </div>
    </div>
  );
}
