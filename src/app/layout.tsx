import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { CartProvider } from "@/context/CartContext";
import AuthProvider from "@/components/common/AuthProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Delhi Books | Premium Online Bookstore India",
  description: "Discover curated physical hardcovers and instant digital PDF books. Premium quality for modern readers across India.",
  keywords: ["books", "buy books online", "ebooks", "PDF books", "bookstore India", "Delhi Books"],
  openGraph: {
    title: "Delhi Books | Premium Online Bookstore",
    description: "Curated physical & digital books for the modern reader.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfairDisplay.variable} antialiased`}>
        <AuthProvider>
          <CartProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
