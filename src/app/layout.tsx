"use client";

import { usePathname } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const hideLayout =
    pathname.startsWith("/admin")

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-50`} suppressHydrationWarning>
        {!hideLayout && <Navbar />}
        <main>{children}</main>
        {!hideLayout && <Footer />}
      </body>
    </html>
  );
}
