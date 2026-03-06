import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white py-16 mt-16 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo and Info */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <span className="font-serif text-2xl font-black bg-white text-primary px-2 py-0.5 rounded transition-transform group-hover:scale-110">DB</span>
              <span className="font-serif text-xl tracking-tighter font-black">Delhi Books</span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed font-medium">
              Your destination for physical and digital books. Quality reads delivered to your doorstep or instantly to your inbox.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-black italic mb-6">Library</h3>
            <ul className="space-y-3 text-[13px] text-white/60 font-medium">
              <li><Link href="/books/category/fiction" className="hover:text-accent transition-colors">Fiction</Link></li>
              <li><Link href="/books/category/non-fiction" className="hover:text-accent transition-colors">Non-Fiction</Link></li>
              <li><Link href="/books/category/digital" className="hover:text-accent transition-colors">Digital Store (PDF)</Link></li>
              <li><Link href="/books/category/academic" className="hover:text-accent transition-colors">Academic Archive</Link></li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="font-serif text-lg font-black italic mb-6">User Space</h3>
            <ul className="space-y-3 text-[13px] text-white/60 font-medium">
              <li><Link href="/user/dashboard" className="hover:text-accent transition-colors">Member Dashboard</Link></li>
              <li><Link href="/user/downloads" className="hover:text-accent transition-colors">My Digital Library</Link></li>
              <li><Link href="/user/profile" className="hover:text-accent transition-colors">Account Personalization</Link></li>
              <li><Link href="/auth/signin" className="hover:text-accent transition-colors">Authentication</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-serif text-lg font-black italic mb-6">Get in Touch</h3>
            <ul className="space-y-3 text-[13px] text-white/60 font-medium">
              <li><Link href="/support" className="hover:text-accent transition-colors">Curated Support</Link></li>
              <li><Link href="/shipping-policy" className="hover:text-accent transition-colors">Logistics Guide</Link></li>
              <li><Link href="/admin/dashboard" className="text-white/30 hover:text-accent transition-colors uppercase tracking-widest text-[10px] font-black">Management Portal</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-white/40 font-black uppercase tracking-[0.2em]">
          <p>© {currentYear} Delhi Books. Curating Knowledge across India.</p>
          <div className="flex gap-8">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Charter</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Engagement</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
