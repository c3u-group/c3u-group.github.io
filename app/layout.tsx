import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppShell from "../components/components/AppShell";
import "@fortawesome/fontawesome-free/css/all.min.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "清洁燃烧与碳捕集利用研究团队 C³U Group",
  description: "清洁燃烧与碳捕集利用研究团队 C³U Group",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
