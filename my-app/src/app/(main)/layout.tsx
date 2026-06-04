import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import '@/src/globals.css'
import Navbar from "@/src/components/Header"; 
import Footer from "@/src/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-Learning Capstone",
  description: "Hệ thống đào tạo trực tuyến",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      {/* <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}> */}
      <body>
        <Navbar /> 
        <main>
            {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}