import type { Metadata } from "next";
import { ConfigProvider } from "antd";
import viVN from "antd/locale/vi_VN";
import "@/src/globals.css";

export const metadata: Metadata = {
  title: "E-Learning Platform",
  description: "Nền tảng học trực tuyến hiện đại",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>
        <ConfigProvider locale={viVN}>
          {children}
        </ConfigProvider>
      </body>
    </html>
  );
}
