import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Or use Geist if configured
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Modern Blog",
  description: "A modern blog built with Next.js and WordPress",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <div className="relative flex min-h-screen flex-col">
          <div className="flex-1">{children}</div>
        </div>
      </body>
    </html>
  );
}
