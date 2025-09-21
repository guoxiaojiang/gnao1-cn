import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RootLayout from "@/components/layout/RootLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GNAO1罕见病患者之家",
  description: "为中国GNAO1罕见病患者及家庭提供信息支持、交流平台和关怀服务",
  keywords: "GNAO1, 罕见病, 患者支持, 医疗信息, 社区交流",
  authors: [{ name: "GNAO1患者之家" }],
  icons: {
    icon: '/icon.svg',
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  );
}
