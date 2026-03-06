"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Loader2, BookOpen, ArrowRight } from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });
      const sessionResponse = await fetch("/api/auth/session");
      const sessionData = await sessionResponse.json();
      
      if (res?.error) {
        setError("Invalid email or password. Please try again.");
      } else {
        if (sessionData?.user?.role === "ADMIN") {
          router.push("/admin/dashboard");
        } else {
          router.push("/user/dashboard");
        }
        router.refresh();
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = (provider: string) => {
    signIn(provider, { callbackUrl: "/user/dashboard" });
  };

  return (
    <div className="min-h-screen flex" style={{ background: "linear-gradient(135deg, #0D0D1A 0%, #1A0A2E 100%)" }}>
      {/* Background orbs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full blur-[120px] opacity-20 animate-pulse"
        style={{ background: "radial-gradient(circle, #7C3AED, transparent)" }} />
      <div className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full blur-[100px] opacity-15"
        style={{ background: "radial-gradient(circle, #FF6B6B, transparent)" }} />

      {/* Left Branding Panel — hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-16 relative">
        <div className="space-y-8 max-w-lg">
          <Link href="/" className="flex items-center gap-3">
            <span className="font-serif text-2xl font-black text-white px-4 py-2 rounded-xl"
              style={{ background: "linear-gradient(135deg,#7C3AED,#5B21B6)" }}>DB</span>
            <span className="font-serif text-2xl font-black text-white">Delhi <span style={{ color: "#FFD166" }}>Books</span></span>
          </Link>
          <div className="space-y-4">
            <h1 className="text-5xl font-serif font-black italic text-white leading-tight">
              Welcome back,{" "}
              <span style={{ background: "linear-gradient(135deg,#7C3AED,#FF6B6B)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Reader.
              </span>
            </h1>
            <p className="text-white/50 text-lg leading-relaxed font-medium">
              Sign in to access your orders, downloads, and curated reading list.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-4">
            {[["10K+", "Books"], ["50K+", "Readers"], ["4.9★", "Rating"]].map(([n, l]) => (
              <div key={l} className="p-4 rounded-2xl text-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <p className="text-2xl font-black text-white font-serif italic">{n}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mt-1">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-md">
          <div className="rounded-3xl p-8 md:p-10 shadow-2xl" style={{ background: "rgba(255,255,255,0.97)", border: "1px solid rgba(255,255,255,0.15)" }}>
            {/* Logo (mobile only) */}
            <Link href="/" className="flex items-center gap-2 mb-8 lg:hidden">
              <span className="font-serif text-lg font-black text-white px-3 py-1 rounded-lg"
                style={{ background: "linear-gradient(135deg,#7C3AED,#5B21B6)" }}>DB</span>
              <span className="font-serif font-black text-ink">Delhi <span className="text-primary">Books</span></span>
            </Link>

            <div className="space-y-2 mb-8">
              <h2 className="text-3xl font-serif font-black italic text-ink">Sign In</h2>
              <p className="text-muted-foreground text-sm font-medium">Enter your credentials to continue</p>
            </div>

            {/* OAuth Buttons */}
            <div className="space-y-3 mb-6">
              <button onClick={() => handleOAuth("google")}
                className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border-2 border-border text-sm font-black hover:bg-muted transition-all">
                <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303C33.654 32.657 29.332 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/><path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/></svg>
                Continue with Google
              </button>
              <button onClick={() => handleOAuth("github")}
                className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border-2 border-border text-sm font-black hover:bg-muted transition-all">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
                Continue with GitHub
              </button>
            </div>

            {/* Divider */}
            <div className="relative flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-border" />
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">or email</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Error */}
            {error && (
              <div className="mb-4 p-4 rounded-xl bg-fire/10 border border-fire/20 text-fire text-sm font-medium animate-in fade-in">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="w-full h-12 px-4 rounded-xl border border-border bg-muted/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 text-sm font-medium transition-all"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    className="w-full h-12 px-4 pr-12 rounded-xl border border-border bg-muted/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 text-sm font-medium transition-all"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-ink transition-colors">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl text-white font-black text-sm uppercase tracking-widest transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2 shadow-lg"
                style={{ background: "linear-gradient(135deg,#7C3AED,#5B21B6)", boxShadow: "0 4px 24px rgba(124,58,237,0.3)" }}
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : <>Sign In <ArrowRight size={16} /></>}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground font-medium">
              Don&apos;t have an account?{" "}
              <Link href="/auth/signup" className="font-black text-primary hover:underline">Create one →</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
