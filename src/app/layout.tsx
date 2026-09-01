import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart/cart-context";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getUser } from "@/lib/auth/get-user";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JPN Car Parts — Japanese Automotive Parts, Shipped Worldwide",
  description:
    "OEM and performance parts sourced from Japan for enthusiasts, workshops, and collectors internationally.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const user = await getUser();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <div aria-hidden className="grain-overlay pointer-events-none fixed inset-0 z-0 opacity-[0.05] mix-blend-overlay" />
        <div className="relative z-10 flex min-h-full flex-1 flex-col">
          <CartProvider>
            <SiteHeader userEmail={user?.email ?? null} />
            <div id="main-content" className="flex flex-1 flex-col">
              {children}
            </div>
            <SiteFooter />
          </CartProvider>
        </div>
      </body>
    </html>
  );
}
