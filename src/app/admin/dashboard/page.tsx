import { 
  DollarSign, 
  ShoppingBag, 
  BookOpen, 
  Users, 
  TrendingUp, 
  Clock, 
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {
  const stats = [
    { label: "Gross Revenue", value: "₹1,24,500", icon: <DollarSign size={24} />, change: "+12.5%", isPositive: true },
    { label: "Successful Orders", value: "842", icon: <ShoppingBag size={24} />, change: "+8.2%", isPositive: true },
    { label: "Book Inventory", value: "156", icon: <BookOpen size={24} />, change: "+3.1%", isPositive: true },
    { label: "Active Customers", value: "2,410", icon: <Users size={24} />, change: "-2.4%", isPositive: false },
  ];

  const recentOrders = [
    { id: "ORD-9281", customer: "Rahul Sharma", book: "The Great Gatsby", amount: "₹299", status: "Delivered", date: "2 mins ago" },
    { id: "ORD-9282", customer: "Priya Gupta", book: "1984 (Digital)", amount: "₹149", status: "Paid", date: "15 mins ago" },
    { id: "ORD-9283", customer: "Anil Kumar", book: "Pride & Prejudice", amount: "₹249", status: "Shipped", date: "1 hour ago" },
    { id: "ORD-9284", customer: "Suman Devi", book: "To Kill a Mockingbird", amount: "₹349", status: "Pending", date: "3 hours ago" },
  ];

  return (
    <div className="space-y-12 pb-20">
      {/* Quick Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white border border-border p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
            <div className="absolute -top-6 -right-6 h-24 w-24 bg-accent-blue/5 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="p-4 bg-muted rounded-2xl text-accent group-hover:bg-accent group-hover:text-white transition-all">
                {stat.icon}
              </div>
              <div className={`flex items-center gap-1 text-xs font-black uppercase tracking-widest ${stat.isPositive ? "text-green-600" : "text-red-500"}`}>
                {stat.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.change}
              </div>
            </div>
            <div className="space-y-1 relative z-10">
              <h3 className="text-muted-foreground text-xs font-black uppercase tracking-[0.2em]">{stat.label}</h3>
              <p className="text-3xl font-serif font-black italic text-accent">{stat.value}</p>
            </div>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Recent Orders Table */}
        <section className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-end border-b border-border pb-2">
            <h2 className="text-2xl font-serif font-black italic text-accent">Real-time Activity</h2>
            <Link href="/admin/orders" className="text-xs font-black text-accent-blue hover:underline uppercase tracking-widest flex items-center gap-2">View All Orders <ChevronRight size={14} /></Link>
          </div>
          <div className="bg-white border border-border rounded-3xl overflow-hidden shadow-sm">
            <table className="w-full text-left text-sm font-medium">
              <thead className="bg-muted/50 border-b border-border text-xs font-black uppercase tracking-widest text-muted-foreground">
                <tr>
                  <th className="px-6 py-5">Order ID</th>
                  <th className="px-6 py-5">Customer</th>
                  <th className="px-6 py-5">Amount</th>
                  <th className="px-6 py-5">Status</th>
                  <th className="px-6 py-5">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-muted/30 transition-colors cursor-pointer group">
                    <td className="px-6 py-5 font-black text-accent-blue italic group-hover:translate-x-1 transition-transform">{order.id}</td>
                    <td className="px-6 py-5">
                       <div className="font-black text-accent">{order.customer}</div>
                       <div className="text-[10px] text-muted-foreground truncate max-w-[150px] italic">{order.book}</div>
                    </td>
                    <td className="px-6 py-5 font-black">{order.amount}</td>
                    <td className="px-6 py-5">
                      <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${
                        order.status === "Delivered" ? "bg-green-100 text-green-700" :
                        order.status === "Paid" ? "bg-blue-100 text-blue-700" :
                        order.status === "Shipped" ? "bg-orange-100 text-orange-700" :
                        "bg-red-100 text-red-700"
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-muted-foreground text-xs italic">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Quick Actions / Performance */}
        <section className="space-y-6">
          <div className="flex items-end border-b border-border pb-2">
            <h2 className="text-2xl font-serif font-black italic text-accent">Command Store</h2>
          </div>
          <div className="grid grid-cols-1 gap-4">
             <Link href="/admin/books/add" className="p-6 border-2 border-dashed border-border rounded-3xl hover:border-accent group transition-all text-center">
                <div className="h-12 w-12 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4 text-accent group-hover:bg-accent group-hover:text-white transition-all shadow-sm">
                   <Plus size={24} />
                </div>
                <h4 className="font-serif font-black italic text-lg leading-tight">Catalog <br/>New Arrival</h4>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-2">Use ISBN Search</p>
             </Link>

             <div className="p-8 bg-accent text-white rounded-3xl space-y-4 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-150 transition-transform duration-700">
                   <TrendingUp size={100} />
                </div>
                <h4 className="text-xl font-serif font-black italic leading-tight relative z-10">Stock Alert! <br/><span className="text-orange-500">Inventory Low</span></h4>
                <p className="text-xs text-gray-400 font-medium relative z-10">5 titles are currently below the threshold. We recommend re-stocking or adjusting prices for scarcity.</p>
                <div className="pt-2 relative z-10">
                   <button className="w-full btn-secondary text-white border-white py-3 text-xs uppercase tracking-widest font-black shadow-lg">Manage Inventory</button>
                </div>
             </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function Plus({ size }: { size: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );
}
