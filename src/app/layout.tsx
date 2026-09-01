import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart/cart-context";
import { SiteHeader } from "@/components/site-header";
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
  title: "Japanese Automotive Parts Platform",
  description: "Discover, verify, and buy Japanese automotive parts internationally.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const user = await getUser();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <CartProvider>
          <SiteHeader userEmail={user?.email ?? null} />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
