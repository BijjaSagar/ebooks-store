"use client";

import { useState } from "react";
import { Truck, Plus, Trash2, Edit3, Globe, MapPin, ShieldCheck, ArrowRight, ShieldAlert } from "lucide-react";

export default function AdminShippingPage() {
  const [rules, setRules] = useState([
    { id: "1", country: "India", state: "All States", charge: 0, minOrder: 999, status: "Active" },
    { id: "2", country: "India", state: "Maharashtra", charge: 49, minOrder: 499, status: "Active" },
    { id: "3", country: "USA", state: "All States", charge: 1499, minOrder: 10000, status: "Active" },
    { id: "4", country: "UK", state: "All States", charge: 1999, minOrder: 15000, status: "Inactive" },
  ]);

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      {/* Header Promo */}
      <section className="bg-muted p-12 rounded-[2.5rem] border border-border shadow-inner relative overflow-hidden group text-center">
         <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
         <div className="max-w-2xl mx-auto space-y-6">
            <div className="mx-auto w-16 h-16 bg-accent text-white rounded-2xl flex items-center justify-center shadow-xl mb-4 group-hover:rotate-12 transition-transform">
               <Truck size={32} strokeWidth={2.5} />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-black italic text-accent">Global Logistics Engine</h1>
            <p className="text-muted-foreground font-medium text-lg">
               Configure regional shipping rates, free delivery thresholds, and carrier zones.
            </p>
            <div className="pt-4 flex justify-center gap-4">
               <button className="btn-primary py-4 px-10 italic font-black shadow-xl flex items-center gap-2">
                  <Plus size={20} /> New Shipping Zone
               </button>
            </div>
         </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
         {/* Rules Table */}
         <div className="lg:col-span-3 space-y-6">
            <div className="flex items-end justify-between border-b-2 border-accent pb-2">
               <h2 className="text-2xl font-serif font-black italic text-accent underline decoration-orange-500/30 decoration-8 underline-offset-8">Active Zones</h2>
               <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-muted-foreground italic">
                  <span>Showing {rules.length} Active Rules</span>
               </div>
            </div>

            <div className="bg-white border border-border rounded-3xl overflow-hidden shadow-sm">
               <table className="w-full text-left">
                  <thead className="bg-muted/50 border-b border-border text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                     <tr>
                        <th className="px-8 py-5">Region / Scope</th>
                        <th className="px-8 py-5">Base Charge</th>
                        <th className="px-8 py-5">Free Delivery Over</th>
                        <th className="px-8 py-5">Status</th>
                        <th className="px-8 py-5 text-right">Control</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                     {rules.map((rule) => (
                        <tr key={rule.id} className="hover:bg-muted/30 transition-colors group">
                           <td className="px-8 py-6">
                              <div className="flex items-center gap-4 group-hover:translate-x-1 transition-transform">
                                 <div className="h-10 w-10 bg-muted rounded-xl flex items-center justify-center text-accent">
                                    {rule.country === "India" ? <MapPin size={18} /> : <Globe size={18} />}
                                 </div>
                                 <div>
                                    <p className="font-serif font-black italic text-lg text-accent leading-none">{rule.country}</p>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-1">{rule.state}</p>
                                 </div>
                              </div>
                           </td>
                           <td className="px-8 py-6">
                              <span className="font-black text-accent italic text-lg">₹{rule.charge}</span>
                           </td>
                           <td className="px-8 py-6">
                              <span className="text-xs font-black uppercase tracking-widest text-green-600 bg-green-50 px-3 py-1 rounded-full">₹{rule.minOrder}+</span>
                           </td>
                           <td className="px-8 py-6">
                              <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${rule.status === "Active" ? "bg-accent-blue text-white" : "bg-gray-100 text-gray-400"}`}>
                                 {rule.status}
                              </span>
                           </td>
                           <td className="px-8 py-6">
                              <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                 <button className="p-2 hover:bg-muted rounded-lg text-accent transition-colors"><Edit3 size={16} /></button>
                                 <button className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors"><Trash2 size={16} /></button>
                              </div>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>

         {/* Settings & Info */}
         <div className="lg:col-span-1 space-y-8">
            <div className="p-8 bg-accent text-white rounded-3xl space-y-6 shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-150 transition-transform duration-1000">
                  <ShieldCheck size={100} />
               </div>
               <h3 className="text-xl font-serif font-black italic relative z-10 leading-tight">Master Shipping <br/>Override</h3>
               <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest text-gray-400">
                     <span>Global Free Shipping</span>
                     <span className="h-4 w-8 bg-white/20 rounded-full relative"><span className="absolute left-1 top-1 h-2 w-2 bg-white rounded-full"></span></span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest text-gray-400">
                     <span>International Sales</span>
                     <span className="h-4 w-8 bg-accent-blue rounded-full relative"><span className="absolute right-1 top-1 h-2 w-2 bg-white rounded-full"></span></span>
                  </div>
               </div>
               <p className="text-[10px] font-medium text-gray-500 italic relative z-10 mt-4 leading-relaxed">
                  Note: Overrides take precedence over individual zone rules. Use with caution during sales events.
               </p>
            </div>

            <div className="p-8 bg-white border border-border rounded-3xl space-y-6 shadow-sm group">
               <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground italic border-b border-border pb-2">Logistics Tip</h4>
               <div className="flex gap-4">
                  <div className="shrink-0 p-2 bg-orange-50 text-orange-600 rounded-lg h-10 w-10 flex items-center justify-center">
                     <ShieldAlert size={20} />
                  </div>
                  <p className="text-xs font-medium text-muted-foreground leading-relaxed italic">
                     "Setting a minimum order of <span className="text-accent font-black">₹999</span> for free shipping in India typically increases average order value by <span className="text-green-600 font-bold">18%</span>."
                  </p>
               </div>
               <button className="w-full py-3 rounded-2xl border border-border text-[10px] font-black uppercase tracking-widest text-accent hover:bg-muted transition-all flex items-center justify-center gap-2">
                  View Analytics <ArrowRight size={14} />
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}
