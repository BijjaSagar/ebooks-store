"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { ShieldCheck, Truck, CreditCard, Lock, ArrowRight, ChevronLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createOrder as saveOrderToDB } from "@/actions/order";
import { createRazorpayOrder, verifyPayment } from "@/actions/payment";
import { useSession } from "next-auth/react";
import Script from "next/script";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const { data: session } = useSession();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "paypal">("razorpay");
  const [shippingCharge, setShippingCharge] = useState(0);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({
      fullName: "",
      email: "",
      phone: "",
      street: "",
      city: "",
      pincode: ""
  });

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    if (!(session?.user as any)?.id) {
        alert("Please sign in to complete your purchase.");
        router.push("/auth/signin");
        return;
    }

    setLoading(true);

    // 1. Save order to database as PENDING
    const orderResult = await saveOrderToDB({
        userId: (session!.user as any).id,
        totalAmount: cartTotal,
        shippingCharge,
        address: address.street,
        city: address.city,
        state: "TBD", // Should capture from form
        country: "India", // Should capture from form
        zipCode: address.pincode,
        paymentGateway: paymentMethod === "razorpay" ? "Razorpay" : "PayPal",
        items: cart.map(i => ({
            bookId: i.id,
            quantity: i.quantity,
            price: i.price,
            format: i.isDigital ? "Digital" : "Physical"
        }))
    });

    if (!orderResult.success) {
        alert("Failed to create order. Please try again.");
        setLoading(false);
        return;
    }

    if (paymentMethod === "razorpay") {
        // 2. Create Razorpay Order
        const rzpOrder = await createRazorpayOrder(cartTotal + shippingCharge, orderResult.orderId);
        
        if (!rzpOrder.success) {
            alert("Razorpay initialization failed.");
            setLoading(false);
            return;
        }

        // 3. Open Razorpay Checkout Modal
        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder",
            amount: rzpOrder.order!.amount,
            currency: rzpOrder.order!.currency,
            name: "Delhi Books",
            description: "Online Bookstore Purchase",
            order_id: rzpOrder.order!.id,
            handler: async function (response: any) {
                // 4. Verify Payment
                const verify = await verifyPayment(
                    response.razorpay_order_id,
                    response.razorpay_payment_id,
                    response.razorpay_signature,
                    orderResult.orderId
                );

                if (verify.success) {
                    clearCart();
                    router.push(`/checkout/success?id=${orderResult.orderId}`);
                } else {
                    alert("Payment verification failed! Order ID: " + orderResult.orderId);
                }
            },
            prefill: {
                name: address.fullName,
                email: address.email,
                contact: address.phone
            },
            theme: { color: "#1c252e" },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
    } else {
        // PayPal Logic Placeholder
        alert("PayPal Checkout is under maintenance. Please use Razorpay.");
    }
    
    setLoading(false);
  };

  if (cart.length === 0) {
    router.push("/cart");
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto py-8 animate-in fade-in duration-500">
      <Link href="/cart" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-accent mb-8 group">
         <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Cart
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Checkout Form */}
        <div className="lg:col-span-7 space-y-12">
           <section className="space-y-6">
              <div className="flex items-center gap-4">
                 <div className="h-10 w-10 bg-accent text-white flex items-center justify-center rounded-full font-serif italic font-black">1</div>
                 <h2 className="text-2xl font-serif font-black italic">Shipping Identity</h2>
              </div>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6" id="checkout-form">
                 <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Full Name</label>
                    <input type="text" className="w-full h-12 px-4 rounded-xl border border-border focus:border-accent outline-none font-bold" placeholder="Akash Singh" value={address.fullName} onChange={(e) => setAddress({...address, fullName: e.target.value})} required />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Email Address</label>
                    <input type="email" className="w-full h-12 px-4 rounded-xl border border-border focus:border-accent outline-none font-bold" placeholder="akash@example.com" value={address.email} onChange={(e) => setAddress({...address, email: e.target.value})} required />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Phone Number</label>
                    <input type="tel" className="w-full h-12 px-4 rounded-xl border border-border focus:border-accent outline-none font-bold" placeholder="+91 98765 43210" value={address.phone} onChange={(e) => setAddress({...address, phone: e.target.value})} required />
                 </div>
                 <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Delivery Address</label>
                    <textarea className="w-full p-4 rounded-xl border border-border focus:border-accent outline-none font-medium text-sm" rows={3} placeholder="Street name, building, apartment number..." value={address.street} onChange={(e) => setAddress({...address, street: e.target.value})} required />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">City</label>
                    <input type="text" className="w-full h-12 px-4 rounded-xl border border-border focus:border-accent outline-none font-bold" value={address.city} onChange={(e) => setAddress({...address, city: e.target.value})} required />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Pincode</label>
                    <input type="text" className="w-full h-12 px-4 rounded-xl border border-border focus:border-accent outline-none font-bold" value={address.pincode} onChange={(e) => setAddress({...address, pincode: e.target.value})} required />
                 </div>
              </form>
           </section>

           <section className="space-y-6">
              <div className="flex items-center gap-4">
                 <div className="h-10 w-10 bg-accent text-white flex items-center justify-center rounded-full font-serif italic font-black">2</div>
                 <h2 className="text-2xl font-serif font-black italic">Payment Arsenal</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <button 
                  onClick={() => setPaymentMethod("razorpay")}
                  className={`p-6 border-2 rounded-3xl flex flex-col items-center gap-4 transition-all ${paymentMethod === "razorpay" ? "border-accent bg-accent/5" : "border-border hover:border-gray-300"}`}
                 >
                    <div className="h-12 w-12 bg-muted rounded-full flex items-center justify-center">
                       <CreditCard className={paymentMethod === "razorpay" ? "text-accent-blue" : "text-muted-foreground"} />
                    </div>
                    <div className="text-center">
                       <p className="font-serif font-black italic text-lg">Razorpay</p>
                       <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">Cards, UPI, Netbanking</p>
                    </div>
                 </button>
                 <button 
                  onClick={() => setPaymentMethod("paypal")}
                  className={`p-6 border-2 rounded-3xl flex flex-col items-center gap-4 transition-all ${paymentMethod === "paypal" ? "border-accent bg-accent/5" : "border-border hover:border-gray-300"}`}
                 >
                    <div className="h-12 w-12 bg-muted rounded-full flex items-center justify-center">
                       <span className="font-serif font-black italic text-xl text-blue-800">P</span>
                    </div>
                    <div className="text-center">
                       <p className="font-serif font-black italic text-lg">PayPal</p>
                       <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">International Checkout</p>
                    </div>
                 </button>
              </div>
           </section>
        </div>

        {/* Totals Sidebar */}
        <div className="lg:col-span-5">
           <div className="bg-muted p-10 rounded-[2.5rem] border border-border sticky top-24 space-y-8">
              <div className="space-y-6">
                 <h3 className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground border-b border-border pb-2 italic">Secured Checkout</h3>
                 <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={`${item.id}-${item.isDigital}`} className="flex justify-between items-center gap-4">
                         <div className="flex items-center gap-3">
                            <div className="h-10 w-8 bg-white border border-border rounded flex items-center justify-center text-[8px] font-black italic shrink-0 overflow-hidden">
                               {item.imageUrl ? <img src={item.imageUrl} className="w-full h-full object-cover" /> : "IMG"}
                            </div>
                            <div className="overflow-hidden">
                               <p className="text-xs font-black truncate max-w-[150px]">{item.title}</p>
                               <p className="text-[9px] text-muted-foreground font-medium uppercase tracking-widest">{item.quantity}x {item.isDigital ? "Digital" : "Physical"}</p>
                            </div>
                         </div>
                         <span className="text-xs font-black italic">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="space-y-4 border-t border-border pt-8">
                 <div className="flex justify-between items-center text-sm font-medium">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-black">₹{cartTotal}</span>
                 </div>
                 <div className="flex justify-between items-center text-sm font-medium">
                    <span className="text-muted-foreground">Shipping Fee</span>
                    <span className="font-black text-green-600">₹0 (Free)</span>
                 </div>
                 <div className="flex justify-between items-end pt-4">
                    <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Final Total</span>
                    <span className="text-5xl font-serif font-black italic text-accent line-through opacity-10 blur-sm absolute right-16">₹{cartTotal + 500}</span>
                    <span className="text-4xl font-serif font-black italic text-accent relative">₹{cartTotal}</span>
                 </div>
              </div>

              <div className="space-y-4 pt-6">
                 <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
                 <button 
                  className="w-full btn-primary py-5 text-xl italic font-black shadow-2xl flex items-center justify-center gap-4 disabled:opacity-50" 
                  onClick={handleCheckout}
                  disabled={loading}
                 >
                    {loading ? <Loader2 className="animate-spin" /> : "Complete Purchase"} <ArrowRight size={22} />
                 </button>
                 <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <Lock size={14} className="text-green-600" />
                    <span className="text-[10px] font-black uppercase tracking-widest italic">Encrypted Secure Transaction</span>
                 </div>
              </div>

              <div className="bg-white/50 p-6 rounded-3xl border border-dashed border-border space-y-3">
                 <div className="flex items-center gap-3">
                    <Truck size={18} className="text-orange-500" />
                    <div>
                       <p className="text-[10px] font-black uppercase tracking-widest">Pan-India Delivery</p>
                       <p className="text-[9px] text-muted-foreground font-medium italic">Standard Tracked Shipping</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-3">
                    <ShieldCheck size={18} className="text-accent-blue" />
                    <div>
                       <p className="text-[10px] font-black uppercase tracking-widest">Quality Guaranteed</p>
                       <p className="text-[9px] text-muted-foreground font-medium italic">Easy returns within 7 days</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
