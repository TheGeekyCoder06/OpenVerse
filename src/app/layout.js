import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavbarMenu from "@/components/navbar/page"; 

// ✅ Font setup
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Metadata for SEO
export const metadata = {
  title: "Open Verse",
  description: "A minimal blogging platform built with Next.js",
};

// ✅ Root Layout — wraps all pages
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        {/* ✅ Navbar visible on all pages */}
        <NavbarMenu />

        {/* ✅ Main content area */}
        <main className="pt-8">{children}</main>
      </body>
    </html>
  );
}
