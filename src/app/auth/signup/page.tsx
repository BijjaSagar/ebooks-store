"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Loader2, ArrowRight, CheckCircle } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    try {
      // Register user via API
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Registration failed. Please try again.");
        return;
      }

      // Auto sign in
      await signIn("credentials", {
        email: form.email,
        password: form.password,
        callbackUrl: "/user/dashboard",
        redirect: true,
      });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = (provider: string) => {
    signIn(provider, { callbackUrl: "/user/dashboard" });
  };

  const passwordStrength = form.password.length === 0 ? 0
    : form.password.length < 6 ? 1 : form.password.length < 10 ? 2 : 3;
  const strengthLabel = ["", "Weak", "Good", "Strong"];
  const strengthColor = ["", "#FF6B6B", "#FFD166", "#06EF8F"];

  return (
    <div className="min-h-screen flex" style={{ background: "linear-gradient(135deg, #0D0D1A 0%, #1A0A2E 100%)" }}>
      {/* Orbs */}
      <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full blur-[120px] opacity-20 animate-pulse"
        style={{ background: "radial-gradient(circle, #7C3AED, transparent)" }} />
      <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full blur-[100px] opacity-15"
        style={{ background: "radial-gradient(circle, #06EF8F, transparent)" }} />

      {/* Left Brand */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-16 relative">
        <div className="space-y-8 max-w-lg">
          <Link href="/" className="flex items-center gap-3">
            <span className="font-serif text-2xl font-black text-white px-4 py-2 rounded-xl"
              style={{ background: "linear-gradient(135deg,#7C3AED,#5B21B6)" }}>DB</span>
            <span className="font-serif text-2xl font-black text-white">Delhi <span style={{ color: "#FFD166" }}>Books</span></span>
          </Link>
          <h1 className="text-5xl font-serif font-black italic text-white leading-tight">
            Join{" "}
            <span style={{ background: "linear-gradient(135deg, #06EF8F, #FFD166)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              50,000+
            </span>{" "}
            Readers.
          </h1>
          <p className="text-white/50 text-lg leading-relaxed font-medium">
            Create your free account and start exploring curated books today.
          </p>
          {/* Benefits */}
          <div className="space-y-3 pt-2">
            {[
              "Track all your orders in one place",
              "Instant PDF downloads after purchase",
              "Exclusive member deals & early access",
              "Personalized reading recommendations",
            ].map((benefit) => (
              <div key={benefit} className="flex items-center gap-3">
                <CheckCircle size={16} className="text-emerald shrink-0" />
                <span className="text-white/60 text-sm font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-md">
          <div className="rounded-3xl p-8 md:p-10 shadow-2xl" style={{ background: "rgba(255,255,255,0.97)" }}>
            {/* Mobile Logo */}
            <Link href="/" className="flex items-center gap-2 mb-8 lg:hidden">
              <span className="font-serif text-lg font-black text-white px-3 py-1 rounded-lg"
                style={{ background: "linear-gradient(135deg,#7C3AED,#5B21B6)" }}>DB</span>
              <span className="font-serif font-black text-ink">Delhi <span className="text-primary">Books</span></span>
            </Link>

            <div className="space-y-2 mb-8">
              <h2 className="text-3xl font-serif font-black italic text-ink">Create Account</h2>
              <p className="text-muted-foreground text-sm font-medium">Start your reading journey today</p>
            </div>

            {/* OAuth */}
            <div className="space-y-3 mb-6">
              <button onClick={() => handleOAuth("google")}
                className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border-2 border-border text-sm font-black hover:bg-muted transition-all">
                <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303C33.654 32.657 29.332 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/><path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/></svg>
                Sign up with Google
              </button>
            </div>
            <div className="relative flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-border" />
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">or</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {error && (
              <div className="mb-4 p-4 rounded-xl bg-fire/10 border border-fire/20 text-fire text-sm font-medium animate-in fade-in">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Full Name</label>
                <input type="text" placeholder="Your full name" required
                  className="w-full h-12 px-4 rounded-xl border border-border bg-muted/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 text-sm font-medium transition-all"
                  value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Email</label>
                <input type="email" placeholder="you@example.com" required
                  className="w-full h-12 px-4 rounded-xl border border-border bg-muted/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 text-sm font-medium transition-all"
                  value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Password</label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} placeholder="Min. 8 characters" required
                    className="w-full h-12 px-4 pr-12 rounded-xl border border-border bg-muted/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 text-sm font-medium transition-all"
                    value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-ink">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {form.password && (
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${(passwordStrength / 3) * 100}%`, background: strengthColor[passwordStrength] }} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: strengthColor[passwordStrength] }}>
                      {strengthLabel[passwordStrength]}
                    </span>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Confirm Password</label>
                <input type="password" placeholder="Re-enter your password" required
                  className={`w-full h-12 px-4 rounded-xl border bg-muted/40 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium transition-all ${
                    form.confirm && form.password !== form.confirm ? "border-fire focus:border-fire" : "border-border focus:border-primary/40"
                  }`}
                  value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} />
              </div>

              <button type="submit" disabled={loading}
                className="w-full py-4 rounded-xl text-white font-black text-sm uppercase tracking-widest transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2 shadow-lg mt-2"
                style={{ background: "linear-gradient(135deg,#7C3AED,#5B21B6)", boxShadow: "0 4px 24px rgba(124,58,237,0.3)" }}>
                {loading ? <Loader2 size={18} className="animate-spin" /> : <>Create Account <ArrowRight size={16} /></>}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground font-medium">
              Already have an account?{" "}
              <Link href="/auth/signin" className="font-black text-primary hover:underline">Sign In →</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
