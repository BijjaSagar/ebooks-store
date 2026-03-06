import Link from "next/link";
import { ShoppingBag, Download, Clock, Package, Star, ArrowRight, BookOpen, ExternalLink, ShieldCheck, User } from "lucide-react";

export default function UserDashboardPage() {
  const recentOrders = [
    { id: "DB-9221", date: "Mar 12, 2024", total: "₹299", status: "Delivered", item: "The Great Gatsby" },
    { id: "DB-8812", date: "Feb 28, 2024", total: "₹149", status: "Paid", item: "1984 (PDF Edition)" },
  ];

  const downloads = [
    { id: "DL-101", title: "1984 | George Orwell", size: "2.4 MB", expires: "Mar 20, 2024", token: "xyz-123" },
    { id: "DL-102", title: "Pride & Prejudice (PDF)", size: "1.8 MB", expires: "Unlimited", token: "abc-789" },
  ];

  return (
    <div className="max-w-6xl mx-auto py-12 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 border-b-2 border-accent pb-8">
         <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-3xl border border-border group shrink-0 w-max">
               <div className="h-16 w-16 bg-accent text-white rounded-2xl flex items-center justify-center font-serif text-2xl font-black italic shadow-xl group-hover:scale-110 transition-transform">AS</div>
               <div>
                  <h1 className="text-3xl font-serif font-black italic text-accent opacity-90">Hi, Akash Singh</h1>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-1 italic flex items-center gap-2">
                     <ShieldCheck size={12} className="text-accent-blue" /> Premium Store Library Member
                  </p>
               </div>
            </div>
         </div>
         <nav className="flex flex-wrap gap-4 text-xs font-black uppercase tracking-widest">
            <Link href="/user/dashboard" className="px-6 py-3 bg-accent text-white rounded-full italic shadow-lg shadow-accent/20">Dashboard</Link>
            <Link href="/user/orders" className="px-6 py-3 border border-border hover:bg-muted transition-colors rounded-full italic">Orders</Link>
            <Link href="/user/downloads" className="px-6 py-3 border border-border hover:bg-muted transition-colors rounded-full italic">Downloads</Link>
            <Link href="/user/settings" className="px-6 py-3 border border-border hover:bg-muted transition-colors rounded-full italic">Settings</Link>
         </nav>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Orders & Updates */}
        <div className="lg:col-span-12 space-y-12">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white border border-border p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-150 transition-transform duration-700">
                    <Package size={64} />
                 </div>
                 <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground mb-4 italic">Recent Orders</h3>
                 <div className="text-3xl font-serif font-black italic text-accent mb-2">12 <span className="text-sm font-medium text-muted-foreground tracking-tighter not-italic">Purchased</span></div>
                 <Link href="/user/orders" className="text-[10px] font-black uppercase tracking-widest text-accent-blue hover:underline flex items-center gap-2 relative z-10 pt-4">View Lifetime History <ArrowRight size={14} /></Link>
              </div>
              <div className="bg-white border border-border p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-150 transition-transform duration-700">
                    <Download size={64} />
                 </div>
                 <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground mb-4 italic">Library Access</h3>
                 <div className="text-3xl font-serif font-black italic text-accent mb-2">4 <span className="text-sm font-medium text-muted-foreground tracking-tighter not-italic">Digital PDFs</span></div>
                 <Link href="/user/downloads" className="text-[10px] font-black uppercase tracking-widest text-accent-blue hover:underline flex items-center gap-2 relative z-10 pt-4">Access Cloud Library <ArrowRight size={14} /></Link>
              </div>
              <div className="bg-muted border border-border p-8 rounded-3xl space-y-4 shadow-inner relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-150 transition-transform duration-700">
                     <Star size={64} />
                  </div>
                 <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground italic">Reward Balance</h3>
                 <div className="text-3xl font-serif font-black italic text-orange-600 mb-2">850 <span className="text-sm font-medium text-muted-foreground tracking-tighter not-italic">Points</span></div>
                 <p className="text-[9px] font-black uppercase tracking-widest text-orange-700 bg-orange-100 px-2 py-0.5 rounded-full inline-block">DB Points Member</p>
              </div>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Recent Orders Section */}
              <section className="space-y-6">
                 <div className="flex items-end justify-between border-b border-border pb-2">
                    <h2 className="text-2xl font-serif font-black italic text-accent">Order Timeline</h2>
                    <Link href="/user/orders" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-accent">Summary</Link>
                 </div>
                 <div className="space-y-4">
                    {recentOrders.map((order) => (
                       <div key={order.id} className="p-6 bg-white border border-border rounded-3xl hover:shadow-lg transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group cursor-pointer relative overflow-hidden">
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent-blue/20 group-hover:bg-accent-blue transition-colors"></div>
                          <div className="space-y-1">
                             <div className="flex items-center gap-2">
                                <span className="text-xs font-black text-accent-blue italic uppercase tracking-widest">{order.id}</span>
                                <span className="h-1 w-1 rounded-full bg-border"></span>
                                <span className="text-[10px] font-black text-muted-foreground opacity-50 uppercase tracking-widest italic">{order.date}</span>
                             </div>
                             <h4 className="font-serif font-black italic text-lg leading-tight group-hover:translate-x-1 transition-transform">{order.item}</h4>
                             <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Status: <span className={order.status === "Delivered" ? "text-green-600" : "text-blue-600"}>{order.status}</span></p>
                          </div>
                          <div className="flex items-center gap-4">
                             <div className="text-right sr-only sm:not-sr-only">
                                <p className="text-xs font-black uppercase tracking-widest text-muted-foreground italic">Total Paid</p>
                                <p className="text-xl font-serif font-black italic text-accent">{order.total}</p>
                             </div>
                             <div className="h-10 w-10 bg-muted rounded-2xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all shadow-sm">
                                <ExternalLink size={18} />
                             </div>
                          </div>
                       </div>
                    ))}
                 </div>
              </section>

              {/* Secure Downloads Section */}
              <section className="space-y-6">
                 <div className="flex items-end justify-between border-b border-border pb-2">
                    <h2 className="text-2xl font-serif font-black italic text-accent">Digital Vault</h2>
                    <Link href="/user/downloads" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-accent">All Files</Link>
                 </div>
                 <div className="space-y-4">
                    {downloads.map((dl) => (
                       <div key={dl.id} className="p-6 bg-accent text-white rounded-3xl hover:shadow-2xl transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group cursor-pointer relative overflow-hidden">
                          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-150 transition-transform duration-700">
                             <BookOpen size={64} />
                          </div>
                          <div className="space-y-1 relative z-10 shrink-0">
                             <h4 className="font-serif font-black italic text-lg truncate max-w-[200px] sm:max-w-none">{dl.title}</h4>
                             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Secure Access Token Activated</p>
                             <div className="flex items-center gap-2 pt-2">
                                <span className="text-[10px] font-black uppercase bg-white/10 px-2 py-0.5 rounded-full">{dl.size}</span>
                                <span className="text-[10px] font-black uppercase bg-white/10 px-2 py-0.5 rounded-full italic">Expires: {dl.expires}</span>
                             </div>
                          </div>
                          <button className="btn-primary bg-white text-accent hover:bg-gray-100 flex items-center gap-3 relative z-10 py-3 italic truncate overflow-hidden">
                             <Download size={18} /> <span className="hidden sm:inline">Download PDF</span>
                          </button>
                       </div>
                    ))}
                    <div className="p-8 border-2 border-dashed border-border rounded-3xl text-center space-y-2 opacity-50">
                       <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Protected by CloudLink™ Security</p>
                       <p className="text-xs font-medium italic">New digital orders will appear here instantly after payment confirmation.</p>
                    </div>
                 </div>
              </section>
           </div>
        </div>
      </div>
    </div>
  );
}
