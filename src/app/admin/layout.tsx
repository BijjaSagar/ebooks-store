"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BarChart3, 
  BookOpen, 
  Layers, 
  ShoppingBag, 
  Users, 
  Truck, 
  Settings, 
  LogOut,
  ChevronRight,
  Plus
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuItems = [
    { label: "Dashboard", icon: <BarChart3 size={18} />, path: "/admin/dashboard" },
    { label: "Book Inventory", icon: <BookOpen size={18} />, path: "/admin/books" },
    { label: "Add New Book", icon: <Plus size={18} />, path: "/admin/books/add" },
    { label: "Categories", icon: <Layers size={18} />, path: "/admin/categories" },
    { label: "Order Management", icon: <ShoppingBag size={18} />, path: "/admin/orders" },
    { label: "User Management", icon: <Users size={18} />, path: "/admin/users" },
    { label: "Shipping Rules", icon: <Truck size={18} />, path: "/admin/shipping" },
  ];

  return (
    <div className="flex min-h-screen bg-muted/30 -m-8 relative z-[60]">
      {/* Sidebar - Dark Minimal Amazon Admin */}
      <aside className="w-72 bg-[#1c252e] text-gray-300 flex flex-col fixed h-full shadow-2xl overflow-y-auto">
        <div className="p-8 border-b border-white/5 space-y-2">
           <Link href="/" className="flex items-center gap-2 group">
              <span className="font-serif text-2xl font-black bg-white text-[#1c252e] px-1.5 py-0.5 rounded transition-transform group-hover:rotate-6">DB</span>
              <span className="font-serif text-xl tracking-tighter text-white font-black italic">Console</span>
           </Link>
           <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Store Management v1.0</p>
        </div>

        <nav className="flex-grow p-6 space-y-1 pt-8">
          {menuItems.map((item) => (
            <Link 
              key={item.label}
              href={item.path}
              className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all group ${
                pathname === item.path 
                  ? "bg-primary text-white shadow-lg shadow-primary/20 font-black italic" 
                  : "hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`${pathname === item.path ? "text-white" : "text-gray-500 group-hover:text-primary transition-colors"}`}>
                   {item.icon}
                </span>
                <span className="text-sm tracking-wide">{item.label}</span>
              </div>
              <ChevronRight size={14} className={`opacity-0 group-hover:opacity-100 transition-opacity ${pathname === item.path ? "opacity-100" : ""}`} />
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-white/5 space-y-4">
           <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-400/5 transition-all group font-black uppercase tracking-widest text-[10px]">
              <LogOut size={16} /> <span>Sign Out</span>
           </button>
           <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/5">
              <div className="h-8 w-8 rounded-full bg-primary/20 border border-primary flex items-center justify-center font-black text-xs">AD</div>
              <div className="overflow-hidden">
                 <p className="text-xs font-black text-white truncate italic">Admin User</p>
                 <p className="text-[9px] font-medium text-gray-500 truncate">admin@delhibooks.com</p>
              </div>
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-72 flex-grow p-10 bg-white min-h-screen">
        <header className="flex justify-between items-center mb-10 pb-6 border-b border-border">
           <div>
              <h1 className="text-3xl font-serif font-black italic text-foreground opacity-90">Dashboard Overview</h1>
              <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mt-1">Real-time bookstore intelligence</p>
           </div>
           <div className="flex gap-3">
              <button className="btn-secondary px-6 text-xs uppercase tracking-widest font-black py-2.5">Global Search</button>
              <button className="btn-primary px-6 text-xs uppercase tracking-widest font-black py-2.5 shadow-xl shadow-accent/20">Sync Data</button>
           </div>
        </header>
        <div className="animate-in fade-in duration-700">
           {children}
        </div>
      </main>
    </div>
  );
}
