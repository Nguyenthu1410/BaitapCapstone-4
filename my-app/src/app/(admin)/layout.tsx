import React from "react";
import { Metadata } from "next";
import '../../../globals.css';
import AdminLayoutWrapper from "./admin/AdminLayoutWrapper"; 

export const metadata: Metadata = {
  title: "E-Learning Capstone",
  description: "Hệ thống đào tạo trực tuyến",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AdminLayoutWrapper>
            {children}
        </AdminLayoutWrapper>
      </body>
    </html>
  );
}