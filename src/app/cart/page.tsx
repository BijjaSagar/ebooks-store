"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Truck } from "lucide-react";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-6 animate-in fade-in duration-700">
        <div className="p-10 bg-muted rounded-full text-accent shadow-inner">
           <ShoppingBag size={80} strokeWidth={1} />
        </div>
        <div className="text-center space-y-2">
           <h2 className="text-3xl font-serif font-black italic">Your cart is empty</h2>
           <p className="text-muted-foreground font-medium">Looks like you haven't added any books yet.</p>
        </div>
        <Link href="/books" className="btn-primary px-10 py-4 italic font-black shadow-xl">Start Browsing</Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 animate-in fade-in duration-500">
      <div className="flex items-end justify-between border-b-2 border-accent pb-4 mb-10">
         <h1 className="text-4xl font-serif font-black italic">Shopping Cart</h1>
         <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">{cart.length} Items Selected</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-8 space-y-6">
          {cart.map((item) => (
            <div key={`${item.id}-${item.isDigital}`} className="flex flex-col sm:flex-row items-center gap-6 p-6 border border-border rounded-3xl hover:shadow-lg transition-all group bg-white">
              <div className="w-24 h-32 bg-muted rounded-xl overflow-hidden shrink-0 shadow-sm border border-border">
                 {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                 ) : (
                    <div className="w-full h-full flex items-center justify-center font-black italic text-[10px] text-muted-foreground p-2 text-center uppercase tracking-tighter">{item.title}</div>
                 )}
              </div>
              
              <div className="flex-grow space-y-1 text-center sm:text-left">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-serif text-xl font-black italic text-accent group-hover:text-accent-blue transition-colors leading-tight">{item.title}</h3>
                    <p className="text-sm font-bold text-muted-foreground">{item.author}</p>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id, item.isDigital)}
                    className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                
                <div className="flex items-center gap-2 mt-2">
                   {item.isDigital ? (
                      <span className="text-[9px] font-black uppercase tracking-widest bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Digital PDF</span>
                   ) : (
                      <span className="text-[9px] font-black uppercase tracking-widest bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">Physical Edition</span>
                   )}
                </div>

                <div className="flex items-center justify-between pt-4 mt-4 border-t border-muted">
                  <div className="flex items-center border border-border rounded-full p-1 bg-muted/30">
                    <button 
                      onClick={() => updateQuantity(item.id, item.isDigital, item.quantity - 1)}
                      className="p-1.5 hover:bg-white rounded-full transition-all shadow-sm active:scale-90"
                    >
                      <Minus size={14} strokeWidth={3} />
                    </button>
                    <span className="w-10 text-center font-black text-sm">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.isDigital, item.quantity + 1)}
                      className="p-1.5 hover:bg-white rounded-full transition-all shadow-sm active:scale-90"
                    >
                      <Plus size={14} strokeWidth={3} />
                    </button>
                  </div>
                  <div className="text-xl font-serif font-black italic text-accent">₹{item.price * item.quantity}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4">
           <div className="bg-accent text-white p-8 rounded-[2rem] shadow-2xl sticky top-24 space-y-8 overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-150 transition-transform duration-1000">
                 <ShoppingBag size={120} />
              </div>

              <h2 className="text-2xl font-serif font-black italic relative z-10 border-b border-white/10 pb-4">Order Summary</h2>
              
              <div className="space-y-4 text-gray-300 font-medium relative z-10">
                 <div className="flex justify-between items-center text-sm">
                    <span>Subtotal</span>
                    <span className="text-white font-black">₹{cartTotal}</span>
                 </div>
                 <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-1">
                       Shipping <Truck size={14} className="text-orange-400" />
                    </div>
                    <span className="text-green-400 font-black">Calculated at Checkout</span>
                 </div>
                 <div className="flex justify-between items-center text-sm">
                    <span>Tax</span>
                    <span className="text-white font-black italic">Inclusive</span>
                 </div>
              </div>

              <div className="border-t border-white/20 pt-6 space-y-2 relative z-10">
                 <div className="flex justify-between items-end">
                    <span className="text-gray-400 font-black uppercase tracking-widest text-[10px]">Total Payable</span>
                    <span className="text-4xl font-serif font-black italic">₹{cartTotal}</span>
                 </div>
              </div>

              <div className="space-y-3 relative z-10 pt-4">
                 <Link href="/checkout" className="w-full btn-primary bg-white text-accent hover:bg-gray-100 py-4 text-center block text-lg italic shadow-xl">
                    Proceed to Payment
                 </Link>
                 <Link href="/books" className="w-full border border-white/20 hover:bg-white/5 py-3 rounded-full text-center block text-xs font-black uppercase tracking-widest transition-all">
                    Continue Shopping
                 </Link>
              </div>

              <div className="flex items-center justify-center gap-2 pt-4 relative z-10 opacity-50 grayscale hover:opacity-100 transition-opacity">
                 <div className="h-6 w-10 bg-white/10 rounded flex items-center justify-center italic font-black text-[6px]">Razorpay</div>
                 <div className="h-6 w-10 bg-white/10 rounded flex items-center justify-center italic font-black text-[6px]">PayPal</div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
