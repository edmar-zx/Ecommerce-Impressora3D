import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar"; 
import Footer from "../components/Footer"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ryzen - Impressão 3D",
  description: "Tecnologia e Design em Impressão 3D",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressContentEditableWarning>
      <body className={`${inter.className} bg-gray-50`}>
        <Navbar />
        <main>
          {children} {/* O conteúdo da página (page.tsx) vai aqui */}
        </main>
        <Footer />
      </body>
    </html>
  );
}